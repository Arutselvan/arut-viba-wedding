/*
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
          {links.filter(l => l.label !== "RSVP").map(({ label, href }) => (
            <a key={href} href={href} className="font-body text-xs tracking-[0.2em] uppercase text-ink hover:text-saffron transition-colors duration-300">{label}</a>
          ))}
          <a href="#rsvp" className={`font-body text-xs tracking-[0.2em] uppercase px-5 py-2 border transition-colors duration-300 ${scrolled ? "border-ink text-ink hover:bg-ink hover:text-white" : "border-ink/70 text-ink hover:bg-ink hover:text-white"}`}>RSVP</a>
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
    <section id="top" className="relative" style={{ height: "100svh", minHeight: 600 }}>
      <img
        src={HERO_ART}
        alt="Arut & Viba wedding ceremony"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", objectPosition: "center bottom" }}
      />
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "65%",
          background: "linear-gradient(to bottom, rgba(240,248,255,0.55) 0%, rgba(240,248,255,0.35) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="absolute inset-x-0 z-10 flex flex-col items-center text-center px-4"
        style={{ top: "8vh" }}
      >
        <div className="animate-fade-in" style={{ marginBottom: "-8px" }}>
          <img src={LOGO_URL} alt="A&V monogram" className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 mx-auto drop-shadow-sm" />
        </div>
        <p className="font-display text-base md:text-lg italic text-saffron animate-fade-up delay-100 leading-none mb-2">#aruvi</p>
        <p className="font-body text-ink/65 tracking-[0.4em] uppercase text-[10px] md:text-xs mb-2 animate-fade-up delay-200">
          Together with their families
        </p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-ink mb-2 animate-fade-up delay-300 leading-none">
          Arut <em className="text-saffron not-italic">&</em> Viba
        </h1>
        <div className="flex items-center justify-center gap-3 mb-2 animate-fade-up delay-400">
          <div className="h-px w-10 bg-ink/20" />
          <p className="font-display text-sm md:text-base text-ink/55 italic">request the honour of your presence</p>
          <div className="h-px w-10 bg-ink/20" />
        </div>
        <p className="font-body text-ink/65 tracking-[0.28em] uppercase text-[10px] md:text-xs mb-0.5 animate-fade-up delay-500">23rd – 24th January 2027</p>
        <p className="font-body text-ink/55 tracking-[0.18em] uppercase text-[10px] md:text-xs mb-4 animate-fade-up delay-500">MGM Beach Resorts · Chennai, Tamil Nadu</p>
        <div className="animate-fade-up delay-600 bg-white/75 backdrop-blur-md px-6 md:px-8 py-3 md:py-4 border border-white/60 shadow-md">
          <Countdown />
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg width="20" height="30" viewBox="0 0 24 36" fill="none" className="opacity-35">
          <rect x="1" y="1" width="22" height="34" rx="11" stroke="#7A6552" strokeWidth="1.5"/>
          <circle cx="12" cy="10" r="3" fill="#7A6552" className="animate-pulse"/>
        </svg>
      </div>
    </section>
  );
}

// ─── Story Chapter Data ────────────────────────────────────────────────────────
const storyChapters = [
  {
    year: "2022", city: "Tempe, Arizona", title: "ASU",
    desc: "Met at Arizona State University. Started as friends, became inseparable.",
    img: IMG_ASU, accent: "#E8A020", bg: "from-amber-50 to-orange-50",
  },
  {
    year: "2022 – 2023", city: "San Francisco & Tempe", title: "Long Distance",
    desc: "One moved to San Francisco, the other stayed in Tempe. Made it work across the miles.",
    img: IMG_LONGDIST, accent: "#4a9eca", bg: "from-sky-50 to-blue-50",
  },
  {
    year: "January 2024", city: "New York City", title: "New York",
    desc: "A new job brought a new city. Still managing the distance, still committed.",
    img: IMG_NYC, accent: "#7A6552", bg: "from-stone-50 to-slate-50",
  },
  {
    year: "April 2025", city: "Bay Area, California", title: "Bay Area",
    desc: "Finally in the same city. No more red-eyes, no more time zones.",
    img: IMG_BAYAREA, accent: "#C4622D", bg: "from-orange-50 to-rose-50",
  },
  {
    year: "August 2025", city: "Bay Area, California", title: "Engaged",
    desc: "Got engaged under the California sky. Now heading to Chennai for the celebration.",
    img: IMG_ENGAGED, accent: "#D4A853", bg: "from-rose-50 to-pink-50",
  },
];

// ─── Story Section: Single-view animated vertical timeline ─────────────────────
// All chapters visible at once. Scroll-triggered entrance animations.
// Zero scroll-hijacking. Works identically on all devices.
function TimelineEntry({ ch, i, isLeft }: { ch: typeof storyChapters[0]; i: number; isLeft: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative grid md:grid-cols-[1fr_auto_1fr] grid-cols-[auto_1fr] items-start"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.65s ease ${i * 0.13}s, transform 0.65s ease ${i * 0.13}s`,
      }}
    >
      {/* Desktop left column */}
      <div className="hidden md:flex justify-end pr-10 pt-1">
        {isLeft ? (
          <div className="max-w-xs text-right">
            <p className="font-body text-xs tracking-[0.35em] uppercase mb-1" style={{ color: ch.accent }}>{ch.year}</p>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-taupe mb-3">{ch.city}</p>
            <h3 className="font-display text-3xl text-ink font-light mb-3 leading-tight">{ch.title}</h3>
            <div className="h-px w-10 mb-3 ml-auto" style={{ background: ch.accent }} />
            <p className="font-body text-taupe text-sm leading-relaxed mb-5">{ch.desc}</p>
            <div className="relative w-full h-64 ml-auto">
              <div className="absolute -inset-2 border opacity-20" style={{ borderColor: ch.accent }} />
              <img src={ch.img} alt={ch.title} className="w-full h-full object-cover shadow-2xl" />
            </div>
          </div>
        ) : <div />}
      </div>

      {/* Centre spine */}
      <div className="flex flex-col items-center pr-5 md:pr-0">
        <div
          className="w-4 h-4 rounded-full border-2 bg-white flex-shrink-0 mt-1 z-10"
          style={{ borderColor: ch.accent, boxShadow: `0 0 0 5px ${ch.accent}1a` }}
        />
        {i < storyChapters.length - 1 && (
          <div
            className="w-px mt-1"
            style={{
              minHeight: "120px",
              flex: "1 0 120px",
              background: `linear-gradient(to bottom, ${ch.accent}55, ${storyChapters[i + 1].accent}55)`,
            }}
          />
        )}
      </div>

      {/* Desktop right column */}
      <div className="hidden md:flex justify-start pl-10 pt-1">
        {!isLeft ? (
          <div className="max-w-xs text-left">
            <p className="font-body text-xs tracking-[0.35em] uppercase mb-1" style={{ color: ch.accent }}>{ch.year}</p>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-taupe mb-3">{ch.city}</p>
            <h3 className="font-display text-3xl text-ink font-light mb-3 leading-tight">{ch.title}</h3>
            <div className="h-px w-10 mb-3" style={{ background: ch.accent }} />
            <p className="font-body text-taupe text-sm leading-relaxed mb-5">{ch.desc}</p>
            <div className="relative w-full h-64">
              <div className="absolute -inset-2 border opacity-20" style={{ borderColor: ch.accent }} />
              <img src={ch.img} alt={ch.title} className="w-full h-full object-cover shadow-2xl" />
            </div>
          </div>
        ) : <div />}
      </div>

      {/* Mobile content */}
      <div className="md:hidden pb-10">
        <p className="font-body text-xs tracking-[0.35em] uppercase mb-1" style={{ color: ch.accent }}>{ch.year}</p>
        <p className="font-body text-xs tracking-[0.2em] uppercase text-taupe mb-2">{ch.city}</p>
        <h3 className="font-display text-2xl text-ink font-light mb-2 leading-tight">{ch.title}</h3>
        <div className="h-px w-8 mb-3" style={{ background: ch.accent }} />
        <p className="font-body text-taupe text-sm leading-relaxed mb-4">{ch.desc}</p>
        <div className="relative w-full h-56">
          <div className="absolute -inset-1.5 border opacity-20" style={{ borderColor: ch.accent }} />
          <img src={ch.img} alt={ch.title} className="w-full h-full object-cover shadow-xl" />
        </div>
      </div>
    </div>
  );
}

