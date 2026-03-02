import { useState, useCallback, useRef } from 'react';
import { PLAYER_X, PLAYER_O } from '../game/constants';
import { checkWinner, isDraw } from '../game/engine';
import { getCpuMove } from '../game/ai';

const initialState = {
  board: Array(9).fill(null),
  turn: PLAYER_X,
  status: 'playing', // 'playing' | 'won' | 'lost' | 'draw'
  winCombo: null,
};

export function useGameState(difficulty) {
  const [state, setState] = useState(initialState);
  const cpuTimer = useRef(null);

  const makeMove = useCallback((index) => {
    setState((prev) => {
      if (prev.status !== 'playing' || prev.board[index] || prev.turn !== PLAYER_X) return prev;

      const board = [...prev.board];
      board[index] = PLAYER_X;

      const { winner, combo } = checkWinner(board);
      if (winner) return { ...prev, board, status: 'won', winCombo: combo };
      if (isDraw(board)) return { ...prev, board, status: 'draw', winCombo: null };

      return { ...prev, board, turn: PLAYER_O };
    });
  }, []);

  // Trigger CPU move whenever it's O's turn
  const scheduleCpu = useCallback((board) => {
    if (cpuTimer.current) clearTimeout(cpuTimer.current);
    cpuTimer.current = setTimeout(() => {
      setState((prev) => {
        if (prev.status !== 'playing' || prev.turn !== PLAYER_O) return prev;

        const cpuIndex = getCpuMove([...prev.board], difficulty);
        if (cpuIndex === null || cpuIndex === undefined) return prev;

        const newBoard = [...prev.board];
        newBoard[cpuIndex] = PLAYER_O;

        const { winner, combo } = checkWinner(newBoard);
        if (winner) return { ...prev, board: newBoard, status: 'lost', winCombo: combo };
        if (isDraw(newBoard)) return { ...prev, board: newBoard, status: 'draw', winCombo: null };

        return { ...prev, board: newBoard, turn: PLAYER_X };
      });
    }, 500);
  }, [difficulty]);

  // Watch for CPU's turn
  const prevTurnRef = useRef(null);
  if (state.turn === PLAYER_O && state.status === 'playing' && prevTurnRef.current !== state.turn) {
    prevTurnRef.current = state.turn;
    scheduleCpu(state.board);
  }
  if (state.turn === PLAYER_X) {
    prevTurnRef.current = PLAYER_X;
  }

  const resetGame = useCallback(() => {
    if (cpuTimer.current) clearTimeout(cpuTimer.current);
    prevTurnRef.current = null;
    setState(initialState);
  }, []);

  return { ...state, makeMove, resetGame };
}
