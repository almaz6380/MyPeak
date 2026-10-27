// Türkische Fassung der 21 Peak-Programme aus `src/data/peakPrograms.js`.
//
// Form je Programm: { name, desc, why, progression, fokus: { <tag>: '…' } }.
// `fokus` gibt es nur bei den Kampfsport-Programmen (dort steht unter der
// Tagesbeschriftung noch ein Schwerpunkt).
//
// Die Beschriftungen der Trainingstage („Push", „Oberkörper") stehen NICHT
// hier, sondern in `src/data/tagesbeschriftung.js`.
//
// `studien` ist nach „Name|Jahr" verschlüsselt, weil dieselbe Studie in
// mehreren Programmen zitiert wird; Name und Jahr bleiben unübersetzt.
export default {
  kategorien: {
    strength: 'Kuvvet antrenmanı',
    cardio: 'Kardiyo',
    hiit: 'HIIT',
    martial_arts: 'Dövüş sporları',
  },

  studien: {
    'Schoenfeld, Ogborn & Krieger|2017': 'Doz-yanıt meta-analizi: Kas grubu başına haftada 10 ve üzeri set, daha az sete göre anlamlı ölçüde daha fazla kas gelişimi sağlar.',
    'Schoenfeld, Ogborn & Krieger|2016': 'Meta-analiz: Her kas grubunu haftada 2 kez çalıştırmak, haftada 1 kez çalıştırmaktan daha fazla hipertrofi sağlar.',
    'Helms et al.|2016': 'RIR ölçeği („Reps in Reserve", yedekte kalan tekrar) kuvvet antrenmanında eforu ayarlamak için geçerli bir araçtır: Setlerin çoğunu 1–3 RIR ile bitir.',
    'Schoenfeld, Grgic & Krieger|2019': 'Haftalık hacim eşitken antrenman sıklığı ikinci plandadır; belirleyici olan kas grubu başına toplam hacimdir.',
    'Pedisic et al.|2020': 'Meta-analiz: Koşucuların tüm nedenlere bağlı ölüm riski ~%27 daha düşüktür; az miktarda koşu (haftada 1 kez) bile bu etkiyi gösterir.',
    'Lee et al.|2014': 'Günde yalnızca 5–10 dakika yavaş koşu bile, toplam ve kalp-damar kaynaklı ölümlerde belirgin bir azalmayla ilişkiliydi.',
    'Helgerud et al.|2007': 'Maksimum kalp atış hızının %90–95’inde yapılan 4×4 dakikalık intervaller, aynı toplam işle yapılan orta tempolu sürekli antrenmana göre VO₂max’ı anlamlı ölçüde daha fazla artırdı.',
    'Milanović et al.|2015': 'Meta-analiz: HIIT, sağlıklı yetişkinlerde VO₂max’ı klasik dayanıklılık antrenmanından daha fazla geliştirir.',
    'Gunnarsson & Bangsbo|2012': 'Koşucular 10-20-30 yöntemiyle, antrenman hacmini ~%50 azaltmalarına rağmen VO₂max’larını (~%4) ve 1500 m ile 5 km derecelerini geliştirdi.',
    'Seiler|2010': 'Elit dayanıklılık sporcuları antrenman hacimlerinin ~%80’ini düşük yoğunlukta (bölge 1–2) yapar; bu polarize model uzun vadede en iyi adaptasyonları sağlar.',
    'Stöggl & Sperlich|2014': 'Polarize antrenman (çok hafif + az ama çok sert), antrenmanlı dayanıklılık sporcularında VO₂max’ı ve performansı eşik ya da yalnızca HIT antrenmanından daha fazla artırdı.',
    'Esteve-Lanao et al.|2007': 'Hacimlerinin ~%80’ini düşük yoğunlukta yapan koşucular, orta yoğunlukta daha çok çalışan gruba göre yarış derecelerini daha fazla geliştirdi.',
    'Billat et al.|1999': 'VO₂max hızında (vVO₂max) yapılan intervaller, antrenmanlı koşucularda koşu ekonomisini ve temposunu ölçülebilir şekilde geliştirdi.',
    'Tabata et al.|1996': '6 hafta boyunca 4 dakikalık seanslar (8×20 sn/10 sn) VO₂max’ı ~7 ml/kg/dk, anaerobik kapasiteyi %28 artırdı; orta tempolu sürekli antrenman yalnızca aerobik kapasiteyi geliştirdi.',
    'Weston et al.|2014': 'Meta-analiz: HIIT, kardiyorespiratuvar formu orta tempolu sürekli antrenmana göre neredeyse iki kat daha fazla geliştirdi.',
    'Gibala et al.|2006': '2 haftada 6 sprint interval seansı (~2,5 saat antrenman), ~10,5 saatlik klasik dayanıklılık antrenmanına benzer kas dayanıklılığı adaptasyonları sağladı.',
    'Little et al.|2010': '75 sn dinlenmeli 8–12×60 saniyelik intervaller, seans başına yalnızca ~20–25 dakikayla kasın mitokondriyal kapasitesini belirgin şekilde artırdı.',
    'McRae et al.|2012': 'Haftada 4 kez sadece 4 dakikalık tüm vücut intervalleri, dayanıklılığı VE kas dayanıklılığını 30 dakikalık sürekli antrenmanla benzer ölçüde geliştirdi.',
    'Chaabène et al.|2015': 'Derleme: Amatör boks aynı anda yüksek aerobik ve anaerobik kapasite gerektirir; elit boksörler 60 ml/kg/dk civarında VO₂max değerlerine ulaşır.',
    'Ouergui et al.|2014': 'Kickboks raundları kalp atış hızını maksimuma yaklaştırır; raund bazlı antrenman fizyolojik olarak yüksek yoğunluklu interval antrenmanı gibi etki eder.',
    'James et al.|2016': 'Derleme: MMA kuvvet, sürat ve dayanıklılığı bir arada gerektirir; raund bazlı, çok yönlü kondisyon antrenmanı önerilir.',
  },

  ppl_6x: {
    name: 'Push / Pull / Legs',
    desc: 'Maksimum kas gelişimi için klasik 6 günlük split. Her kas grubu haftada 2 kez çalışılır.',
    why: 'PPL, kas gelişiminin en güçlü iki kaldıracını birleştirir: yüksek haftalık hacim (kas grubu başına 16–20 set) ve haftada 2 kez antrenman sıklığı. Hareket kalıplarına göre bölmek (itme/çekme/bacak), neredeyse her gün antrenman yapsan da her kas grubunun tamamen toparlanmasını sağlar.',
    progression: 'Çift progresyon: Set sayısını ve tekrar aralığını koru, tekrarlarda yukarı doğru ilerle. Tüm setlerde üst sınıra temiz tekniğe ulaştığında ağırlığı 2,5 kg artır ve yeniden alttan başla. Setlerin çoğunu 1–3 yedek tekrarla (RIR) bitir.',
  },
  upper_lower_4x: {
    name: 'Üst vücut / alt vücut',
    desc: 'Yeni başlayanlar ve ileri seviyeler için etkili 4 günlük split. Her kas grubu haftada 2 kez çalışılır.',
    why: 'Üst/alt vücut split’i, harcanan zaman ile sonuç arasındaki en iyi dengedir: Haftada 4 seans, meta-analizlerde 1 kereden daha fazla gelişim sağlayan kas grubu başına 2 kez sıklığa yeter. Önce temel egzersizler, ardından hedefe yönelik izolasyon egzersizleri.',
    progression: 'Çift progresyon: önce hedef aralıkta tekrarları artır, sonra +2,5 kg. Temel egzersizleri (squat, bench press, deadlift) 2 RIR ile, izolasyon egzersizlerini 1 RIR’e kadar bitir. 6–8 haftada bir hafif bir hafta araya koy.',
  },
  split_5x: {
    name: '5 günlük split',
    desc: 'Kas grubu başına yüksek hacimli, ileri seviye 5 günlük split. Deneyimli sporcular için.',
    why: 'Daha fazla hacme ihtiyaç duyan ileri seviyeler için: 5 günlük split, her seansta tek bir bölgeye tam odaklanarak kas grubu başına 15–20+ set yapmana olanak tanır. Doz-yanıt araştırmaları gösteriyor ki: Uzun süredir antrenman yapan biri, haftalık set sayısı arttıkça gelişmeye devam eder.',
    progression: 'Her egzersizde çift progresyon. Ayrıca toparlanma izin verdiği sürece 3–4 haftada bir, günün ilk egzersizine bir set ekle. 10. haftayı deload olarak geçir (ağırlıklar −%30, setler yarıya).',
  },
  fullbody_3x: {
    name: 'Tüm vücut 3 gün',
    desc: 'Yeni başlayanlar için ideal: En önemli temel egzersizlerle haftada 3 tüm vücut antrenmanı.',
    why: 'Yeni başlayanlar için haftada 3 kez tüm vücut antrenmanı en verimli modeldir: Her kas grubu haftada 3 kez uyarılır, temel egzersizler sık tekrarla hızla gelişir ve üç seans her günlük düzene sığar. Yeni başlayanlar orta düzey hacimle bile güvenilir şekilde gelişir.',
    progression: 'Doğrusal progresyon: Tüm tekrarları temiz yapabildiğin sürece her seansta ağırlığı 2,5 kg (alt vücut) ya da 1,25–2,5 kg (üst vücut) artır. Bir egzersizde üst üste 2 kez başarısız olursan ağırlığını %10 düşür ve yeniden yukarı çık.',
  },
  push_pull_4x: {
    name: 'Push / Pull 4 gün',
    desc: 'İtme ve çekme hareketlerine bölünmüş haftada 4 antrenman. Bacaklar bunların içine dahil edilir.',
    why: 'Bacakların dahil edildiği Push/Pull, 6 günlük PPL’e zaman açısından verimli bir alternatiftir: kas grubu başına aynı 2 kez sıklık, ama yalnızca 4 gün spor salonu. Quadriceps Push’a (squat = itme), arka zincir Pull’a (deadlift = çekme) geçer; biyomekanik olarak temiz bir gruplama.',
    progression: 'Çift progresyon: hedef aralıkta tekrarları artır, sonra +2,5 kg. Deadlift ve squat’ta temkinli ilerle (ancak tüm setler 2 RIR ile yapılabildiğinde). 8. haftadan sonra döngüyü tekrarlamadan önce bir deload haftası yap.',
  },
  bro_split_5x: {
    name: 'Bro split',
    desc: 'Klasik vücut geliştirme split’i: Her kas grubu yüksek hacimle kendi gününe sahip olur.',
    why: 'Klasik vücut geliştirme yaklaşımı: Günde bir kas grubu, ama tek seansta tam odak ve yüksek hacimle. Yeni araştırmalar gösteriyor ki: Haftalık hacim eşitken dağılım ikinci plandadır; pump’ı ve tek kas günlerinin odağını seven biri bu şekilde de aynı ölçüde gelişir.',
    progression: 'Her egzersizde çift progresyon, setlerin çoğu 1–2 RIR’e kadar. Her kas grubu haftada yalnızca 1 kez çalışıldığı için her seans önemlidir: Ağırlıklarını düzenli not et ve her hafta en az bir tekrar fazlasını hedefle.',
  },
  couch_to_5k: {
    name: 'Kanepeden 5K’ya',
    desc: '9 haftada sıfırdan 5 kilometre koşuya: Her hafta uzayan yürüyüş/koşu intervalleriyle.',
    why: 'Dünya çapında kendini kanıtlamış başlangıç yöntemi: Arada yürüyüş molaları olan kısa koşu bölümleri, tendonları, eklemleri ve kalp-damar sistemini zorlamak yerine birlikte gelişmelerini sağlar. İlerleme bilerek yumuşaktır; programı bu kadar sürdürülebilir kılan da tam olarak budur. Az miktarda koşu bile ölüm riskini ölçülebilir şekilde azaltır.',
    progression: 'Her hafta koşu bölümleri uzar, yürüyüş molaları kısalır: 8×1 dakika koşudan (1. hafta) 30 dakika kesintisiz koşuya (9. hafta). Koşu bölümlerini bilerek yavaş koş (konuşma temposu, RPE 5–6). Çok zor gelen bir haftayı tekrarla.',
  },
  norwegian_4x4: {
    name: 'Norveç 4×4',
    desc: 'Araştırmalardan çıkan VO₂max protokolü: Maksimum kalp atış hızının %90–95’inde 4 dakikalık 4 interval.',
    why: 'Bundan daha iyi kanıtlanmış protokol pek yoktur: Maksimum kalp atış hızına yakın 4 dakikalık intervaller, dayanıklılık performansı ve uzun ömür için en iyi tekil gösterge olan VO₂max için bilinen en güçlü uyarandır. 3 dakikalık aktif molalar intervallerin kalitesini yüksek tutar. Koşu, bisiklet ve kürekte işe yarar.',
    progression: '1–2. haftalar: alışmak için 3 interval. 3. haftadan itibaren: tam 4×4. 7–8. haftalar: aktif mola 2:30’a kısaltılır. Yoğunluk: Her intervalin son 2 dakikası RPE 9 gibi hissettirmeli; o noktada konuşmak imkânsızdır.',
  },
  interval_10_20_30: {
    name: '10-20-30 intervalleri',
    desc: 'Danimarka yöntemi: 30 sn hafif, 20 sn tempolu, 10 sn sprint. Yarı antrenman hacmiyle daha hızlı ol.',
    why: 'Kopenhag Üniversitesi’nde geliştirildi: Koşucular antrenman hacimlerini yarıya indirmelerine rağmen daha hızlı ve daha formda oldu. Sadece 10 saniyelik sprintler maksimum uyaran verir, ama o kadar kısadır ki yük iyi dağılır. Az vaktin varsa ama daha hızlı koşmak istiyorsan ideal.',
    progression: 'Bir blok = 5×(30 sn hafif · 20 sn tempolu · 10 sn sprint). 1–2. haftalar: 2 blok, 3–4. haftalar: 3 blok, 5–6. haftalar: 4 blok; bloklar arasında 2 dakika hafif koşu. 10 saniyelik sprintler neredeyse maksimaldir (RPE 9), geri kalanı bilerek hafif.',
  },
  zone2_base: {
    name: 'Zone 2 temeli',
    desc: 'Profesyonellerin dayanıklılık temeli: Haftadan haftaya uzayan, nabız bölgesi 2’de hafif sürekli seanslar.',
    why: 'Elit dayanıklılık sporcuları hacimlerinin ~%80’ini tam burada yapar: aynı anda sohbet edebilecek kadar hafif. Zone 2 mitokondriyi ve yağ metabolizmasını geliştirir; her sert antrenmanın etkisini göstermesi için gereken temel budur. Hobi sporcularının en sık hatası bu seansları fazla hızlı koşmaktır.',
    progression: 'Kısa seanslar her 2 haftada 5 dakika uzar (25→40 dk), uzun koşu ise yüklenmeyi azaltan haftalarla birlikte her hafta 5 dakika uzar (35→60 dk). Tempo kontrolü: Tam cümlelerle konuşabilmelisin (RPE 3–4, Zone 2). Konuşamıyorsan yavaşla.',
  },
  '10k_training': {
    name: '10K antrenmanı',
    desc: '10 haftada yapılandırılmış 10 km hazırlığı: intervaller, tempo koşusu, hafif koşu ve uzun koşu.',
    why: '80/20 ilkesine göre koşu planlamasının klasiği: Haftada iki sert seans (VO₂max intervalleri + tempo koşusu) performans uyaranını sağlar, iki hafif seans dayanıklılık temelini kurar. Uzun koşu, yüklenmeyi azaltan haftalarla kademeli olarak uzar; son iki haftada taper yapılır ve start çizgisine dinç gelirsin.',
    progression: 'İntervaller: 4→6×3 dakika (RPE 9). Tempo koşusu: 15→25 dakika „rahat ama zor" (RPE 7). Uzun koşu: 40→70 dakika hafif, 4. ve 7. haftalarda yüklenme azaltılır. 9–10. haftalar: taper, hacim aşağı, dinçlik yukarı. Perşembe günkü hafif koşu her zaman hafif kalır.',
  },
  tabata_classic: {
    name: 'Klasik Tabata',
    desc: 'Orijinal Tabata protokolü: 20 saniye tam gaz, 10 saniye mola; artan raund sayısıyla.',
    why: 'Dünyanın en ünlü HIIT protokolü, 1996’da Japon sürat patencileri üzerinde araştırıldı: 20/10’luk 8 raund aerobik VE anaerobik kapasiteyi aynı anda geliştirdi; orta tempolu sürekli antrenmanın başaramadığı bir şey. Belirleyici olan yoğunluktur: „Tam gaz" gerçekten tam gaz demektir.',
    progression: '1–2. haftalar: 8 raund (1 Tabata bloğu, 4 dakika). 3–4. haftalar: 12 raund. 5–6. haftalar: 16 raund (2 blok). Her çalışma fazı RPE 9–10’da; son raundları artık temiz tamamlayamıyorsan mevcut seviyede bir hafta daha kal.',
  },
  gibala_sit: {
    name: 'Gibala protokolü 60/75',
    desc: 'Araştırmalardan „pratik SIT": 60 saniye sert, 75 saniye molalı 8–12 interval.',
    why: 'Martin Gibala’nın çalışma grubu, birkaç dakikalık yoğun intervallerin, katbekat daha uzun klasik dayanıklılık antrenmanına benzer hücresel adaptasyonları tetiklediğini gösterdi. 60/75 varyantı günlük hayata uygun versiyondur: sert, ama maksimal sprint olmadan; bu yüzden güvenli ve tüm vücut egzersizlerine uygun.',
    progression: '1–2. haftalar: 8 interval. 3–4. haftalar: 10 interval. 5–6. haftalar: 12 interval. Çalışma fazları RPE 8–9’da („çok zor, ama 60 saniye dayanılabilir"); molalarda durmak yerine hafifçe hareket et.',
  },
  hiit_beginner: {
    name: 'Başlangıç HIIT 30/30',
    desc: 'İnterval antrenmanına yumuşak giriş: 30 saniye çalışma, 30 saniye mola; 6’dan 10 raunda.',
    why: 'Çalışma ile mola arasındaki 1:1 oran HIIT’e ideal giriştir: Kanıtlanmış form etkileri için yeterince yoğun, ama tekniği temiz tutmak için yeterli toparlanma ile. Meta-analizlere göre HIIT, formu orta tempolu sürekli antrenmana göre neredeyse iki kat daha fazla geliştirir; hem de sürenin küçük bir kısmında.',
    progression: '1–2. haftalar: 6 raund. 3–4. haftalar: 8 raund. 5–6. haftalar: 10 raund. Çalışma fazları RPE 7–8’de; her molanın sonunda yeniden hazır olmalısın. Hızdan önce kalite: Temiz tekrarlar, çok tekrardan daha değerlidir.',
  },
  hiit_advanced: {
    name: 'İleri seviye HIIT 40/15',
    desc: 'İleri seviye için yoğun HIIT: 40 saniye çalışma, sadece 15 saniye mola, 12 raunda kadar.',
    why: 'Kısa mola oranı (neredeyse 3:1) kalp atış hızını sürekli yüksek tutar; böylece yorgunluk altında performans göstermeye devam etme yeteneğini çalıştırırsın. Haftada dört tematik seans (power, core, bacak, tüm vücut) yükü farklı kas gruplarına dağıtır.',
    progression: '1–2. haftalar: 8 raund. 3–6. haftalar: 10 raund. 7–8. haftalar: 12 raund. Çalışma fazları RPE 8–9’da. Form bozulursa raundu erken bitir: Sakatlanmamak raund sayısından daha önemlidir.',
  },
  emom_challenge: {
    name: 'EMOM Challenge',
    desc: 'Every Minute On the Minute: Her dakika yeni bir egzersiz başlar; mola, dakikadan geriye kalan süredir.',
    why: 'EMOM’da tempo kendiliğinden ayarlanır: Daha hızlı çalışan daha fazla mola kazanır; bu da yoğunluğu yüksek tutar ve dengeli tempo öğretir. Minimalist tüm vücut protokolleri üzerine yapılan çalışmaların gösterdiği gibi, bu tür tüm vücut intervalleri dayanıklılığı ve kas dayanıklılığını aynı anda geliştirir.',
    progression: '1–2. haftalar: temel raundlar (güne göre 10–15). 3–4. haftalar: +2 raund. 5–6. haftalar: +2 raund daha. Dakika başına tekrar sayısını ~15–20 saniye mola kalacak şekilde seç; hiç mola kalmıyorsa tekrarları azalt.',
  },
  boxing_basics: {
    name: 'Boks temelleri',
    desc: 'Boksun temellerini öğren: jab, cross, kroşe, ayak hareketleri; klasik 3 dakikalık raundlarda.',
    why: '3 dakikalık raundlarla boks antrenmanı gizli bir HIIT’tir: Kalp atış hızı yoğun çalışma ile kısa mola arasında gidip gelirken aynı anda koordinasyon ve teknik öğrenirsin. Her seansın bir odağı vardır; böylece haftadan haftaya temiz bir temel kurarsın.',
    progression: '1–2. haftalar: 6 raund (cuma 8). 3–4. haftalar: seans başına +1 raund. 5–6. haftalar: +1 raund daha. Önce teknik, sonra tempo: Yumruk kombinasyonlarını önce yavaş ve temiz, sonra daha hızlı yap. Her seansın son raundu „saf kondisyon" olabilir.',
    fokus: {
      mon: 'Temel yumruklar ve duruş',
      wed: 'Kombinasyonlar ve yumruk gücü',
      fri: 'Raund dayanıklılığı',
    },
  },
  kickboxing_conditioning: {
    name: 'Kickboks kondisyon',
    desc: 'Kondisyon ve tekniğe odaklanan kickboks antrenmanı: raundlarda tekmeler, yumruklar ve kombinasyonlar.',
    why: 'Kickboks üst ve alt vücudu pek az sporun yaptığı kadar birleştirir: Tekmeler bacakları, kalçayı ve gövdeyi, yumruklar omuzları ve kolları zorlar. Çalışmalar kickboks raundlarının kalp atış hızını maksimuma yaklaştırdığını gösteriyor: HIIT etkilerini ve hareketliliği bir arada elde edersin.',
    progression: '4. hafta: her seansta +1 raund. 7. hafta: bir kez daha +1 raund. Teknik günleri kondisyon günlerinden önce gelir: Yeni tekmeleri yorgunken uygulamadan önce havada yavaşça öğren. Kalça hareketliliği için her gün kısa esneme yap.',
    fokus: {
      mon: 'Tekme tekniği',
      tue: 'Patlayıcılık ve dayanıklılık',
      thu: 'Yumruk-tekme kombinasyonları',
      sat: 'Maç simülasyonu',
    },
  },
  mma_fundamentals: {
    name: 'MMA temelleri',
    desc: 'Karma dövüş sanatlarına giriş: striking, tekmeler ve dövüşe özgü kondisyon tek haftada bir arada.',
    why: 'MMA en çok yönlü dövüş sporudur: Yumruk, tekme ve yer dövüşü kuvvet, sürat ve dayanıklılığı aynı anda gerektirir. Spor bilimi tam olarak bu programın yansıttığı şeyi önerir: değişen odaklarla raund bazlı antrenman ve sprawl ile ip atlamalı ayrı bir kondisyon günü.',
    progression: '4. hafta: striking 8→9 raund, kondisyon 5→6 raund. 7. hafta: tekmeler 6→7 raund. Uzun cumartesi (gerçek MMA’daki gibi 5 dakikalık raundlar) sabit kalır; orada önemli olan yorgunluk altındaki kalitedir, daha fazla hacim değil.',
    fokus: {
      mon: 'Vuruş tekniği',
      tue: 'Tekmeler ve dizler',
      thu: 'Dövüş kondisyonu',
      sat: 'Maçtaki gibi 5 dakikalık raundlar',
    },
  },
  boxing_advanced: {
    name: 'İleri seviye boks',
    desc: 'İleri seviye boks antrenmanı: daha yüksek hacim, daha uzun seanslar, karmaşık kombinasyonlar.',
    why: 'İleri seviyede belirleyici olan iş kapasitesidir: Elit boksörler 60 ml/kg/dk civarında VO₂max değerlerine sahiptir; tam da teknik, kum torbası ve kondisyon raundlarından oluşan bu yapıyla kazanılmış değerler. Cumartesi günkü sparring simülasyonu her şeyi maça yakın bir yorgunluk altında bir araya getirir.',
    progression: '4. hafta: teknik ve kum torbası +1 raund. 7. hafta: bir kez daha +1 raund, kondisyon 8→10 raund. 9–10. haftalar: hacmi koru, kombinasyonların yoğunluğunu artır (daha hızlı, daha sert, kombinasyonlar arasında daha az mola).',
    fokus: {
      mon: 'Karmaşık kombinasyonlar',
      tue: 'Yumruk gücü ve ritim',
      fri: 'İş kapasitesi',
      sat: 'Yorgunluk altında her şey',
    },
  },
  combat_fitness: {
    name: 'Combat Fitness',
    desc: 'Ön bilgi gerektirmeyen, dövüş sporlarından ilham alan fitness antrenmanı: boks ve tekme unsurlarıyla tüm vücut workout’u.',
    why: 'Yarışma hedefi olmadan dövüş sporu kondisyonu isteyen herkes için giriş: kısa 2 dakikalık raundlarda gölge boksu, tekmeler ve vücut ağırlığı egzersizleri. Raund antrenmanı fizyolojik olarak interval antrenmanı gibi etki eder; üstüne gerçek teknikler öğrenmenin motivasyon bonusu da var.',
    progression: '3. hafta: seans başına 1 raund fazla. 5. hafta: raundlar 2:00’dan 2:30’a uzar. Molaları disiplinli şekilde 60 saniyede tut: Form etkisi, çalışma ile mola arasındaki orandan gelir.',
    fokus: {
      mon: 'Yumruklar ve üst vücut',
      wed: 'Tekmeler ve bacaklar',
      sat: 'Hepsi bir arada',
    },
  },
};
