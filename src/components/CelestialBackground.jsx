import { useEffect, useRef } from 'react';

export default function CelestialBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId;
    let stars = [];
    let rocket = {
      x: -400,
      y: window.innerHeight * 0.6,
      targetY: window.innerHeight * 0.4,
      speed: 2,
      angle: -0.15,
      frame: 0
    };

    // Performance optimization for weak devices
    const isMobile = window.innerWidth < 768;
    const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    const starCount = (isMobile || isLowPower) ? 100 : 220;

    const resize = () => {
      // Limit pixel ratio to prevent performance issues
      const dpr = (isMobile || isLowPower) ? 1 : Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      init();
    };

    const init = () => {
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.2 + 0.2,
        twinkle: Math.random() * 0.04 + 0.02,
        opacity: Math.random() * 0.5 + 0.3,
      }));
    };

    const drawMoon = () => {
      const x = window.innerWidth * 0.8;
      const y = window.innerHeight * 0.15;
      const r = Math.min(window.innerWidth, window.innerHeight) * 0.07;

      ctx.save();

      // Moon glow
      const glow = ctx.createRadialGradient(x, y, r, x, y, r * 2.5);
      glow.addColorStop(0, 'rgba(230, 240, 255, 0.08)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Clip to moon circle
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.clip();

      // Moon surface base color
      const baseGrad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
      baseGrad.addColorStop(0, '#f2f2f2');
      baseGrad.addColorStop(0.7, '#d1d1d1');
      baseGrad.addColorStop(1, '#a0a0a0');
      ctx.fillStyle = baseGrad;
      ctx.fill();

      // Moon maria (dark spots)
      const maria = [
        { x: -0.2, y: -0.4, r: 0.45, a: 0.08 },
        { x: 0.3, y: 0.3, r: 0.4, a: 0.1 },
        { x: -0.5, y: 0.1, r: 0.3, a: 0.07 },
        { x: 0.1, y: -0.6, r: 0.3, a: 0.05 },
        { x: 0.4, y: -0.2, r: 0.2, a: 0.06 },
        { x: -0.1, y: 0.35, r: 0.4, a: 0.09 },
      ];

      maria.forEach(m => {
        const mx = x + r * m.x;
        const my = y + r * m.y;
        const mr = r * m.r;
        const mGrad = ctx.createRadialGradient(mx, my, 0, mx, my, mr);
        mGrad.addColorStop(0, `rgba(45, 48, 60, ${m.a})`);
        mGrad.addColorStop(1, 'rgba(45, 48, 60, 0)');
        ctx.fillStyle = mGrad;
        ctx.beginPath();
        ctx.arc(mx, my, mr, 0, Math.PI * 2);
        ctx.fill();
      });

      // Moon shading for 3D effect
      const shading = ctx.createRadialGradient(x + r * 0.8, y + r * 0.8, 0, x, y, r * 1.5);
      shading.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shading.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      ctx.fillStyle = shading;
      ctx.fill();

      ctx.restore();
    };

    const drawRocket = () => {
      rocket.frame++;
      rocket.x += rocket.speed;
      rocket.y += (rocket.targetY - rocket.y) * 0.003;

      // Reset rocket position when it goes off screen
      if (rocket.x > window.innerWidth + 600) {
        rocket.x = -600;
        rocket.y = Math.random() * (window.innerHeight * 0.6) + 100;
        rocket.targetY = Math.random() * (window.innerHeight * 0.4);
      }

      ctx.save();
      ctx.translate(rocket.x, rocket.y);
      ctx.rotate(rocket.angle);

      const w = 200;
      const h = 50;

      // Nose cone - aerodynamic sharp tip (GRAY)
      const noseGrad = ctx.createLinearGradient(w * 0.7, -h/2, w * 0.7, h/2);
      noseGrad.addColorStop(0, '#b0b0b0');
      noseGrad.addColorStop(0.5, '#c0c0c0');
      noseGrad.addColorStop(1, '#909090');
      ctx.fillStyle = noseGrad;
      ctx.beginPath();
      ctx.moveTo(w, 0);
      ctx.lineTo(w * 0.7, -h * 0.35);
      ctx.lineTo(w * 0.7, h * 0.35);
      ctx.closePath();
      ctx.fill();

      // Highlight on nose
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.moveTo(w, 0);
      ctx.lineTo(w * 0.85, -h * 0.2);
      ctx.lineTo(w * 0.85, h * 0.2);
      ctx.closePath();
      ctx.fill();

      // Main body - cylindrical (GRAY)
      const bodyGrad = ctx.createLinearGradient(0, -h/2, 0, h/2);
      bodyGrad.addColorStop(0, '#999999');
      bodyGrad.addColorStop(0.15, '#b8b8b8');
      bodyGrad.addColorStop(0.5, '#c0c0c0');
      bodyGrad.addColorStop(0.85, '#b8b8b8');
      bodyGrad.addColorStop(1, '#909090');
      ctx.fillStyle = bodyGrad;
      ctx.fillRect(w * 0.15, -h * 0.4, w * 0.55, h * 0.8);

      // Section divider line
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(w * 0.5, -h * 0.4);
      ctx.lineTo(w * 0.5, h * 0.4);
      ctx.stroke();

      // Maroon stripes
      ctx.fillStyle = '#800000';
      ctx.fillRect(w * 0.25, -h * 0.42, w * 0.35, h * 0.08);
      ctx.fillRect(w * 0.25, h * 0.34, w * 0.35, h * 0.08);

      // Windows - circular portholes
      const windows = [0.3, 0.45, 0.6];
      windows.forEach(pos => {
        // Window frame
        ctx.fillStyle = '#3a3a3a';
        ctx.beginPath();
        ctx.arc(w * pos, 0, 9, 0, Math.PI * 2);
        ctx.fill();
        
        // Window glass
        const windowGrad = ctx.createRadialGradient(w * pos - 2, -2, 0, w * pos, 0, 7);
        windowGrad.addColorStop(0, '#6b9fd8');
        windowGrad.addColorStop(0.7, '#3a7bc8');
        windowGrad.addColorStop(1, '#1e4d7a');
        ctx.fillStyle = windowGrad;
        ctx.beginPath();
        ctx.arc(w * pos, 0, 7, 0, Math.PI * 2);
        ctx.fill();
        
        // Glass reflection
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(w * pos - 3, -3, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Wings - triangular stabilizers (GRAY)
      const wingGrad = ctx.createLinearGradient(0, 0, w * 0.1, -h);
      wingGrad.addColorStop(0, '#a0a0a0');
      wingGrad.addColorStop(0.6, '#c0c0c0');
      wingGrad.addColorStop(1, '#888888');
      
      // Top wing
      ctx.fillStyle = wingGrad;
      ctx.beginPath();
      ctx.moveTo(w * 0.2, -h * 0.4);
      ctx.lineTo(w * 0.05, -h * 1.2);
      ctx.lineTo(w * 0.35, -h * 0.4);
      ctx.closePath();
      ctx.fill();
      
      // Shadow on top wing
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.moveTo(w * 0.2, -h * 0.4);
      ctx.lineTo(w * 0.1, -h * 0.9);
      ctx.lineTo(w * 0.28, -h * 0.4);
      ctx.closePath();
      ctx.fill();

      // Bottom wing
      ctx.fillStyle = wingGrad;
      ctx.beginPath();
      ctx.moveTo(w * 0.2, h * 0.4);
      ctx.lineTo(w * 0.05, h * 1.2);
      ctx.lineTo(w * 0.35, h * 0.4);
      ctx.closePath();
      ctx.fill();

      // Shadow on bottom wing
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.moveTo(w * 0.2, h * 0.4);
      ctx.lineTo(w * 0.1, h * 0.9);
      ctx.lineTo(w * 0.28, h * 0.4);
      ctx.closePath();
      ctx.fill();

      // Engine nozzles (DARK GRAY)
      const engineY1 = -h * 0.25;
      const engineY2 = h * 0.25;
      
      [engineY1, engineY2].forEach(ey => {
        // Nozzle body
        ctx.fillStyle = '#333333';
        ctx.fillRect(w * 0.08, ey - 8, w * 0.12, 16);
        
        // Inner nozzle
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(w * 0.08, ey - 6, w * 0.08, 12);
        
        // Metallic shine
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(w * 0.08, ey - 8, w * 0.12, 3);
      });

      // Engine flames - realistic fire
      const flameLength = 80 + Math.sin(rocket.frame * 0.2) * 25;
      
      [engineY1, engineY2].forEach((ey, idx) => {
        const offset = idx === 0 ? Math.sin(rocket.frame * 0.3) * 10 : Math.cos(rocket.frame * 0.3) * 10;
        
        // Outer flame
        const outerFlame = ctx.createLinearGradient(0, ey, -flameLength, ey);
        outerFlame.addColorStop(0, 'rgba(255, 200, 100, 0.9)');
        outerFlame.addColorStop(0.5, 'rgba(255, 100, 50, 0.6)');
        outerFlame.addColorStop(1, 'rgba(255, 50, 0, 0)');
        
        ctx.fillStyle = outerFlame;
        ctx.beginPath();
        ctx.moveTo(w * 0.08, ey - 8);
        ctx.bezierCurveTo(-flameLength * 0.3, ey - 15 + offset, -flameLength * 0.7, ey - 20 + offset, -flameLength, ey + offset);
        ctx.bezierCurveTo(-flameLength * 0.7, ey + 20 + offset, -flameLength * 0.3, ey + 15 + offset, w * 0.08, ey + 8);
        ctx.closePath();
        ctx.fill();
        
        // Inner bright core
        const coreFlame = ctx.createLinearGradient(0, ey, -flameLength * 0.4, ey);
        coreFlame.addColorStop(0, 'rgba(255, 255, 255, 1)');
        coreFlame.addColorStop(0.5, 'rgba(255, 230, 150, 0.8)');
        coreFlame.addColorStop(1, 'rgba(255, 150, 50, 0)');
        
        ctx.fillStyle = coreFlame;
        ctx.beginPath();
        ctx.moveTo(w * 0.08, ey - 4);
        ctx.bezierCurveTo(-flameLength * 0.15, ey - 8, -flameLength * 0.3, ey - 10, -flameLength * 0.4, ey);
        ctx.bezierCurveTo(-flameLength * 0.3, ey + 10, -flameLength * 0.15, ey + 8, w * 0.08, ey + 4);
        ctx.closePath();
        ctx.fill();
      });

      // Engine glow effect
      ctx.shadowBlur = 40;
      ctx.shadowColor = 'rgba(255, 150, 50, 0.5)';
      ctx.fillStyle = 'rgba(255, 200, 100, 0.3)';
      ctx.fillRect(w * 0.05, -h * 0.35, 15, h * 0.7);
      ctx.shadowBlur = 0;

      ctx.restore();
    };

    // Frame skipping for performance on weak devices
    let frameSkip = 0;
    const skipRate = (isMobile || isLowPower) ? 2 : 1;

    const draw = () => {
      frameSkip++;
      if (frameSkip % skipRate !== 0) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      // Black space background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw twinkling stars
      stars.forEach(s => {
        s.opacity += s.twinkle;
        if (s.opacity > 1 || s.opacity < 0.1) s.twinkle = -s.twinkle;
        ctx.globalAlpha = s.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      drawMoon();
      drawRocket();

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}