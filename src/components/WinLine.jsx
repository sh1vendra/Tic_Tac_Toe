const POSITIONS = [
  [1, 1], [3, 1], [5, 1], // row 0
  [1, 3], [3, 3], [5, 3], // row 1
  [1, 5], [3, 5], [5, 5], // row 2
];

export default function WinLine({ combo }) {
  if (!combo) return null;

  const [a, c] = [combo[0], combo[2]];
  const [x1, y1] = POSITIONS[a];
  const [x2, y2] = POSITIONS[c];

  return (
    <svg
      viewBox="0 0 6 6"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 10,
      }}
    >
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="#ffff00"
        strokeWidth="0.25"
        strokeLinecap="round"
        style={{
          filter: 'drop-shadow(0 0 4px #ffff00) drop-shadow(0 0 8px #ffff00)',
          strokeDasharray: 8,
          strokeDashoffset: 8,
          animation: 'drawLine 0.4s ease-out forwards',
        }}
      />
      <style>{`
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}
