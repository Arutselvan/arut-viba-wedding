/**
 * DESIGN SYSTEM: "Ink & Marigold"
 * Romantic South Asian Editorial — ivory parchment, saffron gold, deep charcoal
 * Typography: Cormorant Garamond (display) + Lato (body)
 * Layout: Scroll-driven narrative with asymmetric sections and SVG ornaments
 */

import { useEffect, useState } from "react";
import { MapView } from "@/components/Map";

// ─── CDN URLs ─────────────────────────────────────────────────────────────────
const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/UXWIsAVNadjfmIxQ.svg";
const HERO_URL = "https://private-us-east-1.manuscdn.com/sessionFile/0HKKMuEcCJL7yTTQfsbnhc/sandbox/V3P5SVH5lEFIvsd0cCNSdg-img-1_1771820595000_na1fn_aGVyby13ZWRkaW5n.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMEhLS011RWNDSkw3eVRUUWZzYm5oYy9zYW5kYm94L1YzUDVTVkg1bEVGSXZzZDBjQ05TZGctaW1nLTFfMTc3MTgyMDU5NTAwMF9uYTFmbl9hR1Z5YnkxM1pXUmthVzVuLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=edbzOhfdEjfRsvDDbfQoGYsWhU5iITUx5n6kx17IDh9qmsVpQiJHVUWMl77UoLNSsQrJi-QL80bWA5BbuFGE~J-ma4HCday4KCKOBKRfVMuBdGefCApk1rDnhTrbuTK3XHHGOODvw8CyaF03WA5c7zaEOyqzzOfwqWzdrZqRz~upxeT6Hdil5YdneeJeZTEgV1J5tjoJcJo0yHlpLjo7hse5ww9Oo4P1ZvJfzZGDYQOZWgVze55F0t2SzcV6dAqjjEh6RhmWg903wy-Hi9AifOgJof-E1l9WopUORZm3j6bSjK0S~zQ-zA2Xf2t-YXre2dzrM37Lr3CDQesSOA2Mfg__";
const VENUE_URL = "https://private-us-east-1.manuscdn.com/sessionFile/0HKKMuEcCJL7yTTQfsbnhc/sandbox/V3P5SVH5lEFIvsd0cCNSdg-img-2_1771820577000_na1fn_dmVudWUtcGxhY2Vob2xkZXI.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMEhLS011RWNDSkw3eVRUUWZzYm5oYy9zYW5kYm94L1YzUDVTVkg1bEVGSXZzZDBjQ05TZGctaW1nLTJfMTc3MTgyMDU3NzAwMF9uYTFmbl9kbVZ1ZFdVdGNHeGhZMlZvYjJ4a1pYSS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=bcBSfAZKI88clxs-b-kKoHnyEH7Fngu4N99R2sZTyWe7W9Pi9xs7MZqfyBOegThYHKUHA-P7hurHBaVDACYfftvLOINfxayjcb~~1ecvsMLmLCXrfwkCA6HGIXEupQdObWwottKUfCAyg3AJ7orYJdB40LzH6BK~g2sFhGDT6zshN6KnA49OWDczivESxnnXilGFSUxr9qHlu0LzKasFaDd5HY2NAT2dvfKmOh4bUEm31DV9OyU4RC-vkufjUWs2mTH2MbZ-L7pfaBlpMPKXHLKM3S394Y0t4WKfizMKHCsiPmFM~L1Oen1M0u8WJ6TG4p-xLWfhDtQW5rTalTzlWQ__";
const HALDI_BG = "https://private-us-east-1.manuscdn.com/sessionFile/0HKKMuEcCJL7yTTQfsbnhc/sandbox/V3P5SVH5lEFIvsd0cCNSdg-img-3_1771820590000_na1fn_aGFsZGktYmc.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMEhLS011RWNDSkw3eVRUUWZzYm5oYy9zYW5kYm94L1YzUDVTVkg1bEVGSXZzZDBjQ05TZGctaW1nLTNfMTc3MTgyMDU5MDAwMF9uYTFmbl9hR0ZzWkdrdFltYy5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=c5ygG3RL0k0d4-LAoNFIRL6ccmoxgt6w9RgyVbRO6rtMXJnR56OlMawcyTDct1Tw6Fd-7WGVqORyN3YaOSFf~yBzz2cCT~U4RVwxzQ6pExLxMaw65LRbJJyqQ6YHGIxHPKFEYGBaKe6Tv4uHx9hbVyIcc1DCYtYvZFnaNMrjZtuANBhpM3CUUl3UZwHSD50uXBJH7way00m5AY30cxY~OFSttCXBvmnRKw6bM0qbwWUJVA9p2yJVThxdliFT3tQ4W8u5tunKUmMEH4tC~Vzbr7FUNdLNcOLBBjpgom--aAURRP9Yg-SESIdsbBKwjed9P3dZfeCZaMjuL4hhcz-9yw__";
const SANGEET_BG = "https://private-us-east-1.manuscdn.com/sessionFile/0HKKMuEcCJL7yTTQfsbnhc/sandbox/V3P5SVH5lEFIvsd0cCNSdg-img-4_1771820591000_na1fn_c2FuZ2VldC1iZw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMEhLS011RWNDSkw3eVRUUWZzYm5oYy9zYW5kYm94L1YzUDVTVkg1bEVGSXZzZDBjQ05TZGctaW1nLTRfMTc3MTgyMDU5MTAwMF9uYTFmbl9jMkZ1WjJWbGRDMWlady5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=kfMk7jj3Qs25JvaFLuFUlN4FxkRJbl0IaCIP~09mgByEDh~fU87yONX4RnlmGhpwN0okFPclLTVPQyPWpEyhvn~PvGM0C~jLtZqqsBFQnawkXX-XkrHgZPXSNqV1KBnozYv4J6EmjfOawISfO31P3BUKAVS6BNZzbDXWk-EJDhVjQojGw42FeF2dC9QRpFCi4obdh-3dY2eebcsVwKU1A0xvGhxmT1StJ7N7cyjMZPimJ3-J5kRhuQfg8HuE4g1demsdd0~yYm0diNAu1NjluRpDz6X6LOZ34BrUn~ehCehUOAhW6C-TH22zt93r9FYgvnY1zIZgYsOTgaggF2OehA__";

