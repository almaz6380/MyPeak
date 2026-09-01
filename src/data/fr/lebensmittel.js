// Noms français des 124 aliments et des 17 catégories de
// `src/data/foodDatabase.js`.
//
// Uniquement des noms — les valeurs nutritionnelles, les tailles de portion et
// les unités sont des nombres et restent dans le fichier de données.
//
// Le paquet est chargé dès qu'on cherche un aliment. Important : la recherche
// compare le nom TRADUIT. Sans cela, un utilisateur francophone ne trouverait
// « Blanc de poulet » qu'en tapant « Hähnchenbrust ».
export default {
  kategorien: {
    dairy: 'Produits laitiers',
    eggs: 'Œufs',
    meat: 'Viande',
    fish: 'Poisson',
    grains: 'Céréales et féculents',
    bakery: 'Pain et viennoiseries',
    fruit: 'Fruits',
    vegetables: 'Légumes',
    legumes: 'Légumineuses',
    nuts: 'Fruits à coque et graines',
    oils: 'Huiles et matières grasses',
    drinks: 'Boissons',
    snacks: 'Snacks et sucreries',
    prepared: 'Sauces et plats préparés',
    supplements: 'Compléments',
    breakfast: 'Petit-déjeuner et céréales',
    frozen: 'Surgelés et plats tout prêts',
  },

  // Produits laitiers
  magerquark: 'Fromage blanc maigre (quark)',
  'griechischer-joghurt': 'Yaourt grec',
  naturjoghurt: 'Yaourt nature 1,5 %',
  vollmilch: 'Lait entier 3,5 %',
  'fettarme-milch': 'Lait demi-écrémé 1,5 %',
  huettenkaese: 'Cottage cheese',
  gouda: 'Gouda',
  mozzarella: 'Mozzarella',
  parmesan: 'Parmesan',
  skyr: 'Skyr',
  butter: 'Beurre',
  frischkaese: 'Fromage frais à tartiner',

  // Œufs
  'ei-ganz': 'Œuf (taille M)',
  eiweiss: 'Blanc d’œuf',

  // Viande
  haehnchenbrust: 'Blanc de poulet',
  putenbrust: 'Escalope de dinde',
  rinderhack: 'Viande hachée de bœuf',
  rindersteak: 'Steak de bœuf',
  schweinefilet: 'Filet mignon de porc',
  'schinken-gekocht': 'Jambon blanc',
  salami: 'Saucisson sec',
  haehnchenschenkel: 'Cuisse de poulet',

  // Poisson
  lachs: 'Saumon',
  'thunfisch-dose': 'Thon (boîte, au naturel)',
  garnelen: 'Crevettes',
  forelle: 'Truite',
  kabeljau: 'Cabillaud',

  // Céréales et féculents
  haferflocken: 'Flocons d’avoine',
  'reis-gekocht': 'Riz (cuit)',
  'vollkornreis-gekocht': 'Riz complet (cuit)',
  'nudeln-gekocht': 'Pâtes (cuites)',
  'vollkornnudeln-gekocht': 'Pâtes complètes (cuites)',
  'kartoffeln-gekocht': 'Pommes de terre (cuites)',
  suesskartoffel: 'Patate douce',
  'couscous-gekocht': 'Couscous (cuit)',
  'quinoa-gekocht': 'Quinoa (cuit)',
  'bulgur-gekocht': 'Boulgour (cuit)',

  // Pain et viennoiseries
  vollkornbrot: 'Pain complet',
  'toast-weiss': 'Pain de mie (blanc)',
  brezel: 'Bretzel',
  roggenbrot: 'Pain de seigle',
  dinkelbroetchen: 'Petit pain à l’épeautre',
  reiswaffeln: 'Galettes de riz',
  'wrap-tortilla': 'Wrap/tortilla',

  // Fruits
  banane: 'Banane',
  apfel: 'Pomme',
  erdbeeren: 'Fraises',
  blaubeeren: 'Myrtilles',
  himbeeren: 'Framboises',
  orange: 'Orange',
  weintrauben: 'Raisin',
  wassermelone: 'Pastèque',
  mango: 'Mangue',
  kiwi: 'Kiwi',
  birne: 'Poire',
  ananas: 'Ananas',

  // Légumes
  brokkoli: 'Brocoli',
  spinat: 'Épinards',
  tomate: 'Tomate',
  gurke: 'Concombre',
  paprika: 'Poivron',
  karotten: 'Carottes',
  zucchini: 'Courgette',
  champignons: 'Champignons de Paris',
  zwiebel: 'Oignon',
  mais: 'Maïs (boîte)',
  erbsen: 'Petits pois',
  'bohnen-gruen': 'Haricots verts',
  blumenkohl: 'Chou-fleur',
  avocado: 'Avocat',
  'salat-mix': 'Mélange de salades',

  // Légumineuses
  'kichererbsen-dose': 'Pois chiches (boîte)',
  'linsen-gekocht': 'Lentilles (cuites)',
  kidneybohnen: 'Haricots rouges (boîte)',
  edamame: 'Édamame',
  tofu: 'Tofu (nature)',

  // Fruits à coque et graines
  mandeln: 'Amandes',
  walnuesse: 'Noix',
  cashews: 'Noix de cajou',
  erdnuesse: 'Cacahuètes',
  erdnussbutter: 'Beurre de cacahuète',
  chiasamen: 'Graines de chia',
  leinsamen: 'Graines de lin',
  sonnenblumenkerne: 'Graines de tournesol',

  // Huiles et matières grasses
  olivenoel: 'Huile d’olive',
  kokosoel: 'Huile de coco',
  rapsoel: 'Huile de colza',

  // Boissons
  wasser: 'Eau',
  orangensaft: 'Jus d’orange',
  apfelsaft: 'Jus de pomme',
  cola: 'Cola',
  'cola-zero': 'Cola zéro',
  'kaffee-schwarz': 'Café (noir)',
  proteinshake: 'Shake protéiné (whey)',
  hafermilch: 'Boisson à l’avoine',
  mandelmilch: 'Boisson à l’amande',

  // Snacks et sucreries
  'schokolade-dunkel': 'Chocolat noir',
  'schokolade-vollmilch': 'Chocolat au lait',
  honig: 'Miel',
  marmelade: 'Confiture',
  nutella: 'Nutella',
  muesliriegel: 'Barre de céréales',
  chips: 'Chips',
  popcorn: 'Pop-corn (nature)',
  'trockenobst-mix': 'Mélange de fruits secs',
  'protein-riegel': 'Barre protéinée',

  // Sauces et plats préparés
  hummus: 'Houmous',
  tomatensauce: 'Sauce tomate',
  pesto: 'Pesto (vert)',
  ketchup: 'Ketchup',
  senf: 'Moutarde',
  sojasauce: 'Sauce soja',
  mayo: 'Mayonnaise',

  // Compléments
  'whey-protein': 'Protéine whey en poudre',
  kreatin: 'Créatine monohydrate',
  'casein-protein': 'Protéine caséine en poudre',

  // Petit-déjeuner et céréales
  muesli: 'Muesli (sans sucre)',
  cornflakes: 'Corn-flakes',
  'crunchy-muesli': 'Muesli croustillant',
  pancakes: 'Pancakes',

  // Surgelés et plats tout prêts
  'pizza-margherita': 'Pizza margherita (surgelée)',
  pommes: 'Frites (surgelées)',
  fischstaebchen: 'Bâtonnets de poisson (surgelés)',
  'gemuese-mix-tk': 'Mélange de légumes (surgelé)',
};
