import { useState, useCallback } from 'react';
import TitleScreen from './components/TitleScreen';
import DifficultySelect from './components/DifficultySelect';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import Leaderboard from './components/Leaderboard';
import { useScore } from './hooks/useScore';
import { useSound } from './hooks/useSound';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const [screen, setScreen] = useState('title'); // 'title' | 'difficulty' | 'game'
  const [difficulty, setDifficulty] = useState('easy');
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const { user, loading } = useAuth();
  const score = useScore(user);
  const sound = useSound();

  function handleStart() {
    sound.playClick();
    setScreen('difficulty');
  }

  function handleDifficulty(d) {
    sound.playClick();
    setDifficulty(d);
    setScreen('game');
  }

  const handleGameEnd = useCallback((status) => {
    if (status === 'won')  score.recordWin();
    if (status === 'lost') score.recordLoss();
    if (status === 'draw') score.recordDraw();
  }, [score]);

  function handleMainMenu() {
    sound.playClick();
    setScreen('title');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[10px] text-[#00fff5] animate-glow-pulse">LOADING...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-8">
      {showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}

      {screen === 'game' && (
        <ScoreBoard
          wins={score.wins}
          losses={score.losses}
          draws={score.draws}
          onReset={score.resetScores}
          onLeaderboard={() => setShowLeaderboard(true)}
          user={user}
        />
      )}

      <div className="flex flex-col items-center w-full max-w-sm">
        {screen === 'title' && <TitleScreen onStart={handleStart} />}
        {screen === 'difficulty' && <DifficultySelect onSelect={handleDifficulty} />}
        {screen === 'game' && (
          <GameBoard
            difficulty={difficulty}
            score={score}
            onGameEnd={handleGameEnd}
            onMainMenu={handleMainMenu}
          />
        )}
      </div>

      <footer className="mt-8 text-[8px] text-white/20">
        {screen === 'game' && (
          <button onClick={handleMainMenu} className="hover:text-white/50 transition-colors">
            ← BACK
          </button>
        )}
      </footer>
    </div>
  );
}
