# Morrow
## Product Requirements Document (PRD)

**Doküman Türü:** Product Requirements Document  
**Ürün Adı:** Morrow  
**Platform:** Windows  
**Sürüm:** MVP (Minimum Viable Product)  
**Durum:** İlk PRD Taslağı

---

# 1. Product Overview

Morrow, kullanıcıların günlük görevlerini masaüstünden kolayca takip etmelerini sağlayan minimal tasarımlı bir yapılacaklar widget'ıdır.

Uygulama, masaüstünde sürekli erişilebilir olacak şekilde tasarlanacaktır. Kullanıcılar görev ekleyebilecek, mevcut görevlerini düzenleyebilecek, öncelik belirleyebilecek ve tamamladıkları görevleri ayrı bir bölümde görüntüleyebilecektir.

Morrow, kullanıcıların çalışma sırasında farklı uygulamalar arasında geçiş yapmadan görevlerini takip edebilmesini amaçlar.

Uygulama Windows platformu için geliştirilecek ve görev verileri kullanıcının bilgisayarında yerel olarak saklanacaktır.

# 2. Problem & Goals

## 2.1 Problem Statement

Bilgisayar başında çalışan veya ders çalışan kullanıcılar, günlük yapılacak işlerini takip etmekte zorlanabilir. Görevleri hatırlamak için farklı uygulamalar kullanmak çalışma sırasında dikkat dağınıklığına neden olabilir.

Ayrıca görevlerin önem derecelerini belirlemek ve tamamlanan işleri aktif görevlerden ayırmak, günlük çalışma düzenini kolaylaştırabilir.

Morrow, bu sorunları masaüstünden erişilebilen basit ve minimal bir görev takip aracıyla çözmeyi hedefler.

## 2.2 Product Goals

1. Kullanıcıların yapılacak görevlerini masaüstünde sürekli görebilmesini sağlamak.
2. Görev ekleme ve yönetme işlemlerini kolaylaştırmak.
3. Görevlerin öncelik seviyelerine göre belirlenebilmesini sağlamak.
4. Kullanıcının görev sıralamasını kendi tercihine göre düzenleyebilmesini sağlamak.
5. Tamamlanan görevleri aktif görevlerden ayrı tutmak.
6. Minimal ve dikkat dağıtmayan bir kullanıcı deneyimi sunmak.
7. İnternet bağlantısına ihtiyaç duymadan çalışabilmek.

# 3. Target Users

Morrow, günlük görevlerini düzenlemek ve takip etmek isteyen bireysel kullanıcılara yöneliktir.

## 3.1 Target User Characteristics

- Günlük veya haftalık yapılacak işleri bulunan kişiler.
- Bilgisayar başında çalışırken görevlerini takip etmek isteyen kullanıcılar.
- Görevlerini önem derecelerine göre düzenlemek isteyen kişiler.
- Basit ve hızlı erişilebilir uygulamaları tercih eden kullanıcılar.
- Görevlerini tek bir ekrandan yönetmek isteyen kişiler.

## 3.2 Initial Usage Scenario

İlk kullanım senaryosu, bilgisayar üzerinden ders çalışan bir kullanıcının akademik ve kişisel görevlerini aynı widget üzerinden takip etmesidir.

Ancak uygulama yalnızca öğrenciler için tasarlanmayacak; farklı türde görevleri bulunan herkes tarafından kullanılabilecektir.

# 4. Features & Scope

## 4.1 In Scope (MVP)

### Task Management
- **Add Task:** Yeni görev oluşturma.
- **Edit Task:** Mevcut görevleri düzenleme.
- **Delete Task:** Görevleri silme.
- **Complete Task:** Görevleri tamamlandı olarak işaretleme.

### Priority Management
- Görevlere üç farklı öncelik seviyesi atanabilmesi:
  - High
  - Medium
  - Low

### Manual Sorting
- Kullanıcı görevleri sürükle-bırak (Drag & Drop) yöntemiyle sıralayabilir.
- Belirlenen sıralama otomatik olarak kaydedilir.
- Uygulama yeniden açıldığında görev sıralaması korunur.

### Completed Tasks
- Tamamlanan görevler aktif görevlerden ayrı bir bölümde gösterilir.
- Tamamlanan görevler gerektiğinde tekrar aktif görevlere alınabilir.

### Local Data Storage
- Görevler kullanıcının bilgisayarında JSON dosyasında saklanır.
- Uygulama kapatılıp açıldığında görevler korunur.
- Temel özellikler internet bağlantısı olmadan çalışır.

### Desktop Widget
- Uygulama Windows masaüstünde küçük bir widget olarak çalışır.
- Widget diğer pencerelerin üzerinde görünür (Always on Top).
- Kullanıcı widget'ı istediğinde kapatabilir.
- Widget kapatıldığında görev verileri silinmez.

## 4.2 Out of Scope (MVP Dışında)

Aşağıdaki özellikler ilk sürümde yer almayacaktır:

- Görevlere son tarih (Due Date) ekleme.
- Hatırlatıcı ve bildirim sistemi.
- Günlük veya haftalık görev istatistikleri.
- Bulut senkronizasyonu.
- Kullanıcı hesabı ve giriş sistemi.
- Birden fazla cihaz arasında senkronizasyon.
- Görev kategorileri ve etiketleri.
- Birden fazla tema seçeneği.

Bu özellikler ilerleyen sürümlerde değerlendirilebilir.

# 5. User Stories & Acceptance Criteria

## US-01: Add Task

**User Story:**  
Kullanıcı olarak yapılacak işlerimi listeye eklemek istiyorum. Böylece görevlerimi tek bir yerden takip edebilirim.

