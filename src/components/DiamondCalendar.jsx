import { useRef, useMemo, useState, useCallback } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { toLocalDateString } from '../lib/dateUtils';

const DAY_LABELS_DE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const DAY_LABELS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES_DE = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
const MONTH_NAMES_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const SLOTS = [
  { size: 18, offsetY: 20, opacity: 0.2, fs: 7 },
  { size: 22, offsetY: 17, opacity: 0.3, fs: 8 },
  { size: 28, offsetY: 13, opacity: 0.5, fs: 9 },
  { size: 36, offsetY: 7, opacity: 0.75, fs: 11 },
  { size: 48, offsetY: 0, opacity: 1, fs: 16 },
  { size: 36, offsetY: 7, opacity: 0.75, fs: 11 },
  { size: 28, offsetY: 13, opacity: 0.5, fs: 9 },
  { size: 22, offsetY: 17, opacity: 0.3, fs: 8 },
  { size: 18, offsetY: 20, opacity: 0.2, fs: 7 },
];

function toDateStr(d) {
  return toLocalDateString(d);
}

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return toDateStr(d);
}

export default function DiamondCalendar({ selectedDate, onSelectDate, scheduledDays, completedDays, lang = 'de', onOpenCalendar }) {
  const startXRef = useRef(0);
  const selectedRef = useRef(selectedDate);
  selectedRef.current = selectedDate;
  const [pulse, setPulse] = useState(false);
  const pulseTimer = useRef(null);

  const sel = new Date(selectedDate + 'T12:00:00');
  const dayLabels = lang === 'de' ? DAY_LABELS_DE : DAY_LABELS_EN;
  const monthNames = lang === 'de' ? MONTH_NAMES_DE : MONTH_NAMES_EN;
  const monthName = monthNames[sel.getMonth()];
  const dayName = dayLabels[sel.getDay()];

  const triggerPulse = useCallback(() => {
    setPulse(true);
    clearTimeout(pulseTimer.current);
    pulseTimer.current = setTimeout(() => setPulse(false), 120);
    try { navigator.vibrate?.(12); } catch {}
  }, []);

  function go(dir) {
    const next = addDays(selectedRef.current, dir);
    triggerPulse();
    onSelectDate(next);
  }

  function onTouchStart(e) {
    startXRef.current = e.touches[0].clientX;
  }

  function onTouchMove(e) {
    e.preventDefault();
    const dx = startXRef.current - e.touches[0].clientX;
    if (Math.abs(dx) >= 28) {
      go(dx > 0 ? 1 : -1);
      startXRef.current = e.touches[0].clientX;
    }
  }

  // Build 9 slots: selected ± 4 days (crosses month boundaries automatically)
  const slots = useMemo(() => {
    return SLOTS.map((slotStyle, i) => {
      const dateStr = addDays(selectedDate, i - 4);
      const d = new Date(dateStr + 'T12:00:00');
      return {
        dateStr,
        day: d.getDate(),
        ...slotStyle,
      };
    });
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
        className="flex items-end justify-center select-none"
        style={{ height: 72, touchAction: 'none' }}
      >
        {slots.map((slot, i) => (
          <div
            key={i}
            onClick={() => slot.dateStr !== selectedDate && (triggerPulse(), onSelectDate(slot.dateStr))}
            className="flex-shrink-0 flex items-center justify-center"
            style={{ height: 72, paddingTop: slot.offsetY, opacity: slot.opacity, marginRight: i < 8 ? 6 : 0 }}
          >
            <div
              className={`${getColor(slot.dateStr)} flex items-center justify-center ${i === 4 ? 'shadow-lg shadow-primary-500/20' : ''}`}
              style={{
                width: slot.size,
                height: slot.size,
                transform: i === 4 && pulse ? 'scale(1.2)' : 'none',
                borderRadius: '50%',
                transition: i === 4 ? 'transform 0.1s ease-out' : 'none',
              }}
            >
              <span className="font-bold text-white" style={{ fontSize: slot.fs }}>
                {slot.day}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected day label */}
      <p className="text-sm font-semibold text-slate-900 dark:text-white text-center mt-1">
        {dayName}, {sel.getDate()}. {monthName}
      </p>
    </div>
  );
}
