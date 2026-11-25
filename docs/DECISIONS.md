# Morrow — DECISIONS

Dokümanlar arasındaki çelişkiler ve açık kararlar için verilen kararlar.
Bu dosya, diğer dokümanlarla çeliştiğinde önceliklidir.

| # | Konu | Karar | Kaynak çelişki / açık nokta |
|---|---|---|---|
| D-01 | Pencere kapatma | × widget'ı gizler, uygulama sistem tepsisinde çalışır. Tamamen kapatma yalnızca tepsideki **Quit** ile. | TRD §5.4 ↔ APP_FLOW §9 |
| D-02 | Kapatma butonu | Küçük × başlık alanında, yalnızca hover'da görünür. | Taslak görselde × yok |
| D-03 | Kart düzeni | Görsel referans alınır: `tutamaç · öncelik noktası · metin ... ×`. Tutamaç ve × yalnızca hover'da belirginleşir. | UI_SPEC §7 (nokta sağda) ↔ taslak görsel |
| D-04 | Fontlar | Başlık: **Caveat**. Görev metni ve tarih: **Lora**. Fontlar uygulamayla yerel paketlenir; internete bağımlı değildir. | Dokümanlarda font adı yok |
| D-05 | Çiçek görseli | Pastel şeftali / açık pembe, ince yeşil yapraklı, suluboya tarzı, **şeffaf arka planlı PNG**, sağ üst köşe kompozisyonu. Geçici/rastgele görsel kullanılmaz. **Asset henüz yok → yapılacak iş.** | `flower.png` mevcut değil |
| D-06 | Varsayılan ayarlar | İlk kurulumda **Always on Top: kapalı**, **Launch on Windows Startup: kapalı**. | TRD §11 (5, 6) |
| D-07 | Klasör yapısı | PROJECT_STRUCTURE.md esas alınır. | TRD §7 ↔ PROJECT_STRUCTURE |
| D-08 | "None" önceliği | Veri modelinde `priority`: `high` \| `medium` \| `low` \| `none`. Yeni görev varsayılanı `none`. | TRD §4.4 ↔ APP_FLOW §4 |
| D-09 | Placeholder | `Add a little task...` (UI_SPEC). | UI_SPEC ↔ taslak görsel |
| D-10 | Escape (düzenleme) | Değişikliği iptal eder, eski metne döner. | APP_FLOW §4 açık nokta |
| D-11 | Sürümler / paketleme | Electron 31.7.7 (bilgisayardaki önbellekte mevcut; yavaş internet nedeniyle seçildi, ileride güncellenebilir), paketleme electron-builder (NSIS) — Faz 8'de eklenecek. | TRD §11 (1, 2) |
| D-12 | Pencere biçimi | 340×320 (D-23), çerçevesiz; 16 px yuvarlak köşe için şeffaf pencere, içerik kartı opak. | UI_SPEC §2 |
| D-13 | Ayar dosyası | Pencere konumu ve ayarlar `%APPDATA%/Morrow/settings.json` içinde (görevlerden ayrı). İlk açılışta ve kayıtlı konum hiçbir ekranda görünmüyorsa pencere ekran ortasında açılır. | TRD §5.2, APP_FLOW §2 ("varsayılan konum" tanımsız) |
| D-14 | Widget gölgesi | Gölgesiz. Pencere tam 340×460, 16 px yuvarlak köşeli. | UI_SPEC §2 "Soft shadow" ↔ şeffaf pencere |
| D-15 | Completed varsayılanı | Her açılışta kapalı başlar, durum kaydedilmez. | UI_SPEC §9 |
| D-16 | Süsler | Başlık yanında ♡; tarih altında ve Completed üstünde ince ayırıcı çizgi (taslak görsel). | UI_SPEC'te yok |
| D-17 | None önceliği | Gösterge yok; kart hover'da soluk boş halka görünür, menü buradan açılır. | UI_SPEC §7 |
| D-18 | Kart rengi | Kartlar UI_SPEC'teki krem renkte (taslak görselde kart zemini yok). | UI_SPEC §6 ↔ taslak görsel |
| D-19 | Uzun görev metni | Kartlar aynı yükseklikte kalır; uzun metin tek satırda `…` ile kısalır, tamamı fareyle üzerine gelince görünür. | UI_SPEC §5 "aynı boyut" |
| D-20 | Tamamlanmış kart | Tutamaç ve × yok; yalnızca ↶. Öncelik noktası soluk gösterilir. | UI_SPEC §8, APP_FLOW §5 |
| D-21 | Boş liste çiçeği | Kullanıcının verdiği nilüfer görseli: `lotus.png` (arka planı temizlenmiş). | UI_SPEC §10 |
| D-22 | Kağıt dokusu | `paper-texture.png` kodla üretilmiş, çok hafif, tekrarlanabilir gren dokusu. El çizimi çizgi: `strike.svg`. | UI_SPEC §1 |
| D-23 | Widget yüksekliği | **340×320 px** (UI_SPEC §2 ve IMPLEMENTATION_PLAN Faz 2: 460 px; 230 px denendi, çok dar bulundu). Liste ve Completed bölümü bu alanda kendi içinde kayar. | Kullanıcı kararı |
| D-24 | Tamamlanma zamanı | Veri modeline `completedAt` (ISO tarih veya `null`) eklendi. Completed listesi en son tamamlanan üstte sıralanır. Tamamlanan görev eski `order` değerini saklar, ↶ ile o konuma döner. | TRD §4.4 "en az şu alanlar", APP_FLOW §5 |
| D-25 | Boş düzenleme | Düzenlemede metin boş bırakılırsa eski metin korunur. | US-01 "boş görev eklenemez" |
| D-26 | Tek/çift tıklama | Tek tıklama 350 ms bekler; bu sürede çift tıklama gelirse düzenleme açılır, tamamlama olmaz. | APP_FLOW §4 teknik not |
| D-27 | Otomatik yükseklik | Genişlik sabit 340 px. Yükseklik içeriğe göre ayarlanır (120–320 px): Completed kapalıyken ve az görevde alttaki boş alan kalkar. 320 px'i aşan içerik liste içinde kayar. Kullanıcı elle boyutlandıramaz. | UI_SPEC §2 "sabit boyut" — kullanıcı kararıyla değişti |
| D-28 | Kompakt boş liste | "Nothing to do yet!" ve küçük çiçek tek satırda, bir kart yüksekliğinde. İlk görev eklenince ekleme satırı yerinden oynamaz. | UI_SPEC §10 |
| D-29 | Bozuk tasks.json | Liste kilitlenir (düzenleme ve kayıt kapalı). Kalıcı bildirimde **Restore backup** (geçerli yedek varsa) ve **Start fresh** seçenekleri gösterilir. Bozuk dosya hiçbir durumda silinmez, `tasks.corrupt-<tarih>.json` adıyla saklanır. Yapısı geçersiz dosya (ör. `tasks` dizi değil, eksik/yanlış alan, tekrar eden id) da bozuk sayılır; yalnızca bilinmeyen öncelik `none`'a çevrilir. | APP_FLOW §11, TRD §11 (7) |
| D-30 | Yedek | `tasks.backup.json`: her kayıttan önce mevcut **geçerli** dosyanın kopyası. Yalnızca en güncel yedek tutulur. | APP_FLOW §10 |
| D-31 | Bildirim kullanımı | Rutin kayıtlarda bildirim gösterilmez. Kayıt hatası kalıcıdır, kullanıcı kapatana ya da sonraki kayıt başarılı olana kadar kalır. Başarı bildirimi yalnızca kurtarma sonrası çıkar, 2,5 sn'de kaybolur. | TRD §9.2, UI_SPEC §13 |
| D-32 | Simge dosyaları | Uygulama ve tepsi simgesi proje kökündeki `assets/` klasöründe (TRD §7). Çiçek görseli renderer'da (`src/renderer/assets/images/`). | TRD §7 ↔ PROJECT_STRUCTURE (simge yeri tanımsız) |
| D-33 | Completed sınırı | Completed bölümünde en son tamamlanan **5** görev gösterilir. Daha eskiler silinmez, `tasks.json`'da kalır; görünenlerden biri geri alınınca sıradaki eski görev listeye girer. | Kullanıcı kararı |
| D-34 | Görev çubuğu | Widget ve ayarlar penceresi görev çubuğunda görünmez (`skipTaskbar`); Morrow masaüstünde ve sistem tepsisinde yaşar. | Dokümanlarda yok — kullanıcı kararı |
| D-35 | Ayarlar penceresi | 290×168, çerçevesiz, widget ile aynı tasarım; aynı anda tek pencere; üstte açılır (üstte duran widget'ın arkasında kalmasın). Anahtarlar anında uygulanır, Save butonu yok. "Launch on Windows Startup" durumu Windows'un kendi kaydından okunur. | UI_SPEC §14, TRD §11 (6) |
| D-36 | Tek uygulama örneği | Morrow ikinci kez açılırsa yeni kopya başlamaz; mevcut widget gösterilir. | PROJECT_STRUCTURE §3 (main.js) |
| D-37 | Test altyapısı | Vitest 3.2.7 (birim) + @playwright/test 1.64.1 (Electron E2E). Renderer dosyaları testte `vm` ile olduğu gibi yüklenir; üretim koduna test kodu eklenmez. E2E testleri geçici `--user-data-dir` kullanır (gerçek `%APPDATA%\Morrow` verisine dokunmaz) ve Windows başlangıç kaydını taklit eder (gerçek kayıt değişmez). | TRD §10, TRD §11 (8) |
| D-38 | Paketleme | electron-builder 26.18.0, Windows x64 **NSIS** tek tıklamalı kurulum (`Morrow-Setup-<sürüm>.exe`), kullanıcı bazında kurulum (yönetici izni gerekmez). Kod imzası yok → Windows SmartScreen uyarı gösterebilir. Otomatik güncelleme yok (`publish: null`). `npm run build` ile `dist/` klasörüne üretilir. | TRD §11 (2), IMPLEMENTATION_PLAN Faz 8 |

## Bekleyen işler (assets)

- [x] `assets/icon.png` + `assets/icon.ico` — nilüfer görselinden uygulama/tepsi simgesi (16–256 px).
- [x] `src/renderer/assets/images/lotus.png` — boş liste görünümündeki küçük çiçek.

- [x] `src/renderer/assets/images/flower.png` — kullanıcının taslak görselinden kesilip arka planı temizlendi (şeffaf PNG). Daha yüksek çözünürlüklü bir versiyon gelirse aynı adla değiştirilebilir.
- [x] `src/renderer/assets/fonts/` — Caveat 500 ve Lora 400 (latin + latin-ext, Türkçe karakterler dahil), OFL lisansları klasörde.
