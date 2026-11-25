Morrow — APP_FLOW
1. Overview
Morrow, Windows masaüstünde çalışan, küçük boyutlu ve her zaman erişilebilir bir yapılacaklar listesi uygulamasıdır.

Uygulamanın temel amacı, kullanıcıların günlük görevlerini hızlıca ekleyip yönetebilmesini sağlamaktır. Sade bir kullanım deneyimi, vintage botanical görsel tasarım ve çevrimdışı çalışma prensibi benimsenmiştir.
2. Launch Flow
İlk açılış
1. Uygulama boş bir görev listesiyle açılır.
2. Örnek görevler gösterilmez.
3. Henüz JSON dosyası yoksa otomatik olarak oluşturulur.
4. Widget varsayılan konumunda açılır.
Sonraki açılışlar
1. Kayıtlı aktif ve tamamlanmış görevler yüklenir.
2. Widget son kaydedilen ekran konumunda açılır.
3. Windows başlangıcında otomatik çalıştırma etkinse uygulama otomatik başlatılır.
Tarih gösterimi
- Uygulama başlığının altında gün ve tarih gösterilir.
- Tarih, Windows'un yerel tarihine göre otomatik güncellenir.
3. Main Widget
Görsel tasarım
- Sabit boyutlu ve yeniden boyutlandırılamayan bir pencere.
- Mat, adaçayı yeşili tonlarında arka plan.
- Hafif kâğıt dokusu.
- Yuvarlatılmış köşeler.
- Belirgin çerçeve yerine yumuşak gölge.
- Sağ üst köşede sabit bir suluboya çiçek ve küçük yaprak detayları.
- Çiçek tasarımı her açılışta aynı kalır.
- Ana başlık: my little list
- Başlık fontu: el yazısı tarzında.
- Görev fontu: okunaklı vintage serif.
- Görev kartları: krem rengi, yuvarlatılmış köşeli ve hafif kabartma efektli.
- Görev kartlarının renkleri aynı kalır. Öncelikler renkli noktalarla belirtilir.
- Kartın üzerine gelindiğinde çok hafif yukarı kalkma animasyonu uygulanır.
MVP sürümünde tema, yazı tipi veya renk özelleştirmesi bulunmaz.
Pencere hareketi
- Widget'ın son konumu kaydedilir.
- Kullanıcı widget'ı yalnızca başlık alanından sürükleyerek taşıyabilir.
- Diğer alanlar pencereyi hareket ettirmez.
Görev listesi
- Görev sayısı arttığında liste kendi içinde kaydırılabilir.
- Widget'ın boyutu değişmez.
Boş liste görünümü
Aktif görev bulunmadığında:
- Küçük bir çiçek illüstrasyonu gösterilir.
- Nothing to do yet! metni görünür.
- Örnek görev gösterilmez.
4. Task Management
Görev ekleme
1. Aktif görevlerin altında boş bir giriş satırı bulunur.
2. Kullanıcı satıra tıklayıp görevini yazar.
3. Enter tuşuna basınca görev eklenir.
4. Yeni görev listenin en altına yerleştirilir.
5. Görev otomatik kaydedilir.
6. Yeni bir boş satır açılır ve giriş alanı yeniden odaklanır.
Yeni görevlerin varsayılan önceliği None olur.
Görev düzenleme
1. Kullanıcı görev metnine çift tıklar.
2. Metin bulunduğu kartın içinde düzenlenebilir hâle gelir.
3. Enter tuşuyla değişiklik kaydedilir.
4. Düzenleme alanından çıkıldığında da değişiklik kaydedilir.
5. Değişiklikler otomatik kaydedilir.
Escape ile düzenlemeyi iptal etme davranışı henüz kesinleştirilmemiştir.
Görev silme
1. Kullanıcı görev kartının üzerine gelir.
2. Kartta küçük bir × simgesi belirir.
3. Simgeye tıklandığında görev doğrudan silinir.
4. Onay penceresi gösterilmez.
5. Silme işlemi otomatik kaydedilir.
Görev tamamlama
1. Kullanıcı aktif görev kartının herhangi bir yerine tıklar.
2. Görev metninin üzeri el çizimi tarzında düzensiz bir çizgiyle çizilir.
3. Tik işareti kullanılmaz.
4. Kısa bir animasyon oynatılır.
5. Görev Completed bölümüne taşınır.
6. İşlem otomatik kaydedilir.
7. Onay penceresi gösterilmez.
Teknik not: Kartın tek tıklamayla tamamlanması, görev metninin çift tıklamayla düzenlenmesiyle çakışmamalıdır. İlk tıklama, çift tıklama gerçekleşmeden görevi tamamlamamalıdır.
5. Completed Tasks
- Aktif görevlerin altında küçük ve daraltılabilir bir Completed başlığı bulunur.
- Tamamlanmış görev yoksa No completed tasks yet metni gösterilir.
- Tamamlanan görevler de krem renkli kartlarla gösterilir.
- Görev metninin üzerindeki el çizimi tarzındaki çizgi korunur.
- Kartın üzerine gelindiğinde küçük bir geri alma oku ↶ belirir.
- Ok tıklandığında görev aktif listeye geri taşınır.
- Görevin önceliği korunur.
- Mümkün olduğunda önceki sıralaması da korunur.
- Geri alma işlemi otomatik kaydedilir.
6. Priority System
Öncelik göstergeleri
Öncelik	Gösterge
High	Kırmızı nokta
Medium	Sarı nokta
Low	Yeşil nokta
None	Gösterge yok

