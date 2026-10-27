// Italienische Fassung der 21 Peak-Programme aus `src/data/peakPrograms.js`.
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
    strength: 'Allenamento di forza',
    cardio: 'Cardio',
    hiit: 'HIIT',
    martial_arts: 'Arti marziali',
  },

  studien: {
    'Schoenfeld, Ogborn & Krieger|2017': 'Meta-analisi dose-risposta: 10 o più serie per gruppo muscolare a settimana producono una crescita muscolare significativamente maggiore rispetto a un numero inferiore di serie.',
    'Schoenfeld, Ogborn & Krieger|2016': 'Meta-analisi: allenare ogni gruppo muscolare 2 volte a settimana produce più ipertrofia che allenarlo 1 volta a settimana.',
    'Helms et al.|2016': 'La scala RIR («ripetizioni in riserva») è uno strumento valido per regolare lo sforzo nell’allenamento di forza: chiudi la maggior parte delle serie con 1–3 RIR.',
    'Schoenfeld, Grgic & Krieger|2019': 'A parità di volume settimanale, la frequenza di allenamento è secondaria: ciò che conta è il volume totale per gruppo muscolare.',
    'Pedisic et al.|2020': 'Meta-analisi: chi corre ha un rischio di mortalità per tutte le cause inferiore di ~27 %, e già piccoli volumi di corsa (1 volta a settimana) mostrano questo effetto.',
    'Lee et al.|2014': 'Anche 5–10 minuti al giorno di corsa lenta sono stati associati a una mortalità totale e cardiovascolare nettamente inferiore.',
    'Helgerud et al.|2007': 'Gli intervalli di 4×4 minuti al 90–95 % della frequenza cardiaca massima hanno aumentato il VO₂max significativamente più dell’allenamento continuo moderato a parità di lavoro totale.',
    'Milanović et al.|2015': 'Meta-analisi: l’HIIT migliora il VO₂max negli adulti sani più dell’allenamento di resistenza classico.',
    'Gunnarsson & Bangsbo|2012': 'Con il metodo 10-20-30 i corridori hanno migliorato il VO₂max (~4 %) e i tempi sui 1500 m e sui 5 km, pur riducendo il volume di allenamento di ~50 %.',
    'Seiler|2010': 'Gli atleti di resistenza d’élite svolgono ~80 % del loro volume a bassa intensità (zone 1–2); questo modello polarizzato offre i migliori adattamenti a lungo termine.',
    'Stöggl & Sperlich|2014': 'L’allenamento polarizzato (tanto lavoro facile + poco lavoro molto duro) ha migliorato VO₂max e prestazione negli atleti di resistenza allenati più del lavoro a soglia o del solo HIT.',
    'Esteve-Lanao et al.|2007': 'I corridori che hanno svolto ~80 % del volume a bassa intensità hanno migliorato il tempo di gara più di un gruppo che si allenava di più nella zona di intensità media.',
    'Billat et al.|1999': 'Gli intervalli alla velocità del VO₂max (vVO₂max) hanno migliorato in modo misurabile economia di corsa e ritmo nei corridori allenati.',
    'Tabata et al.|1996': '6 settimane di sessioni da 4 minuti (8×20 s/10 s) hanno aumentato il VO₂max di ~7 ml/kg/min e la capacità anaerobica del 28 %; l’allenamento continuo moderato ha migliorato solo la capacità aerobica.',
    'Weston et al.|2014': 'Meta-analisi: l’HIIT ha migliorato la forma cardiorespiratoria quasi il doppio rispetto all’allenamento continuo moderato.',
    'Gibala et al.|2006': '6 sessioni di sprint a intervalli in 2 settimane (~2,5 h di allenamento) hanno prodotto adattamenti di resistenza muscolare simili a ~10,5 h di allenamento di resistenza classico.',
    'Little et al.|2010': 'Intervalli di 8–12×60 secondi con 75 s di pausa hanno aumentato nettamente la capacità mitocondriale del muscolo, con solo ~20–25 minuti per sessione.',
    'McRae et al.|2012': '4 volte a settimana, appena 4 minuti di intervalli total body hanno migliorato resistenza E resistenza muscolare in modo paragonabile a 30 minuti di allenamento continuo.',
    'Chaabène et al.|2015': 'Revisione: la boxe dilettantistica richiede insieme un’elevata capacità aerobica e anaerobica; i pugili d’élite raggiungono valori di VO₂max intorno ai 60 ml/kg/min.',
    'Ouergui et al.|2014': 'I round di kickboxing portano la frequenza cardiaca vicino al massimo: l’allenamento a round agisce fisiologicamente come un allenamento a intervalli ad alta intensità.',
    'James et al.|2016': 'Revisione: le MMA richiedono forza, velocità e resistenza combinate; si raccomanda un condizionamento vario e basato sui round.',
  },

  ppl_6x: {
    name: 'Push / Pull / Legs',
    desc: 'La classica split di 6 giorni per la massima crescita muscolare. Ogni gruppo muscolare viene allenato 2 volte a settimana.',
    why: 'Il PPL combina le due leve più potenti per la crescita muscolare: un volume settimanale alto (16–20 serie per gruppo muscolare) e una frequenza di 2 volte a settimana. La suddivisione per schemi di movimento (spinta/trazione/gambe) lascia recuperare completamente ogni gruppo muscolare, anche se ti alleni quasi ogni giorno.',
    progression: 'Doppia progressione: mantieni serie e range di ripetizioni e sali con le ripetizioni. Quando raggiungi il limite superiore in tutte le serie con tecnica pulita, aumenta il peso di 2,5 kg e riparti dal basso. Chiudi la maggior parte delle serie con 1–3 ripetizioni in riserva (RIR).',
  },
  upper_lower_4x: {
    name: 'Upper / Lower',
    desc: 'Split efficace di 4 giorni per principianti e intermedi. Ogni gruppo muscolare viene allenato 2 volte a settimana.',
    why: 'La split upper/lower è il miglior compromesso tra tempo investito e risultato: 4 sessioni a settimana bastano per la frequenza di 2 volte per gruppo muscolare che, secondo le meta-analisi, produce più crescita di una sola. Prima gli esercizi fondamentali, poi quelli di isolamento mirati.',
    progression: 'Doppia progressione: prima aumenta le ripetizioni nel range obiettivo, poi +2,5 kg. Chiudi i fondamentali (squat, panca piana, stacco) con 2 RIR e gli esercizi di isolamento con 1 RIR. Dopo 6–8 settimane inserisci una settimana leggera.',
  },
  split_5x: {
    name: 'Split di 5 giorni',
    desc: 'Split avanzata di 5 giorni con volume alto per gruppo muscolare. Per atleti esperti.',
    why: 'Per chi è avanzato e ha bisogno di più volume: la split di 5 giorni permette 15–20+ serie per gruppo muscolare con piena concentrazione su una zona per sessione. La ricerca dose-risposta mostra che chi si allena da tempo continua a crescere con più serie settimanali.',
    progression: 'Doppia progressione su ogni esercizio. In più, ogni 3–4 settimane aggiungi una serie al primo esercizio del giorno, finché il recupero lo permette. Fai della settimana 10 uno scarico (pesi −30 %, serie dimezzate).',
  },
  fullbody_3x: {
    name: 'Total body 3 giorni',
    desc: 'Perfetto per principianti: 3 allenamenti total body a settimana con i fondamentali più importanti.',
    why: 'Per chi inizia, il total body 3 volte a settimana è il modello più efficiente: ogni gruppo muscolare viene stimolato 3 volte a settimana, i fondamentali migliorano in fretta grazie alla pratica frequente e tre sessioni stanno in qualsiasi agenda. I principianti crescono in modo affidabile già con un volume moderato.',
    progression: 'Progressione lineare: aumenta il peso a ogni sessione di 2,5 kg (parte inferiore) o di 1,25–2,5 kg (parte superiore), finché completi tutte le ripetizioni con tecnica pulita. Se fallisci un esercizio 2 volte di fila, riduci il suo peso del 10 % e risali.',
  },
  push_pull_4x: {
    name: 'Push / Pull 4 giorni',
    desc: '4 allenamenti a settimana divisi in movimenti di spinta e di trazione. Le gambe sono integrate.',
    why: 'Push/Pull con gambe integrate è l’alternativa efficiente in termini di tempo al PPL di 6 giorni: stessa frequenza di 2 volte per gruppo muscolare, ma solo 4 giorni in palestra. Il quadricipite passa al Push (lo squat è una spinta), la catena posteriore al Pull (lo stacco è una trazione): un raggruppamento biomeccanicamente pulito.',
    progression: 'Doppia progressione: aumenta le ripetizioni nel range obiettivo, poi +2,5 kg. Progredisci con prudenza su stacco e squat (solo quando completi tutte le serie con 2 RIR). Dopo la settimana 8 fai una settimana di scarico prima di ripetere il ciclo.',
  },
  bro_split_5x: {
    name: 'Bro split',
    desc: 'La classica split da bodybuilding: ogni gruppo muscolare ha il suo giorno con un volume alto.',
    why: 'L’approccio classico del bodybuilding: un gruppo muscolare al giorno, ma con piena concentrazione e volume alto in una sola sessione. La ricerca più recente mostra che, a parità di volume settimanale, la distribuzione è secondaria: se ami il pump e la concentrazione dei giorni dedicati a un muscolo, cresci altrettanto bene.',
    progression: 'Doppia progressione su ogni esercizio, la maggior parte delle serie fino a 1–2 RIR. Dato che ogni gruppo muscolare viene allenato solo 1 volta a settimana, ogni sessione conta: annota i tuoi pesi con costanza e punta ogni settimana ad almeno una ripetizione in più.',
  },
  couch_to_5k: {
    name: 'Dal divano ai 5K',
    desc: 'Da zero a correre 5 chilometri in 9 settimane, con intervalli di corsa e camminata che si allungano ogni settimana.',
    why: 'Il programma per principianti più collaudato al mondo: brevi tratti di corsa con pause camminando permettono a tendini, articolazioni e sistema cardiovascolare di adattarsi invece di sovraccaricarli. La progressione è volutamente dolce, ed è proprio questo a rendere il programma così facile da portare avanti. Già piccoli volumi di corsa riducono in modo misurabile il rischio di mortalità.',
    progression: 'Ogni settimana i tratti di corsa si allungano e le pause camminando si accorciano: da 8×1 minuto di corsa (settimana 1) a 30 minuti di fila (settimana 9). Corri i tratti volutamente piano (ritmo da conversazione, RPE 5–6). Ripeti una settimana se ti sembra troppo dura.',
  },
  norwegian_4x4: {
    name: '4×4 norvegese',
    desc: 'Il protocollo VO₂max nato dalla ricerca: 4 intervalli da 4 minuti al 90–95 % della frequenza cardiaca massima.',
    why: 'Pochi protocolli sono documentati meglio: gli intervalli da 4 minuti vicino alla frequenza cardiaca massima sono lo stimolo più potente che si conosca per il VO₂max, il miglior singolo indicatore di prestazione di resistenza e longevità. Le pause attive di 3 minuti mantengono alta la qualità degli intervalli. Funziona di corsa, in bici e al vogatore.',
    progression: 'Settimane 1–2: 3 intervalli per abituarti. Dalla settimana 3: il 4×4 completo. Settimane 7–8: pausa attiva ridotta a 2:30. Intensità: gli ultimi 2 minuti di ogni intervallo devono sembrare un RPE 9, quando parlare è ormai impossibile.',
  },
  interval_10_20_30: {
    name: 'Intervalli 10-20-30',
    desc: 'Il metodo danese: 30 s piano, 20 s sostenuto, 10 s di sprint. Diventare più veloci con metà del volume di allenamento.',
    why: 'Sviluppato all’Università di Copenaghen: i corridori sono diventati più veloci e più in forma pur dimezzando il volume di allenamento. Gli sprint di soli 10 secondi danno uno stimolo massimo, ma restano così brevi che il carico si distribuisce bene. Ideale se hai poco tempo ma vuoi diventare più veloce.',
    progression: 'Un blocco = 5×(30 s piano · 20 s sostenuto · 10 s di sprint). Settimane 1–2: 2 blocchi; settimane 3–4: 3 blocchi; settimane 5–6: 4 blocchi, con 2 minuti di corsetta tra i blocchi. Gli sprint da 10 secondi sono quasi massimali (RPE 9), il resto volutamente piano.',
  },
  zone2_base: {
    name: 'Base in zona 2',
    desc: 'La base di resistenza dei professionisti: sessioni continue facili in zona 2 di frequenza cardiaca, sempre più lunghe di settimana in settimana.',
    why: 'Gli atleti di resistenza d’élite svolgono ~80 % del loro volume proprio qui: abbastanza piano da poter chiacchierare nel frattempo. La zona 2 sviluppa mitocondri e metabolismo dei grassi, la base su cui ogni allenamento duro può fare effetto. L’errore più comune degli amatori è correre queste sessioni troppo veloci.',
    progression: 'Le sessioni brevi crescono di 5 minuti ogni 2 settimane (25→40 min), il lungo di 5 minuti ogni settimana, con settimane di scarico (35→60 min). Controllo del ritmo: devi riuscire a parlare con frasi complete (RPE 3–4, zona 2). Se non ci riesci, rallenta.',
  },
  '10k_training': {
    name: 'Allenamento 10K',
    desc: 'Preparazione strutturata ai 10 km in 10 settimane: intervalli, corsa a ritmo, corsa facile e lungo.',
    why: 'Il classico della pianificazione di corsa secondo il principio 80/20: due sessioni dure a settimana (intervalli VO₂max + corsa a ritmo) danno lo stimolo di prestazione, due sessioni facili costruiscono la base aerobica. Il lungo cresce in modo progressivo con settimane di scarico, e nelle ultime due settimane si fa il tapering: arrivi fresco alla partenza.',
    progression: 'Intervalli: da 4 a 6×3 minuti (RPE 9). Corsa a ritmo: da 15 a 25 minuti «comodamente duri» (RPE 7). Lungo: da 40 a 70 minuti facili, con scarico nelle settimane 4 e 7. Settimane 9–10: tapering, meno volume e più freschezza. La corsa facile del giovedì resta sempre facile.',
  },
  tabata_classic: {
    name: 'Tabata classico',
    desc: 'Il protocollo Tabata originale: 20 secondi a tutta, 10 secondi di pausa, con un numero crescente di round.',
    why: 'Il protocollo HIIT più famoso al mondo, studiato nel 1996 su pattinatori di velocità giapponesi: 8 round da 20/10 hanno migliorato contemporaneamente la capacità aerobica E quella anaerobica, cosa che l’allenamento continuo moderato non riesce a fare. Decisiva è l’intensità: «a tutta» significa davvero a tutta.',
    progression: 'Settimane 1–2: 8 round (1 blocco Tabata, 4 minuti). Settimane 3–4: 12 round. Settimane 5–6: 16 round (2 blocchi). Ogni fase di lavoro a RPE 9–10: se non completi più gli ultimi round con tecnica pulita, resta una settimana in più al livello attuale.',
  },
  gibala_sit: {
    name: 'Protocollo Gibala 60/75',
    desc: 'Lo «SIT pratico» della ricerca: 8–12 intervalli da 60 secondi intensi con 75 secondi di pausa.',
    why: 'Il gruppo di Martin Gibala ha dimostrato che pochi minuti di intervalli intensi provocano adattamenti cellulari simili a quelli di un tempo molto maggiore di allenamento di resistenza classico. La variante 60/75 è la versione adatta alla vita di tutti i giorni: dura, ma senza sprint massimali, quindi sicura e adatta agli esercizi total body.',
    progression: 'Settimane 1–2: 8 intervalli. Settimane 3–4: 10 intervalli. Settimane 5–6: 12 intervalli. Fasi di lavoro a RPE 8–9 («molto duro, ma sostenibile per 60 secondi»); nelle pause muoviti piano invece di restare fermo.',
  },
  hiit_beginner: {
    name: 'HIIT principianti 30/30',
    desc: 'Ingresso dolce nell’allenamento a intervalli: 30 secondi di lavoro e 30 di pausa, da 6 a 10 round.',
    why: 'Il rapporto 1:1 tra lavoro e pausa è l’ingresso ideale nell’HIIT: abbastanza intenso per gli effetti dimostrati sulla forma fisica, ma con recupero sufficiente per mantenere pulita la tecnica. Secondo le meta-analisi, l’HIIT migliora la forma fisica quasi il doppio rispetto all’allenamento continuo moderato, in una frazione del tempo.',
    progression: 'Settimane 1–2: 6 round. Settimane 3–4: 8 round. Settimane 5–6: 10 round. Fasi di lavoro a RPE 7–8: alla fine di ogni pausa dovresti essere di nuovo pronto. Qualità prima della velocità: contano più le ripetizioni pulite che quelle numerose.',
  },
  hiit_advanced: {
    name: 'HIIT avanzato 40/15',
    desc: 'HIIT intenso per avanzati: 40 secondi di lavoro e solo 15 di pausa, fino a 12 round.',
    why: 'La pausa breve (quasi 3:1) mantiene la frequenza cardiaca sempre alta: così alleni la capacità di continuare a rendere sotto fatica. Quattro sessioni a tema a settimana (potenza, core, gambe, total body) distribuiscono il carico su diversi gruppi muscolari.',
    progression: 'Settimane 1–2: 8 round. Settimane 3–6: 10 round. Settimane 7–8: 12 round. Fasi di lavoro a RPE 8–9. Se la tecnica cede, chiudi prima il round: restare senza infortuni vale più del numero di round.',
  },
  emom_challenge: {
    name: 'Sfida EMOM',
    desc: 'Every Minute On the Minute: ogni minuto inizia un nuovo esercizio e la pausa è ciò che resta del minuto.',
    why: 'L’EMOM ha il ritmo incorporato: chi lavora più veloce si guadagna più pausa, il che mantiene alta la densità e insegna a dosarsi. Gli intervalli total body di questo tipo migliorano contemporaneamente resistenza e resistenza muscolare, come mostrano gli studi sui protocolli total body minimalisti.',
    progression: 'Settimane 1–2: round di base (10–15 a seconda del giorno). Settimane 3–4: +2 round. Settimane 5–6: altri +2 round. Scegli le ripetizioni al minuto in modo che ti restino ~15–20 secondi di pausa; se non resta pausa, riduci le ripetizioni.',
  },
  boxing_basics: {
    name: 'Boxe: fondamentali',
    desc: 'Impara i fondamentali della boxe: jab, diretto, gancio e gioco di gambe, in classici round da 3 minuti.',
    why: 'Allenarsi nella boxe in round da 3 minuti è HIIT mascherato: la frequenza cardiaca oscilla tra lavoro intenso e pausa breve mentre impari coordinazione e tecnica. Ogni sessione ha un focus, così costruisci una base pulita settimana dopo settimana.',
    progression: 'Settimane 1–2: 6 round (il venerdì 8). Settimane 3–4: +1 round per sessione. Settimane 5–6: un altro +1 round. Prima la tecnica, poi il ritmo: le combinazioni lente e pulite prima che veloci. L’ultimo round di ogni sessione può essere «puro condizionamento».',
    fokus: {
      mon: 'Colpi base e guardia',
      wed: 'Combinazioni e potenza',
      fri: 'Resistenza sui round',
    },
  },
  kickboxing_conditioning: {
    name: 'Kickboxing: condizionamento',
    desc: 'Allenamento di kickboxing incentrato su condizionamento e tecnica: calci, pugni e combinazioni a round.',
    why: 'La kickboxing unisce parte superiore e inferiore come pochi sport: i calci richiedono gambe, anche e core, i pugni spalle e braccia. Gli studi mostrano che i round di kickboxing portano la frequenza cardiaca vicino al massimo: ottieni insieme effetti HIIT e mobilità.',
    progression: 'Settimana 4: +1 round in ogni sessione. Settimana 7: un altro round. I giorni di tecnica vengono prima di quelli di condizionamento: impara i calci nuovi piano a vuoto prima di eseguirli sotto fatica. Allunga brevemente le anche ogni giorno.',
    fokus: {
      mon: 'Tecnica dei calci',
      tue: 'Esplosività e resistenza',
      thu: 'Combinazioni pugni-calci',
      sat: 'Simulazione di combattimento',
    },
  },
  mma_fundamentals: {
    name: 'MMA: fondamentali',
    desc: 'Introduzione alle arti marziali miste: colpi, calci e condizionamento specifico da combattimento riuniti in una settimana.',
    why: 'Le MMA sono l’arte marziale più completa: colpire, calciare e lottare a terra richiedono forza, velocità e resistenza insieme. Le scienze dello sport raccomandano esattamente ciò che rispecchia questo programma: allenamento a round con focus che cambiano più un giorno dedicato al condizionamento con sprawl e corda.',
    progression: 'Settimana 4: colpi da 8 a 9 round, condizionamento da 5 a 6. Settimana 7: calci da 6 a 7 round. Il sabato lungo (round da 5 minuti come nelle vere MMA) resta costante: lì conta la qualità sotto fatica, non più volume.',
    fokus: {
      mon: 'Tecnica dei colpi',
      tue: 'Calci e ginocchiate',
      thu: 'Condizionamento da combattimento',
      sat: 'Round da 5 minuti come in gara',
    },
  },
  boxing_advanced: {
    name: 'Boxe avanzata',
    desc: 'Allenamento di boxe avanzato: più volume, sessioni più lunghe e combinazioni complesse.',
    why: 'A livello avanzato decide la capacità di lavoro: i pugili d’élite arrivano a valori di VO₂max intorno ai 60 ml/kg/min, costruiti proprio con questa struttura di round di tecnica, sacco e condizionamento. La simulazione di sparring del sabato mette tutto insieme sotto una fatica vicina a quella del combattimento.',
    progression: 'Settimana 4: +1 round in tecnica e sacco. Settimana 7: un altro round e condizionamento da 8 a 10 round. Settimane 9–10: mantieni il volume e alza l’intensità delle combinazioni (più veloci, più forti, meno pausa tra le combinazioni).',
    fokus: {
      mon: 'Combinazioni complesse',
      tue: 'Potenza e ritmo',
      fri: 'Capacità di lavoro',
      sat: 'Tutto sotto fatica',
    },
  },
  combat_fitness: {
    name: 'Combat Fitness',
    desc: 'Allenamento fitness ispirato alle arti marziali, senza esperienza richiesta: elementi di boxe e calci come lavoro total body.',
    why: 'L’ingresso per chi vuole la forma fisica degli sport da combattimento senza ambizioni agonistiche: shadow boxing, calci ed esercizi a corpo libero in round brevi da 2 minuti. L’allenamento a round agisce fisiologicamente come quello a intervalli, con il vantaggio in più di imparare tecniche vere.',
    progression: 'Settimana 3: un round in più per sessione. Settimana 5: i round passano da 2:00 a 2:30. Mantieni le pause disciplinate a 60 secondi: l’effetto sulla forma fisica viene dal rapporto tra lavoro e pausa.',
    fokus: {
      mon: 'Pugni e parte superiore',
      wed: 'Calci e gambe',
      sat: 'Tutto combinato',
    },
  },
};
