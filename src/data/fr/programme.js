// Version française des 21 programmes Peak de `src/data/peakPrograms.js`.
//
// Forme par programme : { name, desc, why, progression, fokus: { <jour>: '…' } }.
// `fokus` n'existe que pour les programmes de sports de combat (un point fort
// y figure sous le libellé du jour).
//
// Les libellés des jours d'entraînement (« Push », « Haut du corps ») ne sont
// PAS ici mais dans `src/data/tagesbeschriftung.js` — ils se répètent d'un
// programme à l'autre.
//
// `studien` est indexé par « Nom|Année », car la même étude est citée dans
// plusieurs programmes ; le nom et l'année ne sont pas traduits.
export default {
  kategorien: {
    strength: 'Musculation',
    cardio: 'Cardio',
    hiit: 'HIIT',
    martial_arts: 'Sports de combat',
  },

  studien: {
    'Schoenfeld, Ogborn & Krieger|2017': 'Méta-analyse dose-réponse : 10 séries et plus par groupe musculaire et par semaine produisent une croissance musculaire significativement supérieure à un nombre de séries inférieur.',
    'Schoenfeld, Ogborn & Krieger|2016': 'Méta-analyse : entraîner chaque groupe musculaire 2 fois par semaine produit plus d’hypertrophie qu’une seule fois par semaine.',
    'Helms et al.|2016': 'L’échelle RIR (« répétitions en réserve ») est un outil valide pour doser l’effort en musculation — termine la plupart des séries avec 1 à 3 RIR.',
    'Schoenfeld, Grgic & Krieger|2019': 'À volume hebdomadaire égal, la fréquence d’entraînement est secondaire : ce qui compte, c’est le volume total par groupe musculaire.',
    'Pedisic et al.|2020': 'Méta-analyse : les coureurs présentent un risque de mortalité toutes causes confondues inférieur d’environ 27 %, et de faibles volumes de course (1 fois par semaine) suffisent déjà à montrer cet effet.',
    'Lee et al.|2014': 'Même 5 à 10 minutes de course lente par jour étaient associées à une mortalité globale et cardiovasculaire nettement plus faible.',
    'Helgerud et al.|2007': 'Des intervalles de 4×4 minutes à 90–95 % de la fréquence cardiaque maximale ont augmenté la VO₂max nettement plus que l’entraînement continu modéré à travail total égal.',
    'Milanović et al.|2015': 'Méta-analyse : le HIIT améliore la VO₂max chez l’adulte sain davantage que l’entraînement d’endurance classique.',
    'Gunnarsson & Bangsbo|2012': 'Avec le concept 10-20-30, des coureurs ont amélioré leur VO₂max (~4 %) ainsi que leurs temps sur 1500 m et 5 km, malgré un volume d’entraînement réduit d’environ 50 %.',
    'Seiler|2010': 'Les athlètes d’endurance de haut niveau réalisent environ 80 % de leur volume à basse intensité (zones 1–2) — ce modèle polarisé donne les meilleures adaptations à long terme.',
    'Stöggl & Sperlich|2014': 'L’entraînement polarisé (beaucoup de facile + un peu de très dur) a amélioré la VO₂max et la performance chez des sportifs d’endurance entraînés davantage que le travail au seuil ou le HIT seul.',
    'Esteve-Lanao et al.|2007': 'Les coureurs qui réalisaient environ 80 % de leur volume à basse intensité ont amélioré leur temps de compétition plus qu’un groupe s’entraînant davantage à intensité moyenne.',
    'Billat et al.|1999': 'Les intervalles à la vitesse associée à la VO₂max (vVO₂max) ont amélioré de façon mesurable l’économie de course et l’allure chez des coureurs entraînés.',
    'Tabata et al.|1996': '6 semaines de séances de 4 minutes (8×20 s/10 s) ont augmenté la VO₂max d’environ 7 ml/kg/min et la capacité anaérobie de 28 % — l’entraînement continu modéré n’a amélioré que la capacité aérobie.',
    'Weston et al.|2014': 'Méta-analyse : le HIIT a amélioré la condition cardiorespiratoire près de deux fois plus que l’entraînement continu modéré.',
    'Gibala et al.|2006': '6 séances d’intervalles en sprint en 2 semaines (~2,5 h d’entraînement) ont produit des adaptations d’endurance musculaire comparables à environ 10,5 h d’entraînement d’endurance classique.',
    'Little et al.|2010': 'Des intervalles de 8 à 12×60 secondes avec 75 s de pause ont nettement augmenté la capacité mitochondriale du muscle — pour seulement 20 à 25 minutes par séance.',
    'McRae et al.|2012': '4 fois par semaine, seulement 4 minutes d’intervalles en corps entier ont amélioré l’endurance ET l’endurance musculaire de façon comparable à 30 minutes d’entraînement continu.',
    'Chaabène et al.|2015': 'Revue : la boxe amateur exige simultanément une capacité aérobie et anaérobie élevée — les boxeurs d’élite atteignent des VO₂max autour de 60 ml/kg/min.',
    'Ouergui et al.|2014': 'Les rounds de kickboxing portent la fréquence cardiaque près du maximum : l’entraînement par rounds agit physiologiquement comme un entraînement par intervalles de haute intensité.',
    'James et al.|2016': 'Revue : le MMA exige force, vitesse et endurance combinées — une préparation variée et organisée par rounds est recommandée.',
  },

  ppl_6x: {
    name: 'Push / Pull / Legs',
    desc: 'Le classique split sur 6 jours pour une prise de muscle maximale. Chaque groupe musculaire est travaillé 2 fois par semaine.',
    why: 'Le PPL combine les deux leviers les plus puissants pour la prise de muscle : un volume hebdomadaire élevé (16 à 20 séries par groupe musculaire) et une fréquence de 2 fois par semaine. La répartition par schémas de mouvement (pousser/tirer/jambes) laisse chaque groupe musculaire récupérer complètement, tout en t’entraînant presque tous les jours.',
    progression: 'Double progression : garde les séries et la fourchette de répétitions, et progresse en répétitions. Quand tu atteints la limite haute sur toutes les séries avec une technique propre, augmente la charge de 2,5 kg et repars du bas. Termine la plupart des séries avec 1 à 3 répétitions en réserve (RIR).',
  },
  upper_lower_4x: {
    name: 'Haut / bas du corps',
    desc: 'Split efficace sur 4 jours pour les débutants et les intermédiaires. Chaque groupe musculaire est travaillé 2 fois par semaine.',
    why: 'Le split haut/bas du corps est le meilleur compromis entre temps investi et résultat : 4 séances par semaine suffisent pour la fréquence de 2 fois par groupe musculaire qui, dans les méta-analyses, produit plus de croissance qu’une seule. Les exercices de base d’abord, les exercices d’isolation ensuite.',
    progression: 'Double progression : augmente d’abord les répétitions dans la fourchette cible, puis ajoute 2,5 kg. Termine les exercices de base (squat, développé couché, soulevé de terre) à 2 RIR et les exercices d’isolation à 1 RIR. Intercale une semaine légère toutes les 6 à 8 semaines.',
  },
  split_5x: {
    name: 'Split 5 jours',
    desc: 'Split avancé sur 5 jours avec un volume élevé par groupe musculaire. Pour les athlètes expérimentés.',
    why: 'Pour les pratiquants confirmés qui ont besoin de plus de volume : le split sur 5 jours permet 15 à 20+ séries par groupe musculaire, avec toute la concentration portée sur une zone par séance. La recherche dose-réponse le montre : qui s’entraîne depuis longtemps continue de progresser avec davantage de séries hebdomadaires.',
    progression: 'Double progression par exercice. En plus, ajoute toutes les 3 à 4 semaines une série au premier exercice de la séance, tant que la récupération suit. Fais de la semaine 10 une décharge (charges −30 %, séries divisées par deux).',
  },
  fullbody_3x: {
    name: 'Corps entier 3 fois',
    desc: 'Parfait pour les débutants : 3 séances corps entier par semaine avec les exercices de base essentiels.',
    why: 'Pour qui commence, l’entraînement du corps entier 3 fois par semaine est le modèle le plus efficace : chaque groupe musculaire est stimulé 3 fois par semaine, les exercices de base progressent vite grâce à la pratique fréquente, et trois séances tiennent dans n’importe quel emploi du temps. Les débutants progressent déjà de façon fiable avec un volume modéré.',
    progression: 'Progression linéaire : augmente la charge de 2,5 kg (bas du corps) ou de 1,25 à 2,5 kg (haut du corps) à chaque séance, tant que toutes les répétitions passent proprement. Si un exercice échoue 2 fois de suite, réduis sa charge de 10 % et remonte.',
  },
  push_pull_4x: {
    name: 'Push / Pull 4 jours',
    desc: '4 séances par semaine réparties en mouvements de poussée et de tirage. Les jambes sont intégrées.',
    why: 'Push/Pull avec les jambes intégrées est l’alternative efficace en temps au PPL sur 6 jours : même fréquence de 2 fois par groupe musculaire, mais seulement 4 jours de salle. Les quadriceps passent en Push (le squat est une poussée) et la chaîne postérieure en Pull (le soulevé de terre est un tirage) — un regroupement biomécaniquement cohérent.',
    progression: 'Double progression : augmente les répétitions dans la fourchette cible, puis ajoute 2,5 kg. Progresse prudemment au soulevé de terre et au squat (seulement quand toutes les séries passent à 2 RIR). Après la semaine 8, fais une semaine de décharge avant de reprendre le cycle.',
  },
  bro_split_5x: {
    name: 'Bro split',
    desc: 'Le classique split de bodybuilding : chaque groupe musculaire a son propre jour, avec un volume élevé.',
    why: 'L’approche bodybuilding traditionnelle : un groupe musculaire par jour, mais avec toute l’attention et beaucoup de volume en une seule séance. La recherche récente le montre : à volume hebdomadaire égal, la répartition est secondaire — qui aime le congestif et la concentration d’une séance dédiée développe tout autant.',
    progression: 'Double progression par exercice, la plupart des séries jusqu’à 1 à 2 RIR. Comme chaque groupe musculaire ne passe qu’une fois par semaine, chaque séance compte : note tes charges avec rigueur et vise chaque semaine au moins une répétition de plus.',
  },
  couch_to_5k: {
    name: 'Du canapé au 5 km',
    desc: 'De zéro à 5 kilomètres en 9 semaines — avec des intervalles course/marche qui s’allongent chaque semaine.',
    why: 'Le concept pour débutants le plus éprouvé au monde : de courtes portions de course entrecoupées de marche laissent les tendons, les articulations et le système cardiovasculaire s’adapter au lieu de les dépasser. La progression est volontairement douce — c’est exactement ce qui rend ce programme tenable. Même de faibles volumes de course réduisent de façon mesurable le risque de mortalité.',
    progression: 'Chaque semaine, les portions de course s’allongent et les pauses marchées raccourcissent — de 8×1 minute de course (semaine 1) à 30 minutes d’affilée (semaine 9). Cours les portions volontairement lentement (allure de conversation, RPE 5–6). Recommence une semaine si elle te semble trop dure.',
  },
  norwegian_4x4: {
    name: '4×4 norvégien',
    desc: 'Le protocole VO₂max issu de la recherche : 4 intervalles de 4 minutes à 90–95 % de la fréquence cardiaque maximale.',
    why: 'Peu de protocoles sont mieux documentés : les intervalles de 4 minutes près de la fréquence cardiaque maximale sont le stimulus connu le plus puissant pour la VO₂max — le meilleur marqueur isolé de la performance d’endurance et de la longévité. Les récupérations actives de 3 minutes maintiennent la qualité des intervalles. Fonctionne en course, à vélo et en aviron.',
    progression: 'Semaines 1–2 : 3 intervalles pour s’habituer. À partir de la semaine 3 : le 4×4 complet. Semaines 7–8 : récupération active ramenée à 2:30. Intensité : les 2 dernières minutes de chaque intervalle doivent correspondre à un RPE 9 — parler devient alors impossible.',
  },
  interval_10_20_30: {
    name: 'Intervalles 10-20-30',
    desc: 'Le concept danois : 30 s tranquille, 20 s soutenu, 10 s de sprint — devenir plus rapide avec la moitié du volume.',
    why: 'Développé à l’université de Copenhague : les coureurs sont devenus plus rapides et plus en forme alors qu’ils avaient réduit de moitié leur volume d’entraînement. Les sprints de 10 secondes seulement donnent un stimulus maximal, mais restent assez courts pour que la charge se répartisse bien. Idéal quand tu as peu de temps et veux courir plus vite.',
    progression: 'Un bloc = 5×(30 s tranquille · 20 s soutenu · 10 s de sprint). Semaines 1–2 : 2 blocs ; semaines 3–4 : 3 blocs ; semaines 5–6 : 4 blocs — avec 2 minutes de trot entre les blocs. Les sprints de 10 secondes sont quasi maximaux (RPE 9), le reste volontairement tranquille.',
  },
  zone2_base: {
    name: 'Base en zone 2',
    desc: 'La base d’endurance des professionnels : des séances continues tranquilles en zone 2, de plus en plus longues.',
    why: 'Les athlètes d’endurance de haut niveau s’entraînent à environ 80 % de leur volume précisément ici : assez tranquille pour pouvoir discuter en même temps. La zone 2 développe les mitochondries et le métabolisme des graisses — le socle sur lequel tout entraînement dur produit son effet. L’erreur la plus fréquente des amateurs est de courir ces séances trop vite.',
    progression: 'Les séances courtes s’allongent de 5 minutes toutes les 2 semaines (25→40 min), la sortie longue de 5 minutes chaque semaine avec des semaines de récupération (35→60 min). Contrôle de l’allure : tu dois pouvoir converser en phrases complètes (RPE 3–4, zone 2). Sinon, ralentis.',
  },
  '10k_training': {
    name: 'Préparation 10 km',
    desc: 'Préparation structurée au 10 km en 10 semaines : intervalles, séance au seuil, footing tranquille et sortie longue.',
    why: 'Le classique de la planification de course selon le principe 80/20 : deux séances dures par semaine (intervalles VO₂max + séance au seuil) apportent le stimulus de performance, deux séances tranquilles construisent la base d’endurance. La sortie longue croît progressivement avec des semaines de récupération, et les deux dernières semaines sont en affûtage — tu arrives frais sur la ligne de départ.',
    progression: 'Intervalles : de 4 à 6×3 minutes (RPE 9). Séance au seuil : de 15 à 25 minutes « confortablement dur » (RPE 7). Sortie longue : de 40 à 70 minutes tranquilles, avec récupération en semaines 4 et 7. Semaines 9–10 : affûtage — volume en baisse, fraîcheur en hausse. Le footing tranquille du jeudi reste toujours tranquille.',
  },
  tabata_classic: {
    name: 'Tabata classique',
    desc: 'Le protocole Tabata original : 20 secondes à fond, 10 secondes de pause — avec un nombre de rounds croissant.',
    why: 'Le protocole HIIT le plus célèbre au monde, étudié en 1996 sur des patineurs de vitesse japonais : 8 rounds de 20/10 ont amélioré à la fois la capacité aérobie ET anaérobie — ce que l’entraînement continu modéré ne fait pas. L’intensité est décisive : « à fond » veut vraiment dire à fond.',
    progression: 'Semaines 1–2 : 8 rounds (1 bloc Tabata, 4 minutes). Semaines 3–4 : 12 rounds. Semaines 5–6 : 16 rounds (2 blocs). Chaque phase de travail à RPE 9–10 — si tu ne tiens plus proprement les derniers rounds, reste une semaine de plus au niveau actuel.',
  },
  gibala_sit: {
    name: 'Protocole Gibala 60/75',
    desc: 'Le « SIT pratique » issu de la recherche : 8 à 12 intervalles de 60 secondes dures, 75 secondes de pause.',
    why: 'Le groupe de Martin Gibala a montré que quelques minutes d’intervalles intenses déclenchent des adaptations cellulaires comparables à un temps bien supérieur d’entraînement d’endurance classique. La variante 60/75 est la version compatible avec le quotidien : dure, mais sans sprints maximaux — donc sûre et adaptée aux exercices de corps entier.',
    progression: 'Semaines 1–2 : 8 intervalles. Semaines 3–4 : 10 intervalles. Semaines 5–6 : 12 intervalles. Phases de travail à RPE 8–9 (« très dur, mais tenable 60 secondes ») ; pendant les pauses, bouge tranquillement au lieu de rester immobile.',
  },
  hiit_beginner: {
    name: 'HIIT débutant 30/30',
    desc: 'Entrée en douceur dans l’entraînement par intervalles : 30 secondes d’effort, 30 secondes de pause — de 6 à 10 rounds.',
    why: 'Le rapport 1:1 entre effort et pause est la porte d’entrée idéale au HIIT : assez intense pour les effets démontrés sur la condition physique, mais avec assez de récupération pour garder une technique propre. Selon les méta-analyses, le HIIT améliore la condition physique près de deux fois plus que l’entraînement continu modéré — pour une fraction du temps.',
    progression: 'Semaines 1–2 : 6 rounds. Semaines 3–4 : 8 rounds. Semaines 5–6 : 10 rounds. Phases de travail à RPE 7–8 — tu dois être de nouveau prêt à la fin de chaque pause. La qualité prime sur la vitesse : des répétitions propres comptent plus que des répétitions nombreuses.',
  },
  hiit_advanced: {
    name: 'HIIT avancé 40/15',
    desc: 'HIIT intense pour les avancés : 40 secondes d’effort, seulement 15 secondes de pause, jusqu’à 12 rounds.',
    why: 'Le rapport de pause court (près de 3:1) maintient la fréquence cardiaque haute en permanence — tu entraînes ainsi la capacité à produire de la performance sous fatigue. Quatre séances thématiques par semaine (puissance, gainage, jambes, corps entier) répartissent la charge sur différents groupes musculaires.',
    progression: 'Semaines 1–2 : 8 rounds. Semaines 3–6 : 10 rounds. Semaines 7–8 : 12 rounds. Phases de travail à RPE 8–9. Si la forme se dégrade, termine le round plus tôt — l’absence de blessure prime sur le nombre de rounds.',
  },
  emom_challenge: {
    name: 'Défi EMOM',
    desc: 'Every Minute On the Minute : chaque minute lance un nouvel exercice — la pause, c’est ce qui reste de la minute.',
    why: 'L’EMOM intègre le pacing : qui travaille plus vite gagne plus de pause — ce qui maintient la densité et enseigne un rythme régulier. Les intervalles de corps entier de ce type améliorent simultanément l’endurance et l’endurance musculaire, comme le montrent les études sur les protocoles minimalistes de corps entier.',
    progression: 'Semaines 1–2 : rounds de base (10 à 15 selon le jour). Semaines 3–4 : +2 rounds. Semaines 5–6 : +2 rounds supplémentaires. Choisis le nombre de répétitions par minute de façon à conserver 15 à 20 secondes de pause — s’il ne reste plus de pause, réduis les répétitions.',
    },
  boxing_basics: {
    name: 'Boxe : les bases',
    desc: 'Apprends les bases de la boxe : jab, cross, crochet, jeu de jambes — en rounds classiques de 3 minutes.',
    why: 'L’entraînement de boxe en rounds de 3 minutes est du HIIT déguisé : la fréquence cardiaque oscille entre travail intense et courte pause, pendant que tu apprends la coordination et la technique. Chaque séance a un point fort — tu construis ainsi une base propre, semaine après semaine.',
    progression: 'Semaines 1–2 : 6 rounds (8 le vendredi). Semaines 3–4 : +1 round par séance. Semaines 5–6 : +1 round supplémentaire. D’abord la technique, ensuite le rythme : les combinaisons lentement et proprement, puis plus vite. Le dernier round de chaque séance peut être du « pur cardio ».',
    fokus: {
      mon: 'Coups de base et garde',
      wed: 'Combinaisons et puissance de frappe',
      fri: 'Endurance sur les rounds',
    },
  },
  kickboxing_conditioning: {
    name: 'Kickboxing : condition physique',
    desc: 'Entraînement de kickboxing axé sur la condition physique et la technique : coups de pied, coups de poing et combinaisons en rounds.',
    why: 'Le kickboxing associe haut et bas du corps comme peu d’autres sports : les coups de pied sollicitent les jambes, les hanches et le tronc, les coups de poing les épaules et les bras. Les études montrent que les rounds de kickboxing portent la fréquence cardiaque près du maximum — tu obtiens des effets de HIIT et de la mobilité en une seule séance.',
    progression: 'Semaine 4 : +1 round dans chaque séance. Semaine 7 : encore +1 round. Les jours de technique avant les jours de condition physique : apprends les nouveaux coups de pied lentement à vide avant de les exécuter sous fatigue. Étire brièvement les hanches chaque jour.',
    fokus: {
      mon: 'Technique de coup de pied',
      tue: 'Explosivité et endurance',
      thu: 'Combinaisons poing-pied',
      sat: 'Simulation de combat',
    },
  },
  mma_fundamentals: {
    name: 'MMA : les bases',
    desc: 'Initiation aux arts martiaux mixtes : frappes, coups de pied et condition physique spécifique au combat, réunis sur une semaine.',
    why: 'Le MMA est l’art martial le plus complet : frapper, donner des coups de pied et lutter au sol sollicitent en même temps la force, la vitesse et l’endurance. Les sciences du sport recommandent exactement ce que reproduit ce programme — un entraînement par rounds à points forts changeants, plus une journée dédiée à la condition physique avec sprawls et corde à sauter.',
    progression: 'Semaine 4 : frappes de 8 à 9 rounds, condition physique de 5 à 6 rounds. Semaine 7 : coups de pied de 6 à 7 rounds. Le long samedi (rounds de 5 minutes comme en MMA réel) reste constant : c’est la qualité sous fatigue qui compte là, pas le volume.',
    fokus: {
      mon: 'Technique de frappe',
      tue: 'Coups de pied et genoux',
      thu: 'Condition physique de combat',
      sat: 'Rounds de 5 minutes comme en compétition',
    },
  },
  boxing_advanced: {
    name: 'Boxe avancée',
    desc: 'Entraînement de boxe avancé : plus de volume, séances plus longues, combinaisons complexes.',
    why: 'À un niveau avancé, c’est la capacité de travail qui décide : les boxeurs d’élite arrivent avec des VO₂max autour de 60 ml/kg/min — construites précisément par cette structure de rounds de technique, de sac lourd et de condition physique. La simulation de sparring du samedi rassemble le tout sous une fatigue proche du combat.',
    progression: 'Semaine 4 : technique et sac lourd +1 round. Semaine 7 : encore +1 round, condition physique de 8 à 10 rounds. Semaines 9–10 : maintiens le volume et augmente l’intensité des combinaisons (plus vite, plus fort, moins de pause entre les combinaisons).',
    fokus: {
      mon: 'Combinaisons complexes',
      tue: 'Puissance de frappe et rythme',
      fri: 'Capacité de travail',
      sat: 'Tout sous fatigue',
    },
  },
  combat_fitness: {
    name: 'Combat Fitness',
    desc: 'Entraînement de fitness inspiré des sports de combat, sans prérequis : éléments de boxe et de coups de pied en séance corps entier.',
    why: 'L’entrée pour tous ceux qui veulent la condition physique des sports de combat sans ambition de compétition : shadow boxing, coups de pied et exercices au poids du corps en courts rounds de 2 minutes. L’entraînement par rounds agit physiologiquement comme l’entraînement par intervalles — avec le bonus motivant d’apprendre de vraies techniques.',
    progression: 'Semaine 3 : un round de plus par séance. Semaine 5 : rounds allongés de 2:00 à 2:30. Garde les pauses disciplinées à 60 secondes — l’effet sur la condition physique vient du rapport entre effort et pause.',
    fokus: {
      mon: 'Coups de poing et haut du corps',
      wed: 'Coups de pied et jambes',
      sat: 'Tout combiné',
    },
  },
};