// Couple photos
const PHOTO_SUNSET = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/LyTILIwMvcjRkduW.jpg";
const PHOTO_CAMPFIRE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/fHSuOmAgsdGzndUC.JPG";
const PHOTO_SNOW = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/rSTIEbMBHutginFo.jpg";
const PHOTO_BIRTHDAY = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/WAPjklcWUZaYaDEx.JPG";
const PHOTO_HEIC = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/EBESVtdLtzfanKUu.jpg";

// ─── SVG Components ────────────────────────────────────────────────────────────

const FloralDivider = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 400 40" className={`w-full max-w-xs mx-auto ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="20" x2="160" y2="20" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4"/>
    <circle cx="200" cy="20" r="3" fill="currentColor" fillOpacity="0.6"/>
    <circle cx="185" cy="20" r="1.5" fill="currentColor" fillOpacity="0.4"/>
    <circle cx="215" cy="20" r="1.5" fill="currentColor" fillOpacity="0.4"/>
    <circle cx="173" cy="20" r="1" fill="currentColor" fillOpacity="0.3"/>
    <circle cx="227" cy="20" r="1" fill="currentColor" fillOpacity="0.3"/>
    {/* Petals around center */}
    <ellipse cx="200" cy="12" rx="2" ry="5" fill="currentColor" fillOpacity="0.3" transform="rotate(0 200 20)"/>
    <ellipse cx="200" cy="12" rx="2" ry="5" fill="currentColor" fillOpacity="0.3" transform="rotate(45 200 20)"/>
    <ellipse cx="200" cy="12" rx="2" ry="5" fill="currentColor" fillOpacity="0.3" transform="rotate(90 200 20)"/>
    <ellipse cx="200" cy="12" rx="2" ry="5" fill="currentColor" fillOpacity="0.3" transform="rotate(135 200 20)"/>
    <line x1="240" y1="20" x2="400" y2="20" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4"/>
  </svg>
);

