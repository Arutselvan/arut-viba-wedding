/**
 * DESIGN SYSTEM: "Ink & Marigold"
 * Romantic South Asian Editorial — ivory parchment, saffron gold, deep charcoal
 * Typography: Cormorant Garamond (display) + Lato (body)
 * Layout: Watercolor hero, horizontal scroll story, SVG-illustrated events
 */

import { useEffect, useRef, useState } from "react";
import { MapView } from "@/components/Map";

// ─── CDN URLs ─────────────────────────────────────────────────────────────────
const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/UXWIsAVNadjfmIxQ.svg";
const HERO_WATERCOLOR = "https://private-us-east-1.manuscdn.com/sessionFile/0HKKMuEcCJL7yTTQfsbnhc/sandbox/i4PRvb4XxMTUoI0i62MpRn-img-1_1771821504000_na1fn_aGVyby13YXRlcmNvbG9y.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMEhLS011RWNDSkw3eVRUUWZzYm5oYy9zYW5kYm94L2k0UFJ2YjRYeE1UVW9JMGk2Mk1wUm4taW1nLTFfMTc3MTgyMTUwNDAwMF9uYTFmbl9hR1Z5YnkxM1lYUmxjbU52Ykc5eS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Ptbk5xyDGoKQvfzjeg-Z0aKXmJacn45f06MTf1fjo27Hns3S83IwMRtp3YcB4WdmmY9aQMyvX1YnF7CNv0GGqT2Z27RoZBzBqi-r6r1UjapHGxHA-JjwTeUdj0ZT1woMMIWqmebRfLvFd5aTJVPpZv815XZlOMZ22KvcmVpet-iziIWMehPy1Rwh-DYI7KJkNlgkyMNFvPFCp1I4McBX~W3Dg3iUI1OYnKoZIP35oNKvi3e1qH3UvtCvMyxck73dcBoKcLhaeXFyYBMMxXODH3t-igOvP3SCfYZr3hJbmxKDhF-qzdodQwCI0f5NdEsTXaQDhlpX8UNhiA6T~I3Wxg__";
const VENUE_PHOTO = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/UKFTelsfibbZjvzA.jpg";

// ─── Scroll Reveal Hook ────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Countdown ────────────────────────────────────────────────────────────────
function Countdown() {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const target = new Date("2027-01-23T11:00:00+05:30").getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex gap-6 md:gap-10 justify-center">
      {[["Days", t.days], ["Hours", t.hours], ["Mins", t.minutes], ["Secs", t.seconds]].map(([label, val]) => (
        <div key={label as string} className="flex flex-col items-center">
          <span className="font-display text-4xl md:text-5xl font-light text-ink tabular-nums leading-none">
            {String(val).padStart(2, "0")}
          </span>
          <span className="font-body text-[10px] tracking-[0.25em] uppercase text-taupe mt-1">{label as string}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label: "Our Story", href: "#story" },
    { label: "Celebrations", href: "#events" },
    { label: "Venue", href: "#venue" },
    { label: "RSVP", href: "#rsvp" },
  ];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/96 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img src={LOGO_URL} alt="A&V" className={`transition-all duration-500 object-contain ${scrolled ? "h-8 w-8" : "h-10 w-10"}`} style={{ filter: scrolled ? "none" : "none" }} />
          <span className={`font-display text-lg font-medium transition-colors duration-300 ${scrolled ? "text-ink" : "text-ink"}`}>Arut & Viba</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <a key={href} href={href} className="nav-link font-body text-xs tracking-[0.2em] uppercase text-ink hover:text-saffron transition-colors duration-300">{label}</a>
          ))}
        </div>
        <button className="md:hidden p-2 text-ink" onClick={() => setOpen(!open)} aria-label="menu">
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-px bg-current transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-px bg-current transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-current transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white/98 border-t border-champagne">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map(({ label, href }) => (
              <a key={href} href={href} className="font-body text-xs tracking-[0.2em] uppercase text-ink hover:text-saffron" onClick={() => setOpen(false)}>{label}</a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Watercolor background */}
      <div className="absolute inset-0">
        <img src={HERO_WATERCOLOR} alt="" className="w-full h-full object-cover object-center opacity-60" />
      </div>
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40" />

      {/* SVG decorative corner florals */}
      <svg className="absolute top-0 left-0 w-48 md:w-72 opacity-30 pointer-events-none" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10 Q50 30 40 80 Q30 130 80 150" stroke="#C4622D" strokeWidth="1" fill="none" strokeOpacity="0.5"/>
        <circle cx="40" cy="80" r="12" fill="#E8A020" fillOpacity="0.25"/>
        <circle cx="80" cy="150" r="8" fill="#E8A020" fillOpacity="0.2"/>
        <circle cx="10" cy="10" r="5" fill="#C4622D" fillOpacity="0.3"/>
        <ellipse cx="60" cy="50" rx="8" ry="14" fill="#E8A020" fillOpacity="0.2" transform="rotate(-30 60 50)"/>
        <ellipse cx="30" cy="110" rx="6" ry="10" fill="#C4622D" fillOpacity="0.15" transform="rotate(20 30 110)"/>
      </svg>
      <svg className="absolute bottom-0 right-0 w-48 md:w-72 opacity-30 pointer-events-none" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M190 190 Q150 170 160 120 Q170 70 120 50" stroke="#C4622D" strokeWidth="1" fill="none" strokeOpacity="0.5"/>
        <circle cx="160" cy="120" r="12" fill="#E8A020" fillOpacity="0.25"/>
        <circle cx="120" cy="50" r="8" fill="#E8A020" fillOpacity="0.2"/>
        <ellipse cx="140" cy="150" rx="8" ry="14" fill="#E8A020" fillOpacity="0.2" transform="rotate(30 140 150)"/>
        <ellipse cx="170" cy="90" rx="6" ry="10" fill="#C4622D" fillOpacity="0.15" transform="rotate(-20 170 90)"/>
      </svg>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="mb-6 animate-fade-in">
          <img src={LOGO_URL} alt="A&V monogram" className="w-20 h-20 md:w-28 md:h-28 mx-auto" />
        </div>
        <p className="font-body text-taupe tracking-[0.45em] uppercase text-xs mb-5 animate-fade-up delay-200">
          Together with their families
        </p>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-ink mb-3 animate-fade-up delay-300 leading-none">
          Arut <em className="text-saffron not-italic">&</em> Viba
        </h1>
        <div className="flex items-center justify-center gap-4 mb-6 animate-fade-up delay-400">
          <div className="h-px w-12 bg-champagne" />
          <p className="font-display text-lg md:text-xl text-taupe italic">request the honour of your presence</p>
          <div className="h-px w-12 bg-champagne" />
        </div>
        <p className="font-body text-ink/70 tracking-[0.3em] uppercase text-xs mb-1 animate-fade-up delay-500">23rd – 24th January 2027</p>
        <p className="font-body text-taupe tracking-[0.2em] uppercase text-xs mb-12 animate-fade-up delay-500">MGM Beach Resorts · Chennai, Tamil Nadu</p>
        <div className="animate-fade-up delay-600">
          <Countdown />
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce mt-8">
          <svg width="24" height="36" viewBox="0 0 24 36" fill="none" className="opacity-40">
            <rect x="1" y="1" width="22" height="34" rx="11" stroke="#7A6552" strokeWidth="1.5"/>
            <circle cx="12" cy="10" r="3" fill="#7A6552" className="animate-pulse"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

