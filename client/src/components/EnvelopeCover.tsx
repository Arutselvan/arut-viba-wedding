/**
 * EnvelopeCover — Design: Luxury dark-green envelope, no text on face.
 * Shows only the envelope geometry (back panel + four fold triangles + flap)
 * and a single wax seal (Aruvi SVG path) at the flap-body join.
 *
 * On click: flap folds open (rotateX 0→-180 with perspective),
 * seal cracks (scale + fade), then the whole envelope slides down
 * and the site content fades in.
 */

import { useEffect, useRef, useState } from "react";

// ── Palette ──────────────────────────────────────────────────────────────────
const C = {
  bg:        "#0d1f18",   // very dark forest green — page background
  body:      "#162b20",   // envelope body (slightly lighter)
  flap:      "#1a3328",   // top flap (slightly lighter still)
  flapInner: "#112318",   // inside of flap (darker, revealed when open)
  fold:      "#1e3d2e",   // left/right/bottom fold triangles
  border:    "#c9a84c",   // gold border / fold lines
  seal:      "#7b1c2a",   // wax seal disc
  sealGold:  "#e8c96a",   // AV monogram on seal
  hint:      "#c9a84c55", // "tap to open" hint text
};

// ── Aruvi SVG path (exact from Aruvi.svg) ────────────────────────────────────
const ARUVI_PATH =
  "M 0 0 L 0 0 C 0.1 -0.5 0.5 -1.2 1.2 -2.1 C 1.9 -3.0 2.8 -3.9 3.8 -4.7 C 4.8 -5.5 5.9 -6.1 7.0 -6.5 C 8.1 -6.9 9.2 -7.0 10.2 -6.8 C 11.2 -6.6 12.0 -6.1 12.7 -5.3 C 13.4 -4.5 13.8 -3.5 14.0 -2.3 C 14.2 -1.1 14.1 0.3 13.8 1.8 C 13.5 3.3 13.0 4.9 12.3 6.5 C 11.6 8.1 10.8 9.7 9.9 11.2 C 9.0 12.7 8.0 14.1 7.0 15.3 C 6.0 16.5 5.0 17.5 4.1 18.2 C 3.2 18.9 2.4 19.3 1.7 19.3 C 1.0 19.3 0.5 18.9 0.2 18.1 C -0.1 17.3 -0.2 16.1 -0.1 14.6 C 0.0 13.1 0.3 11.3 0.8 9.3 C 1.3 7.3 1.9 5.2 2.6 3.0 C 3.3 0.8 4.0 -1.5 4.7 -3.8 C 5.4 -6.1 6.0 -8.3 6.5 -10.4 C 7.0 -12.5 7.3 -14.3 7.4 -15.8 C 7.5 -17.3 7.4 -18.4 7.1 -19.0 C 6.8 -19.6 6.3 -19.7 5.6 -19.3 C 4.9 -18.9 4.1 -18.0 3.2 -16.6 C 2.3 -15.2 1.4 -13.4 0.5 -11.2 C -0.4 -9.0 -1.2 -6.6 -1.9 -4.0 C -2.6 -1.4 -3.1 1.3 -3.4 3.9 C -3.7 6.5 -3.7 8.9 -3.5 11.0 C -3.3 13.1 -2.8 14.8 -2.1 16.0 C -1.4 17.2 -0.5 17.8 0.5 17.7 C 1.5 17.6 2.6 16.8 3.7 15.4 C 4.8 14.0 5.9 12.0 7.0 9.5 C 8.1 7.0 9.1 4.1 10.0 0.9 C 10.9 -2.3 11.6 -5.7 12.1 -9.1 C 12.6 -12.5 12.8 -15.8 12.7 -18.8 C 12.6 -21.8 12.2 -24.4 11.5 -26.5 C 10.8 -28.6 9.8 -30.1 8.6 -31.0 C 7.4 -31.9 6.0 -32.1 4.4 -31.6 C 2.8 -31.1 1.1 -29.9 -0.6 -28.1 C -2.3 -26.3 -4.0 -23.9 -5.6 -21.0 C -7.2 -18.1 -8.7 -14.8 -10.0 -11.2 C -11.3 -7.6 -12.4 -3.8 -13.2 0.1 C -14.0 4.0 -14.5 7.9 -14.7 11.6 C -14.9 15.3 -14.7 18.7 -14.2 21.7 C -13.7 24.7 -12.9 27.2 -11.8 29.0 C -10.7 30.8 -9.3 31.9 -7.7 32.2 C -6.1 32.5 -4.3 32.0 -2.3 30.7 C -0.3 29.4 1.8 27.3 3.9 24.5 C 6.0 21.7 8.1 18.3 10.1 14.4 C 12.1 10.5 14.0 6.2 15.7 1.7 C 17.4 -2.8 18.8 -7.4 19.9 -11.9 C 21.0 -16.4 21.7 -20.7 22.0 -24.6 C 22.3 -28.5 22.1 -32.0 21.5 -34.8 C 20.9 -37.6 19.9 -39.7 18.5 -41.0 C 17.1 -42.3 15.4 -42.7 13.4 -42.3 C 11.4 -41.9 9.2 -40.7 6.9 -38.7 C 4.6 -36.7 2.3 -34.0 0.0 -30.7";

