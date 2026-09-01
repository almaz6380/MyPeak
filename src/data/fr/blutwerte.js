// Französische Fassung von `src/data/bloodworkKnowledge.js`.
// Schlüssel = `id` aus der Datendatei, Reihenfolge der `sections` muss
// übereinstimmen. Prüfen mit: node scripts/pruefe-inhalte.mjs
export default {
  kategorien: {
    hormone: 'Hormones',
    stoffwechsel: 'Métabolisme',
    vitamine: 'Vitamines et minéraux',
    herz: 'Cardiovasculaire',
  },

  testosterone: {
    name: 'Testostérone',
    summary: 'La testostérone est la principale hormone anabolisante ; elle influence la prise de muscle, la densité osseuse, la libido, l’humeur et l’énergie. Le taux peut être amélioré par le mode de vie — mais les promesses extrêmes sont à prendre avec précaution.',
    quick: [
      { label: 'Importance', text: 'Prise de muscle, densité osseuse, libido, entrain, humeur.' },
      { label: 'Favoriser naturellement', text: 'Musculation, bon sommeil, poids sain, assez de lipides et de micronutriments.' },
    ],
    sections: [
      {
        title: 'Ce que fait la testostérone dans le corps',
        content: 'La testostérone est la principale hormone sexuelle masculine, mais elle est aussi présente en plus petites quantités chez les femmes, où elle compte également. Elle fait partie des hormones anabolisantes (constructrices) et joue un rôle central pour la prise de muscle, la force, la densité osseuse, la répartition des graisses, la libido, l’humeur et l’énergie.\n\nChez l’homme, la testostérone est produite surtout dans les testicules, sous le pilotage d’une interaction entre le cerveau (hypothalamus, hypophyse) et les testicules. La production suit un rythme circadien avec des valeurs plus élevées le matin — d’où des prises de sang généralement effectuées en matinée.\n\nUn taux de testostérone sain soutient l’adaptation à la musculation et le bien-être général. Des valeurs trop basses comme des valeurs artificiellement très élevées (par exemple via des anabolisants) ont toutefois des conséquences sur la santé.',
      },
      {
        title: 'Valeurs de référence et mesure',
        content: 'La testostérone se mesure dans le sang, le plus souvent en testostérone totale ; la testostérone libre (biologiquement active) apporte une information complémentaire. Les intervalles de référence varient selon le laboratoire, l’âge et la méthode de mesure, si bien que les valeurs doivent toujours s’interpréter dans le contexte du laboratoire concerné et des symptômes.\n\nPour les hommes adultes, l’intervalle de référence de la testostérone totale se situe souvent entre 300 et 1000 ng/dl environ, mais les limites sont floues. Une valeur isolée n’est de plus qu’un instantané — heure de la journée, sommeil, stress et maladies aiguës peuvent l’influencer. En cas de valeur anormale, une nouvelle mesure est généralement demandée.\n\nIl est important de retenir qu’une valeur de laboratoire seule n’est pas un diagnostic. Seule la combinaison de symptômes (manque d’entrain, perte de libido, fonte musculaire) et de valeurs mesurées à plusieurs reprises permet une interprétation médicale pertinente.',
      },
      {
        title: 'Ce qui influence le taux de testostérone',
        content: 'De nombreux facteurs de mode de vie agissent sur le taux de testostérone. Le surpoids, en particulier la graisse abdominale, est associé à des valeurs plus basses ; une perte de poids peut les améliorer. Un manque de sommeil chronique abaisse la testostérone de façon mesurable — une seule semaine à cinq heures de sommeil peut nettement réduire les valeurs (Leproult et Van Cauter, 2011, JAMA).\n\nLa musculation et une activité physique suffisante ont un effet favorable à long terme, tandis qu’un surentraînement extrême ou des déficits caloriques très marqués peuvent abaisser la testostérone. Un apport suffisant en lipides alimentaires et en micronutriments comme le zinc et la vitamine D est également important pour la production hormonale — une alimentation très pauvre en graisses peut faire baisser les valeurs.\n\nLe stress chronique augmente le cortisol, qui agit à l’inverse de la testostérone. Un mode de vie sain, avec un bon sommeil, une alimentation équilibrée, un entraînement régulier et une gestion du stress, est donc la base naturelle la plus efficace pour un taux de testostérone sain.',
      },
      {
        title: 'Attentes réalistes et avis médical',
        content: 'Le marché regorge de « boosters de testostérone » promettant des hausses spectaculaires. La plupart de ces préparations n’ont, dans les études, aucun effet ou un effet minime chez les personnes aux valeurs normales. Un mode de vie sain relève une valeur basse plus efficacement que n’importe quel produit en vente libre — et avec des valeurs normales, la testostérone ne se « pousse » guère utilement.\n\nUn taux réellement trop bas (hypogonadisme) accompagné de symptômes correspondants est un diagnostic médical, à faire établir par un médecin et, le cas échéant, à traiter. Un traitement par testostérone relève exclusivement du médecin, car il doit peser soigneusement bénéfices et risques.\n\nL’usage de stéroïdes anabolisants de sa propre initiative pour améliorer la performance est vivement déconseillé : ils peuvent supprimer la production endogène et causer de graves dommages pour la santé. En cas de suspicion de problème hormonal, la bonne démarche est toujours de consulter un médecin.',
      },
    ],
  },

  vitamin_d_blood: {
    name: 'Vitamine D (25-OH)',
    summary: 'La valeur sanguine de vitamine D (25-OH-vitamine D) montre le statut en « vitamine du soleil ». Une carence est fréquente surtout en hiver et peut toucher les os, les muscles et le système immunitaire. Cette valeur peut être améliorée de façon ciblée.',
    quick: [
      { label: 'Ce qui est mesuré', text: '25-OH-vitamine D dans le sang — la valeur standard du statut en vitamine D.' },
      { label: 'Améliorer', text: 'Lumière du soleil, poisson gras, complément en cas de carence — dose pilotée par prise de sang.' },
    ],
    sections: [
      {
        title: 'Pourquoi la valeur de vitamine D est importante',
        content: 'La vitamine D agit dans le corps comme une hormone et joue un rôle central dans le métabolisme du calcium, la santé des os, la fonction musculaire et le système immunitaire. Comme le corps la fabrique lui-même sous l’effet du soleil, le statut dépend fortement de la saison, du lieu de vie et du mode de vie.\n\nLe meilleur marqueur du statut est la 25-hydroxy-vitamine D (25-OH-D) dans le sang. Elle reflète la forme de stockage et donne un aperçu fiable de l’état des dernières semaines. C’est exactement cette valeur qui est dosée lors d’une analyse sanguine.\n\nParce que la carence en vitamine D est très répandue et difficile à combler par la seule alimentation, cette valeur fait partie des analyses de routine les plus utiles — surtout pour les personnes vivant dans des régions septentrionales et pendant les mois peu ensoleillés.',
      },
      {
        title: 'Comprendre les valeurs de référence',
        content: 'Le statut en vitamine D est habituellement exprimé en nanogrammes par millilitre (ng/ml) ou en nanomoles par litre (nmol/l). En gros, beaucoup de laboratoires s’appuient sur la classification suivante : des valeurs inférieures à environ 20 ng/ml (50 nmol/l) sont considérées comme une carence, la plage au-dessus comme suffisante, les limites exactes variant selon les sociétés savantes.\n\nCes seuils font l’objet de débats et ne sont pas gravés dans le marbre. Certains experts jugent des cibles un peu plus élevées pertinentes, d’autres mettent en garde contre le surtraitement. L’essentiel est d’interpréter sa propre valeur dans la durée et en accord avec un médecin.\n\nUne valeur très basse explique parfois des troubles non spécifiques comme la fatigue, la faiblesse musculaire ou des infections fréquentes. Une valeur isolée doit toutefois toujours être vue dans l’ensemble du tableau — c’est un élément, pas un diagnostic complet.',
      },
      {
        title: 'Comment améliorer la valeur',
        content: 'La source la plus naturelle est la lumière du soleil : une exposition régulière et mesurée de la peau stimule la production endogène. Pendant les mois d’été, de courts moments à l’extérieur suffisent souvent, tandis qu’en hiver, aux latitudes nord, le rayonnement UV-B ne suffit pas.\n\nCôté alimentation, ce sont surtout le poisson gras (saumon, maquereau, hareng), le jaune d’œuf et les produits enrichis qui apportent de la vitamine D — mais généralement en quantités qui ne comblent pas à elles seules une carence. C’est pourquoi, en cas de carence avérée, un complément (vitamine D3) est souvent la solution la plus fiable.\n\nLa démarche la plus sensée est de piloter la dose du complément par la valeur sanguine : mesurer la valeur de départ, supplémenter, contrôler après quelques mois et ajuster. On reste ainsi dans une zone efficace et sûre. Comme la vitamine D est liposoluble et peut s’accumuler, les fortes doses doivent être suivies médicalement.',
      },
      {
        title: 'Mise en perspective et avis médical',
        content: 'La vitamine D est l’un des rares compléments d’une pertinence large et réelle — en même temps, il ne faut ni dramatiser une carence ni surestimer la vitamine D comme panacée. Elle ne résout pas tous les problèmes de santé, mais c’est un élément important.\n\nComme les vitamines liposolubles peuvent s’accumuler, une prise à forte dose sans contrôle n’est pas anodine. Des doses très élevées pendant longtemps peuvent conduire à un excès dangereux de calcium. D’où la règle : mesurer la valeur, supplémenter de façon ciblée et demander un avis médical en cas de doute.\n\nLa vitamine D illustre bien l’intérêt d’une démarche fondée sur les données : plutôt que de deviner, la prise de sang apporte de la clarté et permet une correction ciblée et sûre. Ces contenus ne remplacent toutefois pas un avis médical.',
      },
    ],
  },

  iron_ferritin: {
    name: 'Fer et ferritine',
    summary: 'Le fer est indispensable au transport de l’oxygène dans le sang. La ferritine indique les réserves de fer. Une carence — fréquente chez les femmes menstruées et les sportifs d’endurance — provoque fatigue et baisse de performance.',
    quick: [
      { label: 'Ce qui est mesuré', text: 'Ferritine (réserves), souvent avec hémoglobine, transferrine et coefficient de saturation.' },
      { label: 'Groupes à risque', text: 'Femmes menstruées, sportifs d’endurance, alimentation végétarienne ou végane.' },
    ],
    sections: [
      {
        title: 'Le rôle du fer',
        content: 'Le fer est un minéral essentiel et un composant central de l’hémoglobine, le pigment rouge du sang qui transporte l’oxygène des poumons vers tous les tissus. Sans fer en quantité suffisante, le corps ne peut pas former assez d’hémoglobine fonctionnelle, ce qui altère l’apport en oxygène.\n\nDans le muscle aussi, le fer joue un rôle via la myoglobine dans le stockage de l’oxygène, et il participe à la production d’énergie dans les cellules. Une carence en fer se répercute donc directement sur l’endurance, la force et la performance générale.\n\nLes symptômes typiques d’une carence sont la fatigue, la pâleur, l’essoufflement à l’effort, des difficultés de concentration et une baisse de performance nette à l’entraînement. Comme ces symptômes ne sont pas spécifiques, une carence en fer passe souvent inaperçue un certain temps, jusqu’à ce qu’elle soit mise en évidence par une prise de sang.',
      },
      {
        title: 'La ferritine et les valeurs principales',
        content: 'Plusieurs valeurs servent à évaluer le statut en fer. La plus importante est la ferritine, la forme de stockage du fer : elle montre à quel point les réserves sont remplies et baisse souvent avant qu’une carence manifeste ne devienne visible sur la numération. Une ferritine basse est donc un signal d’alerte précoce.\n\nS’y ajoutent l’hémoglobine (le pigment rouge proprement dit), la transferrine (la protéine de transport) et le coefficient de saturation de la transferrine. Seul le tableau d’ensemble permet une bonne interprétation : une ferritine basse avec une hémoglobine encore normale indique des réserves vides avant l’apparition d’une véritable anémie.\n\nIl est important de savoir que la ferritine peut aussi s’élever en cas d’inflammation et masquer alors une carence. C’est pourquoi les valeurs du fer doivent toujours être interprétées médicalement, en lien avec d’autres marqueurs et le tableau clinique.',
      },
      {
        title: 'Groupes à risque et causes',
        content: 'Certains groupes ont un risque nettement accru de carence en fer. Les femmes menstruées perdent régulièrement du sang et donc du fer — la carence en fer est chez elles la carence la plus fréquente de toutes. Les femmes enceintes ont également des besoins fortement accrus.\n\nLes sportifs d’endurance sont eux aussi exposés, entre autres par des besoins accrus, des pertes via la sueur et le tube digestif, ainsi que par l’effet d’impact du pied à la course. Les personnes ayant une alimentation végétarienne ou végane absorbent le fer sous une forme moins bien assimilable et devraient surveiller leur statut.\n\nD’autres causes peuvent être un apport insuffisant, des maladies digestives avec absorption perturbée ou des pertes de sang cachées. Justement parce que les causes sont variées, une carence en fer inexpliquée ou persistante doit toujours être explorée médicalement.',
      },
      {
        title: 'Améliorer — mais correctement',
        content: 'Côté alimentation, la viande rouge apporte surtout du fer héminique bien assimilable ; les sources végétales comme les légumineuses, les produits complets et les légumes verts contiennent du fer non héminique, moins bien absorbé. La vitamine C (par exemple des fruits ou légumes au repas) améliore nettement l’absorption du fer végétal, tandis que le café et le thé l’inhibent.\n\nEn cas de carence avérée, l’alimentation ne suffit souvent pas à remplir rapidement les réserves — des préparations de fer peuvent alors être nécessaires. Elles ne doivent toutefois pas être prises au hasard : une supplémentation en fer sans carence n’est pas anodine, car le fer excédentaire peut s’accumuler dans le corps et nuire.\n\nPour le fer vaut donc particulièrement : d’abord mesurer, ensuite agir de façon ciblée. Le dosage et la durée d’un traitement martial relèvent du médecin, tout comme la recherche de la cause. Ces contenus ont une visée informative et ne remplacent pas un diagnostic médical.',
      },
    ],
  },

  cholesterol: {
    name: 'Cholestérol et lipides sanguins',
    summary: 'Le cholestérol et les triglycérides sont d’importants lipides sanguins. Leur profil (LDL, HDL, triglycérides) est un marqueur central de la santé cardiovasculaire. Le mode de vie a une grande influence — mais l’interprétation relève du médecin.',
    quick: [
      { label: 'Valeurs importantes', text: 'Cholestérol total, LDL, HDL, triglycérides — ensemble, le bilan lipidique.' },
      { label: 'Influencer favorablement', text: 'Fibres, graisses insaturées, activité physique, poids sain, peu de graisses trans.' },
    ],
    sections: [
      {
        title: 'Ce qu’est le cholestérol',
        content: 'Le cholestérol est une substance de type graisseux dont le corps a besoin pour construire les membranes cellulaires, les hormones et les acides biliaires. Il est donc vital et n’a rien de fondamentalement « mauvais ». Le corps fabrique lui-même la majeure partie du cholestérol ; une part vient de l’alimentation.\n\nComme le cholestérol est liposoluble, il est lié dans le sang à des protéines de transport — les lipoprotéines. Les plus connues sont le LDL (« Low Density Lipoprotein ») et le HDL (« High Density Lipoprotein »). En simplifiant, le LDL transporte le cholestérol vers les tissus, tandis que le HDL ramène le cholestérol excédentaire vers le foie.\n\nUne autre valeur lipidique importante est celle des triglycérides, la forme principale de graisse stockée. Ensemble, cholestérol total, LDL, HDL et triglycérides constituent le bilan lipidique déterminé lors d’une analyse sanguine.',
      },
      {
        title: 'LDL, HDL et l’interprétation',
        content: 'Le rapport et le niveau des différentes valeurs comptent pour la santé cardiovasculaire. Un LDL durablement élevé est associé à un risque accru de dépôts dans les vaisseaux (athérosclérose), ce qui vaut au LDL l’étiquette de cholestérol « défavorable ». Le HDL est à l’inverse considéré comme plutôt « favorable », puisqu’il participe au transport retour.\n\nDes triglycérides élevés sont aussi un facteur de risque, souvent liés au surpoids, à une consommation élevée de sucre et au manque d’activité. Pour l’évaluation du risque, ce n’est cependant pas une valeur isolée qui compte, mais le profil global, avec d’autres facteurs comme la tension artérielle, le tabac, les antécédents familiaux et la glycémie.\n\nLes cibles exactes dépendent fortement du risque global individuel et sont fixées par le médecin. Une valeur « élevée » ne signifie pas automatiquement qu’il faut agir, et une valeur « normale » n’exclut pas totalement un risque — d’où l’importance de l’interprétation médicale.',
      },
      {
        title: 'Ce qui relève du mode de vie',
        content: 'Le mode de vie a une influence considérable sur les lipides sanguins. Une alimentation riche en fibres, avec beaucoup de légumes, de fruits, de légumineuses et de produits complets, peut abaisser le LDL. Remplacer une partie des graisses saturées par des insaturées (huile d’olive, noix, poisson gras) a un effet favorable, tandis que les graisses trans artificielles sont clairement défavorables et à éviter.\n\nUne activité physique régulière améliore le bilan lipidique, en particulier les triglycérides et le HDL. Un poids sain, l’arrêt du tabac et une consommation d’alcool mesurée contribuent également à la santé cardiovasculaire. Ces mesures agissent ensemble et constituent la base de toute amélioration.\n\nUne mise en perspective réaliste s’impose : une partie des valeurs de cholestérol est d’origine génétique et ne peut être influencée que de façon limitée par le mode de vie. Certaines personnes ont des valeurs élevées malgré une hygiène de vie saine — un traitement médicamenteux peut alors être nécessaire, décision qui appartient exclusivement au médecin.',
      },
      {
        title: 'Mise en perspective et avis médical',
        content: 'Le bilan lipidique est l’une des analyses de routine les plus importantes pour estimer le risque cardiovasculaire. Justement parce que les dépôts dans les vaisseaux ne provoquent longtemps aucun symptôme, un contrôle régulier est judicieux — surtout avec l’âge ou en cas d’antécédents familiaux.\n\nL’interprétation est complexe et relève du médecin. Le fait qu’une valeur soit traitée, et comment, dépend du risque global individuel, pas d’un chiffre isolé. Les changements de mode de vie sont presque toujours la première étape ; des médicaments comme les statines s’y ajoutent en cas de risque correspondant et sont bien étudiés.\n\nUtilise ces connaissances pour mieux comprendre ton propre bilan lipidique et agir de façon ciblée sur les facteurs de mode de vie. L’évaluation concrète et le traitement de tes valeurs doivent toutefois toujours se faire avec un médecin — ces contenus ne remplacent pas un avis médical.',
      },
    ],
  },

  blood_sugar: {
    name: 'Glycémie et HbA1c',
    summary: 'La glycémie (glucose) et la valeur au long cours HbA1c montrent à quel point le corps traite bien le sucre. Ce sont des marqueurs centraux du métabolisme et du risque de diabète. L’alimentation et l’activité physique ont une grande influence.',
    quick: [
      { label: 'Ce qui est mesuré', text: 'Glycémie à jeun (valeur instantanée) et HbA1c (moyenne des ~3 derniers mois).' },
      { label: 'Influencer favorablement', text: 'Activité physique, poids sain, alimentation riche en fibres, peu de sucre ; la musculation aide.' },
    ],
    sections: [
      {
        title: 'Glycémie et insuline',
        content: 'Le glucose (sucre sanguin) est un vecteur d’énergie central du corps. Après un repas, la glycémie monte, ce qui pousse le pancréas à sécréter l’insuline. L’insuline fait entrer le glucose dans les cellules et ramène ainsi la glycémie à un niveau normal.\n\nCe système finement réglé maintient la glycémie dans une plage étroite. Quand il fonctionne bien, le sucre est traité efficacement. Si l’action de l’insuline est perturbée (insulinorésistance), le corps doit produire toujours plus d’insuline et la glycémie reste trop élevée — un stade précurseur du diabète de type 2.\n\nLa musculature joue ici un rôle important : des muscles actifs captent le glucose et améliorent la sensibilité à l’insuline. Un entraînement régulier, en particulier la musculation, est donc l’un des facteurs les plus efficaces pour un métabolisme du sucre sain.',
      },
      {
        title: 'Glycémie à jeun et HbA1c',
        content: 'Deux valeurs sont particulièrement parlantes. La glycémie à jeun se mesure après plusieurs heures sans nourriture et montre le taux de sucre actuel. C’est un instantané, qui peut varier selon l’alimentation, le stress et l’heure de la journée.\n\nL’HbA1c (« sucre au long cours ») reflète la glycémie moyenne des deux à trois derniers mois environ. Elle mesure la part d’hémoglobine sur laquelle du sucre s’est fixé. Comme elle couvre une période plus longue, elle est plus robuste face aux variations à court terme et sert au diagnostic et au suivi.\n\nEnsemble, ces deux valeurs donnent une bonne image du métabolisme du sucre. Des valeurs élevées peuvent indiquer un prédiabète ou un diabète existant. Les seuils exacts et leur interprétation sont fixés par le médecin.',
      },
      {
        title: 'Influence de l’alimentation et de l’activité',
        content: 'Le métabolisme du sucre se laisse fortement influencer par le mode de vie. Une alimentation riche en fibres, avec légumes, légumineuses et produits complets, entraîne une hausse plus lente et plus régulière de la glycémie que des aliments très transformés et sucrés. Réduire les boissons sucrées et les produits à base de farine blanche est particulièrement efficace.\n\nL’activité physique est un facteur clé. L’entraînement d’endurance comme la musculation améliorent la sensibilité à l’insuline et aident les muscles à capter le glucose. Une simple promenade après le repas peut déjà atténuer la montée de la glycémie. Construire de la masse musculaire agrandit en outre le « réservoir à sucre » du corps.\n\nUn poids sain, en particulier la réduction de la graisse abdominale, améliore nettement les valeurs de glycémie. Ces mesures de mode de vie sont la stratégie la plus efficace et la première à mettre en œuvre pour contrer un prédiabète et abaisser le risque de diabète.',
      },
      {
        title: 'Mise en perspective et avis médical',
        content: 'La glycémie et l’HbA1c comptent parmi les analyses de prévention les plus importantes, car un métabolisme du sucre perturbé ne provoque longtemps aucun symptôme tout en pouvant avoir des conséquences graves. Détecter tôt un prédiabète ouvre la possibilité d’intervenir par le mode de vie avant qu’un diabète ne s’installe.\n\nDes valeurs élevées sont un signal d’alerte important, mais pas un auto-diagnostic. L’interprétation, les examens complémentaires et un éventuel traitement relèvent du médecin. En cas de diabète avéré, un suivi médical structuré est indispensable.\n\nUtilise ces connaissances pour comprendre la portée de tes valeurs et employer l’alimentation et l’activité de façon ciblée. La musculation et une alimentation équilibrée riche en fibres sont ici de solides alliées pour un métabolisme du sucre sain. Ces contenus ne remplacent toutefois pas un avis ni un diagnostic médical.',
      },
    ],
  },

  thyroid: {
    name: 'Thyroïde (TSH)',
    summary: 'La thyroïde pilote, par ses hormones, le métabolisme, l’énergie et la température corporelle. La TSH est le principal test de dépistage d’une hyper- ou d’une hypothyroïdie. Toute anomalie doit toujours être explorée médicalement.',
    quick: [
      { label: 'Ce qui est mesuré', text: 'La TSH comme test de dépistage ; en cas d’anomalie, en plus fT3/fT4 et éventuellement des anticorps.' },
      { label: 'Symptômes', text: 'Fatigue, changement de poids, sensibilité au froid ou au chaud, humeur — non spécifiques, à explorer médicalement.' },
    ],
    sections: [
      {
        title: 'La thyroïde et ses hormones',
        content: 'La thyroïde est une petite glande en forme de papillon située dans le cou, dont l’effet est considérable. Elle produit les hormones thyroïdiennes T3 (triiodothyronine) et T4 (thyroxine), qui régulent le métabolisme de base, le métabolisme énergétique, la température corporelle, le rythme cardiaque et bien d’autres fonctions.\n\nLa thyroïde est pilotée par une boucle de régulation avec le cerveau. L’hypophyse sécrète la TSH (thyréostimuline), qui stimule la thyroïde à produire des hormones. Cette boucle ajuste finement la quantité d’hormones aux besoins du corps.\n\nQuand la fonction thyroïdienne est perturbée, cela se répercute sur tout l’organisme. Une hypothyroïdie ralentit le métabolisme, une hyperthyroïdie l’accélère — les deux se manifestent par une multitude de symptômes non spécifiques.',
      },
      {
        title: 'Pourquoi la TSH est la valeur la plus importante',
        content: 'La TSH est le test de dépistage le plus sensible de la fonction thyroïdienne. La raison tient à la boucle de régulation : si la thyroïde produit trop peu d’hormones, le corps tente de compenser et sécrète plus de TSH — une TSH élevée indique donc souvent une hypothyroïdie. Si elle en produit trop, la TSH baisse, ce qui peut signaler une hyperthyroïdie.\n\nComme la TSH réagit déjà à de petits écarts, elle est dosée en premier. Si elle est anormale, d’autres examens suivent : les hormones thyroïdiennes libres fT3 et fT4 et, le cas échéant, des anticorps, afin d’identifier des causes comme la maladie auto-immune de Hashimoto.\n\nLes intervalles de référence de la TSH varient selon le laboratoire, et l’interprétation dépend du cas — de l’âge, d’une grossesse ou des symptômes présents. Une seule valeur limite ne signifie pas automatiquement une maladie.',
      },
      {
        title: 'Symptômes et troubles fréquents',
        content: 'Une hypothyroïdie se manifeste souvent par de la fatigue, un manque d’entrain, une prise de poids, une sensibilité au froid, une peau sèche et une humeur abattue. Une hyperthyroïdie se traduit à l’inverse souvent par de la nervosité, des palpitations, une perte de poids malgré l’appétit, une sensibilité à la chaleur et des troubles du sommeil.\n\nCes symptômes ne sont pas spécifiques et peuvent avoir bien d’autres causes — c’est précisément pour cela que l’analyse sanguine est si utile, afin d’examiner ou d’écarter la thyroïde comme cause. Pour les personnes sportives, une thyroïde qui fonctionne bien est importante, car elle influence l’énergie, la récupération et le métabolisme.\n\nParmi les troubles fréquents figurent la maladie auto-immune de Hashimoto (menant le plus souvent à une hypothyroïdie) et la maladie de Basedow (menant à une hyperthyroïdie). Une carence en iode peut aussi altérer la thyroïde. Le diagnostic précis exige toujours un examen médical.',
      },
      {
        title: 'Mise en perspective et avis médical',
        content: 'La thyroïde illustre comment un petit organe influence tout le corps. La TSH est un test de dépistage simple et parlant, qui peut être judicieux en cas de symptômes flous comme une fatigue persistante, des variations de poids inexpliquées ou des sautes d’humeur.\n\nContrairement à d’autres valeurs, un véritable trouble de la fonction thyroïdienne ne se corrige pas simplement par le mode de vie. Un apport suffisant en iode (sel iodé et aliments) soutient une fonction normale, mais un trouble installé nécessite un traitement médical ciblé, souvent par des préparations hormonales.\n\nD’où une règle particulièrement valable ici : des valeurs thyroïdiennes anormales ou des symptômes correspondants relèvent toujours du médecin. Ces connaissances t’aident à comprendre la portée de la TSH et à prendre les symptômes au sérieux — elles ne remplacent expressément ni le diagnostic ni le traitement.',
      },
    ],
  },
};
