Morrow — IMPLEMENTATION_PLAN
1. Development Overview
Morrow, aşamalı geliştirme yaklaşımıyla oluşturulacaktır.

Her aşama tamamlandığında test edilecek ve sonraki aşamaya geçilecektir.

Geliştirme sırası, önce çalışan temel uygulamayı oluşturmayı, ardından özellikleri eklemeyi ve son olarak Windows dağıtımına hazırlanmayı hedefler.
2. Phase 1 — Project Setup
Amaç: Electron geliştirme ortamını hazırlamak.

Görevler:
- [ ] Node.js ve npm ortamını hazırlamak.
- [ ] Electron projesini oluşturmak.
- [ ] package.json yapılandırmasını yapmak.
- [ ] Proje klasörlerini oluşturmak.
- [ ] Main Process dosyalarını hazırlamak.
- [ ] Preload dosyasını oluşturmak.
- [ ] Renderer dosyalarını hazırlamak.
- [ ] Uygulamanın ilk kez açılmasını sağlamak.
Tamamlanma kriteri: Morrow Windows üzerinde boş bir Electron penceresi olarak çalışabilmelidir.
3. Phase 2 — Window Management
Amaç: Widget penceresinin davranışlarını oluşturmak.

Görevler:
- [ ] Pencere boyutunu 340 × 460 px olarak ayarlamak.
- [ ] Pencereyi yeniden boyutlandırılamaz yapmak.
- [ ] Pencereyi sürüklenebilir hâle getirmek.
- [ ] Son pencere konumunu kaydetmek.
- [ ] Always on Top özelliğini eklemek.
- [ ] Pencere kapatıldığında uygulamayı gizlemek.
Tamamlanma kriteri: Widget sabit boyutta çalışmalı, taşınabilmeli ve son konumunu korumalıdır.
4. Phase 3 — UI Development
Amaç: Morrow'un görsel arayüzünü oluşturmak.

Görevler:
- [ ] Sage green arka planı oluşturmak.
- [ ] Kağıt dokusu eklemek.
- [ ] my little list başlığını yerleştirmek.
- [ ] Tarih alanını eklemek.
- [ ] Suluboya çiçek illüstrasyonunu yerleştirmek.
- [ ] Görev kartlarını tasarlamak.
- [ ] Öncelik göstergelerini oluşturmak.
- [ ] Boş liste görünümünü hazırlamak.
- [ ] Completed bölümünü tasarlamak.
- [ ] Hover efektlerini eklemek.
- [ ] Kaydırma davranışını oluşturmak.
Tamamlanma kriteri: Arayüz UI_SPEC dokümanındaki tasarımla uyumlu olmalıdır.
5. Phase 4 — Task Management
Amaç: Görev yönetimi özelliklerini geliştirmek.

Görevler:
- [ ] Görev ekleme.
- [ ] Görev düzenleme.
- [ ] Görev silme.
- [ ] Görev tamamlama.
- [ ] Tamamlanan görevi geri yükleme.
- [ ] Öncelik değiştirme.
- [ ] Drag and drop sıralama.
- [ ] Görev kartı etkileşimleri.
- [ ] Otomatik kayıt tetikleyicileri.
Tamamlanma kriteri: Kullanıcı bütün temel görev işlemlerini gerçekleştirebilmelidir.
6. Phase 5 — Data Management
Amaç: Görevlerin güvenli biçimde saklanmasını sağlamak.

Görevler:
- [ ] AppData konumunu hazırlamak.
- [ ] JSON dosyası oluşturmak.
- [ ] Görevleri JSON dosyasından yüklemek.
- [ ] Görev değişikliklerini kaydetmek.
- [ ] Otomatik yedekleme oluşturmak.
- [ ] Son yedeği korumak.
- [ ] Bozuk JSON kontrolü yapmak.
- [ ] Yedekten geri yükleme mekanizmasını oluşturmak.
- [ ] Veri kurtarma bildirimlerini eklemek.
Tamamlanma kriteri: Uygulama kapatılıp açıldığında görevler kaybolmamalı ve bozuk veri durumunda kullanıcıya kurtarma seçeneği sunulmalıdır.
7. Phase 6 — System Integration
Amaç: Windows ile uygulama arasındaki entegrasyonu tamamlamak.

Görevler:
- [ ] Sistem tepsisi simgesi oluşturmak.
- [ ] Tek tıklamayla widget'ı açmak.
- [ ] Sağ tıklama menüsünü oluşturmak.
- [ ] Open seçeneğini eklemek.
- [ ] Settings penceresini oluşturmak.
- [ ] Launch on Windows Startup ayarını eklemek.
- [ ] Always on Top ayarını bağlamak.
- [ ] Quit seçeneğini eklemek.
Tamamlanma kriteri: Uygulama Windows masaüstünde arka planda çalışabilmeli ve sistem tepsisinden yönetilebilmelidir.
8. Phase 7 — Testing
Amaç: Uygulamanın kararlı çalışmasını sağlamak.
Unit Tests
- [ ] Görev ekleme testleri.
- [ ] Görev düzenleme testleri.
- [ ] Görev silme testleri.
- [ ] Öncelik testleri.
- [ ] Sıralama testleri.
- [ ] JSON kayıt testleri.
- [ ] Yedekleme testleri.
End-to-End Tests
- [ ] Uygulama açılış testi.
- [ ] Görev oluşturma testi.
- [ ] Görev tamamlama testi.
- [ ] Görev geri yükleme testi.
- [ ] Sistem tepsisi testi.
- [ ] Ayarlar testi.
- [ ] Uygulamadan çıkış testi.
Tamamlanma kriteri: Temel kullanıcı akışları hatasız çalışmalıdır.
9. Phase 8 — Build and Release
Amaç: Uygulamayı Windows'ta kullanılabilir hâle getirmek.

Görevler:
- [ ] Windows build yapılandırmasını yapmak.
- [ ] Uygulama ikonunu eklemek.
- [ ] Paketleme işlemini gerçekleştirmek.
- [ ] Kurulum dosyasını oluşturmak.
- [ ] Temiz Windows ortamında test etmek.
- [ ] Son hata kontrollerini yapmak.
Tamamlanma kriteri: Morrow Windows üzerinde kurulabilir ve çalıştırılabilir olmalıdır.
10. Development Rules
Geliştirme süresince:
1. Her aşama tamamlanmadan sonraki aşamaya geçilmemelidir.
2. Kodlar modüler yapıda tutulmalıdır.
3. Vanilla JavaScript kullanılmalıdır.
4. Güvenlik kuralları korunmalıdır.
5. Her yeni özellik test edilmelidir.
6. MVP kapsamı dışında özellik eklenmemelidir.
7. Tasarım kararları UI_SPEC dokümanına uygun olmalıdır.
11. Final Goal
Morrow'un ilk sürümü:
- Windows üzerinde çalışan,
- Çevrimdışı kullanılabilen,
- Görevleri yerel olarak saklayan,
- Sistem tepsisinde çalışabilen,
- Otomatik kayıt ve yedekleme sunan,
- Vintage botanical tasarıma sahip,
- Küçük ve kullanışlı bir masaüstü widget'ı olmalıdır.