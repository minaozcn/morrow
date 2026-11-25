Morrow — PROJECT_STRUCTURE
1. Overview
Morrow, Electron tabanlı, HTML, Vanilla CSS ve Vanilla JavaScript kullanılarak geliştirilen bir Windows masaüstü uygulamasıdır.

Proje yapısı; uygulama mantığını, kullanıcı arayüzünü, veri yönetimini ve testleri birbirinden ayıracak şekilde tasarlanmıştır.

Temel hedefler:
- Modüler ve anlaşılır kod yapısı.
- Main Process ve Renderer ayrımı.
- Güvenli IPC iletişimi.
- Kolay bakım ve geliştirme.
- Test edilebilir bileşenler.
2. Directory Structure
Morrow/
│
├── src/
│   ├── main/
│   │   ├── main.js
│   │   ├── window.js
│   │   ├── tray.js
│   │   ├── storage.js
│   │   └── startup.js
│   │
│   ├── preload/
│   │   └── preload.js
│   │
│   └── renderer/
│       ├── index.html
│       │
│       ├── css/
│       │   ├── style.css
│       │   ├── variables.css
│       │   ├── components.css
│       │   └── animations.css
│       │
│       ├── js/
│       │   ├── app.js
│       │   ├── tasks.js
│       │   ├── priorities.js
│       │   ├── interactions.js
│       │   └── notifications.js
│       │
│       └── assets/
│           ├── images/
│           │   └── flower.png
│           └── fonts/
│
├── tests/
│   ├── unit/
│   └── e2e/
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md


3. Main Process
Main Process, Electron uygulamasının temel yönetim katmanıdır.
main.js
- Electron uygulamasını başlatır.
- Uygulama yaşam döngüsünü yönetir.
- Diğer Main Process modüllerini başlatır.
- Tek uygulama örneği kontrolünü yönetir.
window.js
- Ana widget penceresini oluşturur.
- Pencerenin sabit boyutlarını belirler.
- Always on Top davranışını yönetir.
- Pencerenin son konumunu saklar.
- Kapatma işleminin uygulamayı sonlandırmak yerine gizlemesini sağlar.
tray.js
- Windows sistem tepsisi simgesini oluşturur.
- Simgeye tek tıklamayla widget'ı açar.
- Sağ tıklama menüsünü oluşturur.
- Open, Settings ve Quit seçeneklerini yönetir.
storage.js
- JSON dosyasını yönetir.
- Görevleri yükler ve kaydeder.
- Veri değişikliklerinden önce yedek oluşturur.
- Bozuk JSON ve yedekten geri yükleme süreçlerini yönetir.
startup.js
- Windows başlangıç ayarını yönetir.
- Kullanıcının otomatik başlatma tercihini uygular.
4. Preload
preload.js
Renderer ile Main Process arasındaki güvenli iletişimi sağlar.
- Gerekli IPC metotlarını kontrollü şekilde dışarı açar.
- Dosya sistemine doğrudan erişim sağlamaz.
- Renderer tarafına Node.js erişimi vermez.
- Yalnızca ihtiyaç duyulan API'leri sunar.
5. Renderer
Renderer, kullanıcı arayüzünün bulunduğu katmandır.
index.html
- Ana widget HTML yapısını içerir.
- CSS ve JavaScript dosyalarını yükler.
CSS
style.css
- Ana stil dosyası.
- Diğer CSS dosyalarını bir araya getirir.
variables.css
- Renk paleti.
- Font değişkenleri.
- Boyutlar.
- Kenar boşlukları.
- Gölge değerleri.
components.css
- Görev kartları.
- Başlık alanı.
- Öncelik göstergeleri.
- Ayarlar ve bildirim bileşenleri.
animations.css
- Hover efektleri.
- Görev tamamlama animasyonu.
- Geri yükleme animasyonu.
- Menü geçişleri.
JavaScript
app.js
- Arayüzün başlangıç işlemlerini yönetir.
- Uygulama bileşenlerini başlatır.
tasks.js
- Görev ekleme.
- Görev düzenleme.
- Görev silme.
- Görev tamamlama.
- Görev geri yükleme.
priorities.js
- Öncelik seçimini yönetir.
- Öncelik göstergelerini günceller.
interactions.js
- Drag and drop.
- Kart etkileşimleri.
- Tıklama ve çift tıklama ayrımı.
- Kullanıcı etkileşimleri.
notifications.js
- Başarı bildirimleri.
- Hata bildirimleri.
- Veri kurtarma bildirimleri.
6. Assets
images/
Uygulamanın görsel dosyalarını içerir.

- flower.png: Ana widget üzerinde kullanılacak suluboya çiçek illüstrasyonu.
fonts/
Uygulamanın kullandığı font dosyalarını içerir.
- Handwritten title font.
- Vintage serif task font.
Fontlar mümkün olduğunca yerel olarak uygulamayla birlikte sunulmalıdır.
7. Tests
unit/
Vitest kullanılarak gerçekleştirilecek birim testleri içerir.

Test edilecek temel alanlar:
- Görev işlemleri.
- Öncelik işlemleri.
- Veri yönetimi.
- Sıralama mantığı.
e2e/
Playwright ve Electron E2E testlerini içerir.

Test edilecek temel süreçler:
- Uygulamanın açılması.
- Görev eklenmesi.
- Görev düzenlenmesi.
- Görev silinmesi.
- Görev tamamlanması.
- Görev geri yüklenmesi.
- Sistem tepsisi davranışları.
- Ayarlar.
8. Architecture Rules
Aşağıdaki kurallar proje genelinde korunmalıdır:
1. Renderer doğrudan Node.js veya dosya sistemine erişmemelidir.
2. Main Process veri yönetiminden sorumludur.
3. Renderer ve Main Process arasındaki iletişim IPC üzerinden gerçekleşmelidir.
4. Preload yalnızca gerekli ve güvenli metotları dışarı açmalıdır.
5. contextIsolation etkin olmalıdır.
6. nodeIntegration kapalı olmalıdır.
7. JavaScript kodları sorumluluklarına göre modüllere ayrılmalıdır.
8. Kullanıcı arayüzü ve veri yönetimi birbirinden bağımsız tutulmalıdır.
9. Development Principles
- Vanilla JavaScript kullanılacaktır.
- React, Vue veya Angular kullanılmayacaktır.
- Gereksiz bağımlılıklardan kaçınılacaktır.
- Kod okunabilir ve modüler olmalıdır.
- Her modül belirli bir sorumluluğa sahip olmalıdır.
- MVP kapsamı dışında özellik eklenmemelidir.