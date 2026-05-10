import { useRef, useEffect } from 'react';

const DAY_LABELS_DE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const DAY_LABELS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function DiamondCalendar({ selectedDay, onSelectDay, scheduledDays, completedDays, year, month, lang = 'de' }) {
  const scrollRef = useRef(null);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayLabels = lang === 'de' ? DAY_LABELS_DE : DAY_LABELS_EN;

  const monthName = new Date(year, month).toLocaleDateString(
    lang === 'de' ? 'de-DE' : 'en-US',
    { month: 'long' }
  );

  // Scroll to selected day on mount/change
  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current.querySelector(`[data-day="${selectedDay}"]`);
      if (el) {
        const container = scrollRef.current;
        const scrollLeft = el.offsetLeft - container.clientWidth / 2 + el.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [selectedDay]);

  function getDiamondColor(day) {
    if (completedDays.has(day)) return 'bg-primary-500 shadow-primary-500/30 shadow-md';
    if (scheduledDays.has(day)) return 'bg-blue-500 shadow-blue-500/20 shadow-sm';
    return 'bg-slate-700';
  }

  function getDiamondSize(day) {
    const diff = Math.abs(day - selectedDay);
    if (diff === 0) return { size: 44, offset: 0, textSize: 'text-sm', opacity: 1 };
    if (diff === 1) return { size: 36, offset: 8, textSize: 'text-xs', opacity: 0.9 };
    if (diff === 2) return { size: 30, offset: 14, textSize: 'text-[10px]', opacity: 0.7 };
    if (diff === 3) return { size: 26, offset: 18, textSize: 'text-[10px]', opacity: 0.5 };
    return { size: 24, offset: 20, textSize: 'text-[10px]', opacity: 0.4 };
  }

  const date = new Date(year, month, selectedDay);
  const selectedDayName = dayLabels[date.getDay()];

  return (
    <div className="mb-4">
      {/* Month label */}
      <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-3 capitalize">{monthName} {year}</p>

      {/* Diamond scroll area */}
      <div
        ref={scrollRef}
        className="flex items-end gap-1 overflow-x-auto scrollbar-hide px-4 pb-2"
        style={{ scrollSnapType: 'x mandatory', height: 80 }}
      >
        {/* Left padding */}
        <div className="flex-shrink-0 w-[40vw]" />

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const { size, offset, textSize, opacity } = getDiamondSize(day);
          const color = getDiamondColor(day);
          const isSelected = day === selectedDay;

          return (
            <button
              key={day}
              data-day={day}
              onClick={() => onSelectDay(day)}
              className="flex-shrink-0 flex flex-col items-center"
              style={{
                scrollSnapAlign: 'center',
                opacity,
                paddingTop: offset,
                transition: 'all 0.2s ease-out',
              }}
            >
              <div
                className={`${color} flex items-center justify-center transition-all duration-200 ${
                  isSelected ? 'ring-2 ring-white/30' : ''
                }`}
                style={{
                  width: size,
                  height: size,
                  transform: 'rotate(45deg)',
                  borderRadius: size > 30 ? 8 : 6,
                }}
              >
                <span
                  className={`${textSize} font-bold text-white`}
                  style={{ transform: 'rotate(-45deg)' }}
                >
                  {day}
                </span>
              </div>
            </button>
          );
        })}

        {/* Right padding */}
        <div className="flex-shrink-0 w-[40vw]" />
      </div>

      {/* Selected day info */}
      <div className="text-center mt-2">
        <p className="text-lg font-bold text-slate-900 dark:text-white">
          {selectedDayName}, {selectedDay}. {monthName}
        </p>
      </div>
    </div>
  );
}
