// Französische Fassung von `src/data/trainingKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Fondamentaux',
    hypertrophie: 'Prise de muscle',
    programmierung: 'Programmation',
    regeneration: 'Récupération',
  },

  progressive_overload: {
    name: 'Surcharge progressive',
    summary: 'Le principe le plus important pour progresser sur la durée : le stimulus d’entraînement doit augmenter systématiquement dans le temps pour que le corps continue de s’adapter. Sans progression, la force et la prise de muscle stagnent.',
    quick: [
      { label: 'Idée centrale', text: 'Peu à peu plus de charge, de répétitions, de séries ou une meilleure technique — le stimulus doit monter.' },
      { label: 'Pour qui', text: 'Tous les niveaux. Les débutants progressent vite, les confirmés ont besoin de pas plus petits et mieux planifiés.' },
    ],
    sections: [
      {
        title: 'Qu’est-ce que la surcharge progressive ?',
        content: 'La surcharge progressive désigne l’augmentation graduelle des exigences imposées au corps pendant l’entraînement. L’idée de fond remonte au principe de la surcompensation : un stimulus perturbe l’équilibre biologique, le corps se répare et s’adapte à un niveau de performance un peu plus élevé. Si le stimulus reste ensuite identique, il n’y a plus de raison de s’adapter — le progrès s’arrête.\n\nLe terme vient à l’origine de la rééducation : Thomas DeLorme a développé dans les années 1940 le concept de « progressive resistance exercise » pour restaurer la force musculaire de soldats blessés (DeLorme, 1945, Journal of Bone and Joint Surgery). Depuis, il est devenu le fondement de tout entraînement sérieux de force et de prise de muscle.\n\nIl est important de comprendre que « plus de charge » n’est qu’une des possibilités de progression. Le stimulus peut aussi être augmenté par plus de répétitions, plus de séries, des pauses plus courtes, une amplitude de mouvement plus grande ou une exécution plus lente et contrôlée.',
      },
      {
        title: 'Contexte scientifique',
        content: 'La nécessité d’une progression graduelle est l’un des principes les mieux documentés des sciences de l’entraînement. La prise de position de l’American College of Sports Medicine (ACSM, 2009, Medicine & Science in Sports & Exercise) cite expressément la surcharge progressive comme condition de gains continus de force et d’hypertrophie et recommande une augmentation planifiée de la charge et du volume.\n\nUne revue de Schoenfeld et al. (2017, Journal of Strength and Conditioning Research) montre que des charges lourdes comme modérées peuvent déclencher la croissance musculaire — l’essentiel est que les séries soient menées près de l’épuisement musculaire et que le stimulus augmente avec le temps. Cela souligne que la progression peut se concevoir avec souplesse.\n\nLes adaptations à l’entraînement suivent en outre le principe SAID (« Specific Adaptation to Imposed Demands ») : le corps s’adapte exactement à la contrainte qu’il subit. Si la charge n’augmente pas, l’adaptation n’a pas lieu — un lien confirmé de façon constante en physiologie du sport depuis des décennies.',
      },
      {
        title: 'Méthodes de progression',
        content: 'Il existe plusieurs voies praticables pour augmenter le stimulus. La plus connue est l’augmentation de la charge : plus de poids sur la barre. Sur la plupart des exercices, des paliers de 2,5 kg (haut du corps) ou 5 kg (bas du corps) ont du sens dès que le nombre haut de répétitions est atteint proprement.\n\nLa double progression est une méthode particulièrement adaptée aux débutants : on choisit une plage de répétitions (par exemple 8 à 12). On monte d’abord à l’intérieur de cette plage (plus de répétitions à charge égale) et, dès que la limite haute est atteinte sur toutes les séries, on augmente la charge et on repart du bas.\n\nAutres possibilités : plus de séries par groupe musculaire (hausse du volume), des pauses plus courtes à performance égale, une amplitude plus grande ou une phase excentrique plus lente et contrôlée. Il est important de ne changer qu’une variable à la fois, afin de suivre clairement la progression.',
      },
      {
        title: 'Erreurs fréquentes',
        content: 'L’erreur la plus fréquente est une progression trop rapide : qui augmente la charge avant de maîtriser la technique risque de se blesser et, souvent, ne sollicite plus le muscle visé. La charge ne devrait monter que lorsque toutes les répétitions prévues passent avec une bonne exécution.\n\nUne deuxième erreur est de croire que la progression doit avoir lieu à chaque séance. Les pratiquants confirmés en particulier ne peuvent pas ajouter du poids chaque semaine — c’est la tendance sur des semaines et des mois qui compte, pas la séance isolée. De petites variations dues au sommeil, au stress ou à l’alimentation sont normales.\n\nLa troisième erreur est l’absence de suivi. Sans noter charge, répétitions et séries, on ne peut guère piloter la progression — on ne sait tout simplement pas si l’on s’est amélioré. Un carnet d’entraînement est donc l’outil le plus important pour progresser sur la durée.',
      },
      {
        title: 'En résumé',
        content: 'La surcharge progressive est la loi fondamentale de l’entraînement : sans stimulus croissant, pas d’adaptation durable. Elle s’applique via la charge, les répétitions, les séries, les pauses, l’amplitude ou le tempo d’exécution — pas seulement avec plus de poids.\n\nPour les débutants, la double progression sur 8 à 12 répétitions fonctionne à merveille. Les confirmés devraient raisonner en cycles plus longs et planifier leur progression plutôt que de la forcer. Dans tous les cas, l’essentiel est de documenter les progrès et de faire passer la technique avant la charge.\n\nQui progresse avec patience et méthode construit force et muscle de façon continue au fil des années — c’est exactement le cœur d’un entraînement réussi.',
      },
    ],
  },

  volume_frequency: {
    name: 'Volume et fréquence d’entraînement',
    summary: 'Le volume (séries × répétitions × charge) est le levier le plus puissant pour la prise de muscle. La fréquence décrit combien de fois un muscle est entraîné par semaine. Ensemble, ils déterminent le stimulus qu’un muscle reçoit — et sa capacité à récupérer.',
    quick: [
      { label: 'Repère volume', text: 'Environ 10 à 20 séries dures par groupe musculaire et par semaine pour la plupart des pratiquants.' },
      { label: 'Repère fréquence', text: 'Entraîner chaque muscle 2 fois par semaine vaut généralement mieux qu’une fois, à volume hebdomadaire égal.' },
    ],
    sections: [
      {
        title: 'Que signifie le volume ?',
        content: 'Le volume d’entraînement mesure la quantité totale de travail effectué. Le plus courant est de compter les « séries dures » par groupe musculaire et par semaine — c’est-à-dire les séries menées près de l’échec musculaire (environ 0 à 4 répétitions en réserve). Plus précisément, le volume peut se calculer en séries × répétitions × charge (tonnage), mais le comptage des séries s’est imposé en pratique comme une approximation robuste.\n\nLe volume est considéré comme le facteur isolé le plus important pour la croissance musculaire. La méta-analyse de Schoenfeld, Ogborn et Krieger (2017, Journal of Sports Sciences) a trouvé une relation dose-effet claire : plus de séries hebdomadaires ont mené à plus d’hypertrophie — jusqu’à un point à partir duquel le bénéfice supplémentaire diminue et la récupération souffre.\n\nPour la plupart des pratiquants, la plage utile se situe autour de 10 à 20 séries dures par groupe musculaire et par semaine. Les débutants profitent déjà du bas de la fourchette, les confirmés ont souvent besoin de plus pour continuer à créer un stimulus.',
      },
      {
        title: 'Que signifie la fréquence ?',
        content: 'La fréquence décrit combien de fois un muscle est entraîné en une semaine. Qu’un muscle soit sollicité 1, 2 ou 3 fois par semaine ne change pas nécessairement le volume hebdomadaire — cela le répartit seulement autrement. Qui répartit 16 séries de pectoraux sur deux séances fait 8 séries par séance au lieu de 16 en une.\n\nLa méta-analyse de Schoenfeld, Grgic et Krieger (2019, Journal of Sports Sciences) montre qu’à volume hebdomadaire égal, une fréquence plus élevée mène tendanciellement à un peu plus de croissance musculaire, probablement parce que la synthèse protéique musculaire ne reste élevée qu’environ 24 à 48 heures après la séance et que des stimuli plus fréquents la relancent plus souvent.\n\nEn pratique : entraîner chaque muscle deux fois par semaine est pour la plupart un bon compromis entre stimulus, récupération et qualité d’entraînement. Des fréquences très élevées n’apportent guère plus, tant que le volume est au rendez-vous.',
      },
      {
        title: 'Bien piloter le volume',
        content: 'Le volume ne devrait pas être statique, mais géré de façon individuelle et dynamique. Un bon départ est le bas de la fourchette (environ 10 séries par muscle et par semaine). De là, il peut être augmenté lentement sur plusieurs semaines, tant que récupération, sommeil et performance suivent.\n\nLe concept de « Maximum Recoverable Volume » (MRV) décrit la limite supérieure de volume dont un pratiquant peut encore récupérer. Si elle est dépassée, la performance baisse et le risque de blessure augmente. Les signes d’un volume excessif sont des baisses de performance persistantes, un mauvais sommeil, des courbatures permanentes et une perte de motivation.\n\nLes groupes musculaires en retard ou les points faibles peuvent être priorisés avec un peu plus de volume, tandis que les zones déjà bien développées se contentent d’un volume d’entretien (souvent 6 à 10 séries). On emploie ainsi de façon ciblée une capacité de récupération limitée.',
      },
      {
        title: 'Erreurs fréquentes',
        content: 'L’erreur classique du débutant est trop de volume trop tôt. Plus n’est pas automatiquement mieux — au-delà de la limite individuelle de récupération, du volume supplémentaire freine même les progrès. Il est plus judicieux de démarrer bas et de monter lentement.\n\nUne deuxième erreur est de compter le « junk volume » : des séries loin de l’échec ou avec une mauvaise technique ne contribuent guère à la croissance mais coûtent de la récupération. Seules les séries qui sollicitent réellement le muscle visé comptent comme volume efficace.\n\nTroisièmement, on confond souvent fréquence et volume. Entraîner un muscle plus souvent n’apporte quelque chose que si le volume hebdomadaire suffit. Six séances par semaine avec à chaque fois un stimulus trop faible valent moins que trois séances bien menées.',
      },
      {
        title: 'En résumé',
        content: 'Le volume est le levier le plus puissant pour la prise de muscle ; une plage d’environ 10 à 20 séries dures par muscle et par semaine convient à la plupart. La fréquence répartit ce volume — deux fois par semaine et par muscle est un standard éprouvé.\n\nCommence au bas de la fourchette et augmente lentement, en observant récupération et performance. Ne compte que les séries efficaces et exigeantes, et adapte le volume de chaque groupe musculaire à tes objectifs.\n\nVolume et fréquence ne sont pas des règles rigides, mais des outils à ajuster à ta capacité de récupération. Qui pilote les deux consciemment s’entraîne plus efficacement et évite aussi bien le sous- que le surentraînement.',
      },
    ],
  },

  hypertrophy_basics: {
    name: 'Comment les muscles grossissent',
    summary: 'La croissance musculaire (hypertrophie) survient quand l’entraînement élève la synthèse protéique musculaire au-dessus de la dégradation et que ce stimulus est répété régulièrement. Le moteur principal est la tension mécanique produite par des séries exigeantes — associée à assez de protéines et de récupération.',
    quick: [
      { label: 'Moteur principal', text: 'La tension mécanique : des séries près de l’épuisement avec une technique contrôlée.' },
      { label: 'Conditions', text: 'Assez de protéines (env. 1,6 à 2,2 g/kg), des calories à l’entretien ou en léger surplus, du sommeil.' },
    ],
    sections: [
      {
        title: 'La biologie de la croissance musculaire',
        content: 'Les muscles sont faits de fibres contenant des protéines contractiles (actine et myosine). Grossir signifie avant tout que ces fibres s’épaississent, parce que davantage de protéines contractiles y sont déposées — on parle d’hypertrophie myofibrillaire. Le corps construit en permanence de la protéine musculaire (synthèse protéique musculaire) et en dégrade (protéolyse musculaire) ; la croissance n’apparaît que si la construction l’emporte sur une période prolongée.\n\nL’entraînement est le déclencheur : une série exigeante augmente la synthèse protéique musculaire pendant environ 24 à 48 heures (Damas et al., 2016, Journal of Physiology). Si ce stimulus est répété régulièrement et alimenté en matériaux (protéines) et en énergie, la croissance s’accumule sur des semaines et des mois.\n\nLes cellules satellites jouent aussi un rôle : ces cellules souches spécifiques du muscle sont activées par l’entraînement et aident à réparer les fibres endommagées et à apporter de nouveaux noyaux cellulaires, ce qui permet à long terme une croissance plus importante.',
      },
      {
        title: 'Les trois mécanismes de l’hypertrophie',
        content: 'Brad Schoenfeld a décrit dans un travail très cité (2010, Journal of Strength and Conditioning Research) trois mécanismes possibles de la croissance musculaire : la tension mécanique, le stress métabolique et les dommages musculaires.\n\nLa tension mécanique est aujourd’hui considérée comme le moteur principal. Elle naît quand les muscles travaillent contre une résistance élevée sur une amplitude complète — surtout dans les dernières répétitions, les plus dures, d’une série. Cette tension est perçue par les cellules musculaires comme un signal (« mécanotransduction ») et lance les processus de croissance.\n\nLe stress métabolique (la « brûlure » due aux produits du métabolisme dans les séries plus longues) et de légers dommages musculaires peuvent soutenir le processus, mais sont moins décisifs qu’on l’a longtemps cru. Les recherches récentes suggèrent que des dommages musculaires marqués sont plutôt un sous-produit qu’une condition de la croissance.',
      },
      {
        title: 'Comment optimiser le stimulus de croissance',
        content: 'Pour maximiser la tension mécanique, les séries devraient être menées près de l’épuisement musculaire — le plus souvent avec 0 à 4 répétitions en réserve. La plage exacte de répétitions est étonnamment souple : la croissance est possible sur un large éventail, d’environ 5 à 30 répétitions par série, tant que la série est assez dure (Schoenfeld et al., 2017, Journal of Strength and Conditioning Research).\n\nEn pratique, une plage modérée d’environ 6 à 15 répétitions a fait ses preuves, car elle offre un bon compromis entre tension, volume et fatigue. Des répétitions très basses sollicitent davantage articulations et système nerveux, des répétitions très hautes sont désagréables et épuisantes.\n\nUne exécution contrôlée sur une amplitude complète est essentielle. La position étirée d’un muscle sous charge semble en particulier être un stimulus de croissance puissant — des répétitions profondes et complètes sont donc généralement plus efficaces que des répétitions courtes et hachées.',
      },
      {
        title: 'Alimentation et récupération',
        content: 'Sans matériaux suffisants, aucun muscle ne peut grossir. Les protéines fournissent les acides aminés pour la synthèse protéique musculaire ; la recherche recommande aux pratiquants environ 1,6 à 2,2 g de protéines par kilo de poids corporel et par jour (Morton et al., 2018, British Journal of Sports Medicine). Une répartition sur plusieurs repas de 20 à 40 g chacun est judicieuse.\n\nL’énergie est tout aussi décisive. La prise de muscle réussit le mieux à l’entretien calorique ou en léger surplus (environ +5 à 15 %). En déficit marqué, la croissance reste possible mais nettement plus lente — les débutants et les personnes en surpoids peuvent surtout, au début, perdre du gras et prendre du muscle en même temps.\n\nLe sommeil est le facteur le plus sous-estimé. Pendant le sommeil profond se déroulent la récupération et des adaptations hormonales. Un manque de sommeil chronique abaisse de façon démontrée la synthèse protéique musculaire et augmente la dégradation — sept à neuf heures par nuit sont une cible raisonnable.',
      },
      {
        title: 'En résumé',
        content: 'Les muscles grossissent quand un stimulus exigeant élève la synthèse protéique musculaire au-dessus de la dégradation et que ce processus se répète régulièrement. Le moteur principal est la tension mécanique de séries dures exécutées de façon contrôlée et complète.\n\nLa plage de répétitions efficace est large (environ 5 à 30) ; en pratique, 6 à 15 répétitions près de l’épuisement ont fait leurs preuves. Volume, progression et technique déterminent le stimulus, tandis que protéines, énergie et sommeil rendent l’adaptation possible.\n\nLa prise de muscle est un processus lent et cumulatif. Qui s’entraîne dur avec patience, mange et dort suffisamment construira de la musculature en continu sur des mois et des années.',
      },
    ],
  },

  recovery_overtraining: {
    name: 'Récupération et surentraînement',
    summary: 'L’adaptation ne se produit pas pendant l’entraînement, mais dans la récupération qui suit. Qui s’entraîne trop et récupère trop peu stagne ou s’affaiblit. Sommeil, alimentation, pauses et une gestion sensée de la charge sont donc aussi importants que l’entraînement lui-même.',
    quick: [
      { label: 'Règle de base', text: 'Le muscle grandit pendant la pause. Sans récupération, pas de progrès.' },
      { label: 'Leviers principaux', text: 'Sommeil (7 à 9 h), assez de calories et de protéines, semaines de décharge, gestion du stress.' },
    ],
    sections: [
      {
        title: 'Pourquoi la récupération est décisive',
        content: 'L’entraînement est un stimulus, mais l’adaptation elle-même — des muscles plus forts et plus gros, un système nerveux plus performant — se produit dans la phase de récupération qui suit. Cette alternance est décrite par le modèle de la surcompensation : après une contrainte, la performance baisse d’abord, récupère, puis dépasse le niveau de départ — à condition qu’il reste assez de temps pour récupérer.\n\nSi le prochain stimulus dur arrive trop tôt, avant la fin de la récupération, la fatigue s’accumule. À court terme c’est normal et cela fait même partie de l’entraînement ; durablement, cela mène toutefois à des pertes de performance. Le corps ne distingue pas le stress de l’entraînement des autres stress — travail, manque de sommeil et charge psychique comptent aussi.\n\nLa récupération n’est donc pas un « ne rien faire » passif, mais la partie active où le stimulus se transforme en progrès. Qui la néglige gaspille une grande partie de son travail à l’entraînement.',
      },
      {
        title: 'Le sommeil, premier facteur de récupération',
        content: 'Aucun autre facteur n’influence autant la récupération que le sommeil. Pendant le sommeil se déroulent la réparation des tissus, la consolidation des schémas moteurs et d’importants processus hormonaux, dont la sécrétion d’hormone de croissance.\n\nLes données sont sans ambiguïté : le manque de sommeil dégrade la force, la performance et la récupération. Une étude de Nedeltcheva et al. (2010, Annals of Internal Medicine) a montré qu’en alimentation hypocalorique, les personnes qui dormaient trop peu perdaient nettement plus de masse musculaire et moins de gras que celles qui dormaient assez — en manque de sommeil, le corps sacrifiait de préférence le muscle. Le taux de blessures augmente lui aussi de façon mesurable avec un manque de sommeil chronique.\n\nSept à neuf heures par nuit sont une cible raisonnable pour la plupart des pratiquants. Des heures de coucher régulières, une chambre sombre et fraîche, et l’absence d’écrans et de caféine le soir améliorent nettement la qualité du sommeil.',
      },
      {
        title: 'Les signes du surentraînement',
        content: 'Le véritable syndrome de surentraînement est rare et demande des semaines voire des mois de récupération ; plus fréquent est le « overreaching » — une surcharge temporaire. Les deux se manifestent par des signaux d’alerte comparables, qu’il faut prendre au sérieux.\n\nSignes typiques : baisse de performance persistante malgré l’entraînement, courbatures inhabituellement fortes ou durables, troubles du sommeil, pouls de repos élevé, irritabilité, perte de motivation et infections plus fréquentes. Quand plusieurs se cumulent, c’est un signal clair de réduire la charge.\n\nImportant : une seule mauvaise séance n’est pas du surentraînement. Seul un schéma persistant sur une à deux semaines devrait conduire à des ajustements. Le meilleur remède n’est généralement pas plus, mais moins — par un volume réduit, plus de sommeil et, le cas échéant, une semaine de décharge.',
      },
      {
        title: 'Décharge et gestion de la charge',
        content: 'Une semaine de décharge (deload) est une phase planifiée de charge réduite, où le volume et/ou l’intensité sont volontairement abaissés — typiquement à environ la moitié du volume ou avec des charges nettement plus légères. Elle sert à évacuer la fatigue accumulée sans perdre complètement le stimulus.\n\nLe bon moment dépend de chacun. Beaucoup de pratiquants profitent d’une telle semaine environ toutes les 4 à 8 semaines d’entraînement intense, ou dès que les signaux d’alerte se multiplient. Les confirmés à gros volume en ont besoin plus souvent que les débutants.\n\nAu-delà des décharges planifiées, la gestion courante de la charge compte : adapter l’intensité à la forme du jour, alterner séances dures et plus légères, et intégrer les facteurs de stress de la vie. La récupération n’est pas un schéma rigide, mais une écoute souple des signaux du corps.',
      },
      {
        title: 'En résumé',
        content: 'Le progrès naît dans la récupération, pas dans l’entraînement lui-même. Qui crée le stimulus mais néglige la récupération sacrifie des résultats et risque la surcharge.\n\nLes leviers les plus efficaces sont le sommeil (7 à 9 heures), assez de calories et de protéines, ainsi qu’une gestion consciente de la charge avec des semaines de décharge ponctuelles. Des signaux d’alerte comme une baisse de performance persistante, un mauvais sommeil et une perte de motivation doivent être pris au sérieux.\n\nLa récupération n’est pas un signe de faiblesse, mais la partie de l’entraînement où l’adaptation a réellement lieu. Qui la planifie et la respecte s’entraîne durablement plus sainement et avec plus de succès.',
      },
    ],
  },

  technique_rom: {
    name: 'Technique et amplitude de mouvement',
    summary: 'Une technique propre sur une amplitude complète rend les exercices plus efficaces et plus sûrs. Elle garantit que le muscle visé reçoit le stimulus, réduit le risque de blessure et constitue la base de toute progression.',
    quick: [
      { label: 'Règle de base', text: 'Amplitude complète, contrôlée, en se concentrant sur le muscle visé — la technique avant la charge.' },
      { label: 'Pourquoi c’est important', text: 'Meilleur stimulus, risque de blessure moindre, base saine pour la progression.' },
    ],
    sections: [
      {
        title: 'Pourquoi la technique compte',
        content: 'Une bonne technique a deux fonctions centrales : elle fait en sorte que la charge arrive réellement sur le muscle visé, et elle maintient les articulations dans des positions sûres. Les deux ensemble déterminent si un exercice est efficace et tenable dans la durée.\n\nQui s’entraîne avec une mauvaise technique déplace souvent la charge vers des muscles non voulus ou vers des structures passives comme les ligaments et les tendons. Cela réduit non seulement l’effet d’entraînement, mais augmente aussi le risque de lésions de surcharge. La technique n’est donc pas une fin en soi, mais la condition pour que l’entraînement remplisse son but.\n\nAu début surtout, il vaut la peine d’apprendre les schémas de mouvement avec des charges légères. Le système nerveux consolide ces schémas par la répétition — une technique bien ancrée forme la base sur laquelle des charges plus lourdes pourront ensuite être gérées en sécurité.',
      },
      {
        title: 'L’amplitude complète',
        content: 'L’amplitude de mouvement (Range of Motion, ROM) décrit la distance sur laquelle un muscle travaille pendant un exercice. En règle générale : une amplitude aussi complète que possible est supérieure à une amplitude réduite, en particulier pour la prise de muscle.\n\nPlusieurs études le confirment. Un travail de Schoenfeld et Grgic (2020, SAGE Open Medicine) résume que les amplitudes complètes mènent en général à plus de croissance musculaire que les mouvements partiels. La position étirée sous charge semble en particulier être un stimulus puissant — des squats profonds, par exemple, développent les cuisses davantage que des squats à mi-course.\n\nIl y a des exceptions : sur certains exercices ou en cas de limitation de santé, une amplitude légèrement adaptée peut être judicieuse. En principe, il faut toutefois viser la plus grande amplitude que l’on peut contrôler avec une bonne technique et sans douleur.',
      },
      {
        title: 'Tempo et contrôle',
        content: 'La vitesse d’exécution d’une répétition influence le stimulus. La phase excentrique (la descente de la charge) devrait en particulier être contrôlée — ne pas laisser tomber le poids, mais le freiner activement. Cela maintient la tension sur le muscle et améliore le contrôle.\n\nUne erreur fréquente est le recours à l’élan. Qui arrache la charge par des mouvements saccadés transfère le travail des muscles vers l’élan et réduit ainsi l’effet d’entraînement. Des répétitions contrôlées et conscientes sont presque toujours plus efficaces que des répétitions rapides et brouillonnes.\n\nCela ne veut pas dire que chaque répétition doit être extrêmement lente. Un repère utile : phase concentrique (la montée) rapide mais contrôlée, phase excentrique (la descente) sur environ deux à trois secondes. L’accent reste toujours sur le ressenti conscient et le pilotage du muscle visé.',
      },
      {
        title: 'Erreurs fréquentes et comment les corriger',
        content: 'L’erreur la plus fréquente est trop de charge au détriment de la technique. Si les dernières répétitions ne passent qu’avec de l’élan, des compensations ou une amplitude incomplète, la charge est trop lourde. La solution est simple : réduire et exécuter le mouvement proprement.\n\nUne deuxième erreur est de négliger la phase excentrique. Beaucoup laissent la charge redescendre sans contrôle et gaspillent ainsi une grande partie du stimulus. Un freinage conscient corrige cela immédiatement.\n\nUn troisième point est le manque d’attention au muscle visé. La « connexion muscle-esprit » — la concentration consciente sur le muscle qui travaille — peut améliorer l’activation, surtout sur les exercices d’isolation. Des vidéos de sa propre exécution ou le retour de pratiquants expérimentés aident à repérer et corriger les défauts techniques.',
      },
      {
        title: 'En résumé',
        content: 'Une technique propre sur une amplitude complète est la base d’un entraînement efficace et sûr. Elle garantit que le muscle visé reçoit le stimulus et protège les articulations.\n\nVise la plus grande amplitude contrôlée possible, exécute consciemment la phase excentrique en particulier et renonce à l’élan. La technique passe toujours avant la charge — ce n’est qu’une fois le mouvement maîtrisé qu’augmenter le poids a du sens.\n\nUne bonne technique n’est pas une affaire ponctuelle, mais une priorité permanente. Qui l’entretient s’entraîne plus efficacement, reste plus longtemps sans blessure et pose les fondations d’un progrès continu.',
      },
    ],
  },

  periodization: {
    name: 'Périodisation et planification',
    summary: 'La périodisation est la structuration réfléchie de l’entraînement dans le temps — avec des phases alternées de volume, d’intensité et de récupération. Elle aide à éviter les plateaux, à prévenir le surentraînement et à progresser continuellement sur la durée.',
    quick: [
      { label: 'Idée centrale', text: 'Planifier l’entraînement en phases plutôt que s’entraîner à l’identique chaque semaine.' },
      { label: 'Pour qui', text: 'Surtout les confirmés ; les débutants s’en sortent longtemps avec une simple progression linéaire.' },
    ],
    sections: [
      {
        title: 'Qu’est-ce que la périodisation ?',
        content: 'La périodisation est la planification systématique de l’entraînement sur différentes périodes. Plutôt que de s’entraîner de façon identique semaine après semaine, on fait varier délibérément des variables comme le volume, l’intensité, les plages de répétitions et le choix des exercices, afin de progresser sur la durée et de piloter la fatigue.\n\nLe concept vient à l’origine du sport de haut niveau et remonte aux travaux de Leonid Matveïev et Tudor Bompa. Le but était d’amener les athlètes au sommet de leur forme pour des compétitions précises. Mais l’idée sous-jacente — alterner charge et récupération de façon planifiée — est utile à tout pratiquant.\n\nOn distingue souvent le macrocycle (le plan complet sur des mois jusqu’à un an), le mésocycle (des blocs de plusieurs semaines avec un axe principal) et le microcycle (le plus souvent une semaine d’entraînement). Cette structure aide à découper le grand objectif en étapes lisibles qui se construisent l’une sur l’autre.',
      },
      {
        title: 'Les modèles de périodisation',
        content: 'Plusieurs modèles sont établis. La périodisation linéaire commence par un volume élevé et une intensité basse et se déplace au fil des semaines vers moins de volume et plus d’intensité — classiquement d’une phase d’hypertrophie vers une phase de force.\n\nLa périodisation ondulatoire fait varier la charge sur des intervalles plus courts, souvent d’une séance à l’autre dans la semaine — par exemple un jour lourd à faibles répétitions, un autre modéré et un troisième à répétitions élevées. Une méta-analyse suggère que les deux modèles sont efficaces et que les différences sont souvent faibles en pratique (Williams et al., 2017, Sports Medicine).\n\nLa périodisation par blocs se concentre plusieurs semaines durant sur un seul axe (par exemple un bloc de volume, suivi d’un bloc d’intensité). Le modèle le mieux adapté dépend des objectifs, de l’expérience et des préférences — l’essentiel est d’avoir un plan avec une variation délibérée.',
      },
      {
        title: 'Les débutants ont-ils besoin de périodisation ?',
        content: 'Pour les débutants, une périodisation complexe est le plus souvent superflue. Dans les premiers mois, le corps réagit si fortement à tout stimulus qu’une simple progression linéaire — un peu plus de charge ou de répétitions chaque semaine — apporte déjà d’excellents progrès. Cette phase est souvent appelée « novice gains ».\n\nCe n’est que lorsque cette progression initiale rapide s’aplatit, typiquement après quelques mois jusqu’à environ un an d’entraînement régulier, qu’une structure plus réfléchie devient vraiment utile. Des phases alternées aident alors à continuer de créer un stimulus sans tomber dans le surentraînement ou la stagnation.\n\nPour les débutants, donc : régularité, bonne technique et progression simple battent toute planification compliquée. La périodisation est un outil pour les confirmés, pas une obligation pour débuter.',
      },
      {
        title: 'Construire un plan simple',
        content: 'Un bon plan d’entraînement part des objectifs et du temps disponible. Il en découle la fréquence (par exemple 3 à 4 séances par semaine) et la répartition — full body avec peu de séances, ou un split haut/bas du corps voire push-pull-jambes avec davantage de séances.\n\nSur cette base, on répartit exercices et volume, de sorte que chaque groupe musculaire soit idéalement entraîné deux fois par semaine avec au total environ 10 à 20 séries dures. Les mouvements de base (squat, soulevé de terre, développé couché et militaire, tractions, rowing) forment le socle, complétés par des exercices d’isolation pour les points faibles.\n\nAu fil des semaines, on progresse (plus de charge ou de répétitions) et l’on peut prévoir une semaine de décharge toutes les 4 à 8 semaines environ. Un plan n’a pas besoin d’être compliqué — il doit convenir à ta vie, être appliqué avec régularité et ajusté régulièrement d’après les progrès.',
      },
      {
        title: 'En résumé',
        content: 'La périodisation est la variation planifiée de l’entraînement dans le temps, afin d’éviter plateaux et surentraînement. Les modèles courants sont le linéaire, l’ondulatoire et le bloc — en pratique, les différences sont souvent plus faibles qu’on ne le pense.\n\nLes débutants n’ont pas besoin de périodisation complexe ; une simple progression linéaire les porte loin sur les premiers mois. Seuls les confirmés profitent nettement de phases planifiées.\n\nLe plus important est un plan adapté aux objectifs et au quotidien, qui entraîne convenablement chaque groupe musculaire, progresse et prévoit de la récupération. Structure et régularité battent n’importe quelle méthode « parfaite ».',
      },
    ],
  },
};
