import { useEffect, useRef, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { useSound } from '../hooks/useSound';
// sound functions are module-level stable references
import Cell from './Cell';
import WinLine from './WinLine';
import GameOverModal from './GameOverModal';
import ParticleEffect from './ParticleEffect';

export default function GameBoard({ difficulty, score, onGameEnd, onMainMenu }) {
  const { board, status, winCombo, makeMove, resetGame } = useGameState(difficulty);
  const sound = useSound();
  const [shaking, setShaking] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const boardRef = useRef(null);
  const prevStatus = useRef('playing');

  useEffect(() => {
    if (prevStatus.current === 'playing' && status !== 'playing') {
      if (status === 'won') {
        sound.playWin();
        setShowParticles(true);
      } else if (status === 'lost') {
        sound.playLose();
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
      } else if (status === 'draw') {
        sound.playDraw();
      }
      onGameEnd(status);
    }
    prevStatus.current = status;
  }, [status, onGameEnd]); // sound functions are module-level stable, no need in deps

  function handleCellClick(index) {
    if (board[index] || status !== 'playing') return;
    sound.playMove();
    makeMove(index);
  }

  function handlePlayAgain() {
    sound.playClick();
    prevStatus.current = 'playing';
    resetGame();
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {showParticles && (
        <ParticleEffect originRef={boardRef} onDone={() => setShowParticles(false)} />
      )}

      <div
        ref={boardRef}
        className={`relative grid grid-cols-3 gap-1 w-full max-w-xs sm:max-w-sm animate-board-enter ${shaking ? 'animate-shake' : ''}`}
        style={{ boxShadow: '0 0 20px #00fff5, 0 0 40px #00fff5/30' }}
      >
        {board.map((cell, i) => (
          <Cell
            key={i}
            index={i}
            value={cell}
            onClick={() => handleCellClick(i)}
            isWinning={winCombo?.includes(i)}
          />
        ))}
        <WinLine combo={winCombo} />
      </div>

      <GameOverModal
        status={status}
        onPlayAgain={handlePlayAgain}
        onMainMenu={onMainMenu}
      />
    </div>
  );
}
