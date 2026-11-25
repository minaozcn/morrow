const { _electron: electron } = require('@playwright/test');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const MAIN = path.join(ROOT, 'src', 'main');

// Her test kendi geçici veri klasörünü kullanır: gerçek %APPDATA%\Morrow dosyalarına dokunulmaz.
function tempUserData() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'morrow-e2e-'));
}

async function launch(userData) {
  const args = ['-r', path.join(__dirname, 'main-hook.cjs'), ROOT, `--user-data-dir=${userData}`];
  if (process.platform === 'linux') args.push('--no-sandbox');
  const app = await electron.launch({ args });
  // Windows başlangıç kaydını taklit et: testler gerçek kaydı değiştirmesin.
  await app.evaluate(({ app }) => {
    let on = false;
    app.getLoginItemSettings = () => ({ openAtLogin: on });
    app.setLoginItemSettings = (options) => { on = options.openAtLogin === true; globalThis.__loginItem = options; };
  });
  const page = await app.firstWindow();
  await page.waitForLoadState('domcontentloaded');          // app.js çalıştı, yükleme başladı
  // Görevler yüklenene (veya kurtarma bildirimi çıkana) kadar bekle
  await page.waitForFunction(() => !document.getElementById('add-input').disabled || document.querySelector('.notification'));
  return { app, page };
}

// Ana süreç modülündeki bir fonksiyonu çağırır (ör. tepsi menüsü eylemleri).
function callMain(app, file, fn) {
  return app.evaluate((_, [modPath, name]) => globalThis.__morrowRequire(modPath)[name](), [path.join(MAIN, file), fn]);
}

const titles = (page, list = '#active-list') => page.$$eval(`${list} .task-text`, (n) => n.map((x) => x.textContent));

async function addTask(page, title) {
  await page.fill('#add-input', title);
  await page.press('#add-input', 'Enter');
}

const readJson = (dir, name) => JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'));

module.exports = { launch, tempUserData, callMain, titles, addTask, readJson, MAIN };
