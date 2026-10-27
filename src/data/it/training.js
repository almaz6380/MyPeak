// Italienische Fassung von `src/data/trainingKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Fondamenti',
    hypertrophie: 'Crescita muscolare',
    programmierung: 'Programmazione',
    regeneration: 'Recupero',
  },

  progressive_overload: {
    name: 'Sovraccarico progressivo',
    summary: 'Il principio più importante per progredire nel lungo periodo: lo stimolo allenante deve aumentare in modo sistematico nel tempo, così che il corpo continui ad adattarsi. Senza progressione, forza e crescita muscolare si fermano.',
    quick: [
      { label: 'Idea chiave', text: 'Poco alla volta più peso, ripetizioni, serie o una tecnica migliore: lo stimolo deve continuare a salire.' },
      { label: 'Per chi', text: 'Tutti i livelli. I principianti progrediscono in fretta; gli avanzati hanno bisogno di incrementi più piccoli e pianificati.' },
    ],
    sections: [
      {
        title: 'Che cos’è il sovraccarico progressivo?',
        content: 'Il sovraccarico progressivo descrive l’aumento graduale delle richieste poste al corpo durante l’allenamento. L’idea di fondo deriva dal principio della supercompensazione: uno stimolo allenante altera l’equilibrio biologico, il corpo si ripara e si adatta a un livello di prestazione un po’ più alto. Se poi lo stimolo resta invariato, non c’è motivo per un ulteriore adattamento e i progressi si fermano.\n\nIl concetto nasce in origine dalla riabilitazione: negli anni Quaranta Thomas DeLorme sviluppò il concetto di «progressive resistance exercise» per ripristinare la forza muscolare dei soldati feriti (DeLorme, 1945, Journal of Bone and Joint Surgery). Da allora è diventato la base di ogni programma serio di forza e di crescita muscolare.\n\nÈ importante capire che «più peso» è solo uno dei modi per progredire. Lo stimolo si può aumentare anche con più ripetizioni, più serie, recuperi più brevi, un range di movimento più ampio o un’esecuzione più lenta e controllata.',
      },
      {
        title: 'Basi scientifiche',
        content: 'La necessità di una progressione graduale è uno dei principi meglio documentati delle scienze dell’allenamento. Il position stand dell’American College of Sports Medicine (ACSM, 2009, Medicine & Science in Sports & Exercise) indica espressamente il sovraccarico progressivo come presupposto per guadagni continui di forza e ipertrofia e raccomanda un aumento pianificato di carico e volume.\n\nUna revisione di Schoenfeld et al. (2017, Journal of Strength and Conditioning Research) mostra che sia carichi alti sia carichi moderati possono provocare crescita muscolare: ciò che conta è portare le serie vicino all’esaurimento muscolare e far crescere lo stimolo nel tempo. Questo sottolinea che la progressione si può impostare in modo flessibile.\n\nGli adattamenti all’allenamento seguono inoltre il principio SAID («Specific Adaptation to Imposed Demands»): il corpo si adatta esattamente alle richieste a cui viene sottoposto. Se la richiesta non sale, non avviene nemmeno l’adattamento, una relazione confermata costantemente dalla fisiologia dell’esercizio da decenni.',
      },
      {
        title: 'Metodi di progressione',
        content: 'Esistono diversi modi pratici per aumentare lo stimolo allenante. Il più noto è la progressione del carico: più peso sul bilanciere. Per la maggior parte degli esercizi hanno senso incrementi di 2,5 kg (parte superiore del corpo) o 5 kg (parte inferiore) non appena si raggiunge il limite alto del range di ripetizioni con una tecnica pulita.\n\nLa doppia progressione è un metodo particolarmente adatto ai principianti: scegli un range di ripetizioni (per esempio 8–12). Prima sali all’interno di quel range (più ripetizioni con lo stesso peso) e, quando raggiungi il limite alto in tutte le serie, aumenti il peso e ricominci dal basso.\n\nAltre possibilità sono: più serie per gruppo muscolare (progressione del volume), recuperi più brevi a parità di prestazione, un range di movimento più ampio o una fase eccentrica più controllata e lenta. È importante cambiare una sola variabile alla volta, così da poter seguire i progressi in modo chiaro.',
      },
      {
        title: 'Errori comuni',
        content: 'L’errore più comune è progredire troppo in fretta: aumentare il peso prima che la tecnica sia solida espone al rischio di infortuni e spesso smette di allenare il muscolo bersaglio. Il peso dovrebbe salire solo quando tutte le ripetizioni previste si completano con una buona tecnica.\n\nUn secondo errore è credere che si debba progredire in ogni seduta. Soprattutto gli avanzati non possono aggiungere peso ogni settimana: conta l’andamento nell’arco di settimane e mesi, non il singolo giorno di allenamento. Piccole oscillazioni dovute a sonno, stress o alimentazione sono normali.\n\nIl terzo errore è la mancanza di documentazione. Senza annotare peso, ripetizioni e serie, la progressione è quasi impossibile da gestire: semplicemente non sai se sei migliorato. Un diario di allenamento è quindi lo strumento più importante per progredire nel lungo periodo.',
      },
      {
        title: 'Riepilogo',
        content: 'Il sovraccarico progressivo è la legge fondamentale dell’allenamento: senza uno stimolo crescente non c’è adattamento duraturo. Si può applicare attraverso peso, ripetizioni, serie, recupero, range di movimento o tempo di esecuzione, non solo con più peso.\n\nPer i principianti la doppia progressione nel range di 8–12 ripetizioni funziona in modo eccellente. Gli avanzati dovrebbero ragionare su cicli più lunghi e pianificare la progressione invece di forzarla. In ogni caso la chiave è documentare i progressi e dare priorità alla tecnica rispetto al peso.\n\nChi progredisce con pazienza e in modo sistematico costruisce forza e muscoli in modo continuo negli anni, ed è proprio questo il cuore di un allenamento di successo.',
      },
    ],
  },

  volume_frequency: {
    name: 'Volume e frequenza di allenamento',
    summary: 'Il volume (serie × ripetizioni × peso) è la leva più forte per la crescita muscolare. La frequenza descrive quante volte alla settimana si allena un muscolo. Insieme determinano quanto stimolo riceve un muscolo e quanto bene riesce a recuperare.',
    quick: [
      { label: 'Indicazione sul volume', text: 'Circa 10–20 serie impegnative per gruppo muscolare a settimana per la maggior parte delle persone.' },
      { label: 'Indicazione sulla frequenza', text: 'Allenare ogni muscolo 2 volte a settimana di solito batte 1 volta, a parità di volume settimanale.' },
    ],
    sections: [
      {
        title: 'Che cosa significa volume?',
        content: 'Il volume di allenamento misura la quantità totale di lavoro svolto. L’approccio più diffuso conta le «serie impegnative» per gruppo muscolare a settimana, cioè le serie portate vicino al cedimento muscolare (circa 0–4 ripetizioni in riserva). Più precisamente il volume si può calcolare come serie × ripetizioni × peso (tonnellaggio), ma contare le serie si è dimostrato un’approssimazione pratica affidabile.\n\nIl volume è considerato il fattore singolo più importante per la crescita muscolare. La meta-analisi di Schoenfeld, Ogborn & Krieger (2017, Journal of Sports Sciences) ha trovato una chiara relazione dose-risposta: più serie settimanali hanno portato a più ipertrofia, fino a un punto oltre il quale il beneficio aggiuntivo diminuisce e il recupero ne risente.\n\nPer la maggior parte delle persone l’intervallo sensato è di circa 10–20 serie impegnative per gruppo muscolare a settimana. I principianti traggono beneficio già dalla parte bassa, mentre gli avanzati spesso hanno bisogno di più volume per continuare a ricevere uno stimolo.',
      },
      {
        title: 'Che cosa significa frequenza?',
        content: 'La frequenza descrive quante volte un muscolo viene allenato nell’arco di una settimana. Che un muscolo lavori 1, 2 o 3 volte a settimana non cambia necessariamente il volume settimanale: lo distribuisce soltanto in modo diverso. Dividere 16 serie di petto su due sedute significa 8 serie per seduta invece di 16 in una sola.\n\nLa meta-analisi di Schoenfeld, Grgic & Krieger (2019, Journal of Sports Sciences) mostra che, a parità di volume settimanale, una frequenza più alta tende a produrre un po’ più di crescita muscolare, probabilmente perché la sintesi proteica muscolare resta elevata solo per circa 24–48 ore dopo l’allenamento e stimoli più frequenti la attivano più spesso.\n\nIn pratica significa: per la maggior parte delle persone allenare ogni muscolo due volte a settimana è un buon compromesso tra stimolo, recupero e qualità dell’allenamento. Frequenze molto alte aggiungono poco beneficio ulteriore, purché il volume sia adeguato.',
      },
      {
        title: 'Gestire correttamente il volume',
        content: 'Il volume andrebbe gestito in modo individuale e dinamico invece di restare statico. Un punto di partenza sensato è la parte bassa dell’intervallo (circa 10 serie per muscolo a settimana). Da lì il volume si può aumentare lentamente nel corso delle settimane, finché recupero, sonno e prestazione tengono il passo.\n\nIl concetto di «Maximum Recoverable Volume» (MRV) descrive il limite superiore di volume da cui una persona riesce ancora a recuperare. Superarlo riduce la prestazione e aumenta il rischio di infortuni. Segnali di troppo volume sono cali di prestazione persistenti, sonno scadente, indolenzimento costante e perdita di motivazione.\n\nI gruppi muscolari in ritardo o i punti deboli si possono prioritizzare con un po’ più di volume, mentre le zone già ben sviluppate si possono mantenere con un volume di mantenimento (spesso 6–10 serie). Così la capacità di recupero, che è limitata, va dove è più utile.',
      },
      {
        title: 'Errori comuni',
        content: 'Il classico errore da principiante è troppo volume troppo presto. Di più non è automaticamente meglio: oltre il limite di recupero individuale, il volume extra rallenta addirittura i progressi. È più saggio partire con meno e aumentare lentamente.\n\nUn secondo errore è contare il «volume spazzatura»: serie lontane dal cedimento o con tecnica scadente contribuiscono poco alla crescita ma costano comunque recupero. Contano come volume efficace solo le serie che mettono davvero alla prova il muscolo bersaglio.\n\nTerzo, la frequenza viene spesso confusa con il volume. Allenare un muscolo più spesso aiuta solo se il volume settimanale è adeguato. Sei sedute a settimana, ognuna con uno stimolo troppo scarso, sono peggio di tre sedute ben distribuite.',
      },
      {
        title: 'Riepilogo',
        content: 'Il volume è la leva più forte per la crescita muscolare; un intervallo di circa 10–20 serie impegnative per muscolo a settimana va bene per la maggior parte delle persone. La frequenza distribuisce questo volume: due volte a settimana per muscolo è uno standard collaudato.\n\nParti dalla parte bassa dell’intervallo di volume e aumenta lentamente, tenendo d’occhio recupero e prestazione. Conta solo le serie efficaci e impegnative e adatta il volume dei singoli gruppi muscolari ai tuoi obiettivi.\n\nVolume e frequenza non sono regole rigide ma strumenti da adattare alla tua capacità di recupero. Gestirli entrambi in modo consapevole rende l’allenamento più efficiente ed evita sia di allenarsi troppo poco sia di allenarsi troppo.',
      },
    ],
  },

  hypertrophy_basics: {
    name: 'Come crescono i muscoli',
    summary: 'La crescita muscolare (ipertrofia) avviene quando l’allenamento porta la sintesi proteica muscolare sopra la degradazione e questo stimolo si ripete con regolarità. Il motore principale è la tensione meccanica di serie impegnative, insieme a proteine e recupero sufficienti.',
    quick: [
      { label: 'Motore principale', text: 'Tensione meccanica: serie vicino al cedimento con una tecnica controllata.' },
      { label: 'Presupposti', text: 'Proteine sufficienti (~1,6–2,2 g/kg), calorie di mantenimento o in leggero surplus, sonno.' },
    ],
    sections: [
      {
        title: 'La biologia della crescita muscolare',
        content: 'I muscoli sono composti da fibre muscolari che contengono proteine contrattili (actina e miosina). Crescere significa soprattutto che queste fibre diventano più spesse perché si deposita più proteina contrattile: si parla di ipertrofia miofibrillare. Il corpo costruisce di continuo proteine muscolari (sintesi proteica muscolare) e le degrada (degradazione proteica muscolare); la crescita avviene solo quando la sintesi prevale per un periodo prolungato.\n\nL’allenamento è l’innesco: una serie impegnativa aumenta la sintesi proteica muscolare per circa 24–48 ore (Damas et al., 2016, Journal of Physiology). Se questo stimolo viene applicato con regolarità e accompagnato da abbastanza materiale da costruzione (proteine) ed energia, la crescita si accumula nel corso di settimane e mesi.\n\nAnche le cellule satellite hanno un ruolo: queste cellule staminali specifiche del muscolo vengono attivate dall’allenamento, aiutano a riparare le fibre danneggiate e cedono nuovi nuclei, rendendo possibile una crescita maggiore nel lungo periodo.',
      },
      {
        title: 'I tre meccanismi dell’ipertrofia',
        content: 'In un articolo molto citato, Brad Schoenfeld (2010, Journal of Strength and Conditioning Research) ha descritto tre possibili meccanismi della crescita muscolare: tensione meccanica, stress metabolico e danno muscolare.\n\nOggi la tensione meccanica è considerata il motore più importante. Si genera quando i muscoli lavorano contro una resistenza elevata lungo un range di movimento completo, soprattutto nelle ultime ripetizioni, quelle difficili, di una serie. Le cellule muscolari percepiscono questa tensione come un segnale («meccanotrasduzione») che avvia i processi di crescita.\n\nLo stress metabolico (il «bruciore» dovuto ai sottoprodotti del metabolismo con ripetizioni più alte) e un lieve danno muscolare possono avere un ruolo di supporto, ma sono meno decisivi di quanto si sia creduto a lungo. La ricerca recente suggerisce che un danno muscolare marcato sia più un effetto collaterale che un presupposto della crescita.',
      },
      {
        title: 'Come ottimizzare lo stimolo di crescita',
        content: 'Per massimizzare la tensione meccanica, le serie dovrebbero essere portate vicino al cedimento muscolare, di solito con 0–4 ripetizioni in riserva. Il range esatto di ripetizioni è sorprendentemente flessibile: la crescita è possibile in un ampio intervallo di circa 5–30 ripetizioni per serie, purché la serie sia abbastanza impegnativa (Schoenfeld et al., 2017, Journal of Strength and Conditioning Research).\n\nIn pratica si è dimostrato efficace un range moderato di circa 6–15 ripetizioni, perché offre un buon compromesso tra tensione, volume e fatica. Ripetizioni molto basse sollecitano di più articolazioni e sistema nervoso, mentre ripetizioni molto alte sono scomode e sfiancanti.\n\nÈ importante un’esecuzione controllata lungo tutto il range di movimento. In particolare la posizione di allungamento del muscolo sotto carico sembra essere un forte stimolo di crescita: ripetizioni profonde e complete sono quindi di solito più efficaci di quelle corte e spezzate.',
      },
      {
        title: 'Alimentazione e recupero',
        content: 'Nessun muscolo può crescere senza materiale da costruzione sufficiente. Le proteine forniscono gli aminoacidi per la sintesi proteica muscolare; la ricerca raccomanda a chi si allena circa 1,6–2,2 g di proteine per chilogrammo di peso corporeo al giorno (Morton et al., 2018, British Journal of Sports Medicine). Ha senso distribuirle su più pasti da 20–40 g di proteine ciascuno.\n\nL’energia è altrettanto importante. La crescita muscolare funziona meglio a calorie di mantenimento o in leggero surplus (circa +5–15%). In un deficit marcato la crescita è possibile ma nettamente più lenta; soprattutto i principianti e le persone con più grasso corporeo all’inizio possono perdere grasso e costruire muscolo contemporaneamente.\n\nIl sonno è il fattore più sottovalutato. Il recupero e gli adattamenti ormonali avvengono durante il sonno profondo. La privazione cronica di sonno riduce in modo dimostrato la sintesi proteica muscolare e aumenta la degradazione muscolare: sette-nove ore a notte sono un obiettivo sensato.',
      },
      {
        title: 'Riepilogo',
        content: 'I muscoli crescono quando uno stimolo allenante impegnativo porta la sintesi proteica muscolare sopra la degradazione e questo processo si ripete con regolarità. Il motore principale è la tensione meccanica di serie dure con un’esecuzione controllata e completa.\n\nIl range efficace di ripetizioni è ampio (circa 5–30); in pratica 6–15 ripetizioni vicino al cedimento funzionano bene. Volume, progressione e tecnica determinano lo stimolo, mentre proteine, energia e sonno rendono possibile l’adattamento.\n\nLa crescita muscolare è un processo lento e cumulativo. Chi si allena duramente con pazienza, mangia abbastanza e dorme bene costruirà muscolo in modo continuo nel corso di mesi e anni.',
      },
    ],
  },

  recovery_overtraining: {
    name: 'Recupero e sovrallenamento',
    summary: 'L’adattamento non avviene durante l’allenamento, ma nel recupero successivo. Allenarsi troppo e recuperare troppo poco porta a stagnazione o regressione. Sonno, alimentazione, riposo e una gestione sensata del carico sono quindi importanti quanto l’allenamento stesso.',
    quick: [
      { label: 'Regola base', text: 'Il muscolo cresce durante il riposo. Niente recupero, niente progressi.' },
      { label: 'Leve principali', text: 'Sonno (7–9 h), calorie e proteine sufficienti, settimane di scarico, gestione dello stress.' },
    ],
    sections: [
      {
        title: 'Perché il recupero è decisivo',
        content: 'L’allenamento è uno stimolo, ma l’adattamento vero e proprio (muscoli più forti e più grandi, un sistema nervoso più efficiente) avviene nella fase di recupero successiva. Questa interazione è descritta dal modello della supercompensazione: dopo un carico la prestazione prima cala, poi si riprende e infine sale sopra il livello di partenza, a patto che ci sia abbastanza tempo per rigenerarsi.\n\nSe il successivo stimolo duro arriva troppo presto, prima che il recupero sia completo, la fatica si accumula. Nel breve periodo è normale e fa persino parte dell’allenamento; nel lungo periodo, però, porta a un calo della prestazione. Il corpo non distingue tra stress da allenamento e altri tipi di stress: lavoro, mancanza di sonno e carico psicologico contano tutti.\n\nIl recupero non è quindi un passivo «non fare nulla», ma la parte attiva in cui lo stimolo allenante si trasforma davvero in progresso. Trascurarlo significa sprecare buona parte dell’impegno in allenamento.',
      },
      {
        title: 'Il sonno, il fattore di recupero più importante',
        content: 'Nessun altro fattore influenza il recupero quanto il sonno. Durante il sonno avvengono la riparazione dei tessuti, il consolidamento degli schemi motori e importanti processi ormonali, tra cui il rilascio dell’ormone della crescita.\n\nLe evidenze sono chiare: la privazione di sonno peggiora forza, prestazione e recupero. Uno studio di Nedeltcheva et al. (2010, Annals of Internal Medicine) ha mostrato che, in una dieta ipocalorica, le persone che dormivano troppo poco perdevano molta più massa muscolare e meno grasso rispetto a quelle ben riposate: in carenza di sonno il corpo sacrificava preferibilmente il muscolo. Anche il tasso di infortuni aumenta in modo misurabile con la mancanza cronica di sonno.\n\nSette-nove ore a notte sono un obiettivo sensato per la maggior parte di chi si allena. Orari regolari per andare a dormire, una stanza buia e fresca ed evitare schermi e caffeina la sera migliorano sensibilmente la qualità del sonno.',
      },
      {
        title: 'Segnali di sovrallenamento',
        content: 'La vera sindrome da sovrallenamento è rara e richiede settimane o mesi di recupero; più frequente è il cosiddetto overreaching, un sovraccarico temporaneo. Entrambi si manifestano con segnali d’allarme simili, da prendere sul serio.\n\nSegnali tipici sono: calo persistente della prestazione nonostante l’allenamento, indolenzimento insolitamente forte o prolungato, disturbi del sonno, frequenza cardiaca a riposo elevata, irritabilità, perdita di motivazione e infezioni più frequenti. Quando se ne presentano diversi insieme, è un chiaro segnale per ridurre il carico.\n\nImportante: un singolo allenamento andato male non è sovrallenamento. Solo uno schema persistente per una o due settimane dovrebbe portare a degli aggiustamenti. Il rimedio migliore di solito non è fare di più ma di meno: meno volume, più sonno e, se serve, una settimana di scarico.',
      },
      {
        title: 'Scarico e gestione del carico',
        content: 'Una settimana di scarico (deload) è una fase pianificata a carico ridotto in cui volume e/o intensità vengono diminuiti di proposito, di solito a circa metà del volume o con pesi molto più leggeri. Lo scopo è smaltire la fatica accumulata senza perdere del tutto lo stimolo allenante.\n\nQuando abbia senso uno scarico dipende dalla persona. Molti traggono beneficio da una settimana così ogni 4–8 settimane circa di allenamento intenso, oppure ogni volta che i segnali d’allarme si accumulano. Gli avanzati con volume alto ne hanno bisogno più spesso dei principianti.\n\nOltre agli scarichi pianificati conta la gestione continua del carico: adatta l’intensità alla forma del giorno, alterna sedute dure e più leggere e tieni conto dei fattori di stress della vita. Il recupero non è uno schema rigido, ma un ascolto flessibile dei segnali del corpo.',
      },
      {
        title: 'Riepilogo',
        content: 'I progressi nascono nel recupero, non nell’allenamento in sé. Chi dà lo stimolo ma trascura il recupero spreca risultati e rischia il sovraccarico.\n\nLe leve più efficaci sono il sonno (7–9 ore), calorie e proteine adeguate e una gestione consapevole del carico con occasionali settimane di scarico. Segnali d’allarme come un calo persistente della prestazione, sonno scadente e perdita di motivazione vanno presi sul serio.\n\nIl recupero non è un segno di debolezza, ma la parte dell’allenamento in cui avviene l’adattamento vero e proprio. Chi lo pianifica e lo rispetta si allena in modo più sano e con più successo nel lungo periodo.',
      },
    ],
  },

  technique_rom: {
    name: 'Tecnica e range di movimento',
    summary: 'Una tecnica pulita lungo tutto il range di movimento rende gli esercizi più efficaci e più sicuri. Garantisce che il muscolo bersaglio riceva lo stimolo, riduce il rischio di infortuni ed è la base di ogni progressione.',
    quick: [
      { label: 'Regola base', text: 'Range di movimento completo, controllato, concentrato sul muscolo bersaglio: prima la tecnica, poi il peso.' },
      { label: 'Perché conta', text: 'Stimolo migliore, minor rischio di infortuni, una base pulita per progredire.' },
    ],
    sections: [
      {
        title: 'Perché la tecnica conta',
        content: 'Una buona tecnica di esecuzione ha due funzioni centrali: fa sì che il carico arrivi davvero al muscolo bersaglio e mantiene le articolazioni in posizioni sicure. Insieme, queste due cose determinano se un esercizio è efficace e sostenibile.\n\nAllenarsi con una tecnica scadente sposta spesso il carico su muscoli non voluti o su strutture passive come legamenti e tendini. Questo non solo riduce l’effetto allenante, ma aumenta anche il rischio di infortuni da sovraccarico. La tecnica non è quindi fine a sé stessa, ma il presupposto perché l’allenamento serva al suo scopo.\n\nSoprattutto all’inizio conviene imparare gli schemi di movimento con pesi leggeri. Il sistema nervoso consolida gli schemi attraverso la ripetizione: una tecnica ben assimilata è la base su cui in seguito si possono gestire in sicurezza carichi più pesanti.',
      },
      {
        title: 'Range di movimento completo',
        content: 'Il range di movimento (ROM) descrive l’ampiezza lungo cui un muscolo lavora durante un esercizio. Come regola generale, il range più ampio possibile è superiore a uno ridotto, soprattutto per la crescita muscolare.\n\nDiversi studi lo confermano. Una revisione di Schoenfeld & Grgic (2020, SAGE Open Medicine) conclude che i range di movimento completi portano in generale a più crescita muscolare rispetto ai movimenti parziali. In particolare la posizione di allungamento sotto carico sembra essere un forte stimolo di crescita: lo squat profondo, per esempio, favorisce lo sviluppo delle cosce più del mezzo squat.\n\nCi sono eccezioni: per alcuni esercizi o in presenza di limitazioni di salute può avere senso un range leggermente adattato. In generale, però, dovresti puntare al range più ampio che riesci a controllare con una buona tecnica e senza dolore.',
      },
      {
        title: 'Tempo e controllo',
        content: 'La velocità con cui esegui una ripetizione influenza lo stimolo. Soprattutto la fase eccentrica (quando abbassi il peso) dovrebbe essere controllata: non lasciar cadere il peso, ma frenalo attivamente. Così la tensione resta sul muscolo e il controllo migliora.\n\nUn errore comune è sfruttare lo slancio. Tirare su il peso con movimenti bruschi sposta il lavoro dai muscoli all’inerzia e riduce così l’effetto allenante. Ripetizioni controllate e consapevoli sono quasi sempre più efficaci di quelle veloci e approssimative.\n\nQuesto non significa che ogni ripetizione debba essere lentissima. Un’indicazione sensata è: fase concentrica (sollevare) decisa ma controllata, fase eccentrica (abbassare) in circa due-tre secondi. L’attenzione va sempre al sentire e al far lavorare consapevolmente il muscolo coinvolto.',
      },
      {
        title: 'Errori comuni e come correggerli',
        content: 'L’errore più comune è troppo peso a scapito della tecnica. Se le ultime ripetizioni riescono solo con slancio, movimenti di compenso o un range incompleto, il peso è troppo alto. La soluzione è semplice: riducilo ed esegui il movimento in modo pulito.\n\nUn secondo errore è trascurare la fase eccentrica. Molti lasciano ricadere il peso senza controllo e sprecano così gran parte dello stimolo. Frenare in modo consapevole risolve il problema all’istante.\n\nUn terzo punto è la scarsa attenzione al muscolo bersaglio. La «connessione mente-muscolo», cioè la concentrazione consapevole sul muscolo che lavora, può migliorare l’attivazione, soprattutto negli esercizi di isolamento. Riprendere in video la propria esecuzione o farsi dare un riscontro da persone esperte aiuta a riconoscere e correggere gli errori tecnici.',
      },
      {
        title: 'Riepilogo',
        content: 'Una tecnica pulita lungo tutto il range di movimento è la base di un allenamento efficace e sicuro. Garantisce che il muscolo bersaglio riceva lo stimolo e protegge le articolazioni.\n\nPunta al range controllato più ampio possibile, esegui in modo consapevole soprattutto la fase eccentrica ed evita lo slancio. La tecnica viene sempre prima del peso: solo quando il movimento è solido ha senso aggiungere carico.\n\nUna buona tecnica non è una cosa da fare una volta, ma una priorità costante. Chi la cura si allena in modo più efficace, resta più a lungo senza infortuni e pone le basi per progressi continui.',
      },
    ],
  },

  periodization: {
    name: 'Periodizzazione e pianificazione',
    summary: 'La periodizzazione è la strutturazione pianificata dell’allenamento nel tempo, con fasi alternate di volume, intensità e recupero. Aiuta a evitare gli stalli, a prevenire il sovrallenamento e a progredire in modo continuo nel lungo periodo.',
    quick: [
      { label: 'Idea chiave', text: 'Pianificare l’allenamento in fasi in modo consapevole invece di allenarsi allo stesso modo ogni settimana.' },
      { label: 'Per chi', text: 'Soprattutto per gli avanzati; i principianti vanno bene a lungo con una semplice progressione lineare.' },
    ],
    sections: [
      {
        title: 'Che cos’è la periodizzazione?',
        content: 'La periodizzazione è la pianificazione sistematica dell’allenamento su diversi archi di tempo. Invece di allenarsi in modo identico settimana dopo settimana, variabili come volume, intensità, range di ripetizioni e scelta degli esercizi vengono variate di proposito, per ottenere progressi su un periodo più lungo e gestire la fatica.\n\nIl concetto nasce in origine dallo sport agonistico e risale ai lavori di Leo Matveyev e Tudor Bompa. L’obiettivo era portare gli atleti al picco di forma per competizioni specifiche. L’idea di fondo, alternare carico e recupero in modo pianificato, è però utile per chiunque si alleni.\n\nUna distinzione comune è tra macrociclo (l’intero piano su mesi fino a un anno), mesociclo (blocchi di più settimane con un obiettivo) e microciclo (di solito una settimana di allenamento). Questa struttura aiuta a scomporre il grande obiettivo in tappe gestibili e progressive.',
      },
      {
        title: 'Modelli di periodizzazione',
        content: 'Esistono diversi modelli consolidati. La periodizzazione lineare parte con volume alto e intensità bassa e si sposta nel corso delle settimane verso meno volume e più intensità, classicamente da fasi di ipertrofia a fasi di forza.\n\nLa periodizzazione ondulata varia il carico a intervalli più brevi, spesso da seduta a seduta all’interno della stessa settimana: per esempio un giorno pesante con poche ripetizioni, un altro con ripetizioni moderate e un terzo con ripetizioni alte. Una meta-analisi suggerisce che entrambi i modelli sono efficaci e che in pratica le differenze sono spesso piccole (Williams et al., 2017, Sports Medicine).\n\nLa periodizzazione a blocchi si concentra su un unico obiettivo per diverse settimane (per esempio un blocco di volume seguito da un blocco di intensità). Quale modello sia il migliore dipende da obiettivi, esperienza e preferenze: ciò che conta è avere un piano con una variazione consapevole.',
      },
      {
        title: 'I principianti hanno bisogno della periodizzazione?',
        content: 'Per i principianti una periodizzazione complessa di solito non serve. Nei primi mesi il corpo risponde così bene a qualsiasi stimolo allenante che una semplice progressione lineare (un po’ più di peso o di ripetizioni settimana dopo settimana) produce già ottimi progressi. Questa fase viene spesso chiamata «novice gains».\n\nSolo quando questi rapidi progressi iniziali rallentano, in genere dopo qualche mese fino a circa un anno di allenamento costante, una struttura più ragionata diventa davvero utile. Allora le fasi alternate aiutano a continuare a dare uno stimolo senza scivolare nel sovrallenamento o nella stagnazione.\n\nPer i principianti la regola è quindi: costanza, buona tecnica e progressione semplice battono qualsiasi pianificazione complicata. La periodizzazione è uno strumento per gli avanzati, non un requisito per iniziare.',
      },
      {
        title: 'Costruire un piano semplice',
        content: 'Un buon piano di allenamento parte dagli obiettivi e dal tempo disponibile. Da questi derivano la frequenza di allenamento (per esempio 3–4 sedute a settimana) e lo split: full body con poche sedute, oppure uno split upper/lower o push-pull-legs con più sedute.\n\nSu questa base si distribuiscono esercizi e volume in modo che ogni gruppo muscolare venga allenato idealmente due volte a settimana con un totale di circa 10–20 serie impegnative. Gli esercizi multiarticolari (squat, stacco, panca piana e military press, trazioni, rematori) formano la base, integrati da esercizi di isolamento per i punti deboli.\n\nNel corso delle settimane progredisci (più peso o più ripetizioni) e circa ogni 4–8 settimane puoi inserire una settimana di scarico. Un piano non deve essere complicato: deve adattarsi alla tua vita, essere seguito con costanza e venire aggiustato regolarmente in base ai progressi.',
      },
      {
        title: 'Riepilogo',
        content: 'La periodizzazione è la variazione pianificata dell’allenamento nel tempo per evitare stalli e sovrallenamento. I modelli più comuni sono la periodizzazione lineare, quella ondulata e quella a blocchi; in pratica le differenze sono spesso più piccole di quanto si pensi.\n\nI principianti non hanno bisogno di una periodizzazione complessa: una semplice progressione lineare li porta lontano nei primi mesi. Solo gli avanzati traggono un beneficio evidente da fasi pianificate.\n\nLa cosa più importante è un piano che si adatti ai tuoi obiettivi e alla tua quotidianità, alleni adeguatamente ogni gruppo muscolare, aumenti progressivamente e preveda il recupero. Struttura e costanza battono qualsiasi metodo presunto «perfetto».',
      },
    ],
  },
};
