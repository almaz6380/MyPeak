import { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { toLocalDateString } from '../lib/dateUtils';
import { datumsLocale } from '../lib/datumsformat';
import { istRtl } from '../lib/sprache';

// Wochentage (Sonntag zuerst, passend zu Date#getDay) und Monatsnamen kommen
// aus Intl statt aus Handlisten — sonst bräuchte jede neue Sprache hier zwei
// weitere Arrays.

// Kreisgröße/Deckkraft nach Abstand zur Mitte (0..4). Zwischenwerte werden
// interpoliert — dadurch fließt der Bogen beim Wischen, statt zu springen.
const SIZES = [48, 36, 28, 22, 18];
const OPACITIES = [1, 0.75, 0.5, 0.3, 0.2];
const BASE = SIZES[0];
const GAP = 6;
const RANGE = 6;      // gerenderte Tage links/rechts der Mitte
const VISIBLE = 4.6;  // ab diesem Abstand ausgeblendet
const MAX_JUMP = 3;   // ein Wisch überspringt höchstens 3 Tage
const ROW_HEIGHT = 72;

// Wert einer Stützstellen-Kurve bei beliebigem (auch gebrochenem) Abstand.
function curve(points, dist) {
  const a = Math.min(Math.abs(dist), points.length - 1);
  const i = Math.floor(a);
  const next = Math.min(i + 1, points.length - 1);
  return points[i] + (points[next] - points[i]) * (a - i);
}

const sizeAt = (dist) => curve(SIZES, dist);

// x-Position je ganzem Tagesabstand: halbe Breite + Lücke + halbe Breite.
const X_STEPS = [0];
for (let k = 1; k <= RANGE; k++) {
  X_STEPS[k] = X_STEPS[k - 1] + sizeAt(k - 1) / 2 + GAP + sizeAt(k) / 2;
}
const DAY_WIDTH = X_STEPS[1]; // Pixel pro Tag beim Wischen

function xAt(dist) {
  const a = Math.min(Math.abs(dist), RANGE);
  const i = Math.floor(a);
  const next = Math.min(i + 1, RANGE);
  const v = X_STEPS[i] + (X_STEPS[next] - X_STEPS[i]) * (a - i);
  return dist < 0 ? -v : v;
}

function toDateStr(d) {
  return toLocalDateString(d);
}

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return toDateStr(d);
}

