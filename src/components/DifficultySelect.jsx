const DIFFICULTIES = [
  { value: 'easy',   label: 'EASY',   desc: 'CPU plays randomly',      color: '#39ff14' },
  { value: 'medium', label: 'MEDIUM', desc: 'CPU makes some mistakes',  color: '#ffff00' },
  { value: 'hard',   label: 'HARD',   desc: 'CPU is unbeatable',        color: '#ff00ff' },
];

export default function DifficultySelect({ onSelect }) {
  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in px-4">
      <h2 className="text-sm text-[#00fff5] text-neon-glow">SELECT DIFFICULTY</h2>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        {DIFFICULTIES.map(({ value, label, desc, color }) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className="flex flex-col items-start gap-1 px-6 py-4 border-2 rounded transition-all duration-150 active:scale-95 hover:opacity-90"
            style={{
              borderColor: color,
              color,
              boxShadow: `0 0 8px ${color}40`,
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 16px ${color}`}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 8px ${color}40`}
          >
            <span className="text-sm" style={{ textShadow: `0 0 8px ${color}` }}>{label}</span>
            <span className="text-[8px] opacity-60">{desc}</span>
          </button>
        ))}
      </div>

    </div>
  );
}
