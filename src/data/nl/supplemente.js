// Nederlandse versie van `src/data/supplementsKnowledge.js`.
// Sleutel = `id` uit het databestand, de volgorde van de `sections` moet
// overeenkomen. Controleren met: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Basis',
    leistung: 'Prestatie',
    gesundheit: 'Gezondheid',
  },

  creatine: {
    name: 'Creatine',
    summary: 'Creatine is het best onderzochte en effectiefste supplement voor kracht en spieropbouw. Het is veilig, goedkoop en verbetert aantoonbaar de prestatie bij korte, intensieve inspanningen. Creatinemonohydraat is de voorkeursvorm.',
    quick: [
      { label: 'Dosering', text: 'Dagelijks 3–5 g monohydraat, doorlopend; het moment maakt niet uit. Laadfase optioneel. Meer spiermassa betekent de bovenkant van het bereik.' },
      { label: 'Effect', text: 'Meer kracht en herhalingen, ondersteunt spiergroei, goed onderbouwd en veilig.' },
    ],
    sections: [
      {
        title: 'Wat creatine is en hoe het werkt',
        content: 'Creatine is een lichaamseigen stof die in spieren en hersenen voorkomt en die je ook binnenkrijgt via dierlijke voeding zoals vlees en vis. In de spier wordt het opgeslagen als creatinefosfaat en dient het om ATP, de directe energiedrager van de cel, snel te regenereren.\n\nBij korte, intensieve inspanningen, zoals zware sets bij krachttraining of sprints, raakt ATP binnen enkele seconden op. Creatinefosfaat helpt het snel weer op te bouwen, zodat je meer kracht over meer herhalingen kunt volhouden. Volle creatinevoorraden betekenen dus meer trainingsprestatie.\n\nDoor suppletie kan het creatinegehalte in de spier ongeveer 20–40% boven het normale niveau stijgen. Deze stijging verklaart het prestatieverhogende effect, dat in honderden studies consequent is bevestigd.',
      },
      {
        title: 'Het bewijs',
        content: 'Geen enkel supplement voor krachtsporters is beter onderzocht dan creatine. Een position stand van de International Society of Sports Nutrition (Kreider et al., 2017, Journal of the International Society of Sports Nutrition) vat samen: creatinemonohydraat is het effectiefste supplement om de prestatie bij hoge intensiteit te verhogen en spieropbouw te ondersteunen.\n\nDe effecten zijn duidelijk meetbaar: in combinatie met krachttraining verhoogt creatine de winst in kracht en vetvrije massa aanzienlijk meer dan training alleen. Het voordeel is zichtbaar in vrijwel alle leeftijdsgroepen en prestatieniveaus.\n\nBuiten de sport wordt creatine steeds vaker onderzocht op mogelijke cognitieve en gezondheidsvoordelen, bijvoorbeeld bij mentale vermoeidheid of veroudering. Dat onderzoek is veelbelovend, maar nog niet zo eenduidig als het bewijs voor fysieke prestaties. Het aparte hoofdstuk hieronder zet uiteen wat daar vaststaat en wat niet.',
      },
      {
        title: 'Dosering en gebruik',
        content: 'Het gebruik is eenvoudig. De meest gangbare aanpak is een dagelijkse onderhoudsdosis van 3–5 g creatinemonohydraat. Het moment speelt geen noemenswaardige rol: wat telt is de dagelijkse, doorlopende inname, omdat de voorraden zich in de loop van de tijd vullen.\n\nOptioneel is er een laadfase: ongeveer 20 g per dag (verdeeld over vier porties) gedurende vijf tot zeven dagen om de voorraden sneller te vullen. Daarna volgt de normale onderhoudsdosis. De laadfase versnelt alleen het effect; zonder laadfase zijn de voorraden na ongeveer drie tot vier weken ook vol.\n\nCreatinemonohydraat is de best onderzochte en goedkoopste vorm. Duurdere varianten (bijv. Kre-Alkalyn, creatine-HCl) bieden geen aangetoond extra voordeel. Het is aan te raden een product met een kwaliteitskeurmerk zoals Creapure te kiezen.\n\nHet bereik van 3 tot 5 gram is niet willekeurig, het volgt de spiermassa. Het ISSN-position stand rekent met ongeveer 0,03 g per kilogram lichaamsgewicht per dag. Zwaardere, gespierdere mensen zitten richting de bovenkant van het bereik, lichtere mensen richting de onderkant. Voor de spier geeft niets hiervan reden om ver boven 5 g uit te komen.',
      },
      {
        title: 'Creatine voor de hersenen: wat vaststaat en wat niet',
        content: 'Creatine zit niet alleen in de spier, maar ook in de hersenen, waar het hetzelfde werk doet: ATP snel aanvullen. Daaruit is de wijdverbreide aanname ontstaan dat hogere doses cognitieve voordelen opleveren, en dat de ‘eigenlijk juiste’ hoeveelheid ver boven 3–5 g ligt.\n\nHet bewijs ondersteunt dat tot nu toe niet. Twee bevindingen zijn belangrijk. Ten eerste is creatine in de hersenen veel moeilijker te verhogen dan in de spier: terwijl het spiergehalte met 20–40 % stijgt, schatten reviews de hersenen op ongeveer 3–10 %. De bloed-hersenbarrière remt de opname af, en de hersenen maken een deel van hun creatine zelf aan. Ten tweede is de optimale hoeveelheid simpelweg onbekend: slechts een handvol studies heeft het verband tussen dosis en creatine in de hersenen überhaupt onderzocht.\n\nHoe niet-lineair dat is, liet een studie zien waarin vegetariërs en alleseters zeven dagen lang 0,3 g per kilogram kregen, bij 80 kg zo’n 24 g per dag. Het gehalte in de spier steeg duidelijk; in de hersenen veranderde het niet meetbaar.\n\nHogere doses worden wel degelijk onderzocht: er lopen studies met 10 en 20 g per dag over meerdere weken, en ook met eenmalige doses bij slaaptekort. Het is een actief veld met een plausibele onderbouwing, maar het is geen vaststaande kennis. Voor kracht en spieropbouw blijft 3–5 g de onderbouwde standaard. Wie uit interesse in de cognitieve effecten hoger wil doseren, moet weten dat hij een hypothese volgt, geen aanbeveling.',
      },
      {
        title: 'Veiligheid en mythes',
        content: 'Creatine behoort tot de veiligste supplementen die er zijn. Langetermijnstudies over meerdere jaren tonen bij gezonde mensen geen schadelijke effecten. De hardnekkige mythe dat creatine de nieren beschadigt, wordt bij mensen met gezonde nieren niet ondersteund (Kreider et al., 2017). Bij een bestaande nierziekte moet je de inname echter met een arts bespreken.\n\nEen andere mythe is dat creatine ‘vocht vasthouden’ veroorzaakt in de zin van een opgeblazen uiterlijk. In werkelijkheid trekt creatine water de spiercellen in, wat tot een vollere spier leidt en niet tot zichtbaar vasthouden van vocht. Een lichte toename van het lichaamsgewicht in het begin is normaal en gewenst.\n\nOok haaruitval wordt af en toe met creatine in verband gebracht, op basis van één enkele studie. Dat verband is wetenschappelijk niet vastgesteld. Over het geheel genomen wordt creatine goed verdragen; sommige mensen reageren op zeer hoge losse doses met maag-darmklachten, wat je met kleinere porties kunt vermijden.',
      },
      {
        title: 'Samenvatting',
        content: 'Creatine is het effectiefste en best onderbouwde supplement voor kracht en spieropbouw: veilig, goedkoop en eenvoudig in gebruik. Voor kracht en spieropbouw heb je niet meer nodig dan dagelijks 3–5 g monohydraat, doorlopend; hogere doses voor de hersenen worden onderzocht, maar zijn nog geen aanbeveling.\n\nHet moment maakt niet uit, een laadfase is optioneel. Kies puur monohydraat; duurdere vormen voegen niets toe. De gangbare waarschuwingen voor schade aan nieren of haar worden bij gezonde mensen niet ondersteund.\n\nAls je maar één supplement voor prestaties zou kiezen, ligt creatine voor de hand. Bij bestaande gezondheidsklachten is, zoals altijd, overleg met een arts verstandig.',
      },
    ],
  },

  protein_powder: {
    name: 'Eiwitpoeder (whey & co.)',
    summary: 'Eiwitpoeder is geen wondermiddel, maar een handige, goedkope eiwitbron. Het helpt je je dagelijkse behoefte te dekken wanneer dat met gewone voeding lastig is. Niet meer en niet minder.',
    quick: [
      { label: 'Doel', text: 'Een praktische aanvulling om je dagelijkse eiwitdoel te halen, geen must.' },
      { label: 'Keuze', text: 'Whey (snel), caseïne (langzaam), plantaardig (vegan). Allemaal effectief in voldoende hoeveelheid.' },
    ],
    sections: [
      {
        title: 'Wat eiwitpoeder is',
        content: 'Eiwitpoeder is geconcentreerd voedingseiwit, meestal uit melk (whey en caseïne), maar ook uit plantaardige bronnen zoals erwt, rijst of soja. Het levert dezelfde aminozuren als eiwitrijke voeding, alleen in een handige, snel klaar te maken vorm.\n\nHet belangrijkste eerst: eiwitpoeder is geen ‘anabool’ wonder. Het is gewoon voeding, een handige manier om je eiwitbehoefte te dekken. Wie zijn dagdoel makkelijk haalt met vlees, vis, eieren, zuivel en peulvruchten, heeft geen poeder nodig.\n\nDe waarde zit in het gemak: een shake is snel gemaakt, makkelijk te doseren, goedkoop per gram eiwit en makkelijk mee te nemen. Voor mensen met een hoge eiwitbehoefte, weinig tijd of weinig eetlust is het een nuttig hulpmiddel.',
      },
      {
        title: 'Whey, caseïne en plantaardige eiwitten',
        content: 'Wheyproteïne is de populairste vorm. Het wordt snel verteerd, is rijk aan het aminozuur leucine en stimuleert de spiereiwitsynthese sterk. Het bestaat als concentraat (goedkoop, wat lactose), isolaat (zuiverder, weinig lactose) en hydrolysaat (voorverteerd, duurder).\n\nCaseïne is ook een melkeiwit, maar wordt langzaam verteerd en geeft aminozuren over meerdere uren af. Sommigen gebruiken het voor langere periodes tussen maaltijden, bijvoorbeeld voor het slapengaan. In de praktijk is het verschil met whey voor de meeste mensen echter klein.\n\nPlantaardige eiwitten (erwt, rijst, soja) zijn de keuze voor wie veganistisch leeft. Afzonderlijke plantaardige bronnen kunnen beperkt zijn in bepaalde aminozuren, daarom combineren goede producten meerdere bronnen. Bij een voldoende totale hoeveelheid zijn plantaardige poeders voor spieropbouw vergelijkbaar effectief als whey.',
      },
      {
        title: 'Verstandig gebruik',
        content: 'Eiwitpoeder is nuttig wanneer een snelle, hoogwaardige eiwitbron praktisch is: na de training, als tussendoortje, door je ontbijtgranen of om op drukke dagen je eiwitdoel te halen. Eén tot twee porties per dag zijn voor de meeste mensen zinvol.\n\nHet hoort gewone voeding wel aan te vullen, niet te vervangen. Volwaardige eiwitbronnen leveren daarnaast micronutriënten, verzadigen beter en horen bij een evenwichtig dieet. Een shake is een hulpmiddel voor het dagelijks leven, geen basisvoedsel.\n\nBij het kiezen van een product loont een blik op de ingrediëntenlijst: zo min mogelijk toevoegingen, een goed eiwitgehalte per portie en idealiter een onafhankelijk testkeurmerk. Heel goedkope poeders bevatten soms veel vulstof of suiker.',
      },
      {
        title: 'Veiligheid en perspectief',
        content: 'Voor gezonde mensen is eiwitpoeder veilig. De zorg dat een hoge eiwitinname via poeder de nieren beschadigt, geldt, net als bij eiwit in het algemeen, alleen bij een bestaande nierziekte. Bij lactose-intolerantie worden isolaat of plantaardige varianten beter verdragen.\n\nEen kwaliteitsaspect is zuiverheid. Omdat supplementen minder streng gereguleerd zijn dan geneesmiddelen, lonen producten met onafhankelijke labtests (bijv. op zware metalen of dopingstoffen), vooral voor wedstrijdsporters.\n\nKortom: eiwitpoeder is een praktisch, geen onmisbaar product. Het vervangt geen goede voeding, maar kan helpen je eiwitbehoefte makkelijk en goedkoop te dekken. Bij gezondheidsvragen is overleg met een arts of diëtist verstandig.',
      },
    ],
  },

  caffeine: {
    name: 'Cafeïne',
    summary: 'Cafeïne is een van de effectiefste legale prestatieverhogers. Het vermindert ervaren vermoeidheid en verhoogt focus en spieruithoudingsvermogen. Het effect is goed onderbouwd, maar de dosering hoort individueel en gematigd te zijn.',
    quick: [
      { label: 'Dosering', text: 'Ongeveer 3–6 mg per kg lichaamsgewicht, 30–60 min voor de training.' },
      { label: 'Let op', text: 'Bescherm je slaap (niet laat op de dag), let op gewenning, test hoe je het verdraagt.' },
    ],
    sections: [
      {
        title: 'Hoe cafeïne werkt',
        content: 'Cafeïne is een stimulerend middel dat vooral werkt door adenosinereceptoren in de hersenen te blokkeren. Adenosine is een boodschapperstof die vermoeidheid signaleert; door de koppelplaatsen ervan te bezetten, dempt cafeïne het vermoeidheidsgevoel en verlaagt het de ervaren inspanning.\n\nHet resultaat is een toestand van meer alertheid, betere focus en meer bereidheid om je in te spannen. Voor de training betekent dat: inspanningen voelen lichter, wat leidt tot meer herhalingen, meer uithoudingsvermogen en vaak betere prestaties.\n\nCafeïne is een van de weinige supplementen met een duidelijk aangetoond, direct merkbaar effect. Je krijgt het binnen via koffie, thee, energiedrankjes of als pure cafeïne (tabletten, poeder), en het werkt binnen ongeveer 30–60 minuten.',
      },
      {
        title: 'Het bewijs',
        content: 'Cafeïne behoort tot de best onderzochte prestatieverhogende stoffen. Een uitgebreide review (Grgic et al., 2020, British Journal of Sports Medicine) bevestigt positieve effecten op kracht, spieruithoudingsvermogen, sprints en duurprestaties in veel sporten.\n\nDe effectgroottes zijn gematigd, maar betrouwbaar. Vooral bij vermoeiende, herhaalde inspanningen en in situaties met slaaptekort of weinig motivatie kan cafeïne een merkbaar verschil maken. Ook cognitieve prestaties, zoals reactietijd en aandacht, hebben er baat bij.\n\nDe effectieve dosis ligt in de meeste studies rond 3–6 mg per kilogram lichaamsgewicht. Hogere doses leveren zelden meer prestatie op, maar verhogen bijwerkingen zoals nervositeit, hartkloppingen en slaapproblemen.',
      },
      {
        title: 'Dosering en timing',
        content: 'Voor trainingsprestaties is ongeveer 3–6 mg per kilogram lichaamsgewicht effectief gebleken, ingenomen zo’n 30–60 minuten voor de inspanning. Voor iemand van 75 kg komt dat neer op ongeveer 225–450 mg; ter vergelijking: een kop filterkoffie bevat ongeveer 80–120 mg.\n\nWie gevoelig is of er niet aan gewend is, begint het best met een lage dosis en test hoe hij het verdraagt. De individuele verschillen zijn groot: de een verdraagt veel, de ander reageert al op kleine hoeveelheden met onrust of hartkloppingen.\n\nEen belangrijk punt is het tijdstip. Cafeïne heeft een halfwaardetijd van ongeveer vijf tot zes uur: een late training met een hoge dosis kan je slaap flink verstoren. Als vuistregel vermijd je grotere hoeveelheden in de laatste zes tot acht uur voor het slapengaan.',
      },
      {
        title: 'Gewenning, bijwerkingen en veiligheid',
        content: 'Bij regelmatig gebruik ontwikkelt het lichaam een zekere gewenning en neemt het effect af. Sommigen nemen daarom bewust pauzes of bewaren hogere doses voor belangrijke trainingen. Volledige onthouding is echter niet nodig; gematigd regelmatig gebruik blijft effectief.\n\nMogelijke bijwerkingen zijn nervositeit, hartkloppingen, maagklachten, angst en slaapproblemen, meestal bij een te hoge dosis. Bij bepaalde hart- en vaatziekten, tijdens de zwangerschap of bij angststoornissen is voorzichtigheid geboden en wordt overleg met een arts aangeraden.\n\nOver het geheel genomen geldt cafeïne in gematigde hoeveelheden (tot ongeveer 400 mg per dag voor gezonde volwassenen) als veilig. Zeer hoge losse doses, vooral uit pure cafeïnepoeder, kunnen gevaarlijk zijn; nauwkeurig afmeten is hier cruciaal. Zoals bij alle stoffen geldt: zoek de dosis die je individueel verdraagt en die werkt, niet het maximum.',
      },
      {
        title: 'Samenvatting',
        content: 'Cafeïne is een effectieve, goed onderbouwde en legale prestatieverhoger. Het verlaagt ervaren vermoeidheid en verbetert focus, spieruithoudingsvermogen en duurprestaties.\n\nGangbaar is een dosis van ongeveer 3–6 mg per kilogram lichaamsgewicht, 30–60 minuten voor de training. Begin laag, test hoe je het verdraagt en bescherm je slaap door late cafeïne te vermijden.\n\nIn gematigde hoeveelheden is cafeïne veilig, maar bij overdosering of bestaande aandoeningen kan het problemen geven. Gebruik het bewust als hulpmiddel, niet als dagelijkse maximale dosis, en raadpleeg bij gezondheidsvragen een arts.',
      },
    ],
  },

  omega3: {
    name: 'Omega-3-vetzuren',
    summary: 'Omega-3-vetzuren (EPA en DHA) zijn essentieel en werken ontstekingsremmend. Veel mensen krijgen er te weinig van binnen. Vette vis is de beste bron; een supplement kan zinvol zijn als je weinig vis eet.',
    quick: [
      { label: 'Bron & dosis', text: 'Vette vis 2–3× per week; als supplement vaak ~1–2 g EPA+DHA per dag.' },
      { label: 'Voordeel', text: 'Hart-, vaat- en hersengezondheid, regulatie van ontstekingen; voor veganisten via algenolie.' },
    ],
    sections: [
      {
        title: 'Wat omega-3-vetzuren zijn',
        content: 'Omega-3-vetzuren zijn een groep meervoudig onverzadigde vetten die het lichaam niet zelf kan aanmaken en dus uit de voeding moet halen. De belangrijkste zijn EPA (eicosapentaeenzuur) en DHA (docosahexaeenzuur), die vooral in vette vis zitten, en ALA (alfa-linoleenzuur) uit plantaardige bronnen.\n\nEPA en DHA zijn bouwstenen van celmembranen en voorlopers van boodschapperstoffen die ontstekingsprocessen regelen. DHA is bovendien een belangrijk bestanddeel van de hersenen en het netvlies. Deze vetzuren zijn dus van belang voor hart, hersenen en afweersysteem.\n\nHet probleem: het moderne dieet levert vaak veel omega-6 (uit bewerkte plantaardige oliën), maar weinig omega-3. Die onbalans zorgt, samen met een lage visconsumptie, ervoor dat veel mensen er te weinig van binnenkrijgen.',
      },
      {
        title: 'Betekenis voor de gezondheid',
        content: 'Het onderzoek naar omega-3 is uitgebreid. Het best onderbouwde voordeel betreft de hart- en vaatgezondheid: EPA en DHA kunnen de triglyceridenwaarden in het bloed verlagen en worden in verband gebracht met een gunstiger cardiovasculair risicoprofiel. Vakorganisaties adviseren regelmatig vette vis te eten.\n\nDaarnaast wordt een ontstekingsremmend effect onderzocht dat relevant zou kunnen zijn voor de gezondheid van gewrichten en het herstel na de training. Ook zijn er aanwijzingen voor positieve effecten op hersenfunctie en stemming, al is het bewijs daar minder duidelijk.\n\nHet is belangrijk onderscheid te maken tussen aangetoonde en overdreven beweringen. Omega-3 is geen wondermiddel, maar een voldoende inname is een zinvolle bouwsteen van een gezond dieet, vooral voor mensen die zelden vis eten.',
      },
      {
        title: 'Bronnen en suppletie',
        content: 'De beste bron van EPA en DHA is vette koudwatervis: zalm, makreel, haring, sardines. Twee tot drie porties per week dekken de behoefte van de meeste mensen. Plantaardige bronnen zoals lijnzaad of walnoten leveren ALA, dat het lichaam echter maar in kleine mate omzet in EPA en DHA.\n\nWie weinig of geen vis eet, kan een supplement overwegen. Capsules met visolie of algenolie leveren EPA en DHA direct; algenolie is het plantaardige, veganistische alternatief. Gangbare supplementdoses liggen rond 1–2 g EPA plus DHA per dag, al is de precieze behoefte individueel.\n\nBij het kiezen van een product telt de kwaliteit: let op het werkelijke EPA/DHA-gehalte (niet alleen de totale hoeveelheid visolie), versheid (ranzige olie wil je niet) en idealiter een zuiverheidstest. De omega-3-index in het bloed kan de voorziening objectief weergeven.',
      },
      {
        title: 'Veiligheid en perspectief',
        content: 'Omega-3-supplementen gelden in gebruikelijke doses als veilig en goed verdraagbaar. Mogelijke bijwerkingen zijn een visachtige nasmaak of lichte maag-darmklachten. In zeer hoge doses kan omega-3 de bloedstolling beïnvloeden; wie bloedverdunners gebruikt of een operatie gepland heeft, hoort de inname met een arts te bespreken.\n\nZoals bij alle supplementen geldt: ze vullen een goed dieet aan, maar vervangen het niet. Wie regelmatig vette vis eet, heeft meestal geen extra olie nodig. Het supplement is vooral zinvol voor mensen die geen vis eten en voor veganisten (algenolie).\n\nBij gezondheidsvragen, bestaande aandoeningen of medicijngebruik is overleg met een arts aan te raden. Een bloedtest van de omega-3-index kan helpen je individuele behoefte gericht in te schatten in plaats van zomaar aan te vullen.',
      },
    ],
  },

  vitamin_d: {
    name: 'Vitamine D',
    summary: 'Vitamine D is belangrijk voor botten, spieren en het afweersysteem. Het wordt vooral onder invloed van zonlicht aangemaakt, daarom is een tekort in de zonarme maanden vaak voorkomend. Suppletie is dan vaak zinvol, idealiter na een bloedtest.',
    quick: [
      { label: 'Bron', text: 'Zonlicht (huid), weinig uit voeding. In de winter is vaak een supplement nodig.' },
      { label: 'Praktijk', text: 'Bij een tekort vaak ~1000–2000 IE per dag; de dosis idealiter afstemmen op een bloedtest.' },
    ],
    sections: [
      {
        title: 'Waarom vitamine D bijzonder is',
        content: 'Vitamine D neemt onder de vitamines een bijzondere plaats in, omdat het lichaam het onder invloed van zonlicht (uv-B-straling) zelf in de huid kan aanmaken. Strikt genomen werkt het eerder als een hormoon: het regelt de opname van calcium en fosfaat en is daarmee essentieel voor gezonde botten en tanden.\n\nNaast de botgezondheid heeft vitamine D functies in de spieren en het afweersysteem. Receptoren ervoor zitten in veel weefsels van het lichaam, wat de brede betekenis verklaart. Een uitgesproken tekort kan bijdragen aan spierzwakte, botproblemen en een grotere vatbaarheid voor infecties.\n\nBijzonder en tegelijk problematisch: omdat zonlicht de belangrijkste bron is, hangt de voorziening sterk af van woonplaats, seizoen, huidskleur en levensstijl. In veel regio’s is het zonlicht in de winter niet genoeg om voldoende vitamine D aan te maken.',
      },
      {
        title: 'Een tekort komt veel voor',
        content: 'Een vitamine-D-tekort is wereldwijd een van de meest voorkomende tekorten aan voedingsstoffen, vooral op noordelijke breedtegraden en in de wintermaanden. Mensen die veel binnen werken, een donkerdere huid hebben, zich bedekken of ouder zijn, lopen meer risico, omdat hun eigen aanmaak beperkt is.\n\nAlleen via voeding is de behoefte moeilijk te dekken. Maar weinig voedingsmiddelen bevatten noemenswaardige hoeveelheden, vooral vette vis, eigeel en verrijkte producten. Die zijn meestal niet genoeg om een tekort te compenseren als de aanmaak via de zon tekortschiet.\n\nDe vitamine-D-status is met een eenvoudige bloedtest (25-OH-vitamine D) te bepalen. Dat is de betrouwbaarste manier om te weten of en hoeveel je moet aanvullen, in plaats van te gokken.',
      },
      {
        title: 'Suppletie in de praktijk',
        content: 'Is er een tekort of is in de zonarme maanden weinig eigen aanmaak mogelijk, dan is suppletie zinvol. Vaak worden onderhoudsdoses genoemd in de orde van ongeveer 1000–2000 IE (internationale eenheden) per dag, al kan de individuele behoefte sterk verschillen.\n\nDe dosis stem je het best af op de bloedwaarde: een test laat de beginwaarde zien, en na een paar weken tot maanden inname kun je het resultaat controleren en de dosis aanpassen. Zo vermijd je zowel een tekort als een overdosis.\n\nVitamine D3 (cholecalciferol) is de voorkeursvorm. Omdat het vetoplosbaar is, wordt het het best opgenomen bij een maaltijd met vet. Het wordt vaak gecombineerd met vitamine K2, dat de calciumstofwisseling ondersteunt; het bewijs daarvoor is veelbelovend, maar niet sluitend.',
      },
      {
        title: 'Veiligheid en medische begeleiding',
        content: 'Vitamine D is vetoplosbaar en kan zich, anders dan wateroplosbare vitamines, in het lichaam ophopen. Zeer hoge doses over lange tijd kunnen leiden tot een gevaarlijk teveel aan calcium in het bloed. ‘Meer is beter’ geldt hier uitdrukkelijk niet; extreem hoge doses zonder medisch toezicht vermijd je.\n\nVoor de meeste mensen zijn gematigde onderhoudsdoses veilig. Wie hoge doses overweegt, bestaande aandoeningen heeft of medicijnen gebruikt, doet dat echter het best onder medische begeleiding. De bloedtest is ook hier het doorslaggevende hulpmiddel om in het veilige en effectieve bereik te blijven.\n\nKortom: vitamine D is een van de weinige supplementen dat voor veel mensen echt nut heeft, vooral in de winter. Het verstandigst is de status te meten en de inname daarop af te stemmen, in plaats van zomaar hoog te doseren.',
      },
    ],
  },

  magnesium: {
    name: 'Magnesium',
    summary: 'Magnesium is betrokken bij meer dan 300 enzymatische processen, waaronder spier- en zenuwfunctie, energiestofwisseling en slaap. Een licht tekort komt vaak voor. Via voeding te dekken, zo nodig eenvoudig aan te vullen.',
    quick: [
      { label: 'Functie', text: 'Spier- & zenuwfunctie, energiestofwisseling, slaap, botten.' },
      { label: 'Bronnen', text: 'Noten, zaden, volkoren granen, peulvruchten, groene groenten; zo nodig een supplement.' },
    ],
    sections: [
      {
        title: 'De rol van magnesium',
        content: 'Magnesium is een essentieel mineraal en cofactor voor meer dan 300 enzymreacties in het lichaam. Het is betrokken bij de energieproductie (ATP-stofwisseling), spier- en zenuwfunctie, eiwitsynthese, bloedsuikerregulatie en botgezondheid.\n\nVoor lichamelijk actieve mensen is magnesium extra relevant, omdat het een centrale rol speelt bij het samentrekken en ontspannen van spieren en in de energiestofwisseling. Een tekort kan zich onder meer uiten in spierkrampen, vermoeidheid, prikkelbaarheid en slechter slapen.\n\nDoor zweet en een verhoogde stofwisseling kan intensieve training de magnesiumbehoefte iets verhogen. Tegelijk is de inname bij veel mensen krap, omdat sterk bewerkte voeding weinig magnesium bevat.',
      },
      {
        title: 'Tekort en behoefte',
        content: 'Een uitgesproken magnesiumtekort is bij een gezond dieet zeldzaam, maar een licht tekort of krappe voorziening komt relatief vaak voor, vooral bij een eenzijdig, sterk bewerkt dieet. De dagelijkse behoefte voor volwassenen ligt rond 300–400 mg, afhankelijk van geslacht en leeftijd.\n\nOmdat magnesium in veel onbewerkte voedingsmiddelen zit, is de behoefte meestal goed via voeding te dekken. Goede bronnen zijn noten en zaden (bijv. pompoenpitten, amandelen), volkoren granen, peulvruchten, groene bladgroenten en pure chocolade.\n\nEen magnesiumtekort is maar beperkt in het bloed te meten, omdat het meeste magnesium in cellen en botten is opgeslagen. Klachten zoals vaak krampen, uitputting of slaapproblemen kunnen, naast andere oorzaken, aanwijzingen zijn en horen bij een vermoeden door een arts te worden onderzocht.',
      },
      {
        title: 'Suppletie',
        content: 'Is de inname via voeding onvoldoende of is de behoefte verhoogd, dan kan een magnesiumsupplement zinvol zijn. De vorm telt voor de verdraagbaarheid: goed verdragen en goed opgenomen worden organische verbindingen zoals magnesiumcitraat, -glycinaat of -malaat. Magnesiumoxide is goedkoop, maar wordt slecht opgenomen en kan laxerend werken.\n\nGangbare aanvullende doses liggen rond 200–400 mg elementair magnesium per dag, vaak ’s avonds ingenomen, omdat magnesium ontspannend kan werken en de slaap kan ondersteunen. Hogere doses kunnen zachte ontlasting of diarree veroorzaken, een teken om de hoeveelheid te verlagen.\n\nHet bewijs voor magnesiumsupplementen is het sterkst bij een aangetoond tekort. Bij mensen die al voldoende binnenkrijgen, is het extra voordeel beperkt. Zoals altijd: eerst voeding, het supplement als gerichte aanvulling.',
      },
      {
        title: 'Veiligheid en samenvatting',
        content: 'Magnesium uit voeding is onschadelijk; het lichaam scheidt een teveel aan magnesium normaal via de nieren uit. Bij supplementen is de meest voorkomende bijwerking een laxerend effect bij een te hoge dosis. Mensen met een verminderde nierfunctie horen magnesiumsupplementen alleen na overleg met een arts te gebruiken, omdat de uitscheiding verstoord kan zijn.\n\nKortom: magnesium is een belangrijk mineraal met een brede betekenis voor spieren, zenuwen, energiestofwisseling en slaap. Een licht tekort komt vaak voor, maar is met een dieet van onbewerkte voeding met noten, zaden, volkoren granen en groene groenten goed te verhelpen.\n\nEen supplement is een zinvolle optie bij een verhoogde behoefte, onvoldoende inname of passende klachten, idealiter in een goed verdraagbare vorm en bij bestaande aandoeningen in overleg met een arts.',
      },
    ],
  },
};
