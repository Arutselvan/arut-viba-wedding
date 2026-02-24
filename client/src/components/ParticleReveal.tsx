/**
 * ParticleReveal — Cinematic wedding site intro
 *
 * "Particle Constellation" concept:
 * Phase 1 (FORMING): Hundreds of gold particles drift in from random positions
 *   and slowly converge into a glowing constellation pattern around the AV logo.
 *   The logo itself fades in from opacity 0 as particles settle.
 * Phase 2 (IDLE): Particles gently orbit and twinkle around the logo.
 *   "Tap to open" pulses below.
 * Phase 3 (EXPLODING): On click, all particles burst outward with velocity,
 *   the logo scales up and fades, the canvas fades out revealing the site.
 *
 * Canvas renders gold particles. Logo is a DOM element layered on top.
 * Background: deep black fading to very dark forest green.
 */

import { useCallback, useEffect, useRef, useState } from "react";

const LOGO_URL =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/AVdiZBmryFCAlBJN.svg";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number; // gold hue variation
  phase: number; // orbit phase offset
  orbitRadius: number;
  orbitSpeed: number;
  explodeVx: number;
  explodeVy: number;
}

type RevealPhase = "forming" | "idle" | "exploding" | "done";

const PARTICLE_COUNT = 220;
const LOGO_RADIUS = 90; // radius of constellation ring around logo center

