// Rechtstexte für FullRep (DE + EN).

export const OPERATOR = {
  name: 'Josef Gallab (Einzelunternehmen)',
  address: 'Oberhofenweg 21b',
  city: '6380 St. Johann in Tirol, Österreich',
  email: 'kontakt@wellbooked.at',
};

const operatorBlockDE = `${OPERATOR.name}\n${OPERATOR.address}\n${OPERATOR.city}\nE-Mail: ${OPERATOR.email}`;
const operatorBlockEN = `${OPERATOR.name}\n${OPERATOR.address}\n${OPERATOR.city}\nEmail: ${OPERATOR.email}`;

export const legalDocs = {
  imprint: {
    de: {
      title: 'Impressum',
      updated: 'Stand: 17. September 2026',
      sections: [
        {
          heading: 'Angaben gemäß § 5 ECG und § 25 MedienG',
          body: operatorBlockDE,
        },
        {
          heading: 'Unternehmensgegenstand',
          body: 'Betrieb der Fitness- und Ernährungs-Web-App „FullRep" (fullrep.pages.dev).',
        },
        {
          heading: 'Gewerbe- und berufsrechtliche Angaben',
          body: 'Freies Gewerbe: „Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik"\nGISA-Zahl: 39801937\nMitglied der Wirtschaftskammer Tirol (Bezirksstelle Kitzbühel)\nAufsichtsbehörde/Gewerbebehörde: Bezirkshauptmannschaft Kitzbühel\nAnwendbare Rechtsvorschrift: Gewerbeordnung (GewO), abrufbar unter ris.bka.gv.at\nUmsatzsteuer: Kleinunternehmer gemäß § 6 Abs. 1 Z 27 UStG (keine UID-Nummer)',
        },
        {
          heading: 'Verbraucherstreitbeilegung',
          body: 'Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Die frühere EU-Plattform zur Online-Streitbeilegung wurde am 20. Juli 2025 eingestellt.',
        },
        {
          heading: 'Haftung für Inhalte',
          body: 'Die Inhalte dieser App wurden mit größter Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität wird keine Gewähr übernommen. Alle Trainings-, Ernährungs- und Wissensinhalte dienen ausschließlich der allgemeinen Information und stellen keine medizinische Beratung dar.',
        },
      ],
    },
    en: {
      title: 'Legal Notice',
      updated: 'Last updated: 17 September 2026',
      sections: [
        {
          heading: 'Information pursuant to § 5 ECG and § 25 MedienG (Austria)',
          body: operatorBlockEN,
        },
        {
          heading: 'Business purpose',
          body: 'Operation of the fitness and nutrition web app "FullRep" (fullrep.pages.dev).',
        },
        {
          heading: 'Trade and professional information',
          body: 'Unregulated trade: "Services in automatic data processing and information technology"\nGISA number: 39801937\nMember of the Tyrol Economic Chamber (Kitzbühel district office)\nSupervisory/trade authority: District Authority Kitzbühel\nApplicable law: Austrian Trade Act (GewO), available at ris.bka.gv.at\nVAT: small business pursuant to § 6 (1) 27 UStG (no VAT ID)',
        },
        {
          heading: 'Consumer dispute resolution',
          body: 'We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board. The former EU online dispute resolution platform was discontinued on 20 July 2025.',
        },
        {
          heading: 'Liability for content',
          body: 'The contents of this app have been created with the greatest care. No guarantee is given for accuracy, completeness or timeliness. All training, nutrition and knowledge content is provided for general information only and does not constitute medical advice.',
        },
      ],
    },
  },

  privacy: {
    de: {
      title: 'Datenschutzerklärung',
      updated: 'Stand: 4. Oktober 2026',
      sections: [
        {
          heading: '1. Verantwortlicher',
          body: `Verantwortlich für die Datenverarbeitung in der App „FullRep" ist:\n\n${operatorBlockDE}`,
        },
        {
          heading: '2. Welche Daten wir verarbeiten',
          body: 'Kontodaten: E-Mail-Adresse und Passwort (verschlüsselt) für die Registrierung.\n\nProfildaten: Name, Alter, Geschlecht, Größe, Gewicht, Trainingsziel, Aktivitätslevel und Erfahrung — von dir im Onboarding angegeben.\n\nNutzungsdaten: deine Trainings (Übungen, Sätze, Gewichte), Ernährungseinträge (Lebensmittel, Kalorien, Makros), Wassereinträge, Supplements, Gewichtsverlauf, Trainingspläne, Freundschaften und Erfahrungspunkte.\n\nGesundheitsdaten (Art. 9 DSGVO): Körpergewicht und Körpermaße, Ernährungs- und Trainingsdaten, Zyklusdaten und Symptomtagebuch (falls du das Zyklustracking aktivierst), Schritte und Gewicht aus Apple Health / Health Connect (falls du die Verbindung einschaltest) sowie alles, was du dem KI-Coach schreibst — etwa Blutwerte. Diese Daten verarbeiten wir ausschließlich auf Grundlage deiner ausdrücklichen Einwilligung, die du im Onboarding in einem eigenen Schritt erteilst (den Zeitpunkt halten wir in deinem Profil fest) und jederzeit durch Löschen deines Kontos widerrufen kannst.\n\nApple Health / Health Connect (optional): Wenn du die Verbindung im Profil einschaltest, liest FullRep Schrittzahl und Gewicht aus Apple Health (iOS) bzw. Google Health Connect (Android), um sie in der App anzuzeigen und in deinen Gewichtsverlauf zu übernehmen. Die Freigabe erteilst du im System-Dialog und kannst sie dort jederzeit entziehen; abschalten kannst du die Verbindung außerdem im Profil. FullRep schreibt keine Daten nach Apple Health oder Health Connect und verwendet diese Daten nie für Werbung.\n\nFotos: Übungs- und Produktfotos werden ausschließlich lokal auf deinem Gerät gespeichert (IndexedDB) und nicht an uns übertragen. Mahlzeitenfotos für die KI-Analyse werden an Google (Gemini API) übermittelt — siehe Punkt 4.\n\nWerbe- und Kaufdaten (nur in den Apps für iOS und Android): Für die Anzeige von Werbung verarbeitet Google AdMob die Werbe-ID deines Geräts, deine IP-Adresse und technische Geräteangaben. Für das Premium-Abo übermitteln wir eine App-interne Nutzerkennung und den Kaufbeleg des Stores an RevenueCat. Die Web-App zeigt keine Werbung.\n\nFehlerberichte: Stürzt die App ab, senden wir eine technische Fehlermeldung mit App-Version und Gerätetyp an Sentry — ohne Name, E-Mail oder Inhalte (sofern die Fehlererfassung im jeweiligen Build eingeschaltet ist).',
        },
        {
          heading: '3. Zwecke und Rechtsgrundlagen',
          body: 'Bereitstellung der App-Funktionen: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).\n\nGesundheitsdaten: ausschließlich deine ausdrückliche Einwilligung, Art. 9 Abs. 2 lit. a DSGVO.\n\nWerbung in den Apps: Personalisierte Werbung zeigen wir nur mit deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die wir vor der ersten Anzeige über Googles Einwilligungsdialog einholen — auf iOS zusätzlich über Apples Dialog zur App-Tracking-Transparenz. Lehnst du ab, siehst du nur nicht personalisierte Werbung; Rechtsgrundlage dafür ist unser berechtigtes Interesse an der Finanzierung der kostenlosen Version (Art. 6 Abs. 1 lit. f DSGVO). Deine Entscheidung kannst du jederzeit im Profil unter „Werbe-Einwilligung ändern“ anpassen. Mit einem Premium-Abo entfällt die Werbung vollständig. Deine Gesundheits- und Nutzungsdaten werden nie für Werbung verwendet oder an Werbepartner weitergegeben.\n\nFehlerberichte und Sicherheit: berechtigtes Interesse an einer stabilen und sicheren App (Art. 6 Abs. 1 lit. f DSGVO).\n\nDie Web-App zeigt keine Werbung und verwendet weder Werbe-Cookies noch Analyse-Tools.',
        },
        {
          heading: '4. Empfänger und Auftragsverarbeiter',
          body: 'Supabase, Inc. (USA; Datenbank und Login-System): speichert deine Konto-, Profil- und Nutzungsdaten.\n\nCloudflare, Inc. (USA; Hosting): liefert die App und unsere Serverfunktionen aus; dabei fallen technisch notwendige Server-Logs (z. B. IP-Adresse) an. Eine Besucherzählung oder Analyse findet weder auf der Web-Fassung noch in den Apps statt.\n\nGoogle LLC / Google Ireland Ltd.: (1) Gemini API — nur wenn du die Mahlzeiten-Fotoanalyse nutzt, wird das aufgenommene Foto zur Auswertung an Google übermittelt; nur wenn du den KI-Coach nutzt, gehen deine Nachrichten an ihn samt dem Verlauf der aktuellen Unterhaltung an Google. Wir senden dabei weder Name, E-Mail-Adresse noch Konto-ID mit; Fotos und Nachrichten speichern wir nicht auf unseren Servern. (2) AdMob — Werbung in den Apps für iOS und Android (siehe Punkt 2 und 3).\n\nAnthropic, PBC (USA; KI-Coach): Für Antworten des KI-Coachs setzen wir alternativ zu Gemini Modelle von Anthropic ein — mit denselben Daten wie oben, ebenfalls ohne Name, E-Mail oder Konto-ID.\n\nRevenueCat, Inc. (USA; Premium-Abo): erhält eine App-interne Nutzerkennung und die Kaufbestätigung des Stores, um dein Abo zu verwalten und auf einem neuen Gerät wiederherzustellen. Die Zahlung selbst wickeln Apple bzw. Google ab; wir sehen keine Zahlungsdaten.\n\nFunctional Software, Inc. (Sentry, USA; Fehlerberichte): erhält technische Fehlermeldungen ohne Personenbezug, sofern die Fehlererfassung eingeschaltet ist.\n\nOpen Food Facts (Lebensmitteldatenbank): Bei der Lebensmittelsuche und beim Barcode-Scan werden Suchbegriff bzw. Barcode (keine persönlichen Daten) an Open Food Facts übermittelt.\n\nMit allen Auftragsverarbeitern bestehen Verträge nach Art. 28 DSGVO. Bei Übermittlungen in die USA stützen wir uns auf die EU-Standardvertragsklauseln bzw. das EU-US Data Privacy Framework, soweit der Anbieter dort zertifiziert ist.',
        },
        {
          heading: '5. Lokale Speicherung auf deinem Gerät',
          body: 'Die App speichert deine Daten zusätzlich lokal auf deinem Gerät (localStorage/IndexedDB), damit sie offline und ohne Wartezeit verfügbar sind. Im Gastmodus bleiben alle Daten ausschließlich auf deinem Gerät und werden nicht an uns übertragen.',
        },
        {
          heading: '6. Speicherdauer',
          body: 'Wir speichern deine Daten, solange dein Konto besteht. Löschst du dein Konto, werden alle deine Daten sofort aus unserer Datenbank gelöscht. Zur Absicherung gegen Datenverlust legen wir täglich eine Sicherungskopie der Datenbank an, die nach 14 Tagen automatisch gelöscht wird — bis dahin kann ein gelöschtes Konto noch in einer Sicherung enthalten sein; diese Kopien dienen ausschließlich der Wiederherstellung nach einem Ausfall.\n\nDer Verlauf deiner Unterhaltungen mit dem KI-Coach liegt nur auf deinem Gerät (die letzten 60 Nachrichten); auf unseren Servern zählen wir lediglich, wie viele Fragen du pro Tag gestellt hast.',
        },
        {
          heading: '7. Konto und Daten löschen',
          body: 'Du kannst dein Konto samt aller Daten jederzeit selbst in der App löschen: Profil → Konto löschen. Zusätzlich kannst du die Löschung formlos per E-Mail an die oben genannte Adresse verlangen.',
        },
        {
          heading: '8. Deine Rechte',
          body: 'Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie das Recht, eine erteilte Einwilligung jederzeit zu widerrufen. Du kannst dich außerdem bei der österreichischen Datenschutzbehörde (dsb.gv.at) beschweren.',
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      updated: 'Last updated: 4 October 2026',
      sections: [
        {
          heading: '1. Controller',
          body: `The controller responsible for data processing in the "FullRep" app is:\n\n${operatorBlockEN}`,
        },
        {
          heading: '2. What data we process',
          body: 'Account data: email address and password (encrypted) for registration.\n\nProfile data: name, age, gender, height, weight, training goal, activity level and experience — provided by you during onboarding.\n\nUsage data: your workouts (exercises, sets, weights), nutrition entries (foods, calories, macros), water intake, supplements, weight history, training plans, friendships and experience points.\n\nHealth data (Art. 9 GDPR): body weight and body measurements, nutrition and training data, cycle data and symptom diary (if you enable cycle tracking), steps and weight from Apple Health / Health Connect (if you enable the connection), and everything you write to the AI coach — for example blood values. We process this data exclusively on the basis of your explicit consent, which you give in a separate step during onboarding (we record the time in your profile) and can withdraw at any time by deleting your account.\n\nApple Health / Health Connect (optional): If you enable the connection in your profile, FullRep reads step count and weight from Apple Health (iOS) or Google Health Connect (Android) to display them in the app and add them to your weight history. You grant access in the system dialog and can revoke it there at any time; you can also switch the connection off in your profile. FullRep does not write any data to Apple Health or Health Connect and never uses this data for advertising.\n\nPhotos: exercise and product photos are stored exclusively on your device (IndexedDB) and are not transmitted to us. Meal photos for AI analysis are transmitted to Google (Gemini API) — see section 4.\n\nAdvertising and purchase data (iOS and Android apps only): To display ads, Google AdMob processes your device\'s advertising ID, your IP address and technical device information. For the Premium subscription we transmit an app-internal user identifier and the store\'s purchase receipt to RevenueCat. The web app shows no ads.\n\nCrash reports: If the app crashes, we send a technical error message with app version and device type to Sentry — without name, email or content (if error reporting is enabled in the respective build).',
        },
        {
          heading: '3. Purposes and legal bases',
          body: 'Providing the app features: Art. 6(1)(b) GDPR (performance of contract).\n\nHealth data: exclusively your explicit consent, Art. 9(2)(a) GDPR.\n\nAdvertising in the apps: We show personalised ads only with your consent (Art. 6(1)(a) GDPR), which we obtain before the first ad via Google\'s consent dialog — on iOS additionally via Apple\'s App Tracking Transparency prompt. If you decline, you only see non-personalised ads; the legal basis for those is our legitimate interest in financing the free version (Art. 6(1)(f) GDPR). You can change your decision at any time in your profile under "Change ad consent". With a Premium subscription, ads are removed entirely. Your health and usage data is never used for advertising or shared with advertising partners.\n\nCrash reports and security: legitimate interest in a stable and secure app (Art. 6(1)(f) GDPR).\n\nThe web app shows no ads and uses neither advertising cookies nor analytics tools.',
        },
        {
          heading: '4. Recipients and processors',
          body: 'Supabase, Inc. (USA; database and login system): stores your account, profile and usage data.\n\nCloudflare, Inc. (USA; hosting): delivers the app and our server functions; technically necessary server logs (e.g. IP address) are generated. No visitor counting or analytics takes place, neither on the web version nor in the apps.\n\nGoogle LLC / Google Ireland Ltd.: (1) Gemini API — only if you use the meal photo analysis, the captured photo is transmitted to Google for evaluation; only if you use the AI coach, your messages to it, including the history of the current conversation, go to Google. We do not send your name, email address or account ID; photos and messages are not stored on our servers. (2) AdMob — advertising in the iOS and Android apps (see sections 2 and 3).\n\nAnthropic, PBC (USA; AI coach): For AI coach answers we use Anthropic models as an alternative to Gemini — with the same data as above, likewise without name, email or account ID.\n\nRevenueCat, Inc. (USA; Premium subscription): receives an app-internal user identifier and the store\'s purchase confirmation to manage your subscription and restore it on a new device. Payment itself is handled by Apple or Google; we never see payment details.\n\nFunctional Software, Inc. (Sentry, USA; crash reports): receives technical error messages without personal reference, if error reporting is enabled.\n\nOpen Food Facts (food database): when searching for foods or scanning barcodes, the search term or barcode (no personal data) is transmitted to Open Food Facts.\n\nData processing agreements under Art. 28 GDPR are in place with all processors. For transfers to the USA we rely on the EU standard contractual clauses or the EU-US Data Privacy Framework where the provider is certified.',
        },
        {
          heading: '5. Local storage on your device',
          body: 'The app additionally stores your data locally on your device (localStorage/IndexedDB) so it is available offline and without delay. In guest mode, all data remains exclusively on your device and is not transmitted to us.',
        },
        {
          heading: '6. Storage period',
          body: 'We store your data for as long as your account exists. If you delete your account, all your data is immediately deleted from our database. To protect against data loss we create a daily backup of the database, which is automatically deleted after 14 days — until then a deleted account may still be contained in a backup; these copies are used solely for recovery after an outage.\n\nThe history of your conversations with the AI coach is stored only on your device (the last 60 messages); on our servers we only count how many questions you asked per day.',
        },
        {
          heading: '7. Deleting your account and data',
          body: 'You can delete your account and all data yourself at any time in the app: Profile → Delete account. You can also request deletion informally by email to the address above.',
        },
        {
          heading: '8. Your rights',
          body: 'You have the right to access, rectification, erasure, restriction of processing, data portability and objection, as well as the right to withdraw consent at any time. You can also lodge a complaint with the Austrian Data Protection Authority (dsb.gv.at).',
        },
      ],
    },
  },

  terms: {
    de: {
      title: 'Nutzungsbedingungen (AGB)',
      updated: 'Stand: 17. September 2026',
      sections: [
        {
          heading: '1. Geltungsbereich',
          body: `Diese Nutzungsbedingungen gelten für die Nutzung der Web-App „FullRep" (fullrep.pages.dev), betrieben von:\n\n${operatorBlockDE}`,
        },
        {
          heading: '2. Leistungsbeschreibung',
          body: 'FullRep ist eine App zum Protokollieren von Training und Ernährung mit ergänzenden Wissensinhalten. Die Nutzung ist derzeit kostenlos. Es besteht kein Anspruch auf ständige Verfügbarkeit; Funktionen können sich ändern oder eingestellt werden.',
        },
        {
          heading: '3. Konto und Pflichten',
          body: 'Für die dauerhafte Speicherung deiner Daten ist ein Konto erforderlich. Du bist verpflichtet, deine Zugangsdaten geheim zu halten und keine Inhalte einzustellen, die Rechte Dritter verletzen. Von dir beigesteuerte Community-Daten (z. B. Produkt-Nährwerte per Barcode) stellst du der Allgemeinheit der Nutzer zur Verfügung.',
        },
        {
          heading: '4. Gesundheitshinweis — kein medizinischer Rat',
          body: 'Alle Inhalte der App — insbesondere Trainingspläne, Ernährungs- und Diät-Informationen, Kalorienberechnungen sowie die Wissensbibliothek (einschließlich der Informationen zu Supplements und Peptiden) — dienen ausschließlich der allgemeinen Information und stellen keine medizinische, therapeutische oder ernährungswissenschaftliche Beratung dar. Sie ersetzen keinesfalls die Untersuchung, Diagnose oder Behandlung durch Ärztinnen und Ärzte. Konsultiere vor Beginn eines Trainings- oder Ernährungsprogramms sowie vor der Einnahme von Supplements einen Arzt, insbesondere bei Vorerkrankungen, Schwangerschaft oder Medikamenteneinnahme. Die KI-gestützte Foto-Analyse von Mahlzeiten liefert Schätzwerte, deren Richtigkeit nicht garantiert wird.',
        },
        {
          heading: '5. Haftung',
          body: 'Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung von Leben, Körper oder Gesundheit. Im Übrigen ist die Haftung für leichte Fahrlässigkeit ausgeschlossen. Die Nutzung der Trainings- und Ernährungsempfehlungen erfolgt auf eigene Verantwortung.',
        },
        {
          heading: '6. Änderungen',
          body: 'Wir können diese Nutzungsbedingungen mit Wirkung für die Zukunft ändern. Über wesentliche Änderungen informieren wir dich in der App.',
        },
        {
          heading: '7. Anwendbares Recht',
          body: 'Es gilt österreichisches Recht unter Ausschluss der Verweisungsnormen. Zwingende Verbraucherschutzbestimmungen deines Aufenthaltsstaates bleiben unberührt.',
        },
      ],
    },
    en: {
      title: 'Terms of Use',
      updated: 'Last updated: 17 September 2026',
      sections: [
        {
          heading: '1. Scope',
          body: `These terms of use apply to the use of the web app "FullRep" (fullrep.pages.dev), operated by:\n\n${operatorBlockEN}`,
        },
        {
          heading: '2. Service description',
          body: 'FullRep is an app for logging training and nutrition with supplementary knowledge content. Use is currently free of charge. There is no entitlement to permanent availability; features may change or be discontinued.',
        },
        {
          heading: '3. Account and obligations',
          body: 'An account is required for permanent storage of your data. You are obliged to keep your credentials secret and not to post content that violates the rights of third parties. Community data you contribute (e.g. product nutrition values via barcode) is made available to all users.',
        },
        {
          heading: '4. Health notice — no medical advice',
          body: 'All content in the app — in particular training plans, nutrition and diet information, calorie calculations and the knowledge library (including information on supplements and peptides) — is provided for general information only and does not constitute medical, therapeutic or nutritional advice. It in no way replaces examination, diagnosis or treatment by physicians. Consult a doctor before starting any training or nutrition program and before taking supplements, especially if you have pre-existing conditions, are pregnant or take medication. The AI-powered meal photo analysis provides estimates whose accuracy is not guaranteed.',
        },
        {
          heading: '5. Liability',
          body: 'We are liable without limitation for intent and gross negligence as well as for damages resulting from injury to life, body or health. Otherwise, liability for slight negligence is excluded. Use of the training and nutrition recommendations is at your own risk.',
        },
        {
          heading: '6. Changes',
          body: 'We may change these terms of use with effect for the future. We will inform you of significant changes in the app.',
        },
        {
          heading: '7. Applicable law',
          body: 'Austrian law applies, excluding its conflict-of-law rules. Mandatory consumer protection provisions of your country of residence remain unaffected.',
        },
      ],
    },
  },

  // Eigene Seite statt nur Punkt 4 der AGB: Google Play verlangt, dass der
  // Arzt-Hinweis fuer Nutzer leicht auffindbar ist (Richtlinie zu gesundheits-
  // bezogenen Inhalten, durchgesetzt am 30.07.2026). In den Nutzungsbedingungen
  // vergraben zaehlt das nicht — deshalb direkt im Profil verlinkt.
  health: {
    de: {
      title: 'Gesundheitshinweis',
      updated: 'Stand: 17. September 2026',
      sections: [
        {
          heading: 'FullRep ersetzt keine ärztliche Beratung',
          body: 'Wende dich bei gesundheitlichen Fragen, für eine Diagnose oder eine Behandlung immer an eine Ärztin oder einen Arzt. FullRep ist eine App zum Protokollieren von Training und Ernährung — kein Medizinprodukt und kein Ersatz für ärztliche Untersuchung, Diagnose oder Therapie.',
        },
        {
          heading: 'Wann du ärztlichen Rat einholen solltest',
          body: 'Vor Beginn eines Trainings- oder Ernährungsprogramms, vor einer Diät und vor der Einnahme von Nahrungsergänzungsmitteln — insbesondere bei Vorerkrankungen, Beschwerden, Schwangerschaft, Stillzeit oder wenn du Medikamente einnimmst.\n\nBrich das Training ab und hole ärztlichen Rat ein, wenn Beschwerden auftreten — etwa Schmerzen in der Brust, Atemnot, Schwindel oder Ohnmacht.',
        },
        {
          heading: 'Was die Inhalte der App sind — und was nicht',
          body: 'Trainingspläne, Ernährungs- und Diätinformationen, Kalorien- und Makroberechnungen sowie die Wissensbibliothek (einschließlich Supplemente, Blutwerte und Peptide) dienen ausschließlich der allgemeinen Information. Sie sind allgemein gehalten und berücksichtigen deine persönliche Situation nicht.\n\nDie Angaben zu Blutwerten ordnen Werte allenfalls grob ein und stellen keine Diagnose dar. Eine Beurteilung deiner Werte kann nur ärztlich erfolgen.\n\nZu Peptiden: Diese Substanzen sind in vielen Ländern verschreibungspflichtig oder nicht zugelassen. Die Inhalte enthalten bewusst keine Dosierungsangaben.',
        },
        {
          heading: 'Schätzwerte, keine Messungen',
          body: 'Der TDEE-Rechner (Mifflin-St Jeor) und die KI-gestützte Foto-Analyse von Mahlzeiten liefern Schätzungen. Ihre Richtigkeit wird nicht garantiert; sie ersetzen keine Messung und keine ernährungsmedizinische Beratung.',
        },
        {
          heading: 'Der KI-Coach ist kein Arzt',
          body: 'Der KI-Coach beantwortet allgemeine Fragen zu Training, Ernährung und Supplementen. Er stellt keine Diagnosen, empfiehlt keine Therapien und nennt keine Dosierungen. Seine Antworten können Fehler enthalten. Für medizinischen Rat, eine Diagnose oder eine Behandlung wende dich an eine Ärztin oder einen Arzt.',
        },
        {
          heading: 'Im Notfall',
          body: 'Bei einem medizinischen Notfall rufe den Rettungsdienst (in Österreich und Deutschland 112). Nutze FullRep nicht, um in einer Notlage Hilfe zu suchen oder ärztliche Versorgung hinauszuzögern.',
        },
      ],
    },
    en: {
      title: 'Health Notice',
      updated: 'Last updated: 17 September 2026',
      sections: [
        {
          heading: 'FullRep does not replace medical advice',
          body: 'For any health concern, diagnosis or treatment, always consult a doctor. FullRep is an app for logging training and nutrition — not a medical device and no substitute for medical examination, diagnosis or therapy.',
        },
        {
          heading: 'When to seek medical advice',
          body: 'Before starting a training or nutrition programme, before a diet and before taking any supplement — especially if you have a pre-existing condition or symptoms, are pregnant or breastfeeding, or take medication.\n\nStop exercising and seek medical advice if symptoms occur — such as chest pain, shortness of breath, dizziness or fainting.',
        },
        {
          heading: 'What the content is — and what it is not',
          body: 'Training plans, nutrition and diet information, calorie and macro calculations and the knowledge library (including supplements, blood values and peptides) are for general information only. They are generic and do not take your personal situation into account.\n\nInformation on blood values offers only a rough orientation and is not a diagnosis. Only a doctor can assess your results.\n\nOn peptides: these substances are prescription-only or unapproved in many countries. The content deliberately contains no dosage information.',
        },
        {
          heading: 'Estimates, not measurements',
          body: 'The TDEE calculator (Mifflin-St Jeor) and the AI photo analysis of meals produce estimates. Their accuracy is not guaranteed; they replace neither a measurement nor nutritional counselling.',
        },
        {
          heading: 'The AI coach is not a doctor',
          body: 'The AI coach answers general questions about training, nutrition and supplements. It does not diagnose, recommend therapies or state dosages. Its answers may contain errors. For medical advice, a diagnosis or treatment, consult a doctor.',
        },
        {
          heading: 'In an emergency',
          body: 'In a medical emergency call the emergency services (112 in Austria and Germany). Do not use FullRep to seek help in an emergency or to delay medical care.',
        },
      ],
    },
  },
};
