// Türkische Fassung von `src/data/supplementsKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Temel bilgiler',
    leistung: 'Performans',
    gesundheit: 'Sağlık',
  },

  creatine: {
    name: 'Kreatin',
    summary: 'Kreatin, güç ve kas gelişimi için en iyi araştırılmış ve en etkili takviyedir. Güvenli ve ucuzdur; kısa, yoğun yüklenmelerde performansı kanıtlanmış şekilde artırır. Kreatin monohidrat tercih edilen formdur.',
    quick: [
      { label: 'Dozaj', text: 'Günde 3–5 g monohidrat, sürekli; zamanlama önemsiz. Yükleme evresi isteğe bağlı. Daha fazla kas kütlesi, aralığın üst ucuna daha yakın demek.' },
      { label: 'Etki', text: 'Daha fazla güç ve tekrar, kas gelişimini destekler, iyi kanıtlanmış ve güvenli.' },
    ],
    sections: [
      {
        title: 'Kreatin nedir ve nasıl etki eder',
        content: 'Kreatin, kaslarda ve beyinde bulunan, vücudun kendi ürettiği bir maddedir ve et ile balık gibi hayvansal besinlerle de alınır. Kasta kreatin fosfat olarak depolanır ve hücrenin doğrudan enerji taşıyıcısı olan ATP’nin hızla yenilenmesine hizmet eder.\n\nKuvvet antrenmanındaki ağır setler veya sprintler gibi kısa, yoğun yüklenmelerde ATP saniyeler içinde tükenir. Kreatin fosfat onu hızla yeniden oluşturmaya yardım eder; böylece daha fazla güç daha fazla tekrar boyunca korunabilir. Dolu kreatin depoları bu yüzden daha fazla antrenman performansı demektir.\n\nTakviyeyle kastaki kreatin içeriği normal seviyenin yaklaşık %20–40 üzerine çıkarılabilir. Yüzlerce çalışmada tutarlı biçimde doğrulanan performans artırıcı etkiyi tam olarak bu artış açıklar.',
      },
      {
        title: 'Çalışmaların durumu',
        content: 'Kuvvet sporcuları için hiçbir takviye kreatin kadar iyi araştırılmamıştır. International Society of Sports Nutrition’ın bir tutum bildirisi (Kreider et al., 2017, Journal of the International Society of Sports Nutrition) şöyle özetliyor: Kreatin monohidrat, yüksek yoğunluklu yüklenmelerde performansı artırmak ve kas gelişimini desteklemek için en etkili gıda takviyesidir.\n\nEtkiler iyi ölçülebilir: Kuvvet antrenmanıyla birlikte kreatin, güç kazanımlarını ve yağsız kütleyi yalnızca antrenmana kıyasla belirgin şekilde daha fazla artırır. Fayda neredeyse tüm yaş gruplarında ve performans seviyelerinde görülür.\n\nSporun ötesinde kreatin, olası bilişsel ve sağlık faydaları açısından giderek daha çok araştırılıyor; örneğin zihinsel yorgunlukta veya yaşlılıkta. Bu araştırmalar umut verici, ama henüz fiziksel performansla ilgili veriler kadar net değil; aşağıdaki ayrı bölüm orada neyin kanıtlandığını ve neyin kanıtlanmadığını anlatıyor.',
      },
      {
        title: 'Dozaj ve kullanım',
        content: 'Kullanımı basittir. En yaygın olanı günlük 3–5 g kreatin monohidrat idame dozudur. Zamanlama önemli bir rol oynamaz; önemli olan yalnızca günlük ve sürekli alımdır, çünkü depolar zamanla dolar.\n\nİsteğe bağlı olarak bir yükleme evresi vardır: depoları daha hızlı doldurmak için beş ila yedi gün boyunca günde yaklaşık 20 g (dört porsiyona bölünmüş). Ardından normal idame dozu gelir. Yükleme evresi yalnızca etkiyi hızlandırır; onsuz da depolar yaklaşık üç dört hafta sonra dolmuş olur.\n\nKreatin monohidrat en iyi araştırılmış ve en ucuz formdur; daha pahalı türlerin (ör. Kre-Alkalyn, kreatin HCl) kanıtlanmış ek bir faydası yoktur. Creapure gibi kalite mührü taşıyan bir ürüne dikkat etmek tavsiye edilir.\n\n3 ila 5 g aralığı tesadüf değildir, kas kütlesine bağlıdır: ISSN’in tutum bildirisi günde vücut ağırlığının kilogramı başına yaklaşık 0,03 g ile hesaplar. Ağır ve kaslı olan biri aralığın üst ucuna, hafif olan biri alt ucuna daha yakındır. Bundan, kas için 5 g’ın belirgin şekilde üzerine çıkmak için bir neden çıkmaz.',
      },
      {
        title: 'Beyin için kreatin: neyin kanıtlandığı ve neyin kanıtlanmadığı',
        content: 'Kreatin yalnızca kasta değil, beyinde de bulunur ve orada da aynı görevi yerine getirir: ATP’yi hızla yenilemek. Buradan, daha yüksek dozların bilişsel avantajlar sağlayacağı ve “aslında doğru” miktarın 3–5 g’ın çok üzerinde olduğu şeklinde yaygın bir varsayım doğmuştur.\n\nVeriler bunu şimdiye kadar desteklemiyor. İki bulgu önemli. Birincisi, beyindeki kreatini artırmak kastakinden çok daha zordur: Kas içeriği %20–40 artarken derleme çalışmalar beyin için yaklaşık %3–10 buluyor. Kan-beyin bariyeri alımı yavaşlatır ve beyin kreatininin bir kısmını kendisi üretir. İkincisi, optimal miktar düpedüz bilinmiyor; doz ile beyin kreatini arasındaki ilişkiyi şimdiye kadar yalnızca bir avuç çalışma incelemiş.\n\nBunun ne kadar az doğrusal olduğunu, vejetaryenlere ve karışık beslenenlere yedi gün boyunca kilogram başına 0,3 g, yani 80 kg’da günde yaklaşık 24 g veren bir çalışma gösteriyor. Kas değeri belirgin şekilde arttı, beyin değeri ölçülebilir şekilde artmadı.\n\nDaha yüksek dozlar elbette araştırılıyor: Birkaç hafta boyunca günde 10 ve 20 g ile yapılan çalışmalar sürüyor, uykusuzlukta tek dozlar da öyle. Bu, makul bir gerekçesi olan aktif bir araştırma alanı; ama kesinleşmiş bilgi değil. Güç ve kas gelişimi için 3–5 g kanıtlanmış standart olmaya devam ediyor. Bilişsel etkilere duyduğu ilgi nedeniyle daha yüksek dozlamak isteyen biri, bununla bir öneriyi değil bir hipotezi takip ettiğini bilmelidir.',
      },
      {
        title: 'Güvenlik ve mitler',
        content: 'Kreatin en güvenli takviyeler arasındadır. Birkaç yıla yayılan uzun süreli çalışmalar sağlıklı insanlarda zararlı etkiler göstermiyor. Kreatinin böbreklere zarar verdiği şeklindeki inatçı mit, böbrekleri sağlıklı kişilerde kanıtlanmamıştır (Kreider et al., 2017). Ancak mevcut bir böbrek hastalığında kullanım doktorla netleştirilmelidir.\n\nBaşka bir mit, kreatinin şişkin bir görünüm anlamında “su tutulmasına” yol açtığıdır. Aslında kreatin suyu kas hücrelerine çeker; bu da görünür su tutulmasından çok daha dolgun bir kasa yol açar. Başlangıçta vücut ağırlığında hafif bir artış normal ve istenen bir durumdur.\n\nSaç dökülmesi de tek bir çalışmaya dayanarak zaman zaman kreatinle ilişkilendirilir. Bu bağlantı bilimsel olarak kanıtlanmamıştır. Genel olarak kreatin iyi tolere edilir; bazı insanlar çok yüksek tek dozlarda mide-bağırsak şikâyetleri yaşar, bu da daha küçük porsiyonlarla önlenebilir.',
      },
      {
        title: 'Özet',
        content: 'Kreatin, güç ve kas gelişimi için en etkili ve en iyi kanıtlanmış takviyedir: güvenli, ucuz ve kullanımı kolay. Güç ve kas gelişimi için günde 3–5 g monohidrat, sürekli olarak, ihtiyacın olan her şeydir; beyin için daha yüksek dozlar araştırılıyor, ama henüz bir öneri değil.\n\nZamanlama önemsizdir, yükleme evresi isteğe bağlıdır. Saf monohidrat seç; daha pahalı formlar ek değer getirmez. Böbrek veya saç hasarına dair yaygın uyarılar sağlıklı insanlarda kanıtlanmamıştır.\n\nPerformansı artırmak için tek bir takviye seçecek olsaydın, kreatin en akla yatkın seçim olurdu. Önceden var olan sağlık sorunlarında her zaman olduğu gibi doktora danışmak mantıklıdır.',
      },
    ],
  },

  protein_powder: {
    name: 'Protein tozu (whey ve diğerleri)',
    summary: 'Protein tozu bir mucize değil, rahat ve ucuz bir protein kaynağıdır. Normal besinlerle zorlaştığında günlük ihtiyacı karşılamaya yardım eder; ne daha fazlası ne daha azı.',
    quick: [
      { label: 'Amaç', text: 'Günlük protein hedefine ulaşmak için pratik bir tamamlayıcı; zorunlu değil.' },
      { label: 'Seçim', text: 'Whey (hızlı), kazein (yavaş), bitkisel (vegan). Yeterli miktarda hepsi etkili.' },
    ],
    sections: [
      {
        title: 'Protein tozu nedir',
        content: 'Protein tozu, çoğunlukla sütten (whey ve kazein), ama bezelye, pirinç veya soya gibi bitkisel kaynaklardan da elde edilen konsantre besin proteinidir. Proteinden zengin besinlerle aynı amino asitleri sağlar, yalnızca pratik ve hızlı hazırlanan bir biçimde.\n\nEn önemli nokta önce: Protein tozu “anabolik” bir mucize değildir. Sadece besindir; protein ihtiyacını karşılamanın rahat bir yolu. Günlük hedefine et, balık, yumurta, süt ürünleri ve baklagillerle sorunsuz ulaşan birinin toza ihtiyacı yoktur.\n\nDeğeri pratikliğindedir: Bir shake hızla hazırlanır, kolay porsiyonlanır, gram protein başına ucuzdur ve yanında taşınması kolaydır. Protein ihtiyacı yüksek, vakti ya da iştahı az olan insanlar için mantıklı bir yardımcıdır.',
      },
      {
        title: 'Whey, kazein ve bitkisel proteinler',
        content: 'Whey (peynir altı suyu proteini) en popüler formdur. Hızla sindirilir, lösin amino asidi açısından zengindir ve kas protein sentezini güçlü şekilde uyarır. Konsantre (ucuz, biraz laktoz), izolat (daha saf, düşük laktozlu) ve hidrolizat (ön sindirilmiş, daha pahalı) olarak bulunur.\n\nKazein de bir süt proteinidir, ama yavaş sindirilir ve amino asitleri birkaç saat boyunca salar. Bazıları onu uyumadan önce gibi uzun yemek aralıklarından önce kullanır. Pratikte whey ile farkı çoğu kişi için küçüktür.\n\nBitkisel proteinler (bezelye, pirinç, soya) vegan yaşayanların tercihidir. Tek tek bitkisel kaynaklar belirli amino asitlerde sınırlı olabilir; bu yüzden iyi ürünler birkaç kaynağı birleştirir. Toplam miktar yeterli olduğunda bitkisel tozlar kas gelişimi için whey kadar etkilidir.',
      },
      {
        title: 'Mantıklı kullanım',
        content: 'Protein tozu, hızlı ve kaliteli bir protein kaynağının pratik olduğu her durumda uygundur: antrenmandan sonra, ara öğün olarak, müslide ya da yoğun günlerde protein hedefine ulaşmak için. Çoğu kişi için günde bir iki porsiyon mantıklıdır.\n\nAncak normal besinleri tamamlamalı, onların yerine geçmemelidir. Bütüncül protein kaynakları ek olarak mikro besin sağlar, daha iyi tok tutar ve dengeli bir beslenmenin parçasıdır. Bir shake günlük hayat için bir araçtır, temel gıda değil.\n\nÜrün seçerken içerik listesine bakmak karşılığını verir: mümkün olduğunca az katkı maddesi, porsiyon başına iyi bir protein içeriği ve ideal olarak bağımsız bir test mührü. Çok ucuz tozlar bazen çok fazla dolgu maddesi veya şeker içerir.',
      },
      {
        title: 'Güvenlik ve değerlendirme',
        content: 'Sağlıklı insanlar için protein tozu güvenlidir. Tozla yüksek protein alımının böbreklere zarar verdiği endişesi, genel olarak protein için olduğu gibi, yalnızca mevcut bir böbrek hastalığında geçerlidir. Laktoz intoleransında izolat veya bitkisel türler daha iyi tolere edilir.\n\nBir kalite unsuru saflıktır. Gıda takviyeleri ilaçlardan daha az sıkı düzenlendiği için bağımsız laboratuvar testinden geçmiş ürünler (ör. ağır metaller veya doping maddeleri açısından) karşılığını verir, özellikle yarışmacı sporcular için.\n\nÖzetle protein tozu pratik bir üründür, esansiyel değil. İyi beslenmenin yerini tutmaz, ama protein ihtiyacını rahat ve ucuz şekilde karşılamaya yardım edebilir. Sağlıkla ilgili sorularda bir doktora veya diyetisyene danışmak mantıklıdır.',
      },
    ],
  },

  caffeine: {
    name: 'Kafein',
    summary: 'Kafein, performansı artırmanın en etkili yasal yollarından biridir. Yorgunluk hissini azaltır, odaklanmayı ve kuvvette dayanıklılığı artırır. Etkisi iyi kanıtlanmıştır, ancak dozaj kişiye göre ve ölçülü yapılmalıdır.',
    quick: [
      { label: 'Dozaj', text: 'Vücut ağırlığının kg’ı başına yaklaşık 3–6 mg, antrenmandan 30–60 dk önce.' },
      { label: 'Dikkat', text: 'Uykunu koru (günün geç saatlerinde değil), toleransa dikkat et, kişisel uyumu dikkatle test et.' },
    ],
    sections: [
      {
        title: 'Kafein nasıl etki eder',
        content: 'Kafein, esas olarak beyindeki adenozin reseptörlerini bloke ederek etki eden bir uyarıcıdır. Adenozin yorgunluğu bildiren bir ileticidir; kafein onun bağlanma yerlerini işgal ederek yorgunluk hissini bastırır ve algılanan zorlanma azalır.\n\nSonuç, daha yüksek uyanıklık, daha iyi odaklanma ve zorlanmaya daha fazla hazır olma hâlidir. Antrenman için bunun anlamı: Yüklenmeler daha hafif hissettirir; bu da daha fazla tekrara, daha fazla dayanıklılığa ve çoğu zaman daha iyi performansa yol açar.\n\nKafein, açıkça kanıtlanmış ve hemen hissedilen bir etkisi olan az sayıdaki takviyeden biridir. Kahve, çay, enerji içecekleri veya saf kafein (tablet, toz) olarak alınır ve yaklaşık 30–60 dakika içinde etkisini gösterir.',
      },
      {
        title: 'Çalışmaların durumu',
        content: 'Kafein, en iyi araştırılmış performans artırıcı maddeler arasındadır. Kapsamlı bir derleme çalışması (Grgic et al., 2020, British Journal of Sports Medicine), birçok spor dalında güç, kas dayanıklılığı, sprint ve dayanıklılık performansı üzerinde olumlu etkileri doğruluyor.\n\nEtki büyüklükleri orta düzeyde ama güvenilirdir. Özellikle yorucu, tekrarlanan yüklenmelerde ve uykusuzluk ya da motivasyon düşüklüğü olan durumlarda kafein hissedilir bir fark yaratabilir. Bilişsel performans, yani tepki süresi ve dikkat de bundan fayda görür.\n\nÇoğu çalışmada etkili doz vücut ağırlığının kilogramı başına yaklaşık 3–6 mg’dır. Daha yüksek dozlar nadiren daha fazla performans getirir, ama sinirlilik, çarpıntı ve uyku bozuklukları gibi yan etkileri artırır.',
      },
      {
        title: 'Dozaj ve zamanlama',
        content: 'Antrenman performansı için yüklenmeden yaklaşık 30–60 dakika önce alınan, vücut ağırlığının kilogramı başına yaklaşık 3–6 mg kendini kanıtlamıştır. 75 kg ağırlığındaki bir kişi için bu kabaca 225–450 mg’a karşılık gelir; karşılaştırma için bir fincan filtre kahve yaklaşık 80–120 mg içerir.\n\nHassas tepki veren veya alışkın olmayan biri düşük bir dozla başlamalı ve toleransını test etmelidir. Kişisel farklar büyüktür: Bazıları çok fazlasını kaldırır, bazıları ise küçük miktarlara bile huzursuzluk veya çarpıntıyla tepki verir.\n\nÖnemli bir nokta gün içindeki zamanlamadır. Kafeinin yarılanma ömrü yaklaşık beş altı saattir; yüksek dozla yapılan geç antrenman uykuyu ciddi şekilde bozabilir. Temel kural olarak uyumadan önceki son altı sekiz saatte büyük miktarlardan kaçınmak gerekir.',
      },
      {
        title: 'Tolerans, yan etkiler ve güvenlik',
        content: 'Düzenli tüketimde vücut belirli bir tolerans geliştirir; etki azalır. Bu yüzden bazıları bilinçli molalar verir veya daha yüksek dozları önemli antrenmanlara saklar. Ancak tamamen bırakmak gerekli değildir; ölçülü düzenli tüketim etkili olmaya devam eder.\n\nOlası yan etkiler arasında sinirlilik, çarpıntı, mide şikâyetleri, kaygı ve uyku bozuklukları sayılabilir; çoğunlukla doz çok yüksek olduğunda. Belirli kalp-damar hastalıklarında, hamilelikte veya kaygı bozukluklarında dikkatli olmak ve doktora danışmak tavsiye edilir.\n\nGenel olarak kafein, ölçülü miktarlarda (sağlıklı yetişkinler için günde yaklaşık 400 mg’a kadar) güvenli kabul edilir. Özellikle saf kafein tozundan alınan çok yüksek tek dozlar tehlikeli olabilir; burada hassas ölçüm belirleyicidir. Tüm maddelerde olduğu gibi: Amaç azami dozu değil, kişisel olarak tolere edilen etkili dozu bulmaktır.',
      },
      {
        title: 'Özet',
        content: 'Kafein, performansı artırmak için etkili, iyi kanıtlanmış ve yasal bir araçtır. Yorgunluk hissini azaltır; odaklanmayı, kuvvette dayanıklılığı ve dayanıklılık performansını iyileştirir.\n\nAntrenmandan 30–60 dakika önce vücut ağırlığının kilogramı başına yaklaşık 3–6 mg’lık bir doz yaygındır. Düşük başla, toleransını test et ve geç saatte kafeinden kaçınarak uykunu koru.\n\nKafein ölçülü miktarlarda güvenlidir, ama aşırı dozda veya önceden var olan hastalıklarda sorun yaratabilir. Onu her gün azami dozda değil, hedefli bir araç olarak kullan; sağlıkla ilgili sorularda bir doktora danış.',
      },
    ],
  },

  omega3: {
    name: 'Omega-3 yağ asitleri',
    summary: 'Omega-3 yağ asitleri (EPA ve DHA) esansiyeldir ve iltihabı düzenleyici etki gösterir. Birçok insan bunları yetersiz alır. Yağlı balık en iyi kaynaktır; neredeyse hiç balık yenmiyorsa bir takviye mantıklı olabilir.',
    quick: [
      { label: 'Kaynak ve doz', text: 'Haftada 2–3 kez yağlı balık; takviye olarak çoğu zaman günde ~1–2 g EPA+DHA.' },
      { label: 'Fayda', text: 'Kalp-damar ve beyin sağlığı, iltihap düzenlemesi; veganlar için alg yağıyla.' },
    ],
    sections: [
      {
        title: 'Omega-3 yağ asitleri nedir',
        content: 'Omega-3 yağ asitleri, vücudun kendisi üretemediği ve bu yüzden besinlerle alması gereken bir grup çoklu doymamış yağdır. En önemlileri, özellikle yağlı balıkta bulunan EPA (eikosapentaenoik asit) ve DHA (dokosaheksaenoik asit) ile bitkisel kaynaklardan gelen ALA’dır (alfa-linolenik asit).\n\nEPA ve DHA hücre zarlarının yapı taşları ve iltihap süreçlerini düzenleyen ileticilerin öncülleridir. DHA ayrıca beynin ve retinanın önemli bir bileşenidir. Bu yağ asitleri bu nedenle kalp, beyin ve bağışıklık sistemi için önem taşır.\n\nSorun şu: Modern beslenme çoğu zaman bol Omega-6 (işlenmiş bitkisel yağlardan), ama az Omega-3 sağlar. Bu dengesizlik ve düşük balık tüketimi, birçok insanın yetersiz almasına yol açar.',
      },
      {
        title: 'Sağlık açısından önemi',
        content: 'Omega-3 üzerine araştırmalar kapsamlıdır. En iyi kanıtlanan fayda kalp-damar sağlığı içindir: EPA ve DHA kandaki trigliserit değerlerini düşürebilir ve daha olumlu bir kardiyovasküler risk profiliyle ilişkilendirilir. Uzman kuruluşlar düzenli yağlı balık tüketimini öneriyor.\n\nAyrıca eklem sağlığı ve antrenman sonrası toparlanma için önemli olabilecek iltihap düzenleyici bir etki araştırılıyor. Beyin işlevi ve ruh hâli için de olumlu etkilere dair işaretler var, ancak buradaki veriler daha az nettir.\n\nKanıtlanmış ve abartılı vaatler arasında ayrım yapmak önemlidir. Omega-3 her derde deva değildir, ama yeterli alım sağlıklı bir beslenmenin mantıklı bir parçasıdır; özellikle nadiren balık yiyen insanlar için.',
      },
      {
        title: 'Kaynaklar ve takviye',
        content: 'EPA ve DHA için en iyi kaynak soğuk su yağlı balıklarıdır: somon, uskumru, ringa, sardalya. Haftada iki üç porsiyon çoğu insanın ihtiyacını karşılar. Keten tohumu veya ceviz gibi bitkisel kaynaklar ALA sağlar, ama vücut bunun yalnızca küçük bir kısmını EPA ve DHA’ya dönüştürür.\n\nAz balık yiyen ya da hiç yemeyen biri bir takviye düşünebilir. Balık yağı veya alg yağı kapsülleri EPA ve DHA’yı doğrudan sağlar; alg yağı bitkisel, vegan alternatiftir. Tipik takviye dozları günde yaklaşık 1–2 g EPA artı DHA’dır; kesin ihtiyaç ise kişiden kişiye değişir.\n\nÜrün seçiminde kalite önemlidir: Gerçek EPA/DHA içeriğine (yalnızca toplam balık yağı miktarına değil), tazeliğe (acımış yağ istenmez) ve ideal olarak saflık testlerine dikkat et. Kandaki Omega-3 indeksi alımı objektif olarak gösterebilir.',
      },
      {
        title: 'Güvenlik ve değerlendirme',
        content: 'Omega-3 takviyeleri olağan dozlarda güvenli ve iyi tolere edilir kabul edilir. Olası yan etkiler balık tadı bırakması veya hafif mide-bağırsak şikâyetleridir. Çok yüksek dozlarda Omega-3 kan pıhtılaşmasını etkileyebilir; kan sulandırıcı ilaç kullanan ya da ameliyat planlayan biri kullanımı doktorla netleştirmelidir.\n\nTüm takviyelerde olduğu gibi: İyi bir beslenmeyi tamamlarlar, ama onun yerini tutmazlar. Düzenli olarak yağlı balık yiyen birinin genellikle ek yağa ihtiyacı yoktur. Takviye esas olarak balık yemeyenler ve veganlar (alg yağı) için mantıklıdır.\n\nSağlıkla ilgili sorularda, mevcut hastalıklarda veya ilaç kullanımında doktora danışmak tavsiye edilir. Omega-3 indeksinin kan testi, toptan takviye yapmak yerine kişisel ihtiyacı hedefli olarak değerlendirmeye yardımcı olabilir.',
      },
    ],
  },

  vitamin_d: {
    name: 'D vitamini',
    summary: 'D vitamini kemikler, kaslar ve bağışıklık sistemi için önemlidir. Esas olarak güneş ışığıyla oluşur; bu yüzden güneşin az olduğu aylarda eksiklik sık görülür. O zaman takviye çoğu zaman mantıklıdır; ideal olarak bir kan testinden sonra.',
    quick: [
      { label: 'Kaynak', text: 'Güneş ışığı (cilt), besinlerden az. Kışın çoğu zaman takviye gerekir.' },
      { label: 'Uygulama', text: 'Eksiklikte sıklıkla ~1000–2000 IU/gün; dozu ideal olarak kan testiyle yönet.' },
    ],
    sections: [
      {
        title: 'D vitamini neden özel',
        content: 'D vitamini vitaminler arasında özel bir yere sahiptir, çünkü vücut onu güneş ışığının (UV-B ışınımı) etkisiyle ciltte kendisi üretebilir. Aslında daha çok bir hormon gibi davranır: Kalsiyum ve fosfat emilimini düzenler ve bu yüzden sağlıklı kemikler ve dişler için merkezi önemdedir.\n\nKemik sağlığının ötesinde D vitamininin kaslarda ve bağışıklık sisteminde de işlevleri vardır. Onun reseptörleri vücudun birçok dokusunda bulunur; bu da geniş önemini açıklar. Belirgin bir eksiklik kas zayıflığına, kemik sorunlarına ve enfeksiyonlara yatkınlığın artmasına katkıda bulunabilir.\n\nÖzel ve aynı zamanda sorunlu olan şu: Ana kaynak güneş ışığı olduğu için alım büyük ölçüde yaşanılan yere, mevsime, ten rengine ve yaşam tarzına bağlıdır. Birçok bölgede kışın güneş ışınımı yeterli D vitamini üretmeye yetmez.',
      },
      {
        title: 'Eksiklik çok yaygın',
        content: 'D vitamini eksikliği, özellikle kuzey enlemlerinde ve kış aylarında, dünyada en yaygın besin eksiklikleri arasındadır. Çoğunlukla kapalı alanda çalışan, daha koyu tenli olan, örtünen veya yaşlı olan insanların riski daha yüksektir, çünkü vücutlarının kendi üretimi sınırlıdır.\n\nİhtiyacı yalnızca besinlerle karşılamak zordur. Kayda değer miktarlar içeren çok az besin vardır: özellikle yağlı balık, yumurta sarısı ve zenginleştirilmiş ürünler. Bunlar, güneşle üretim eksik olduğunda bir eksikliği gidermeye çoğu zaman yetmez.\n\nD vitamini durumu basit bir kan testiyle (25-OH D vitamini) belirlenebilir. Tahmin etmek yerine takviye yapılıp yapılmaması gerektiğini ve ne kadar yapılması gerektiğini bilmenin en güvenilir yolu budur.',
      },
      {
        title: 'Pratikte takviye',
        content: 'Bir eksiklik varsa ya da güneşin az olduğu aylarda vücudun kendi üretimi az mümkünse takviye mantıklıdır. Sıklıkla günde yaklaşık 1000–2000 IU (Uluslararası Ünite) aralığında idame dozları belirtilir; ancak kişisel ihtiyaç büyük ölçüde değişebilir.\n\nDozu en iyi kan değeri üzerinden yönetmek gerekir: Bir test başlangıç değerini gösterir; birkaç hafta ila aylık kullanımdan sonra başarı kontrol edilip doz ayarlanabilir. Böylece hem yetersiz alımdan hem de aşırı dozdan kaçınılır.\n\nD3 vitamini (kolekalsiferol) tercih edilen formdur. Yağda çözündüğü için en iyi yağ içeren bir öğünle emilir. Sıklıkla kalsiyum metabolizmasını destekleyen K2 vitaminiyle birleştirilir; bunun kanıtları umut verici, ama kesin değil.',
      },
      {
        title: 'Güvenlik ve tıbbi takip',
        content: 'D vitamini yağda çözünür ve suda çözünen vitaminlerden farklı olarak vücutta birikebilir. Uzun süre alınan çok yüksek dozlar kanda tehlikeli bir kalsiyum fazlalığına yol açabilir. Burada “daha fazlası daha iyidir” kesinlikle geçerli değildir; doktor kontrolü olmadan aşırı yüksek dozlardan kaçınılmalıdır.\n\nÇoğu insan için ölçülü idame dozları güvenlidir. Ancak yüksek dozları düşünen, önceden hastalığı olan veya ilaç kullanan biri bunu doktor eşliğinde yapmalıdır. Kan testi burada da güvenli ve etkili aralıkta kalmanın belirleyici aracıdır.\n\nÖzetle D vitamini, birçok insan için, özellikle kışın, gerçek bir faydası olan az sayıdaki takviyeden biridir. En akıllıca yol, toptan yüksek doz almak yerine durumu ölçmek ve kullanımı buna göre ayarlamaktır.',
      },
    ],
  },

  magnesium: {
    name: 'Magnezyum',
    summary: 'Magnezyum; kas ve sinir işlevi, enerji metabolizması ve uyku dahil 300’den fazla enzimatik sürece katılır. Hafif bir eksiklik yaygındır. Besinlerle karşılanabilir, gerektiğinde kolayca takviye edilebilir.',
    quick: [
      { label: 'İşlev', text: 'Kas ve sinir işlevi, enerji metabolizması, uyku, kemikler.' },
      { label: 'Kaynaklar', text: 'Kuruyemiş, tohumlar, tam tahıl, baklagiller, yeşil sebze; gerektiğinde takviye.' },
    ],
    sections: [
      {
        title: 'Magnezyumun rolü',
        content: 'Magnezyum esansiyel bir mineraldir ve vücuttaki 300’den fazla enzim reaksiyonunun kofaktörüdür. Enerji üretimine (ATP metabolizması), kas ve sinir işlevine, protein sentezine, kan şekerinin düzenlenmesine ve kemik sağlığına katılır.\n\nSporla aktif olan insanlar için magnezyum özellikle önemlidir, çünkü kas kasılması ve gevşemesinde ve enerji metabolizmasında merkezi bir rol oynar. Eksiklik, diğerlerinin yanı sıra kas krampları, yorgunluk, sinirlilik ve daha kötü uykuyla kendini gösterebilir.\n\nYoğun antrenman, ter ve artan metabolizma yoluyla magnezyum ihtiyacını biraz artırabilir. Aynı zamanda birçok insanda alım sınırdadır, çünkü yoğun işlenmiş beslenme az magnezyum içerir.',
      },
      {
        title: 'Eksiklik ve ihtiyaç',
        content: 'Sağlıklı beslenmede belirgin bir magnezyum eksikliği nadirdir, ancak hafif bir eksiklik veya sınırda bir alım görece yaygındır; özellikle tek yönlü, yoğun işlenmiş beslenmede. Yetişkinler için günlük ihtiyaç cinsiyete ve yaşa göre yaklaşık 300–400 mg’dır.\n\nMagnezyum birçok işlenmemiş besinde bulunduğu için ihtiyaç temelde beslenmeyle iyi karşılanabilir. İyi kaynaklar kuruyemiş ve tohumlar (ör. kabak çekirdeği, badem), tam tahıl ürünleri, baklagiller, yeşil yapraklı sebzeler ve bitter çikolatadır.\n\nMagnezyumun büyük kısmı hücrelerde ve kemiklerde depolandığı için magnezyum eksikliği kanda yalnızca sınırlı ölçüde tespit edilebilir. Sık kramplar, bitkinlik veya uyku sorunları gibi belirtiler, başka nedenlerin yanı sıra, işaret olabilir ve şüphe durumunda doktor tarafından incelenmelidir.',
      },
      {
        title: 'Takviye',
        content: 'Beslenmeyle alım yetmiyorsa ya da artmış bir ihtiyaç varsa bir magnezyum takviyesi mantıklı olabilir. Form tolere edilebilirlik açısından rol oynar: Magnezyum sitrat, glisinat veya malat gibi organik bileşikler iyi tolere edilir ve iyi emilir. Magnezyum oksit ucuzdur, ama daha kötü emilir ve müshil etkisi yapabilir.\n\nOlağan tamamlayıcı dozlar günde yaklaşık 200–400 mg elementel magnezyumdur; çoğu zaman akşam alınır, çünkü magnezyumun rahatlatıcı bir etkisi olabilir ve uykuyu destekleyebilir. Daha yüksek dozlar yumuşak dışkıya veya ishale yol açabilir; bu, miktarı azaltma işaretidir.\n\nMagnezyum takviyelerine dair kanıtlar en güçlü olarak kanıtlanmış eksiklikte geçerlidir. Yeterli alımı olan insanlarda ek fayda sınırlıdır. Her zaman olduğu gibi: Önce besin, hedefli bir tamamlayıcı olarak takviye.',
      },
      {
        title: 'Güvenlik ve özet',
        content: 'Besinlerden gelen magnezyum zararsızdır; vücut fazla magnezyumu normalde böbrekler yoluyla atar. Takviyelerde en sık yan etki, doz çok yüksek olduğunda müshil etkisidir. Böbrek işlevi kısıtlı olan insanlar, atım bozulmuş olabileceği için magnezyum takviyelerini yalnızca doktora danıştıktan sonra almalıdır.\n\nÖzetle magnezyum; kaslar, sinirler, enerji metabolizması ve uyku için geniş önemi olan önemli bir mineraldir. Hafif bir eksiklik yaygındır, ama kuruyemiş, tohumlar, tam tahıl ve yeşil sebze içeren bütüncül bir beslenmeyle iyi giderilebilir.\n\nArtmış ihtiyaçta, yetersiz alımda veya ilgili belirtilerde takviye mantıklı bir seçenektir; ideal olarak iyi tolere edilen bir formda ve önceden var olan hastalıklar varsa bir doktorla görüşerek.',
      },
    ],
  },
};
