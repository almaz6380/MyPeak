import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ChevronDown, ChevronUp, AlertTriangle, Syringe, FlaskConical, Brain, Flame, Heart, ShieldCheck, BookOpen } from 'lucide-react';
import peptides from '../../data/peptidesData';

const CATEGORIES = [
  { id: 'healing', icon: Heart, color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
  { id: 'gh', icon: FlaskConical, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
  { id: 'fatloss', icon: Flame, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' },
  { id: 'antiaging', icon: ShieldCheck, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
  { id: 'cognitive', icon: Brain, color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20' },
];

const SECTION_COLORS = {
  0: 'border-l-primary-400',
  1: 'border-l-blue-400',
  2: 'border-l-green-400',
  3: 'border-l-amber-400',
  4: 'border-l-red-400',
  5: 'border-l-purple-400',
  6: 'border-l-cyan-400',
};

export default function PeptidesPage({ onBack }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'de';
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPeptide, setSelectedPeptide] = useState(null);

  const categoryNames = {
    all: { de: 'Alle', en: 'All' },
    healing: { de: 'Heilung & Recovery', en: 'Healing & Recovery' },
    gh: { de: 'Wachstumshormon', en: 'Growth Hormone' },
    fatloss: { de: 'Fettabbau', en: 'Fat Loss' },
    antiaging: { de: 'Anti-Aging', en: 'Anti-Aging' },
    cognitive: { de: 'Kognition', en: 'Cognition' },
  };

  const filtered = activeCategory === 'all'
    ? peptides
    : peptides.filter((p) => p.category === activeCategory);

  // Detail view for a single peptide (e-book style)
  if (selectedPeptide) {
    const p = selectedPeptide;
    const cat = CATEGORIES.find((c) => c.id === p.category);

    return (
      <div className="p-4 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setSelectedPeptide(null)} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">{lang === 'de' ? p.nameDE : p.nameEN}</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500">{categoryNames[p.category]?.[lang]}</p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {p.sections.map((section, i) => (
            <PeptideSection
              key={i}
              title={lang === 'de' ? section.titleDE : section.titleEN}
              content={lang === 'de' ? section.contentDE : section.contentEN}
              colorClass={SECTION_COLORS[i] || SECTION_COLORS[0]}
              defaultOpen={i === 0}
            />
          ))}
        </div>

        {/* Disclaimer at bottom */}
        <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
            {lang === 'de'
              ? 'Diese Informationen dienen nur zu Bildungszwecken und ersetzen keine ärztliche Beratung. Konsultiere immer einen Arzt vor der Anwendung von Peptiden.'
              : 'This information is for educational purposes only and does not replace medical advice. Always consult a doctor before using peptides.'}
          </p>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div className="p-4 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">{lang === 'de' ? 'Peptide' : 'Peptides'}</h1>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-4 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          {lang === 'de'
            ? 'Diese Informationen dienen nur zu Bildungszwecken. Peptide sind in vielen Ländern verschreibungspflichtig oder nicht zugelassen. Konsultiere immer einen Arzt vor der Anwendung.'
            : 'This information is for educational purposes only. Peptides are prescription-only or unapproved in many countries. Always consult a doctor before use.'}
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

      <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
        {filtered.length} {lang === 'de' ? 'Peptide' : 'Peptides'}
      </p>

      {/* Peptide Cards → tap to open e-book */}
      <div className="flex flex-col gap-3">
        {filtered.map((peptide) => {
          const cat = CATEGORIES.find((c) => c.id === peptide.category);
          const CatIcon = cat?.icon || Syringe;

          return (
            <button
              key={peptide.id}
              onClick={() => setSelectedPeptide(peptide)}
              className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cat?.color}`}>
                <CatIcon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{lang === 'de' ? peptide.nameDE : peptide.nameEN}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{categoryNames[peptide.category]?.[lang]}</p>
              </div>
              <div className="flex items-center gap-1 text-slate-300 dark:text-slate-600 flex-shrink-0">
                <BookOpen className="w-4 h-4" />
                <span className="text-[10px]">{peptide.sections?.length || 0}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PeptideSection({ title, content, colorClass, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`bg-white dark:bg-surface-dark-alt rounded-2xl shadow-sm overflow-hidden border-l-4 ${colorClass}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <h3 className="font-semibold text-sm">{title}</h3>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {content}
          </p>
        </div>
      )}
    </div>
  );
}
