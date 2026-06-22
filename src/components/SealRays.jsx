import React from 'react';

/**
 * The page's signature element: a radiating seal mark, drawn from the
 * crest's own ray pattern. Used sparingly — hero backdrop, a divider,
 * and the footer mark — so it reads as a deliberate motif, not decor
 * repeated everywhere.
 */
const SealRays = ({ size = 520, color = '#A9824C', opacity = 0.16, spin = true }) => {
  const rays = Array.from({ length: 48 });
  const cx = size / 2;
  const cy = size / 2;
  const rInner = size * 0.34;
  const rOuter = size * 0.49;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        animation: spin ? 'seal-rotate 120s linear infinite' : 'none',
      }}
      aria-hidden="true"
    >
      {rays.map((_, i) => {
        const angle = (i / rays.length) * 2 * Math.PI;
        const x1 = cx + rInner * Math.cos(angle);
        const y1 = cy + rInner * Math.sin(angle);
        const x2 = cx + rOuter * Math.cos(angle);
        const y2 = cy + rOuter * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth={size * 0.006}
            strokeLinecap="round"
            opacity={opacity}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={rInner} fill="none" stroke={color} strokeWidth={size * 0.004} opacity={opacity * 1.3} />
    </svg>
  );
};

export default SealRays;
