function getCtx() {
  if (!window._audioCtx) {
    // eslint-disable-next-line
    window._audioCtx = new (window.AudioContext || window['webkitAudioContext'])();
  }
  return window._audioCtx;
}

function beep(frequency, duration, type = 'square', volume = 0.3) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

function playMove() {
  beep(440, 0.08, 'square', 0.2);
}

function playWin() {
  // Ascending victory fanfare
  [523, 659, 784, 1047].forEach((f, i) => {
    setTimeout(() => beep(f, 0.15, 'square', 0.3), i * 100);
  });
}

function playLose() {
  // Descending sad tones
  [400, 300, 200].forEach((f, i) => {
    setTimeout(() => beep(f, 0.2, 'sawtooth', 0.25), i * 150);
  });
}

function playDraw() {
  beep(330, 0.1, 'square', 0.2);
  setTimeout(() => beep(330, 0.1, 'square', 0.2), 150);
}

function playClick() {
  beep(880, 0.05, 'square', 0.15);
}

export function useSound() {
  return { playMove, playWin, playLose, playDraw, playClick };
}
