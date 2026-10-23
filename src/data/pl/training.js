// Polnische Fassung von `src/data/trainingKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Podstawy',
    hypertrophie: 'Budowa mięśni',
    programmierung: 'Programowanie',
    regeneration: 'Regeneracja',
  },

  progressive_overload: {
    name: 'Progresywne przeciążenie',
    summary: 'Najważniejsza zasada długoterminowych postępów: bodziec treningowy musi z czasem systematycznie rosnąć, aby organizm dalej się adaptował. Bez progresji siła i przyrost mięśni stoją w miejscu.',
    quick: [
      { label: 'Główna idea', text: 'Stopniowo większy ciężar, więcej powtórzeń, serii albo lepsza technika — bodziec musi rosnąć.' },
      { label: 'Dla kogo', text: 'Wszystkie poziomy zaawansowania. Początkujący robią postępy szybko, zaawansowani potrzebują mniejszych, lepiej zaplanowanych kroków.' },
    ],
    sections: [
      {
        title: 'Czym jest progresywne przeciążenie?',
        content: 'Progresywne przeciążenie oznacza stopniowe zwiększanie wymagań stawianych organizmowi podczas treningu. Podstawowa idea wywodzi się z zasady superkompensacji: bodziec treningowy zaburza równowagę biologiczną, organizm się regeneruje i dostosowuje do nieco wyższego poziomu wydolności. Jeśli bodziec potem pozostaje taki sam, nie ma powodu do dalszej adaptacji — postęp się zatrzymuje.\n\nPojęcie pochodzi pierwotnie z rehabilitacji: Thomas DeLorme opracował w latach 40. XX wieku koncepcję „progressive resistance exercise”, aby przywracać siłę mięśniową rannym żołnierzom (DeLorme, 1945, Journal of Bone and Joint Surgery). Od tamtej pory stała się ona fundamentem każdego poważnego treningu siłowego i budującego masę mięśniową.\n\nWażne jest zrozumienie, że „większy ciężar” to tylko jedna z kilku dróg progresji. Bodziec można zwiększyć także przez więcej powtórzeń, więcej serii, krótsze przerwy, większy zakres ruchu albo wolniejsze, bardziej kontrolowane wykonanie.',
      },
      {
        title: 'Podstawy naukowe',
        content: 'Konieczność stopniowego zwiększania obciążeń to jedna z najlepiej udokumentowanych zasad nauk o treningu. Stanowisko American College of Sports Medicine (ACSM, 2009, Medicine & Science in Sports & Exercise) wprost wymienia progresywne przeciążenie jako warunek dalszych przyrostów siły i hipertrofii i zaleca planowe zwiększanie obciążenia i objętości.\n\nPrzegląd Schoenfelda i wsp. (2017, Journal of Strength and Conditioning Research) pokazuje, że zarówno duże, jak i umiarkowane ciężary mogą wywołać wzrost mięśni — decydujące jest to, by serie kończyć blisko zmęczenia mięśniowego i by bodziec z czasem rósł. To podkreśla, że progresję można kształtować elastycznie.\n\nAdaptacje treningowe podlegają też zasadzie SAID („Specific Adaptation to Imposed Demands”): organizm dostosowuje się dokładnie do stawianych mu wymagań. Jeśli wymagania nie rosną, nie następuje też adaptacja — zależność ta jest od dziesięcioleci konsekwentnie potwierdzana w fizjologii wysiłku.',
      },
      {
        title: 'Metody progresji',
        content: 'Istnieje kilka praktycznych sposobów zwiększania bodźca treningowego. Najbardziej znany jest wzrost obciążenia: więcej ciężaru na sztandze. W większości ćwiczeń sensowne są skoki o 2,5 kg (górna część ciała) lub 5 kg (dolna część ciała), gdy tylko osiągniesz górną granicę zakresu powtórzeń z czystą techniką.\n\nSzczególnie przyjazną początkującym metodą jest podwójna progresja: wybierasz zakres powtórzeń (np. 8–12). Najpierw pracujesz w górę w tym zakresie (więcej powtórzeń przy tym samym ciężarze), a gdy we wszystkich seriach dojdziesz do górnej granicy, zwiększasz ciężar i zaczynasz znów od dolnej.\n\nInne możliwości to: więcej serii na partię mięśniową (progresja objętości), krótsze przerwy przy tej samej wydajności, większy zakres ruchu albo bardziej kontrolowana, wolniejsza faza ekscentryczna. Ważne, by zmieniać naraz tylko jedną zmienną, żeby móc czysto śledzić postępy.',
      },
      {
        title: 'Częste błędy',
        content: 'Najczęstszym błędem jest zbyt szybka progresja: kto zwiększa ciężar, zanim technika jest pewna, ryzykuje kontuzję i często przestaje trenować docelowy mięsień. Ciężar powinien rosnąć dopiero wtedy, gdy wszystkie zaplanowane powtórzenia da się wykonać z dobrą techniką.\n\nDrugi błąd to przekonanie, że progresja musi następować na każdym treningu. Zwłaszcza zaawansowani nie mogą dokładać ciężaru co tydzień — liczy się trend na przestrzeni tygodni i miesięcy, a nie pojedynczy dzień treningowy. Niewielkie wahania wynikające ze snu, stresu czy odżywiania są normalne.\n\nTrzeci błąd to brak dokumentacji. Bez zapisywania ciężaru, powtórzeń i serii progresją prawie nie da się sterować — po prostu nie wiesz, czy się poprawiłeś. Dziennik treningowy jest więc najważniejszym narzędziem długoterminowych postępów.',
      },
      {
        title: 'Podsumowanie',
        content: 'Progresywne przeciążenie to podstawowe prawo treningu: bez rosnącego bodźca nie ma trwałej adaptacji. Można je realizować przez ciężar, powtórzenia, serie, przerwy, zakres ruchu albo tempo — a nie tylko przez większy ciężar.\n\nDla początkujących świetnie sprawdza się podwójna progresja w zakresie 8–12 powtórzeń. Zaawansowani powinni myśleć w dłuższych cyklach i planować progresję, zamiast ją wymuszać. W każdym przypadku kluczowe jest dokumentowanie postępów i stawianie techniki przed ciężarem.\n\nKto robi postępy cierpliwie i systematycznie, przez lata stale buduje siłę i mięśnie — i właśnie to jest sednem skutecznego treningu.',
      },
    ],
  },

  volume_frequency: {
    name: 'Objętość i częstotliwość treningu',
    summary: 'Objętość (serie × powtórzenia × ciężar) to najsilniejsza dźwignia wzrostu mięśni. Częstotliwość opisuje, jak często w tygodniu trenujesz dany mięsień. Razem decydują o tym, ile bodźca otrzymuje mięsień — i jak dobrze może się zregenerować.',
    quick: [
      { label: 'Wytyczna objętości', text: 'Dla większości trenujących ok. 10–20 ciężkich serii na partię mięśniową tygodniowo.' },
      { label: 'Wytyczna częstotliwości', text: 'Trening każdego mięśnia 2× w tygodniu zwykle wypada lepiej niż 1× przy tej samej objętości tygodniowej.' },
    ],
    sections: [
      {
        title: 'Co oznacza objętość?',
        content: 'Objętość treningowa to miara całkowitej wykonanej pracy. Najczęściej liczy się „ciężkie serie” na partię mięśniową tygodniowo — serie kończone blisko upadku mięśniowego (mniej więcej 0–4 powtórzenia w zapasie). Dokładniej objętość można obliczyć jako serie × powtórzenia × ciężar (tonaż), ale liczenie serii sprawdziło się jako solidne przybliżenie w praktyce.\n\nObjętość uchodzi za najważniejszy pojedynczy czynnik wzrostu mięśni. Metaanaliza Schoenfelda, Ogborna i Kriegera (2017, Journal of Sports Sciences) wykazała wyraźną zależność dawka–odpowiedź: więcej serii tygodniowo prowadziło do większej hipertrofii — aż do punktu, za którym dodatkowa korzyść maleje, a regeneracja cierpi.\n\nDla większości trenujących sensowny zakres to ok. 10–20 ciężkich serii na partię mięśniową tygodniowo. Początkujący korzystają już z dolnej granicy, a zaawansowani często potrzebują więcej, by nadal dostarczać bodziec.',
      },
      {
        title: 'Co oznacza częstotliwość?',
        content: 'Częstotliwość opisuje, jak często w ciągu tygodnia trenujesz dany mięsień. To, czy mięsień pracuje 1×, 2× czy 3× w tygodniu, niekoniecznie zmienia objętość tygodniową — rozkłada ją tylko inaczej. Podział 16 serii na klatkę na dwa treningi oznacza 8 serii na sesję zamiast 16 na jednej.\n\nMetaanaliza Schoenfelda, Grgica i Kriegera (2019, Journal of Sports Sciences) pokazuje, że przy tej samej objętości tygodniowej wyższa częstotliwość daje zwykle nieco większy wzrost mięśni — prawdopodobnie dlatego, że synteza białek mięśniowych pozostaje podwyższona tylko przez ok. 24–48 godzin po treningu, a częstsze bodźce uruchamiają ją częściej.\n\nW praktyce oznacza to: trening każdego mięśnia dwa razy w tygodniu to dla większości osób dobry kompromis między bodźcem, regeneracją a jakością treningu. Bardzo wysoka częstotliwość nie daje już wiele więcej, o ile objętość jest wystarczająca.',
      },
      {
        title: 'Jak właściwie sterować objętością',
        content: 'Objętością warto sterować indywidualnie i dynamicznie, zamiast trzymać ją na stałym poziomie. Sensownym punktem wyjścia jest dolna granica zakresu (ok. 10 serii na mięsień tygodniowo). Stamtąd można powoli zwiększać objętość przez kolejne tygodnie, dopóki regeneracja, sen i wydajność nadążają.\n\nKoncepcja „Maximum Recoverable Volume” (MRV) opisuje górną granicę objętości, po której trenujący jeszcze się regeneruje. Jej przekroczenie obniża wydajność i zwiększa ryzyko kontuzji. Oznaki zbyt dużej objętości to m.in. utrzymujący się spadek formy, słaby sen, ciągłe zakwasy i utrata motywacji.\n\nOdstające partie mięśniowe lub słabe punkty można priorytetyzować nieco większą objętością, a już dobrze rozwinięte obszary utrzymywać objętością podtrzymującą (często 6–10 serii). Dzięki temu ograniczone możliwości regeneracji trafiają tam, gdzie są najbardziej przydatne.',
      },
      {
        title: 'Częste błędy',
        content: 'Klasyczny błąd początkujących to zbyt duża objętość zbyt wcześnie. Więcej nie znaczy automatycznie lepiej — powyżej indywidualnej granicy regeneracji dodatkowa objętość wręcz hamuje postępy. Mądrzej jest zacząć od mniej i zwiększać powoli.\n\nDrugi błąd to wliczanie „pustej objętości” („junk volume”): serie dalekie od upadku albo z kiepską techniką niewiele wnoszą do wzrostu, a mimo to kosztują regenerację. Za efektywną objętość liczą się tylko serie, które naprawdę wymagają wysiłku od docelowego mięśnia.\n\nPo trzecie, częstotliwość często myli się z objętością. Częstszy trening mięśnia pomaga tylko wtedy, gdy objętość tygodniowa jest wystarczająca. Sześć treningów w tygodniu, każdy ze zbyt małym bodźcem, jest gorsze niż trzy dobrze rozłożone sesje.',
      },
      {
        title: 'Podsumowanie',
        content: 'Objętość to najsilniejsza dźwignia wzrostu mięśni; dla większości osób pasuje zakres ok. 10–20 ciężkich serii na mięsień tygodniowo. Częstotliwość rozkłada tę objętość — dwa razy w tygodniu na mięsień to sprawdzony standard.\n\nZacznij od dolnej granicy zakresu objętości i zwiększaj ją powoli, obserwując regenerację i wydajność. Licz tylko efektywne, wymagające serie i dopasuj objętość poszczególnych partii mięśniowych do swoich celów.\n\nObjętość i częstotliwość to nie sztywne reguły, lecz narzędzia, które dopasowujesz do swoich możliwości regeneracji. Świadome sterowanie obiema sprawia, że trening jest skuteczniejszy i chroni zarówno przed niedotrenowaniem, jak i przetrenowaniem.',
      },
    ],
  },

  hypertrophy_basics: {
    name: 'Jak rosną mięśnie',
    summary: 'Wzrost mięśni (hipertrofia) następuje, gdy trening podnosi syntezę białek mięśniowych ponad ich rozpad, a ten bodziec jest regularnie powtarzany. Głównym motorem jest napięcie mechaniczne z wymagających serii — w połączeniu z odpowiednią ilością białka i regeneracją.',
    quick: [
      { label: 'Główny motor', text: 'Napięcie mechaniczne: serie blisko upadku z kontrolowaną techniką.' },
      { label: 'Warunki', text: 'Wystarczająco białka (~1,6–2,2 g/kg), kalorie na poziomie zapotrzebowania lub z lekką nadwyżką, sen.' },
    ],
    sections: [
      {
        title: 'Biologia wzrostu mięśni',
        content: 'Mięśnie składają się z włókien mięśniowych, które zawierają białka kurczliwe (aktynę i miozynę). Wzrost oznacza przede wszystkim, że te włókna stają się grubsze, bo odkłada się w nich więcej białka kurczliwego — mówimy wtedy o hipertrofii miofibrylarnej. Organizm stale buduje białka mięśniowe (synteza białek mięśniowych) i je rozkłada (rozpad białek mięśniowych); wzrost następuje tylko wtedy, gdy synteza przez dłuższy czas przeważa.\n\nWyzwalaczem jest trening: wymagająca seria podnosi syntezę białek mięśniowych na ok. 24–48 godzin (Damas i wsp., 2016, Journal of Physiology). Jeśli ten bodziec jest stosowany regularnie, a organizm dostaje wystarczająco budulca (białka) i energii, wzrost kumuluje się przez tygodnie i miesiące.\n\nRolę odgrywają też komórki satelitarne: te swoiste dla mięśni komórki macierzyste są aktywowane przez trening, pomagają naprawiać uszkodzone włókna i dostarczają nowych jąder komórkowych, co w dłuższej perspektywie umożliwia większy wzrost.',
      },
      {
        title: 'Trzy mechanizmy hipertrofii',
        content: 'W często cytowanej pracy Brad Schoenfeld (2010, Journal of Strength and Conditioning Research) opisał trzy możliwe mechanizmy wzrostu mięśni: napięcie mechaniczne, stres metaboliczny i uszkodzenia mięśni.\n\nNapięcie mechaniczne uchodzi dziś za najważniejszy motor. Powstaje, gdy mięśnie pracują przeciw dużemu oporowi w pełnym zakresie ruchu — zwłaszcza w ostatnich, ciężkich powtórzeniach serii. Komórki mięśniowe odbierają to napięcie jako sygnał („mechanotransdukcja”) i uruchamiają procesy wzrostu.\n\nStres metaboliczny („pieczenie” od produktów przemiany materii przy większej liczbie powtórzeń) i lekkie uszkodzenia mięśni mogą odgrywać rolę wspierającą, ale są mniej decydujące, niż długo zakładano. Nowsze badania sugerują, że wyraźne uszkodzenia mięśni są raczej efektem ubocznym niż warunkiem wzrostu.',
      },
      {
        title: 'Jak zoptymalizować bodziec wzrostowy',
        content: 'Aby zmaksymalizować napięcie mechaniczne, serie należy kończyć blisko upadku mięśniowego — zwykle z 0–4 powtórzeniami w zapasie. Dokładny zakres powtórzeń jest zaskakująco elastyczny: wzrost jest możliwy w szerokim przedziale ok. 5–30 powtórzeń na serię, o ile seria jest wystarczająco ciężka (Schoenfeld i wsp., 2017, Journal of Strength and Conditioning Research).\n\nW praktyce sprawdził się umiarkowany zakres ok. 6–15 powtórzeń, bo daje dobry kompromis między napięciem, objętością a zmęczeniem. Bardzo mała liczba powtórzeń mocniej obciąża stawy i układ nerwowy, a bardzo duża jest nieprzyjemna i wyczerpująca.\n\nWażne jest kontrolowane wykonanie w pełnym zakresie ruchu. Szczególnie pozycja rozciągnięcia mięśnia pod obciążeniem wydaje się silnym bodźcem wzrostowym — głębokie, pełne powtórzenia są więc zwykle skuteczniejsze niż krótkie, urywane.',
      },
      {
        title: 'Odżywianie i regeneracja',
        content: 'Żaden mięsień nie urośnie bez odpowiedniego budulca. Białko dostarcza aminokwasów do syntezy białek mięśniowych; badania zalecają trenującym ok. 1,6–2,2 g białka na kilogram masy ciała dziennie (Morton i wsp., 2018, British Journal of Sports Medicine). Sensowne jest rozłożenie go na kilka posiłków po 20–40 g białka.\n\nRównie ważna jest energia. Budowa mięśni działa najlepiej na poziomie zapotrzebowania lub przy lekkiej nadwyżce (ok. +5–15%). Wzrost jest możliwy także przy dużym deficycie, ale wyraźnie wolniejszy — zwłaszcza początkujący i osoby z większą ilością tkanki tłuszczowej mogą na początku jednocześnie tracić tłuszcz i budować mięśnie.\n\nSen to najbardziej niedoceniany czynnik. W fazie głębokiego snu zachodzą regeneracja i adaptacje hormonalne. Udowodniono, że przewlekły niedobór snu obniża syntezę białek mięśniowych i zwiększa rozpad mięśni — sensownym celem jest siedem do dziewięciu godzin na noc.',
      },
      {
        title: 'Podsumowanie',
        content: 'Mięśnie rosną, gdy wymagający bodziec treningowy podnosi syntezę białek mięśniowych ponad ich rozpad, a ten proces jest regularnie powtarzany. Głównym motorem jest napięcie mechaniczne z ciężkich serii wykonywanych w kontrolowany, pełny sposób.\n\nSkuteczny zakres powtórzeń jest szeroki (ok. 5–30); w praktyce dobrze sprawdza się 6–15 powtórzeń blisko upadku. Objętość, progresja i technika decydują o bodźcu, a białko, energia i sen umożliwiają adaptację.\n\nWzrost mięśni to powolny, kumulatywny proces. Kto cierpliwie ciężko trenuje, je wystarczająco i dobrze śpi, będzie stale budować mięśnie przez miesiące i lata.',
      },
    ],
  },

  recovery_overtraining: {
    name: 'Regeneracja i przetrenowanie',
    summary: 'Adaptacja nie zachodzi podczas treningu, lecz w regeneracji po nim. Kto trenuje za dużo i regeneruje się za mało, stoi w miejscu albo się cofa. Sen, odżywianie, odpoczynek i rozsądne sterowanie obciążeniem są więc równie ważne jak sam trening.',
    quick: [
      { label: 'Podstawowa zasada', text: 'Mięśnie rosną w czasie odpoczynku. Bez regeneracji nie ma postępów.' },
      { label: 'Najważniejsze dźwignie', text: 'Sen (7–9 h), wystarczająco kalorii i białka, tygodnie deloadu, radzenie sobie ze stresem.' },
    ],
    sections: [
      {
        title: 'Dlaczego regeneracja jest decydująca',
        content: 'Trening jest bodźcem, ale właściwa adaptacja — silniejsze, większe mięśnie, sprawniejszy układ nerwowy — zachodzi w fazie regeneracji po nim. To współdziałanie opisuje model superkompensacji: po obciążeniu wydolność najpierw spada, potem się odbudowuje, a następnie wzrasta ponad poziom wyjściowy — pod warunkiem, że jest wystarczająco dużo czasu na regenerację.\n\nJeśli następny ciężki bodziec przychodzi za wcześnie, zanim regeneracja się zakończy, zmęczenie się kumuluje. Krótkoterminowo jest to normalne, a nawet stanowi część treningu; długoterminowo prowadzi jednak do spadku wydolności. Organizm nie odróżnia stresu treningowego od innego stresu — praca, niedobór snu i obciążenia psychiczne liczą się tak samo.\n\nRegeneracja nie jest więc biernym „nicnierobieniem”, lecz aktywną częścią, w której bodziec treningowy w ogóle zamienia się w postęp. Kto ją zaniedbuje, marnuje dużą część swojego wysiłku treningowego.',
      },
      {
        title: 'Sen jako najważniejszy czynnik regeneracji',
        content: 'Żaden inny czynnik nie wpływa na regenerację tak silnie jak sen. Podczas snu zachodzą naprawa tkanek, utrwalanie wzorców ruchowych i ważne procesy hormonalne, w tym wydzielanie hormonu wzrostu.\n\nDane są jednoznaczne: niedobór snu pogarsza siłę, wydolność i regenerację. Badanie Nedeltchevy i wsp. (2010, Annals of Internal Medicine) wykazało, że osoby na diecie o obniżonej kaloryczności, które spały za krótko, traciły znacznie więcej masy mięśniowej i mniej tłuszczu niż osoby wyspane — przy niedoborze snu organizm w pierwszej kolejności poświęcał mięśnie. Przy przewlekłym braku snu mierzalnie rośnie też liczba kontuzji.\n\nDla większości trenujących sensownym celem jest siedem do dziewięciu godzin na noc. Regularne pory snu, ciemna, chłodna sypialnia oraz unikanie ekranów i kofeiny wieczorem wyraźnie poprawiają jakość snu.',
      },
      {
        title: 'Oznaki przetrenowania',
        content: 'Prawdziwy zespół przetrenowania jest rzadki, a powrót do formy trwa tygodnie lub miesiące; częstsze jest tzw. overreaching — przejściowe przeciążenie. Oba objawiają się podobnymi sygnałami ostrzegawczymi, które warto traktować poważnie.\n\nTypowe oznaki to: utrzymujący się spadek wydolności mimo treningu, nietypowo silne lub długotrwałe zakwasy, zaburzenia snu, podwyższone tętno spoczynkowe, drażliwość, utrata motywacji i częstsze infekcje. Gdy kilka z nich występuje jednocześnie, to wyraźny sygnał, by zmniejszyć obciążenie.\n\nWażne: pojedynczy słaby dzień treningowy to nie przetrenowanie. Dopiero utrzymujący się wzorzec przez jeden do dwóch tygodni powinien skłonić do zmian. Najlepszym lekarstwem zwykle nie jest więcej, lecz mniej — przez zmniejszoną objętość, więcej snu i w razie potrzeby tydzień deloadu.',
      },
      {
        title: 'Deload i sterowanie obciążeniem',
        content: 'Tydzień deloadu to zaplanowana faza zmniejszonego obciążenia, w której świadomie redukuje się objętość i/lub intensywność — zwykle do ok. połowy objętości albo ze znacznie lżejszymi ciężarami. Jego celem jest pozbycie się nagromadzonego zmęczenia bez całkowitej utraty bodźca treningowego.\n\nTo, kiedy deload ma sens, zależy od osoby. Wielu trenujących korzysta z takiego tygodnia mniej więcej co 4–8 tygodni intensywnego treningu albo wtedy, gdy mnożą się sygnały ostrzegawcze. Zaawansowani z dużą objętością potrzebują go częściej niż początkujący.\n\nPoza zaplanowanymi deloadami liczy się bieżące sterowanie obciążeniem: dopasowuj intensywność treningu do formy dnia, przeplataj ciężkie i lżejsze sesje i uwzględniaj obciążenia życiowe. Regeneracja to nie sztywny schemat, lecz elastyczne słuchanie sygnałów organizmu.',
      },
      {
        title: 'Podsumowanie',
        content: 'Postęp powstaje w regeneracji, a nie w samym treningu. Kto dostarcza bodźca, ale zaniedbuje regenerację, marnuje efekty i ryzykuje przeciążenie.\n\nNajskuteczniejsze dźwignie to sen (7–9 godzin), odpowiednia ilość kalorii i białka oraz świadome sterowanie obciążeniem z okazjonalnymi tygodniami deloadu. Sygnały ostrzegawcze, takie jak utrzymujący się spadek wydolności, słaby sen i utrata motywacji, warto traktować poważnie.\n\nRegeneracja nie jest oznaką słabości, lecz częścią treningu, w której zachodzi właściwa adaptacja. Kto ją planuje i szanuje, trenuje w dłuższej perspektywie zdrowiej i skuteczniej.',
      },
    ],
  },

  technique_rom: {
    name: 'Technika i zakres ruchu',
    summary: 'Czysta technika w pełnym zakresie ruchu sprawia, że ćwiczenia są skuteczniejsze i bezpieczniejsze. Dzięki niej bodziec trafia do docelowego mięśnia, spada ryzyko kontuzji, a całość stanowi podstawę każdej progresji.',
    quick: [
      { label: 'Podstawowa zasada', text: 'Pełny zakres ruchu, kontrola, skupienie na docelowym mięśniu — technika przed ciężarem.' },
      { label: 'Dlaczego to ważne', text: 'Lepszy bodziec, mniejsze ryzyko kontuzji, czysta podstawa do progresji.' },
    ],
    sections: [
      {
        title: 'Dlaczego technika jest ważna',
        content: 'Dobra technika ćwiczeń pełni dwie główne funkcje: sprawia, że obciążenie rzeczywiście trafia do docelowego mięśnia, i utrzymuje stawy w bezpiecznych pozycjach. Razem decydują one o tym, czy ćwiczenie jest skuteczne i czy da się je wykonywać długofalowo.\n\nTrening ze słabą techniką często przenosi obciążenie na niezamierzone mięśnie albo struktury bierne, takie jak więzadła i ścięgna. To nie tylko zmniejsza efekt treningowy, ale też zwiększa ryzyko przeciążeniowych urazów. Technika nie jest więc celem samym w sobie, lecz warunkiem, by trening spełniał swoje zadanie.\n\nSzczególnie na początku opłaca się uczyć wzorców ruchowych z lekkimi ciężarami. Układ nerwowy utrwala wzorce przez powtarzanie — czysto wyuczona technika tworzy podstawę, na której później można bezpiecznie operować większymi ciężarami.',
      },
      {
        title: 'Pełny zakres ruchu',
        content: 'Zakres ruchu (range of motion, ROM) opisuje drogę, na której mięsień pracuje podczas ćwiczenia. Zasadniczo jak najpełniejszy zakres przewyższa skrócony — zwłaszcza w kontekście wzrostu mięśni.\n\nPotwierdza to kilka badań. Przegląd Schoenfelda i Grgica (2020, SAGE Open Medicine) stwierdza, że pełne zakresy ruchu na ogół prowadzą do większego wzrostu mięśni niż ruchy częściowe. Szczególnie pozycja rozciągnięcia pod obciążeniem wydaje się silnym bodźcem wzrostowym — głębokie przysiady na przykład lepiej rozwijają uda niż półprzysiady.\n\nSą wyjątki: w niektórych ćwiczeniach lub przy ograniczeniach zdrowotnych nieco zmodyfikowany zakres może mieć sens. Ogólnie jednak warto dążyć do największego zakresu, który kontrolujesz z dobrą techniką i bez bólu.',
      },
      {
        title: 'Tempo i kontrola',
        content: 'To, jak szybko wykonujesz powtórzenie, wpływa na bodziec. Szczególnie faza ekscentryczna (opuszczanie ciężaru) powinna być kontrolowana — nie upuszczaj ciężaru, tylko aktywnie go hamuj. Dzięki temu napięcie pozostaje na mięśniu, a kontrola się poprawia.\n\nCzęstym błędem jest korzystanie z rozpędu. Szarpnięcie ciężaru w górę gwałtownymi ruchami przenosi pracę z mięśni na pęd i tym samym zmniejsza efekt treningowy. Kontrolowane, świadome powtórzenia są prawie zawsze skuteczniejsze niż szybkie i niedbałe.\n\nNie znaczy to, że każde powtórzenie musi być skrajnie wolne. Sensowna wytyczna: faza koncentryczna (podnoszenie) dynamiczna, ale kontrolowana, faza ekscentryczna (opuszczanie) przez ok. dwie do trzech sekund. Zawsze chodzi o świadome odczuwanie i angażowanie pracującego mięśnia.',
      },
      {
        title: 'Częste błędy i jak je poprawić',
        content: 'Najczęstszy błąd to zbyt duży ciężar kosztem techniki. Jeśli ostatnie powtórzenia udają się tylko z rozpędem, ruchami kompensacyjnymi albo w niepełnym zakresie, ciężar jest za duży. Rozwiązanie jest proste: zmniejsz go i wykonuj ruch czysto.\n\nDrugi błąd to zaniedbywanie fazy ekscentrycznej. Wiele osób pozwala ciężarowi opaść bez kontroli i tym samym marnuje dużą część bodźca. Świadome hamowanie od razu to naprawia.\n\nTrzecia kwestia to brak uwagi na docelowym mięśniu. „Mind-muscle connection” — świadome skupienie na pracującym mięśniu — może poprawić jego aktywację, zwłaszcza w ćwiczeniach izolowanych. Nagrania wideo własnego wykonania albo uwagi doświadczonych trenujących pomagają rozpoznać i poprawić błędy techniczne.',
      },
      {
        title: 'Podsumowanie',
        content: 'Czysta technika w pełnym zakresie ruchu to podstawa skutecznego i bezpiecznego treningu. Dzięki niej bodziec trafia do docelowego mięśnia, a stawy są chronione.\n\nDąż do jak największego kontrolowanego zakresu, wykonuj szczególnie fazę ekscentryczną świadomie i unikaj rozpędu. Technika zawsze idzie przed ciężarem — dopiero gdy ruch jest pewny, zwiększanie obciążenia ma sens.\n\nDobra technika to nie jednorazowe zadanie, lecz stały priorytet. Kto o nią dba, trenuje skuteczniej, dłużej pozostaje bez kontuzji i kładzie fundament pod ciągłe postępy.',
      },
    ],
  },

  periodization: {
    name: 'Periodyzacja i planowanie',
    summary: 'Periodyzacja to planowe rozłożenie treningu w czasie — z naprzemiennymi fazami objętości, intensywności i regeneracji. Pomaga unikać stagnacji, zapobiegać przetrenowaniu i długofalowo robić stałe postępy.',
    quick: [
      { label: 'Główna idea', text: 'Planuj trening świadomie w fazach, zamiast co tydzień trenować tak samo.' },
      { label: 'Dla kogo', text: 'Głównie dla zaawansowanych; początkującym przez długi czas wystarcza prosta progresja liniowa.' },
    ],
    sections: [
      {
        title: 'Czym jest periodyzacja?',
        content: 'Periodyzacja to systematyczne planowanie treningu w różnych odcinkach czasu. Zamiast trenować identycznie tydzień po tygodniu, świadomie zmienia się zmienne takie jak objętość, intensywność, zakresy powtórzeń i dobór ćwiczeń, aby osiągać postępy w dłuższym okresie i sterować zmęczeniem.\n\nKoncepcja pochodzi pierwotnie ze sportu wyczynowego i opiera się na pracach Leo Matwiejewa i Tudora Bompy. Celem było doprowadzenie sportowców do szczytowej formy na konkretne zawody. Podstawowa idea — planowe przeplatanie obciążenia i regeneracji — jest jednak przydatna dla każdego trenującego.\n\nCzęsto wyróżnia się makrocykl (cały plan na kilka miesięcy do roku), mezocykl (kilkutygodniowe bloki z jednym akcentem) i mikrocykl (zwykle tydzień treningowy). Taka struktura pomaga rozłożyć duży cel na przejrzyste, kolejno budowane etapy.',
      },
      {
        title: 'Modele periodyzacji',
        content: 'Istnieje kilka sprawdzonych modeli. Periodyzacja liniowa zaczyna od dużej objętości i niskiej intensywności i przez kolejne tygodnie przesuwa się w stronę mniejszej objętości i wyższej intensywności — klasycznie od faz hipertrofii do faz siłowych.\n\nPeriodyzacja falowa (undulacyjna) zmienia obciążenie w krótszych odstępach, często z treningu na trening w obrębie tygodnia — np. jeden dzień ciężko i z małą liczbą powtórzeń, drugi z umiarkowaną, a trzeci z dużą liczbą powtórzeń. Metaanaliza sugeruje, że oba modele są skuteczne, a różnice w praktyce są często niewielkie (Williams i wsp., 2017, Sports Medicine).\n\nPeriodyzacja blokowa koncentruje się przez kilka tygodni na jednym akcencie (np. blok objętościowy, a po nim blok intensywności). To, który model pasuje najlepiej, zależy od celów, doświadczenia i preferencji — najważniejsze jest, by w ogóle mieć plan ze świadomą zmiennością.',
      },
      {
        title: 'Czy początkujący potrzebują periodyzacji?',
        content: 'Dla początkujących złożona periodyzacja jest zwykle zbędna. W pierwszych miesiącach organizm reaguje tak silnie na każdy bodziec treningowy, że prosta progresja liniowa — z tygodnia na tydzień trochę więcej ciężaru lub powtórzeń — już daje świetne postępy. Ta faza jest często nazywana „novice gains”.\n\nDopiero gdy ten szybki początkowy postęp się wypłaszcza, zwykle po kilku miesiącach do mniej więcej roku konsekwentnego treningu, bardziej przemyślana struktura staje się naprawdę przydatna. Naprzemienne fazy pomagają wtedy nadal dostarczać bodziec, nie popadając w przetrenowanie ani stagnację.\n\nDla początkujących obowiązuje więc zasada: konsekwencja, dobra technika i prosta progresja wygrywają z każdym skomplikowanym planowaniem. Periodyzacja to narzędzie dla zaawansowanych, a nie warunek, by zacząć.',
      },
      {
        title: 'Jak zbudować prosty plan',
        content: 'Dobry plan treningowy zaczyna się od celów i dostępnego czasu. Z nich wynika częstotliwość treningów (np. 3–4 sesje w tygodniu) i split — na przykład full body przy niewielu sesjach albo split góra/dół lub push-pull-legs przy większej liczbie sesji.\n\nNa tej podstawie rozkłada się ćwiczenia i objętość tak, by każda partia mięśniowa była trenowana najlepiej dwa razy w tygodniu, łącznie ok. 10–20 ciężkich serii. Podstawę stanowią ćwiczenia wielostawowe (przysiad, martwy ciąg, wyciskanie na ławce i nad głowę, podciąganie, wiosłowanie), uzupełnione ćwiczeniami izolowanymi na słabe punkty.\n\nZ tygodnia na tydzień robisz progresję (więcej ciężaru lub powtórzeń), a mniej więcej co 4–8 tygodni możesz zaplanować tydzień deloadu. Plan nie musi być skomplikowany — musi pasować do twojego życia, być stosowany konsekwentnie i regularnie dostosowywany na podstawie postępów.',
      },
      {
        title: 'Podsumowanie',
        content: 'Periodyzacja to planowa zmienność treningu w czasie, która pozwala unikać stagnacji i przetrenowania. Popularne modele to periodyzacja liniowa, falowa i blokowa — w praktyce różnice są często mniejsze, niż się sądzi.\n\nPoczątkujący nie potrzebują złożonej periodyzacji; prosta progresja liniowa dobrze przeprowadzi ich przez pierwsze miesiące. Dopiero zaawansowani wyraźnie korzystają z zaplanowanych faz.\n\nNajważniejszy jest plan, który pasuje do twoich celów i codzienności, odpowiednio trenuje każdą partię mięśniową, jest progresywnie zwiększany i uwzględnia regenerację. Struktura i konsekwencja wygrywają z każdą rzekomo „idealną” metodą.',
      },
    ],
  },
};
