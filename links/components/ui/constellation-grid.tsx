'use client';

import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import { cn } from '@/lib/utils';

function subscribeColorScheme(callback: () => void) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getColorSchemeSnapshot() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getColorSchemeServerSnapshot() {
  return true;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  radius: number;
  label: string;
  pulse: number;
  /** Idle drift: phase offsets and angular speeds for the two drift axes. */
  driftPhaseX: number;
  driftPhaseY: number;
  driftSpeed: number;
}

// Idle drift, modeled on antigravity.google's hero field: every node's spring
// anchor wanders a few pixels on a slow, spatially coherent wave, so the mesh
// keeps breathing while the cursor rests. Cursor repulsion is unchanged and
// simply acts on top of the moving anchor.
const DRIFT_AMPLITUDE = 9; // px around the grid point
const DRIFT_SPEED_MIN = 0.35; // rad/s (period about 18 s)
const DRIFT_SPEED_RANGE = 0.3; // rad/s (fastest period about 10 s)

export interface ConstellationGridProps {
  /** Override system prefers-color-scheme theme when controlled by parent. */
  theme?: 'dark' | 'light';
  /** Render the standalone Constellation hero title overlay (used by DemoOne). */
  showOverlay?: boolean;
  className?: string;
}

export default function ConstellationGrid({
  theme,
  showOverlay = false,
  className,
}: ConstellationGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const systemDark = useSyncExternalStore(
    subscribeColorScheme,
    getColorSchemeSnapshot,
    getColorSchemeServerSnapshot
  );

  const isDarkMode = theme ? theme === 'dark' : systemDark;

  // The render loop reads the theme from a ref so a theme toggle only
  // swaps colors; node positions, velocities, and cursor state carry over.
  const isDarkRef = useRef(isDarkMode);
  useEffect(() => {
    isDarkRef.current = isDarkMode;
  }, [isDarkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number | undefined;
    let width = 0;
    let height = 0;

    // Only visitors who ask for reduced motion get a calmer mesh: no
    // displacement, no drift, and no pulsing, but nodes still light up near the cursor.
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduceMotion = reducedMotionQuery.matches;
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      reduceMotion = e.matches;
    };

    // Mouse velocity & inertial tracking
    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      radius: 220,
    };

    let nodes: Node[] = [];

    const initNodes = () => {
      nodes = [];
      const spacing = 55; // Tighter grid density for richer visual connections
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          nodes.push({
            x,
            y,
            vx: 0,
            vy: 0,
            baseX: x,
            baseY: y,
            radius: Math.random() * 1.2 + 1.2,
            label: `${(i * 7).toString(16).toUpperCase()}:${(j * 11).toString(16).toUpperCase()}`,
            pulse: Math.random() * Math.PI * 2,
            // Phase follows position so neighbors move together like a slow current.
            driftPhaseX: x * 0.011 + y * 0.007 + Math.random() * 0.6,
            driftPhaseY: x * 0.006 - y * 0.012 + Math.random() * 0.6,
            driftSpeed: DRIFT_SPEED_MIN + Math.random() * DRIFT_SPEED_RANGE,
          });
        }
      }
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    let lastTime = performance.now();
    // Accumulates only while frames run, so drift resumes smoothly after a hidden tab.
    let driftTime = 0;

    const render = (now: number) => {
      // Normalize dt across high-refresh displays
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      driftTime += dt;
      const isDarkMode = isDarkRef.current;

      // Mouse velocity calculation
      mouse.vx = (mouse.x - mouse.prevX) / (dt * 1000 || 1);
      mouse.vy = (mouse.y - mouse.prevY) / (dt * 1000 || 1);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      const speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

      // Color paletting for dark/light transitions
      const bgColor = isDarkMode ? '#030407' : '#f8fafc';
      const nodeColor = isDarkMode ? '255, 255, 255' : '15, 23, 42';
      const accentColor = isDarkMode ? '56, 189, 248' : '2, 132, 199'; // Sky Cyan Accent

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // Node Physics Engine (Hooke's Law Spring-Mass-Damping system)
      const SPRING_K = 18;
      const DAMPING = 0.82;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!reduceMotion) n.pulse += dt * 3;

        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Dynamic shockwave repulsion based on cursor speed
        if (!reduceMotion && dist < mouse.radius && dist > 0) {
          const power = 1 - dist / mouse.radius;
          const force = power * (1500 + speed * 150);
          const angle = Math.atan2(dy, dx);

          n.vx -= Math.cos(angle) * force * dt;
          n.vy -= Math.sin(angle) * force * dt;
        }

        const homeX = reduceMotion
          ? n.baseX
          : n.baseX + Math.sin(driftTime * n.driftSpeed + n.driftPhaseX) * DRIFT_AMPLITUDE;
        const homeY = reduceMotion
          ? n.baseY
          : n.baseY + Math.cos(driftTime * n.driftSpeed * 0.85 + n.driftPhaseY) * DRIFT_AMPLITUDE;
        const homeDx = homeX - n.x;
        const homeDy = homeY - n.y;

        n.vx += homeDx * SPRING_K * dt;
        n.vy += homeDy * SPRING_K * dt;

        n.vx *= DAMPING;
        n.vy *= DAMPING;

        n.x += n.vx * dt * 60;
        n.y += n.vy * dt * 60;
      }

      // Draw Connections (Optimized Distance Culling)
      const MAX_CONN_DIST = 75;
      const MAX_CONN_DIST_SQ = MAX_CONN_DIST * MAX_CONN_DIST;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const ndx = n.x - n2.x;
          const ndy = n.y - n2.y;
          const distSq = ndx * ndx + ndy * ndy;

          if (distSq < MAX_CONN_DIST_SQ) {
            const nDist = Math.sqrt(distSq);
            const alpha = (1 - nDist / MAX_CONN_DIST) * (isDarkMode ? 0.18 : 0.08);

            ctx.strokeStyle = `rgba(${nodeColor}, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Render Node Points & Interactive Highlights
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isNear = dist < mouse.radius;

        const baseAlpha = isNear ? 0.95 : 0.25 + Math.sin(n.pulse) * 0.1;

        ctx.fillStyle = isNear
          ? `rgba(${accentColor}, ${baseAlpha})`
          : `rgba(${nodeColor}, ${baseAlpha})`;

        const currentRadius = isNear
          ? n.radius * 2.2
          : n.radius + Math.sin(n.pulse) * 0.3;

        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fill();

        // Spatial Radar Rings on active proximity
        if (dist < 90) {
          const pulseRing = reduceMotion ? 14 : ((n.pulse * 20) % 30) + 4;
          const ringAlpha = (1 - pulseRing / 34) * 0.4;

          ctx.strokeStyle = `rgba(${accentColor}, ${ringAlpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, pulseRing, 0, Math.PI * 2);
          ctx.stroke();

          // Hex Coordinate Readout
          ctx.font = '8px ui-monospace, SFMono-Regular, Consolas, monospace';
          ctx.fillStyle = `rgba(${accentColor}, 0.85)`;
          ctx.fillText(n.label, n.x + 10, n.y - 10);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Pause the loop while the tab is hidden; resume with a fresh clock so the
    // first frame back does not integrate a huge dt.
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId !== undefined) cancelAnimationFrame(animationFrameId);
        animationFrameId = undefined;
      } else if (animationFrameId === undefined) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animationFrameId !== undefined) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div
      className={cn(
        'relative w-full h-screen overflow-hidden select-none',
        isDarkMode ? 'bg-[#030407]' : 'bg-slate-50',
        className
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block cursor-crosshair" />

      {showOverlay && (
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4 pointer-events-none mix-blend-difference text-white">
          <h1 className="font-mono text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
            Constellation
          </h1>
          <p className="mt-4 font-mono text-xs md:text-sm max-w-lg opacity-70">
            High-velocity dynamic mesh. Sweep your cursor quickly across the grid to unleash kinetic shockwaves.
          </p>
        </div>
      )}
    </div>
  );
}
