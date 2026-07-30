import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ChevronDown, ChevronUp, AlertTriangle, FlaskConical, Brain, Flame, Heart, ShieldCheck, BookOpen, ChevronRight, Stethoscope } from 'lucide-react';
import peptides from '../../data/peptidesData';
import References from '../../components/References';

const CATEGORIES = [
  { id: 'healing', icon: Heart, color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
  { id: 'gh', icon: FlaskConical, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
  { id: 'fatloss', icon: Flame, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' },
  { id: 'antiaging', icon: ShieldCheck, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
  { id: 'cognitive', icon: Brain, color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20' },
];

const SECTION_COLORS = [
  'border-l-primary-400', 'border-l-blue-400', 'border-l-green-400',
  'border-l-amber-400', 'border-l-red-400', 'border-l-purple-400',
  'border-l-cyan-400', 'border-l-rose-400',
];

const categoryNames = {
  all: { de: 'Alle', en: 'All' },
  healing: { de: 'Heilung & Recovery', en: 'Healing & Recovery' },
  gh: { de: 'Wachstumshormon', en: 'Growth Hormone' },
  fatloss: { de: 'Fettabbau', en: 'Fat Loss' },
  antiaging: { de: 'Anti-Aging', en: 'Anti-Aging' },
  cognitive: { de: 'Kognition', en: 'Cognition' },
};

export default function PeptidesPage({ onBack }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'de';
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPeptide, setSelectedPeptide] = useState(null);
  const [showEbook, setShowEbook] = useState(false);

  const filtered = activeCategory === 'all'
    ? peptides
    : peptides.filter((p) => p.category === activeCategory);

  // ── E-BOOK VIEW ──
  if (selectedPeptide && showEbook) {
    const p = selectedPeptide;
    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setShowEbook(false)} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">{lang === 'de' ? p.nameDE : p.nameEN}</h1>
            <p className="text-xs text-primary-400">{lang === 'de' ? 'Ausführliches E-Book' : 'Detailed E-Book'}</p>
          </div>
        </div>

        {p.sections && p.sections.length > 0 ? (
          <div className="space-y-3">
            {p.sections.map((section, i) => (
              <EbookSection
                key={i}
                title={lang === 'de' ? section.titleDE : section.titleEN}
                content={lang === 'de' ? section.contentDE : section.contentEN}
                colorClass={SECTION_COLORS[i % SECTION_COLORS.length]}
                defaultOpen={i === 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <p className="text-slate-400 dark:text-slate-500 text-sm">
              {lang === 'de' ? 'E-Book wird derzeit erstellt...' : 'E-Book is being created...'}
            </p>
          </div>
        )}

        <References items={p.references} lang={lang} />
        <Disclaimer lang={lang} />
      </div>
    );
  }

  // ── KURZFASSUNG (Detail-Ansicht) ──
  if (selectedPeptide) {
    const p = selectedPeptide;
    const cat = CATEGORIES.find((c) => c.id === p.category);
    const quick = lang === 'de' ? p.quickDE : p.quickEN;
    const hasEbook = p.sections && p.sections.length > 0;

    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setSelectedPeptide(null)} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{lang === 'de' ? p.nameDE : p.nameEN}</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500">{categoryNames[p.category]?.[lang]}</p>
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat?.color}`}>
            <img src={`/bg-photos/pep-${p.category}-icon.png`} alt="" aria-hidden="true" className="w-7 h-7 object-contain" />
          </div>
        </div>

        <Disclaimer lang={lang} />

        {/* Summary */}
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {lang === 'de' ? p.summaryDE : p.summaryEN}
        </p>

        {/* Quick Info Cards */}
        {quick && (
          <div className="space-y-3 mb-6">
            <QuickCard
              title={lang === 'de' ? 'Wirkung' : 'Effects'}
              text={quick.wirkung}
              color="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-l-green-400"
            />
            <QuickCard
              title={lang === 'de' ? 'Nebenwirkungen' : 'Side Effects'}
              text={quick.nebenwirkungen}
              color="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-l-red-400"
            />
          </div>
        )}

        {/* Medical Advice Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-4 flex gap-3">
          <Stethoscope className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
            {lang === 'de'
              ? 'Dosierung und Anwendung sollten ausschließlich mit einem qualifizierten Arzt besprochen werden.'
              : 'Dosage and administration should only be discussed with a qualified physician.'}
          </p>
        </div>

        {/* E-Book Button */}
        <button
          onClick={() => hasEbook ? setShowEbook(true) : null}
          className={`w-full rounded-2xl p-4 flex items-center gap-4 transition-all ${
            hasEbook
              ? 'bg-primary-500 hover:bg-primary-500 text-white shadow-lg'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
          }`}
        >
          <BookOpen className="w-6 h-6 flex-shrink-0" />
          <div className="flex-1 text-left">
            <p className="font-semibold text-sm">
              {lang === 'de' ? 'Ausführliches E-Book lesen' : 'Read detailed E-Book'}
            </p>
            <p className={`text-xs mt-0.5 ${hasEbook ? 'text-white/70' : ''}`}>
              {hasEbook
                ? `${p.sections.length} ${lang === 'de' ? 'Kapitel' : 'chapters'}`
                : (lang === 'de' ? 'Wird erstellt...' : 'Coming soon...')}
            </p>
          </div>
          {hasEbook && <ChevronRight className="w-5 h-5" />}
        </button>

        <References items={p.references} lang={lang} />
        <Disclaimer lang={lang} />
      </div>
    );
  }

  // ── LIST VIEW ──
  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{lang === 'de' ? 'Peptide' : 'Peptides'}</h1>
      </div>

      <Disclaimer lang={lang} />

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {['all', ...CATEGORIES.map((c) => c.id)].map((catId) => (
          <button
            key={catId}
            onClick={() => setActiveCategory(catId)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === catId
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-surface-dark-alt text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {categoryNames[catId]?.[lang] || catId}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
        {filtered.length} {lang === 'de' ? 'Peptide' : 'Peptides'}
      </p>

      {/* Peptide Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((peptide) => {
          const cat = CATEGORIES.find((c) => c.id === peptide.category);
          const hasEbook = peptide.sections && peptide.sections.length > 0;

          return (
            <button
              key={peptide.id}
              onClick={() => setSelectedPeptide(peptide)}
              className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 flex items-center gap-4 shadow-soft border border-slate-100 dark:border-slate-800/60 hover:shadow-md transition-shadow text-left"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cat?.color}`}>
                <img src={`/bg-photos/pep-${peptide.category}-icon.png`} alt="" aria-hidden="true" className="w-7 h-7 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{lang === 'de' ? peptide.nameDE : peptide.nameEN}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{categoryNames[peptide.category]?.[lang]}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {hasEbook && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-primary-50 dark:bg-primary-900/20 text-[10px] font-semibold text-primary-500 dark:text-primary-400">
                    <BookOpen className="w-3 h-3" />
                    E-Book
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QuickCard({ title, text, color }) {
  return (
    <div className={`rounded-xl p-3 border-l-4 ${color}`}>
      <p className="text-xs font-semibold mb-1">{title}</p>
      <p className="text-xs opacity-90 leading-relaxed">{text}</p>
    </div>
  );
}

function EbookSection({ title, content, colorClass, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft overflow-hidden border-l-4 ${colorClass}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left">
        <h3 className="font-semibold text-sm">{title}</h3>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{content}</p>
        </div>
      )}
    </div>
  );
}

function Disclaimer({ lang }) {
  return (
    <div className="mt-6 mb-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex gap-3">
      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed whitespace-pre-line">
        {lang === 'de'
          ? 'Diese Informationen dienen nur zu Bildungszwecken und ersetzen keine ärztliche Beratung. Peptide sind in vielen Ländern verschreibungspflichtig oder nicht zugelassen. Konsultiere immer einen Arzt vor der Anwendung.\n\nZum Stand der Forschung: Nur wenige der hier beschriebenen Substanzen sind als Arzneimittel zugelassen (z. B. Semaglutid, Tirzepatid, Bremelanotid, Afamelanotid). Für die meisten übrigen stammt die Evidenz überwiegend aus Tier- und Laborstudien; belastbare Studien am Menschen fehlen. Die Quellenangaben unter jedem Eintrag verweisen auf die zugrunde liegende Literatur.'
          : 'This information is for educational purposes only and does not replace medical advice. Peptides are prescription-only or unapproved in many countries. Always consult a doctor before use.\n\nOn the state of research: only a few of the substances described here are approved medicines (e.g. semaglutide, tirzepatide, bremelanotide, afamelanotide). For most of the others the evidence comes largely from animal and laboratory studies; robust human trials are lacking. The references below each entry link to the underlying literature.'}
      </p>
    </div>
  );
}
