import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ChevronDown, ChevronUp, AlertTriangle, BookOpen, ChevronRight, Stethoscope } from 'lucide-react';
import References from '../../components/References';

// Generischer Reader für die Wissensbibliothek-Blöcke (Training, Ernährung,
// Supplements, Blutwerte). Datengetrieben — jeder Block liefert `data` (Themen)
// + `categories`. Struktur: Liste → Kurzfassung (Summary + Quick-Facts) → E-Book
// (aufklappbare Sektionen). Gleiches Muster wie PeptidesPage, aber wiederverwendbar.

const SECTION_COLORS = [
  'border-l-primary-400', 'border-l-blue-400', 'border-l-green-400',
  'border-l-amber-400', 'border-l-red-400', 'border-l-purple-400',
  'border-l-cyan-400', 'border-l-rose-400',
];

const QUICK_COLORS = [
  'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-l-green-400',
  'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-l-blue-400',
  'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-l-amber-400',
  'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-l-purple-400',
];

export default function KnowledgePage({ onBack, data, titleDE, titleEN, categories = [], disclaimer = 'general' }) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('de') ? 'de' : 'en';
  const [activeCategory, setActiveCategory] = useState('all');
  const [selected, setSelected] = useState(null);
  const [showEbook, setShowEbook] = useState(false);

  const catList = [{ id: 'all', nameDE: 'Alle', nameEN: 'All' }, ...categories];
  const catName = (id) => {
    const c = catList.find((x) => x.id === id);
    return c ? (lang === 'de' ? c.nameDE : c.nameEN) : id;
  };

  const filtered = activeCategory === 'all'
    ? data
    : data.filter((topic) => topic.category === activeCategory);

  // ── E-BOOK VIEW ──
  if (selected && showEbook) {
    const p = selected;
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

        <References items={p.references} lang={lang} />
        <Disclaimer lang={lang} type={disclaimer} />
      </div>
    );
  }

  // ── KURZFASSUNG (Detail-Ansicht) ──
  if (selected) {
    const p = selected;
    const quick = lang === 'de' ? p.quickDE : p.quickEN;
    const hasEbook = p.sections && p.sections.length > 0;

    return (
      <div className="p-4 pt-16 pb-24">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setSelected(null)} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{lang === 'de' ? p.nameDE : p.nameEN}</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500">{catName(p.category)}</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {lang === 'de' ? p.summaryDE : p.summaryEN}
        </p>

        {Array.isArray(quick) && quick.length > 0 && (
          <div className="space-y-3 mb-6">
            {quick.map((q, i) => (
              <QuickCard key={i} title={q.label} text={q.text} color={QUICK_COLORS[i % QUICK_COLORS.length]} />
            ))}
          </div>
        )}

        {disclaimer === 'medical' && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-4 flex gap-3">
            <Stethoscope className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
              {lang === 'de'
                ? 'Diese Inhalte ersetzen keine ärztliche Beratung. Bei gesundheitlichen Fragen wende dich an einen Arzt.'
                : 'This content does not replace medical advice. Consult a physician for health concerns.'}
            </p>
          </div>
        )}

        {hasEbook && (
          <button
            onClick={() => setShowEbook(true)}
            className="w-full rounded-2xl p-4 flex items-center gap-4 transition-all bg-primary-500 hover:bg-primary-600 text-white shadow-lg"
          >
            <BookOpen className="w-6 h-6 flex-shrink-0" />
            <div className="flex-1 text-left">
              <p className="font-semibold text-sm">
                {lang === 'de' ? 'Ausführliches E-Book lesen' : 'Read detailed E-Book'}
              </p>
              <p className="text-xs mt-0.5 text-white/70">
                {p.sections.length} {lang === 'de' ? 'Kapitel' : 'chapters'}
              </p>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        <References items={p.references} lang={lang} />
        <Disclaimer lang={lang} type={disclaimer} />
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
        <h1 className="text-2xl font-bold">{lang === 'de' ? titleDE : titleEN}</h1>
      </div>

      {categories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {catList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-surface-dark-alt text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {lang === 'de' ? cat.nameDE : cat.nameEN}
            </button>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
        {filtered.length} {lang === 'de' ? 'Themen' : 'topics'}
      </p>

      <div className="flex flex-col gap-3">
        {filtered.map((topic) => (
          <button
            key={topic.id}
            onClick={() => { setSelected(topic); setShowEbook(false); }}
            className="w-full bg-white dark:bg-surface-dark-alt rounded-2xl p-4 flex items-center gap-4 shadow-soft border border-slate-100 dark:border-slate-800/60 hover:shadow-md transition-shadow text-left"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary-50 dark:bg-primary-900/20">
              <BookOpen className="w-5 h-5 text-primary-500 dark:text-primary-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{lang === 'de' ? topic.nameDE : topic.nameEN}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{catName(topic.category)}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 flex-shrink-0" />
          </button>
        ))}
      </div>

      <Disclaimer lang={lang} type={disclaimer} />
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

function Disclaimer({ lang, type }) {
  if (!type) return null;
  const text = type === 'medical'
    ? (lang === 'de'
        ? 'Diese Informationen dienen nur zu Bildungszwecken und ersetzen keine ärztliche Beratung oder Diagnose. Konsultiere bei gesundheitlichen Fragen immer einen Arzt.'
        : 'This information is for educational purposes only and does not replace medical advice or diagnosis. Always consult a doctor for health concerns.')
    : (lang === 'de'
        ? 'Diese Informationen dienen zu Bildungszwecken. Trainings- und Ernährungsempfehlungen sind allgemein gehalten und ersetzen keine individuelle Beratung.'
        : 'This information is for educational purposes. Training and nutrition recommendations are general and do not replace individual guidance.');
  return (
    <div className="mt-6 mb-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex gap-3">
      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">{text}</p>
    </div>
  );
}
