// Renderer betiklerini (klasik <script> dosyaları) değiştirmeden test ortamına yükler.
// priorities.js ve tasks.js aynı bağlamda, tarayıcıdaki sırayla çalıştırılır.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const JS = path.join(__dirname, '..', '..', '..', 'src', 'renderer', 'js');

function loadRenderer() {
  const context = vm.createContext({});
  for (const file of ['priorities.js', 'tasks.js']) {
    vm.runInContext(fs.readFileSync(path.join(JS, file), 'utf8'), context, { filename: file });
  }
  return vm.runInContext('({ Tasks, Priorities })', context);
}

module.exports = { loadRenderer };
