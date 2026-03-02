import { useState, useCallback, useEffect } from 'react';
import { getUserScore, updateUserScore } from '../firebase/scores';

const STORAGE_KEY = 'ttt-scores';

function loadLocalScores() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { wins: 0, losses: 0, draws: 0 };
  } catch {
    return { wins: 0, losses: 0, draws: 0 };
  }
}

export function useScore(user) {
  const [scores, setScores] = useState(loadLocalScores);

  // Sync from Firestore when user logs in
  useEffect(() => {
    if (!user) return;
    getUserScore(user.uid).then((data) => {
      if (data) setScores({ wins: data.wins || 0, losses: data.losses || 0, draws: data.draws || 0 });
    });
  }, [user]);

  const update = useCallback((key) => {
    setScores((prev) => {
      const next = { ...prev, [key]: prev[key] + 1 };
      if (user) {
        updateUserScore(user.uid, {
          displayName: user.displayName,
          photoURL: user.photoURL,
          ...next,
        });
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  }, [user]);

  const resetScores = useCallback(() => {
    const zero = { wins: 0, losses: 0, draws: 0 };
    setScores(zero);
    if (user) {
      updateUserScore(user.uid, { displayName: user.displayName, photoURL: user.photoURL, ...zero });
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(zero));
    }
  }, [user]);

  return {
    ...scores,
    recordWin:  () => update('wins'),
    recordLoss: () => update('losses'),
    recordDraw: () => update('draws'),
    resetScores,
  };
}
