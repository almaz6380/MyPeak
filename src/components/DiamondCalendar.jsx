import { useRef, useMemo, useState, useCallback } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const DAY_LABELS_DE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const DAY_LABELS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Fixed positions: 9 slots, center is always the selected day
const SLOTS = [
  { size: 18, offsetY: 20, opacity: 0.2, fs: 7 },
  { size: 22, offsetY: 17, opacity: 0.3, fs: 8 },
  { size: 28, offsetY: 13, opacity: 0.5, fs: 9 },
  { size: 36, offsetY: 7, opacity: 0.75, fs: 11 },
  { size: 48, offsetY: 0, opacity: 1, fs: 16 },   // CENTER — selected
  { size: 36, offsetY: 7, opacity: 0.75, fs: 11 },
  { size: 28, offsetY: 13, opacity: 0.5, fs: 9 },
  { size: 22, offsetY: 17, opacity: 0.3, fs: 8 },
  { size: 18, offsetY: 20, opacity: 0.2, fs: 7 },
];

export default function DiamondCalendar({ selectedDay, onSelectDay, scheduledDays, completedDays, year, month, lang = 'de', onOpenCalendar }) {
  const startXRef = useRef(0);
  const selectedRef = useRef(selectedDay);
  selectedRef.current = selectedDay;
  const [pulse, setPulse] = useState(false);
  const pulseTimer = useRef(null);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayLabels = lang === 'de' ? DAY_LABELS_DE : DAY_LABELS_EN;
  const monthName = new Date(year, month).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', { month: 'long' });

  const triggerPulse = useCallback(() => {
    setPulse(true);
    clearTimeout(pulseTimer.current);
    pulseTimer.current = setTimeout(() => setPulse(false), 120);
    try { navigator.vibrate?.(12); } catch {}
  }, []);

  function go(dir) {
    const next = selectedRef.current + dir;
    if (next >= 1 && next <= daysInMonth) {
      triggerPulse();
      onSelectDay(next);
    }
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

  // Build 9 slots centered on selectedDay
  const slots = useMemo(() => {
    const result = [];
    for (let i = 0; i < 9; i++) {
      const day = selectedDay - 4 + i;
      result.push({
        day: day >= 1 && day <= daysInMonth ? day : null,
        ...SLOTS[i],
      });
    }
    return result;
  }, [selectedDay, daysInMonth]);

  function getColor(day) {
    if (!day) return 'bg-transparent';
    if (completedDays.has(day)) return 'bg-primary-500';
    if (scheduledDays.has(day)) return 'bg-blue-500';
    return 'bg-slate-700';
  }

  const date = new Date(year, month, selectedDay);
  const dayName = dayLabels[date.getDay()];

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
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 capitalize">{monthName} {year}</span>
          </button>
        )}
        <button onClick={() => go(1)} className="p-1.5 rounded-lg active:bg-slate-200 dark:active:bg-slate-700">
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Fixed diamond row */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        className="flex items-end justify-center select-none"
        style={{ height: 72, touchAction: 'none' }}
      >
        {slots.map((slot, i) => (
          <div
            key={i}
            onClick={() => slot.day && slot.day !== selectedDay && (triggerPulse(), onSelectDay(slot.day))}
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: 42, height: 72, paddingTop: slot.offsetY, opacity: slot.day ? slot.opacity : 0 }}
          >
            {slot.day && (
              <div
                className={`${getColor(slot.day)} flex items-center justify-center ${i === 4 ? 'shadow-lg shadow-primary-500/20' : ''}`}
                style={{
                  width: slot.size,
                  height: slot.size,
                  transform: `rotate(45deg)${i === 4 && pulse ? ' scale(1.2)' : ''}`,
                  borderRadius: Math.max(3, slot.size * 0.15),
                  transition: i === 4 ? 'transform 0.1s ease-out' : 'none',
                }}
              >
                <span className="font-bold text-white" style={{ transform: 'rotate(-45deg)', fontSize: slot.fs }}>
                  {slot.day}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected day label */}
      <p className="text-sm font-semibold text-slate-900 dark:text-white text-center mt-1">
        {dayName}, {selectedDay}. {monthName}
      </p>
    </div>
  );
}
