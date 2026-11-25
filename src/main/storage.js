const fs = require('fs');
const path = require('path');
const { app } = require('electron');

// %APPDATA%/Morrow/ — Electron'un userData dizini (productName: "Morrow").
function dataPath(fileName) {
  return path.join(app.getPath('userData'), fileName);
}

// Geçici dosyaya yazıp ardından asıl dosyayla değiştirir (TRD §9.3).
function writeJsonAtomic(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tmpPath = filePath + '.tmp';
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tmpPath, filePath);
}

// ---- Settings (pencere konumu ve ayarlar) ----

const SETTINGS_FILE = 'settings.json';
const DEFAULT_SETTINGS = {
  windowPosition: null,   // { x, y } — ilk açılışta null (varsayılan konum)
  alwaysOnTop: false      // D-06
};

function loadSettings() {
  try {
    const raw = fs.readFileSync(dataPath(SETTINGS_FILE), 'utf8');
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    // Dosya yoksa veya okunamıyorsa varsayılanlar kullanılır.
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings) {
  writeJsonAtomic(dataPath(SETTINGS_FILE), settings);
}

// ---- Tasks (%APPDATA%/Morrow/tasks.json, APP_FLOW §10–11) ----

const TASKS_FILE = 'tasks.json';
const BACKUP_FILE = 'tasks.backup.json';     // Yalnızca en güncel yedek
const PRIORITIES = ['high', 'medium', 'low', 'none'];

// Bozuk dosya bulunduğunda kullanıcı karar verene kadar kayıt yapılmaz (D-29).
let locked = false;

// Geçerliyse normalize edilmiş görev listesini, değilse null döndürür.
function validateTasks(list) {
  if (!Array.isArray(list)) return null;
  const ids = new Set();
  const tasks = [];
  for (const t of list) {
    if (!t || typeof t !== 'object') return null;
    if (typeof t.id !== 'string' || !t.id || ids.has(t.id)) return null;
    if (typeof t.title !== 'string' || !t.title.trim()) return null;
    if (typeof t.completed !== 'boolean' || !Number.isFinite(t.order)) return null;
    ids.add(t.id);
    tasks.push({
      id: t.id,
      title: t.title.trim(),
      priority: PRIORITIES.includes(t.priority) ? t.priority : 'none',
      completed: t.completed,
      order: t.order,
      completedAt: t.completed && typeof t.completedAt === 'string' ? t.completedAt : null
    });
  }
  return tasks;
}

function readTasksFile(fileName) {
  let raw;
  try {
    raw = fs.readFileSync(dataPath(fileName), 'utf8');
  } catch (err) {
    return err.code === 'ENOENT' ? { state: 'missing' } : { state: 'error' };
  }
  try {
    const tasks = validateTasks(JSON.parse(raw).tasks);
    return tasks ? { state: 'ok', tasks } : { state: 'corrupt' };
  } catch {
    return { state: 'corrupt' };
  }
}

function loadTasks() {
  const main = readTasksFile(TASKS_FILE);
  if (main.state === 'ok') return { status: 'ok', tasks: main.tasks };
  if (main.state === 'missing') {
    try {
      writeJsonAtomic(dataPath(TASKS_FILE), { tasks: [] });   // İlk açılış
      return { status: 'ok', tasks: [] };
    } catch {
      return { status: 'error' };
    }
  }
  locked = true;
  if (main.state === 'error') return { status: 'error' };
  return { status: 'corrupt', backupAvailable: readTasksFile(BACKUP_FILE).state === 'ok' };
}

function saveTasks(list) {
  if (locked) return { ok: false };
  const tasks = validateTasks(list);
  if (!tasks) return { ok: false };
  try {
    // Yazmadan önce mevcut (geçerli) dosyanın yedeği alınır.
    if (readTasksFile(TASKS_FILE).state === 'ok') {
      const tmp = dataPath(BACKUP_FILE) + '.tmp';
      fs.copyFileSync(dataPath(TASKS_FILE), tmp);
      fs.renameSync(tmp, dataPath(BACKUP_FILE));
    }
    writeJsonAtomic(dataPath(TASKS_FILE), { tasks });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

// Bozuk dosya silinmez; tarihli adla kenara alınır.
function setAsideCorruptFile() {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  fs.renameSync(dataPath(TASKS_FILE), dataPath(`tasks.corrupt-${stamp}.json`));
}

function restoreBackup() {
  if (!locked) return { ok: false };
  const backup = readTasksFile(BACKUP_FILE);
  if (backup.state !== 'ok') return { ok: false };
  try {
    setAsideCorruptFile();
    writeJsonAtomic(dataPath(TASKS_FILE), { tasks: backup.tasks });
    locked = false;
    return { ok: true, tasks: backup.tasks };
  } catch {
    return { ok: false };
  }
}

function startFresh() {
  if (!locked) return { ok: false };
  try {
    setAsideCorruptFile();
    writeJsonAtomic(dataPath(TASKS_FILE), { tasks: [] });
    locked = false;
    return { ok: true, tasks: [] };
  } catch {
    return { ok: false };
  }
}

module.exports = { loadSettings, saveSettings, loadTasks, saveTasks, restoreBackup, startFresh };
