const path = require('path');
const { BrowserWindow, ipcMain, screen } = require('electron');
const { loadSettings, saveSettings } = require('./storage');

const WIDTH = 340;
const MAX_HEIGHT = 320;   // D-23 (UI_SPEC §2: 460 → 320)
const MIN_HEIGHT = 120;   // D-27: yükseklik içeriğe göre, bu aralıkta

const SETTINGS_SIZE = { width: 290, height: 168 };

let mainWindow = null;
let settingsWindow = null;
let isQuitting = false;

const webPreferences = {
  preload: path.join(__dirname, '..', 'preload', 'preload.js'),
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: true
};

// Kayıtlı konum hâlâ bağlı bir ekranın içinde mi? (ör. ikinci monitör çıkarıldıysa hayır)
function isPositionVisible(pos) {
  if (!pos || !Number.isInteger(pos.x) || !Number.isInteger(pos.y)) return false;
  return screen.getAllDisplays().some(({ workArea: a }) =>
    pos.x >= a.x && pos.y >= a.y &&
    pos.x + WIDTH <= a.x + a.width && pos.y + MAX_HEIGHT <= a.y + a.height
  );
}

function savePosition() {
  const [x, y] = mainWindow.getPosition();
  saveSettings({ ...loadSettings(), windowPosition: { x, y } });
}

function createMainWindow() {
  const settings = loadSettings();
  const position = isPositionVisible(settings.windowPosition) ? settings.windowPosition : {};

  mainWindow = new BrowserWindow({
    width: WIDTH,
    height: MAX_HEIGHT,
    ...position,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    frame: false,                    // D-12
    transparent: true,               // 16 px yuvarlak köşeler için
    backgroundColor: '#00000000',
    alwaysOnTop: settings.alwaysOnTop,
    skipTaskbar: true,               // D-34: yalnızca masaüstü + sistem tepsisi
    show: false,
    webPreferences
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
  mainWindow.once('ready-to-show', () => mainWindow.show());

  // Sürükleme bitince konumu kaydet (her piksel hareketinde yazmamak için gecikmeli).
  let moveTimer = null;
  mainWindow.on('move', () => {
    clearTimeout(moveTimer);
    moveTimer = setTimeout(savePosition, 300);
  });

  // × uygulamayı kapatmaz, pencereyi gizler (D-01). Gerçek çıkış yalnızca Quit ile.
  mainWindow.on('close', (event) => {
    if (isQuitting) return;
    event.preventDefault();
    mainWindow.hide();
  });

  // Renderer'daki × butonu. Yalnızca ana pencereden gelen istek kabul edilir.
  ipcMain.on('window:hide', (event) => {
    if (event.sender !== mainWindow.webContents) return;
    mainWindow.hide();
  });

  // Yükseklik içeriğe göre ayarlanır (D-27). Genişlik ve üst kenar sabit kalır.
  ipcMain.on('window:setHeight', (event, height) => {
    if (event.sender !== mainWindow.webContents || !Number.isFinite(height)) return;
    const clamped = Math.round(Math.min(Math.max(height, MIN_HEIGHT), MAX_HEIGHT));
    const bounds = mainWindow.getBounds();
    if (bounds.height !== clamped) mainWindow.setBounds({ ...bounds, width: WIDTH, height: clamped });
  });

  return mainWindow;
}

function showMainWindow() {
  if (!mainWindow) return;
  mainWindow.show();
  mainWindow.focus();
}

function setAlwaysOnTop(enabled) {
  mainWindow.setAlwaysOnTop(enabled === true);
  saveSettings({ ...loadSettings(), alwaysOnTop: enabled === true });
}

function getAlwaysOnTop() {
  return loadSettings().alwaysOnTop === true;
}

// Ayarlar: ayrı, küçük pencere (UI_SPEC §14). Kapatılınca yalnızca ayarlar kapanır.
function openSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.show();
    settingsWindow.focus();
    return;
  }
  settingsWindow = new BrowserWindow({
    ...SETTINGS_SIZE,
    resizable: false,
    maximizable: false,
    minimizable: false,
    fullscreenable: false,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    alwaysOnTop: true,               // Üstte duran widget'ın arkasında kalmasın
    skipTaskbar: true,
    show: false,
    webPreferences
  });
  settingsWindow.loadFile(path.join(__dirname, '..', 'renderer', 'settings.html'));
  settingsWindow.once('ready-to-show', () => settingsWindow.show());
  settingsWindow.on('closed', () => { settingsWindow = null; });
}

// IPC isteği ana pencereden mi geliyor?
function isMainWindowSender(event) {
  return mainWindow !== null && event.sender === mainWindow.webContents;
}

function isSettingsWindowSender(event) {
  return settingsWindow !== null && event.sender === settingsWindow.webContents;
}

function setQuitting() {
  isQuitting = true;
}

module.exports = {
  createMainWindow,
  showMainWindow,
  openSettingsWindow,
  setAlwaysOnTop,
  getAlwaysOnTop,
  setQuitting,
  isMainWindowSender,
  isSettingsWindowSender
};
