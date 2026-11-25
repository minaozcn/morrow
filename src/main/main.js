const { app, ipcMain } = require('electron');
const windows = require('./window');
const storage = require('./storage');
const startup = require('./startup');
const { createTray } = require('./tray');

// Tek uygulama örneği: ikinci açılış yeni pencere açmaz, mevcut widget'ı gösterir.
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', windows.showMainWindow);

  // Görev verisi kanalları — yalnızca ana pencereden.
  const taskChannels = {
    'tasks:load': () => storage.loadTasks(),
    'tasks:save': (tasks) => storage.saveTasks(tasks),
    'tasks:restoreBackup': () => storage.restoreBackup(),
    'tasks:startFresh': () => storage.startFresh()
  };
  for (const [channel, handler] of Object.entries(taskChannels)) {
    ipcMain.handle(channel, (event, payload) => (windows.isMainWindowSender(event) ? handler(payload) : { ok: false }));
  }

  // Ayar kanalları — yalnızca ayarlar penceresinden. Yalnızca iki ayar var (UI_SPEC §14).
  const readSettings = () => ({
    alwaysOnTop: windows.getAlwaysOnTop(),
    launchOnStartup: startup.isLaunchOnStartup()
  });
  const settingSetters = {
    alwaysOnTop: (value) => windows.setAlwaysOnTop(value),
    launchOnStartup: (value) => startup.setLaunchOnStartup(value)
  };
  ipcMain.handle('settings:get', (event) => (windows.isSettingsWindowSender(event) ? readSettings() : null));
  ipcMain.handle('settings:set', (event, payload) => {
    if (!windows.isSettingsWindowSender(event)) return null;
    const { key, value } = payload || {};
    if (!Object.hasOwn(settingSetters, key) || typeof value !== 'boolean') return null;
    try {
      settingSetters[key](value);
    } catch {
      // Ayar uygulanamadıysa güncel (değişmemiş) durum döner
    }
    return readSettings();
  });

  app.whenReady().then(() => {
    windows.createMainWindow();
    createTray({
      onOpen: windows.showMainWindow,
      onSettings: windows.openSettingsWindow,
      onQuit: () => app.quit()
    });
  });

  // Quit seçildiğinde pencerelerin gerçekten kapanmasına izin ver.
  app.on('before-quit', windows.setQuitting);
}
