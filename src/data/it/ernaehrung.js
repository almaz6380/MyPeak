// Italienische Fassung von `src/data/nutritionKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Fondamenti',
    makros: 'Macronutrienti',
    mikros: 'Micronutrienti',
    praxis: 'Pratica',
  },

  energy_balance: {
    name: 'Bilancio energetico e calorie',
    summary: 'Il bilancio energetico, cioè le calorie assunte rispetto a quelle consumate, determina se aumenti o perdi peso. È il principio più importante dell’alimentazione e viene prima di tutti gli altri dettagli.',
    quick: [
      { label: 'Idea chiave', text: 'Deficit → perdi, surplus → aumenti, mantenimento → stabile. Le calorie comandano.' },
      { label: 'In pratica', text: 'Stima il TDEE, fissa un obiettivo, osserva per 2–3 settimane, poi aggiusta.' },
    ],
    sections: [
      {
        title: 'Il principio del bilancio energetico',
        content: 'Il bilancio energetico descrive il rapporto tra l’energia che introduci con il cibo e quella che il tuo corpo consuma. Se ne introduci più di quanta ne bruci (surplus), il corpo immagazzina l’energia in eccesso, soprattutto come grasso. Se ne bruci più di quanta ne introduci (deficit), attinge alle riserve e perdi peso.\n\nQuesto principio si basa sul primo principio della termodinamica: l’energia non si perde, si trasforma soltanto. Numerosi studi controllati confermano che il bilancio energetico è il fattore decisivo per le variazioni di peso, indipendentemente dagli alimenti da cui provengono le calorie (Hall & Guo, 2017, Gastroenterology).\n\nQuesto non significa che la qualità del cibo sia irrilevante. Influisce su sazietà, salute, prestazione e sulla facilità con cui mantieni un certo livello calorico. Ma per la semplice domanda «aumentare o perdere», ciò che conta è il bilancio calorico totale.',
      },
      {
        title: 'Le componenti del consumo calorico',
        content: 'Il dispendio energetico giornaliero totale (TDEE) si compone di quattro parti. Il metabolismo basale (BMR) è la quota più grande, con il 60–70%: l’energia di cui il corpo ha bisogno a riposo per le funzioni vitali come respirazione, circolazione e metabolismo cellulare.\n\nL’effetto termico del cibo (TEF) rappresenta circa il 10%: l’energia spesa per digerire ed elaborare il cibo. Le proteine hanno l’effetto termico più alto, uno dei motivi per cui un’alimentazione ricca di proteine aiuta a perdere grasso.\n\nLa terza parte, la più variabile, è l’attività. Si distingue tra esercizio fisico (EAT) e movimento quotidiano (NEAT, Non-Exercise Activity Thermogenesis), come camminare, gesticolare e stare in piedi. Il NEAT può variare di diverse centinaia di calorie al giorno da persona a persona e spesso si adatta inconsciamente a un deficit calorico, perché ci si muove di meno.',
      },
      {
        title: 'Stimare il fabbisogno calorico',
        content: 'Per stimare il tuo fabbisogno calcola prima il metabolismo basale, per esempio con la formula di Mifflin-St Jeor, e moltiplicalo per un fattore di attività (da 1,2 per molto sedentari fino a ~1,9 per molto attivi). Il risultato è il tuo TDEE stimato, cioè il numero di calorie con cui il tuo peso resta stabile.\n\nImportante: queste formule forniscono solo approssimazioni. Il consumo reale può variare del 10–20% da persona a persona. Il valore iniziale è quindi solo un punto di partenza, non una tabella di marcia esatta.\n\nL’approccio più affidabile è seguire il peso corporeo per due-tre settimane con un apporto calorico costante. Se resta stabile, hai trovato il tuo livello di mantenimento. Se sale o scende, aggiusta le calorie di circa 200–300. Così la teoria si adatta alla tua realtà.',
      },
      {
        title: 'Idee sbagliate comuni',
        content: 'Un errore comune è credere in un metabolismo «rotto» o estremamente lento. I veri disturbi metabolici sono rari; di solito si sovrastima il consumo calorico e si sottostima l’apporto. Gli studi mostrano che spesso le persone sottostimano il proprio apporto calorico del 20–50% (Lichtman et al., 1992, New England Journal of Medicine).\n\nUn secondo errore: credere che certi alimenti «accelerino il metabolismo» e sciolgano il grasso. Effetti del genere sono minimi e non cambiano l’equazione di base. Nessun cibo e nessuna bevanda annulla il bilancio energetico.\n\nTerzo, l’adattamento metabolico è reale ma limitato: con un deficit prolungato il consumo cala un po’ (termogenesi adattativa), ma questo non spiega uno stallo completo. Chi non perde peso pur credendo di essere in deficit di solito mangia più di quanto pensi.',
      },
      {
        title: 'Riepilogo',
        content: 'Il bilancio energetico è la base di tutta l’alimentazione: un deficit ti fa perdere peso, un surplus te lo fa aumentare, il mantenimento lo tiene stabile. Tutti gli altri dettagli (macro, tempistica, scelta degli alimenti) agiscono all’interno di questo quadro.\n\nStima il tuo fabbisogno con una formula, ma considera il valore solo come punto di partenza e calibralo in base alla reale variazione di peso. Misura e aggiusta invece di affidarti solo alla teoria.\n\nQualità del cibo, proteine e sazietà determinano quanto sia piacevole e sano mantenere un livello calorico, ma se aumenti o perdi lo decide il bilancio. Capire questo principio ti rende indipendente dalle diete di moda.',
      },
    ],
  },

  protein: {
    name: 'Proteine',
    summary: 'Le proteine sono il macronutriente più importante per costruire e mantenere i muscoli. Sono le più sazianti, hanno l’effetto termico più alto e proteggono i muscoli durante la perdita di grasso. Per chi si allena l’ideale è circa 1,6–2,2 g per chilogrammo di peso corporeo.',
    quick: [
      { label: 'Obiettivo', text: 'Circa 1,6–2,2 g per kg di peso corporeo al giorno; verso il limite alto durante la dieta.' },
      { label: 'Fonti', text: 'Carne, pesce, uova, latticini, legumi, tofu, whey/proteine in polvere.' },
    ],
    sections: [
      {
        title: 'Perché le proteine sono così importanti',
        content: 'Le proteine sono formate da aminoacidi, i mattoni di muscoli, enzimi, ormoni e praticamente di ogni struttura del corpo. Nove di questi aminoacidi sono essenziali: il corpo non può produrli da solo, devono arrivare dal cibo.\n\nPer chi fa sport le proteine sono particolarmente importanti perché stimolano la sintesi proteica muscolare, il processo con cui dopo l’allenamento si costruisce nuova massa muscolare. Senza proteine sufficienti, anche un allenamento duro si trasforma a malapena in crescita muscolare.\n\nLe proteine hanno inoltre due vantaggi pratici per il controllo del peso: saziano più dei carboidrati o dei grassi e hanno l’effetto termico più alto (circa il 20–30% delle calorie proteiche viene consumato nella digestione). Entrambe le cose ne fanno il macronutriente più prezioso durante la dieta.',
      },
      {
        title: 'Di quante proteine hai bisogno?',
        content: 'Il minimo ufficiale per evitare carenze è 0,8 g per chilogrammo di peso corporeo, ma per chi fa sport è ben lontano dall’ottimale. Un’ampia meta-analisi di Morton et al. (2018, British Journal of Sports Medicine) ha rilevato che circa 1,6 g/kg offrono il beneficio maggiore per la crescita muscolare, con un possibile beneficio aggiuntivo fino a circa 2,2 g/kg.\n\nDurante la dieta è preferibile il limite alto. In deficit calorico il fabbisogno aumenta perché le proteine proteggono i muscoli dalla degradazione. Helms et al. (2014) raccomandano agli atleti in deficit fino a 2,3–3,1 g per chilogrammo di massa magra.\n\nPer la maggior parte di chi si allena, un’indicazione semplice di circa 2 g per chilogrammo di peso corporeo è pratica ed efficace. Di più non fa male alle persone sane, ma porta poco beneficio aggiuntivo.',
      },
      {
        title: 'Qualità e distribuzione',
        content: 'Non tutte le fonti proteiche sono uguali. La «qualità» dipende dal contenuto di aminoacidi essenziali, in particolare di leucina, e dalla digeribilità. Le fonti animali (carne, pesce, uova, latticini) sono di solito complete; quelle vegetali sono spesso carenti di singoli aminoacidi, ma si possono completare combinandole (per esempio legumi più cereali).\n\nConta anche la distribuzione nell’arco della giornata. La sintesi proteica muscolare viene stimolata al massimo, per pasto, da circa 20–40 g di proteine di alta qualità. Ha quindi senso distribuire le proteine su tre-cinque pasti invece di mangiarle tutte in uno.\n\nIn pratica significa: ogni pasto principale dovrebbe contenere una buona fonte proteica. La quantità totale nella giornata resta però il fattore più importante: una distribuzione perfetta conta meno che raggiungere l’obiettivo giornaliero.',
      },
      {
        title: 'Miti e sicurezza',
        content: 'Un mito persistente è che molte proteine danneggino i reni. Nelle persone sane questo non trova conferma: studi controllati non mostrano effetti negativi di un elevato apporto proteico sulla funzione renale (Devries et al., 2018, Journal of Nutrition). Solo in presenza di una malattia renale è necessario un consulto medico.\n\nUn altro mito: che il corpo possa «utilizzare» solo circa 30 g di proteine per pasto. In realtà ne digerisce e ne utilizza di più; è solo lo stimolo acuto sulla sintesi proteica muscolare a raggiungere un plateau. Porzioni più grandi quindi non vanno sprecate.\n\nLe proteine in polvere come la whey sono comode ma non obbligatorie. Sono semplicemente una fonte proteica pratica ed economica. Chi copre il proprio fabbisogno con alimenti normali non ha bisogno di integratori: sono uno strumento, non un miracolo.',
      },
      {
        title: 'Riepilogo',
        content: 'Le proteine sono il macronutriente chiave per costruire muscolo, mantenerlo e per la sazietà. Per chi si allena l’ideale è circa 1,6–2,2 g per chilogrammo di peso corporeo, verso il limite alto durante la dieta.\n\nPunta su fonti di alta qualità, distribuisci le proteine su più pasti e soprattutto raggiungi il tuo obiettivo giornaliero. Che siano animali o vegetali conta meno, purché quantità totale e qualità siano adeguate.\n\nI soliti avvertimenti sul «troppo» di proteine sono infondati per le persone sane. Le proteine sono il macronutriente in cui la precisione ripaga di più: fanno la differenza maggiore per composizione corporea e sazietà.',
      },
    ],
  },

  carbs: {
    name: 'Carboidrati',
    summary: 'I carboidrati sono la principale fonte di energia per l’allenamento intenso. Non fanno ingrassare di per sé: conta il bilancio calorico totale. Qualità, quantità e tempistica possono però influire in modo percepibile su prestazione e benessere.',
    quick: [
      { label: 'Funzione', text: 'Carburante principale per lo sforzo intenso; riempiono le riserve di glicogeno di muscoli e fegato.' },
      { label: 'In pratica', text: 'Soprattutto fonti ricche di fibre e poco lavorate; adatta la quantità all’attività.' },
    ],
    sections: [
      {
        title: 'Che cosa fanno i carboidrati nel corpo',
        content: 'I carboidrati vengono scomposti in glucosio, il carburante preferito per il lavoro muscolare intenso e la principale fonte di energia per il cervello. Il glucosio in eccesso viene immagazzinato come glicogeno nei muscoli e nel fegato, una riserva di energia rapidamente disponibile.\n\nDurante l’allenamento di forza intenso e quello a intervalli, il corpo attinge molto a questo glicogeno muscolare. Riserve ben piene significano più prestazione, più ripetizioni e una migliore qualità dell’allenamento. Con un apporto di carboidrati basso per un periodo prolungato, queste riserve possono svuotarsi in parte e la prestazione ad alta intensità può calare.\n\nIn senso stretto, però, i carboidrati non sono essenziali: il corpo può produrre glucosio da sé. Per la prestazione sportiva e il benessere sono comunque molto utili per la maggior parte delle persone, soprattutto con un allenamento intenso.',
      },
      {
        title: 'Qualità: carboidrati complessi e semplici',
        content: 'Le fonti di carboidrati hanno effetti molto diversi. Fonti ricche di fibre e poco lavorate come cereali integrali, legumi, frutta e verdura vengono digerite più lentamente, saziano di più e forniscono micronutrienti. Fonti molto lavorate come zucchero e prodotti a base di farina bianca vengono assorbite in fretta e saziano poco.\n\nLe fibre meritano un’attenzione particolare. Favoriscono la digestione, nutrono i batteri intestinali e migliorano la sazietà. Se ne raccomandano circa 25–35 g al giorno, una quantità che molte persone non raggiungono di gran lunga. Un’alimentazione ricca di fibre è associata a una salute migliore e a un controllo del peso più facile.\n\nQuesto non significa che i carboidrati semplici siano vietati. Intorno all’allenamento, i carboidrati rapidamente disponibili possono anzi essere utili. Nella vita di tutti i giorni, però, la maggior parte dovrebbe arrivare da fonti ricche di nutrienti e di fibre.',
      },
      {
        title: 'Quanti carboidrati?',
        content: 'Dopo proteine e grassi, puoi riempire con i carboidrati le calorie che restano rispetto al tuo obiettivo. Non esiste una quantità «giusta» fissa: dipende da attività, preferenze e obiettivi. Le persone molto attive traggono beneficio da più carboidrati, quelle meno attive se la cavano con meno.\n\nPer chi si allena intensamente si citano spesso 3–5 g per chilogrammo di peso corporeo o più. Chi fa poco esercizio o preferisce un’alimentazione con meno carboidrati può stare ben al di sotto senza svantaggi, purché proteine e calorie totali siano adeguate.\n\nLe diete low carb e chetogeniche funzionano per la perdita di grasso quanto quelle con più carboidrati, a parità di calorie. Non sono un brucia-grassi miracoloso, ma un’opzione legittima per chi si sente meglio così o le trova più sazianti.',
      },
      {
        title: 'Il mito dell’insulina',
        content: 'Un mito molto diffuso sostiene che i carboidrati facciano ingrassare solo per via del rilascio di insulina. L’insulina è un ormone di accumulo che aumenta dopo pasti ricchi di carboidrati; da qui è nata la teoria che i carboidrati siano il vero motivo dell’aumento di grasso.\n\nGli studi controllati però la smentiscono chiaramente. A parità di calorie e di proteine, una dieta povera di carboidrati non porta a una perdita di grasso maggiore rispetto a una ricca di carboidrati (Hall et al., 2016, American Journal of Clinical Nutrition). L’insulina regola i processi di accumulo a breve termine, ma non annulla il bilancio energetico totale.\n\nPer le persone sane le normali risposte insuliniche ai carboidrati non sono affatto un problema. È diverso in caso di diabete o insulino-resistenza: lì la gestione dei carboidrati è rilevante dal punto di vista medico e andrebbe seguita da un medico.',
      },
      {
        title: 'Riepilogo',
        content: 'I carboidrati sono il carburante principale per l’allenamento intenso e non fanno affatto ingrassare di per sé: decide il bilancio calorico. Riempiono le riserve di glicogeno e sostengono prestazione e recupero.\n\nScegli soprattutto fonti ricche di fibre e poco lavorate e adatta la quantità alla tua attività. Intorno all’allenamento possono essere utili carboidrati più rapidi.\n\nNé il low carb né l’high carb sono superiori in sé: entrambi funzionano con calorie adeguate. Scegli l’approccio con cui ti senti bene, ti alleni bene e che riesci a mantenere a lungo.',
      },
    ],
  },

  fats: {
    name: 'Grassi',
    summary: 'I grassi alimentari sono indispensabili per gli ormoni, le membrane cellulari e l’assorbimento delle vitamine liposolubili. Un minimo è importante per la salute; il tipo di grasso conta più della semplice quantità.',
    quick: [
      { label: 'Minimo', text: 'Non scendere a lungo sotto ~0,5–0,8 g per kg di peso corporeo (funzione ormonale).' },
      { label: 'Qualità', text: 'Privilegia i grassi insaturi (olio d’oliva, frutta secca, pesce); evita i grassi trans.' },
    ],
    sections: [
      {
        title: 'Il ruolo dei grassi alimentari',
        content: 'I grassi sono molto più di un vettore di energia. Sono un componente di ogni membrana cellulare, un precursore degli ormoni steroidei come testosterone ed estrogeni e sono necessari per assorbire le vitamine liposolubili A, D, E e K. Un’alimentazione con pochissimi grassi può quindi compromettere la produzione di ormoni e l’assorbimento dei nutrienti.\n\nCon 9 calorie per grammo, i grassi sono il macronutriente più denso di energia, più del doppio di proteine o carboidrati (4 kcal ciascuno). Per questo è facile assumere senza accorgersene molte calorie tramite i grassi, ed è per questo che un approccio consapevole aiuta durante la dieta.\n\nDue acidi grassi sono essenziali: omega-3 e omega-6. Il corpo non può produrli da solo. In particolare gli acidi grassi omega-3 del pesce grasso sono assunti in quantità insufficienti da molte persone e sono associati a numerosi benefici per la salute.',
      },
      {
        title: 'Tipi di grassi',
        content: 'I grassi insaturi sono considerati particolarmente benefici. I grassi monoinsaturi (olio d’oliva, avocado, frutta secca) e quelli polinsaturi (pesce grasso, semi di lino, noci) favoriscono la salute del cuore e forniscono acidi grassi essenziali. Dovrebbero costituire la maggior parte dell’apporto di grassi.\n\nI grassi saturi (in carne, burro, olio di cocco) non sono dannosi di per sé, ma andrebbero consumati con moderazione. La maggior parte delle società scientifiche raccomanda meno del 10% delle calorie totali. Le evidenze sul loro effetto esatto sono dibattute, ma sostituirne una parte con grassi insaturi è considerato vantaggioso.\n\nI grassi trans artificiali sono l’unico tipo di grasso da evitare con decisione. Nascono dall’indurimento industriale degli oli e sono fortemente associati alle malattie cardiovascolari. In molti Paesi oggi sono fortemente regolamentati o vietati.',
      },
      {
        title: 'Quanti grassi?',
        content: 'A differenza delle proteine, per i grassi conta soprattutto un limite inferiore da rispettare. Un’alimentazione costantemente molto povera di grassi (sotto circa 0,5 g per chilogrammo di peso corporeo) in alcune persone può compromettere la produzione di ormoni. Un minimo sensato è intorno a 0,5–0,8 g per chilogrammo.\n\nVerso l’alto i grassi sono flessibili. Una volta fissate le proteine, le calorie restanti si possono dividere tra grassi e carboidrati secondo le preferenze. Alcune persone si sentono meglio con più grassi e meno carboidrati, altre al contrario: entrambe le scelte sono sane.\n\nLe raccomandazioni tipiche sono intorno al 20–35% delle calorie totali da grassi. Più importante della percentuale esatta è rispettare il minimo, scegliere soprattutto grassi di qualità e tenere d’occhio le calorie totali.',
      },
      {
        title: 'Focus sugli omega-3',
        content: 'Tra i grassi, gli acidi grassi omega-3 EPA e DHA meritano un’attenzione particolare. Hanno un effetto antinfiammatorio e sono associati a una migliore salute cardiovascolare e cerebrale. La fonte principale è il pesce grasso di acque fredde come salmone, sgombro e aringa.\n\nMolte persone assumono troppo pochi omega-3 e allo stesso tempo molti omega-6 (dagli oli lavorati), il che sposta il rapporto in modo sfavorevole. Due-tre porzioni di pesce grasso a settimana migliorano sensibilmente l’apporto.\n\nChi non mangia pesce può valutare un integratore di olio di alghe o di pesce. Le fonti vegetali di omega-3 (semi di lino, noci) forniscono ALA, che il corpo converte solo in misura limitata nelle forme attive EPA e DHA. Per domande di salute sull’integrazione è consigliabile un consulto medico.',
      },
      {
        title: 'Riepilogo',
        content: 'I grassi sono indispensabili per ormoni, membrane cellulari e assorbimento delle vitamine. Non scendere a lungo sotto circa 0,5–0,8 g per chilogrammo di peso corporeo, altrimenti funzione ormonale e benessere possono risentirne.\n\nLa qualità dei grassi conta: privilegia i grassi insaturi di olio d’oliva, frutta secca, avocado e pesce grasso, mantieni moderati i grassi saturi ed evita i grassi trans artificiali. Presta particolare attenzione a un apporto adeguato di omega-3.\n\nSopra il minimo, la quantità di grassi è flessibile e una questione di gusti. Scegli la ripartizione tra grassi e carboidrati secondo le tue preferenze e tieni in ordine le calorie totali.',
      },
    ],
  },

  micronutrients: {
    name: 'Vitamine e minerali',
    summary: 'I micronutrienti non forniscono energia, ma sono indispensabili per innumerevoli funzioni del corpo. Un’alimentazione varia e basata su alimenti integrali di solito copre il fabbisogno, ma alcuni nutrienti meritano un’attenzione particolare.',
    quick: [
      { label: 'Regola base', text: 'Una varietà di verdura, frutta, cereali integrali e fonti proteiche copre la maggior parte dei micronutrienti.' },
      { label: 'Da tenere d’occhio', text: 'Vitamina D, omega-3, eventualmente ferro (donne), B12 (vegani), iodio, magnesio.' },
    ],
    sections: [
      {
        title: 'Che cosa sono i micronutrienti',
        content: 'I micronutrienti comprendono vitamine e minerali di cui il corpo ha bisogno solo in piccole quantità, a differenza dei macronutrienti (proteine, carboidrati, grassi), che forniscono energia. Pur non contenendo calorie, partecipano praticamente a ogni processo metabolico: produzione di energia, funzione immunitaria, salute delle ossa, trasporto dell’ossigeno e molto altro.\n\nUna carenza di micronutrienti può manifestarsi in modo graduale: con stanchezza, recupero peggiore, maggiore predisposizione alle infezioni o calo della prestazione. Soprattutto con diete ipocaloriche o poco variate aumenta il rischio di un apporto insufficiente.\n\nLa buona notizia: un’alimentazione varia con molta verdura, frutta, cereali integrali, fonti proteiche di qualità e grassi sani copre in modo naturale il fabbisogno della maggior parte dei micronutrienti. La varietà degli alimenti è la migliore assicurazione contro le carenze.',
      },
      {
        title: 'Tenere d’occhio i nutrienti critici',
        content: 'Alcuni micronutrienti scarseggiano spesso anche con una buona alimentazione. La vitamina D si forma soprattutto con la luce del sole e in molte regioni è carente, specialmente d’inverno. Qui un’integrazione ha spesso senso, idealmente dopo un esame del sangue.\n\nIl ferro è un tema particolare per le donne con il ciclo, perché la perdita regolare di sangue aumenta il fabbisogno. Una carenza si manifesta con stanchezza e calo della prestazione. La vitamina B12 si trova quasi esclusivamente nei prodotti animali: chi segue un’alimentazione vegana deve integrarla.\n\nAltri nutrienti spesso carenti sono iodio, magnesio, zinco e omega-3. Invece di integrare tutto indiscriminatamente, è più saggio guardare in modo mirato al proprio fabbisogno, idealmente tramite gli esami del sangue e d’accordo con un medico.',
      },
      {
        title: 'Prima il cibo, poi gli integratori',
        content: 'Come regola: gli alimenti integrali sono preferibili agli integratori. Forniscono i micronutrienti in una matrice naturale con fibre, sostanze vegetali secondarie e altre sostanze che agiscono insieme. Una singola vitamina in pillola non può sostituire questa complessità.\n\nGli studi su preparati vitaminici isolati mostrano spesso benefici deludenti o nulli per le persone sane senza carenze, a volte persino svantaggi in caso di sovradosaggio. Di più non è meglio: le vitamine liposolubili (A, D, E, K) possono accumularsi ed essere dannose ad alte dosi.\n\nGli integratori hanno senso quando c’è una carenza reale o un fabbisogno aumentato, come la vitamina D d’inverno, la B12 in un’alimentazione vegana o il ferro in caso di carenza accertata. Come aggiunta mirata sono utili; come sostituto di una buona alimentazione no.',
      },
      {
        title: 'Messa in pratica',
        content: 'La strategia più semplice per un buon apporto di micronutrienti è varietà e colore. Verdure e frutta di colori diversi forniscono vitamine e sostanze vegetali secondarie diverse: «mangia l’arcobaleno» è una pratica regola empirica.\n\nIn concreto aiuta inserire verdura in ogni pasto principale, aggiungere regolarmente legumi, frutta secca e semi, alternare diverse fonti proteiche e preferire i cereali integrali ai prodotti molto lavorati. Così si crea quasi automaticamente un’ampia base di nutrienti.\n\nChi mangia molti cibi lavorati e poco vari rischia carenze nonostante calorie sufficienti, un fenomeno a volte descritto come «sovralimentati e malnutriti». La qualità del cibo è quindi la chiave per un apporto solido di micronutrienti.',
      },
      {
        title: 'Riepilogo',
        content: 'I micronutrienti non forniscono energia, ma sono indispensabili per salute, recupero e prestazione. Un’alimentazione varia e basata su alimenti integrali copre il fabbisogno della maggior parte di vitamine e minerali.\n\nVitamina D, omega-3 e, a seconda della situazione, ferro, B12, iodio e magnesio meritano un’attenzione particolare. Invece di integrare in modo generalizzato, conviene guardare in modo mirato al proprio fabbisogno, idealmente tramite gli esami del sangue.\n\nGli alimenti integrali vengono prima degli integratori. Varietà e colore nel piatto sono la strategia migliore e più semplice per un buon apporto di micronutrienti.',
      },
    ],
  },

  meal_timing: {
    name: 'Tempistica dei pasti',
    summary: 'Quando e quanto spesso mangi conta molto meno di che cosa e quanto. La tempistica può affinare prestazione e benessere, ma non sostituisce mai le basi: calorie e proteine.',
    quick: [
      { label: 'Priorità', text: 'Prima calorie totali e proteine: la tempistica è una rifinitura, non la base.' },
      { label: 'Utile', text: 'Distribuisci le proteine nella giornata; mangia a sufficienza intorno all’allenamento.' },
    ],
    sections: [
      {
        title: 'Rimettere le cose in prospettiva',
        content: 'Intorno alla tempistica dei pasti girano molti miti, dalla «finestra anabolica» subito dopo l’allenamento al divieto di mangiare carboidrati la sera. In realtà la tempistica è un fattore di rifinitura che conta solo quando le basi sono a posto: calorie totali, proteine e qualità del cibo.\n\nLa gerarchia dell’alimentazione è chiara: prima viene il bilancio energetico, poi i macronutrienti (soprattutto le proteine), poi la qualità del cibo e i micronutrienti, e solo dopo tempistica e frequenza dei pasti. Chi trascura i livelli superiori non può salvare nulla con una tempistica perfetta.\n\nQuesto non significa che la tempistica sia inutile. Può migliorare prestazione, sazietà e benessere. Ma è l’ultima leva, la più piccola: nessun motivo per stressarsi o seguire regole complicate.',
      },
      {
        title: 'La «finestra anabolica»',
        content: 'Per molto tempo la regola era che bisognasse assumere proteine e carboidrati subito dopo l’allenamento, altrimenti l’effetto allenante sarebbe andato perso. Questa stretta «finestra anabolica» si è rivelata un’esagerazione.\n\nUna meta-analisi di Schoenfeld, Aragon & Krieger (2013, Journal of the International Society of Sports Nutrition) ha rilevato che il momento esatto dell’assunzione di proteine intorno all’allenamento è molto meno importante della quantità totale giornaliera di proteine. La «finestra» è ampia piuttosto diverse ore che pochi minuti.\n\nIn pratica significa: finché mangi abbastanza proteine distribuite nella giornata e non sei completamente a digiuno per molte ore prima e dopo l’allenamento, non devi avere fretta. Chi si allena a digiuno può trarre beneficio da un pasto relativamente presto dopo l’allenamento, più per motivi pratici che per un’urgenza fisiologica.',
      },
      {
        title: 'Frequenza dei pasti e digiuno intermittente',
        content: 'Che tu faccia tre pasti grandi o sei piccoli ha poca influenza sul metabolismo o sulla perdita di grasso, purché calorie e proteine restino uguali. La vecchia convinzione che pasti piccoli e frequenti «accendano il metabolismo» è stata smentita: l’effetto termico dipende dalla quantità totale, non dalla frequenza.\n\nIl digiuno intermittente (per esempio 16:8) è popolare e per molti è uno strumento utile per gestire l’apporto calorico. Ma non è un brucia-grassi miracoloso: a parità di calorie non porta a più perdita di grasso di un’alimentazione distribuita in modo uniforme. Il suo vantaggio sta soprattutto nel fatto che ad alcune persone riesce più facile restare in deficit in questo modo.\n\nLa frequenza dei pasti migliore è quella che si adatta alla tua quotidianità, ti sazia bene e che riesci a mantenere. Per la crescita muscolare ha senso distribuire le proteine su almeno tre-quattro porzioni; oltre a questo, la frequenza è una questione di gusti.',
      },
      {
        title: 'Una tempistica sensata nella pratica',
        content: 'Anche se la tempistica è secondaria, ci sono alcuni punti utili nella pratica. Prima dell’allenamento, un pasto con carboidrati e un po’ di proteine da una a tre ore prima fornisce buona energia e prestazione. Uno stomaco troppo pieno poco prima della seduta può invece essere fastidioso.\n\nDopo l’allenamento ha senso un pasto con proteine e carboidrati entro qualche ora, per sostenere il recupero e il ripristino del glicogeno. Il momento esatto è flessibile: non deve essere il famigerato secondo dopo l’ultima serie.\n\nAnche sonno e digestione traggono beneficio dalla tempistica: pasti molto abbondanti o piccanti subito prima di dormire possono disturbare il sonno. Ma mangiare carboidrati la sera non deve far temere un aumento di grasso: è un mito, purché il bilancio giornaliero sia corretto.',
      },
      {
        title: 'Riepilogo',
        content: 'La tempistica dei pasti è la rifinitura dell’alimentazione, non la sua base. Calorie totali e proteine determinano la maggior parte del risultato; tempistica e frequenza sono secondarie.\n\nLa «finestra anabolica» è ampia diverse ore, non minuti. Frequenza dei pasti e digiuno intermittente si equivalgono a parità di calorie: scegli ciò che si adatta alla tua quotidianità e ti sazia bene.\n\nÈ utile distribuire le proteine nella giornata e mangiare a sufficienza intorno all’allenamento. Tutto il resto è ottimizzazione individuale, non un obbligo. Non stressarti per la tempistica finché le basi sono a posto.',
      },
    ],
  },
};
