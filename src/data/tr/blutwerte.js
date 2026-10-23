// Türkische Fassung von `src/data/bloodworkKnowledge.js`.
// Schlüssel = `id` aus der Datendatei. Reihenfolge der `sections` muss der
// Datendatei entsprechen — sie werden über den Index zugeordnet.
// Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    hormone: 'Hormonlar',
    stoffwechsel: 'Metabolizma',
    vitamine: 'Vitaminler ve mineraller',
    herz: 'Kalp ve dolaşım',
  },

  testosterone: {
    name: 'Testosteron',
    summary: 'Testosteron en önemli anabolik hormondur ve kas gelişimini, kemik yoğunluğunu, libidoyu, ruh hâlini ve enerjiyi etkiler. Değer yaşam tarzıyla olumlu yönde etkilenebilir; ancak abartılı vaatlere temkinli yaklaşmak gerekir.',
    quick: [
      { label: 'Önemi', text: 'Kas gelişimi, kemik yoğunluğu, libido, motivasyon, ruh hâli.' },
      { label: 'Doğal yoldan desteklemek', text: 'Kuvvet antrenmanı, iyi uyku, sağlıklı vücut ağırlığı, yeterli yağ ve mikro besin.' },
    ],
    sections: [
      {
        title: 'Testosteron vücutta ne yapar',
        content: 'Testosteron en önemli erkek cinsiyet hormonudur, ama kadınlarda da daha küçük miktarlarda bulunur ve orada da önemlidir. Anabolik (yapıcı) hormonlar arasındadır ve kas gelişimi, güç, kemik yoğunluğu, yağ dağılımı, libido, ruh hâli ve enerji için merkezi bir rol oynar.\n\nErkeklerde testosteron büyük ölçüde testislerde üretilir; bu üretim beyin (hipotalamus, hipofiz) ile testisler arasındaki etkileşimle yönetilir. Üretim, sabahları daha yüksek değerlerle günlük bir ritim izler; bu yüzden testosteron ölçümü için kan alımı çoğunlukla öğleden önce yapılır.\n\nSağlıklı bir testosteron seviyesi kuvvet antrenmanına uyumu ve genel iyi hâli destekler. Ancak hem çok düşük hem de yapay olarak çok yükseltilmiş değerlerin (örneğin anabolik steroidlerle) sağlık açısından sonuçları vardır.',
      },
      {
        title: 'Referans aralıkları ve ölçüm',
        content: 'Testosteron kanda, çoğunlukla total testosteron olarak ölçülür; ek olarak serbest (biyolojik olarak aktif) testosteron da bilgi vericidir. Referans aralıkları laboratuvara, yaşa ve ölçüm yöntemine göre değişir; bu yüzden değerler her zaman ilgili laboratuvar ve belirtiler bağlamında yorumlanmalıdır.\n\nYetişkin erkekler için total testosteron referans aralığı sıklıkla yaklaşık 300 ile 1000 ng/dl arasındadır, ama sınırlar kesin değildir. Ayrıca tek bir değer yalnızca anlık bir görüntüdür; günün saati, uyku, stres ve akut hastalıklar onu etkileyebilir. Dikkat çekici değerlerde genellikle yeniden ölçüm istenir.\n\nÖnemli olan, tek başına bir laboratuvar değerinin teşhis olmadığıdır. Ancak belirtilerin (ör. isteksizlik, libido kaybı, kas kaybı) ve tekrar ölçülen değerlerin birlikte değerlendirilmesi anlamlı bir tıbbi yorum yapılmasını sağlar.',
      },
      {
        title: 'Testosteron seviyesini neler etkiler',
        content: 'Çok sayıda yaşam tarzı faktörü testosteron seviyesine etki eder. Fazla kilo, özellikle fazla karın yağı, daha düşük değerlerle ilişkilidir; kilo vermek onları iyileştirebilir. Kronik uykusuzluk testosteronu ölçülebilir şekilde düşürür; yalnızca beş saat uykuyla geçen bir hafta bile değerleri belirgin şekilde azaltabilir (Leproult & Van Cauter, 2011, JAMA).\n\nKuvvet antrenmanı ve yeterli hareket uzun vadede olumlu etki yaparken aşırı antrenman veya çok büyük kalori açıkları testosteronu düşürebilir. Yeterli besinsel yağ ve çinko ile D vitamini gibi mikro besinlerin alımı da hormon üretimi için önemlidir; çok yağsız beslenme değerleri düşürebilir.\n\nKronik stres, testosterona ters yönde etki eden kortizol hormonunu artırır. Bu yüzden iyi uyku, dengeli beslenme, düzenli antrenman ve stres yönetimi içeren sağlıklı bir yaşam tarzı, sağlıklı bir testosteron seviyesi için en etkili doğal temeldir.',
      },
      {
        title: 'Gerçekçi beklentiler ve tıbbi tavsiye',
        content: 'Piyasa, çarpıcı artışlar vaat eden “testosteron güçlendiricileriyle” dolu. Bu preparatların çoğunun normal değerlere sahip insanlarda çalışmalarda hiç ya da yalnızca çok küçük etkisi var. Sağlıklı bir yaşam tarzı düşük bir değeri reçetesiz satılan herhangi bir üründen daha etkili yükseltir; normal değerlerde ise testosteronu anlamlı şekilde “zorlamak” pek mümkün değildir.\n\nİlgili belirtilerle birlikte gerçekten çok düşük bir testosteron seviyesi (hipogonadizm), doktor tarafından incelenmesi ve gerekirse tedavi edilmesi gereken tıbbi bir teşhistir. Testosteron tedavisi, faydalarını ve risklerini dikkatle tartması gerektiği için yalnızca doktorun işidir.\n\nPerformansı artırmak için anabolik steroidlerin kendi başına kullanılmasından kesinlikle kaçınılmalıdır: Vücudun kendi üretimini baskılayabilir ve ciddi sağlık hasarlarına yol açabilirler. Hormonal sorunlardan şüphelenildiğinde doğru yol her zaman doktora gitmektir.',
      },
    ],
  },

  vitamin_d_blood: {
    name: 'D vitamini (25-OH)',
    summary: 'D vitamini kan değeri (25-OH D vitamini), “güneş vitamini” alımını gösterir. Eksiklik özellikle kışın sık görülür ve kemikleri, kasları ve bağışıklık sistemini etkileyebilir. Değer hedefli şekilde iyileştirilebilir.',
    quick: [
      { label: 'Ne ölçülür', text: 'Kanda 25-OH D vitamini; D vitamini durumu için standart değer.' },
      { label: 'İyileştirmek', text: 'Güneş ışığı, yağlı balık, eksiklikte takviye; dozu kan testiyle yönet.' },
    ],
    sections: [
      {
        title: 'D vitamini değeri neden önemli',
        content: 'D vitamini vücutta bir hormon gibi etki eder ve kalsiyum metabolizması, sağlıklı kemikler, kas işlevi ve bağışıklık sistemi için merkezi önemdedir. Vücut onu güneşin etkisiyle kendisi ürettiği için alım büyük ölçüde mevsime, yaşanılan yere ve yaşam tarzına bağlıdır.\n\nAlımın en iyi göstergesi kandaki 25-hidroksi D vitaminidir (25-OH-D). Depo formunu yansıtır ve son haftalardaki duruma dair güvenilir bir genel bakış sunar. Kan tahlilinde tam olarak bu değer belirlenir.\n\nD vitamini eksikliği çok yaygın olduğu ve yalnızca besinlerle gidermek zor olduğu için bu değer en anlamlı rutin kan değerleri arasındadır; özellikle kuzey bölgelerinde yaşayanlar için ve güneşin az olduğu aylarda.',
      },
      {
        title: 'Referans aralıklarını anlamak',
        content: 'D vitamini durumu genellikle mililitre başına nanogram (ng/ml) veya litre başına nanomol (nmol/l) olarak verilir. Kabaca birçok laboratuvar şu sınıflandırmayı esas alır: Yaklaşık 20 ng/ml (50 nmol/l) altındaki değerler eksiklik, bunun üzerindeki aralık yeterli kabul edilir; kesin sınırlar ise uzman kuruluşa göre değişir.\n\nBu sınırlar uzmanlar arasında tartışılır ve kesin değildir. Bazı uzmanlar biraz daha yüksek hedef değerleri mantıklı bulurken bazıları aşırı tedaviye karşı uyarır. Belirleyici olan, kendi değerini zaman içindeki seyriyle ve bir doktorla görüşerek yorumlamaktır.\n\nÇok düşük bir değer bazen yorgunluk, kas zayıflığı veya sık enfeksiyonlar gibi belirsiz şikâyetleri açıklar. Ancak tek bir laboratuvar değeri her zaman bütün tablo içinde görülmelidir; bir yapı taşıdır, eksiksiz bir teşhis değil.',
      },
      {
        title: 'Değer nasıl iyileştirilir',
        content: 'En doğal kaynak güneş ışığıdır: Cildin düzenli ve ölçülü güneşe maruz kalması vücudun kendi üretimini uyarır. Yaz aylarında açık havada kısa süreler çoğu zaman yeterli olurken, kışın kuzey enlemlerinde UV-B ışınımı yetmez.\n\nBesinlerden D vitaminini özellikle yağlı balık (somon, uskumru, ringa), yumurta sarısı ve zenginleştirilmiş ürünler sağlar; ama çoğu zaman tek başına bir eksikliği gidermeyecek miktarlarda. Bu yüzden kanıtlanmış eksiklikte çoğu zaman bir takviye (D3 vitamini) en güvenilir çözümdür.\n\nEn akıllıca yol, takviye dozunu kan değeri üzerinden yönetmektir: Başlangıç değerini ölç, takviye al, birkaç ay sonra kontrol et ve ayarla. Böylece etkili ve güvenli aralıkta kalınır. D vitamini yağda çözündüğü ve birikebildiği için yüksek dozlar doktor eşliğinde alınmalıdır.',
      },
      {
        title: 'Değerlendirme ve tıbbi tavsiye',
        content: 'D vitamini, geniş ve gerçek bir önemi olan az sayıdaki takviyeden biridir; aynı zamanda ne bir eksikliği abartmalı ne de D vitaminini her derde deva sanarak gözünde büyütmelisin. Her sağlık sorununu çözmez, ama önemli bir yapı taşıdır.\n\nYağda çözünen vitaminler birikebildiği için kontrolsüz yüksek doz zararsız değildir. Uzun süre alınan aşırı yüksek dozlar tehlikeli bir kalsiyum fazlalığına yol açabilir. Bu yüzden şu geçerlidir: Değeri ölç, hedefli takviye yap ve emin olmadığında doktora danış.\n\nD vitamini değeri, veriye dayalı bir yaklaşımın ne kadar mantıklı olduğunun iyi bir örneğidir: Tahmin etmek yerine kan testi netlik sağlar ve hedefli, güvenli bir düzeltmeyi mümkün kılar. Ancak bu içerikler tıbbi danışmanlığın yerini tutmaz.',
      },
    ],
  },

  iron_ferritin: {
    name: 'Demir ve ferritin',
    summary: 'Demir, kanda oksijen taşınması için vazgeçilmezdir. Ferritin demir depolarını gösterir. Özellikle adet gören kadınlarda ve dayanıklılık sporcularında sık görülen bir eksiklik yorgunluğa ve performans düşüşüne yol açar.',
    quick: [
      { label: 'Ne ölçülür', text: 'Ferritin (depo), çoğu zaman hemoglobin, transferrin ve transferrin satürasyonuyla birlikte.' },
      { label: 'Risk grupları', text: 'Adet gören kadınlar, dayanıklılık sporcuları, vejetaryen/vegan beslenme.' },
    ],
    sections: [
      {
        title: 'Demirin rolü',
        content: 'Demir esansiyel bir mineraldir ve oksijeni akciğerlerden tüm dokulara taşıyan kırmızı kan pigmenti hemoglobinin temel bileşenidir. Yeterli demir olmadan vücut yeterince işlevsel hemoglobin üretemez; bu da oksijen sağlanmasını olumsuz etkiler.\n\nDemir kasta da miyoglobin aracılığıyla oksijen depolanmasında rol oynar ve hücrelerdeki enerji üretimine katılır. Bu yüzden demir eksikliği dayanıklılığı, gücü ve genel performans kapasitesini doğrudan etkiler.\n\nEksikliğin tipik belirtileri yorgunluk, solukluk, yüklenmede nefes darlığı, konsantrasyon zayıflığı ve antrenmanda hissedilir bir performans düşüşüdür. Bu belirtiler özgül olmadığı için demir eksikliği çoğu zaman kanda tespit edilene kadar bir süre fark edilmeden kalır.',
      },
      {
        title: 'Ferritin ve en önemli değerler',
        content: 'Demir durumunu değerlendirmek için birkaç değere bakılır. En önemlisi demirin depo formu olan ferritindir: Demir rezervlerinin ne kadar dolu olduğunu gösterir ve çoğu zaman belirgin bir eksiklik kan tablosunda görünür hâle gelmeden önce düşer. Düşük ferritin bu yüzden erken bir uyarı işaretidir.\n\nTamamlayıcı olarak hemoglobin (asıl kırmızı kan pigmenti), transferrin (taşıyıcı protein) ve transferrin satürasyonu değerlendirilir. İyi bir yorumu ancak bütün tablo mümkün kılar: Hemoglobin henüz normalken düşük ferritin, gerçek bir anemi oluşmadan önce depoların boş olduğuna işaret eder.\n\nÖnemli olan, ferritinin iltihaplarda da yükselebileceği ve o zaman bir eksikliği maskeleyebileceğidir. Bu yüzden demir değerleri her zaman bir doktor tarafından diğer göstergeler ve klinik tabloyla birlikte yorumlanmalıdır.',
      },
      {
        title: 'Risk grupları ve nedenler',
        content: 'Belirli grupların demir eksikliği riski belirgin şekilde yüksektir. Adet gören kadınlar düzenli olarak kan ve dolayısıyla demir kaybeder; demir eksikliği onlarda en sık görülen eksikliktir. Hamilelerin ihtiyacı da çok artmıştır.\n\nDayanıklılık sporcuları da risk altındadır; diğer nedenlerin yanı sıra artan ihtiyaç, ter ve mide-bağırsak yoluyla kayıplar ve koşudaki ayak darbesi etkisi denen olgu nedeniyle. Vejetaryen veya vegan beslenen insanlar demiri daha zor kullanılan bir formda alır ve durumlarını takip etmelidir.\n\nDiğer nedenler yetersiz alım, emilimi bozan sindirim hastalıkları veya gizli kan kayıpları olabilir. Nedenler çok çeşitli olduğu için belirsiz ya da süregelen bir demir eksikliği her zaman doktor tarafından incelenmelidir.',
      },
      {
        title: 'İyileştirmek, ama doğru şekilde',
        content: 'Beslenmeyle iyi kullanılan hem demirini özellikle kırmızı et sağlar; baklagiller, tam tahıl ve yeşil sebze gibi bitkisel kaynaklar ise daha kötü emilen hem olmayan demir içerir. C vitamini (ör. öğünle birlikte meyve veya sebzeden) bitkisel demirin emilimini belirgin şekilde iyileştirirken kahve ve çay onu engeller.\n\nKanıtlanmış bir eksiklikte beslenme depoları hızla doldurmaya çoğu zaman yetmez; o zaman demir preparatları gerekli olabilir. Ancak bunlar rastgele alınmamalıdır: Eksiklik olmadan demir takviyesi zararsız değildir, çünkü fazla demir vücutta birikip zarar verebilir.\n\nBu yüzden demirde özellikle şu geçerlidir: Önce ölç, sonra hedefli harekete geç. Demir tedavisinin dozu ve süresi, nedenin araştırılması gibi, doktorun işidir. Bu içerikler bilgilendirme amaçlıdır ve tıbbi teşhisin yerini tutmaz.',
      },
    ],
  },

  cholesterol: {
    name: 'Kolesterol ve kan yağları',
    summary: 'Kolesterol ve trigliseritler önemli kan yağlarıdır. Profilleri (LDL, HDL, trigliseritler) kalp-damar sağlığı için merkezi bir göstergedir. Yaşam tarzının etkisi büyüktür; ancak değerlendirme doktorun işidir.',
    quick: [
      { label: 'Önemli değerler', text: 'Total kolesterol, LDL, HDL, trigliseritler; birlikte lipit profili.' },
      { label: 'Olumlu etkilemek', text: 'Lif, doymamış yağlar, hareket, sağlıklı kilo, az trans yağ.' },
    ],
    sections: [
      {
        title: 'Kolesterol nedir',
        content: 'Kolesterol, vücudun hücre zarları, hormonlar ve safra asitleri oluşturmak için ihtiyaç duyduğu yağ benzeri bir maddedir. Yani hayati önemdedir ve temelde “kötü” bir şey değildir. Vücut kolesterolün büyük kısmını kendisi üretir; bir kısmı besinlerden gelir.\n\nKolesterol yağda çözündüğü için kanda taşıyıcı proteinlere, yani lipoproteinlere bağlanır. En bilinenleri LDL (“Low Density Lipoprotein”) ve HDL’dir (“High Density Lipoprotein”). Basitçe söylemek gerekirse LDL kolesterolü dokulara taşırken HDL fazla kolesterolü karaciğere geri götürür.\n\nBir diğer önemli kan yağı değeri, depolanmış yağın ana formu olan trigliseritlerdir. Total kolesterol, LDL, HDL ve trigliseritler birlikte kan tahlilinde belirlenen lipit profilini oluşturur.',
      },
      {
        title: 'LDL, HDL ve değerlendirme',
        content: 'Tek tek değerlerin oranı ve yüksekliği kalp-damar sağlığı için önemlidir. Sürekli yüksek LDL kolesterol, damarlarda birikintiler (ateroskleroz) için daha yüksek bir riskle ilişkilidir; bu yüzden LDL çoğu zaman “olumsuz” kolesterol olarak adlandırılır. HDL ise geri taşımaya katıldığı için tersine daha çok “olumlu” kabul edilir.\n\nYüksek trigliseritler de bir risk faktörüdür; çoğu zaman fazla kilo, yüksek şeker tüketimi ve hareketsizlikle bağlantılı. Ancak risk değerlendirmesinde tek bir değer tek başına değil, tansiyon, sigara, aile öyküsü ve kan şekeri gibi diğer faktörlerle birlikte bütün profil önemlidir.\n\nKesin hedef aralıklar büyük ölçüde kişisel toplam riske bağlıdır ve doktor tarafından belirlenir. “Yüksek” bir değer otomatik olarak müdahale gerektirmez, “normal” bir değer de riski tamamen dışlamaz; bu yüzden doktorun yorumu belirleyicidir.',
      },
      {
        title: 'Yaşam tarzıyla ilgili olanlar',
        content: 'Yaşam tarzının kan yağları üzerinde önemli bir etkisi vardır. Bol sebze, meyve, baklagil ve tam tahıl içeren lif açısından zengin bir beslenme LDL kolesterolü düşürebilir. Doymuş yağların doymamış yağlarla (zeytinyağı, kuruyemiş, yağlı balık) değiştirilmesi olumlu etki yaparken yapay trans yağlar açıkça olumsuzdur ve kaçınılmalıdır.\n\nDüzenli fiziksel aktivite lipit profilini, özellikle trigliseritleri ve HDL’yi iyileştirir. Sağlıklı bir vücut ağırlığı, sigarayı bırakmak ve ölçülü alkol tüketimi de kalp-damar sağlığına katkıda bulunur. Bu önlemler birlikte etki eder ve her iyileştirmenin temelidir.\n\nÖnemli olan gerçekçi bir değerlendirmedir: Kolesterol değerlerinin bir kısmı genetiktir ve yaşam tarzıyla yalnızca sınırlı ölçüde etkilenebilir. Bazı insanların sağlıklı yaşamalarına rağmen değerleri yüksektir; burada yalnızca doktorun karar verdiği bir ilaç tedavisi gerekli olabilir.',
      },
      {
        title: 'Değerlendirme ve tıbbi tavsiye',
        content: 'Lipit profili, kalp-damar riskini değerlendirmek için en önemli rutin kan değerlerinden biridir. Damarlardaki birikintiler uzun süre belirti vermediği için düzenli kontrol mantıklıdır; özellikle yaş ilerledikçe veya ailede yatkınlık varsa.\n\nYorumlamak karmaşıktır ve doktorun işidir. Bir değerin tedavi edilip edilmeyeceği ve nasıl tedavi edileceği tek bir sayıya değil, kişisel toplam riske bağlıdır. Yaşam tarzı değişiklikleri neredeyse her zaman ilk adımdır; statinler gibi ilaçlar ilgili risk varsa eklenir ve iyi araştırılmıştır.\n\nBu bilgiyi kendi lipit profilini daha iyi anlamak ve yaşam tarzı faktörlerini hedefli şekilde ele almak için kullan. Ancak değerlerinin somut değerlendirmesi ve tedavisi her zaman bir doktorla yapılmalıdır; bu içerikler tıbbi danışmanlığın yerini tutmaz.',
      },
    ],
  },

  blood_sugar: {
    name: 'Kan şekeri ve HbA1c',
    summary: 'Kan şekeri (glikoz) ve uzun dönem değeri HbA1c, vücudun şekeri ne kadar iyi işlediğini gösterir. Metabolizma ve diyabet riski için merkezi göstergelerdir. Beslenme ve hareketin etkisi büyüktür.',
    quick: [
      { label: 'Ne ölçülür', text: 'Açlık kan şekeri (anlık değer) ve HbA1c (son ~3 ayın ortalaması).' },
      { label: 'Olumlu etkilemek', text: 'Hareket, sağlıklı kilo, lif açısından zengin beslenme, az şeker; kas antrenmanı yardımcı olur.' },
    ],
    sections: [
      {
        title: 'Kan şekeri ve insülin',
        content: 'Glikoz (kan şekeri) vücudun merkezi enerji taşıyıcılarından biridir. Yemekten sonra kan şekeri yükselir; bunun üzerine pankreas insülin hormonunu salgılar. İnsülin glikozu hücrelere taşır ve böylece kan şekerini yeniden normal seviyeye indirir.\n\nBu ince ayarlı sistem kan şekerini dar bir aralıkta tutar. İyi işlediğinde şeker verimli şekilde işlenir. İnsülinin etkisi bozulduğunda (insülin direnci) vücut giderek daha fazla insülin üretmek zorunda kalır ve kan şekeri fazla yüksek kalır; bu, tip 2 diyabetin bir ön aşamasıdır.\n\nKaslar burada önemli bir rol oynar: Aktif kaslar glikoz alır ve insülin duyarlılığını iyileştirir. Bu yüzden düzenli antrenman, özellikle kuvvet antrenmanı, sağlıklı bir şeker metabolizması için en etkili faktörlerden biridir.',
      },
      {
        title: 'Açlık kan şekeri ve HbA1c',
        content: 'İki değer özellikle bilgi vericidir. Açlık kan şekeri birkaç saat yemek yemeden sonra ölçülür ve mevcut şeker seviyesini gösterir. Anlık bir görüntüdür ve beslenme, stres ve günün saatine göre dalgalanabilir.\n\nHbA1c değeri (“uzun dönem şekeri”) son yaklaşık iki üç ayın ortalama kan şekerini yansıtır. Kan pigmenti hemoglobinin şeker bağlamış kısmının oranını ölçer. Daha uzun bir dönemi yansıttığı için kısa süreli dalgalanmalara karşı daha sağlamdır ve teşhis ile takip için kullanılır.\n\nHer iki değer birlikte şeker metabolizmasının iyi bir resmini verir. Yüksek değerler diyabetin bir ön aşamasına (prediyabet) veya mevcut bir diyabete işaret edebilir. Kesin sınır değerleri ve yorumlarını doktor belirler.',
      },
      {
        title: 'Beslenme ve hareketin etkisi',
        content: 'Şeker metabolizması yaşam tarzıyla güçlü şekilde etkilenebilir. Sebze, baklagil ve tam tahıl içeren lif açısından zengin bir beslenme, yoğun işlenmiş, şekerli besinlere göre daha yavaş ve daha dengeli bir kan şekeri artışına yol açar. Şekerle tatlandırılmış içecekleri ve beyaz un ürünlerini azaltmak özellikle etkilidir.\n\nHareket anahtar bir faktördür. Hem dayanıklılık hem de kuvvet antrenmanı insülin duyarlılığını iyileştirir ve kasların glikoz almasına yardım eder. Yemekten sonra kısa bir yürüyüş bile kan şekeri artışını yumuşatabilir. Kas kütlesi oluşturmak ayrıca vücudun “şeker deposunu” büyütür.\n\nSağlıklı bir vücut ağırlığı, özellikle karın yağının azaltılması, kan şekeri değerlerini belirgin şekilde iyileştirir. Bu yaşam tarzı önlemleri, prediyabete karşı koymak ve diyabet riskini düşürmek için en etkili ve ilk stratejidir.',
      },
      {
        title: 'Değerlendirme ve tıbbi tavsiye',
        content: 'Kan şekeri ve HbA1c en önemli tarama kan değerleri arasındadır, çünkü bozulmuş bir şeker metabolizması uzun süre belirti vermez ama ciddi sonuçları olabilir. Prediyabetin erken fark edilmesi, diyabet gelişmeden önce yaşam tarzı değişiklikleriyle karşı koyma şansı sunar.\n\nYüksek değerler önemli bir uyarı işaretidir, ama kendi kendine teşhis değildir. Yorum, ileri inceleme ve olası tedavi doktorun işidir. Mevcut bir diyabette yapılandırılmış tıbbi takip vazgeçilmezdir.\n\nBu bilgiyi değerlerinin anlamını kavramak ve beslenme ile hareketi hedefli kullanmak için kullan. Kuvvet antrenmanı ve dengeli, lif açısından zengin bir beslenme sağlıklı bir şeker metabolizması için güçlü müttefiklerdir. Ancak bu içerikler tıbbi danışmanlığın veya teşhisin yerini tutmaz.',
      },
    ],
  },

  thyroid: {
    name: 'Tiroid (TSH)',
    summary: 'Tiroit bezi hormonlarıyla metabolizmayı, enerjiyi ve vücut sıcaklığını yönetir. TSH değeri, aşırı veya az çalışma için en önemli tarama testidir. Dikkat çekici bulgular her zaman doktor tarafından incelenmelidir.',
    quick: [
      { label: 'Ne ölçülür', text: 'Tarama testi olarak TSH; dikkat çekici durumda ek olarak sT3/sT4 ve gerekirse antikorlar.' },
      { label: 'Belirtiler', text: 'Yorgunluk, kilo değişimi, soğuk/sıcak hissi, ruh hâli; özgül değil, doktora danış.' },
    ],
    sections: [
      {
        title: 'Tiroit bezi ve hormonları',
        content: 'Tiroit bezi boyunda bulunan, küçük, kelebek şeklinde ama etkisi büyük bir bezdir. Bazal metabolizmayı, enerji metabolizmasını, vücut sıcaklığını, kalp atışını ve diğer birçok işlevi düzenleyen tiroit hormonları T3 (triiyodotironin) ve T4’ü (tiroksin) üretir.\n\nTiroit bezi beyinle bir geri bildirim döngüsü üzerinden yönetilir. Hipofiz bezi, tiroidi hormon üretmeye uyaran TSH (tiroit uyarıcı hormon) hormonunu salgılar. Bu döngü hormon miktarını vücudun ihtiyacına ince bir şekilde ayarlar.\n\nTiroit işlevi bozulduğunda bu tüm vücudu etkiler. Az çalışma (hipotiroidi) metabolizmayı yavaşlatır, aşırı çalışma (hipertiroidi) hızlandırır; ikisi de çok sayıda özgül olmayan belirtiyle kendini gösterir.',
      },
      {
        title: 'TSH neden en önemli değer',
        content: 'TSH değeri tiroit işlevi için en hassas tarama testidir. Nedeni geri bildirim döngüsündedir: Tiroit çok az hormon üretirse vücut karşılık vermeye çalışır ve daha fazla TSH salgılar; bu yüzden yüksek TSH değeri çoğu zaman az çalışmaya işaret eder. Çok fazla üretirse TSH düşer; bu da aşırı çalışmaya işaret edebilir.\n\nTSH küçük sapmalara bile tepki verdiği için ilk ölçülen değerdir. TSH dikkat çekiciyse ileri incelemeler gelir: serbest tiroit hormonları sT3 ve sT4 ile gerekirse otoimmün hastalık Haşimoto gibi nedenleri tespit etmek için antikorlar.\n\nTSH referans aralıkları laboratuvara göre değişir ve yorum tek tek duruma bağlıdır; örneğin yaşa, hamileliğe veya mevcut belirtilere. Tek bir sınırda değer otomatik olarak bir hastalık anlamına gelmez.',
      },
      {
        title: 'Belirtiler ve sık görülen bozukluklar',
        content: 'Tiroidin az çalışması sıklıkla yorgunluk, isteksizlik, kilo alma, soğuğa duyarlılık, kuru cilt ve çökkün ruh hâliyle kendini gösterir. Aşırı çalışması ise çoğu zaman sinirlilik, çarpıntı, iştaha rağmen kilo kaybı, sıcağa duyarlılık ve uyku bozukluklarıyla ortaya çıkar.\n\nBu belirtiler özgül değildir ve başka birçok nedeni olabilir; tam da bu yüzden kan tahlili, tiroidi bir neden olarak hedefli şekilde kontrol etmek veya dışlamak için çok değerlidir. Sporla aktif olan insanlar için iyi çalışan bir tiroit önemlidir, çünkü enerjiyi, toparlanmayı ve metabolizmayı etkiler.\n\nSık görülen bozukluklar otoimmün hastalık Haşimoto (çoğunlukla az çalışmaya yol açar) ve Basedow hastalığıdır (aşırı çalışmaya yol açar). İyot eksikliği de tiroidi olumsuz etkileyebilir. Kesin teşhis her zaman bir doktor muayenesi gerektirir.',
      },
      {
        title: 'Değerlendirme ve tıbbi tavsiye',
        content: 'Tiroit, küçük bir organın tüm vücudu nasıl etkilediğinin bir örneğidir. TSH değeri, süregelen yorgunluk, açıklanamayan kilo değişimleri veya ruh hâli dalgalanmaları gibi belirsiz belirtilerde mantıklı olabilecek basit ve bilgi verici bir tarama testidir.\n\nBazı diğer değerlerden farklı olarak gerçek bir tiroit işlev bozukluğu yaşam tarzıyla kolayca “antrenmanla giderilemez”. Yeterli iyot alımı (iyotlu tuz ve besinlerle) normal işlevi destekler, ama mevcut bir bozukluk çoğu zaman hormon preparatlarıyla hedefli bir tıbbi tedavi gerektirir.\n\nBu yüzden burada özellikle şu geçerlidir: Dikkat çekici tiroit değerleri veya ilgili belirtiler her zaman doktorun işidir. Bu bilgi TSH değerinin anlamını kavramana ve belirtileri ciddiye almana yardım eder; teşhisin ve tedavinin yerini kesinlikle tutmaz.',
      },
    ],
  },
};
