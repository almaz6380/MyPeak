// Hukuki metinlerin Türkçe çevirisi.
//
// `legalContent.js` içindeki Almanca asıl metin bağlayıcı metin olarak kalır —
// bu yüzden her belge «Bağlayıcı sürüm» bölümüyle başlar. Çok dilli hukuki
// metinler böyle çalışır: anlaşılsın diye çevrilir, kendi başına geçerli
// ikinci bir sürüm oluşturmak için değil.
//
// Ad, adres ve Avusturya hukukuna yapılan atıflar (§ 5 ECG, GISA, GewO,
// § 6 UStG, Bezirkshauptmannschaft Kitzbühel) çevrilmez: bunlar özel adlar
// ve kanun atıflarıdır.
const BETREIBER = `Josef Gallab (şahıs işletmesi)
Oberhofenweg 21b
6380 St. Johann in Tirol, Avusturya
E-posta: kontakt@wellbooked.at`;

const VORRANG = {
  heading: 'Bağlayıcı sürüm',
  body: 'Bu, Almanca asıl metnin bilgilendirme amaçlı bir çevirisidir. Farklılık veya yorum konusunda şüphe olması hâlinde Almanca sürüm geçerlidir. Almanca sürümü, profilinde uygulama dilini «Deutsch» olarak ayarlayarak görüntüleyebilirsin.',
};