const MangoLeafSvg = () => (
  <svg viewBox="0 0 60 120" className="w-8 h-16 opacity-60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 110 C30 110 5 80 5 50 C5 25 15 10 30 5 C45 10 55 25 55 50 C55 80 30 110 30 110Z" fill="#4a7c59" fillOpacity="0.7"/>
    <line x1="30" y1="5" x2="30" y2="110" stroke="#2d5a3d" strokeWidth="1" strokeOpacity="0.5"/>
    <line x1="30" y1="30" x2="15" y2="45" stroke="#2d5a3d" strokeWidth="0.5" strokeOpacity="0.4"/>
    <line x1="30" y1="30" x2="45" y2="45" stroke="#2d5a3d" strokeWidth="0.5" strokeOpacity="0.4"/>
    <line x1="30" y1="50" x2="12" y2="60" stroke="#2d5a3d" strokeWidth="0.5" strokeOpacity="0.4"/>
    <line x1="30" y1="50" x2="48" y2="60" stroke="#2d5a3d" strokeWidth="0.5" strokeOpacity="0.4"/>
  </svg>
);

const KollamPattern = () => (
  <svg viewBox="0 0 200 200" className="w-24 h-24 opacity-20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1"/>
    <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5"/>
    <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5"/>
    <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="1"/>
    {[0,45,90,135,180,225,270,315].map((angle, i) => (
      <line key={i}
        x1={100 + 20 * Math.cos(angle * Math.PI / 180)}
        y1={100 + 20 * Math.sin(angle * Math.PI / 180)}
        x2={100 + 80 * Math.cos(angle * Math.PI / 180)}
        y2={100 + 80 * Math.sin(angle * Math.PI / 180)}
        stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.6"
      />
    ))}
    {[0,45,90,135,180,225,270,315].map((angle, i) => (
      <circle key={i}
        cx={100 + 60 * Math.cos(angle * Math.PI / 180)}
        cy={100 + 60 * Math.sin(angle * Math.PI / 180)}
        r="4" fill="currentColor" fillOpacity="0.5"
      />
    ))}
  </svg>
);

const WaveDivider = ({ flip = false }: { flip?: boolean }) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} style={{ height: '60px' }}>
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="oklch(0.97 0.015 80)"/>
    </svg>
  </div>
);

// ─── Countdown Component ───────────────────────────────────────────────────────

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2027-01-23T11:00:00+05:30").getTime();
    const tick = () => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-4 md:gap-8 justify-center">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 md:w-24 md:h-24 border border-champagne flex items-center justify-center bg-white/10 backdrop-blur-sm">
              <span className="font-display text-2xl md:text-4xl font-light text-white tabular-nums">
                {String(value).padStart(2, '0')}
              </span>
            </div>
          </div>
          <span className="font-body text-xs tracking-[0.2em] uppercase text-white/70 mt-2">{label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Scroll Reveal Hook ────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: "Our Story", href: "#story" },
    { label: "Events", href: "#events" },
    { label: "Venue", href: "#venue" },
    { label: "Dress Code", href: "#dresscode" },
    { label: "RSVP", href: "#rsvp" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="A&V" className={`transition-all duration-500 ${scrolled ? 'h-8 w-8' : 'h-10 w-10'} object-contain`} />
          <span className={`font-display text-lg font-medium transition-colors duration-300 ${scrolled ? 'text-ink' : 'text-white'}`}>
            Arut & Viba
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <a key={href} href={href}
              className={`nav-link font-body text-sm tracking-wider uppercase transition-colors duration-300 ${
                scrolled ? 'text-ink hover:text-saffron' : 'text-white/90 hover:text-white'
              }`}>
              {label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-2 transition-colors ${scrolled ? 'text-ink' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}/>
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}/>
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-champagne">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map(({ label, href }) => (
              <a key={href} href={href}
                className="font-body text-sm tracking-wider uppercase text-ink hover:text-saffron transition-colors"
                onClick={() => setMenuOpen(false)}>
                {label}
              </a>
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
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={HERO_URL} alt="Wedding mandap" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Decorative corner ornaments */}
      <div className="absolute top-8 left-8 opacity-40">
        <KollamPattern />
      </div>
      <div className="absolute top-8 right-8 opacity-40 rotate-90">
        <KollamPattern />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <img src={LOGO_URL} alt="A&V monogram" className="w-24 h-24 md:w-32 md:h-32 mx-auto filter brightness-0 invert" />
        </div>

        <p className="font-body text-white/80 tracking-[0.4em] uppercase text-sm mb-4 animate-fade-up delay-200">
          Together with their families
        </p>

        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-white mb-4 animate-fade-up delay-300 leading-none">
          Arut <span className="italic text-saffron">&</span> Viba
        </h1>

        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-up delay-400">
          <div className="h-px w-16 bg-white/40" />
          <p className="font-display text-xl md:text-2xl text-white/90 italic">
            request the honour of your presence
          </p>
          <div className="h-px w-16 bg-white/40" />
        </div>

        <p className="font-body text-white/80 tracking-[0.3em] uppercase text-sm mb-2 animate-fade-up delay-500">
          23rd – 24th January 2027
        </p>
        <p className="font-body text-white/70 tracking-[0.2em] uppercase text-xs mb-12 animate-fade-up delay-500">
          MGM Beach Resorts · Chennai, Tamil Nadu
        </p>

        {/* Countdown */}
        <div className="animate-fade-up delay-600">
          <Countdown />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border border-white/50 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-white/70 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Story Section ─────────────────────────────────────────────────────────────

