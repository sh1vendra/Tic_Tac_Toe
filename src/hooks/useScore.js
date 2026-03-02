import { useState, useCallback } from 'react';

const STORAGE_KEY = 'ttt-scores';

function loadScores() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { wins: 0, losses: 0, draws: 0 };
  } catch {
    return { wins: 0, losses: 0, draws: 0 };
  }
}

function saveScores(scores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

export function useScore() {
  const [scores, setScores] = useState(loadScores);

  const update = useCallback((key) => {
    setScores((prev) => {
      const next = { ...prev, [key]: prev[key] + 1 };
      saveScores(next);
      return next;
    });
  }, []);

  const resetScores = useCallback(() => {
    const zero = { wins: 0, losses: 0, draws: 0 };
    saveScores(zero);
    setScores(zero);
  }, []);

  return {
    ...scores,
    recordWin: () => update('wins'),
    recordLoss: () => update('losses'),
    recordDraw: () => update('draws'),
    resetScores,
  };
}
