// Nomes em português dos 124 alimentos e das 17 categorias de
// `src/data/foodDatabase.js`.
//
// Apenas nomes — valores nutricionais, tamanhos de porção e unidades são
// números e continuam no arquivo de dados.
//
// O pacote é carregado assim que alguém busca um alimento. Importante: a busca
// compara o nome TRADUZIDO. Sem isso, um usuário brasileiro só encontraria
// «Peito de frango» digitando «Hähnchenbrust».
export default {
  kategorien: {
    dairy: 'Laticínios',
    eggs: 'Ovos',
    meat: 'Carnes',
    fish: 'Peixes',
    grains: 'Cereais e acompanhamentos',
    bakery: 'Pães e panificados',
    fruit: 'Frutas',
    vegetables: 'Legumes e verduras',
    legumes: 'Leguminosas',
    nuts: 'Oleaginosas e sementes',
    oils: 'Óleos e gorduras',
    drinks: 'Bebidas',
    snacks: 'Lanches e doces',
    prepared: 'Molhos e prontos',
    supplements: 'Suplementos',
    breakfast: 'Café da manhã e cereais',
    frozen: 'Congelados e práticos',
  },

  // Laticínios
  magerquark: 'Quark desnatado',
  'griechischer-joghurt': 'Iogurte grego',
  naturjoghurt: 'Iogurte natural 1,5%',
  vollmilch: 'Leite integral 3,5%',
  'fettarme-milch': 'Leite semidesnatado 1,5%',
  huettenkaese: 'Queijo cottage',
  gouda: 'Queijo gouda',
  mozzarella: 'Muçarela',
  parmesan: 'Parmesão',
  skyr: 'Skyr',
  butter: 'Manteiga',
  frischkaese: 'Cream cheese',

  // Ovos
  'ei-ganz': 'Ovo (tamanho médio)',
  eiweiss: 'Clara de ovo',

  // Carnes
  haehnchenbrust: 'Peito de frango',
  putenbrust: 'Peito de peru',
  rinderhack: 'Carne moída bovina',
  rindersteak: 'Bife bovino',
  schweinefilet: 'Filé mignon suíno',
  'schinken-gekocht': 'Presunto cozido',
  salami: 'Salame',
  haehnchenschenkel: 'Coxa de frango',

  // Peixes
  lachs: 'Salmão',
  'thunfisch-dose': 'Atum (lata, ao natural)',
  garnelen: 'Camarão',
  forelle: 'Truta',
  kabeljau: 'Bacalhau fresco',

  // Cereais e acompanhamentos
  haferflocken: 'Aveia em flocos',
  'reis-gekocht': 'Arroz (cozido)',
  'vollkornreis-gekocht': 'Arroz integral (cozido)',
  'nudeln-gekocht': 'Macarrão (cozido)',
  'vollkornnudeln-gekocht': 'Macarrão integral (cozido)',
  'kartoffeln-gekocht': 'Batata (cozida)',
  suesskartoffel: 'Batata-doce',
  'couscous-gekocht': 'Cuscuz marroquino (cozido)',
  'quinoa-gekocht': 'Quinoa (cozida)',
  'bulgur-gekocht': 'Bulgur (cozido)',

  // Pães e panificados
  vollkornbrot: 'Pão integral',
  'toast-weiss': 'Pão de forma (branco)',
  brezel: 'Pretzel',
  roggenbrot: 'Pão de centeio',
  dinkelbroetchen: 'Pãozinho de espelta',
  reiswaffeln: 'Bolachas de arroz',
  'wrap-tortilla': 'Wrap/tortilha',

  // Frutas
  banane: 'Banana',
  apfel: 'Maçã',
  erdbeeren: 'Morangos',
  blaubeeren: 'Mirtilos',
  himbeeren: 'Framboesas',
  orange: 'Laranja',
  weintrauben: 'Uvas',
  wassermelone: 'Melancia',
  mango: 'Manga',
  kiwi: 'Kiwi',
  birne: 'Pera',
  ananas: 'Abacaxi',

  // Legumes e verduras
  brokkoli: 'Brócolis',
  spinat: 'Espinafre',
  tomate: 'Tomate',
  gurke: 'Pepino',
  paprika: 'Pimentão',
  karotten: 'Cenoura',
  zucchini: 'Abobrinha',
  champignons: 'Champignon',
  zwiebel: 'Cebola',
  mais: 'Milho (lata)',
  erbsen: 'Ervilhas',
  'bohnen-gruen': 'Vagem',
  blumenkohl: 'Couve-flor',
  avocado: 'Abacate',
  'salat-mix': 'Mix de folhas',

  // Leguminosas
  'kichererbsen-dose': 'Grão-de-bico (lata)',
  'linsen-gekocht': 'Lentilhas (cozidas)',
  kidneybohnen: 'Feijão vermelho (lata)',
  edamame: 'Edamame',
  tofu: 'Tofu (natural)',

  // Oleaginosas e sementes
  mandeln: 'Amêndoas',
  walnuesse: 'Nozes',
  cashews: 'Castanha de caju',
  erdnuesse: 'Amendoim',
  erdnussbutter: 'Pasta de amendoim',
  chiasamen: 'Sementes de chia',
  leinsamen: 'Sementes de linhaça',
  sonnenblumenkerne: 'Sementes de girassol',

  // Óleos e gorduras
  olivenoel: 'Azeite de oliva',
  kokosoel: 'Óleo de coco',
  rapsoel: 'Óleo de canola',

  // Bebidas
  wasser: 'Água',
  orangensaft: 'Suco de laranja',
  apfelsaft: 'Suco de maçã',
  cola: 'Refrigerante de cola',
  'cola-zero': 'Cola zero',
  'kaffee-schwarz': 'Café (preto)',
  proteinshake: 'Shake de proteína (whey)',
  hafermilch: 'Bebida de aveia',
  mandelmilch: 'Bebida de amêndoa',

  // Lanches e doces
  'schokolade-dunkel': 'Chocolate amargo',
  'schokolade-vollmilch': 'Chocolate ao leite',
  honig: 'Mel',
  marmelade: 'Geleia',
  nutella: 'Nutella',
  muesliriegel: 'Barra de cereais',
  chips: 'Batata frita de pacote',
  popcorn: 'Pipoca (sem tempero)',
  'trockenobst-mix': 'Mix de frutas secas',
  'protein-riegel': 'Barra de proteína',

  // Molhos e prontos
  hummus: 'Homus',
  tomatensauce: 'Molho de tomate',
  pesto: 'Pesto (verde)',
  ketchup: 'Ketchup',
  senf: 'Mostarda',
  sojasauce: 'Molho shoyu',
  mayo: 'Maionese',

  // Suplementos
  'whey-protein': 'Whey protein em pó',
  kreatin: 'Creatina monoidratada',
  'casein-protein': 'Caseína em pó',

  // Café da manhã e cereais
  muesli: 'Muesli (sem açúcar)',
  cornflakes: 'Flocos de milho',
  'crunchy-muesli': 'Granola crocante',
  pancakes: 'Panquecas',

  // Congelados e práticos
  'pizza-margherita': 'Pizza margherita (congelada)',
  pommes: 'Batata frita (congelada)',
  fischstaebchen: 'Palitos de peixe (congelados)',
  'gemuese-mix-tk': 'Mix de legumes (congelado)',
};
