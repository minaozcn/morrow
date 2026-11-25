// Kullanıcı etkileşimleri: tıklama / çift tıklama ayrımı, düzenleme,
// öncelik menüsü, görev ekleme ve sürükle-bırak (APP_FLOW §4–7).
const Interactions = (() => {
  const CLICK_DELAY = 350;      // Çift tıklama beklenirken tamamlama ertelenir
  const COMPLETE_ANIMATION = 320;
  const AUTOSCROLL_EDGE = 24;

  let ctx;                      // { el, getTasks, update }
  let clickTimer = null;
  let openMenu = null;

  function init(context) {
    ctx = context;
    const { el } = ctx;
    el.activeList.addEventListener('click', onActiveClick);
    el.activeList.addEventListener('dblclick', onActiveDblClick);
    el.activeList.addEventListener('pointerdown', onPointerDown);
    el.completedList.addEventListener('click', onCompletedClick);
    el.addInput.addEventListener('keydown', onAddKeyDown);
    el.taskArea.addEventListener('wheel', closeMenu, { passive: true });   // kaydırınca menü kapanır
    document.addEventListener('pointerdown', (e) => {
      if (openMenu && !openMenu.contains(e.target) && !e.target.closest('.priority-dot')) closeMenu();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  }

  const cardOf = (node) => node.closest('.task-card');

  // ---- Aktif görev kartı ----
  function onActiveClick(e) {
    const card = cardOf(e.target);
    if (!card || card.classList.contains('is-editing') || card.classList.contains('is-completing')) return;
    const id = card.dataset.id;

    if (e.target.closest('.task-delete')) {
      cancelClickTimer();
      ctx.update(Tasks.remove(ctx.getTasks(), id));
      return;
    }
    if (e.target.closest('.priority-dot')) {
      cancelClickTimer();
      togglePriorityMenu(e.target.closest('.priority-dot'), id);
      return;
    }
    if (e.target.closest('.drag-handle') || e.detail > 1) return;

    // Tek tıklama → tamamla; ama önce olası çift tıklamayı bekle.
    cancelClickTimer();
    clickTimer = setTimeout(() => { clickTimer = null; completeWithAnimation(card, id); }, CLICK_DELAY);
  }

  function onActiveDblClick(e) {
    const text = e.target.closest('.task-text');
    if (!text) return;
    cancelClickTimer();
    startEdit(cardOf(text));
  }

  function cancelClickTimer() {
    clearTimeout(clickTimer);
    clickTimer = null;
  }

  function completeWithAnimation(card, id) {
    closeMenu();
    card.classList.add('is-completing');
    setTimeout(() => {
      ctx.update(Tasks.complete(ctx.getTasks(), id, new Date().toISOString()));
    }, COMPLETE_ANIMATION);
  }

  // ---- Yerinde düzenleme ----
  function startEdit(card) {
    const id = card.dataset.id;
    const task = ctx.getTasks().find(t => t.id === id);
    const text = card.querySelector('.task-text');
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'task-edit';
    input.value = task.title;
    card.classList.add('is-editing');
    text.replaceWith(input);
    input.focus();
    input.select();

    let done = false;
    const finish = (save) => {
      if (done) return;
      done = true;
      ctx.update(save ? Tasks.edit(ctx.getTasks(), id, input.value) : ctx.getTasks());
    };
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.isComposing) finish(true);
      if (e.key === 'Escape') { e.stopPropagation(); finish(false); }   // D-10
    });
    input.addEventListener('blur', () => finish(true));
  }

  // ---- Öncelik menüsü ----
  function togglePriorityMenu(dot, id) {
    const reopenSame = openMenu && openMenu.dataset.taskId === id;
    closeMenu();
    if (reopenSame) return;

    const task = ctx.getTasks().find(t => t.id === id);
    const menu = Priorities.createMenu(task.priority);
    menu.dataset.taskId = id;
    ctx.el.widget.append(menu);

    // Konum: noktanın altında; yer yoksa üstünde.
    const w = ctx.el.widget.getBoundingClientRect();
    const d = dot.getBoundingClientRect();
    let top = d.bottom - w.top + 6;
    if (top + menu.offsetHeight > w.height - 8) top = d.top - w.top - menu.offsetHeight - 6;
    menu.style.left = `${d.left - w.left - 6}px`;
    menu.style.top = `${top}px`;

    menu.addEventListener('click', (e) => {
      const item = e.target.closest('.priority-menu-item');
      if (!item) return;
      closeMenu();
      ctx.update(Tasks.setPriority(ctx.getTasks(), id, item.dataset.priority));
    });
    openMenu = menu;
  }

  function closeMenu() {
    if (!openMenu) return;
    openMenu.remove();
    openMenu = null;
  }

  // ---- Tamamlanmış görevler ----
  function onCompletedClick(e) {
    const button = e.target.closest('.task-restore');
    if (!button) return;
    const id = cardOf(button).dataset.id;
    ctx.update(Tasks.restore(ctx.getTasks(), id));
    const restored = ctx.el.activeList.querySelector(`[data-id="${CSS.escape(id)}"]`);
    if (restored) restored.classList.add('is-restored');
  }

  // ---- Görev ekleme ----
  function onAddKeyDown(e) {
    if (e.key !== 'Enter' || e.isComposing) return;
    const input = ctx.el.addInput;
    const next = Tasks.add(ctx.getTasks(), input.value, crypto.randomUUID());
    if (next === ctx.getTasks()) return;                      // Boş görev eklenmez
    input.value = '';
    ctx.update(next);
    input.focus();
    input.closest('.add-row').scrollIntoView({ block: 'nearest' });
  }

  // ---- Sürükle-bırak: yalnızca tutamaçtan (APP_FLOW §7) ----
  function onPointerDown(e) {
    const handle = e.target.closest('.drag-handle');
    if (!handle || e.button !== 0) return;
    e.preventDefault();
    cancelClickTimer();
    closeMenu();

    const card = cardOf(handle);
    const list = ctx.el.activeList;
    const area = ctx.el.taskArea;
    const startIndex = [...list.children].indexOf(card);
    let anchorY = e.clientY;
    let lastY = e.clientY;

    card.classList.add('is-dragging');

    const follow = () => { card.style.transform = `translateY(${lastY - anchorY}px)`; };

    const onMove = (ev) => {
      lastY = ev.clientY;
      const a = area.getBoundingClientRect();
      if (ev.clientY < a.top + AUTOSCROLL_EDGE) area.scrollTop -= 6;
      if (ev.clientY > a.bottom - AUTOSCROLL_EDGE) area.scrollTop += 6;

      follow();
      const center = card.getBoundingClientRect();
      const mid = center.top + center.height / 2;
      const prev = card.previousElementSibling;
      const next = card.nextElementSibling;
      let target = null;
      if (prev && mid < prev.getBoundingClientRect().top + prev.offsetHeight / 2) target = prev;
      else if (next && mid > next.getBoundingClientRect().top + next.offsetHeight / 2) target = next.nextElementSibling ?? 'end';
      if (!target) return;

      // DOM'da yer değiştir; kart imleçte kalsın diye çapa noktasını kaydır.
      const before = card.offsetTop;
      if (target === 'end') list.append(card); else list.insertBefore(card, target);
      anchorY += card.offsetTop - before;
      follow();
    };

    // Kart DOM'da yer değiştirdiği için olaylar document üzerinden dinlenir.
    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointercancel', onUp);
      card.classList.remove('is-dragging');
      card.style.transform = '';
      const newIndex = [...list.children].indexOf(card);
      if (newIndex !== startIndex) ctx.update(Tasks.move(ctx.getTasks(), card.dataset.id, newIndex));
    };

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    document.addEventListener('pointercancel', onUp);
  }

  return { init };
})();
