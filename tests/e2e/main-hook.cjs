// Yalnızca E2E testleri için: Electron'a `-r` ile önceden yüklenir.
// Testlerin ana süreç modüllerine (tray, window) erişebilmesini sağlar; uygulama kodunu değiştirmez.
globalThis.__morrowRequire = require;
