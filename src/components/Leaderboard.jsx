import { useEffect, useState } from 'react';
import { getLeaderboard } from '../firebase/scores';

export default function Leaderboard({ onClose }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard().then((data) => {
      setEntries(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 animate-fade-in">
      <div
        className="flex flex-col gap-4 p-6 border-2 border-[#00fff5] rounded-lg bg-[#0a0a1a] w-full max-w-sm mx-4 animate-bounce-in"
        style={{ boxShadow: '0 0 30px #00fff5' }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-[#00fff5] text-neon-glow">LEADERBOARD</h2>
          <button onClick={onClose} className="text-[10px] text-white/40 hover:text-white transition-colors">✕</button>
        </div>

        {loading ? (
          <p className="text-[10px] text-white/40 text-center py-6 animate-glow-pulse">LOADING...</p>
        ) : entries.length === 0 ? (
          <p className="text-[10px] text-white/30 text-center py-6">NO SCORES YET</p>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="flex text-[7px] text-white/30 px-2 pb-1">
              <span className="w-5">#</span>
              <span className="flex-1">PLAYER</span>
              <span className="w-8 text-center" style={{ color: '#39ff14' }}>W</span>
              <span className="w-8 text-center" style={{ color: '#ffff00' }}>D</span>
              <span className="w-8 text-center" style={{ color: '#ff00ff' }}>L</span>
            </div>
            {entries.map((e, i) => (
              <div
                key={e.uid}
                className="flex items-center text-[9px] px-2 py-2 rounded"
                style={{ background: i === 0 ? '#16213e' : '#0f0f1a' }}
              >
                <span className="w-5 text-white/30">{i + 1}</span>
                <span className="flex-1 text-white truncate">
                  {i === 0 && <span className="mr-1">👑</span>}
                  {(e.displayName || 'PLAYER').split(' ')[0].toUpperCase()}
                </span>
                <span className="w-8 text-center" style={{ color: '#39ff14' }}>{e.wins}</span>
                <span className="w-8 text-center" style={{ color: '#ffff00' }}>{e.draws}</span>
                <span className="w-8 text-center" style={{ color: '#ff00ff' }}>{e.losses}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
