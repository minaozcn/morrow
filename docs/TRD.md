Morrow
Technical Requirements Document (TRD)
Doküman türü: Technical Requirements Document
Ürün adı: Morrow
Platform: Windows
Sürüm kapsamı: MVP
Doküman durumu: İlk teknik gereksinim taslağı
1. Technical Overview
Morrow, Windows üzerinde çalışan, masaüstünde küçük bir widget olarak
kullanılacak görev takip uygulamasıdır. Uygulama Electron altyapısıyla
geliştirilecek; arayüzde HTML, Vanilla CSS ve Vanilla JavaScript
kullanılacaktır.

Görev verileri internet veya bulut hizmeti gerektirmeden kullanıcının
bilgisayarında JSON dosyası olarak saklanacaktır. Uygulama; görev
ekleme, düzenleme, silme, tamamlama, öncelik belirleme ve görevleri
sürükle-bırak yöntemiyle sıralama özelliklerini destekleyecektir.
1.1 Temel teknik gereksinimler
- Uygulama Windows işletim sisteminde çalışmalıdır.
- Masaüstü widget'ı sabit boyutlu olmalıdır.
- Kullanıcı widget'ı masaüstünde sürükleyerek taşıyabilmelidir.
- Widget'ın diğer pencerelerin üzerinde kalma özelliği kullanıcı
  tarafından açılıp kapatılabilmelidir.
- Uygulama Windows açılışında otomatik başlatılabilmelidir.
- Görev verileri yerel olarak saklanmalıdır.
- Temel görev yönetimi özellikleri internet bağlantısı olmadan
  çalışmalıdır.
2. Technology Stack
Morrow'un MVP sürümünde aşağıdaki teknolojiler kullanılacaktır.
  Katman                  Teknoloji               Kullanım amacı
  Desktop Framework       Electron                Windows masaüstü
uygulamasını oluşturmak

  UI Structure            HTML                    Arayüzün yapısını
oluşturmak

  Styling                 Vanilla CSS             Görsel tasarım ve düzen

  Programming Language    Vanilla JavaScript      Uygulama ve görev
işlemleri

  Data Storage            JSON                    Görev verilerini yerel
saklamak

  Unit Testing            Vitest                  JavaScript
fonksiyonlarını test
etmek
UI / End-to-End Testing Playwright              Arayüz ve kullanıcı
akışlarını test etmek
React, Bootstrap ve Tailwind CSS MVP kapsamında kullanılmayacaktır.
Arayüz doğrudan HTML, CSS ve Vanilla JavaScript ile geliştirilecektir.
3. Application Architecture
Uygulama Electron'un Main Process, Preload ve Renderer Process ayrımına
göre yapılandırılacaktır.
3.1 Main Process
Main Process, Electron uygulamasının ana süreç katmanıdır.

Sorumlulukları:
- Ana pencereyi oluşturmak ve yönetmek.
- Pencerenin sabit boyutlu olmasını sağlamak.
- Pencerenin masaüstünde taşınabilmesini sağlamak.
- Always on Top özelliğini yönetmek.
- Uygulamanın açılış ve kapanış yaşam döngüsünü yönetmek.
- JSON dosyasına erişim ve dosya işlemlerini gerçekleştirmek.
- Renderer tarafından gelen izinli istekleri işlemek.
3.2 Preload Script
Preload, Main Process ile Renderer Process arasında güvenli bir iletişim
katmanı sağlayacaktır.

Gereksinimler:
- Renderer'a yalnızca ihtiyaç duyulan fonksiyonlar açılmalıdır.
- Genel ve sınırsız bir IPC erişimi sağlanmamalıdır.
- Dosya sistemi erişimi doğrudan Renderer'a verilmemelidir.
- Açığa çıkarılan API'ler açıkça tanımlanmalı ve doğrulanmalıdır.
3.3 Renderer Process
Renderer Process, kullanıcının gördüğü arayüzü çalıştıracaktır.

Sorumlulukları:
- HTML arayüzünü görüntülemek.
- CSS ile tasarımı uygulamak.
- Görev listesini göstermek.
- Görev ekleme, düzenleme, silme ve tamamlama etkileşimlerini
  yönetmek.
- Öncelik seçimini ve Drag & Drop sıralamasını yönetmek.
- Kullanıcıya uygulama içi bildirimler göstermek.
- Veri işlemleri için Preload üzerinden sunulan güvenli API'leri
  çağırmak.
