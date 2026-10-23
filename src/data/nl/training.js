// Nederlandse versie van `src/data/trainingKnowledge.js`.
// Sleutel = `id` uit het databestand, de volgorde van de `sections` moet
// overeenkomen. Controleren met: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Basis',
    hypertrophie: 'Spieropbouw',
    programmierung: 'Programmering',
    regeneration: 'Herstel',
  },

  progressive_overload: {
    name: 'Progressive overload',
    summary: 'Het belangrijkste principe voor vooruitgang op lange termijn: de trainingsprikkel moet in de loop van de tijd systematisch toenemen, zodat het lichaam zich blijft aanpassen. Zonder progressie stagneren kracht en spieropbouw.',
    quick: [
      { label: 'Kernidee', text: 'Stap voor stap meer gewicht, herhalingen, sets of een betere techniek: de prikkel moet blijven stijgen.' },
      { label: 'Voor wie', text: 'Alle niveaus. Beginners boeken snel vooruitgang; gevorderden hebben kleinere, beter geplande stappen nodig.' },
    ],
    sections: [
      {
        title: 'Wat is progressive overload?',
        content: 'Progressive overload beschrijft het geleidelijk verhogen van de eisen die je tijdens de training aan je lichaam stelt. Het idee gaat terug op het principe van supercompensatie: een trainingsprikkel verstoort het biologische evenwicht, het lichaam herstelt zich en past zich aan een iets hoger prestatieniveau aan. Blijft de prikkel daarna gelijk, dan is er geen reden voor verdere aanpassing en stopt de vooruitgang.\n\nHet begrip komt oorspronkelijk uit de revalidatie: Thomas DeLorme ontwikkelde in de jaren veertig het concept van ‘progressive resistance exercise’ om de spierkracht van gewonde soldaten te herstellen (DeLorme, 1945, Journal of Bone and Joint Surgery). Sindsdien is het de basis geworden van elk serieus kracht- en spieropbouwprogramma.\n\nBelangrijk om te begrijpen: ‘meer gewicht’ is maar één van de manieren om vooruit te gaan. De prikkel kan ook stijgen door meer herhalingen, meer sets, kortere rustpauzes, een grotere bewegingsuitslag of een langzamere, meer gecontroleerde uitvoering.',
      },
      {
        title: 'Wetenschappelijke achtergrond',
        content: 'De noodzaak van geleidelijke progressie is een van de best onderbouwde principes in de trainingswetenschap. Het position stand van het American College of Sports Medicine (ACSM, 2009, Medicine & Science in Sports & Exercise) noemt progressive overload uitdrukkelijk als voorwaarde voor blijvende winst in kracht en hypertrofie en beveelt een geplande verhoging van belasting en volume aan.\n\nEen review van Schoenfeld et al. (2017, Journal of Strength and Conditioning Research) laat zien dat zowel zware als gematigde belastingen spiergroei kunnen opwekken. Doorslaggevend is dat de sets dicht bij spiervermoeidheid worden uitgevoerd en dat de prikkel in de loop van de tijd toeneemt. Dat onderstreept dat je progressie flexibel kunt vormgeven.\n\nTrainingsaanpassingen volgen bovendien het SAID-principe (‘Specific Adaptation to Imposed Demands’): het lichaam past zich precies aan de eisen aan die eraan gesteld worden. Stijgt de eis niet, dan blijft ook de aanpassing uit. Dat verband wordt in de inspanningsfysiologie al decennia consequent bevestigd.',
      },
      {
        title: 'Methoden van progressie',
        content: 'Er zijn verschillende praktische manieren om de trainingsprikkel te verhogen. De bekendste is progressie in belasting: meer gewicht op de stang. Bij de meeste oefeningen zijn stappen van 2,5 kg (bovenlichaam) of 5 kg (onderlichaam) zinvol zodra je met nette techniek de bovenkant van je herhalingsbereik haalt.\n\nDubbele progressie is een bijzonder beginnersvriendelijke methode: je kiest een herhalingsbereik (bijv. 8–12). Eerst werk je je binnen dat bereik omhoog (meer herhalingen met hetzelfde gewicht), en zodra je in alle sets de bovenkant van het bereik haalt, verhoog je het gewicht en begin je weer onderaan.\n\nAndere mogelijkheden zijn: meer sets per spiergroep (volumeprogressie), kortere rustpauzes bij gelijke prestatie, een grotere bewegingsuitslag of een meer gecontroleerde, langzamere excentrische fase. Belangrijk is dat je steeds maar één variabele tegelijk verandert, zodat je de vooruitgang zuiver kunt volgen.',
      },
      {
        title: 'Veelgemaakte fouten',
        content: 'De meest gemaakte fout is te snel progressie willen: wie het gewicht verhoogt voordat de techniek goed zit, riskeert blessures en traint vaak de doelspier niet meer. Het gewicht mag pas omhoog als je alle geplande herhalingen met goede techniek kunt uitvoeren.\n\nEen tweede fout is denken dat er elke training vooruitgang moet zijn. Vooral gevorderden kunnen niet elke week gewicht toevoegen. Wat telt is de trend over weken en maanden, niet de individuele trainingsdag. Kleine schommelingen door slaap, stress of voeding zijn normaal.\n\nDe derde fout is gebrekkige registratie. Zonder gewicht, herhalingen en sets bij te houden is progressie bijna niet te sturen: je weet simpelweg niet of je beter bent geworden. Een trainingslogboek is daarom het belangrijkste hulpmiddel voor vooruitgang op lange termijn.',
      },
      {
        title: 'Samenvatting',
        content: 'Progressive overload is de basiswet van training: zonder stijgende prikkel geen blijvende aanpassing. Je kunt het toepassen via gewicht, herhalingen, sets, rust, bewegingsuitslag of tempo, niet alleen via meer gewicht.\n\nVoor beginners werkt dubbele progressie in het bereik van 8–12 herhalingen uitstekend. Gevorderden doen er goed aan in langere cycli te denken en hun progressie te plannen in plaats van te forceren. In alle gevallen is het belangrijk je vooruitgang te noteren en techniek boven gewicht te stellen.\n\nWie geduldig en systematisch progressie maakt, bouwt jarenlang onafgebroken kracht en spiermassa op. Precies dat is de kern van succesvol trainen.',
      },
    ],
  },

  volume_frequency: {
    name: 'Trainingsvolume & frequentie',
    summary: 'Volume (sets × herhalingen × gewicht) is de sterkste hefboom voor spiergroei. Frequentie beschrijft hoe vaak een spier per week wordt getraind. Samen bepalen ze hoeveel prikkel een spier krijgt en hoe goed die kan herstellen.',
    quick: [
      { label: 'Richtlijn volume', text: 'Ongeveer 10–20 zware sets per spiergroep per week voor de meeste sporters.' },
      { label: 'Richtlijn frequentie', text: 'Elke spier 2× per week trainen werkt bij gelijk weekvolume meestal beter dan 1×.' },
    ],
    sections: [
      {
        title: 'Wat betekent volume?',
        content: 'Trainingsvolume is de maat voor de totale hoeveelheid verricht werk. De meest gebruikte aanpak telt ‘zware sets’ per spiergroep per week: sets die tot dicht bij spierfalen worden uitgevoerd (ongeveer 0–4 herhalingen in reserve). Preciezer kun je volume berekenen als sets × herhalingen × gewicht (tonnage), maar het tellen van sets is in de praktijk een betrouwbare benadering gebleken.\n\nVolume geldt als de belangrijkste afzonderlijke factor voor spiergroei. De meta-analyse van Schoenfeld, Ogborn & Krieger (2017, Journal of Sports Sciences) vond een duidelijke dosis-responsrelatie: meer sets per week leidden tot meer hypertrofie, tot een punt waarna de extra winst afneemt en het herstel eronder lijdt.\n\nVoor de meeste sporters ligt het zinvolle bereik rond 10–20 zware sets per spiergroep per week. Beginners hebben al baat bij de onderkant, terwijl gevorderden vaak meer nodig hebben om nog een prikkel te geven.',
      },
      {
        title: 'Wat betekent frequentie?',
        content: 'Frequentie beschrijft hoe vaak een spier binnen een week wordt getraind. Of een spier 1×, 2× of 3× per week aan bod komt, verandert het weekvolume niet per se, het verdeelt het alleen anders. Wie 16 sets borst over twee trainingen verdeelt, doet 8 sets per training in plaats van 16 in één keer.\n\nDe meta-analyse van Schoenfeld, Grgic & Krieger (2019, Journal of Sports Sciences) laat zien dat een hogere frequentie bij gelijk weekvolume doorgaans iets meer spiergroei oplevert. Waarschijnlijk komt dat doordat de spiereiwitsynthese maar zo’n 24–48 uur na de training verhoogd blijft en vaker prikkelen haar vaker in gang zet.\n\nIn de praktijk betekent dit: elke spier twee keer per week trainen is voor de meeste mensen een goed compromis tussen prikkel, herstel en trainingskwaliteit. Een zeer hoge frequentie levert nauwelijks extra voordeel op zolang het volume voldoende is.',
      },
      {
        title: 'Volume goed sturen',
        content: 'Volume kun je beter individueel en dynamisch inzetten dan statisch vasthouden. Een zinvol startpunt is de onderkant van het bereik (rond 10 sets per spier per week). Van daaruit kun je het volume over weken langzaam verhogen, zolang herstel, slaap en prestaties meekomen.\n\nHet concept ‘Maximum Recoverable Volume’ (MRV) beschrijft de bovengrens van het volume waarvan een sporter nog kan herstellen. Wie die overschrijdt, gaat minder presteren en loopt meer risico op blessures. Tekenen van te veel volume zijn aanhoudende prestatiedalingen, slecht slapen, voortdurende spierpijn en verlies van motivatie.\n\nAchterblijvende spiergroepen of zwakke punten kun je voorrang geven met wat meer volume, terwijl al goed ontwikkelde zones met een onderhoudsvolume (vaak 6–10 sets) op peil blijven. Zo gaat je beperkte herstelcapaciteit naar waar ze het meest oplevert.',
      },
      {
        title: 'Veelgemaakte fouten',
        content: 'De klassieke beginnersfout is te veel volume te vroeg. Meer is niet automatisch beter: boven je persoonlijke herstelgrens remt extra volume de vooruitgang juist af. Je kunt beter met minder beginnen en langzaam opbouwen.\n\nEen tweede fout is ‘junk volume’ meetellen: sets ver van falen of met slechte techniek dragen weinig bij aan groei, maar kosten wel herstel. Alleen sets die de doelspier echt uitdagen tellen als effectief volume.\n\nTen derde wordt frequentie vaak verward met volume. Een spier vaker trainen helpt alleen als het weekvolume voldoende is. Zes trainingen per week met elk te weinig prikkel zijn slechter dan drie goed geplaatste trainingen.',
      },
      {
        title: 'Samenvatting',
        content: 'Volume is de sterkste hefboom voor spiergroei; een bereik van ongeveer 10–20 zware sets per spier per week past bij de meeste mensen. Frequentie verdeelt dat volume: twee keer per week per spier is een beproefde standaard.\n\nBegin aan de onderkant van het volumebereik en bouw langzaam op, terwijl je herstel en prestaties in de gaten houdt. Tel alleen effectieve, uitdagende sets en stem het volume per spiergroep af op je doelen.\n\nVolume en frequentie zijn geen starre regels, maar gereedschap dat je aanpast aan je herstelcapaciteit. Wie beide bewust stuurt, traint efficiënter en voorkomt zowel onder- als overtraining.',
      },
    ],
  },

  hypertrophy_basics: {
    name: 'Hoe spieren groeien',
    summary: 'Spiergroei (hypertrofie) ontstaat wanneer training de spiereiwitsynthese boven de afbraak tilt en deze prikkel regelmatig wordt herhaald. De belangrijkste drijfveer is mechanische spanning door uitdagende sets, gecombineerd met genoeg eiwit en herstel.',
    quick: [
      { label: 'Belangrijkste drijfveer', text: 'Mechanische spanning: sets dicht bij falen met gecontroleerde techniek.' },
      { label: 'Voorwaarden', text: 'Genoeg eiwit (~1,6–2,2 g/kg), calorieën op onderhoud tot licht overschot, slaap.' },
    ],
    sections: [
      {
        title: 'De biologie van spiergroei',
        content: 'Spieren bestaan uit spiervezels met contractiele eiwitten (actine en myosine). Groei betekent vooral dat deze vezels dikker worden doordat er meer contractiel eiwit wordt opgeslagen. Dat heet myofibrillaire hypertrofie. Het lichaam bouwt voortdurend spiereiwit op (spiereiwitsynthese) en breekt het af (spiereiwitafbraak); groei ontstaat alleen als de synthese over een langere periode de overhand heeft.\n\nTraining is de trigger: een uitdagende set verhoogt de spiereiwitsynthese gedurende ongeveer 24–48 uur (Damas et al., 2016, Journal of Physiology). Wordt deze prikkel regelmatig gegeven en krijgt het lichaam genoeg bouwstoffen (eiwit) en energie, dan stapelt de groei zich over weken en maanden op.\n\nOok satellietcellen spelen een rol: deze spierspecifieke stamcellen worden door training geactiveerd, helpen beschadigde vezels te herstellen en leveren nieuwe celkernen, wat op lange termijn meer groei mogelijk maakt.',
      },
      {
        title: 'De drie mechanismen van hypertrofie',
        content: 'In een veelgeciteerd artikel beschreef Brad Schoenfeld (2010, Journal of Strength and Conditioning Research) drie mogelijke mechanismen van spiergroei: mechanische spanning, metabole stress en spierschade.\n\nMechanische spanning geldt nu als de belangrijkste drijfveer. Die ontstaat wanneer spieren tegen een hoge weerstand werken over een volledige bewegingsuitslag, vooral in de laatste, zware herhalingen van een set. Spiercellen nemen deze spanning waar als signaal (‘mechanotransductie’) en zetten groeiprocessen in gang.\n\nMetabole stress (het ‘branden’ door stofwisselingsproducten bij hogere herhalingen) en lichte spierschade kunnen ondersteunend werken, maar zijn minder doorslaggevend dan lang werd aangenomen. Recent onderzoek wijst erop dat flinke spierschade eerder een bijproduct dan een voorwaarde voor groei is.',
      },
      {
        title: 'Zo optimaliseer je de groeiprikkel',
        content: 'Om de mechanische spanning te maximaliseren, voer je sets uit tot dicht bij spierfalen, meestal met 0–4 herhalingen in reserve. Het precieze herhalingsbereik is verrassend flexibel: groei is mogelijk over een breed bereik van ongeveer 5 tot 30 herhalingen per set, zolang de set zwaar genoeg is (Schoenfeld et al., 2017, Journal of Strength and Conditioning Research).\n\nIn de praktijk werkt een gematigd bereik van ongeveer 6–15 herhalingen goed, omdat het een mooi compromis biedt tussen spanning, volume en vermoeidheid. Heel weinig herhalingen belasten gewrichten en zenuwstelsel meer, heel veel herhalingen zijn onaangenaam en uitputtend.\n\nBelangrijk is een gecontroleerde uitvoering over de volledige bewegingsuitslag. Vooral de gestrekte positie van een spier onder belasting lijkt een sterke groeiprikkel te zijn. Diepe, volledige herhalingen zijn daarom meestal effectiever dan korte, hakkerige.',
      },
      {
        title: 'Voeding en herstel',
        content: 'Zonder voldoende bouwstoffen kan geen spier groeien. Eiwit levert de aminozuren voor de spiereiwitsynthese; onderzoek adviseert sporters ongeveer 1,6–2,2 g eiwit per kilogram lichaamsgewicht per dag (Morton et al., 2018, British Journal of Sports Medicine). Het is zinvol dit te verdelen over meerdere maaltijden met elk 20–40 g eiwit.\n\nEnergie is net zo belangrijk. Spieropbouw werkt het best op onderhoud of met een licht overschot (ongeveer +5–15%). In een groot tekort is groei mogelijk, maar duidelijk trager. Vooral beginners en mensen met een hoger vetpercentage kunnen in het begin tegelijk vet verliezen en spier opbouwen.\n\nSlaap is de meest onderschatte factor. Herstel en hormonale aanpassingen vinden plaats tijdens de diepe slaap. Chronisch slaaptekort verlaagt aantoonbaar de spiereiwitsynthese en verhoogt de spierafbraak. Zeven tot negen uur per nacht is een zinvol doel.',
      },
      {
        title: 'Samenvatting',
        content: 'Spieren groeien wanneer een uitdagende trainingsprikkel de spiereiwitsynthese boven de afbraak tilt en dit proces regelmatig wordt herhaald. De belangrijkste drijfveer is mechanische spanning door zware sets met een gecontroleerde, volledige uitvoering.\n\nHet effectieve herhalingsbereik is breed (ongeveer 5–30); in de praktijk werken 6–15 herhalingen dicht bij falen goed. Volume, progressie en techniek bepalen de prikkel, terwijl eiwit, energie en slaap de aanpassing mogelijk maken.\n\nSpiergroei is een langzaam, cumulatief proces. Wie geduldig hard traint, genoeg eet en goed slaapt, bouwt maanden en jaren lang onafgebroken spiermassa op.',
      },
    ],
  },

  recovery_overtraining: {
    name: 'Herstel & overtraining',
    summary: 'Aanpassing gebeurt niet tijdens de training, maar in het herstel daarna. Wie te veel traint en te weinig herstelt, stagneert of gaat achteruit. Slaap, voeding, rust en verstandig belastingsmanagement zijn daarom net zo belangrijk als de training zelf.',
    quick: [
      { label: 'Basisregel', text: 'Spieren groeien in de rust. Geen herstel, geen vooruitgang.' },
      { label: 'Belangrijkste hefbomen', text: 'Slaap (7–9 u), genoeg calorieën & eiwit, deloadweken, stressmanagement.' },
    ],
    sections: [
      {
        title: 'Waarom herstel doorslaggevend is',
        content: 'Training is een prikkel, maar de eigenlijke aanpassing (sterkere, grotere spieren, een beter presterend zenuwstelsel) gebeurt in de herstelfase daarna. Dat samenspel beschrijft het supercompensatiemodel: na een belasting daalt de prestatie eerst, herstelt dan en stijgt vervolgens boven het beginniveau uit, mits er genoeg tijd is om te herstellen.\n\nKomt de volgende zware prikkel te vroeg, voordat het herstel compleet is, dan stapelt vermoeidheid zich op. Op korte termijn is dat normaal en zelfs onderdeel van training; op lange termijn leidt het echter tot prestatieverlies. Het lichaam maakt geen onderscheid tussen trainingsstress en andere stress: werk, slaapgebrek en psychische belasting tellen allemaal mee.\n\nHerstel is dus geen passief ‘niets doen’, maar het actieve deel waarin de trainingsprikkel überhaupt pas in vooruitgang wordt omgezet. Wie het verwaarloost, verspilt een groot deel van zijn trainingsinspanning.',
      },
      {
        title: 'Slaap als belangrijkste herstelfactor',
        content: 'Geen andere factor beïnvloedt het herstel zo sterk als slaap. Tijdens de slaap vinden weefselherstel, het vastleggen van bewegingspatronen en belangrijke hormonale processen plaats, waaronder de afgifte van groeihormoon.\n\nHet bewijs is duidelijk: slaapgebrek tast kracht, prestaties en herstel aan. Een studie van Nedeltcheva et al. (2010, Annals of Internal Medicine) liet zien dat mensen op een caloriearm dieet die te weinig sliepen duidelijk meer spiermassa en minder vet verloren dan uitgeruste mensen: bij slaapgebrek offerde het lichaam bij voorkeur spieren op. Ook het aantal blessures stijgt meetbaar bij chronisch slaaptekort.\n\nZeven tot negen uur per nacht is voor de meeste sporters een zinvol doel. Vaste bedtijden, een donkere, koele kamer en ’s avonds geen schermen en cafeïne verbeteren de slaapkwaliteit merkbaar.',
      },
      {
        title: 'Signalen van overtraining',
        content: 'Een echt overtrainingssyndroom is zeldzaam en vraagt weken tot maanden herstel; vaker gaat het om zogenoemd overreaching, een tijdelijke overbelasting. Beide uiten zich in vergelijkbare waarschuwingssignalen die je serieus moet nemen.\n\nTypische signalen zijn: aanhoudende prestatiedaling ondanks training, ongewoon hevige of langdurige spierpijn, slaapproblemen, een verhoogde rusthartslag, prikkelbaarheid, verlies van motivatie en vaker infecties. Als meerdere daarvan samenvallen, is dat een duidelijk signaal om de belasting te verlagen.\n\nBelangrijk: één slechte trainingsdag is geen overtraining. Pas een aanhoudend patroon over één tot twee weken zou tot aanpassingen moeten leiden. De beste remedie is meestal niet meer maar minder: minder volume, meer slaap en zo nodig een deloadweek.',
      },
      {
        title: 'Deload en belastingsmanagement',
        content: 'Een deloadweek is een geplande fase met minder belasting, waarin je volume en/of intensiteit bewust terugschroeft, meestal naar ongeveer de helft van het volume of met duidelijk lichtere gewichten. Het doel is opgestapelde vermoeidheid kwijt te raken zonder de trainingsprikkel helemaal te verliezen.\n\nWanneer een deload zinvol is, verschilt per persoon. Veel sporters hebben baat bij zo’n week ongeveer elke 4–8 weken intensieve training, of telkens wanneer waarschuwingssignalen zich opstapelen. Gevorderden met een hoog volume hebben er vaker een nodig dan beginners.\n\nNaast geplande deloads telt doorlopend belastingsmanagement: stem de trainingsintensiteit af op je dagvorm, wissel zware en lichtere trainingen af en houd rekening met stress in je dagelijks leven. Herstel is geen star schema, maar flexibel luisteren naar de signalen van je lichaam.',
      },
      {
        title: 'Samenvatting',
        content: 'Vooruitgang ontstaat in het herstel, niet in de training zelf. Wie de prikkel geeft maar het herstel verwaarloost, verspilt resultaten en riskeert overbelasting.\n\nDe effectiefste hefbomen zijn slaap (7–9 uur), voldoende calorieën en eiwit en bewust belastingsmanagement met af en toe een deloadweek. Waarschuwingssignalen zoals aanhoudende prestatiedaling, slecht slapen en verlies van motivatie moet je serieus nemen.\n\nHerstel is geen teken van zwakte, maar het deel van de training waarin de eigenlijke aanpassing plaatsvindt. Wie het plant en respecteert, traint op lange termijn gezonder en succesvoller.',
      },
    ],
  },

  technique_rom: {
    name: 'Techniek & bewegingsuitslag',
    summary: 'Een nette techniek over de volledige bewegingsuitslag maakt oefeningen effectiever en veiliger. Ze zorgt ervoor dat de doelspier de prikkel krijgt, verlaagt het blessurerisico en is de basis van elke progressie.',
    quick: [
      { label: 'Basisregel', text: 'Volledige bewegingsuitslag, gecontroleerd, gericht op de doelspier: techniek gaat voor gewicht.' },
      { label: 'Waarom het telt', text: 'Betere prikkel, lager blessurerisico, een zuivere basis voor progressie.' },
    ],
    sections: [
      {
        title: 'Waarom techniek ertoe doet',
        content: 'Een goede oefentechniek heeft twee centrale functies: ze zorgt ervoor dat de belasting echt bij de doelspier aankomt, en ze houdt de gewrichten in veilige posities. Samen bepalen ze of een oefening effectief en duurzaam is.\n\nTrainen met slechte techniek verschuift de belasting vaak naar spieren die niet bedoeld zijn of naar passieve structuren zoals banden en pezen. Dat verkleint niet alleen het trainingseffect, maar verhoogt ook het risico op overbelastingsblessures. Techniek is dus geen doel op zich, maar de voorwaarde om met training te bereiken wat je wilt.\n\nVooral in het begin loont het om bewegingspatronen met lichte gewichten aan te leren. Het zenuwstelsel legt patronen vast door herhaling: een netjes ingeslepen techniek vormt de basis waarop je later veilig zwaardere gewichten aankunt.',
      },
      {
        title: 'Volledige bewegingsuitslag',
        content: 'De bewegingsuitslag (range of motion, ROM) beschrijft de afstand waarover een spier tijdens een oefening werkt. Als vuistregel geldt: een zo volledig mogelijke uitslag is beter dan een verkorte, vooral voor spiergroei.\n\nMeerdere studies ondersteunen dit. Een review van Schoenfeld & Grgic (2020, SAGE Open Medicine) concludeert dat volledige bewegingsuitslagen over het algemeen tot meer spiergroei leiden dan gedeeltelijke bewegingen. Vooral de gestrekte positie onder belasting lijkt een sterke groeiprikkel. Diepe squats bevorderen bijvoorbeeld de ontwikkeling van de dijen meer dan halve squats.\n\nEr zijn uitzonderingen: bij sommige oefeningen of bij gezondheidsbeperkingen kan een iets aangepaste uitslag zinvol zijn. Over het algemeen streef je echter naar de grootste uitslag die je met goede techniek en zonder pijn kunt beheersen.',
      },
      {
        title: 'Tempo en controle',
        content: 'Hoe snel je een herhaling uitvoert, beïnvloedt de prikkel. Vooral de excentrische fase (het gewicht laten zakken) hoort gecontroleerd te verlopen: laat het gewicht niet vallen, maar rem het actief af. Zo blijft de spanning op de spier en verbetert de controle.\n\nEen veelgemaakte fout is werken met momentum. Wie het gewicht met schokkerige bewegingen omhoog rukt, verplaatst het werk van de spieren naar het momentum en verkleint zo het trainingseffect. Gecontroleerde, bewuste herhalingen zijn bijna altijd effectiever dan snelle, slordige.\n\nDat betekent niet dat elke herhaling extreem langzaam moet. Een zinvolle richtlijn: concentrische fase (heffen) vlot maar gecontroleerd, excentrische fase (laten zakken) over ongeveer twee tot drie seconden. De focus ligt altijd op het bewust voelen en aansturen van de werkende spier.',
      },
      {
        title: 'Veelgemaakte fouten en hoe je ze oplost',
        content: 'De meest gemaakte fout is te veel gewicht ten koste van de techniek. Lukken de laatste herhalingen alleen nog met momentum, ontwijkbewegingen of een onvolledige uitslag, dan is het gewicht te hoog. De oplossing is simpel: verlaag het en voer de beweging netjes uit.\n\nEen tweede fout is het verwaarlozen van de excentrische fase. Velen laten het gewicht ongecontroleerd terugvallen en verspillen zo een groot deel van de prikkel. Bewust afremmen lost dat meteen op.\n\nEen derde punt is te weinig aandacht voor de doelspier. De ‘mind-muscle connection’, de bewuste focus op de werkende spier, kan de activatie verbeteren, vooral bij isolatieoefeningen. Video-opnames van je eigen uitvoering of feedback van ervaren sporters helpen techniekfouten te herkennen en te corrigeren.',
      },
      {
        title: 'Samenvatting',
        content: 'Een nette techniek over de volledige bewegingsuitslag is de basis van effectief en veilig trainen. Ze zorgt ervoor dat de doelspier de prikkel krijgt en beschermt de gewrichten.\n\nStreef naar de grootst mogelijke gecontroleerde uitslag, voer vooral de excentrische fase bewust uit en vermijd momentum. Techniek gaat altijd voor gewicht: pas als de beweging goed zit, heeft extra belasting zin.\n\nGoede techniek is geen eenmalige zaak, maar een blijvende prioriteit. Wie haar bewaakt, traint effectiever, blijft langer blessurevrij en legt de basis voor onafgebroken vooruitgang.',
      },
    ],
  },

  periodization: {
    name: 'Periodisering & planning',
    summary: 'Periodisering is het geplande structureren van training in de tijd, met afwisselende fases van volume, intensiteit en herstel. Het helpt plateaus te vermijden, overtraining te voorkomen en op lange termijn onafgebroken vooruitgang te boeken.',
    quick: [
      { label: 'Kernidee', text: 'Training bewust in fases plannen in plaats van elke week hetzelfde te doen.' },
      { label: 'Voor wie', text: 'Vooral gevorderden; beginners komen lange tijd goed uit met eenvoudige lineaire progressie.' },
    ],
    sections: [
      {
        title: 'Wat is periodisering?',
        content: 'Periodisering is het systematisch plannen van training over verschillende tijdsblokken. In plaats van week na week hetzelfde te trainen, varieer je bewust variabelen als volume, intensiteit, herhalingsbereik en oefenkeuze, om over een langere periode vooruitgang te boeken en vermoeidheid te sturen.\n\nHet concept komt oorspronkelijk uit de wedstrijdsport en gaat terug op werk van Leo Matveyev en Tudor Bompa. Het doel was atleten voor bepaalde wedstrijden in topvorm te brengen. Het onderliggende idee, belasting en herstel gepland af te wisselen, is echter voor iedere sporter nuttig.\n\nGebruikelijk is het onderscheid tussen macrocyclus (het hele plan over maanden tot een jaar), mesocyclus (blokken van meerdere weken met één focus) en microcyclus (meestal een trainingsweek). Deze structuur helpt het grote doel op te delen in overzichtelijke, op elkaar voortbouwende etappes.',
      },
      {
        title: 'Modellen van periodisering',
        content: 'Er bestaan meerdere beproefde modellen. Lineaire periodisering begint met hoog volume en lage intensiteit en schuift over de weken op naar minder volume en hogere intensiteit, klassiek van hypertrofie- naar krachtfases.\n\nGolvende (ondulerende) periodisering varieert de belasting in kortere tussenpozen, vaak van training tot training binnen een week: bijvoorbeeld een dag met zware, weinig herhalingen, een andere met gematigde en een derde met veel herhalingen. Een meta-analyse suggereert dat beide modellen effectief zijn en dat de verschillen in de praktijk vaak klein zijn (Williams et al., 2017, Sports Medicine).\n\nBlokperiodisering legt over meerdere weken de nadruk op één focus (bijv. een volumeblok gevolgd door een intensiteitsblok). Welk model het best past, hangt af van doelen, ervaring en voorkeuren. Wat telt, is dat er überhaupt een plan met bewuste variatie is.',
      },
      {
        title: 'Hebben beginners periodisering nodig?',
        content: 'Voor beginners is complexe periodisering meestal overbodig. In de eerste maanden reageert het lichaam zo sterk op elke trainingsprikkel dat eenvoudige lineaire progressie (week na week een beetje meer gewicht of herhalingen) al uitstekende vooruitgang oplevert. Deze fase heet vaak ‘newbie gains’.\n\nPas als deze snelle beginprogressie afvlakt, meestal na een paar maanden tot ongeveer een jaar consequent trainen, wordt een doordachtere structuur echt nuttig. Afwisselende fases helpen dan om een prikkel te blijven geven zonder in overtraining of stagnatie te belanden.\n\nVoor beginners geldt dus: consistentie, goede techniek en eenvoudige progressie winnen het van elke ingewikkelde planning. Periodisering is gereedschap voor gevorderden, geen voorwaarde om te beginnen.',
      },
      {
        title: 'Een eenvoudig plan opbouwen',
        content: 'Een goed trainingsplan begint bij je doelen en de beschikbare tijd. Daaruit volgen de trainingsfrequentie (bijv. 3–4 trainingen per week) en de split, zoals full body bij weinig trainingen, of een upper/lower- of push-pull-legs-split bij meer trainingen.\n\nOp basis daarvan verdeel je oefeningen en volume zo dat elke spiergroep idealiter twee keer per week met in totaal ongeveer 10–20 zware sets wordt getraind. Samengestelde oefeningen (squat, deadlift, bench press en overhead press, pull-ups, rows) vormen de basis, aangevuld met isolatieoefeningen voor zwakke punten.\n\nOver de weken maak je progressie (meer gewicht of herhalingen), en ongeveer elke 4–8 weken kun je een deloadweek inplannen. Een plan hoeft niet ingewikkeld te zijn: het moet bij je leven passen, consequent worden uitgevoerd en regelmatig op basis van je vooruitgang worden bijgesteld.',
      },
      {
        title: 'Samenvatting',
        content: 'Periodisering is de geplande variatie van training in de tijd om plateaus en overtraining te vermijden. Gangbare modellen zijn lineaire, golvende en blokperiodisering; in de praktijk zijn de verschillen vaak kleiner dan gedacht.\n\nBeginners hebben geen complexe periodisering nodig; eenvoudige lineaire progressie brengt ze goed door de eerste maanden. Pas gevorderden hebben merkbaar baat bij geplande fases.\n\nHet belangrijkste is een plan dat bij je doelen en je dagelijks leven past, elke spiergroep voldoende traint, progressief wordt opgebouwd en herstel inplant. Structuur en consistentie winnen het van elke zogenaamd ‘perfecte’ methode.',
      },
    ],
  },
};
