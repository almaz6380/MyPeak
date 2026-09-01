// Französische Fassung von `src/data/nutritionKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    grundlagen: 'Fondamentaux',
    makros: 'Macronutriments',
    mikros: 'Micronutriments',
    praxis: 'Pratique',
  },

  energy_balance: {
    name: 'Balance énergétique et calories',
    summary: 'La balance énergétique — calories absorbées contre calories dépensées — détermine si tu prends ou perds du poids. C’est le principe le plus fondamental de la nutrition, celui qui prime sur tous les autres détails.',
    quick: [
      { label: 'Idée centrale', text: 'Déficit → perte, surplus → prise, entretien → poids stable. Les calories sont reines.' },
      { label: 'En pratique', text: 'Estimer grossièrement la DEJT, fixer un objectif, observer 2 à 3 semaines, puis ajuster.' },
    ],
    sections: [
      {
        title: 'Le principe de la balance énergétique',
        content: 'La balance énergétique décrit le rapport entre l’énergie que tu absorbes par l’alimentation et celle que ton corps dépense. Si tu absorbes plus que tu ne dépenses (surplus), le corps stocke l’énergie excédentaire — surtout sous forme de gras. Si tu dépenses plus que tu n’absorbes (déficit), il puise dans ses réserves et tu perds du poids.\n\nCe principe repose sur le premier principe de la thermodynamique : l’énergie ne se perd pas, elle se transforme. De nombreuses études contrôlées confirment que la balance énergétique est le facteur décisif des variations de poids — indépendamment des aliments dont proviennent les calories (Hall et Guo, 2017, Gastroenterology).\n\nCela ne veut pas dire que la qualité des aliments est indifférente. Elle influence la satiété, la santé, la performance et la facilité avec laquelle on tient un niveau calorique donné. Mais pour la seule question « prendre ou perdre du poids », c’est le bilan calorique total qui tranche.',
      },
      {
        title: 'Les composantes de la dépense calorique',
        content: 'La dépense énergétique journalière totale (DEJT) se compose de quatre parties. Le métabolisme de base (MB) en représente la plus grande part, 60 à 70 % — c’est l’énergie dont le corps a besoin au repos pour les fonctions vitales comme la respiration, la circulation et le métabolisme cellulaire.\n\nLa thermogenèse induite par l’alimentation (TIA) compte pour environ 10 % : l’énergie dépensée pour digérer et transformer les aliments. Les protéines ont l’effet thermique le plus élevé — une des raisons pour lesquelles une alimentation riche en protéines aide à perdre du poids.\n\nLa troisième partie, la plus variable, est l’activité. On distingue le sport (EAT) et l’activité du quotidien (NEAT — thermogenèse de l’activité non sportive) : marcher, gigoter, rester debout. Le NEAT peut varier de plusieurs centaines de calories par jour d’une personne à l’autre et s’adapte souvent inconsciemment à un déficit calorique, en réduisant les mouvements.',
      },
      {
        title: 'Estimer ses besoins caloriques',
        content: 'Pour estimer tes besoins, tu calcules d’abord le métabolisme de base, par exemple avec la formule de Mifflin-St Jeor, et tu le multiplies par un facteur d’activité (1,2 pour très peu actif jusqu’à environ 1,9 pour très actif). Le résultat est ta DEJT estimée — la quantité de calories à laquelle ton poids reste stable.\n\nImportant : de telles formules ne donnent que des approximations. La dépense réelle peut s’en écarter de 10 à 20 % selon les individus. La valeur de départ n’est donc qu’un point de départ, pas une feuille de route exacte.\n\nLa voie la plus fiable est d’observer son poids sur deux à trois semaines à apport calorique constant. S’il reste stable, tu as trouvé tes besoins d’entretien. S’il monte ou descend, tu ajustes les calories d’environ 200 à 300. Tu calibres ainsi la théorie sur ta réalité.',
      },
      {
        title: 'Malentendus fréquents',
        content: 'Une erreur répandue est de croire à un métabolisme « cassé » ou extrêmement lent. Les vrais troubles métaboliques sont rares ; le plus souvent, on surestime sa dépense et on sous-estime son apport. Des études montrent que les gens sous-évaluent souvent leur apport calorique de 20 à 50 % (Lichtman et al., 1992, New England Journal of Medicine).\n\nDeuxième erreur : certains aliments « relanceraient le métabolisme » et feraient fondre le gras. De tels effets sont minimes et ne changent rien à l’équation de base. Aucun aliment ni boisson ne contourne la balance énergétique.\n\nTroisièmement, l’adaptation métabolique est réelle mais limitée : en déficit prolongé, la dépense baisse un peu (thermogenèse adaptative), mais cela n’explique pas des plateaux complets. Qui ne perd pas de poids alors qu’il se croit en déficit mange en général plus qu’il ne le pense.',
      },
      {
        title: 'En résumé',
        content: 'La balance énergétique est le fondement de toute alimentation : un déficit fait perdre, un surplus fait prendre, l’entretien maintient le poids. Tous les autres détails — macros, timing, choix des aliments — agissent à l’intérieur de ce cadre.\n\nEstime tes besoins avec une formule, mais ne considère la valeur que comme un point de départ et calibre-la sur l’évolution réelle du poids. Mesure et ajuste, plutôt que de t’en remettre à la seule théorie.\n\nLa qualité des aliments, les protéines et la satiété déterminent le confort et la santé avec lesquels tu tiens un niveau calorique — mais c’est le bilan qui décide si tu prends ou perds. Comprendre ce principe te rend indépendant des modes diététiques.',
      },
    ],
  },

  protein: {
    name: 'Protéines',
    summary: 'Les protéines sont le macronutriment le plus important pour construire et préserver le muscle. Elles rassasient le plus, ont l’effet thermique le plus élevé et protègent la musculature quand on perd du poids. Pour les pratiquants, environ 1,6 à 2,2 g par kilo de poids corporel sont idéaux.',
    quick: [
      { label: 'Quantité cible', text: 'Env. 1,6 à 2,2 g par kg de poids corporel et par jour ; plutôt le haut de la fourchette en perte de poids.' },
      { label: 'Sources', text: 'Viande, poisson, œufs, produits laitiers, légumineuses, tofu, whey ou poudre protéinée.' },
    ],
    sections: [
      {
        title: 'Pourquoi les protéines sont si importantes',
        content: 'Les protéines sont faites d’acides aminés, les briques des muscles, des enzymes, des hormones et de pratiquement toute structure du corps. Neuf de ces acides aminés sont essentiels — le corps ne peut pas les fabriquer, ils doivent venir de l’alimentation.\n\nPour les sportifs, les protéines sont particulièrement décisives, car elles stimulent la synthèse protéique musculaire — le processus par lequel de la masse musculaire se construit après l’entraînement. Sans protéines en quantité suffisante, même un entraînement dur ne se transforme guère en croissance musculaire.\n\nElles ont en outre deux avantages pratiques pour le contrôle du poids : elles rassasient plus que les glucides ou les lipides et ont l’effet thermique le plus élevé (environ 20 à 30 % des calories protéiques sont consommées à la digestion). Les deux en font le macronutriment le plus précieux quand on perd du poids.',
      },
      {
        title: 'De combien de protéines as-tu besoin ?',
        content: 'La quantité officielle minimale pour éviter une carence est de 0,8 g par kilo de poids corporel — mais on est loin de l’optimum pour un sportif. Une vaste méta-analyse de Morton et al. (2018, British Journal of Sports Medicine) a trouvé qu’environ 1,6 g/kg apportent le plus grand bénéfice pour la prise de muscle, avec un gain supplémentaire possible jusqu’à environ 2,2 g/kg.\n\nEn perte de poids, le haut de la fourchette est plus indiqué. En déficit calorique, les besoins montent, car les protéines protègent la musculature de la dégradation. Helms et al. (2014) recommandent pour les athlètes en déficit jusqu’à 2,3 à 3,1 g par kilo de masse maigre.\n\nPour la plupart des pratiquants, un repère simple d’environ 2 g par kilo de poids corporel est pratique et efficace. Davantage ne nuit pas aux personnes en bonne santé, mais n’apporte guère de bénéfice supplémentaire.',
      },
      {
        title: 'Qualité et répartition',
        content: 'Toutes les sources de protéines ne se valent pas. La « qualité » dépend de la teneur en acides aminés essentiels, en particulier la leucine, et de la digestibilité. Les sources animales (viande, poisson, œufs, produits laitiers) sont le plus souvent complètes ; les sources végétales sont souvent limitées en certains acides aminés, mais se complètent par association (par exemple légumineuses plus céréales).\n\nLa répartition sur la journée joue aussi. La synthèse protéique musculaire est stimulée au maximum par environ 20 à 40 g de protéines de qualité par repas. Il est donc judicieux de répartir les protéines sur trois à cinq repas plutôt que de tout manger en une fois.\n\nEn pratique : chaque repas principal devrait contenir une bonne source de protéines. La quantité totale sur la journée reste toutefois le facteur le plus important — la répartition parfaite passe après l’atteinte de l’objectif journalier.',
      },
      {
        title: 'Mythes et sécurité',
        content: 'Un mythe tenace veut que beaucoup de protéines abîment les reins. Chez les personnes en bonne santé, ce n’est pas démontré — des études contrôlées ne montrent aucun effet négatif d’un apport protéique élevé sur la fonction rénale (Devries et al., 2018, Journal of Nutrition). Seule une maladie rénale existante impose un avis médical.\n\nAutre mythe : le corps ne pourrait « utiliser » qu’environ 30 g de protéines par repas. En réalité, davantage est digéré et utilisé — seul le stimulus aigu sur la synthèse protéique musculaire s’aplatit. Des portions plus grosses ne sont donc pas gaspillées.\n\nLes poudres protéinées comme la whey sont pratiques, mais pas obligatoires. Ce sont simplement une source de protéines commode et peu coûteuse. Qui couvre ses besoins avec des aliments normaux n’a pas besoin de compléments — ce sont des outils, pas des remèdes miracles.',
      },
      {
        title: 'En résumé',
        content: 'Les protéines sont le macronutriment clé pour la prise et le maintien du muscle et pour la satiété. Pour les pratiquants, environ 1,6 à 2,2 g par kilo de poids corporel sont idéaux, plutôt le haut de la fourchette en perte de poids.\n\nMise sur des sources de qualité, répartis les protéines sur plusieurs repas et atteins surtout ton objectif journalier. Animal ou végétal importe peu, tant que la quantité et la qualité totales sont là.\n\nLes mises en garde répandues contre « trop » de protéines sont sans fondement pour les personnes en bonne santé. C’est le macronutriment où la précision paie le plus — celui qui fait la plus grande différence sur la composition corporelle et la satiété.',
      },
    ],
  },

  carbs: {
    name: 'Glucides',
    summary: 'Les glucides sont la principale source d’énergie pour l’entraînement intense. Ils ne font pas grossir en soi — c’est le bilan calorique total qui décide. Leur qualité, leur quantité et leur timing peuvent toutefois influencer nettement la performance et le bien-être.',
    quick: [
      { label: 'Fonction', text: 'Carburant principal des efforts intenses ; ils remplissent les réserves de glycogène des muscles et du foie.' },
      { label: 'En pratique', text: 'Surtout des sources riches en fibres et peu transformées ; la quantité s’ajuste à l’activité.' },
    ],
    sections: [
      {
        title: 'Ce que les glucides font dans le corps',
        content: 'Les glucides sont décomposés en glucose, le carburant privilégié du travail musculaire intense et la principale source d’énergie du cerveau. Le glucose excédentaire est stocké sous forme de glycogène dans les muscles et le foie — une réserve d’énergie rapidement disponible.\n\nLors d’un entraînement de force ou par intervalles intense, le corps puise fortement dans ce glycogène musculaire. Des réserves bien remplies signifient plus de performance, plus de répétitions et une meilleure qualité d’entraînement. Avec un apport glucidique faible sur une longue période, ces réserves peuvent se vider en partie et la performance baisser dans les hautes intensités.\n\nLes glucides ne sont toutefois pas essentiels au sens strict — le corps peut fabriquer du glucose lui-même. Pour la performance sportive et le bien-être, ils restent néanmoins très utiles à la plupart des gens, surtout en entraînement intense.',
      },
      {
        title: 'Qualité : glucides complexes ou simples',
        content: 'Les sources de glucides diffèrent fortement par leurs effets. Les sources riches en fibres et peu transformées, comme les produits complets, les légumineuses, les fruits et les légumes, sont digérées plus lentement, rassasient mieux et apportent des micronutriments. Les sources très transformées comme le sucre et les produits à base de farine blanche sont absorbées vite et ne rassasient guère.\n\nLes fibres méritent une attention particulière. Elles favorisent la digestion, nourrissent les bactéries intestinales et améliorent la satiété. On recommande environ 25 à 35 g par jour, un seuil que beaucoup de gens n’atteignent pas. Une alimentation riche en fibres est associée à une meilleure santé et à un contrôle du poids plus facile.\n\nCela ne veut pas dire que les glucides simples sont interdits. Autour de l’entraînement, des glucides rapidement disponibles peuvent même être utiles. Au quotidien, la majeure partie devrait toutefois venir de sources riches en nutriments et en fibres.',
      },
      {
        title: 'Combien de glucides ?',
        content: 'Après les protéines et les lipides, tu peux remplir avec des glucides les calories restantes de ton objectif. Il n’existe pas de quantité « juste » fixe — elle dépend de l’activité, des préférences et des objectifs. Les personnes très actives profitent de davantage de glucides, les moins actives s’en sortent avec moins.\n\nPour ceux qui s’entraînent intensément, on cite souvent 3 à 5 g par kilo de poids corporel ou plus. Qui fait peu de sport ou préfère une alimentation plus pauvre en glucides peut se situer nettement en dessous, sans inconvénient — tant que les protéines et les calories totales sont au rendez-vous.\n\nLes régimes low-carb et cétogènes fonctionnent aussi bien pour perdre du poids que les approches plus riches en glucides, à calories égales. Ce ne sont pas des brûle-graisses magiques, mais une option légitime pour ceux qui s’y sentent mieux ou y trouvent plus de satiété.',
      },
      {
        title: 'Le mythe de l’insuline',
        content: 'Un mythe très répandu veut que les glucides fassent grossir par la seule sécrétion d’insuline. L’insuline est une hormone de stockage qui monte après les repas riches en glucides — d’où la théorie selon laquelle les glucides seraient la vraie cause de la prise de gras.\n\nLes études contrôlées la réfutent clairement. À calories et protéines égales, une alimentation pauvre en glucides n’entraîne pas plus de perte de gras qu’une alimentation riche en glucides (Hall et al., 2016, American Journal of Clinical Nutrition). L’insuline pilote des processus de stockage à court terme, mais ne contourne pas le bilan énergétique global.\n\nChez les personnes en bonne santé, des réponses insuliniques normales aux glucides sont sans aucun problème. C’est différent en cas de diabète ou d’insulinorésistance — la gestion des glucides est alors médicalement pertinente et doit être encadrée par un médecin.',
      },
      {
        title: 'En résumé',
        content: 'Les glucides sont le carburant principal de l’entraînement intense et ne font nullement grossir en soi — c’est le bilan calorique qui décide. Ils remplissent les réserves de glycogène et soutiennent performance et récupération.\n\nChoisis surtout des sources riches en fibres et peu transformées, et ajuste la quantité à ton activité. Autour de l’entraînement, des glucides plus rapides peuvent être utiles.\n\nNi le low-carb ni le high-carb ne sont supérieurs par principe — les deux fonctionnent avec des calories adaptées. Choisis l’approche dans laquelle tu te sens bien, tu t’entraînes bien et que tu tiens sur la durée.',
      },
    ],
  },

  fats: {
    name: 'Lipides',
    summary: 'Les lipides alimentaires sont essentiels aux hormones, aux membranes cellulaires et à l’absorption des vitamines liposolubles. Un minimum est important pour la santé ; le type de graisse compte plus que la seule quantité.',
    quick: [
      { label: 'Quantité minimale', text: 'Ne pas descendre durablement sous ~0,5 à 0,8 g par kg de poids corporel (fonction hormonale).' },
      { label: 'Qualité', text: 'Privilégier les graisses insaturées (huile d’olive, noix, poisson) ; éviter les graisses trans.' },
    ],
    sections: [
      {
        title: 'Le rôle des lipides alimentaires',
        content: 'La graisse est bien plus qu’un vecteur d’énergie. Elle est un composant de chaque membrane cellulaire, un point de départ des hormones stéroïdiennes comme la testostérone et les œstrogènes, et elle est nécessaire à l’absorption des vitamines liposolubles A, D, E et K. Une alimentation trop pauvre en graisses peut donc altérer la production hormonale et l’absorption des nutriments.\n\nAvec 9 calories par gramme, la graisse est le macronutriment le plus dense en énergie — plus du double des protéines ou des glucides (4 kcal chacun). Il est donc facile d’absorber sans le vouloir beaucoup de calories via les lipides, d’où l’intérêt d’y prêter attention en perte de poids.\n\nDeux acides gras sont essentiels : les oméga-3 et les oméga-6. Le corps ne peut pas les fabriquer. Les oméga-3 issus des poissons gras en particulier manquent à beaucoup de gens et sont associés à de nombreux bénéfices pour la santé.',
      },
      {
        title: 'Les types de graisses',
        content: 'Les graisses insaturées sont considérées comme particulièrement favorables. Les mono-insaturées (huile d’olive, avocat, noix) et les poly-insaturées (poisson gras, graines de lin, noix) soutiennent la santé cardiovasculaire et apportent les acides gras essentiels. Elles devraient constituer la majeure partie de l’apport lipidique.\n\nLes graisses saturées (dans la viande, le beurre, l’huile de coco) ne sont pas nocives en soi, mais devraient être consommées avec modération. Les recommandations de la plupart des sociétés savantes sont d’en rester sous 10 % des calories totales. Les données sur leur effet exact font débat, mais remplacer une partie par des graisses insaturées est considéré comme avantageux.\n\nLes graisses trans artificielles sont le seul type qu’il faut clairement éviter. Elles apparaissent lors de l’hydrogénation industrielle des huiles et sont fortement liées aux maladies cardiovasculaires. Dans beaucoup de pays, elles sont désormais très encadrées ou interdites.',
      },
      {
        title: 'Combien de lipides ?',
        content: 'Contrairement aux protéines, c’est surtout une limite basse qu’il faut surveiller pour les lipides. Une alimentation durablement très pauvre en graisses (moins d’environ 0,5 g par kilo de poids corporel) peut, chez certaines personnes, altérer la production hormonale. Un minimum raisonnable se situe autour de 0,5 à 0,8 g par kilo.\n\nVers le haut, les lipides sont souples. Une fois les protéines fixées, les calories restantes peuvent être réparties entre lipides et glucides selon les préférences. Certains se sentent mieux avec plus de gras et moins de glucides, d’autres l’inverse — les deux sont acceptables pour la santé.\n\nLes recommandations typiques se situent autour de 20 à 35 % des calories totales issues des lipides. Plus important que le pourcentage exact : couvrir le minimum, choisir majoritairement des graisses de qualité et garder un œil sur les calories totales.',
      },
      {
        title: 'Zoom sur les oméga-3',
        content: 'Parmi les graisses, les acides gras oméga-3 EPA et DHA méritent une attention particulière. Ils régulent l’inflammation et sont associés à une meilleure santé cardiovasculaire et cérébrale. La principale source est le poisson gras d’eau froide comme le saumon, le maquereau et le hareng.\n\nBeaucoup de gens consomment trop peu d’oméga-3 et en même temps beaucoup d’oméga-6 (issus d’huiles transformées), ce qui déplace le rapport de façon défavorable. Deux à trois portions de poisson gras par semaine améliorent nettement l’apport.\n\nQui ne mange pas de poisson peut envisager un complément d’huile d’algues ou de poisson. Les sources végétales d’oméga-3 (graines de lin, noix) apportent de l’ALA, que le corps ne convertit que de façon limitée en EPA et DHA, les formes actives. Pour toute question de santé liée à la supplémentation, un avis médical est judicieux.',
      },
      {
        title: 'En résumé',
        content: 'Les lipides sont essentiels aux hormones, aux membranes cellulaires et à l’absorption des vitamines. Ne descends pas durablement sous environ 0,5 à 0,8 g par kilo de poids corporel, sinon la fonction hormonale et le bien-être peuvent en souffrir.\n\nLa qualité compte : privilégie les graisses insaturées de l’huile d’olive, des noix, de l’avocat et du poisson gras, garde les graisses saturées modérées et évite les graisses trans artificielles. Veille en particulier à un apport suffisant en oméga-3.\n\nAu-delà du minimum, la quantité de lipides est souple et affaire de goût. Choisis la répartition entre lipides et glucides qui convient à tes préférences, avec des calories totales justes.',
      },
    ],
  },

  micronutrients: {
    name: 'Vitamines et minéraux',
    summary: 'Les micronutriments n’apportent pas d’énergie, mais sont indispensables à d’innombrables fonctions du corps. Une alimentation variée et complète couvre le plus souvent les besoins — quelques nutriments méritent toutefois une attention particulière.',
    quick: [
      { label: 'Règle de base', text: 'La variété de légumes, fruits, céréales complètes et sources de protéines couvre la plupart des micronutriments.' },
      { label: 'À surveiller', text: 'Vitamine D, oméga-3, éventuellement fer (femmes), B12 (véganes), iode, magnésium.' },
    ],
    sections: [
      {
        title: 'Ce que sont les micronutriments',
        content: 'Les micronutriments regroupent les vitamines et les minéraux, dont le corps n’a besoin qu’en petites quantités — à la différence des macronutriments (protéines, glucides, lipides) qui apportent de l’énergie. Bien qu’ils n’aient pas de calories, ils interviennent dans pratiquement tous les processus métaboliques : production d’énergie, fonction immunitaire, santé osseuse, transport de l’oxygène et bien d’autres.\n\nUne carence en micronutriments peut s’installer insidieusement — fatigue, moins bonne récupération, sensibilité aux infections ou baisse de performance. C’est en alimentation hypocalorique ou déséquilibrée que le risque de sous-approvisionnement augmente le plus.\n\nLa bonne nouvelle : une alimentation variée, riche en légumes, fruits, produits complets, bonnes sources de protéines et bonnes graisses couvre naturellement la plupart des besoins. La diversité alimentaire est la meilleure assurance contre les carences.',
      },
      {
        title: 'Les nutriments critiques à surveiller',
        content: 'Certains micronutriments manquent souvent, même avec une bonne alimentation. La vitamine D est surtout produite grâce à la lumière du soleil et fait défaut dans beaucoup de régions, en particulier l’hiver. Une supplémentation y est souvent judicieuse, idéalement après une prise de sang.\n\nLe fer concerne surtout les femmes menstruées, les pertes sanguines régulières augmentant les besoins. Une carence se manifeste par de la fatigue et une baisse de performance. La vitamine B12 ne se trouve presque que dans les produits animaux — les personnes véganes doivent impérativement la supplémenter.\n\nD’autres nutriments souvent limites sont l’iode, le magnésium, le zinc et les oméga-3. Plutôt que de tout supplémenter au hasard, il est plus judicieux d’examiner ses propres besoins de façon ciblée — idéalement par des analyses sanguines et en accord avec un médecin.',
      },
      {
        title: 'Les aliments avant les compléments',
        content: 'En principe : les aliments complets sont préférables aux compléments alimentaires. Ils apportent les micronutriments dans leur ensemble naturel, avec fibres, composés végétaux secondaires et autres substances qui agissent ensemble. Une vitamine isolée en comprimé ne peut pas remplacer cette complexité.\n\nLes études sur les préparations vitaminiques isolées montrent souvent des bénéfices décevants voire nuls chez des personnes en bonne santé sans carence — parfois même des inconvénients en cas de surdosage. Plus n’est pas mieux : les vitamines liposolubles (A, D, E, K) peuvent s’accumuler et devenir nocives à forte dose.\n\nLes compléments sont utiles lorsqu’il existe une carence réelle ou un besoin accru — par exemple la vitamine D en hiver, la B12 en alimentation végane ou le fer en cas de carence avérée. Comme complément ciblé ils sont utiles ; comme substitut à une bonne alimentation, non.',
      },
      {
        title: 'Mise en pratique',
        content: 'La stratégie la plus simple pour un bon apport en micronutriments s’appelle variété et couleur. Des légumes et des fruits de couleurs différentes apportent des vitamines et des composés végétaux différents — « mange l’arc-en-ciel » est un repère pratique.\n\nConcrètement, il aide de prévoir des légumes à chaque repas principal, d’intégrer régulièrement légumineuses, noix et graines, de faire tourner différentes sources de protéines et de préférer les produits complets aux produits très transformés. Une base nutritionnelle large en découle presque automatiquement.\n\nQui mange beaucoup de produits transformés et de façon monotone risque des carences malgré des calories suffisantes — un phénomène parfois décrit comme « suralimenté et sous-nourri ». La qualité des aliments est donc la clé d’un apport robuste en micronutriments.',
      },
      {
        title: 'En résumé',
        content: 'Les micronutriments n’apportent pas d’énergie, mais sont indispensables à la santé, à la récupération et à la performance. Une alimentation variée et complète couvre les besoins de la plupart des vitamines et minéraux.\n\nMéritent une attention particulière la vitamine D, les oméga-3, ainsi que, selon les situations, le fer, la B12, l’iode et le magnésium. Plutôt que de supplémenter en bloc, il vaut la peine de regarder ses propres besoins de façon ciblée, idéalement via des analyses sanguines.\n\nLes aliments complets passent avant les compléments. Variété et couleur dans l’assiette sont la meilleure et la plus simple des stratégies pour un bon apport en micronutriments.',
      },
    ],
  },

  meal_timing: {
    name: 'Timing des repas',
    summary: 'Quand et à quelle fréquence tu manges compte bien moins que quoi et combien. Le timing peut affiner performance et bien-être, mais ne remplace jamais les fondamentaux que sont les calories et les protéines.',
    quick: [
      { label: 'Priorité', text: 'Calories totales et protéines d’abord — le timing est une finition, pas un fondement.' },
      { label: 'Utile', text: 'Répartir les protéines sur la journée ; manger suffisamment autour de l’entraînement.' },
    ],
    sections: [
      {
        title: 'Remettre les choses à leur place',
        content: 'Beaucoup de mythes entourent le timing des repas — de la « fenêtre anabolique » juste après l’entraînement à l’interdiction de manger des glucides le soir. En réalité, le timing est un facteur de finition, qui ne compte que lorsque les fondamentaux sont en place : calories totales, protéines et qualité des aliments.\n\nLa hiérarchie de la nutrition est claire : d’abord la balance énergétique, puis les macronutriments (les protéines surtout), puis la qualité des aliments et les micronutriments — et seulement ensuite le timing et la fréquence des repas. Qui néglige les étages supérieurs ne peut rien sauver par un timing parfait.\n\nCela ne veut pas dire que le timing est inutile. Il peut améliorer la performance, la satiété et le bien-être. Mais c’est le dernier et le plus petit levier — pas une raison de stresser ou de se donner des règles compliquées.',
      },
      {
        title: 'La « fenêtre anabolique »',
        content: 'Longtemps, la règle a voulu qu’il faille prendre protéines et glucides juste après l’entraînement, faute de quoi l’effet de la séance s’évaporerait. Cette « fenêtre anabolique » étroite s’est révélée exagérée.\n\nUne méta-analyse de Schoenfeld, Aragon et Krieger (2013, Journal of the International Society of Sports Nutrition) a trouvé que le moment exact de l’apport protéique autour de l’entraînement compte bien moins que la quantité totale de protéines de la journée. La « fenêtre » est large de plusieurs heures plutôt que de quelques minutes.\n\nEn pratique : tant que tu manges assez de protéines réparties sur la journée et que tu n’es pas complètement à jeun de longues heures avant et après la séance, tu n’as pas à te précipiter. Qui s’entraîne à jeun peut profiter d’un repas assez proche de la fin de la séance — davantage pour des raisons pratiques que par urgence physiologique.',
      },
      {
        title: 'Fréquence des repas et jeûne intermittent',
        content: 'Que tu manges trois gros repas ou six petits n’a guère d’influence sur le métabolisme ou la perte de gras, tant que calories et protéines restent identiques. La vieille croyance selon laquelle des petits repas fréquents « relanceraient le métabolisme » est réfutée — l’effet thermique dépend de la quantité totale, pas de la fréquence.\n\nLe jeûne intermittent (par exemple 16:8) est populaire et constitue pour beaucoup un outil utile pour piloter l’apport calorique. Ce n’est toutefois pas un brûle-graisse magique : à calories égales, il n’entraîne pas plus de perte de gras qu’une alimentation répartie uniformément. Son intérêt tient surtout au fait que certaines personnes restent ainsi plus facilement en déficit.\n\nLa meilleure fréquence de repas est celle qui convient à ton quotidien, te rassasie bien et que tu tiens. Pour la prise de muscle, il est judicieux de répartir les protéines sur au moins trois à quatre portions — au-delà, la fréquence est affaire de goût.',
      },
      {
        title: 'Un timing utile en pratique',
        content: 'Même si le timing est secondaire, quelques points restent pratiques. Avant l’entraînement, un repas avec des glucides et un peu de protéines une à trois heures avant assure une bonne énergie et une bonne performance. Un estomac trop plein juste avant la séance peut en revanche être désagréable.\n\nAprès l’entraînement, un repas contenant protéines et glucides dans les quelques heures qui suivent est judicieux, pour soutenir la récupération et le remplissage du glycogène. Le moment exact est souple — ce n’est pas la fameuse seconde qui suit la dernière série.\n\nLe sommeil et la digestion profitent eux aussi du timing : des repas très copieux ou très épicés juste avant le coucher peuvent perturber le sommeil. Manger des glucides le soir n’expose toutefois à aucune prise de gras — c’est un mythe, tant que le bilan de la journée est juste.',
      },
      {
        title: 'En résumé',
        content: 'Le timing des repas est la finition de l’alimentation, pas son fondement. Calories totales et protéines déterminent l’essentiel du résultat ; timing et fréquence viennent après.\n\nLa « fenêtre anabolique » se compte en heures, pas en minutes. Fréquence des repas et jeûne intermittent se valent à calories égales — choisis ce qui convient à ton quotidien et te rassasie bien.\n\nCe qui est utile : répartir les protéines sur la journée et manger suffisamment autour de l’entraînement. Tout le reste relève de l’optimisation individuelle, pas de l’obligation. Ne te stresse pas avec le timing tant que les fondamentaux sont là.',
      },
    ],
  },
};