3.4 Process communication
Main ve Renderer süreçleri arasında Electron IPC mekanizması
kullanılacaktır. Renderer yalnızca Preload üzerinden açıkça tanımlanmış
işlemleri çağırabilecektir.
3.5 Architecture overview
Main Process
  - Window management
  - Application lifecycle
  - JSON file operations
          |
          | IPC
          v
Preload Script
  - Limited and secure API
          |
          v
Renderer Process
  - HTML
  - Vanilla CSS
  - Vanilla JavaScript
  - User interface
          |
          | Data requests through Preload
          v
Local JSON Storage
4. Data Storage Requirements
4.1 Storage format
Görev verileri JSON formatında saklanacaktır. MVP sürümünde SQLite veya
bulut tabanlı bir veri tabanı kullanılmayacaktır.
4.2 Storage location
JSON dosyası Windows kullanıcı profili altındaki uygulama verileri
klasöründe tutulacaktır:
%APPDATA%/Morrow/tasks.json
Dosya yolu uygulama tarafından Electron'un uygun uygulama veri dizini
API'si kullanılarak oluşturulmalıdır; sabit bir kullanıcı adı veya
bilgisayara özel yol kod içine yazılmamalıdır.
4.3 Data persistence
- Görev ekleme, düzenleme, silme, tamamlama ve öncelik değişiklikleri
  kalıcı olarak kaydedilmelidir.
- Drag & Drop sonrasında oluşan yeni görev sırası kaydedilmelidir.
- Uygulama yeniden başlatıldığında kayıtlı görevler yüklenmelidir.
- Uygulama penceresinin kapatılması görev verilerini silmemelidir.
- Uygulama ilk kez çalıştığında veri dosyası mevcut değilse geçerli
  bir başlangıç dosyası oluşturulmalıdır.
4.4 Data model
Her görev için en az aşağıdaki alanlar saklanmalıdır:

  Alan          Tür       Açıklama
  id          String    Görevin benzersiz kimliği
title       String    Görev metni
priority    String    high, medium veya low
completed   Boolean   Görevin tamamlanma durumu
order       Number    Aktif görevler arasındaki sıralama değeri

Örnek veri:
{
  "tasks": [
    {
      "id": "task-001",
      "title": "YBS ödevini tamamla",
      "priority": "high",
      "completed": false,
      "order": 1
    },
    {
      "id": "task-002",
      "title": "Sunum hazırla",
      "priority": "medium",
      "completed": false,
      "order": 2
    }
  ]
}
Bu örnek veri yapısını gösterir; gerçek uygulamada görev kimlikleri
benzersiz şekilde üretilmelidir.
4.5 File integrity
- Dosya okunurken JSON parse hataları kontrol edilmelidir.
- Geçersiz veya eksik veri beklenmedik uygulama davranışına neden
  olmamalıdır.
- Kayıt işlemlerinde geçici dosyaya yazma ve ardından güvenli
  değiştirme yaklaşımı değerlendirilmelidir.
- Kayıt başarısız olursa kullanıcı bilgilendirilmeli ve hata sessizce
  yok sayılmamalıdır.
5. Window Management
5.1 Window dimensions
- Widget sabit boyutlu olacaktır.
- Kullanıcı pencereyi yeniden boyutlandıramayacaktır.
- Genişlik ve yükseklik geliştirme sırasında belirlenecek ve Electron
  pencere ayarlarında uygulanacaktır.
5.2 Window position
- Kullanıcı widget'ı masaüstünde sürükleyerek taşıyabilmelidir.
- Pencere boyutu değiştirilememelidir.
- Pencerenin son konumunun sonraki açılışta korunması istenen
  davranıştır; bunun MVP kapsamındaki kesin uygulaması geliştirme
  sırasında netleştirilecektir.
5.3 Always on Top
- Widget'ın diğer pencerelerin üzerinde kalma özelliği bulunmalıdır.
- Kullanıcı bu özelliği açıp kapatabilmelidir.
- Özellik açıkken pencere diğer normal pencerelerin üzerinde
  kalmalıdır.
- Özellik kapalıyken pencere normal Windows pencere sıralamasına
  katılmalıdır ve başka pencerelerin arkasında kalabilmelidir.
