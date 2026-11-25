// Ayarlar penceresi: yalnızca iki ayar (UI_SPEC §14). Değişiklik anında uygulanır.
(() => {
  const switches = [...document.querySelectorAll('.switch')];

  function show(settings) {
    for (const sw of switches) {
      sw.setAttribute('aria-checked', String(settings[sw.dataset.key] === true));
      sw.disabled = false;
    }
  }

  for (const sw of switches) {
    sw.addEventListener('click', async () => {
      const next = sw.getAttribute('aria-checked') !== 'true';
      sw.disabled = true;
      const settings = await window.morrow.setSetting(sw.dataset.key, next);
      if (settings) show(settings);
    });
  }

  document.getElementById('settings-close').addEventListener('click', () => window.close());

  window.morrow.getSettings().then(show);
})();
