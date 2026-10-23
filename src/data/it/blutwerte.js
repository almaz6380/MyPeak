// Italienische Fassung von `src/data/bloodworkKnowledge.js`.
// Schlüssel = `id` aus der Datendatei. Reihenfolge der `sections` muss der
// Datendatei entsprechen — sie werden über den Index zugeordnet.
// Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    hormone: 'Ormoni',
    stoffwechsel: 'Metabolismo',
    vitamine: 'Vitamine e minerali',
    herz: 'Sistema cardiovascolare',
  },

  testosterone: {
    name: 'Testosterone',
    summary: 'Il testosterone è l’ormone anabolico più importante e influisce su crescita muscolare, densità ossea, libido, umore ed energia. Il suo valore si può influenzare positivamente con lo stile di vita, ma le promesse estreme vanno prese con cautela.',
    quick: [
      { label: 'Importanza', text: 'Crescita muscolare, densità ossea, libido, motivazione, umore.' },
      { label: 'Sostenerlo in modo naturale', text: 'Allenamento di forza, buon sonno, peso corporeo sano, grassi e micronutrienti sufficienti.' },
    ],
    sections: [
      {
        title: 'Che cosa fa il testosterone nel corpo',
        content: 'Il testosterone è il più importante ormone sessuale maschile, ma è presente in quantità minori anche nelle donne, dove ha altrettanta importanza. Appartiene agli ormoni anabolici (costruttivi) e ha un ruolo centrale in crescita muscolare, forza, densità ossea, distribuzione del grasso, libido, umore ed energia.\n\nNegli uomini il testosterone viene prodotto soprattutto nei testicoli, sotto il controllo di un’interazione tra cervello (ipotalamo, ipofisi) e testicoli. La produzione segue un ritmo giornaliero con valori più alti al mattino: per questo i prelievi di sangue per misurare il testosterone si fanno di solito al mattino.\n\nUn livello di testosterone sano sostiene l’adattamento all’allenamento di forza e il benessere generale. Sia valori troppo bassi sia valori artificialmente molto elevati (per esempio con steroidi anabolizzanti) hanno però conseguenze per la salute.',
      },
      {
        title: 'Valori di riferimento e misurazione',
        content: 'Il testosterone si misura nel sangue, di solito come testosterone totale; anche il testosterone libero (biologicamente attivo) è informativo. I valori di riferimento variano a seconda del laboratorio, dell’età e del metodo di misura, per questo vanno sempre interpretati nel contesto del laboratorio specifico e dei sintomi.\n\nPer gli uomini adulti l’intervallo di riferimento del testosterone totale è spesso compreso all’incirca tra 300 e 1000 ng/dl, ma i limiti sono sfumati. Un singolo valore è inoltre solo un’istantanea: orario, sonno, stress e malattie acute possono influenzarlo. In caso di valori anomali di solito si ripete la misurazione.\n\nÈ importante che un valore di laboratorio da solo non sia una diagnosi. Solo l’insieme di sintomi (per esempio mancanza di energia, calo della libido, perdita di massa muscolare) e di valori misurati più volte permette una valutazione medica sensata.',
      },
      {
        title: 'Che cosa influenza il livello di testosterone',
        content: 'Numerosi fattori dello stile di vita influiscono sul livello di testosterone. Il sovrappeso, in particolare molto grasso addominale, è associato a valori più bassi; perdere peso può migliorarli. La privazione cronica di sonno abbassa il testosterone in modo misurabile: anche una sola settimana con appena cinque ore di sonno può ridurre notevolmente i valori (Leproult & Van Cauter, 2011, JAMA).\n\nL’allenamento di forza e un movimento adeguato hanno un effetto favorevole nel lungo periodo, mentre un sovrallenamento estremo o deficit calorici molto forti possono abbassare il testosterone. Per la produzione ormonale è importante anche un apporto adeguato di grassi alimentari e di micronutrienti come zinco e vitamina D: un’alimentazione molto povera di grassi può deprimere i valori.\n\nLo stress cronico aumenta l’ormone cortisolo, che agisce in senso opposto al testosterone. Uno stile di vita sano con buon sonno, alimentazione equilibrata, allenamento regolare e gestione dello stress è quindi la base naturale più efficace per un livello di testosterone sano.',
      },
      {
        title: 'Aspettative realistiche e parere medico',
        content: 'Il mercato è pieno di «testosterone booster» che promettono aumenti spettacolari. Nella maggior parte dei casi questi prodotti, negli studi su persone con valori normali, non hanno effetti o li hanno minimi. Uno stile di vita sano alza un valore basso in modo più efficace di qualsiasi prodotto da banco e, con valori normali, il testosterone non si può praticamente «spingere» in modo sensato.\n\nUn livello di testosterone davvero troppo basso (ipogonadismo) con i relativi sintomi è una diagnosi medica che va chiarita da un medico ed eventualmente trattata. La terapia con testosterone spetta esclusivamente al medico, perché richiede di valutare con attenzione benefici e rischi.\n\nL’uso fai-da-te di steroidi anabolizzanti per migliorare la prestazione è fortemente sconsigliato: possono sopprimere la produzione propria del corpo e causare gravi danni alla salute. In caso di sospetti problemi ormonali, la strada giusta è sempre rivolgersi a un medico.',
      },
    ],
  },

  vitamin_d_blood: {
    name: 'Vitamina D (25-OH)',
    summary: 'Il valore ematico della vitamina D (25-OH-vitamina D) mostra l’apporto della «vitamina del sole». Una carenza è frequente soprattutto in inverno e può avere effetti su ossa, muscoli e sistema immunitario. Il valore si può migliorare in modo mirato.',
    quick: [
      { label: 'Che cosa si misura', text: '25-OH-vitamina D nel sangue, il valore standard per lo stato della vitamina D.' },
      { label: 'Come migliorarlo', text: 'Luce del sole, pesce grasso e, in caso di carenza, un integratore con dosaggio guidato dalle analisi.' },
    ],
    sections: [
      {
        title: 'Perché il valore di vitamina D è importante',
        content: 'Nel corpo la vitamina D agisce come un ormone ed è fondamentale per il metabolismo del calcio, la salute delle ossa, la funzione muscolare e il sistema immunitario. Poiché il corpo la produce da sé con l’esposizione al sole, l’apporto dipende molto dalla stagione, dal luogo in cui vivi e dallo stile di vita.\n\nIl miglior indicatore dello stato è la 25-idrossi-vitamina D (25-OH-D) nel sangue. Riflette la forma di deposito e offre un quadro affidabile dell’apporto delle ultime settimane. È proprio questo il valore che si determina con le analisi del sangue.\n\nPoiché la carenza di vitamina D è molto diffusa ed è difficile da compensare solo con l’alimentazione, questo valore è uno degli esami di routine più utili, soprattutto per chi vive a latitudini settentrionali e nei mesi poveri di sole.',
      },
      {
        title: 'Capire i valori di riferimento',
        content: 'Lo stato della vitamina D si indica di solito in nanogrammi per millilitro (ng/ml) o in nanomoli per litro (nmol/l). Come orientamento di massima, molti laboratori usano questa classificazione: i valori sotto circa 20 ng/ml (50 nmol/l) sono considerati carenza, l’intervallo superiore sufficiente, anche se i limiti esatti variano a seconda della società scientifica.\n\nQuesti limiti sono discussi tra gli esperti e non sono scolpiti nella pietra. Alcuni esperti ritengono sensati obiettivi un po’ più alti, altri mettono in guardia dal trattamento eccessivo. Ciò che conta è interpretare il proprio valore nel tempo e d’accordo con un medico.\n\nUn valore molto basso spiega a volte disturbi aspecifici come stanchezza, debolezza muscolare o infezioni frequenti. Un singolo valore di laboratorio va però sempre visto nel quadro complessivo: è un tassello, non una diagnosi.',
      },
      {
        title: 'Come migliorare il valore',
        content: 'La fonte più naturale è la luce del sole: un’esposizione regolare e moderata della pelle stimola la produzione propria. Nei mesi estivi spesso bastano brevi periodi all’aperto, mentre in inverno, alle latitudini settentrionali, la radiazione UV-B non è sufficiente.\n\nCon l’alimentazione forniscono vitamina D soprattutto il pesce grasso (salmone, sgombro, aringa), il tuorlo d’uovo e i prodotti arricchiti, di solito però in quantità che da sole non compensano una carenza. Per questo, in caso di carenza accertata, un integratore (vitamina D3) è spesso la soluzione più affidabile.\n\nLa cosa più sensata è regolare la dose dell’integratore in base al valore ematico: misurare il punto di partenza, integrare, ricontrollare dopo qualche mese e adattare. Così resti nell’intervallo efficace e sicuro. Poiché la vitamina D è liposolubile e può accumularsi, le dosi elevate andrebbero assunte con accompagnamento medico.',
      },
      {
        title: 'Valutazione e parere medico',
        content: 'La vitamina D è uno dei pochi integratori con una rilevanza ampia e reale; allo stesso tempo non bisogna né drammatizzare una carenza né sopravvalutare la vitamina D come rimedio universale. Non risolve ogni problema di salute, ma è un tassello importante.\n\nPoiché le vitamine liposolubili possono accumularsi, un dosaggio elevato senza controllo non è innocuo. Dosi estremamente alte per lungo tempo possono portare a un pericoloso eccesso di calcio. Da qui la regola: misurare il valore, integrare in modo mirato e, nel dubbio, chiedere un parere medico.\n\nIl valore di vitamina D è un buon esempio di quanto sia utile un approccio basato sui dati: invece di tirare a indovinare, le analisi danno chiarezza e permettono una correzione mirata e sicura. Questi contenuti non sostituiscono però il parere medico.',
      },
    ],
  },

  iron_ferritin: {
    name: 'Ferro e ferritina',
    summary: 'Il ferro è indispensabile per il trasporto dell’ossigeno nel sangue. La ferritina indica le riserve di ferro. Una carenza, frequente soprattutto nelle donne con il ciclo e negli atleti di resistenza, porta a stanchezza e calo delle prestazioni.',
    quick: [
      { label: 'Che cosa si misura', text: 'Ferritina (riserve), spesso insieme a emoglobina, transferrina e saturazione della transferrina.' },
      { label: 'Gruppi a rischio', text: 'Donne con il ciclo, atleti di resistenza, alimentazione vegetariana o vegana.' },
    ],
    sections: [
      {
        title: 'Il ruolo del ferro',
        content: 'Il ferro è un minerale essenziale e un componente centrale dell’emoglobina, il pigmento rosso del sangue che trasporta l’ossigeno dai polmoni a tutti i tessuti. Senza ferro a sufficienza il corpo non riesce a formare abbastanza emoglobina funzionante, e l’apporto di ossigeno ne risente.\n\nNel muscolo il ferro serve anche ad accumulare ossigeno tramite la mioglobina ed è coinvolto nella produzione di energia nelle cellule. Una carenza di ferro si ripercuote quindi direttamente su resistenza, forza e prestazione generale.\n\nI sintomi tipici di una carenza sono stanchezza, pallore, fiato corto sotto sforzo, difficoltà di concentrazione e un calo percepibile delle prestazioni in allenamento. Poiché questi sintomi sono aspecifici, una carenza di ferro passa spesso inosservata a lungo, finché non emerge dalle analisi.',
      },
      {
        title: 'La ferritina e i valori più importanti',
        content: 'Per valutare lo stato del ferro si usano diversi valori. Il più importante è la ferritina, la forma di deposito del ferro: mostra quanto sono piene le riserve e spesso scende prima che una carenza conclamata sia visibile nell’emocromo. Una ferritina bassa è quindi un segnale d’allarme precoce.\n\nIn aggiunta si guardano l’emoglobina (il pigmento rosso vero e proprio), la transferrina (la proteina di trasporto) e la saturazione della transferrina. Solo il quadro complessivo permette una buona valutazione: una ferritina bassa con emoglobina ancora normale indica riserve vuote prima che compaia una vera anemia.\n\nÈ importante sapere che la ferritina può aumentare anche in presenza di infiammazioni e così mascherare una carenza. Per questo i valori del ferro andrebbero sempre interpretati da un medico, insieme ad altri marcatori e al quadro clinico.',
      },
      {
        title: 'Gruppi a rischio e cause',
        content: 'Alcuni gruppi hanno un rischio nettamente maggiore di carenza di ferro. Le donne con il ciclo perdono regolarmente sangue e quindi ferro: per loro la carenza di ferro è la carenza più frequente in assoluto. Anche le donne in gravidanza hanno un fabbisogno molto aumentato.\n\nAnche gli atleti di resistenza sono a rischio, tra l’altro per un fabbisogno maggiore, per le perdite con il sudore e attraverso l’apparato digerente e per il cosiddetto effetto dell’impatto del piede nella corsa. Chi segue un’alimentazione vegetariana o vegana assume il ferro in una forma meno assimilabile e dovrebbe tenere d’occhio il proprio stato.\n\nAltre cause possono essere un apporto insufficiente, malattie digestive con assorbimento alterato o perdite di sangue nascoste. Proprio per la varietà delle cause, una carenza di ferro poco chiara o persistente va sempre chiarita con il medico.',
      },
      {
        title: 'Migliorare, ma nel modo giusto',
        content: 'Con l’alimentazione, la carne rossa fornisce soprattutto ferro eme, ben assimilabile; le fonti vegetali come legumi, cereali integrali e verdure verdi contengono ferro non eme, che si assorbe meno bene. La vitamina C (per esempio da frutta o verdura nello stesso pasto) migliora nettamente l’assorbimento del ferro vegetale, mentre caffè e tè lo ostacolano.\n\nIn caso di carenza accertata, l’alimentazione spesso non basta per riempire rapidamente le riserve; possono allora servire preparati a base di ferro. Questi però non vanno presi alla cieca: integrare ferro senza carenza non è innocuo, perché il ferro in eccesso può accumularsi nel corpo e fare danni.\n\nPer questo con il ferro vale in particolare la regola: prima misurare, poi agire in modo mirato. Dose e durata di una terapia con ferro spettano al medico, così come la ricerca della causa. Questi contenuti servono a informare e non sostituiscono una diagnosi medica.',
      },
    ],
  },

  cholesterol: {
    name: 'Colesterolo e lipidi nel sangue',
    summary: 'Colesterolo e trigliceridi sono lipidi importanti del sangue. Il loro profilo (LDL, HDL, trigliceridi) è un indicatore centrale della salute cardiovascolare. Lo stile di vita ha una grande influenza, ma la valutazione spetta al medico.',
    quick: [
      { label: 'Valori importanti', text: 'Colesterolo totale, LDL, HDL e trigliceridi, insieme il profilo lipidico.' },
      { label: 'Come influenzarli positivamente', text: 'Fibre, grassi insaturi, movimento, peso sano, pochi grassi trans.' },
    ],
    sections: [
      {
        title: 'Che cos’è il colesterolo',
        content: 'Il colesterolo è una sostanza simile ai grassi di cui il corpo ha bisogno per costruire membrane cellulari, ormoni e acidi biliari. È quindi indispensabile per la vita e non qualcosa di «cattivo» in sé. Il corpo produce da sé la maggior parte del colesterolo; una parte arriva dall’alimentazione.\n\nPoiché il colesterolo è liposolubile, viaggia nel sangue legato a proteine di trasporto, le lipoproteine. Le più note sono le LDL («lipoproteine a bassa densità») e le HDL («lipoproteine ad alta densità»). Semplificando, le LDL portano il colesterolo verso i tessuti, mentre le HDL riportano al fegato il colesterolo in eccesso.\n\nUn altro valore lipidico importante sono i trigliceridi, la principale forma di grasso di deposito. Insieme, colesterolo totale, LDL, HDL e trigliceridi formano il profilo lipidico che si determina con le analisi del sangue.',
      },
      {
        title: 'LDL, HDL e la valutazione',
        content: 'Per la salute cardiovascolare contano sia il rapporto sia il livello dei singoli valori. Un colesterolo LDL elevato in modo persistente è associato a un rischio maggiore di depositi nei vasi sanguigni (aterosclerosi), per questo le LDL vengono spesso chiamate colesterolo «sfavorevole». Le HDL invece sono considerate piuttosto «favorevoli», perché partecipano al trasporto di ritorno.\n\nAnche trigliceridi elevati sono un fattore di rischio, spesso legato a sovrappeso, consumo elevato di zuccheri e mancanza di movimento. Per valutare il rischio però non conta un singolo valore, ma il profilo completo insieme ad altri fattori come pressione arteriosa, fumo, familiarità e glicemia.\n\nGli intervalli obiettivo esatti dipendono molto dal rischio complessivo individuale e li stabilisce il medico. Un valore «alto» non significa automaticamente che si debba intervenire, e uno «normale» non esclude del tutto il rischio: per questo la valutazione medica è decisiva.',
      },
      {
        title: 'Dove interviene lo stile di vita',
        content: 'Lo stile di vita ha un’influenza notevole sui lipidi del sangue. Un’alimentazione ricca di fibre, con molta verdura, frutta, legumi e cereali integrali, può abbassare il colesterolo LDL. Sostituire i grassi saturi con quelli insaturi (olio d’oliva, frutta secca, pesce grasso) ha un effetto favorevole, mentre i grassi trans artificiali sono chiaramente sfavorevoli e andrebbero evitati.\n\nIl movimento regolare migliora il profilo lipidico, in particolare i trigliceridi e le HDL. Anche un peso corporeo sano, non fumare e un consumo moderato di alcol contribuiscono alla salute cardiovascolare. Queste misure agiscono insieme e sono la base di ogni miglioramento.\n\nÈ importante una valutazione realistica: una parte dei valori di colesterolo è di origine genetica e si può modificare solo in misura limitata con lo stile di vita. Alcune persone hanno valori elevati pur vivendo in modo sano; in questi casi può essere necessaria una terapia farmacologica, che decide esclusivamente il medico.',
      },
      {
        title: 'Valutazione e parere medico',
        content: 'Il profilo lipidico è uno degli esami di routine più importanti per stimare il rischio cardiovascolare. Proprio perché i depositi nei vasi a lungo non causano sintomi, controlli regolari sono utili, soprattutto con l’avanzare dell’età o in caso di familiarità.\n\nL’interpretazione è complessa e spetta al medico. Se e come un valore vada trattato dipende dal rischio complessivo individuale, non da un singolo numero. I cambiamenti dello stile di vita sono quasi sempre il primo passo; farmaci come le statine si aggiungono quando il rischio lo giustifica e sono ben studiati.\n\nUsa queste conoscenze per capire meglio il tuo profilo lipidico e lavorare in modo mirato sui fattori dello stile di vita. La valutazione e il trattamento concreti dei tuoi valori dovrebbero però avvenire sempre con un medico: questi contenuti non sostituiscono il parere medico.',
      },
    ],
  },

  blood_sugar: {
    name: 'Glicemia e HbA1c',
    summary: 'La glicemia (glucosio) e il valore a lungo termine HbA1c mostrano quanto bene il corpo gestisce lo zucchero. Sono indicatori centrali del metabolismo e del rischio di diabete. Alimentazione e movimento hanno una grande influenza.',
    quick: [
      { label: 'Che cosa si misura', text: 'Glicemia a digiuno (valore istantaneo) e HbA1c (media degli ultimi ~3 mesi).' },
      { label: 'Come influenzarli positivamente', text: 'Movimento, peso sano, alimentazione ricca di fibre, pochi zuccheri; l’allenamento di forza aiuta.' },
    ],
    sections: [
      {
        title: 'Glicemia e insulina',
        content: 'Il glucosio (zucchero nel sangue) è una fonte di energia centrale per il corpo. Dopo un pasto la glicemia sale e il pancreas rilascia l’ormone insulina. L’insulina porta il glucosio nelle cellule e riporta così la glicemia a un livello normale.\n\nQuesto sistema finemente regolato mantiene la glicemia in un intervallo ristretto. Se funziona bene, lo zucchero viene gestito in modo efficiente. Se l’azione dell’insulina è alterata (insulino-resistenza), il corpo deve produrre sempre più insulina e la glicemia resta troppo alta: una fase che precede il diabete di tipo 2.\n\nLa muscolatura ha qui un ruolo importante: i muscoli attivi assorbono glucosio e migliorano la sensibilità all’insulina. Per questo l’allenamento regolare, in particolare quello di forza, è uno dei fattori più efficaci per un metabolismo degli zuccheri sano.',
      },
      {
        title: 'Glicemia a digiuno e HbA1c',
        content: 'Due valori sono particolarmente significativi. La glicemia a digiuno si misura dopo diverse ore senza mangiare e mostra il livello di zucchero attuale. È un’istantanea e può oscillare in base ad alimentazione, stress e orario.\n\nIl valore di HbA1c («zucchero a lungo termine») riflette la glicemia media degli ultimi due-tre mesi circa. Misura la quota di emoglobina a cui si è legato lo zucchero. Poiché copre un periodo più lungo, è più robusto rispetto alle oscillazioni a breve termine e viene usato per la diagnosi e il monitoraggio.\n\nInsieme, i due valori danno un buon quadro del metabolismo degli zuccheri. Valori elevati possono indicare una fase che precede il diabete (prediabete) o un diabete già presente. I limiti esatti e la loro interpretazione li stabilisce il medico.',
      },
      {
        title: 'Influenza di alimentazione e movimento',
        content: 'Il metabolismo degli zuccheri si può influenzare molto con lo stile di vita. Un’alimentazione ricca di fibre, con verdura, legumi e cereali integrali, porta a un aumento della glicemia più lento e uniforme rispetto agli alimenti molto lavorati e ricchi di zuccheri. Ridurre le bevande zuccherate e i prodotti a base di farina raffinata è particolarmente efficace.\n\nIl movimento è un fattore chiave. Sia l’allenamento di resistenza sia quello di forza migliorano la sensibilità all’insulina e aiutano i muscoli ad assorbire glucosio. Già una passeggiata dopo mangiato può attenuare l’aumento della glicemia. Costruire massa muscolare amplia inoltre il «magazzino degli zuccheri» del corpo.\n\nUn peso corporeo sano, in particolare la riduzione del grasso addominale, migliora nettamente i valori glicemici. Queste misure di stile di vita sono la strategia più efficace e la prima per contrastare il prediabete e ridurre il rischio di diabete.',
      },
      {
        title: 'Valutazione e parere medico',
        content: 'Glicemia e HbA1c sono tra gli esami di prevenzione più importanti, perché un metabolismo degli zuccheri alterato a lungo non causa sintomi ma può avere conseguenze gravi. Riconoscere presto un prediabete offre la possibilità di correggere la rotta con cambiamenti dello stile di vita prima che si sviluppi il diabete.\n\nValori elevati sono un segnale d’allarme importante, ma non un’autodiagnosi. Interpretazione, ulteriori accertamenti ed eventuale trattamento spettano al medico. Se il diabete è già presente, un’assistenza medica strutturata è indispensabile.\n\nUsa queste conoscenze per capire il significato dei tuoi valori e usare in modo mirato alimentazione e movimento. L’allenamento di forza e un’alimentazione equilibrata e ricca di fibre sono alleati potenti per un metabolismo degli zuccheri sano. Questi contenuti non sostituiscono però il parere né la diagnosi del medico.',
      },
    ],
  },

  thyroid: {
    name: 'Tiroide (TSH)',
    summary: 'Con i suoi ormoni la tiroide regola metabolismo, energia e temperatura corporea. Il valore di TSH è l’esame di screening più importante per una funzione ridotta o eccessiva. Le alterazioni vanno sempre chiarite con il medico.',
    quick: [
      { label: 'Che cosa si misura', text: 'TSH come esame di screening; se alterato, anche fT3/fT4 ed eventualmente anticorpi.' },
      { label: 'Sintomi', text: 'Stanchezza, variazioni di peso, sensazione di freddo o caldo, umore: aspecifici, chiarire con il medico.' },
    ],
    sections: [
      {
        title: 'La tiroide e i suoi ormoni',
        content: 'La tiroide è una piccola ghiandola a forma di farfalla nel collo, con un effetto enorme. Produce gli ormoni tiroidei T3 (triiodotironina) e T4 (tiroxina), che regolano il metabolismo basale, il metabolismo energetico, la temperatura corporea, il battito cardiaco e molte altre funzioni.\n\nLa tiroide è controllata da un circuito di regolazione con il cervello. L’ipofisi rilascia l’ormone TSH (ormone tireostimolante), che spinge la tiroide a produrre ormoni. Questo circuito adatta con precisione la quantità di ormoni al fabbisogno del corpo.\n\nSe la funzione tiroidea è alterata, le conseguenze riguardano tutto l’organismo. Una funzione ridotta (ipotiroidismo) rallenta il metabolismo, una funzione eccessiva (ipertiroidismo) lo accelera. Entrambe si manifestano con molti sintomi aspecifici.',
      },
      {
        title: 'Perché il TSH è il valore più importante',
        content: 'Il valore di TSH è l’esame di screening più sensibile per la funzione tiroidea. Il motivo sta nel circuito di regolazione: se la tiroide produce pochi ormoni, il corpo cerca di compensare e rilascia più TSH, quindi un TSH alto indica spesso una funzione ridotta. Se ne produce troppi, il TSH scende, il che può indicare una funzione eccessiva.\n\nPoiché il TSH reagisce già a piccole deviazioni, viene determinato come primo valore. Se il TSH risulta alterato seguono altri esami: gli ormoni tiroidei liberi fT3 e fT4 ed eventualmente gli anticorpi, per riconoscere cause come la tiroidite di Hashimoto, una malattia autoimmune.\n\nGli intervalli di riferimento del TSH variano a seconda del laboratorio, e l’interpretazione dipende dalla situazione individuale: età, gravidanza o sintomi presenti. Un singolo valore al limite non significa automaticamente una malattia.',
      },
      {
        title: 'Sintomi e disturbi frequenti',
        content: 'Un ipotiroidismo si manifesta spesso con stanchezza, mancanza di energia, aumento di peso, sensibilità al freddo, pelle secca e umore depresso. Un ipertiroidismo invece si mostra spesso con nervosismo, battito accelerato, perdita di peso nonostante l’appetito, sensibilità al caldo e disturbi del sonno.\n\nQuesti sintomi sono aspecifici e possono avere molte altre cause: proprio per questo le analisi del sangue sono così preziose, per verificare o escludere la tiroide come causa. Per chi fa attività fisica una tiroide che funziona bene è importante, perché influisce su energia, recupero e metabolismo.\n\nI disturbi frequenti sono la tiroidite di Hashimoto, una malattia autoimmune (che porta spesso a una funzione ridotta), e il morbo di Basedow-Graves (che porta a una funzione eccessiva). Anche la carenza di iodio può influire sulla tiroide. Una diagnosi precisa richiede sempre una visita medica.',
      },
      {
        title: 'Valutazione e parere medico',
        content: 'La tiroide è un esempio di come un piccolo organo influenzi tutto il corpo. Il valore di TSH è un esame di screening semplice e significativo, che può avere senso in caso di sintomi poco chiari come stanchezza persistente, variazioni di peso inspiegabili o sbalzi d’umore.\n\nA differenza di altri valori, un vero disturbo della funzione tiroidea non si può «eliminare con l’allenamento» cambiando lo stile di vita. Un apporto sufficiente di iodio (con sale iodato e alimenti) sostiene la funzione normale, ma un disturbo già presente richiede un trattamento medico mirato, spesso con preparati ormonali.\n\nPer questo qui vale in particolare: valori tiroidei alterati o i relativi sintomi vanno sempre portati dal medico. Queste conoscenze ti aiutano a capire il significato del valore di TSH e a prendere sul serio i sintomi; espressamente, non sostituiscono la diagnosi né il trattamento.',
      },
    ],
  },
};