Electron tarafında pencerenin üstte kalma davranışı setAlwaysOnTop()
ile yönetilebilir.
5.4 Closing the window
- Kullanıcı widget'ı kapatabilmelidir.
- Pencerenin kapatılması görev verilerini silmemelidir.
- Uygulama tekrar açıldığında görevler JSON dosyasından yüklenmelidir.
- Pencereyi kapatma davranışının uygulamayı tamamen sonlandırması
  hedeflenmektedir.
6. Application Lifecycle
6.1 Startup
- Morrow Windows açılışında otomatik başlatılabilmelidir.
- Uygulama başlatıldığında gerekli pencere oluşturulmalıdır.
- Yerel JSON verileri okunmalı ve görev listesi yüklenmelidir.
- Veri dosyası yoksa başlangıç dosyası oluşturulmalıdır.
6.2 Automatic startup
Electron'un Windows oturum açılışında uygulamayı başlatma ayarları
kullanılacaktır. Otomatik başlatma davranışı kullanıcı tarafından daha
sonra kapatılabilecek şekilde tasarlanmalıdır. Bu kontrolün arayüzde
nasıl sunulacağı geliştirme sırasında netleştirilecektir.
6.3 Runtime
- Kullanıcı arayüzündeki görev değişiklikleri ilgili veri işlemlerini
  tetiklemelidir.
- Başarılı değişiklikler yerel JSON dosyasına kaydedilmelidir.
- Veri işlemleri sırasında oluşan hatalar kullanıcıya bildirilmelidir.
6.4 Shutdown
- Uygulama kapatılırken görev verileri zaten kalıcı olarak kaydedilmiş
  olmalıdır.
- Pencerenin kapatılması görev listesini temizlememelidir.
- Uygulama yeniden başlatıldığında son kaydedilmiş veriler
  yüklenmelidir.
7. Project Structure
Morrow için önerilen proje klasör yapısı:
Morrow/
│
├── src/
│   ├── main/
│   │   └── main.js
│   │
│   ├── preload/
│   │   └── preload.js
│   │
│   └── renderer/
│       ├── index.html
│       ├── css/
│       │   └── style.css
│       │
│       └── js/
│           ├── app.js
│           ├── tasks.js
│           └── storage.js
│
├── assets/
│   └── icon.png
│
├── package.json
└── README.md
7.1 File responsibilities
  Dosya                               Sorumluluk
  main.js                           Electron penceresi, uygulama yaşam
döngüsü ve ana süreç işlemleri

  preload.js                        Renderer'a güvenli API sunmak

  index.html                        Ana arayüzün HTML yapısı

  style.css                         Arayüzün görsel tasarımı

  app.js                            Arayüzün genel davranışı ve olay
yönetimi

  tasks.js                          Görev oluşturma, düzenleme, silme,
tamamlama ve sıralama

  storage.js                        Renderer tarafındaki veri erişim
katmanını düzenlemek; gerçek dosya
işlemleri Main Process üzerinden
güvenli API ile yürütülür

  icon.png                          Uygulama simgesi
package.json                      Proje bağımlılıkları ve komutları
8. Security Requirements
Electron uygulamasında Main ve Renderer süreçlerinin yetkileri
birbirinden ayrılmalıdır.

Zorunlu güvenlik ayarları:
- contextIsolation: true olmalıdır.
- nodeIntegration: false olmalıdır.
- Renderer doğrudan Node.js veya dosya sistemi API'lerine
  erişememelidir.
- Preload üzerinden yalnızca gerekli ve sınırlandırılmış fonksiyonlar
  açılmalıdır.
- IPC kanalları açıkça tanımlanmalı ve gelen veriler doğrulanmalıdır.
- Kullanıcı girdileri güvenli biçimde işlenmelidir.
- HTML içerisine kullanıcı girdisi kontrolsüz biçimde
  yerleştirilmemelidir.
9. Error Handling
Uygulama, beklenen hata durumlarını kontrol etmeli ve kullanıcıya
anlaşılır geri bildirim sunmalıdır.
9.1 Error scenarios
  Durum                               Beklenen davranış
  JSON dosyası bulunamadı             Başlangıç dosyası oluşturulur

  JSON dosyası bozuk                  Hata kontrol edilir ve kullanıcı