export default function EnvelopeCover({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    timerRef.current = setTimeout(() => {
      setPhase("done");
      onOpen();
    }, 1800);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  if (phase === "done") return null;

  const isOpening = phase === "opening";

  return (
    <div
      onClick={handleClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: C.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isOpening ? "default" : "pointer",
        overflow: "hidden",
        transition: isOpening ? "transform 0.6s ease 1.2s, opacity 0.5s ease 1.3s" : "none",
        transform: isOpening ? "translateY(100vh)" : "translateY(0)",
        opacity: isOpening ? 0 : 1,
      }}
    >
      {/* ── Envelope wrapper — perspective container ── */}
      <div
        style={{
          position: "relative",
          width: "min(520px, 90vw)",
          height: "min(360px, 63vw)",
          perspective: "1200px",
          filter: isOpening ? "none" : "drop-shadow(0 40px 80px rgba(0,0,0,0.7))",
          transition: "filter 0.3s ease",
        }}
      >
        {/* ── Envelope body (back) ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: C.body,
            borderRadius: "4px",
            border: `1px solid ${C.border}44`,
          }}
        />

        {/* ── Bottom-left fold triangle ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "0 0 min(180px,31.5vw) min(260px,45vw)",
            borderColor: `transparent transparent ${C.fold} transparent`,
          }}
        />
        {/* ── Bottom-right fold triangle ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "0 min(260px,45vw) min(180px,31.5vw) 0",
            borderColor: `transparent ${C.fold} transparent transparent`,
          }}
        />

        {/* ── Bottom centre fold triangle (V shape) ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: `0 min(260px,45vw) min(180px,31.5vw) min(260px,45vw)`,
            borderColor: `transparent transparent ${C.body} transparent`,
          }}
        />

        {/* ── Gold fold line — bottom-left diagonal ── */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox="0 0 520 360"
          preserveAspectRatio="none"
        >
          {/* bottom-left fold line */}
          <line x1="0" y1="360" x2="260" y2="180" stroke={C.border} strokeWidth="0.6" opacity="0.5" />
          {/* bottom-right fold line */}
          <line x1="520" y1="360" x2="260" y2="180" stroke={C.border} strokeWidth="0.6" opacity="0.5" />
          {/* top-left fold line */}
          <line x1="0" y1="0" x2="260" y2="180" stroke={C.border} strokeWidth="0.6" opacity="0.3" />
          {/* top-right fold line */}
          <line x1="520" y1="0" x2="260" y2="180" stroke={C.border} strokeWidth="0.6" opacity="0.3" />
          {/* outer gold border */}
          <rect x="10" y="10" width="500" height="340" fill="none" stroke={C.border} strokeWidth="0.8" opacity="0.45" rx="2" />
          <rect x="18" y="18" width="484" height="324" fill="none" stroke={C.border} strokeWidth="0.4" opacity="0.25" rx="1" />
        </svg>

        {/* ── Top flap (folds open on click) ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
            transform: isOpening ? "rotateX(-175deg)" : "rotateX(0deg)",
            transition: isOpening ? "transform 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s" : "none",
            zIndex: 10,
          }}
        >
          {/* flap front face */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              backfaceVisibility: "hidden",
            }}
          >
            {/* triangle clip for flap — pointing down */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                background: C.flap,
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />
            {/* flap border line */}
            <svg
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
              viewBox="0 0 520 180"
              preserveAspectRatio="none"
            >
              <polyline points="0,0 260,180 520,0" fill="none" stroke={C.border} strokeWidth="0.7" opacity="0.5" />
            </svg>
          </div>
          {/* flap back face (inner — visible when open) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: C.flapInner,
              backfaceVisibility: "hidden",
              transform: "rotateX(180deg)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            }}
          />
        </div>

        {/* ── Wax seal — centred at flap-body join ── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${isOpening ? 0.4 : 1})`,
            transition: isOpening ? "transform 0.4s ease 0.05s, opacity 0.4s ease 0.1s" : "none",
            opacity: isOpening ? 0 : 1,
            zIndex: 20,
            width: "clamp(64px, 11vw, 88px)",
            height: "clamp(64px, 11vw, 88px)",
            borderRadius: "50%",
            background: `radial-gradient(circle at 38% 35%, #a0283a, ${C.seal} 55%, #4a0f18)`,
            boxShadow: `0 0 0 2px ${C.border}88, 0 0 0 4px ${C.seal}44, 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Aruvi SVG logo — gold on seal */}
          <svg
            viewBox="-15 -45 30 90"
            style={{
              width: "55%",
              height: "55%",
              filter: `drop-shadow(0 1px 2px rgba(0,0,0,0.5))`,
            }}
          >
            <path
              d={ARUVI_PATH}
              fill="none"
              stroke={C.sealGold}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ── Tap hint — bottom centre ── */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(14px, 3vw, 22px)",
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(9px, 1.4vw, 12px)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: C.border,
            opacity: isOpening ? 0 : 0.6,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        >
          tap to open
        </div>
      </div>
    </div>
  );
}