// ─── Story Section — Horizontal Scroll ────────────────────────────────────────

// SVG illustrations for each chapter
const SvgAsu = () => (
  <svg viewBox="0 0 160 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Sun */}
    <circle cx="80" cy="55" r="22" fill="#E8A020" fillOpacity="0.85"/>
    {[0,45,90,135,180,225,270,315].map((a,i)=>(
      <line key={i} x1={80+28*Math.cos(a*Math.PI/180)} y1={55+28*Math.sin(a*Math.PI/180)} x2={80+36*Math.cos(a*Math.PI/180)} y2={55+36*Math.sin(a*Math.PI/180)} stroke="#E8A020" strokeWidth="2" strokeOpacity="0.6"/>
    ))}
    {/* Cactus */}
    <rect x="72" y="90" width="16" height="50" rx="8" fill="#4a7c59" fillOpacity="0.7"/>
    <rect x="52" y="105" width="20" height="10" rx="5" fill="#4a7c59" fillOpacity="0.6"/>
    <rect x="88" y="112" width="20" height="10" rx="5" fill="#4a7c59" fillOpacity="0.6"/>
    <rect x="52" y="95" width="10" height="20" rx="5" fill="#4a7c59" fillOpacity="0.6"/>
    <rect x="98" y="102" width="10" height="20" rx="5" fill="#4a7c59" fillOpacity="0.6"/>
    {/* Ground */}
    <ellipse cx="80" cy="148" rx="40" ry="6" fill="#C4622D" fillOpacity="0.2"/>
    {/* Stars */}
    {[[30,30],[130,25],[20,70],[145,65]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="1.5" fill="#E8A020" fillOpacity="0.5"/>
    ))}
    <text x="80" y="18" textAnchor="middle" fontSize="10" fill="#C4622D" fontFamily="serif" fillOpacity="0.7">ASU · 2022</text>
  </svg>
);

const SvgPlane = () => (
  <svg viewBox="0 0 160 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Sky gradient suggestion */}
    <circle cx="80" cy="80" r="70" fill="#E8F4FD" fillOpacity="0.3"/>
    {/* Clouds */}
    <ellipse cx="40" cy="50" rx="20" ry="10" fill="white" fillOpacity="0.8"/>
    <ellipse cx="55" cy="45" rx="15" ry="10" fill="white" fillOpacity="0.8"/>
    <ellipse cx="120" cy="70" rx="18" ry="9" fill="white" fillOpacity="0.8"/>
    <ellipse cx="135" cy="65" rx="12" ry="8" fill="white" fillOpacity="0.8"/>
    {/* Airplane */}
    <g transform="translate(80,80) rotate(-20)">
      <path d="M-30,0 L30,0 L20,8 L-20,8 Z" fill="#1C1410" fillOpacity="0.7"/>
      <path d="M-5,-2 L20,-2 L20,2 L-5,2 Z" fill="#1C1410" fillOpacity="0.7"/>
      <path d="M-20,0 L-30,12 L-15,8 Z" fill="#1C1410" fillOpacity="0.5"/>
      <path d="M10,0 L5,10 L15,8 Z" fill="#1C1410" fillOpacity="0.5"/>
    </g>
    {/* Dotted flight path */}
    <path d="M20,120 Q80,40 140,100" stroke="#E8A020" strokeWidth="1.5" strokeDasharray="4,4" fill="none" strokeOpacity="0.6"/>
    {/* City dots */}
    <circle cx="20" cy="120" r="5" fill="#C4622D" fillOpacity="0.7"/>
    <circle cx="140" cy="100" r="5" fill="#C4622D" fillOpacity="0.7"/>
    <text x="10" y="135" fontSize="7" fill="#7A6552" fontFamily="serif">Tempe</text>
    <text x="118" y="116" fontSize="7" fill="#7A6552" fontFamily="serif">SF</text>
    <text x="80" y="18" textAnchor="middle" fontSize="10" fill="#C4622D" fontFamily="serif" fillOpacity="0.7">2022 – 2023</text>
  </svg>
);