export default function ParticleReveal({ onOpen }: { onOpen: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<RevealPhase>("forming");
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const formProgressRef = useRef(0); // 0→1 forming progress
  const [uiPhase, setUiPhase] = useState<RevealPhase>("forming");
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);

  const initParticles = useCallback((cx: number, cy: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread particles in constellation pattern: rings + random scatter
      const ring = i < 80 ? 0 : i < 160 ? 1 : 2;
      const ringRadius = LOGO_RADIUS + ring * 28 + Math.random() * 18;
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.4;
      const targetX = cx + Math.cos(angle) * ringRadius;
      const targetY = cy + Math.sin(angle) * ringRadius * 0.65; // slightly elliptical

      // Start from random edge positions
      const startAngle = Math.random() * Math.PI * 2;
      const startDist = 400 + Math.random() * 500;
      const startX = cx + Math.cos(startAngle) * startDist;
      const startY = cy + Math.sin(startAngle) * startDist;

      particles.push({
        x: startX,
        y: startY,
        targetX,
        targetY,
        vx: 0,
        vy: 0,
        size: 0.8 + Math.random() * 2.2,
        opacity: 0.3 + Math.random() * 0.7,
        hue: 38 + Math.random() * 18, // gold: 38-56 hue
        phase: Math.random() * Math.PI * 2,
        orbitRadius: 2 + Math.random() * 5,
        orbitSpeed: 0.003 + Math.random() * 0.008,
        explodeVx: (Math.random() - 0.5) * 25,
        explodeVy: (Math.random() - 0.5) * 25,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      initParticles(cx, cy);
    };
    resize();
    window.addEventListener("resize", resize);

    let startTime = performance.now();
    const FORM_DURATION = 2800; // ms to form constellation
    let explodeStartTime = 0;

    const draw = (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const phase = phaseRef.current;

      // Background
      ctx.clearRect(0, 0, W, H);
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.7);
      bg.addColorStop(0, "#0a1a10");
      bg.addColorStop(0.5, "#060f09");
      bg.addColorStop(1, "#020704");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const particles = particlesRef.current;

      if (phase === "forming") {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / FORM_DURATION, 1);
        // Ease-in-out cubic
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        formProgressRef.current = eased;

        for (const p of particles) {
          // Interpolate toward target
          p.x += (p.targetX - p.x) * 0.018 * (1 + eased * 2);
          p.y += (p.targetY - p.y) * 0.018 * (1 + eased * 2);

          const alpha = eased * p.opacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 85%, 65%, ${alpha})`;
          ctx.fill();

          // Tiny glow
          if (p.size > 1.5) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${alpha * 0.15})`;
            ctx.fill();
          }
        }

        if (progress >= 1) {
          phaseRef.current = "idle";
          setUiPhase("idle");
          setLogoOpacity(1);
          setTimeout(() => setHintVisible(true), 400);
        }
      } else if (phase === "idle") {
        const t = now * 0.001;
        for (const p of particles) {
          // Gentle orbit around target
          const ox = Math.cos(t * p.orbitSpeed * 60 + p.phase) * p.orbitRadius;
          const oy = Math.sin(t * p.orbitSpeed * 60 + p.phase) * p.orbitRadius * 0.6;
          const px = p.targetX + ox;
          const py = p.targetY + oy;

          // Twinkle
          const twinkle = 0.5 + 0.5 * Math.sin(t * 3 + p.phase);
          const alpha = p.opacity * (0.6 + 0.4 * twinkle);

          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 85%, 65%, ${alpha})`;
          ctx.fill();

          if (p.size > 1.5) {
            ctx.beginPath();
            ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${alpha * 0.12})`;
            ctx.fill();
          }
        }

        // Central glow pulse
        const pulse = 0.5 + 0.5 * Math.sin(now * 0.002);
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
        glow.addColorStop(0, `rgba(212,175,55,${0.06 + pulse * 0.04})`);
        glow.addColorStop(1, "rgba(212,175,55,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);
      } else if (phase === "exploding") {
        if (!explodeStartTime) explodeStartTime = now;
        const elapsed = now - explodeStartTime;
        const progress = Math.min(elapsed / 900, 1);

        for (const p of particles) {
          p.x += p.explodeVx * (1 - progress * 0.5);
          p.y += p.explodeVy * (1 - progress * 0.5);
          p.explodeVx *= 0.96;
          p.explodeVy *= 0.96;

          const alpha = p.opacity * (1 - progress * progress);
          if (alpha <= 0) continue;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 + progress * 2), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${alpha})`;
          ctx.fill();
        }

        // Fade entire canvas
        ctx.fillStyle = `rgba(2,7,4,${progress * 0.9})`;
        ctx.fillRect(0, 0, W, H);

        if (progress >= 1) {
          phaseRef.current = "done";
          setUiPhase("done");
          onOpen();
          return;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initParticles, onOpen]);

  const handleClick = useCallback(() => {
    if (phaseRef.current !== "idle") return;
    phaseRef.current = "exploding";
    setUiPhase("exploding");
    setHintVisible(false);

    // Logo burst animation
    const logo = logoRef.current;
    if (logo) {
      logo.style.transition = "transform 0.6s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease 0.1s";
      logo.style.transform = "scale(1.3)";
      logo.style.opacity = "0";
    }
    const names = namesRef.current;
    if (names) {
      names.style.transition = "opacity 0.3s ease";
      names.style.opacity = "0";
    }
  }, []);

  if (uiPhase === "done") return null;

  return (
    <div
      ref={wrapperRef}
      onClick={handleClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        cursor: uiPhase === "idle" ? "pointer" : "default",
        userSelect: "none",
      }}
    >
      {/* Canvas layer */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, display: "block" }}
      />

      {/* UI layer — logo + text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        {/* Logo */}
        <div
          ref={logoRef}
          style={{
            width: "130px",
            height: "130px",
            transition: "opacity 1.2s ease",
            opacity: logoOpacity,
          }}
        >
          <img
            src={LOGO_URL}
            alt="Arut & Viba"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter:
                "brightness(0) saturate(100%) invert(82%) sepia(30%) saturate(600%) hue-rotate(5deg) brightness(110%)",
            }}
          />
        </div>

        {/* Names */}
        <div
          ref={namesRef}
          style={{
            marginTop: "20px",
            color: "rgba(212,175,55,0.65)",
            fontSize: "12px",
            letterSpacing: "0.45em",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            textTransform: "uppercase",
            transition: "opacity 1s ease 0.3s",
            opacity: logoOpacity,
          }}
        >
          Arut &amp; Viba
        </div>

        {/* Date line */}
        <div
          style={{
            marginTop: "6px",
            color: "rgba(212,175,55,0.3)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            fontFamily: "Georgia, serif",
            textTransform: "uppercase",
            transition: "opacity 1s ease 0.5s",
            opacity: logoOpacity,
          }}
        >
          23 · 24 January 2027
        </div>

        {/* Tap hint */}
        <div
          style={{
            marginTop: "32px",
            color: "rgba(212,175,55,0.45)",
            fontSize: "9px",
            letterSpacing: "0.35em",
            fontFamily: "Georgia, serif",
            textTransform: "uppercase",
            transition: "opacity 0.8s ease",
            opacity: hintVisible ? 1 : 0,
            animation: hintVisible ? "hint-pulse 2.5s ease-in-out infinite" : "none",
          }}
        >
          tap to open
        </div>
      </div>

      <style>{`
        @keyframes hint-pulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}
