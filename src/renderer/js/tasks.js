// Görev işlemleri ve görev kartı.
// İşlem fonksiyonları saftır: yeni dizi döndürür; değişiklik yoksa aynı diziyi döndürür.
const Tasks = (() => {
  function cleanTitle(title) {
    return typeof title === 'string' ? title.trim() : '';
  }

  function active(tasks) {
    return tasks.filter(t => !t.completed).sort((a, b) => a.order - b.order);
  }

  // Tamamlananlar: en son tamamlanan en üstte (D-24).
  function completed(tasks) {
    return tasks.filter(t => t.completed)
      .sort((a, b) => String(b.completedAt).localeCompare(String(a.completedAt)));
  }

  // Verilen aktif sıralamaya göre order değerlerini 1..n yapar.
  function applyOrder(tasks, orderedActive) {
    const pos = new Map(orderedActive.map((t, i) => [t.id, i + 1]));
    return tasks.map(t => (pos.has(t.id) ? { ...t, order: pos.get(t.id) } : t));
  }

  function add(tasks, title, id) {
    const clean = cleanTitle(title);
    if (!clean) return tasks;                                  // Boş görev eklenmez (US-01)
    const last = active(tasks).reduce((max, t) => Math.max(max, t.order), 0);
    return [...tasks, { id, title: clean, priority: 'none', completed: false, order: last + 1, completedAt: null }];
  }

  function edit(tasks, id, title) {
    const clean = cleanTitle(title);
    const task = tasks.find(t => t.id === id);
    if (!clean || !task || task.title === clean) return tasks; // Boş düzenleme eski metni korur (D-25)
    return tasks.map(t => (t.id === id ? { ...t, title: clean } : t));
  }

  function remove(tasks, id) {
    const rest = tasks.filter(t => t.id !== id);
    if (rest.length === tasks.length) return tasks;
    return applyOrder(rest, active(rest));
  }

  // Tamamlanan görev eski order değerini saklar; geri yüklemede bu konuma döner.
  function complete(tasks, id, now) {
    const task = tasks.find(t => t.id === id);
    if (!task || task.completed) return tasks;
    const marked = tasks.map(t => (t.id === id ? { ...t, completed: true, completedAt: now } : t));
    return applyOrder(marked, active(marked));
  }

  function restore(tasks, id) {
    const task = tasks.find(t => t.id === id);
    if (!task || !task.completed) return tasks;
    const list = active(tasks);
    const index = Math.min(Math.max(task.order - 1, 0), list.length);
    const restored = { ...task, completed: false, completedAt: null };
    list.splice(index, 0, restored);
    return applyOrder(tasks.map(t => (t.id === id ? restored : t)), list);
  }

  function setPriority(tasks, id, priority) {
    const task = tasks.find(t => t.id === id);
    if (!task || !Priorities.LEVELS.includes(priority) || task.priority === priority) return tasks;
    return tasks.map(t => (t.id === id ? { ...t, priority } : t));
  }

  function move(tasks, id, newIndex) {
    const list = active(tasks);
    const from = list.findIndex(t => t.id === id);
    const to = Math.min(Math.max(newIndex, 0), list.length - 1);
    if (from < 0 || from === to) return tasks;
    const [task] = list.splice(from, 1);
    list.splice(to, 0, task);
    return applyOrder(tasks, list);
  }

  // ---- Görev kartı (kullanıcı metni yalnızca textContent ile, TRD §8) ----
  function createCard(task) {
    const card = document.createElement('li');
    card.className = 'task-card' + (task.completed ? ' is-completed' : '');
    card.dataset.id = task.id;

    const handle = document.createElement('span');
    if (task.completed) {
      handle.className = 'handle-spacer';
    } else {
      handle.className = 'drag-handle';
      handle.setAttribute('aria-hidden', 'true');
    }

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.title;
    text.title = task.title;

    const icon = document.createElement('button');
    icon.type = 'button';
    if (task.completed) {
      icon.className = 'card-icon task-restore';
      icon.textContent = '↶';
      icon.setAttribute('aria-label', 'Restore task');
    } else {
      icon.className = 'card-icon task-delete';
      icon.textContent = '×';
      icon.setAttribute('aria-label', 'Delete task');
    }

    card.append(handle, Priorities.createDot(task.priority), text, icon);
    return card;
  }

  return { active, completed, add, edit, remove, complete, restore, setPriority, move, createCard };
})();
