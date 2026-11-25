// Widget içi bildirimler (TRD §9.2, UI_SPEC §13). Windows sistem bildirimi kullanılmaz.
// - success: kısa süre sonra kendiliğinden kaybolur
// - error: kullanıcı kapatana ya da sorun çözülene kadar kalır
// - actions verilirse kapatma × gösterilmez; kullanıcı seçim yapana kadar kalır
const Notifications = (() => {
  const SUCCESS_DURATION = 2500;
  let container;

  function init(widget) {
    container = document.createElement('div');
    container.className = 'notifications';
    container.setAttribute('role', 'status');
    widget.append(container);
  }

  function show({ message, type = 'success', actions = [] }) {
    const note = document.createElement('div');
    note.className = `notification notification-${type}`;

    const text = document.createElement('p');
    text.className = 'notification-text';
    text.textContent = message;
    note.append(text);

    if (actions.length > 0) {
      const row = document.createElement('div');
      row.className = 'notification-actions';
      for (const action of actions) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'notification-action';
        button.textContent = action.label;
        button.addEventListener('click', action.onClick);
        row.append(button);
      }
      note.append(row);
    } else if (type === 'error') {
      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'notification-close';
      close.textContent = '×';
      close.setAttribute('aria-label', 'Dismiss');
      close.addEventListener('click', () => dismiss(note));
      note.append(close);
    }

    if (type === 'success') setTimeout(() => dismiss(note), SUCCESS_DURATION);
    container.append(note);
    return note;
  }

  function dismiss(note) {
    if (!note || !note.isConnected) return;
    note.classList.add('is-leaving');
    setTimeout(() => note.remove(), 180);
  }

  return { init, show, dismiss };
})();
