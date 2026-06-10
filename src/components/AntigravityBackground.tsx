import { useEffect, useRef } from 'react';

type Ring = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  homeRelX: number;
  homeRelY: number;
  radius: number;
  strokeWidth: number;
  opacity: number;
  color: string;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
};

const RING_COUNT = 35;

const pickColor = (): { color: string; opacity: number } => {
  const r = Math.random();
  if (r < 0.75) {
    const op = 0.06 + Math.random() * 0.06;
    return { color: `rgba(255,255,255,${op.toFixed(3)})`, opacity: op };
  }
  if (r < 0.9) {
    return { color: 'rgba(167,139,250,0.15)', opacity: 0.15 };
  }
  return { color: 'rgba(96,165,250,0.12)', opacity: 0.12 };
};

const pickRadius = (): number => {
  const r = Math.random();
  if (r < 0.4) return 6 + Math.random() * 6;
  if (r < 0.8) return 14 + Math.random() * 8;
  return 24 + Math.random() * 16;
};

const AntigravityBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    const pointer = { x: -9999, y: -9999, active: false };
    const rings: Ring[] = [];
    let rafId = 0;

    const setupCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createRings = () => {
      rings.length = 0;
      for (let i = 0; i < RING_COUNT; i++) {
        const homeRelX = Math.random();
        const homeRelY = Math.random();
        const homeX = homeRelX * width;
        const homeY = homeRelY * height;
        const { color, opacity } = pickColor();
        rings.push({
          x: homeX,
          y: homeY,
          homeX,
          homeY,
          homeRelX,
          homeRelY,
          radius: pickRadius(),
          strokeWidth: 1 + Math.random() * 0.6,
          opacity,
          color,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.005,
        });
      }
    };

    const handleResize = () => {
      setupCanvas();
      for (const r of rings) {
        r.homeX = r.homeRelX * width;
        r.homeY = r.homeRelY * height;
      }
    };

    const handleMouse = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointer.x = e.touches[0].clientX;
        pointer.y = e.touches[0].clientY;
        pointer.active = true;
      }
    };
    const handleLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.active = false;
    };

    const REPEL_RADIUS = 180;
    const LERP = 0.03;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (const r of rings) {
        // drift home slowly
        r.homeX += r.vx;
        r.homeY += r.vy;
        if (r.homeX < 0 || r.homeX > width) r.vx *= -1;
        if (r.homeY < 0 || r.homeY > height) r.vy *= -1;
        r.homeRelX = r.homeX / width;
        r.homeRelY = r.homeY / height;

        // lerp toward home
        r.x += (r.homeX - r.x) * LERP;
        r.y += (r.homeY - r.y) * LERP;

        // repulsion
        if (pointer.active) {
          const dx = r.x - pointer.x;
          const dy = r.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_RADIUS && dist > 0.0001) {
            const force = (1 - dist / REPEL_RADIUS) * 18;
            r.x += (dx / dist) * force;
            r.y += (dy / dist) * force;
          }
        }

        r.rotation += r.rotationSpeed;

        ctx.save();
        ctx.translate(r.x, r.y);
        ctx.rotate(r.rotation);
        ctx.beginPath();
        ctx.arc(0, 0, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.lineWidth = r.strokeWidth;
        ctx.stroke();
        ctx.restore();
      }
      rafId = requestAnimationFrame(tick);
    };

    setupCanvas();
    createRings();
    tick();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouse, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('mouseleave', handleLeave);
    window.addEventListener('touchend', handleLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('touchend', handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default AntigravityBackground;
