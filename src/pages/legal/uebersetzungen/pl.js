// Polskie tłumaczenie tekstów prawnych.
//
// Niemiecki oryginał w `legalContent.js` pozostaje tekstem wiążącym — dlatego
// każdy dokument zaczyna się od sekcji „Wersja wiążąca”. Tak postępuje się z
// wielojęzycznymi tekstami prawnymi: tłumaczy się po to, by tekst był
// zrozumiały, a nie po to, by powstała druga wersja o własnej mocy.
//
// Imię i nazwisko, adres oraz odwołania do prawa austriackiego (§ 5 ECG, GISA,
// GewO, § 6 UStG, Bezirkshauptmannschaft Kitzbühel) nie są tłumaczone: to
// nazwy własne i cytaty z ustaw.
const BETREIBER = `Josef Gallab (Einzelunternehmen)
Oberhofenweg 21b
6380 St. Johann in Tirol, Austria
E-mail: kontakt@wellbooked.at`;

const VORRANG = {
  heading: 'Wersja wiążąca',
  body: 'To jest tłumaczenie grzecznościowe niemieckiego tekstu oryginalnego. W razie rozbieżności lub wątpliwości interpretacyjnych pierwszeństwo ma wersja niemiecka. Możesz ją wyświetlić, zmieniając w profilu język aplikacji na „Deutsch”.',
};

