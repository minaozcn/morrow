import { describe, it, expect, beforeEach } from 'vitest';
import { createRequire } from 'module';
import fs from 'fs';
import os from 'os';
import path from 'path';
const require = createRequire(import.meta.url);

const STORAGE = require.resolve('../../src/main/storage.js');
let dir;
let storage;

// storage.js Electron'un app.getPath('userData') API'sini kullanır: geçici klasörle taklit edilir.
// Her test temiz bir modül (ve temiz bir klasör) ile başlar.
beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'morrow-test-'));
  require.cache[require.resolve('electron')] = { exports: { app: { getPath: () => dir } } };
  delete require.cache[STORAGE];
  storage = require(STORAGE);
});

const file = (name) => path.join(dir, name);
const readJson = (name) => JSON.parse(fs.readFileSync(file(name), 'utf8'));
const task = (id, extra = {}) => ({ id, title: 'Task ' + id, priority: 'none', completed: false, order: 1, completedAt: null, ...extra });

describe('tasks.json', () => {
  it('ilk açılışta boş dosya oluşturur', () => {
    expect(storage.loadTasks()).toEqual({ status: 'ok', tasks: [] });
    expect(readJson('tasks.json')).toEqual({ tasks: [] });
  });

  it('kaydeder ve yeniden yükler (metin, öncelik, durum, sıra korunur)', () => {
    storage.loadTasks();
    const tasks = [task('a', { priority: 'high', order: 2 }), task('b', { completed: true, completedAt: '2026-11-05T10:00:00Z' })];
    expect(storage.saveTasks(tasks)).toEqual({ ok: true });
    expect(storage.loadTasks()).toEqual({ status: 'ok', tasks });
  });

  it('geçici dosya bırakmaz (atomik yazma)', () => {
    storage.loadTasks();
    storage.saveTasks([task('a')]);
    expect(fs.readdirSync(dir).some((n) => n.endsWith('.tmp'))).toBe(false);
  });

  it('geçersiz veriyi reddeder ve dosyaya dokunmaz', () => {
    storage.loadTasks();
    storage.saveTasks([task('a')]);
    for (const bad of ['x', null, [{ id: 1 }], [task('a'), task('a')], [task('a', { title: '  ' })]]) {
      expect(storage.saveTasks(bad)).toEqual({ ok: false });
    }
    expect(readJson('tasks.json').tasks).toHaveLength(1);
  });

  it('bilinmeyen önceliği none yapar', () => {
    fs.writeFileSync(file('tasks.json'), JSON.stringify({ tasks: [task('a', { priority: 'urgent' })] }));
    expect(storage.loadTasks().tasks[0].priority).toBe('none');
  });
});

describe('yedekleme', () => {
  it('her kayıttan önce önceki sürümü yedekler', () => {
    storage.loadTasks();
    storage.saveTasks([task('a')]);
    storage.saveTasks([task('a'), task('b')]);
    expect(readJson('tasks.backup.json').tasks.map((t) => t.id)).toEqual(['a']);
    expect(readJson('tasks.json').tasks.map((t) => t.id)).toEqual(['a', 'b']);
  });

  it('yalnızca en güncel yedek tutulur', () => {
    storage.loadTasks();
    for (const n of [1, 2, 3]) storage.saveTasks([task('t' + n)]);
    expect(fs.readdirSync(dir).filter((n) => n.includes('backup'))).toEqual(['tasks.backup.json']);
  });
});

describe('bozuk dosya ve kurtarma (D-29)', () => {
  const corrupt = () => fs.writeFileSync(file('tasks.json'), '{"tasks": [ {"id": "a", "tit');

  it('bozuk dosyada kilitlenir ve üzerine yazmaz', () => {
    corrupt();
    expect(storage.loadTasks()).toEqual({ status: 'corrupt', backupAvailable: false });
    expect(storage.saveTasks([task('a')])).toEqual({ ok: false });
    expect(fs.readFileSync(file('tasks.json'), 'utf8')).toBe('{"tasks": [ {"id": "a", "tit');
  });

  it('yapısı geçersiz dosyayı da bozuk sayar', () => {
    fs.writeFileSync(file('tasks.json'), '{"tasks": "not-a-list"}');
    expect(storage.loadTasks().status).toBe('corrupt');
  });

  it('yedekten geri yükler ve bozuk dosyayı saklar', () => {
    fs.writeFileSync(file('tasks.backup.json'), JSON.stringify({ tasks: [task('a')] }));
    corrupt();
    expect(storage.loadTasks()).toEqual({ status: 'corrupt', backupAvailable: true });
    expect(storage.restoreBackup()).toEqual({ ok: true, tasks: [task('a')] });
    expect(readJson('tasks.json').tasks).toEqual([task('a')]);
    expect(fs.readdirSync(dir).filter((n) => n.startsWith('tasks.corrupt-'))).toHaveLength(1);
    expect(storage.saveTasks([task('b')])).toEqual({ ok: true });   // kilit açıldı
  });

  it('Start fresh boş liste başlatır ve bozuk dosyayı saklar', () => {
    corrupt();
    storage.loadTasks();
    expect(storage.startFresh()).toEqual({ ok: true, tasks: [] });
    expect(readJson('tasks.json')).toEqual({ tasks: [] });
    expect(fs.readdirSync(dir).filter((n) => n.startsWith('tasks.corrupt-'))).toHaveLength(1);
  });

  it('dosya sağlamken kurtarma işlemlerine izin vermez', () => {
    storage.loadTasks();
    expect(storage.restoreBackup()).toEqual({ ok: false });
    expect(storage.startFresh()).toEqual({ ok: false });
  });
});

describe('settings.json', () => {
  it('dosya yoksa veya bozuksa varsayılanlar (Always on Top kapalı)', () => {
    expect(storage.loadSettings()).toEqual({ windowPosition: null, alwaysOnTop: false });
    fs.writeFileSync(file('settings.json'), '{bozuk');
    expect(storage.loadSettings().alwaysOnTop).toBe(false);
  });

  it('kaydeder ve yükler', () => {
    storage.saveSettings({ windowPosition: { x: 10, y: 20 }, alwaysOnTop: true });
    expect(storage.loadSettings()).toEqual({ windowPosition: { x: 10, y: 20 }, alwaysOnTop: true });
  });
});
