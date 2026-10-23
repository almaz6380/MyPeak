// Traduzione italiana dei testi legali.
//
// L’originale tedesco in `legalContent.js` resta il testo vincolante — per
// questo ogni documento inizia con la sezione «Versione vincolante». Così
// fanno i testi legali multilingue: si traduce perché si capisca, non per
// creare una seconda versione con validità propria.
//
// Nome, indirizzo e i riferimenti al diritto austriaco (§ 5 ECG, GISA, GewO,
// § 6 UStG, Bezirkshauptmannschaft Kitzbühel) non si traducono: sono nomi
// propri e citazioni di legge.
const BETREIBER = `Josef Gallab (ditta individuale)
Oberhofenweg 21b
6380 St. Johann in Tirol, Austria
E-mail: kontakt@wellbooked.at`;

const VORRANG = {
  heading: 'Versione vincolante',
  body: 'Questa è una traduzione di cortesia del testo originale in tedesco. In caso di discrepanze o di dubbi interpretativi prevale la versione tedesca. Puoi consultarla impostando la lingua dell’app su «Deutsch» nel tuo profilo.',
};

export default {
  imprint: {
    title: 'Note legali',
    updated: 'Aggiornato al: 17 settembre 2026',
    sections: [
      VORRANG,
      {
        heading: 'Informazioni ai sensi del § 5 ECG e del § 25 MedienG (Austria)',
        body: BETREIBER,
      },
      {
        heading: 'Oggetto dell’attività',
        body: 'Gestione della web app di fitness e alimentazione «FullRep» (fullrep.pages.dev).',
      },
      {
        heading: 'Informazioni sull’attività professionale',
        body: 'Attività libera: «Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik» (servizi di elaborazione automatica dei dati e tecnologia dell’informazione)\nNumero GISA: 39801937\nIscritto alla Camera di commercio del Tirolo (Wirtschaftskammer Tirol, sede distrettuale di Kitzbühel)\nAutorità di vigilanza: Bezirkshauptmannschaft Kitzbühel\nNormativa applicabile: Gewerbeordnung (GewO), consultabile su ris.bka.gv.at\nIVA: piccolo imprenditore ai sensi del § 6 Abs. 1 Z 27 UStG (senza partita IVA)',
      },
      {
        heading: 'Risoluzione delle controversie dei consumatori',
        body: 'Non siamo disposti né obbligati a partecipare a procedure di risoluzione delle controversie dinanzi a un organismo di conciliazione per i consumatori. La precedente piattaforma europea per la risoluzione online delle controversie è stata chiusa il 20 luglio 2025.',
      },
      {
        heading: 'Responsabilità per i contenuti',
        body: 'I contenuti di questa app sono stati redatti con la massima cura. Non si garantisce la loro correttezza, completezza o attualità. Tutti i contenuti su allenamento, alimentazione e conoscenze servono esclusivamente a fini informativi generali e non costituiscono una consulenza medica.',
      },
    ],
  },

  privacy: {
    title: 'Informativa sulla privacy',
    updated: 'Aggiornato al: 22 ottobre 2026',
    sections: [
      VORRANG,
      {
        heading: '1. Titolare del trattamento',
        body: `Il titolare del trattamento dei dati nell’app «FullRep» è:\n\n${BETREIBER}`,
      },
      {
        heading: '2. Quali dati trattiamo',
        body: 'Dati dell’account: indirizzo e-mail e password (cifrata) per la registrazione.\n\nDati del profilo: nome, età, sesso, altezza, peso, obiettivo di allenamento, livello di attività ed esperienza — indicati da te nell’onboarding.\n\nDati di utilizzo: i tuoi allenamenti (esercizi, serie, pesi), voci alimentari (alimenti, calorie, macro), assunzione di acqua, integratori, andamento del peso, schede di allenamento, amicizie e punti esperienza.\n\nDati sanitari (art. 9 GDPR): peso e misure corporee, dati su alimentazione e allenamento, dati del ciclo e diario dei sintomi (se attivi il monitoraggio del ciclo), passi e peso da Apple Health / Health Connect (se attivi il collegamento) e tutto ciò che scrivi al coach IA — ad esempio i valori degli esami del sangue. Trattiamo questi dati esclusivamente sulla base del tuo consenso esplicito, che dai in un passaggio apposito dell’onboarding (ne registriamo il momento nel tuo profilo) e che puoi revocare in qualsiasi momento con effetto per il futuro — nel profilo con «Revoca il consenso ai dati sanitari» oppure eliminando il tuo account. Il trattamento effettuato fino alla revoca resta lecito. Poiché FullRep non funziona in modo sensato senza questi dati, dopo una revoca potrai continuare a usare il tuo account solo dando di nuovo il consenso; in alternativa puoi farlo eliminare.\n\nApple Health / Health Connect (facoltativo): se attivi il collegamento nel profilo, FullRep legge il numero di passi e il peso da Apple Health (iOS) o da Google Health Connect (Android) per mostrarli nell’app e riportarli nel tuo andamento del peso. L’autorizzazione la concedi nella finestra di dialogo del sistema e puoi revocarla lì in qualsiasi momento; puoi inoltre disattivare il collegamento nel profilo. Separatamente puoi attivare nel profilo «Salva gli allenamenti in Salute»: FullRep salva allora ogni allenamento concluso come sessione (tipo, inizio, fine) in Apple Health o Health Connect — senza serie, pesi, calorie né frequenza cardiaca. Ciò che si trova lì è gestito dal sistema; FullRep non lo elimina se disattivi di nuovo l’opzione. FullRep non usa mai questi dati per la pubblicità.\n\nFoto: le foto di esercizi e prodotti vengono salvate esclusivamente sul tuo dispositivo (IndexedDB) e non ci vengono trasmesse. Le foto dei pasti per l’analisi IA vengono trasmesse a Google (Gemini API) — vedi il punto 4.\n\nDati pubblicitari e di acquisto (solo nelle app per iOS e Android): per mostrare la pubblicità, Google AdMob tratta l’ID pubblicitario del tuo dispositivo, il tuo indirizzo IP e dati tecnici del dispositivo. Per l’abbonamento Premium trasmettiamo a RevenueCat un identificativo utente interno all’app e la ricevuta d’acquisto dello store. La web app non mostra pubblicità.\n\nSegnalazioni di errore: se l’app si blocca, inviamo a Sentry un messaggio di errore tecnico con la versione dell’app e il tipo di dispositivo — senza nome, e-mail né contenuti (se la raccolta degli errori è attiva nella rispettiva build).',
      },
      {
        heading: '3. Finalità e basi giuridiche',
        body: 'Fornitura delle funzioni dell’app: art. 6, par. 1, lett. b) GDPR (esecuzione del contratto).\n\nDati sanitari: esclusivamente il tuo consenso esplicito, art. 9, par. 2, lett. a) GDPR.\n\nPubblicità nelle app: mostriamo pubblicità personalizzata solo con il tuo consenso (art. 6, par. 1, lett. a) GDPR), che chiediamo prima del primo annuncio tramite la finestra di consenso di Google — su iOS anche tramite la finestra di Apple sulla trasparenza del tracciamento delle app. Se rifiuti, vedrai solo pubblicità non personalizzata; la base giuridica è il nostro legittimo interesse a finanziare la versione gratuita (art. 6, par. 1, lett. f) GDPR). Puoi modificare la tua scelta in qualsiasi momento nel profilo, alla voce «Modifica il consenso pubblicitario». Con un abbonamento Premium la pubblicità scompare del tutto. I tuoi dati sanitari e di utilizzo non vengono mai usati per la pubblicità né condivisi con partner pubblicitari.\n\nSegnalazioni di errore e sicurezza: legittimo interesse a un’app stabile e sicura (art. 6, par. 1, lett. f) GDPR).\n\nEtà minima: un account può essere creato solo a partire dai 16 anni; l’onboarding verifica la data di nascita. Il motivo è che in alcuni Stati dell’UE, ad esempio in Germania, il consenso al trattamento dei dati sanitari e alla pubblicità personalizzata può essere dato validamente solo dai 16 anni (art. 8 GDPR).\n\nLa web app non mostra pubblicità e non utilizza cookie pubblicitari. Per misurare il pubblico della versione web usiamo Cloudflare Web Analytics (vedi il punto 4).',
      },
      // TODO(Josef): Gemini-API auf den bezahlten Tarif mit Auftragsverarbeitungs-
      // vertrag (DPA) umstellen — im kostenlosen Tarif darf Google Eingaben zur
      // Produktverbesserung nutzen; für Coach-Nachrichten (auch Blutwerte) nicht
      // tragbar. Erst danach darf hier ein unbedingter Satz zu Art. 28 stehen.
      {
        heading: '4. Destinatari e responsabili del trattamento',
        body: 'Supabase, Inc. (USA; database e sistema di accesso): conserva i tuoi dati dell’account, del profilo e di utilizzo.\n\nCloudflare, Inc. (USA; hosting): distribuisce l’app e le nostre funzioni server; ne derivano log del server tecnicamente necessari (ad es. indirizzo IP). Nella versione web, Cloudflare Web Analytics conta inoltre le visite alle pagine (pagina visitata, ora, pagina di provenienza, Paese, tipo di dispositivo, browser, tempo di caricamento) — senza cookie, senza salvare nulla sul tuo dispositivo e senza memorizzare l’indirizzo IP. La base giuridica è il nostro legittimo interesse a una misurazione del pubblico rispettosa della privacy (art. 6, par. 1, lett. f) GDPR). Nelle app non avviene alcun conteggio delle visite.\n\nGoogle LLC / Google Ireland Ltd.: (1) Gemini API — solo se usi l’analisi delle foto dei pasti, la foto scattata viene trasmessa a Google per la valutazione; solo se usi il coach IA, i tuoi messaggi, compresa la cronologia della conversazione in corso, vengono trattati da Google (Gemini API) per generare la risposta. Google tratta questi input secondo le proprie condizioni per la Gemini API. Non inviamo né nome, né indirizzo e-mail, né ID dell’account; non salviamo foto né messaggi sui nostri server. (2) AdMob — pubblicità nelle app per iOS e Android (vedi i punti 2 e 3).\n\nAnthropic, PBC (USA; coach IA): le risposte del coach IA possono essere generate, invece che da Gemini, anche da modelli di Anthropic (Claude). In tal caso Anthropic tratta i tuoi messaggi, compresa la cronologia della conversazione in corso — anche qui senza nome, e-mail né ID dell’account.\n\nRevenueCat, Inc. (USA; abbonamento Premium): riceve un identificativo utente interno all’app e la conferma d’acquisto dello store per gestire il tuo abbonamento e ripristinarlo su un nuovo dispositivo. Il pagamento vero e proprio lo gestiscono Apple o Google; noi non vediamo dati di pagamento.\n\nFunctional Software, Inc. (Sentry, USA; segnalazioni di errore): riceve messaggi di errore tecnici senza riferimento personale, se la raccolta degli errori è attiva.\n\nOpen Food Facts (database di alimenti): durante la ricerca di alimenti e la scansione dei codici a barre, il termine di ricerca o il codice a barre (nessun dato personale) viene trasmesso a Open Food Facts.\n\nNella misura in cui i fornitori offrono accordi sul trattamento dei dati ai sensi dell’art. 28 GDPR, questi si applicano al nostro utilizzo dei loro servizi. Per i trasferimenti verso gli USA ci basiamo sulle clausole contrattuali tipo dell’UE o sull’EU-US Data Privacy Framework, se il fornitore vi è certificato.',
      },
      {
        heading: '5. Archiviazione locale sul tuo dispositivo',
        body: 'L’app salva inoltre i tuoi dati localmente sul tuo dispositivo (localStorage/IndexedDB), così sono disponibili offline e senza attese. In modalità ospite tutti i dati restano esclusivamente sul tuo dispositivo e non ci vengono trasmessi. Nell’app per Android il backup automatico tramite Google (Android Backup) è disattivato; i dati locali dell’app non finiscono quindi nel tuo backup di Google Drive.',
      },
      {
        heading: '6. Durata della conservazione',
        body: 'Conserviamo i tuoi dati finché esiste il tuo account. Se elimini il tuo account, tutti i tuoi dati vengono cancellati immediatamente dal nostro database. Per proteggerci dalla perdita di dati creiamo ogni giorno una copia di backup del database, che viene cancellata automaticamente dopo 14 giorni — fino ad allora un account eliminato può essere ancora contenuto in un backup; queste copie servono esclusivamente al ripristino dopo un guasto.\n\nLa cronologia delle tue conversazioni con il coach IA si trova solo sul tuo dispositivo (gli ultimi 60 messaggi); sui nostri server contiamo soltanto quante domande hai fatto al giorno.',
      },
      {
        heading: '7. Eliminare account e dati',
        body: 'Puoi eliminare il tuo account con tutti i dati in qualsiasi momento direttamente nell’app: Profilo → Elimina account. Inoltre puoi chiedere la cancellazione senza formalità via e-mail all’indirizzo indicato sopra.',
      },
      {
        heading: '8. I tuoi diritti',
        body: 'Hai diritto di accesso, rettifica, cancellazione, limitazione del trattamento, portabilità dei dati e opposizione, nonché il diritto di revocare in qualsiasi momento un consenso dato — il consenso ai dati sanitari nel profilo con «Revoca il consenso ai dati sanitari», il consenso pubblicitario con «Modifica il consenso pubblicitario». Puoi inoltre presentare reclamo all’autorità austriaca per la protezione dei dati (dsb.gv.at).',
      },
    ],
  },

  terms: {
    title: 'Condizioni d’uso',
    updated: 'Aggiornato al: 4 ottobre 2026',
    sections: [
      VORRANG,
      {
        heading: '1. Ambito di applicazione',
        body: `Le presenti condizioni d’uso si applicano all’utilizzo dell’app «FullRep» per iOS e Android e della sua versione web (fullrep.pages.dev), gestite da:\n\n${BETREIBER}`,
      },
      {
        heading: '2. Descrizione del servizio',
        body: 'FullRep è un’app per registrare allenamento e alimentazione, con contenuti informativi complementari. Le funzioni di base sono gratuite; la versione gratuita delle app per iOS e Android è finanziata dalla pubblicità. Le funzioni aggiuntive — attualmente soprattutto il coach IA — e l’uso senza pubblicità sono disponibili con FullRep Premium (punto 3). Non sussiste alcun diritto a una disponibilità permanente; le funzioni possono cambiare o essere sospese. Durante un periodo di abbonamento già pagato non limiteremo in modo sostanziale le funzioni Premium senza un motivo oggettivo.',
      },
      {
        heading: '3. FullRep Premium (abbonamento)',
        body: 'FullRep Premium è offerto come abbonamento a rinnovo automatico, mensile o annuale. L’acquisto avviene esclusivamente tramite l’App Store di Apple o Google Play; pagamento e fatturazione sono gestiti dal rispettivo store, le cui condizioni si applicano in aggiunta.\n\nIl prezzo attuale ti viene mostrato nella finestra dello store prima dell’acquisto. Il pagamento viene addebitato sul tuo account Apple o Google alla conferma dell’acquisto. L’abbonamento si rinnova automaticamente per il periodo scelto, a meno che tu non lo disdica almeno 24 ore prima della fine del periodo in corso.\n\nPuoi gestire e disdire l’abbonamento in qualsiasi momento nelle impostazioni degli abbonamenti del tuo account Apple o Google. Eliminare l’app o il tuo account FullRep non pone fine all’abbonamento. Dopo la disdetta, Premium resta attivo fino alla fine del periodo già pagato.\n\nCon Premium la pubblicità nell’app scompare e vengono sbloccate funzioni Premium come il coach IA (entro un limite giornaliero).',
      },
      {
        heading: '4. Periodo di prova gratuito',
        body: 'I nuovi utenti possono provare Premium gratis una sola volta per 7 giorni. La prova si avvia nell’app ed è legata al tuo account FullRep. Termina automaticamente e non si trasforma in un abbonamento a pagamento — non serve disdire nulla. Un abbonamento nasce solo se lo sottoscrivi espressamente nello store.',
      },
      {
        heading: '5. Recesso e rimborsi',
        body: 'Gli acquisti sono gestiti da Apple o Google; non riceviamo dati di pagamento e quindi non possiamo rimborsare direttamente gli acquisti. I rimborsi e l’esercizio di un diritto di recesso previsto dalla legge sono disciplinati dalle condizioni e dalle procedure del rispettivo store (Apple: reportaproblem.apple.com; Google Play: cronologia degli ordini nel tuo account Google). Restano salvi i diritti inderogabili dei consumatori previsti dalla legge.',
      },
      {
        heading: '6. Account e obblighi',
        body: 'Per conservare i tuoi dati in modo permanente è necessario un account. Ti impegni a mantenere segrete le tue credenziali di accesso e a non pubblicare contenuti che violino i diritti di terzi. I dati della community che fornisci (ad es. valori nutrizionali dei prodotti tramite codice a barre) li metti a disposizione di tutti gli utenti. Puoi creare un account a partire dai 16 anni.',
      },
      {
        heading: '7. Avvertenza sulla salute — nessun consiglio medico',
        body: 'Tutti i contenuti dell’app — in particolare le schede di allenamento, le informazioni su alimentazione e diete, i calcoli delle calorie e la biblioteca delle conoscenze (comprese le informazioni su integratori e peptidi) — servono esclusivamente a fini informativi generali e non costituiscono una consulenza medica, terapeutica o nutrizionale. In nessun caso sostituiscono la visita, la diagnosi o il trattamento da parte di un medico. Consulta un medico prima di iniziare un programma di allenamento o di alimentazione e prima di assumere integratori, in particolare in caso di patologie preesistenti, gravidanza o assunzione di farmaci. L’analisi dei pasti tramite foto supportata dall’IA fornisce valori stimati, la cui correttezza non è garantita. Per maggiori dettagli: avvertenza sulla salute nell’app (Profilo → Avvertenza sulla salute).',
      },
      {
        heading: '8. Responsabilità',
        body: 'Rispondiamo senza limiti per dolo e colpa grave, nonché per i danni derivanti da lesioni alla vita, all’integrità fisica o alla salute. Per il resto, la responsabilità per colpa lieve è esclusa. L’uso dei consigli su allenamento e alimentazione avviene sotto la tua responsabilità.',
      },
      {
        heading: '9. Modifiche',
        body: 'Possiamo modificare le presenti condizioni d’uso con effetto per il futuro. Ti informeremo nell’app delle modifiche sostanziali.',
      },
      {
        heading: '10. Legge applicabile',
        body: 'Si applica il diritto austriaco, con esclusione delle norme di rinvio. Restano salve le disposizioni inderogabili a tutela dei consumatori dello Stato in cui risiedi.',
      },
    ],
  },

  health: {
    title: 'Avvertenza sulla salute',
    updated: 'Aggiornato al: 17 settembre 2026',
    sections: [
      VORRANG,
      {
        heading: 'FullRep non sostituisce il parere medico',
        body: 'Per questioni di salute, per una diagnosi o un trattamento rivolgiti sempre a un medico. FullRep è un’app per registrare allenamento e alimentazione — non è un dispositivo medico e non sostituisce visita, diagnosi o terapia mediche.',
      },
      {
        heading: 'Quando dovresti chiedere un parere medico',
        body: 'Prima di iniziare un programma di allenamento o di alimentazione, prima di una dieta e prima di assumere integratori alimentari — in particolare in caso di patologie preesistenti, disturbi, gravidanza, allattamento o se assumi farmaci.\n\nInterrompi l’allenamento e chiedi un parere medico se compaiono disturbi — ad esempio dolore al petto, mancanza di respiro, vertigini o svenimento.',
      },
      {
        heading: 'Cosa sono i contenuti dell’app — e cosa no',
        body: 'Le schede di allenamento, le informazioni su alimentazione e diete, i calcoli di calorie e macro e la biblioteca delle conoscenze (compresi integratori, esami del sangue e peptidi) servono esclusivamente a fini informativi generali. Sono di carattere generale e non tengono conto della tua situazione personale.\n\nLe indicazioni sugli esami del sangue inquadrano i valori al massimo in modo approssimativo e non costituiscono una diagnosi. La valutazione dei tuoi valori può farla solo un medico.\n\nSui peptidi: in molti Paesi queste sostanze sono soggette a prescrizione medica o non sono autorizzate. I contenuti non riportano volutamente alcuna indicazione di dosaggio.',
      },
      {
        heading: 'Stime, non misurazioni',
        body: 'Il calcolatore del dispendio energetico (TDEE, Mifflin-St Jeor) e l’analisi dei pasti tramite foto supportata dall’IA forniscono stime. La loro correttezza non è garantita; non sostituiscono una misurazione né la consulenza di un professionista della nutrizione.',
      },
      {
        heading: 'Il coach IA non è un medico',
        body: 'Il coach IA risponde a domande generali su allenamento, alimentazione e integratori. Non formula diagnosi, non raccomanda terapie e non indica dosaggi. Le sue risposte possono contenere errori. Per un consiglio medico, una diagnosi o un trattamento rivolgiti a un medico.',
      },
      {
        heading: 'In caso di emergenza',
        body: 'In caso di emergenza medica chiama i soccorsi (112 in Italia e in tutta l’Unione europea). Non usare FullRep per cercare aiuto in una situazione di emergenza né per rimandare le cure mediche.',
      },
    ],
  },
};
