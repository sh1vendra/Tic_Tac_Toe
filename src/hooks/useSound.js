import { useRef, useCallback } from 'react';

const SOUND_MAP = {
  move: '/sounds/move.mp3',
  win:  '/sounds/win.mp3',
  lose: '/sounds/lose.mp3',
  draw: '/sounds/draw.mp3',
  click: '/sounds/click.mp3',
};

export function useSound() {
  const audioRefs = useRef({});

  const play = useCallback((key) => {
    try {
      if (!audioRefs.current[key]) {
        audioRefs.current[key] = new Audio(SOUND_MAP[key]);
        audioRefs.current[key].volume = 0.5;
      }
      const audio = audioRefs.current[key];
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch {}
  }, []);

  return {
    playMove:  () => play('move'),
    playWin:   () => play('win'),
    playLose:  () => play('lose'),
    playDraw:  () => play('draw'),
    playClick: () => play('click'),
  };
}
