import { useRef, useCallback } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const DAY_LABELS_DE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const DAY_LABELS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function DiamondCalendar({ selectedDay, onSelectDay, scheduledDays, completedDays, year, month, lang = 'de', onOpenCalendar }) {
  const startXRef = useRef(0);
  const cumulativeDeltaRef = useRef(0);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayLabels = lang === 'de' ? DAY_LABELS_DE : DAY_LABELS_EN;
  const selectedDayRef = useRef(selectedDay);
  selectedDayRef.current = selectedDay;

  const monthName = new Date(year, month).toLocaleDateString(
    lang === 'de' ? 'de-DE' : 'en-US',
    { month: 'long' }
  );

  const vibrate = useCallback(() => {
    try { navigator.vibrate?.(15); } catch {}
  }, []);

  const changeDay = useCallback((dir) => {
    const current = selectedDayRef.current;
    const next = current + dir;
    if (next >= 1 && next <= daysInMonth && next !== current) {
      vibrate();
      onSelectDay(next);
    }
  }, [daysInMonth, onSelectDay, vibrate]);

  function handleTouchStart(e) {
    startXRef.current = e.touches[0].clientX;
    cumulativeDeltaRef.current = 0;
  }

  function handleTouchMove(e) {
    e.preventDefault(); // Prevent page scroll
    const deltaX = startXRef.current - e.touches[0].clientX;
    cumulativeDeltaRef.current = deltaX;

    // Every 35px of swipe = 1 day change
    const steps = Math.trunc(deltaX / 35);
    if (steps !== 0) {
      changeDay(steps > 0 ? 1 : -1);
      startXRef.current = e.touches[0].clientX;
      cumulativeDeltaRef.current = 0;
    }
  }

  function getDiamondColor(day) {
    if (completedDays.has(day)) return 'bg-primary-500';
    if (scheduledDays.has(day)) return 'bg-blue-500';
    return 'bg-slate-700';
  }

  // Visible range: 4 on each side of selected
  const visibleDays = [];
  for (let i = -4; i <= 4; i++) {
    const day = selectedDay + i;
    if (day >= 1 && day <= daysInMonth) visibleDays.push(day);
  }

  const date = new Date(year, month, selectedDay);
  const selectedDayName = dayLabels[date.getDay()];

  return (
    <div className="mb-4">
      {/* Month + nav */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <button onClick={() => changeDay(-1)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </button>
        {onOpenCalendar && (
          <button onClick={onOpenCalendar} className="flex items-center gap-1.5 px-3 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <Calendar className="w-3.5 h-3.5 text-primary-500" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 capitalize">{monthName} {year}</span>
          </button>
        )}
        <button onClick={() => changeDay(1)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Diamonds */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="flex items-end justify-center select-none"
        style={{ height: 72, touchAction: 'none' }}
      >
        {visibleDays.map((day) => {
          const diff = Math.abs(day - selectedDay);
          let size, offsetY, opacity, fs;
          if (diff === 0) { size = 48; offsetY = 0; opacity = 1; fs = 15; }
          else if (diff === 1) { size = 38; offsetY = 6; opacity = 0.85; fs = 12; }
          else if (diff === 2) { size = 30; offsetY = 12; opacity = 0.6; fs = 10; }
          else if (diff === 3) { size = 24; offsetY = 16; opacity = 0.4; fs = 9; }
          else { size = 20; offsetY = 18; opacity = 0.25; fs = 8; }

          return (
            <div
              key={day}
              onClick={() => { if (day !== selectedDay) { vibrate(); onSelectDay(day); } }}
              className="flex-shrink-0 flex items-center justify-center cursor-pointer"
              style={{ width: 52, height: 72, paddingTop: offsetY, opacity }}
            >
              <div
                className={`${getDiamondColor(day)} flex items-center justify-center ${diff === 0 ? 'shadow-lg' : ''}`}
                style={{
                  width: size, height: size,
                  transform: 'rotate(45deg)',
                  borderRadius: Math.max(4, size * 0.15),
                }}
              >
                <span className="font-bold text-white" style={{ transform: 'rotate(-45deg)', fontSize: fs }}>
                  {day}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected day */}
      <p className="text-sm font-semibold text-slate-900 dark:text-white text-center mt-1">
        {selectedDayName}, {selectedDay}. {monthName}
      </p>
    </div>
  );
}
