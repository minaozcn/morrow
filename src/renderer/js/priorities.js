// Öncelik göstergeleri ve seçim menüsü (UI_SPEC §7).
const Priorities = (() => {
  const LEVELS = ['high', 'medium', 'low', 'none'];
  const LABELS = { high: 'High', medium: 'Medium', low: 'Low', none: 'None' };

  function normalize(priority) {
    return LEVELS.includes(priority) ? priority : 'none';
  }

  function createDot(priority) {
    const level = normalize(priority);
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = `priority-dot priority-${level}`;
    dot.setAttribute('aria-label', `Priority: ${LABELS[level]}`);
    return dot;
  }

  // Küçük seçim menüsü: High / Medium / Low / None
  function createMenu(current) {
    const menu = document.createElement('div');
    menu.className = 'priority-menu';
    menu.setAttribute('role', 'menu');
    for (const level of LEVELS) {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'priority-menu-item' + (level === normalize(current) ? ' is-current' : '');
      item.setAttribute('role', 'menuitem');
      item.dataset.priority = level;

      const swatch = document.createElement('span');
      swatch.className = `priority-swatch priority-${level}`;
      const label = document.createElement('span');
      label.textContent = LABELS[level];

      item.append(swatch, label);
      menu.append(item);
    }
    return menu;
  }

  return { LEVELS, normalize, createDot, createMenu };
})();
