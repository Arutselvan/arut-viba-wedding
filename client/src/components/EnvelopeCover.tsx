/**
 * EnvelopeCover — Full-screen wedding invitation envelope
 *
 * Architecture (learned from CodePen envelope examples):
 * - Envelope body = plain full-screen rectangle (dark forest green)
 * - Four static triangular flaps: bottom, left, right (clip-path triangles, never move)
 * - One animated top flap: rotates on transformOrigin "top center" using rotateX(180deg)
 *   so it folds BACKWARD along the fold line — never splits or moves apart
 * - Wax seal sits at the fold line between top flap and body, fades + scales on open
 * - After flap opens, entire envelope slides down off-screen
 *
 * Aruvi SVG: viewBox="0 0 890.60754 446.49603", path has transform="translate(-73.33,-247.27)"
 * We embed the path inline inside the seal circle, adjusting viewBox to account for the transform.
 */

import { useEffect, useRef, useState } from "react";

const ARUVI_PATH =
  "m 559.72595,692.30834 c -2.22275,-1.04227 -5.33142,-3.42156 -6.90816,-5.28733 -9.36807,-11.08531 -12.17467,-29.26169 -16.04194,-103.8923 -3.20102,-61.77327 -5.32243,-79.42534 -12.60549,-104.88928 -7.18722,-25.12888 -18.32165,-44.42698 -32.60732,-56.51474 -6.66309,-5.63796 -25.20843,-14.88841 -33.09494,-16.50783 -5.95991,-1.22381 -11.78139,-1.30891 -14.56996,-0.21297 -1.5454,0.60736 -0.6994,1.49675 4.88389,5.13441 7.64302,4.97962 15.18937,13.4726 19.39541,21.82841 9.3023,18.48018 14.91907,49.33124 17.08145,93.82282 0.58379,12.01155 1.49087,29.71418 2.01574,39.33918 0.52487,9.625 0.90213,25.15 0.83836,34.5 -0.10538,15.44802 -0.19017,16.22401 -0.92876,8.5 -0.44704,-4.675 -1.25441,-18.4 -1.79415,-30.5 -0.53975,-12.1 -1.47447,-23.29652 -2.07718,-24.88117 -0.6027,-1.58464 -3.93326,-7.43464 -7.40125,-13 -20.4514,-32.81997 -34.17672,-64.36222 -39.60246,-91.0107 -5.87805,-28.86996 -5.0887,-65.30953 2.07762,-95.91172 2.70648,-11.55746 10.56509,-34.72163 15.30049,-45.09998 1.98341,-4.34697 3.4507,-8.05908 3.26064,-8.24914 -0.19006,-0.19007 -4.16771,6.29154 -8.83921,14.40357 -4.6715,8.11203 -13.58648,23.29914 -19.81106,33.74914 -6.22457,10.45 -15.47138,26.65 -20.54845,36 -10.06837,18.54204 -38.42634,66.21817 -56.78536,95.46899 -6.37555,10.15793 -11.47169,18.58919 -11.32477,18.73612 0.14693,0.14693 5.6112,1.18075 12.14281,2.29739 29.87174,5.10682 59.46362,16.83708 81.98542,32.4991 10.41087,7.23989 25.28532,19.99562 27.80996,23.8487 0.95488,1.45734 1.54962,2.6497 1.32165,2.6497 -0.22797,0 -4.17585,-3.18757 -8.77305,-7.0835 -22.41284,-18.99389 -51.46428,-33.4876 -83.33381,-41.57509 -10.10278,-2.56377 -30.35767,-6.32975 -34.02475,-6.32621 -1.40952,10e-4 -3.30019,2.13987 -6.40388,7.24337 -6.88231,11.31679 -20.60471,31.90563 -31.48626,47.24143 -21.46674,30.25394 -37.41203,49.46624 -58.53441,70.52745 -17.75064,17.69924 -27.93453,26.30398 -43.1431,36.45321 -39.70513,26.49665 -73.55567,32.15623 -98.417297,16.45469 -11.157758,-7.04677 -19.618431,-19.90022 -23.643974,-35.91992 -4.051682,-16.12373 -1.203679,-36.49112 7.685086,-54.95961 6.271855,-13.03126 12.011652,-20.75142 24.824855,-33.39002 29.23348,-28.83511 76.52976,-49.7827 132.11898,-58.51568 23.32564,-3.66442 35.72508,-4.457 61.24906,-3.91506 l 24.24907,0.51486 11.8342,-17.62496 c 20.00609,-29.79553 38.65312,-60.27104 62.18119,-101.62496 15.16094,-26.64749 24.97958,-42.0787 49.65569,-78.04009 4.76887,-6.94985 13.19381,-19.84716 25.18123,-38.54864 6.68568,-10.43027 8.4774,-11.77334 16.86674,-12.64329 6.51701,-0.6758 10.28282,1.36039 10.28282,5.55995 0,1.52999 -2.48709,8.7962 -5.52688,16.14713 -21.99959,53.20023 -34.18693,95.19871 -36.13532,124.52494 l -0.59794,9 7.88007,1.76932 c 9.12982,2.04992 22.398,7.30783 30.22641,11.97812 7.47346,4.45852 20.96351,17.37101 28.24885,27.03938 5.99875,7.96093 15.25166,25.24323 20.19157,37.71318 4.07803,10.29427 10.39466,32.26049 13.65915,47.5 5.28007,24.64878 8.23302,50.28804 11.05661,96 0.57754,9.35 1.48824,23.64669 2.02378,31.77042 0.53554,8.12373 0.9737,15.68778 0.9737,16.80902 0,3.69762 1.97902,0.93173 8.16254,-11.40804 20.46667,-40.84311 55.43205,-103.73258 79.32266,-142.6714 15.14594,-24.68606 44.51552,-66.83202 60.80747,-87.25998 34.56534,-43.34039 73.14806,-79.69041 106.80951,-100.62868 28.3987,-17.66471 51.19231,-25.70801 75.89782,-26.78245 20.8534,-0.90692 32.31585,3.00852 44.74945,15.28586 8.47587,8.36935 12.55292,16.07985 14.36414,27.16538 2.20841,13.51656 -2.19487,32.61729 -12.15349,52.71987 -7.46312,15.06513 -16.80691,28.1991 -28.78234,40.45749 l -9.32224,9.54251 7.18843,-8.5 c 28.66261,-33.89227 40.89123,-68.63607 33.07237,-93.96475 -4.46183,-14.4538 -10.52163,-23.09842 -20.25412,-28.89357 -5.47457,-3.25981 -18.11296,-6.14168 -26.93419,-6.14168 -29.27849,0 -67.44368,18.48496 -104.42801,50.57873 -25.20317,21.87048 -57.19757,58.24992 -83.05571,94.43903 -4.91936,6.88476 -10.40261,14.53476 -12.18501,17 -2.94617,4.07483 -24.1274,36.81447 -33.30695,51.48224 -17.15496,27.41148 -34.68101,57.57041 -64.2141,110.5 -23.28488,41.73147 -30.08996,53.17347 -32.85048,55.23449 -3.71158,2.7711 -11.57083,3.22323 -16.42912,0.94514 z m -413.1806,-12.2147 c 43.66257,-14.60619 92.4258,-60.80651 150.368,-142.46493 10.3989,-14.65526 23.35397,-34.1546 23.35397,-35.15127 0,-0.32019 -13.3875,-0.35081 -29.75,-0.068 -25.60988,0.44258 -32.03257,0.87887 -46.15206,3.1351 -32.99603,5.27263 -53.74699,11.15783 -78.38867,22.23191 -53.52811,24.05576 -86.709264,64.11678 -86.709264,104.68778 0,9.4001 2.695803,20.49663 6.821886,28.08043 5.522185,10.14986 18.516058,20.48514 28.400628,22.58976 7.87602,1.67697 21.94111,0.34277 32.05551,-3.04074 z m 348.86444,-20.96493 c -0.97671,-43.28795 -5.97995,-145.89204 -8.19212,-168 -3.12602,-31.24088 -18.12721,-69.11189 -34.07882,-74.96456 -33.3124,-12.22237 -8.70141,-5.88399 0.3,-1.7253 9.40458,4.34496 27.07661,27.27376 31.15355,40.26954 5.18493,16.52762 8.90291,42.33442 10.6497,73.92032 1.5914,28.77635 2.23847,89.15801 1.23237,115 -0.4925,12.65 -0.97161,19.625 -1.06468,15.5 z m 37.01226,-26.25 c -3.25745,-24.93557 -6.82327,-71.80146 -10.19328,-98.11011 -4.13917,-32.31319 -14.10801,-97.39647 -39.69095,-118.80198 -4.70627,-3.93778 5.6879,2.37758 10.35676,7.4216 20.83616,22.5104 35.20971,97.06088 39.36009,175.74049 1.11698,21.175 2.3182,42.6625 2.66937,47.75 0.35117,5.0875 0.41977,9.25 0.15246,9.25 -0.26731,0 -0.99085,-10.51521 -2.65445,-23.25 z";

