import { WIN_COMBOS } from './constants';

export function checkWinner(board) {
  for (const combo of WIN_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo };
    }
  }
  return { winner: null, combo: null };
}

export function getEmptyCells(board) {
  return board.reduce((acc, cell, i) => (cell === null ? [...acc, i] : acc), []);
}

export function isDraw(board) {
  return getEmptyCells(board).length === 0 && checkWinner(board).winner === null;
}
