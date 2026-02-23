/**
 * DESIGN SYSTEM: "Ink & Marigold"
 * Romantic South Asian Editorial — ivory parchment, saffron gold, deep charcoal
 * Typography: Cormorant Garamond (display) + Lato (body)
 * Layout: Watercolor art hero, cinematic horizontal story scroll, art-illustrated events
 */

import { useEffect, useRef, useState } from "react";
import { MapView } from "@/components/Map";

// ─── CDN Image URLs ────────────────────────────────────────────────────────────
const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/UXWIsAVNadjfmIxQ.svg";
const VENUE_PHOTO = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/UKFTelsfibbZjvzA.jpg";

// Hero
const HERO_ART = "https://private-us-east-1.manuscdn.com/sessionFile/0HKKMuEcCJL7yTTQfsbnhc/sandbox/rYl6AY77yOQ6EEYEtD2PQu-img-1_1771823200000_na1fn_aGVyby1hcnQtdjM.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMEhLS011RWNDSkw3eVRUUWZzYm5oYy9zYW5kYm94L3JZbDZBWTc3eU9RNkVFWUV0RDJQUXUtaW1nLTFfMTc3MTgyMzIwMDAwMF9uYTFmbl9hR1Z5YnkxaGNuUXRkak0uanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=mm4BbYymYhTw0HxUP-F8k7Yvs~~2BPInwwC~BDsz7vWoT6rimH1fH~HOoCQ-NrSQkOIk1Ky0pC~z~2GOMOLyDpTNLtt1G0wTaDetQF-Mcp~ubt~ojyEb1kLNjrsg2ISJ4783cOE1jbBaKSYLn67qzm7OVhlyac2N9ymRZr3IABneHjkCYg-TxBxi2aNJmJSE-wL-rbPnsAWFRXOMoKKUcDxdIA0~WiKD~k92yt3ZVfpra-fha7hQBKWi3vV-RasKpY-VQb8MtvCLLvBJg8a83zBeZV8knswWFyWBn~DLJs~~ni8qNPZ2LwbAMFNLU-WaUx5GHRjruV50ToVBHKfgFg__";

