import { useEffect, useRef } from 'react';
import { createParticles, updateParticles, renderParticles } from '../utils/particles';

export default function ParticleEffect({ originRef, onDone }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rect = originRef?.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : canvas.width / 2;
    const cy = rect ? rect.top + rect.height / 2 : canvas.height / 2;

    let particles = createParticles(cx, cy, 80);
    let rafId;

    function loop() {
      particles = updateParticles(particles);
      renderParticles(ctx, particles);
      if (particles.length > 0) {
        rafId = requestAnimationFrame(loop);
      } else {
        onDone?.();
      }
    }

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [originRef, onDone]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 50 }}
    />
  );
}