const SvgNyc = () => (
  <svg viewBox="0 0 160 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Night sky */}
    <rect x="0" y="0" width="160" height="100" fill="#0a0e1a" fillOpacity="0.08" rx="4"/>
    {/* Stars */}
    {[[20,15],[50,8],[90,12],[130,6],[145,20],[10,35],[155,35],[70,5]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="1" fill="#E8A020" fillOpacity="0.7"/>
    ))}
    {/* Skyline */}
    <rect x="10" y="70" width="12" height="70" fill="#1C1410" fillOpacity="0.6"/>
    <rect x="25" y="55" width="10" height="85" fill="#1C1410" fillOpacity="0.7"/>
    <rect x="38" y="65" width="8" height="75" fill="#1C1410" fillOpacity="0.6"/>
    <rect x="50" y="45" width="14" height="95" fill="#1C1410" fillOpacity="0.8"/>
    <rect x="67" y="35" width="12" height="105" fill="#1C1410" fillOpacity="0.85"/>
    <rect x="82" y="50" width="10" height="90" fill="#1C1410" fillOpacity="0.7"/>
    <rect x="95" y="60" width="14" height="80" fill="#1C1410" fillOpacity="0.65"/>
    <rect x="112" y="48" width="10" height="92" fill="#1C1410" fillOpacity="0.75"/>
    <rect x="125" y="58" width="12" height="82" fill="#1C1410" fillOpacity="0.6"/>
    <rect x="140" y="68" width="10" height="72" fill="#1C1410" fillOpacity="0.55"/>
    {/* Windows */}
    {[[53,55],[57,65],[53,75],[57,85],[70,45],[74,55],[70,65],[74,75]].map(([x,y],i)=>(
      <rect key={i} x={x} y={y} width="3" height="4" fill="#E8A020" fillOpacity="0.5"/>
    ))}
    {/* Red-eye flight arc */}
    <path d="M30,90 Q80,30 130,80" stroke="#E8A020" strokeWidth="1.5" strokeDasharray="3,3" fill="none" strokeOpacity="0.7"/>
    <circle cx="30" cy="90" r="4" fill="#C4622D" fillOpacity="0.7"/>
    <circle cx="130" cy="80" r="4" fill="#C4622D" fillOpacity="0.7"/>
    <text x="18" y="100" fontSize="6" fill="#7A6552" fontFamily="serif">SF</text>
    <text x="120" y="95" fontSize="6" fill="#7A6552" fontFamily="serif">NYC</text>
    <text x="80" y="18" textAnchor="middle" fontSize="10" fill="#C4622D" fontFamily="serif" fillOpacity="0.7">New York · 2024</text>
  </svg>
);

const SvgBayArea = () => (
  <svg viewBox="0 0 160 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Golden Gate Bridge simplified */}
    <rect x="0" y="90" width="160" height="70" fill="#4a9eca" fillOpacity="0.1"/>
    {/* Water */}
    <path d="M0,100 Q40,95 80,100 Q120,105 160,100 L160,160 L0,160 Z" fill="#4a9eca" fillOpacity="0.15"/>
    {/* Bridge towers */}
    <rect x="45" y="50" width="8" height="60" fill="#C4622D" fillOpacity="0.7"/>
    <rect x="107" y="50" width="8" height="60" fill="#C4622D" fillOpacity="0.7"/>
    {/* Bridge cables */}
    <path d="M49,55 Q80,75 111,55" stroke="#C4622D" strokeWidth="1.5" fill="none" strokeOpacity="0.6"/>
    <path d="M49,55 Q80,85 111,55" stroke="#C4622D" strokeWidth="1" fill="none" strokeOpacity="0.4"/>
    {/* Vertical cable drops */}
    {[55,62,69,76,83,90,97,104].map((x,i)=>(
      <line key={i} x1={x} y1={55+Math.abs(x-80)*0.3} x2={x} y2={100} stroke="#C4622D" strokeWidth="0.5" strokeOpacity="0.3"/>
    ))}
    {/* Road */}
    <rect x="0" y="98" width="160" height="4" fill="#7A6552" fillOpacity="0.3"/>
    {/* Sun */}
    <circle cx="130" cy="35" r="15" fill="#E8A020" fillOpacity="0.4"/>
    {/* Heart */}
    <path d="M75,130 C75,125 68,120 68,127 C68,132 75,138 75,138 C75,138 82,132 82,127 C82,120 75,125 75,130 Z" fill="#C4622D" fillOpacity="0.7"/>
    <text x="80" y="18" textAnchor="middle" fontSize="10" fill="#C4622D" fontFamily="serif" fillOpacity="0.7">Bay Area · 2025</text>
  </svg>
);

