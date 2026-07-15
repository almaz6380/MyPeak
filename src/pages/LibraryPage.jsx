import { useState, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Loader2 } from 'lucide-react';
import MyPeakLogo from '../components/MyPeakLogo';
import CardPhotoMotif from '../components/CardPhotoMotif';

// Lazy: Die E-Book-Texte (Peptide ~480 KB, Diäten ~220 KB) werden erst
// geladen, wenn die Sektion geöffnet wird — verkleinert das Start-Bundle massiv.
const PeptidesPage = lazy(() => import('./library/PeptidesPage'));
const DietsPage = lazy(() => import('./library/DietsPage'));
const TrainingKnowledgePage = lazy(() => import('./library/TrainingKnowledgePage'));

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

  if (view === 'training') {
    return (
      <Suspense fallback={<SectionLoader />}>
        <TrainingKnowledgePage onBack={() => setView('home')} />
      </Suspense>
    );
  }

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
    { id: 'training', icon: <img src="/bg-photos/training-icon.png" alt="" aria-hidden="true" className="h-7 w-auto object-contain" />, motif: '/bg-photos/training-icon.png', label: t('library.training'), color: 'bg-blue-100 dark:bg-blue-900/30', ready: true },
    { id: 'diets', icon: <img src="/bg-photos/weight-icon.png" alt="" aria-hidden="true" className="h-7 w-auto object-contain" />, motif: '/bg-photos/weight-icon.png', label: t('library.diets'), color: 'bg-orange-100 dark:bg-orange-900/30', ready: true },
    { id: 'peptides', icon: <img src="/bg-photos/peptide-icon.png" alt="" aria-hidden="true" className="h-7 w-auto object-contain" />, motif: '/bg-photos/peptide-icon.png', label: t('library.peptides'), color: 'bg-amber-100 dark:bg-amber-900/30', ready: true },
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
