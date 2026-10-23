// Italienische Fassung von `src/data/supplementsKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Fondamenti',
    leistung: 'Prestazione',
    gesundheit: 'Salute',
  },

  creatine: {
    name: 'Creatina',
    summary: 'La creatina è l’integratore più studiato ed efficace per forza e crescita muscolare. È sicura, economica e migliora in modo dimostrato la prestazione negli sforzi brevi e intensi. La forma da preferire è la creatina monoidrato.',
    quick: [
      { label: 'Dosaggio', text: '3–5 g di monoidrato al giorno, in modo continuativo: il momento dell’assunzione è irrilevante. Fase di carico facoltativa. Più massa muscolare significa la parte alta dell’intervallo.' },
      { label: 'Effetto', text: 'Più forza e più ripetizioni, sostiene la crescita muscolare, ben documentata e sicura.' },
    ],
    sections: [
      {
        title: 'Che cos’è la creatina e come agisce',
        content: 'La creatina è una sostanza prodotta dal corpo, presente nei muscoli e nel cervello, che si assume anche con alimenti di origine animale come carne e pesce. Nel muscolo viene immagazzinata come fosfocreatina e serve a rigenerare rapidamente l’ATP, il vettore di energia immediata della cellula.\n\nDurante gli sforzi brevi e intensi, come le serie pesanti nell’allenamento di forza o gli sprint, l’ATP si esaurisce nel giro di pochi secondi. La fosfocreatina aiuta a ricostituirlo in fretta, così da mantenere più forza per più ripetizioni. Riserve di creatina piene significano quindi più prestazione in allenamento.\n\nCon l’integrazione, il contenuto di creatina nei muscoli si può aumentare di circa il 20–40% oltre il livello normale. Questo aumento spiega l’effetto di miglioramento della prestazione, confermato in modo costante in centinaia di studi.',
      },
      {
        title: 'Le evidenze',
        content: 'Nessun integratore per chi fa allenamento di forza è studiato meglio della creatina. Un position stand dell’International Society of Sports Nutrition (Kreider et al., 2017, Journal of the International Society of Sports Nutrition) riassume: la creatina monoidrato è l’integratore più efficace per aumentare la prestazione ad alta intensità e sostenere la crescita muscolare.\n\nGli effetti sono chiaramente misurabili: in combinazione con l’allenamento di forza, la creatina aumenta i guadagni di forza e la massa magra in modo nettamente maggiore rispetto al solo allenamento. Il beneficio si osserva in quasi tutte le fasce d’età e in tutti i livelli di prestazione.\n\nOltre allo sport, la creatina viene studiata sempre di più per possibili benefici cognitivi e per la salute, per esempio in caso di affaticamento mentale o con l’invecchiamento. Questa ricerca è promettente, ma non ancora chiara quanto le evidenze sulla prestazione fisica: la sezione dedicata più sotto spiega che cosa è assodato e che cosa no.',
      },
      {
        title: 'Dosaggio e utilizzo',
        content: 'L’utilizzo è semplice. L’approccio più comune è una dose di mantenimento giornaliera di 3–5 g di creatina monoidrato. Il momento dell’assunzione non ha un ruolo rilevante: conta l’assunzione quotidiana e continuativa, perché le riserve si riempiono nel tempo.\n\nIn alternativa c’è una fase di carico: circa 20 g al giorno (divisi in quattro porzioni) per cinque-sette giorni, per riempire le riserve più in fretta. Poi si passa alla normale dose di mantenimento. La fase di carico accelera soltanto l’effetto; anche senza, le riserve sono piene dopo circa tre-quattro settimane.\n\nLa creatina monoidrato è la forma più studiata e più economica: le varianti più costose (per esempio Kre-Alkalyn, creatina HCl) non offrono alcun beneficio aggiuntivo dimostrato. È consigliabile scegliere un prodotto con un marchio di qualità come Creapure.\n\nL’intervallo da 3 a 5 grammi non è casuale: segue la massa muscolare. Il position stand dell’ISSN lavora con circa 0,03 g per chilogrammo di peso corporeo al giorno. Le persone più pesanti e muscolose si collocano verso la parte alta dell’intervallo, quelle più leggere verso la parte bassa. Per il muscolo, nulla di tutto ciò è un motivo per andare molto oltre i 5 g.',
      },
      {
        title: 'Creatina per il cervello: che cosa è assodato e che cosa no',
        content: 'La creatina non si trova solo nel muscolo ma anche nel cervello, dove svolge lo stesso compito: ricostituire rapidamente l’ATP. Da qui è nata l’idea diffusa che dosi più alte portino benefici cognitivi e che la quantità «davvero corretta» sia ben superiore ai 3–5 g.\n\nFinora le evidenze non lo confermano. Contano due risultati. Primo, la creatina nel cervello è molto più difficile da aumentare di quella nel muscolo: mentre il contenuto muscolare sale del 20–40 %, le revisioni stimano per il cervello circa il 3–10 %. La barriera emato-encefalica rallenta l’assorbimento e il cervello produce da sé una parte della propria creatina. Secondo, la quantità ottimale semplicemente non si conosce: solo una manciata di studi ha esaminato il rapporto tra dose e creatina cerebrale.\n\nQuanto questo rapporto non sia lineare lo ha mostrato uno studio che ha somministrato a vegetariani e onnivori 0,3 g per chilogrammo per sette giorni, circa 24 g al giorno a 80 kg. Il contenuto muscolare è salito chiaramente; quello cerebrale non è cambiato in modo misurabile.\n\nDosi più alte vengono effettivamente studiate: sono in corso studi con 10 e 20 g al giorno per diverse settimane, oltre a dosi singole in caso di privazione di sonno. È un campo attivo con una motivazione plausibile, ma non è conoscenza consolidata. Per forza e crescita muscolare, 3–5 g restano lo standard documentato. Chi vuole dosare più alto per interesse verso gli effetti cognitivi deve sapere che sta seguendo un’ipotesi, non una raccomandazione.',
      },
      {
        title: 'Sicurezza e miti',
        content: 'La creatina è tra gli integratori più sicuri in assoluto. Studi a lungo termine su diversi anni non mostrano effetti dannosi nelle persone sane. Il mito persistente che la creatina danneggi i reni non trova conferma nelle persone con reni sani (Kreider et al., 2017). In presenza di una malattia renale, però, l’assunzione va chiarita con un medico.\n\nUn altro mito è che la creatina provochi «ritenzione idrica» nel senso di un aspetto gonfio. In realtà la creatina richiama acqua nelle cellule muscolari, il che porta a un muscolo più pieno e non a una ritenzione visibile. Un leggero aumento del peso corporeo all’inizio è normale e voluto.\n\nTalvolta la creatina viene collegata anche alla caduta dei capelli, sulla base di un unico studio. Questo collegamento non è dimostrato scientificamente. Nel complesso la creatina è ben tollerata; alcune persone reagiscono a dosi singole molto alte con disturbi gastrointestinali, che si possono evitare con porzioni più piccole.',
      },
      {
        title: 'Riepilogo',
        content: 'La creatina è l’integratore più efficace e meglio documentato per forza e crescita muscolare: sicura, economica e facile da usare. Per forza e crescita muscolare bastano 3–5 g di monoidrato al giorno, in modo continuativo; dosi più alte per il cervello sono oggetto di ricerca, ma non sono ancora una raccomandazione.\n\nIl momento dell’assunzione è irrilevante, la fase di carico facoltativa. Scegli monoidrato puro; le forme più costose non aggiungono valore. I soliti avvertimenti su danni a reni o capelli non trovano conferma nelle persone sane.\n\nSe dovessi scegliere un solo integratore per la prestazione, la creatina sarebbe la scelta più ovvia. In presenza di condizioni di salute preesistenti, come sempre, è sensato un consulto medico.',
      },
    ],
  },

  protein_powder: {
    name: 'Proteine in polvere (whey e simili)',
    summary: 'Le proteine in polvere non sono un prodotto miracoloso, ma una fonte proteica comoda ed economica. Aiutano a coprire il fabbisogno giornaliero quando è difficile farlo con il cibo normale: niente di più e niente di meno.',
    quick: [
      { label: 'Scopo', text: 'Un’aggiunta pratica per raggiungere l’obiettivo proteico giornaliero, non un obbligo.' },
      { label: 'Scelta', text: 'Whey (rapide), caseine (lente), vegetali (vegane). Tutte efficaci in quantità adeguate.' },
    ],
    sections: [
      {
        title: 'Che cosa sono le proteine in polvere',
        content: 'Le proteine in polvere sono proteine alimentari concentrate, di solito del latte (whey e caseine), ma anche da fonti vegetali come pisello, riso o soia. Forniscono gli stessi aminoacidi degli alimenti ricchi di proteine, solo in una forma comoda e veloce da preparare.\n\nIl punto più importante per primo: le proteine in polvere non sono un miracolo «anabolico». Sono semplicemente cibo, un modo comodo per coprire il fabbisogno proteico. Chi raggiunge facilmente il proprio obiettivo giornaliero con carne, pesce, uova, latticini e legumi non ha bisogno della polvere.\n\nIl loro valore sta nella praticità: uno shake si prepara in fretta, si dosa facilmente, costa poco per grammo di proteine ed è facile da portare con sé. Per chi ha un fabbisogno proteico alto, poco tempo o poco appetito è un aiuto utile.',
      },
      {
        title: 'Whey, caseine e proteine vegetali',
        content: 'Le proteine del siero del latte (whey) sono la forma più popolare. Vengono digerite in fretta, sono ricche dell’aminoacido leucina e stimolano fortemente la sintesi proteica muscolare. Esistono come concentrato (economico, con un po’ di lattosio), isolato (più puro, povero di lattosio) e idrolizzato (predigerito, più costoso).\n\nAnche le caseine sono proteine del latte, ma vengono digerite lentamente e rilasciano aminoacidi per diverse ore. Alcune persone le usano prima di intervalli più lunghi tra un pasto e l’altro, per esempio prima di dormire. In pratica, però, per la maggior parte delle persone la differenza rispetto alla whey è piccola.\n\nLe proteine vegetali (pisello, riso, soia) sono la scelta per chi segue un’alimentazione vegana. Le singole fonti vegetali possono essere carenti di alcuni aminoacidi, per questo i buoni prodotti combinano più fonti. In quantità totale adeguata, le polveri vegetali sono efficaci per la crescita muscolare in modo simile alla whey.',
      },
      {
        title: 'Uso sensato',
        content: 'Le proteine in polvere sono utili ogni volta che una fonte proteica rapida e di qualità è pratica: dopo l’allenamento, come spuntino, nei cereali o per raggiungere l’obiettivo proteico nelle giornate piene. Una-due porzioni al giorno sono sensate per la maggior parte delle persone.\n\nDovrebbero però integrare gli alimenti normali, non sostituirli. Le fonti proteiche integrali forniscono anche micronutrienti, saziano di più e fanno parte di un’alimentazione equilibrata. Uno shake è uno strumento per la vita di tutti i giorni, non un alimento base.\n\nQuando scegli un prodotto conviene guardare l’elenco degli ingredienti: il minor numero possibile di additivi, un buon contenuto proteico per porzione e idealmente un marchio di controllo indipendente. Le polveri molto economiche a volte contengono molti riempitivi o zucchero.',
      },
      {
        title: 'Sicurezza e prospettiva',
        content: 'Per le persone sane le proteine in polvere sono sicure. La preoccupazione che un elevato apporto proteico tramite polvere danneggi i reni vale, come per le proteine in generale, solo in presenza di una malattia renale. In caso di intolleranza al lattosio, l’isolato o le varianti vegetali sono tollerati meglio.\n\nUn aspetto di qualità è la purezza. Poiché gli integratori sono regolamentati in modo meno rigoroso dei farmaci, conviene scegliere prodotti con analisi di laboratorio indipendenti (per esempio su metalli pesanti o sostanze dopanti), soprattutto per chi fa agonismo.\n\nIn sintesi, le proteine in polvere sono un prodotto pratico, non essenziale. Non sostituiscono una buona alimentazione, ma possono aiutare a coprire il fabbisogno proteico in modo comodo ed economico. Per domande di salute è sensato rivolgersi a un medico o a un dietista.',
      },
    ],
  },

  caffeine: {
    name: 'Caffeina',
    summary: 'La caffeina è uno dei potenziatori legali della prestazione più efficaci. Riduce la percezione della fatica e aumenta concentrazione e resistenza muscolare. L’effetto è ben documentato, ma il dosaggio dovrebbe essere individuale e moderato.',
    quick: [
      { label: 'Dosaggio', text: 'Circa 3–6 mg per kg di peso corporeo, 30–60 min prima dell’allenamento.' },
      { label: 'Attenzione', text: 'Proteggi il sonno (non tardi nella giornata), tieni conto della tolleranza, prova la tua sopportazione individuale.' },
    ],
    sections: [
      {
        title: 'Come agisce la caffeina',
        content: 'La caffeina è uno stimolante che agisce soprattutto bloccando i recettori dell’adenosina nel cervello. L’adenosina è un messaggero che segnala la stanchezza; occupando i suoi punti di attacco, la caffeina attenua la sensazione di stanchezza e riduce la fatica percepita.\n\nIl risultato è uno stato di maggiore vigilanza, migliore concentrazione e più disponibilità allo sforzo. Per l’allenamento significa: gli sforzi sembrano più leggeri, il che porta a più ripetizioni, più resistenza e spesso a una prestazione migliore.\n\nLa caffeina è uno dei pochi integratori con un effetto chiaramente dimostrato e immediatamente percepibile. Si assume con caffè, tè, energy drink o come caffeina pura (compresse, polvere) e fa effetto in circa 30–60 minuti.',
      },
      {
        title: 'Le evidenze',
        content: 'La caffeina è tra le sostanze per migliorare la prestazione più studiate. Un’ampia revisione (Grgic et al., 2020, British Journal of Sports Medicine) conferma effetti positivi su forza, resistenza muscolare, sprint e prestazione di resistenza in molti sport.\n\nLe dimensioni dell’effetto sono moderate ma affidabili. Soprattutto negli sforzi ripetuti e affaticanti e in situazioni di privazione di sonno o scarsa motivazione, la caffeina può fare una differenza percepibile. Ne beneficia anche la prestazione cognitiva: tempo di reazione e attenzione.\n\nLa dose efficace nella maggior parte degli studi è di circa 3–6 mg per chilogrammo di peso corporeo. Dosi più alte raramente portano più prestazione, ma aumentano effetti collaterali come nervosismo, palpitazioni e disturbi del sonno.',
      },
      {
        title: 'Dosaggio e tempistica',
        content: 'Per la prestazione in allenamento si sono dimostrati efficaci circa 3–6 mg per chilogrammo di peso corporeo, assunti circa 30–60 minuti prima dello sforzo. Per una persona di 75 kg corrispondono a circa 225–450 mg; per confronto, una tazza di caffè filtro contiene circa 80–120 mg.\n\nChi è sensibile o non è abituato dovrebbe iniziare con una dose bassa e provare la propria tolleranza. Le differenze individuali sono grandi: alcune persone ne tollerano molta, altre reagiscono a piccole quantità con irrequietezza o palpitazioni.\n\nUn punto importante è l’orario. La caffeina ha un’emivita di circa cinque-sei ore: un allenamento tardi con una dose alta può disturbare notevolmente il sonno. Come regola empirica, evita quantità più grandi nelle ultime sei-otto ore prima di dormire.',
      },
      {
        title: 'Tolleranza, effetti collaterali e sicurezza',
        content: 'Con un consumo regolare il corpo sviluppa una certa tolleranza e l’effetto diminuisce. Per questo alcune persone fanno pause volute o riservano le dosi più alte agli allenamenti importanti. Un’astinenza completa però non è necessaria: un consumo regolare e moderato resta efficace.\n\nPossibili effetti collaterali sono nervosismo, palpitazioni, disturbi di stomaco, ansia e disturbi del sonno, di solito con una dose troppo alta. In caso di alcune malattie cardiovascolari, durante la gravidanza o con disturbi d’ansia è consigliata cautela e un consulto medico.\n\nNel complesso la caffeina in quantità moderate (fino a circa 400 mg al giorno per adulti sani) è considerata sicura. Dosi singole molto alte, soprattutto di caffeina pura in polvere, possono essere pericolose: qui è fondamentale dosare con precisione. Come per tutte le sostanze: trova la dose efficace e tollerata per te, non quella massima.',
      },
      {
        title: 'Riepilogo',
        content: 'La caffeina è un potenziatore della prestazione efficace, ben documentato e legale. Riduce la percezione della fatica e migliora concentrazione, resistenza muscolare e prestazione di resistenza.\n\nÈ comune una dose di circa 3–6 mg per chilogrammo di peso corporeo 30–60 minuti prima dell’allenamento. Inizia con poco, prova la tua tolleranza e proteggi il sonno evitando la caffeina a tarda ora.\n\nLa caffeina è sicura in quantità moderate, ma può causare problemi in caso di sovradosaggio o di condizioni preesistenti. Usala in modo consapevole come strumento, non come dose massima quotidiana, e per domande di salute rivolgiti a un medico.',
      },
    ],
  },

  omega3: {
    name: 'Acidi grassi omega-3',
    summary: 'Gli acidi grassi omega-3 (EPA e DHA) sono essenziali e hanno un effetto antinfiammatorio. Molte persone ne assumono troppo pochi. Il pesce grasso è la fonte migliore; un integratore può avere senso se si mangia poco pesce.',
    quick: [
      { label: 'Fonte e dose', text: 'Pesce grasso 2–3 volte a settimana; come integratore spesso ~1–2 g di EPA+DHA al giorno.' },
      { label: 'Beneficio', text: 'Salute cardiovascolare e cerebrale, regolazione dell’infiammazione; per i vegani tramite olio di alghe.' },
    ],
    sections: [
      {
        title: 'Che cosa sono gli acidi grassi omega-3',
        content: 'Gli acidi grassi omega-3 sono un gruppo di grassi polinsaturi che il corpo non può produrre da sé e che deve quindi ricavare dal cibo. I più importanti sono EPA (acido eicosapentaenoico) e DHA (acido docosaesaenoico), presenti soprattutto nel pesce grasso, oltre all’ALA (acido alfa-linolenico) da fonti vegetali.\n\nEPA e DHA sono componenti delle membrane cellulari e precursori di messaggeri che regolano i processi infiammatori. Il DHA è inoltre un componente importante del cervello e della retina. Questi acidi grassi sono quindi rilevanti per cuore, cervello e sistema immunitario.\n\nIl problema: l’alimentazione moderna fornisce spesso molti omega-6 (dagli oli vegetali lavorati) ma pochi omega-3. Questo squilibrio, insieme al basso consumo di pesce, fa sì che molte persone ne assumano troppo pochi.',
      },
      {
        title: 'Importanza per la salute',
        content: 'La ricerca sugli omega-3 è ampia. Il beneficio meglio dimostrato riguarda la salute cardiovascolare: EPA e DHA possono abbassare i livelli di trigliceridi nel sangue e sono associati a un profilo di rischio cardiovascolare più favorevole. Le società scientifiche raccomandano un consumo regolare di pesce grasso.\n\nOltre a questo si studia un effetto antinfiammatorio che potrebbe essere rilevante per la salute delle articolazioni e per il recupero dopo l’allenamento. Ci sono anche indicazioni di effetti positivi sulla funzione cerebrale e sull’umore, anche se qui le evidenze sono meno chiare.\n\nÈ importante distinguere tra affermazioni dimostrate ed esagerate. Gli omega-3 non sono una panacea, ma un apporto adeguato è un tassello sensato di un’alimentazione sana, soprattutto per chi mangia pesce di rado.',
      },
      {
        title: 'Fonti e integrazione',
        content: 'La fonte migliore di EPA e DHA è il pesce grasso di acque fredde: salmone, sgombro, aringa, sardine. Due-tre porzioni a settimana coprono il fabbisogno della maggior parte delle persone. Le fonti vegetali come semi di lino o noci forniscono ALA, che però il corpo converte in EPA e DHA solo in piccola parte.\n\nChi mangia poco o niente pesce può valutare un integratore. Le capsule di olio di pesce o di alghe forniscono EPA e DHA direttamente; l’olio di alghe è l’alternativa vegetale e vegana. Le dosi tipiche degli integratori sono circa 1–2 g di EPA più DHA al giorno, anche se il fabbisogno esatto è individuale.\n\nNella scelta del prodotto conta la qualità: controlla il contenuto effettivo di EPA/DHA (non solo la quantità totale di olio di pesce), la freschezza (l’olio rancido non va bene) e idealmente le analisi di purezza. L’indice omega-3 nel sangue può indicare in modo oggettivo il livello di apporto.',
      },
      {
        title: 'Sicurezza e prospettiva',
        content: 'Gli integratori di omega-3 sono considerati sicuri e ben tollerati alle dosi abituali. Possibili effetti collaterali sono un retrogusto di pesce o lievi disturbi gastrointestinali. A dosi molto alte gli omega-3 possono influire sulla coagulazione del sangue: chi assume farmaci anticoagulanti o deve sottoporsi a un intervento dovrebbe chiarire l’assunzione con un medico.\n\nCome per tutti gli integratori: completano una buona alimentazione, ma non la sostituiscono. Chi mangia regolarmente pesce grasso di solito non ha bisogno di olio in aggiunta. L’integratore ha senso soprattutto per chi non mangia pesce e per i vegani (olio di alghe).\n\nPer domande di salute, condizioni preesistenti o uso di farmaci è consigliabile un consulto medico. Un esame del sangue dell’indice omega-3 può aiutare a valutare in modo mirato il fabbisogno individuale invece di integrare in modo generalizzato.',
      },
    ],
  },

  vitamin_d: {
    name: 'Vitamina D',
    summary: 'La vitamina D è importante per ossa, muscoli e sistema immunitario. Si forma soprattutto con la luce del sole, per questo la carenza è comune nei mesi con poco sole. Allora un’integrazione ha spesso senso, idealmente dopo un esame del sangue.',
    quick: [
      { label: 'Fonte', text: 'Luce del sole (pelle), poca dal cibo. D’inverno spesso serve un integratore.' },
      { label: 'In pratica', text: 'In caso di carenza spesso ~1000–2000 UI/giorno; idealmente regolare la dose con l’esame del sangue.' },
    ],
    sections: [
      {
        title: 'Perché la vitamina D è speciale',
        content: 'La vitamina D ha un ruolo particolare tra le vitamine perché il corpo può produrla da sé nella pelle sotto l’effetto della luce del sole (raggi UV-B). A rigore agisce più come un ormone: regola l’assorbimento di calcio e fosfato ed è quindi centrale per ossa e denti sani.\n\nOltre che per la salute delle ossa, la vitamina D ha funzioni nei muscoli e nel sistema immunitario. I suoi recettori si trovano in molti tessuti del corpo, il che spiega la sua ampia importanza. Una carenza marcata può contribuire a debolezza muscolare, problemi alle ossa e maggiore predisposizione alle infezioni.\n\nL’aspetto particolare e allo stesso tempo problematico: poiché la fonte principale è la luce del sole, l’apporto dipende molto da luogo, stagione, colore della pelle e stile di vita. In molte regioni la luce del sole d’inverno non basta per produrre abbastanza vitamina D.',
      },
      {
        title: 'La carenza è molto diffusa',
        content: 'La carenza di vitamina D è una delle carenze nutrizionali più comuni al mondo, soprattutto alle latitudini settentrionali e nei mesi invernali. Chi lavora molto al chiuso, ha la pelle più scura, si copre molto o è più anziano ha un rischio maggiore, perché la produzione propria è limitata.\n\nCon il solo cibo è difficile coprire il fabbisogno. Pochi alimenti ne contengono quantità rilevanti, soprattutto pesce grasso, tuorlo d’uovo e prodotti arricchiti. Di solito non bastano a compensare una carenza quando manca la produzione tramite il sole.\n\nIl livello di vitamina D si può determinare con un semplice esame del sangue (25-OH vitamina D). È il modo più affidabile per sapere se e quanto integrare, invece di andare a intuito.',
      },
      {
        title: 'L’integrazione nella pratica',
        content: 'Se c’è una carenza o se nei mesi con poco sole la produzione propria è scarsa, un’integrazione ha senso. Si citano spesso dosi di mantenimento nell’ordine di circa 1000–2000 UI (Unità Internazionali) al giorno, anche se il fabbisogno individuale può variare molto.\n\nLa dose si regola al meglio in base al valore nel sangue: un esame mostra il punto di partenza e, dopo alcune settimane o mesi di assunzione, si può verificare il risultato e aggiustare la dose. Così si evitano sia un apporto insufficiente sia un sovradosaggio.\n\nLa vitamina D3 (colecalciferolo) è la forma da preferire. Essendo liposolubile, viene assorbita meglio con un pasto che contiene grassi. Spesso viene combinata con la vitamina K2, che sostiene il metabolismo del calcio; le evidenze in merito sono promettenti ma non definitive.',
      },
      {
        title: 'Sicurezza e supervisione medica',
        content: 'La vitamina D è liposolubile e, a differenza delle vitamine idrosolubili, può accumularsi nel corpo. Dosi molto alte per molto tempo possono portare a un pericoloso eccesso di calcio nel sangue. Qui «di più è meglio» non vale affatto; vanno evitate dosi estremamente alte senza controllo medico.\n\nPer la maggior parte delle persone le dosi di mantenimento moderate sono sicure. Chi valuta dosi alte, ha condizioni preesistenti o assume farmaci dovrebbe però farlo sotto supervisione medica. Anche qui l’esame del sangue è lo strumento decisivo per restare nell’intervallo sicuro ed efficace.\n\nIn sintesi, la vitamina D è uno dei pochi integratori che per molte persone porta davvero un beneficio reale, soprattutto d’inverno. L’approccio più saggio è misurare il livello e regolare l’assunzione di conseguenza, invece di dosare alto in modo generalizzato.',
      },
    ],
  },

  magnesium: {
    name: 'Magnesio',
    summary: 'Il magnesio partecipa a oltre 300 processi enzimatici, tra cui funzione muscolare e nervosa, metabolismo energetico e sonno. Una lieve carenza è comune. Si può coprire con il cibo e, se serve, integrare facilmente.',
    quick: [
      { label: 'Funzione', text: 'Funzione muscolare e nervosa, metabolismo energetico, sonno, ossa.' },
      { label: 'Fonti', text: 'Frutta secca, semi, cereali integrali, legumi, verdure verdi; integratore se serve.' },
    ],
    sections: [
      {
        title: 'Il ruolo del magnesio',
        content: 'Il magnesio è un minerale essenziale e un cofattore di oltre 300 reazioni enzimatiche nel corpo. Partecipa alla produzione di energia (metabolismo dell’ATP), alla funzione muscolare e nervosa, alla sintesi proteica, alla regolazione della glicemia e alla salute delle ossa.\n\nPer le persone fisicamente attive il magnesio è particolarmente rilevante perché ha un ruolo centrale nella contrazione e nel rilassamento muscolare e nel metabolismo energetico. Una carenza può manifestarsi, tra l’altro, con crampi muscolari, stanchezza, irritabilità e sonno peggiore.\n\nCon il sudore e un metabolismo più attivo, l’allenamento intenso può aumentare leggermente il fabbisogno di magnesio. Allo stesso tempo l’apporto in molte persone è al limite, perché le diete ricche di cibi lavorati contengono poco magnesio.',
      },
      {
        title: 'Carenza e fabbisogno',
        content: 'Una carenza marcata di magnesio è rara con un’alimentazione sana, ma una lieve carenza o un apporto al limite sono relativamente comuni, soprattutto con un’alimentazione poco variata e ricca di cibi lavorati. Il fabbisogno giornaliero degli adulti è di circa 300–400 mg, a seconda di sesso ed età.\n\nPoiché il magnesio si trova in molti alimenti non lavorati, in genere il fabbisogno si copre bene con l’alimentazione. Buone fonti sono frutta secca e semi (per esempio semi di zucca, mandorle), cereali integrali, legumi, verdure a foglia verde e cioccolato fondente.\n\nUna carenza di magnesio si può misurare nel sangue solo in modo limitato, perché la maggior parte del magnesio è immagazzinata nelle cellule e nelle ossa. Sintomi come crampi frequenti, spossatezza o problemi di sonno possono essere indizi, accanto ad altre cause, e in caso di sospetto andrebbero chiariti con un medico.',
      },
      {
        title: 'Integrazione',
        content: 'Se l’apporto con il cibo non basta o se il fabbisogno è aumentato, un integratore di magnesio può avere senso. La forma conta per la tollerabilità: ben tollerati e ben assorbiti sono i composti organici come magnesio citrato, glicinato o malato. Il magnesio ossido è economico ma poco assorbito e può avere un effetto lassativo.\n\nLe dosi integrative comuni sono circa 200–400 mg di magnesio elementare al giorno, spesso assunti la sera, perché il magnesio può avere un effetto rilassante e favorire il sonno. Dosi più alte possono causare feci molli o diarrea, segnale per ridurre la quantità.\n\nLe evidenze per gli integratori di magnesio sono più forti in caso di carenza accertata. Nelle persone con un apporto adeguato il beneficio aggiuntivo è limitato. Come sempre: prima il cibo, l’integratore come aggiunta mirata.',
      },
      {
        title: 'Sicurezza e riepilogo',
        content: 'Il magnesio dal cibo è innocuo; normalmente il corpo elimina il magnesio in eccesso attraverso i reni. Con gli integratori, l’effetto collaterale più comune è un effetto lassativo con una dose troppo alta. Le persone con funzione renale ridotta dovrebbero assumere integratori di magnesio solo dopo un consulto medico, perché l’eliminazione può essere compromessa.\n\nIn sintesi, il magnesio è un minerale importante con un ruolo ampio per muscoli, nervi, metabolismo energetico e sonno. Una lieve carenza è comune, ma si può correggere bene con un’alimentazione basata su alimenti integrali, con frutta secca, semi, cereali integrali e verdure verdi.\n\nUn integratore è un’opzione sensata in caso di fabbisogno aumentato, apporto insufficiente o sintomi corrispondenti, idealmente in una forma ben tollerata e, in presenza di condizioni preesistenti, d’accordo con un medico.',
      },
    ],
  },
};
