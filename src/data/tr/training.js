// Türkische Fassung von `src/data/trainingKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Temel bilgiler',
    hypertrophie: 'Kas gelişimi',
    programmierung: 'Programlama',
    regeneration: 'Toparlanma',
  },

  progressive_overload: {
    name: 'Progresif yüklenme',
    summary: 'Uzun vadeli ilerlemenin en önemli ilkesi: Vücudun uyum sağlamaya devam etmesi için antrenman uyaranı zamanla sistematik olarak artırılmalıdır. İlerleme olmadan güç ve kas gelişimi durur.',
    quick: [
      { label: 'Ana fikir', text: 'Adım adım daha fazla ağırlık, tekrar, set ya da daha iyi teknik: Uyaran artmaya devam etmeli.' },
      { label: 'Kimin için', text: 'Tüm seviyeler. Yeni başlayanlar hızlı ilerler; ileri seviyedekiler daha küçük ve planlı adımlara ihtiyaç duyar.' },
    ],
    sections: [
      {
        title: 'Progresif yüklenme nedir?',
        content: 'Progresif yüklenme, antrenman sırasında vücuda binen yükün kademeli olarak artırılmasını ifade eder. Temel fikir süperkompansasyon ilkesine dayanır: Bir antrenman uyaranı biyolojik dengeyi bozar, vücut kendini onarır ve biraz daha yüksek bir performans seviyesine uyum sağlar. Uyaran sonrasında aynı kalırsa yeni bir uyum için sebep kalmaz ve ilerleme durur.\n\nKavram aslen rehabilitasyondan gelir: Thomas DeLorme 1940’larda yaralı askerlerde kas gücünü geri kazandırmak için “progressive resistance exercise” kavramını geliştirdi (DeLorme, 1945, Journal of Bone and Joint Surgery). O zamandan beri ciddi her güç ve kas geliştirme antrenmanının temeli hâline geldi.\n\n“Daha fazla ağırlık”ın ilerlemenin birkaç yolundan yalnızca biri olduğunu anlamak önemlidir. Uyaran daha fazla tekrar, daha fazla set, daha kısa dinlenme, daha geniş hareket açıklığı ya da daha yavaş ve kontrollü bir uygulamayla da artırılabilir.',
      },
      {
        title: 'Bilimsel arka plan',
        content: 'Kademeli artışın gerekliliği, spor biliminin en iyi desteklenen ilkelerinden biridir. American College of Sports Medicine’in pozisyon bildirisi (ACSM, 2009, Medicine & Science in Sports & Exercise), progresif yüklenmeyi süren güç ve hipertrofi kazanımlarının ön koşulu olarak açıkça belirtir ve yükte ve hacimde planlı artış önerir.\n\nSchoenfeld ve ark.’nın bir derlemesi (2017, Journal of Strength and Conditioning Research), hem ağır hem de orta yüklerin kas gelişimini tetikleyebileceğini gösterir; belirleyici olan, setlerin kas yorgunluğuna yakın götürülmesi ve uyaranın zamanla artmasıdır. Bu da ilerlemenin esnek biçimde kurgulanabileceğinin altını çizer.\n\nAntrenman uyumları ayrıca SAID ilkesini (“Specific Adaptation to Imposed Demands”) izler: Vücut tam olarak kendisine yüklenen taleplere uyum sağlar. Talep artmazsa uyum da gerçekleşmez; bu ilişki egzersiz fizyolojisinde onlarca yıldır tutarlı biçimde doğrulanmaktadır.',
      },
      {
        title: 'İlerleme yöntemleri',
        content: 'Antrenman uyaranını artırmanın birkaç pratik yolu vardır. En bilineni yük artışıdır: barda daha fazla ağırlık. Çoğu egzersizde, tekrar aralığının üst sınırına temiz formla ulaşıldığında 2,5 kg (üst vücut) veya 5 kg (alt vücut) artışlar mantıklıdır.\n\nÇift progresyon (double progression) özellikle yeni başlayanlara uygun bir yöntemdir: Bir tekrar aralığı seçersin (ör. 8–12). Önce bu aralık içinde ilerlersin (aynı ağırlıkla daha fazla tekrar); tüm setlerde aralığın üst sınırına ulaştığında ağırlığı artırır ve yeniden alt sınırdan başlarsın.\n\nDiğer seçenekler: kas grubu başına daha fazla set (hacim artışı), aynı performansta daha kısa dinlenme, daha geniş hareket açıklığı ya da daha kontrollü, daha yavaş bir eksantrik faz. İlerlemenin net takip edilebilmesi için aynı anda yalnızca bir değişkeni değiştirmek önemlidir.',
      },
      {
        title: 'Sık yapılan hatalar',
        content: 'En sık yapılan hata çok hızlı ilerlemektir: Teknik oturmadan ağırlığı artırmak sakatlanma riskini yükseltir ve çoğu zaman hedef kası çalıştırmayı bırakır. Ağırlık ancak planlanan tüm tekrarlar iyi formla tamamlanabildiğinde artırılmalıdır.\n\nİkinci hata, her antrenmanda ilerleme olması gerektiğine inanmaktır. Özellikle ileri seviyedekiler her hafta ağırlık ekleyemez; önemli olan tek bir antrenman günü değil, haftalar ve aylar içindeki eğilimdir. Uyku, stres veya beslenmeye bağlı küçük dalgalanmalar normaldir.\n\nÜçüncü hata kayıt tutmamaktır. Ağırlık, tekrar ve setler kaydedilmeden ilerlemeyi yönetmek neredeyse imkânsızdır; gelişip gelişmediğini bilemezsin. Bu yüzden antrenman günlüğü uzun vadeli ilerlemenin en önemli aracıdır.',
      },
      {
        title: 'Özet',
        content: 'Progresif yüklenme antrenmanın temel yasasıdır: Artan bir uyaran olmadan kalıcı uyum olmaz. Yalnızca daha fazla ağırlıkla değil; ağırlık, tekrar, set, dinlenme, hareket açıklığı veya tempo üzerinden de uygulanabilir.\n\nYeni başlayanlar için 8–12 tekrar aralığında çift progresyon mükemmel işler. İleri seviyedekiler daha uzun döngüler hâlinde düşünmeli ve ilerlemeyi zorlamak yerine planlamalıdır. Her durumda anahtar, ilerlemeyi kayda geçirmek ve tekniği ağırlığın önünde tutmaktır.\n\nSabırla ve sistematik ilerleyen kişi yıllar içinde sürekli güç ve kas kazanır; başarılı antrenmanın özü tam olarak budur.',
      },
    ],
  },

  volume_frequency: {
    name: 'Antrenman hacmi ve sıklığı',
    summary: 'Hacim (set × tekrar × ağırlık), kas gelişiminin en güçlü kaldıracıdır. Sıklık, bir kasın haftada kaç kez çalıştırıldığını ifade eder. İkisi birlikte bir kasın ne kadar uyaran aldığını ve ne kadar iyi toparlanabildiğini belirler.',
    quick: [
      { label: 'Hacim için yön', text: 'Çoğu sporcu için kas grubu başına haftada yaklaşık 10–20 zorlu set.' },
      { label: 'Sıklık için yön', text: 'Aynı haftalık hacimde her kası haftada 2 kez çalıştırmak genellikle 1 kezden daha iyidir.' },
    ],
    sections: [
      {
        title: 'Hacim ne demek?',
        content: 'Antrenman hacmi, yapılan toplam işin ölçüsüdür. En yaygın yaklaşım, kas grubu başına haftalık “zorlu setleri” saymaktır: kas yetmezliğine yakın götürülen setler (yaklaşık 0–4 tekrar yedekte). Daha kesin olarak hacim set × tekrar × ağırlık (tonaj) şeklinde hesaplanabilir, ancak set saymanın sağlam bir pratik yaklaşım olduğu kanıtlanmıştır.\n\nHacim, kas gelişimi için tek başına en önemli faktör kabul edilir. Schoenfeld, Ogborn ve Krieger’in meta-analizi (2017, Journal of Sports Sciences) net bir doz-yanıt ilişkisi buldu: Haftalık daha fazla set daha fazla hipertrofi sağladı; ancak belirli bir noktadan sonra ek fayda azalır ve toparlanma zarar görür.\n\nÇoğu sporcu için mantıklı aralık kas grubu başına haftada yaklaşık 10–20 zorlu settir. Yeni başlayanlar alt sınırdan bile faydalanırken ileri seviyedekiler uyaran sağlamaya devam etmek için çoğu zaman daha fazlasına ihtiyaç duyar.',
      },
      {
        title: 'Sıklık ne demek?',
        content: 'Sıklık, bir kasın bir hafta içinde kaç kez çalıştırıldığını ifade eder. Bir kasın haftada 1, 2 veya 3 kez çalıştırılması haftalık hacmi mutlaka değiştirmez; yalnızca farklı dağıtır. 16 set göğsü iki antrenmana bölmek, tek antrenmanda 16 set yerine antrenman başına 8 set demektir.\n\nSchoenfeld, Grgic ve Krieger’in meta-analizi (2019, Journal of Sports Sciences), aynı haftalık hacimde daha yüksek sıklığın biraz daha fazla kas gelişimi sağlama eğiliminde olduğunu gösterir. Bunun nedeni muhtemelen kas protein sentezinin antrenmandan sonra yalnızca yaklaşık 24–48 saat yüksek kalması ve daha sık uyaranların onu daha sık tetiklemesidir.\n\nPratikte bu şu anlama gelir: Her kası haftada iki kez çalıştırmak çoğu kişi için uyaran, toparlanma ve antrenman kalitesi arasında iyi bir dengedir. Hacim yeterli olduğu sürece çok yüksek sıklıklar pek ek fayda getirmez.',
      },
      {
        title: 'Hacmi doğru yönetmek',
        content: 'Hacim sabit tutulmak yerine kişiye özel ve dinamik biçimde ele alınmalıdır. Mantıklı bir başlangıç noktası aralığın alt sınırıdır (kas başına haftada yaklaşık 10 set). Buradan itibaren toparlanma, uyku ve performans ayak uydurdukça hacim haftalar içinde yavaşça artırılabilir.\n\n“Maximum Recoverable Volume” (MRV) kavramı, bir sporcunun hâlâ toparlanabildiği hacmin üst sınırını tanımlar. Bu sınırı aşmak performansı düşürür ve sakatlanma riskini artırır. Fazla hacmin işaretleri arasında süren performans düşüşleri, kötü uyku, sürekli kas ağrısı ve motivasyon kaybı yer alır.\n\nGeride kalan kas grupları ya da zayıf noktalar biraz daha fazla hacimle önceliklendirilebilirken zaten iyi gelişmiş bölgeler koruma hacmiyle (çoğunlukla 6–10 set) korunabilir. Böylece sınırlı toparlanma kapasitesi en faydalı olduğu yere yönlendirilir.',
      },
      {
        title: 'Sık yapılan hatalar',
        content: 'Yeni başlayanların klasik hatası, çok erken çok fazla hacimdir. Daha fazlası otomatik olarak daha iyi değildir; kişisel toparlanma sınırının ötesinde ek hacim ilerlemeyi aslında yavaşlatır. Daha az ile başlayıp yavaşça artırmak daha akıllıcadır.\n\nİkinci hata “çöp hacmi” saymaktır: Yetmezlikten uzak ya da kötü teknikle yapılan setler gelişime pek katkı sağlamaz ama yine de toparlanmadan götürür. Yalnızca hedef kası gerçekten zorlayan setler etkili hacim sayılır.\n\nÜçüncüsü, sıklık çoğu zaman hacimle karıştırılır. Bir kası daha sık çalıştırmak ancak haftalık hacim yeterliyse işe yarar. Her biri çok az uyaran içeren haftada altı antrenman, iyi yerleştirilmiş üç antrenmandan daha kötüdür.',
      },
      {
        title: 'Özet',
        content: 'Hacim kas gelişiminin en güçlü kaldıracıdır; kas başına haftada yaklaşık 10–20 zorlu set çoğu kişiye uyar. Sıklık bu hacmi dağıtır; kas başına haftada iki kez kanıtlanmış bir standarttır.\n\nHacim aralığının alt sınırından başla ve toparlanmayı ve performansı izleyerek yavaşça artır. Yalnızca etkili, zorlayıcı setleri say ve tek tek kas gruplarının hacmini hedeflerine göre ayarla.\n\nHacim ve sıklık katı kurallar değil, toparlanma kapasitene göre ayarladığın araçlardır. İkisini bilinçli yönetmek antrenmanı daha verimli kılar ve hem yetersiz hem de aşırı antrenmanı önler.',
      },
    ],
  },

  hypertrophy_basics: {
    name: 'Kaslar nasıl büyür',
    summary: 'Kas gelişimi (hipertrofi), antrenman kas protein sentezini yıkımın üzerine çıkardığında ve bu uyaran düzenli tekrarlandığında gerçekleşir. Ana etken zorlayıcı setlerden gelen mekanik gerilimdir; yeterli protein ve toparlanmayla birlikte.',
    quick: [
      { label: 'Ana etken', text: 'Mekanik gerilim: kontrollü teknikle yetmezliğe yakın setler.' },
      { label: 'Ön koşullar', text: 'Yeterli protein (~1,6–2,2 g/kg), korunum ile hafif fazla arasında kalori, uyku.' },
    ],
    sections: [
      {
        title: 'Kas gelişiminin biyolojisi',
        content: 'Kaslar, kasılabilen proteinler (aktin ve miyozin) içeren kas liflerinden oluşur. Gelişim öncelikle bu liflerin daha fazla kasılabilen protein depolandığı için kalınlaşması anlamına gelir; buna miyofibriler hipertrofi denir. Vücut sürekli olarak kas proteini üretir (kas protein sentezi) ve parçalar (kas protein yıkımı); gelişim ancak sentez uzun bir süre boyunca baskın olduğunda gerçekleşir.\n\nTetikleyici antrenmandır: Zorlayıcı bir set kas protein sentezini yaklaşık 24–48 saat boyunca artırır (Damas ve ark., 2016, Journal of Physiology). Bu uyaran düzenli uygulanır ve yeterli yapı taşı (protein) ve enerjiyle desteklenirse gelişim haftalar ve aylar içinde birikir.\n\nUydu hücreleri de rol oynar: Bu kasa özgü kök hücreler antrenmanla aktive olur, hasarlı liflerin onarımına yardım eder ve yeni çekirdekler sağlayarak uzun vadede daha fazla gelişimi mümkün kılar.',
      },
      {
        title: 'Hipertrofinin üç mekanizması',
        content: 'Brad Schoenfeld, çok atıf alan bir çalışmasında (2010, Journal of Strength and Conditioning Research) kas gelişiminin üç olası mekanizmasını tanımladı: mekanik gerilim, metabolik stres ve kas hasarı.\n\nMekanik gerilim bugün en önemli etken kabul edilir. Kaslar tam hareket açıklığında yüksek bir dirence karşı çalıştığında, özellikle bir setin son ve zor tekrarlarında ortaya çıkar. Bu gerilim kas hücreleri tarafından bir sinyal olarak algılanır (“mekanotransdüksiyon”) ve gelişim süreçlerini başlatır.\n\nMetabolik stres (yüksek tekrarlarda metabolik yan ürünlerden kaynaklanan “yanma”) ve hafif kas hasarı destekleyici bir rol oynayabilir, ancak uzun süre sanıldığı kadar belirleyici değildir. Güncel araştırmalar, belirgin kas hasarının gelişimin ön koşulundan çok bir yan ürünü olduğunu düşündürüyor.',
      },
      {
        title: 'Gelişim uyaranını optimize etmek',
        content: 'Mekanik gerilimi en üst düzeye çıkarmak için setler kas yetmezliğine yakın götürülmelidir; çoğunlukla 0–4 tekrar yedekte. Tam tekrar aralığı şaşırtıcı derecede esnektir: Set yeterince zor olduğu sürece set başına yaklaşık 5 ile 30 tekrar arasındaki geniş bir aralıkta gelişim mümkündür (Schoenfeld ve ark., 2017, Journal of Strength and Conditioning Research).\n\nPratikte yaklaşık 6–15 tekrarlık orta bir aralık etkili olduğunu kanıtlamıştır; çünkü gerilim, hacim ve yorgunluk arasında iyi bir denge sunar. Çok düşük tekrarlar eklemleri ve sinir sistemini daha fazla zorlar, çok yüksek tekrarlar ise rahatsız edici ve yorucudur.\n\nTam hareket açıklığında kontrollü uygulama önemlidir. Özellikle bir kasın yük altında gerildiği pozisyon güçlü bir gelişim uyaranı gibi görünür; bu yüzden derin, tam tekrarlar genellikle kısa ve kesik kesik olanlardan daha etkilidir.',
      },
      {
        title: 'Beslenme ve toparlanma',
        content: 'Yeterli yapı taşı olmadan hiçbir kas büyüyemez. Protein, kas protein sentezi için amino asitleri sağlar; araştırmalar antrenman yapanlar için günde vücut ağırlığının kilogramı başına yaklaşık 1,6–2,2 g protein önerir (Morton ve ark., 2018, British Journal of Sports Medicine). Bunu her biri 20–40 g protein içeren birkaç öğüne yaymak mantıklıdır.\n\nEnerji de aynı derecede önemlidir. Kas gelişimi en iyi korunum kalorisinde veya hafif bir fazlada (yaklaşık +%5–15) işler. Büyük bir açıkta gelişim mümkündür ama belirgin şekilde daha yavaştır; özellikle yeni başlayanlar ve vücut yağı daha yüksek olan kişiler başlangıçta aynı anda yağ kaybedip kas kazanabilir.\n\nUyku en çok hafife alınan faktördür. Toparlanma ve hormonal uyumlar derin uykuda gerçekleşir. Kronik uykusuzluk kanıtlanmış şekilde kas protein sentezini düşürür ve kas yıkımını artırır; gecede yedi ila dokuz saat mantıklı bir hedeftir.',
      },
      {
        title: 'Özet',
        content: 'Kaslar, zorlayıcı bir antrenman uyaranı kas protein sentezini yıkımın üzerine çıkardığında ve bu süreç düzenli tekrarlandığında büyür. Ana etken, kontrollü ve tam uygulamayla yapılan zor setlerden gelen mekanik gerilimdir.\n\nEtkili tekrar aralığı geniştir (yaklaşık 5–30); pratikte yetmezliğe yakın 6–15 tekrar iyi işler. Hacim, ilerleme ve teknik uyaranı belirlerken protein, enerji ve uyku uyumu mümkün kılar.\n\nKas gelişimi yavaş ve birikimli bir süreçtir. Sabırla sıkı antrenman yapan, yeterince yiyen ve iyi uyuyan kişi aylar ve yıllar içinde sürekli kas kazanır.',
      },
    ],
  },

  recovery_overtraining: {
    name: 'Toparlanma ve aşırı antrenman',
    summary: 'Uyum antrenman sırasında değil, sonrasındaki toparlanmada gerçekleşir. Çok fazla antrenman yapıp çok az toparlanmak duraklamaya veya gerilemeye yol açar. Bu yüzden uyku, beslenme, dinlenme ve mantıklı yük yönetimi antrenmanın kendisi kadar önemlidir.',
    quick: [
      { label: 'Temel kural', text: 'Kas dinlenirken büyür. Toparlanma yoksa ilerleme de yok.' },
      { label: 'Önemli kaldıraçlar', text: 'Uyku (7–9 saat), yeterli kalori ve protein, deload haftaları, stres yönetimi.' },
    ],
    sections: [
      {
        title: 'Toparlanma neden belirleyici',
        content: 'Antrenman bir uyarandır, ancak asıl uyum (daha güçlü, daha büyük kaslar, daha yetenekli bir sinir sistemi) sonrasındaki toparlanma evresinde gerçekleşir. Bu etkileşimi süperkompansasyon modeli açıklar: Bir yüklenmeden sonra performans önce düşer, toparlanır ve ardından başlangıç seviyesinin üzerine çıkar; yeter ki yenilenmek için yeterli zaman olsun.\n\nBir sonraki zorlu uyaran toparlanma tamamlanmadan çok erken gelirse yorgunluk birikir. Kısa vadede bu normaldir, hatta antrenmanın bir parçasıdır; uzun vadede ise performans kaybına yol açar. Vücut antrenman stresini diğer streslerden ayırt etmez: iş, uykusuzluk ve psikolojik yük de hesaba girer.\n\nBu yüzden toparlanma pasif bir “hiçbir şey yapmamak” değil, antrenman uyaranının ilerlemeye ilk etapta dönüştüğü aktif kısımdır. Onu ihmal eden, antrenman emeğinin büyük kısmını boşa harcar.',
      },
      {
        title: 'En önemli toparlanma faktörü olarak uyku',
        content: 'Toparlanmayı uyku kadar güçlü etkileyen başka bir faktör yoktur. Uyku sırasında doku onarımı, motor kalıpların pekişmesi ve büyüme hormonunun salgılanması dahil önemli hormonal süreçler gerçekleşir.\n\nKanıtlar açıktır: Uykusuzluk gücü, performansı ve toparlanmayı bozar. Nedeltcheva ve ark.’nın bir çalışması (2010, Annals of Internal Medicine), kalorisi kısıtlanmış bir diyette çok az uyuyan kişilerin iyi dinlenmiş kişilere göre belirgin şekilde daha fazla kas kütlesi ve daha az yağ kaybettiğini gösterdi; uykusuzlukta vücut tercihen kastan feragat etti. Kronik uyku kaybında sakatlanma oranları da ölçülebilir şekilde artar.\n\nÇoğu sporcu için gecede yedi ila dokuz saat mantıklı bir hedeftir. Düzenli yatma saatleri, karanlık ve serin bir oda, akşamları ekran ve kafeinden kaçınmak uyku kalitesini belirgin şekilde iyileştirir.',
      },
      {
        title: 'Aşırı antrenmanın işaretleri',
        content: 'Gerçek aşırı antrenman sendromu nadirdir ve toparlanması haftalar ila aylar sürer; daha yaygın olanı aşırı zorlanma (overreaching) denen geçici bir aşırı yüklenmedir. Her ikisi de ciddiye alınması gereken benzer uyarı işaretleriyle kendini gösterir.\n\nTipik işaretler şunlardır: antrenmana rağmen süren performans düşüşü, alışılmadık derecede güçlü veya uzun süren kas ağrısı, uyku bozuklukları, yüksek dinlenik kalp atış hızı, sinirlilik, motivasyon kaybı ve daha sık enfeksiyonlar. Bunlardan birkaçı aynı anda görülürse bu, yükü azaltmak için net bir sinyaldir.\n\nÖnemli olan şu: Tek bir kötü antrenman günü aşırı antrenman değildir. Ancak bir ila iki hafta süren kalıcı bir örüntü ayarlamaya yol açmalıdır. En iyi çare genellikle daha fazlası değil daha azıdır: azaltılmış hacim, daha fazla uyku ve gerekirse bir deload haftası.',
      },
      {
        title: 'Deload ve yük yönetimi',
        content: 'Deload haftası, hacmin ve/veya yoğunluğun bilinçli olarak azaltıldığı planlı bir düşük yük evresidir; genellikle hacmin yaklaşık yarısına ya da çok daha hafif ağırlıklara inilir. Amacı, antrenman uyaranını tamamen kaybetmeden birikmiş yorgunluğu atmaktır.\n\nDeload’un ne zaman mantıklı olduğu kişiye bağlıdır. Birçok sporcu yoğun antrenmanın yaklaşık her 4–8 haftasında ya da uyarı işaretleri biriktiğinde böyle bir haftadan faydalanır. Yüksek hacimle çalışan ileri seviyedekiler buna yeni başlayanlardan daha sık ihtiyaç duyar.\n\nPlanlı deload’ların ötesinde süregelen yük yönetimi de önemlidir: Antrenman yoğunluğunu günlük forma göre ayarla, zor ve daha hafif antrenmanları dönüşümlü yap ve hayattaki stres kaynaklarını hesaba kat. Toparlanma katı bir şema değil, vücudun sinyallerini esnek biçimde dinlemektir.',
      },
      {
        title: 'Özet',
        content: 'İlerleme antrenmanın kendisinde değil, toparlanmada oluşur. Uyaranı sağlayıp toparlanmayı ihmal eden, sonuçları boşa harcar ve aşırı yüklenme riskine girer.\n\nEn etkili kaldıraçlar uyku (7–9 saat), yeterli kalori ve protein ile ara sıra deload haftaları içeren bilinçli yük yönetimidir. Süren performans düşüşü, kötü uyku ve motivasyon kaybı gibi uyarı işaretleri ciddiye alınmalıdır.\n\nToparlanma bir zayıflık işareti değil, asıl uyumun gerçekleştiği antrenman parçasıdır. Onu planlayan ve ona saygı gösteren kişi uzun vadede daha sağlıklı ve başarılı antrenman yapar.',
      },
    ],
  },

  technique_rom: {
    name: 'Teknik ve hareket açıklığı',
    summary: 'Tam hareket açıklığında temiz teknik, egzersizleri daha etkili ve daha güvenli kılar. Hedef kasın uyaranı almasını sağlar, sakatlanma riskini düşürür ve tüm ilerlemenin temelidir.',
    quick: [
      { label: 'Temel kural', text: 'Tam hareket açıklığı, kontrollü, hedef kasa odaklı: teknik ağırlıktan önce gelir.' },
      { label: 'Neden önemli', text: 'Daha iyi uyaran, daha düşük sakatlanma riski, ilerleme için sağlam bir temel.' },
    ],
    sections: [
      {
        title: 'Teknik neden önemli',
        content: 'İyi egzersiz tekniğinin iki temel işlevi vardır: Yükün gerçekten hedef kasa ulaşmasını sağlar ve eklemleri güvenli pozisyonlarda tutar. Bu ikisi birlikte bir egzersizin etkili ve sürdürülebilir olup olmadığını belirler.\n\nKötü teknikle antrenman yükü çoğu zaman istenmeyen kaslara veya bağlar ve tendonlar gibi pasif yapılara kaydırır. Bu yalnızca antrenman etkisini azaltmakla kalmaz, aşırı kullanım sakatlıkları riskini de artırır. Teknik bu nedenle kendi başına bir amaç değil, antrenmanın amacına hizmet etmesinin ön koşuludur.\n\nÖzellikle başlangıçta hareket kalıplarını hafif ağırlıklarla öğrenmek karşılığını verir. Sinir sistemi kalıpları tekrarla pekiştirir; temiz oturtulmuş teknik, ileride daha ağır yüklerin güvenle kaldırılabileceği temeli oluşturur.',
      },
      {
        title: 'Tam hareket açıklığı',
        content: 'Hareket açıklığı (ROM), bir kasın egzersiz sırasında çalıştığı mesafeyi ifade eder. Genel kural olarak mümkün olan en geniş açıklık, özellikle kas gelişimi için kısaltılmış bir açıklıktan üstündür.\n\nBirçok çalışma bunu destekler. Schoenfeld ve Grgic’in bir derlemesi (2020, SAGE Open Medicine), tam hareket açıklıklarının genel olarak kısmi hareketlerden daha fazla kas gelişimine yol açtığı sonucuna varır. Özellikle yük altındaki gerilmiş pozisyon güçlü bir gelişim uyaranı gibi görünür; örneğin derin squat’lar uyluk gelişimini yarım squat’lardan daha fazla destekler.\n\nİstisnalar da vardır: Bazı egzersizlerde veya sağlık kısıtlamalarında biraz uyarlanmış bir açıklık mantıklı olabilir. Ancak genel olarak iyi teknikle ve ağrısız kontrol edebildiğin en geniş açıklığı hedeflemelisin.',
      },
      {
        title: 'Tempo ve kontrol',
        content: 'Bir tekrarın ne kadar hızlı yapıldığı uyaranı etkiler. Özellikle eksantrik faz (ağırlığı indirme) kontrollü olmalıdır: Ağırlığı düşürme, aktif olarak frenle. Bu, kas üzerindeki gerilimi korur ve kontrolü iyileştirir.\n\nSık yapılan bir hata momentum kullanmaktır. Ağırlığı sarsıntılı hareketlerle yukarı savurmak işi kaslardan momentuma kaydırır ve böylece antrenman etkisini azaltır. Kontrollü, bilinçli tekrarlar neredeyse her zaman hızlı ve özensiz olanlardan daha etkilidir.\n\nBu, her tekrarın aşırı yavaş olması gerektiği anlamına gelmez. Mantıklı bir yön şudur: konsantrik faz (kaldırma) seri ama kontrollü, eksantrik faz (indirme) yaklaşık iki ila üç saniyede. Odak her zaman çalışan kası bilinçli olarak hissetmek ve hedeflemektir.',
      },
      {
        title: 'Sık yapılan hatalar ve çözümleri',
        content: 'En sık yapılan hata, teknik pahasına çok fazla ağırlıktır. Son tekrarlar yalnızca momentum, kaçamak hareketler veya eksik açıklıkla başarılıyorsa ağırlık fazladır. Çözüm basit: Ağırlığı azalt ve hareketi temiz yap.\n\nİkinci hata eksantrik fazı ihmal etmektir. Birçok kişi ağırlığı kontrolsüzce geri düşürür ve böylece uyaranın büyük bir kısmını boşa harcar. Bilinçli frenleme bunu hemen düzeltir.\n\nÜçüncü nokta hedef kasa dikkat etmemektir. “Mind-muscle connection”, yani çalışan kasa bilinçli odaklanma, özellikle izolasyon egzersizlerinde aktivasyonu iyileştirebilir. Kendi uygulamanın video kayıtları veya deneyimli sporculardan geri bildirim, teknik hataları tespit edip düzeltmeye yardımcı olur.',
      },
      {
        title: 'Özet',
        content: 'Tam hareket açıklığında temiz teknik, etkili ve güvenli antrenmanın temelidir. Hedef kasın uyaranı almasını sağlar ve eklemleri korur.\n\nMümkün olan en geniş kontrollü açıklığı hedefle, özellikle eksantrik fazı bilinçli yap ve momentumdan kaçın. Teknik her zaman ağırlıktan önce gelir; ancak hareket oturduğunda yük eklemek mantıklıdır.\n\nİyi teknik tek seferlik bir şey değil, süregelen bir önceliktir. Onu koruyan kişi daha etkili antrenman yapar, daha uzun süre sakatlanmadan kalır ve sürekli ilerlemenin temelini atar.',
      },
    ],
  },

  periodization: {
    name: 'Periyodizasyon ve planlama',
    summary: 'Periyodizasyon, antrenmanın zaman içinde planlı şekilde yapılandırılmasıdır: hacim, yoğunluk ve toparlanmanın değişen evreleriyle. Platolardan kaçınmaya, aşırı antrenmanı önlemeye ve uzun vadede sürekli ilerlemeye yardımcı olur.',
    quick: [
      { label: 'Ana fikir', text: 'Her hafta aynı şekilde antrenman yapmak yerine antrenmanı bilinçli olarak evrelere ayırarak planla.' },
      { label: 'Kimin için', text: 'Özellikle ileri seviyedekiler; yeni başlayanlar uzun süre basit doğrusal artışla idare eder.' },
    ],
    sections: [
      {
        title: 'Periyodizasyon nedir?',
        content: 'Periyodizasyon, antrenmanın farklı zaman dilimleri boyunca sistematik olarak planlanmasıdır. Her hafta aynı antrenmanı yapmak yerine hacim, yoğunluk, tekrar aralıkları ve egzersiz seçimi gibi değişkenler, uzun vadede ilerleme sağlamak ve yorgunluğu yönetmek için bilinçli olarak değiştirilir.\n\nKavram aslen performans sporundan gelir ve Leo Matveyev ile Tudor Bompa’nın çalışmalarına dayanır. Amaç, sporcuları belirli yarışmalara en iyi formda hazırlamaktı. Ancak temel fikir, yani yüklenme ile toparlanmayı planlı şekilde dönüşümlü uygulamak, antrenman yapan herkes için faydalıdır.\n\nGenellikle makrosiklus (aylardan bir yıla kadar süren genel plan), mezosiklus (belirli bir odağı olan birkaç haftalık bloklar) ve mikrosiklus (çoğunlukla bir antrenman haftası) ayrımı yapılır. Bu yapı, büyük hedefi yönetilebilir ve birbirinin üzerine inşa edilen aşamalara bölmeye yardımcı olur.',
      },
      {
        title: 'Periyodizasyon modelleri',
        content: 'Birkaç yerleşik model vardır. Doğrusal periyodizasyon yüksek hacim ve düşük yoğunlukla başlar ve haftalar içinde daha az hacme ve daha yüksek yoğunluğa kayar; klasik olarak örneğin hipertrofi evrelerinden güç evrelerine.\n\nDalgalı (undulating) periyodizasyon yükü daha kısa aralıklarla, çoğu zaman bir hafta içinde antrenmandan antrenmana değiştirir; örneğin bir gün ağır ve düşük tekrarlı, bir gün orta ve üçüncü gün yüksek tekrarlı. Bir meta-analiz, her iki modelin de etkili olduğunu ve pratikteki farkların çoğu zaman küçük kaldığını düşündürüyor (Williams et al., 2017, Sports Medicine).\n\nBlok periyodizasyon birkaç hafta boyunca tek bir odağa yoğunlaşır (ör. bir hacim bloğu, ardından bir yoğunluk bloğu). Hangi modelin en uygun olduğu hedeflere, deneyime ve tercihlere bağlıdır; asıl önemli olan, bilinçli varyasyon içeren bir plana sahip olmaktır.',
      },
      {
        title: 'Yeni başlayanların periyodizasyona ihtiyacı var mı?',
        content: 'Yeni başlayanlar için karmaşık periyodizasyon çoğu zaman gereksizdir. İlk aylarda vücut her antrenman uyaranına o kadar güçlü tepki verir ki basit bir doğrusal ilerleme, yani her hafta biraz daha fazla ağırlık veya tekrar, zaten mükemmel sonuçlar getirir. Bu evreye genellikle “novice gains” (başlangıç kazanımları) denir.\n\nAncak bu hızlı başlangıç ilerlemesi yavaşladığında, genellikle birkaç aydan yaklaşık bir yıla kadar süren düzenli antrenmandan sonra, daha düşünülmüş bir yapı gerçekten faydalı hâle gelir. O zaman değişen evreler, aşırı antrenmana veya durgunluğa düşmeden uyaran vermeye devam etmeye yardımcı olur.\n\nBu nedenle yeni başlayanlar için şu geçerlidir: Tutarlılık, iyi teknik ve basit ilerleme her türlü karmaşık planlamadan üstündür. Periyodizasyon ileri seviyedekiler için bir araçtır, başlangıç için bir zorunluluk değildir.',
      },
      {
        title: 'Basit bir plan oluşturmak',
        content: 'İyi bir antrenman planı hedeflerle ve mevcut zamanla başlar. Bunlardan antrenman sıklığı (ör. haftada 3–4 antrenman) ve bölünme ortaya çıkar; az antrenmanda tüm vücut, daha fazla antrenmanda üst/alt vücut ya da Push-Pull-Legs split gibi.\n\nBu temele göre egzersizler ve hacim dağıtılır; böylece her kas grubu ideal olarak haftada iki kez, toplamda yaklaşık 10–20 zorlu setle çalıştırılır. Temel egzersizler (squat, deadlift, bench press ve shoulder press, barfiks, row) temeli oluşturur ve zayıf noktalar için izolasyon egzersizleriyle tamamlanır.\n\nHaftalar boyunca ilerleme sağlanır (daha fazla ağırlık veya tekrar) ve yaklaşık her 4–8 haftada bir deload haftası planlanabilir. Bir planın karmaşık olması gerekmez: Hayatına uymalı, tutarlı şekilde uygulanmalı ve ilerlemene göre düzenli olarak uyarlanmalıdır.',
      },
      {
        title: 'Özet',
        content: 'Periyodizasyon, platolardan ve aşırı antrenmandan kaçınmak için antrenmanın zaman içinde planlı şekilde değiştirilmesidir. Yaygın modeller doğrusal, dalgalı ve blok periyodizasyondur; pratikte farklar çoğu zaman düşünülenden küçüktür.\n\nYeni başlayanların karmaşık periyodizasyona ihtiyacı yoktur; basit doğrusal ilerleme onları ilk aylarda epey ileri taşır. Planlı evrelerden belirgin şekilde ancak ileri seviyedekiler fayda görür.\n\nEn önemlisi hedeflere ve günlük hayata uyan, her kas grubunu yeterince çalıştıran, kademeli olarak artırılan ve toparlanmayı hesaba katan bir plandır. Yapı ve tutarlılık her türlü “mükemmel” yöntemden üstündür.',
      },
    ],
  },
};