// The SVG path uses absolute coords with the group transform translate(-73.33, -247.27)
// So the effective bounding box is approximately:
// x: 73.33 to 73.33+890.6 = 963.9, y: 247.27 to 247.27+446.5 = 693.8
// The path data itself goes from roughly x=73 to x=964, y=247 to y=693
// We use viewBox that covers the actual path extent
const SEAL_VIEWBOX = "73 247 891 447";

export default function EnvelopeCover({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<"idle" | "opening" | "done">("idle");
  const flapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("opening");
  };

  useEffect(() => {
    if (phase !== "opening") return;

    // Step 1: Flap rotates open (0.8s)
    const flap = flapRef.current;
    const seal = sealRef.current;
    const envelope = envelopeRef.current;
    if (!flap || !seal || !envelope) return;

    // Animate seal: crack and fade
    seal.style.transition = "transform 0.4s ease-in, opacity 0.4s ease-in";
    seal.style.transform = "translate(-50%, -50%) scale(1.3)";
    seal.style.opacity = "0";

    // Animate flap: fold backward around top edge
    setTimeout(() => {
      flap.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      flap.style.transform = "rotateX(180deg)";
    }, 200);

    // Step 2: Envelope slides down
    setTimeout(() => {
      envelope.style.transition = "transform 0.7s cubic-bezier(0.4, 0, 0.6, 1), opacity 0.5s ease";
      envelope.style.transform = "translateY(110vh)";
      envelope.style.opacity = "0";
    }, 1100);

    // Step 3: Done
    setTimeout(() => {
      setPhase("done");
      onOpen();
    }, 1700);
  }, [phase, onOpen]);

  if (phase === "done") return null;

  // Envelope dimensions: full viewport
  // Structure:
  //   .envelope-wrap (full screen, perspective container, click handler)
  //     .envelope-body (full screen rectangle — the back/base)
  //       .flap-bottom (static triangle pointing up from bottom)
  //       .flap-left   (static triangle pointing right from left)
  //       .flap-right  (static triangle pointing left from right)
  //       .flap-top    (animated triangle pointing down from top — rotates on top edge)
  //       .wax-seal    (centred at fold line)

  return (
    <div
      ref={envelopeRef}
      onClick={handleClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        cursor: "pointer",
        perspective: "1200px",
        perspectiveOrigin: "50% 50%",
        userSelect: "none",
      }}
    >
      {/* Dark background behind envelope */}
      <div style={{ position: "absolute", inset: 0, background: "#0d1a14" }} />

      {/* Envelope body — the base rectangle */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(160deg, #1e3528 0%, #152a1e 40%, #0f2018 100%)",
          overflow: "hidden",
        }}
      >
        {/* Subtle noise texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />

        {/* Bottom flap — triangle pointing UP from bottom edge */}
        {/* clip-path: polygon from bottom-left corner to bottom-right corner to center */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            background: "linear-gradient(to top, #0a1a10 0%, #142a1a 100%)",
            clipPath: "polygon(0% 100%, 100% 100%, 50% 0%)",
          }}
        />

        {/* Left flap — triangle pointing RIGHT from left edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "50%",
            background: "linear-gradient(to right, #0e2018 0%, #1a3025 100%)",
            clipPath: "polygon(0% 0%, 0% 100%, 100% 50%)",
          }}
        />

        {/* Right flap — triangle pointing LEFT from right edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "50%",
            background: "linear-gradient(to left, #0e2018 0%, #1a3025 100%)",
            clipPath: "polygon(100% 0%, 100% 100%, 0% 50%)",
          }}
        />

        {/* Gold border frame */}
        <div
          style={{
            position: "absolute",
            inset: "16px",
            border: "1px solid rgba(212,175,55,0.35)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "22px",
            border: "1px solid rgba(212,175,55,0.15)",
            pointerEvents: "none",
          }}
        />

        {/* Corner ornaments */}
        {[
          { top: "20px", left: "20px", transform: "rotate(0deg)" },
          { top: "20px", right: "20px", transform: "rotate(90deg)" },
          { bottom: "20px", right: "20px", transform: "rotate(180deg)" },
          { bottom: "20px", left: "20px", transform: "rotate(270deg)" },
        ].map((pos, i) => (
          <svg
            key={i}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            style={{ position: "absolute", ...pos, opacity: 0.5 }}
          >
            <path
              d="M2 2 L14 2 M2 2 L2 14 M2 2 L8 8"
              stroke="#d4af37"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="2" cy="2" r="1.5" fill="#d4af37" />
          </svg>
        ))}

        {/* Top flap — triangle pointing DOWN from top edge, animated */}
        {/* transformOrigin "top center" so it folds backward along the top edge */}
        <div
          ref={flapRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            background: "linear-gradient(to bottom, #1e3528 0%, #162c20 60%, #0f2018 100%)",
            clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
            zIndex: 10,
          }}
        >
          {/* Subtle sheen on flap */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
              clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
            }}
          />
        </div>

        {/* Wax seal — centred at the fold line (50% from top = where flap meets body) */}
        <div
          ref={sealRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90px",
            height: "90px",
            zIndex: 20,
          }}
        >
          {/* Outer glow ring */}
          <div
            style={{
              position: "absolute",
              inset: "-6px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)",
            }}
          />
          {/* Seal disc */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 35%, #9b2335 0%, #7a1a28 50%, #5c1020 100%)",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.6), 0 0 0 2px rgba(212,175,55,0.4), inset 0 1px 3px rgba(255,255,255,0.15)",
            }}
          />
          {/* Aruvi logo path inside seal */}
          <svg
            viewBox={SEAL_VIEWBOX}
            style={{
              position: "absolute",
              inset: "12px",
              width: "calc(100% - 24px)",
              height: "calc(100% - 24px)",
            }}
          >
            <path d={ARUVI_PATH} fill="#d4af37" opacity="0.9" />
          </svg>
        </div>

        {/* Subtle "tap to open" hint at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(212,175,55,0.5)",
            fontSize: "10px",
            letterSpacing: "0.25em",
            fontFamily: "serif",
            textTransform: "uppercase",
            zIndex: 5,
            animation: "pulse 2.5s ease-in-out infinite",
          }}
        >
          tap to open
        </div>
      </div>
    </div>
  );
}
