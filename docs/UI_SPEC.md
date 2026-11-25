Morrow — UI_SPEC
1. Design Overview
Morrow, vintage botanical estetiğe sahip, küçük boyutlu bir Windows masaüstü görev widget'ıdır.

Tasarımın temel amacı, kullanıcıya sakin, sıcak ve düzenli bir çalışma alanı sunmaktır.

Görsel dil şu özelliklere dayanır:
- Vintage botanical aesthetic
- Soft watercolor illustrations
- Muted sage green tones
- Warm cream paper surfaces
- Handwritten typography
- Subtle paper textures
- Minimal and elegant interactions
Arayüz sade tutulmalıdır. Dekoratif unsurlar görev listesinin önüne geçmemelidir.
2. Widget Dimensions
Özellik	Değer
Width	340 px
Height	460 px
Resizable	No
Border Radius	16 px
Inner Padding	20 px
Window Shadow	Soft
Background	Opaque

Widget sabit boyutlu olmalıdır. Kullanıcı pencereyi yeniden boyutlandıramaz.

Pencere yalnızca başlık alanından sürüklenerek taşınabilir.
3. Color Palette
Morrow'un renk paleti doğal, yumuşak ve düşük doygunluklu tonlardan oluşur.

| Kullanım | Renk | HEX |
|---|---|---|
| Main Background | Sage Green | #A5B49B |
| Dark Sage | #71846D |
| Dark Text | Deep Olive | #435440 |
| Secondary Text | Muted Green | #64725E |
| Task Card | Warm Cream | #F5EBD9 |
| Card Text | Warm Brown | #514B40 |
| Muted Text | Soft Gray | #8B8A78 |
| High Priority | Dusty Red | #C76F68 |
| Medium Priority | Mustard Yellow | #D7B65D |
| Low Priority | Muted Green | #799B72 |

Renkler arasında sert kontrastlar kullanılmamalıdır.

Arayüz genelinde pastel ve doğal tonlar korunmalıdır.
4. Typography
Arayüzde iki temel yazı karakteri kullanılacaktır.
Main Title
- Text: my little list
- Style: Handwritten
- Appearance: Natural, soft and slightly playful
- Color: Dark Sage
- Font size: Approximately 27–30 px
Başlık, uygulamanın karakterini yansıtan en belirgin tipografik unsur olmalıdır.
Task Text
- Style: Vintage Serif
- Appearance: Readable and elegant
- Font size: Approximately 13–14 px
- Color: Warm Brown
Görev metinleri küçük boyutta da rahatlıkla okunabilmelidir.
Date Text
- Font size: 11–12 px
- Color: Muted Green
- Position: Directly below the title
Tarih, başlığı destekleyen ikincil bir bilgi olarak gösterilmelidir.
5. Main Widget Layout
Widget'ın içeriği dikey bir düzen içerisinde yerleştirilmelidir.
Header
Başlık alanında:
- Sol tarafta my little list yazısı.
- Başlığın hemen altında gün ve tarih.
- Sağ üstte sabit suluboya çiçek illüstrasyonu.
Çiçek tasarımı:
- Açık şeftali ve pastel pembe tonları.
- İnce botanik yaprak detayları.
- Suluboya görünümü.
- Her açılışta aynı konum ve görünüm.
- Dekoratif amaçlı; etkileşimli değildir.
Task Area
Görev listesi başlığın altında yer almalıdır.
- Görevler dikey sıralanır.
- Kartlar aynı boyut ve renkte olur.
- Kartlar arasında yaklaşık 8 px boşluk bulunur.
- Görev listesi kendi içerisinde kaydırılabilir.
- Widget'ın toplam boyutu değişmez.
Add Task Row
Aktif görevlerin altında boş bir giriş satırı bulunur.
- Kartlarla uyumlu görünüm.
- Sol tarafta küçük bir + simgesi.
- Placeholder: Add a little task...
- Kullanıcı tıkladığında görev yazabilir.
- Enter ile görev eklenir.
6. Task Cards
Görev kartları arayüzün ana bileşenidir.
Appearance
- Background: Warm Cream
- Border Radius: 9–11 px
- Subtle Shadow
- Soft Paper Effect
- Minimal Border or No Visible Border
Kartlar hafif kabartmalı kâğıt parçaları gibi görünmelidir.
Spacing
- Kartlar arasında 8 px boşluk.
- Kart içerisinde yaklaşık 12 px yatay boşluk.
- Görev metni ve öncelik göstergesi arasında yeterli mesafe.
Hover State
Kullanıcı kartın üzerine geldiğinde:
- Kart çok hafif yukarı hareket eder.
- Gölge biraz belirginleşir.
- Gizli etkileşim simgeleri görünür hâle gelir.
Animasyonlar kısa ve yumuşak olmalıdır.
7. Priority Indicators
Öncelikler küçük renkli noktalarla gösterilir.
Priority	Indicator
High	Dusty Red
Medium	Mustard Yellow
Low	Muted Green
None	No Indicator

