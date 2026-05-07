/**
 * Tiny 4-bar sparkline showing max weight trend over last 4 weeks.
 * Green = trending up, red = trending down, slate = flat/insufficient data.
 */
export default function MiniSparkline({ data = [], width = 32, height = 18, className = '' }) {
  if (data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const barCount = data.length;
  const gap = 2;
  const barWidth = (width - (barCount - 1) * gap) / barCount;
  const minBarHeight = 3;

  const trending = data[data.length - 1] > data[0] ? 'up' : data[data.length - 1] < data[0] ? 'down' : 'flat';
  const color = trending === 'up' ? '#22c55e' : trending === 'down' ? '#ef4444' : '#94a3b8';

  return (
    <svg width={width} height={height} className={className} aria-hidden="true">
      {data.map((val, i) => {
        const normalized = (val - min) / range;
        const barH = Math.max(minBarHeight, normalized * (height - 2) + minBarHeight);
        const x = i * (barWidth + gap);
        const y = height - barH;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barWidth}
            height={barH}
            rx={1.5}
            fill={color}
            opacity={i === data.length - 1 ? 1 : 0.5}
          />
        );
      })}
    </svg>
  );
}