bilgilendirilir

  Boş görev eklenmeye çalışıldı       Görev eklenmez

  Veri kaydedilemedi                  Kullanıcıya hata bildirimi
gösterilir

  Veri okunamadı                      Hata sessizce yok sayılmaz;
kullanıcı bilgilendirilir
Beklenmeyen hata oluştu             Uygulama mümkün olduğunca kontrollü
davranır
9.2 Notification design
- Hata ve başarı bildirimleri Morrow'un kendi arayüzünde
  gösterilmelidir.
- Windows sistem bildirimleri MVP için kullanılmayacaktır.
- Bildirim metinleri kısa ve anlaşılır olmalıdır.
- Normal başarı bildirimleri kısa süre sonra kaybolabilir.
- Kritik veri kaydetme hataları kullanıcı fark edene kadar görünür
  kalmalıdır.
9.3 Data safety
Kayıt sırasında dosyanın yarım yazılması riskini azaltmak için geçici
dosyaya yazma ve başarılı yazım sonrasında asıl dosyayla değiştirme
yaklaşımı uygulanmalıdır. Hata durumunda son başarılı verinin korunması
hedeflenmelidir.
10. Testing Requirements
Morrow'da otomatik test yaklaşımı kullanılacaktır.
10.1 Unit Tests
Araç: Vitest

Test edilecek alanlar:
- Görev oluşturma.
- Görev düzenleme.
- Görev silme.
- Görev tamamlama ve tekrar aktifleştirme.
- Öncelik belirleme.
- Görev sıralama mantığı.
- Boş veya geçersiz görev verilerinin kontrolü.
10.2 Integration Tests
Araç: Vitest ve uygun test yardımcıları

Test edilecek alanlar:
- Görev verilerinin JSON formatına dönüştürülmesi.
- JSON verilerinin okunması.
- Görev değişikliklerinin kaydedilmesi.
- Dosya bulunamadığında başlangıç verisinin oluşturulması.
- Bozuk veya geçersiz JSON verisinin hata yönetimi.
- Kaydetme ve yükleme sonrasında görev bilgilerinin korunması.
10.3 UI / End-to-End Tests
Araç: Playwright

Test edilecek alanlar:
- Görev ekleme arayüzü.
- Görev düzenleme ve silme etkileşimleri.
- Tamamlanan görevlerin ayrı bölümde gösterilmesi.
- Öncelik seçimi.
- Drag & Drop etkileşimi.
- Uygulamanın temel kullanıcı akışları.
10.4 Application Tests
Electron uygulamasının gerçek çalışma ortamında aşağıdaki davranışlar
test edilmelidir:
- Pencerenin oluşturulması.
- Pencerenin sabit boyutlu olması.
- Pencerenin taşınabilmesi.
- Always on Top özelliğinin açılıp kapatılması.
- Pencerenin kapatılmasının görev verilerini silmemesi.
- Windows başlangıcında otomatik başlatma davranışı.
10.5 Test principle
Testler, uygulamanın yalnızca arayüzde doğru görünmesini değil,
verilerin doğru kaydedilip yeniden yüklenmesini de doğrulamalıdır.
Testler mümkün olduğunca birbirinden bağımsız ve tekrarlanabilir
olmalıdır.
11. Open Technical Decisions
Aşağıdaki ayrıntılar henüz kesinleştirilmemiştir ve geliştirme öncesinde
veya ilgili özellik uygulanırken karara bağlanacaktır:
1. Electron ve Node.js sürümleri.
2. Uygulamanın paketlenmesi ve Windows kurulum dosyasının oluşturulması
   için kullanılacak araç.
3. Widget'ın kesin genişlik ve yükseklik değerleri.
4. Pencerenin son konumunun kaydedilip kaydedilmeyeceği.
5. Always on Top ayarının varsayılan durumu.
6. Windows otomatik başlatma ayarının kullanıcı arayüzünde nasıl
   kontrol edileceği.
7. JSON dosyası bozulduğunda kurtarma ve yedekleme stratejisinin
   ayrıntıları.
8. Playwright ile Electron uygulamasının uçtan uca test ortamının
   kurulumu.
12. Document Status
Bu doküman, Morrow MVP sürümü için birlikte belirlenen teknik kararları
ve gereksinimleri tanımlar. Açık teknik kararlar geliştirme sürecinde
netleştirilecektir.