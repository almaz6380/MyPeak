// Traduction française des textes juridiques.
//
// L'original allemand dans `legalContent.js` reste le texte qui fait foi —
// d'où la section « Version faisant foi » en tête de chaque document. C'est
// l'usage pour les textes juridiques multilingues : on traduit pour être
// compris, pas pour créer une seconde version ayant sa propre valeur.
//
// Le nom, l'adresse et les références au droit autrichien (§ 5 ECG, GISA,
// GewO) ne sont pas traduits : ce sont des noms propres et des citations
// légales.
const BETREIBER = `Josef Gallab (entreprise individuelle)
Oberhofenweg 21b
6380 St. Johann in Tirol, Autriche
E-mail : kontakt@wellbooked.at`;

const VORRANG = {
  heading: 'Version faisant foi',
  body: 'Ceci est une traduction de courtoisie du texte original allemand. En cas de divergence ou de doute d’interprétation, la version allemande prévaut. Tu peux la consulter en réglant la langue de l’application sur « Deutsch » dans ton profil.',
};

export default {
  imprint: {
    title: 'Mentions légales',
    updated: 'Mise à jour : juillet 2026',
    sections: [
      VORRANG,
      {
        heading: 'Informations conformes au § 5 ECG et au § 25 MedienG (Autriche)',
        body: BETREIBER,
      },
      {
        heading: 'Objet de l’entreprise',
        body: 'Exploitation de l’application web de fitness et de nutrition « FullRep » (fullrep.vercel.app).',
      },
      {
        heading: 'Informations professionnelles',
        body: 'Activité libre : « Services de traitement automatique de données et de technologies de l’information »\nNuméro GISA : 39801937\nMembre de la Chambre de commerce du Tyrol (antenne de Kitzbühel)\nAutorité de surveillance : Bezirkshauptmannschaft Kitzbühel\nTexte applicable : Gewerbeordnung (GewO), consultable sur ris.bka.gv.at\nTVA : micro-entrepreneur au sens du § 6 al. 1 nº 27 UStG (pas de numéro de TVA)',
      },
      {
        heading: 'Règlement des litiges de consommation',
        body: 'Nous ne sommes ni disposés ni tenus de participer à une procédure de règlement des litiges devant un organisme de médiation de la consommation. La plateforme européenne de règlement en ligne des litiges est accessible à l’adresse https://ec.europa.eu/consumers/odr',
      },
      {
        heading: 'Responsabilité quant aux contenus',
        body: 'Les contenus de cette application ont été élaborés avec le plus grand soin. Aucune garantie n’est donnée quant à leur exactitude, leur exhaustivité ou leur actualité. L’ensemble des contenus d’entraînement, de nutrition et de connaissance sert uniquement à une information générale et ne constitue pas un avis médical.',
      },
    ],
  },

  privacy: {
    title: 'Politique de confidentialité',
    updated: 'Mise à jour : juillet 2026',
    sections: [
      VORRANG,
      {
        heading: '1. Responsable du traitement',
        body: `Le responsable du traitement des données dans l’application « FullRep » est :\n\n${BETREIBER}`,
      },
      {
        heading: '2. Quelles données nous traitons',
        body: 'Données de compte : adresse e-mail et mot de passe (chiffré) pour l’inscription.\n\nDonnées de profil : nom, âge, sexe, taille, poids, objectif d’entraînement, niveau d’activité et expérience — indiqués par toi lors de la configuration initiale.\n\nDonnées d’utilisation : tes séances (exercices, séries, charges), tes saisies nutritionnelles (aliments, calories, macros), tes saisies d’eau, tes compléments, ton évolution de poids, tes programmes d’entraînement, tes amitiés et tes points d’expérience.\n\nDonnées de santé (art. 9 RGPD) : poids corporel, données de cycle et journal des symptômes (si tu actives le suivi du cycle). Nous traitons ces données exclusivement sur la base de ton consentement explicite, donné lors de la configuration initiale et révocable à tout moment en supprimant ton compte.\n\nApple Health / Health Connect (facultatif) : si tu actives la connexion dans ton profil, FullRep lit le nombre de pas et le poids depuis Apple Health (iOS) ou Google Health Connect (Android) afin de les afficher dans l’application et de les reprendre dans ton évolution de poids. Tu accordes l’autorisation dans la boîte de dialogue du système et peux la retirer à tout moment ; tu peux en outre désactiver la connexion dans ton profil. FullRep n’écrit aucune donnée vers Apple Health ou Health Connect.\n\nPhotos : les photos d’exercices et de produits sont enregistrées exclusivement en local sur ton appareil (IndexedDB) et ne nous sont pas transmises. Les photos de repas destinées à l’analyse par IA sont transmises à Google (Gemini API) — voir le point 4.',
      },
      {
        heading: '3. Finalités et bases juridiques',
        body: 'Nous traitons tes données pour fournir les fonctions de l’application (art. 6 al. 1 point b RGPD — exécution du contrat) et, pour les données de santé, sur la base de ton consentement explicite (art. 9 al. 2 point a RGPD). Aucun suivi à des fins publicitaires n’a lieu ; nous n’utilisons ni cookies publicitaires ni outils d’analyse.',
      },
      {
        heading: '4. Destinataires et sous-traitants',
        body: 'Supabase Inc. (base de données et système de connexion) : stocke tes données de compte, de profil et d’utilisation.\n\nVercel Inc. (hébergement) : délivre l’application ; des journaux serveur techniquement nécessaires sont alors générés (p. ex. l’adresse IP).\n\nGoogle LLC (Gemini API) : uniquement si tu utilises l’analyse de repas par photo, l’image prise est transmise à Google pour évaluation. La photo n’est pas conservée durablement chez nous.\n\nOpen Food Facts (base de données alimentaire) : lors de la recherche d’aliments et du scan de code-barres, le terme recherché ou le code-barres (aucune donnée personnelle) est transmis à Open Food Facts.\n\nDes contrats de sous-traitance sont conclus avec les prestataires dans la mesure nécessaire ; pour les transferts vers des pays tiers (États-Unis), les prestataires s’appuient sur les clauses contractuelles types de l’UE ou sur le cadre de protection des données UE–États-Unis.',
      },
      {
        heading: '5. Stockage local sur ton appareil',
        body: 'L’application enregistre également tes données en local sur ton appareil (localStorage/IndexedDB) afin qu’elles soient disponibles hors ligne et sans temps d’attente. En mode invité, toutes les données restent exclusivement sur ton appareil et ne nous sont pas transmises.',
      },
      {
        heading: '6. Durée de conservation',
        body: 'Nous conservons tes données tant que ton compte existe. Si tu supprimes ton compte, toutes tes données sont effacées de notre base de données immédiatement et définitivement.',
      },
      {
        heading: '7. Supprimer le compte et les données',
        body: 'Tu peux supprimer toi-même ton compte et l’ensemble de tes données à tout moment dans l’application : Profil → Supprimer le compte. Tu peux en outre demander la suppression sans formalité par e-mail à l’adresse indiquée ci-dessus.',
      },
      {
        heading: '8. Tes droits',
        body: 'Tu disposes d’un droit d’accès, de rectification, d’effacement, de limitation du traitement, de portabilité des données et d’opposition, ainsi que du droit de retirer à tout moment un consentement donné. Tu peux également introduire une réclamation auprès de l’autorité autrichienne de protection des données (dsb.gv.at).',
      },
    ],
  },

  terms: {
    title: 'Conditions d’utilisation',
    updated: 'Mise à jour : juillet 2026',
    sections: [
      VORRANG,
      {
        heading: '1. Champ d’application',
        body: `Ces conditions d’utilisation s’appliquent à l’utilisation de l’application web « FullRep » (fullrep.vercel.app), exploitée par :\n\n${BETREIBER}`,
      },
      {
        heading: '2. Description du service',
        body: 'FullRep est une application permettant de consigner l’entraînement et l’alimentation, complétée par des contenus de connaissance. Son utilisation est actuellement gratuite. Il n’existe aucun droit à une disponibilité permanente ; les fonctions peuvent évoluer ou être supprimées.',
      },
      {
        heading: '3. Compte et obligations',
        body: 'Un compte est nécessaire pour conserver durablement tes données. Tu t’engages à garder tes identifiants secrets et à ne pas publier de contenus portant atteinte aux droits de tiers. Les données que tu apportes à la communauté (p. ex. les valeurs nutritionnelles d’un produit via son code-barres) sont mises à la disposition de l’ensemble des utilisateurs.',
      },
      {
        heading: '4. Avertissement santé — pas un avis médical',
        body: 'L’ensemble des contenus de l’application — en particulier les programmes d’entraînement, les informations sur la nutrition et les régimes, les calculs de calories ainsi que la bibliothèque de connaissance (y compris les informations sur les compléments et les peptides) — sert uniquement à une information générale et ne constitue ni un avis médical, ni thérapeutique, ni nutritionnel. Ils ne remplacent en aucun cas l’examen, le diagnostic ou le traitement par un médecin. Consulte un médecin avant de commencer un programme d’entraînement ou d’alimentation et avant de prendre des compléments, en particulier en cas d’antécédents médicaux, de grossesse ou de prise de médicaments. L’analyse de repas par photo assistée par IA fournit des valeurs estimées dont l’exactitude n’est pas garantie.',
      },
      {
        heading: '5. Responsabilité',
        body: 'Nous répondons de manière illimitée en cas de faute intentionnelle et de négligence grave, ainsi que des dommages résultant d’une atteinte à la vie, à l’intégrité physique ou à la santé. Pour le reste, la responsabilité pour négligence légère est exclue. L’utilisation des recommandations d’entraînement et d’alimentation se fait sous ta propre responsabilité.',
      },
      {
        heading: '6. Modifications',
        body: 'Nous pouvons modifier ces conditions d’utilisation avec effet pour l’avenir. Nous t’informerons dans l’application des modifications substantielles.',
      },
      {
        heading: '7. Droit applicable',
        body: 'Le droit autrichien s’applique, à l’exclusion de ses règles de renvoi. Les dispositions impératives de protection des consommateurs de ton État de résidence demeurent applicables.',
      },
    ],
  },

  health: {
    title: 'Avertissement santé',
    updated: 'Mise à jour : juillet 2026',
    sections: [
      VORRANG,
      {
        heading: 'FullRep ne remplace pas un avis médical',
        body: 'Pour toute question de santé, pour un diagnostic ou un traitement, adresse-toi toujours à un médecin. FullRep est une application permettant de consigner l’entraînement et l’alimentation — ce n’est pas un dispositif médical et cela ne remplace ni examen, ni diagnostic, ni thérapie.',
      },
      {
        heading: 'Quand consulter un médecin',
        body: 'Avant de commencer un programme d’entraînement ou d’alimentation, avant un régime et avant de prendre des compléments alimentaires — en particulier en cas d’antécédents médicaux, de troubles, de grossesse, d’allaitement ou si tu prends des médicaments.\n\nInterromps l’entraînement et consulte un médecin en cas de troubles — par exemple douleurs dans la poitrine, essoufflement, vertiges ou malaise.',
      },
      {
        heading: 'Ce que sont les contenus de l’application — et ce qu’ils ne sont pas',
        body: 'Les programmes d’entraînement, les informations sur la nutrition et les régimes, les calculs de calories et de macros ainsi que la bibliothèque de connaissance (y compris compléments, analyses sanguines et peptides) servent uniquement à une information générale. Ils sont formulés de façon générale et ne tiennent pas compte de ta situation personnelle.\n\nLes indications sur les analyses sanguines ne situent les valeurs que grossièrement et ne constituent pas un diagnostic. Seul un médecin peut évaluer tes résultats.\n\nÀ propos des peptides : dans de nombreux pays, ces substances sont soumises à ordonnance ou non autorisées. Les contenus ne comportent délibérément aucune indication de dosage.',
      },
      {
        heading: 'Des estimations, pas des mesures',
        body: 'Le calculateur de dépense énergétique (Mifflin-St Jeor) et l’analyse de repas par photo assistée par IA fournissent des estimations. Leur exactitude n’est pas garantie ; elles ne remplacent ni une mesure ni un avis nutritionnel médical.',
      },
      {
        heading: 'Le coach IA n’est pas un médecin',
        body: 'Le coach IA répond à des questions générales sur l’entraînement, la nutrition et les compléments. Il ne pose pas de diagnostic, ne recommande pas de traitement et n’indique pas de dosage. Ses réponses peuvent contenir des erreurs. Pour un avis médical, un diagnostic ou un traitement, adresse-toi à un médecin.',
      },
      {
        heading: 'En cas d’urgence',
        body: 'En cas d’urgence médicale, appelle les secours (112 dans l’Union européenne). N’utilise pas FullRep pour chercher de l’aide dans une situation d’urgence ni pour retarder une prise en charge médicale.',
      },
    ],
  },
};
