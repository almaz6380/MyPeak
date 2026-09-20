// Französische Fassung von `src/data/supplementsKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Bases',
    leistung: 'Performance',
    gesundheit: 'Santé',
  },

  creatine: {
    name: 'Créatine',
    summary: 'La créatine est le complément le mieux étudié et le plus efficace pour la force et la prise de muscle. Elle est sûre, peu coûteuse et améliore de façon démontrée la performance sur les efforts courts et intenses. La créatine monohydrate est la forme à privilégier.',
    quick: [
      { label: 'Dosage', text: '3 à 5 g de monohydrate par jour, en continu — le moment importe peu. Phase de charge facultative. Plus de masse musculaire signifie le haut de la fourchette.' },
      { label: 'Effet', text: 'Plus de force et de répétitions, soutient la prise de muscle, bien documentée et sûre.' },
    ],
    sections: [
      {
        title: 'Ce qu’est la créatine et comment elle agit',
        content: 'La créatine est une substance produite par le corps, présente dans les muscles et le cerveau, et également apportée par des aliments animaux comme la viande et le poisson. Dans le muscle, elle est stockée sous forme de phosphocréatine et sert à régénérer rapidement l’ATP, le vecteur d’énergie immédiat de la cellule.\n\nLors d’efforts courts et intenses — séries lourdes en musculation ou sprints — l’ATP est consommé en quelques secondes. La phosphocréatine aide à le reconstituer vite, ce qui permet de maintenir plus de force sur davantage de répétitions. Des réserves de créatine pleines signifient donc plus de performance à l’entraînement.\n\nLa supplémentation permet d’augmenter la teneur en créatine du muscle d’environ 20 à 40 % au-dessus du niveau normal. C’est précisément cette hausse qui explique l’effet ergogène, confirmé de façon constante par des centaines d’études.',
      },
      {
        title: 'L’état des études',
        content: 'Aucun complément destiné aux pratiquants de musculation n’est mieux étudié que la créatine. Une prise de position de l’International Society of Sports Nutrition (Kreider et al., 2017, Journal of the International Society of Sports Nutrition) résume : la créatine monohydrate est le complément alimentaire le plus efficace pour augmenter la performance dans les efforts de haute intensité et pour soutenir la prise de muscle.\n\nLes effets sont bien mesurables : combinée à la musculation, la créatine augmente nettement plus les gains de force et la masse maigre que l’entraînement seul. Le bénéfice apparaît dans presque toutes les tranches d’âge et à tous les niveaux.\n\nAu-delà du sport, la créatine est de plus en plus étudiée pour d’éventuels bénéfices cognitifs et de santé, par exemple en cas de fatigue mentale ou avec l’âge. Ces recherches sont prometteuses, mais moins univoques que les données sur la performance physique — la section dédiée plus bas indique ce qui y est établi et ce qui ne l’est pas.',
      },
      {
        title: 'Dosage et utilisation',
        content: 'L’utilisation est simple. Le plus courant est une dose d’entretien quotidienne de 3 à 5 g de créatine monohydrate. Le moment ne joue pas de rôle notable — seule compte la prise quotidienne et durable, car les réserves se remplissent avec le temps.\n\nUne phase de charge est possible : environ 20 g par jour (répartis en quatre prises) pendant cinq à sept jours, afin de remplir les réserves plus vite. Vient ensuite la dose d’entretien normale. La charge ne fait qu’accélérer l’effet ; sans elle, les réserves sont également pleines après environ trois à quatre semaines.\n\nLa créatine monohydrate est la forme la mieux étudiée et la moins chère — les variantes plus coûteuses (Kre-Alkalyn, créatine HCl) n’apportent aucun bénéfice démontré. Il est conseillé de choisir un produit portant un label de qualité comme Creapure.\n\nLa fourchette de 3 à 5 g n\'est pas arbitraire : elle suit la masse musculaire. La prise de position de l\'ISSN retient environ 0,03 g par kilo de poids corporel et par jour. Une personne lourde et musclée se situe plutôt en haut de la fourchette, une personne légère plutôt en bas. Rien là-dedans ne justifie, pour le muscle, d\'aller bien au-delà de 5 g.',
      },
      {
        title: 'La créatine pour le cerveau : ce qui est établi et ce qui ne l\'est pas',
        content: 'La créatine ne se trouve pas seulement dans le muscle, mais aussi dans le cerveau, où elle remplit la même fonction : reconstituer rapidement l\'ATP. D\'où l\'idée répandue selon laquelle des doses plus élevées apporteraient des bénéfices cognitifs et que la quantité « réellement correcte » se situerait bien au-delà de 3–5 g.\n\nLes données disponibles ne le confirment pas à ce jour. Deux constats comptent. D\'abord, la créatine cérébrale est bien plus difficile à augmenter que la créatine musculaire : alors que la teneur musculaire progresse de 20 à 40 %, les revues situent le cerveau autour de 3 à 10 %. La barrière hémato-encéphalique freine l\'absorption et le cerveau produit lui-même une partie de sa créatine. Ensuite, la quantité optimale est tout simplement inconnue : une poignée d\'études seulement a examiné le lien entre dose et créatine cérébrale.\n\nÀ quel point la relation n\'est pas linéaire, une étude l\'a montré en donnant à des végétariens et à des omnivores 0,3 g par kilo pendant sept jours, soit environ 24 g par jour pour 80 kg. La valeur musculaire a nettement augmenté, la valeur cérébrale n\'a pas bougé de façon mesurable.\n\nDes doses plus élevées sont bel et bien étudiées : des essais à 10 et 20 g par jour sur plusieurs semaines sont en cours, de même que des doses uniques en privation de sommeil. C\'est un domaine actif, avec une justification plausible, mais ce n\'est pas un savoir établi. Pour la force et la prise de muscle, 3–5 g restent le standard démontré. Qui souhaite doser plus haut par intérêt pour les effets cognitifs doit savoir qu\'il suit une hypothèse, et non une recommandation.',
      },
      {
        title: 'Sécurité et mythes',
        content: 'La créatine fait partie des compléments les plus sûrs qui soient. Des études au long cours sur plusieurs années ne montrent aucun effet nocif chez les personnes en bonne santé. Le mythe tenace selon lequel la créatine abîmerait les reins n’est pas démontré chez les personnes aux reins sains (Kreider et al., 2017). En cas de maladie rénale existante, la prise doit toutefois être validée par un médecin.\n\nUn autre mythe veut que la créatine provoque une « rétention d’eau » donnant un aspect bouffi. En réalité, la créatine attire l’eau dans les cellules musculaires, ce qui donne un muscle plus plein plutôt qu’une rétention visible. Une légère hausse du poids au début est normale et souhaitée.\n\nLa perte de cheveux est aussi parfois associée à la créatine, sur la base d’une seule étude. Ce lien n’est pas établi scientifiquement. Dans l’ensemble, la créatine est bien tolérée ; certaines personnes réagissent à de très fortes doses uniques par des troubles digestifs, qu’on évite en fractionnant les prises.',
      },
      {
        title: 'En résumé',
        content: 'La créatine est le complément le plus efficace et le mieux documenté pour la force et la prise de muscle — sûr, peu coûteux et simple à utiliser. Pour la force et la prise de muscle, trois à cinq grammes de monohydrate par jour, en continu, sont tout ce dont tu as besoin ; des doses plus élevées pour le cerveau sont à l’étude, mais ne constituent pas encore une recommandation.\n\nLe moment est indifférent, la phase de charge facultative. Choisis du monohydrate pur ; les formes plus chères n’apportent rien de plus. Les mises en garde répandues sur les reins ou les cheveux ne sont pas démontrées chez les personnes en bonne santé.\n\nSi tu ne devais choisir qu’un seul complément pour la performance, la créatine serait le choix le plus évident. En cas de pathologie préexistante, un avis médical reste comme toujours judicieux.',
      },
    ],
  },

  protein_powder: {
    name: 'Poudre protéinée (whey et autres)',
    summary: 'La poudre protéinée n’est pas un produit miracle, mais une source de protéines pratique et bon marché. Elle aide à couvrir les besoins journaliers quand c’est difficile par les aliments courants — ni plus, ni moins.',
    quick: [
      { label: 'Objectif', text: 'Complément pratique pour atteindre l’objectif protéique du jour — pas une obligation.' },
      { label: 'Choix', text: 'Whey (rapide), caséine (lente), végétale (végane). Toutes efficaces en quantité suffisante.' },
    ],
    sections: [
      {
        title: 'Ce qu’est la poudre protéinée',
        content: 'La poudre protéinée est une protéine alimentaire concentrée, le plus souvent issue du lait (whey et caséine), mais aussi de sources végétales comme le pois, le riz ou le soja. Elle apporte les mêmes acides aminés que des aliments riches en protéines, simplement sous une forme pratique et rapide à préparer.\n\nLe point le plus important d’abord : la poudre protéinée n’est pas un produit « anabolisant » miracle. C’est simplement de la nourriture — un moyen commode de couvrir ses besoins en protéines. Qui atteint son objectif journalier sans peine avec viande, poisson, œufs, produits laitiers et légumineuses n’a besoin d’aucune poudre.\n\nSa valeur tient à sa praticité : un shake se prépare vite, se dose facilement, coûte peu par gramme de protéines et se transporte aisément. Pour les personnes aux besoins protéiques élevés, avec peu de temps ou peu d’appétit, c’est un outil utile.',
      },
      {
        title: 'Whey, caséine et protéines végétales',
        content: 'La whey (protéine de lactosérum) est la forme la plus populaire. Elle est digérée rapidement, riche en leucine et stimule fortement la synthèse protéique musculaire. Elle existe en concentré (bon marché, un peu de lactose), en isolat (plus pur, pauvre en lactose) et en hydrolysat (prédigéré, plus cher).\n\nLa caséine est aussi une protéine du lait, mais digérée lentement, libérant des acides aminés sur plusieurs heures. Certains l’utilisent avant de longues pauses alimentaires, par exemple avant de dormir. En pratique, la différence avec la whey reste faible pour la plupart des gens.\n\nLes protéines végétales (pois, riz, soja) sont le choix des personnes véganes. Des sources végétales isolées peuvent être limitées en certains acides aminés ; les bons produits combinent donc plusieurs sources. En quantité totale suffisante, les poudres végétales sont pour la prise de muscle aussi efficaces que la whey.',
      },
      {
        title: 'Un usage judicieux',
        content: 'La poudre protéinée convient dès qu’une source de protéines rapide et de qualité est pratique : après l’entraînement, en collation, dans un müesli ou pour atteindre l’objectif protéique les jours chargés. Une à deux portions par jour ont du sens pour la plupart des gens.\n\nElle devrait toutefois compléter les aliments normaux, pas les remplacer. Les sources de protéines complètes apportent en plus des micronutriments, rassasient mieux et font partie d’une alimentation équilibrée. Un shake est un outil du quotidien, pas un aliment de base.\n\nAu moment de choisir un produit, un coup d’œil à la liste des ingrédients est utile : le moins d’additifs possible, une bonne teneur en protéines par portion et, idéalement, un label de contrôle indépendant. Les poudres très bon marché contiennent parfois beaucoup de charge ou de sucre.',
      },
      {
        title: 'Sécurité et mise en perspective',
        content: 'Pour les personnes en bonne santé, la poudre protéinée est sûre. La crainte qu’un apport protéique élevé via la poudre abîme les reins ne vaut — comme pour les protéines en général — qu’en cas de maladie rénale existante. En cas d’intolérance au lactose, l’isolat ou les variantes végétales sont mieux tolérés.\n\nUn aspect qualité est la pureté. Les compléments alimentaires étant moins strictement réglementés que les médicaments, les produits avec analyse de laboratoire indépendante (métaux lourds, substances dopantes) valent la peine, en particulier pour les sportifs de compétition.\n\nEn résumé, la poudre protéinée est un produit pratique, pas essentiel. Elle ne remplace pas une bonne alimentation, mais peut aider à couvrir les besoins protéiques de façon commode et peu coûteuse. Pour toute question de santé, l’avis d’un médecin ou d’un diététicien est judicieux.',
      },
    ],
  },

  caffeine: {
    name: 'Caféine',
    summary: 'La caféine est l’un des moyens légaux les plus efficaces pour augmenter la performance. Elle réduit la sensation de fatigue et améliore la concentration et l’endurance de force. L’effet est bien documenté, mais le dosage doit rester individuel et mesuré.',
    quick: [
      { label: 'Dosage', text: 'Env. 3 à 6 mg par kg de poids corporel, 30 à 60 min avant l’entraînement.' },
      { label: 'Attention', text: 'Protéger le sommeil (pas tard dans la journée), tenir compte de la tolérance, tester sa sensibilité.' },
    ],
    sections: [
      {
        title: 'Comment agit la caféine',
        content: 'La caféine est un stimulant qui agit principalement en bloquant les récepteurs à l’adénosine dans le cerveau. L’adénosine est un messager qui signale la fatigue ; en occupant ses sites de fixation, la caféine atténue la sensation de fatigue et abaisse l’effort perçu.\n\nIl en résulte un état de vigilance accrue, une meilleure concentration et une plus grande disposition à l’effort. Pour l’entraînement, cela signifie que les charges semblent plus légères, ce qui mène à plus de répétitions, plus d’endurance et souvent à une meilleure performance.\n\nLa caféine est l’un des rares compléments à l’effet clairement démontré et immédiatement perceptible. Elle s’absorbe via le café, le thé, les boissons énergisantes ou sous forme pure (comprimés, poudre) et agit en 30 à 60 minutes environ.',
      },
      {
        title: 'L’état des études',
        content: 'La caféine fait partie des substances ergogènes les mieux étudiées. Une revue complète (Grgic et al., 2020, British Journal of Sports Medicine) confirme des effets positifs sur la force, l’endurance musculaire, les sprints et la performance d’endurance dans de nombreux sports.\n\nLes tailles d’effet sont modérées mais fiables. Elle peut faire une différence perceptible surtout lors d’efforts répétés et fatigants, en cas de manque de sommeil ou de baisse de motivation. La performance cognitive — temps de réaction, attention — en profite aussi.\n\nLa dose efficace se situe dans la plupart des études autour de 3 à 6 mg par kilo de poids corporel. Des doses plus élevées apportent rarement plus de performance, mais augmentent les effets indésirables : nervosité, palpitations et troubles du sommeil.',
      },
      {
        title: 'Dosage et timing',
        content: 'Pour la performance à l’entraînement, environ 3 à 6 mg par kilo de poids corporel ont fait leurs preuves, pris quelque 30 à 60 minutes avant l’effort. Pour une personne de 75 kg, cela représente en gros 225 à 450 mg — à titre de comparaison, une tasse de café filtre contient environ 80 à 120 mg.\n\nQui réagit fortement ou n’a pas l’habitude devrait commencer par une dose basse et tester sa tolérance. Les différences individuelles sont grandes : certains supportent beaucoup, d’autres réagissent déjà à de faibles quantités par de l’agitation ou des palpitations.\n\nUn point important est le moment dans la journée. La caféine a une demi-vie d’environ cinq à six heures — un entraînement tardif avec une dose élevée peut perturber sensiblement le sommeil. En règle générale, il vaut mieux éviter de grandes quantités dans les six à huit heures précédant le coucher.',
      },
      {
        title: 'Tolérance, effets indésirables et sécurité',
        content: 'Avec une consommation régulière, le corps développe une certaine tolérance — l’effet s’émousse. Certains font donc des pauses ciblées ou réservent les doses plus élevées aux séances importantes. Un arrêt complet n’est toutefois pas nécessaire ; une consommation régulière modérée reste efficace.\n\nParmi les effets indésirables possibles figurent la nervosité, les palpitations, les troubles digestifs, l’anxiété et les troubles du sommeil — le plus souvent en cas de dose trop élevée. En cas de certaines maladies cardiovasculaires, pendant la grossesse ou en cas de troubles anxieux, la prudence s’impose et un avis médical est recommandé.\n\nDans l’ensemble, la caféine est considérée comme sûre en quantités modérées (jusqu’à environ 400 mg par jour pour un adulte en bonne santé). Des doses uniques très élevées, en particulier sous forme de poudre pure, peuvent être dangereuses — un dosage précis est ici décisif. Comme pour toute substance : trouver la dose efficace que l’on tolère, pas la dose maximale.',
      },
      {
        title: 'En résumé',
        content: 'La caféine est un moyen efficace, bien documenté et légal d’augmenter la performance. Elle réduit la sensation de fatigue et améliore la concentration, l’endurance de force et la performance d’endurance.\n\nUne dose d’environ 3 à 6 mg par kilo de poids corporel 30 à 60 minutes avant l’entraînement est courante. Commence bas, teste ta tolérance et protège ton sommeil en évitant la caféine tardive.\n\nLa caféine est sûre en quantités modérées, mais peut poser problème en cas de surdosage ou de pathologie préexistante. Utilise-la comme un outil ciblé, pas comme une dose maximale quotidienne — et consulte un médecin pour toute question de santé.',
      },
    ],
  },

  omega3: {
    name: 'Acides gras oméga-3',
    summary: 'Les acides gras oméga-3 (EPA et DHA) sont essentiels et régulent l’inflammation. Beaucoup de gens en manquent. Le poisson gras est la meilleure source ; un complément peut avoir du sens si l’on mange peu de poisson.',
    quick: [
      { label: 'Source et dose', text: 'Poisson gras 2 à 3 fois par semaine ; en complément, souvent ~1 à 2 g d’EPA+DHA par jour.' },
      { label: 'Bénéfice', text: 'Santé cardiovasculaire et cérébrale, régulation de l’inflammation ; pour les véganes via l’huile d’algues.' },
    ],
    sections: [
      {
        title: 'Ce que sont les acides gras oméga-3',
        content: 'Les acides gras oméga-3 sont un groupe de graisses poly-insaturées que le corps ne peut pas fabriquer et qu’il doit donc obtenir par l’alimentation. Les plus importants sont l’EPA (acide eicosapentaénoïque) et le DHA (acide docosahexaénoïque), présents surtout dans le poisson gras, ainsi que l’ALA (acide alpha-linolénique) issu de sources végétales.\n\nL’EPA et le DHA sont des composants des membranes cellulaires et des précurseurs de messagers qui régulent les processus inflammatoires. Le DHA est en outre un constituant important du cerveau et de la rétine. Ces acides gras comptent donc pour le cœur, le cerveau et le système immunitaire.\n\nLe problème : l’alimentation moderne apporte souvent beaucoup d’oméga-6 (issus d’huiles végétales transformées) mais peu d’oméga-3. Ce déséquilibre, ajouté à une faible consommation de poisson, fait que beaucoup de gens en manquent.',
      },
      {
        title: 'Importance pour la santé',
        content: 'La recherche sur les oméga-3 est abondante. Le mieux documenté est le bénéfice pour la santé cardiovasculaire : l’EPA et le DHA peuvent abaisser les triglycérides sanguins et sont associés à un profil de risque cardiovasculaire plus favorable. Les sociétés savantes recommandent une consommation régulière de poisson gras.\n\nUn effet régulateur de l’inflammation est également étudié, potentiellement pertinent pour la santé articulaire et la récupération après l’entraînement. Pour la fonction cérébrale et l’humeur, il existe aussi des indices d’effets positifs, même si les données y sont moins univoques.\n\nIl faut distinguer les promesses démontrées des promesses exagérées. Les oméga-3 ne sont pas une panacée, mais un apport suffisant est un élément sensé d’une alimentation saine — en particulier pour les personnes qui mangent rarement du poisson.',
      },
      {
        title: 'Sources et supplémentation',
        content: 'La meilleure source d’EPA et de DHA est le poisson gras d’eau froide : saumon, maquereau, hareng, sardines. Deux à trois portions par semaine couvrent les besoins de la plupart des gens. Les sources végétales comme les graines de lin ou les noix apportent de l’ALA, que le corps ne convertit qu’en petite partie en EPA et DHA.\n\nQui mange peu ou pas de poisson peut envisager un complément. Les capsules d’huile de poisson ou d’algues apportent directement EPA et DHA ; l’huile d’algues est l’alternative végétale et végane. Les doses de complément typiques se situent autour de 1 à 2 g d’EPA plus DHA par jour, les besoins exacts restant individuels.\n\nAu moment de choisir, la qualité compte : regarde la teneur réelle en EPA/DHA (pas seulement la quantité totale d’huile de poisson), la fraîcheur (une huile rance n’est pas souhaitable) et, idéalement, les contrôles de pureté. L’indice oméga-3 sanguin peut objectiver le statut.',
      },
      {
        title: 'Sécurité et mise en perspective',
        content: 'Les compléments d’oméga-3 sont considérés comme sûrs et bien tolérés aux doses usuelles. Les effets indésirables possibles sont un arrière-goût de poisson ou de légers troubles digestifs. À très forte dose, les oméga-3 peuvent influencer la coagulation — qui prend des anticoagulants ou prévoit une opération doit faire valider la prise par un médecin.\n\nComme pour tout complément : ils complètent une bonne alimentation, ils ne la remplacent pas. Qui mange régulièrement du poisson gras n’a en général besoin d’aucune huile supplémentaire. Le complément est surtout utile à ceux qui ne mangent pas de poisson et aux véganes (huile d’algues).\n\nPour toute question de santé, en cas de maladie existante ou de prise de médicaments, un avis médical est recommandé. Un dosage sanguin de l’indice oméga-3 aide à estimer précisément ses besoins plutôt que de supplémenter à l’aveugle.',
      },
    ],
  },

  vitamin_d: {
    name: 'Vitamine D',
    summary: 'La vitamine D est importante pour les os, les muscles et le système immunitaire. Elle est surtout produite grâce à la lumière du soleil, d’où la fréquence des carences pendant les mois peu ensoleillés. Une supplémentation est alors souvent judicieuse — idéalement après une prise de sang.',
    quick: [
      { label: 'Source', text: 'Lumière du soleil (peau), peu par l’alimentation. En hiver, un complément est souvent nécessaire.' },
      { label: 'En pratique', text: 'En cas de carence, souvent ~1000 à 2000 UI par jour ; piloter la dose idéalement par prise de sang.' },
    ],
    sections: [
      {
        title: 'Pourquoi la vitamine D est particulière',
        content: 'La vitamine D occupe une place à part parmi les vitamines, car le corps peut la produire lui-même dans la peau sous l’effet de la lumière du soleil (rayonnement UV-B). À strictement parler, elle agit plutôt comme une hormone : elle régule l’absorption du calcium et du phosphate et joue donc un rôle central pour des os et des dents sains.\n\nAu-delà de la santé osseuse, la vitamine D a des fonctions dans la musculature et le système immunitaire. Ses récepteurs se trouvent dans de nombreux tissus, ce qui explique sa large importance. Une carence marquée peut contribuer à une faiblesse musculaire, à des problèmes osseux et à une sensibilité accrue aux infections.\n\nCe qui est particulier et à la fois problématique : la source principale étant la lumière du soleil, le statut dépend fortement du lieu de vie, de la saison, de la couleur de peau et du mode de vie. Dans beaucoup de régions, l’ensoleillement hivernal ne suffit pas à produire assez de vitamine D.',
      },
      {
        title: 'La carence est très répandue',
        content: 'La carence en vitamine D fait partie des déficits nutritionnels les plus fréquents au monde, surtout aux latitudes nord et pendant les mois d’hiver. Les personnes qui travaillent beaucoup à l’intérieur, ont la peau plus foncée, se couvrent ou sont âgées ont un risque accru, leur production endogène étant réduite.\n\nPar l’alimentation seule, les besoins sont difficiles à couvrir. Seuls quelques aliments contiennent des quantités notables — surtout le poisson gras, le jaune d’œuf et les produits enrichis. Ils ne suffisent généralement pas à combler une carence lorsque la production par le soleil manque.\n\nLe statut en vitamine D se détermine par une simple prise de sang (25-OH-vitamine D). C’est la façon la plus fiable de savoir s’il faut supplémenter et à quelle hauteur — plutôt que de deviner.',
      },
      {
        title: 'La supplémentation en pratique',
        content: 'S’il existe une carence ou si la production endogène est faible pendant les mois peu ensoleillés, une supplémentation est judicieuse. On cite souvent des doses d’entretien de l’ordre de 1000 à 2000 UI (unités internationales) par jour, les besoins individuels pouvant fortement varier.\n\nLe mieux est de piloter la dose par le dosage sanguin : un test montre la valeur de départ, et après quelques semaines ou mois de prise on peut vérifier le résultat et ajuster. On évite ainsi aussi bien la sous-couverture que le surdosage.\n\nLa vitamine D3 (cholécalciférol) est la forme à privilégier. Comme elle est liposoluble, elle s’absorbe le mieux avec un repas contenant des graisses. Elle est souvent associée à la vitamine K2, qui soutient le métabolisme du calcium — les données sont prometteuses, mais pas définitives.',
      },
      {
        title: 'Sécurité et suivi médical',
        content: 'La vitamine D est liposoluble et peut s’accumuler dans le corps — à la différence des vitamines hydrosolubles. Des doses très élevées sur une longue période peuvent entraîner un excès dangereux de calcium dans le sang. Le « plus, c’est mieux » ne s’applique expressément pas ici ; les mégadoses sans contrôle médical sont à éviter.\n\nPour la plupart des gens, des doses d’entretien modérées sont sûres. Qui envisage néanmoins de fortes doses, a des pathologies préexistantes ou prend des médicaments devrait se faire suivre médicalement. La prise de sang est là encore l’outil décisif pour rester dans une zone sûre et efficace.\n\nEn résumé, la vitamine D est l’un des rares compléments qui apportent un bénéfice réel à beaucoup de gens — en hiver surtout. La démarche la plus sensée est de mesurer son statut et d’aligner la prise dessus, plutôt que de doser fort à l’aveugle.',
      },
    ],
  },

  magnesium: {
    name: 'Magnésium',
    summary: 'Le magnésium intervient dans plus de 300 processus enzymatiques, dont la fonction musculaire et nerveuse, le métabolisme énergétique et le sommeil. Une carence légère est répandue. Couvrable par l’alimentation, il se supplémente bien au besoin.',
    quick: [
      { label: 'Fonction', text: 'Fonction musculaire et nerveuse, métabolisme énergétique, sommeil, os.' },
      { label: 'Sources', text: 'Noix, graines, produits complets, légumineuses, légumes verts ; complément au besoin.' },
    ],
    sections: [
      {
        title: 'Le rôle du magnésium',
        content: 'Le magnésium est un minéral essentiel et un cofacteur de plus de 300 réactions enzymatiques dans le corps. Il intervient dans la production d’énergie (métabolisme de l’ATP), la fonction musculaire et nerveuse, la synthèse des protéines, la régulation de la glycémie et la santé osseuse.\n\nPour les personnes sportives, le magnésium est particulièrement pertinent, car il joue un rôle central dans la contraction et la décontraction musculaires ainsi que dans le métabolisme énergétique. Une carence peut se manifester entre autres par des crampes, de la fatigue, de l’irritabilité et un sommeil de moins bonne qualité.\n\nPar la sueur et un métabolisme accru, l’entraînement intense peut légèrement augmenter les besoins en magnésium. En parallèle, l’apport est limite chez beaucoup de gens, une alimentation très transformée étant pauvre en magnésium.',
      },
      {
        title: 'Carence et besoins',
        content: 'Une carence marquée en magnésium est rare avec une alimentation saine, mais une carence légère ou un apport limite est relativement répandu — surtout avec une alimentation monotone et très transformée. Les besoins quotidiens des adultes se situent autour de 300 à 400 mg, selon le sexe et l’âge.\n\nComme le magnésium se trouve dans beaucoup d’aliments non transformés, les besoins se couvrent en principe bien par l’alimentation. De bonnes sources sont les noix et les graines (courge, amandes), les produits complets, les légumineuses, les légumes verts à feuilles et le chocolat noir.\n\nUne carence en magnésium ne se mesure que de façon limitée dans le sang, la majeure partie étant stockée dans les cellules et les os. Des symptômes comme des crampes fréquentes, de l’épuisement ou des troubles du sommeil peuvent — parmi d’autres causes — être des indices et devraient être vérifiés médicalement en cas de doute.',
      },
      {
        title: 'Supplémentation',
        content: 'Si l’apport alimentaire ne suffit pas ou si les besoins sont accrus, un complément de magnésium peut avoir du sens. La forme joue un rôle pour la tolérance : les composés organiques comme le citrate, le glycinate ou le malate de magnésium sont bien tolérés et bien absorbés. L’oxyde de magnésium est bon marché, mais moins bien absorbé et peut avoir un effet laxatif.\n\nLes doses complémentaires usuelles se situent autour de 200 à 400 mg de magnésium élémentaire par jour, souvent le soir, le magnésium pouvant avoir un effet relaxant et soutenir le sommeil. Des doses plus élevées peuvent provoquer des selles molles ou de la diarrhée — un signal pour réduire la quantité.\n\nLes preuves en faveur des compléments de magnésium sont les plus solides en cas de carence avérée. Chez les personnes suffisamment approvisionnées, le bénéfice supplémentaire est limité. Comme toujours : les aliments d’abord, le complément comme apport ciblé.',
      },
      {
        title: 'Sécurité et résumé',
        content: 'Le magnésium alimentaire est sans risque ; l’excédent est normalement éliminé par les reins. Avec les compléments, l’effet indésirable le plus fréquent est laxatif en cas de dose trop élevée. Les personnes dont la fonction rénale est altérée ne devraient prendre des compléments de magnésium qu’après avis médical, l’élimination pouvant être réduite.\n\nEn résumé, le magnésium est un minéral important, aux fonctions larges pour les muscles, les nerfs, le métabolisme énergétique et le sommeil. Une carence légère est répandue, mais se corrige bien par une alimentation complète riche en noix, graines, produits complets et légumes verts.\n\nUn complément est une option sensée en cas de besoins accrus, d’apport insuffisant ou de symptômes correspondants — idéalement sous une forme bien tolérée et en accord avec un médecin en cas de pathologie préexistante.',
      },
    ],
  },
};
