/**
 * Simple SVG line graph showing exercise progress over weeks.
 * No external dependencies.
 */
export default function ExerciseLineGraph({ data = [], label = '', unit = 'kg', className = '' }) {
  if (data.length < 2) {
    return (
      <div className={`text-center py-8 text-slate-400 dark:text-slate-500 text-sm ${className}`}>
        Nicht genug Daten für einen Graphen
      </div>
    );
  }

  const width = 300;
  const height = 160;
  const padLeft = 40;
  const padRight = 10;
  const padTop = 10;
  const padBottom = 30;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;
  const yPad = range * 0.1;
  const yMin = Math.max(0, minVal - yPad);
  const yMax = maxVal + yPad;
  const yRange = yMax - yMin || 1;

  const points = data.map((d, i) => ({
    x: padLeft + (i / (data.length - 1)) * chartW,
    y: padTop + chartH - ((d.value - yMin) / yRange) * chartH,
    label: d.label || '',
    value: d.value,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  // Y-axis: 3 labels
  const yLabels = [yMin, yMin + yRange / 2, yMax].map((v) => ({
    value: Math.round(v * 10) / 10,
    y: padTop + chartH - ((v - yMin) / yRange) * chartH,
  }));

  // Trend calculation
  const firstHalf = values.slice(0, Math.ceil(values.length / 2));
  const secondHalf = values.slice(Math.floor(values.length / 2));
  const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  const trendPercent = avgFirst > 0 ? Math.round(((avgSecond - avgFirst) / avgFirst) * 100) : 0;

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        {yLabels.map((yl, i) => (
          <g key={i}>
            <line
              x1={padLeft}
              y1={yl.y}
              x2={width - padRight}
              y2={yl.y}
              stroke="currentColor"
              strokeWidth={0.5}
              opacity={0.15}
              strokeDasharray="4 4"
              className="text-slate-400"
            />
            <text
              x={padLeft - 6}
              y={yl.y + 4}
              textAnchor="end"
              className="text-slate-400 dark:text-slate-500"
              fontSize={9}
              fill="currentColor"
            >
              {yl.value}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={height - 6}
            textAnchor="middle"
            className="text-slate-400 dark:text-slate-500"
            fontSize={8}
            fill="currentColor"
          >
            {p.label}
          </text>
        ))}

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke="#6366f1"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dots */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="#6366f1"
            stroke="white"
            strokeWidth={2}
          />
        ))}
      </svg>

      {/* Stats below graph */}
      <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
        <span>Max: {maxVal} {unit}</span>
        <span className={trendPercent > 0 ? 'text-green-500' : trendPercent < 0 ? 'text-red-500' : ''}>
          {trendPercent > 0 ? '↑' : trendPercent < 0 ? '↓' : '→'} {trendPercent > 0 ? '+' : ''}{trendPercent}%
        </span>
      </div>
    </div>
  );
}
