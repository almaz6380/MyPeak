import { useState, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Syringe, ChevronRight, Scale, Loader2 } from 'lucide-react';
import MyPeakLogo from '../components/MyPeakLogo';
import CardPhotoMotif from '../components/CardPhotoMotif';

// Lazy: Die E-Book-Texte (Peptide ~480 KB, Diäten ~220 KB) werden erst
// geladen, wenn die Sektion geöffnet wird — verkleinert das Start-Bundle massiv.
const PeptidesPage = lazy(() => import('./library/PeptidesPage'));
const DietsPage = lazy(() => import('./library/DietsPage'));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center pt-40">
      <Loader2 className="w-6 h-6 text-primary-400 animate-spin" />
    </div>
  );
}

export default function LibraryPage() {
  const { t } = useTranslation();
  const [view, setView] = useState('home');

  if (view === 'peptides') {
    return (
      <Suspense fallback={<SectionLoader />}>
        <PeptidesPage onBack={() => setView('home')} />
      </Suspense>
    );
  }

  if (view === 'diets') {
    return (
      <Suspense fallback={<SectionLoader />}>
        <DietsPage onBack={() => setView('home')} />
      </Suspense>
    );
  }

  // Unfertige Sektionen (training, nutrition, supplements, bloodwork) sind bis
  // zum Fertigstellen ausgeblendet — halbleere "Bald"-Kacheln wirken unfertig.
  const sections = [
    { id: 'diets', icon: <Scale className="w-6 h-6" />, motif: '/bg-photos/weight-icon.png', label: t('library.diets'), color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400', ready: true },
    { id: 'peptides', icon: <Syringe className="w-6 h-6" />, motif: '/bg-photos/peptide-icon.png', label: t('library.peptides'), color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400', ready: true },
  ].filter((s) => s.ready);

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex flex-col items-center pt-12 mb-6">
        <MyPeakLogo size={36} />
        <h1 className="text-2xl font-bold mt-2">{t('library.title')}</h1>
      </div>

      <div className="flex flex-col gap-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => section.ready ? setView(section.id) : null}
            className={`relative overflow-hidden bg-white dark:bg-surface-dark-alt rounded-2xl p-4 flex items-center gap-4 shadow-soft border border-slate-100 dark:border-slate-800/60 hover:shadow-md transition-shadow text-left ${!section.ready ? 'opacity-50' : ''}`}
          >
            <CardPhotoMotif src={section.motif} />
            <span className={`rounded-xl p-3 ${section.color}`}>{section.icon}</span>
            <span className="font-medium text-lg flex-1">{section.label}</span>
            {section.ready && <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600" />}
            {!section.ready && <span className="text-xs text-slate-400 dark:text-slate-500 italic">Bald</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
