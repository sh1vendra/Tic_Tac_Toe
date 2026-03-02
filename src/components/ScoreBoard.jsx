import LoginButton from './LoginButton';

export default function ScoreBoard({ wins, losses, draws, onReset, onLeaderboard, user }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-sm mx-auto px-2 mb-2">
      {/* Top row: login + leaderboard */}
      <div className="flex items-center justify-between">
        <LoginButton user={user} />
        <button
          onClick={onLeaderboard}
          className="text-[8px] text-[#00fff5]/50 hover:text-[#00fff5] border border-[#00fff5]/20
                     hover:border-[#00fff5]/60 px-2 py-1 rounded transition-all"
        >
          LEADERBOARD
        </button>
      </div>

      {/* Score row */}
      <div className="flex items-center justify-between px-2 py-2">
        <Stat label="WIN"  value={wins}   color="#39ff14" />
        <Stat label="DRAW" value={draws}  color="#ffff00" />
        <Stat label="LOSE" value={losses} color="#ff00ff" />
        <button
          onClick={onReset}
          className="text-[8px] text-white/30 hover:text-white/60 border border-white/10
                     hover:border-white/30 px-2 py-1 rounded transition-all"
        >
          RESET
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[7px] opacity-50" style={{ color }}>{label}</span>
      <span className="text-xl" style={{ color, textShadow: `0 0 8px ${color}` }}>{value}</span>
    </div>
  );
}
