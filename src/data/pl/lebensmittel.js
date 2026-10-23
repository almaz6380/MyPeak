// Polnische Namen der 124 Lebensmittel und 17 Kategorien aus
// `src/data/foodDatabase.js`.
//
// Nur Namen — Nährwerte, Portionsgrößen und Einheiten sind Zahlen und stehen
// weiter in der Datendatei.
//
// Das Paket wird geladen, sobald jemand nach einem Lebensmittel sucht. Wichtig:
// Die Suche vergleicht gegen den ÜBERSETZTEN Namen. Täte sie das nicht, fände
// ein polnischer Nutzer „Pierś z kurczaka" nur unter „Hähnchenbrust".
export default {
  kategorien: {
    dairy: 'Nabiał',
    eggs: 'Jajka',
    meat: 'Mięso',
    fish: 'Ryby',
    grains: 'Zboża i dodatki',
    bakery: 'Pieczywo i wypieki',
    fruit: 'Owoce',
    vegetables: 'Warzywa',
    legumes: 'Rośliny strączkowe',
    nuts: 'Orzechy i nasiona',
    oils: 'Oleje i tłuszcze',
    drinks: 'Napoje',
    snacks: 'Przekąski i słodycze',
    prepared: 'Sosy i produkty gotowe',
    supplements: 'Suplementy',
    breakfast: 'Śniadanie i płatki',
    frozen: 'Mrożonki i dania gotowe',
  },

  // Nabiał
  magerquark: 'Twaróg chudy',
  'griechischer-joghurt': 'Jogurt grecki',
  naturjoghurt: 'Jogurt naturalny 1,5 %',
  vollmilch: 'Mleko pełne 3,5 %',
  'fettarme-milch': 'Mleko półtłuste 1,5 %',
  huettenkaese: 'Serek wiejski',
  gouda: 'Ser gouda',
  mozzarella: 'Mozzarella',
  parmesan: 'Parmezan',
  skyr: 'Skyr',
  butter: 'Masło',
  frischkaese: 'Serek śmietankowy',

  // Jajka
  'ei-ganz': 'Jajko (rozmiar M)',
  eiweiss: 'Białko jaja',

  // Mięso
  haehnchenbrust: 'Pierś z kurczaka',
  putenbrust: 'Pierś z indyka',
  rinderhack: 'Mielona wołowina',
  rindersteak: 'Stek wołowy',
  schweinefilet: 'Polędwiczka wieprzowa',
  'schinken-gekocht': 'Szynka gotowana',
  salami: 'Salami',
  haehnchenschenkel: 'Udko z kurczaka',

  // Ryby
  lachs: 'Łosoś',
  'thunfisch-dose': 'Tuńczyk (puszka, w sosie własnym)',
  garnelen: 'Krewetki',
  forelle: 'Pstrąg',
  kabeljau: 'Dorsz',

  // Zboża i dodatki
  haferflocken: 'Płatki owsiane',
  'reis-gekocht': 'Ryż (ugotowany)',
  'vollkornreis-gekocht': 'Ryż brązowy (ugotowany)',
  'nudeln-gekocht': 'Makaron (ugotowany)',
  'vollkornnudeln-gekocht': 'Makaron pełnoziarnisty (ugotowany)',
  'kartoffeln-gekocht': 'Ziemniaki (gotowane)',
  suesskartoffel: 'Batat',
  'couscous-gekocht': 'Kuskus (ugotowany)',
  'quinoa-gekocht': 'Komosa ryżowa (ugotowana)',
  'bulgur-gekocht': 'Bulgur (ugotowany)',

  // Pieczywo i wypieki
  vollkornbrot: 'Chleb pełnoziarnisty',
  'toast-weiss': 'Chleb tostowy (biały)',
  brezel: 'Precel',
  roggenbrot: 'Chleb żytni',
  dinkelbroetchen: 'Bułka orkiszowa',
  reiswaffeln: 'Wafle ryżowe',
  'wrap-tortilla': 'Wrap/tortilla',

  // Owoce
  banane: 'Banan',
  apfel: 'Jabłko',
  erdbeeren: 'Truskawki',
  blaubeeren: 'Borówki',
  himbeeren: 'Maliny',
  orange: 'Pomarańcza',
  weintrauben: 'Winogrona',
  wassermelone: 'Arbuz',
  mango: 'Mango',
  kiwi: 'Kiwi',
  birne: 'Gruszka',
  ananas: 'Ananas',

  // Warzywa
  brokkoli: 'Brokuł',
  spinat: 'Szpinak',
  tomate: 'Pomidor',
  gurke: 'Ogórek',
  paprika: 'Papryka',
  karotten: 'Marchew',
  zucchini: 'Cukinia',
  champignons: 'Pieczarki',
  zwiebel: 'Cebula',
  mais: 'Kukurydza (z puszki)',
  erbsen: 'Groszek',
  'bohnen-gruen': 'Fasolka szparagowa',
  blumenkohl: 'Kalafior',
  avocado: 'Awokado',
  'salat-mix': 'Sałata (mieszanka)',

  // Rośliny strączkowe
  'kichererbsen-dose': 'Ciecierzyca (z puszki)',
  'linsen-gekocht': 'Soczewica (ugotowana)',
  kidneybohnen: 'Czerwona fasola (z puszki)',
  edamame: 'Edamame',
  tofu: 'Tofu (naturalne)',

  // Orzechy i nasiona
  mandeln: 'Migdały',
  walnuesse: 'Orzechy włoskie',
  cashews: 'Nerkowce',
  erdnuesse: 'Orzeszki ziemne',
  erdnussbutter: 'Masło orzechowe',
  chiasamen: 'Nasiona chia',
  leinsamen: 'Siemię lniane',
  sonnenblumenkerne: 'Pestki słonecznika',

  // Oleje i tłuszcze
  olivenoel: 'Oliwa z oliwek',
  kokosoel: 'Olej kokosowy',
  rapsoel: 'Olej rzepakowy',

  // Napoje
  wasser: 'Woda',
  orangensaft: 'Sok pomarańczowy',
  apfelsaft: 'Sok jabłkowy',
  cola: 'Cola',
  'cola-zero': 'Cola Zero',
  'kaffee-schwarz': 'Kawa (czarna)',
  proteinshake: 'Shake proteinowy (whey)',
  hafermilch: 'Napój owsiany',
  mandelmilch: 'Napój migdałowy',

  // Przekąski i słodycze
  'schokolade-dunkel': 'Gorzka czekolada',
  'schokolade-vollmilch': 'Czekolada mleczna',
  honig: 'Miód',
  marmelade: 'Dżem',
  nutella: 'Nutella',
  muesliriegel: 'Baton musli',
  chips: 'Chipsy ziemniaczane',
  popcorn: 'Popcorn (naturalny)',
  'trockenobst-mix': 'Mieszanka suszonych owoców',
  'protein-riegel': 'Baton proteinowy',

  // Sosy i produkty gotowe
  hummus: 'Hummus',
  tomatensauce: 'Sos pomidorowy',
  pesto: 'Pesto (zielone)',
  ketchup: 'Ketchup',
  senf: 'Musztarda',
  sojasauce: 'Sos sojowy',
  mayo: 'Majonez',

  // Suplementy
  'whey-protein': 'Białko serwatkowe w proszku',
  kreatin: 'Monohydrat kreatyny',
  'casein-protein': 'Kazeina w proszku',

  // Śniadanie i płatki
  muesli: 'Musli (bez cukru)',
  cornflakes: 'Płatki kukurydziane',
  'crunchy-muesli': 'Musli chrupiące',
  pancakes: 'Naleśniki/pancakes',

  // Mrożonki i dania gotowe
  'pizza-margherita': 'Pizza margherita (mrożona)',
  pommes: 'Frytki (mrożone)',
  fischstaebchen: 'Paluszki rybne (mrożone)',
  'gemuese-mix-tk': 'Mieszanka warzyw (mrożona)',
};