function StorySection() {
  return (
    <section id="story" className="bg-white py-20 md:py-28">
      <div className="text-center mb-16 md:mb-20 reveal px-6">
        <h2 className="font-display text-5xl md:text-6xl text-ink font-light mb-4">Our Story</h2>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-champagne" />
          <div className="w-2 h-2 rounded-full bg-saffron opacity-60" />
          <div className="h-px w-16 bg-champagne" />
        </div>
        <p className="font-body text-taupe max-w-xl mx-auto text-sm leading-relaxed">
          How we got here.
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {storyChapters.map((ch, i) => (
          <TimelineEntry key={i} ch={ch} i={i} isLeft={i % 2 === 0} />
        ))}
      </div>
    </section>
  );
}

// ─── Events Section ────────────────────────────────────────────────────────────
const events = [
  {
    day: "Day 1", date: "January 23, 2027", name: "Haldi Ceremony", time: "10:00 AM",
    desc: "Turmeric, blessings, and golden vibes. The start of the festivities.",
    dressCode: "Yellow & Orange",
    dressNote: "Wear yellow or orange. The brighter, the better.",
    img: IMG_HALDI, accent: "#E8A020", textAccent: "text-amber-600",
  },
  {
    day: "Day 1", date: "January 23, 2027", name: "Sangeet & Reception", time: "6:30 PM",
    desc: "Music, dance, and celebration. DJ all night.",
    dressCode: "Formal Wear",
    dressNote: "Lehengas, sherwanis, gowns, or cocktail wear.",
    img: IMG_SANGEET, accent: "#7A6552", textAccent: "text-stone-600",
  },
  {
    day: "Day 2", date: "January 24, 2027", name: "Wedding Ceremony", time: "10:30 AM",
    desc: "The ceremony on the lawns of MGM Beach Resorts, overlooking the Bay of Bengal.",
    dressCode: "Indian Traditional",
    dressNote: "Silk sarees, dhotis, sherwanis, and traditional jewellery.",
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
                <div className={`relative overflow-hidden ${i % 2 === 1 ? "md:order-2" : "md:order-1"}`} style={{ minHeight: "380px" }}>
                  <img src={event.img} alt={event.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-body text-white/90 text-xs tracking-[0.3em] uppercase bg-black/30 backdrop-blur-sm px-3 py-1">{event.day} · {event.time}</span>
                  </div>
                </div>
                <div className={`p-8 md:p-12 flex flex-col justify-center ${i % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`font-body text-xs tracking-[0.3em] uppercase ${event.textAccent}`}>{event.date}</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-ink font-light mb-1">{event.name}</h3>
                  <p className="font-body text-sm font-medium text-taupe mb-4 tracking-wide">{event.time}</p>
                  <div className="h-px w-10 mb-4" style={{ background: event.accent }} />
                  <p className="font-body text-taupe text-sm leading-relaxed mb-6">{event.desc}</p>
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
        <p className="font-body text-white/20 text-xs">Made with ❤️ by Arut for Viba</p>
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
