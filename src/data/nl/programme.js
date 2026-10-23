// Niederländische Fassung der 21 Peak-Programme aus `src/data/peakPrograms.js`.
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
    strength: 'Krachttraining',
    cardio: 'Cardio',
    hiit: 'HIIT',
    martial_arts: 'Vechtsport',
  },

  studien: {
    'Schoenfeld, Ogborn & Krieger|2017': 'Dosis-respons-meta-analyse: 10 of meer sets per spiergroep per week leveren duidelijk meer spiergroei op dan minder sets.',
    'Schoenfeld, Ogborn & Krieger|2016': 'Meta-analyse: elke spiergroep 2× per week trainen levert meer hypertrofie op dan 1× per week.',
    'Helms et al.|2016': 'De RIR-schaal („reps in reserve”) is een geldig hulpmiddel om de inspanning bij krachttraining te sturen: beëindig de meeste sets met 1–3 RIR.',
    'Schoenfeld, Grgic & Krieger|2019': 'Bij gelijk weekvolume is de trainingsfrequentie bijzaak: doorslaggevend is het totale volume per spiergroep.',
    'Pedisic et al.|2020': 'Meta-analyse: hardlopers hebben een ~27 % lager risico op sterfte door alle oorzaken, en al kleine loopvolumes (1× per week) laten dit effect zien.',
    'Lee et al.|2014': 'Al 5–10 minuten rustig hardlopen per dag ging samen met een duidelijk lagere totale en cardiovasculaire sterfte.',
    'Helgerud et al.|2007': '4×4-minutenintervallen op 90–95 % van de maximale hartslag verhoogden de VO₂max duidelijk meer dan gematigde duurtraining bij gelijke totale arbeid.',
    'Milanović et al.|2015': 'Meta-analyse: HIIT verbetert de VO₂max bij gezonde volwassenen meer dan klassieke duurtraining.',
    'Gunnarsson & Bangsbo|2012': 'Met het 10-20-30-concept verbeterden hardlopers hun VO₂max (~4 %) en hun tijden op 1500 m en 5 km, ondanks ~50 % minder trainingsvolume.',
    'Seiler|2010': 'Duursporters van topniveau doen ~80 % van hun volume op lage intensiteit (zone 1–2); dit gepolariseerde model geeft op lange termijn de beste aanpassingen.',
    'Stöggl & Sperlich|2014': 'Gepolariseerde training (veel rustig + weinig heel zwaar) verbeterde VO₂max en prestatie bij getrainde duursporters meer dan drempeltraining of puur HIT.',
    'Esteve-Lanao et al.|2007': 'Hardlopers die ~80 % van hun volume op lage intensiteit trainden, verbeterden hun wedstrijdtijd meer dan een groep die meer in de middelste intensiteitszone trainde.',
    'Billat et al.|1999': 'Intervallen op VO₂max-snelheid (vVO₂max) verbeterden de loopeconomie en het tempo bij getrainde hardlopers meetbaar.',
    'Tabata et al.|1996': '6 weken met sessies van 4 minuten (8×20 s/10 s) verhoogden de VO₂max met ~7 ml/kg/min en de anaerobe capaciteit met 28 %; gematigde duurtraining verbeterde alleen de aerobe capaciteit.',
    'Weston et al.|2014': 'Meta-analyse: HIIT verbeterde de cardiorespiratoire fitheid bijna twee keer zo sterk als gematigde duurtraining.',
    'Gibala et al.|2006': '6 sessies sprintintervallen in 2 weken (~2,5 uur training) gaven vergelijkbare aanpassingen in spieruithoudingsvermogen als ~10,5 uur klassieke duurtraining.',
    'Little et al.|2010': 'Intervallen van 8–12×60 seconden met 75 s pauze verhoogden de mitochondriale capaciteit van de spieren duidelijk, met maar ~20–25 minuten per sessie.',
    'McRae et al.|2012': '4× per week maar 4 minuten full-body-intervallen verbeterden uithoudingsvermogen ÉN spieruithoudingsvermogen vergelijkbaar met 30 minuten duurtraining.',
    'Chaabène et al.|2015': 'Review: amateurboksen vraagt tegelijk een hoge aerobe en anaerobe capaciteit; topboksers halen VO₂max-waarden rond 60 ml/kg/min.',
    'Ouergui et al.|2014': 'Kickboksrondes brengen de hartslag dicht bij het maximum: rondetraining werkt fysiologisch als hoogintensieve intervaltraining.',
    'James et al.|2016': 'Review: MMA vraagt kracht, snelheid en uithoudingsvermogen tegelijk; aanbevolen is gevarieerde, op rondes gebaseerde conditietraining.',
  },

  ppl_6x: {
    name: 'Push / Pull / Legs',
    desc: 'Het klassieke 6-dagenschema voor maximale spiergroei. Elke spiergroep wordt 2× per week getraind.',
    why: 'PPL combineert de twee sterkste hefbomen voor spiergroei: een hoog weekvolume (16–20 sets per spiergroep) en een frequentie van 2× per week. De verdeling naar bewegingspatroon (duwen/trekken/benen) laat elke spiergroep volledig herstellen, ook al train je bijna elke dag.',
    progression: 'Dubbele progressie: houd sets en herhalingsbereik gelijk en werk je herhalingen omhoog. Haal je in alle sets de bovengrens met nette techniek, verhoog dan het gewicht met 2,5 kg en begin weer onderaan. Beëindig de meeste sets met 1–3 herhalingen in reserve (RIR).',
  },
  upper_lower_4x: {
    name: 'Bovenlichaam / onderlichaam',
    desc: 'Effectief 4-dagenschema voor beginners en gevorderden. Elke spiergroep wordt 2× per week getraind.',
    why: 'De upper/lower-split is de beste balans tussen tijd en resultaat: 4 sessies per week leveren de frequentie van 2× per spiergroep, die volgens meta-analyses meer groei geeft dan 1×. Eerst de basisoefeningen, daarna gerichte isolatie.',
    progression: 'Dubbele progressie: verhoog eerst de herhalingen binnen het doelbereik en daarna het gewicht met 2,5 kg. Beëindig de basisoefeningen (squat, bench press, deadlift) met 2 RIR en isolatieoefeningen met 1 RIR. Las na 6–8 weken een lichte week in.',
  },
  split_5x: {
    name: '5-dagensplit',
    desc: 'Gevorderd 5-dagenschema met hoog volume per spiergroep. Voor ervaren sporters.',
    why: 'Voor gevorderden die meer volume nodig hebben: de 5-dagensplit maakt 15–20+ sets per spiergroep mogelijk, met volle focus op één gebied per sessie. Dosis-responsonderzoek laat zien dat ervaren sporters blijven groeien met meer sets per week.',
    progression: 'Dubbele progressie per oefening. Voeg daarnaast elke 3–4 weken een set toe aan de eerste oefening van de dag, zolang het herstel dat toelaat. Maak van week 10 een deload (gewichten −30 %, helft van de sets).',
  },
  fullbody_3x: {
    name: 'Full body 3×',
    desc: 'Perfect voor beginners: 3 full-body-trainingen per week met de belangrijkste basisoefeningen.',
    why: 'Voor beginners is full-body-training 3× per week het efficiëntste model: elke spiergroep krijgt 3× per week een prikkel, de basisoefeningen gaan snel vooruit door het vele oefenen, en drie sessies passen in elke agenda. Beginners groeien al betrouwbaar met een gematigd volume.',
    progression: 'Lineaire progressie: verhoog het gewicht elke sessie met 2,5 kg (onderlichaam) of 1,25–2,5 kg (bovenlichaam), zolang alle herhalingen netjes lukken. Lukt een oefening 2× achter elkaar niet, verlaag dan het gewicht met 10 % en bouw weer op.',
  },
  push_pull_4x: {
    name: 'Push / Pull 4×',
    desc: '4 trainingen per week, verdeeld in duw- en trekbewegingen. De benen zijn erin verwerkt.',
    why: 'Push/pull met geïntegreerde benen is het tijdbesparende alternatief voor PPL op 6 dagen: dezelfde frequentie van 2× per spiergroep, maar met maar 4 dagen in de gym. Quadriceps gaan bij push (squat = duwen), de achterste keten bij pull (deadlift = trekken): een biomechanisch zuivere indeling.',
    progression: 'Dubbele progressie: verhoog de herhalingen binnen het bereik en daarna het gewicht met 2,5 kg. Ga bij deadlift en squat voorzichtig vooruit (alleen als alle sets met 2 RIR lukken). Neem na week 8 een deloadweek voordat je de cyclus herhaalt.',
  },
  bro_split_5x: {
    name: 'Bro split',
    desc: 'Het klassieke bodybuildingschema: elke spiergroep krijgt een eigen dag met hoog volume.',
    why: 'De klassieke bodybuildingaanpak: één spiergroep per dag, met volle focus en veel volume in één sessie. Recent onderzoek laat zien dat bij gelijk weekvolume de verdeling bijzaak is: wie van de pump en de focus van eigen spierdagen houdt, groeit zo net zo goed.',
    progression: 'Dubbele progressie per oefening, de meeste sets tot 1–2 RIR. Omdat elke spiergroep maar 1× per week aan bod komt, telt elke sessie: noteer je gewichten consequent en haal elke week minstens één herhaling meer.',
  },
  couch_to_5k: {
    name: 'Van de bank naar 5 km',
    desc: 'Van nul naar 5 kilometer hardlopen in 9 weken, met loop- en wandelintervallen die elke week langer worden.',
    why: 'Het wereldwijd beproefde concept voor beginners: korte looptrajecten met wandelpauzes ertussen laten pezen, gewrichten en hart en bloedvaten wennen in plaats van ze te overbelasten. De opbouw is bewust rustig, en juist daardoor houden mensen het zo goed vol. Al kleine loopvolumes verlagen het sterfterisico meetbaar.',
    progression: 'Elke week worden de looptrajecten langer en de wandelpauzes korter: van 8×1 minuut hardlopen (week 1) tot 30 minuten aan één stuk (week 9). Loop de trajecten bewust langzaam (praattempo, RPE 5–6). Herhaal een week als die te zwaar voelt.',
  },
  norwegian_4x4: {
    name: 'Noorse 4×4',
    desc: 'Het VO₂max-protocol uit het onderzoek: 4 intervallen van 4 minuten op 90–95 % van de maximale hartslag.',
    why: 'Weinig protocollen zijn beter onderbouwd: intervallen van 4 minuten dicht bij de maximale hartslag zijn de sterkste bekende prikkel voor de VO₂max, de beste losse marker voor duurprestatie en levensduur. De actieve pauzes van 3 minuten houden de kwaliteit van de intervallen hoog. Werkt bij hardlopen, fietsen en roeien.',
    progression: 'Week 1–2: 3 intervallen om te wennen. Vanaf week 3: de volledige 4×4. Week 7–8: actieve pauze ingekort tot 2:30. Intensiteit: de laatste 2 minuten van elk interval moeten voelen als RPE 9, praten is dan niet meer mogelijk.',
  },
  interval_10_20_30: {
    name: '10-20-30-intervallen',
    desc: 'Het Deense concept: 30 s rustig, 20 s stevig, 10 s sprint. Sneller worden met de helft van het trainingsvolume.',
    why: 'Ontwikkeld aan de Universiteit van Kopenhagen: hardlopers werden sneller en fitter, ook al halveerden ze hun trainingsvolume. De sprints van maar 10 seconden geven een maximale prikkel, maar zijn zo kort dat de belasting goed te verwerken is. Ideaal als je weinig tijd hebt en sneller wilt worden.',
    progression: 'Eén blok = 5×(30 s rustig · 20 s stevig · 10 s sprint). Week 1–2: 2 blokken, week 3–4: 3 blokken, week 5–6: 4 blokken, met 2 minuten joggen tussen de blokken. De sprints van 10 seconden zijn bijna maximaal (RPE 9), de rest bewust rustig.',
  },
  zone2_base: {
    name: 'Zone 2-basis',
    desc: 'De duurbasis van de profs: rustige duursessies in hartslagzone 2 die week na week langer worden.',
    why: 'Duursporters van topniveau trainen ~80 % van hun volume precies hier: rustig genoeg om een gesprek te voeren. Zone 2 bouwt mitochondriën en vetverbranding op, het fundament waarop elke zware training pas werkt. De meest gemaakte fout van recreanten: deze sessies te snel lopen.',
    progression: 'De korte sessies groeien elke 2 weken met 5 minuten (25→40 min), de lange duurloop elke week met 5 minuten, met herstelweken (35→60 min). Tempocheck: je moet in hele zinnen kunnen praten (RPE 3–4, zone 2). Lukt dat niet, ga dan langzamer.',
  },
  '10k_training': {
    name: '10 km-training',
    desc: 'Gestructureerde voorbereiding op 10 km in 10 weken: intervallen, tempoloop, rustige loop en lange duurloop.',
    why: 'De klassieker van de loopplanning volgens het 80/20-principe: twee zware sessies per week (VO₂max-intervallen + tempoloop) geven de prestatieprikkel, twee rustige sessies bouwen de duurbasis op. De lange duurloop groeit geleidelijk met herstelweken, en de laatste twee weken wordt er getaperd, zodat je fris aan de start staat.',
    progression: 'Intervallen: van 4 naar 6×3 minuten (RPE 9). Tempoloop: van 15 naar 25 minuten „comfortabel zwaar” (RPE 7). Lange duurloop: van 40 naar 70 minuten rustig, met herstel in week 4 en 7. Week 9–10: taperen, minder volume en meer frisheid. De rustige loop op donderdag blijft altijd rustig.',
  },
  tabata_classic: {
    name: 'Tabata classic',
    desc: 'Het originele Tabata-protocol: 20 seconden alles geven, 10 seconden pauze, met een groeiend aantal rondes.',
    why: 'Het bekendste HIIT-protocol ter wereld, in 1996 onderzocht bij Japanse schaatsers: 8 rondes van 20/10 verbeterden tegelijk de aerobe ÉN de anaerobe capaciteit, iets wat gematigde duurtraining niet kan. Intensiteit is alles: „alles geven” betekent echt alles geven.',
    progression: 'Week 1–2: 8 rondes (1 Tabata-blok, 4 minuten). Week 3–4: 12 rondes. Week 5–6: 16 rondes (2 blokken). Elke werkfase op RPE 9–10: lukken de laatste rondes niet meer met nette techniek, blijf dan nog een week op het huidige niveau.',
  },
  gibala_sit: {
    name: 'Gibala-protocol 60/75',
    desc: 'De „praktische SIT” uit het onderzoek: 8–12 intervallen van 60 seconden zwaar met 75 seconden pauze.',
    why: 'De onderzoeksgroep van Martin Gibala toonde aan dat een paar minuten intensieve intervallen vergelijkbare cellulaire aanpassingen opwekken als een veelvoud aan klassieke duurtraining. De 60/75-variant is de versie voor elke dag: zwaar, maar zonder maximale sprints, en daardoor veilig en geschikt voor full-body-oefeningen.',
    progression: 'Week 1–2: 8 intervallen. Week 3–4: 10 intervallen. Week 5–6: 12 intervallen. Werkfases op RPE 8–9 („heel zwaar, maar 60 seconden vol te houden”); blijf in de pauzes licht bewegen in plaats van stil te staan.',
  },
  hiit_beginner: {
    name: 'HIIT voor beginners 30/30',
    desc: 'Rustige kennismaking met intervaltraining: 30 seconden werk en 30 seconden pauze, van 6 tot 10 rondes.',
    why: 'De verhouding 1:1 tussen werk en pauze is de ideale start met HIIT: intensief genoeg voor de bewezen effecten op je conditie, maar met genoeg herstel om de techniek netjes te houden. Volgens meta-analyses verbetert HIIT de conditie bijna twee keer zo sterk als gematigde duurtraining, in een fractie van de tijd.',
    progression: 'Week 1–2: 6 rondes. Week 3–4: 8 rondes. Week 5–6: 10 rondes. Werkfases op RPE 7–8: aan het eind van elke pauze moet je weer klaar zijn. Kwaliteit boven snelheid: nette herhalingen tellen meer dan veel herhalingen.',
  },
  hiit_advanced: {
    name: 'HIIT voor gevorderden 40/15',
    desc: 'Intensieve HIIT voor gevorderden: 40 seconden werk, maar 15 seconden pauze, tot 12 rondes.',
    why: 'De korte pauze (bijna 3:1) houdt de hartslag de hele tijd hoog, zodat je traint om onder vermoeidheid te blijven presteren. Vier thematische sessies per week (power, core, benen, full body) verdelen de belasting over verschillende spiergroepen.',
    progression: 'Week 1–2: 8 rondes. Week 3–6: 10 rondes. Week 7–8: 12 rondes. Werkfases op RPE 8–9. Gaat de techniek onderuit, stop de ronde dan eerder: blessurevrij blijven is belangrijker dan het aantal rondes.',
  },
  emom_challenge: {
    name: 'EMOM-challenge',
    desc: 'Every Minute On the Minute: elke minuut begint een nieuwe oefening, en je pauze is wat er van de minuut overblijft.',
    why: 'EMOM heeft het tempo ingebouwd: wie sneller werkt, verdient meer pauze. Dat houdt de dichtheid hoog en leert je je krachten te verdelen. Full-body-intervallen van dit soort verbeteren uithoudingsvermogen en spieruithoudingsvermogen tegelijk, zoals studies naar minimalistische full-body-protocollen laten zien.',
    progression: 'Week 1–2: basisrondes (10–15, afhankelijk van de dag). Week 3–4: +2 rondes. Week 5–6: nog eens +2 rondes. Kies het aantal herhalingen per minuut zo dat er ~15–20 seconden pauze overblijft; blijft er geen pauze over, verlaag dan de herhalingen.',
  },
  boxing_basics: {
    name: 'Boksen: basis',
    desc: 'Leer de basis van het boksen: jab, cross, hoeken en voetenwerk, in klassieke rondes van 3 minuten.',
    why: 'Bokstraining in rondes van 3 minuten is verkapte HIIT: de hartslag schommelt tussen intensief werk en korte pauze, terwijl je tegelijk coördinatie en techniek leert. Elke sessie heeft een eigen focus, zodat je week na week een nette basis opbouwt.',
    progression: 'Week 1–2: 6 rondes (vrijdag 8). Week 3–4: +1 ronde per sessie. Week 5–6: nog +1 ronde. Eerst techniek, dan tempo: oefen combinaties eerst langzaam en netjes, daarna sneller. De laatste ronde van elke sessie mag pure conditie zijn.',
    fokus: {
      mon: 'Basisstoten en stand',
      wed: 'Combinaties en slagkracht',
      fri: 'Rondeduur',
    },
  },
  kickboxing_conditioning: {
    name: 'Kickboksen: conditie',
    desc: 'Kickbokstraining gericht op conditie en techniek: trappen, stoten en combinaties in rondes.',
    why: 'Kickboksen combineert boven- en onderlichaam als bijna geen andere sport: trappen vragen benen, heupen en core, stoten schouders en armen. Studies laten zien dat kickboksrondes de hartslag dicht bij het maximum brengen: je krijgt HIIT-effecten en mobiliteit in één.',
    progression: 'Week 4: +1 ronde in elke sessie. Week 7: nog +1 ronde. Techniekdagen gaan voor conditiedagen: leer nieuwe trappen eerst langzaam in de lucht voordat je ze onder vermoeidheid uitvoert. Rek elke dag even je heupen.',
    fokus: {
      mon: 'Traptechniek',
      tue: 'Explosiviteit en uithoudingsvermogen',
      thu: 'Stoot-trapcombinaties',
      sat: 'Gevechtssimulatie',
    },
  },
  mma_fundamentals: {
    name: 'MMA: basis',
    desc: 'Instap in mixed martial arts: stoten, trappen en vechtspecifieke conditie samen in één week.',
    why: 'MMA is de veelzijdigste vechtsport: stoten, trappen en grondwerk vragen kracht, snelheid en uithoudingsvermogen tegelijk. De sportwetenschap raadt precies aan wat dit programma biedt: rondetraining met wisselende focus plus een eigen conditiedag met sprawls en touwtjespringen.',
    progression: 'Week 4: striking van 8 naar 9 rondes, conditie van 5 naar 6 rondes. Week 7: trappen van 6 naar 7 rondes. De lange zaterdag (rondes van 5 minuten zoals in echte MMA) blijft gelijk: daar gaat het om kwaliteit onder vermoeidheid, niet om meer volume.',
    fokus: {
      mon: 'Stoottechniek',
      tue: 'Trappen en knieën',
      thu: 'Vechtconditie',
      sat: 'Rondes van 5 minuten zoals in een echt gevecht',
    },
  },
  boxing_advanced: {
    name: 'Boksen voor gevorderden',
    desc: 'Bokstraining voor gevorderden: meer volume, langere sessies en complexe combinaties.',
    why: 'Op gevorderd niveau beslist de werkcapaciteit: topboksers halen VO₂max-waarden rond 60 ml/kg/min, opgebouwd met precies deze structuur van techniek-, bokszak- en conditierondes. De sparringsimulatie op zaterdag brengt alles samen onder vermoeidheid zoals in een gevecht.',
    progression: 'Week 4: techniek en bokszak +1 ronde. Week 7: nog +1 ronde, conditie van 8 naar 10 rondes. Week 9–10: houd het volume gelijk en verhoog de intensiteit van de combinaties (sneller, harder, minder pauze tussen de combinaties).',
    fokus: {
      mon: 'Complexe combinaties',
      tue: 'Slagkracht en ritme',
      fri: 'Werkcapaciteit',
      sat: 'Alles onder vermoeidheid',
    },
  },
  combat_fitness: {
    name: 'Combat Fitness',
    desc: 'Fitnesstraining geïnspireerd op vechtsport, zonder voorkennis: boks- en trapelementen als full-body-training.',
    why: 'De instap voor iedereen die de conditie van vechtsporters wil zonder wedstrijdambitie: schaduwboksen, trappen en oefeningen met eigen lichaamsgewicht in korte rondes van 2 minuten. Rondetraining werkt fysiologisch als intervaltraining, met als extra motivatie dat je echte technieken leert.',
    progression: 'Week 3: 1 ronde meer per sessie. Week 5: rondes van 2:00 naar 2:30. Houd de pauzes gedisciplineerd op 60 seconden: het effect op je conditie komt uit de verhouding tussen werk en pauze.',
    fokus: {
      mon: 'Stoten en bovenlichaam',
      wed: 'Trappen en benen',
      sat: 'Alles gecombineerd',
    },
  },
};