// Story chapter images
const IMG_ASU = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/VJIXDMrqMmnSpTLU.jpg";
const IMG_LONGDIST = "https://private-us-east-1.manuscdn.com/sessionFile/0HKKMuEcCJL7yTTQfsbnhc/sandbox/IZ8kQ7JCzNizLjK5AzkJ0n-img-2_1771822345000_na1fn_c3RvcnktbG9uZ2Rpc3RhbmNl.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMEhLS011RWNDSkw3eVRUUWZzYm5oYy9zYW5kYm94L0laOGtRN0pDek5pekxqSzVBemtKMG4taW1nLTJfMTc3MTgyMjM0NTAwMF9uYTFmbl9jM1J2Y25rdGJHOXVaMlJwYzNSaGJtTmwuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=pkmH5AKjs4WypAuortpuXN8gdQcsvg6k4oIlxbVORGQmoRUM6tt30FXMY4wkLCKYZB032KY~pWjpZNg2U2KBZY8Srk6bxanfBLLphpFmQPIkEJolBPo93iBS3GYLrqpzxYOoMo~UUuU1O9ERUStbElDG4pjsvcJ4FAqfbQ97uPu170G1JSBCVL~hHh8O1JSHVwOIf18KY~tDJ91kgYSjTKCY3suXl-ykv~qCiIFkvQst9qpRicJT5j0DdXTnli8NpYaA8gHmnFbOThKAKnBoQXHdJ2fuhWSIsHkWU8J0RdGadlpBnknVMorx7JS98PuIQ2xayiQYuryOx-Opt0kCEQ__";
const IMG_NYC = "https://private-us-east-1.manuscdn.com/sessionFile/0HKKMuEcCJL7yTTQfsbnhc/sandbox/IZ8kQ7JCzNizLjK5AzkJ0n-img-3_1771822348000_na1fn_c3Rvcnktbnlj.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMEhLS011RWNDSkw3eVRUUWZzYm5oYy9zYW5kYm94L0laOGtRN0pDek5pekxqSzVBemtKMG4taW1nLTNfMTc3MTgyMjM0ODAwMF9uYTFmbl9jM1J2Y25rdGJubGouanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=sa3jOFkAZFi63T9AVXR54EZCbSAsBObhXV95TZdbGQ5Ya0uNW3l~nt7dsqBvgdtd-2m7LejcTjVLGQCsmQT9PaVQ67hOtOT6AbXPW1NtgGCAdDVjcxGdqs3ssYonkjnsv2O6-RGQXoEr56Iue1ce0NnLUUZv~CeXgeYOyQRhygXt8-ogjTIkUmB5mE2zep8XJz9zr2On8uPp1VlKGERmEFQ~ci8zVhNM-dPvd~vOhrWdt~Mq2db2Ffpc1TQPl75NTvOyGhSBMhmdt0gw3tklQ9ZeFfN2oM-e1TLYqJNQ4gy9vW6weK9hPZbmvZruZjzHMDFvoGFxNdt1WxAPqLifeQ__";
const IMG_BAYAREA = "https://private-us-east-1.manuscdn.com/sessionFile/0HKKMuEcCJL7yTTQfsbnhc/sandbox/iIvBqRGE6LbR6pZtXFdmoV-img-1_1771823090000_na1fn_c3RvcnktYmF5YXJlYS12Mw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMEhLS011RWNDSkw3eVRUUWZzYm5oYy9zYW5kYm94L2lJdkJxUkdFNkxiUjZwWnRYRmRtb1YtaW1nLTFfMTc3MTgyMzA5MDAwMF9uYTFmbl9jM1J2Y25rdFltRjVZWEpsWVMxMk13LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=oxW5nvWCIQ73V~y7hK1RjOVAiYli~Vg18dw12nzYc6rVfu9a~1DIdPzHQjzls6vnnEMmat59kJpIbm4sa2~3oYzwD2OskNQPgN3fx2r9Okc7WkPL-mB7H0Hcf-XIE8~3D8M87CNZ2AQgSpBGACPuHZ69S1v4es57djKpHxePxgKsmjt8vMWCEbf-yafodbA804eZcLhXkdA-WJwiDZdnaVO8yRNIs-gpMpBABhqlXOaVua21d~WSGiuIIQVia5JNsETa5rcHAeaT-JvVliUzumg9mkBqBv0~phBrN7Ix7cxm-jAf18G1X4mg~fhRNUqao0a-S28jFy-Zp3PVoHIv-w__";
const IMG_ENGAGED = "https://private-us-east-1.manuscdn.com/sessionFile/0HKKMuEcCJL7yTTQfsbnhc/sandbox/iIvBqRGE6LbR6pZtXFdmoV-img-2_1771823101000_na1fn_c3RvcnktZW5nYWdlZC12Mw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMEhLS011RWNDSkw3eVRUUWZzYm5oYy9zYW5kYm94L2lJdkJxUkdFNkxiUjZwWnRYRmRtb1YtaW1nLTJfMTc3MTgyMzEwMTAwMF9uYTFmbl9jM1J2Y25rdFpXNW5ZV2RsWkMxMk13LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=uFZtVOyp6pIVUVdk7YrBggUd5DDiBpRa1w8bbzwnc6v~9vOroMn9w0qsD48GlSyoUswNWpWcvp18~sKRW3ucqip7RouEsVOsjpqdOGgGLOQuAfwH~GancM9raIPEPaHZR59zpQ78tSF8wjdCgLteq3h86beoUyO5heYxHq0qsntrYm5-xkHS-Z3PiKwPpCTXgQpzZAsLEP9Pboy2rrliTl4qQ0cZYfUmhjKb3QF6sC8uXXwa5yhCkNXed9G7dtNbLrMhyV36qT4jGbCdnL3cxcR0RnV31UU2cPP1G4ONw3kpvMMgG4oTJvQNcodce1NQyBT8lA62VpgsZ06xz7SPLA__";

