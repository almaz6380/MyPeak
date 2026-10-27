// Polnische Fassung der 21 Peak-Programme aus `src/data/peakPrograms.js`.
//
// Form je Programm: { name, desc, why, progression, fokus: { <tag>: '…' } }.
// `fokus` gibt es nur bei den Kampfsport-Programmen (dort steht unter der
// Tagesbeschriftung noch ein Schwerpunkt).
//
// Die Beschriftungen der Trainingstage („Push", „Oberkörper") stehen NICHT
// hier, sondern in `src/data/tagesbeschriftung.js` — sie wiederholen sich über
// die Programme hinweg und fehlten bisher auch auf Englisch.
//
// `studien` ist nach „Name|Jahr" verschlüsselt, weil dieselbe Studie in
// mehreren Programmen zitiert wird; Name und Jahr bleiben unübersetzt.
export default {
  kategorien: {
    strength: 'Trening siłowy',
    cardio: 'Cardio',
    hiit: 'HIIT',
    martial_arts: 'Sporty walki',
  },

  studien: {
    'Schoenfeld, Ogborn & Krieger|2017': 'Metaanaliza zależności dawka–odpowiedź: 10 lub więcej serii na partię mięśniową tygodniowo daje wyraźnie większy przyrost mięśni niż mniejsza liczba serii.',
    'Schoenfeld, Ogborn & Krieger|2016': 'Metaanaliza: trenowanie każdej partii mięśniowej 2 razy w tygodniu daje większą hipertrofię niż 1 raz w tygodniu.',
    'Helms et al.|2016': 'Skala RIR („powtórzenia w zapasie”) to trafne narzędzie do sterowania wysiłkiem w treningu siłowym: kończ większość serii z 1–3 RIR.',
    'Schoenfeld, Grgic & Krieger|2019': 'Przy tej samej objętości tygodniowej częstotliwość treningu ma drugorzędne znaczenie: decyduje łączna objętość na partię mięśniową.',
    'Pedisic et al.|2020': 'Metaanaliza: biegacze mają o ~27 % niższe ryzyko zgonu z jakiejkolwiek przyczyny, a efekt widać już przy małej objętości biegania (1 raz w tygodniu).',
    'Lee et al.|2014': 'Już 5–10 minut powolnego biegu dziennie wiązało się z wyraźnie niższą śmiertelnością ogólną i sercowo-naczyniową.',
    'Helgerud et al.|2007': 'Interwały 4×4 minuty przy 90–95 % maksymalnego tętna zwiększyły VO₂max znacznie bardziej niż umiarkowany trening ciągły przy tej samej łącznej pracy.',
    'Milanović et al.|2015': 'Metaanaliza: HIIT poprawia VO₂max u zdrowych dorosłych bardziej niż klasyczny trening wytrzymałościowy.',
    'Gunnarsson & Bangsbo|2012': 'W koncepcji 10-20-30 biegacze poprawili VO₂max (~4 %) oraz czasy na 1500 m i 5 km, mimo że zmniejszyli objętość treningu o ~50 %.',
    'Seiler|2010': 'Elitarni zawodnicy wytrzymałościowi wykonują ~80 % objętości z niską intensywnością (strefy 1–2) — ten spolaryzowany model daje najlepsze adaptacje w długim okresie.',
    'Stöggl & Sperlich|2014': 'Trening spolaryzowany (dużo lekkiego + mało bardzo ciężkiego) poprawił VO₂max i wyniki u wytrenowanych sportowców wytrzymałościowych bardziej niż trening progowy lub czysty HIT.',
    'Esteve-Lanao et al.|2007': 'Biegacze, którzy ~80 % objętości trenowali z niską intensywnością, poprawili czas startowy bardziej niż grupa, która więcej trenowała w średniej strefie intensywności.',
    'Billat et al.|1999': 'Interwały w tempie VO₂max (vVO₂max) wymiernie poprawiły ekonomię biegu i tempo u wytrenowanych biegaczy.',
    'Tabata et al.|1996': '6 tygodni 4-minutowych sesji (8×20 s/10 s) zwiększyło VO₂max o ~7 ml/kg/min, a wydolność beztlenową o 28 % — umiarkowany trening ciągły poprawił tylko wydolność tlenową.',
    'Weston et al.|2014': 'Metaanaliza: HIIT poprawił wydolność krążeniowo-oddechową niemal dwa razy bardziej niż umiarkowany trening ciągły.',
    'Gibala et al.|2006': '6 sesji interwałów sprinterskich w 2 tygodnie (~2,5 h treningu) dało podobne adaptacje wytrzymałościowe mięśni jak ~10,5 h klasycznego treningu wytrzymałościowego.',
    'Little et al.|2010': 'Interwały 8–12×60 sekund z 75 s przerwy wyraźnie zwiększyły pojemność mitochondrialną mięśni — przy zaledwie ~20–25 minutach na sesję.',
    'McRae et al.|2012': '4 razy w tygodniu, tylko 4 minuty interwałów całego ciała poprawiły wytrzymałość ORAZ wytrzymałość siłową porównywalnie z 30 minutami treningu ciągłego.',
    'Chaabène et al.|2015': 'Przegląd: boks amatorski wymaga jednocześnie wysokiej wydolności tlenowej i beztlenowej; elitarni bokserzy osiągają VO₂max w okolicach 60 ml/kg/min.',
    'Ouergui et al.|2014': 'Rundy kickboxingu podnoszą tętno blisko maksimum — trening w rundach działa fizjologicznie jak trening interwałowy o wysokiej intensywności.',
    'James et al.|2016': 'Przegląd: MMA wymaga połączenia siły, szybkości i wytrzymałości; zalecane jest zróżnicowane przygotowanie kondycyjne oparte na rundach.',
  },

  ppl_6x: {
    name: 'Push / Pull / Legs',
    desc: 'Klasyczny split na 6 dni dla maksymalnej rozbudowy mięśni. Każda partia mięśniowa trenowana jest 2 razy w tygodniu.',
    why: 'PPL łączy dwie najsilniejsze dźwignie budowy mięśni: wysoką objętość tygodniową (16–20 serii na partię mięśniową) i częstotliwość 2 razy w tygodniu. Podział według wzorców ruchowych (pchanie/przyciąganie/nogi) pozwala każdej partii w pełni się zregenerować, mimo że trenujesz niemal codziennie.',
    progression: 'Podwójna progresja: utrzymuj liczbę serii i zakres powtórzeń, a stopniowo dokładaj powtórzenia. Gdy czysto osiągniesz górną granicę we wszystkich seriach, zwiększ ciężar o 2,5 kg i zacznij znów od dołu zakresu. Kończ większość serii z 1–3 powtórzeniami w zapasie (RIR).',
  },
  upper_lower_4x: {
    name: 'Góra / dół',
    desc: 'Skuteczny split na 4 dni dla początkujących i zaawansowanych. Każda partia mięśniowa trenowana jest 2 razy w tygodniu.',
    why: 'Split góra/dół to najlepszy kompromis między nakładem czasu a efektem: 4 sesje w tygodniu wystarczą do częstotliwości 2 razy na partię mięśniową, która w metaanalizach daje większy wzrost niż 1 raz. Najpierw ćwiczenia wielostawowe, potem celowane ćwiczenia izolowane.',
    progression: 'Podwójna progresja: najpierw zwiększaj powtórzenia w zakresie docelowym, potem +2,5 kg. Ćwiczenia wielostawowe (przysiad, wyciskanie na ławce, martwy ciąg) kończ z 2 RIR, izolowane do 1 RIR. Po 6–8 tygodniach wstaw lżejszy tydzień.',
  },
  split_5x: {
    name: 'Split na 5 dni',
    desc: 'Zaawansowany split na 5 dni z dużą objętością na partię mięśniową. Dla doświadczonych sportowców.',
    why: 'Dla zaawansowanych, którzy potrzebują więcej objętości: split na 5 dni pozwala na 15–20+ serii na partię mięśniową z pełną koncentracją na jednym obszarze w sesji. Badania zależności dawka–odpowiedź pokazują, że kto trenuje już dłużej, dalej rośnie przy większej liczbie serii tygodniowo.',
    progression: 'Podwójna progresja w każdym ćwiczeniu. Dodatkowo co 3–4 tygodnie dodaj jedną serię w pierwszym ćwiczeniu dnia, o ile pozwala na to regeneracja. Tydzień 10 zrób jako deload (ciężary −30 %, połowa serii).',
  },
  fullbody_3x: {
    name: 'Full body 3×',
    desc: 'Idealny dla początkujących: 3 treningi całego ciała w tygodniu z najważniejszymi ćwiczeniami podstawowymi.',
    why: 'Dla początkujących trening całego ciała 3 razy w tygodniu to najbardziej efektywny model: każda partia mięśniowa dostaje bodziec 3 razy w tygodniu, ćwiczenia podstawowe szybko się poprawiają dzięki częstej praktyce, a trzy sesje zmieszczą się w każdym grafiku. Początkujący rosną niezawodnie już przy umiarkowanej objętości.',
    progression: 'Progresja liniowa: zwiększaj ciężar w każdej sesji o 2,5 kg (dół ciała) lub 1,25–2,5 kg (góra ciała), dopóki wszystkie powtórzenia wychodzą czysto. Jeśli ćwiczenie nie wyjdzie 2 razy z rzędu, zmniejsz jego ciężar o 10 % i znów pracuj w górę.',
  },
  push_pull_4x: {
    name: 'Push / Pull 4×',
    desc: '4 treningi w tygodniu podzielone na ruchy pchające i przyciągające. Nogi są wplecione w plan.',
    why: 'Push/Pull z wplecionymi nogami to oszczędzająca czas alternatywa dla 6-dniowego PPL: ta sama częstotliwość 2 razy na partię mięśniową, ale tylko 4 dni na siłowni. Czworogłowe trafiają do Push (przysiad = pchanie), tylny łańcuch do Pull (martwy ciąg = przyciąganie) — biomechanicznie czysty podział.',
    progression: 'Podwójna progresja: zwiększaj powtórzenia w zakresie docelowym, potem +2,5 kg. Martwy ciąg i przysiad zwiększaj ostrożnie (dopiero gdy wszystkie serie wychodzą z 2 RIR). Po tygodniu 8 zrób tydzień deloadu, zanim powtórzysz cykl.',
  },
  bro_split_5x: {
    name: 'Bro split',
    desc: 'Klasyczny split kulturystyczny: każda partia mięśniowa ma swój własny dzień z dużą objętością.',
    why: 'Klasyczne podejście kulturystyczne: jedna partia mięśniowa dziennie, za to z pełnym skupieniem i dużą objętością w jednej sesji. Nowsze badania pokazują, że przy tej samej objętości tygodniowej rozkład ma drugorzędne znaczenie — kto lubi pompę i skupienie dni na pojedyncze mięśnie, buduje masę tak samo.',
    progression: 'Podwójna progresja w każdym ćwiczeniu, większość serii do 1–2 RIR. Ponieważ każda partia mięśniowa jest trenowana tylko 1 raz w tygodniu, liczy się każda sesja: konsekwentnie zapisuj ciężary i co tydzień zrób co najmniej jedno powtórzenie więcej.',
  },
  couch_to_5k: {
    name: 'Z kanapy na 5 km',
    desc: 'W 9 tygodni od zera do biegu na 5 kilometrów — z interwałami marszu i biegu, które co tydzień się wydłużają.',
    why: 'Sprawdzona na całym świecie koncepcja dla początkujących: krótkie odcinki biegu z przerwami na marsz pozwalają ścięgnom, stawom i układowi krążenia rosnąć razem z obciążeniem, zamiast je przeciążać. Progresja jest celowo łagodna — właśnie dlatego program tak łatwo utrzymać. Już niewielka objętość biegania wymiernie obniża ryzyko zgonu.',
    progression: 'Co tydzień odcinki biegu się wydłużają, a przerwy na marsz skracają — od 8×1 minuta biegu (tydzień 1) do 30 minut bez przerwy (tydzień 9). Biegaj odcinki świadomie wolno (tempo rozmowy, RPE 5–6). Powtórz tydzień, jeśli wydaje się za ciężki.',
  },
  norwegian_4x4: {
    name: 'Norweskie 4×4',
    desc: 'Protokół VO₂max prosto z badań: 4 interwały po 4 minuty przy 90–95 % maksymalnego tętna.',
    why: 'Mało który protokół jest lepiej udokumentowany: 4-minutowe interwały blisko maksymalnego tętna to najsilniejszy znany bodziec dla VO₂max — najlepszego pojedynczego wskaźnika wydolności i długowieczności. 3-minutowe aktywne przerwy utrzymują wysoką jakość interwałów. Działa przy bieganiu, jeździe na rowerze i wiosłowaniu.',
    progression: 'Tygodnie 1–2: 3 interwały na rozruch. Od tygodnia 3: pełne 4×4. Tygodnie 7–8: aktywna przerwa skrócona do 2:30. Intensywność: ostatnie 2 minuty każdego interwału mają odpowiadać RPE 9 — mówienie jest wtedy niemożliwe.',
  },
  interval_10_20_30: {
    name: 'Interwały 10-20-30',
    desc: 'Duńska koncepcja: 30 s lekko, 20 s żwawo, 10 s sprintu — szybciej przy połowie objętości treningu.',
    why: 'Opracowane na Uniwersytecie Kopenhaskim: biegacze stali się szybsi i sprawniejsi, choć zmniejszyli objętość treningu o połowę. Sprinty trwające tylko 10 sekund dają maksymalny bodziec, ale są tak krótkie, że obciążenie dobrze się rozkłada. Idealne, gdy masz mało czasu, ale chcesz biegać szybciej.',
    progression: 'Jeden blok = 5×(30 s lekko · 20 s żwawo · 10 s sprintu). Tygodnie 1–2: 2 bloki, tygodnie 3–4: 3 bloki, tygodnie 5–6: 4 bloki — z 2 minutami truchtu między blokami. Sprinty 10-sekundowe są prawie maksymalne (RPE 9), reszta świadomie lekko.',
  },
  zone2_base: {
    name: 'Baza w strefie 2',
    desc: 'Baza wytrzymałościowa zawodowców: lekkie sesje ciągłe w 2. strefie tętna, które z tygodnia na tydzień się wydłużają.',
    why: 'Czołowi zawodnicy wytrzymałościowi trenują ~80 % objętości właśnie tutaj: na tyle lekko, że można przy tym swobodnie rozmawiać. Strefa 2 buduje mitochondria i metabolizm tłuszczów — fundament, na którym każdy ciężki trening dopiero działa. Najczęstszy błąd amatorów to bieganie tych sesji za szybko.',
    progression: 'Krótkie sesje wydłużają się co 2 tygodnie o 5 minut (25→40 min), długi bieg co tydzień o 5 minut, z tygodniami odciążenia (35→60 min). Kontrola tempa: musisz móc rozmawiać pełnymi zdaniami (RPE 3–4, strefa 2). Jeśli nie — zwolnij.',
  },
  '10k_training': {
    name: 'Trening na 10 km',
    desc: 'Uporządkowane przygotowanie do 10 km w 10 tygodni: interwały, bieg tempowy, bieg lekki i długi bieg.',
    why: 'Klasyka planowania biegowego według zasady 80/20: dwie ciężkie sesje w tygodniu (interwały VO₂max + bieg tempowy) dają bodziec wydolnościowy, dwie lekkie budują bazę tlenową. Długi bieg rośnie progresywnie z tygodniami odciążenia, a w ostatnich dwóch tygodniach robisz tapering — stajesz na starcie wypoczęty.',
    progression: 'Interwały: 4→6×3 minuty (RPE 9). Bieg tempowy: 15→25 minut „komfortowo ciężko” (RPE 7). Długi bieg: 40→70 minut lekko, z odciążeniem w tygodniu 4 i 7. Tygodnie 9–10: tapering — mniej objętości, więcej świeżości. Lekki bieg w czwartek zawsze zostaje lekki.',
  },
  tabata_classic: {
    name: 'Tabata klasyczna',
    desc: 'Oryginalny protokół Tabata: 20 sekund na maksa, 10 sekund przerwy — z rosnącą liczbą rund.',
    why: 'Najsłynniejszy protokół HIIT na świecie, zbadany w 1996 roku na japońskich panczenistach: 8 rund po 20/10 poprawiło jednocześnie wydolność tlenową I beztlenową — coś, czego umiarkowany trening ciągły nie potrafi. Kluczowa jest intensywność: „na maksa” znaczy naprawdę na maksa.',
    progression: 'Tygodnie 1–2: 8 rund (1 blok Tabaty, 4 minuty). Tygodnie 3–4: 12 rund. Tygodnie 5–6: 16 rund (2 bloki). Każda faza pracy przy RPE 9–10 — jeśli ostatnich rund nie robisz już czysto, zostań tydzień dłużej na obecnym poziomie.',
  },
  gibala_sit: {
    name: 'Protokół Gibali 60/75',
    desc: '„Praktyczny SIT” z badań: 8–12 interwałów po 60 sekund ciężko, 75 sekund przerwy.',
    why: 'Zespół Martina Gibali wykazał, że kilka minut intensywnych interwałów wywołuje podobne adaptacje komórkowe jak wielokrotnie dłuższy klasyczny trening wytrzymałościowy. Wariant 60/75 to wersja na co dzień: ciężko, ale bez maksymalnych sprintów — dzięki temu bezpieczna i odpowiednia do ćwiczeń całego ciała.',
    progression: 'Tygodnie 1–2: 8 interwałów. Tygodnie 3–4: 10 interwałów. Tygodnie 5–6: 12 interwałów. Fazy pracy przy RPE 8–9 („bardzo ciężko, ale do wytrzymania przez 60 sekund”), w przerwach ruszaj się lekko, zamiast stać.',
  },
  hiit_beginner: {
    name: 'HIIT dla początkujących 30/30',
    desc: 'Łagodne wejście w trening interwałowy: 30 sekund pracy, 30 sekund przerwy — od 6 do 10 rund.',
    why: 'Stosunek pracy do przerwy 1:1 to idealne wejście w HIIT: na tyle intensywnie, by uzyskać udowodnione efekty kondycyjne, ale z wystarczającym odpoczynkiem, by utrzymać czystą technikę. Według metaanaliz HIIT poprawia kondycję niemal dwa razy bardziej niż umiarkowany trening ciągły — w ułamku czasu.',
    progression: 'Tygodnie 1–2: 6 rund. Tygodnie 3–4: 8 rund. Tygodnie 5–6: 10 rund. Fazy pracy przy RPE 7–8 — pod koniec każdej przerwy powinieneś być znów gotowy. Jakość przed tempem: czyste powtórzenia liczą się bardziej niż ich liczba.',
  },
  hiit_advanced: {
    name: 'HIIT zaawansowany 40/15',
    desc: 'Intensywny HIIT dla zaawansowanych: 40 sekund pracy, tylko 15 sekund przerwy, do 12 rund.',
    why: 'Krótka przerwa (prawie 3:1) utrzymuje tętno stale wysoko — dzięki temu trenujesz zdolność do dalszej pracy w zmęczeniu. Cztery tematyczne sesje w tygodniu (moc, core, nogi, całe ciało) rozkładają obciążenie na różne partie mięśniowe.',
    progression: 'Tygodnie 1–2: 8 rund. Tygodnie 3–6: 10 rund. Tygodnie 7–8: 12 rund. Fazy pracy przy RPE 8–9. Gdy technika się sypie, zakończ rundę wcześniej — brak kontuzji jest ważniejszy niż liczba rund.',
  },
  emom_challenge: {
    name: 'Wyzwanie EMOM',
    desc: 'Every Minute On the Minute: co minutę zaczyna się nowe ćwiczenie — przerwą jest to, co zostaje z minuty.',
    why: 'EMOM ma wbudowane tempo: kto pracuje szybciej, zyskuje dłuższą przerwę — to utrzymuje wysoką gęstość i uczy równego tempa. Interwały całego ciała tego typu poprawiają jednocześnie wytrzymałość i wytrzymałość siłową, jak pokazują badania minimalistycznych protokołów całego ciała.',
    progression: 'Tygodnie 1–2: rundy bazowe (10–15 zależnie od dnia). Tygodnie 3–4: +2 rundy. Tygodnie 5–6: kolejne +2 rundy. Dobierz liczbę powtórzeń na minutę tak, by zostało ~15–20 sekund przerwy — jeśli nie zostaje żadna przerwa, zmniejsz liczbę powtórzeń.',
  },
  boxing_basics: {
    name: 'Boks: podstawy',
    desc: 'Poznaj podstawy boksu: jab, prosty, sierpowy, praca nóg — w klasycznych 3-minutowych rundach.',
    why: 'Trening bokserski w 3-minutowych rundach to ukryty HIIT: tętno waha się między intensywną pracą a krótką przerwą, a ty jednocześnie uczysz się koordynacji i techniki. Każda sesja ma swój cel — tak tydzień po tygodniu budujesz solidne podstawy.',
    progression: 'Tygodnie 1–2: 6 rund (w piątek 8). Tygodnie 3–4: +1 runda na sesję. Tygodnie 5–6: kolejna +1 runda. Najpierw technika, potem tempo: kombinacje ciosów najpierw wolno i czysto, potem szybciej. Ostatnia runda każdej sesji może być „czystą kondycją”.',
    fokus: {
      mon: 'Ciosy podstawowe i postawa',
      wed: 'Kombinacje i siła ciosu',
      fri: 'Wytrzymałość w rundach',
    },
  },
  kickboxing_conditioning: {
    name: 'Kickboxing: kondycja',
    desc: 'Trening kickboxingu z naciskiem na kondycję i technikę: kopnięcia, ciosy i kombinacje w rundach.',
    why: 'Kickboxing łączy górę i dół ciała jak mało który sport: kopnięcia angażują nogi, biodra i core, ciosy barki i ramiona. Badania pokazują, że rundy kickboxingu podnoszą tętno blisko maksimum — dostajesz efekty HIIT i mobilność w jednym.',
    progression: 'Tydzień 4: +1 runda w każdej sesji. Tydzień 7: kolejna +1 runda. Dni techniki przed dniami kondycji: nowych kopnięć ucz się powoli w powietrzu, zanim wykonasz je w zmęczeniu. Codziennie krótko rozciągaj biodra.',
    fokus: {
      mon: 'Technika kopnięć',
      tue: 'Eksplozywność i wytrzymałość',
      thu: 'Kombinacje ciosów i kopnięć',
      sat: 'Symulacja walki',
    },
  },
  mma_fundamentals: {
    name: 'MMA: podstawy',
    desc: 'Wejście w mieszane sztuki walki: uderzenia, kopnięcia i kondycja specyficzna dla walki połączone w jednym tygodniu.',
    why: 'MMA to najbardziej wszechstronny sport walki: uderzenia, kopnięcia i walka w parterze wymagają jednocześnie siły, szybkości i wytrzymałości. Nauki o sporcie zalecają dokładnie to, co odzwierciedla ten program — trening w rundach ze zmiennymi akcentami plus osobny dzień kondycyjny ze sprawlami i skakanką.',
    progression: 'Tydzień 4: striking 8→9 rund, kondycja 5→6 rund. Tydzień 7: kopnięcia 6→7 rund. Długa sobota (5-minutowe rundy jak w prawdziwym MMA) pozostaje bez zmian — tam liczy się jakość w zmęczeniu, nie większa objętość.',
    fokus: {
      mon: 'Technika uderzeń',
      tue: 'Kopnięcia i kolana',
      thu: 'Kondycja walki',
      sat: '5-minutowe rundy jak w walce',
    },
  },
  boxing_advanced: {
    name: 'Boks dla zaawansowanych',
    desc: 'Zaawansowany trening bokserski: większa objętość, dłuższe sesje, złożone kombinacje.',
    why: 'Na poziomie zaawansowanym decyduje zdolność do pracy: elitarni bokserzy osiągają VO₂max w okolicach 60 ml/kg/min — zbudowane właśnie taką strukturą rund technicznych, na worku i kondycyjnych. Symulacja sparingu w sobotę łączy wszystko w zmęczeniu zbliżonym do walki.',
    progression: 'Tydzień 4: technika i worek +1 runda. Tydzień 7: kolejna +1 runda, kondycja 8→10 rund. Tygodnie 9–10: utrzymaj objętość, zwiększ intensywność kombinacji (szybciej, mocniej, krótsza przerwa między kombinacjami).',
    fokus: {
      mon: 'Złożone kombinacje',
      tue: 'Siła ciosu i rytm',
      fri: 'Zdolność do pracy',
      sat: 'Wszystko w zmęczeniu',
    },
  },
  combat_fitness: {
    name: 'Combat Fitness',
    desc: 'Trening fitness inspirowany sportami walki, bez wcześniejszego doświadczenia: elementy boksu i kopnięć jako trening całego ciała.',
    why: 'Wejście dla wszystkich, którzy chcą kondycji ze sportów walki bez ambicji startowych: walka z cieniem, kopnięcia i ćwiczenia z masą ciała w krótkich 2-minutowych rundach. Trening w rundach działa fizjologicznie jak trening interwałowy — z dodatkową motywacją, bo przy okazji uczysz się prawdziwych technik.',
    progression: 'Tydzień 3: 1 runda więcej na sesję. Tydzień 5: rundy wydłużone z 2:00 do 2:30. Pilnuj, by przerwy trwały konsekwentnie 60 sekund — efekt kondycyjny wynika ze stosunku pracy do przerwy.',
    fokus: {
      mon: 'Ciosy i góra ciała',
      wed: 'Kopnięcia i nogi',
      sat: 'Wszystko razem',
    },
  },
};
