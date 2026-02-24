/**
 * WaxSealReveal — Cinematic site intro matching the Ink & Marigold design system
 *
 * Animation sequence:
 * 0.0s  — Cream screen, seal drops in from above (scale + translateY, spring ease)
 * 0.5s  — Seal settles, real AV logo fades in inside the seal
 * 1.4s  — Gold border ring draws around the seal
 * 2.4s  — Names + "tap to open" hint fade in
 * TAP   — Seal pulses, crack SVG paths animate across it
 * +0.4s — Left half slides left, right half slides right
 * +0.6s — Watercolour radial blooms expand from centre
 * +1.0s — Entire overlay fades out, onOpen() fires
 *
 * Colours: all from site tokens — parchment #FAF6F0, saffron #D4A853, ink #1C1410
 */

import { useEffect, useRef, useState, useCallback } from "react";

const LOGO_URL =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/AVdiZBmryFCAlBJN.svg";

interface WaxSealRevealProps {
  onOpen: () => void;
}

type Phase =
  | "entering"
  | "drawing"
  | "idle"
  | "cracking"
  | "splitting"
  | "blooming"
  | "done";

export default function WaxSealReveal({ onOpen }: WaxSealRevealProps) {
  const [phase, setPhase] = useState<Phase>("entering");
  const [mounted, setMounted] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const after = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  };

  useEffect(() => {
    after(() => setPhase("drawing"), 300);
    after(() => setPhase("idle"), 2600);
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const handleTap = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("cracking");
    after(() => setPhase("splitting"), 550);
    after(() => setPhase("blooming"), 950);
    after(() => {
      setMounted(false);
      onOpen();
    }, 2100);
  }, [phase, onOpen]);

  if (!mounted) return null;

  const isDrawing = ["drawing", "idle", "cracking", "splitting", "blooming"].includes(phase);
  const isCracking = ["cracking", "splitting", "blooming"].includes(phase);
  const isSplitting = ["splitting", "blooming"].includes(phase);
  const isBlooming = phase === "blooming";

  return (
    <div
      onClick={handleTap}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        cursor: phase === "idle" ? "pointer" : "default",
        overflow: "hidden",
        background: "#FAF6F0",
      }}
    >
      {/* ── Subtle vignette ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(180,160,130,0.12) 100%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* ── Left panel ── */}
      <div style={{
        position: "absolute",
        top: 0, left: 0,
        width: "50%", height: "100%",
        background: "#FAF6F0",
        transition: isSplitting ? "transform 1.0s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
        transform: isSplitting ? "translateX(-100%)" : "translateX(0)",
        zIndex: 4,
      }} />

      {/* ── Right panel ── */}
      <div style={{
        position: "absolute",
        top: 0, right: 0,
        width: "50%", height: "100%",
        background: "#FAF6F0",
        transition: isSplitting ? "transform 1.0s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
        transform: isSplitting ? "translateX(100%)" : "translateX(0)",
        zIndex: 4,
      }} />

      {/* ── Watercolour bloom layers (behind panels) ── */}
      {isBlooming && (
        <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}>
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(176,208,226,0.5) 0%, rgba(200,225,240,0.2) 50%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            animation: "bloomExpand 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }} />
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(155,180,150,0.3) 0%, rgba(175,198,165,0.12) 55%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            animation: "bloomExpand 1.4s 0.08s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }} />
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,168,83,0.18) 0%, rgba(232,217,192,0.08) 55%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            animation: "bloomExpand 1.6s 0.04s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }} />
        </div>
      )}

      {/* ── Central content ── */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
        zIndex: 5,
        opacity: isSplitting ? 0 : 1,
        transition: isSplitting ? "opacity 0.25s ease" : "none",
        animation: phase === "entering"
          ? "sealDrop 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
          : isCracking
          ? "sealPulse 0.3s ease-out"
          : "none",
      }}>

        {/* ── The wax seal ── */}
        <div style={{ position: "relative", width: 260, height: 260 }}>
          {/* Seal SVG — gradient disc + serrated edge */}
          <svg
            viewBox="0 0 200 200"
            width="260"
            height="260"
            style={{
              position: "absolute",
              top: 0, left: 0,
              filter: "drop-shadow(0 10px 40px rgba(180,130,30,0.38)) drop-shadow(0 2px 8px rgba(180,130,30,0.2))",
            }}
          >
            <defs>
              <radialGradient id="waxGrad" cx="38%" cy="32%" r="68%">
                <stop offset="0%" stopColor="#EDD06A" />
                <stop offset="35%" stopColor="#C9A030" />
                <stop offset="80%" stopColor="#9B7418" />
                <stop offset="100%" stopColor="#7A5C10" />
              </radialGradient>
              <radialGradient id="embossHighlight" cx="32%" cy="28%" r="45%">
                <stop offset="0%" stopColor="rgba(255,248,200,0.55)" />
                <stop offset="100%" stopColor="rgba(255,248,200,0)" />
              </radialGradient>
              <clipPath id="sealClip">
                <circle cx="100" cy="100" r="88" />
              </clipPath>
            </defs>

            {/* Serrated outer edge */}
            {Array.from({ length: 40 }).map((_, i) => {
              const a1 = (i / 40) * Math.PI * 2;
              const a2 = ((i + 0.5) / 40) * Math.PI * 2;
              const a3 = ((i + 1) / 40) * Math.PI * 2;
              const x1 = 100 + 87 * Math.cos(a1);
              const y1 = 100 + 87 * Math.sin(a1);
              const x2 = 100 + 95 * Math.cos(a2);
              const y2 = 100 + 95 * Math.sin(a2);
              const x3 = 100 + 87 * Math.cos(a3);
              const y3 = 100 + 87 * Math.sin(a3);
              return <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill="url(#waxGrad)" />;
            })}

            {/* Main disc */}
            <circle cx="100" cy="100" r="87" fill="url(#waxGrad)" />

            {/* Emboss highlight */}
            <circle cx="100" cy="100" r="87" fill="url(#embossHighlight)" />

            {/* Inner border ring — draws itself */}
            <circle
              cx="100" cy="100" r="76"
              fill="none"
              stroke="rgba(255,240,160,0.65)"
              strokeWidth="1.5"
              strokeDasharray="478"
              strokeDashoffset={isDrawing ? "0" : "478"}
              style={{
                transition: isDrawing
                  ? "stroke-dashoffset 1.1s 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
              }}
            />

            {/* Crack lines — animate on tap */}
            <line x1="100" y1="22" x2="112" y2="98"
              stroke="rgba(100,75,10,0.85)" strokeWidth="1.1" strokeLinecap="round"
              strokeDasharray="80" strokeDashoffset={isCracking ? "0" : "80"}
              style={{ transition: isCracking ? "stroke-dashoffset 0.3s ease-out" : "none" }}
            />
            <line x1="100" y1="178" x2="90" y2="102"
              stroke="rgba(100,75,10,0.85)" strokeWidth="1.1" strokeLinecap="round"
              strokeDasharray="80" strokeDashoffset={isCracking ? "0" : "80"}
              style={{ transition: isCracking ? "stroke-dashoffset 0.3s 0.04s ease-out" : "none" }}
            />
            <line x1="22" y1="85" x2="98" y2="105"
              stroke="rgba(100,75,10,0.65)" strokeWidth="0.8" strokeLinecap="round"
              strokeDasharray="85" strokeDashoffset={isCracking ? "0" : "85"}
              style={{ transition: isCracking ? "stroke-dashoffset 0.35s 0.06s ease-out" : "none" }}
            />
            <line x1="178" y1="115" x2="102" y2="96"
              stroke="rgba(100,75,10,0.65)" strokeWidth="0.8" strokeLinecap="round"
              strokeDasharray="85" strokeDashoffset={isCracking ? "0" : "85"}
              style={{ transition: isCracking ? "stroke-dashoffset 0.35s 0.09s ease-out" : "none" }}
            />
          </svg>

          {/* Real AV logo — centred inside seal, fades in after seal settles */}
          <img
            src={LOGO_URL}
            alt="AV"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "42%",
              height: "42%",
              transform: "translate(-50%, -50%)",
              objectFit: "contain",
              filter: "brightness(0) invert(1) opacity(0.92)",
              opacity: isDrawing ? 1 : 0,
              transition: isDrawing
                ? "opacity 0.7s 0.9s ease"
                : "none",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Names */}
        <div style={{
          textAlign: "center",
          opacity: phase === "idle" || phase === "cracking" ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: "1.6rem",
            fontWeight: 400,
            color: "#1C1410",
            letterSpacing: "0.06em",
            margin: 0,
            lineHeight: 1.2,
          }}>
            Arut <span style={{ color: "#D4A853", fontStyle: "italic" }}>&</span> Viba
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: "0.72rem",
            color: "#7A6552",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            margin: "0.45rem 0 0",
          }}>
            23 · 24 January 2027
          </p>
        </div>

        {/* Tap hint */}
        <p style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
          fontSize: "0.68rem",
          color: "#7A6552",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          margin: 0,
          opacity: phase === "idle" ? 1 : 0,
          transition: "opacity 0.9s ease",
          animation: phase === "idle" ? "gentlePulse 2.8s 0.3s ease-in-out infinite" : "none",
        }}>
          tap to open
        </p>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes sealDrop {
          from { opacity: 0; transform: translate(-50%, calc(-50% - 90px)) scale(0.82); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes sealPulse {
          0%   { transform: translate(-50%, -50%) scale(1); }
          45%  { transform: translate(-50%, -50%) scale(1.05); }
          100% { transform: translate(-50%, -50%) scale(0.97); }
        }
        @keyframes bloomExpand {
          from { width: 0; height: 0; opacity: 0.85; }
          to   { width: 260vmax; height: 260vmax; opacity: 0; }
        }
        @keyframes gentlePulse {
          0%, 100% { opacity: 0.45; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