Öncelik değiştirme
1. Kullanıcı görev kartındaki öncelik noktasına tıklar.
2. Küçük bir seçim menüsü açılır.
3. High, Medium, Low ve None seçenekleri gösterilir.
4. Kullanıcı seçim yaptığında görev güncellenir.
5. Değişiklik otomatik kaydedilir.
7. Manual Sorting
- Görevler sürükle-bırak yöntemiyle sıralanır.
- Sürükleme yalnızca kartın sol tarafındaki küçük tutamaç üzerinden yapılabilir.
- Görev bırakıldığında yeni sıralama uygulanır.
- Sıralama otomatik kaydedilir.
- Yeni görevler listenin sonuna eklenir.
8. Settings
Ayarlar ayrı ve küçük bir pencerede açılır.

Yalnızca iki ayar bulunur:

Launch on Windows Startup
- Uygulamanın Windows açılışında otomatik çalışmasını sağlar.
- Kullanıcı tarafından açılıp kapatılabilir.
Always on Top
- Widget'ın diğer pencerelerin üzerinde kalmasını sağlar.
- Kullanıcı tarafından açılıp kapatılabilir.
Ek davranışlar:
- Ayarlar penceresi kapatıldığında yalnızca ayarlar kapanır.
- Morrow arka planda çalışmaya devam eder.
- MVP sürümünde başka özelleştirme ayarı bulunmaz.
9. System Tray
Widget'ı kapatma
- Kullanıcı pencerenin × simgesine tıkladığında widget gizlenir.
- Uygulama Windows sistem tepsisinde çalışmaya devam eder.
- Uygulama tamamen kapatılmaz.
Sistem tepsisi etkileşimleri
- Sistem tepsisi simgesine tek tıklama widget'ı yeniden açar.
- Sağ tıklama menüsünde şu seçenekler bulunur:
  - Open
  - Settings
  - Quit
Quit
- Quit seçeneği uygulamayı tamamen kapatır.
10. Data Persistence
- Uygulamanın temel özellikleri internet bağlantısı olmadan çalışır.
- Görevler yerel JSON dosyasında saklanır.
Dosya konumu:
%APPDATA%/Morrow/tasks.json


- Dosya konumu Electron'un uygulama verisi dizini API'si kullanılarak belirlenir.
- Her değişiklik otomatik kaydedilir.
- Kullanıcıya ayrıca Save butonu gösterilmez.
Otomatik kayıt yapılan işlemler:
- Görev ekleme
- Görev düzenleme
- Görev silme
- Öncelik değiştirme
- Görev sıralama
- Görev tamamlama
- Tamamlanan görevi geri alma
Backup
- JSON dosyasına her veri değişikliği yazılmadan önce mevcut dosyanın yedeği alınır.
- Yalnızca en güncel yedek saklanır.
11. Error Handling
Bildirimler
- Bildirimler widget içinde küçük ve sade biçimde gösterilir.
- Başarılı işlem bildirimleri belirli bir süre sonra otomatik kaybolur.
- Kritik hatalar kullanıcı kapatana veya çözene kadar görünür kalır.
- Veri kurtarma soruları kullanıcı seçim yapana kadar ekranda kalır.
Bozuk JSON dosyası
JSON dosyası bozulduğunda:
1. Widget üzerinde kalıcı bir hata bildirimi gösterilir.
2. Yedek dosyanın bulunup bulunmadığı belirtilir.
3. Kullanıcıya yedekten geri yükleme seçeneği sunulur.
4. Kullanıcı açıkça onaylamadan geri yükleme yapılmaz.
5. Uygulama bozuk veriyi sessizce boş listeyle değiştirmez veya üzerine yazmaz.
12. MVP Scope Boundaries
Aşağıdaki özellikler MVP kapsamına dahil değildir:
- Görev son tarihleri
- Hatırlatıcılar
- İstatistikler
- Bulut senkronizasyonu
- Kullanıcı hesapları
- Kategoriler ve etiketler
- Birden fazla tema
- Yazı tipi ve renk özelleştirmesi
- Ek görev listeleri
- Sol tarafta navigasyon menüsü
13. Technical Notes
Uygulamanın geliştirilmesinde:
- Electron
- HTML
- Vanilla CSS
- Vanilla JavaScript
kullanılacaktır.
Mimari sorumluluklar
Main Process
- Uygulama yaşam döngüsünü yönetir.
- Pencere ve sistem tepsisi işlemlerini yönetir.
- JSON dosyasına erişir ve dosya işlemlerini gerçekleştirir.
Preload
- Renderer ile Main Process arasındaki güvenli iletişimi sağlar.
- Yalnızca gerekli IPC metotlarını dışarı açar.
Renderer
- Kullanıcı arayüzünü yönetir.
- Görev etkileşimlerini gerçekleştirir.
- Doğrudan Node.js veya dosya sistemine erişmez.
Güvenlik ayarları
contextIsolation: true,
nodeIntegration: false


Test altyapısı
- Vitest
- Playwright
- Electron E2E testleri