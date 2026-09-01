// أسماء عربية لـ 124 صنفًا غذائيًا و17 فئة من `src/data/foodDatabase.js`.
//
// أسماء فقط — القيم الغذائية وأحجام الحصص والوحدات أرقام وتبقى في ملف
// البيانات.
//
// يُحمَّل هذا الملف عند البحث عن طعام. المهم: البحث يقارن الاسم المترجَم.
// لولا ذلك لما وجد المستخدم العربي «صدر دجاج» إلا بكتابة «Hähnchenbrust».
export default {
  kategorien: {
    dairy: 'منتجات الألبان',
    eggs: 'البيض',
    meat: 'اللحوم',
    fish: 'الأسماك',
    grains: 'الحبوب والأطباق الجانبية',
    bakery: 'الخبز والمخبوزات',
    fruit: 'الفواكه',
    vegetables: 'الخضروات',
    legumes: 'البقوليات',
    nuts: 'المكسرات والبذور',
    oils: 'الزيوت والدهون',
    drinks: 'المشروبات',
    snacks: 'الوجبات الخفيفة والحلويات',
    prepared: 'الصلصات والجاهزة',
    supplements: 'المكملات',
    breakfast: 'الإفطار وحبوب الفطور',
    frozen: 'المجمّدات والجاهز للتسخين',
  },

  // منتجات الألبان
  magerquark: 'كوارك خالي الدسم',
  'griechischer-joghurt': 'زبادي يوناني',
  naturjoghurt: 'زبادي طبيعي 1.5%',
  vollmilch: 'حليب كامل الدسم 3.5%',
  'fettarme-milch': 'حليب قليل الدسم 1.5%',
  huettenkaese: 'جبن قريش',
  gouda: 'جبن غودا',
  mozzarella: 'موزاريلا',
  parmesan: 'بارميزان',
  skyr: 'سكير',
  butter: 'زبدة',
  frischkaese: 'جبن كريمي',

  // البيض
  'ei-ganz': 'بيضة (حجم متوسط)',
  eiweiss: 'بياض البيض',

  // اللحوم
  haehnchenbrust: 'صدر دجاج',
  putenbrust: 'صدر ديك رومي',
  rinderhack: 'لحم بقري مفروم',
  rindersteak: 'ستيك بقري',
  schweinefilet: 'فيليه خنزير',
  'schinken-gekocht': 'لحم مطهو مقدّد',
  salami: 'سلامي',
  haehnchenschenkel: 'ورك دجاج',

  // الأسماك
  lachs: 'سلمون',
  'thunfisch-dose': 'تونة (علبة، في ماءها)',
  garnelen: 'روبيان',
  forelle: 'سمك السلمون المرقّط',
  kabeljau: 'سمك القدّ',

  // الحبوب والأطباق الجانبية
  haferflocken: 'رقائق الشوفان',
  'reis-gekocht': 'أرز (مطبوخ)',
  'vollkornreis-gekocht': 'أرز أسمر (مطبوخ)',
  'nudeln-gekocht': 'معكرونة (مطبوخة)',
  'vollkornnudeln-gekocht': 'معكرونة أسمر (مطبوخة)',
  'kartoffeln-gekocht': 'بطاطس (مسلوقة)',
  suesskartoffel: 'بطاطا حلوة',
  'couscous-gekocht': 'كسكس (مطبوخ)',
  'quinoa-gekocht': 'كينوا (مطبوخة)',
  'bulgur-gekocht': 'برغل (مطبوخ)',

  // الخبز والمخبوزات
  vollkornbrot: 'خبز أسمر',
  'toast-weiss': 'خبز توست أبيض',
  brezel: 'بريتزل',
  roggenbrot: 'خبز الجاودار',
  dinkelbroetchen: 'خبز صغير من القمح المقشّر',
  reiswaffeln: 'رقائق الأرز',
  'wrap-tortilla': 'راب/تورتيلا',

  // الفواكه
  banane: 'موز',
  apfel: 'تفاح',
  erdbeeren: 'فراولة',
  blaubeeren: 'توت أزرق',
  himbeeren: 'توت العليق',
  orange: 'برتقال',
  weintrauben: 'عنب',
  wassermelone: 'بطيخ',
  mango: 'مانجو',
  kiwi: 'كيوي',
  birne: 'كمثرى',
  ananas: 'أناناس',

  // الخضروات
  brokkoli: 'بروكلي',
  spinat: 'سبانخ',
  tomate: 'طماطم',
  gurke: 'خيار',
  paprika: 'فلفل حلو',
  karotten: 'جزر',
  zucchini: 'كوسة',
  champignons: 'فطر',
  zwiebel: 'بصل',
  mais: 'ذرة (علبة)',
  erbsen: 'بازلاء',
  'bohnen-gruen': 'فاصولياء خضراء',
  blumenkohl: 'قرنبيط',
  avocado: 'أفوكادو',
  'salat-mix': 'خليط أوراق سلطة',

  // البقوليات
  'kichererbsen-dose': 'حمص (علبة)',
  'linsen-gekocht': 'عدس (مطبوخ)',
  kidneybohnen: 'فاصولياء حمراء (علبة)',
  edamame: 'إدامامي',
  tofu: 'توفو (سادة)',

  // المكسرات والبذور
  mandeln: 'لوز',
  walnuesse: 'جوز',
  cashews: 'كاجو',
  erdnuesse: 'فول سوداني',
  erdnussbutter: 'زبدة الفول السوداني',
  chiasamen: 'بذور الشيا',
  leinsamen: 'بذور الكتان',
  sonnenblumenkerne: 'بذور عباد الشمس',

  // الزيوت والدهون
  olivenoel: 'زيت زيتون',
  kokosoel: 'زيت جوز الهند',
  rapsoel: 'زيت الكانولا',

  // المشروبات
  wasser: 'ماء',
  orangensaft: 'عصير برتقال',
  apfelsaft: 'عصير تفاح',
  cola: 'كولا',
  'cola-zero': 'كولا زيرو',
  'kaffee-schwarz': 'قهوة (سادة)',
  proteinshake: 'مشروب بروتين (واي)',
  hafermilch: 'حليب الشوفان',
  mandelmilch: 'حليب اللوز',

  // الوجبات الخفيفة والحلويات
  'schokolade-dunkel': 'شوكولاتة داكنة',
  'schokolade-vollmilch': 'شوكولاتة بالحليب',
  honig: 'عسل',
  marmelade: 'مربّى',
  nutella: 'نوتيلا',
  muesliriegel: 'لوح حبوب',
  chips: 'رقائق بطاطس',
  popcorn: 'فشار (سادة)',
  'trockenobst-mix': 'خليط فواكه مجفّفة',
  'protein-riegel': 'لوح بروتين',

  // الصلصات والجاهزة
  hummus: 'حمص بالطحينة',
  tomatensauce: 'صلصة طماطم',
  pesto: 'بيستو (أخضر)',
  ketchup: 'كاتشب',
  senf: 'خردل',
  sojasauce: 'صلصة الصويا',
  mayo: 'مايونيز',

  // المكملات
  'whey-protein': 'بروتين واي بودرة',
  kreatin: 'كرياتين مونوهيدرات',
  'casein-protein': 'بروتين كازين بودرة',

  // الإفطار وحبوب الفطور
  muesli: 'موسلي (بلا سكر)',
  cornflakes: 'رقائق الذرة',
  'crunchy-muesli': 'موسلي مقرمش',
  pancakes: 'بان كيك',

  // المجمّدات والجاهز للتسخين
  'pizza-margherita': 'بيتزا مارغريتا (مجمّدة)',
  pommes: 'بطاطس مقلية (مجمّدة)',
  fischstaebchen: 'أصابع سمك (مجمّدة)',
  'gemuese-mix-tk': 'خليط خضار (مجمّد)',
};
