import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { WELLAPPS, storeLink } from '../lib/wellapps';

// Die anderen Apps des Studios, je Zeile ein Link in den passenden Store.
// Externe Adresse mit target="_blank": In der Store-App öffnet Capacitor sie
// außerhalb der WebView (System-Browser bzw. Store), wie die Quellenlinks.
export default function MehrVonWellApps() {
  const { t } = useTranslation();
  return (
    <div className="karte overflow-hidden mb-4">
      <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 px-4 pt-4 pb-2">
        {t('wellapps.title')}
      </h2>
      <ul>
        {WELLAPPS.map((app, i) => {
          const name = app.nameKey ? t(app.nameKey) : app.name;
          return (
            <li key={app.id}>
              <a
                href={storeLink(app)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center gap-3 px-4 py-3 text-start hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${i === WELLAPPS.length - 1 ? '' : 'border-b border-slate-100 dark:border-slate-700'}`}
              >
                <img
                  src={app.symbol}
                  alt=""
                  width="48"
                  height="48"
                  loading="lazy"
                  className="w-12 h-12 flex-shrink-0 rounded-[22%]"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-slate-700 dark:text-slate-200 break-words">{name}</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400 break-words">{t(`wellapps.tagline.${app.id}`)}</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
