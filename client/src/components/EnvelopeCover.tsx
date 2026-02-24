/**
 * EnvelopeCover — Pure CSS/SVG luxury envelope. No generated images.
 * Full-screen dark forest-green envelope with gold accents.
 * Single wax seal (CSS circle + actual Aruvi SVG path in gold).
 *
 * Animation on click:
 *   1. Seal cracks: scale(1.35) + opacity 0 (0.45s)
 *   2. Flap folds open: rotateX(-180deg) with perspective (0.8s, delay 0.15s)
 *   3. Envelope slides down off-screen (0.9s, delay 0.9s)
 *   4. onOpen() called at 1.85s
 */
import { useRef, useState } from "react";

const LOGO_URL =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/AVdiZBmryFCAlBJN.svg";

const ARUVI_PATH =
  "m 559.72595,692.30834 c -2.22275,-1.04227 -5.33142,-3.42156 -6.90816,-5.28733 -9.36807,-11.08531 -12.17467,-29.26169 -16.04194,-103.8923 -3.20102,-61.77327 -5.32243,-79.42534 -12.60549,-104.88928 -7.18722,-25.12888 -18.32165,-44.42698 -32.60732,-56.51474 -6.66309,-5.63796 -25.20843,-14.88841 -33.09494,-16.50783 -5.95991,-1.22381 -11.78139,-1.30891 -14.56996,-0.21297 -1.5454,0.60736 -0.6994,1.49675 4.88389,5.13441 7.64302,4.97962 15.18937,13.4726 19.39541,21.82841 9.3023,18.48018 14.91907,49.33124 17.08145,93.82282 0.58379,12.01155 1.49087,29.71418 2.01574,39.33918 0.52487,9.625 0.90213,25.15 0.83836,34.5 -0.10538,15.44802 -0.19017,16.22401 -0.92876,8.5 -0.44704,-4.675 -1.25441,-18.4 -1.79415,-30.5 -0.53975,-12.1 -1.47447,-23.29652 -2.07718,-24.88117 -0.6027,-1.58464 -3.93326,-7.43464 -7.40125,-13 -20.4514,-32.81997 -34.17672,-64.36222 -39.60246,-91.0107 -5.87805,-28.86996 -5.0887,-65.30953 2.07762,-95.91172 2.70648,-11.55746 10.56509,-34.72163 15.30049,-45.09998 1.98341,-4.34697 3.4507,-8.05908 3.26064,-8.24914 -0.19006,-0.19007 -4.16771,6.29154 -8.83921,14.40357 -4.6715,8.11203 -13.58648,23.29914 -19.81106,33.74914 -6.22457,10.45 -15.47138,26.65 -20.54845,36 -10.06837,18.54204 -38.42634,66.21817 -56.78536,95.46899 -6.37555,10.15793 -11.47169,18.58919 -11.32477,18.73612 0.14693,0.14693 5.6112,1.18075 12.14281,2.29739 29.87174,5.10682 59.46362,16.83708 81.98542,32.4991 10.41087,7.23989 25.28532,19.99562 27.80996,23.8487 0.95488,1.45734 1.54962,2.6497 1.32165,2.6497 -0.22797,0 -4.17585,-3.18757 -8.77305,-7.0835 -22.41284,-18.99389 -51.46428,-33.4876 -83.33381,-41.57509 -10.10278,-2.56377 -30.35767,-6.32975 -34.02475,-6.32621 -1.40952,10e-4 -3.30019,2.13987 -6.40388,7.24337 -6.88231,11.31679 -20.60471,31.90563 -31.48626,47.24143 -21.46674,30.25394 -37.41203,49.46624 -58.53441,70.52745 -17.75064,17.69924 -27.93453,26.30398 -43.1431,36.45321 -39.70513,26.49665 -73.55567,32.15623 -98.417297,16.45469 -11.157758,-7.04677 -19.618431,-19.90022 -23.643974,-35.91992 -4.051682,-16.12373 -1.203679,-36.49112 7.685086,-54.95961 6.271855,-13.03126 12.011652,-20.75142 24.824855,-33.39002 29.23348,-28.83511 76.52976,-49.7827 132.11898,-58.51568 23.32564,-3.66442 35.72508,-4.457 61.24906,-3.91506 l 24.24907,0.51486 11.8342,-17.62496 c 20.00609,-29.79553 38.65312,-60.27104 62.18119,-101.62496 15.16094,-26.64749 24.97958,-42.0787 49.65569,-78.04009 4.76887,-6.94985 13.19381,-19.84716 25.18123,-38.54864 6.68568,-10.43027 8.4774,-11.77334 16.86674,-12.64329 6.51701,-0.6758 10.28282,1.36039 10.28282,5.55995 0,1.52999 -2.48709,8.7962 -5.52688,16.14713 -21.99959,53.20023 -34.18693,95.19871 -36.13532,124.52494 l -0.59794,9 7.88007,1.76932 c 9.12982,2.04992 22.398,7.30783 30.22641,11.97812 7.47346,4.45852 20.96351,17.37101 28.24885,27.03938 5.99875,7.96093 15.25166,25.24323 20.19157,37.71318 4.07803,10.29427 10.39466,32.26049 13.65915,47.5 5.28007,24.64878 8.23302,50.28804 11.05661,96 0.57754,9.35 1.48824,23.64669 2.02378,31.77042 0.53554,8.12373 0.9737,15.68778 0.9737,16.80902 0,3.69762 1.97902,0.93173 8.16254,-11.40804 20.46667,-40.84311 55.43205,-103.73258 79.32266,-142.6714 15.14594,-24.68606 44.51552,-66.83202 60.80747,-87.25998 34.56534,-43.34039 73.14806,-79.69041 106.80951,-100.62868 28.3987,-17.66471 51.19231,-25.70801 75.89782,-26.78245 20.8534,-0.90692 32.31585,3.00852 44.74945,15.28586 8.47587,8.36935 12.55292,16.07985 14.36414,27.16538 2.20841,13.51656 -2.19487,32.61729 -12.15349,52.71987 -7.46312,15.06513 -16.80691,28.1991 -28.78234,40.45749 l -9.32224,9.54251 7.18843,-8.5 c 28.66261,-33.89227 40.89123,-68.63607 33.07237,-93.96475 -4.46183,-14.4538 -10.52163,-23.09842 -20.25412,-28.89357 -5.47457,-3.25981 -18.11296,-6.14168 -26.93419,-6.14168 -29.27849,0 -67.44368,18.48496 -104.42801,50.57873 -25.20317,21.87048 -57.19757,58.24992 -83.05571,94.43903 -4.91936,6.88476 -10.40261,14.53476 -12.18501,17 -2.94617,4.07483 -24.1274,36.81447 -33.30695,51.48224 -17.15496,27.41148 -34.68101,57.57041 -64.2141,110.5 -23.28488,41.73147 -30.08996,53.17347 -32.85048,55.23449 -3.71158,2.7711 -11.57083,3.22323 -16.42912,0.94514 z m -413.1806,-12.2147 c 43.66257,-14.60619 92.4258,-60.80651 150.368,-142.46493 10.3989,-14.65526 23.35397,-34.1546 23.35397,-35.15127 0,-0.32019 -13.3875,-0.35081 -29.75,-0.068 -25.60988,0.44258 -32.03257,0.87887 -46.15206,3.1351 -32.99603,5.27263 -53.74699,11.15783 -78.38867,22.23191 -53.52811,24.05576 -86.709264,64.11678 -86.709264,104.68778 0,9.4001 2.695803,20.49663 6.821886,28.08043 5.522185,10.14986 18.516058,20.48514 28.400628,22.58976 7.87602,1.67697 21.94111,0.34277 32.05551,-3.04074 z m 348.86444,-20.96493 c -0.97671,-43.28795 -5.97995,-145.89204 -8.19212,-168 -3.12602,-31.24088 -18.12721,-69.11189 -34.07882,-74.96456 -33.3124,-12.22237 -8.70141,-5.88399 0.3,-1.7253 9.40458,4.34496 27.07661,27.27376 31.15355,40.26954 5.18493,16.52762 8.90291,42.33442 10.6497,73.92032 1.5914,28.77635 2.23847,89.15801 1.23237,115 -0.4925,12.65 -0.97161,19.625 -1.06468,15.5 z m 37.01226,-26.25 c -3.25745,-24.93557 -6.82327,-71.80146 -10.19328,-98.11011 -4.13917,-32.31319 -14.10801,-97.39647 -39.69095,-118.80198 -4.70627,-3.93778 5.6879,2.37758 10.35676,7.4216 20.83616,22.5104 35.20971,97.06088 39.36009,175.74049 1.11698,21.175 2.3182,42.6625 2.66937,47.75 0.35117,5.0875 0.41977,9.25 0.15246,9.25 -0.26731,0 -0.99085,-10.51521 -2.65445,-23.25 z";

