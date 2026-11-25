const path = require('path');
const { Tray, Menu, nativeImage } = require('electron');

let tray = null;   // Çöp toplayıcı simgeyi silmesin diye modül düzeyinde tutulur

function createTray({ onOpen, onSettings, onQuit }) {
  const file = process.platform === 'win32' ? 'icon.ico' : 'icon.png';
  const icon = nativeImage.createFromPath(path.join(__dirname, '..', '..', 'assets', file));
  tray = new Tray(process.platform === 'win32' ? icon : icon.resize({ width: 16, height: 16 }));
  tray.setToolTip('Morrow');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Open', click: onOpen },
    { label: 'Settings', click: onSettings },
    { type: 'separator' },
    { label: 'Quit', click: onQuit }
  ]));
  tray.on('click', onOpen);   // Tek tıklama widget'ı açar (APP_FLOW §9)
  return tray;
}

module.exports = { createTray };