**Acceptance Criteria:**
- Kullanıcı görev metnini girebilir.
- Boş görev eklenemez.
- Enter tuşuyla görev eklenebilir.
- Eklenen görev aktif görev listesinde görünür.
- Yeni görev kalıcı olarak kaydedilir.

## US-02: Edit Task

**User Story:**  
Kullanıcı olarak mevcut görevlerimi düzenlemek istiyorum. Böylece değişen işlerimi güncel tutabilirim.

**Acceptance Criteria:**
- Kullanıcı mevcut görev metnini değiştirebilir.
- Düzenlenen görev listede güncel haliyle görünür.
- Değişiklikler JSON dosyasına kaydedilir.

## US-03: Delete Task

**User Story:**  
Kullanıcı olarak artık ihtiyaç duymadığım görevleri silmek istiyorum.

**Acceptance Criteria:**
- Kullanıcı bir görevi silebilir.
- Silinen görev aktif listeden kaldırılır.
- Silme işlemi kalıcı olarak kaydedilir.

## US-04: Complete Task

**User Story:**  
Kullanıcı olarak tamamladığım görevleri işaretlemek istiyorum.

**Acceptance Criteria:**
- Kullanıcı görevi tamamlandı olarak işaretleyebilir.
- Tamamlanan görev aktif listeden kaldırılarak Completed bölümüne taşınır.
- Kullanıcı tamamlanan görevi tekrar aktif hale getirebilir.
- Durum değişiklikleri kaydedilir.

## US-05: Set Priority

**User Story:**  
Kullanıcı olarak görevlerime öncelik seviyesi belirlemek istiyorum.

**Acceptance Criteria:**
- Her görev için High, Medium veya Low seçilebilir.
- Seçilen öncelik görev üzerinde görüntülenir.
- Öncelik değişiklikleri kaydedilir.

## US-06: Manual Sorting

**User Story:**  
Kullanıcı olarak görevlerimin sırasını sürükleyip bırakarak değiştirmek istiyorum. Böylece görevlerimi kendi tercihlerime göre düzenleyebilirim.

**Acceptance Criteria:**
- Kullanıcı görevleri Drag & Drop yöntemiyle taşıyabilir.
- Görev bırakıldığı yeni konumda görüntülenir.
- Yeni sıralama otomatik olarak kaydedilir.
- Uygulama yeniden açıldığında sıralama korunur.

## US-07: View Completed Tasks

**User Story:**  
Kullanıcı olarak tamamladığım görevleri ayrı bir bölümde görmek istiyorum.

**Acceptance Criteria:**
- Completed bölümü aktif görevlerden ayrı görüntülenir.
- Tamamlanan görevler bu bölümde listelenir.
- Kullanıcı tamamlanan görevleri tekrar aktif hale getirebilir.

## US-08: Persistent Data Storage

**User Story:**  
Kullanıcı olarak uygulamayı kapatıp açtığımda görevlerimin kaybolmamasını istiyorum.

**Acceptance Criteria:**
- Görevler yerel JSON dosyasına kaydedilir.
- Uygulama açıldığında kayıtlı görevler yüklenir.
- Görevlerin metin, öncelik, tamamlanma durumu ve sıralama bilgileri korunur.

# 6. Success Metrics

Morrow'ın başarısı, görev yönetimini ne kadar kolaylaştırdığı ve temel özelliklerin ne kadar sorunsuz çalıştığı üzerinden değerlendirilecektir.

Başarı ölçütleri:

1. **Hızlı Görev Ekleme:** Kullanıcı birkaç saniye içerisinde yeni görev oluşturabilmelidir.
2. **Sorunsuz Görev Yönetimi:** Ekleme, düzenleme, silme ve tamamlama işlemleri hatasız çalışmalıdır.
3. **Sıralamanın Korunması:** Drag & Drop ile belirlenen görev sırası uygulama yeniden açıldığında korunmalıdır.
4. **Veri Güvenliği:** Uygulama kapatıldığında veya yeniden başlatıldığında görevler kaybolmamalıdır.
5. **Kolay Erişim:** Widget masaüstünde sürekli erişilebilir olmalı ve kullanıcı istediğinde kapatılabilmelidir.
6. **Çevrimdışı Kullanım:** Temel görev yönetimi özellikleri internet bağlantısı olmadan kullanılabilmelidir.

# 7. Constraints & Open Questions

## 7.1 Constraints

| Konu | Karar |
|---|---|
| Platform | Windows |
| Uygulama Türü | Masaüstü Widget |
| Tasarım | Minimal |
| Görünürlük | Always on Top |
| Widget Kontrolü | Kullanıcı istediğinde kapatabilir |
| Veri Saklama | Yerel JSON dosyası |
| İnternet Bağlantısı | Temel özellikler için gerekli değil |
| Görev Sıralama | Drag & Drop |
| Öncelik Seviyeleri | High / Medium / Low |
| Son Tarihler | MVP dışında |
| Bulut Senkronizasyonu | MVP dışında |

## 7.2 Open Questions

Aşağıdaki konular geliştirme sürecinde netleştirilecektir:

- Kullanılacak masaüstü geliştirme teknolojisi.
- Widget'ın kapatıldıktan sonra nasıl tekrar açılacağı.
- Uygulamanın Windows başlangıcında otomatik açılıp açılmayacağı.
- JSON dosyasının konumu ve veri yedekleme yöntemi.
- Widget'ın boyutlandırılabilir olup olmayacağı.
- Kullanıcı arayüzünün ayrıntılı tasarımı.

---

**Doküman Durumu:** İlk PRD taslağı tamamlandı.

**Sonraki Aşama:** Technical Requirements Document (TRD) — uygulamanın teknik mimarisi, kullanılacak teknolojiler, veri yapısı ve geliştirme gereksinimleri.