// Event images
const IMG_HALDI = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663320933082/iVnZxxpKFlZQDSPr.jpg";
const IMG_SANGEET = "https://private-us-east-1.manuscdn.com/sessionFile/0HKKMuEcCJL7yTTQfsbnhc/sandbox/iIvBqRGE6LbR6pZtXFdmoV-img-4_1771823086000_na1fn_ZXZlbnQtc2FuZ2VldC12Mg.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMEhLS011RWNDSkw3eVRUUWZzYm5oYy9zYW5kYm94L2lJdkJxUkdFNkxiUjZwWnRYRmRtb1YtaW1nLTRfMTc3MTgyMzA4NjAwMF9uYTFmbl9aWFpsYm5RdGMyRnVaMlZsZEMxMk1nLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Fmfs9BYSh33iLkPFzaipm6vw4jHoR5u-4x3ACqIKmMFvRFUsfj7Xc5itHTyuK1r8QyiOQFhmRQuF52Cxtwpt6wngD7tAsaHid0OjcENOz2~5Z~pLEsuU5TQcdQfeltyT13VzTOPZip4aeNwXXaa5pI5LT7rLXcwNgESq6lO4ruTRSuqx797tNgOMi44-r63IIWPfArQ5~9Ew95wFzkyR4U4uXwnImf9bd8d1a8TQQe2RB2w-pwczHKKsxJjXiY49g45XYLAJ5ithGM0gFKoCSZ7A7k3P9nrOZOlJdrx~s8aRdzolr4YYsaUGr5E4nNvvQKj5GUfZrMnsPDw0uqUK0A__";
const IMG_WEDDING = "https://private-us-east-1.manuscdn.com/sessionFile/0HKKMuEcCJL7yTTQfsbnhc/sandbox/iIvBqRGE6LbR6pZtXFdmoV-img-5_1771823090000_na1fn_ZXZlbnQtd2VkZGluZy12Mg.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMEhLS011RWNDSkw3eVRUUWZzYm5oYy9zYW5kYm94L2lJdkJxUkdFNkxiUjZwWnRYRmRtb1YtaW1nLTVfMTc3MTgyMzA5MDAwMF9uYTFmbl9aWFpsYm5RdGQyVmtaR2x1WnkxMk1nLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=i2qY3VELGdRl7hlBV1X2vklZcfy~FD8zSXjv~ZQMMqh9sWE9ZLLlvAMJMtGzPPpj5isfcR2dCC3azX9QC2uDDPSYRgDE4T-hmiU~LbF8SHVU6h~tcxjH53LIo1PVWBpWaFJZwYs2kcJjbeOSf5RU8bTlF71yKcMU6j3v~LWiYM7UbEkbtoJ0V9OIU00ls6E22QuPGUYMu5SCW~9tzdxDRwUsmqdtg6xXGnuchvi4aYLVojfg6r68DvUkLLkwWMAxaKxxLLGKlykZJXRLBFV0igHVEhAtvv~ltjeKd0zHoSHTVdHJA5lgSbIHr7LXmzSsYLEoDlzlCqpXT7fQFdSD8Q__";

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
    <div className="flex gap-6 md:gap-10 justify-center">
      {([["Days", t.days], ["Hours", t.hours], ["Mins", t.minutes], ["Secs", t.seconds]] as [string, number][]).map(([label, val]) => (
        <div key={label} className="flex flex-col items-center">
          <span className="font-display text-5xl md:text-6xl font-light text-ink tabular-nums leading-none">{String(val).padStart(2, "0")}</span>
          <span className="font-body text-[10px] tracking-[0.25em] uppercase text-taupe mt-1">{label}</span>
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
    <section id="top" className="relative overflow-hidden bg-white" style={{ minHeight: "100svh" }}>
      {/* Layout: top ~45% = text zone (white), bottom ~55% = art */}
      
      {/* Art image — fills full width, positioned at bottom, height auto to avoid cropping */}
      <div className="absolute inset-x-0 bottom-0" style={{ top: "clamp(380px, 54%, 58%)" }}>
        <img
          src={HERO_ART}
          alt="Arut & Viba wedding ceremony"
          className="w-full h-full object-contain object-bottom"
          style={{ objectPosition: "center bottom" }}
        />
        {/* Soft fade at the top edge of art to blend with white */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent" />
      </div>

      {/* Text content — sits in the white top zone */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-20 md:pt-24 px-6 text-center pb-8">
        {/* Large Logo */}
        <div className="mb-2 animate-fade-in">
          <img src={LOGO_URL} alt="A&V monogram" className="w-24 h-24 md:w-32 md:h-32 mx-auto drop-shadow-sm" />
        </div>
        {/* Hashtag directly below logo */}
        <p className="font-display text-xl italic text-saffron/80 mb-3 animate-fade-up delay-100">#aruvi</p>
        <p className="font-body text-taupe tracking-[0.45em] uppercase text-xs mb-3 animate-fade-up delay-200">
          Together with their families
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-ink mb-3 animate-fade-up delay-300 leading-none">
          Arut <em className="text-saffron not-italic">&</em> Viba
        </h1>
        <div className="flex items-center justify-center gap-4 mb-4 animate-fade-up delay-400">
          <div className="h-px w-12 bg-champagne" />
          <p className="font-display text-base md:text-lg text-taupe italic">request the honour of your presence</p>
          <div className="h-px w-12 bg-champagne" />
        </div>
        <p className="font-body text-ink/70 tracking-[0.3em] uppercase text-xs mb-1 animate-fade-up delay-500">23rd – 24th January 2027</p>
        <p className="font-body text-taupe tracking-[0.2em] uppercase text-xs mb-6 animate-fade-up delay-500">MGM Beach Resorts · Chennai, Tamil Nadu</p>
        <div className="animate-fade-up delay-600 bg-white/80 backdrop-blur-sm px-8 py-4 border border-champagne/50">
          <Countdown />
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg width="20" height="30" viewBox="0 0 24 36" fill="none" className="opacity-40">
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
    desc: "Two strangers crossed paths at Arizona State University in Tempe. What started as a two-month friendship quickly became something neither could ignore — and before long, they were dating.",
    img: IMG_ASU, accent: "#E8A020", bg: "from-amber-50 to-orange-50",
  },
  {
    year: "2022 – 2023", city: "San Francisco ↔ Tempe", title: "Different Cities, Same Heartbeat",
    desc: "Life pulled them apart — one to San Francisco, the other staying in Tempe. But distance only made the heart grow fonder. FaceTime dates, weekend visits, and a thousand 'see you soon' messages kept their story alive across the miles.",
    img: IMG_LONGDIST, accent: "#4a9eca", bg: "from-sky-50 to-blue-50",
  },
  {
    year: "January 2024", city: "New York City ↔ San Francisco", title: "Coast to Coast",
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

  useEffect(() => {
    const section = document.getElementById("story-scroll-section");
    if (!section || !trackRef.current) return;
    const onScroll = () => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrolled = window.scrollY - sectionTop;
      const totalScroll = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      if (trackRef.current) {
        const maxTranslate = trackRef.current.scrollWidth - window.innerWidth;
        trackRef.current.style.transform = `translateX(-${progress * maxTranslate}px)`;
        setActiveIdx(Math.round(progress * (storyChapters.length - 1)));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

      {/* Sticky horizontal scroll */}
      <div id="story-scroll-section" style={{ height: `${storyChapters.length * 120}vh` }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Progress dots */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {storyChapters.map((ch, i) => (
              <div key={i} className={`rounded-full transition-all duration-500 ${i === activeIdx ? "w-8 h-2.5" : "w-2.5 h-2.5 opacity-40"}`}
                style={{ background: i === activeIdx ? ch.accent : "#D4A853" }} />
            ))}
          </div>

          {/* Horizontal track */}
          <div ref={trackRef} className="flex h-full will-change-transform" style={{ transition: "transform 0.08s linear", width: `${storyChapters.length * 100}vw` }}>
            {storyChapters.map((chapter, i) => (
              <div key={i} className={`flex-shrink-0 w-screen h-screen bg-gradient-to-br ${chapter.bg} flex items-center`}>
                <div className="max-w-6xl mx-auto px-8 md:px-16 w-full grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                  {/* Image */}
                  <div className={`${i % 2 === 0 ? "md:order-2" : "md:order-1"} flex justify-center`}>
                    <div className="relative">
                      {/* Decorative frame */}
                      <div className="absolute -inset-3 border opacity-20 rounded-sm" style={{ borderColor: chapter.accent }} />
                      <div className="absolute -inset-1.5 border opacity-10 rounded-sm" style={{ borderColor: chapter.accent }} />
                      <img
                        src={chapter.img}
                        alt={chapter.title}
                        className="w-72 h-72 md:w-96 md:h-96 object-cover shadow-2xl"
                        style={{ boxShadow: `0 25px 60px ${chapter.accent}30` }}
                      />
                      {/* Chapter number watermark */}
                      <div className="absolute -bottom-4 -right-4 font-display text-7xl font-light leading-none select-none pointer-events-none opacity-10" style={{ color: chapter.accent }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className={`${i % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                    <p className="font-body text-xs tracking-[0.4em] uppercase mb-1" style={{ color: chapter.accent }}>{chapter.year}</p>
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-taupe mb-4">{chapter.city}</p>
                    <h3 className="font-display text-4xl md:text-5xl text-ink font-light mb-5 leading-tight">{chapter.title}</h3>
                    <div className="h-px w-12 mb-5" style={{ background: chapter.accent }} />
                    <p className="font-body text-taupe text-sm md:text-base leading-relaxed">{chapter.desc}</p>
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
        <p className="font-body text-white/40 text-xs tracking-widest uppercase mb-2">Share your moments with us</p>
        <p className="font-display text-4xl md:text-5xl text-saffron italic mb-2">#aruvi</p>
        <p className="font-body text-white/25 text-xs mb-6">Tag us on Instagram &amp; Facebook</p>
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
