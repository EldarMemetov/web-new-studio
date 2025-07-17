'use client';
import s from './Particles.module.scss';
import React, { useRef, useEffect, useState } from 'react';

export default function Particles() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const imageRect = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const section = canvas.parentElement;
    const updateCanvasSize = () => {
      const bounds = section.getBoundingClientRect();
      canvas.width = bounds.width;
      canvas.height = bounds.height;
    };
    updateCanvasSize();

    const img = document.getElementById('magic-planet');
    if (img) imageRect.current = img.getBoundingClientRect();

    const onResize = () => {
      updateCanvasSize();
      if (img) imageRect.current = img.getBoundingClientRect();
    };
    window.addEventListener('resize', onResize);

    const spawnParticle = () => {
      const margin = canvas.width * 0.2;
      const minX = margin;
      const maxX = canvas.width - margin;

      particles.current.push({
        x: minX + Math.random() * (maxX - minX),
        y: -5,
        vx: (Math.random() - 0.5) * 0.003,
        vy: 0.008 + Math.random() * 0.004,
        size: 0.7 + Math.random() * 1.0,
        alpha: 0.1 + Math.random() * 0.2,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particles.current.length < 150) {
        spawnParticle();
      }

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];

        p.vy += 0.00001;

        if (imageRect.current) {
          const cx = imageRect.current.left + imageRect.current.width / 2;
          const cy = imageRect.current.top + imageRect.current.height / 2;
          const dx = cx - p.x;
          const dy = cy - p.y;
          const dist = Math.hypot(dx, dy);
          const force = Math.min(0.0025, 15 / (dist * dist));
          p.vx += force * dx;
          p.vy += force * dy;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.y > canvas.height + 20) {
          particles.current.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return <canvas ref={canvasRef} className={s.particleCanvas} />;
}
