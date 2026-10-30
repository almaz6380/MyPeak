import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Footprints, Loader2, Minus, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  schritteVerlauf, schrittZiel, schrittZielSetzen, schrittQuelleAktiv, istVerbunden,
} from '../lib/health';
import { schrittAuswertung } from '../lib/statistik';
import { datumsLocale } from '../lib/datumsformat';

const ZEITRAEUME = [7, 30, 90];

// Schritte-Verlauf (seit 1.6.3, frei — Schritte sind Grunddaten, keine
// Premium-Analyse). Werte kommen je Tag als Höchstes aus Health, dem
// Geräte-Zähler und dem eigenen Protokoll (`schritteVerlauf` in health.js).
export default function StepsPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [zeitraum, setZeitraum] = useState(7);
  // Verlauf samt Zeitraum, für den er geladen wurde: passt beides nicht
  // zusammen, lädt gerade ein neuer Zeitraum (Spinner statt alter Balken).
  const [geladen, setGeladen] = useState(null);
  const [ziel, setZiel] = useState(schrittZiel());
  const locale = datumsLocale(i18n.language);
  const zahl = (n) => Math.round(n).toLocaleString(locale);

  useEffect(() => {
    let alive = true;
    schritteVerlauf(user?.id, zeitraum)
      .then((v) => { if (alive) setGeladen({ zeitraum, v }); })
      .catch(() => { if (alive) setGeladen({ zeitraum, v: [] }); });
    return () => { alive = false; };
  }, [user?.id, zeitraum]);

  const verlauf = geladen?.zeitraum === zeitraum ? geladen.v : null;
  const a = useMemo(() => (verlauf ? schrittAuswertung(verlauf, ziel) : null), [verlauf, ziel]);

  function zielAendern(delta) {
    const n = Math.min(30000, Math.max(2000, ziel + delta));
    setZiel(n);
    schrittZielSetzen(n);
  }

  const quelle = schrittQuelleAktiv(user?.id);
  const tagFmt = new Intl.DateTimeFormat(locale, zeitraum === 7 ? { weekday: 'short' } : { day: 'numeric', month: 'numeric' });

  return (
    <div className="p-4 pt-16 pb-24">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="p-2 -ms-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5 rtl:-scale-x-100" />
        </button>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Footprints className="w-5 h-5 text-primary-500" />
          {t('steps.title')}
        </h1>
      </div>

      <div className="flex gap-2 mb-4">
        {ZEITRAEUME.map((n) => (
          <button
            key={n}
            onClick={() => setZeitraum(n)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              zeitraum === n ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
          >
            {t('premium.statsDays', { n })}
          </button>
        ))}
      </div>

      {!quelle && (
        <p className="karte p-4 mb-4 text-sm text-slate-500">{t('steps.noSource')}</p>
      )}

      {!a ? (
        <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary-500" /></div>
      ) : (
        <>
          <div className="karte p-4 mb-4">
            <SchrittBalken verlauf={verlauf} ziel={ziel} beschriftung={(d) => tagFmt.format(new Date(d + 'T12:00:00'))} dicht={zeitraum > 7} />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <Kachel wert={zahl(a.schnitt)} text={t('steps.avgPerDay')} />
            <Kachel
              wert={a.bester ? zahl(a.bester.schritte) : '–'}
              text={a.bester
                ? t('steps.bestDay', { datum: new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(new Date(a.bester.datum + 'T12:00:00')) })
                : t('steps.bestDayLabel')}
            />
            <Kachel wert={`${a.zielErreicht}/${a.tageGemessen}`} text={t('steps.goalReached')} />
            <Kachel wert={a.kcalSumme > 0 ? `${zahl(a.kcalSumme)} kcal` : '–'} text={t('steps.kcalTotal')} />
          </div>

          <div className="karte p-4 mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">{t('steps.goal')}</p>
              <p className="text-xs text-slate-400">{t('steps.goalHint')}</p>
            </div>
            <div className="flex items-center gap-2" dir="ltr">
              <button onClick={() => zielAendern(-500)} aria-label="-500" className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-16 text-center font-bold tabular-nums">{zahl(ziel)}</span>
              <button onClick={() => zielAendern(500)} aria-label="+500" className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {quelle && !istVerbunden(user?.id) && (
            <p className="text-xs text-slate-400">{t('steps.olderOnlyHealth')}</p>
          )}
        </>
      )}
    </div>
  );
}

function Kachel({ wert, text }) {
  return (
    <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
      <p className="text-lg font-bold tabular-nums" dir="ltr">{wert}</p>
      <p className="text-[11px] text-slate-400 leading-tight">{text}</p>
    </div>
  );
}

// Tagesbalken mit gestrichelter Ziel-Linie; golden, wenn das Ziel erreicht ist.
// Reine CSS-Balken wie in StatsPage. Bei 30/90 Tagen nur jede n-te Beschriftung.
export function SchrittBalken({ verlauf, ziel, beschriftung, dicht = false }) {
  const max = Math.max(ziel, 1, ...verlauf.map((t) => t.schritte || 0));
  const zielProzent = (ziel / max) * 100;
  const jede = verlauf.length > 30 ? 15 : verlauf.length > 7 ? 5 : 1;
  return (
    <div dir="ltr">
      <div className="relative h-40">
        <div
          className="absolute inset-x-0 border-t border-dashed border-primary-400/70"
          style={{ bottom: `${zielProzent}%` }}
          aria-hidden="true"
        />
        <div className={`absolute inset-0 flex items-end ${dicht ? 'gap-px' : 'gap-1.5'}`}>
          {verlauf.map((tag) => {
            const s = tag.schritte || 0;
            return (
              <div
                key={tag.datum}
                title={`${tag.datum}: ${s}`}
                className={`flex-1 rounded-t-sm ${s >= ziel ? 'bg-primary-500' : s ? 'bg-primary-300/70 dark:bg-primary-700/70' : 'bg-slate-100 dark:bg-slate-800'}`}
                style={{ height: `${s ? Math.max(3, (s / max) * 100) : 2}%` }}
              />
            );
          })}
        </div>
      </div>
      <div className={`flex mt-1 ${dicht ? 'gap-px' : 'gap-1.5'}`}>
        {verlauf.map((tag, i) => (
          <span key={tag.datum} className="flex-1 text-center text-[9px] text-slate-400 whitespace-nowrap overflow-visible">
            {(verlauf.length - 1 - i) % jede === 0 ? beschriftung(tag.datum) : ''}
          </span>
        ))}
      </div>
    </div>
  );
}
