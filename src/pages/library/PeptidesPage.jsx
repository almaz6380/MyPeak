import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ChevronDown, ChevronUp, AlertTriangle, Syringe, FlaskConical, Brain, Flame, Heart, ShieldCheck } from 'lucide-react';

const CATEGORIES = [
  { id: 'healing', icon: Heart, color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
  { id: 'gh', icon: FlaskConical, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
  { id: 'fatloss', icon: Flame, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' },
  { id: 'antiaging', icon: ShieldCheck, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
  { id: 'cognitive', icon: Brain, color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20' },
];

const PEPTIDES = [
  // ── Heilung & Recovery ──
  {
    id: 'bpc157', category: 'healing',
    nameDE: 'BPC-157', nameEN: 'BPC-157',
    descDE: 'Body Protection Compound-157. Natürlich im Magensaft vorkommendes Peptid mit starker Heilwirkung.',
    descEN: 'Body Protection Compound-157. Naturally occurring in gastric juice with strong healing properties.',
    effectDE: 'Beschleunigt Heilung von Sehnen, Bändern, Muskeln und Gelenken. Fördert Angiogenese (Bildung neuer Blutgefäße). Schützt den Magen-Darm-Trakt. Wirkt entzündungshemmend.',
    effectEN: 'Accelerates healing of tendons, ligaments, muscles and joints. Promotes angiogenesis. Protects the gastrointestinal tract. Anti-inflammatory.',
    dosageDE: '250–500 mcg, 1–2× täglich, subkutan nahe der Verletzungsstelle. Zykluslänge: 4–8 Wochen.',
    dosageEN: '250–500 mcg, 1–2× daily, subcutaneous near injury site. Cycle length: 4–8 weeks.',
    sideEffectsDE: 'Sehr wenige bekannt. Gelegentlich leichte Übelkeit oder Schwindel. Gilt als gut verträglich.',
    sideEffectsEN: 'Very few known. Occasional mild nausea or dizziness. Generally well tolerated.',
  },
  {
    id: 'tb500', category: 'healing',
    nameDE: 'TB-500 (Thymosin Beta-4)', nameEN: 'TB-500 (Thymosin Beta-4)',
    descDE: 'Natürlich vorkommendes Peptid, das in fast allen Zellen des Körpers vorhanden ist.',
    descEN: 'Naturally occurring peptide present in almost all cells of the body.',
    effectDE: 'Fördert Zellmigration und Wundheilung. Reduziert Entzündungen. Verbessert Flexibilität. Fördert Haarwachstum. Wirkt systemisch (nicht nur lokal).',
    effectEN: 'Promotes cell migration and wound healing. Reduces inflammation. Improves flexibility. Promotes hair growth. Works systemically.',
    dosageDE: '2–5 mg, 2× pro Woche (Ladephase: 4–6 Wochen). Danach 2 mg, 1× pro Woche (Erhaltung).',
    dosageEN: '2–5 mg, 2× per week (loading phase: 4–6 weeks). Then 2 mg, 1× per week (maintenance).',
    sideEffectsDE: 'Selten. Mögliche Kopfschmerzen, Rötung an der Injektionsstelle.',
    sideEffectsEN: 'Rare. Possible headaches, redness at injection site.',
  },
  {
    id: 'ghkcu', category: 'healing',
    nameDE: 'GHK-Cu (Kupferpeptid)', nameEN: 'GHK-Cu (Copper Peptide)',
    descDE: 'Kupfer-bindendes Tripeptid mit vielfältigen regenerativen Eigenschaften.',
    descEN: 'Copper-binding tripeptide with diverse regenerative properties.',
    effectDE: 'Stimuliert Kollagenproduktion. Verbessert Hautelastizität und Wundheilung. Fördert Haarwachstum. Anti-Aging-Wirkung auf Haut. Reduziert Narbenbildung.',
    effectEN: 'Stimulates collagen production. Improves skin elasticity and wound healing. Promotes hair growth. Anti-aging effect on skin. Reduces scarring.',
    dosageDE: 'Subkutan: 1–2 mg/Tag. Topisch: 0,5–1% Creme. Zykluslänge: 8–12 Wochen.',
    dosageEN: 'Subcutaneous: 1–2 mg/day. Topical: 0.5–1% cream. Cycle length: 8–12 weeks.',
    sideEffectsDE: 'Minimal. Gelegentlich lokale Rötung. Topisch sehr gut verträglich.',
    sideEffectsEN: 'Minimal. Occasional local redness. Topically very well tolerated.',
  },

  // ── Wachstumshormon-Releasing ──
  {
    id: 'cjc1295', category: 'gh',
    nameDE: 'CJC-1295 (mit DAC)', nameEN: 'CJC-1295 (with DAC)',
    descDE: 'Synthetisches GHRH-Analogon mit verlängerter Halbwertszeit durch Drug Affinity Complex.',
    descEN: 'Synthetic GHRH analogue with extended half-life through Drug Affinity Complex.',
    effectDE: 'Erhöht die Wachstumshormon-Ausschüttung dauerhaft. Verbessert Schlafqualität. Fördert Fettabbau und Muskelaufbau. Beschleunigt Recovery.',
    effectEN: 'Persistently increases growth hormone release. Improves sleep quality. Promotes fat loss and muscle gain. Accelerates recovery.',
    dosageDE: '1–2 mg pro Woche (1× Injektion). Oft kombiniert mit Ipamorelin. Zykluslänge: 8–12 Wochen.',
    dosageEN: '1–2 mg per week (1× injection). Often combined with Ipamorelin. Cycle length: 8–12 weeks.',
    sideEffectsDE: 'Wassereinlagerung, Kribbeln in Händen/Füßen, Müdigkeit, erhöhter Appetit.',
    sideEffectsEN: 'Water retention, tingling in hands/feet, fatigue, increased appetite.',
  },
  {
    id: 'ipamorelin', category: 'gh',
    nameDE: 'Ipamorelin', nameEN: 'Ipamorelin',
    descDE: 'Selektiver Ghrelin-Rezeptor-Agonist. Eines der sichersten GH-Releasing-Peptide.',
    descEN: 'Selective ghrelin receptor agonist. One of the safest GH-releasing peptides.',
    effectDE: 'Stimuliert GH-Freisetzung ohne Cortisol oder Prolaktin zu erhöhen. Verbessert Schlaf, Fettabbau, Hautelastizität und Recovery.',
    effectEN: 'Stimulates GH release without increasing cortisol or prolactin. Improves sleep, fat loss, skin elasticity and recovery.',
    dosageDE: '200–300 mcg, 2–3× täglich (nüchtern oder vor dem Schlafen). Zykluslänge: 8–16 Wochen.',
    dosageEN: '200–300 mcg, 2–3× daily (fasted or before sleep). Cycle length: 8–16 weeks.',
    sideEffectsDE: 'Sehr mild. Mögliche leichte Kopfschmerzen, Hunger.',
    sideEffectsEN: 'Very mild. Possible slight headaches, hunger.',
  },
  {
    id: 'mk677', category: 'gh',
    nameDE: 'MK-677 (Ibutamoren)', nameEN: 'MK-677 (Ibutamoren)',
    descDE: 'Oral verfügbarer Wachstumshormon-Sekretagog. Kein Peptid im engeren Sinne, aber häufig in der Peptid-Community verwendet.',
    descEN: 'Orally available growth hormone secretagogue. Not a peptide per se, but commonly used in the peptide community.',
    effectDE: 'Erhöht GH und IGF-1 Spiegel. Verbessert Schlaftiefe. Steigert Appetit. Fördert Muskelaufbau und Fettabbau bei langfristiger Einnahme.',
    effectEN: 'Increases GH and IGF-1 levels. Improves sleep depth. Increases appetite. Promotes muscle gain and fat loss with long-term use.',
    dosageDE: '10–25 mg oral, 1× täglich (abends). Kann langfristig eingenommen werden (6+ Monate). Blutzucker überwachen.',
    dosageEN: '10–25 mg oral, 1× daily (evening). Can be taken long-term (6+ months). Monitor blood sugar.',
    sideEffectsDE: 'Erhöhter Appetit, Wassereinlagerung, Müdigkeit, leicht erhöhter Blutzucker. Insulinresistenz bei Langzeitanwendung möglich.',
    sideEffectsEN: 'Increased appetite, water retention, fatigue, slightly elevated blood sugar. Insulin resistance possible with long-term use.',
  },
  {
    id: 'sermorelin', category: 'gh',
    nameDE: 'Sermorelin', nameEN: 'Sermorelin',
    descDE: 'Synthetisches GHRH-Fragment (1-29). FDA-zugelassen für diagnostische Zwecke.',
    descEN: 'Synthetic GHRH fragment (1-29). FDA-approved for diagnostic purposes.',
    effectDE: 'Natürliche Stimulation der körpereigenen GH-Produktion. Verbessert Schlaf, Körperzusammensetzung und Energielevel.',
    effectEN: 'Natural stimulation of endogenous GH production. Improves sleep, body composition and energy levels.',
    dosageDE: '200–300 mcg, 1× täglich vor dem Schlafen, subkutan. Zykluslänge: 3–6 Monate.',
    dosageEN: '200–300 mcg, 1× daily before sleep, subcutaneous. Cycle length: 3–6 months.',
    sideEffectsDE: 'Rötung an Injektionsstelle, Schwindel, Kopfschmerzen. Generell gut verträglich.',
    sideEffectsEN: 'Redness at injection site, dizziness, headaches. Generally well tolerated.',
  },
  {
    id: 'ghrp6', category: 'gh',
    nameDE: 'GHRP-6', nameEN: 'GHRP-6',
    descDE: 'Growth Hormone Releasing Peptide-6. Einer der ersten synthetischen GH-Sekretagoge.',
    descEN: 'Growth Hormone Releasing Peptide-6. One of the first synthetic GH secretagogues.',
    effectDE: 'Starke GH-Freisetzung. Deutliche Appetitsteigerung (über Ghrelin). Fördert Heilung und Muskelaufbau.',
    effectEN: 'Strong GH release. Significant appetite increase (via ghrelin). Promotes healing and muscle building.',
    dosageDE: '100–300 mcg, 2–3× täglich, 30 Min. vor Mahlzeiten. Zykluslänge: 8–12 Wochen.',
    dosageEN: '100–300 mcg, 2–3× daily, 30 min before meals. Cycle length: 8–12 weeks.',
    sideEffectsDE: 'Starker Hunger, Wassereinlagerung, Cortisol-Anstieg, Kribbeln.',
    sideEffectsEN: 'Strong hunger, water retention, cortisol increase, tingling.',
  },

  // ── Fettabbau ──
  {
    id: 'tirzepatid', category: 'fatloss',
    nameDE: 'Tirzepatid (Mounjaro)', nameEN: 'Tirzepatide (Mounjaro)',
    descDE: 'Dualer GIP/GLP-1-Rezeptoragonist. Zugelassenes Medikament für Diabetes Typ 2 und Adipositas.',
    descEN: 'Dual GIP/GLP-1 receptor agonist. Approved medication for type 2 diabetes and obesity.',
    effectDE: 'Starke Gewichtsabnahme (bis zu 20%+ des Körpergewichts). Reduziert Appetit und Heißhunger. Verbessert Blutzucker und Insulinsensitivität.',
    effectEN: 'Strong weight loss (up to 20%+ of body weight). Reduces appetite and cravings. Improves blood sugar and insulin sensitivity.',
    dosageDE: 'Einschleichend: 2,5 mg/Woche → alle 4 Wochen steigern bis max. 15 mg/Woche. Subkutan. Nur unter ärztlicher Aufsicht.',
    dosageEN: 'Titration: 2.5 mg/week → increase every 4 weeks up to max 15 mg/week. Subcutaneous. Only under medical supervision.',
    sideEffectsDE: 'Übelkeit (häufig am Anfang), Durchfall, Verstopfung, Bauchschmerzen. Risiko für Pankreatitis. Muskelverlust bei zu schnellem Abnehmen.',
    sideEffectsEN: 'Nausea (common initially), diarrhea, constipation, abdominal pain. Risk of pancreatitis. Muscle loss with too rapid weight loss.',
  },
  {
    id: 'semaglutid', category: 'fatloss',
    nameDE: 'Semaglutid (Ozempic/Wegovy)', nameEN: 'Semaglutide (Ozempic/Wegovy)',
    descDE: 'GLP-1-Rezeptoragonist. Zugelassen für Diabetes und Gewichtsmanagement.',
    descEN: 'GLP-1 receptor agonist. Approved for diabetes and weight management.',
    effectDE: 'Gewichtsverlust von 15–20%. Appetitreduktion. Verbessert kardiovaskuläre Marker. Reduziert viszerales Fett.',
    effectEN: 'Weight loss of 15–20%. Appetite reduction. Improves cardiovascular markers. Reduces visceral fat.',
    dosageDE: 'Einschleichend: 0,25 mg/Woche → alle 4 Wochen steigern bis 1–2,4 mg/Woche. Nur unter ärztlicher Aufsicht.',
    dosageEN: 'Titration: 0.25 mg/week → increase every 4 weeks to 1–2.4 mg/week. Only under medical supervision.',
    sideEffectsDE: 'Übelkeit, Erbrechen, Durchfall (besonders anfangs). Risiko für Pankreatitis und Gallensteine.',
    sideEffectsEN: 'Nausea, vomiting, diarrhea (especially initially). Risk of pancreatitis and gallstones.',
  },
  {
    id: 'aod9604', category: 'fatloss',
    nameDE: 'AOD-9604', nameEN: 'AOD-9604',
    descDE: 'Fragment des Wachstumshormons (176-191). Speziell für Fettabbau ohne GH-typische Nebenwirkungen.',
    descEN: 'Fragment of growth hormone (176-191). Specifically for fat loss without typical GH side effects.',
    effectDE: 'Stimuliert Lipolyse (Fettabbau). Hemmt Lipogenese (Fettaufbau). Keine Auswirkung auf Blutzucker oder Wachstum.',
    effectEN: 'Stimulates lipolysis (fat breakdown). Inhibits lipogenesis (fat storage). No effect on blood sugar or growth.',
    dosageDE: '300 mcg/Tag, subkutan in Bauchfett. Nüchtern (morgens). Zykluslänge: 8–12 Wochen.',
    dosageEN: '300 mcg/day, subcutaneous into belly fat. Fasted (morning). Cycle length: 8–12 weeks.',
    sideEffectsDE: 'Sehr wenige. Mögliche Rötung an Injektionsstelle. Gut verträglich.',
    sideEffectsEN: 'Very few. Possible redness at injection site. Well tolerated.',
  },

  // ── Anti-Aging ──
  {
    id: 'epithalon', category: 'antiaging',
    nameDE: 'Epithalon (Epitalon)', nameEN: 'Epithalon (Epitalon)',
    descDE: 'Synthetisches Tetrapeptid basierend auf Epithalamin. Eines der am meisten erforschten Anti-Aging-Peptide.',
    descEN: 'Synthetic tetrapeptide based on epithalamin. One of the most researched anti-aging peptides.',
    effectDE: 'Aktiviert Telomerase → verlängert Telomere (Zellalterung). Verbessert Schlafrhythmus über Melatonin. Antioxidative Wirkung. Kann Lebensspanne verlängern (in Tierversuchen gezeigt).',
    effectEN: 'Activates telomerase → lengthens telomeres (cell aging). Improves sleep rhythm via melatonin. Antioxidant effect. Can extend lifespan (shown in animal studies).',
    dosageDE: '5–10 mg/Tag, subkutan, für 10–20 Tage. 2–3 Zyklen pro Jahr. Pause: 4–6 Monate zwischen Zyklen.',
    dosageEN: '5–10 mg/day, subcutaneous, for 10–20 days. 2–3 cycles per year. Break: 4–6 months between cycles.',
    sideEffectsDE: 'Kaum bekannt. Gilt als sehr sicher in den untersuchten Dosierungen.',
    sideEffectsEN: 'Hardly known. Considered very safe at studied dosages.',
  },
  {
    id: 'pt141', category: 'antiaging',
    nameDE: 'PT-141 (Bremelanotid)', nameEN: 'PT-141 (Bremelanotide)',
    descDE: 'Melanocortin-Rezeptor-Agonist. FDA-zugelassen (Vyleesi) für Libidostörungen bei Frauen.',
    descEN: 'Melanocortin receptor agonist. FDA-approved (Vyleesi) for hypoactive sexual desire disorder in women.',
    effectDE: 'Steigert sexuelles Verlangen bei Männern und Frauen. Wirkt über das zentrale Nervensystem (nicht vaskulär wie Viagra).',
    effectEN: 'Increases sexual desire in both men and women. Works via the central nervous system (not vascular like Viagra).',
    dosageDE: '1–2 mg, subkutan, 45 Min. vor Aktivität. Max. 1× pro 24 Stunden. Nicht öfter als 8× pro Monat.',
    dosageEN: '1–2 mg, subcutaneous, 45 min before activity. Max 1× per 24 hours. No more than 8× per month.',
    sideEffectsDE: 'Übelkeit (häufig), Flush, Kopfschmerzen. Kann Blutdruck vorübergehend erhöhen.',
    sideEffectsEN: 'Nausea (common), flushing, headaches. Can temporarily raise blood pressure.',
  },
  {
    id: 'melanotan2', category: 'antiaging',
    nameDE: 'Melanotan II', nameEN: 'Melanotan II',
    descDE: 'Synthetisches Analogon des α-MSH. Stimuliert Melaninproduktion.',
    descEN: 'Synthetic analogue of α-MSH. Stimulates melanin production.',
    effectDE: 'Bräunung der Haut ohne UV-Exposition. Appetitreduktion. Libidosteigerung. UV-Schutz durch erhöhtes Melanin.',
    effectEN: 'Skin tanning without UV exposure. Appetite reduction. Libido enhancement. UV protection through increased melanin.',
    dosageDE: 'Ladephase: 250–500 mcg/Tag für 1–2 Wochen. Erhaltung: 250 mcg alle 2–3 Tage. Subkutan.',
    dosageEN: 'Loading: 250–500 mcg/day for 1–2 weeks. Maintenance: 250 mcg every 2–3 days. Subcutaneous.',
    sideEffectsDE: 'Übelkeit, Flush, Erektionen, dunkle Muttermale. Risiko: unkontrollierte Melanom-Stimulation bei Vorbelastung.',
    sideEffectsEN: 'Nausea, flushing, erections, darkened moles. Risk: uncontrolled melanoma stimulation with predisposition.',
  },

  // ── Kognition ──
  {
    id: 'selank', category: 'cognitive',
    nameDE: 'Selank', nameEN: 'Selank',
    descDE: 'Synthetisches Peptid basierend auf Tuftsin. In Russland als Anxiolytikum zugelassen.',
    descEN: 'Synthetic peptide based on Tuftsin. Approved as an anxiolytic in Russia.',
    effectDE: 'Reduziert Angst und Stress. Verbessert Gedächtnis und Lernfähigkeit. Moduliert Serotonin und Dopamin. Neuroprotektiv.',
    effectEN: 'Reduces anxiety and stress. Improves memory and learning. Modulates serotonin and dopamine. Neuroprotective.',
    dosageDE: '250–500 mcg, intranasal, 1–3× täglich. Zykluslänge: 2–4 Wochen. Pause empfohlen.',
    dosageEN: '250–500 mcg, intranasal, 1–3× daily. Cycle length: 2–4 weeks. Break recommended.',
    sideEffectsDE: 'Sehr wenige. Gelegentlich leichte Müdigkeit. Nicht abhängigkeitserzeugend.',
    sideEffectsEN: 'Very few. Occasional mild fatigue. Non-addictive.',
  },
  {
    id: 'semax', category: 'cognitive',
    nameDE: 'Semax', nameEN: 'Semax',
    descDE: 'Synthetisches ACTH-Fragment (4-10). In Russland als Nootropikum zugelassen.',
    descEN: 'Synthetic ACTH fragment (4-10). Approved as a nootropic in Russia.',
    effectDE: 'Verbessert Fokus, Gedächtnis und kognitive Leistung. Steigert BDNF (Brain-Derived Neurotrophic Factor). Neuroprotektiv. Kann Stimmung verbessern.',
    effectEN: 'Improves focus, memory and cognitive performance. Increases BDNF (Brain-Derived Neurotrophic Factor). Neuroprotective. Can improve mood.',
    dosageDE: '200–600 mcg, intranasal, 1–2× täglich (morgens). Zykluslänge: 2–4 Wochen.',
    dosageEN: '200–600 mcg, intranasal, 1–2× daily (morning). Cycle length: 2–4 weeks.',
    sideEffectsDE: 'Selten. Mögliche leichte Reizbarkeit bei hoher Dosis.',
    sideEffectsEN: 'Rare. Possible mild irritability at high doses.',
  },
];

export default function PeptidesPage({ onBack }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'de';
  const [expandedId, setExpandedId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const categoryNames = {
    all: { de: 'Alle', en: 'All' },
    healing: { de: 'Heilung & Recovery', en: 'Healing & Recovery' },
    gh: { de: 'Wachstumshormon', en: 'Growth Hormone' },
    fatloss: { de: 'Fettabbau', en: 'Fat Loss' },
    antiaging: { de: 'Anti-Aging', en: 'Anti-Aging' },
    cognitive: { de: 'Kognition', en: 'Cognition' },
  };

  const filtered = activeCategory === 'all'
    ? PEPTIDES
    : PEPTIDES.filter((p) => p.category === activeCategory);

  return (
    <div className="p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{t('library.peptides')}</h1>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-4 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          {lang === 'de'
            ? 'Diese Informationen dienen nur zu Bildungszwecken. Peptide sind in vielen Ländern verschreibungspflichtig oder nicht zugelassen. Konsultiere immer einen Arzt vor der Anwendung. Dosierungsangaben basieren auf Erfahrungsberichten und Studien — keine medizinische Beratung.'
            : 'This information is for educational purposes only. Peptides are prescription-only or unapproved in many countries. Always consult a doctor before use. Dosage information is based on anecdotal reports and studies — not medical advice.'}
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {['all', ...CATEGORIES.map((c) => c.id)].map((catId) => (
          <button
            key={catId}
            onClick={() => setActiveCategory(catId)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === catId
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-surface-dark-alt text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {categoryNames[catId]?.[lang] || catId}
          </button>
        ))}
      </div>

      {/* Peptide Count */}
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
        {filtered.length} {lang === 'de' ? 'Peptide' : 'Peptides'}
      </p>

      {/* Peptide Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((peptide) => {
          const isExpanded = expandedId === peptide.id;
          const cat = CATEGORIES.find((c) => c.id === peptide.category);
          const CatIcon = cat?.icon || Syringe;

          return (
            <div key={peptide.id} className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-sm overflow-hidden">
              {/* Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : peptide.id)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cat?.color}`}>
                  <CatIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{lang === 'de' ? peptide.nameDE : peptide.nameEN}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{categoryNames[peptide.category]?.[lang]}</p>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {lang === 'de' ? peptide.descDE : peptide.descEN}
                  </p>

                  <InfoBlock
                    title={lang === 'de' ? 'Wirkung' : 'Effects'}
                    text={lang === 'de' ? peptide.effectDE : peptide.effectEN}
                    color="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                  />
                  <InfoBlock
                    title={lang === 'de' ? 'Dosierung & Zyklus' : 'Dosage & Cycle'}
                    text={lang === 'de' ? peptide.dosageDE : peptide.dosageEN}
                    color="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  />
                  <InfoBlock
                    title={lang === 'de' ? 'Nebenwirkungen' : 'Side Effects'}
                    text={lang === 'de' ? peptide.sideEffectsDE : peptide.sideEffectsEN}
                    color="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InfoBlock({ title, text, color }) {
  return (
    <div className={`rounded-xl p-3 ${color}`}>
      <p className="text-xs font-semibold mb-1">{title}</p>
      <p className="text-xs opacity-90 leading-relaxed">{text}</p>
    </div>
  );
}
