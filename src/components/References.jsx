import { ExternalLink, FileText } from 'lucide-react';

// Quellenangaben für die Wissensinhalte. Apple verlangt (Guideline 1.4.1) bei
// Gesundheitsinhalten Belege, die für Nutzer leicht auffindbar sind — deshalb
// dauerhaft sichtbar, nicht eingeklappt.
//
// Eintrag: { authors, year, title, source, url? }
// `url` ist optional: lieber ohne Link listen als einen erfundenen setzen.

export default function References({ items, lang }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="mt-6 bg-white dark:bg-surface-dark-alt rounded-2xl p-4 shadow-soft border border-slate-100 dark:border-slate-800/60">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="w-4 h-4 text-primary-500 dark:text-primary-400" />
        <h3 className="font-semibold text-sm">{lang === 'de' ? 'Quellen' : 'References'}</h3>
      </div>

      <ol className="space-y-2.5">
        {items.map((r, i) => (
          <li key={i} className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex gap-2">
            <span className="text-slate-400 dark:text-slate-600 flex-shrink-0">{i + 1}.</span>
            <span className="min-w-0">
              {r.authors} {r.year ? `(${r.year})` : null}
              {r.title ? <>. <span className="italic">{r.title}</span></> : null}
              {r.source ? `. ${r.source}` : null}
              {r.url && (
                <>
                  {' '}
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary-500 dark:text-primary-400 hover:underline break-all"
                  >
                    {lang === 'de' ? 'Quelle öffnen' : 'View source'}
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  </a>
                </>
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
