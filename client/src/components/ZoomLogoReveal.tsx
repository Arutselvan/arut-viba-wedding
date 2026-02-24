/**
 * ZoomLogoReveal — "Zoom Through the Logo" cinematic site intro
 *
 * Design: Ink & Marigold — parchment #FAF6F0, ink #1C1410
 *
 * Sequence (automatic):
 *  0.0s  — Cream screen. AV logo fades in small (90px), centred (0.5s)
 *  0.6s  — Logo begins slow zoom: 1× → 100× over 2.2s, ease-in acceleration
 *  1.4s  — Cream background starts fading out (0.9s)
 *  2.4s  — Logo fades out (0.5s) — hero fully visible behind
 *  2.9s  — Component unmounts, onOpen() fires
 */

import { useEffect, useState } from "react";

const LOGO_URL =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/AVdiZBmryFCAlBJN.svg";

interface ZoomLogoRevealProps {
  onOpen: () => void;
}

export default function ZoomLogoReveal({ onOpen }: ZoomLogoRevealProps) {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setMounted(false);
      onOpen();
    }, 3000);
    return () => clearTimeout(t);
  }, [onOpen]);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Cream background — holds, then fades out as zoom accelerates */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#FAF6F0",
          animation: "bgFadeOut 1.0s 1.5s cubic-bezier(0.55, 0, 1, 1) forwards",
        }}
      />

      {/* AV Logo — fades in, then zooms toward viewer, then fades */}
      <img
        src={LOGO_URL}
        alt=""
        aria-hidden="true"
        style={{
          position: "relative",
          zIndex: 1,
          width: "88px",
          height: "88px",
          objectFit: "contain",
          filter: "brightness(0) saturate(100%)",
          transformOrigin: "center center",
          willChange: "transform, opacity",
          animation: [
            "logoFadeIn 0.5s 0.1s ease forwards",
            "logoZoom 2.4s 0.55s cubic-bezier(0.4, 0, 1, 1) forwards",
            "logoFadeOut 0.5s 2.4s ease forwards",
          ].join(", "),
          opacity: 0,
        }}
      />

      <style>{`
        @keyframes logoFadeIn {
          from { opacity: 0; transform: scale(1); }
          to   { opacity: 1; transform: scale(1); }
        }

        @keyframes logoZoom {
          0%   { transform: scale(1); }
          60%  { transform: scale(18); }
          100% { transform: scale(110); }
        }

        @keyframes logoFadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }

        @keyframes bgFadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
