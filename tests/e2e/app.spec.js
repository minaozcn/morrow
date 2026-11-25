const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { launch, tempUserData, callMain, titles, addTask, readJson, MAIN } = require('./helpers');

let userData, app, page;

test.beforeEach(async () => {
  userData = tempUserData();
  ({ app, page } = await launch(userData));
});

test.afterEach(async () => {
  if (app) await app.close().catch(() => {});
});

const mainWindow = (fn) => app.evaluate(({ BrowserWindow }, body) => {
  const w = BrowserWindow.getAllWindows().find((x) => x.webContents.getURL().endsWith('index.html'));
  return new Function('w', body)(w);
}, fn);

test('uygulama açılışı: boş liste, 340 px genişlik, 320 px\'i aşmayan yükseklik', async () => {
  await expect(page.locator('.empty-text')).toHaveText('Nothing to do yet!');
  const [w, h] = await mainWindow('return w.getSize()');
  expect(w).toBe(340);
  expect(h).toBeLessThanOrEqual(320);
  expect(readJson(userData, 'tasks.json')).toEqual({ tasks: [] });
});

test('görev oluşturma, düzenleme ve silme', async () => {
  await addTask(page, 'Finish project report');
  await addTask(page, 'Read chapter 3');
  expect(await titles(page)).toEqual(['Finish project report', 'Read chapter 3']);

  await page.dblclick('#active-list .task-card:nth-child(2) .task-text');
  await page.fill('.task-edit', 'Read chapter 4');
  await page.press('.task-edit', 'Enter');
  expect(await titles(page)).toEqual(['Finish project report', 'Read chapter 4']);

  await page.hover('#active-list .task-card:nth-child(1)');
  await page.click('#active-list .task-card:nth-child(1) .task-delete');
  expect(await titles(page)).toEqual(['Read chapter 4']);
  expect(readJson(userData, 'tasks.json').tasks.map((t) => t.title)).toEqual(['Read chapter 4']);
});

test('öncelik seçimi ve sürükle-bırak sıralama', async () => {
  for (const t of ['A', 'B', 'C']) await addTask(page, t);
  await page.click('#active-list .task-card:nth-child(1) .priority-dot', { force: true });
  await page.click('.priority-menu-item[data-priority="high"]');
  await expect(page.locator('#active-list .task-card:nth-child(1) .priority-high')).toHaveCount(1);

  await page.hover('#active-list .task-card:nth-child(1)');
  const handle = await page.locator('#active-list .task-card:nth-child(1) .drag-handle').boundingBox();
  const last = await page.locator('#active-list .task-card:nth-child(3)').boundingBox();
  await page.mouse.move(handle.x + 4, handle.y + 8);
  await page.mouse.down();
  await page.mouse.move(handle.x + 4, last.y + last.height - 2, { steps: 15 });
  await page.mouse.up();
  expect(await titles(page)).toEqual(['B', 'C', 'A']);
  expect(readJson(userData, 'tasks.json').tasks.find((t) => t.title === 'A')).toMatchObject({ order: 3, priority: 'high' });
});

test('görev tamamlama ve geri yükleme', async () => {
  for (const t of ['A', 'B', 'C']) await addTask(page, t);
  await page.click('#active-list .task-card:nth-child(2) .task-text');
  await expect(page.locator('#completed-list .task-text')).toHaveText(['B']);
  expect(await titles(page)).toEqual(['A', 'C']);

  await page.click('#completed-toggle');
  await page.hover('#completed-list .task-card');
  await page.click('#completed-list .task-restore');
  expect(await titles(page)).toEqual(['A', 'B', 'C']);   // eski konumuna döner
});

test('çift tıklama görevi tamamlamaz', async () => {
  await addTask(page, 'A');
  await page.dblclick('#active-list .task-text');
  await page.waitForTimeout(600);
  await expect(page.locator('.task-edit')).toHaveCount(1);
  await expect(page.locator('#completed-list .task-card')).toHaveCount(0);
});

