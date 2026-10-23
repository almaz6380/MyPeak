// Türkische Fassung von `src/data/nutritionKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Temel bilgiler',
    makros: 'Makro besinler',
    mikros: 'Mikro besinler',
    praxis: 'Uygulama',
  },

  energy_balance: {
    name: 'Enerji dengesi ve kaloriler',
    summary: 'Enerji dengesi, yani alınan ve harcanan kaloriler, kilo alıp almayacağını belirler. Beslenmenin en önemli temel ilkesidir ve diğer tüm ayrıntıların üzerinde durur.',
    quick: [
      { label: 'Ana fikir', text: 'Açık → kilo verme, fazla → kilo alma, denge → kilo sabit. Kalori kraldır.' },
      { label: 'Uygulama', text: 'TDEE’yi kabaca hesapla, hedef belirle, 2–3 hafta gözlemle, sonra ayarla.' },
    ],
    sections: [
      {
        title: 'Enerji dengesi ilkesi',
        content: 'Enerji dengesi, besinlerle aldığın enerji ile vücudunun harcadığı enerji arasındaki ilişkiyi tanımlar. Harcadığından fazlasını alırsan (fazla), vücut fazla enerjiyi depolar; özellikle yağ olarak. Aldığından fazlasını harcarsan (açık), vücut rezervlere başvurur ve kilo verirsin.\n\nBu ilke termodinamiğin birinci yasasına dayanır: Enerji kaybolmaz, yalnızca dönüşür. Çok sayıda kontrollü çalışma, kalorilerin hangi besinlerden geldiğinden bağımsız olarak enerji dengesinin kilo değişimlerinde belirleyici faktör olduğunu doğruluyor (Hall & Guo, 2017, Gastroenterology).\n\nBu, besin kalitesinin önemsiz olduğu anlamına gelmez. Kalite; tokluğu, sağlığı, performansı ve belirli bir kalori seviyesini ne kadar kolay koruyabileceğini etkiler. Ancak yalnızca “kilo almak mı vermek mi” sorusu için toplam kalori dengesi belirleyicidir.',
      },
      {
        title: 'Kalori harcamasının bileşenleri',
        content: 'Günlük toplam enerji harcaması (TDEE) dört bölümden oluşur. Bazal metabolizma hızı (BMR) %60–70 ile en büyük payı oluşturur; bu, vücudun dinlenme hâlinde solunum, dolaşım ve hücre metabolizması gibi hayati işlevler için ihtiyaç duyduğu enerjidir.\n\nBesinlerin termik etkisi (TEF) yaklaşık %10’dur: besinlerin sindirimi ve işlenmesi için harcanan enerji. Protein en yüksek termik etkiye sahiptir; proteinden zengin beslenmenin kilo vermeye yardımcı olmasının bir nedeni de budur.\n\nÜçüncü ve en değişken bölüm aktivitedir. Spor (EAT) ile yürüme, kıpırdanma ve ayakta durma gibi günlük hareket (NEAT, Non-Exercise Activity Thermogenesis) birbirinden ayrılır. NEAT kişiden kişiye günde birkaç yüz kalori farklılık gösterebilir ve kalori açığına çoğu zaman farkında olmadan daha az hareket ederek uyum sağlar.',
      },
      {
        title: 'Kalori ihtiyacını tahmin etmek',
        content: 'İhtiyacını tahmin etmek için önce bazal metabolizmanı, örneğin Mifflin-St Jeor formülüyle hesaplar ve bir aktivite katsayısıyla (çok az aktif için 1,2’den çok aktif için ~1,9’a kadar) çarparsın. Sonuç tahmini TDEE’ndir; yani kilonun sabit kaldığı kalori miktarı.\n\nÖnemli: Bu tür formüller yalnızca yaklaşık değerler verir. Gerçek harcama kişiden kişiye %10–20 sapabilir. Bu yüzden başlangıç değeri kesin bir yol haritası değil, yalnızca bir çıkış noktasıdır.\n\nEn güvenilir yol, kalori alımını sabit tutarken vücut ağırlığını iki üç hafta boyunca gözlemlemektir. Kilo sabit kalırsa koruma ihtiyacını bulmuşsundur. Artar ya da azalırsa kalorileri yaklaşık 200–300 kadar ayarlarsın. Böylece teoriyi kendi gerçeğine göre kalibre edersin.',
      },
      {
        title: 'Yaygın yanlış anlamalar',
        content: 'Yaygın bir yanılgı, “bozuk” ya da aşırı yavaş bir metabolizmaya inanmaktır. Gerçek metabolizma bozuklukları nadirdir; çoğu zaman kalori harcaması fazla, alım ise az tahmin edilir. Çalışmalar, insanların kalori alımlarını sıklıkla %20–50 oranında düşük tahmin ettiğini gösteriyor (Lichtman et al., 1992, New England Journal of Medicine).\n\nİkinci yanılgı: Bazı besinlerin “metabolizmayı hızlandırdığı” ve yağ erittiği. Bu tür etkiler çok küçüktür ve temel denklemi değiştirmez. Hiçbir yiyecek ya da içecek enerji dengesini devre dışı bırakmaz.\n\nÜçüncüsü, metabolik adaptasyon gerçektir ama sınırlıdır: Süregelen bir açıkta harcama biraz düşer (adaptif termogenez), ancak bu tamamen durmuş platoları açıklamaz. Açıkta olduğunu düşündüğü hâlde kilo veremeyen biri genellikle sandığından fazla yiyordur.',
      },
      {
        title: 'Özet',
        content: 'Enerji dengesi her beslenmenin temelidir: Açık kilo verdirir, fazla kilo aldırır, denge kiloyu korur. Makrolar, zamanlama, besin seçimi gibi diğer tüm ayrıntılar bu çerçevenin içinde etki eder.\n\nİhtiyacını bir formülle tahmin et, ama değeri yalnızca bir başlangıç noktası olarak gör ve gerçek kilo gelişimine göre kalibre et. Yalnızca teoriye güvenmek yerine ölç ve ayarla.\n\nBesin kalitesi, protein ve tokluk, bir kalori seviyesini ne kadar rahat ve sağlıklı koruyacağını belirler; ama kilo alıp vermeni denge belirler. Bu ilkeyi anlamak seni diyet modalarından bağımsız kılar.',
      },
    ],
  },

  protein: {
    name: 'Protein',
    summary: 'Protein, kas gelişimi ve korunması için en önemli makro besindir. En çok tokluk sağlar, en yüksek termik etkiye sahiptir ve kilo verirken kasları korur. Antrenman yapanlar için vücut ağırlığının kilogramı başına yaklaşık 1,6–2,2 g idealdir.',
    quick: [
      { label: 'Hedef miktar', text: 'Günlük vücut ağırlığının kg’ı başına yaklaşık 1,6–2,2 g; kilo verirken üst sınıra yakın.' },
      { label: 'Kaynaklar', text: 'Et, balık, yumurta, süt ürünleri, baklagiller, tofu, whey/protein tozu.' },
    ],
    sections: [
      {
        title: 'Protein neden bu kadar önemli',
        content: 'Proteinler amino asitlerden oluşur; amino asitler kasların, enzimlerin, hormonların ve vücuttaki neredeyse her yapının yapı taşlarıdır. Bu amino asitlerden dokuzu esansiyeldir: Vücut onları kendisi üretemez, besinlerle alınmaları gerekir.\n\nSporcular için protein özellikle önemlidir, çünkü kas protein sentezini, yani antrenmandan sonra yeni kas kütlesinin inşa edildiği süreci uyarır. Yeterli protein olmadan sert antrenman bile kas gelişimine pek dönüşmez.\n\nAyrıca protein kilo kontrolünde iki pratik avantaj sağlar: Karbonhidrat veya yağdan daha fazla tokluk verir ve en yüksek termik etkiye sahiptir (protein kalorilerinin yaklaşık %20–30’u sindirimde harcanır). Her ikisi de onu kilo verirken en değerli makro besin yapar.',
      },
      {
        title: 'Ne kadar proteine ihtiyacın var?',
        content: 'Eksikliği önlemek için resmî asgari miktar vücut ağırlığının kilogramı başına 0,8 g’dır; ama bu sporcular için optimumun çok altındadır. Morton et al. (2018, British Journal of Sports Medicine) tarafından yapılan kapsamlı bir meta-analiz, kas gelişimi için en büyük faydayı yaklaşık 1,6 g/kg’ın sağladığını, yaklaşık 2,2 g/kg’a kadar ek fayda olasılığı bulunduğunu buldu.\n\nKilo verirken üst sınır daha mantıklıdır. Kalori açığında ihtiyaç artar, çünkü protein kasları yıkıma karşı korur. Helms et al. (2014), açıktaki sporcular için yağsız kütlenin kilogramı başına 2,3–3,1 g’a kadar öneriyor.\n\nAntrenman yapanların çoğu için vücut ağırlığının kilogramı başına yaklaşık 2 g’lık basit bir yönerge pratik ve etkilidir. Daha fazlası sağlıklı insanlara zarar vermez, ama neredeyse hiç ek fayda getirmez.',
      },
      {
        title: 'Kalite ve dağılım',
        content: 'Tüm protein kaynakları aynı değildir. “Kalite”, esansiyel amino asit içeriğine, özellikle lösine ve sindirilebilirliğe bağlıdır. Hayvansal kaynaklar (et, balık, yumurta, süt ürünleri) çoğunlukla tamdır; bitkisel kaynaklar ise sıklıkla tek tek amino asitlerde sınırlıdır, ama kombinasyonla (ör. baklagiller artı tahıllar) tamamlanabilir.\n\nGün içindeki dağılım da rol oynar. Kas protein sentezi öğün başına yaklaşık 20–40 g kaliteli proteinle en üst düzeyde uyarılır. Bu yüzden proteini tek bir öğünde yemek yerine üç ila beş öğüne dağıtmak mantıklıdır.\n\nPratikte bu şu demek: Her ana öğün iyi bir protein kaynağı içermelidir. Ancak gün boyunca toplam miktar en önemli faktör olmaya devam eder; mükemmel dağılım, günlük hedefe ulaşmaya göre ikinci plandadır.',
      },
      {
        title: 'Mitler ve güvenlik',
        content: 'İnatçı bir mit, çok proteinin böbreklere zarar verdiğidir. Sağlıklı insanlarda bu kanıtlanmamıştır; kontrollü çalışmalar yüksek protein alımının böbrek işlevi üzerinde olumsuz bir etkisini göstermiyor (Devries et al., 2018, Journal of Nutrition). Yalnızca mevcut bir böbrek hastalığında doktora danışmak gerekir.\n\nBaşka bir mit: Vücudun öğün başına yalnızca yaklaşık 30 g proteini “kullanabildiği”. Aslında daha fazlası da sindirilir ve kullanılır; yalnızca kas protein sentezi üzerindeki akut uyaran düzleşir. Yani daha büyük porsiyonlar boşa gitmez.\n\nWhey gibi protein tozları pratiktir ama şart değildir. Yalnızca rahat ve uygun fiyatlı bir protein kaynağıdırlar. İhtiyacını normal besinlerle karşılayanın takviyeye ihtiyacı yoktur; bunlar bir araçtır, mucize değil.',
      },
      {
        title: 'Özet',
        content: 'Protein, kas gelişimi, kasın korunması ve tokluk için anahtar makro besindir. Antrenman yapanlar için vücut ağırlığının kilogramı başına yaklaşık 1,6–2,2 g idealdir; kilo verirken üst sınıra yakın.\n\nKaliteli kaynaklara yönel, proteini birkaç öğüne dağıt ve her şeyden önce günlük hedefine ulaş. Hayvansal mı bitkisel mi olduğu, toplam miktar ve kalite doğru olduğu sürece ikinci plandadır.\n\n“Fazla” proteine karşı yaygın uyarılar sağlıklı insanlar için temelsizdir. Protein, kesinliğin en çok karşılığını verdiği makro besindir: Vücut kompozisyonu ve tokluk için en büyük farkı o yaratır.',
      },
    ],
  },

  carbs: {
    name: 'Karbonhidratlar',
    summary: 'Karbonhidratlar yoğun antrenman için en önemli enerji kaynağıdır. Kendi başlarına “kilo aldırıcı” değildirler; belirleyici olan toplam kalori dengesidir. Yine de kalite, miktar ve zamanlama performansı ve iyi hissetmeyi belirgin şekilde etkileyebilir.',
    quick: [
      { label: 'İşlev', text: 'Yoğun yüklenme için ana yakıt; kaslardaki ve karaciğerdeki glikojen depolarını doldurur.' },
      { label: 'Uygulama', text: 'Çoğunlukla lif açısından zengin, az işlenmiş kaynaklar; miktarı aktiviteye göre ayarla.' },
    ],
    sections: [
      {
        title: 'Karbonhidratlar vücutta ne yapar',
        content: 'Karbonhidratlar vücutta glikoza parçalanır; glikoz yoğun kas çalışması için tercih edilen yakıt ve beyin için en önemli enerji kaynağıdır. Fazla glikoz kaslarda ve karaciğerde glikojen olarak depolanır; hızlı kullanılabilir bir enerji deposu.\n\nYoğun kuvvet ve interval antrenmanında vücut bu kas glikojenine büyük ölçüde başvurur. İyi dolu depolar daha fazla performans, daha fazla tekrar ve daha iyi antrenman kalitesi demektir. Uzun süre düşük karbonhidrat alımında bu depolar kısmen boşalabilir ve yüksek yoğunluk alanındaki performans düşebilir.\n\nAncak karbonhidratlar katı anlamda esansiyel değildir; vücut glikozu kendisi de üretebilir. Yine de sportif performans ve iyi hissetmek için çoğu insana, özellikle yoğun antrenmanda, çok faydalıdırlar.',
      },
      {
        title: 'Kalite: kompleks ve basit karbonhidratlar',
        content: 'Karbonhidrat kaynakları etkileri bakımından büyük farklılık gösterir. Tam tahıl ürünleri, baklagiller, meyve ve sebze gibi lif açısından zengin, az işlenmiş kaynaklar daha yavaş sindirilir, daha iyi tok tutar ve mikro besin sağlar. Şeker ve beyaz un ürünleri gibi yoğun işlenmiş kaynaklar hızla emilir ve neredeyse hiç tok tutmaz.\n\nLif özel ilgiyi hak eder. Sindirimi destekler, bağırsak bakterilerini besler ve tokluğu artırır. Günde yaklaşık 25–35 g önerilir; birçok insan bunun belirgin şekilde altında kalır. Lif açısından zengin beslenme daha iyi sağlık ve daha kolay kilo kontrolüyle ilişkilidir.\n\nBu, basit karbonhidratların yasak olduğu anlamına gelmez. Antrenman çevresinde hızlı kullanılabilir karbonhidratlar mantıklı bile olabilir. Ancak günlük hayatta büyük kısım besin değeri yüksek, lifli kaynaklardan gelmelidir.',
      },
      {
        title: 'Ne kadar karbonhidrat?',
        content: 'Protein ve yağdan sonra hedefindeki kalan kalorileri karbonhidratla doldurabilirsin. Sabit bir “doğru” miktar yoktur; aktiviteye, tercihlere ve hedeflere bağlıdır. Çok aktif insanlar daha fazla karbonhidrattan fayda görür, daha az aktif olanlar daha azıyla idare eder.\n\nYoğun antrenman yapanlar için çoğu zaman vücut ağırlığının kilogramı başına 3–5 g veya daha fazlası belirtilir. Az spor yapan ya da daha düşük karbonhidratlı beslenmeyi tercih eden biri, protein ve toplam kalori doğru olduğu sürece, dezavantaj yaşamadan bunun belirgin şekilde altında kalabilir.\n\nLow-carb ve ketojenik beslenme biçimleri, kaloriler eşit olduğu sürece kilo vermek için karbonhidratı daha yüksek olanlar kadar iyi işler. Sihirli bir yağ yakıcı değildirler, ama kendini onlarla daha iyi hisseden ya da daha iyi tok kalan insanlar için meşru bir seçenektir.',
      },
      {
        title: 'İnsülin miti',
        content: 'Yaygın bir mit, karbonhidratların yalnızca insülin salgısı yoluyla kilo aldırdığını söyler. İnsülin, karbonhidratlı öğünlerden sonra yükselen bir depolama hormonudur; buradan karbonhidratların yağ artışının asıl nedeni olduğu teorisi türetilmiştir.\n\nAncak kontrollü çalışmalar bunu açıkça çürütüyor. Kalori ve protein miktarı aynıyken düşük karbonhidratlı beslenme, karbonhidratı yüksek beslenmeden daha fazla yağ kaybına yol açmıyor (Hall et al., 2016, American Journal of Clinical Nutrition). İnsülin kısa vadeli depolama süreçlerini yönetir, ama toplam enerji dengesini devre dışı bırakmaz.\n\nSağlıklı insanlar için karbonhidratlara verilen normal insülin tepkileri tamamen sorunsuzdur. Diyabet veya insülin direncinde durum farklıdır; burada karbonhidrat kontrolü tıbbi açıdan önemlidir ve doktor eşliğinde yapılmalıdır.',
      },
      {
        title: 'Özet',
        content: 'Karbonhidratlar yoğun antrenmanın ana yakıtıdır ve kesinlikle kendi başına kilo aldırıcı değildir; kalori dengesi belirler. Glikojen depolarını doldurur, performansı ve toparlanmayı desteklerler.\n\nÇoğunlukla lif açısından zengin, az işlenmiş kaynaklar seç ve miktarı aktivitene göre ayarla. Antrenman çevresinde daha hızlı karbonhidratlar mantıklı olabilir.\n\nNe low-carb ne de high-carb temelde üstündür; uygun kalorilerle ikisi de işe yarar. Kendini iyi hissettiğin, iyi antrenman yaptığın ve uzun vadede sürdürebildiğin yaklaşımı seç.',
      },
    ],
  },

  fats: {
    name: 'Yağlar',
    summary: 'Besinsel yağ; hormonlar, hücre zarları ve yağda çözünen vitaminlerin emilimi için esansiyeldir. Belirli bir asgari miktar sağlık açısından önemlidir; yağın türü salt miktardan daha önemlidir.',
    quick: [
      { label: 'Asgari miktar', text: 'Sürekli olarak vücut ağırlığının kg’ı başına ~0,5–0,8 g’ın altına düşme (hormon işlevi).' },
      { label: 'Kalite', text: 'Doymamış yağları (zeytinyağı, kuruyemiş, balık) tercih et; trans yağlardan kaçın.' },
    ],
    sections: [
      {
        title: 'Besinsel yağın rolü',
        content: 'Yağ bir enerji taşıyıcısından çok daha fazlasıdır. Her hücre zarının yapı taşı, testosteron ve östrojen gibi steroid hormonların hammaddesidir ve yağda çözünen A, D, E ve K vitaminlerinin emilimi için gereklidir. Bu nedenle fazla yağsız bir beslenme hormon üretimini ve besin emilimini olumsuz etkileyebilir.\n\nGram başına 9 kalori ile yağ, enerji yoğunluğu en yüksek makro besindir; protein veya karbonhidratın (her biri 4 kcal) iki katından fazla. Bu, yağ yoluyla farkında olmadan çok kalori almayı kolaylaştırır; bu yüzden kilo verirken bilinçli davranmak faydalıdır.\n\nİki yağ asidi esansiyeldir: Omega-3 ve Omega-6. Vücut bunları kendisi üretemez. Özellikle yağlı balıklardan gelen Omega-3 yağ asitleri birçok insanda yetersiz alınır ve çok sayıda sağlık faydasıyla ilişkilidir.',
      },
      {
        title: 'Yağ türleri',
        content: 'Doymamış yağlar özellikle olumlu kabul edilir. Tekli doymamış yağlar (zeytinyağı, avokado, kuruyemiş) ve çoklu doymamış yağlar (yağlı balık, keten tohumu, ceviz) kalp sağlığını destekler ve esansiyel yağ asitleri sağlar. Yağ alımının büyük kısmını bunlar oluşturmalıdır.\n\nDoymuş yağlar (et, tereyağı, hindistan cevizi yağında) kendi başına zararlı değildir, ama ölçülü tüketilmelidir. Çoğu uzman kuruluşun önerileri toplam kalorinin %10’unun altındadır. Kesin etkilerine dair veriler tartışılsa da bir kısmının doymamış yağlarla değiştirilmesi faydalı kabul edilir.\n\nYapay trans yağlar, açıkça kaçınılması gereken tek yağ türüdür. Yağların endüstriyel olarak sertleştirilmesi sırasında oluşurlar ve kalp-damar hastalıklarıyla güçlü bir şekilde ilişkilidirler. Birçok ülkede artık sıkı şekilde düzenlenmiş veya yasaklanmıştır.',
      },
      {
        title: 'Ne kadar yağ?',
        content: 'Proteinden farklı olarak yağda öncelikle dikkat edilmesi gereken bir alt sınır vardır. Sürekli çok yağsız beslenme (vücut ağırlığının kilogramı başına yaklaşık 0,5 g’ın altında) bazı insanlarda hormon üretimini olumsuz etkileyebilir. Mantıklı bir asgari değer kilogram başına yaklaşık 0,5–0,8 g’dır.\n\nYukarı doğru yağ esnektir. Protein belirlendikten sonra kalan kaloriler tercihe göre yağ ve karbonhidrata dağıtılabilir. Bazıları daha fazla yağ ve daha az karbonhidratla kendini daha iyi hisseder, bazıları tersi; ikisi de sağlık açısından kabul edilebilir.\n\nTipik öneriler toplam kalorinin yaklaşık %20–35’inin yağdan gelmesi yönündedir. Kesin yüzdeden daha önemlisi asgari ihtiyacı karşılamak, çoğunlukla kaliteli yağlar seçmek ve toplam kaloriyi gözden kaçırmamaktır.',
      },
      {
        title: 'Odakta Omega-3',
        content: 'Yağlar arasında Omega-3 yağ asitleri EPA ve DHA özel ilgiyi hak eder. İltihabı düzenleyici etki gösterirler ve daha iyi kalp-damar ve beyin sağlığıyla ilişkilidirler. Ana kaynak somon, uskumru ve ringa gibi soğuk su yağlı balıklarıdır.\n\nBirçok insan çok az Omega-3 alırken aynı zamanda (işlenmiş yağlardan) çok Omega-6 alır; bu da oranı olumsuz yönde kaydırır. Haftada iki üç porsiyon yağlı balık, alımı belirgin şekilde iyileştirir.\n\nBalık yemeyen biri alg veya balık yağı takviyesini düşünebilir. Bitkisel Omega-3 kaynakları (keten tohumu, ceviz) ALA sağlar, ama vücut bunu etkili EPA ve DHA formlarına yalnızca sınırlı ölçüde dönüştürür. Takviye kullanımıyla ilgili sağlık sorularında doktora danışmak mantıklıdır.',
      },
      {
        title: 'Özet',
        content: 'Yağ; hormonlar, hücre zarları ve vitamin emilimi için esansiyeldir. Sürekli olarak vücut ağırlığının kilogramı başına yaklaşık 0,5–0,8 g’ın altına düşme; aksi hâlde hormon işlevi ve iyi hissetme zarar görebilir.\n\nYağ kalitesi önemlidir: Zeytinyağı, kuruyemiş, avokado ve yağlı balıktan gelen doymamış yağları tercih et, doymuş yağları ölçülü tut ve yapay trans yağlardan kaçın. Yeterli Omega-3 alımına özellikle dikkat et.\n\nAsgari miktarın üzerinde yağ miktarı esnektir ve bir zevk meselesidir. Yağ ile karbonhidrat arasındaki dağılımı tercihlerine uyacak ve toplam kaloriler doğru olacak şekilde seç.',
      },
    ],
  },

  micronutrients: {
    name: 'Vitaminler ve mineraller',
    summary: 'Mikro besinler enerji sağlamaz, ama sayısız vücut işlevi için vazgeçilmezdir. Çeşitli, bütüncül bir beslenme ihtiyacı çoğu zaman karşılar; yine de bazı besin öğeleri özel ilgiyi hak eder.',
    quick: [
      { label: 'Temel kural', text: 'Sebze, meyve, tam tahıl ve protein kaynaklarında çeşitlilik çoğu mikro besini karşılar.' },
      { label: 'Dikkat', text: 'D vitamini, Omega-3, gerekirse demir (kadınlar), B12 (vegan), iyot, magnezyum.' },
    ],
    sections: [
      {
        title: 'Mikro besinler nedir',
        content: 'Mikro besinler, vücudun yalnızca küçük miktarlarda ihtiyaç duyduğu vitaminleri ve mineralleri kapsar; enerji sağlayan makro besinlerin (protein, karbonhidrat, yağ) aksine. Kalorileri olmasa da neredeyse her metabolik sürece katılırlar: enerji üretimi, bağışıklık işlevi, kemik sağlığı, oksijen taşınması ve çok daha fazlası.\n\nMikro besin eksikliği sinsi bir şekilde ortaya çıkabilir: yorgunluk, daha kötü toparlanma, enfeksiyonlara yatkınlık veya azalan performansla. Özellikle kalorisi kısıtlanmış veya tek yönlü beslenmede yetersiz alım riski artar.\n\nİyi haber: Bol sebze, meyve, tam tahıl ürünleri, kaliteli protein kaynakları ve sağlıklı yağlar içeren çeşitli bir beslenme, çoğu mikro besinin ihtiyacını doğal yoldan karşılar. Besin çeşitliliği eksikliklere karşı en iyi sigortadır.',
      },
      {
        title: 'Kritik besin öğelerine dikkat',
        content: 'Bazı mikro besinler iyi beslenmede bile sıklıkla yetersiz kalır. D vitamini esas olarak güneş ışığıyla oluşur ve birçok bölgede, özellikle kışın, yetersiz alınır. Burada takviye çoğu zaman mantıklıdır, ideal olarak bir kan testinden sonra.\n\nDemir özellikle adet gören kadınlar için bir konudur, çünkü düzenli kan kayıpları ihtiyacı artırır. Eksiklik yorgunluk ve performans düşüşüyle kendini gösterir. B12 vitamini neredeyse yalnızca hayvansal ürünlerde bulunur; vegan yaşayanların mutlaka takviye etmesi gerekir.\n\nSıklıkla yetersiz kalan diğer besin öğeleri iyot, magnezyum, çinko ve Omega-3’tür. Her şeyi gelişigüzel takviye etmek yerine kendi ihtiyacına hedefli bakmak daha akıllıcadır; ideal olarak kan değerleri üzerinden ve bir doktora danışarak.',
      },
      {
        title: 'Takviyeden önce besin',
        content: 'Temel kural şudur: Bütüncül besinler gıda takviyelerine tercih edilmelidir. Mikro besinleri, birlikte etki eden lif, ikincil bitki bileşikleri ve diğer maddelerle doğal bir bütün içinde sunarlar. Hap formundaki tek bir vitamin bu karmaşıklığın yerini tutamaz.\n\nİzole vitamin preparatlarıyla ilgili çalışmalar, eksikliği olmayan sağlıklı insanlar için çoğu zaman hayal kırıklığı yaratan sonuçlar ya da hiç fayda göstermiyor; aşırı dozda kısmen zarar bile. Daha fazlası daha iyi değildir: Yağda çözünen vitaminler (A, D, E, K) birikebilir ve yüksek dozlarda zararlı olabilir.\n\nTakviyeler, gerçek bir eksiklik veya artmış bir ihtiyaç olduğunda mantıklıdır; örneğin kışın D vitamini, vegan beslenmede B12 veya kanıtlanmış eksiklikte demir. Hedefli bir tamamlayıcı olarak faydalıdırlar, iyi beslenmenin yerine geçen bir şey olarak değil.',
      },
      {
        title: 'Pratikte uygulama',
        content: 'İyi bir mikro besin alımı için en basit strateji çeşitlilik ve renktir. Farklı renklerdeki sebze ve meyveler farklı vitaminler ve ikincil bitki bileşikleri sağlar; “gökkuşağını ye” pratik bir kuraldır.\n\nSomut olarak her ana öğüne sebze planlamak, düzenli olarak baklagiller, kuruyemiş ve tohumlar eklemek, farklı protein kaynaklarını dönüşümlü kullanmak ve yoğun işlenmiş ürünler yerine tam tahılı tercih etmek yardımcı olur. Böylece neredeyse kendiliğinden geniş bir besin temeli oluşur.\n\nÇok işlenmiş ve tek yönlü yiyen biri, yeterli kaloriye rağmen eksiklik riskine girer; bu olgu bazen “aşırı beslenmiş ama yetersiz beslenmiş” olarak tanımlanır. Bu nedenle besinlerin kalitesi, sağlam bir mikro besin alımının anahtarıdır.',
      },
      {
        title: 'Özet',
        content: 'Mikro besinler enerji sağlamaz, ama sağlık, toparlanma ve performans için vazgeçilmezdir. Çeşitli, bütüncül bir beslenme çoğu vitamin ve mineralin ihtiyacını karşılar.\n\nD vitamini, Omega-3 ve duruma göre demir, B12, iyot ve magnezyum özel ilgiyi hak eder. Toptan takviye yapmak yerine kendi ihtiyacına, ideal olarak kan değerleri üzerinden, hedefli bakmak karşılığını verir.\n\nBütüncül besinler takviyeden önce gelir. Tabakta çeşitlilik ve renk, iyi bir mikro besin alımı için en iyi ve en basit stratejidir.',
      },
    ],
  },

  meal_timing: {
    name: 'Öğün zamanlaması',
    summary: 'Ne zaman ve ne sıklıkla yediğin, ne ve ne kadar yediğinden çok daha az önemlidir. Zamanlama performansa ve iyi hissetmeye ince ayar yapabilir, ama kalori ve protein temellerinin yerini asla tutmaz.',
    quick: [
      { label: 'Öncelik', text: 'Önce toplam kalori ve protein; zamanlama temel değil, ince ayardır.' },
      { label: 'Faydalı', text: 'Proteini güne yay; antrenman çevresinde yeterince ye.' },
    ],
    sections: [
      {
        title: 'Doğru yere koymak',
        content: 'Öğün zamanlaması etrafında birçok mit dolaşıyor: antrenmandan hemen sonraki “anabolik pencereden” akşamları karbonhidrat yeme yasağına kadar. Gerçekte zamanlama, ancak temeller doğru olduğunda önem kazanan bir ince ayar faktörüdür: toplam kalori, protein ve besin kalitesi.\n\nBeslenmenin hiyerarşisi açıktır: Önce enerji dengesi gelir, sonra makro besinler (özellikle protein), sonra besin kalitesi ve mikro besinler; ve ancak bundan sonra zamanlama ve öğün sıklığı. Üst katmanları ihmal eden biri mükemmel zamanlamayla hiçbir şeyi kurtaramaz.\n\nBu, zamanlamanın işe yaramaz olduğu anlamına gelmez. Performansı, tokluğu ve iyi hissetmeyi iyileştirebilir. Ama son ve en küçük ayar koludur; stres ya da karmaşık kurallar için bir sebep değil.',
      },
      {
        title: '“Anabolik pencere”',
        content: 'Uzun süre, antrenmandan hemen sonra protein ve karbonhidrat alınması gerektiği, aksi hâlde antrenman etkisinin boşa gideceği kuralı geçerliydi. Bu dar “anabolik pencere” abartı olduğunu gösterdi.\n\nSchoenfeld, Aragon & Krieger (2013, Journal of the International Society of Sports Nutrition) tarafından yapılan bir meta-analiz, antrenman çevresinde protein alımının kesin zamanının, günlük toplam protein miktarından çok daha az önemli olduğunu buldu. “Pencere” birkaç dakikadan çok birkaç saat genişliğindedir.\n\nPratikte bu şu demek: Gün boyunca yeterli protein yediğin ve antrenmandan saatlerce önce ve sonra tamamen aç kalmadığın sürece acele etmen gerekmez. Aç karnına antrenman yapan biri, antrenmandan görece kısa süre sonra bir öğünden fayda görebilir; acil fizyolojik nedenlerden çok pratik nedenlerle.',
      },
      {
        title: 'Öğün sıklığı ve aralıklı oruç',
        content: 'Üç büyük mü yoksa altı küçük öğün mü yediğin, kalori ve protein aynı kaldığı sürece metabolizma veya yağ kaybı üzerinde neredeyse hiç etki yapmaz. Sık küçük öğünlerin “metabolizmayı hızlandırdığı” şeklindeki eski inanç çürütülmüştür; termik etki sıklığa değil toplam miktara bağlıdır.\n\nAralıklı oruç (ör. 16:8) popülerdir ve birçok kişi için kalori alımını yönetmekte faydalı bir araçtır. Ancak sihirli bir yağ yakıcı değildir: Kaloriler aynıyken eşit dağılmış bir beslenmeden daha fazla yağ kaybına yol açmaz. Faydası esas olarak bazı insanların bu şekilde açıkta kalmayı daha kolay bulmasıdır.\n\nEn iyi öğün sıklığı, günlük hayatına uyan, seni iyi tok tutan ve sürdürebildiğin sıklıktır. Kas gelişimi için proteini en az üç dört porsiyona dağıtmak mantıklıdır; bunun ötesinde sıklık bir zevk meselesidir.',
      },
      {
        title: 'Pratikte mantıklı zamanlama',
        content: 'Zamanlama ikinci planda olsa da pratikte faydalı birkaç nokta vardır. Antrenmandan önce, bir ila üç saat önce yenen karbonhidrat ve biraz protein içeren bir öğün iyi enerji ve performans sağlar. Antrenmandan kısa süre önce fazla dolu bir mide ise rahatsız edici olabilir.\n\nAntrenmandan sonra, toparlanmayı ve glikojen depolarının doldurulmasını desteklemek için birkaç saat içinde protein ve karbonhidrat içeren bir öğün mantıklıdır. Kesin zaman esnektir; son setten sonraki meşhur saniye olmak zorunda değil.\n\nUyku ve sindirim de zamanlamadan fayda görür: Yatmadan hemen önce çok büyük veya acılı öğünler uykuyu bozabilir. Ancak akşam karbonhidrat yiyen biri yağlanmaktan korkmak zorunda değildir; günlük denge doğru olduğu sürece bu bir mittir.',
      },
      {
        title: 'Özet',
        content: 'Öğün zamanlaması beslenmenin temeli değil, ince ayarıdır. Sonucun en büyük kısmını toplam kalori ve protein belirler; zamanlama ve sıklık ikinci plandadır.\n\n“Anabolik pencere” dakikalar değil, birkaç saat genişliğindedir. Öğün sıklığı ve aralıklı oruç, kaloriler aynıyken eşdeğerdir; günlük hayatına uyanı ve seni iyi tok tutanı seç.\n\nFaydalı olan, proteini güne yaymak ve antrenman çevresinde yeterince yemektir. Gerisi bireysel optimizasyondur, zorunluluk değil. Temeller doğru olduğu sürece zamanlama için strese girme.',
      },
    ],
  },
};
