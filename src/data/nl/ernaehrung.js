// Nederlandse versie van `src/data/nutritionKnowledge.js`.
// Sleutel = `id` uit het databestand, de volgorde van de `sections` moet
// overeenkomen. Controleren met: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Basis',
    makros: 'Macronutriënten',
    mikros: 'Micronutriënten',
    praxis: 'Praktijk',
  },

  energy_balance: {
    name: 'Energiebalans & calorieën',
    summary: 'De energiebalans, ingenomen calorieën tegenover verbruikte calorieën, bepaalt of je aankomt of afvalt. Het is het belangrijkste principe van voeding en staat boven alle andere details.',
    quick: [
      { label: 'Kernidee', text: 'Tekort → afvallen, overschot → aankomen, onderhoud → stabiel. Calorieën zijn koning.' },
      { label: 'Praktijk', text: 'TDEE schatten, doel bepalen, 2–3 weken observeren, dan bijstellen.' },
    ],
    sections: [
      {
        title: 'Het principe van de energiebalans',
        content: 'De energiebalans beschrijft de verhouding tussen de energie die je via voeding binnenkrijgt en de energie die je lichaam verbruikt. Krijg je meer binnen dan je verbruikt (overschot), dan slaat het lichaam de extra energie op, vooral als vet. Verbruik je meer dan je binnenkrijgt (tekort), dan spreekt het reserves aan en val je af.\n\nDit principe berust op de eerste hoofdwet van de thermodynamica: energie gaat niet verloren, ze wordt alleen omgezet. Talrijke gecontroleerde studies bevestigen dat de energiebalans de doorslaggevende factor is voor gewichtsverandering, ongeacht uit welke voedingsmiddelen de calorieën komen (Hall & Guo, 2017, Gastroenterology).\n\nDat betekent niet dat de kwaliteit van je voeding er niet toe doet. Die beïnvloedt verzadiging, gezondheid, prestaties en hoe makkelijk je een bepaald calorieniveau volhoudt. Maar voor de pure vraag ‘aankomen of afvallen’ telt de totale caloriebalans.',
      },
      {
        title: 'De onderdelen van je calorieverbruik',
        content: 'Het totale dagelijkse energieverbruik (TDEE) bestaat uit vier delen. Het basaalmetabolisme (BMR) is met 60–70% het grootste aandeel: de energie die het lichaam in rust nodig heeft voor vitale functies zoals ademhaling, bloedsomloop en celstofwisseling.\n\nHet thermisch effect van voeding (TEF) is goed voor ongeveer 10%: energie die nodig is om voedsel te verteren en te verwerken. Eiwit heeft het hoogste thermisch effect, een van de redenen waarom een eiwitrijk dieet helpt bij vetverlies.\n\nHet derde en meest variabele deel is activiteit. Daarbij onderscheidt men sport (EAT) en dagelijkse beweging (NEAT, Non-Exercise Activity Thermogenesis) zoals lopen, friemelen en staan. NEAT kan tussen mensen honderden calorieën per dag verschillen en past zich bij een calorietekort vaak onbewust aan doordat je minder beweegt.',
      },
      {
        title: 'Je caloriebehoefte schatten',
        content: 'Om je behoefte te schatten, bereken je eerst het basaalmetabolisme, bijvoorbeeld met de formule van Mifflin-St Jeor, en vermenigvuldig je dat met een activiteitsfactor (1,2 bij zeer zittend tot ~1,9 bij zeer actief). Het resultaat is je geschatte TDEE: het aantal calorieën waarbij je gewicht stabiel blijft.\n\nBelangrijk: zulke formules geven alleen benaderingen. Het werkelijke verbruik kan tussen mensen 10–20% verschillen. De beginwaarde is dus alleen een startpunt, geen exacte routekaart.\n\nDe betrouwbaarste aanpak is je lichaamsgewicht twee tot drie weken te volgen bij een constante calorie-inname. Blijft het stabiel, dan heb je je onderhoudsniveau gevonden. Stijgt of daalt het, pas de calorieën dan met ongeveer 200–300 aan. Zo stem je de theorie af op jouw werkelijkheid.',
      },
      {
        title: 'Veelvoorkomende misverstanden',
        content: 'Een veelvoorkomende vergissing is het geloof in een ‘kapotte’ of extreem trage stofwisseling. Echte stofwisselingsstoornissen zijn zeldzaam; meestal wordt het calorieverbruik overschat en de inname onderschat. Studies laten zien dat mensen hun calorie-inname vaak met 20–50% onderschatten (Lichtman et al., 1992, New England Journal of Medicine).\n\nEen tweede vergissing: dat bepaalde voedingsmiddelen ‘de stofwisseling aanjagen’ en vet laten smelten. Zulke effecten zijn minimaal en veranderen de basisvergelijking niet. Geen enkel voedingsmiddel of drankje zet de energiebalans buitenspel.\n\nTen derde is metabole aanpassing echt, maar beperkt: bij een aanhoudend tekort daalt het verbruik iets (adaptieve thermogenese), maar dat verklaart geen volledige plateaus. Wie niet afvalt terwijl hij denkt in een tekort te zitten, eet meestal meer dan aangenomen.',
      },
      {
        title: 'Samenvatting',
        content: 'De energiebalans is het fundament van alle voeding: een tekort laat je afvallen, een overschot laat je aankomen, onderhoud houdt je gewicht stabiel. Alle verdere details (macro’s, timing, voedselkeuze) werken binnen dit kader.\n\nSchat je behoefte met een formule, maar zie de waarde alleen als startpunt en kalibreer haar aan de hand van je werkelijke gewichtsverandering. Meten en bijstellen in plaats van alleen op theorie te vertrouwen.\n\nVoedselkwaliteit, eiwit en verzadiging bepalen hoe prettig en gezond je een calorieniveau volhoudt, maar of je aankomt of afvalt, beslist de balans. Wie dit principe begrijpt, wordt onafhankelijk van dieethypes.',
      },
    ],
  },

  protein: {
    name: 'Eiwit',
    summary: 'Eiwit is de belangrijkste macronutriënt voor het opbouwen en behouden van spiermassa. Het verzadigt het meest, heeft het hoogste thermisch effect en beschermt je spieren tijdens vetverlies. Voor sporters is ongeveer 1,6–2,2 g per kilogram lichaamsgewicht ideaal.',
    quick: [
      { label: 'Doel', text: 'Ongeveer 1,6–2,2 g per kg lichaamsgewicht per dag; tijdens een dieet richting de bovenkant.' },
      { label: 'Bronnen', text: 'Vlees, vis, eieren, zuivel, peulvruchten, tofu, whey/eiwitpoeder.' },
    ],
    sections: [
      {
        title: 'Waarom eiwit zo belangrijk is',
        content: 'Eiwitten bestaan uit aminozuren, de bouwstenen van spieren, enzymen, hormonen en vrijwel elke structuur in het lichaam. Negen van deze aminozuren zijn essentieel: het lichaam kan ze niet zelf aanmaken, ze moeten uit de voeding komen.\n\nVoor sporters is eiwit extra belangrijk, omdat het de spiereiwitsynthese stimuleert, het proces waarmee na de training nieuwe spiermassa wordt opgebouwd. Zonder genoeg eiwit kan zelfs harde training nauwelijks in spiergroei worden omgezet.\n\nDaarnaast heeft eiwit twee praktische voordelen voor gewichtsbeheersing: het verzadigt meer dan koolhydraten of vet en heeft het hoogste thermisch effect (ongeveer 20–30% van de eiwitcalorieën gaat op aan de vertering). Beide maken het de waardevolste macronutriënt tijdens een dieet.',
      },
      {
        title: 'Hoeveel eiwit heb je nodig?',
        content: 'Het officiële minimum om tekorten te vermijden is 0,8 g per kilogram lichaamsgewicht, maar dat is voor sporters verre van optimaal. Een uitgebreide meta-analyse van Morton et al. (2018, British Journal of Sports Medicine) vond dat ongeveer 1,6 g/kg het grootste voordeel voor spieropbouw geeft, met mogelijk extra voordeel tot ongeveer 2,2 g/kg.\n\nTijdens een dieet is de bovenkant aan te raden. In een calorietekort stijgt de behoefte, omdat eiwit de spieren tegen afbraak beschermt. Helms et al. (2014) adviseren sporters in een tekort tot 2,3–3,1 g per kilogram vetvrije massa.\n\nVoor de meeste sporters is een eenvoudige richtlijn van ongeveer 2 g per kilogram lichaamsgewicht praktisch en effectief. Meer schaadt gezonde mensen niet, maar levert weinig extra voordeel op.',
      },
      {
        title: 'Kwaliteit en verdeling',
        content: 'Niet alle eiwitbronnen zijn gelijk. De ‘kwaliteit’ hangt af van het gehalte aan essentiële aminozuren, vooral leucine, en van de verteerbaarheid. Dierlijke bronnen (vlees, vis, eieren, zuivel) zijn meestal compleet; plantaardige bronnen zijn vaak beperkt in afzonderlijke aminozuren, maar kun je door combineren aanvullen (bijv. peulvruchten plus granen).\n\nOok de verdeling over de dag telt. De spiereiwitsynthese wordt per maaltijd maximaal gestimuleerd door ongeveer 20–40 g hoogwaardig eiwit. Het is daarom zinvol eiwit over drie tot vijf maaltijden te verdelen in plaats van alles in één keer te eten.\n\nIn de praktijk betekent dit: elke hoofdmaaltijd hoort een goede eiwitbron te bevatten. De totale hoeveelheid over de dag blijft echter de belangrijkste factor; een perfecte verdeling is ondergeschikt aan het halen van je dagdoel.',
      },
      {
        title: 'Mythes en veiligheid',
        content: 'Een hardnekkige mythe is dat veel eiwit de nieren beschadigt. Bij gezonde mensen wordt dat niet ondersteund: gecontroleerde studies tonen geen nadelige effecten van een hoge eiwitinname op de nierfunctie (Devries et al., 2018, Journal of Nutrition). Alleen bij een bestaande nierziekte is overleg met een arts nodig.\n\nEen andere mythe: dat het lichaam per maaltijd maar ongeveer 30 g eiwit kan ‘gebruiken’. In werkelijkheid wordt meer verteerd en benut; alleen de directe prikkel op de spiereiwitsynthese vlakt af. Grotere porties zijn dus niet verspild.\n\nEiwitpoeders zoals whey zijn handig, maar geen must. Ze zijn gewoon een praktische, goedkope eiwitbron. Wie zijn behoefte met gewone voeding dekt, heeft geen supplementen nodig: ze zijn gereedschap, geen wondermiddel.',
      },
      {
        title: 'Samenvatting',
        content: 'Eiwit is de sleutelmacronutriënt voor spieropbouw, spierbehoud en verzadiging. Voor sporters is ongeveer 1,6–2,2 g per kilogram lichaamsgewicht ideaal, tijdens een dieet richting de bovenkant.\n\nKies hoogwaardige bronnen, verdeel eiwit over meerdere maaltijden en haal vooral je dagdoel. Of het dierlijk of plantaardig is, is bijzaak zolang hoeveelheid en kwaliteit kloppen.\n\nDe gangbare waarschuwingen voor ‘te veel’ eiwit zijn voor gezonde mensen ongegrond. Eiwit is de macronutriënt waarbij precisie het meest loont: het maakt het grootste verschil voor je lichaamssamenstelling en verzadiging.',
      },
    ],
  },

  carbs: {
    name: 'Koolhydraten',
    summary: 'Koolhydraten zijn de belangrijkste energiebron voor intensieve training. Ze maken op zich niet ‘dik’; de totale caloriebalans is wat telt. Kwaliteit, hoeveelheid en timing kunnen prestaties en welzijn wel merkbaar beïnvloeden.',
    quick: [
      { label: 'Functie', text: 'Hoofdbrandstof bij intensieve inspanning; vullen de glycogeenvoorraden in spieren en lever.' },
      { label: 'Praktijk', text: 'Vooral vezelrijke, weinig bewerkte bronnen; hoeveelheid afstemmen op je activiteit.' },
    ],
    sections: [
      {
        title: 'Wat koolhydraten in het lichaam doen',
        content: 'Koolhydraten worden afgebroken tot glucose, de favoriete brandstof voor intensief spierwerk en de belangrijkste energiebron voor de hersenen. Overtollige glucose wordt als glycogeen opgeslagen in spieren en lever, een snel beschikbare energiereserve.\n\nBij intensieve kracht- en intervaltraining put het lichaam flink uit dit spierglycogeen. Goed gevulde voorraden betekenen meer prestatie, meer herhalingen en een betere trainingskwaliteit. Bij een langdurig lage koolhydraatinname kunnen deze voorraden deels leeglopen en kan de prestatie bij hoge intensiteit dalen.\n\nStrikt genomen zijn koolhydraten echter niet essentieel: het lichaam kan zelf glucose aanmaken. Voor sportprestaties en welzijn zijn ze voor de meeste mensen toch erg nuttig, vooral bij intensieve training.',
      },
      {
        title: 'Kwaliteit: complexe vs. enkelvoudige koolhydraten',
        content: 'Koolhydraatbronnen verschillen sterk in hun effect. Vezelrijke, weinig bewerkte bronnen zoals volkoren granen, peulvruchten, fruit en groenten worden langzamer verteerd, verzadigen beter en leveren micronutriënten. Sterk bewerkte bronnen zoals suiker en witmeelproducten worden snel opgenomen en verzadigen nauwelijks.\n\nVezels verdienen speciale aandacht. Ze ondersteunen de spijsvertering, voeden de darmbacteriën en verbeteren de verzadiging. Aanbevolen wordt ongeveer 25–35 g per dag, en veel mensen halen dat bij lange na niet. Een vezelrijk dieet hangt samen met een betere gezondheid en een makkelijkere gewichtsbeheersing.\n\nDat betekent niet dat enkelvoudige koolhydraten verboden zijn. Rond de training kunnen snel beschikbare koolhydraten zelfs nuttig zijn. In het dagelijks leven hoort het grootste deel echter uit voedzame, vezelrijke bronnen te komen.',
      },
      {
        title: 'Hoeveel koolhydraten?',
        content: 'Na eiwit en vet kun je de resterende calorieën van je doel met koolhydraten opvullen. Er is geen vaste ‘juiste’ hoeveelheid: het hangt af van activiteit, voorkeuren en doelen. Zeer actieve mensen hebben baat bij meer koolhydraten; minder actieve mensen kunnen met minder toe.\n\nVoor intensieve sporters wordt vaak 3–5 g per kilogram lichaamsgewicht of meer genoemd. Wie weinig sport of liever minder koolhydraten eet, kan daar zonder nadeel ruim onder zitten, zolang eiwit en totale calorieën kloppen.\n\nLow-carb- en ketogene diëten werken bij gelijke calorieën net zo goed voor vetverlies als diëten met meer koolhydraten. Ze zijn geen magische vetverbrander, maar een legitieme optie voor mensen die zich er beter bij voelen of er meer verzadiging van ervaren.',
      },
      {
        title: 'De insulinemythe',
        content: 'Een wijdverbreide mythe beweert dat koolhydraten alleen al door de afgifte van insuline dik maken. Insuline is een opslaghormoon dat na koolhydraatrijke maaltijden stijgt; daaruit werd de theorie afgeleid dat koolhydraten de eigenlijke oorzaak van vettoename zijn.\n\nGecontroleerde studies weerleggen dat echter duidelijk. Bij gelijke calorieën en eiwit leidt een koolhydraatarm dieet niet tot meer vetverlies dan een koolhydraatrijk dieet (Hall et al., 2016, American Journal of Clinical Nutrition). Insuline stuurt opslagprocessen op korte termijn, maar zet de totale energiebalans niet buitenspel.\n\nVoor gezonde mensen zijn normale insulinereacties op koolhydraten volkomen onproblematisch. Anders ligt het bij diabetes of insulineresistentie: daar is het omgaan met koolhydraten medisch relevant en hoort een arts het te begeleiden.',
      },
      {
        title: 'Samenvatting',
        content: 'Koolhydraten zijn de hoofdbrandstof voor intensieve training en maken op zich zeker niet dik: de caloriebalans beslist. Ze vullen de glycogeenvoorraden en ondersteunen prestaties en herstel.\n\nKies vooral vezelrijke, weinig bewerkte bronnen en stem de hoeveelheid af op je activiteit. Rond de training kunnen snellere koolhydraten nuttig zijn.\n\nNoch low-carb noch high-carb is op zich beter: beide werken met passende calorieën. Kies de aanpak waarbij je je goed voelt, goed traint en die je op lange termijn volhoudt.',
      },
    ],
  },

  fats: {
    name: 'Vetten',
    summary: 'Vet uit voeding is onmisbaar voor hormonen, celmembranen en de opname van vetoplosbare vitamines. Een minimum is belangrijk voor je gezondheid; het soort vet telt meer dan de pure hoeveelheid.',
    quick: [
      { label: 'Minimum', text: 'Op lange termijn niet onder ~0,5–0,8 g per kg lichaamsgewicht zakken (hormoonfunctie).' },
      { label: 'Kwaliteit', text: 'Kies onverzadigde vetten (olijfolie, noten, vis); vermijd transvetten.' },
    ],
    sections: [
      {
        title: 'De rol van vet uit voeding',
        content: 'Vet is veel meer dan een energiedrager. Het is een bouwsteen van elke celmembraan, een voorloper van steroïdhormonen zoals testosteron en oestrogeen, en nodig voor de opname van de vetoplosbare vitamines A, D, E en K. Een zeer vetarm dieet kan daardoor de hormoonaanmaak en de opname van voedingsstoffen verstoren.\n\nMet 9 calorieën per gram is vet de meest energierijke macronutriënt, meer dan twee keer zoveel als eiwit of koolhydraten (elk 4 kcal). Daardoor krijg je via vet makkelijk ongemerkt veel calorieën binnen, en daarom helpt een bewuste omgang ermee tijdens een dieet.\n\nTwee vetzuren zijn essentieel: omega-3 en omega-6. Het lichaam kan ze niet zelf aanmaken. Vooral omega-3-vetzuren uit vette vis krijgen veel mensen te weinig binnen, terwijl ze met talrijke gezondheidsvoordelen in verband worden gebracht.',
      },
      {
        title: 'Soorten vet',
        content: 'Onverzadigde vetten gelden als bijzonder gunstig. Enkelvoudig onverzadigde vetten (olijfolie, avocado, noten) en meervoudig onverzadigde vetten (vette vis, lijnzaad, walnoten) ondersteunen de hartgezondheid en leveren essentiële vetzuren. Ze horen het grootste deel van je vetinname uit te maken.\n\nVerzadigde vetten (in vlees, boter, kokosolie) zijn op zich niet schadelijk, maar eet je beter met mate. De meeste vakorganisaties adviseren minder dan 10% van de totale calorieën. Het bewijs over hun precieze effect is omstreden, maar een deel ervan vervangen door onverzadigde vetten geldt als gunstig.\n\nKunstmatige transvetten zijn de enige soort vet die je duidelijk moet vermijden. Ze ontstaan bij het industrieel harden van oliën en hangen sterk samen met hart- en vaatziekten. In veel landen zijn ze inmiddels streng gereguleerd of verboden.',
      },
      {
        title: 'Hoeveel vet?',
        content: 'Anders dan bij eiwit geldt bij vet vooral een ondergrens. Een blijvend zeer vetarm dieet (onder ongeveer 0,5 g per kilogram lichaamsgewicht) kan bij sommige mensen de hormoonaanmaak verstoren. Een zinvol minimum ligt rond 0,5–0,8 g per kilogram.\n\nNaar boven is vet flexibel. Zodra eiwit vastligt, kun je de resterende calorieën naar voorkeur verdelen over vet en koolhydraten. De een voelt zich beter met meer vet en minder koolhydraten, de ander juist andersom; beide zijn gezond.\n\nGangbare aanbevelingen liggen rond 20–35% van de totale calorieën uit vet. Belangrijker dan het exacte percentage is dat je het minimum haalt, vooral hoogwaardige vetten kiest en de totale calorieën in de gaten houdt.',
      },
      {
        title: 'Omega-3 in de schijnwerpers',
        content: 'Onder de vetten verdienen de omega-3-vetzuren EPA en DHA speciale aandacht. Ze werken ontstekingsremmend en worden in verband gebracht met een betere hart-, vaat- en hersengezondheid. De belangrijkste bron is vette koudwatervis zoals zalm, makreel en haring.\n\nVeel mensen krijgen te weinig omega-3 binnen en tegelijk veel omega-6 (uit bewerkte oliën), waardoor de verhouding ongunstig verschuift. Twee tot drie porties vette vis per week verbeteren de voorziening merkbaar.\n\nWie geen vis eet, kan een algen- of visoliesupplement overwegen. Plantaardige omega-3-bronnen (lijnzaad, walnoten) leveren ALA, dat het lichaam maar beperkt omzet in de actieve vormen EPA en DHA. Bij gezondheidsvragen over suppletie is overleg met een arts aan te raden.',
      },
      {
        title: 'Samenvatting',
        content: 'Vet is onmisbaar voor hormonen, celmembranen en de opname van vitamines. Zak op lange termijn niet onder ongeveer 0,5–0,8 g per kilogram lichaamsgewicht, anders kunnen hormoonfunctie en welzijn eronder lijden.\n\nDe kwaliteit van vet telt: kies onverzadigde vetten uit olijfolie, noten, avocado en vette vis, houd verzadigde vetten gematigd en vermijd kunstmatige transvetten. Let vooral op een voldoende omega-3-inname.\n\nBoven het minimum is de hoeveelheid vet flexibel en een kwestie van smaak. Kies de verdeling tussen vet en koolhydraten naar je voorkeur en houd de totale calorieën op koers.',
      },
    ],
  },

  micronutrients: {
    name: 'Vitamines & mineralen',
    summary: 'Micronutriënten leveren geen energie, maar zijn onmisbaar voor talloze lichaamsfuncties. Een gevarieerd dieet met onbewerkte voeding dekt meestal de behoefte, maar een paar voedingsstoffen verdienen speciale aandacht.',
    quick: [
      { label: 'Basisregel', text: 'Een gevarieerd aanbod aan groenten, fruit, volkoren granen en eiwitbronnen dekt de meeste micronutriënten.' },
      { label: 'Let op', text: 'Vitamine D, omega-3, eventueel ijzer (vrouwen), B12 (veganisten), jodium, magnesium.' },
    ],
    sections: [
      {
        title: 'Wat micronutriënten zijn',
        content: 'Micronutriënten omvatten vitamines en mineralen die het lichaam maar in kleine hoeveelheden nodig heeft, anders dan de macronutriënten (eiwit, koolhydraten, vet), die energie leveren. Hoewel ze geen calorieën bevatten, zijn ze betrokken bij vrijwel elk stofwisselingsproces: energieproductie, afweer, botgezondheid, zuurstoftransport en nog veel meer.\n\nEen tekort aan micronutriënten kan sluipend ontstaan, met vermoeidheid, slechter herstel, vatbaarheid voor infecties of dalende prestaties. Vooral bij een caloriearm of eenzijdig dieet stijgt het risico op een tekort.\n\nHet goede nieuws: een gevarieerd dieet met veel groenten, fruit, volkoren granen, hoogwaardige eiwitbronnen en gezonde vetten dekt van nature de behoefte aan de meeste micronutriënten. Afwisseling in je voeding is de beste verzekering tegen tekorten.',
      },
      {
        title: 'Kritieke voedingsstoffen in de gaten houden',
        content: 'Sommige micronutriënten zijn zelfs bij een goed dieet vaak schaars. Vitamine D wordt vooral onder invloed van zonlicht aangemaakt en is in veel regio’s, vooral in de winter, onvoldoende aanwezig. Suppletie is hier vaak zinvol, idealiter na een bloedtest.\n\nIJzer is een aandachtspunt voor menstruerende vrouwen, omdat het regelmatige bloedverlies de behoefte verhoogt. Een tekort uit zich in vermoeidheid en dalende prestaties. Vitamine B12 komt bijna uitsluitend in dierlijke producten voor; wie veganistisch leeft, moet het aanvullen.\n\nAndere vaak schaarse voedingsstoffen zijn jodium, magnesium, zink en omega-3. In plaats van zomaar alles aan te vullen, kun je beter gericht naar je eigen behoefte kijken, idealiter via bloedwaarden en in overleg met een arts.',
      },
      {
        title: 'Voeding gaat voor supplementen',
        content: 'Als regel geldt: onbewerkte voeding verdient de voorkeur boven supplementen. Ze levert micronutriënten in een natuurlijke matrix met vezels, plantenstoffen en andere stoffen die samenwerken. Eén enkele vitamine in pilvorm kan die complexiteit niet vervangen.\n\nStudies naar geïsoleerde vitaminepreparaten laten bij gezonde mensen zonder tekort vaak teleurstellende of geen voordelen zien, soms zelfs nadelen bij overdosering. Meer is niet beter: vetoplosbare vitamines (A, D, E, K) kunnen zich ophopen en in hoge doses schadelijk zijn.\n\nSupplementen zijn zinvol bij een werkelijk tekort of een verhoogde behoefte, zoals vitamine D in de winter, B12 bij een veganistisch dieet of ijzer bij een aangetoond tekort. Als gerichte aanvulling zijn ze nuttig, als vervanging van goede voeding niet.',
      },
      {
        title: 'Praktische uitvoering',
        content: 'De eenvoudigste strategie voor een goede voorziening met micronutriënten is afwisseling en kleur. Groenten en fruit in verschillende kleuren leveren verschillende vitamines en plantenstoffen; ‘eet de regenboog’ is een praktische vuistregel.\n\nConcreet helpt het om bij elke hoofdmaaltijd groenten te eten, regelmatig peulvruchten, noten en zaden toe te voegen, verschillende eiwitbronnen af te wisselen en volkoren granen te verkiezen boven sterk bewerkte producten. Zo ontstaat bijna vanzelf een brede basis aan voedingsstoffen.\n\nWie veel bewerkt en eenzijdig eet, riskeert tekorten ondanks voldoende calorieën, een fenomeen dat soms wordt omschreven als ‘overvoed en ondervoed’. De kwaliteit van je voeding is dus de sleutel tot een robuuste voorziening met micronutriënten.',
      },
      {
        title: 'Samenvatting',
        content: 'Micronutriënten leveren geen energie, maar zijn onmisbaar voor gezondheid, herstel en prestaties. Een gevarieerd dieet met onbewerkte voeding dekt de behoefte aan de meeste vitamines en mineralen.\n\nVitamine D, omega-3 en, afhankelijk van de situatie, ijzer, B12, jodium en magnesium verdienen speciale aandacht. In plaats van overal maar aan te vullen, loont een gerichte blik op je eigen behoefte, idealiter via bloedwaarden.\n\nOnbewerkte voeding gaat voor supplementen. Afwisseling en kleur op je bord zijn de beste en eenvoudigste strategie voor een goede voorziening met micronutriënten.',
      },
    ],
  },

  meal_timing: {
    name: 'Timing van maaltijden',
    summary: 'Wanneer en hoe vaak je eet, telt veel minder dan wat en hoeveel. Timing kan prestaties en welzijn fijnafstellen, maar vervangt nooit de basis van calorieën en eiwit.',
    quick: [
      { label: 'Prioriteit', text: 'Eerst totale calorieën en eiwit: timing is fijnafstelling, niet het fundament.' },
      { label: 'Nuttig', text: 'Verdeel eiwit over de dag; eet voldoende rond je training.' },
    ],
    sections: [
      {
        title: 'Alles in perspectief',
        content: 'Rond de timing van maaltijden bestaan veel mythes, van het ‘anabole venster’ direct na de training tot het verbod op koolhydraten ’s avonds. In werkelijkheid is timing een factor voor fijnafstelling die pas telt als de basis klopt: totale calorieën, eiwit en voedselkwaliteit.\n\nDe hiërarchie van voeding is duidelijk: eerst de energiebalans, dan de macronutriënten (vooral eiwit), dan voedselkwaliteit en micronutriënten, en pas daarna timing en maaltijdfrequentie. Wie de bovenste niveaus verwaarloost, kan met perfecte timing niets meer redden.\n\nDat betekent niet dat timing nutteloos is. Ze kan prestaties, verzadiging en welzijn verbeteren. Maar ze is de laatste, kleinste hefboom, geen reden voor stress of ingewikkelde regels.',
      },
      {
        title: 'Het ‘anabole venster’',
        content: 'Lange tijd gold de regel dat je direct na de training eiwit en koolhydraten moest innemen, anders zou het trainingseffect verloren gaan. Dit smalle ‘anabole venster’ is een overdrijving gebleken.\n\nEen meta-analyse van Schoenfeld, Aragon & Krieger (2013, Journal of the International Society of Sports Nutrition) vond dat het exacte moment van eiwitinname rond de training veel minder belangrijk is dan de totale hoeveelheid eiwit per dag. Het ‘venster’ is eerder meerdere uren breed dan een paar minuten.\n\nIn de praktijk betekent dit: zolang je genoeg eiwit eet, verdeeld over de dag, en voor en na de training niet urenlang helemaal nuchter bent, hoef je je niet te haasten. Wie nuchter traint, kan baat hebben bij een maaltijd relatief kort na de training, meer om praktische dan om dringende fysiologische redenen.',
      },
      {
        title: 'Maaltijdfrequentie en intermittent fasting',
        content: 'Of je drie grote of zes kleine maaltijden eet, heeft weinig invloed op stofwisseling of vetverlies, zolang calorieën en eiwit gelijk blijven. Het oude idee dat vaak kleine maaltijden ‘de stofwisseling aanwakkeren’ is weerlegd: het thermisch effect hangt af van de totale hoeveelheid, niet van de frequentie.\n\nIntermittent fasting (bijv. 16:8) is populair en voor velen een handig hulpmiddel om de calorie-inname te sturen. Maar het is geen magische vetverbrander: bij gelijke calorieën leidt het niet tot meer vetverlies dan een gelijkmatig verdeeld dieet. Het voordeel zit vooral daarin dat sommige mensen zo makkelijker in een tekort blijven.\n\nDe beste maaltijdfrequentie is die bij je dagelijks leven past, je goed verzadigt en die je volhoudt. Voor spieropbouw is het zinvol eiwit over minstens drie tot vier porties te verdelen; daarbuiten is frequentie een kwestie van smaak.',
      },
      {
        title: 'Verstandige timing in de praktijk',
        content: 'Ook al is timing bijzaak, er zijn een paar praktisch nuttige punten. Voor de training zorgt een maaltijd met koolhydraten en wat eiwit, één tot drie uur van tevoren, voor goede energie en prestaties. Een te volle maag vlak voor de training kan daarentegen onaangenaam zijn.\n\nNa de training is een maaltijd met eiwit en koolhydraten binnen een paar uur zinvol om herstel en het aanvullen van glycogeen te ondersteunen. Het exacte moment is flexibel: het hoeft niet de beruchte seconde na de laatste set te zijn.\n\nOok slaap en spijsvertering hebben baat bij timing: heel grote of pittige maaltijden vlak voor het slapengaan kunnen de slaap verstoren. Maar koolhydraten ’s avonds hoeven je geen angst voor vettoename te bezorgen; dat is een mythe zolang de dagbalans klopt.',
      },
      {
        title: 'Samenvatting',
        content: 'De timing van maaltijden is de fijnafstelling van je voeding, niet het fundament. Totale calorieën en eiwit bepalen het grootste deel van het resultaat; timing en frequentie zijn bijzaak.\n\nHet ‘anabole venster’ is meerdere uren breed, geen minuten. Maaltijdfrequentie en intermittent fasting zijn bij gelijke calorieën gelijkwaardig: kies wat bij je dagelijks leven past en je goed verzadigt.\n\nHet is nuttig eiwit over de dag te verdelen en rond de training voldoende te eten. Al het andere is individuele optimalisatie, geen must. Maak je niet druk om timing zolang de basis klopt.',
      },
    ],
  },
};
