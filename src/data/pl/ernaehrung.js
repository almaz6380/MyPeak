// Polnische Fassung von `src/data/nutritionKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Podstawy',
    makros: 'Makroskładniki',
    mikros: 'Mikroskładniki',
    praxis: 'Praktyka',
  },

  energy_balance: {
    name: 'Bilans energetyczny i kalorie',
    summary: 'Bilans energetyczny — kalorie spożyte w porównaniu z kaloriami spalonymi — decyduje o tym, czy przybierasz, czy tracisz na wadze. To najważniejsza zasada żywienia, stojąca ponad wszystkimi innymi szczegółami.',
    quick: [
      { label: 'Główna idea', text: 'Deficyt → chudniesz, nadwyżka → przybierasz, zapotrzebowanie → waga stabilna. Kalorie są najważniejsze.' },
      { label: 'Praktyka', text: 'Oszacuj TDEE, ustal cel, obserwuj przez 2–3 tygodnie, potem dostosuj.' },
    ],
    sections: [
      {
        title: 'Zasada bilansu energetycznego',
        content: 'Bilans energetyczny opisuje relację między energią, którą przyjmujesz z jedzeniem, a energią, którą zużywa twój organizm. Jeśli przyjmujesz więcej, niż spalasz (nadwyżka), organizm magazynuje nadmiar energii — głównie w postaci tłuszczu. Jeśli spalasz więcej, niż przyjmujesz (deficyt), sięga po rezerwy i tracisz na wadze.\n\nZasada ta opiera się na pierwszej zasadzie termodynamiki: energia nie ginie, tylko się przekształca. Liczne kontrolowane badania potwierdzają, że bilans energetyczny jest decydującym czynnikiem zmiany masy ciała — niezależnie od tego, z jakich produktów pochodzą kalorie (Hall i Guo, 2017, Gastroenterology).\n\nNie znaczy to, że jakość jedzenia nie ma znaczenia. Wpływa ona na sytość, zdrowie, wydolność i na to, jak łatwo utrzymasz dany poziom kalorii. Ale w samej kwestii „przybierać czy chudnąć” liczy się całkowity bilans kaloryczny.',
      },
      {
        title: 'Składowe wydatku kalorycznego',
        content: 'Całkowity dzienny wydatek energetyczny (TDEE) składa się z czterech części. Największy udział, 60–70%, ma podstawowa przemiana materii (BMR) — energia, której organizm potrzebuje w spoczynku do funkcji życiowych, takich jak oddychanie, krążenie i metabolizm komórkowy.\n\nTermiczny efekt pożywienia (TEF) stanowi ok. 10%: to energia zużywana na trawienie i przetwarzanie jedzenia. Najwyższy efekt termiczny ma białko — to jeden z powodów, dla których dieta wysokobiałkowa pomaga w redukcji tkanki tłuszczowej.\n\nTrzecią i najbardziej zmienną częścią jest aktywność. Rozróżnia się trening (EAT) i codzienny ruch (NEAT — Non-Exercise Activity Thermogenesis), np. chodzenie, wiercenie się i stanie. NEAT może różnić się między osobami o kilkaset kalorii dziennie i przy deficycie kalorycznym często nieświadomie się dostosowuje — ruszamy się mniej.',
      },
      {
        title: 'Szacowanie zapotrzebowania kalorycznego',
        content: 'Aby oszacować zapotrzebowanie, najpierw oblicz podstawową przemianę materii, np. wzorem Mifflina-St Jeora, i pomnóż ją przez współczynnik aktywności (od 1,2 przy bardzo siedzącym trybie życia do ~1,9 przy bardzo aktywnym). Wynik to szacowane TDEE — liczba kalorii, przy której twoja waga pozostaje stabilna.\n\nWażne: takie wzory dają tylko przybliżenia. Rzeczywisty wydatek może różnić się między osobami o 10–20%. Wartość wyjściowa jest więc tylko punktem startu, a nie dokładną mapą drogową.\n\nNajpewniejszy sposób to obserwowanie masy ciała przez dwa do trzech tygodni przy stałym spożyciu kalorii. Jeśli waga pozostaje stabilna, znalazłeś swoje zapotrzebowanie. Jeśli rośnie lub spada, skoryguj kalorie o ok. 200–300. W ten sposób teoria zostaje skalibrowana do twojej rzeczywistości.',
      },
      {
        title: 'Częste nieporozumienia',
        content: 'Częstym błędem jest wiara w „zepsuty” albo skrajnie wolny metabolizm. Prawdziwe zaburzenia metaboliczne są rzadkie; zwykle wydatek kaloryczny jest przeszacowany, a spożycie niedoszacowane. Badania pokazują, że ludzie często zaniżają swoje spożycie kalorii o 20–50% (Lichtman i wsp., 1992, New England Journal of Medicine).\n\nDrugi błąd: przekonanie, że pewne produkty „przyspieszają metabolizm” i topią tłuszcz. Takie efekty są minimalne i nie zmieniają podstawowego równania. Żadne jedzenie ani napój nie znosi bilansu energetycznego.\n\nPo trzecie, adaptacja metaboliczna jest realna, ale ograniczona: przy długotrwałym deficycie wydatek nieco spada (termogeneza adaptacyjna), ale nie tłumaczy to całkowitych zastojów. Kto nie chudnie, choć uważa, że jest w deficycie, zwykle je więcej, niż zakłada.',
      },
      {
        title: 'Podsumowanie',
        content: 'Bilans energetyczny to fundament całego żywienia: deficyt sprawia, że chudniesz, nadwyżka — że przybierasz, a zapotrzebowanie utrzymuje wagę. Wszystkie dalsze szczegóły — makra, pora posiłków, wybór produktów — działają w tych ramach.\n\nOszacuj zapotrzebowanie wzorem, ale traktuj tę wartość tylko jako punkt startu i kalibruj ją na podstawie rzeczywistej zmiany wagi. Mierz i dostosowuj, zamiast polegać wyłącznie na teorii.\n\nJakość jedzenia, białko i sytość decydują o tym, jak przyjemnie i zdrowo utrzymuje się dany poziom kalorii — ale o tym, czy przybierasz, czy chudniesz, decyduje bilans. Kto rozumie tę zasadę, staje się niezależny od dietetycznych mód.',
      },
    ],
  },

  protein: {
    name: 'Białko',
    summary: 'Białko to najważniejszy makroskładnik do budowy i utrzymania mięśni. Najlepiej syci, ma najwyższy efekt termiczny i chroni mięśnie podczas redukcji tkanki tłuszczowej. Dla trenujących optymalne jest ok. 1,6–2,2 g na kilogram masy ciała.',
    quick: [
      { label: 'Cel', text: 'Ok. 1,6–2,2 g na kg masy ciała dziennie; na diecie raczej górna granica.' },
      { label: 'Źródła', text: 'Mięso, ryby, jajka, nabiał, rośliny strączkowe, tofu, whey/odżywka białkowa.' },
    ],
    sections: [
      {
        title: 'Dlaczego białko jest tak ważne',
        content: 'Białka składają się z aminokwasów — budulca mięśni, enzymów, hormonów i praktycznie każdej struktury w organizmie. Dziewięć z tych aminokwasów jest niezbędnych — organizm nie potrafi ich wytworzyć sam, muszą pochodzić z jedzenia.\n\nDla sportowców białko ma szczególne znaczenie, bo pobudza syntezę białek mięśniowych — proces, w którym po treningu budowana jest nowa masa mięśniowa. Bez wystarczającej ilości białka nawet ciężki trening trudno przełożyć na wzrost mięśni.\n\nBiałko ma też dwie praktyczne zalety przy kontroli wagi: syci bardziej niż węglowodany czy tłuszcz i ma najwyższy efekt termiczny (ok. 20–30% kalorii z białka zużywa się na trawienie). Obie cechy czynią je najcenniejszym makroskładnikiem na diecie.',
      },
      {
        title: 'Ile białka potrzebujesz?',
        content: 'Oficjalne minimum, które chroni przed niedoborem, to 0,8 g na kilogram masy ciała — ale dla sportowców jest to dalekie od optimum. Obszerna metaanaliza Mortona i wsp. (2018, British Journal of Sports Medicine) wykazała, że największą korzyść dla budowy mięśni daje ok. 1,6 g/kg, z możliwą dodatkową korzyścią do ok. 2,2 g/kg.\n\nNa diecie lepsza jest górna granica. W deficycie kalorycznym zapotrzebowanie rośnie, bo białko chroni mięśnie przed rozpadem. Helms i wsp. (2014) zalecają sportowcom w deficycie do 2,3–3,1 g na kilogram beztłuszczowej masy ciała.\n\nDla większości trenujących prosta wytyczna ok. 2 g na kilogram masy ciała jest praktyczna i skuteczna. Więcej nie szkodzi zdrowym osobom, ale daje niewiele dodatkowej korzyści.',
      },
      {
        title: 'Jakość i rozłożenie',
        content: 'Nie wszystkie źródła białka są równe. „Jakość” zależy od zawartości aminokwasów niezbędnych, zwłaszcza leucyny, i od strawności. Źródła zwierzęce (mięso, ryby, jajka, nabiał) są zwykle pełnowartościowe; źródła roślinne często mają ograniczoną ilość pojedynczych aminokwasów, ale można je uzupełniać przez łączenie (np. strączki plus zboża).\n\nZnaczenie ma też rozłożenie w ciągu dnia. Synteza białek mięśniowych jest maksymalnie pobudzana w jednym posiłku przez ok. 20–40 g wysokiej jakości białka. Dlatego sensowne jest rozłożenie białka na trzy do pięciu posiłków zamiast zjadania całości w jednym.\n\nW praktyce oznacza to: każdy główny posiłek powinien zawierać dobre źródło białka. Najważniejszym czynnikiem pozostaje jednak całkowita ilość w ciągu dnia — idealne rozłożenie jest drugorzędne wobec osiągnięcia dziennego celu.',
      },
      {
        title: 'Mity i bezpieczeństwo',
        content: 'Uporczywy mit głosi, że dużo białka szkodzi nerkom. U zdrowych osób nie znajduje to potwierdzenia — kontrolowane badania nie wykazują negatywnego wpływu wysokiego spożycia białka na czynność nerek (Devries i wsp., 2018, Journal of Nutrition). Tylko przy istniejącej chorobie nerek konieczna jest konsultacja z lekarzem.\n\nInny mit: że organizm może „wykorzystać” tylko ok. 30 g białka na posiłek. W rzeczywistości więcej jest trawione i wykorzystywane — wypłaszcza się tylko ostry bodziec dla syntezy białek mięśniowych. Większe porcje nie są więc zmarnowane.\n\nOdżywki białkowe, takie jak whey, są wygodne, ale nie są koniecznością. To po prostu poręczne i tanie źródło białka. Kto pokrywa zapotrzebowanie zwykłym jedzeniem, nie potrzebuje suplementów — to narzędzie, a nie cud.',
      },
      {
        title: 'Podsumowanie',
        content: 'Białko to kluczowy makroskładnik do budowy i utrzymania mięśni oraz sytości. Dla trenujących optymalne jest ok. 1,6–2,2 g na kilogram masy ciała, na diecie raczej górna granica.\n\nStawiaj na wysokiej jakości źródła, rozkładaj białko na kilka posiłków, a przede wszystkim osiągaj dzienny cel. To, czy zwierzęce, czy roślinne, jest drugorzędne, o ile ilość całkowita i jakość są odpowiednie.\n\nCzęste ostrzeżenia przed „zbyt dużą” ilością białka są u zdrowych osób bezpodstawne. Białko to makroskładnik, przy którym precyzja opłaca się najbardziej — robi największą różnicę dla składu ciała i sytości.',
      },
    ],
  },

  carbs: {
    name: 'Węglowodany',
    summary: 'Węglowodany są głównym źródłem energii przy intensywnym treningu. Same w sobie nie „tuczą” — liczy się całkowity bilans kaloryczny. Jakość, ilość i pora spożycia mogą jednak wyraźnie wpływać na wydolność i samopoczucie.',
    quick: [
      { label: 'Funkcja', text: 'Główne paliwo przy intensywnym wysiłku; uzupełniają zapasy glikogenu w mięśniach i wątrobie.' },
      { label: 'Praktyka', text: 'Głównie źródła bogate w błonnik i mało przetworzone; ilość dopasuj do aktywności.' },
    ],
    sections: [
      {
        title: 'Co węglowodany robią w organizmie',
        content: 'Węglowodany są rozkładane do glukozy — preferowanego paliwa dla intensywnej pracy mięśni i głównego źródła energii dla mózgu. Nadmiar glukozy jest magazynowany jako glikogen w mięśniach i wątrobie — szybko dostępna rezerwa energii.\n\nPodczas intensywnego treningu siłowego i interwałowego organizm mocno korzysta z tego glikogenu mięśniowego. Dobrze wypełnione zapasy oznaczają większą wydolność, więcej powtórzeń i lepszą jakość treningu. Przy niskim spożyciu węglowodanów przez dłuższy czas zapasy te mogą się częściowo wyczerpać, a wydolność przy wysokiej intensywności może spaść.\n\nWęglowodany nie są jednak w ścisłym sensie niezbędne — organizm potrafi sam wytwarzać glukozę. Dla wyników sportowych i samopoczucia są mimo to dla większości osób bardzo przydatne, zwłaszcza przy intensywnym treningu.',
      },
      {
        title: 'Jakość: węglowodany złożone a proste',
        content: 'Źródła węglowodanów bardzo różnią się działaniem. Bogate w błonnik, mało przetworzone źródła, takie jak pełne ziarna, rośliny strączkowe, owoce i warzywa, są trawione wolniej, lepiej sycą i dostarczają mikroskładników. Mocno przetworzone źródła, takie jak cukier i produkty z białej mąki, wchłaniają się szybko i prawie nie sycą.\n\nSzczególną uwagę warto zwrócić na błonnik. Wspiera trawienie, odżywia bakterie jelitowe i poprawia sytość. Zaleca się ok. 25–35 g dziennie, a wiele osób jest od tego wyraźnie poniżej. Dieta bogata w błonnik wiąże się z lepszym zdrowiem i łatwiejszą kontrolą wagi.\n\nNie znaczy to, że węglowodany proste są zakazane. W okolicach treningu szybko dostępne węglowodany mogą być wręcz przydatne. Na co dzień jednak większość powinna pochodzić z odżywczych źródeł bogatych w błonnik.',
      },
      {
        title: 'Ile węglowodanów?',
        content: 'Po ustaleniu białka i tłuszczu pozostałe kalorie z twojego celu możesz uzupełnić węglowodanami. Nie ma jednej „właściwej” ilości — zależy ona od aktywności, preferencji i celów. Bardzo aktywne osoby korzystają z większej ilości węglowodanów, mniej aktywne radzą sobie z mniejszą.\n\nDla intensywnie trenujących często podaje się 3–5 g na kilogram masy ciała lub więcej. Kto mało się rusza albo woli dietę niskowęglowodanową, może być wyraźnie poniżej tej wartości bez szkody — o ile białko i całkowite kalorie są odpowiednie.\n\nDiety niskowęglowodanowe i ketogeniczne działają w redukcji tkanki tłuszczowej równie dobrze jak diety z większą ilością węglowodanów, pod warunkiem równej kaloryczności. Nie są magicznym spalaczem tłuszczu, lecz uzasadnioną opcją dla osób, które czują się na nich lepiej albo uważają je za bardziej sycące.',
      },
      {
        title: 'Mit insulinowy',
        content: 'Rozpowszechniony mit głosi, że węglowodany tuczą wyłącznie przez wyrzut insuliny. Insulina to hormon magazynujący, którego poziom rośnie po posiłkach bogatych w węglowodany — stąd wyprowadzono teorię, że to węglowodany są prawdziwym powodem tycia.\n\nKontrolowane badania wyraźnie temu jednak przeczą. Przy tej samej ilości kalorii i białka dieta niskowęglowodanowa nie prowadzi do większej utraty tłuszczu niż dieta wysokowęglowodanowa (Hall i wsp., 2016, American Journal of Clinical Nutrition). Insulina steruje krótkoterminowymi procesami magazynowania, ale nie znosi całkowitego bilansu energetycznego.\n\nU zdrowych osób normalne reakcje insulinowe na węglowodany są całkowicie bezproblemowe. Inaczej jest przy cukrzycy lub insulinooporności — wtedy sterowanie węglowodanami ma znaczenie medyczne i powinno odbywać się pod opieką lekarza.',
      },
      {
        title: 'Podsumowanie',
        content: 'Węglowodany są głównym paliwem przy intensywnym treningu i same w sobie wcale nie tuczą — decyduje bilans kaloryczny. Uzupełniają zapasy glikogenu oraz wspierają wydolność i regenerację.\n\nWybieraj głównie źródła bogate w błonnik i mało przetworzone, a ilość dopasuj do swojej aktywności. W okolicach treningu przydatne mogą być szybsze węglowodany.\n\nAni low-carb, ani high-carb nie jest z natury lepsze — oba działają przy odpowiedniej kaloryczności. Wybierz podejście, przy którym dobrze się czujesz, dobrze trenujesz i które utrzymasz długofalowo.',
      },
    ],
  },

  fats: {
    name: 'Tłuszcze',
    summary: 'Tłuszcz w diecie jest niezbędny dla hormonów, błon komórkowych i wchłaniania witamin rozpuszczalnych w tłuszczach. Minimalna ilość jest ważna dla zdrowia; rodzaj tłuszczu ma większe znaczenie niż sama ilość.',
    quick: [
      { label: 'Minimum', text: 'Długofalowo nie schodź poniżej ~0,5–0,8 g na kg masy ciała (funkcja hormonalna).' },
      { label: 'Jakość', text: 'Wybieraj tłuszcze nienasycone (oliwa, orzechy, ryby); unikaj tłuszczów trans.' },
    ],
    sections: [
      {
        title: 'Rola tłuszczu w diecie',
        content: 'Tłuszcz to znacznie więcej niż nośnik energii. Jest budulcem każdej błony komórkowej, prekursorem hormonów steroidowych, takich jak testosteron i estrogen, i jest potrzebny do wchłaniania witamin rozpuszczalnych w tłuszczach: A, D, E i K. Bardzo niskotłuszczowa dieta może więc upośledzać produkcję hormonów i wchłanianie składników odżywczych.\n\nZ 9 kaloriami na gram tłuszcz jest najbardziej kalorycznym makroskładnikiem — ma ponad dwa razy więcej energii niż białko czy węglowodany (po 4 kcal). Przez to łatwo niechcący przyjąć z tłuszczem dużo kalorii, dlatego na diecie pomaga świadome podejście.\n\nDwa kwasy tłuszczowe są niezbędne: omega-3 i omega-6. Organizm nie potrafi ich wytworzyć sam. Zwłaszcza kwasów omega-3 z tłustych ryb wiele osób spożywa za mało, a wiąże się z nimi wiele korzyści zdrowotnych.',
      },
      {
        title: 'Rodzaje tłuszczów',
        content: 'Tłuszcze nienasycone uchodzą za szczególnie korzystne. Jednonienasycone (oliwa, awokado, orzechy) i wielonienasycone (tłuste ryby, siemię lniane, orzechy włoskie) wspierają zdrowie serca i dostarczają niezbędnych kwasów tłuszczowych. Powinny stanowić większość spożywanego tłuszczu.\n\nTłuszcze nasycone (w mięsie, maśle, oleju kokosowym) nie są z natury szkodliwe, ale warto spożywać je z umiarem. Większość towarzystw naukowych zaleca poniżej 10% całkowitych kalorii. Dane na temat ich dokładnego działania są przedmiotem dyskusji, ale zastąpienie części z nich tłuszczami nienasyconymi uchodzi za korzystne.\n\nSztuczne tłuszcze trans to jedyny rodzaj tłuszczu, którego należy zdecydowanie unikać. Powstają przy przemysłowym utwardzaniu olejów i są silnie powiązane z chorobami układu krążenia. W wielu krajach są dziś ściśle regulowane lub zakazane.',
      },
      {
        title: 'Ile tłuszczu?',
        content: 'Inaczej niż w przypadku białka, przy tłuszczu trzeba przede wszystkim pilnować dolnej granicy. Trwale bardzo niskotłuszczowa dieta (poniżej ok. 0,5 g na kilogram masy ciała) może u niektórych osób upośledzać produkcję hormonów. Sensowne minimum to ok. 0,5–0,8 g na kilogram.\n\nW górę tłuszcz jest elastyczny. Gdy białko jest już ustalone, pozostałe kalorie można rozdzielić między tłuszcz a węglowodany według preferencji. Jedni czują się lepiej z większą ilością tłuszczu i mniejszą węglowodanów, inni odwrotnie — oba podejścia są zdrowe.\n\nTypowe zalecenia to ok. 20–35% całkowitych kalorii z tłuszczu. Ważniejsze od dokładnego odsetka jest pokrycie minimalnego zapotrzebowania, wybieranie głównie wartościowych tłuszczów i pilnowanie całkowitej kaloryczności.',
      },
      {
        title: 'Omega-3 pod lupą',
        content: 'Spośród tłuszczów na szczególną uwagę zasługują kwasy omega-3 EPA i DHA. Działają przeciwzapalnie i wiążą się z lepszym zdrowiem układu krążenia i mózgu. Głównym źródłem są tłuste ryby zimnowodne, takie jak łosoś, makrela i śledź.\n\nWiele osób spożywa za mało omega-3, a jednocześnie dużo omega-6 (z przetworzonych olejów), co niekorzystnie przesuwa proporcje. Dwie do trzech porcji tłustych ryb w tygodniu wyraźnie poprawiają podaż.\n\nKto nie je ryb, może rozważyć suplement z oleju z alg lub oleju rybnego. Roślinne źródła omega-3 (siemię lniane, orzechy włoskie) dostarczają ALA, który organizm przekształca w aktywne formy EPA i DHA tylko w ograniczonym stopniu. W pytaniach zdrowotnych dotyczących suplementacji zalecana jest konsultacja z lekarzem.',
      },
      {
        title: 'Podsumowanie',
        content: 'Tłuszcz jest niezbędny dla hormonów, błon komórkowych i wchłaniania witamin. Długofalowo nie schodź poniżej ok. 0,5–0,8 g na kilogram masy ciała, bo mogą ucierpieć funkcja hormonalna i samopoczucie.\n\nJakość tłuszczu ma znaczenie: wybieraj tłuszcze nienasycone z oliwy, orzechów, awokado i tłustych ryb, tłuszcze nasycone spożywaj z umiarem i unikaj sztucznych tłuszczów trans. Szczególnie dbaj o odpowiednią podaż omega-3.\n\nPowyżej minimum ilość tłuszczu jest elastyczna i zależy od upodobań. Dobierz podział między tłuszcze a węglowodany według swoich preferencji i pilnuj całkowitej kaloryczności.',
      },
    ],
  },

  micronutrients: {
    name: 'Witaminy i składniki mineralne',
    summary: 'Mikroskładniki nie dostarczają energii, ale są niezbędne dla niezliczonych funkcji organizmu. Urozmaicona dieta oparta na nieprzetworzonej żywności zwykle pokrywa zapotrzebowanie — kilka składników zasługuje jednak na szczególną uwagę.',
    quick: [
      { label: 'Podstawowa zasada', text: 'Różnorodne warzywa, owoce, pełne ziarna i źródła białka pokrywają większość mikroskładników.' },
      { label: 'Zwróć uwagę', text: 'Witamina D, omega-3, ewentualnie żelazo (kobiety), B12 (weganie), jod, magnez.' },
    ],
    sections: [
      {
        title: 'Czym są mikroskładniki',
        content: 'Mikroskładniki to witaminy i składniki mineralne, których organizm potrzebuje tylko w małych ilościach — w przeciwieństwie do makroskładników (białka, węglowodanów, tłuszczu), które dostarczają energii. Choć nie zawierają kalorii, uczestniczą praktycznie w każdym procesie metabolicznym: produkcji energii, funkcji odpornościowej, zdrowiu kości, transporcie tlenu i wielu innych.\n\nNiedobór mikroskładników może pojawiać się stopniowo — przez zmęczenie, gorszą regenerację, podatność na infekcje albo spadek wydolności. Zwłaszcza przy diecie o obniżonej kaloryczności lub jednostronnej ryzyko niedoborów rośnie.\n\nDobra wiadomość: urozmaicona dieta z dużą ilością warzyw, owoców, pełnych ziaren, wartościowych źródeł białka i zdrowych tłuszczów w naturalny sposób pokrywa zapotrzebowanie na większość mikroskładników. Różnorodność jedzenia to najlepsze zabezpieczenie przed niedoborami.',
      },
      {
        title: 'Krytyczne składniki pod kontrolą',
        content: 'Niektórych mikroskładników często brakuje nawet przy dobrej diecie. Witamina D powstaje głównie pod wpływem światła słonecznego i w wielu regionach, zwłaszcza zimą, jest jej za mało. Suplementacja ma tu często sens, najlepiej po badaniu krwi.\n\nŻelazo to szczególny temat dla miesiączkujących kobiet, bo regularna utrata krwi zwiększa zapotrzebowanie. Niedobór objawia się zmęczeniem i spadkiem wydolności. Witamina B12 występuje prawie wyłącznie w produktach zwierzęcych — osoby na diecie wegańskiej muszą ją suplementować.\n\nInne często niedoborowe składniki to jod, magnez, cynk i omega-3. Zamiast na ślepo suplementować wszystko, mądrzej jest przyjrzeć się konkretnie własnemu zapotrzebowaniu — najlepiej na podstawie wyników krwi i w porozumieniu z lekarzem.',
      },
      {
        title: 'Jedzenie przed suplementami',
        content: 'Zasadniczo: nieprzetworzona żywność jest lepsza od suplementów. Dostarcza mikroskładników w naturalnej matrycy z błonnikiem, związkami roślinnymi i innymi substancjami, które działają razem. Pojedyncza witamina w tabletce nie zastąpi tej złożoności.\n\nBadania nad izolowanymi preparatami witaminowymi często pokazują rozczarowujące lub żadne korzyści u zdrowych osób bez niedoboru — a przy przedawkowaniu czasem wręcz szkody. Więcej nie znaczy lepiej: witaminy rozpuszczalne w tłuszczach (A, D, E, K) mogą się kumulować i w dużych dawkach szkodzić.\n\nSuplementy mają sens, gdy występuje rzeczywisty niedobór lub zwiększone zapotrzebowanie — np. witamina D zimą, B12 na diecie wegańskiej albo żelazo przy potwierdzonym niedoborze. Jako celowe uzupełnienie są przydatne; jako zamiennik dobrej diety — nie.',
      },
      {
        title: 'Wdrożenie w praktyce',
        content: 'Najprostsza strategia dobrej podaży mikroskładników to różnorodność i kolory. Warzywa i owoce w różnych kolorach dostarczają różnych witamin i związków roślinnych — „jedz tęczę” to praktyczna reguła.\n\nKonkretnie pomaga dodawanie warzyw do każdego głównego posiłku, regularne sięganie po rośliny strączkowe, orzechy i nasiona, zmienianie źródeł białka i wybieranie pełnych ziaren zamiast mocno przetworzonych produktów. W ten sposób niemal automatycznie powstaje szeroka baza składników odżywczych.\n\nKto je dużo przetworzonego, jednostronnego jedzenia, ryzykuje niedobory mimo wystarczającej ilości kalorii — zjawisko opisywane czasem jako „przekarmiony i niedożywiony”. Jakość jedzenia jest więc kluczem do solidnej podaży mikroskładników.',
      },
      {
        title: 'Podsumowanie',
        content: 'Mikroskładniki nie dostarczają energii, ale są niezbędne dla zdrowia, regeneracji i wydolności. Urozmaicona dieta oparta na nieprzetworzonej żywności pokrywa zapotrzebowanie na większość witamin i składników mineralnych.\n\nNa szczególną uwagę zasługują witamina D, omega-3 oraz, zależnie od sytuacji, żelazo, B12, jod i magnez. Zamiast suplementować wszystko hurtowo, warto celowo przyjrzeć się własnemu zapotrzebowaniu, najlepiej na podstawie wyników krwi.\n\nNieprzetworzona żywność ma pierwszeństwo przed suplementami. Różnorodność i kolory na talerzu to najlepsza i najprostsza strategia dobrej podaży mikroskładników.',
      },
    ],
  },

  meal_timing: {
    name: 'Pora posiłków',
    summary: 'To, kiedy i jak często jesz, ma znacznie mniejsze znaczenie niż to, co i ile jesz. Pora posiłków może dopracować wydolność i samopoczucie, ale nigdy nie zastąpi podstaw: kalorii i białka.',
    quick: [
      { label: 'Priorytet', text: 'Najpierw całkowite kalorie i białko — pora posiłków to dopracowanie, a nie fundament.' },
      { label: 'Przydatne', text: 'Rozkładaj białko na cały dzień; jedz odpowiednio w okolicach treningu.' },
    ],
    sections: [
      {
        title: 'Właściwe proporcje',
        content: 'Wokół pory posiłków narosło wiele mitów — od „okna anabolicznego” tuż po treningu po zakaz jedzenia węglowodanów wieczorem. W rzeczywistości pora posiłków to czynnik dopracowujący, który liczy się dopiero wtedy, gdy podstawy są w porządku: całkowite kalorie, białko i jakość jedzenia.\n\nHierarchia żywienia jest jasna: najpierw bilans energetyczny, potem makroskładniki (zwłaszcza białko), potem jakość jedzenia i mikroskładniki — a dopiero na końcu pora i częstotliwość posiłków. Kto zaniedbuje wyższe poziomy, nie uratuje niczego idealnym timingiem.\n\nNie znaczy to, że pora posiłków jest bezużyteczna. Może poprawić wydolność, sytość i samopoczucie. Ale to ostatnia, najmniejsza dźwignia — żaden powód do stresu ani skomplikowanych zasad.',
      },
      {
        title: '„Okno anaboliczne”',
        content: 'Przez długi czas obowiązywała zasada, że białko i węglowodany trzeba przyjąć tuż po treningu, bo inaczej efekt treningowy przepadnie. To wąskie „okno anaboliczne” okazało się przesadą.\n\nMetaanaliza Schoenfelda, Aragona i Kriegera (2013, Journal of the International Society of Sports Nutrition) wykazała, że dokładna pora przyjęcia białka wokół treningu jest znacznie mniej ważna niż całkowita dzienna ilość białka. „Okno” ma raczej szerokość kilku godzin niż kilku minut.\n\nW praktyce oznacza to: dopóki jesz wystarczająco białka rozłożonego na cały dzień i nie jesteś przez wiele godzin przed treningiem i po nim całkowicie na czczo, nie musisz się spieszyć. Kto trenuje na czczo, może skorzystać z posiłku stosunkowo szybko po treningu — bardziej z powodów praktycznych niż z pilnych przyczyn fizjologicznych.',
      },
      {
        title: 'Częstotliwość posiłków i post przerywany',
        content: 'To, czy jesz trzy duże, czy sześć małych posiłków, ma niewielki wpływ na metabolizm czy redukcję tkanki tłuszczowej, o ile kalorie i białko pozostają takie same. Stare przekonanie, że częste małe posiłki „rozkręcają metabolizm”, zostało obalone — efekt termiczny zależy od całkowitej ilości, a nie od częstotliwości.\n\nPost przerywany (np. 16:8) jest popularny i dla wielu osób stanowi pomocne narzędzie do kontrolowania spożycia kalorii. Nie jest jednak magicznym spalaczem tłuszczu: przy tej samej kaloryczności nie prowadzi do większej utraty tłuszczu niż równomiernie rozłożona dieta. Jego korzyść polega głównie na tym, że niektórym osobom łatwiej w ten sposób utrzymać deficyt.\n\nNajlepsza częstotliwość posiłków to taka, która pasuje do twojej codzienności, dobrze cię syci i którą utrzymasz. Przy budowie mięśni sensowne jest rozłożenie białka na co najmniej trzy do czterech porcji — poza tym częstotliwość to kwestia gustu.',
      },
      {
        title: 'Rozsądny timing w praktyce',
        content: 'Choć pora posiłków jest drugorzędna, kilka punktów jest praktycznie przydatnych. Przed treningiem posiłek z węglowodanami i odrobiną białka na jedną do trzech godzin wcześniej zapewnia dobrą energię i wydolność. Za pełny żołądek tuż przed sesją może być natomiast nieprzyjemny.\n\nPo treningu sensowny jest posiłek z białkiem i węglowodanami w ciągu kilku godzin, aby wspierać regenerację i uzupełnianie glikogenu. Dokładna pora jest elastyczna — nie musi to być osławiona sekunda po ostatniej serii.\n\nTiming wpływa też na sen i trawienie: bardzo duże lub ostre posiłki tuż przed snem mogą go zakłócać. Ale jedzenie węglowodanów wieczorem nie musi budzić strachu przed tyciem — to mit, o ile dzienny bilans się zgadza.',
      },
      {
        title: 'Podsumowanie',
        content: 'Pora posiłków to dopracowanie żywienia, a nie jego fundament. Całkowite kalorie i białko decydują o większości efektu; timing i częstotliwość są drugorzędne.\n\n„Okno anaboliczne” ma szerokość kilku godzin, a nie minut. Częstotliwość posiłków i post przerywany są równoważne przy tej samej kaloryczności — wybierz to, co pasuje do twojej codzienności i dobrze cię syci.\n\nPrzydatne jest rozkładanie białka na cały dzień i odpowiednie jedzenie w okolicach treningu. Wszystko inne to indywidualna optymalizacja, a nie konieczność. Nie stresuj się porą posiłków, dopóki podstawy są w porządku.',
      },
    ],
  },
};
