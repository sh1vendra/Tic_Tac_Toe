// Create AudioContext only on first user interaction (required by mobile browsers)
function getCtx() {
  if (!window._audioCtx) {
    window._audioCtx = new (window.AudioContext || window['webkitAudioContext'])();

    // Resume context on first tap anywhere — fixes iOS Safari / Android Chrome
    const resume = () => {
      if (window._audioCtx && window._audioCtx.state === 'suspended') {
        window._audioCtx.resume();
      }
      window.removeEventListener('touchstart', resume);
      window.removeEventListener('touchend', resume);
      window.removeEventListener('click', resume);
    };

    window.addEventListener('touchstart', resume, { passive: true });
    window.addEventListener('touchend', resume, { passive: true });
    window.addEventListener('click', resume);
  }
  return window._audioCtx;
}

async function beep(frequency, duration, type = 'square', volume = 0.3) {
  try {
    const ctx = getCtx();

    // Resume if suspended before playing any sound
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

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
  [523, 659, 784, 1047].forEach((f, i) => {
    setTimeout(() => beep(f, 0.15, 'square', 0.3), i * 100);
  });
}

function playLose() {
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
