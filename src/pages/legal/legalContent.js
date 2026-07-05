// Rechtstexte für MyPeak (DE + EN).

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
      updated: 'Stand: Juli 2026',
      sections: [
        {
          heading: 'Angaben gemäß § 5 ECG und § 25 MedienG',
          body: operatorBlockDE,
        },
        {
          heading: 'Unternehmensgegenstand',
          body: 'Betrieb der Fitness- und Ernährungs-Web-App „MyPeak" (my-peak.vercel.app).',
        },
        {
          heading: 'Gewerbe- und berufsrechtliche Angaben',
          body: 'Freies Gewerbe: „Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik"\nGISA-Zahl: 39801937\nMitglied der Wirtschaftskammer Tirol (Bezirksstelle Kitzbühel)\nAufsichtsbehörde/Gewerbebehörde: Bezirkshauptmannschaft Kitzbühel\nAnwendbare Rechtsvorschrift: Gewerbeordnung (GewO), abrufbar unter ris.bka.gv.at\nUmsatzsteuer: Kleinunternehmer gemäß § 6 Abs. 1 Z 27 UStG (keine UID-Nummer)',
        },
        {
          heading: 'Verbraucherstreitbeilegung',
          body: 'Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Die EU-Plattform zur Online-Streitbeilegung ist unter https://ec.europa.eu/consumers/odr erreichbar.',
        },
        {
          heading: 'Haftung für Inhalte',
          body: 'Die Inhalte dieser App wurden mit größter Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität wird keine Gewähr übernommen. Alle Trainings-, Ernährungs- und Wissensinhalte dienen ausschließlich der allgemeinen Information und stellen keine medizinische Beratung dar.',
        },
      ],
    },
    en: {
      title: 'Legal Notice',
      updated: 'Last updated: July 2026',
      sections: [
        {
          heading: 'Information pursuant to § 5 ECG and § 25 MedienG (Austria)',
          body: operatorBlockEN,
        },
        {
          heading: 'Business purpose',
          body: 'Operation of the fitness and nutrition web app "MyPeak" (my-peak.vercel.app).',
        },
        {
          heading: 'Trade and professional information',
          body: 'Unregulated trade: "Services in automatic data processing and information technology"\nGISA number: 39801937\nMember of the Tyrol Economic Chamber (Kitzbühel district office)\nSupervisory/trade authority: District Authority Kitzbühel\nApplicable law: Austrian Trade Act (GewO), available at ris.bka.gv.at\nVAT: small business pursuant to § 6 (1) 27 UStG (no VAT ID)',
        },
        {
          heading: 'Consumer dispute resolution',
          body: 'We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board. The EU online dispute resolution platform is available at https://ec.europa.eu/consumers/odr.',
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
      updated: 'Stand: Juli 2026',
      sections: [
        {
          heading: '1. Verantwortlicher',
          body: `Verantwortlich für die Datenverarbeitung in der App „MyPeak" ist:\n\n${operatorBlockDE}`,
        },
        {
          heading: '2. Welche Daten wir verarbeiten',
          body: 'Kontodaten: E-Mail-Adresse und Passwort (verschlüsselt) für die Registrierung.\n\nProfildaten: Name, Alter, Geschlecht, Größe, Gewicht, Trainingsziel, Aktivitätslevel und Erfahrung — von dir im Onboarding angegeben.\n\nNutzungsdaten: deine Trainings (Übungen, Sätze, Gewichte), Ernährungseinträge (Lebensmittel, Kalorien, Makros), Wassereinträge, Supplements, Gewichtsverlauf, Trainingspläne, Freundschaften und Erfahrungspunkte.\n\nGesundheitsdaten (Art. 9 DSGVO): Körpergewicht, Zyklusdaten und Symptomtagebuch (falls du das Zyklustracking aktivierst). Diese Daten verarbeiten wir ausschließlich auf Grundlage deiner ausdrücklichen Einwilligung, die du im Onboarding erteilst und jederzeit durch Löschen deines Kontos widerrufen kannst.\n\nFotos: Übungs- und Produktfotos werden ausschließlich lokal auf deinem Gerät gespeichert (IndexedDB) und nicht an uns übertragen. Mahlzeitenfotos für die KI-Analyse werden an Google (Gemini API) übermittelt — siehe Punkt 4.',
        },
        {
          heading: '3. Zwecke und Rechtsgrundlagen',
          body: 'Wir verarbeiten deine Daten zur Bereitstellung der App-Funktionen (Art. 6 Abs. 1 lit. b DSGVO — Vertragserfüllung) sowie — bei Gesundheitsdaten — auf Grundlage deiner ausdrücklichen Einwilligung (Art. 9 Abs. 2 lit. a DSGVO). Es findet kein Tracking zu Werbezwecken statt; wir verwenden keine Werbe-Cookies und keine Analyse-Tools.',
        },
        {
          heading: '4. Empfänger und Auftragsverarbeiter',
          body: 'Supabase Inc. (Datenbank und Login-System): speichert deine Konto-, Profil- und Nutzungsdaten.\n\nVercel Inc. (Hosting): liefert die App aus; dabei fallen technisch notwendige Server-Logs (z. B. IP-Adresse) an.\n\nGoogle LLC (Gemini API): Nur wenn du die Mahlzeiten-Fotoanalyse nutzt, wird das aufgenommene Foto zur Auswertung an Google übermittelt. Das Foto wird nicht dauerhaft bei uns gespeichert.\n\nOpen Food Facts (Lebensmitteldatenbank): Bei der Lebensmittelsuche und beim Barcode-Scan werden Suchbegriff bzw. Barcode (keine persönlichen Daten) an Open Food Facts übermittelt.\n\nMit den Anbietern bestehen, soweit erforderlich, Auftragsverarbeitungsverträge; bei Übermittlungen in Drittländer (USA) stützen sich die Anbieter auf EU-Standardvertragsklauseln bzw. das EU-US Data Privacy Framework.',
        },
        {
          heading: '5. Lokale Speicherung auf deinem Gerät',
          body: 'Die App speichert deine Daten zusätzlich lokal auf deinem Gerät (localStorage/IndexedDB), damit sie offline und ohne Wartezeit verfügbar sind. Im Gastmodus bleiben alle Daten ausschließlich auf deinem Gerät und werden nicht an uns übertragen.',
        },
        {
          heading: '6. Speicherdauer',
          body: 'Wir speichern deine Daten, solange dein Konto besteht. Löschst du dein Konto, werden alle deine Daten unverzüglich und dauerhaft aus unserer Datenbank gelöscht.',
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
      updated: 'Last updated: July 2026',
      sections: [
        {
          heading: '1. Controller',
          body: `The controller responsible for data processing in the "MyPeak" app is:\n\n${operatorBlockEN}`,
        },
        {
          heading: '2. What data we process',
          body: 'Account data: email address and password (encrypted) for registration.\n\nProfile data: name, age, gender, height, weight, training goal, activity level and experience — provided by you during onboarding.\n\nUsage data: your workouts (exercises, sets, weights), nutrition entries (foods, calories, macros), water intake, supplements, weight history, training plans, friendships and experience points.\n\nHealth data (Art. 9 GDPR): body weight, cycle data and symptom diary (if you enable cycle tracking). We process this data exclusively based on your explicit consent, which you give during onboarding and can revoke at any time by deleting your account.\n\nPhotos: exercise and product photos are stored exclusively on your device (IndexedDB) and are not transmitted to us. Meal photos for AI analysis are transmitted to Google (Gemini API) — see section 4.',
        },
        {
          heading: '3. Purposes and legal bases',
          body: 'We process your data to provide the app features (Art. 6(1)(b) GDPR — performance of contract) and — for health data — based on your explicit consent (Art. 9(2)(a) GDPR). There is no advertising tracking; we use no advertising cookies and no analytics tools.',
        },
        {
          heading: '4. Recipients and processors',
          body: 'Supabase Inc. (database and login system): stores your account, profile and usage data.\n\nVercel Inc. (hosting): delivers the app; technically necessary server logs (e.g. IP address) are generated.\n\nGoogle LLC (Gemini API): only if you use the meal photo analysis, the captured photo is transmitted to Google for evaluation. The photo is not permanently stored by us.\n\nOpen Food Facts (food database): when searching for foods or scanning barcodes, the search term or barcode (no personal data) is transmitted to Open Food Facts.\n\nWhere required, data processing agreements are in place with these providers; for transfers to third countries (USA), the providers rely on EU standard contractual clauses or the EU-US Data Privacy Framework.',
        },
        {
          heading: '5. Local storage on your device',
          body: 'The app additionally stores your data locally on your device (localStorage/IndexedDB) so it is available offline and without delay. In guest mode, all data remains exclusively on your device and is not transmitted to us.',
        },
        {
          heading: '6. Storage period',
          body: 'We store your data for as long as your account exists. If you delete your account, all your data is immediately and permanently deleted from our database.',
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
      updated: 'Stand: Juli 2026',
      sections: [
        {
          heading: '1. Geltungsbereich',
          body: `Diese Nutzungsbedingungen gelten für die Nutzung der Web-App „MyPeak" (my-peak.vercel.app), betrieben von:\n\n${operatorBlockDE}`,
        },
        {
          heading: '2. Leistungsbeschreibung',
          body: 'MyPeak ist eine App zum Protokollieren von Training und Ernährung mit ergänzenden Wissensinhalten. Die Nutzung ist derzeit kostenlos. Es besteht kein Anspruch auf ständige Verfügbarkeit; Funktionen können sich ändern oder eingestellt werden.',
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
      updated: 'Last updated: July 2026',
      sections: [
        {
          heading: '1. Scope',
          body: `These terms of use apply to the use of the web app "MyPeak" (my-peak.vercel.app), operated by:\n\n${operatorBlockEN}`,
        },
        {
          heading: '2. Service description',
          body: 'MyPeak is an app for logging training and nutrition with supplementary knowledge content. Use is currently free of charge. There is no entitlement to permanent availability; features may change or be discontinued.',
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
};