const SvgEngaged = () => (
  <svg viewBox="0 0 160 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ring */}
    <circle cx="80" cy="75" r="35" stroke="#D4A853" strokeWidth="3" fill="none"/>
    <circle cx="80" cy="75" r="28" stroke="#D4A853" strokeWidth="1" fill="none" strokeOpacity="0.4"/>
    {/* Diamond */}
    <polygon points="80,40 95,58 80,68 65,58" fill="#E8A020" fillOpacity="0.9"/>
    <polygon points="80,68 95,58 80,80" fill="#C4622D" fillOpacity="0.6"/>
    <polygon points="80,68 65,58 80,80" fill="#E8A020" fillOpacity="0.7"/>
    <polygon points="80,40 95,58 80,50" fill="white" fillOpacity="0.4"/>
    {/* Sparkles */}
    {[[30,30],[130,25],[25,110],[135,105],[80,15]].map(([x,y],i)=>(
      <g key={i}>
        <line x1={x-5} y1={y} x2={x+5} y2={y} stroke="#E8A020" strokeWidth="1" strokeOpacity="0.7"/>
        <line x1={x} y1={y-5} x2={x} y2={y+5} stroke="#E8A020" strokeWidth="1" strokeOpacity="0.7"/>
      </g>
    ))}
    {/* Floating hearts */}
    {[[40,60],[120,65],[50,120],[110,115]].map(([x,y],i)=>(
      <path key={i} d={`M${x},${y} C${x},${y-4} ${x-5},${y-6} ${x-5},${y-2} C${x-5},${y+2} ${x},${y+5} ${x},${y+5} C${x},${y+5} ${x+5},${y+2} ${x+5},${y-2} C${x+5},${y-6} ${x},${y-4} ${x},${y} Z`} fill="#C4622D" fillOpacity="0.4"/>
    ))}
    <text x="80" y="130" textAnchor="middle" fontSize="10" fill="#C4622D" fontFamily="serif" fillOpacity="0.8">Engaged · Aug 2025</text>
    <text x="80" y="148" textAnchor="middle" fontSize="8" fill="#7A6552" fontFamily="serif" fillOpacity="0.6">Bay Area, California</text>
  </svg>
);

const storyChapters = [
  {
    year: "2022",
    city: "Tempe, Arizona",
    title: "Where It All Began",
    desc: "Two strangers crossed paths at Arizona State University. What started as a two-month friendship in the Tempe heat quickly became something neither could ignore — a connection that would survive every time zone.",
    Svg: SvgAsu,
    color: "#E8A020",
  },
  {
    year: "2022 – 2023",
    city: "San Francisco ↔ Tempe",
    title: "Different Cities, Same Heartbeat",
    desc: "Life pulled them apart — Arut to San Francisco, Viba staying in Tempe. But distance only made the heart grow fonder. FaceTime dates, weekend visits, and a thousand \"see you soon\" messages kept their story alive.",
    Svg: SvgPlane,
    color: "#4a9eca",
  },
  {
    year: "2024",
    city: "New York City ↔ San Francisco",
    title: "Coast to Coast",
    desc: "January 2024 brought a new chapter — Viba moved to New York City for a new opportunity. The miles multiplied, but so did their commitment. Red-eye flights across the country became their love language.",
    Svg: SvgNyc,
    color: "#7A6552",
  },
  {
    year: "April 2025",
    city: "Bay Area, California",
    title: "Finally, the Same City",
    desc: "After years of counting down the days until the next flight, Viba moved to the Bay Area. They finally closed the gap for good — no more red-eyes, no more time zones. Just the same sunrise, together.",
    Svg: SvgBayArea,
    color: "#C4622D",
  },
  {
    year: "August 2025",
    city: "Bay Area, California",
    title: "Yes, Forever",
    desc: "In August 2025, under the California sky, they got engaged. After three years, two coasts, and a thousand miles of love — they said yes to forever. The rest, as they say, is history.",
    Svg: SvgEngaged,
    color: "#D4A853",
  },
];

