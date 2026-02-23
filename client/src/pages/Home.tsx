/**
 * DESIGN SYSTEM: "Ink & Marigold"
 * Romantic South Asian Editorial — ivory parchment, saffron gold, deep charcoal
 * Typography: Cormorant Garamond (display) + Lato (body)
 * Layout: Watercolor art hero, cinematic horizontal story scroll, art-illustrated events
 */

import { useEffect, useRef, useState } from "react";
import { MapView } from "@/components/Map";

// ─── CDN Image URLs ────────────────────────────────────────────────────────────
const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/AVdiZBmryFCAlBJN.svg";
const VENUE_PHOTO = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/UKFTelsfibbZjvzA.jpg";

// Hero
const HERO_ART = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/TYtScVlRoVGrefMX.jpg";

// Story chapter images
const IMG_ASU = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/VJIXDMrqMmnSpTLU.jpg";
const IMG_LONGDIST = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/PcPHuIIoKORdpLqN.jpg";
const IMG_NYC = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/UdSUUWAqnvwasgoG.jpg";
const IMG_BAYAREA = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/uUmLugUygeppxyNJ.jpg";
const IMG_ENGAGED = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/DAscLOLuJiFbQDFd.jpg";

// Event images
const IMG_HALDI = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/iVnZxxpKFlZQDSPr.jpg";
const IMG_SANGEET = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/cbAJPzrfWbyuslhp.jpg";
const IMG_WEDDING = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/ndUdcvNfFxOMzYsY.jpg";