export default {
  imprint: {
    title: 'Nota prawna',
    updated: 'Stan na: 17 września 2026 r.',
    sections: [
      VORRANG,
      {
        heading: 'Informacje zgodnie z § 5 ECG i § 25 MedienG (Austria)',
        body: BETREIBER,
      },
      {
        heading: 'Przedmiot działalności',
        body: 'Prowadzenie aplikacji internetowej do fitnessu i odżywiania „FullRep” (fullrep.pages.dev).',
      },
      {
        heading: 'Informacje dotyczące działalności gospodarczej i zawodowej',
        body: 'Działalność wolna (freies Gewerbe): „Usługi w zakresie automatycznego przetwarzania danych i technologii informacyjnej”\nNumer GISA: 39801937\nCzłonek Izby Gospodarczej Tyrolu (Wirtschaftskammer Tirol, oddział Kitzbühel)\nOrgan nadzoru / organ ds. działalności gospodarczej: Bezirkshauptmannschaft Kitzbühel\nMające zastosowanie przepisy: Gewerbeordnung (GewO), dostępne na ris.bka.gv.at\nVAT: mały przedsiębiorca zgodnie z § 6 Abs. 1 Z 27 UStG (bez numeru VAT)',
      },
      {
        heading: 'Rozstrzyganie sporów konsumenckich',
        body: 'Nie jesteśmy gotowi ani zobowiązani do udziału w postępowaniu w sprawie rozstrzygania sporów przed konsumenckim podmiotem polubownym. Dawna unijna platforma internetowego rozstrzygania sporów została zamknięta 20 lipca 2025 r.',
      },
      {
        heading: 'Odpowiedzialność za treści',
        body: 'Treści tej aplikacji zostały przygotowane z największą starannością. Nie udzielamy gwarancji ich poprawności, kompletności ani aktualności. Wszystkie treści dotyczące treningu, odżywiania i wiedzy służą wyłącznie ogólnej informacji i nie stanowią porady medycznej.',
      },
    ],
  },

  privacy: {
    title: 'Polityka prywatności',
    updated: 'Stan na: 30 października 2026 r.',
    sections: [
      VORRANG,
      {
        heading: '1. Administrator',
        body: `Administratorem danych przetwarzanych w aplikacji „FullRep” jest:\n\n${BETREIBER}`,
      },
      {
        heading: '2. Jakie dane przetwarzamy',
        body: 'Dane konta: adres e-mail i hasło (zaszyfrowane) do rejestracji.\n\nDane profilu: imię, wiek, płeć, wzrost, waga, cel treningowy, poziom aktywności i doświadczenie — podane przez ciebie podczas onboardingu.\n\nDane o korzystaniu: twoje treningi (ćwiczenia, serie, ciężary), wpisy żywieniowe (produkty, kalorie, makro), wpisy wody, suplementy, historia wagi, plany treningowe, znajomości i punkty doświadczenia.\n\nDane o zdrowiu (art. 9 RODO): masa ciała i wymiary ciała, dane żywieniowe i treningowe, dane cyklu i dziennik objawów (jeśli włączysz śledzenie cyklu), kroki i waga z Apple Health / Health Connect (jeśli włączysz połączenie) oraz wszystko, co napiszesz do trenera AI — na przykład wyniki badań krwi. Dane te przetwarzamy wyłącznie na podstawie twojej wyraźnej zgody, której udzielasz podczas onboardingu w osobnym kroku (moment jej udzielenia zapisujemy w twoim profilu) i którą możesz w każdej chwili wycofać ze skutkiem na przyszłość — w profilu za pomocą „Wycofaj zgodę na przetwarzanie danych o zdrowiu” albo usuwając swoje konto. Przetwarzanie dokonane przed wycofaniem zgody pozostaje zgodne z prawem. Ponieważ FullRep bez tych danych nie działa w sensowny sposób, po wycofaniu zgody możesz dalej korzystać z konta dopiero po ponownym jej udzieleniu albo zlecić jego usunięcie.\n\nApple Health / Health Connect (opcjonalnie): jeśli włączysz połączenie w profilu, FullRep odczytuje liczbę kroków i wagę z Apple Health (iOS) lub Google Health Connect (Android), aby wyświetlać je w aplikacji i przenosić do twojej historii wagi. Uprawnienie nadajesz w oknie systemowym i możesz je tam w każdej chwili cofnąć; połączenie możesz też wyłączyć w profilu. Niezależnie od tego możesz w profilu włączyć „Zapisuj treningi w Zdrowiu”: wtedy FullRep zapisuje każdy zakończony trening jako sesję treningową (rodzaj, początek, koniec) w Apple Health lub Health Connect — bez serii, ciężarów, kalorii ani tętna. Tym, co tam się znajduje, zarządza system; FullRep tego nie usuwa, jeśli ponownie wyłączysz tę opcję. FullRep nigdy nie wykorzystuje tych danych do reklam.\n\nAktywne kalorie i liczenie kroków na urządzeniu (opcjonalnie, od wersji 1.6.2): przy połączeniu ze Zdrowiem FullRep odczytuje też dzisiejsze aktywne (spalone) kalorie, aby pokazać je na ekranie głównym i w widżecie. Niezależnie od tego możesz w profilu włączyć „Licz kroki telefonem”: FullRep odczytuje wtedy liczbę kroków bezpośrednio z czujnika ruchu urządzenia (iOS: Ruch i sprawność; Android: krokomierz, do którego aplikacja co 15 minut na chwilę sprawdza licznik). Te dane o krokach pozostają na urządzeniu i nie są do nas przesyłane. Zgodę udzielasz i cofasz w ustawieniach systemu; funkcję możesz też wyłączyć w profilu.\n\nZdjęcia: zdjęcia ćwiczeń i produktów są zapisywane wyłącznie lokalnie na twoim urządzeniu (IndexedDB) i nie są do nas przesyłane. Zdjęcia posiłków do analizy AI są przekazywane do Google (Gemini API) — zob. pkt 4.\n\nDane reklamowe i dotyczące zakupów (tylko w aplikacjach na iOS i Androida): w celu wyświetlania reklam Google AdMob przetwarza identyfikator reklamowy twojego urządzenia, twój adres IP i techniczne dane urządzenia. Na potrzeby subskrypcji Premium przekazujemy do RevenueCat wewnętrzny identyfikator użytkownika aplikacji i potwierdzenie zakupu ze sklepu. Aplikacja internetowa nie wyświetla reklam.\n\nRaporty błędów: jeśli aplikacja ulegnie awarii, wysyłamy do Sentry techniczny komunikat o błędzie z wersją aplikacji i typem urządzenia — bez imienia, adresu e-mail ani treści (o ile rejestrowanie błędów jest włączone w danej kompilacji).',
      },
      {
        heading: '3. Cele i podstawy prawne',
        body: 'Udostępnianie funkcji aplikacji: art. 6 ust. 1 lit. b RODO (wykonanie umowy).\n\nDane o zdrowiu: wyłącznie twoja wyraźna zgoda, art. 9 ust. 2 lit. a RODO.\n\nReklamy w aplikacjach: reklamy spersonalizowane wyświetlamy tylko za twoją zgodą (art. 6 ust. 1 lit. a RODO), o którą prosimy przed pierwszą reklamą w oknie zgody Google — na iOS dodatkowo w oknie Apple dotyczącym przejrzystości śledzenia w aplikacjach (App Tracking Transparency). Jeśli odmówisz, zobaczysz tylko reklamy niespersonalizowane; ich podstawą prawną jest nasz prawnie uzasadniony interes w finansowaniu wersji bezpłatnej (art. 6 ust. 1 lit. f RODO). Swoją decyzję możesz w każdej chwili zmienić w profilu w „Zmień zgodę na reklamy”. Z subskrypcją Premium reklamy znikają całkowicie. Twoje dane o zdrowiu i dane o korzystaniu nigdy nie są wykorzystywane do reklam ani przekazywane partnerom reklamowym.\n\nRaporty błędów i bezpieczeństwo: prawnie uzasadniony interes w stabilnej i bezpiecznej aplikacji (art. 6 ust. 1 lit. f RODO).\n\nMinimalny wiek: konto można założyć dopiero od 16. roku życia; onboarding sprawdza datę urodzenia. Powodem jest to, że w niektórych państwach UE, na przykład w Niemczech, zgodę na przetwarzanie danych o zdrowiu i na reklamy spersonalizowane można skutecznie wyrazić dopiero od 16. roku życia (art. 8 RODO).\n\nAplikacja internetowa nie wyświetla reklam i nie używa reklamowych plików cookie. Do pomiaru zasięgu wersji internetowej korzystamy z Cloudflare Web Analytics (zob. pkt 4).',
      },
      // TODO(Josef): Gemini-API auf den bezahlten Tarif mit Auftragsverarbeitungs-
      // vertrag (DPA) umstellen — im kostenlosen Tarif darf Google Eingaben zur
      // Produktverbesserung nutzen; für Coach-Nachrichten (auch Blutwerte) nicht
      // tragbar. Erst danach darf hier ein unbedingter Satz zu Art. 28 stehen.
      {
        heading: '4. Odbiorcy i podmioty przetwarzające',
        body: 'Supabase, Inc. (USA; baza danych i system logowania): przechowuje twoje dane konta, profilu i dane o korzystaniu.\n\nCloudflare, Inc. (USA; hosting): dostarcza aplikację i nasze funkcje serwerowe; powstają przy tym technicznie niezbędne logi serwera (np. adres IP). W wersji internetowej Cloudflare Web Analytics dodatkowo zlicza wyświetlenia stron (odwiedzona strona, czas, strona odsyłająca, kraj, typ urządzenia, przeglądarka, czas ładowania) — bez plików cookie, bez zapisywania czegokolwiek na twoim urządzeniu i bez przechowywania adresu IP. Podstawą prawną jest nasz prawnie uzasadniony interes w oszczędnym pod względem danych pomiarze zasięgu (art. 6 ust. 1 lit. f RODO). W aplikacjach nie odbywa się żadne zliczanie odwiedzin.\n\nGoogle LLC / Google Ireland Ltd.: (1) Gemini API — tylko jeśli korzystasz z analizy zdjęć posiłków, zrobione zdjęcie jest przekazywane do Google w celu analizy; tylko jeśli korzystasz z trenera AI, twoje wiadomości do niego wraz z historią bieżącej rozmowy są przetwarzane przez Google (Gemini API) w celu wygenerowania odpowiedzi. Google przetwarza te dane wejściowe zgodnie ze swoimi warunkami dla Gemini API. Nie przesyłamy przy tym ani imienia, ani adresu e-mail, ani identyfikatora konta; zdjęć i wiadomości nie przechowujemy na naszych serwerach. (2) AdMob — reklamy w aplikacjach na iOS i Androida (zob. pkt 2 i 3).\n\nAnthropic, PBC (USA; trener AI): odpowiedzi trenera AI mogą być generowane zamiast przez Gemini również przez modele Anthropic (Claude). Wtedy Anthropic przetwarza twoje wiadomości wraz z historią bieżącej rozmowy — również bez imienia, adresu e-mail ani identyfikatora konta.\n\nRevenueCat, Inc. (USA; subskrypcja Premium): otrzymuje wewnętrzny identyfikator użytkownika aplikacji i potwierdzenie zakupu ze sklepu, aby zarządzać twoją subskrypcją i przywrócić ją na nowym urządzeniu. Samą płatność obsługuje Apple lub Google; nie widzimy żadnych danych płatniczych.\n\nFunctional Software, Inc. (Sentry, USA; raporty błędów): otrzymuje techniczne komunikaty o błędach bez odniesienia do osoby, o ile rejestrowanie błędów jest włączone.\n\nOpen Food Facts (baza danych żywności): przy wyszukiwaniu produktów i skanowaniu kodów kreskowych wyszukiwana fraza lub kod kreskowy (bez danych osobowych) są przekazywane do Open Food Facts.\n\nO ile dostawcy oferują umowy powierzenia przetwarzania zgodnie z art. 28 RODO, mają one zastosowanie do naszego korzystania z ich usług. Przy przekazywaniu danych do USA opieramy się na standardowych klauzulach umownych UE lub na ramach ochrony danych UE-USA (EU-US Data Privacy Framework), o ile dostawca posiada w nich certyfikację.',
      },
      {
        heading: '5. Przechowywanie lokalne na twoim urządzeniu',
        body: 'Aplikacja zapisuje twoje dane dodatkowo lokalnie na twoim urządzeniu (localStorage/IndexedDB), aby były dostępne offline i bez czekania. W trybie gościa wszystkie dane pozostają wyłącznie na twoim urządzeniu i nie są do nas przesyłane. W aplikacji na Androida automatyczna kopia zapasowa przez Google (Android Backup) jest wyłączona; twoje lokalne dane aplikacji nie trafiają więc do twojej kopii zapasowej na Dysku Google.',
      },
      {
        heading: '6. Okres przechowywania',
        body: 'Przechowujemy twoje dane tak długo, jak istnieje twoje konto. Jeśli usuniesz konto, wszystkie twoje dane zostaną natychmiast usunięte z naszej bazy danych. W celu zabezpieczenia przed utratą danych codziennie tworzymy kopię zapasową bazy danych, która jest automatycznie usuwana po 14 dniach — do tego czasu usunięte konto może jeszcze znajdować się w kopii zapasowej; kopie te służą wyłącznie do przywrócenia danych po awarii.\n\nHistoria twoich rozmów z trenerem AI znajduje się tylko na twoim urządzeniu (ostatnie 60 wiadomości); na naszych serwerach liczymy jedynie, ile pytań zadajesz dziennie.',
      },
      {
        heading: '7. Usuwanie konta i danych',
        body: 'Możesz w każdej chwili samodzielnie usunąć swoje konto wraz ze wszystkimi danymi w aplikacji: Profil → Usuń konto. Dodatkowo możesz zażądać usunięcia w dowolnej formie, wysyłając e-mail na podany wyżej adres.',
      },
      {
        heading: '8. Twoje prawa',
        body: 'Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych i sprzeciwu, a także prawo do wycofania w każdej chwili udzielonej zgody — zgody na przetwarzanie danych o zdrowiu w profilu za pomocą „Wycofaj zgodę na przetwarzanie danych o zdrowiu”, zgody na reklamy za pomocą „Zmień zgodę na reklamy”. Możesz też złożyć skargę do austriackiego organu ochrony danych (dsb.gv.at).',
      },
    ],
  },

  terms: {
    title: 'Warunki korzystania',
    updated: 'Stan na: 4 października 2026 r.',
    sections: [
      VORRANG,
      {
        heading: '1. Zakres obowiązywania',
        body: `Niniejsze warunki korzystania dotyczą korzystania z aplikacji „FullRep” na iOS i Androida oraz z jej wersji internetowej (fullrep.pages.dev), prowadzonych przez:\n\n${BETREIBER}`,
      },
      {
        heading: '2. Opis usługi',
        body: 'FullRep to aplikacja do rejestrowania treningu i odżywiania z uzupełniającymi treściami edukacyjnymi. Podstawowe funkcje są bezpłatne; bezpłatna wersja aplikacji na iOS i Androida jest finansowana z reklam. Dodatkowe funkcje — obecnie przede wszystkim trener AI — oraz korzystanie bez reklam są dostępne w FullRep Premium (pkt 3). Nie ma prawa do stałej dostępności; funkcje mogą się zmieniać lub zostać wycofane. W trakcie już opłaconego okresu subskrypcji nie ograniczymy w istotny sposób funkcji Premium bez obiektywnego powodu.',
      },
      {
        heading: '3. FullRep Premium (subskrypcja)',
        body: 'FullRep Premium jest oferowany jako automatycznie odnawiana subskrypcja miesięczna lub roczna. Można go kupić wyłącznie przez App Store firmy Apple lub Google Play; płatność i rozliczenie obsługuje odpowiedni sklep, którego warunki obowiązują dodatkowo.\n\nAktualna cena jest wyświetlana w oknie sklepu przed zakupem. Płatność jest pobierana z twojego konta Apple lub Google w momencie potwierdzenia zakupu. Subskrypcja odnawia się automatycznie na wybrany okres, chyba że anulujesz ją co najmniej 24 godziny przed końcem bieżącego okresu.\n\nSubskrypcją możesz w każdej chwili zarządzać i ją anulować w ustawieniach subskrypcji swojego konta Apple lub Google. Usunięcie aplikacji lub konta FullRep nie kończy subskrypcji. Po anulowaniu Premium pozostaje aktywne do końca już opłaconego okresu.\n\nZ Premium znikają reklamy w aplikacji i odblokowują się funkcje Premium, takie jak trener AI (w ramach dziennego limitu).',
      },
      {
        heading: '4. Bezpłatny okres próbny',
        body: 'Nowi użytkownicy mogą jednorazowo przez 7 dni bezpłatnie wypróbować Premium. Okres próbny uruchamia się w aplikacji i jest powiązany z twoim kontem FullRep. Kończy się automatycznie i nie przechodzi w płatną subskrypcję — nie trzeba niczego anulować. Subskrypcja powstaje tylko wtedy, gdy wyraźnie wykupisz ją w sklepie.',
      },
      {
        heading: '5. Odstąpienie i zwroty',
        body: 'Zakupy obsługuje Apple lub Google; nie otrzymujemy danych płatniczych i dlatego nie możemy zwracać pieniędzy za zakupy. Zwroty oraz wykonanie ustawowego prawa odstąpienia od umowy podlegają warunkom i procedurom odpowiedniego sklepu (Apple: reportaproblem.apple.com; Google Play: historia zamówień na twoim koncie Google). Bezwzględnie obowiązujące prawa konsumentów pozostają nienaruszone.',
      },
      {
        heading: '6. Konto i obowiązki',
        body: 'Do trwałego przechowywania danych potrzebne jest konto. Zobowiązujesz się zachować w tajemnicy swoje dane logowania i nie publikować treści naruszających prawa osób trzecich. Dane, które przekazujesz społeczności (np. wartości odżywcze produktów przez kod kreskowy), udostępniasz ogółowi użytkowników. Aby założyć konto, musisz mieć ukończone 16 lat.',
      },
      {
        heading: '7. Informacja zdrowotna — to nie jest porada medyczna',
        body: 'Wszystkie treści aplikacji — w szczególności plany treningowe, informacje o odżywianiu i dietach, obliczenia kalorii oraz biblioteka wiedzy (w tym informacje o suplementach i peptydach) — służą wyłącznie ogólnej informacji i nie stanowią porady medycznej, terapeutycznej ani dietetycznej. W żadnym wypadku nie zastępują badania, diagnozy ani leczenia przez personel medyczny. Przed rozpoczęciem programu treningowego lub żywieniowego oraz przed przyjmowaniem suplementów skonsultuj się z lekarzem, zwłaszcza w przypadku chorób współistniejących, ciąży lub przyjmowania leków. Wspomagana przez AI analiza posiłków na podstawie zdjęć podaje wartości szacunkowe, których dokładność nie jest gwarantowana. Więcej szczegółów znajdziesz w informacji zdrowotnej w aplikacji (Profil → Informacja zdrowotna).',
      },
      {
        heading: '8. Odpowiedzialność',
        body: 'Ponosimy nieograniczoną odpowiedzialność za winę umyślną i rażące niedbalstwo oraz za szkody wynikające z naruszenia życia, ciała lub zdrowia. Poza tym odpowiedzialność za lekkie niedbalstwo jest wyłączona. Korzystanie z zaleceń treningowych i żywieniowych odbywa się na twoją własną odpowiedzialność.',
      },
      {
        heading: '9. Zmiany',
        body: 'Możemy zmieniać niniejsze warunki korzystania ze skutkiem na przyszłość. O istotnych zmianach poinformujemy cię w aplikacji.',
      },
      {
        heading: '10. Prawo właściwe',
        body: 'Zastosowanie ma prawo austriackie z wyłączeniem norm kolizyjnych. Bezwzględnie obowiązujące przepisy o ochronie konsumentów państwa, w którym mieszkasz, pozostają nienaruszone.',
      },
    ],
  },

  health: {
    title: 'Informacja zdrowotna',
    updated: 'Stan na: 17 września 2026 r.',
    sections: [
      VORRANG,
      {
        heading: 'FullRep nie zastępuje porady lekarskiej',
        body: 'W przypadku pytań dotyczących zdrowia, w celu postawienia diagnozy lub podjęcia leczenia zawsze zwracaj się do lekarza. FullRep to aplikacja do rejestrowania treningu i odżywiania — nie jest wyrobem medycznym i nie zastępuje badania, diagnozy ani terapii lekarskiej.',
      },
      {
        heading: 'Kiedy warto zasięgnąć porady lekarza',
        body: 'Przed rozpoczęciem programu treningowego lub żywieniowego, przed dietą i przed przyjmowaniem suplementów diety — zwłaszcza w przypadku chorób współistniejących, dolegliwości, ciąży, karmienia piersią lub jeśli przyjmujesz leki.\n\nPrzerwij trening i zasięgnij porady lekarza, jeśli pojawią się dolegliwości, takie jak ból w klatce piersiowej, duszność, zawroty głowy lub omdlenie.',
      },
      {
        heading: 'Czym są treści aplikacji — a czym nie są',
        body: 'Plany treningowe, informacje o odżywianiu i dietach, obliczenia kalorii i makro oraz biblioteka wiedzy (w tym suplementy, wyniki badań krwi i peptydy) służą wyłącznie ogólnej informacji. Są ogólne i nie uwzględniają twojej indywidualnej sytuacji.\n\nInformacje o wynikach badań krwi pozwalają jedynie na orientacyjną ocenę wartości i nie stanowią diagnozy. Ocenić twoje wyniki może tylko lekarz.\n\nO peptydach: w wielu krajach substancje te wydawane są wyłącznie na receptę lub nie są dopuszczone do obrotu. Treści celowo nie zawierają żadnych informacji o dawkowaniu.',
      },
      {
        heading: 'Wartości szacunkowe, nie pomiary',
        body: 'Kalkulator zapotrzebowania energetycznego (Mifflin-St Jeor) i wspomagana przez AI analiza posiłków na podstawie zdjęć podają wartości szacunkowe. Ich dokładność nie jest gwarantowana; nie zastępują pomiaru ani porady specjalisty ds. żywienia.',
      },
      {
        heading: 'Trener AI nie jest lekarzem',
        body: 'Trener AI odpowiada na ogólne pytania dotyczące treningu, odżywiania i suplementów. Nie stawia diagnoz, nie zaleca terapii i nie podaje dawek. Jego odpowiedzi mogą zawierać błędy. W sprawie porady medycznej, diagnozy lub leczenia zwróć się do lekarza.',
      },
      {
        heading: 'W nagłym wypadku',
        body: 'W nagłym przypadku medycznym zadzwoń na numer alarmowy (112 w Unii Europejskiej; w Polsce także 999 — pogotowie ratunkowe). Nie korzystaj z FullRep, aby szukać pomocy w sytuacji nagłej ani aby odkładać pomoc medyczną.',
      },
    ],
  },
};