const storyMilestones = [
  {
    year: "2022",
    city: "Tempe, Arizona",
    emoji: "🌵",
    title: "Where It All Began",
    desc: "Two strangers crossed paths at Arizona State University. What started as a two-month friendship in the Tempe heat quickly became something neither could ignore — a connection that would survive every time zone.",
    photo: PHOTO_SNOW,
    photoCaption: "First winter together",
  },
  {
    year: "2022–2023",
    city: "San Francisco ↔ Tempe",
    emoji: "✈️",
    title: "Red-Eye Romance",
    desc: "Life pulled them apart — Arut to San Francisco, Viba staying in Tempe. But distance only made the heart grow fonder. Red-eye flights, FaceTime dates, and a thousand \"see you soon\" messages kept their story alive.",
    photo: PHOTO_SUNSET,
    photoCaption: "Sunset moments together",
  },
  {
    year: "2024",
    city: "New York City",
    emoji: "🗽",
    title: "A New Chapter",
    desc: "January 2024 brought a new adventure — Viba landed a dream job in New York City. The distance grew, but so did their commitment. From coast to coast, they stayed perfectly in sync.",
    photo: PHOTO_CAMPFIRE,
    photoCaption: "Camping under the stars",
  },
  {
    year: "April 2025",
    city: "Bay Area, California",
    emoji: "🌉",
    title: "Closing the Gap",
    desc: "After years of counting down the days until the next flight, Viba moved to the Bay Area. They finally closed the gap for good — no more red-eyes, no more time zones.",
    photo: PHOTO_BIRTHDAY,
    photoCaption: "Celebrating together",
  },
  {
    year: "August 2025",
    city: "Bay Area, California",
    emoji: "💍",
    title: "She Said Yes",
    desc: "In August 2025, Arut got down on one knee. After three years, two coasts, and a thousand miles of love — Viba said yes. The rest, as they say, is history.",
    photo: PHOTO_HEIC,
    photoCaption: "Engaged!",
  },
];

