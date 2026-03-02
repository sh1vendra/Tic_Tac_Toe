import { useState, useCallback } from 'react';
import TitleScreen from './components/TitleScreen';
import DifficultySelect from './components/DifficultySelect';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import { useScore } from './hooks/useScore';
import { useSound } from './hooks/useSound';

export default function App() {
  const [screen, setScreen] = useState('title'); // 'title' | 'difficulty' | 'game'
  const [difficulty, setDifficulty] = useState('easy');
  const score = useScore();
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-8">
      {screen === 'game' && (
        <ScoreBoard
          wins={score.wins}
          losses={score.losses}
          draws={score.draws}
          onReset={score.resetScores}
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