// ─── Scroll Reveal Hook ────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) => observer.observe(el));
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
      setT({ days: Math.floor(diff / 86400000), hours: Math.floor((diff / 3600000) % 24), minutes: Math.floor((diff / 60000) % 60), seconds: Math.floor((diff / 1000) % 60) });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return (
    <div className="flex gap-5 md:gap-8 justify-center">
      {([["Days", t.days], ["Hours", t.hours], ["Mins", t.minutes], ["Secs", t.seconds]] as [string, number][]).map(([label, val]) => (
        <div key={label} className="flex flex-col items-center">
          <span className="font-display text-3xl md:text-4xl font-light text-ink tabular-nums leading-none">{String(val).padStart(2, "0")}</span>
          <span className="font-body text-[9px] tracking-[0.25em] uppercase text-taupe mt-0.5">{label}</span>
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
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [{ label: "Our Story", href: "#story" }, { label: "Celebrations", href: "#events" }, { label: "Venue", href: "#venue" }, { label: "RSVP", href: "#rsvp" }];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/97 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-4"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="A&V" className={`transition-all duration-500 object-contain ${scrolled ? "h-10 w-10" : "h-12 w-12"}`} />
          <span className={`font-display text-xl font-medium text-ink transition-all duration-300 ${scrolled ? "opacity-100" : "opacity-80"}`}>Arut & Viba</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <a key={href} href={href} className="font-body text-xs tracking-[0.2em] uppercase text-ink hover:text-saffron transition-colors duration-300">{label}</a>
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

// ─── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    /*
     * Hero strategy: single full-bleed watercolor image.
     * The image has a large clear sky/white zone in the top ~35% of the canvas.
     * We use object-fit:cover + object-position:center bottom so the image always
     * fills the viewport anchored at the bottom (couple & mandap always visible).
     * All text is absolutely positioned inside the top 40vh — always in the sky.
     * The countdown is placed at ~38vh so it sits just below the text block.
     * No gradient overlay needed — the sky is naturally light enough.
     */
    <section id="top" className="relative" style={{ height: "100svh", minHeight: 600 }}>

      {/* Single full-bleed art image — v6 has scene in bottom-right, sky in top-left
          object-position: right bottom keeps the couple always visible */}
      <img
        src={HERO_ART}
        alt="Arut & Viba wedding ceremony"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", objectPosition: "center bottom" }}
      />

      {/* Subtle sky overlay — v13 has a clear pale blue sky in top 80%, just a light tint for text legibility */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "65%",
          background: "linear-gradient(to bottom, rgba(240,248,255,0.55) 0%, rgba(240,248,255,0.35) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── TEXT BLOCK: absolutely positioned in the sky zone (top 8vh) ── */}
      <div
        className="absolute inset-x-0 z-10 flex flex-col items-center text-center px-4"
        style={{ top: "8vh" }}
      >
        {/* Logo */}
        <div className="animate-fade-in" style={{ marginBottom: "-8px" }}>
          <img src={LOGO_URL} alt="A&V monogram" className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 mx-auto drop-shadow-sm" />
        </div>
        {/* Hashtag */}
        <p className="font-display text-base md:text-lg italic text-saffron animate-fade-up delay-100 leading-none mb-2">#aruvi</p>
        {/* Sub-tagline */}
        <p className="font-body text-ink/65 tracking-[0.4em] uppercase text-[10px] md:text-xs mb-2 animate-fade-up delay-200">
          Together with their families
        </p>
        {/* Names */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-ink mb-2 animate-fade-up delay-300 leading-none">
          Arut <em className="text-saffron not-italic">&</em> Viba
        </h1>
        {/* Tagline */}
        <div className="flex items-center justify-center gap-3 mb-2 animate-fade-up delay-400">
          <div className="h-px w-10 bg-ink/20" />
          <p className="font-display text-sm md:text-base text-ink/55 italic">request the honour of your presence</p>
          <div className="h-px w-10 bg-ink/20" />
        </div>
        {/* Date & venue */}
        <p className="font-body text-ink/65 tracking-[0.28em] uppercase text-[10px] md:text-xs mb-0.5 animate-fade-up delay-500">23rd – 24th January 2027</p>
        <p className="font-body text-ink/55 tracking-[0.18em] uppercase text-[10px] md:text-xs mb-4 animate-fade-up delay-500">MGM Beach Resorts · Chennai, Tamil Nadu</p>
        {/* Countdown — frosted glass pill */}
        <div className="animate-fade-up delay-600 bg-white/75 backdrop-blur-md px-6 md:px-8 py-3 md:py-4 border border-white/60 shadow-md">
          <Countdown />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg width="20" height="30" viewBox="0 0 24 36" fill="none" className="opacity-35">
          <rect x="1" y="1" width="22" height="34" rx="11" stroke="#7A6552" strokeWidth="1.5"/>
          <circle cx="12" cy="10" r="3" fill="#7A6552" className="animate-pulse"/>
        </svg>
      </div>
    </section>
  );
}

// ─── Story Section — Cinematic Horizontal Scroll ───────────────────────────────
const storyChapters = [
  {
    year: "2022", city: "Tempe, Arizona", title: "Where It All Began",
    desc: "Two strangers crossed paths at Arizona State University in Tempe. What started as a two-month friendship quickly became something neither could ignore — and before long, they were together.",
    img: IMG_ASU, accent: "#E8A020", bg: "from-amber-50 to-orange-50",
  },
  {
    year: "2022 – 2023", city: "San Francisco & Tempe", title: "Different Cities, Same Heartbeat",
    desc: "Life pulled them apart — one to San Francisco, the other staying in Tempe. But distance only made the heart grow fonder. FaceTime dates, weekend visits, and a thousand 'see you soon' messages kept their story alive across the miles.",
    img: IMG_LONGDIST, accent: "#4a9eca", bg: "from-sky-50 to-blue-50",
  },
  {
    year: "January 2024", city: "New York City", title: "Coast to Coast",
    desc: "A new opportunity brought a new city — New York. The miles multiplied, but so did their commitment. Red-eye flights across the country became their love language, and the Manhattan skyline became a familiar backdrop to their long-distance love.",
    img: IMG_NYC, accent: "#7A6552", bg: "from-stone-50 to-slate-50",
  },
  {
    year: "April 2025", city: "Bay Area, California", title: "Finally, the Same City",
    desc: "After years of counting down the days until the next flight, they finally closed the gap for good. No more red-eyes, no more time zones. Just the same sunrise, the same city, and the Golden Gate glowing in the distance.",
    img: IMG_BAYAREA, accent: "#C4622D", bg: "from-orange-50 to-rose-50",
  },
  {
    year: "August 2025", city: "Bay Area, California", title: "Yes, Forever",
    desc: "In August 2025, under the California sky, they got engaged. After three years, two coasts, and a thousand miles of love — they said yes to forever. The rest, as they say, is history. Now Chennai awaits.",
    img: IMG_ENGAGED, accent: "#D4A853", bg: "from-rose-50 to-pink-50",
  },
];

function StorySection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [inStory, setInStory] = useState(false);
  // Ref to debounce wheel snapping so one wheel tick = one chapter
  const wheelCooldown = useRef(false);
  const activeIdxRef = useRef(0);
  activeIdxRef.current = activeIdx;

  // Scroll to a specific chapter index within the story, or exit to events section.
  // IMPORTANT: always use window.innerHeight (not visualViewport) so the value
  // matches the CSS vh units used for the section height. This keeps scrollToChapter
  // and onScroll in perfect sync.
  const scrollToChapter = (idx: number) => {
    const section = document.getElementById("story-scroll-section");
    if (!section) return;
    const vh = window.innerHeight;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const totalScroll = section.offsetHeight - vh;
    if (idx >= storyChapters.length) {
      // Past last chapter — scroll to events section
      const target = sectionTop + totalScroll + vh + 10;
      window.scrollTo({ top: target, behavior: "smooth" });
    } else if (idx < 0) {
      // Before first chapter — scroll above story section
      window.scrollTo({ top: sectionTop - vh, behavior: "smooth" });
    } else if (idx === storyChapters.length - 1) {
      // Last chapter: overshoot by 20px so progress always reaches 1.0
      // even if innerHeight fluctuates slightly during the smooth scroll
      window.scrollTo({ top: sectionTop + totalScroll + 20, behavior: "smooth" });
    } else {
      // Scroll to the exact position that shows chapter idx
      const progress = idx / (storyChapters.length - 1);
      const target = sectionTop + progress * totalScroll;
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  // Unified scroll-driven approach: works on both mobile and desktop.
  // The section has a tall scroll height so all chapters are naturally
  // encountered as the user scrolls. On desktop the card slides horizontally;
  // on mobile the card cross-fades in place.
  useEffect(() => {
    const section = document.getElementById("story-scroll-section");
    if (!section) return;
    const onScroll = () => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrolled = window.scrollY - sectionTop;
      const totalScroll = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      const newIdx = Math.round(progress * (storyChapters.length - 1));
      setActiveIdx(newIdx);
      // Show side rail only when fully inside the story scroll section
      setInStory(scrolled > 0 && scrolled < totalScroll);
      // Desktop horizontal pan
      if (trackRef.current) {
        const maxTranslate = trackRef.current.scrollWidth - window.innerWidth;
        trackRef.current.style.transform = `translateX(-${progress * maxTranslate}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Desktop wheel snap: intercept wheel events while inside the story section
    // so one scroll tick advances exactly one chapter.
    const onWheel = (e: WheelEvent) => {
      // Only intercept on desktop (pointer: fine)
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrolled = window.scrollY - sectionTop;
      const totalScroll = section.offsetHeight - window.innerHeight;
      // Only intercept when we're inside the story scroll zone
      if (scrolled < -window.innerHeight * 0.1 || scrolled > totalScroll + window.innerHeight * 0.1) return;
      // If at boundaries and scrolling out, let native scroll handle it
      const cur = activeIdxRef.current;
      if (e.deltaY < 0 && cur === 0 && scrolled <= 0) return;
      if (e.deltaY > 0 && cur === storyChapters.length - 1 && scrolled >= totalScroll) return;
      // Prevent native scroll and snap to next/prev chapter
      e.preventDefault();
      if (wheelCooldown.current) return;
      wheelCooldown.current = true;
      const next = e.deltaY > 0 ? cur + 1 : cur - 1;
      scrollToChapter(next);
      setTimeout(() => { wheelCooldown.current = false; }, 700);
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section id="story" className="bg-white">
      {/* Section header */}
      <div className="py-20 text-center reveal">
        <p className="font-body text-saffron tracking-[0.4em] uppercase text-xs mb-4">A Love Story</p>
        <h2 className="font-display text-5xl md:text-6xl text-ink font-light mb-4">Our Story</h2>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-champagne" />
          <div className="w-2 h-2 rounded-full bg-saffron opacity-60" />
          <div className="h-px w-16 bg-champagne" />
        </div>
        <p className="font-body text-taupe max-w-xl mx-auto text-sm leading-relaxed px-6">
          From the Tempe heat to the Bay Area fog — a love story written across time zones, red-eye flights, and a thousand "see you soon"s.
        </p>
        <p className="font-body text-taupe/50 text-xs mt-5 tracking-widest animate-pulse">↓ Scroll to journey through our story</p>
      </div>

      {/*
        Unified scroll-driven story:
        - Desktop: cards slide horizontally as you scroll
        - Mobile: cards cross-fade in a sticky full-screen panel as you scroll
        Both use the same tall scroll container so the user naturally passes
        through every chapter before reaching the next section.
      */}
      {/* ── FIXED side progress rail — only visible when inside the story scroll zone ── */}
      <div
        className="sticky top-1/2 -translate-y-1/2 z-30 pointer-events-none transition-opacity duration-500"
        style={{ marginLeft: "calc(100% - 2.5rem)", height: 0, opacity: inStory ? 1 : 0 }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3 pr-3">
          {storyChapters.map((ch, i) => (
            <div key={i} className="flex items-center gap-2">
              {/* Dot only — no text label on any screen */}
              <div
                className={`rounded-full transition-all duration-500 shadow-sm ${
                  i === activeIdx ? "w-3 h-3" : "w-2 h-2 opacity-40"
                }`}
                style={{ background: i === activeIdx ? ch.accent : "#D4A853", boxShadow: i === activeIdx ? `0 0 8px ${ch.accent}80` : "none" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div id="story-scroll-section" style={{ height: `${storyChapters.length * 120}dvh` }} className="relative">
        <div className="sticky top-0" style={{ height: '100dvh', overflow: 'visible' }}>
          {/* overflow:visible so the fixed side rail isn't clipped */}

          {/* ── MOBILE: cross-fade cards in place ── */}
          <div className="md:hidden relative w-full h-full overflow-hidden">
            {storyChapters.map((chapter, i) => (
              <div
                key={i}
                className={`absolute inset-0 bg-gradient-to-b ${chapter.bg} flex flex-col transition-opacity duration-500`}
                style={{ opacity: i === activeIdx ? 1 : 0, pointerEvents: i === activeIdx ? "auto" : "none" }}
              >
                {/* Image top half — padded by nav bar height (72px) so image is never hidden */}
                <div className="relative flex-shrink-0" style={{ height: "45%", paddingTop: "72px" }}>
                  <img src={chapter.img} alt={chapter.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
                  {/* Year badge — positioned below the nav bar padding */}
                  <div className="absolute left-4 px-3 py-1 text-white text-xs font-body tracking-widest uppercase rounded-full"
                    style={{ background: chapter.accent, top: "80px" }}>
                    {chapter.year}
                  </div>
                  {/* Chapter number watermark */}
                  <div className="absolute bottom-3 right-4 font-display text-6xl font-light leading-none select-none opacity-20 text-white">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                {/* Text bottom half */}
                <div className="flex-1 px-6 pt-5 pb-16 overflow-auto">
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-taupe mb-1">{chapter.city}</p>
                  <h3 className="font-display text-3xl text-ink font-light mb-3 leading-tight">{chapter.title}</h3>
                  <div className="h-px w-10 mb-3" style={{ background: chapter.accent }} />
                  <p className="font-body text-taupe text-sm leading-relaxed">{chapter.desc}</p>
                </div>
                {/* Nav buttons — fixed to bottom of viewport so they never go off-screen */}
                {i === activeIdx && (
                  <div className="fixed bottom-0 inset-x-0 flex items-center justify-center gap-4 pb-safe pb-4 z-40" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)' }}>
                    {/* Up arrow — prev chapter (hidden on first) */}
                    {activeIdx > 0 && (
                      <button
                        onClick={() => scrollToChapter(activeIdx - 1)}
                        className="p-2 rounded-full transition-all duration-200 hover:scale-125 active:scale-95"
                        style={{ background: "transparent" }}
                        aria-label="Previous chapter"
                      >
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <circle cx="14" cy="14" r="13" stroke={chapter.accent} strokeWidth="1" opacity="0.3"/>
                          <path d="M9 16L14 11L19 16" stroke={chapter.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                    {/* Down arrow — next chapter or celebrations */}
                    <button
                      onClick={() => scrollToChapter(activeIdx + 1)}
                      className="p-2 rounded-full transition-all duration-200 hover:scale-125 active:scale-95"
                      style={{ background: "transparent" }}
                      aria-label={activeIdx < storyChapters.length - 1 ? "Next chapter" : "Continue to Celebrations"}
                    >
                      <svg className="animate-bounce" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <circle cx="14" cy="14" r="13" stroke={chapter.accent} strokeWidth="1" opacity="0.3"/>
                        <path d="M9 12L14 17L19 12" stroke={chapter.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── DESKTOP: horizontal pan ── */}
          <div ref={trackRef} className="hidden md:flex h-full will-change-transform" style={{ transition: "transform 0.08s linear", width: `${storyChapters.length * 100}vw` }}>
            {storyChapters.map((chapter, i) => (
              <div key={i} className={`relative flex-shrink-0 w-screen h-screen bg-gradient-to-br ${chapter.bg} flex items-center pt-20`}>
                <div className="max-w-6xl mx-auto px-8 md:px-16 w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                  <div className={`${i % 2 === 0 ? "md:order-2" : "md:order-1"} flex justify-center`}>
                    <div className="relative">
                      <div className="absolute -inset-3 border opacity-20 rounded-sm" style={{ borderColor: chapter.accent }} />
                      <div className="absolute -inset-1.5 border opacity-10 rounded-sm" style={{ borderColor: chapter.accent }} />
                      <img src={chapter.img} alt={chapter.title} className="w-72 h-72 md:w-96 md:h-96 object-cover shadow-2xl"
                        style={{ boxShadow: `0 25px 60px ${chapter.accent}30` }} />
                      <div className="absolute -bottom-4 -right-4 font-display text-7xl font-light leading-none select-none pointer-events-none opacity-10" style={{ color: chapter.accent }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                  <div className={`${i % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                    <p className="font-body text-xs tracking-[0.4em] uppercase mb-1" style={{ color: chapter.accent }}>{chapter.year}</p>
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-taupe mb-4">{chapter.city}</p>
                    <h3 className="font-display text-4xl md:text-5xl text-ink font-light mb-5 leading-tight">{chapter.title}</h3>
                    <div className="h-px w-12 mb-5" style={{ background: chapter.accent }} />
                    <p className="font-body text-taupe text-sm md:text-base leading-relaxed">{chapter.desc}</p>
                  </div>
                </div>
                {/* Desktop nav buttons — prev + next chevrons, no text */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
                  {/* Up — prev chapter (hidden on first) */}
                  {i > 0 && (
                    <button
                      onClick={() => scrollToChapter(i - 1)}
                      className="p-2 rounded-full transition-all duration-200 hover:scale-125 active:scale-95"
                      style={{ background: "transparent" }}
                      aria-label="Previous chapter"
                    >
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="16" r="15" stroke={chapter.accent} strokeWidth="1" opacity="0.3"/>
                        <path d="M10 18L16 12L22 18" stroke={chapter.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                  {/* Down — next chapter or celebrations */}
                  <button
                    onClick={() => scrollToChapter(i + 1)}
                    className="p-2 rounded-full transition-all duration-200 hover:scale-125 active:scale-95"
                    style={{ background: "transparent" }}
                    aria-label={i < storyChapters.length - 1 ? "Next chapter" : "Continue to Celebrations"}
                  >
                    <svg className="animate-bounce" width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="15" stroke={chapter.accent} strokeWidth="1" opacity="0.3"/>
                      <path d="M10 14L16 20L22 14" stroke={chapter.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Events Section ────────────────────────────────────────────────────────────
const events = [
  {
    day: "Day 1", date: "January 23, 2027", name: "Haldi Ceremony", time: "10:30 AM",
    desc: "A joyful celebration of turmeric and blessings. Join us as we paint the couple in golden hues — a cherished ritual that marks the beginning of the wedding festivities.",
    dressCode: "Radiant in Yellow & Orange",
    dressNote: "Embrace the golden hues of turmeric. Think marigold sarees, mustard kurtas, and vibrant orange dupattas. The brighter, the better!",
    img: IMG_HALDI, accent: "#E8A020", textAccent: "text-amber-600",
  },
  {
    day: "Day 1", date: "January 23, 2027", name: "Sangeet & Reception", time: "6:30 PM",
    desc: "An evening of music, dance, and pure celebration under the stars. The DJ will keep the dance floor alive all night — come ready to dance your heart out.",
    dressCode: "Dress to Impress",
    dressNote: "Elegant lehengas, sherwanis, gowns, or cocktail wear — the evening calls for your most glamorous self. Shine bright!",
    img: IMG_SANGEET, accent: "#7A6552", textAccent: "text-stone-600",
  },
  {
    day: "Day 2", date: "January 24, 2027", name: "Wedding Ceremony", time: "11:00 AM",
    desc: "The sacred union of Arut and Viba on the lush lawns of MGM Beach Resorts, with the Bay of Bengal as witness. A ceremony of fire, flowers, and forever.",
    dressCode: "Classic Indian Traditional",
    dressNote: "Honor the sacred ceremony in traditional Indian attire. Silk sarees, dhotis, sherwanis, and traditional jewellery are warmly encouraged.",
    img: IMG_WEDDING, accent: "#C4622D", textAccent: "text-orange-700",
  },
];

function EventsSection() {
  return (
    <section id="events" className="py-24 bg-parchment">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <p className="font-body text-saffron tracking-[0.4em] uppercase text-xs mb-4">Save the Dates</p>
          <h2 className="font-display text-5xl md:text-6xl text-ink font-light mb-4">The Celebrations</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-champagne" />
            <div className="w-2 h-2 rounded-full bg-saffron opacity-60" />
            <div className="h-px w-16 bg-champagne" />
          </div>
        </div>

        <div className="space-y-0">
          {events.map((event, i) => (
            <div key={i} className="reveal overflow-hidden border border-champagne/30 bg-white">
              <div className={`grid md:grid-cols-2 ${i % 2 === 1 ? "" : ""}`}>
                {/* Image panel */}
                <div className={`relative overflow-hidden ${i % 2 === 1 ? "md:order-2" : "md:order-1"}`} style={{ minHeight: "380px" }}>
                  <img src={event.img} alt={event.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-body text-white/90 text-xs tracking-[0.3em] uppercase bg-black/30 backdrop-blur-sm px-3 py-1">{event.day} · {event.time}</span>
                  </div>
                </div>

                {/* Text panel */}
                <div className={`p-8 md:p-12 flex flex-col justify-center ${i % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`font-body text-xs tracking-[0.3em] uppercase ${event.textAccent}`}>{event.date}</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-ink font-light mb-1">{event.name}</h3>
                  <p className="font-body text-sm font-medium text-taupe mb-4 tracking-wide">{event.time}</p>
                  <div className="h-px w-10 mb-4" style={{ background: event.accent }} />
                  <p className="font-body text-taupe text-sm leading-relaxed mb-6">{event.desc}</p>

                  {/* Dress code */}
                  <div className="bg-parchment border border-champagne/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6,1 L7.5,4 L11,4.5 L8.5,7 L9,11 L6,9.5 L3,11 L3.5,7 L1,4.5 L4.5,4 Z" fill="#D4A853" fillOpacity="0.8"/></svg>
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
    <section id="venue" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <p className="font-body text-saffron tracking-[0.4em] uppercase text-xs mb-4">Where We Celebrate</p>
          <h2 className="font-display text-5xl md:text-6xl text-ink font-light mb-4">The Venue</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-champagne" />
            <div className="w-2 h-2 rounded-full bg-saffron opacity-60" />
            <div className="h-px w-16 bg-champagne" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="reveal-left">
            <div className="photo-square shadow-2xl overflow-hidden">
              <img src={VENUE_PHOTO} alt="MGM Beach Resorts Chennai" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          <div className="reveal-right space-y-6">
            <div>
              <h3 className="font-display text-3xl md:text-4xl text-ink font-light mb-1">MGM Beach Resorts</h3>
              <p className="font-body text-taupe text-sm tracking-wider">Muthukadu, East Coast Road, Tamil Nadu</p>
            </div>
            <div className="h-px w-10 bg-saffron" />
            <p className="font-body text-taupe leading-relaxed text-sm">
              We have always dreamed of getting married in the open air, surrounded by lush greenery and the sound of the ocean. MGM Beach Resorts in Muthukadu offers exactly that — sprawling lawns, towering coconut palms, and the Bay of Bengal just steps away.
            </p>
            <blockquote className="border-l-2 border-saffron pl-4">
              <p className="font-display text-lg italic text-ink">"Lush lawns, ocean breezes, and the warmth of Tamil Nadu — the perfect backdrop for a new beginning."</p>
            </blockquote>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-saffron mt-0.5">📍</span>
                <div>
                  <p className="font-body text-sm font-medium text-ink">MGM Beach Resorts, Muthukadu</p>
                  <p className="font-body text-sm text-taupe">East Coast Road, Chennai, Tamil Nadu 603112</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-saffron mt-0.5">📅</span>
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
              { icon: "✈️", title: "From Chennai Airport", desc: "Take the East Coast Road (ECR) heading south. MGM Beach Resorts is approximately 35 km from Chennai International Airport — a scenic 45–60 minute coastal drive." },
              { icon: "🚗", title: "From Chennai City", desc: "Head towards Thiruvanmiyur and join the East Coast Road (ECR). Follow ECR south through Sholinganallur and Palavakkam. MGM Muthukadu is directly on the coastal highway." },
              { icon: "🚌", title: "Public Transport", desc: "MRTS to Thiruvanmiyur, then take ECR bus towards Mahabalipuram. Alight at MGM Muthukadu stop. Cabs and auto-rickshaws are readily available along ECR." },
            ].map((item, i) => (
              <div key={i} className="bg-parchment p-6 border border-champagne/40">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-display text-xl text-ink mb-2">{item.title}</h4>
                <p className="font-body text-taupe text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="shadow-lg overflow-hidden border border-champagne/40" style={{ height: "420px" }}>
            <MapView
              className="w-full h-full"
              initialCenter={{ lat: 12.826301160886903, lng: 80.24829400139232 }}
              initialZoom={16}
              onMapReady={(map) => {
                const location = { lat: 12.826301160886903, lng: 80.24829400139232 };
                const markerEl = document.createElement("div");
                markerEl.style.cssText = "width:22px;height:22px;background:#E8A020;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.35);";
                new google.maps.marker.AdvancedMarkerElement({ position: location, map, title: "MGM Beach Resorts, Muthukadu", content: markerEl });
                const infoWindow = new google.maps.InfoWindow({
                  content: `<div style="font-family:sans-serif;padding:8px;min-width:180px;"><strong style="font-size:14px;color:#1C1410;">MGM Beach Resorts</strong><br/><span style="font-size:11px;color:#7A6552;">Muthukadu, East Coast Road<br/>Chennai, Tamil Nadu</span></div>`,
                });
                infoWindow.open({ map, shouldFocus: false });
              }}
            />
          </div>
          <div className="mt-6 text-center">
            <a href="https://maps.app.goo.gl/KJRJoRZHbFhg8a27A" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-white font-body text-xs tracking-[0.2em] uppercase px-10 py-3.5 hover:bg-sienna transition-colors duration-300">
              Open in Google Maps →
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
    <section id="rsvp" className="py-28 bg-parchment relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <img src={HERO_ART} alt="" className="w-full h-full object-cover object-bottom" />
      </div>
      <div className="absolute inset-0 bg-parchment/70" />
      <div className="max-w-xl mx-auto px-6 text-center relative z-10">
        <div className="reveal">
          <img src={LOGO_URL} alt="A&V" className="w-20 h-20 mx-auto mb-6 opacity-80" />
          <p className="font-body text-saffron tracking-[0.4em] uppercase text-xs mb-4">Join Us</p>
          <h2 className="font-display text-5xl md:text-6xl text-ink font-light mb-4">RSVP</h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-champagne" />
            <div className="w-2 h-2 rounded-full bg-saffron opacity-60" />
            <div className="h-px w-16 bg-champagne" />
          </div>
          <p className="font-body text-taupe leading-relaxed mb-2 text-sm">
            We would be honoured to celebrate this special occasion with you. Please let us know if you can join us by <strong className="text-ink">December 1, 2026</strong>.
          </p>
          <p className="font-body text-taupe/60 text-xs mb-8">Kindly respond at your earliest convenience.</p>
          <a href="#rsvp-form" onClick={(e) => { e.preventDefault(); alert("RSVP form coming soon! Please check back later."); }}
            className="inline-flex items-center gap-3 bg-ink text-white font-body text-xs tracking-[0.3em] uppercase px-12 py-4 hover:bg-sienna transition-colors duration-300">
            RSVP Now →
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
    <footer className="bg-ink py-14 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <img src={LOGO_URL} alt="A&V" className="w-12 h-12 mx-auto mb-4 filter brightness-0 invert opacity-40" />
        <p className="font-display text-3xl text-white/60 italic mb-2">Arut & Viba</p>
        <p className="font-body text-white/35 text-xs tracking-[0.3em] uppercase mb-6">23rd – 24th January 2027 · Chennai</p>
        <div className="h-px bg-white/10 mb-6" />
        <p className="font-display text-4xl md:text-5xl text-saffron italic mb-6">#aruvi</p>
        <div className="h-px bg-white/10 mb-6" />
        <p className="font-body text-white/20 text-xs">Made with love for a love that crossed every time zone.</p>
      </div>
    </footer>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
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