Öncelik noktası kartın sağ tarafında bulunmalıdır.

Noktaya tıklandığında küçük ve sade bir seçim menüsü açılır.

Menü seçenekleri:
- High
- Medium
- Low
- None
8. Task Interaction Icons
Etkileşim simgeleri normal durumda gizli olmalıdır.
Drag Handle
- Kartın sol tarafında bulunur.
- Hover durumunda belirginleşir.
- Yalnızca bu alan sürükleme işlemi için kullanılabilir.
Delete Icon
- Hover durumunda görünür.
- Küçük × simgesi kullanılır.
- Tıklandığında görev doğrudan silinir.
Restore Icon
- Yalnızca tamamlanmış görevlerde bulunur.
- Hover durumunda görünür.
- ↶ simgesi kullanılır.
- Tıklandığında görev aktif listeye geri döner.
İkonlar sade ve kartın genel tasarımıyla uyumlu olmalıdır.
9. Completed Section
Completed bölümü aktif görevlerin altında bulunur.
- Küçük bir başlık kullanılır.
- Daraltılıp genişletilebilir.
- Başlığın yanında açılır/kapanır oku bulunur.
- Tamamlanmış görevler aynı krem kart tasarımını korur.
- Görev metninin üzeri el çizimi tarzında düzensiz bir çizgiyle çizilir.
Boş durumda:

No completed tasks yet

metni gösterilir.
10. Empty State
Aktif görev bulunmadığında:
- Küçük bir çiçek illüstrasyonu gösterilir.
- Nothing to do yet! metni kullanılır.
- Görünüm sade ve dengeli olmalıdır.
Boş durumda örnek görev gösterilmez.
11. Animations and Transitions
Animasyonlar minimal tutulmalıdır.
Interaction	Animation
Task Hover	Slight upward movement
Card Shadow	Soft increase
Complete Task	Hand-drawn strikethrough + short transition
Restore Task	Short return transition
Priority Menu	Soft fade or scale
Notifications	Gentle fade in/out

Animasyonlar kullanıcıyı rahatsız edecek kadar uzun veya dikkat çekici olmamalıdır.
12. Scrollbar
- Görev listesi kendi içerisinde kaydırılır.
- İnce ve minimal bir scrollbar kullanılır.
- Scrollbar mümkün olduğunca sade görünür.
- Widget'ın sabit boyutu korunur.
13. Notifications
Bildirimler widget içerisinde gösterilir.
- Küçük boyutlu.
- Sade tasarımlı.
- Genel renk paletiyle uyumlu.
- Gereksiz animasyonlardan uzak.
Başarılı işlem bildirimleri otomatik kaybolur.

Kritik hata bildirimleri kullanıcı kapatana veya çözene kadar görünür kalır.
14. Settings Window
Ayarlar ayrı ve küçük bir pencerede açılır.

Görsel tasarım ana widget ile aynı renk ve tipografi sistemini kullanmalıdır.

Yalnızca iki ayar bulunur:
- Launch on Windows Startup
- Always on Top
Gereksiz menüler veya özelleştirme seçenekleri eklenmemelidir.
15. Design Restrictions
MVP sürümünde aşağıdaki tasarım unsurları kullanılmayacaktır:
- Sol navigasyon menüsü
- Sidebar
- Ek görev listeleri
- Birden fazla tema
- Kullanıcı tarafından renk değiştirme
- Kullanıcı tarafından font değiştirme
- Büyük ve dikkat çekici butonlar
- Gereksiz dekoratif animasyonlar
- Karmaşık menüler
Arayüzün temel odağı görev listesi olmalıdır.
16. Design Principles
Morrow'un bütün arayüz geliştirmelerinde aşağıdaki ilkeler korunmalıdır:
1. Simplicity: Gereksiz arayüz elemanlarından kaçınılmalıdır.
2. Consistency: Renk, boşluk, font ve kart stilleri tutarlı olmalıdır.
3. Readability: Görev metinleri her zaman rahat okunmalıdır.
4. Soft Interaction: Etkileşimler yumuşak ve doğal hissettirmelidir.
5. Visual Harmony: Dekoratif unsurlar işlevselliğin önüne geçmemelidir.
6. Compact Design: Widget masaüstünde az yer kaplamalıdır.
Final Design Goal: Morrow, masaüstünde duran küçük bir vintage not defteri gibi hissettirmelidir. Kullanıcı uygulamayı açtığında karmaşık bir görev yönetim sistemiyle değil, kendisini bekleyen sade ve sevimli bir yapılacaklar listesiyle karşılaşmalıdır.