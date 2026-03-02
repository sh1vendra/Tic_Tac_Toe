export default function ScoreBoard({ wins, losses, draws, onReset }) {
  return (
    <div className="flex items-center justify-between gap-4 w-full max-w-sm mx-auto px-2 py-3">
      <Stat label="WIN"  value={wins}   color="#39ff14" />
      <Stat label="DRAW" value={draws}  color="#ffff00" />
      <Stat label="LOSE" value={losses} color="#ff00ff" />
      <button
        onClick={onReset}
        className="text-[8px] text-[#00fff5]/50 hover:text-[#00fff5] transition-colors border border-[#00fff5]/20 hover:border-[#00fff5]/60 px-2 py-1 rounded"
      >
        RESET
      </button>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[8px] opacity-60" style={{ color }}>{label}</span>
      <span className="text-xl" style={{ color, textShadow: `0 0 8px ${color}` }}>{value}</span>
    </div>
  );
}
