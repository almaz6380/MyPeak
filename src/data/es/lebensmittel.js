// Spanische Namen der 124 Lebensmittel und 17 Kategorien aus
// `src/data/foodDatabase.js`.
//
// Nur Namen — Nährwerte, Portionsgrößen und Einheiten sind Zahlen und stehen
// weiter in der Datendatei.
//
// Das Paket wird geladen, sobald jemand nach einem Lebensmittel sucht. Wichtig:
// Die Suche vergleicht gegen den ÜBERSETZTEN Namen. Täte sie das nicht, fände
// ein spanischer Nutzer „Pechuga de pollo" nur unter „Hähnchenbrust".
export default {
  kategorien: {
    dairy: 'Lácteos',
    eggs: 'Huevos',
    meat: 'Carne',
    fish: 'Pescado',
    grains: 'Cereales y guarniciones',
    bakery: 'Pan y bollería',
    fruit: 'Fruta',
    vegetables: 'Verduras',
    legumes: 'Legumbres',
    nuts: 'Frutos secos y semillas',
    oils: 'Aceites y grasas',
    drinks: 'Bebidas',
    snacks: 'Snacks y dulces',
    prepared: 'Salsas y preparados',
    supplements: 'Suplementos',
    breakfast: 'Desayuno y cereales',
    frozen: 'Congelados y precocinados',
  },

  // Lácteos
  magerquark: 'Quark desnatado',
  'griechischer-joghurt': 'Yogur griego',
  naturjoghurt: 'Yogur natural 1,5 %',
  vollmilch: 'Leche entera 3,5 %',
  'fettarme-milch': 'Leche semidesnatada 1,5 %',
  huettenkaese: 'Requesón',
  gouda: 'Queso gouda',
  mozzarella: 'Mozzarella',
  parmesan: 'Parmesano',
  skyr: 'Skyr',
  butter: 'Mantequilla',
  frischkaese: 'Queso fresco para untar',

  // Huevos
  'ei-ganz': 'Huevo (tamaño M)',
  eiweiss: 'Clara de huevo',

  // Carne
  haehnchenbrust: 'Pechuga de pollo',
  putenbrust: 'Pechuga de pavo',
  rinderhack: 'Carne picada de ternera',
  rindersteak: 'Filete de ternera',
  schweinefilet: 'Solomillo de cerdo',
  'schinken-gekocht': 'Jamón cocido',
  salami: 'Salchichón',
  haehnchenschenkel: 'Muslo de pollo',

  // Pescado
  lachs: 'Salmón',
  'thunfisch-dose': 'Atún (lata, al natural)',
  garnelen: 'Gambas',
  forelle: 'Trucha',
  kabeljau: 'Bacalao',

  // Cereales y guarniciones
  haferflocken: 'Copos de avena',
  'reis-gekocht': 'Arroz (cocido)',
  'vollkornreis-gekocht': 'Arroz integral (cocido)',
  'nudeln-gekocht': 'Pasta (cocida)',
  'vollkornnudeln-gekocht': 'Pasta integral (cocida)',
  'kartoffeln-gekocht': 'Patatas (cocidas)',
  suesskartoffel: 'Boniato',
  'couscous-gekocht': 'Cuscús (cocido)',
  'quinoa-gekocht': 'Quinoa (cocida)',
  'bulgur-gekocht': 'Bulgur (cocido)',

  // Pan y bollería
  vollkornbrot: 'Pan integral',
  'toast-weiss': 'Pan de molde (blanco)',
  brezel: 'Pretzel',
  roggenbrot: 'Pan de centeno',
  dinkelbroetchen: 'Panecillo de espelta',
  reiswaffeln: 'Tortitas de arroz',
  'wrap-tortilla': 'Wrap/tortilla',

  // Fruta
  banane: 'Plátano',
  apfel: 'Manzana',
  erdbeeren: 'Fresas',
  blaubeeren: 'Arándanos',
  himbeeren: 'Frambuesas',
  orange: 'Naranja',
  weintrauben: 'Uvas',
  wassermelone: 'Sandía',
  mango: 'Mango',
  kiwi: 'Kiwi',
  birne: 'Pera',
  ananas: 'Piña',

  // Verduras
  brokkoli: 'Brócoli',
  spinat: 'Espinacas',
  tomate: 'Tomate',
  gurke: 'Pepino',
  paprika: 'Pimiento',
  karotten: 'Zanahorias',
  zucchini: 'Calabacín',
  champignons: 'Champiñones',
  zwiebel: 'Cebolla',
  mais: 'Maíz (de bote)',
  erbsen: 'Guisantes',
  'bohnen-gruen': 'Judías verdes',
  blumenkohl: 'Coliflor',
  avocado: 'Aguacate',
  'salat-mix': 'Hojas de ensalada (mezcla)',

  // Legumbres
  'kichererbsen-dose': 'Garbanzos (de bote)',
  'linsen-gekocht': 'Lentejas (cocidas)',
  kidneybohnen: 'Alubias rojas (de bote)',
  edamame: 'Edamame',
  tofu: 'Tofu (natural)',

  // Frutos secos y semillas
  mandeln: 'Almendras',
  walnuesse: 'Nueces',
  cashews: 'Anacardos',
  erdnuesse: 'Cacahuetes',
  erdnussbutter: 'Mantequilla de cacahuete',
  chiasamen: 'Semillas de chía',
  leinsamen: 'Semillas de lino',
  sonnenblumenkerne: 'Pipas de girasol',

  // Aceites y grasas
  olivenoel: 'Aceite de oliva',
  kokosoel: 'Aceite de coco',
  rapsoel: 'Aceite de colza',

  // Bebidas
  wasser: 'Agua',
  orangensaft: 'Zumo de naranja',
  apfelsaft: 'Zumo de manzana',
  cola: 'Cola',
  'cola-zero': 'Cola zero',
  'kaffee-schwarz': 'Café (solo)',
  proteinshake: 'Batido de proteína (suero)',
  hafermilch: 'Bebida de avena',
  mandelmilch: 'Bebida de almendra',

  // Snacks y dulces
  'schokolade-dunkel': 'Chocolate negro',
  'schokolade-vollmilch': 'Chocolate con leche',
  honig: 'Miel',
  marmelade: 'Mermelada',
  nutella: 'Nutella',
  muesliriegel: 'Barrita de cereales',
  chips: 'Patatas fritas de bolsa',
  popcorn: 'Palomitas (naturales)',
  'trockenobst-mix': 'Mezcla de fruta deshidratada',
  'protein-riegel': 'Barrita de proteína',

  // Salsas y preparados
  hummus: 'Hummus',
  tomatensauce: 'Salsa de tomate',
  pesto: 'Pesto (verde)',
  ketchup: 'Kétchup',
  senf: 'Mostaza',
  sojasauce: 'Salsa de soja',
  mayo: 'Mayonesa',

  // Suplementos
  'whey-protein': 'Proteína de suero en polvo',
  kreatin: 'Creatina monohidrato',
  'casein-protein': 'Proteína de caseína en polvo',

  // Desayuno y cereales
  muesli: 'Muesli (sin azúcar)',
  cornflakes: 'Copos de maíz',
  'crunchy-muesli': 'Muesli crujiente',
  pancakes: 'Tortitas',

  // Congelados y precocinados
  'pizza-margherita': 'Pizza margarita (congelada)',
  pommes: 'Patatas fritas (congeladas)',
  fischstaebchen: 'Palitos de pescado (congelados)',
  'gemuese-mix-tk': 'Mezcla de verduras (congelada)',
};
