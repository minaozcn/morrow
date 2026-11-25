const { app } = require('electron');

// Windows başlangıcında çalıştırma (TRD §6.2). Durumun kaynağı Windows'un kendi kaydıdır.
// Geliştirme sırasında (npm start) electron.exe + proje yolu kaydedilir.
function loginItemTarget() {
  return app.isPackaged ? {} : { path: process.execPath, args: [app.getAppPath()] };
}

function isLaunchOnStartup() {
  return app.getLoginItemSettings(loginItemTarget()).openAtLogin === true;
}

function setLaunchOnStartup(enabled) {
  app.setLoginItemSettings({ ...loginItemTarget(), openAtLogin: enabled === true });
  return isLaunchOnStartup();
}

module.exports = { isLaunchOnStartup, setLaunchOnStartup };
