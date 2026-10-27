// Polnische Fassung von `src/data/supplementsKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Podstawy',
    leistung: 'Wydolność',
    gesundheit: 'Zdrowie',
  },

  creatine: {
    name: 'Kreatyna',
    summary: 'Kreatyna to najlepiej przebadany i najskuteczniejszy suplement na siłę i budowę mięśni. Jest bezpieczna, tania i udowodnienie poprawia wydolność przy krótkich, intensywnych wysiłkach. Preferowaną formą jest monohydrat kreatyny.',
    quick: [
      { label: 'Dawkowanie', text: '3–5 g monohydratu dziennie, na stałe — pora przyjmowania nie ma znaczenia. Faza nasycenia opcjonalna. Więcej masy mięśniowej oznacza górną granicę zakresu.' },
      { label: 'Działanie', text: 'Więcej siły i powtórzeń, wspiera budowę mięśni, dobrze udokumentowana i bezpieczna.' },
    ],
    sections: [
      {
        title: 'Czym jest kreatyna i jak działa',
        content: 'Kreatyna to substancja wytwarzana przez organizm, obecna w mięśniach i mózgu, a dostarczana także z produktami zwierzęcymi, takimi jak mięso i ryby. W mięśniu jest magazynowana jako fosfokreatyna i służy do szybkiej regeneracji ATP — bezpośredniego nośnika energii w komórce.\n\nPodczas krótkich, intensywnych wysiłków — np. ciężkich serii w treningu siłowym albo sprintów — ATP wyczerpuje się w ciągu kilku sekund. Fosfokreatyna pomaga go szybko odbudować, dzięki czemu można utrzymać większą siłę przez więcej powtórzeń. Pełne zapasy kreatyny oznaczają więc większą wydolność treningową.\n\nDzięki suplementacji zawartość kreatyny w mięśniach można podnieść o ok. 20–40% ponad normalny poziom. Ten wzrost wyjaśnia działanie zwiększające wydolność, które zostało konsekwentnie potwierdzone w setkach badań.',
      },
      {
        title: 'Dane naukowe',
        content: 'Żaden suplement dla trenujących siłowo nie jest lepiej przebadany niż kreatyna. Stanowisko International Society of Sports Nutrition (Kreider i wsp., 2017, Journal of the International Society of Sports Nutrition) podsumowuje: monohydrat kreatyny to najskuteczniejszy suplement do zwiększania wydolności przy wysokiej intensywności i wspierania budowy mięśni.\n\nEfekty są wyraźnie mierzalne: w połączeniu z treningiem siłowym kreatyna zwiększa przyrost siły i beztłuszczowej masy ciała znacznie bardziej niż sam trening. Korzyść pojawia się w niemal wszystkich grupach wiekowych i na wszystkich poziomach zaawansowania.\n\nPoza sportem kreatyna jest coraz częściej badana pod kątem możliwych korzyści poznawczych i zdrowotnych, np. przy zmęczeniu psychicznym lub w starzeniu się. Te badania są obiecujące, ale jeszcze nie tak jednoznaczne jak dane dotyczące wydolności fizycznej — osobna sekcja poniżej wyjaśnia, co jest tam potwierdzone, a co nie.',
      },
      {
        title: 'Dawkowanie i stosowanie',
        content: 'Stosowanie jest proste. Najczęstsze podejście to codzienna dawka podtrzymująca 3–5 g monohydratu kreatyny. Pora przyjmowania nie odgrywa istotnej roli — liczy się codzienne, ciągłe przyjmowanie, bo zapasy wypełniają się z czasem.\n\nOpcjonalnie istnieje faza nasycenia: ok. 20 g dziennie (podzielone na cztery porcje) przez pięć do siedmiu dni, aby szybciej wypełnić zapasy. Potem następuje normalna dawka podtrzymująca. Faza nasycenia tylko przyspiesza efekt; bez niej zapasy też są pełne po ok. trzech do czterech tygodni.\n\nMonohydrat kreatyny to najlepiej przebadana i najtańsza forma — droższe warianty (np. Kre-Alkalyn, chlorowodorek kreatyny) nie dają udowodnionej dodatkowej korzyści. Warto wybrać produkt z certyfikatem jakości, np. Creapure.\n\nZakres od 3 do 5 gramów nie jest przypadkowy — zależy od masy mięśniowej. Stanowisko ISSN operuje wartością ok. 0,03 g na kilogram masy ciała dziennie. Cięższe, bardziej umięśnione osoby są bliżej górnej granicy zakresu, lżejsze — bliżej dolnej. Z punktu widzenia mięśni nic z tego nie daje powodu, by wychodzić znacznie powyżej 5 g.',
      },
      {
        title: 'Kreatyna dla mózgu — co jest potwierdzone, a co nie',
        content: 'Kreatyna występuje nie tylko w mięśniach, ale też w mózgu, gdzie pełni tę samą funkcję: szybko uzupełnia ATP. Stąd wzięło się rozpowszechnione przekonanie, że wyższe dawki przynoszą korzyści poznawcze — i że „właściwa” ilość jest znacznie powyżej 3–5 g.\n\nDane jak dotąd tego nie potwierdzają. Ważne są dwa ustalenia. Po pierwsze, kreatynę w mózgu znacznie trudniej podnieść niż w mięśniach: podczas gdy zawartość w mięśniach rośnie o 20–40%, przeglądy szacują wzrost w mózgu na ok. 3–10%. Bariera krew–mózg spowalnia wchłanianie, a mózg część kreatyny wytwarza sam. Po drugie, optymalna ilość jest po prostu nieznana — tylko nieliczne badania w ogóle analizowały zależność między dawką a kreatyną w mózgu.\n\nJak bardzo nieliniowa jest ta zależność, pokazało badanie, w którym wegetarianie i osoby jedzące mięso dostawali 0,3 g na kilogram przez siedem dni — przy 80 kg to ok. 24 g dziennie. Zawartość w mięśniach wyraźnie wzrosła; zawartość w mózgu nie zmieniła się w mierzalny sposób.\n\nWyższe dawki są faktycznie badane: trwają badania z 10 i 20 g dziennie przez kilka tygodni, a także z pojedynczymi dawkami przy niedoborze snu. To aktywna dziedzina z wiarygodnym uzasadnieniem — ale nie jest to ugruntowana wiedza. Dla siły i budowy mięśni standardem potwierdzonym danymi pozostaje 3–5 g. Kto z ciekawości efektów poznawczych chce dawkować wyżej, powinien wiedzieć, że podąża za hipotezą, a nie za zaleceniem.',
      },
      {
        title: 'Bezpieczeństwo i mity',
        content: 'Kreatyna należy do najbezpieczniejszych suplementów w ogóle. Wieloletnie badania długoterminowe nie wykazują szkodliwych skutków u zdrowych osób. Uporczywy mit, że kreatyna szkodzi nerkom, nie znajduje potwierdzenia u osób ze zdrowymi nerkami (Kreider i wsp., 2017). Przy istniejącej chorobie nerek przyjmowanie należy jednak skonsultować z lekarzem.\n\nInny mit głosi, że kreatyna powoduje „zatrzymywanie wody” w sensie nalanego wyglądu. W rzeczywistości kreatyna wciąga wodę do komórek mięśniowych, co prowadzi raczej do pełniejszego mięśnia niż do widocznego zatrzymania wody. Niewielki wzrost masy ciała na początku jest normalny i pożądany.\n\nZ kreatyną kojarzy się też czasem wypadanie włosów, na podstawie jednego badania. Ten związek nie jest naukowo potwierdzony. Ogólnie kreatyna jest dobrze tolerowana; niektóre osoby reagują na bardzo duże pojedyncze dawki dolegliwościami żołądkowo-jelitowymi, których można uniknąć, dzieląc ją na mniejsze porcje.',
      },
      {
        title: 'Podsumowanie',
        content: 'Kreatyna to najskuteczniejszy i najlepiej udokumentowany suplement na siłę i budowę mięśni — bezpieczny, tani i prosty w stosowaniu. Do siły i budowy mięśni wystarczy 3–5 g monohydratu dziennie, na stałe; wyższe dawki dla mózgu są badane, ale nie stanowią jeszcze zalecenia.\n\nPora przyjmowania nie ma znaczenia, faza nasycenia jest opcjonalna. Wybieraj czysty monohydrat; droższe formy nie dają wartości dodanej. Częste ostrzeżenia przed uszkodzeniem nerek czy włosów nie znajdują potwierdzenia u zdrowych osób.\n\nGdyby wybierać tylko jeden suplement dla wydolności, kreatyna byłaby oczywistym wyborem. Przy istniejących schorzeniach, jak zawsze, sensowna jest konsultacja z lekarzem.',
      },
    ],
  },

  protein_powder: {
    name: 'Odżywka białkowa (whey i inne)',
    summary: 'Odżywka białkowa nie jest cudownym produktem, lecz wygodnym i tanim źródłem białka. Pomaga pokryć dzienne zapotrzebowanie, gdy trudno to zrobić zwykłym jedzeniem — nie więcej i nie mniej.',
    quick: [
      { label: 'Do czego służy', text: 'Praktyczne uzupełnienie, by osiągnąć dzienny cel białkowy — nie konieczność.' },
      { label: 'Jak wybrać', text: 'Whey (szybka), kazeina (wolna), roślinna (wegańska). Wszystkie działają przy odpowiedniej ilości.' },
    ],
    sections: [
      {
        title: 'Czym jest odżywka białkowa',
        content: 'Odżywka białkowa to skoncentrowane białko spożywcze, zwykle z mleka (whey i kazeina), ale też ze źródeł roślinnych, takich jak groch, ryż czy soja. Dostarcza tych samych aminokwasów co produkty bogate w białko, tylko w wygodnej, szybkiej do przygotowania formie.\n\nNajważniejsze na początek: odżywka białkowa nie jest „anabolicznym” cudem. To po prostu jedzenie — wygodny sposób na pokrycie zapotrzebowania na białko. Kto łatwo osiąga dzienny cel z mięsem, rybami, jajkami, nabiałem i roślinami strączkowymi, nie potrzebuje odżywki.\n\nJej wartość leży w praktyczności: shake przygotujesz szybko, łatwo go porcjować, jest tani w przeliczeniu na gram białka i łatwo go zabrać ze sobą. Dla osób z dużym zapotrzebowaniem na białko, małą ilością czasu lub słabym apetytem to przydatna pomoc.',
      },
      {
        title: 'Whey, kazeina i białka roślinne',
        content: 'Białko serwatkowe (whey) to najpopularniejsza forma. Jest szybko trawione, bogate w aminokwas leucynę i silnie pobudza syntezę białek mięśniowych. Występuje jako koncentrat (tani, trochę laktozy), izolat (czystszy, mało laktozy) i hydrolizat (wstępnie strawiony, droższy).\n\nKazeina to również białko mleka, ale jest trawiona wolno i uwalnia aminokwasy przez kilka godzin. Niektórzy stosują ją przed dłuższymi przerwami między posiłkami, np. przed snem. W praktyce różnica w stosunku do whey jest jednak dla większości osób niewielka.\n\nBiałka roślinne (grochowe, ryżowe, sojowe) to wybór dla osób na diecie wegańskiej. Pojedyncze źródła roślinne mogą mieć ograniczoną ilość niektórych aminokwasów, dlatego dobre produkty łączą kilka źródeł. Przy odpowiedniej ilości całkowitej odżywki roślinne są dla budowy mięśni podobnie skuteczne jak whey.',
      },
      {
        title: 'Rozsądne stosowanie',
        content: 'Odżywka białkowa jest przydatna zawsze, gdy praktyczne jest szybkie, wysokiej jakości źródło białka: po treningu, jako przekąska, w płatkach albo by osiągnąć cel białkowy w zabiegane dni. Dla większości osób sensowne są jedna do dwóch porcji dziennie.\n\nPowinna jednak uzupełniać zwykłe jedzenie, a nie je zastępować. Pełnowartościowe źródła białka dostarczają dodatkowo mikroskładników, lepiej sycą i są częścią zbilansowanej diety. Shake to narzędzie na co dzień, a nie podstawa żywienia.\n\nPrzy wyborze produktu warto spojrzeć na listę składników: jak najmniej dodatków, dobra zawartość białka w porcji i najlepiej niezależny certyfikat badań. Bardzo tanie odżywki czasem zawierają dużo wypełniaczy lub cukru.',
      },
      {
        title: 'Bezpieczeństwo i właściwe proporcje',
        content: 'Dla zdrowych osób odżywka białkowa jest bezpieczna. Obawa, że duże spożycie białka z odżywki szkodzi nerkom, dotyczy — jak w przypadku białka w ogóle — tylko istniejącej choroby nerek. Przy nietolerancji laktozy lepiej tolerowane są izolat lub warianty roślinne.\n\nJednym z aspektów jakości jest czystość. Ponieważ suplementy są regulowane mniej rygorystycznie niż leki, warto wybierać produkty z niezależnymi badaniami laboratoryjnymi (np. na metale ciężkie lub substancje dopingujące), zwłaszcza w przypadku sportowców wyczynowych.\n\nPodsumowując, odżywka białkowa jest produktem praktycznym, a nie niezbędnym. Nie zastąpi dobrej diety, ale może wygodnie i tanio pomóc w pokryciu zapotrzebowania na białko. W pytaniach zdrowotnych sensowna jest konsultacja z lekarzem lub dietetykiem.',
      },
    ],
  },

  caffeine: {
    name: 'Kofeina',
    summary: 'Kofeina to jeden z najskuteczniejszych legalnych środków zwiększających wydolność. Zmniejsza odczuwane zmęczenie oraz poprawia koncentrację i wytrzymałość mięśniową. Działanie jest dobrze udokumentowane, ale dawkowanie powinno być indywidualne i umiarkowane.',
    quick: [
      { label: 'Dawkowanie', text: 'Ok. 3–6 mg na kg masy ciała, 30–60 min przed treningiem.' },
      { label: 'Uwaga', text: 'Chroń sen (nie późno w ciągu dnia), pamiętaj o tolerancji, sprawdź, jak ją znosisz.' },
    ],
    sections: [
      {
        title: 'Jak działa kofeina',
        content: 'Kofeina to substancja pobudzająca, która działa głównie przez blokowanie receptorów adenozynowych w mózgu. Adenozyna to przekaźnik sygnalizujący zmęczenie; zajmując jej miejsca wiązania, kofeina tłumi uczucie zmęczenia i obniża odczuwany wysiłek.\n\nEfektem jest stan większej czujności, lepszej koncentracji i większej gotowości do wysiłku. Dla treningu oznacza to: wysiłek wydaje się lżejszy, co prowadzi do większej liczby powtórzeń, większej wytrzymałości i często lepszych wyników.\n\nKofeina to jeden z nielicznych suplementów o wyraźnie udowodnionym, natychmiast odczuwalnym działaniu. Przyjmuje się ją z kawy, herbaty, napojów energetycznych albo jako czystą kofeinę (tabletki, proszek), a działać zaczyna w ciągu ok. 30–60 minut.',
      },
      {
        title: 'Dane naukowe',
        content: 'Kofeina należy do najlepiej przebadanych substancji zwiększających wydolność. Obszerny przegląd (Grgic i wsp., 2020, British Journal of Sports Medicine) potwierdza pozytywny wpływ na siłę, wytrzymałość mięśniową, sprinty i wydolność wytrzymałościową w wielu dyscyplinach.\n\nWielkości efektów są umiarkowane, ale wiarygodne. Szczególnie przy męczących, powtarzanych wysiłkach oraz w sytuacjach niedoboru snu lub niskiej motywacji kofeina może zrobić odczuwalną różnicę. Korzysta też wydolność poznawcza — czas reakcji, uwaga.\n\nSkuteczna dawka w większości badań wynosi ok. 3–6 mg na kilogram masy ciała. Wyższe dawki rzadko dają lepsze wyniki, za to nasilają skutki uboczne, takie jak nerwowość, kołatanie serca i zaburzenia snu.',
      },
      {
        title: 'Dawkowanie i pora',
        content: 'Dla wydolności treningowej sprawdziło się ok. 3–6 mg na kilogram masy ciała, przyjęte ok. 30–60 minut przed wysiłkiem. Dla osoby ważącej 75 kg odpowiada to mniej więcej 225–450 mg — dla porównania filiżanka kawy z ekspresu przelewowego zawiera ok. 80–120 mg.\n\nOsoby wrażliwe lub nieprzyzwyczajone powinny zacząć od niskiej dawki i sprawdzić tolerancję. Różnice indywidualne są duże: niektórzy znoszą dużo, inni reagują na małe ilości niepokojem lub kołataniem serca.\n\nWażna jest pora dnia. Okres półtrwania kofeiny wynosi ok. pięć do sześciu godzin — późny trening z wysoką dawką może znacznie zakłócić sen. Zasada praktyczna: w ostatnich sześciu do ośmiu godzinach przed snem unikaj większych ilości.',
      },
      {
        title: 'Tolerancja, skutki uboczne i bezpieczeństwo',
        content: 'Przy regularnym spożyciu organizm wytwarza pewną tolerancję — działanie słabnie. Dlatego niektórzy robią świadome przerwy albo zostawiają wyższe dawki na ważne treningi. Całkowita abstynencja nie jest jednak konieczna; umiarkowane regularne spożycie pozostaje skuteczne.\n\nMożliwe skutki uboczne to nerwowość, kołatanie serca, dolegliwości żołądkowe, lęk i zaburzenia snu — zwykle przy zbyt wysokiej dawce. Przy niektórych chorobach układu krążenia, w ciąży lub przy zaburzeniach lękowych zalecana jest ostrożność i konsultacja z lekarzem.\n\nOgólnie kofeina w umiarkowanych ilościach (do ok. 400 mg dziennie u zdrowych dorosłych) uchodzi za bezpieczną. Bardzo duże pojedyncze dawki, zwłaszcza z czystej kofeiny w proszku, mogą być niebezpieczne — kluczowe jest tu dokładne odmierzanie. Jak w przypadku wszystkich substancji: szukaj indywidualnie tolerowanej, skutecznej dawki, a nie maksimum.',
      },
      {
        title: 'Podsumowanie',
        content: 'Kofeina to skuteczny, dobrze udokumentowany i legalny środek zwiększający wydolność. Obniża odczuwane zmęczenie i poprawia koncentrację, wytrzymałość mięśniową oraz wydolność wytrzymałościową.\n\nPowszechnie stosuje się dawkę ok. 3–6 mg na kilogram masy ciała 30–60 minut przed treningiem. Zacznij od małej dawki, sprawdź, jak ją znosisz, i chroń sen, unikając kofeiny późno w ciągu dnia.\n\nKofeina w umiarkowanych ilościach jest bezpieczna, ale przy przedawkowaniu lub istniejących schorzeniach może powodować problemy. Stosuj ją świadomie jako narzędzie, a nie jako codzienną maksymalną dawkę — a w pytaniach zdrowotnych skonsultuj się z lekarzem.',
      },
    ],
  },


  omega3: {
    name: 'Kwasy tłuszczowe omega-3',
    summary: 'Kwasy tłuszczowe omega-3 (EPA i DHA) są niezbędne i regulują stany zapalne. Wiele osób ma ich niedobór. Najlepszym źródłem są tłuste ryby; suplement może mieć sens, jeśli prawie nie jesz ryb.',
    quick: [
      { label: 'Źródło i dawka', text: 'Tłuste ryby 2–3× w tygodniu; jako suplement często ~1–2 g EPA+DHA dziennie.' },
      { label: 'Korzyści', text: 'Zdrowie układu krążenia i mózgu, regulacja stanów zapalnych; dla wegan olej z alg.' },
    ],
    sections: [
      {
        title: 'Czym są kwasy tłuszczowe omega-3',
        content: 'Kwasy tłuszczowe omega-3 to grupa wielonienasyconych tłuszczów, których organizm nie potrafi sam wytworzyć i które musi dostać z pożywieniem. Najważniejsze z nich to EPA (kwas eikozapentaenowy) i DHA (kwas dokozaheksaenowy), występujące głównie w tłustych rybach, a także ALA (kwas alfa-linolenowy) ze źródeł roślinnych.\n\nEPA i DHA są składnikami błon komórkowych i prekursorami cząsteczek sygnałowych, które regulują procesy zapalne. DHA jest ponadto ważnym składnikiem mózgu i siatkówki. Te kwasy tłuszczowe są więc istotne dla serca, mózgu i układu odpornościowego.\n\nProblem: współczesna dieta dostarcza często dużo omega-6 (z przetworzonych olejów roślinnych) i mało omega-3. Ta nierównowaga w połączeniu z niskim spożyciem ryb sprawia, że wiele osób ma niedobór.',
      },
      {
        title: 'Znaczenie dla zdrowia',
        content: 'Badania nad omega-3 są obszerne. Najlepiej udokumentowana jest korzyść dla układu krążenia: EPA i DHA mogą obniżać poziom trójglicerydów we krwi i wiążą się z korzystniejszym profilem ryzyka sercowo-naczyniowego. Towarzystwa naukowe zalecają regularne jedzenie tłustych ryb.\n\nBadany jest także efekt regulujący stany zapalne, który może mieć znaczenie dla zdrowia stawów i regeneracji po treningu. Są również wskazówki na pozytywny wpływ na funkcje mózgu i nastrój, choć tu dane są mniej jednoznaczne.\n\nWażne jest, by odróżniać udowodnione obietnice od przesadzonych. Omega-3 to nie cudowny środek, ale odpowiednia podaż jest sensownym elementem zdrowej diety, zwłaszcza dla osób, które rzadko jedzą ryby.',
      },
      {
        title: 'Źródła i suplementacja',
        content: 'Najlepszym źródłem EPA i DHA są tłuste ryby z zimnych wód: łosoś, makrela, śledź, sardynki. Dwie–trzy porcje w tygodniu pokrywają zapotrzebowanie większości osób. Źródła roślinne, takie jak siemię lniane czy orzechy włoskie, dostarczają ALA, który organizm przekształca w EPA i DHA tylko w niewielkim stopniu.\n\nJeśli jesz mało ryb albo wcale, możesz rozważyć suplement. Kapsułki z olejem rybim lub olejem z alg dostarczają EPA i DHA bezpośrednio; olej z alg to roślinna, wegańska alternatywa. Typowe dawki suplementów to ok. 1–2 g EPA plus DHA dziennie, choć dokładne zapotrzebowanie jest indywidualne.\n\nPrzy wyborze produktu liczy się jakość: zwracaj uwagę na rzeczywistą zawartość EPA i DHA (nie tylko na całkowitą ilość oleju rybiego), na świeżość (zjełczały olej nie jest pożądany) i, jeśli to możliwe, na badania czystości. Indeks omega-3 we krwi może obiektywnie pokazać twój status.',
      },
      {
        title: 'Bezpieczeństwo i ocena',
        content: 'Suplementy omega-3 w typowych dawkach uchodzą za bezpieczne i dobrze tolerowane. Możliwe skutki uboczne to rybi posmak lub lekkie dolegliwości trawienne. W bardzo wysokich dawkach omega-3 może wpływać na krzepnięcie krwi — jeśli przyjmujesz leki przeciwzakrzepowe albo czeka cię operacja, skonsultuj przyjmowanie z lekarzem.\n\nJak w przypadku wszystkich suplementów obowiązuje zasada: uzupełniają dobrą dietę, a nie ją zastępują. Kto regularnie je tłuste ryby, zwykle nie potrzebuje dodatkowego oleju. Suplement ma sens przede wszystkim dla osób, które nie jedzą ryb, oraz dla wegan (olej z alg).\n\nPrzy pytaniach zdrowotnych, istniejących chorobach lub przyjmowaniu leków warto skonsultować się z lekarzem. Badanie indeksu omega-3 może pomóc celowo oszacować indywidualne zapotrzebowanie, zamiast suplementować na ślepo.',
      },
    ],
  },

  vitamin_d: {
    name: 'Witamina D',
    summary: 'Witamina D jest ważna dla kości, mięśni i układu odpornościowego. Powstaje głównie pod wpływem światła słonecznego, dlatego jej niedobór jest częsty w miesiącach z małą ilością słońca. Wtedy suplementacja zwykle ma sens — najlepiej po badaniu krwi.',
    quick: [
      { label: 'Źródło', text: 'Światło słoneczne (skóra), niewiele z pożywienia. Zimą często potrzebny jest suplement.' },
      { label: 'W praktyce', text: 'Przy niedoborze często ~1000–2000 IU/dzień; dawkę najlepiej dobrać na podstawie badań.' },
    ],
    sections: [
      {
        title: 'Dlaczego witamina D jest wyjątkowa',
        content: 'Witamina D zajmuje szczególne miejsce wśród witamin, bo organizm może ją wytwarzać w skórze pod wpływem światła słonecznego (promieniowania UV-B). Ściśle biorąc, działa raczej jak hormon: reguluje wchłanianie wapnia i fosforanów, a więc ma kluczowe znaczenie dla zdrowych kości i zębów.\n\nPoza zdrowiem kości witamina D pełni funkcje w mięśniach i układzie odpornościowym. Jej receptory znajdują się w wielu tkankach organizmu, co wyjaśnia jej szerokie znaczenie. Wyraźny niedobór może przyczyniać się do osłabienia mięśni, problemów z kośćmi i większej podatności na infekcje.\n\nSzczególne, a zarazem problematyczne: ponieważ głównym źródłem jest światło słoneczne, podaż silnie zależy od miejsca zamieszkania, pory roku, koloru skóry i stylu życia. W wielu regionach zimowe nasłonecznienie nie wystarcza, by wytworzyć dość witaminy D.',
      },
      {
        title: 'Niedobór jest powszechny',
        content: 'Niedobór witaminy D to jeden z najczęstszych niedoborów składników odżywczych na świecie, zwłaszcza na północnych szerokościach geograficznych i w miesiącach zimowych. Osoby, które dużo pracują w pomieszczeniach, mają ciemniejszą skórę, zakrywają ciało lub są starsze, są bardziej narażone, bo ich własna produkcja jest ograniczona.\n\nPokrycie zapotrzebowania samą dietą jest trudne. Niewiele produktów zawiera istotne ilości — głównie tłuste ryby, żółtko jaja i produkty wzbogacane. Zwykle nie wystarczają, by wyrównać niedobór, gdy brakuje produkcji pod wpływem słońca.\n\nStatus witaminy D określa się prostym badaniem krwi (25-OH-witamina D). To najpewniejszy sposób, by wiedzieć, czy i ile suplementować — zamiast zgadywać.',
      },
      {
        title: 'Suplementacja w praktyce',
        content: 'Jeśli występuje niedobór albo w miesiącach z małą ilością słońca własna produkcja jest niska, suplementacja ma sens. Często podaje się dawki podtrzymujące rzędu 1000–2000 IU (jednostek międzynarodowych) dziennie, choć indywidualne zapotrzebowanie może się bardzo różnić.\n\nNajlepiej dobierać dawkę na podstawie wyniku z krwi: badanie pokazuje punkt wyjścia, a po kilku tygodniach lub miesiącach przyjmowania można sprawdzić efekt i dostosować dawkę. Pozwala to uniknąć zarówno niedoboru, jak i przedawkowania.\n\nPreferowaną formą jest witamina D3 (cholekalcyferol). Ponieważ rozpuszcza się w tłuszczach, lepiej się wchłania z posiłkiem zawierającym tłuszcz. Często łączy się ją z witaminą K2, która wspiera gospodarkę wapniową — dane na ten temat są obiecujące, ale nie rozstrzygające.',
      },
      {
        title: 'Bezpieczeństwo i opieka lekarska',
        content: 'Witamina D rozpuszcza się w tłuszczach i w przeciwieństwie do witamin rozpuszczalnych w wodzie może gromadzić się w organizmie. Bardzo wysokie dawki przyjmowane długo mogą prowadzić do niebezpiecznego nadmiaru wapnia we krwi. Zasada „więcej znaczy lepiej” wyraźnie tu nie obowiązuje — unikaj skrajnych dawek bez kontroli lekarskiej.\n\nDla większości osób umiarkowane dawki podtrzymujące są bezpieczne. Jeśli jednak rozważasz wysokie dawki, masz choroby współistniejące lub przyjmujesz leki, rób to pod opieką lekarza. Także tutaj badanie krwi jest kluczowym narzędziem, by pozostać w bezpiecznym i skutecznym zakresie.\n\nPodsumowując: witamina D to jeden z niewielu suplementów z realną korzyścią dla wielu osób, zwłaszcza zimą. Najrozsądniej jest zmierzyć status i dopasować przyjmowanie do wyniku, zamiast bezkrytycznie przyjmować wysokie dawki.',
      },
    ],
  },

  magnesium: {
    name: 'Magnez',
    summary: 'Magnez uczestniczy w ponad 300 procesach enzymatycznych, m.in. w pracy mięśni i nerwów, metabolizmie energetycznym i śnie. Lekki niedobór jest częsty. Można go pokryć dietą, a w razie potrzeby dobrze suplementować.',
    quick: [
      { label: 'Funkcja', text: 'Praca mięśni i nerwów, metabolizm energetyczny, sen, kości.' },
      { label: 'Źródła', text: 'Orzechy, nasiona, produkty pełnoziarniste, rośliny strączkowe, zielone warzywa liściaste; suplement w razie potrzeby.' },
    ],
    sections: [
      {
        title: 'Rola magnezu',
        content: 'Magnez to niezbędny minerał i kofaktor ponad 300 reakcji enzymatycznych w organizmie. Uczestniczy w wytwarzaniu energii (metabolizm ATP), pracy mięśni i nerwów, syntezie białek, regulacji poziomu cukru we krwi i zdrowiu kości.\n\nDla osób aktywnych fizycznie magnez jest szczególnie istotny, bo odgrywa kluczową rolę w skurczu i rozkurczu mięśni oraz w metabolizmie energetycznym. Niedobór może objawiać się m.in. skurczami mięśni, zmęczeniem, drażliwością i gorszym snem.\n\nPrzez pot i wyższy metabolizm intensywny trening może nieco zwiększać zapotrzebowanie na magnez. Jednocześnie spożycie u wielu osób jest na granicy, bo mocno przetworzona żywność zawiera mało magnezu.',
      },
      {
        title: 'Niedobór i zapotrzebowanie',
        content: 'Wyraźny niedobór magnezu przy zdrowej diecie jest rzadki, ale lekki niedobór lub podaż na granicy zdarzają się stosunkowo często — zwłaszcza przy monotonnej, mocno przetworzonej diecie. Dzienne zapotrzebowanie dorosłych wynosi ok. 300–400 mg, zależnie od płci i wieku.\n\nPonieważ magnez występuje w wielu nieprzetworzonych produktach, zapotrzebowanie zasadniczo da się dobrze pokryć dietą. Dobre źródła to orzechy i nasiona (np. pestki dyni, migdały), produkty pełnoziarniste, rośliny strączkowe, zielone warzywa liściaste i gorzka czekolada.\n\nNiedobór magnezu tylko w ograniczonym stopniu da się wykryć we krwi, bo większość magnezu jest magazynowana w komórkach i kościach. Objawy takie jak częste skurcze, wyczerpanie czy problemy ze snem mogą być wskazówką — obok innych przyczyn — i przy podejrzeniu warto je wyjaśnić z lekarzem.',
      },
      {
        title: 'Suplementacja',
        content: 'Gdy podaż z dietą nie wystarcza albo zapotrzebowanie jest większe, suplement magnezu może mieć sens. Forma wpływa na tolerancję: dobrze tolerowane i dobrze przyswajalne są związki organiczne, takie jak cytrynian, glicynian czy jabłczan magnezu. Tlenek magnezu jest tani, ale gorzej się wchłania i może działać przeczyszczająco.\n\nTypowe dawki uzupełniające to ok. 200–400 mg magnezu elementarnego dziennie, często wieczorem, bo magnez może działać rozluźniająco i sprzyjać zasypianiu. Wyższe dawki mogą powodować luźne stolce lub biegunkę — to sygnał, by zmniejszyć ilość.\n\nDane przemawiające za suplementami magnezu są najmocniejsze przy potwierdzonym niedoborze. U osób z wystarczającą podażą dodatkowa korzyść jest ograniczona. Jak zawsze: najpierw jedzenie, suplement jako celowe uzupełnienie.',
      },
      {
        title: 'Bezpieczeństwo i podsumowanie',
        content: 'Magnez z pożywienia jest nieszkodliwy; nadmiar organizm zwykle wydala przez nerki. Przy suplementach najczęstszym skutkiem ubocznym jest działanie przeczyszczające przy zbyt wysokiej dawce. Osoby z osłabioną czynnością nerek powinny przyjmować suplementy magnezu tylko po konsultacji z lekarzem, bo wydalanie może być zaburzone.\n\nPodsumowując: magnez to ważny minerał o szerokim znaczeniu dla mięśni, nerwów, metabolizmu energetycznego i snu. Lekki niedobór jest częsty, ale dobrze daje się wyrównać pełnowartościową dietą z orzechami, nasionami, produktami pełnoziarnistymi i zielonymi warzywami liściastymi.\n\nSuplement to rozsądna opcja przy większym zapotrzebowaniu, niewystarczającej podaży lub odpowiednich objawach — najlepiej w dobrze tolerowanej formie, a przy chorobach współistniejących w porozumieniu z lekarzem.',
      },
    ],
  },
};
