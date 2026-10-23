// Japanische Namen der 124 Lebensmittel und 17 Kategorien aus
// `src/data/foodDatabase.js`.
//
// Nur Namen — Nährwerte, Portionsgrößen und Einheiten sind Zahlen und stehen
// weiter in der Datendatei. Die Suche vergleicht gegen den ÜBERSETZTEN Namen.
export default {
  kategorien: {
    dairy: '乳製品',
    eggs: '卵',
    meat: '肉',
    fish: '魚介',
    grains: '穀物・主食',
    bakery: 'パン類',
    fruit: '果物',
    vegetables: '野菜',
    legumes: '豆類',
    nuts: 'ナッツ・種子',
    oils: '油脂',
    drinks: '飲み物',
    snacks: 'お菓子・スナック',
    prepared: 'ソース・調味料',
    supplements: 'サプリメント',
    breakfast: '朝食・シリアル',
    frozen: '冷凍食品・調理済み食品',
  },

  // 乳製品
  magerquark: '低脂肪クワルク',
  'griechischer-joghurt': 'ギリシャヨーグルト',
  naturjoghurt: 'プレーンヨーグルト 1.5 %',
  vollmilch: '牛乳 3.5 %',
  'fettarme-milch': '低脂肪乳 1.5 %',
  huettenkaese: 'カッテージチーズ',
  gouda: 'ゴーダチーズ',
  mozzarella: 'モッツァレラ',
  parmesan: 'パルメザンチーズ',
  skyr: 'スキール',
  butter: 'バター',
  frischkaese: 'クリームチーズ',

  // 卵
  'ei-ganz': '卵（Mサイズ）',
  eiweiss: '卵白',

  // 肉
  haehnchenbrust: '鶏むね肉',
  putenbrust: '七面鳥むね肉',
  rinderhack: '牛ひき肉',
  rindersteak: '牛ステーキ',
  schweinefilet: '豚ヒレ肉',
  'schinken-gekocht': 'ボイルハム',
  salami: 'サラミ',
  haehnchenschenkel: '鶏もも肉',

  // 魚介
  lachs: 'サーモン',
  'thunfisch-dose': 'ツナ缶（水煮）',
  garnelen: 'エビ',
  forelle: 'マス',
  kabeljau: 'タラ',

  // 穀物・主食
  haferflocken: 'オートミール',
  'reis-gekocht': 'ごはん（炊いたもの）',
  'vollkornreis-gekocht': '玄米ごはん（炊いたもの）',
  'nudeln-gekocht': 'パスタ（ゆで）',
  'vollkornnudeln-gekocht': '全粒粉パスタ（ゆで）',
  'kartoffeln-gekocht': 'じゃがいも（ゆで）',
  suesskartoffel: 'さつまいも',
  'couscous-gekocht': 'クスクス（調理済み）',
  'quinoa-gekocht': 'キヌア（調理済み）',
  'bulgur-gekocht': 'ブルグル（調理済み）',

  // パン類
  vollkornbrot: '全粒粉パン',
  'toast-weiss': '食パン（白）',
  brezel: 'プレッツェル',
  roggenbrot: 'ライ麦パン',
  dinkelbroetchen: 'スペルト小麦のロールパン',
  reiswaffeln: 'ライスケーキ',
  'wrap-tortilla': 'ラップ／トルティーヤ',

  // 果物
  banane: 'バナナ',
  apfel: 'りんご',
  erdbeeren: 'いちご',
  blaubeeren: 'ブルーベリー',
  himbeeren: 'ラズベリー',
  orange: 'オレンジ',
  weintrauben: 'ぶどう',
  wassermelone: 'すいか',
  mango: 'マンゴー',
  kiwi: 'キウイ',
  birne: '洋なし',
  ananas: 'パイナップル',

  // 野菜
  brokkoli: 'ブロッコリー',
  spinat: 'ほうれん草',
  tomate: 'トマト',
  gurke: 'きゅうり',
  paprika: 'パプリカ',
  karotten: 'にんじん',
  zucchini: 'ズッキーニ',
  champignons: 'マッシュルーム',
  zwiebel: '玉ねぎ',
  mais: 'コーン（缶詰）',
  erbsen: 'グリーンピース',
  'bohnen-gruen': 'さやいんげん',
  blumenkohl: 'カリフラワー',
  avocado: 'アボカド',
  'salat-mix': 'ミックスサラダ',

  // 豆類
  'kichererbsen-dose': 'ひよこ豆（缶詰）',
  'linsen-gekocht': 'レンズ豆（ゆで）',
  kidneybohnen: 'レッドキドニービーンズ（缶詰）',
  edamame: '枝豆',
  tofu: '豆腐（プレーン）',

  // ナッツ・種子
  mandeln: 'アーモンド',
  walnuesse: 'くるみ',
  cashews: 'カシューナッツ',
  erdnuesse: 'ピーナッツ',
  erdnussbutter: 'ピーナッツバター',
  chiasamen: 'チアシード',
  leinsamen: 'フラックスシード（亜麻仁）',
  sonnenblumenkerne: 'ひまわりの種',

  // 油脂
  olivenoel: 'オリーブオイル',
  kokosoel: 'ココナッツオイル',
  rapsoel: '菜種油',

  // 飲み物
  wasser: '水',
  orangensaft: 'オレンジジュース',
  apfelsaft: 'りんごジュース',
  cola: 'コーラ',
  'cola-zero': 'コーラ ゼロ',
  'kaffee-schwarz': 'コーヒー（ブラック）',
  proteinshake: 'プロテインシェイク（ホエイ）',
  hafermilch: 'オーツミルク',
  mandelmilch: 'アーモンドミルク',

  // お菓子・スナック
  'schokolade-dunkel': 'ダークチョコレート',
  'schokolade-vollmilch': 'ミルクチョコレート',
  honig: 'はちみつ',
  marmelade: 'ジャム',
  nutella: 'ヌテラ',
  muesliriegel: 'シリアルバー',
  chips: 'ポテトチップス',
  popcorn: 'ポップコーン（プレーン）',
  'trockenobst-mix': 'ミックスドライフルーツ',
  'protein-riegel': 'プロテインバー',

  // ソース・調味料
  hummus: 'フムス',
  tomatensauce: 'トマトソース',
  pesto: 'ジェノベーゼソース（バジルペースト）',
  ketchup: 'ケチャップ',
  senf: 'マスタード',
  sojasauce: '醤油',
  mayo: 'マヨネーズ',

  // サプリメント
  'whey-protein': 'ホエイプロテインパウダー',
  kreatin: 'クレアチン一水和物',
  'casein-protein': 'カゼインプロテインパウダー',

  // 朝食・シリアル
  muesli: 'ミューズリー（砂糖不使用）',
  cornflakes: 'コーンフレーク',
  'crunchy-muesli': 'クランチーミューズリー',
  pancakes: 'パンケーキ',

  // 冷凍食品・調理済み食品
  'pizza-margherita': 'ピザ・マルゲリータ（冷凍）',
  pommes: 'フライドポテト（冷凍）',
  fischstaebchen: 'フィッシュスティック（冷凍）',
  'gemuese-mix-tk': 'ミックスベジタブル（冷凍）',
};