test('veriler yeniden açılışta korunur', async () => {
  await addTask(page, 'Keep me');
  await expect.poll(() => readJson(userData, 'tasks.json').tasks.length).toBe(1);   // kayıt tamamlandı
  await app.close();
  ({ app, page } = await launch(userData));
  expect(await titles(page)).toEqual(['Keep me']);
});

test('bozuk dosyada kurtarma seçenekleri sunulur ve yedekten geri yüklenir', async () => {
  await addTask(page, 'A');
  await addTask(page, 'B');                                     // yedek: [A]
  await expect.poll(() => readJson(userData, 'tasks.json').tasks.length).toBe(2);
  await app.close();
  fs.writeFileSync(path.join(userData, 'tasks.json'), '{ bozuk');
  ({ app, page } = await launch(userData));

  await expect(page.locator('.notification-action')).toHaveText(['Restore backup', 'Start fresh']);
  await expect(page.locator('#add-input')).toBeDisabled();
  await page.click('text=Restore backup');
  expect(await titles(page)).toEqual(['A']);
  await expect(page.locator('#add-input')).toBeEnabled();
  expect(fs.readdirSync(userData).some((n) => n.startsWith('tasks.corrupt-'))).toBe(true);
});

test('sistem tepsisi: menü öğeleri ve pencereyi açma', async () => {
  const menu = await app.evaluate(({ Menu }, trayPath) => {
    const original = Menu.buildFromTemplate;
    let template;
    Menu.buildFromTemplate = (t) => { template = t; return original(t); };
    const calls = [];
    const tray = globalThis.__morrowRequire(trayPath).createTray({
      onOpen: () => calls.push('open'), onSettings: () => calls.push('settings'), onQuit: () => calls.push('quit')
    });
    Menu.buildFromTemplate = original;
    template.filter((i) => i.click).forEach((i) => i.click());
    tray.emit('click');
    tray.destroy();
    return { labels: template.filter((i) => i.label).map((i) => i.label), calls };
  }, path.join(MAIN, 'tray.js'));
  expect(menu.labels).toEqual(['Open', 'Settings', 'Quit']);
  expect(menu.calls).toEqual(['open', 'settings', 'quit', 'open']);

  await page.click('.window-close', { force: true });             // × gizler
  expect(await mainWindow('return w.isVisible()')).toBe(false);
  await callMain(app, 'window.js', 'showMainWindow');             // tepsiden aç
  expect(await mainWindow('return w.isVisible()')).toBe(true);
});

test('ayarlar: yalnızca iki ayar, anında uygulanır', async () => {
  const opened = app.waitForEvent('window');
  await callMain(app, 'window.js', 'openSettingsWindow');
  const settings = await opened;
  await settings.waitForSelector('.switch:not([disabled])');

  await expect(settings.locator('.settings-label')).toHaveText(['Launch on Windows Startup', 'Always on Top']);
  for (const key of ['launchOnStartup', 'alwaysOnTop']) {
    await expect(settings.locator(`[data-key="${key}"]`)).toHaveAttribute('aria-checked', 'false');   // D-06
  }

  await settings.click('[data-key="alwaysOnTop"]');
  await expect(settings.locator('[data-key="alwaysOnTop"]')).toHaveAttribute('aria-checked', 'true');
  expect(await mainWindow('return w.isAlwaysOnTop()')).toBe(true);
  expect(readJson(userData, 'settings.json').alwaysOnTop).toBe(true);

  await settings.click('[data-key="launchOnStartup"]');
  await expect(settings.locator('[data-key="launchOnStartup"]')).toHaveAttribute('aria-checked', 'true');
  expect(await app.evaluate(() => globalThis.__loginItem.openAtLogin)).toBe(true);

  await settings.click('#settings-close');                       // yalnızca ayarlar kapanır
  await expect.poll(() => app.evaluate(({ BrowserWindow }) => BrowserWindow.getAllWindows().length)).toBe(1);
});

test('uygulamadan çıkış: Quit uygulamayı tamamen kapatır', async () => {
  const exited = new Promise((resolve) => app.process().once('exit', resolve));
  await app.evaluate(({ app }) => app.quit());
  await expect(exited).resolves.toBeDefined();
  app = null;
});
