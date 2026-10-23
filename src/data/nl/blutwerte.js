// Nederlandse versie van `src/data/bloodworkKnowledge.js`.
// Sleutel = `id` uit het databestand, de volgorde van de `sections` moet
// overeenkomen. Controleren met: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    hormone: 'Hormonen',
    stoffwechsel: 'Stofwisseling',
    vitamine: 'Vitaminen en mineralen',
    herz: 'Hart en bloedvaten',
  },

  testosterone: {
    name: 'Testosteron',
    summary: 'Testosteron is het belangrijkste anabole hormoon en beïnvloedt spieropbouw, botdichtheid, libido, stemming en energie. Je kunt de waarde met je leefstijl positief beïnvloeden, maar wees voorzichtig met extreme beloftes.',
    quick: [
      { label: 'Belang', text: 'Spieropbouw, botdichtheid, libido, drive, stemming.' },
      { label: 'Natuurlijk ondersteunen', text: 'Krachttraining, goede slaap, gezond lichaamsgewicht, voldoende vet en micronutriënten.' },
    ],
    sections: [
      {
        title: 'Wat testosteron in het lichaam doet',
        content: 'Testosteron is het belangrijkste mannelijke geslachtshormoon, maar komt in kleinere hoeveelheden ook bij vrouwen voor, waar het eveneens van belang is. Het hoort bij de anabole (opbouwende) hormonen en speelt een centrale rol bij spieropbouw, kracht, botdichtheid, vetverdeling, libido, stemming en energie.\n\nBij mannen wordt testosteron vooral in de testikels aangemaakt, aangestuurd door een samenspel van hersenen (hypothalamus, hypofyse) en testikels. De aanmaak volgt een dagritme met de hoogste waarden in de ochtend. Daarom wordt bloed voor een testosteronbepaling meestal ’s ochtends afgenomen.\n\nEen gezond testosteronniveau ondersteunt de aanpassing aan krachttraining en het algemene welzijn. Zowel te lage als kunstmatig sterk verhoogde waarden (bijvoorbeeld door anabole steroïden) hebben echter gevolgen voor de gezondheid.',
      },
      {
        title: 'Referentiewaarden en meting',
        content: 'Testosteron wordt in het bloed gemeten, meestal als totaal testosteron; daarnaast is het vrije (biologisch actieve) testosteron informatief. Referentiewaarden verschillen per laboratorium, leeftijd en meetmethode. Daarom moeten waarden altijd worden geïnterpreteerd in de context van het betreffende lab en de klachten.\n\nVoor volwassen mannen ligt het referentiebereik voor totaal testosteron vaak ongeveer tussen 300 en 1000 ng/dl, maar de grenzen zijn vloeiend. Bovendien is een losse waarde maar een momentopname: tijdstip, slaap, stress en acute ziektes kunnen haar beïnvloeden. Bij opvallende waarden wordt de meting meestal herhaald.\n\nBelangrijk: een labwaarde alleen is geen diagnose. Pas de combinatie van klachten (bijvoorbeeld weinig drive, minder libido, verlies van spiermassa) en herhaaldelijk gemeten waarden maakt een zinvolle medische beoordeling mogelijk.',
      },
      {
        title: 'Wat het testosteronniveau beïnvloedt',
        content: 'Talrijke leefstijlfactoren werken in op het testosteronniveau. Overgewicht, vooral veel buikvet, hangt samen met lagere waarden; afvallen kan ze verbeteren. Chronisch slaaptekort verlaagt testosteron meetbaar: al één week met slechts vijf uur slaap kan de waarden duidelijk laten dalen (Leproult & Van Cauter, 2011, JAMA).\n\nKrachttraining en voldoende beweging werken op lange termijn gunstig, terwijl extreme overtraining of zeer grote calorietekorten testosteron kunnen verlagen. Ook voldoende vet uit de voeding en micronutriënten zoals zink en vitamine D zijn belangrijk voor de hormoonaanmaak: een zeer vetarm dieet kan de waarden drukken.\n\nChronische stress verhoogt het hormoon cortisol, dat tegengesteld aan testosteron werkt. Een gezonde leefstijl met goede slaap, evenwichtige voeding, regelmatige training en stressmanagement is daarom de effectiefste natuurlijke basis voor een gezond testosteronniveau.',
      },
      {
        title: 'Realistische verwachtingen en medisch advies',
        content: 'De markt staat vol met „testosteronboosters” die spectaculaire stijgingen beloven. De meeste van deze middelen laten in studies bij mensen met normale waarden geen of slechts minimale effecten zien. Een gezonde leefstijl verhoogt een lage waarde effectiever dan welk vrij verkrijgbaar product ook, en bij normale waarden valt testosteron nauwelijks zinvol „op te pompen”.\n\nEen echt te laag testosteronniveau (hypogonadisme) met bijbehorende klachten is een medische diagnose die door een arts moet worden onderzocht en zo nodig behandeld. Een testosterontherapie hoort uitsluitend in medische handen, omdat ze een zorgvuldige afweging van voordelen en risico’s vereist.\n\nVan het op eigen houtje gebruiken van anabole steroïden om prestaties te verbeteren wordt dringend afgeraden: ze kunnen de eigen aanmaak van het lichaam onderdrukken en ernstige gezondheidsschade veroorzaken. Bij een vermoeden van hormonale problemen is de weg naar de arts altijd de juiste.',
      },
    ],
  },

  vitamin_d_blood: {
    name: 'Vitamine D (25-OH)',
    summary: 'De vitamine D-bloedwaarde (25-OH-vitamine D) laat zien hoe het met je voorziening van de „zonnevitamine” staat. Een tekort komt vooral in de winter vaak voor en kan botten, spieren en het immuunsysteem beïnvloeden. De waarde valt gericht te verbeteren.',
    quick: [
      { label: 'Wat wordt gemeten', text: '25-OH-vitamine D in het bloed, de standaardwaarde voor de vitamine D-status.' },
      { label: 'Zo verbeter je het', text: 'Zonlicht, vette vis en bij een tekort een supplement met een dosering op basis van bloedonderzoek.' },
    ],
    sections: [
      {
        title: 'Waarom de vitamine D-waarde ertoe doet',
        content: 'Vitamine D werkt in het lichaam als een hormoon en is essentieel voor de calciumhuishouding, gezonde botten, de spierfunctie en het immuunsysteem. Omdat het lichaam het zelf aanmaakt onder invloed van zonlicht, hangt de voorziening sterk af van seizoen, woonplaats en leefstijl.\n\nDe beste marker voor de status is 25-hydroxy-vitamine D (25-OH-D) in het bloed. Die weerspiegelt de opslagvorm en geeft een betrouwbaar beeld van de voorziening over de afgelopen weken. Precies deze waarde wordt bij bloedonderzoek bepaald.\n\nOmdat vitamine D-tekort wijdverbreid is en met voeding alleen moeilijk te compenseren, is deze waarde een van de zinvolste routinebepalingen, vooral voor mensen op noordelijke breedtegraden en in de zonarme maanden.',
      },
      {
        title: 'Referentiewaarden begrijpen',
        content: 'De vitamine D-status wordt meestal uitgedrukt in nanogram per milliliter (ng/ml) of nanomol per liter (nmol/l). Als ruwe richtlijn hanteren veel labs deze indeling: waarden onder ongeveer 20 ng/ml (50 nmol/l) gelden als tekort, het bereik daarboven als voldoende, al verschillen de precieze grenzen per vakvereniging.\n\nDeze grenzen staan binnen het vakgebied ter discussie en liggen niet vast. Sommige experts vinden iets hogere streefwaarden zinvol, anderen waarschuwen voor overbehandeling. Wat telt, is je eigen waarde in de loop van de tijd en in overleg met een arts te interpreteren.\n\nEen zeer lage waarde verklaart soms vage klachten zoals vermoeidheid, spierzwakte of vaak terugkerende infecties. Toch moet je een losse labwaarde altijd in het totaalbeeld zien: het is een bouwsteen, geen diagnose.',
      },
      {
        title: 'Zo verbeter je de waarde',
        content: 'De natuurlijkste bron is zonlicht: regelmatige, matige blootstelling van de huid aan de zon stimuleert de eigen aanmaak. In de zomermaanden is kort buiten zijn vaak genoeg, terwijl in de winter op noordelijke breedtegraden de UV-B-straling niet volstaat.\n\nVia voeding leveren vooral vette vis (zalm, makreel, haring), eidooier en verrijkte producten vitamine D, maar meestal in hoeveelheden die een tekort niet alleen kunnen opvangen. Bij een aangetoond tekort is een supplement (vitamine D3) daarom vaak de betrouwbaarste oplossing.\n\nHet verstandigst is de dosis van het supplement af te stemmen op de bloedwaarde: uitgangswaarde meten, suppleren, na een paar maanden controleren en bijsturen. Zo blijf je in het effectieve en veilige bereik. Omdat vitamine D vetoplosbaar is en zich kan ophopen, horen hoge doseringen onder medische begeleiding.',
      },
      {
        title: 'Plaatsing en medisch advies',
        content: 'Vitamine D is een van de weinige supplementen met een brede, echte relevantie; tegelijk moet je een tekort niet dramatiseren en vitamine D ook niet overschatten als wondermiddel. Het lost niet elk gezondheidsprobleem op, maar is een belangrijke bouwsteen.\n\nOmdat vetoplosbare vitaminen zich kunnen ophopen, is ongecontroleerd hoog doseren niet onschuldig. Extreem hoge doses gedurende lange tijd kunnen leiden tot een gevaarlijk calciumoverschot. Daarom de regel: waarde meten, gericht suppleren en bij twijfel medisch advies vragen.\n\nDe vitamine D-waarde is een goed voorbeeld van hoe nuttig een datagedreven aanpak is: in plaats van te gokken geeft bloedonderzoek duidelijkheid en maakt het een gerichte, veilige correctie mogelijk. Deze inhoud vervangt echter geen medisch advies.',
      },
    ],
  },

  iron_ferritin: {
    name: 'IJzer en ferritine',
    summary: 'IJzer is onmisbaar voor het zuurstoftransport in het bloed. Ferritine geeft de ijzervoorraad aan. Een tekort, vooral vaak bij menstruerende vrouwen en duursporters, leidt tot vermoeidheid en minder prestatie.',
    quick: [
      { label: 'Wat wordt gemeten', text: 'Ferritine (voorraad), vaak samen met hemoglobine, transferrine en transferrineverzadiging.' },
      { label: 'Risicogroepen', text: 'Menstruerende vrouwen, duursporters, vegetarisch of veganistisch eten.' },
    ],
    sections: [
      {
        title: 'De rol van ijzer',
        content: 'IJzer is een essentieel mineraal en een kernbestanddeel van hemoglobine, de rode bloedkleurstof die zuurstof van de longen naar alle weefsels vervoert. Zonder genoeg ijzer kan het lichaam niet voldoende werkend hemoglobine vormen, waardoor de zuurstofvoorziening achteruitgaat.\n\nIn de spier helpt ijzer via myoglobine ook bij de opslag van zuurstof, en het is betrokken bij de energiewinning in de cellen. Een ijzertekort heeft daarom direct gevolgen voor uithoudingsvermogen, kracht en algemene prestatie.\n\nTypische klachten bij een tekort zijn vermoeidheid, bleekheid, kortademigheid bij inspanning, concentratieproblemen en een merkbare daling van je trainingsprestatie. Omdat deze klachten weinig specifiek zijn, blijft een ijzertekort vaak lang onopgemerkt, tot het bij bloedonderzoek aan het licht komt.',
      },
      {
        title: 'Ferritine en de belangrijkste waarden',
        content: 'Om de ijzerstatus te beoordelen worden meerdere waarden gebruikt. De belangrijkste is ferritine, de opslagvorm van ijzer: die laat zien hoe goed de ijzervoorraad gevuld is en daalt vaak al voordat een manifest tekort in het bloedbeeld zichtbaar is. Een laag ferritine is daarom een vroeg waarschuwingssignaal.\n\nDaarnaast wordt gekeken naar hemoglobine (de eigenlijke rode bloedkleurstof), transferrine (het transporteiwit) en de transferrineverzadiging. Pas het totaalbeeld maakt een goede beoordeling mogelijk: een laag ferritine bij een nog normaal hemoglobine wijst op een lege voorraad nog voordat er echte bloedarmoede is.\n\nBelangrijk om te weten: ferritine kan bij ontstekingen ook stijgen en zo een tekort maskeren. Daarom moeten ijzerwaarden altijd door een arts worden geïnterpreteerd, samen met andere markers en het klinische beeld.',
      },
      {
        title: 'Risicogroepen en oorzaken',
        content: 'Bepaalde groepen hebben een duidelijk verhoogd risico op ijzertekort. Menstruerende vrouwen verliezen regelmatig bloed en daarmee ijzer: ijzertekort is bij hen het meest voorkomende tekort van allemaal. Ook zwangere vrouwen hebben een sterk verhoogde behoefte.\n\nOok duursporters lopen risico, onder meer door een hogere behoefte, verliezen via zweet en het maag-darmkanaal en het zogenoemde effect van de voetaanslag bij het hardlopen. Wie vegetarisch of veganistisch eet, neemt ijzer op in een minder goed benutbare vorm en zou de eigen status in de gaten moeten houden.\n\nAndere oorzaken kunnen een te lage inname zijn, darmziektes met een verstoorde opname of verborgen bloedverlies. Juist omdat de oorzaken zo uiteenlopen, moet een onduidelijk of aanhoudend ijzertekort altijd medisch worden onderzocht.',
      },
      {
        title: 'Verbeteren, maar op de juiste manier',
        content: 'Via de voeding levert vooral rood vlees goed benutbaar heemijzer; plantaardige bronnen zoals peulvruchten, volkorenproducten en groene groenten bevatten non-heemijzer, dat minder goed wordt opgenomen. Vitamine C (bijvoorbeeld uit fruit of groente bij de maaltijd) verbetert de opname van plantaardig ijzer duidelijk, terwijl koffie en thee haar remmen.\n\nBij een aangetoond tekort is voeding vaak niet genoeg om de voorraad snel aan te vullen; dan kunnen ijzerpreparaten nodig zijn. Die moet je echter niet blind innemen: ijzer suppleren zonder tekort is niet onschuldig, omdat overtollig ijzer zich in het lichaam kan ophopen en schade kan veroorzaken.\n\nDaarom geldt bij ijzer in het bijzonder: eerst meten, dan gericht handelen. Dosis en duur van een ijzertherapie horen bij de arts, net als het zoeken naar de oorzaak. Deze inhoud is bedoeld als informatie en vervangt geen medische diagnose.',
      },
    ],
  },

  cholesterol: {
    name: 'Cholesterol en bloedvetten',
    summary: 'Cholesterol en triglyceriden zijn belangrijke bloedvetten. Hun profiel (LDL, HDL, triglyceriden) is een centrale marker voor de gezondheid van hart en bloedvaten. Leefstijl heeft veel invloed, maar de beoordeling hoort in medische handen.',
    quick: [
      { label: 'Belangrijke waarden', text: 'Totaal cholesterol, LDL, HDL en triglyceriden, samen het lipidenprofiel.' },
      { label: 'Gunstig beïnvloeden', text: 'Vezels, onverzadigde vetten, beweging, gezond gewicht, weinig transvetten.' },
    ],
    sections: [
      {
        title: 'Wat cholesterol is',
        content: 'Cholesterol is een vetachtige stof die het lichaam nodig heeft om celmembranen, hormonen en galzuren op te bouwen. Het is dus van levensbelang en niet in principe iets „slechts”. Het lichaam maakt het meeste cholesterol zelf aan; een deel komt uit de voeding.\n\nOmdat cholesterol vetoplosbaar is, wordt het in het bloed vervoerd door transporteiwitten, de lipoproteïnen. De bekendste zijn LDL („low-density lipoprotein”) en HDL („high-density lipoprotein”). Vereenvoudigd brengt LDL cholesterol naar de weefsels, terwijl HDL overtollig cholesterol terugvoert naar de lever.\n\nEen andere belangrijke vetwaarde zijn de triglyceriden, de belangrijkste vorm van opslagvet. Samen vormen totaal cholesterol, LDL, HDL en triglyceriden het lipidenprofiel dat bij bloedonderzoek wordt bepaald.',
      },
      {
        title: 'LDL, HDL en de beoordeling',
        content: 'Voor de gezondheid van hart en bloedvaten zijn de verhouding en de hoogte van de afzonderlijke waarden van belang. Een blijvend verhoogd LDL-cholesterol hangt samen met een hoger risico op afzettingen in de bloedvaten (aderverkalking). Daarom wordt LDL vaak het „ongunstige” cholesterol genoemd. HDL geldt daarentegen eerder als „gunstig”, omdat het bij het terugtransport betrokken is.\n\nOok verhoogde triglyceriden zijn een risicofactor, vaak in samenhang met overgewicht, veel suiker en weinig beweging. Voor de risicobeoordeling telt echter niet een losse waarde, maar het hele profiel samen met andere factoren zoals bloeddruk, roken, familiegeschiedenis en bloedsuiker.\n\nDe precieze streefwaarden hangen sterk af van het individuele totale risico en worden door de arts vastgesteld. Een „hoge” waarde betekent niet automatisch dat er moet worden ingegrepen, en een „normale” sluit risico niet volledig uit. Daarom is de medische beoordeling doorslaggevend.',
      },
      {
        title: 'Waar leefstijl het verschil maakt',
        content: 'Leefstijl heeft aanzienlijke invloed op de bloedvetten. Een vezelrijke voeding met veel groente, fruit, peulvruchten en volkorenproducten kan het LDL-cholesterol verlagen. Verzadigde vetten vervangen door onverzadigde (olijfolie, noten, vette vis) werkt gunstig, terwijl kunstmatige transvetten duidelijk ongunstig zijn en vermeden moeten worden.\n\nRegelmatige beweging verbetert het lipidenprofiel, vooral de triglyceriden en het HDL. Ook een gezond lichaamsgewicht, niet roken en matig alcoholgebruik dragen bij aan de gezondheid van hart en bloedvaten. Deze maatregelen werken samen en zijn de basis van elke verbetering.\n\nEen realistische inschatting is belangrijk: een deel van de cholesterolwaarden is erfelijk bepaald en valt met leefstijl maar beperkt te veranderen. Sommige mensen hebben ondanks een gezonde leefstijl verhoogde waarden; dan kan een behandeling met medicijnen nodig zijn, waarover uitsluitend de arts beslist.',
      },
      {
        title: 'Plaatsing en medisch advies',
        content: 'Het lipidenprofiel is een van de belangrijkste routinewaarden om het risico voor hart en bloedvaten in te schatten. Juist omdat afzettingen in de bloedvaten lang geen klachten geven, is regelmatige controle zinvol, vooral naarmate je ouder wordt of als het in de familie voorkomt.\n\nDe interpretatie is complex en hoort bij de arts. Of en hoe een waarde wordt behandeld, hangt af van het individuele totale risico, niet van een los getal. Leefstijlaanpassingen zijn bijna altijd de eerste stap; medicijnen zoals statines komen erbij als het risico dat rechtvaardigt, en zijn goed onderzocht.\n\nGebruik deze kennis om je eigen lipidenprofiel beter te begrijpen en gericht aan de leefstijlfactoren te werken. De concrete beoordeling en behandeling van je waarden hoort echter altijd bij een arts: deze inhoud vervangt geen medisch advies.',
      },
    ],
  },

  blood_sugar: {
    name: 'Bloedsuiker en HbA1c',
    summary: 'Bloedsuiker (glucose) en de langetermijnwaarde HbA1c laten zien hoe goed het lichaam suiker verwerkt. Het zijn centrale markers voor de stofwisseling en het diabetesrisico. Voeding en beweging hebben veel invloed.',
    quick: [
      { label: 'Wat wordt gemeten', text: 'Nuchtere bloedsuiker (momentopname) en HbA1c (gemiddelde over de laatste ~3 maanden).' },
      { label: 'Gunstig beïnvloeden', text: 'Beweging, gezond gewicht, vezelrijke voeding, weinig suiker; krachttraining helpt.' },
    ],
    sections: [
      {
        title: 'Bloedsuiker en insuline',
        content: 'Glucose (bloedsuiker) is een centrale energiedrager voor het lichaam. Na een maaltijd stijgt de bloedsuiker en geeft de alvleesklier het hormoon insuline af. Insuline sluist de glucose de cellen in en brengt de bloedsuiker zo weer op een normaal niveau.\n\nDit fijn afgestemde systeem houdt de bloedsuiker binnen een smal bereik. Werkt het goed, dan wordt suiker efficiënt verwerkt. Is de werking van insuline verstoord (insulineresistentie), dan moet het lichaam steeds meer insuline aanmaken en blijft de bloedsuiker te hoog: een voorstadium van diabetes type 2.\n\nDe spieren spelen hierbij een belangrijke rol: actieve spieren nemen glucose op en verbeteren de insulinegevoeligheid. Daarom is regelmatige training, en krachttraining in het bijzonder, een van de effectiefste factoren voor een gezonde suikerstofwisseling.',
      },
      {
        title: 'Nuchtere bloedsuiker en HbA1c',
        content: 'Twee waarden zijn bijzonder informatief. De nuchtere bloedsuiker wordt na meerdere uren zonder eten gemeten en toont het actuele suikerniveau. Het is een momentopname en kan schommelen door voeding, stress en tijdstip.\n\nDe HbA1c-waarde („langetermijnsuiker”) weerspiegelt de gemiddelde bloedsuiker over ongeveer de laatste twee tot drie maanden. Ze meet het aandeel hemoglobine waaraan suiker is gebonden. Omdat ze een langere periode bestrijkt, is ze robuuster tegen kortetermijnschommelingen en wordt ze gebruikt voor diagnose en controle.\n\nSamen geven beide waarden een goed beeld van de suikerstofwisseling. Verhoogde waarden kunnen wijzen op een voorstadium (prediabetes) of een al bestaande diabetes. De precieze grenzen en hun interpretatie stelt de arts vast.',
      },
      {
        title: 'Invloed van voeding en beweging',
        content: 'De suikerstofwisseling valt sterk te beïnvloeden via leefstijl. Een vezelrijke voeding met groente, peulvruchten en volkorenproducten zorgt voor een langzamere, gelijkmatigere stijging van de bloedsuiker dan sterk bewerkte, suikerrijke producten. Minder suikerhoudende dranken en producten van witte bloem is bijzonder effectief.\n\nBeweging is een sleutelfactor. Zowel duur- als krachttraining verbeteren de insulinegevoeligheid en helpen de spieren glucose op te nemen. Al een wandeling na het eten kan de stijging van de bloedsuiker afvlakken. Spieropbouw vergroot bovendien de „suikeropslag” van het lichaam.\n\nEen gezond lichaamsgewicht, vooral minder buikvet, verbetert de bloedsuikerwaarden duidelijk. Deze leefstijlmaatregelen zijn de effectiefste en eerste strategie om prediabetes tegen te gaan en het diabetesrisico te verlagen.',
      },
      {
        title: 'Plaatsing en medisch advies',
        content: 'Bloedsuiker en HbA1c horen bij de belangrijkste preventieve waarden, omdat een verstoorde suikerstofwisseling lang geen klachten geeft maar ernstige gevolgen kan hebben. Prediabetes vroeg herkennen biedt de kans om met leefstijlaanpassingen bij te sturen voordat diabetes ontstaat.\n\nVerhoogde waarden zijn een belangrijk waarschuwingssignaal, maar geen zelfdiagnose. Interpretatie, verder onderzoek en een eventuele behandeling horen bij de arts. Is er al sprake van diabetes, dan is gestructureerde medische begeleiding onmisbaar.\n\nGebruik deze kennis om de betekenis van je waarden te begrijpen en voeding en beweging gericht in te zetten. Krachttraining en een evenwichtige, vezelrijke voeding zijn sterke bondgenoten voor een gezonde suikerstofwisseling. Deze inhoud vervangt echter geen medisch advies en geen diagnose.',
      },
    ],
  },

  thyroid: {
    name: 'Schildklier (TSH)',
    summary: 'De schildklier regelt met haar hormonen stofwisseling, energie en lichaamstemperatuur. De TSH-waarde is de belangrijkste screeningstest voor een te trage of te snelle werking. Afwijkingen moeten altijd medisch worden onderzocht.',
    quick: [
      { label: 'Wat wordt gemeten', text: 'TSH als screeningstest; bij afwijkingen daarnaast fT3/fT4 en zo nodig antistoffen.' },
      { label: 'Klachten', text: 'Vermoeidheid, gewichtsveranderingen, het koud of warm hebben, stemming: weinig specifiek, laat het door een arts onderzoeken.' },
    ],
    sections: [
      {
        title: 'De schildklier en haar hormonen',
        content: 'De schildklier is een kleine, vlindervormige klier in de hals met een enorm effect. Ze maakt de schildklierhormonen T3 (trijoodthyronine) en T4 (thyroxine) aan, die de ruststofwisseling, de energiehuishouding, de lichaamstemperatuur, de hartslag en vele andere functies regelen.\n\nDe schildklier wordt aangestuurd door een regelkring met de hersenen. De hypofyse geeft het hormoon TSH (schildklierstimulerend hormoon) af, dat de schildklier aanzet tot hormoonaanmaak. Deze regelkring stemt de hoeveelheid hormoon nauwkeurig af op de behoefte van het lichaam.\n\nIs de schildklierfunctie verstoord, dan heeft dat gevolgen voor het hele lichaam. Een te trage werking (hypothyreoïdie) vertraagt de stofwisseling, een te snelle werking (hyperthyreoïdie) versnelt haar. Beide uiten zich in veel weinig specifieke klachten.',
      },
      {
        title: 'Waarom TSH de belangrijkste waarde is',
        content: 'De TSH-waarde is de gevoeligste screeningstest voor de schildklierfunctie. De reden ligt in de regelkring: maakt de schildklier te weinig hormonen aan, dan probeert het lichaam dat te compenseren en geeft het meer TSH af. Een hoge TSH wijst dus vaak op een te trage werking. Maakt ze er te veel aan, dan daalt de TSH, wat op een te snelle werking kan wijzen.\n\nOmdat TSH al op kleine afwijkingen reageert, wordt het als eerste bepaald. Is de TSH afwijkend, dan volgen verdere waarden: de vrije schildklierhormonen fT3 en fT4 en zo nodig antistoffen om oorzaken zoals de auto-immuunziekte Hashimoto op te sporen.\n\nDe referentiewaarden voor TSH verschillen per laboratorium, en de interpretatie hangt af van je situatie: leeftijd, zwangerschap of aanwezige klachten. Een enkele grenswaarde betekent niet automatisch een ziekte.',
      },
      {
        title: 'Klachten en veelvoorkomende aandoeningen',
        content: 'Een te trage schildklier uit zich vaak in vermoeidheid, weinig drive, gewichtstoename, het snel koud hebben, een droge huid en een sombere stemming. Een te snelle schildklier toont zich daarentegen vaak in nervositeit, hartkloppingen, gewichtsverlies ondanks eetlust, het snel warm hebben en slaapproblemen.\n\nDeze klachten zijn weinig specifiek en kunnen veel andere oorzaken hebben. Juist daarom is bloedonderzoek zo waardevol: om de schildklier als oorzaak te bevestigen of uit te sluiten. Voor mensen die sporten is een goed werkende schildklier belangrijk, omdat ze energie, herstel en stofwisseling beïnvloedt.\n\nVeelvoorkomende aandoeningen zijn de auto-immuunziekte Hashimoto (die vaak tot een te trage werking leidt) en de ziekte van Graves (die tot een te snelle werking leidt). Ook een jodiumtekort kan de schildklier beïnvloeden. Een precieze diagnose vraagt altijd om medisch onderzoek.',
      },
      {
        title: 'Plaatsing en medisch advies',
        content: 'De schildklier is een voorbeeld van hoe een klein orgaan het hele lichaam beïnvloedt. De TSH-waarde is een eenvoudige, informatieve screeningstest die zinvol kan zijn bij onduidelijke klachten zoals aanhoudende vermoeidheid, onverklaarbare gewichtsveranderingen of stemmingswisselingen.\n\nAnders dan bij andere waarden kun je een echte stoornis van de schildklierfunctie niet met leefstijl „wegtrainen”. Voldoende jodium (via gejodeerd zout en voeding) ondersteunt de normale functie, maar een bestaande stoornis vraagt om een gerichte medische behandeling, vaak met hormoonpreparaten.\n\nDaarom geldt hier in het bijzonder: afwijkende schildklierwaarden of bijbehorende klachten horen altijd bij de arts. Deze kennis helpt je de betekenis van de TSH-waarde te begrijpen en klachten serieus te nemen; ze vervangt uitdrukkelijk geen diagnose en geen behandeling.',
      },
    ],
  },
};