// Colours
const C = {
  bg: "#162118",          // deep forest green
  bgLight: "#1e2d21",     // slightly lighter for flap
  gold: "#D4A853",
  goldDim: "rgba(212,168,83,0.35)",
  goldFaint: "rgba(212,168,83,0.10)",
  sealRed: "#8B1A28",
  sealRedLight: "#b01e30",
  ink: "#f5f0e8",
  taupe: "rgba(245,240,232,0.55)",
};

interface Props { onOpen: () => void; }

export function EnvelopeCover({ onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "gone">("idle");
  const triggered = useRef(false);

  const open = () => {
    if (triggered.current) return;
    triggered.current = true;
    setPhase("opening");
    setTimeout(() => { setPhase("gone"); onOpen(); }, 1900);
  };

  if (phase === "gone") return null;
  const isOpening = phase === "opening";

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden cursor-pointer select-none"
      style={{ background: C.bg }}
      onClick={open}
      role="button"
      tabIndex={0}
      aria-label="Open invitation"
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open()}
    >
      {/* ══════════════════════════════════════════
          ENVELOPE BODY — slides down on open
      ══════════════════════════════════════════ */}
      <div
        className="absolute inset-0"
        style={{
          transition: isOpening ? "transform 1s cubic-bezier(0.4,0,0.2,1) 0.88s" : "none",
          transform: isOpening ? "translateY(110%)" : "translateY(0)",
        }}
      >
        {/* ── Solid envelope background ── */}
        <div className="absolute inset-0" style={{ background: C.bg }} />

        {/* ── Subtle diagonal texture lines ── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.06 }}>
          <defs>
            <pattern id="diag" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="28" stroke={C.gold} strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diag)" />
        </svg>

        {/* ── Outer gold border frame ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: "clamp(16px, 3vw, 32px)",
            border: `1px solid ${C.goldDim}`,
          }}
        />
        {/* Inner border */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: "clamp(22px, 4vw, 44px)",
            border: `0.5px solid ${C.goldFaint}`,
          }}
        />

        {/* ── Corner ornaments ── */}
        {[
          { top: "clamp(20px,3.5vw,40px)", left: "clamp(20px,3.5vw,40px)", deg: 0 },
          { top: "clamp(20px,3.5vw,40px)", right: "clamp(20px,3.5vw,40px)", deg: 90 },
          { bottom: "clamp(20px,3.5vw,40px)", right: "clamp(20px,3.5vw,40px)", deg: 180 },
          { bottom: "clamp(20px,3.5vw,40px)", left: "clamp(20px,3.5vw,40px)", deg: 270 },
        ].map((pos, i) => (
          <svg
            key={i}
            width="36" height="36"
            viewBox="0 0 36 36"
            className="absolute pointer-events-none"
            style={{ top: pos.top, left: (pos as any).left, right: (pos as any).right, bottom: (pos as any).bottom, transform: `rotate(${(pos as any).deg}deg)`, opacity: 0.55 }}
          >
            <path d="M2,2 L14,2 M2,2 L2,14" stroke={C.gold} strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <circle cx="2" cy="2" r="1.5" fill={C.gold} />
            <path d="M18,2 Q22,6 26,2 Q22,-2 18,2 Z" fill={C.gold} opacity="0.5" transform="translate(4,4) scale(0.6)" />
          </svg>
        ))}

        {/* ── Envelope fold lines (V shape from sides to centre-bottom) ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ opacity: 0.18 }}
        >
          {/* Left fold */}
          <line x1="0" y1="100" x2="50" y2="55" stroke={C.gold} strokeWidth="0.25" />
          {/* Right fold */}
          <line x1="100" y1="100" x2="50" y2="55" stroke={C.gold} strokeWidth="0.25" />
          {/* Bottom fold */}
          <line x1="0" y1="100" x2="50" y2="75" stroke={C.gold} strokeWidth="0.15" opacity="0.5" />
          <line x1="100" y1="100" x2="50" y2="75" stroke={C.gold} strokeWidth="0.15" opacity="0.5" />
        </svg>

        {/* ══════════════════════════════════════════
            FLAP — top triangle, folds open upward
        ══════════════════════════════════════════ */}
        <div
          className="absolute top-0 left-0 w-full pointer-events-none"
          style={{ height: "56%", perspective: "1400px", perspectiveOrigin: "50% 0%" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transformOrigin: "top center",
              transition: isOpening ? "transform 0.82s cubic-bezier(0.4,0,0.2,1) 0.12s" : "none",
              transform: isOpening ? "rotateX(-185deg)" : "rotateX(0deg)",
              backfaceVisibility: "hidden",
              position: "relative",
            }}
          >
            {/* Flap fill — slightly lighter green */}
            <div
              className="absolute inset-0"
              style={{
                background: C.bgLight,
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />
            {/* Flap diagonal texture */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ opacity: 0.05, clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            >
              <rect width="100%" height="100%" fill="url(#diag)" />
            </svg>
            {/* Flap shadow at fold edge */}
            <div
              className="absolute bottom-0 left-0 w-full"
              style={{
                height: "20%",
                background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />
            {/* Flap gold border */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ opacity: 0.4 }}
            >
              <polyline
                points="0.5,0.5 99.5,0.5 50,99.5"
                fill="none"
                stroke={C.gold}
                strokeWidth="0.35"
              />
            </svg>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            WAX SEAL — centered at flap-body join
        ══════════════════════════════════════════ */}
        <div
          className="absolute left-1/2"
          style={{
            top: "56%",
            transform: isOpening
              ? "translate(-50%, -50%) scale(1.4)"
              : "translate(-50%, -50%) scale(1)",
            opacity: isOpening ? 0 : 1,
            transition: isOpening ? "transform 0.45s ease 0s, opacity 0.45s ease 0s" : "none",
            zIndex: 20,
          }}
        >
          {/* Outer glow */}
          <div
            style={{
              position: "absolute",
              inset: -12,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(212,168,83,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          {/* Seal disc */}
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              background: `radial-gradient(circle at 38% 32%, ${C.sealRedLight} 0%, ${C.sealRed} 55%, #4d0910 100%)`,
              boxShadow: `
                0 10px 36px rgba(107,15,26,0.7),
                0 2px 8px rgba(0,0,0,0.55),
                inset 0 2px 8px rgba(255,160,80,0.18),
                0 0 0 3px ${C.goldDim},
                0 0 0 5px rgba(212,168,83,0.1)
              `,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Inner ring */}
            <div
              style={{
                position: "absolute",
                inset: 8,
                borderRadius: "50%",
                border: `1.5px solid rgba(212,168,83,0.5)`,
                pointerEvents: "none",
              }}
            />
            {/* Aruvi path in gold */}
            <svg
              viewBox="73.331596 247.26931 890.60754 446.49603"
              style={{
                width: 80,
                height: 40,
                fill: C.gold,
                filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.7))",
              }}
            >
              <path d={ARUVI_PATH} />
            </svg>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            CENTRE CONTENT — names & date
        ══════════════════════════════════════════ */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
            opacity: isOpening ? 0 : 1,
            transition: isOpening ? "opacity 0.3s ease" : "none",
            zIndex: 5,
            marginTop: "-8%",
          }}
        >
          {/* Logo */}
          <img
            src={LOGO_URL}
            alt="AV"
            draggable={false}
            style={{
              width: 72,
              height: 72,
              objectFit: "contain",
              filter: "brightness(0) invert(1) sepia(0.4) saturate(2) hue-rotate(5deg) brightness(0.9)",
              display: "block",
              margin: "0 auto 16px",
              opacity: 0.85,
            }}
          />
          {/* Names */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(28px, 5vw, 52px)",
              fontWeight: 300,
              letterSpacing: "0.08em",
              color: C.ink,
              lineHeight: 1.1,
              marginBottom: 10,
            }}
          >
            Arut <span style={{ color: C.gold, fontStyle: "italic" }}>&amp;</span> Viba
          </p>
          {/* Gold rule */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ height: 1, width: 48, background: C.goldDim }} />
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.gold, opacity: 0.6 }} />
            <div style={{ height: 1, width: 48, background: C.goldDim }} />
          </div>
          {/* Date */}
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(9px, 1.2vw, 11px)",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: C.taupe,
            }}
          >
            23rd – 24th January 2027
          </p>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(8px, 1vw, 10px)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: C.taupe,
              marginTop: 4,
              opacity: 0.7,
            }}
          >
            MGM Beach Resorts · Chennai
          </p>
        </div>

        {/* ══════════════════════════════════════════
            TAP PROMPT — bottom centre
        ══════════════════════════════════════════ */}
        <div
          className="absolute bottom-8 left-1/2"
          style={{
            transform: "translateX(-50%)",
            textAlign: "center",
            pointerEvents: "none",
            opacity: isOpening ? 0 : 1,
            transition: isOpening ? "opacity 0.25s ease" : "none",
          }}
        >
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(8px, 1vw, 10px)",
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "rgba(212,168,83,0.55)",
              animation: "pulse 2.8s ease-in-out infinite",
            }}
          >
            Tap to open
          </p>
        </div>

        {/* ══════════════════════════════════════════
            SPARKLES on open
        ══════════════════════════════════════════ */}
        {isOpening && (
          <div
            className="absolute pointer-events-none"
            style={{ top: "56%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 30 }}
          >
            {Array.from({ length: 18 }).map((_, i) => {
              const angle = (i / 18) * 360;
              const dist = 55 + (i % 4) * 16;
              const x = Math.cos((angle * Math.PI) / 180) * dist;
              const y = Math.sin((angle * Math.PI) / 180) * dist;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 2 + (i % 3),
                    height: 2 + (i % 3),
                    borderRadius: "50%",
                    background: i % 3 === 0 ? C.gold : i % 3 === 1 ? "#fff8e1" : "#e8c97a",
                    opacity: 0,
                    transform: `translate(${x}px, ${y}px)`,
                    animation: `sparkle 0.75s ease-out ${0.04 * i}s forwards`,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
