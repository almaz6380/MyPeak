// Beschriftungen der Trainingstage aus `peakPrograms.js` („Push", „Oberkörper",
// „Boxen: Kombis" …).
//
// **Warum hier und nicht in der Datendatei?** Diese `label`-Felder gibt es dort
// nur EINMAL, auf Deutsch — anders als bei allen anderen Texten fehlt ein
// `labelEN`. Englische Nutzer sahen deshalb bisher „Oberkörper" und
// „Schwachstellen" mitten in einer englischen Oberfläche. Statt 78 Stellen in
// der Datendatei zu verdoppeln, steht die Übersetzung hier als flache Tabelle;
// der deutsche Text ist zugleich der Schlüssel.
//
// Gelesen wird über `beschriftung()`. Fehlt ein Eintrag, bleibt die deutsche
// Beschriftung stehen — dasselbe Verhalten wie bisher, nur eben als Rückfall
// statt als Regel.
import { beschriftung } from '../lib/sprache.js';

const TAGE = {
  // Krafttraining
  Push: { de: 'Push', en: 'Push', es: 'Empuje', fr: 'Poussée', pt: 'Empurrar', ar: 'دفع', nl: 'Push', pl: 'Push', it: 'Push' },
  Pull: { de: 'Pull', en: 'Pull', es: 'Tirón', fr: 'Tirage', pt: 'Puxar', ar: 'سحب', nl: 'Pull', pl: 'Pull', it: 'Pull' },
  Legs: { de: 'Legs', en: 'Legs', es: 'Pierna', fr: 'Jambes', pt: 'Pernas', ar: 'أرجل', nl: 'Legs', pl: 'Nogi', it: 'Gambe' },
  'Oberkörper': { de: 'Oberkörper', en: 'Upper Body', es: 'Tren superior', fr: 'Haut du corps', pt: 'Parte superior', ar: 'الجزء العلوي', nl: 'Bovenlichaam', pl: 'Góra ciała', it: 'Parte superiore' },
  'Unterkörper': { de: 'Unterkörper', en: 'Lower Body', es: 'Tren inferior', fr: 'Bas du corps', pt: 'Parte inferior', ar: 'الجزء السفلي', nl: 'Onderlichaam', pl: 'Dół ciała', it: 'Parte inferiore' },
  Brust: { de: 'Brust', en: 'Chest', es: 'Pecho', fr: 'Pectoraux', pt: 'Peito', ar: 'الصدر', nl: 'Borst', pl: 'Klatka', it: 'Petto' },
  'Rücken': { de: 'Rücken', en: 'Back', es: 'Espalda', fr: 'Dos', pt: 'Costas', ar: 'الظهر', nl: 'Rug', pl: 'Plecy', it: 'Schiena' },
  Schultern: { de: 'Schultern', en: 'Shoulders', es: 'Hombros', fr: 'Épaules', pt: 'Ombros', ar: 'الأكتاف', nl: 'Schouders', pl: 'Barki', it: 'Spalle' },
  Arme: { de: 'Arme', en: 'Arms', es: 'Brazos', fr: 'Bras', pt: 'Braços', ar: 'الذراعان', nl: 'Armen', pl: 'Ramiona', it: 'Braccia' },
  Beine: { de: 'Beine', en: 'Legs', es: 'Piernas', fr: 'Jambes', pt: 'Pernas', ar: 'الأرجل', nl: 'Benen', pl: 'Nogi', it: 'Gambe' },
  'Ganzkörper A': { de: 'Ganzkörper A', en: 'Full Body A', es: 'Cuerpo completo A', fr: 'Corps entier A', pt: 'Corpo completo A', ar: 'كامل الجسم A', nl: 'Full body A', pl: 'Full body A', it: 'Total body A' },
  'Ganzkörper B': { de: 'Ganzkörper B', en: 'Full Body B', es: 'Cuerpo completo B', fr: 'Corps entier B', pt: 'Corpo completo B', ar: 'كامل الجسم B', nl: 'Full body B', pl: 'Full body B', it: 'Total body B' },
  'Ganzkörper C': { de: 'Ganzkörper C', en: 'Full Body C', es: 'Cuerpo completo C', fr: 'Corps entier C', pt: 'Corpo completo C', ar: 'كامل الجسم C', nl: 'Full body C', pl: 'Full body C', it: 'Total body C' },
  'Push + Quads': { de: 'Push + Quads', en: 'Push + Quads', es: 'Empuje + cuádriceps', fr: 'Poussée + quadriceps', pt: 'Empurrar + quadríceps', ar: 'دفع + الفخذ الأمامي', nl: 'Push + quads', pl: 'Push + czworogłowe', it: 'Push + quadricipiti' },
  'Pull + Hamstrings': { de: 'Pull + Hamstrings', en: 'Pull + Hamstrings', es: 'Tirón + isquiotibiales', fr: 'Tirage + ischio-jambiers', pt: 'Puxar + posteriores', ar: 'سحب + أوتار الركبة', nl: 'Pull + hamstrings', pl: 'Pull + dwugłowe uda', it: 'Pull + femorali' },
  'Schultern + Arme': { de: 'Schultern + Arme', en: 'Shoulders + Arms', es: 'Hombros + brazos', fr: 'Épaules + bras', pt: 'Ombros + braços', ar: 'أكتاف + ذراعان', nl: 'Schouders + armen', pl: 'Barki + ramiona', it: 'Spalle + braccia' },
  Schwachstellen: { de: 'Schwachstellen', en: 'Weak Points', es: 'Puntos débiles', fr: 'Points faibles', pt: 'Pontos fracos', ar: 'نقاط الضعف', nl: 'Zwakke punten', pl: 'Słabe punkty', it: 'Punti deboli' },

  // Cardio
  'Lauf + Gehpausen': { de: 'Lauf + Gehpausen', en: 'Run + Walk Breaks', es: 'Carrera + pausas caminando', fr: 'Course + pauses marche', pt: 'Corrida + pausas caminhando', ar: 'جري + فترات مشي', nl: 'Lopen + wandelpauzes', pl: 'Bieg + marsz', it: 'Corsa + pause camminando' },
  '4×4 Intervalle': { de: '4×4 Intervalle', en: '4×4 Intervals', es: 'Intervalos 4×4', fr: 'Intervalles 4×4', pt: 'Intervalos 4×4', ar: 'فواصل 4×4', nl: '4×4-intervallen', pl: 'Interwały 4×4', it: 'Intervalli 4×4' },
  '10-20-30': { de: '10-20-30', en: '10-20-30', es: '10-20-30', fr: '10-20-30', pt: '10-20-30', ar: '10-20-30', nl: '10-20-30', pl: '10-20-30', it: '10-20-30' },
  'Zone 2': { de: 'Zone 2', en: 'Zone 2', es: 'Zona 2', fr: 'Zone 2', pt: 'Zona 2', ar: 'المنطقة 2', nl: 'Zone 2', pl: 'Strefa 2', it: 'Zona 2' },
  'Langer Lauf': { de: 'Langer Lauf', en: 'Long Run', es: 'Carrera larga', fr: 'Sortie longue', pt: 'Corrida longa', ar: 'جري طويل', nl: 'Lange duurloop', pl: 'Długi bieg', it: 'Lungo' },
  Intervalle: { de: 'Intervalle', en: 'Intervals', es: 'Intervalos', fr: 'Intervalles', pt: 'Intervalos', ar: 'فواصل', nl: 'Intervallen', pl: 'Interwały', it: 'Intervalli' },
  Tempolauf: { de: 'Tempolauf', en: 'Tempo Run', es: 'Carrera a ritmo', fr: 'Séance au seuil', pt: 'Corrida em ritmo', ar: 'جري بإيقاع', nl: 'Tempoloop', pl: 'Bieg tempowy', it: 'Corsa a ritmo' },
  'Lockerer Lauf': { de: 'Lockerer Lauf', en: 'Easy Run', es: 'Carrera suave', fr: 'Footing tranquille', pt: 'Corrida leve', ar: 'جري خفيف', nl: 'Rustige loop', pl: 'Lekki bieg', it: 'Corsa facile' },

  // HIIT
  Tabata: { de: 'Tabata', en: 'Tabata', es: 'Tabata', fr: 'Tabata', pt: 'Tabata', ar: 'تاباتا', nl: 'Tabata', pl: 'Tabata', it: 'Tabata' },
  'SIT 60/75': { de: 'SIT 60/75', en: 'SIT 60/75', es: 'SIT 60/75', fr: 'SIT 60/75', pt: 'SIT 60/75', ar: 'SIT 60/75', nl: 'SIT 60/75', pl: 'SIT 60/75', it: 'SIT 60/75' },
  'HIIT 30/30': { de: 'HIIT 30/30', en: 'HIIT 30/30', es: 'HIIT 30/30', fr: 'HIIT 30/30', pt: 'HIIT 30/30', ar: 'HIIT 30/30', nl: 'HIIT 30/30', pl: 'HIIT 30/30', it: 'HIIT 30/30' },
  'HIIT Power': { de: 'HIIT Power', en: 'HIIT Power', es: 'HIIT potencia', fr: 'HIIT puissance', pt: 'HIIT potência', ar: 'HIIT قوة', nl: 'HIIT Power', pl: 'HIIT moc', it: 'HIIT potenza' },
  'HIIT Core': { de: 'HIIT Core', en: 'HIIT Core', es: 'HIIT core', fr: 'HIIT gainage', pt: 'HIIT core', ar: 'HIIT جذع', nl: 'HIIT Core', pl: 'HIIT core', it: 'HIIT core' },
  'HIIT Legs': { de: 'HIIT Legs', en: 'HIIT Legs', es: 'HIIT piernas', fr: 'HIIT jambes', pt: 'HIIT pernas', ar: 'HIIT أرجل', nl: 'HIIT Benen', pl: 'HIIT nogi', it: 'HIIT gambe' },
  'HIIT Full': { de: 'HIIT Full', en: 'HIIT Full Body', es: 'HIIT cuerpo completo', fr: 'HIIT corps entier', pt: 'HIIT corpo completo', ar: 'HIIT كامل الجسم', nl: 'HIIT Full body', pl: 'HIIT całe ciało', it: 'HIIT total body' },
  'EMOM Upper': { de: 'EMOM Upper', en: 'EMOM Upper', es: 'EMOM tren superior', fr: 'EMOM haut du corps', pt: 'EMOM parte superior', ar: 'EMOM الجزء العلوي', nl: 'EMOM Boven', pl: 'EMOM góra', it: 'EMOM parte superiore' },
  'EMOM Lower': { de: 'EMOM Lower', en: 'EMOM Lower', es: 'EMOM tren inferior', fr: 'EMOM bas du corps', pt: 'EMOM parte inferior', ar: 'EMOM الجزء السفلي', nl: 'EMOM Onder', pl: 'EMOM dół', it: 'EMOM parte inferiore' },
  'EMOM Full': { de: 'EMOM Full', en: 'EMOM Full Body', es: 'EMOM cuerpo completo', fr: 'EMOM corps entier', pt: 'EMOM corpo completo', ar: 'EMOM كامل الجسم', nl: 'EMOM Full body', pl: 'EMOM całe ciało', it: 'EMOM total body' },
  'EMOM Core': { de: 'EMOM Core', en: 'EMOM Core', es: 'EMOM core', fr: 'EMOM gainage', pt: 'EMOM core', ar: 'EMOM جذع', nl: 'EMOM Core', pl: 'EMOM core', it: 'EMOM core' },

  // Kampfsport
  'Boxen: Technik': { de: 'Boxen: Technik', en: 'Boxing: Technique', es: 'Boxeo: técnica', fr: 'Boxe : technique', pt: 'Boxe: técnica', ar: 'ملاكمة: تقنية', nl: 'Boksen: techniek', pl: 'Boks: technika', it: 'Boxe: tecnica' },
  'Boxen: Kombis': { de: 'Boxen: Kombis', en: 'Boxing: Combos', es: 'Boxeo: combinaciones', fr: 'Boxe : combinaisons', pt: 'Boxe: combinações', ar: 'ملاكمة: تركيبات', nl: 'Boksen: combinaties', pl: 'Boks: kombinacje', it: 'Boxe: combinazioni' },
  'Boxen: Kondition': { de: 'Boxen: Kondition', en: 'Boxing: Conditioning', es: 'Boxeo: acondicionamiento', fr: 'Boxe : condition physique', pt: 'Boxe: condicionamento', ar: 'ملاكمة: لياقة', nl: 'Boksen: conditie', pl: 'Boks: kondycja', it: 'Boxe: condizionamento' },
  'Kickboxen: Technik': { de: 'Kickboxen: Technik', en: 'Kickboxing: Technique', es: 'Kickboxing: técnica', fr: 'Kickboxing : technique', pt: 'Kickboxing: técnica', ar: 'كيك بوكسينغ: تقنية', nl: 'Kickboksen: techniek', pl: 'Kickboxing: technika', it: 'Kickboxing: tecnica' },
  'Kickboxen: Kombis': { de: 'Kickboxen: Kombis', en: 'Kickboxing: Combos', es: 'Kickboxing: combinaciones', fr: 'Kickboxing : combinaisons', pt: 'Kickboxing: combinações', ar: 'كيك بوكسينغ: تركيبات', nl: 'Kickboksen: combinaties', pl: 'Kickboxing: kombinacje', it: 'Kickboxing: combinazioni' },
  Kondition: { de: 'Kondition', en: 'Conditioning', es: 'Acondicionamiento', fr: 'Condition physique', pt: 'Condicionamento', ar: 'لياقة', nl: 'Conditie', pl: 'Kondycja', it: 'Condizionamento' },
  'Sparring-Drill': { de: 'Sparring-Drill', en: 'Sparring Drill', es: 'Ejercicio de sparring', fr: 'Drill de sparring', pt: 'Drill de sparring', ar: 'تدريب سبارينغ', nl: 'Sparringdrill', pl: 'Drill sparingowy', it: 'Drill di sparring' },
  Striking: { de: 'Striking', en: 'Striking', es: 'Golpeo', fr: 'Frappes', pt: 'Golpes', ar: 'ضرب', nl: 'Striking', pl: 'Striking', it: 'Colpi' },
  Kicks: { de: 'Kicks', en: 'Kicks', es: 'Patadas', fr: 'Coups de pied', pt: 'Chutes', ar: 'ركلات', nl: 'Trappen', pl: 'Kopnięcia', it: 'Calci' },
  Conditioning: { de: 'Conditioning', en: 'Conditioning', es: 'Acondicionamiento', fr: 'Condition physique', pt: 'Condicionamento', ar: 'لياقة', nl: 'Conditioning', pl: 'Kondycja', it: 'Condizionamento' },
  'Full MMA': { de: 'Full MMA', en: 'Full MMA', es: 'MMA completo', fr: 'MMA complet', pt: 'MMA completo', ar: 'MMA كامل', nl: 'Full MMA', pl: 'Pełne MMA', it: 'MMA completa' },
  Technik: { de: 'Technik', en: 'Technique', es: 'Técnica', fr: 'Technique', pt: 'Técnica', ar: 'تقنية', nl: 'Techniek', pl: 'Technika', it: 'Tecnica' },
  'Heavy Bag': { de: 'Heavy Bag', en: 'Heavy Bag', es: 'Saco pesado', fr: 'Sac lourd', pt: 'Saco pesado', ar: 'الكيس الثقيل', nl: 'Bokszak', pl: 'Worek', it: 'Sacco pesante' },
  'Sparring-Simulation': { de: 'Sparring-Simulation', en: 'Sparring Simulation', es: 'Simulación de sparring', fr: 'Simulation de sparring', pt: 'Simulação de sparring', ar: 'محاكاة سبارينغ', nl: 'Sparringsimulatie', pl: 'Symulacja sparingu', it: 'Simulazione di sparring' },
  'Boxing Fit': { de: 'Boxing Fit', en: 'Boxing Fit', es: 'Boxing Fit', fr: 'Boxing Fit', pt: 'Boxing Fit', ar: 'لياقة الملاكمة', nl: 'Boxing Fit', pl: 'Boxing Fit', it: 'Boxing Fit' },
  'Kick Fit': { de: 'Kick Fit', en: 'Kick Fit', es: 'Kick Fit', fr: 'Kick Fit', pt: 'Kick Fit', ar: 'لياقة الركل', nl: 'Kick Fit', pl: 'Kick Fit', it: 'Kick Fit' },
  'Combat Mix': { de: 'Combat Mix', en: 'Combat Mix', es: 'Combat Mix', fr: 'Combat Mix', pt: 'Combat Mix', ar: 'مزيج قتالي', nl: 'Combat Mix', pl: 'Combat Mix', it: 'Combat Mix' },
};

export function tagesBeschriftung(label, sprache) {
  if (!label) return '';
  return beschriftung(TAGE[label], sprache) || label;
}

export default TAGE;
