// Renderer ile Main Process arasındaki tek güvenli köprü.
// Yalnızca açıkça tanımlanmış metotlar contextBridge ile açılır.
// Ana süreç her kanalda isteğin hangi pencereden geldiğini ayrıca doğrular.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('morrow', {
  hideWindow: () => ipcRenderer.send('window:hide'),
  setHeight: (height) => ipcRenderer.send('window:setHeight', height),
  loadTasks: () => ipcRenderer.invoke('tasks:load'),
  saveTasks: (tasks) => ipcRenderer.invoke('tasks:save', tasks),
  restoreBackup: () => ipcRenderer.invoke('tasks:restoreBackup'),
  startFresh: () => ipcRenderer.invoke('tasks:startFresh'),
  getSettings: () => ipcRenderer.invoke('settings:get'),
  setSetting: (key, value) => ipcRenderer.invoke('settings:set', { key, value })
});