export default {
  imprint: {
    title: 'Künye',
    updated: 'Güncelleme: 17 Eylül 2026',
    sections: [
      VORRANG,
      {
        heading: '§ 5 ECG ve § 25 MedienG uyarınca bilgiler (Avusturya)',
        body: BETREIBER,
      },
      {
        heading: 'Faaliyet konusu',
        body: 'Fitness ve beslenme web uygulaması «FullRep»in (fullrep.pages.dev) işletilmesi.',
      },
      {
        heading: 'Mesleki faaliyete ilişkin bilgiler',
        body: 'Serbest meslek: «Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik» (otomatik veri işleme ve bilgi teknolojisi hizmetleri)\nGISA numarası: 39801937\nTirol Ticaret Odası üyesi (Wirtschaftskammer Tirol, Kitzbühel bölge şubesi)\nDenetim makamı: Bezirkshauptmannschaft Kitzbühel\nUygulanacak mevzuat: Gewerbeordnung (GewO), ris.bka.gv.at adresinden erişilebilir\nKDV: § 6 Abs. 1 Z 27 UStG uyarınca küçük işletme (KDV numarası yok)',
      },
      {
        heading: 'Tüketici uyuşmazlıklarının çözümü',
        body: 'Bir tüketici hakem kurulu önündeki uyuşmazlık çözüm süreçlerine katılmaya istekli ya da yükümlü değiliz. Eski AB çevrim içi uyuşmazlık çözüm platformu 20 Temmuz 2025’te kapatılmıştır.',
      },
      {
        heading: 'İçeriklere ilişkin sorumluluk',
        body: 'Bu uygulamanın içerikleri büyük bir özenle hazırlanmıştır. İçeriklerin doğruluğu, eksiksizliği ve güncelliği konusunda garanti verilmez. Antrenman, beslenme ve bilgi konularındaki tüm içerikler yalnızca genel bilgilendirme amaçlıdır ve tıbbi danışmanlık niteliği taşımaz.',
      },
    ],
  },

  privacy: {
    title: 'Gizlilik Politikası',
    updated: 'Güncelleme: 30 Ekim 2026',
    sections: [
      VORRANG,
      {
        heading: '1. Veri sorumlusu',
        body: `«FullRep» uygulamasındaki veri işlemeden sorumlu olan:\n\n${BETREIBER}`,
      },
      {
        heading: '2. Hangi verileri işliyoruz',
        body: 'Hesap verileri: kayıt için e-posta adresi ve şifre (şifrelenmiş).\n\nProfil verileri: ad, yaş, cinsiyet, boy, kilo, antrenman hedefi, aktivite düzeyi ve deneyim — onboarding sırasında senin verdiğin bilgiler.\n\nKullanım verileri: antrenmanların (egzersizler, setler, ağırlıklar), beslenme kayıtların (yiyecekler, kalori, makrolar), su tüketimi, takviyeler, kilo geçmişi, antrenman programları, arkadaşlıklar ve deneyim puanları.\n\nSağlık verileri (GDPR md. 9): kilo ve vücut ölçüleri, beslenme ve antrenman bilgileri, döngü verileri ve semptom günlüğü (döngü takibini açarsan), Apple Health / Health Connect’ten adım sayısı ve kilo (bağlantıyı açarsan) ve AI koça yazdığın her şey — örneğin kan değerleri. Bu verileri yalnızca açık rızana dayanarak işliyoruz; bu rızayı onboarding’de ayrı bir adımda verirsin (zamanını profilinde kaydederiz) ve istediğin zaman ileriye dönük olarak geri alabilirsin — profilde «Sağlık verisi rızasını geri al» ile ya da hesabını silerek. Geri almaya kadar yapılan işleme hukuka uygun olmaya devam eder. FullRep bu veriler olmadan anlamlı şekilde çalışmadığından, geri aldıktan sonra hesabını ancak yeniden rıza vererek kullanmaya devam edebilirsin; alternatif olarak hesabını sildirebilirsin.\n\nApple Health / Health Connect (isteğe bağlı): bağlantıyı profilde açarsan FullRep, adım sayını ve kilonu uygulamada göstermek ve kilo geçmişine aktarmak için Apple Health’ten (iOS) veya Google Health Connect’ten (Android) okur. İzni sistem iletişim kutusunda verirsin ve orada istediğin zaman geri alabilirsin; ayrıca bağlantıyı profilde kapatabilirsin. Ayrıca profilde «Antrenmanları Sağlık’a kaydet» seçeneğini açabilirsin: FullRep bu durumda tamamlanan her antrenmanı Apple Health veya Health Connect’e bir oturum (tür, başlangıç, bitiş) olarak kaydeder — set, ağırlık, kalori veya nabız olmadan. Orada bulunan veriler sistem tarafından yönetilir; seçeneği tekrar kapatırsan FullRep bunları silmez. FullRep bu verileri asla reklam için kullanmaz.\n\nAktif kaloriler ve cihazda adım sayma (isteğe bağlı, 1.6.2 sürümünden beri): Health bağlantısıyla FullRep bugünkü aktif (yakılan) kalorilerini de okur ve bunları ana ekranda ve widget’ta gösterir. Bundan ayrı olarak profilinde “Adımları telefonla say” seçeneğini açabilirsin: FullRep bu durumda adım sayısını doğrudan cihazının hareket sensöründen okur (iOS: Hareket ve Fitness; Android: adım sayacı, bunun için uygulama sayacı her 15 dakikada kısaca kontrol eder). Bu adım verileri cihazında kalır ve bize gönderilmez. İzni sistem ayarlarından verir ve geri alırsın; özelliği profilinden de kapatabilirsin.\n\nFotoğraflar: egzersiz ve ürün fotoğrafları yalnızca cihazında (IndexedDB) saklanır ve bize iletilmez. AI analizi için çekilen yemek fotoğrafları Google’a (Gemini API) iletilir — bkz. madde 4.\n\nReklam ve satın alma verileri (yalnızca iOS ve Android uygulamalarında): reklam göstermek için Google AdMob, cihazının reklam kimliğini, IP adresini ve teknik cihaz bilgilerini işler. Premium abonelik için RevenueCat’e uygulama içi bir kullanıcı kimliği ve mağazanın satın alma makbuzunu iletiriz. Web uygulaması reklam göstermez.\n\nHata raporları: uygulama çökerse, Sentry’ye uygulama sürümü ve cihaz türüyle birlikte teknik bir hata mesajı göndeririz — ad, e-posta veya içerik olmadan (ilgili derlemede hata toplama açıksa).',
      },
      {
        heading: '3. Amaçlar ve hukuki dayanaklar',
        body: 'Uygulama işlevlerinin sunulması: GDPR md. 6 f. 1 b. b (sözleşmenin ifası).\n\nSağlık verileri: yalnızca açık rızan, GDPR md. 9 f. 2 b. a.\n\nUygulamalarda reklam: kişiselleştirilmiş reklamı yalnızca senin rızanla gösteririz (GDPR md. 6 f. 1 b. a); bu rızayı ilk reklamdan önce Google’ın rıza penceresiyle — iOS’ta ayrıca Apple’ın uygulama izleme şeffaflığı penceresiyle — isteriz. Reddedersen yalnızca kişiselleştirilmemiş reklam görürsün; bunun hukuki dayanağı, ücretsiz sürümü finanse etmeye yönelik meşru menfaatimizdir (GDPR md. 6 f. 1 b. f). Seçimini istediğin zaman profilde «Reklam rızasını değiştir» altından değiştirebilirsin. Premium abonelikle reklamlar tamamen kalkar. Sağlık ve kullanım verilerin asla reklam için kullanılmaz ve reklam ortaklarıyla paylaşılmaz.\n\nHata raporları ve güvenlik: kararlı ve güvenli bir uygulamaya yönelik meşru menfaat (GDPR md. 6 f. 1 b. f).\n\nAsgari yaş: hesap ancak 16 yaşından itibaren oluşturulabilir; onboarding doğum tarihini kontrol eder. Bunun nedeni, Almanya gibi bazı AB ülkelerinde sağlık verilerinin işlenmesine ve kişiselleştirilmiş reklama yönelik rızanın ancak 16 yaşından itibaren geçerli şekilde verilebilmesidir (GDPR md. 8).\n\nWeb uygulaması reklam göstermez ve reklam çerezleri kullanmaz. Web sürümünün ziyaretçi ölçümü için Cloudflare Web Analytics kullanıyoruz (bkz. madde 4).',
      },
      // TODO(Josef): Gemini-API auf den bezahlten Tarif mit Auftragsverarbeitungs-
      // vertrag (DPA) umstellen — im kostenlosen Tarif darf Google Eingaben zur
      // Produktverbesserung nutzen; für Coach-Nachrichten (auch Blutwerte) nicht
      // tragbar. Erst danach darf hier ein unbedingter Satz zu Art. 28 stehen.
      {
        heading: '4. Alıcılar ve veri işleyenler',
        body: 'Supabase, Inc. (ABD; veritabanı ve giriş sistemi): hesap, profil ve kullanım verilerini saklar.\n\nCloudflare, Inc. (ABD; barındırma): uygulamayı ve sunucu işlevlerimizi sunar; bu sırada teknik olarak gerekli sunucu kayıtları (ör. IP adresi) oluşur. Web sürümünde Cloudflare Web Analytics ayrıca sayfa ziyaretlerini sayar (ziyaret edilen sayfa, saat, yönlendiren sayfa, ülke, cihaz türü, tarayıcı, yükleme süresi) — çerez olmadan, cihazına hiçbir şey kaydetmeden ve IP adresini saklamadan. Hukuki dayanak, gizliliğe saygılı bir ziyaretçi ölçümüne yönelik meşru menfaatimizdir (GDPR md. 6 f. 1 b. f). Uygulamalarda ziyaret sayımı yapılmaz.\n\nGoogle LLC / Google Ireland Ltd.: (1) Gemini API — yalnızca yemek fotoğrafı analizini kullanırsan, çektiğin fotoğraf değerlendirme için Google’a iletilir; yalnızca AI koçu kullanırsan, mesajların ve devam eden konuşmanın geçmişi yanıtı oluşturmak için Google (Gemini API) tarafından işlenir. Google bu girdileri Gemini API’ye ilişkin kendi koşullarına göre işler. Ad, e-posta adresi veya hesap kimliği göndermeyiz; fotoğrafları ve mesajları kendi sunucularımızda saklamayız. (2) AdMob — iOS ve Android uygulamalarında reklam (bkz. madde 2 ve 3).\n\nAnthropic, PBC (ABD; AI koç): AI koçun yanıtları Gemini yerine Anthropic modelleri (Claude) tarafından da oluşturulabilir. Bu durumda Anthropic, mesajlarını ve devam eden konuşmanın geçmişini işler — burada da ad, e-posta veya hesap kimliği olmadan.\n\nRevenueCat, Inc. (ABD; Premium abonelik): aboneliğini yönetmek ve yeni bir cihazda geri yüklemek için uygulama içi bir kullanıcı kimliği ve mağazanın satın alma onayını alır. Ödemenin kendisini Apple veya Google yürütür; ödeme verilerini görmeyiz.\n\nFunctional Software, Inc. (Sentry, ABD; hata raporları): hata toplama açıksa, kişisel bağlantısı olmayan teknik hata mesajları alır.\n\nOpen Food Facts (gıda veritabanı): yiyecek ararken ve barkod tararken arama terimi veya barkod (kişisel veri değil) Open Food Facts’e iletilir.\n\nSağlayıcıların GDPR md. 28 uyarınca veri işleme sözleşmeleri sunduğu ölçüde, bunlar onların hizmetlerini kullanmamız için geçerlidir. ABD’ye aktarımlarda AB standart sözleşme maddelerine veya sağlayıcı sertifikalıysa EU-US Data Privacy Framework’e dayanırız.',
      },
      {
        heading: '5. Cihazında yerel depolama',
        body: 'Uygulama ayrıca verilerini cihazında yerel olarak (localStorage/IndexedDB) saklar; böylece veriler çevrim dışı ve beklemeden kullanılabilir. Misafir modunda tüm veriler yalnızca cihazında kalır ve bize iletilmez. Android uygulamasında Google üzerinden otomatik yedekleme (Android Backup) kapalıdır; bu nedenle uygulamanın yerel verileri Google Drive yedeğine girmez.',
      },
      {
        heading: '6. Saklama süresi',
        body: 'Verilerini hesabın var olduğu sürece saklarız. Hesabını silersen tüm verilerin veritabanımızdan derhâl silinir. Veri kaybına karşı korunmak için her gün veritabanının bir yedeğini alırız; bu yedek 14 gün sonra otomatik olarak silinir — o zamana kadar silinmiş bir hesap hâlâ bir yedekte bulunabilir; bu kopyalar yalnızca bir arızadan sonra geri yükleme amacına hizmet eder.\n\nAI koçla yaptığın konuşmaların geçmişi yalnızca cihazında bulunur (son 60 mesaj); sunucularımızda yalnızca günde kaç soru sorduğunu sayarız.',
      },
      {
        heading: '7. Hesabı ve verileri silme',
        body: 'Hesabını tüm verileriyle birlikte istediğin zaman doğrudan uygulamada silebilirsin: Profil → Hesabı sil. Ayrıca silme talebini yukarıdaki adrese e-postayla, herhangi bir şekil şartı olmadan iletebilirsin.',
      },
      {
        heading: '8. Hakların',
        body: 'Bilgi edinme, düzeltme, silme, işlemenin kısıtlanması, veri taşınabilirliği ve itiraz haklarına, ayrıca verdiğin bir rızayı istediğin zaman geri alma hakkına sahipsin — sağlık verisi rızasını profilde «Sağlık verisi rızasını geri al» ile, reklam rızasını «Reklam rızasını değiştir» ile. Ayrıca Avusturya veri koruma makamına (dsb.gv.at) şikâyette bulunabilirsin.',
      },
    ],
  },

  terms: {
    title: 'Kullanım Koşulları',
    updated: 'Güncelleme: 4 Ekim 2026',
    sections: [
      VORRANG,
      {
        heading: '1. Kapsam',
        body: `Bu kullanım koşulları, aşağıdaki kişi tarafından işletilen iOS ve Android için «FullRep» uygulamasının ve web sürümünün (fullrep.pages.dev) kullanımı için geçerlidir:\n\n${BETREIBER}`,
      },
      {
        heading: '2. Hizmetin tanımı',
        body: 'FullRep, antrenman ve beslenmeyi kaydetmeye yarayan, tamamlayıcı bilgilendirici içerikler sunan bir uygulamadır. Temel işlevler ücretsizdir; iOS ve Android uygulamalarının ücretsiz sürümü reklamlarla finanse edilir. Ek işlevler — şu anda özellikle AI koç — ve reklamsız kullanım FullRep Premium ile sunulur (madde 3). Sürekli erişilebilirlik hakkı yoktur; işlevler değişebilir veya kaldırılabilir. Önceden ödenmiş bir abonelik dönemi içinde Premium işlevleri haklı bir neden olmadan önemli ölçüde kısıtlamayız.',
      },
      {
        heading: '3. FullRep Premium (abonelik)',
        body: 'FullRep Premium, aylık veya yıllık otomatik yenilenen bir abonelik olarak sunulur. Satın alma yalnızca Apple App Store veya Google Play üzerinden yapılır; ödeme ve faturalandırma ilgili mağaza tarafından yürütülür ve ek olarak mağazanın koşulları geçerlidir.\n\nGüncel fiyat, satın almadan önce mağaza penceresinde sana gösterilir. Ödeme, satın almayı onayladığında Apple veya Google hesabından tahsil edilir. Mevcut dönemin bitiminden en az 24 saat önce iptal etmezsen abonelik seçilen süre için otomatik olarak yenilenir.\n\nAboneliği istediğin zaman Apple veya Google hesabının abonelik ayarlarından yönetebilir ve iptal edebilirsin. Uygulamayı veya FullRep hesabını silmek aboneliği sona erdirmez. İptalden sonra Premium, ödenmiş dönemin sonuna kadar etkin kalır.\n\nPremium ile uygulamadaki reklamlar kalkar ve AI koç gibi Premium işlevlerin kilidi açılır (günlük bir sınır dahilinde).',
      },
      {
        heading: '4. Ücretsiz deneme süresi',
        body: 'Yeni kullanıcılar Premium’u bir kez 7 gün ücretsiz deneyebilir. Deneme uygulamada başlatılır ve FullRep hesabına bağlıdır. Kendiliğinden sona erer ve ücretli bir aboneliğe dönüşmez — hiçbir şeyi iptal etmen gerekmez. Abonelik yalnızca mağazada açıkça satın alırsan başlar.',
      },
      {
        heading: '5. Cayma ve iadeler',
        body: 'Satın almalar Apple veya Google tarafından yürütülür; ödeme verilerini almayız ve bu nedenle satın almaları doğrudan iade edemeyiz. İadeler ve yasal bir cayma hakkının kullanılması, ilgili mağazanın koşullarına ve süreçlerine tabidir (Apple: reportaproblem.apple.com; Google Play: Google hesabındaki sipariş geçmişi). Kanunda öngörülen emredici tüketici hakları saklıdır.',
      },
      {
        heading: '6. Hesap ve yükümlülükler',
        body: 'Verilerini kalıcı olarak saklamak için bir hesap gerekir. Giriş bilgilerini gizli tutmayı ve üçüncü kişilerin haklarını ihlal eden içerik yayımlamamayı kabul edersin. Sağladığın topluluk verilerini (ör. barkodla ürün besin değerleri) tüm kullanıcıların kullanımına sunarsın. Hesap oluşturmak için en az 16 yaşında olmalısın.',
      },
      {
        heading: '7. Sağlık uyarısı — tıbbi tavsiye değildir',
        body: 'Uygulamadaki tüm içerikler — özellikle antrenman programları, beslenme ve diyet bilgileri, kalori hesaplamaları ve bilgi kütüphanesi (takviyeler ve peptitlerle ilgili bilgiler dahil) — yalnızca genel bilgilendirme amaçlıdır ve tıbbi, terapötik veya beslenme danışmanlığı niteliği taşımaz. Hiçbir durumda bir hekimin muayenesinin, teşhisinin veya tedavisinin yerini tutmaz. Bir antrenman veya beslenme programına başlamadan ve takviye almadan önce, özellikle önceden var olan hastalıklar, gebelik veya ilaç kullanımı durumunda bir doktora danış. AI destekli fotoğrafla yemek analizi tahmini değerler verir; bunların doğruluğu garanti edilmez. Ayrıntılar: uygulamadaki sağlık uyarısı (Profil → Sağlık uyarısı).',
      },
      {
        heading: '8. Sorumluluk',
        body: 'Kast ve ağır ihmal hâllerinde ve yaşama, vücut bütünlüğüne veya sağlığa verilen zararlarda sınırsız sorumluluk taşırız. Bunun dışında hafif ihmal sorumluluğu hariç tutulur. Antrenman ve beslenme önerilerinin uygulanması kendi sorumluluğundadır.',
      },
      {
        heading: '9. Değişiklikler',
        body: 'Bu kullanım koşullarını ileriye dönük olarak değiştirebiliriz. Önemli değişiklikler hakkında seni uygulamada bilgilendiririz.',
      },
      {
        heading: '10. Uygulanacak hukuk',
        body: 'Kanunlar ihtilafı kuralları hariç olmak üzere Avusturya hukuku uygulanır. Yerleşim yerinin bulunduğu ülkenin emredici tüketici koruma hükümleri saklıdır.',
      },
    ],
  },

  health: {
    title: 'Sağlık Uyarısı',
    updated: 'Güncelleme: 17 Eylül 2026',
    sections: [
      VORRANG,
      {
        heading: 'FullRep tıbbi tavsiyenin yerini tutmaz',
        body: 'Sağlık soruları, teşhis veya tedavi için her zaman bir doktora başvur. FullRep, antrenman ve beslenmeyi kaydetmeye yarayan bir uygulamadır — tıbbi cihaz değildir ve tıbbi muayene, teşhis veya tedavinin yerini tutmaz.',
      },
      {
        heading: 'Ne zaman tıbbi tavsiye almalısın',
        body: 'Bir antrenman veya beslenme programına başlamadan önce, bir diyetten önce ve besin takviyesi almadan önce — özellikle önceden var olan hastalıklar, şikâyetler, gebelik, emzirme dönemi veya ilaç kullanıyorsan.\n\nŞikâyetler ortaya çıkarsa antrenmanı bırak ve tıbbi tavsiye al — örneğin göğüs ağrısı, nefes darlığı, baş dönmesi veya bayılma.',
      },
      {
        heading: 'Uygulamadaki içerikler nedir — ve ne değildir',
        body: 'Antrenman programları, beslenme ve diyet bilgileri, kalori ve makro hesaplamaları ve bilgi kütüphanesi (takviyeler, kan değerleri ve peptitler dahil) yalnızca genel bilgilendirme amaçlıdır. Geneldir ve kişisel durumunu dikkate almaz.\n\nKan değerlerine ilişkin bilgiler değerleri en fazla kabaca yorumlar ve teşhis değildir. Değerlerini ancak bir doktor değerlendirebilir.\n\nPeptitler hakkında: bu maddeler birçok ülkede reçeteye tabidir veya onaylı değildir. İçerikler bilerek hiçbir dozaj bilgisi içermez.',
      },
      {
        heading: 'Ölçüm değil, tahmin',
        body: 'Enerji harcaması hesaplayıcısı (TDEE, Mifflin-St Jeor) ve AI destekli fotoğrafla yemek analizi tahminler verir. Bunların doğruluğu garanti edilmez; bir ölçümün veya bir beslenme uzmanının danışmanlığının yerini tutmazlar.',
      },
      {
        heading: 'AI koç bir doktor değildir',
        body: 'AI koç antrenman, beslenme ve takviyelerle ilgili genel soruları yanıtlar. Teşhis koymaz, tedavi önermez ve dozaj vermez. Yanıtları hata içerebilir. Tıbbi tavsiye, teşhis veya tedavi için bir doktora başvur.',
      },
      {
        heading: 'Acil durumda',
        body: 'Tıbbi bir acil durumda acil yardımı ara (Türkiye’de ve tüm Avrupa Birliği’nde 112). Acil bir durumda yardım aramak veya tıbbi tedaviyi ertelemek için FullRep’i kullanma.',
      },
    ],
  },
};
