export default function GameOverModal({ status, onPlayAgain, onMainMenu }) {
  if (status === 'playing') return null;

  const config = {
    won:  { text: 'YOU WIN!',  color: '#39ff14', glow: '#39ff14' },
    lost: { text: 'YOU LOSE!', color: '#ff00ff', glow: '#ff00ff' },
    draw: { text: 'DRAW!',     color: '#ffff00', glow: '#ffff00' },
  }[status];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 animate-fade-in">
      <div className="flex flex-col items-center gap-6 p-8 border-2 rounded-lg bg-[#0a0a1a] animate-bounce-in"
        style={{ borderColor: config.color, boxShadow: `0 0 30px ${config.glow}` }}>
        <h2
          className="text-2xl sm:text-3xl text-center"
          style={{ color: config.color, textShadow: `0 0 10px ${config.glow}, 0 0 30px ${config.glow}` }}
        >
          {config.text}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <NeonButton onClick={onPlayAgain} color="#00fff5">PLAY AGAIN</NeonButton>
          <NeonButton onClick={onMainMenu} color="#ff00ff">MAIN MENU</NeonButton>
        </div>
      </div>
    </div>
  );
}

function NeonButton({ onClick, color, children }) {
  return (
    <button
      onClick={onClick}
      className="text-sm px-6 py-3 rounded border-2 transition-all duration-150 hover:opacity-80 active:scale-95"
      style={{ color, borderColor: color, boxShadow: `0 0 8px ${color}` }}
    >
      {children}
    </button>
  );
}
