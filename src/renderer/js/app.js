// Renderer giriş noktası: durumu tutar, arayüzü çizer, bileşenleri başlatır.
(() => {
  const el = {
    widget: document.getElementById('app'),
    date: document.getElementById('date'),
    taskArea: document.querySelector('.task-area'),
    taskAreaContent: document.getElementById('task-area-content'),
    activeList: document.getElementById('active-list'),
    emptyState: document.getElementById('empty-state'),
    addInput: document.getElementById('add-input'),
    completedList: document.getElementById('completed-list'),
    completedEmpty: document.getElementById('completed-empty'),
    completedToggle: document.getElementById('completed-toggle'),
    completedBody: document.getElementById('completed-body'),
    closeButton: document.querySelector('.window-close')
  };

  const COMPLETED_VISIBLE = 5;   // D-33: yalnızca son 5 tamamlanan gösterilir; eskiler dosyada kalır

  let tasks = [];
  let saveErrorNote = null;
  let recoveryNote = null;

  function render() {
    const active = Tasks.active(tasks);
    const completed = Tasks.completed(tasks);

    el.activeList.replaceChildren(...active.map(Tasks.createCard));
    el.emptyState.hidden = active.length > 0;

    el.completedList.replaceChildren(...completed.slice(0, COMPLETED_VISIBLE).map(Tasks.createCard));
    el.completedEmpty.hidden = completed.length > 0;
    fitHeight();
  }

  // Pencere yüksekliği içerik kadar olur; 320 px'i aşarsa liste kendi içinde kayar (D-27).
  function fitHeight() {
    const area = el.taskArea;
    const padding = parseFloat(getComputedStyle(area).paddingTop) + parseFloat(getComputedStyle(area).paddingBottom);
    const natural = el.widget.offsetHeight - area.clientHeight + el.taskAreaContent.offsetHeight + padding;
    window.morrow.setHeight(Math.ceil(natural));
  }

  // Bütün görev değişiklikleri buradan geçer: çiz ve (değiştiyse) kaydet.
  function update(next) {
    const changed = next !== tasks;
    tasks = next;
    render();
    if (changed) persist();
  }

  // Otomatik kayıt (APP_FLOW §10). Hata sessizce yok sayılmaz (TRD §4.5).
  async function persist() {
    const result = await window.morrow.saveTasks(tasks);
    if (result.ok) {
      Notifications.dismiss(saveErrorNote);      // Sorun çözüldüyse hata bildirimi kalkar
      saveErrorNote = null;
    } else if (!saveErrorNote || !saveErrorNote.isConnected) {
      saveErrorNote = Notifications.show({ type: 'error', message: "Couldn't save your changes." });
    }
  }

  // Kayıtlı görevleri yükle; bozuk dosyada kullanıcıya kurtarma seçenekleri sun (APP_FLOW §11).
  async function loadTasks() {
    const result = await window.morrow.loadTasks();
    if (result.status === 'ok') {
      tasks = result.tasks;
      setLocked(false);
      render();
      return;
    }
    setLocked(true);
    if (result.status === 'error') {
      Notifications.show({ type: 'error', message: "Couldn't read your tasks. Please restart Morrow.", actions: [] });
      return;
    }
    const message = result.backupAvailable
      ? "Your task file couldn't be read. A backup is available."
      : "Your task file couldn't be read. No backup was found.";
    const actions = [];
    if (result.backupAvailable) actions.push({ label: 'Restore backup', onClick: () => recover('restoreBackup', 'Tasks restored from backup.') });
    actions.push({ label: 'Start fresh', onClick: () => recover('startFresh', 'Started a fresh list.') });
    recoveryNote = Notifications.show({ type: 'error', message, actions });
  }

  async function recover(method, successMessage) {
    const result = await window.morrow[method]();
    if (!result.ok) {
      Notifications.show({ type: 'error', message: "Couldn't recover your tasks." });
      return;
    }
    Notifications.dismiss(recoveryNote);
    tasks = result.tasks;
    setLocked(false);
    render();
    Notifications.show({ message: successMessage });
  }

  // Kurtarma kararı verilene kadar düzenleme kapalı (D-29).
  function setLocked(locked) {
    el.widget.classList.toggle('is-locked', locked);
    el.addInput.disabled = locked;
  }

  // Tarih: Windows yerel saatine göre, gece yarısı kendiliğinden güncellenir (APP_FLOW §2).
  function renderDate() {
    const now = new Date();
    el.date.textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    setTimeout(renderDate, nextMidnight - now + 1000);
  }

  // Completed her açılışta kapalı başlar (D-15).
  el.completedToggle.addEventListener('click', () => {
    const expanded = el.completedToggle.getAttribute('aria-expanded') === 'true';
    el.completedToggle.setAttribute('aria-expanded', String(!expanded));
    el.completedBody.hidden = expanded;
    fitHeight();
  });

  el.closeButton.addEventListener('click', () => window.morrow.hideWindow());

  Notifications.init(el.widget);
  Interactions.init({ el, getTasks: () => tasks, update });
  el.addInput.disabled = true;            // Yükleme bitene kadar
  renderDate();
  render();
  loadTasks();
  document.fonts.ready.then(fitHeight);   // Fontlar yüklenince yükseklik kesinleşir
})();