function StorySection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Horizontal scroll driven by vertical page scroll
  useEffect(() => {
    const section = document.getElementById("story-scroll-section");
    if (!section || !trackRef.current) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrolled = window.scrollY - sectionTop;
      const totalScroll = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));

      if (trackRef.current) {
        const maxTranslate = trackRef.current.scrollWidth - window.innerWidth;
        trackRef.current.style.transform = `translateX(-${progress * maxTranslate}px)`;
        const cardIdx = Math.round(progress * (storyChapters.length - 1));
        setActiveIdx(cardIdx);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="story" className="bg-parchment">
      {/* Section intro — normal scroll */}
      <div className="py-20 text-center reveal">
        <p className="font-body text-saffron tracking-[0.4em] uppercase text-xs mb-4">A Love Story</p>
        <h2 className="font-display text-5xl md:text-6xl text-ink font-light mb-4">Our Story</h2>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-champagne" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" fill="#D4A853"/><circle cx="8" cy="8" r="6" stroke="#D4A853" strokeWidth="0.5" strokeOpacity="0.5"/></svg>
          <div className="h-px w-12 bg-champagne" />
        </div>
        <p className="font-body text-taupe max-w-xl mx-auto text-sm leading-relaxed px-6">
          From the Tempe heat to the Bay Area fog — a love story written across time zones, red-eye flights, and a thousand "see you soon"s.
        </p>
        <p className="font-body text-taupe/60 text-xs mt-4 tracking-wider">Scroll to explore →</p>
      </div>

      {/* Sticky horizontal scroll container */}
      <div id="story-scroll-section" style={{ height: `${storyChapters.length * 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          {/* Progress dots */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {storyChapters.map((_, i) => (
              <div key={i} className={`rounded-full transition-all duration-500 ${i === activeIdx ? "w-6 h-2 bg-saffron" : "w-2 h-2 bg-champagne"}`} />
            ))}
          </div>

          {/* Horizontal track */}
          <div ref={trackRef} className="flex will-change-transform" style={{ transition: "transform 0.05s linear" }}>
            {storyChapters.map((chapter, i) => (
              <div key={i} className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-8 md:px-20">
                <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                  {/* SVG illustration */}
                  <div className={`order-2 md:order-${i % 2 === 0 ? "2" : "1"} flex justify-center`}>
                    <div className="w-48 h-48 md:w-64 md:h-64 relative">
                      {/* Watercolor wash behind SVG */}
                      <div className="absolute inset-0 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${chapter.color} 0%, transparent 70%)` }} />
                      <chapter.Svg />
                    </div>
                  </div>

                  {/* Text */}
                  <div className={`order-1 md:order-${i % 2 === 0 ? "1" : "2"} ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <p className="font-body text-xs tracking-[0.35em] uppercase mb-1" style={{ color: chapter.color }}>{chapter.year}</p>
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-taupe mb-3">{chapter.city}</p>
                    <h3 className="font-display text-3xl md:text-5xl text-ink font-light mb-4 leading-tight">{chapter.title}</h3>
                    <p className="font-body text-taupe text-sm md:text-base leading-relaxed max-w-sm">{chapter.desc}</p>
                    {/* Chapter number */}
                    <p className="font-display text-8xl font-light mt-4 opacity-5 leading-none select-none" style={{ color: chapter.color }}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Events + Dress Code Section ──────────────────────────────────────────────

// SVG for Haldi
const SvgHaldi = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bowl */}
    <ellipse cx="100" cy="130" rx="50" ry="20" fill="#E8A020" fillOpacity="0.3"/>
    <path d="M55,120 Q60,150 100,155 Q140,150 145,120 Z" fill="#E8A020" fillOpacity="0.5"/>
    <ellipse cx="100" cy="120" rx="45" ry="12" fill="#F5C518" fillOpacity="0.6"/>
    {/* Turmeric powder swirl */}
    <path d="M80,118 Q90,112 100,118 Q110,124 120,118" stroke="#C4622D" strokeWidth="1.5" fill="none" strokeOpacity="0.5"/>
    {/* Marigold flowers */}
    {[[60,70],[100,55],[140,70],[80,90],[120,88]].map(([cx,cy],i)=>(
      <g key={i}>
        {[0,45,90,135,180,225,270,315].map((a,j)=>(
          <ellipse key={j} cx={cx+10*Math.cos(a*Math.PI/180)} cy={cy+10*Math.sin(a*Math.PI/180)} rx="5" ry="8" fill="#E8A020" fillOpacity="0.7" transform={`rotate(${a} ${cx+10*Math.cos(a*Math.PI/180)} ${cy+10*Math.sin(a*Math.PI/180)})`}/>
        ))}
        <circle cx={cx} cy={cy} r="5" fill="#F5C518"/>
      </g>
    ))}
    {/* Leaves */}
    <path d="M30,100 Q50,80 70,100" stroke="#4a7c59" strokeWidth="2" fill="none" strokeOpacity="0.6"/>
    <path d="M130,95 Q150,75 170,95" stroke="#4a7c59" strokeWidth="2" fill="none" strokeOpacity="0.6"/>
    {/* Petals falling */}
    {[[45,40],[155,35],[35,60],[165,55]].map(([x,y],i)=>(
      <ellipse key={i} cx={x} cy={y} rx="4" ry="7" fill="#E8A020" fillOpacity="0.4" transform={`rotate(${i*30} ${x} ${y})`}/>
    ))}
  </svg>
);

// SVG for Sangeet
const SvgSangeet = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* String lights */}
    <path d="M10,40 Q50,55 100,40 Q150,25 190,40" stroke="#D4A853" strokeWidth="1" fill="none" strokeOpacity="0.5"/>
    <path d="M10,60 Q50,75 100,60 Q150,45 190,60" stroke="#D4A853" strokeWidth="1" fill="none" strokeOpacity="0.4"/>
    {[20,45,70,95,120,145,170].map((x,i)=>(
      <circle key={i} cx={x} cy={40+Math.sin(i)*5} r="4" fill="#E8A020" fillOpacity="0.8"/>
    ))}
    {[30,55,80,105,130,155,180].map((x,i)=>(
      <circle key={i} cx={x} cy={60+Math.sin(i)*5} r="3" fill="#E8A020" fillOpacity="0.6"/>
    ))}
    {/* Music notes */}
    <g transform="translate(60,90)">
      <circle cx="0" cy="20" r="8" fill="#1C1410" fillOpacity="0.5"/>
      <rect x="8" y="-10" width="3" height="30" fill="#1C1410" fillOpacity="0.5"/>
      <path d="M11,-10 Q25,-5 25,5 Q25,15 11,10" fill="#1C1410" fillOpacity="0.3"/>
    </g>
    <g transform="translate(110,80)">
      <circle cx="0" cy="22" r="8" fill="#1C1410" fillOpacity="0.5"/>
      <rect x="8" y="-8" width="3" height="30" fill="#1C1410" fillOpacity="0.5"/>
      <circle cx="22" cy="20" r="8" fill="#1C1410" fillOpacity="0.5"/>
      <rect x="30" y="-8" width="3" height="30" fill="#1C1410" fillOpacity="0.5"/>
      <line x1="11" y1="-8" x2="33" y2="-8" stroke="#1C1410" strokeWidth="3" strokeOpacity="0.5"/>
    </g>
    {/* Dancers silhouettes */}
    <ellipse cx="75" cy="155" rx="12" ry="25" fill="#1C1410" fillOpacity="0.2"/>
    <circle cx="75" cy="125" r="10" fill="#1C1410" fillOpacity="0.2"/>
    <ellipse cx="125" cy="155" rx="12" ry="25" fill="#1C1410" fillOpacity="0.2"/>
    <circle cx="125" cy="125" r="10" fill="#1C1410" fillOpacity="0.2"/>
    {/* Arms raised */}
    <path d="M63,135 Q50,115 55,105" stroke="#1C1410" strokeWidth="3" strokeOpacity="0.2" fill="none"/>
    <path d="M87,135 Q100,115 95,105" stroke="#1C1410" strokeWidth="3" strokeOpacity="0.2" fill="none"/>
    <path d="M113,135 Q100,115 105,105" stroke="#1C1410" strokeWidth="3" strokeOpacity="0.2" fill="none"/>
    <path d="M137,135 Q150,115 145,105" stroke="#1C1410" strokeWidth="3" strokeOpacity="0.2" fill="none"/>
    {/* Stars */}
    {[[30,80],[170,75],[20,110],[180,105]].map(([x,y],i)=>(
      <g key={i}><line x1={x-4} y1={y} x2={x+4} y2={y} stroke="#E8A020" strokeWidth="1" strokeOpacity="0.5"/><line x1={x} y1={y-4} x2={x} y2={y+4} stroke="#E8A020" strokeWidth="1" strokeOpacity="0.5"/></g>
    ))}
  </svg>
);

// SVG for Wedding
const SvgWedding = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Mandap pillars */}
    <rect x="20" y="80" width="10" height="100" fill="#C4622D" fillOpacity="0.4"/>
    <rect x="170" y="80" width="10" height="100" fill="#C4622D" fillOpacity="0.4"/>
    {/* Mandap top beam */}
    <rect x="15" y="75" width="170" height="10" fill="#C4622D" fillOpacity="0.5"/>
    {/* Marigold garland on top */}
    <path d="M15,80 Q100,95 185,80" stroke="#E8A020" strokeWidth="4" fill="none" strokeOpacity="0.7"/>
    {[25,45,65,85,100,115,135,155,175].map((x,i)=>(
      <circle key={i} cx={x} cy={80+Math.sin((x-15)*Math.PI/170)*8} r="5" fill="#E8A020" fillOpacity="0.8"/>
    ))}
    {/* Sacred fire / diya */}
    <ellipse cx="100" cy="155" rx="15" ry="8" fill="#E8A020" fillOpacity="0.3"/>
    <path d="M93,150 Q100,130 107,150" fill="#E8A020" fillOpacity="0.7"/>
    <path d="M96,148 Q100,135 104,148" fill="#F5C518" fillOpacity="0.9"/>
    {/* Couple silhouettes */}
    <circle cx="82" cy="120" r="10" fill="#1C1410" fillOpacity="0.25"/>
    <ellipse cx="82" cy="145" rx="12" ry="20" fill="#1C1410" fillOpacity="0.2"/>
    <circle cx="118" cy="120" r="10" fill="#1C1410" fillOpacity="0.25"/>
    <ellipse cx="118" cy="145" rx="12" ry="20" fill="#1C1410" fillOpacity="0.2"/>
    {/* Flower petals falling */}
    {[[40,50],[60,35],[140,45],[160,30],[100,25],[75,60],[125,55]].map(([x,y],i)=>(
      <ellipse key={i} cx={x} cy={y} rx="4" ry="7" fill="#E8A020" fillOpacity="0.35" transform={`rotate(${i*25} ${x} ${y})`}/>
    ))}
    {/* Ocean hint */}
    <path d="M0,185 Q50,178 100,185 Q150,192 200,185 L200,200 L0,200 Z" fill="#4a9eca" fillOpacity="0.12"/>
    {/* Sun */}
    <circle cx="160" cy="45" r="18" fill="#E8A020" fillOpacity="0.25"/>
  </svg>
);

const events = [
  {
    day: "Day 1",
    date: "January 23, 2027",
    name: "Haldi Ceremony",
    time: "10:30 AM",
    desc: "A joyful celebration of turmeric and blessings. Join us as we paint the couple in golden hues before their big day.",
    dressCode: "Radiant in Yellow & Orange",
    dressNote: "Embrace the golden hues of turmeric. Think marigold sarees, mustard kurtas, and vibrant orange dupattas.",
    Svg: SvgHaldi,
    accent: "#E8A020",
    bg: "bg-amber-50/60",
  },
  {
    day: "Day 1",
    date: "January 23, 2027",
    name: "Sangeet & Reception",
    time: "6:30 PM",
    desc: "An evening of music, dance, and celebration. Dress to impress as we welcome the night with joy and laughter.",
    dressCode: "Dress to Impress",
    dressNote: "Elegant lehengas, sherwanis, gowns, or cocktail wear — the evening calls for your most glamorous self.",
    Svg: SvgSangeet,
    accent: "#7A6552",
    bg: "bg-stone-50/60",
  },
  {
    day: "Day 2",
    date: "January 24, 2027",
    name: "Wedding Ceremony",
    time: "11:00 AM",
    desc: "The sacred union of Arut and Viba under the open sky by the Bay of Bengal. A ceremony of fire, flowers, and forever.",
    dressCode: "Classic Indian Traditional",
    dressNote: "Honor the sacred ceremony in traditional Indian attire. Silk sarees, dhotis, sherwanis, and traditional jewellery are warmly encouraged.",
    Svg: SvgWedding,
    accent: "#C4622D",
    bg: "bg-orange-50/60",
  },
];

function EventsSection() {
  return (
    <section id="events" className="py-24 bg-white relative overflow-hidden">
      {/* Watercolor wash background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <img src={HERO_WATERCOLOR} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <p className="font-body text-saffron tracking-[0.4em] uppercase text-xs mb-4">Save the Dates</p>
          <h2 className="font-display text-5xl md:text-6xl text-ink font-light mb-4">The Celebrations</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-champagne" />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" fill="#D4A853"/><circle cx="8" cy="8" r="6" stroke="#D4A853" strokeWidth="0.5" strokeOpacity="0.5"/></svg>
            <div className="h-px w-12 bg-champagne" />
          </div>
        </div>

        <div className="space-y-12">
          {events.map((event, i) => (
            <div key={i} className={`reveal ${event.bg} border border-champagne/30 overflow-hidden`}>
              <div className={`grid md:grid-cols-2 gap-0 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                {/* SVG illustration panel */}
                <div className={`flex items-center justify-center p-10 md:p-16 ${i % 2 === 1 ? "md:order-2" : "md:order-1"}`}
                  style={{ background: `radial-gradient(circle at center, ${event.accent}15 0%, transparent 70%)` }}>
                  <div className="w-48 h-48 md:w-56 md:h-56">
                    <event.Svg />
                  </div>
                </div>

                {/* Text panel */}
                <div className={`p-8 md:p-12 flex flex-col justify-center ${i % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-body text-xs tracking-[0.3em] uppercase" style={{ color: event.accent }}>{event.day}</span>
                    <span className="text-champagne">·</span>
                    <span className="font-body text-xs text-taupe">{event.date}</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-ink font-light mb-1">{event.name}</h3>
                  <p className="font-body text-sm font-medium text-taupe mb-4 tracking-wide">{event.time}</p>
                  <p className="font-body text-taupe text-sm leading-relaxed mb-6">{event.desc}</p>

                  {/* Dress code integrated */}
                  <div className="border-t border-champagne/40 pt-5">
                    <div className="flex items-center gap-2 mb-2">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7,1 L9,5 L13,5.5 L10,8.5 L10.5,13 L7,11 L3.5,13 L4,8.5 L1,5.5 L5,5 Z" fill="#D4A853" fillOpacity="0.7"/>
                      </svg>
                      <span className="font-body text-xs tracking-[0.25em] uppercase text-taupe">Dress Code</span>
                    </div>
                    <p className="font-display text-xl text-ink italic mb-1">{event.dressCode}</p>
                    <p className="font-body text-xs text-taupe leading-relaxed">{event.dressNote}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Venue Section ─────────────────────────────────────────────────────────────
function VenueSection() {
  return (
    <section id="venue" className="py-24 bg-parchment relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <p className="font-body text-saffron tracking-[0.4em] uppercase text-xs mb-4">Where We Celebrate</p>
          <h2 className="font-display text-5xl md:text-6xl text-ink font-light mb-4">The Venue</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-champagne" />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" fill="#D4A853"/><circle cx="8" cy="8" r="6" stroke="#D4A853" strokeWidth="0.5" strokeOpacity="0.5"/></svg>
            <div className="h-px w-12 bg-champagne" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="reveal-left">
            <div className="photo-square shadow-xl">
              <img src={VENUE_PHOTO} alt="MGM Beach Resorts Chennai" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="reveal-right space-y-6">
            <div>
              <h3 className="font-display text-3xl md:text-4xl text-ink font-light mb-1">MGM Beach Resorts</h3>
              <p className="font-body text-taupe text-sm tracking-wider">Muthukadu, Tamil Nadu, India</p>
            </div>
            <p className="font-body text-taupe leading-relaxed text-sm">
              We have always dreamed of getting married in the open air, surrounded by greenery and the sound of the ocean. We are so excited to celebrate with you at MGM Beach Resorts in Chennai, where the lush lawns and the proximity to the water create the natural setting we love.
            </p>
            <div className="border-l-2 border-saffron pl-4">
              <p className="font-display text-lg italic text-ink">
                "Lush lawns, ocean breezes, and the warmth of Tamil Nadu — the perfect backdrop for a new beginning."
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-saffron mt-0.5 text-sm">📍</span>
                <div>
                  <p className="font-body text-sm font-medium text-ink">MGM Beach Resorts, Muthukadu</p>
                  <p className="font-body text-sm text-taupe">East Coast Road, Chennai, Tamil Nadu 603112</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-saffron mt-0.5 text-sm">📅</span>
                <div>
                  <p className="font-body text-sm font-medium text-ink">January 23–24, 2027</p>
                  <p className="font-body text-sm text-taupe">Two days of celebration by the sea</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Directions */}
        <div className="reveal">
          <div className="text-center mb-10">
            <p className="font-body text-saffron tracking-[0.4em] uppercase text-xs mb-3">Getting Here</p>
            <h3 className="font-display text-4xl text-ink font-light">Directions</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: "✈️", title: "From Chennai Airport", desc: "Take the East Coast Road (ECR) heading south. MGM Beach Resorts is approximately 35 km from Chennai International Airport. The scenic coastal drive takes about 45–60 minutes." },
              { icon: "🚗", title: "From Chennai City", desc: "Head towards Thiruvanmiyur and join the East Coast Road (ECR). Follow ECR south through Sholinganallur and Palavakkam. MGM Muthukadu is directly on the coastal highway." },
              { icon: "🚌", title: "Public Transport", desc: "MRTS to Thiruvanmiyur, then take ECR bus towards Mahabalipuram. Alight at MGM Muthukadu stop. Cabs and auto-rickshaws are readily available along ECR." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 shadow-sm border border-champagne/40">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-display text-xl text-ink mb-2">{item.title}</h4>
                <p className="font-body text-taupe text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="shadow-lg overflow-hidden border border-champagne/40" style={{ height: "400px" }}>
            <MapView
              className="w-full h-full"
              initialCenter={{ lat: 12.826301160886903, lng: 80.24829400139232 }}
              initialZoom={16}
              onMapReady={(map) => {
                const location = { lat: 12.826301160886903, lng: 80.24829400139232 };
                const markerEl = document.createElement("div");
                markerEl.style.cssText = "width:22px;height:22px;background:#E8A020;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.35);";
                new google.maps.marker.AdvancedMarkerElement({
                  position: location,
                  map,
                  title: "MGM Beach Resorts, Muthukadu",
                  content: markerEl,
                });
                const infoWindow = new google.maps.InfoWindow({
                  content: `<div style="font-family:sans-serif;padding:8px;min-width:180px;">
                    <strong style="font-size:14px;color:#1C1410;">MGM Beach Resorts</strong><br/>
                    <span style="font-size:11px;color:#7A6552;">Muthukadu, East Coast Road<br/>Chennai, Tamil Nadu</span>
                  </div>`,
                });
                infoWindow.open({ map, shouldFocus: false });
              }}
            />
          </div>
          <div className="mt-6 text-center">
            <a href="https://maps.google.com/?q=12.826301160886903,80.24829400139232" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-white font-body text-xs tracking-[0.2em] uppercase px-8 py-3 hover:bg-sienna transition-colors duration-300">
              Open in Google Maps <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── RSVP Section ──────────────────────────────────────────────────────────────
function RSVPSection() {
  return (
    <section id="rsvp" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <img src={HERO_WATERCOLOR} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-xl mx-auto px-6 text-center relative z-10">
        <div className="reveal">
          <img src={LOGO_URL} alt="A&V" className="w-16 h-16 mx-auto mb-6 opacity-70" />
          <p className="font-body text-saffron tracking-[0.4em] uppercase text-xs mb-4">Join Us</p>
          <h2 className="font-display text-5xl md:text-6xl text-ink font-light mb-4">RSVP</h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-champagne" />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" fill="#D4A853"/><circle cx="8" cy="8" r="6" stroke="#D4A853" strokeWidth="0.5" strokeOpacity="0.5"/></svg>
            <div className="h-px w-12 bg-champagne" />
          </div>
          <p className="font-body text-taupe leading-relaxed mb-2 text-sm">
            We would be honoured to celebrate this special occasion with you. Please let us know if you can join us by <strong className="text-ink">December 1, 2026</strong>.
          </p>
          <p className="font-body text-taupe/60 text-xs mb-8">Kindly respond at your earliest convenience.</p>
          <a href="#rsvp-form" onClick={(e) => { e.preventDefault(); alert("RSVP form coming soon! Please check back later."); }}
            className="inline-flex items-center gap-3 bg-ink text-white font-body text-xs tracking-[0.3em] uppercase px-12 py-4 hover:bg-sienna transition-colors duration-300">
            RSVP Now <span>→</span>
          </a>
          <p className="font-body text-taupe/50 text-xs mt-4">RSVP form will be available soon</p>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-ink py-12 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <img src={LOGO_URL} alt="A&V" className="w-10 h-10 mx-auto mb-4 filter brightness-0 invert opacity-50" />
        <p className="font-display text-3xl text-white/70 italic mb-2">Arut & Viba</p>
        <p className="font-body text-white/40 text-xs tracking-[0.3em] uppercase mb-6">23rd – 24th January 2027 · Chennai</p>
        <div className="h-px bg-white/10 mb-6" />
        <p className="font-body text-white/25 text-xs">Made with love for a love that crossed every time zone.</p>
      </div>
    </footer>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <StorySection />
      <EventsSection />
      <VenueSection />
      <RSVPSection />
      <Footer />
    </div>
  );
}
