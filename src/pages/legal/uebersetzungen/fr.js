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
    updated: 'Mise à jour : 17 septembre 2026',
    sections: [
      VORRANG,
      {
        heading: 'Informations conformes au § 5 ECG et au § 25 MedienG (Autriche)',
        body: BETREIBER,
      },
      {
        heading: 'Objet de l’entreprise',
        body: 'Exploitation de l’application web de fitness et de nutrition « FullRep » (fullrep.pages.dev).',
      },
      {
        heading: 'Informations professionnelles',
        body: 'Activité libre : « Services de traitement automatique de données et de technologies de l’information »\nNuméro GISA : 39801937\nMembre de la Chambre de commerce du Tyrol (antenne de Kitzbühel)\nAutorité de surveillance : Bezirkshauptmannschaft Kitzbühel\nTexte applicable : Gewerbeordnung (GewO), consultable sur ris.bka.gv.at\nTVA : micro-entrepreneur au sens du § 6 al. 1 nº 27 UStG (pas de numéro de TVA)',
      },
      {
        heading: 'Règlement des litiges de consommation',
        body: 'Nous ne sommes ni disposés ni tenus de participer à une procédure de règlement des litiges devant un organisme de médiation de la consommation. L’ancienne plateforme européenne de règlement en ligne des litiges a été fermée le 20 juillet 2025.',
      },
      {
        heading: 'Responsabilité quant aux contenus',
        body: 'Les contenus de cette application ont été élaborés avec le plus grand soin. Aucune garantie n’est donnée quant à leur exactitude, leur exhaustivité ou leur actualité. L’ensemble des contenus d’entraînement, de nutrition et de connaissance sert uniquement à une information générale et ne constitue pas un avis médical.',
      },
    ],
  },

  privacy: {
    title: 'Politique de confidentialité',
    updated: 'Mise à jour : 30 octobre 2026',
    sections: [
      VORRANG,
      {
        heading: '1. Responsable du traitement',
        body: `Le responsable du traitement des données dans l’application « FullRep » est :\n\n${BETREIBER}`,
      },
      {
        heading: '2. Quelles données nous traitons',
        body: 'Données de compte : adresse e-mail et mot de passe (chiffré) pour l’inscription.\n\nDonnées de profil : nom, âge, sexe, taille, poids, objectif d’entraînement, niveau d’activité et expérience — indiqués par toi lors de l’onboarding.\n\nDonnées d’utilisation : tes entraînements (exercices, séries, charges), entrées de nutrition (aliments, calories, macros), entrées d’eau, compléments, historique de poids, plans d’entraînement, amitiés et points d’expérience.\n\nDonnées de santé (art. 9 RGPD) : poids et mensurations, données de nutrition et d’entraînement, données de cycle et journal des symptômes (si tu actives le suivi du cycle), pas et poids issus d’Apple Health / Health Connect (si tu actives la connexion) ainsi que tout ce que tu écris au coach IA — par exemple des valeurs sanguines. Nous traitons ces données exclusivement sur la base de ton consentement explicite, que tu donnes dans une étape distincte de l’onboarding (nous en conservons la date dans ton profil) et que tu peux retirer à tout moment pour l’avenir — dans ton profil via « Retirer le consentement aux données de santé » ou en supprimant ton compte. Le traitement effectué avant le retrait reste licite. Comme FullRep ne peut pas fonctionner raisonnablement sans ces données, après un retrait tu ne peux continuer à utiliser ton compte qu’en redonnant ton consentement ; sinon, tu peux le faire supprimer.\n\nApple Health / Health Connect (facultatif) : si tu actives la connexion dans le profil, FullRep lit le nombre de pas et le poids depuis Apple Health (iOS) ou Google Health Connect (Android) pour les afficher dans l’app et les intégrer à ton historique de poids. Tu accordes l’accès dans la boîte de dialogue du système et peux l’y révoquer à tout moment ; tu peux aussi désactiver la connexion dans le profil. Séparément, tu peux activer « Enregistrer les séances dans Santé » dans le profil : FullRep enregistre alors chaque entraînement terminé comme séance (type, début, fin) dans Apple Health ou Health Connect — sans séries, charges, calories ni fréquence cardiaque. Ce qui y est stocké est géré par le système ; FullRep ne le supprime pas si tu désactives à nouveau l’option. FullRep n’utilise jamais ces données à des fins publicitaires.\n\nCalories actives et comptage des pas sur l’appareil (facultatif, depuis la version 1.6.2) : avec la connexion à Santé, FullRep lit aussi tes calories actives (brûlées) du jour pour les afficher sur l’écran d’accueil et dans le widget. Séparément, tu peux activer « Compter les pas avec le téléphone » dans ton profil : FullRep lit alors le nombre de pas directement depuis le capteur de mouvement de ton appareil (iOS : Mouvements et forme ; Android : podomètre, pour lequel l’app consulte brièvement le compteur toutes les 15 minutes). Ces nombres de pas restent sur ton appareil et ne nous sont pas transmis. Tu accordes et retires l’autorisation dans les réglages du système ; tu peux aussi désactiver la fonction dans ton profil.\n\nPhotos : les photos d’exercices et de produits sont stockées exclusivement sur ton appareil (IndexedDB) et ne nous sont pas transmises. Les photos de repas destinées à l’analyse par IA sont transmises à Google (Gemini API) — voir point 4.\n\nDonnées publicitaires et d’achat (uniquement dans les apps iOS et Android) : pour afficher de la publicité, Google AdMob traite l’identifiant publicitaire de ton appareil, ton adresse IP et des données techniques de l’appareil. Pour l’abonnement Premium, nous transmettons à RevenueCat un identifiant utilisateur interne à l’app et le reçu d’achat du store. L’app web n’affiche pas de publicité.\n\nRapports d’erreur : si l’app plante, nous envoyons à Sentry un message d’erreur technique avec la version de l’app et le type d’appareil — sans nom, e-mail ni contenu (si la collecte d’erreurs est activée dans la version concernée).',
      },
      {
        heading: '3. Finalités et bases juridiques',
        body: 'Fourniture des fonctions de l’app : art. 6, par. 1, point b) RGPD (exécution du contrat).\n\nDonnées de santé : exclusivement ton consentement explicite, art. 9, par. 2, point a) RGPD.\n\nPublicité dans les apps : nous n’affichons de publicité personnalisée qu’avec ton consentement (art. 6, par. 1, point a) RGPD), recueilli avant la première annonce via la boîte de dialogue de consentement de Google — sur iOS, en plus, via la demande de transparence du suivi d’Apple. Si tu refuses, tu ne vois que de la publicité non personnalisée ; la base juridique est alors notre intérêt légitime à financer la version gratuite (art. 6, par. 1, point f) RGPD). Tu peux modifier ton choix à tout moment dans le profil sous « Modifier le consentement publicitaire ». Avec un abonnement Premium, la publicité disparaît entièrement. Tes données de santé et d’utilisation ne sont jamais utilisées à des fins publicitaires ni transmises à des partenaires publicitaires.\n\nRapports d’erreur et sécurité : intérêt légitime à une app stable et sûre (art. 6, par. 1, point f) RGPD).\n\nÂge minimum : un compte ne peut être créé qu’à partir de 16 ans ; l’onboarding vérifie la date de naissance. La raison : dans certains États de l’UE, comme l’Allemagne, le consentement au traitement des données de santé et à la publicité personnalisée ne peut être donné valablement qu’à partir de 16 ans (art. 8 RGPD).\n\nL’app web n’affiche pas de publicité et ne dépose aucun cookie publicitaire. Pour mesurer l’audience de la version web, nous utilisons Cloudflare Web Analytics (voir point 4).',
      },
      // TODO(Josef): Gemini-API auf den bezahlten Tarif mit Auftragsverarbeitungs-
      // vertrag (DPA) umstellen — im kostenlosen Tarif darf Google Eingaben zur
      // Produktverbesserung nutzen; für Coach-Nachrichten (auch Blutwerte) nicht
      // tragbar. Erst danach darf hier ein unbedingter Satz zu Art. 28 stehen.
      {
        heading: '4. Destinataires et sous-traitants',
        body: 'Supabase, Inc. (États-Unis ; base de données et système de connexion) : stocke tes données de compte, de profil et d’utilisation.\n\nCloudflare, Inc. (États-Unis ; hébergement) : diffuse l’app et nos fonctions serveur ; des journaux serveur techniquement nécessaires (p. ex. adresse IP) sont générés. Sur la version web, Cloudflare Web Analytics compte en outre les pages vues (page consultée, heure, page de provenance, pays, type d’appareil, navigateur, temps de chargement), sans cookies, sans rien enregistrer sur ton appareil et sans conserver l’adresse IP. La base légale est notre intérêt légitime à une mesure d’audience respectueuse de la vie privée (art. 6, par. 1, point f RGPD). Aucun comptage des visites n’a lieu dans les apps.\n\nGoogle LLC / Google Ireland Ltd. : (1) Gemini API — uniquement si tu utilises l’analyse de photos de repas, la photo prise est transmise à Google pour évaluation ; uniquement si tu utilises le coach IA, tes messages, y compris l’historique de la conversation en cours, sont traités par Google (Gemini API) pour générer la réponse. Google traite ces données selon ses conditions applicables à la Gemini API. Nous n’envoyons ni nom, ni adresse e-mail, ni identifiant de compte ; nous ne stockons ni photos ni messages sur nos serveurs. (2) AdMob — publicité dans les apps iOS et Android (voir points 2 et 3).\n\nAnthropic, PBC (États-Unis ; coach IA) : les réponses du coach IA peuvent aussi être générées par des modèles d’Anthropic (Claude) au lieu de Gemini. Anthropic traite alors tes messages, y compris l’historique de la conversation en cours — également sans nom, e-mail ni identifiant de compte.\n\nRevenueCat, Inc. (États-Unis ; abonnement Premium) : reçoit un identifiant utilisateur interne à l’app et la confirmation d’achat du store afin de gérer ton abonnement et de le restaurer sur un nouvel appareil. Le paiement lui-même est traité par Apple ou Google ; nous ne voyons aucune donnée de paiement.\n\nFunctional Software, Inc. (Sentry, États-Unis ; rapports d’erreur) : reçoit des messages d’erreur techniques sans référence personnelle, si la collecte d’erreurs est activée.\n\nOpen Food Facts (base de données alimentaire) : lors de la recherche d’aliments et du scan de codes-barres, le terme de recherche ou le code-barres (aucune donnée personnelle) est transmis à Open Food Facts.\n\nLorsque les prestataires proposent des conditions de sous-traitance conformes à l’art. 28 RGPD, celles-ci s’appliquent à notre utilisation de leurs services. Pour les transferts vers les États-Unis, nous nous appuyons sur les clauses contractuelles types de l’UE ou sur le cadre de protection des données UE–États-Unis lorsque le prestataire y est certifié.',
      },
      {
        heading: '5. Stockage local sur ton appareil',
        body: 'L’application enregistre également tes données en local sur ton appareil (localStorage/IndexedDB) afin qu’elles soient disponibles hors ligne et sans temps d’attente. En mode invité, toutes les données restent exclusivement sur ton appareil et ne nous sont pas transmises. Dans l’app Android, la sauvegarde automatique via Google (Android Backup) est désactivée ; tes données locales de l’app ne se retrouvent donc pas dans ta sauvegarde Google Drive.',
      },
      {
        heading: '6. Durée de conservation',
        body: 'Nous conservons tes données tant que ton compte existe. Si tu supprimes ton compte, toutes tes données sont immédiatement effacées de notre base de données. Pour nous prémunir contre la perte de données, nous réalisons chaque jour une sauvegarde de la base, supprimée automatiquement après 14 jours — jusque-là, un compte supprimé peut encore figurer dans une sauvegarde ; ces copies servent exclusivement à la restauration après une panne.\n\nL’historique de tes conversations avec le coach IA n’est stocké que sur ton appareil (les 60 derniers messages) ; sur nos serveurs, nous comptons seulement combien de questions tu as posées par jour.',
      },
      {
        heading: '7. Supprimer le compte et les données',
        body: 'Tu peux supprimer toi-même ton compte et l’ensemble de tes données à tout moment dans l’application : Profil → Supprimer le compte. Tu peux en outre demander la suppression sans formalité par e-mail à l’adresse indiquée ci-dessus.',
      },
      {
        heading: '8. Tes droits',
        body: 'Tu disposes d’un droit d’accès, de rectification, d’effacement, de limitation du traitement, de portabilité des données et d’opposition, ainsi que du droit de retirer à tout moment un consentement donné — celui relatif aux données de santé dans ton profil via « Retirer le consentement aux données de santé », celui relatif à la publicité via « Modifier le consentement publicitaire ». Tu peux également introduire une réclamation auprès de l’autorité autrichienne de protection des données (dsb.gv.at).',
      },
    ],
  },

  terms: {
    title: 'Conditions d’utilisation',
    updated: 'Mise à jour : 4 octobre 2026',
    sections: [
      VORRANG,
      {
        heading: '1. Champ d’application',
        body: `Ces conditions d’utilisation s’appliquent à l’utilisation de l’application « FullRep » pour iOS et Android ainsi que de sa version web (fullrep.pages.dev), exploitée par :\n\n${BETREIBER}`,
      },
      {
        heading: '2. Description du service',
        body: 'FullRep est une application permettant de consigner l’entraînement et l’alimentation, complétée par des contenus de connaissance. Les fonctions de base sont gratuites ; la version gratuite des apps iOS et Android est financée par la publicité. Des fonctions supplémentaires — actuellement surtout le coach IA — et l’utilisation sans publicité sont disponibles avec FullRep Premium (point 3). Il n’existe aucun droit à une disponibilité permanente ; les fonctions peuvent évoluer ou être supprimées. Pendant une période d’abonnement déjà payée, nous ne restreignons pas de manière substantielle les fonctions Premium sans motif légitime.',
      },
      {
        heading: '3. FullRep Premium (abonnement)',
        body: 'FullRep Premium est proposé sous forme d’abonnement à renouvellement automatique, mensuel ou annuel. Il s’achète exclusivement via l’App Store d’Apple ou Google Play ; le paiement et la facturation sont gérés par le store concerné, dont les conditions s’appliquent en complément.\n\nLe prix en vigueur t’est indiqué dans la fenêtre du store avant l’achat. Le paiement est débité de ton compte Apple ou Google à la confirmation de l’achat. L’abonnement se renouvelle automatiquement pour la durée choisie, sauf si tu le résilies au moins 24 heures avant la fin de la période en cours.\n\nTu peux gérer et résilier l’abonnement à tout moment dans les réglages d’abonnement de ton compte Apple ou Google. Supprimer l’app ou ton compte FullRep ne met pas fin à l’abonnement. Après une résiliation, Premium reste actif jusqu’à la fin de la période déjà payée.\n\nAvec Premium, la publicité disparaît de l’app et des fonctions Premium comme le coach IA sont débloquées (dans la limite d’un quota quotidien).',
      },
      {
        heading: '4. Essai gratuit',
        body: 'Les nouveaux utilisateurs peuvent essayer Premium gratuitement une seule fois pendant 7 jours. L’essai est lancé dans l’app et lié à ton compte FullRep. Il se termine automatiquement et ne se transforme pas en abonnement payant — aucune résiliation n’est nécessaire. Un abonnement n’est créé que si tu le souscris expressément dans le store.',
      },
      {
        heading: '5. Rétractation et remboursements',
        body: 'Les achats sont traités par Apple ou Google ; nous ne recevons aucune donnée de paiement et ne pouvons donc pas rembourser nous-mêmes les achats. Les remboursements et l’exercice d’un éventuel droit légal de rétractation relèvent des conditions et procédures du store concerné (Apple : reportaproblem.apple.com ; Google Play : historique des commandes de ton compte Google). Les droits impératifs des consommateurs demeurent applicables.',
      },
      {
        heading: '6. Compte et obligations',
        body: 'Un compte est nécessaire pour conserver durablement tes données. Tu t’engages à garder tes identifiants secrets et à ne pas publier de contenus portant atteinte aux droits de tiers. Les données que tu apportes à la communauté (p. ex. les valeurs nutritionnelles d’un produit via son code-barres) sont mises à la disposition de l’ensemble des utilisateurs. Tu dois avoir au moins 16 ans pour créer un compte.',
      },
      {
        heading: '7. Avertissement santé — pas un avis médical',
        body: 'L’ensemble des contenus de l’application — en particulier les programmes d’entraînement, les informations sur la nutrition et les régimes, les calculs de calories ainsi que la bibliothèque de connaissance (y compris les informations sur les compléments et les peptides) — sert uniquement à une information générale et ne constitue ni un avis médical, ni thérapeutique, ni nutritionnel. Ils ne remplacent en aucun cas l’examen, le diagnostic ou le traitement par un médecin. Consulte un médecin avant de commencer un programme d’entraînement ou d’alimentation et avant de prendre des compléments, en particulier en cas d’antécédents médicaux, de grossesse ou de prise de médicaments. L’analyse de repas par photo assistée par IA fournit des valeurs estimées dont l’exactitude n’est pas garantie. Pour plus de détails, voir l’avertissement santé dans l’app (Profil → Avertissement santé).',
      },
      {
        heading: '8. Responsabilité',
        body: 'Nous répondons de manière illimitée en cas de faute intentionnelle et de négligence grave, ainsi que des dommages résultant d’une atteinte à la vie, à l’intégrité physique ou à la santé. Pour le reste, la responsabilité pour négligence légère est exclue. L’utilisation des recommandations d’entraînement et d’alimentation se fait sous ta propre responsabilité.',
      },
      {
        heading: '9. Modifications',
        body: 'Nous pouvons modifier ces conditions d’utilisation avec effet pour l’avenir. Nous t’informerons dans l’application des modifications substantielles.',
      },
      {
        heading: '10. Droit applicable',
        body: 'Le droit autrichien s’applique, à l’exclusion de ses règles de renvoi. Les dispositions impératives de protection des consommateurs de ton État de résidence demeurent applicables.',
      },
    ],
  },

  health: {
    title: 'Avertissement santé',
    updated: 'Mise à jour : 17 septembre 2026',
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