export default function DiamondCalendar({ selectedDate, onSelectDate, scheduledDays, completedDays, lang = 'de', onOpenCalendar }) {
  // shift = um wie viele Tage die Reihe gerade aus der Ruhelage verschoben ist
  // (gebrochen während des Wischens, 0 in Ruhe).
  const [shift, setShift] = useState(0);
  const [animate, setAnimate] = useState(false);
  const touch = useRef({ x: 0, y: 0, axis: null });
  const rafRef = useRef(null);
  const animTimer = useRef(null);

  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current);
    clearTimeout(animTimer.current);
  }, []);

  const sel = new Date(selectedDate + 'T12:00:00');
  const locale = datumsLocale(lang);
  // Der Streifen setzt jeden Tag mit einem absoluten `translate3d(x, …)`.
  // Pixelwerte spiegelt `dir=rtl` NICHT mit — ohne dieses Vorzeichen liefe der
  // Streifen auf Arabisch rückwärts: rechts stünde der 5., links der 28.
  // Dasselbe gilt für die Wischgeste, sonst zöge man in die falsche Richtung.
  const richtung = istRtl(lang) ? -1 : 1;
  const monthNames = Array.from({ length: 12 }, (_, m) =>
    new Date(Date.UTC(2026, m, 15)).toLocaleDateString(locale, { month: 'long', timeZone: 'UTC' }));
  const monthName = monthNames[sel.getMonth()];
  // Ausgeschriebenes Datum komplett von Intl bauen lassen, nicht aus Teilen
  // zusammensetzen. `{dayName}, {tag}. {monat}` war deutsche Zeichensetzung:
  // Franzoesisch schreibt „mardi 1 septembre" ohne Komma und ohne Punkt,
  // Portugiesisch „terça-feira, 1 de setembro", Arabisch mit dem arabischen
  // Komma „،". Deutsch kommt dabei unveraendert heraus.
  const datumLang = sel.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' });

  // Datum übernehmen und den Rest-Versatz weich auf 0 auslaufen lassen.
  const settle = useCallback((days, restShift) => {
    if (days !== 0) {
      onSelectDate(addDays(selectedDate, days));
      try { navigator.vibrate?.(12); } catch { /* nicht unterstützt */ }
    }
    setAnimate(false);
    setShift(restShift);
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setAnimate(true);
      setShift(0);
      clearTimeout(animTimer.current);
      animTimer.current = setTimeout(() => setAnimate(false), 280);
    });
  }, [onSelectDate, selectedDate]);

  // Pfeile und Tap auf einen Nachbarkreis: gleiten statt springen.
  const go = useCallback((days) => settle(days, -days), [settle]);

  function onTouchStart(e) {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, axis: null };
  }

  function onTouchMove(e) {
    const dx = e.touches[0].clientX - touch.current.x;
    const dy = e.touches[0].clientY - touch.current.y;

    // Achse einmal festlegen: vertikal bleibt Scrollen bzw. Pull-to-Refresh.
    if (!touch.current.axis) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      touch.current.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    }
    if (touch.current.axis !== 'x') return;

    e.preventDefault();
    setAnimate(false);
    // Jenseits von MAX_JUMP zäher werden lassen (gummiartiger Widerstand).
    const raw = (-dx * richtung) / DAY_WIDTH;
    const clamped = Math.max(-MAX_JUMP, Math.min(MAX_JUMP, raw));
    setShift(clamped + (raw - clamped) * 0.2);
  }

  function onTouchEnd() {
    if (touch.current.axis !== 'x') return;
    touch.current.axis = null;
    const target = Math.max(-MAX_JUMP, Math.min(MAX_JUMP, Math.round(shift)));
    settle(target, shift - target);
  }

  // Kreise für selected ± RANGE (Monatsgrenzen laufen automatisch mit).
  const slots = useMemo(() => {
    const list = [];
    for (let offset = -RANGE; offset <= RANGE; offset++) {
      const dateStr = addDays(selectedDate, offset);
      list.push({ offset, dateStr, day: new Date(dateStr + 'T12:00:00').getDate() });
    }
    return list;
  }, [selectedDate]);

  function getColor(dateStr) {
    if (completedDays.has(dateStr)) return 'bg-primary-500';
    if (scheduledDays.has(dateStr)) return 'bg-blue-500';
    return 'bg-slate-700';
  }

  return (
    <div className="mb-4">
      {/* Month header */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <button onClick={() => go(-1)} className="p-1.5 rounded-lg active:bg-slate-200 dark:active:bg-slate-700">
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </button>
        {onOpenCalendar && (
          <button onClick={onOpenCalendar} className="flex items-center gap-1.5 px-3 py-1 rounded-lg active:bg-slate-200 dark:active:bg-slate-700">
            <Calendar className="w-3.5 h-3.5 text-primary-500" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{monthName} {sel.getFullYear()}</span>
          </button>
        )}
        <button onClick={() => go(1)} className="p-1.5 rounded-lg active:bg-slate-200 dark:active:bg-slate-700">
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Circle row */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        className="relative overflow-hidden select-none"
        style={{ height: ROW_HEIGHT, touchAction: 'pan-y' }}
      >
        {slots.map((slot) => {
          // Abstand zur Mitte — während des Wischens gebrochen, also fließend.
          const dist = slot.offset - shift;
          const scale = sizeAt(dist) / BASE;
          const y = ((BASE - sizeAt(dist)) / 2) * 1.35; // kleine Kreise sinken ab → Bogen
          const isCenter = Math.abs(dist) < 0.5;
          const transition = animate
            ? 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 280ms ease-out'
            : 'none';

          return (
            <button
              key={slot.dateStr}
              type="button"
              onClick={() => {
                const days = Math.round(slot.offset - shift);
                if (days !== 0) go(days);
              }}
              className="absolute top-0 left-1/2 flex items-center justify-center"
              style={{
                width: BASE,
                height: BASE,
                marginLeft: -BASE / 2,
                marginTop: (ROW_HEIGHT - BASE) / 2,
                opacity: Math.abs(dist) > VISIBLE ? 0 : curve(OPACITIES, dist),
                transform: `translate3d(${xAt(dist) * richtung}px, ${y}px, 0) scale(${scale})`,
                transition,
                willChange: 'transform, opacity',
              }}
            >
              <div
                className={`${getColor(slot.dateStr)} w-full h-full rounded-full flex items-center justify-center ${isCenter ? 'shadow-lg shadow-primary-500/20' : ''}`}
              >
                <span className="font-bold text-white" style={{ fontSize: 16 }}>
                  {slot.day}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected day label */}
      <p className="text-sm font-semibold text-slate-900 dark:text-white text-center mt-1">
        {datumLang}
      </p>
    </div>
  );
}
