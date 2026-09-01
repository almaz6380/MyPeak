import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FullRepLogo from '../../components/FullRepLogo';
import { legalDocs } from './legalContent';
import { useRechtstexte } from './uebersetzungen';
import { appSprache } from '../../lib/sprache';

// Eigenständige Rechtsseite — auch ohne Login erreichbar (Routen: /legal/imprint|privacy|terms)
export default function LegalPage({ doc }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  // Die vier Uebersetzungen kommen nachgeladen; bis dahin — und wenn das
  // Nachladen scheitert — steht Deutsch bzw. Englisch da. Eine Rechtsseite
  // darf nie leer sein: Apple und Google rufen die Datenschutz-URL ohne Konto
  // auf, und ein Nutzer, der seine Rechte nachlesen will, braucht Text, keinen
  // Spinner.
  const sprache = appSprache(i18n.language);
  const uebersetzt = useRechtstexte(i18n.language);
  const content = uebersetzt?.[doc] || legalDocs[doc]?.[sprache === 'de' ? 'de' : 'en'];

  if (!content) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-surface-dark">
      <div className="max-w-lg mx-auto p-4 pt-12 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
            className="p-2 -ms-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-surface-dark-alt transition-colors"
            aria-label={t('ui.back')}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <FullRepLogo size={28} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{content.title}</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">{content.updated}</p>

        <div className="space-y-5">
          {content.sections.map((section) => (
            <div key={section.heading} className="bg-white dark:bg-surface-dark-alt rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800/60 p-5">
              <h2 className="font-semibold text-slate-900 dark:text-white mb-2">{section.heading}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