function StorySection() {
  return (
    <section id="story" className="py-24 bg-parchment relative overflow-hidden">
      {/* Background kolam */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
        <KollamPattern />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20 reveal">
          <p className="font-body text-saffron tracking-[0.4em] uppercase text-xs mb-4">A Love Story</p>
          <h2 className="font-display text-5xl md:text-6xl text-ink font-light mb-6">Our Story</h2>
          <FloralDivider className="text-saffron" />
          <p className="font-body text-taupe max-w-2xl mx-auto mt-6 leading-relaxed text-base">
            Arut and Viba's story began as a two-month friendship at ASU in 2022 before life quickly pulled them into a cross-country marathon. Through every time zone and "see you soon," they stayed perfectly in sync.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-champagne to-transparent hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {storyMilestones.map((milestone, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Text side */}
                <div className={`flex-1 ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}`}>
                  <div className={`${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      <span className="text-2xl">{milestone.emoji}</span>
                      <span className="font-body text-xs tracking-[0.3em] uppercase text-saffron">{milestone.year}</span>
                    </div>
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-taupe mb-2">{milestone.city}</p>
                    <h3 className="font-display text-3xl md:text-4xl text-ink font-light mb-4">{milestone.title}</h3>
                    <p className="font-body text-taupe leading-relaxed text-sm md:text-base">{milestone.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex flex-shrink-0 w-4 h-4 rounded-full bg-saffron border-4 border-parchment shadow-sm relative z-10" />

                {/* Photo side */}
                <div className={`flex-1 ${i % 2 === 0 ? 'reveal-right' : 'reveal-left'}`}>
                  <div className="photo-square max-w-sm mx-auto shadow-lg">
                    <img src={milestone.photo} alt={milestone.photoCaption} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="font-display text-white italic text-lg">{milestone.photoCaption}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo grid */}
        <div className="mt-24 reveal">
          <div className="text-center mb-10">
            <p className="font-body text-saffron tracking-[0.4em] uppercase text-xs mb-3">Memories</p>
            <h3 className="font-display text-4xl text-ink font-light">Our Favourite Moments</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {[PHOTO_SUNSET, PHOTO_CAMPFIRE, PHOTO_SNOW, PHOTO_BIRTHDAY, PHOTO_HEIC, PHOTO_SUNSET].map((photo, i) => (
              <div key={i} className="photo-square shadow-sm">
                <img src={photo} alt={`Memory ${i + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-saffron/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Events Section ────────────────────────────────────────────────────────────

function EventsSection() {
  const events = [
    {
      day: "Day 1",
      date: "January 23, 2027",
      events: [
        {
          name: "Haldi Ceremony",
          time: "10:30 AM",
          icon: "🌼",
          desc: "A joyful celebration of turmeric and blessings. Join us as we paint the couple in golden hues before their big day.",
          bg: HALDI_BG,
          dressCode: "Radiant in Yellow & Orange",
        },
        {
          name: "Sangeet & Reception",
          time: "6:30 PM",
          icon: "🎶",
          desc: "An evening of music, dance, and celebration. Dress to impress as we welcome the night with joy and laughter.",
          bg: SANGEET_BG,
          dressCode: "Dress to Impress",
        },
      ],
    },
    {
      day: "Day 2",
      date: "January 24, 2027",
      events: [
        {
          name: "Wedding Ceremony",
          time: "11:00 AM",
          icon: "🪔",
          desc: "The sacred union of Arut and Viba under the open sky by the Bay of Bengal. A ceremony of fire, flowers, and forever.",
          bg: HERO_URL,
          dressCode: "Classic Indian Traditional",
        },
      ],
    },
  ];

  return (
    <section id="events" className="py-24 bg-ink relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10"><KollamPattern /></div>
        <div className="absolute bottom-10 right-10 rotate-180"><KollamPattern /></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <p className="font-body text-saffron tracking-[0.4em] uppercase text-xs mb-4">Save the Dates</p>
          <h2 className="font-display text-5xl md:text-6xl text-white font-light mb-6">The Celebrations</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-champagne/40" />
            <span className="text-champagne text-xl">✦</span>
            <div className="h-px w-16 bg-champagne/40" />
          </div>
        </div>

        <div className="space-y-16">
          {events.map((day, di) => (
            <div key={di} className="reveal">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-champagne/20" />
                <div className="text-center">
                  <p className="font-body text-saffron tracking-[0.3em] uppercase text-xs">{day.day}</p>
                  <p className="font-display text-white text-xl italic">{day.date}</p>
                </div>
                <div className="h-px flex-1 bg-champagne/20" />
              </div>

              <div className={`grid gap-6 ${day.events.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl mx-auto'}`}>
                {day.events.map((event, ei) => (
                  <div key={ei} className="group relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    {/* Background image */}
                    <img src={event.bg} alt={event.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{event.icon}</span>
                        <span className="font-body text-white/70 text-sm tracking-[0.2em] uppercase">{event.time}</span>
                      </div>
                      <h3 className="font-display text-3xl md:text-4xl text-white font-light mb-2">{event.name}</h3>
                      <p className="font-body text-white/70 text-sm leading-relaxed mb-4 max-w-sm">{event.desc}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-saffron text-xs">👗</span>
                        <span className="font-body text-saffron text-xs tracking-wider uppercase">{event.dressCode}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="font-body text-saffron tracking-[0.4em] uppercase text-xs mb-4">Where We Celebrate</p>
          <h2 className="font-display text-5xl md:text-6xl text-ink font-light mb-6">The Venue</h2>
          <FloralDivider className="text-saffron" />
        </div>

        {/* Venue content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="reveal-left">
            <div className="photo-square shadow-xl">
              <img src={VENUE_URL} alt="MGM Beach Resorts Chennai" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2">
                <p className="font-body text-xs text-taupe tracking-wider uppercase">Placeholder — Venue Photo Coming Soon</p>
              </div>
            </div>
          </div>

          <div className="reveal-right space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <MangoLeafSvg />
                <div>
                  <h3 className="font-display text-3xl md:text-4xl text-ink font-light">MGM Beach Resorts</h3>
                  <p className="font-body text-taupe text-sm tracking-wider">Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            <p className="font-body text-taupe leading-relaxed">
              We have always dreamed of getting married in the open air, surrounded by greenery and the sound of the ocean. We are so excited to celebrate with you at MGM Beach Resorts in Chennai, where the lush lawns and the proximity to the water create the natural setting we love.
            </p>

            <div className="border-l-2 border-saffron pl-4">
              <p className="font-display text-xl italic text-ink">
                "Lush lawns, ocean breezes, and the warmth of Tamil Nadu — the perfect backdrop for a new beginning."
              </p>
            </div>

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
        <div id="directions" className="reveal">
          <div className="text-center mb-10">
            <p className="font-body text-saffron tracking-[0.4em] uppercase text-xs mb-3">Getting Here</p>
            <h3 className="font-display text-4xl text-ink font-light">Directions</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: "✈️",
                title: "From Chennai Airport",
                desc: "Take the East Coast Road (ECR) heading south. MGM Beach Resorts is approximately 35 km from Chennai International Airport. The scenic coastal drive takes about 45–60 minutes.",
              },
              {
                icon: "🚗",
                title: "From Chennai City",
                desc: "Head towards Thiruvanmiyur and join the East Coast Road (ECR). Follow ECR south through Sholinganallur and Palavakkam. MGM Muthukadu is directly on the coastal highway.",
              },
              {
                icon: "🚌",
                title: "Public Transport",
                desc: "MRTS to Thiruvanmiyur, then take ECR bus towards Mahabalipuram. Alight at MGM Muthukadu stop. Cabs and auto-rickshaws are readily available along ECR.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 shadow-sm border border-champagne/40">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-display text-xl text-ink mb-2">{item.title}</h4>
                <p className="font-body text-taupe text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="shadow-lg overflow-hidden border border-champagne/40" style={{ height: '400px' }}>
          <MapView
            className="w-full h-full"
            initialCenter={{ lat: 12.8406, lng: 80.2534 }}
            initialZoom={15}
            onMapReady={(map) => {
              const location = { lat: 12.8406, lng: 80.2534 };
              const markerEl = document.createElement('div');
              markerEl.style.cssText = 'width:20px;height:20px;background:#E8A020;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);';
              new google.maps.marker.AdvancedMarkerElement({
                position: location,
                map,
                title: "MGM Beach Resorts, Muthukadu",
                content: markerEl,
              });
              const infoWindow = new google.maps.InfoWindow({
                content: `<div style="font-family: sans-serif; padding: 8px; min-width: 180px;">
                    <strong style="font-size: 15px; color: #1C1410;">MGM Beach Resorts</strong><br/>
                    <span style="font-size: 12px; color: #7A6552;">Muthukadu, East Coast Road<br/>Chennai, Tamil Nadu</span>
                  </div>`,
              });
              infoWindow.open({ map, shouldFocus: false });
            }}
          />
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://maps.google.com/?q=MGM+Beach+Resorts+Muthukadu+Chennai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-white font-body text-sm tracking-[0.2em] uppercase px-8 py-3 hover:bg-sienna transition-colors duration-300"
            >
              <span>Open in Google Maps</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Dress Code Section ────────────────────────────────────────────────────────

function DressCodeSection() {
  const dressCodes = [
    {
      event: "Haldi",
      date: "Jan 23 · 10:30 AM",
      code: "Radiant in Yellow & Orange",
      desc: "Embrace the golden hues of turmeric. Think marigold sarees, mustard kurtas, and vibrant orange dupattas. The brighter, the better!",
      palette: ["#F5C518", "#E8820C", "#F0A500", "#FFD700"],
      icon: "🌼",
      bg: "from-yellow-50 to-orange-50",
      border: "border-yellow-200",
    },
    {
      event: "Sangeet & Reception",
      date: "Jan 23 · 6:30 PM",
      code: "Dress to Impress",
      desc: "This is your moment to shine. Elegant lehengas, sherwanis, gowns, or cocktail wear — the evening calls for your most glamorous self.",
      palette: ["#8B1A4A", "#2C3E7A", "#1A5C3A", "#7B2D8B"],
      icon: "✨",
      bg: "from-rose-50 to-purple-50",
      border: "border-rose-200",
    },
    {
      event: "Wedding",
      date: "Jan 24 · 11:00 AM",
      code: "Classic Indian Traditional",
      desc: "Honor the sacred ceremony in traditional Indian attire. Silk sarees, dhotis, sherwanis, and traditional jewellery are warmly encouraged.",
      palette: ["#8B0000", "#006400", "#B8860B", "#800080"],
      icon: "🪔",
      bg: "from-red-50 to-amber-50",
      border: "border-red-200",
    },
  ];

  return (
    <section id="dresscode" className="py-24 relative overflow-hidden" style={{ background: 'oklch(0.15 0.02 50)' }}>
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, oklch(0.72 0.15 65) 0%, transparent 50%), radial-gradient(circle at 80% 50%, oklch(0.52 0.14 42) 0%, transparent 50%)`
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <p className="font-body text-saffron tracking-[0.4em] uppercase text-xs mb-4">What to Wear</p>
          <h2 className="font-display text-5xl md:text-6xl text-white font-light mb-6">Dress Code</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-champagne/40" />
            <span className="text-champagne text-xl">✦</span>
            <div className="h-px w-16 bg-champagne/40" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {dressCodes.map((item, i) => (
            <div key={i} className={`reveal bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-colors duration-300`}
              style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="text-4xl mb-4">{item.icon}</div>
              <p className="font-body text-saffron text-xs tracking-[0.3em] uppercase mb-1">{item.date}</p>
              <h3 className="font-display text-2xl text-white font-light mb-1">{item.event}</h3>
              <p className="font-display text-lg text-champagne italic mb-4">{item.code}</p>
              <p className="font-body text-white/60 text-sm leading-relaxed mb-6">{item.desc}</p>

              {/* Color palette */}
              <div>
                <p className="font-body text-white/40 text-xs tracking-wider uppercase mb-2">Suggested Palette</p>
                <div className="flex gap-2">
                  {item.palette.map((color, ci) => (
                    <div key={ci} className="w-8 h-8 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: color }} title={color} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RSVP Section ──────────────────────────────────────────────────────────────

function RSVPSection() {
  return (
    <section id="rsvp" className="py-24 bg-parchment relative overflow-hidden">
      {/* Background floral */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
          <KollamPattern />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <div className="reveal">
          <div className="mb-8">
            <img src={LOGO_URL} alt="A&V" className="w-20 h-20 mx-auto mb-6 opacity-80" />
          </div>

          <p className="font-body text-saffron tracking-[0.4em] uppercase text-xs mb-4">Join Us</p>
          <h2 className="font-display text-5xl md:text-6xl text-ink font-light mb-6">RSVP</h2>
          <FloralDivider className="text-saffron" />

          <p className="font-body text-taupe leading-relaxed mt-6 mb-8">
            We would be honoured to celebrate this special occasion with you. Please let us know if you can join us by <strong className="text-ink">December 1, 2026</strong>.
          </p>

          <a
            href="#rsvp-form"
            onClick={(e) => {
              e.preventDefault();
              alert("RSVP form coming soon! Please check back later or reach out to the couple directly.");
            }}
            className="inline-flex items-center gap-3 bg-ink text-white font-body text-sm tracking-[0.3em] uppercase px-12 py-4 hover:bg-sienna transition-colors duration-300 shadow-lg"
          >
            <span>RSVP Now</span>
            <span>→</span>
          </a>

          <p className="font-body text-taupe/60 text-xs mt-4">RSVP form will be available soon</p>
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
        <img src={LOGO_URL} alt="A&V" className="w-12 h-12 mx-auto mb-4 filter brightness-0 invert opacity-60" />
        <p className="font-display text-3xl text-white/80 italic mb-2">Arut & Viba</p>
        <p className="font-body text-white/40 text-xs tracking-[0.3em] uppercase mb-6">23rd – 24th January 2027 · Chennai</p>
        <div className="h-px bg-white/10 mb-6" />
        <p className="font-body text-white/30 text-xs">
          Made with love for a love that crossed every time zone. ✈️
        </p>
      </div>
    </footer>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-parchment">
      <Navigation />
      <HeroSection />
      <StorySection />
      <EventsSection />
      <VenueSection />
      <DressCodeSection />
      <RSVPSection />
      <Footer />
    </div>
  );
}
