/**
 * SplitReveal — Luxury wedding site intro
 *
 * Design concept: "Gilded Unveiling"
 * - Full-screen deep forest green with subtle diagonal texture
 * - AV monogram logo centered, glowing softly in gold
 * - Animated SVG gold ring draws itself around the logo (stroke-dashoffset)
 * - Gentle pulsing "tap to reveal" text below
 * - On click: logo scales up + fades, then 4 diagonal panels slide away
 *   (top-left → up-left, top-right → up-right, bottom-left → down-left, bottom-right → down-right)
 *   revealing the website underneath
 *
 * No clip-path geometry issues. Pure transform animations on rectangular divs.
 */

import { useEffect, useRef, useState } from "react";

const LOGO_URL =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/AVdiZBmryFCAlBJN.svg";

// Ring circumference for a circle r=72 → 2π×72 ≈ 452
const RING_CIRCUMFERENCE = 452;

export default function SplitReveal({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");
  const [ringProgress, setRingProgress] = useState(0); // 0 → 1

  // Panel refs
  const panelTL = useRef<HTMLDivElement>(null);
  const panelTR = useRef<HTMLDivElement>(null);
  const panelBL = useRef<HTMLDivElement>(null);
  const panelBR = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  // Animate the ring drawing in on mount
  useEffect(() => {
    let start: number | null = null;
    const duration = 2200; // ms to draw the ring

    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setRingProgress(eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("opening");
  };

  useEffect(() => {
    if (phase !== "opening") return;

    const logo = logoRef.current;
    const hint = hintRef.current;
    const tl = panelTL.current;
    const tr = panelTR.current;
    const bl = panelBL.current;
    const br = panelBR.current;
    if (!logo || !hint || !tl || !tr || !bl || !br) return;

    // Step 1 (0ms): Logo pulses and fades, hint fades
    hint.style.transition = "opacity 0.3s ease";
    hint.style.opacity = "0";

    logo.style.transition = "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease 0.2s";
    logo.style.transform = "scale(1.15)";
    logo.style.opacity = "0";

    // Step 2 (600ms): Panels slide away in 4 diagonal directions
    setTimeout(() => {
      const panelTransition = "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)";

      tl.style.transition = panelTransition;
      tl.style.transform = "translate(-100%, -100%)";

      tr.style.transition = panelTransition;
      tr.style.transform = "translate(100%, -100%)";

      bl.style.transition = panelTransition;
      bl.style.transform = "translate(-100%, 100%)";

      br.style.transition = panelTransition;
      br.style.transform = "translate(100%, 100%)";
    }, 600);

    // Step 3 (1000ms): Reveal website
    setTimeout(() => {
      onOpen();
    }, 1000);

    // Step 4 (1600ms): Remove from DOM
    setTimeout(() => {
      setPhase("done");
    }, 1600);
  }, [phase, onOpen]);

  if (phase === "done") return null;

  const ringDash = ringProgress * RING_CIRCUMFERENCE;
  const ringOffset = RING_CIRCUMFERENCE - ringDash;

  return (
    <div
      onClick={handleClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {/* Four quadrant panels — each covers exactly one quarter of the screen */}
      {/* Top-left */}
      <div
        ref={panelTL}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "50%",
          background: "linear-gradient(135deg, #1a2e22 0%, #152618 100%)",
          willChange: "transform",
        }}
      />
      {/* Top-right */}
      <div
        ref={panelTR}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "50%",
          background: "linear-gradient(225deg, #1a2e22 0%, #152618 100%)",
          willChange: "transform",
        }}
      />
      {/* Bottom-left */}
      <div
        ref={panelBL}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "50%",
          height: "50%",
          background: "linear-gradient(45deg, #1a2e22 0%, #152618 100%)",
          willChange: "transform",
        }}
      />
      {/* Bottom-right */}
      <div
        ref={panelBR}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "50%",
          height: "50%",
          background: "linear-gradient(315deg, #1a2e22 0%, #152618 100%)",
          willChange: "transform",
        }}
      />

      {/* Diagonal texture lines (decorative, on top of panels) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 60px,
            rgba(212,175,55,0.025) 60px,
            rgba(212,175,55,0.025) 61px
          )`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Gold double border frame */}
      <div
        style={{
          position: "absolute",
          inset: "18px",
          border: "1px solid rgba(212,175,55,0.3)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "24px",
          border: "1px solid rgba(212,175,55,0.12)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Corner ornaments */}
      {[
        { top: "22px", left: "22px", rotate: "0deg" },
        { top: "22px", right: "22px", rotate: "90deg" },
        { bottom: "22px", right: "22px", rotate: "180deg" },
        { bottom: "22px", left: "22px", rotate: "270deg" },
      ].map((pos, i) => (
        <svg
          key={i}
          width="28"
          height="28"
          viewBox="0 0 28 28"
          style={{
            position: "absolute",
            ...pos,
            transform: `rotate(${pos.rotate})`,
            opacity: 0.55,
            zIndex: 2,
          }}
        >
          <path d="M2 2 L12 2 M2 2 L2 12" stroke="#d4af37" strokeWidth="1.2" fill="none" />
          <circle cx="2" cy="2" r="1.5" fill="#d4af37" />
        </svg>
      ))}

      {/* Center: Logo + animated ring */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {/* Animated gold ring */}
        <div style={{ position: "relative", width: "180px", height: "180px" }}>
          {/* Outer soft glow */}
          <div
            style={{
              position: "absolute",
              inset: "-20px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)",
              animation: "pulse-glow 3s ease-in-out infinite",
            }}
          />

          {/* SVG ring */}
          <svg
            viewBox="0 0 180 180"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              transform: "rotate(-90deg)", // start drawing from top
            }}
          >
            {/* Background track */}
            <circle
              cx="90"
              cy="90"
              r="72"
              fill="none"
              stroke="rgba(212,175,55,0.1)"
              strokeWidth="1"
            />
            {/* Animated gold ring */}
            <circle
              cx="90"
              cy="90"
              r="72"
              fill="none"
              stroke="rgba(212,175,55,0.75)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={ringOffset}
              style={{ transition: "stroke-dashoffset 0.05s linear" }}
            />
            {/* Small decorative dots at cardinal points */}
            {ringProgress > 0.98 && (
              <>
                <circle cx="90" cy="18" r="2.5" fill="rgba(212,175,55,0.7)" />
                <circle cx="162" cy="90" r="2.5" fill="rgba(212,175,55,0.7)" />
                <circle cx="90" cy="162" r="2.5" fill="rgba(212,175,55,0.7)" />
                <circle cx="18" cy="90" r="2.5" fill="rgba(212,175,55,0.7)" />
              </>
            )}
          </svg>

          {/* Inner ring (static, thinner) */}
          <svg
            viewBox="0 0 180 180"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <circle
              cx="90"
              cy="90"
              r="62"
              fill="none"
              stroke="rgba(212,175,55,0.08)"
              strokeWidth="1"
            />
          </svg>

          {/* AV Logo */}
          <div
            ref={logoRef}
            style={{
              position: "absolute",
              inset: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={LOGO_URL}
              alt="Arut & Viba"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "brightness(0) saturate(100%) invert(82%) sepia(30%) saturate(600%) hue-rotate(5deg) brightness(105%)",
                opacity: 0.9,
              }}
            />
          </div>
        </div>

        {/* Couple names */}
        <div
          style={{
            marginTop: "28px",
            textAlign: "center",
            letterSpacing: "0.35em",
            color: "rgba(212,175,55,0.6)",
            fontSize: "11px",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          Arut &amp; Viba
        </div>

        {/* Tap hint */}
        <div
          ref={hintRef}
          style={{
            marginTop: "14px",
            color: "rgba(212,175,55,0.38)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            fontFamily: "Georgia, serif",
            textTransform: "uppercase",
            animation: "pulse-hint 2.8s ease-in-out infinite",
          }}
        >
          tap to open
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes pulse-hint {
          0%, 100% { opacity: 0.38; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
