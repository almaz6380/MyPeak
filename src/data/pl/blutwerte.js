// Polnische Fassung von `src/data/bloodworkKnowledge.js`.
// Schlüssel = `id` aus der Datendatei. Reihenfolge der `sections` muss der
// Datendatei entsprechen — sie werden über den Index zugeordnet.
// Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    hormone: 'Hormony',
    stoffwechsel: 'Metabolizm',
    vitamine: 'Witaminy i minerały',
    herz: 'Układ krążenia',
  },

  testosterone: {
    name: 'Testosteron',
    summary: 'Testosteron to główny hormon anaboliczny, który wpływa na budowę mięśni, gęstość kości, libido, nastrój i energię. Jego poziom można poprawić stylem życia, ale wobec spektakularnych obietnic warto zachować ostrożność.',
    quick: [
      { label: 'Znaczenie', text: 'Budowa mięśni, gęstość kości, libido, motywacja, nastrój.' },
      { label: 'Naturalne wsparcie', text: 'Trening siłowy, dobry sen, zdrowa masa ciała, wystarczająca ilość tłuszczu i mikroskładników.' },
    ],
    sections: [
      {
        title: 'Co testosteron robi w organizmie',
        content: 'Testosteron to główny męski hormon płciowy, ale w mniejszych ilościach występuje też u kobiet, u których również ma znaczenie. Należy do hormonów anabolicznych (budujących) i odgrywa kluczową rolę w budowie mięśni, sile, gęstości kości, rozmieszczeniu tkanki tłuszczowej, libido, nastroju i energii.\n\nU mężczyzn testosteron powstaje głównie w jądrach, a regulowany jest przez współdziałanie mózgu (podwzgórze, przysadka) i jąder. Produkcja ma rytm dobowy z najwyższymi wartościami rano — dlatego krew do oznaczenia pobiera się zwykle przed południem.\n\nZdrowy poziom testosteronu wspiera adaptację do treningu siłowego i ogólne samopoczucie. Zarówno zbyt niskie, jak i sztucznie podwyższone wartości (np. przez sterydy anaboliczne) mają jednak konsekwencje dla zdrowia.',
      },
      {
        title: 'Zakresy referencyjne i pomiar',
        content: 'Testosteron mierzy się we krwi, zwykle jako testosteron całkowity; dodatkowo pomocny jest testosteron wolny (biologicznie aktywny). Zakresy referencyjne różnią się w zależności od laboratorium, wieku i metody pomiaru, dlatego wyniki zawsze trzeba interpretować w kontekście danego laboratorium i objawów.\n\nU dorosłych mężczyzn zakres referencyjny testosteronu całkowitego wynosi zwykle ok. 300–1000 ng/dl, choć granice są płynne. Pojedynczy wynik to poza tym tylko migawka: pora dnia, sen, stres i ostre choroby mogą na niego wpływać. Przy nietypowych wartościach pomiar zwykle się powtarza.\n\nWażne jest, by zrozumieć, że sam wynik laboratoryjny nie jest diagnozą. Dopiero połączenie objawów (np. brak motywacji, spadek libido, utrata masy mięśniowej) z powtórzonymi pomiarami pozwala na sensowną ocenę lekarską.',
      },
      {
        title: 'Co wpływa na poziom testosteronu',
        content: 'Na poziom testosteronu wpływa wiele czynników stylu życia. Nadwaga, a zwłaszcza tłuszcz brzuszny, wiąże się z niższymi wartościami; utrata wagi może je poprawić. Przewlekły brak snu mierzalnie obniża testosteron — już tydzień spania zaledwie pięciu godzin może wyraźnie obniżyć wartości (Leproult i Van Cauter, 2011, JAMA).\n\nTrening siłowy i wystarczająca aktywność fizyczna działają długofalowo korzystnie, natomiast skrajny przetrening lub bardzo duże deficyty kaloryczne mogą obniżać poziom. Ważna jest też wystarczająca ilość tłuszczu w diecie oraz mikroskładników, takich jak cynk i witamina D — bardzo niskotłuszczowa dieta może obniżać wartości.\n\nPrzewlekły stres podnosi poziom kortyzolu, który działa przeciwstawnie do testosteronu. Zdrowy styl życia z dobrym snem, zrównoważoną dietą, regularnym treningiem i radzeniem sobie ze stresem jest więc najskuteczniejszą naturalną podstawą zdrowego poziomu testosteronu.',
      },
      {
        title: 'Realistyczne oczekiwania i porada lekarska',
        content: 'Rynek jest pełen „boosterów testosteronu”, które obiecują spektakularne wzrosty. Większość tych preparatów u osób z prawidłowymi wartościami nie wykazuje żadnego lub tylko minimalny efekt. Zdrowy styl życia podnosi niski poziom skuteczniej niż jakikolwiek produkt bez recepty, a przy prawidłowych wartościach testosteronu nie da się w sensowny sposób „podkręcić”.\n\nRzeczywiście niski poziom testosteronu (hipogonadyzm) z odpowiednimi objawami to diagnoza medyczna, którą powinien wyjaśnić i w razie potrzeby leczyć lekarz. Terapia testosteronem należy wyłącznie do lekarza, bo wymaga starannego rozważenia korzyści i ryzyka.\n\nZdecydowanie odradza się samodzielne stosowanie sterydów anabolicznych w celu poprawy wydolności: mogą one hamować własną produkcję organizmu i powodować poważne szkody dla zdrowia. Przy podejrzeniu problemu hormonalnego właściwą drogą jest zawsze wizyta u lekarza.',
      },
    ],
  },

  vitamin_d_blood: {
    name: 'Witamina D (25-OH)',
    summary: 'Wynik witaminy D we krwi (25-OH-witamina D) pokazuje status „witaminy słońca”. Niedobór jest częsty, zwłaszcza zimą, i może wpływać na kości, mięśnie i układ odpornościowy. Wynik można celowo poprawić.',
    quick: [
      { label: 'Co się mierzy', text: '25-OH-witamina D we krwi — standardowy wskaźnik statusu witaminy D.' },
      { label: 'Jak poprawić', text: 'Światło słoneczne, tłuste ryby, a przy niedoborze suplement z dawką dobraną na podstawie badań.' },
    ],
    sections: [
      {
        title: 'Dlaczego wynik witaminy D ma znaczenie',
        content: 'Witamina D działa w organizmie jak hormon i ma podstawowe znaczenie dla gospodarki wapniowej, zdrowia kości, pracy mięśni i układu odpornościowego. Ponieważ organizm wytwarza ją sam pod wpływem słońca, podaż silnie zależy od pory roku, miejsca zamieszkania i stylu życia.\n\nNajlepszym wskaźnikiem statusu jest 25-hydroksywitamina D (25-OH-D) we krwi. Odzwierciedla formę magazynową i daje wiarygodny obraz stanu z ostatnich tygodni. Właśnie ten parametr oznacza się w badaniu krwi.\n\nPonieważ niedobór witaminy D jest powszechny i trudno go wyrównać samą dietą, to badanie należy do najbardziej przydatnych badań rutynowych — zwłaszcza dla osób mieszkających na północnych szerokościach geograficznych i w miesiącach z małą ilością słońca.',
      },
      {
        title: 'Jak rozumieć zakresy referencyjne',
        content: 'Status witaminy D podaje się zwykle w nanogramach na mililitr (ng/ml) lub w nanomolach na litr (nmol/l). W przybliżeniu wiele laboratoriów kieruje się taką klasyfikacją: wartości poniżej ok. 20 ng/ml (50 nmol/l) uznaje się za niedobór, a wyższy zakres za wystarczający, choć dokładne granice różnią się w zależności od towarzystwa naukowego.\n\nTe granice są przedmiotem dyskusji wśród specjalistów i nie są wykute w kamieniu. Niektórzy eksperci uważają za rozsądne nieco wyższe wartości docelowe, inni ostrzegają przed nadmiernym leczeniem. Kluczowe jest interpretowanie własnego wyniku w czasie i w porozumieniu z lekarzem.\n\nBardzo niski wynik czasem wyjaśnia niespecyficzne dolegliwości, takie jak zmęczenie, osłabienie mięśni czy częste infekcje. Mimo to pojedynczy wynik laboratoryjny zawsze trzeba oceniać w całym obrazie — to element układanki, a nie diagnoza.',
      },
      {
        title: 'Jak poprawić wynik',
        content: 'Najbardziej naturalnym źródłem jest światło słoneczne: regularna, umiarkowana ekspozycja skóry pobudza własną produkcję. Latem często wystarczą krótkie pobyty na świeżym powietrzu, natomiast zimą na północnych szerokościach geograficznych promieniowanie UV-B nie wystarcza.\n\nZ pożywienia witaminę D dostarczają głównie tłuste ryby (łosoś, makrela, śledź), żółtko jaja i produkty wzbogacane — zwykle jednak w ilościach, które same nie wyrównają niedoboru. Dlatego przy potwierdzonym niedoborze suplement (witamina D3) jest często najpewniejszym rozwiązaniem.\n\nNajrozsądniej jest dobierać dawkę suplementu na podstawie wyniku z krwi: zmierzyć punkt wyjścia, suplementować, po kilku miesiącach skontrolować i dostosować. Tak pozostajesz w skutecznym i bezpiecznym zakresie. Ponieważ witamina D rozpuszcza się w tłuszczach i może się gromadzić, wysokie dawki powinny odbywać się pod opieką lekarza.',
      },
      {
        title: 'Ocena i porada lekarska',
        content: 'Witamina D to jeden z niewielu suplementów o realnym i szerokim znaczeniu — a jednocześnie nie należy ani dramatyzować niedoboru, ani przeceniać jej jako cudownego środka. Nie rozwiązuje wszystkich problemów zdrowotnych, ale jest ważnym elementem.\n\nPonieważ witaminy rozpuszczalne w tłuszczach mogą się gromadzić, przyjmowanie wysokich dawek bez kontroli nie jest nieszkodliwe. Skrajnie wysokie dawki przez długi czas mogą prowadzić do niebezpiecznego nadmiaru wapnia. Stąd zasada: zmierzyć wynik, suplementować celowo, a w razie wątpliwości zasięgnąć porady lekarza.\n\nWynik witaminy D to dobry przykład tego, jak przydatne jest podejście oparte na danych: zamiast zgadywać, badanie daje jasność i pozwala na celową, bezpieczną korektę. Te treści nie zastępują jednak porady lekarskiej.',
      },
    ],
  },

  iron_ferritin: {
    name: 'Żelazo i ferrytyna',
    summary: 'Żelazo jest niezbędne do transportu tlenu we krwi. Ferrytyna pokazuje zapasy żelaza. Niedobór — częsty zwłaszcza u miesiączkujących kobiet i sportowców wytrzymałościowych — prowadzi do zmęczenia i spadku wydolności.',
    quick: [
      { label: 'Co się mierzy', text: 'Ferrytyna (zapasy), często razem z hemoglobiną, transferyną i jej wysyceniem.' },
      { label: 'Grupy ryzyka', text: 'Miesiączkujące kobiety, sportowcy wytrzymałościowi, dieta wegetariańska lub wegańska.' },
    ],
    sections: [
      {
        title: 'Rola żelaza',
        content: 'Żelazo to niezbędny minerał i kluczowy składnik hemoglobiny — czerwonego barwnika krwi, który transportuje tlen z płuc do wszystkich tkanek. Bez wystarczającej ilości żelaza organizm nie może wytworzyć dość sprawnej hemoglobiny, co pogarsza zaopatrzenie w tlen.\n\nW mięśniach żelazo uczestniczy też w magazynowaniu tlenu przez mioglobinę i bierze udział w wytwarzaniu energii w komórkach. Dlatego niedobór żelaza bezpośrednio odbija się na wytrzymałości, sile i ogólnej wydolności.\n\nTypowe objawy niedoboru to zmęczenie, bladość, duszność przy wysiłku, problemy z koncentracją i odczuwalny spadek wydolności na treningu. Ponieważ objawy te są niespecyficzne, niedobór żelaza często przez jakiś czas pozostaje niezauważony, dopóki nie wykażą go badania.',
      },
      {
        title: 'Ferrytyna i najważniejsze parametry',
        content: 'Do oceny gospodarki żelazem stosuje się kilka parametrów. Najważniejszy to ferrytyna, magazynowa forma żelaza: pokazuje, na ile zapasy są wypełnione, i często spada, zanim jawny niedobór stanie się widoczny w morfologii. Niska ferrytyna jest więc wczesnym sygnałem ostrzegawczym.\n\nUzupełniająco ocenia się hemoglobinę (właściwy czerwony barwnik krwi), transferynę (białko transportowe) i wysycenie transferyny. Dopiero pełny obraz pozwala na dobrą ocenę — niska ferrytyna przy jeszcze prawidłowej hemoglobinie wskazuje na puste zapasy, zanim pojawi się prawdziwa anemia.\n\nWarto wiedzieć, że ferrytyna może też rosnąć przy stanach zapalnych i w ten sposób maskować niedobór. Dlatego wyniki żelaza zawsze powinien interpretować lekarz, razem z innymi markerami i obrazem klinicznym.',
      },
      {
        title: 'Grupy ryzyka i przyczyny',
        content: 'Niektóre grupy mają wyraźnie wyższe ryzyko niedoboru żelaza. Miesiączkujące kobiety regularnie tracą krew, a wraz z nią żelazo — niedobór żelaza jest u nich najczęstszym niedoborem w ogóle. Bardzo wysokie zapotrzebowanie mają też kobiety w ciąży.\n\nNarażeni są również sportowcy wytrzymałościowi, m.in. przez większe zapotrzebowanie, straty z potem i przez przewód pokarmowy oraz tzw. efekt uderzeń stopy podczas biegania. Osoby na diecie wegetariańskiej lub wegańskiej przyjmują żelazo w gorzej przyswajalnej formie i powinny pilnować swojego statusu.\n\nInne przyczyny to zbyt mała podaż, choroby przewodu pokarmowego z zaburzonym wchłanianiem lub ukryte utraty krwi. Właśnie ze względu na różnorodność przyczyn niejasny lub utrzymujący się niedobór żelaza zawsze trzeba wyjaśnić z lekarzem.',
      },
      {
        title: 'Poprawiać — ale właściwie',
        content: 'W diecie czerwone mięso dostarcza głównie dobrze przyswajalnego żelaza hemowego; źródła roślinne, takie jak rośliny strączkowe, produkty pełnoziarniste i zielone warzywa liściaste, zawierają żelazo niehemowe, które wchłania się gorzej. Witamina C (np. z owoców lub warzyw w tym samym posiłku) wyraźnie poprawia wchłanianie żelaza roślinnego, a kawa i herbata je utrudniają.\n\nPrzy potwierdzonym niedoborze sama dieta często nie wystarcza, by szybko uzupełnić zapasy — wtedy mogą być potrzebne preparaty żelaza. Nie należy ich jednak przyjmować na ślepo: suplementacja żelaza bez niedoboru nie jest nieszkodliwa, bo nadmiar żelaza może gromadzić się w organizmie i szkodzić.\n\nDlatego przy żelazie szczególnie obowiązuje zasada: najpierw zmierzyć, potem działać celowo. Dawka i czas trwania terapii żelazem należą do lekarza, podobnie jak szukanie przyczyny. Te treści mają charakter informacyjny i nie zastępują diagnozy lekarskiej.',
      },
    ],
  },

  cholesterol: {
    name: 'Cholesterol i lipidy we krwi',
    summary: 'Cholesterol i trójglicerydy to ważne lipidy we krwi. Ich profil (LDL, HDL, trójglicerydy) jest kluczowym wskaźnikiem zdrowia układu krążenia. Styl życia ma duży wpływ, ale ocena należy do lekarza.',
    quick: [
      { label: 'Ważne parametry', text: 'Cholesterol całkowity, LDL, HDL i trójglicerydy — razem lipidogram.' },
      { label: 'Jak korzystnie wpłynąć', text: 'Błonnik, tłuszcze nienasycone, ruch, zdrowa masa ciała i mało tłuszczów trans.' },
    ],
    sections: [
      {
        title: 'Czym jest cholesterol',
        content: 'Cholesterol to substancja tłuszczopodobna, której organizm potrzebuje do budowy błon komórkowych, hormonów i kwasów żółciowych. Jest więc niezbędny do życia i sam w sobie nie jest niczym „złym”. Większość cholesterolu organizm wytwarza sam; część pochodzi z pożywienia.\n\nPonieważ cholesterol rozpuszcza się w tłuszczach, krąży we krwi związany z białkami transportowymi — lipoproteinami. Najbardziej znane to LDL („lipoproteina o niskiej gęstości”) i HDL („lipoproteina o wysokiej gęstości”). W uproszczeniu LDL transportuje cholesterol do tkanek, a HDL odprowadza nadmiar cholesterolu z powrotem do wątroby.\n\nKolejnym ważnym parametrem lipidowym są trójglicerydy, główna forma magazynowanego tłuszczu. Razem cholesterol całkowity, LDL, HDL i trójglicerydy tworzą lipidogram, który oznacza się w badaniu krwi.',
      },
      {
        title: 'LDL, HDL i ich ocena',
        content: 'Dla zdrowia układu krążenia znaczenie mają zarówno proporcje, jak i wysokość poszczególnych wartości. Trwale podwyższony cholesterol LDL wiąże się z większym ryzykiem złogów w naczyniach krwionośnych (miażdżycy), dlatego LDL często nazywa się „niekorzystnym” cholesterolem. HDL uchodzi natomiast raczej za „korzystny”, bo uczestniczy w transporcie zwrotnym.\n\nPodwyższone trójglicerydy również są czynnikiem ryzyka, często w związku z nadwagą, dużym spożyciem cukru i brakiem ruchu. Do oceny ryzyka nie liczy się jednak pojedynczy wynik, lecz cały profil razem z innymi czynnikami, takimi jak ciśnienie krwi, palenie, obciążenie rodzinne i poziom cukru we krwi.\n\nDokładne zakresy docelowe silnie zależą od indywidualnego ryzyka całkowitego i ustala je lekarz. Wynik „wysoki” nie oznacza automatycznie konieczności działania, a „prawidłowy” nie wyklucza całkowicie ryzyka — dlatego kluczowa jest ocena lekarska.',
      },
      {
        title: 'Co daje styl życia',
        content: 'Styl życia ma znaczny wpływ na lipidy we krwi. Dieta bogata w błonnik, z dużą ilością warzyw, owoców, roślin strączkowych i produktów pełnoziarnistych, może obniżać cholesterol LDL. Zastępowanie tłuszczów nasyconych nienasyconymi (oliwa, orzechy, tłuste ryby) działa korzystnie, a sztuczne tłuszcze trans są wyraźnie niekorzystne i warto ich unikać.\n\nRegularna aktywność fizyczna poprawia lipidogram, zwłaszcza trójglicerydy i HDL. Do zdrowia układu krążenia przyczyniają się też zdrowa masa ciała, niepalenie i umiarkowane spożycie alkoholu. Te działania współgrają i są podstawą każdej poprawy.\n\nWażna jest realistyczna ocena: część wartości cholesterolu jest uwarunkowana genetycznie i styl życia może ją zmienić tylko w ograniczonym stopniu. Niektóre osoby mają podwyższone wartości mimo zdrowego trybu życia — wtedy może być potrzebne leczenie farmakologiczne, o którym decyduje wyłącznie lekarz.',
      },
      {
        title: 'Ocena i porada lekarska',
        content: 'Lipidogram to jedno z najważniejszych badań rutynowych do oszacowania ryzyka sercowo-naczyniowego. Właśnie dlatego, że złogi w naczyniach długo nie dają objawów, regularna kontrola jest przydatna — zwłaszcza z wiekiem lub przy obciążeniu rodzinnym.\n\nInterpretacja jest złożona i należy do lekarza. To, czy i jak leczy się dany wynik, zależy od indywidualnego ryzyka całkowitego, a nie od pojedynczej liczby. Zmiany stylu życia są niemal zawsze pierwszym krokiem; leki takie jak statyny dołącza się, gdy uzasadnia to ryzyko, i są one dobrze przebadane.\n\nWykorzystaj tę wiedzę, by lepiej rozumieć swój lipidogram i celowo pracować nad czynnikami stylu życia. Konkretną ocenę i leczenie twoich wyników zawsze omawiaj z lekarzem — te treści nie zastępują porady lekarskiej.',
      },
    ],
  },

  blood_sugar: {
    name: 'Cukier we krwi i HbA1c',
    summary: 'Poziom cukru we krwi (glukoza) i wskaźnik długoterminowy HbA1c pokazują, jak dobrze organizm przetwarza cukier. To kluczowe wskaźniki metabolizmu i ryzyka cukrzycy. Dieta i ruch mają na nie duży wpływ.',
    quick: [
      { label: 'Co się mierzy', text: 'Glukoza na czczo (wynik chwilowy) i HbA1c (średnia z ostatnich ~3 miesięcy).' },
      { label: 'Jak korzystnie wpłynąć', text: 'Ruch, zdrowa masa ciała, dieta bogata w błonnik, mało cukru — trening siłowy pomaga.' },
    ],
    sections: [
      {
        title: 'Cukier we krwi i insulina',
        content: 'Glukoza (cukier we krwi) jest kluczowym nośnikiem energii dla organizmu. Po jedzeniu poziom cukru rośnie, a trzustka uwalnia hormon insulinę. Insulina wprowadza glukozę do komórek i w ten sposób przywraca prawidłowy poziom cukru we krwi.\n\nTen precyzyjnie dostrojony system utrzymuje poziom cukru w wąskim zakresie. Jeśli działa dobrze, cukier jest przetwarzany sprawnie. Jeśli działanie insuliny jest zaburzone (insulinooporność), organizm musi wytwarzać coraz więcej insuliny, a poziom cukru pozostaje zbyt wysoki — to stan poprzedzający cukrzycę typu 2.\n\nWażną rolę odgrywają tu mięśnie: aktywne mięśnie pobierają glukozę i poprawiają wrażliwość na insulinę. Dlatego regularny trening, a zwłaszcza trening siłowy, jest jednym z najskuteczniejszych czynników zdrowego metabolizmu cukru.',
      },
      {
        title: 'Glukoza na czczo i HbA1c',
        content: 'Szczególnie miarodajne są dwa parametry. Glukozę na czczo mierzy się po kilku godzinach bez jedzenia; pokazuje ona aktualny poziom cukru. To migawka, która może się wahać w zależności od diety, stresu i pory dnia.\n\nWynik HbA1c („długoterminowy cukier”) odzwierciedla średni poziom cukru we krwi z mniej więcej ostatnich dwóch–trzech miesięcy. Mierzy odsetek hemoglobiny, do której przyłączył się cukier. Ponieważ obejmuje dłuższy okres, jest bardziej odporny na krótkotrwałe wahania i służy do diagnostyki oraz kontroli przebiegu.\n\nOba parametry razem dają dobry obraz metabolizmu cukru. Podwyższone wartości mogą wskazywać na stan przedcukrzycowy (prediabetes) lub istniejącą już cukrzycę. Dokładne granice i ich interpretację ustala lekarz.',
      },
      {
        title: 'Wpływ diety i ruchu',
        content: 'Na metabolizm cukru można silnie wpływać stylem życia. Dieta bogata w błonnik, z warzywami, roślinami strączkowymi i produktami pełnoziarnistymi, powoduje wolniejszy i bardziej równomierny wzrost cukru we krwi niż mocno przetworzona, słodka żywność. Szczególnie skuteczne jest ograniczenie słodzonych napojów i produktów z białej mąki.\n\nRuch jest czynnikiem kluczowym. Zarówno trening wytrzymałościowy, jak i siłowy poprawiają wrażliwość na insulinę i pomagają mięśniom pobierać glukozę. Nawet spacer po jedzeniu może złagodzić wzrost cukru we krwi. Budowa masy mięśniowej dodatkowo powiększa „magazyn cukru” organizmu.\n\nZdrowa masa ciała, a zwłaszcza redukcja tłuszczu brzusznego, wyraźnie poprawia wyniki cukru we krwi. Te zmiany stylu życia są najskuteczniejszą i pierwszą strategią, by przeciwdziałać stanowi przedcukrzycowemu i zmniejszyć ryzyko cukrzycy.',
      },
      {
        title: 'Ocena i porada lekarska',
        content: 'Cukier we krwi i HbA1c należą do najważniejszych badań profilaktycznych, bo zaburzony metabolizm cukru długo nie daje objawów, a może mieć poważne skutki. Wczesne wykrycie stanu przedcukrzycowego daje szansę, by zmianą stylu życia skorygować kurs, zanim rozwinie się cukrzyca.\n\nPodwyższone wartości to ważny sygnał ostrzegawczy, ale nie powód do samodzielnej diagnozy. Interpretacja, dalsza diagnostyka i ewentualne leczenie należą do lekarza. Przy istniejącej cukrzycy uporządkowana opieka lekarska jest niezbędna.\n\nWykorzystaj tę wiedzę, by rozumieć znaczenie swoich wyników i celowo stosować dietę oraz ruch. Trening siłowy i zrównoważona dieta bogata w błonnik to potężni sprzymierzeńcy zdrowego metabolizmu cukru. Te treści nie zastępują jednak porady ani diagnozy lekarskiej.',
      },
    ],
  },

  thyroid: {
    name: 'Tarczyca (TSH)',
    summary: 'Tarczyca za pomocą swoich hormonów reguluje metabolizm, energię i temperaturę ciała. Wynik TSH to najważniejsze badanie przesiewowe w kierunku niedoczynności lub nadczynności. Nieprawidłowości zawsze trzeba wyjaśnić z lekarzem.',
    quick: [
      { label: 'Co się mierzy', text: 'TSH jako badanie przesiewowe; przy nieprawidłowym wyniku także fT3/fT4 i ewentualnie przeciwciała.' },
      { label: 'Objawy', text: 'Zmęczenie, zmiany wagi, uczucie zimna lub gorąca, nastrój — niespecyficzne, skonsultuj się z lekarzem.' },
    ],
    sections: [
      {
        title: 'Tarczyca i jej hormony',
        content: 'Tarczyca to mały gruczoł w kształcie motyla na szyi, który ma ogromny wpływ. Wytwarza hormony tarczycy T3 (trijodotyronina) i T4 (tyroksyna), które regulują podstawową przemianę materii, metabolizm energetyczny, temperaturę ciała, rytm serca i wiele innych funkcji.\n\nTarczyca jest sterowana przez pętlę regulacyjną z mózgiem. Przysadka uwalnia hormon TSH (hormon tyreotropowy), który pobudza tarczycę do produkcji hormonów. Ta pętla precyzyjnie dopasowuje ilość hormonów do potrzeb organizmu.\n\nGdy czynność tarczycy jest zaburzona, odbija się to na całym organizmie. Niedoczynność (hipotyreoza) spowalnia metabolizm, nadczynność (hipertyreoza) go przyspiesza. Obie objawiają się szeroką gamą niespecyficznych objawów.',
      },
      {
        title: 'Dlaczego TSH to najważniejszy parametr',
        content: 'Wynik TSH to najczulsze badanie przesiewowe czynności tarczycy. Powód tkwi w pętli regulacyjnej: jeśli tarczyca wytwarza za mało hormonów, organizm próbuje to wyrównać i uwalnia więcej TSH — wysoki wynik TSH wskazuje więc często na niedoczynność. Jeśli wytwarza ich za dużo, TSH spada, co może wskazywać na nadczynność.\n\nPonieważ TSH reaguje już na niewielkie odchylenia, oznacza się je jako pierwsze. Jeśli TSH jest nieprawidłowe, wykonuje się kolejne badania: wolne hormony tarczycy fT3 i fT4 oraz ewentualnie przeciwciała, by wykryć przyczyny takie jak autoimmunologiczna choroba Hashimoto.\n\nZakresy referencyjne TSH różnią się w zależności od laboratorium, a interpretacja zależy od konkretnej sytuacji — wieku, ciąży czy występujących objawów. Pojedynczy wynik na granicy normy nie oznacza automatycznie choroby.',
      },
      {
        title: 'Objawy i częste zaburzenia',
        content: 'Niedoczynność tarczycy często objawia się zmęczeniem, brakiem energii, przybieraniem na wadze, wrażliwością na zimno, suchą skórą i obniżonym nastrojem. Nadczynność natomiast pokazuje się zwykle jako nerwowość, kołatanie serca, utrata wagi mimo apetytu, wrażliwość na ciepło i zaburzenia snu.\n\nTe objawy są niespecyficzne i mogą mieć wiele innych przyczyn — właśnie dlatego badanie krwi jest tak cenne, by potwierdzić lub wykluczyć tarczycę jako przyczynę. Dla osób aktywnych fizycznie dobrze działająca tarczyca jest ważna, bo wpływa na energię, regenerację i metabolizm.\n\nCzęste zaburzenia to autoimmunologiczna choroba Hashimoto (zwykle prowadząca do niedoczynności) i choroba Gravesa-Basedowa (prowadząca do nadczynności). Na tarczycę może też wpływać niedobór jodu. Dokładna diagnoza zawsze wymaga badania lekarskiego.',
      },
      {
        title: 'Ocena i porada lekarska',
        content: 'Tarczyca to przykład tego, jak mały narząd wpływa na cały organizm. Wynik TSH to proste i miarodajne badanie przesiewowe, które może mieć sens przy niejasnych objawach, takich jak uporczywe zmęczenie, niewyjaśnione zmiany wagi czy wahania nastroju.\n\nW przeciwieństwie do innych parametrów prawdziwego zaburzenia czynności tarczycy nie da się „wytrenować” stylem życia. Wystarczająca podaż jodu (z solą jodowaną i pożywieniem) wspiera prawidłową czynność, ale istniejące zaburzenie wymaga celowego leczenia lekarskiego, często preparatami hormonalnymi.\n\nDlatego tutaj szczególnie obowiązuje zasada: nieprawidłowe wyniki tarczycy lub odpowiednie objawy zawsze należą do lekarza. Ta wiedza pomaga ci zrozumieć znaczenie wyniku TSH i poważnie traktować objawy — wyraźnie nie zastępuje diagnozy ani leczenia.',
      },
    ],
  },
};
