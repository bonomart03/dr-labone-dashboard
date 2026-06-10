import { useEffect, useRef } from 'react';

const GOLD = [
  [251, 191, 36],
  [245, 158, 11],
  [252, 211, 77],
  [217, 119, 6],
  [253, 230, 138],
];

const rand = (min, max) => Math.random() * (max - min) + min;

const makeParticle = (w, h, layer) => ({
  x: rand(0, w),
  y: rand(0, h),
  vx: rand(-0.25, 0.25) * (layer === 0 ? 0.6 : 1.4),
  vy: rand(-0.25, 0.25) * (layer === 0 ? 0.6 : 1.4),
  radius: layer === 0 ? rand(0.4, 1.0) : rand(1.0, 2.2),
  color: GOLD[Math.floor(Math.random() * GOLD.length)],
  opacity: layer === 0 ? rand(0.12, 0.3) : rand(0.35, 0.7),
  layer,
});

const GoldenBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let w = window.innerWidth;
    let h = window.innerHeight;
    let animId;
    const mouse = { x: -2000, y: -2000 };
    const ripples = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();

    // Two depth layers
    const particles = [
      ...Array.from({ length: 55 }, () => makeParticle(w, h, 0)), // deep
      ...Array.from({ length: 35 }, () => makeParticle(w, h, 1)), // near
    ];

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onClick = (e) => {
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, maxR: 220, opacity: 0.6 });
      // Shockwave — push nearby particles
      particles.forEach(p => {
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 3.5;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    window.addEventListener('resize', resize);

    const CONNECT_DIST = 140;
    const ATTRACT_DIST = 200;
    const MAX_SPEED = 2.5;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // ── Spotlight ──
      if (mouse.x > -1000) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 380);
        g.addColorStop(0,   'rgba(251,191,36,0.055)');
        g.addColorStop(0.4, 'rgba(245,158,11,0.025)');
        g.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // ── Ripples ──
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 6;
        rp.opacity -= 0.018;
        if (rp.opacity <= 0) { ripples.splice(i, 1); continue; }

        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(251,191,36,${rp.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Second inner ripple
        if (rp.r > 40) {
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.r * 0.55, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(252,211,77,${rp.opacity * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // ── Update + draw particles ──
      particles.forEach(p => {
        // Mouse attraction
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < ATTRACT_DIST && mdist > 0) {
          const force = ((ATTRACT_DIST - mdist) / ATTRACT_DIST) * (p.layer === 1 ? 0.022 : 0.01);
          p.vx += (mdx / mdist) * force;
          p.vy += (mdy / mdist) * force;
        }

        // Damping
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > MAX_SPEED) {
          p.vx = (p.vx / spd) * MAX_SPEED;
          p.vy = (p.vy / spd) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Brightness boost near mouse
        const mouseFactor = mdist < 120 ? 1 + (1 - mdist / 120) * 1.6 : 1;
        const finalOpacity = Math.min(p.opacity * mouseFactor, 1);
        const [r, g, b] = p.color;

        // Glow (larger particles only)
        if (p.radius > 1.2) {
          const glowR = p.radius * (4 + mouseFactor);
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
          glow.addColorStop(0,   `rgba(${r},${g},${b},${finalOpacity * 0.4})`);
          glow.addColorStop(1,   `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${finalOpacity})`;
        ctx.fill();
      });

      // ── Connections ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECT_DIST) {
            // Distance from mouse to line midpoint
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2;
            const mld = Math.sqrt((mouse.x - mx) ** 2 + (mouse.y - my) ** 2);
            const mouseBoost = mld < 160 ? 1 + (1 - mld / 160) * 2.5 : 1;

            const opacity = (1 - dist / CONNECT_DIST) * 0.22 * mouseBoost;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(251,191,36,${Math.min(opacity, 0.7)})`;
            ctx.lineWidth = mouseBoost > 1.5 ? 0.8 : 0.4;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default GoldenBackground;
