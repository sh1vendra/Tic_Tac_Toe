const COLORS = ['#00fff5', '#ff00ff', '#ffff00', '#39ff14', '#ff6ec7'];

export function createParticles(x, y, count = 60) {
  return Array.from({ length: count }, () => ({
    x, y,
    vx: (Math.random() - 0.5) * 10,
    vy: (Math.random() - 0.5) * 10,
    life: 1.0,
    decay: 0.012 + Math.random() * 0.018,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 2 + Math.random() * 4,
  }));
}

export function updateParticles(particles) {
  return particles
    .map((p) => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vy: p.vy + 0.15, life: p.life - p.decay }))
    .filter((p) => p.life > 0);
}

export function renderParticles(ctx, particles) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  particles.forEach((p) => {
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });
  ctx.globalAlpha = 1;
}
