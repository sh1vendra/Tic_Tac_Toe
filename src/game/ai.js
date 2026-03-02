import { PLAYER_X, PLAYER_O } from './constants';
import { checkWinner, getEmptyCells } from './engine';

function minimax(board, depth, isMaximizing) {
  const { winner } = checkWinner(board);
  if (winner === PLAYER_O) return 10 - depth;
  if (winner === PLAYER_X) return depth - 10;
  if (getEmptyCells(board).length === 0) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (const i of getEmptyCells(board)) {
      board[i] = PLAYER_O;
      best = Math.max(best, minimax(board, depth + 1, false));
      board[i] = null;
    }
    return best;
  } else {
    let best = Infinity;
    for (const i of getEmptyCells(board)) {
      board[i] = PLAYER_X;
      best = Math.min(best, minimax(board, depth + 1, true));
      board[i] = null;
    }
    return best;
  }
}

function easyMove(board) {
  const empty = getEmptyCells(board);
  return empty[Math.floor(Math.random() * empty.length)];
}

function hardMove(board) {
  let bestScore = -Infinity;
  let bestIndex = null;
  for (const i of getEmptyCells(board)) {
    board[i] = PLAYER_O;
    const score = minimax(board, 0, false);
    board[i] = null;
    if (score > bestScore) {
      bestScore = score;
      bestIndex = i;
    }
  }
  return bestIndex;
}

function mediumMove(board) {
  return Math.random() < 0.5 ? hardMove(board) : easyMove(board);
}

export function getCpuMove(board, difficulty) {
  switch (difficulty) {
    case 'easy':   return easyMove(board);
    case 'medium': return mediumMove(board);
    case 'hard':   return hardMove(board);
    default:       return easyMove(board);
  }
}
