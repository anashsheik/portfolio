import { useState, useEffect, useRef } from "react";
import { CONTENT, LINKS, NAV_IDS } from "./content.js";

// ─── Small helpers ───
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function readStored(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStored(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage not available, ignore */
  }
}

function initialLang() {
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "en" || q === "no") return q;
  } catch {
    /* ignore */
  }
  const stored = readStored("lang", null);
  return stored === "en" || stored === "no" ? stored : "no";
}

// ─── Typed Text Effect ───
function TypedText({ strings, speed = 70, pause = 2000 }) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const current = strings[idx % strings.length];
    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIdx((i) => (i + 1) % strings.length);
      }, 0);
    } else {
      timeout = setTimeout(
        () =>
          setText(
            deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)
          ),
        deleting ? speed / 2 : speed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, strings, speed, pause, reduced]);

  if (reduced) return <span>{strings[0]}</span>;

  return (
    <span aria-label={strings[0]}>
      <span aria-hidden="true">{text}</span>
      <span className="cursor" aria-hidden="true">|</span>
    </span>
  );
}

// ─── Fade-in on scroll ───
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Icons ───
const svg = (children, size = 20) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const Icons = {
  github: svg(<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />),
  linkedin: svg(<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>),
  mail: svg(<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>),
  arrow: svg(<><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>, 16),
  external: svg(<><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></>, 15),
  moon: svg(<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />, 18),
  sun: svg(<><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></>, 18),
  grad: svg(<><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" /></>),
  paper: svg(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>),
  calendar: svg(<><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>),
};

// ─── Contact Form (Formspree) ───
function ContactForm({ t, dark, c }) {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Honeypot: if this hidden field is filled in, it is a bot
    if (form.elements._gotcha.value) return;

    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mdawvbaj", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.elements.name.value,
          email: form.elements.email.value,
          message: form.elements.message.value,
        }),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 8,
    border: `1.5px solid ${t.border}`,
    background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
    color: t.text,
    fontSize: 14,
    fontFamily: "inherit",
  };

  const labelStyle = { fontSize: 12.5, fontWeight: 600, color: t.textMuted, marginBottom: 4, display: "block", letterSpacing: 0.3 };

  if (status === "success") {
    return (
      <div className="card" role="status" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 320 }}>
        <div style={{ fontSize: 40, marginBottom: 16, color: t.accent }}>✓</div>
        <h3 className="serif" style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{c.thanks}</h3>
        <p style={{ fontSize: 14, color: t.textMuted }}>{c.thanksSub}</p>
        <button onClick={() => setStatus("idle")} className="btn btn-outline" style={{ marginTop: 20, fontSize: 13 }}>
          {c.again}
        </button>
      </div>
    );
  }

  return (
    <div className="card" style={{ textAlign: "left" }}>
      <h3 className="serif" style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
        {Icons.mail} {c.formTitle}
      </h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Honeypot, invisible field that catches bots */}
        <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div>
          <label htmlFor="cf-name" style={labelStyle}>{c.name}</label>
          <input id="cf-name" className="field" type="text" name="name" required autoComplete="name" placeholder={c.namePh} style={inputStyle} />
        </div>
        <div>
          <label htmlFor="cf-email" style={labelStyle}>{c.email}</label>
          <input id="cf-email" className="field" type="email" name="email" required autoComplete="email" placeholder={c.emailPh} style={inputStyle} />
        </div>
        <div>
          <label htmlFor="cf-message" style={labelStyle}>{c.message}</label>
          <textarea id="cf-message" className="field" name="message" required rows={4} placeholder={c.messagePh} style={{ ...inputStyle, resize: "vertical", minHeight: 100 }} />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "sending"}
          style={{ width: "100%", justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}
        >
          {status === "sending" ? c.sending : c.send} {status !== "sending" && Icons.arrow}
        </button>
        {status === "error" && (
          <p role="alert" style={{ fontSize: 13, color: "#ef4444", textAlign: "center" }}>{c.error}</p>
        )}
      </form>
    </div>
  );
}

// ─── Section header ───
function SectionHeader({ label, title, center = false }) {
  return (
    <FadeIn>
      <div style={{ textAlign: center ? "center" : "left" }}>
        <p className="section-label">{label}</p>
        <h2 className="section-title">{title}</h2>
      </div>
    </FadeIn>
  );
}

// ─── Main Component ───
export default function Portfolio() {
  const [dark, setDark] = useState(() => readStored("theme", "dark") === "dark");
  const [lang, setLang] = useState(initialLang);
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const c = CONTENT[lang];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "no" ? "nb" : "en";
    document.title = c.meta.title;
    writeStored("lang", lang);
  }, [lang, c]);

  useEffect(() => {
    writeStored("theme", dark ? "dark" : "light");
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    setMobileNav(false);
  };

  const toggleLang = () => setLang((l) => (l === "no" ? "en" : "no"));

  const t = dark
    ? {
        bg: "#0c1222", bgAlt: "#131b30", card: "#182040", accent: "#38bdf8",
        accentSoft: "rgba(56,189,248,0.1)", text: "#e2e8f0", textMuted: "#94a3b8",
        border: "rgba(56,189,248,0.14)", glow: "0 0 40px rgba(56,189,248,0.08)",
        nav: "rgba(12,18,34,0.85)",
      }
    : {
        bg: "#f8fafc", bgAlt: "#ffffff", card: "#ffffff", accent: "#0369a1",
        accentSoft: "rgba(3,105,161,0.07)", text: "#0f172a", textMuted: "#526075",
        border: "rgba(3,105,161,0.14)", glow: "0 2px 24px rgba(0,0,0,0.06)",
        nav: "rgba(248,250,252,0.85)",
      };

  const langButton = (style) => (
    <button onClick={toggleLang} className="icon-btn lang-btn" style={style} title={c.meta.langToggle} aria-label={c.meta.langToggle}>
      {lang === "no" ? "EN" : "NO"}
    </button>
  );

  const themeButton = (onClick, style) => (
    <button onClick={onClick ?? (() => setDark(!dark))} className="icon-btn" style={style} title={c.meta.themeToggle} aria-label={c.meta.themeToggle}>
      {dark ? Icons.sun : Icons.moon}
    </button>
  );

  const pub = c.publication;

  return (
    <div style={{ background: t.bg, color: t.text, minHeight: "100vh", fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif", transition: "background 0.4s, color 0.4s" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 72px; }
        body { background: ${t.bg}; }
        .serif { font-family: 'Playfair Display', serif; }
        .cursor { animation: blink 1s step-end infinite; color: ${t.accent}; font-weight: 300; }
        @keyframes blink { 50% { opacity: 0; } }
        a { color: inherit; text-decoration: none; }
        :focus-visible { outline: 2px solid ${t.accent}; outline-offset: 3px; border-radius: 6px; }
        .field:focus { outline: none; border-color: ${t.accent} !important; }
        .tag { display: inline-block; padding: 4px 12px; border-radius: 100px; font-size: 12.5px; font-weight: 500; letter-spacing: 0.3px; background: ${t.accentSoft}; color: ${t.accent}; border: 1px solid ${t.border}; }
        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.25s ease; border: none; font-family: inherit; }
        .btn-primary { background: ${t.accent}; color: ${dark ? "#0c1222" : "#fff"}; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px ${dark ? "rgba(56,189,248,0.25)" : "rgba(3,105,161,0.25)"}; }
        .btn-outline { background: transparent; color: ${t.text}; border: 1.5px solid ${t.border}; }
        .btn-outline:hover { border-color: ${t.accent}; color: ${t.accent}; transform: translateY(-2px); }
        .link { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: ${t.accent}; }
        .link:hover { text-decoration: underline; text-underline-offset: 3px; }
        .icon-btn { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; border: 1.5px solid ${t.border}; background: transparent; color: ${t.textMuted}; cursor: pointer; transition: all 0.25s; font-family: 'JetBrains Mono', monospace; }
        .icon-btn:hover { color: ${t.accent}; border-color: ${t.accent}; background: ${t.accentSoft}; transform: translateY(-2px); }
        .lang-btn { font-size: 12px; font-weight: 600; letter-spacing: 0.5px; }
        .section { max-width: 880px; margin: 0 auto; padding: 100px 24px; }
        .section-label { font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 500; color: ${t.accent}; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; }
        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 38px); font-weight: 700; margin-bottom: 40px; line-height: 1.2; }
        .card { background: ${t.card}; border: 1px solid ${t.border}; border-radius: 14px; padding: 28px; transition: all 0.3s ease; box-shadow: ${t.glow}; }
        .card:hover { transform: translateY(-4px); border-color: ${t.accent}; box-shadow: 0 12px 32px ${dark ? "rgba(56,189,248,0.1)" : "rgba(0,0,0,0.08)"}; }
        .card-feature { border-left: 3px solid ${t.accent}; }
        .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .nav-link { font-size: 13.5px; font-weight: 500; color: ${t.textMuted}; cursor: pointer; transition: color 0.2s; letter-spacing: 0.3px; background: none; border: none; font-family: inherit; }
        .nav-link:hover { color: ${t.accent}; }
        .badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 100px; font-size: 13px; font-weight: 600; background: ${t.accentSoft}; color: ${t.accent}; border: 1px solid ${t.border}; cursor: pointer; font-family: inherit; transition: all 0.25s; }
        .badge:hover { border-color: ${t.accent}; }
        .badge-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
        .status-pill { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 12px; font-weight: 700; background: rgba(34,197,94,0.12); color: ${dark ? "#4ade80" : "#15803d"}; border: 1px solid rgba(34,197,94,0.3); }
        .mob-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 98; backdrop-filter: blur(4px); }
        .mob-menu { position: fixed; top: 0; right: 0; width: 260px; height: 100vh; background: ${t.bgAlt}; z-index: 99; padding: 80px 32px 32px; display: flex; flex-direction: column; align-items: flex-start; gap: 24px; box-shadow: -4px 0 24px rgba(0,0,0,0.2); }
        .hero-layout { display: flex; align-items: center; gap: 60px; }
        .hero-text { flex: 1; min-width: 0; }
        .hero-photo-wrap { flex-shrink: 0; position: relative; }
        .hero-photo { width: 240px; height: 240px; border-radius: 50%; border: 3px solid ${t.border}; position: relative; z-index: 1; background: ${t.card}; overflow: hidden; }
        .hero-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; display: block; }
        .hero-photo-ring { position: absolute; inset: -8px; border-radius: 50%; border: 1.5px dashed ${t.accent}; opacity: 0.3; animation: spin-slow 30s linear infinite; }
        .hero-photo-glow { position: absolute; inset: -20px; border-radius: 50%; background: radial-gradient(circle, ${dark ? "rgba(56,189,248,0.1)" : "rgba(3,105,161,0.06)"}, transparent 70%); z-index: 0; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 740px; margin: 0 auto; align-items: stretch; }
        .edu-list { display: grid; gap: 20px; }
        @media (max-width: 768px) {
          .hero-layout { flex-direction: column-reverse; gap: 36px; text-align: center; }
          .hero-photo { width: 180px; height: 180px; }
          .hero-btns, .hero-socials, .hero-badge { justify-content: center; }
          .contact-grid { grid-template-columns: 1fr; max-width: 480px; }
        }
        @media (max-width: 760px) {
          .desktop-nav { display: none !important; }
          .mob-toggle { display: inline-flex !important; }
        }
        @media (max-width: 640px) { .section { padding: 64px 16px; } .grid-2 { grid-template-columns: 1fr; } .card { padding: 22px; } }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* ═══ NAVBAR ═══ */}
      <nav aria-label={c.meta.menu} style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? t.nav : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent",
        transition: "all 0.3s",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
            className="serif"
            aria-label="Anas Sheik"
            style={{ background: "none", border: "none", cursor: "pointer", color: t.text, fontSize: 22, fontWeight: 800 }}
          >
            AS<span style={{ color: t.accent }}>.</span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }} className="desktop-nav">
            {c.nav.map((n, i) => (
              <button key={NAV_IDS[i]} className="nav-link" onClick={() => scrollTo(NAV_IDS[i])}>{n}</button>
            ))}
            <div style={{ display: "flex", gap: 8, marginLeft: 4 }}>
              {langButton()}
              {themeButton()}
            </div>
          </div>
          <button
            onClick={() => setMobileNav(!mobileNav)}
            className="mob-toggle icon-btn"
            aria-label={c.meta.menu}
            aria-expanded={mobileNav}
            style={{ display: "none", fontSize: 18, color: t.text }}
          >
            {mobileNav ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileNav && (
        <>
          <div className="mob-overlay" onClick={() => setMobileNav(false)} />
          <div className="mob-menu">
            {c.nav.map((n, i) => (
              <button key={NAV_IDS[i]} className="nav-link" onClick={() => scrollTo(NAV_IDS[i])} style={{ fontSize: 18 }}>{n}</button>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              {langButton()}
              {themeButton(() => { setDark(!dark); setMobileNav(false); })}
            </div>
          </div>
        </>
      )}

      {/* ═══ HERO ═══ */}
      <header style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, opacity: dark ? 0.04 : 0.03,
          backgroundImage: `linear-gradient(${t.accent} 1px, transparent 1px), linear-gradient(90deg, ${t.accent} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px",
          borderRadius: "50%", background: `radial-gradient(circle, ${dark ? "rgba(56,189,248,0.07)" : "rgba(3,105,161,0.04)"}, transparent 70%)`,
          filter: "blur(40px)", pointerEvents: "none",
        }} />

        <div className="section" style={{ padding: "140px 24px 100px", position: "relative", width: "100%" }}>
          <div className="hero-layout">
            <div className="hero-text">
              <FadeIn>
                <div className="hero-badge" style={{ display: "flex", marginBottom: 22 }}>
                  <button className="badge" onClick={() => scrollTo("publikasjon")}>
                    <span className="badge-dot" aria-hidden="true" />
                    {c.hero.badge}
                  </button>
                </div>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="serif" style={{ fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 14, letterSpacing: "-1px" }}>
                  Anas Sheik<span style={{ color: t.accent }}>.</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p style={{ fontSize: "clamp(16px, 2.4vw, 21px)", color: t.textMuted, fontWeight: 400, marginBottom: 10 }}>
                  {c.hero.subtitle}
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p style={{ fontSize: "clamp(16px, 2.4vw, 21px)", fontWeight: 400, minHeight: 34, marginBottom: 34 }}>
                  <TypedText key={lang} strings={c.hero.typed} />
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="hero-btns" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 30 }}>
                  <button className="btn btn-primary" onClick={() => scrollTo("prosjekter")}>
                    {c.hero.ctaProjects} {Icons.arrow}
                  </button>
                  <button className="btn btn-outline" onClick={() => scrollTo("kontakt")}>
                    {c.hero.ctaContact}
                  </button>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="hero-socials" style={{ display: "flex", gap: 10 }}>
                  <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub">{Icons.github}</a>
                  <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn">{Icons.linkedin}</a>
                  <button onClick={() => scrollTo("kontakt")} className="icon-btn" aria-label={c.hero.ctaContact}>{Icons.mail}</button>
                </div>
              </FadeIn>
            </div>

            {/* Profile photo */}
            <FadeIn delay={0.3}>
              <div className="hero-photo-wrap">
                <div className="hero-photo-glow" />
                <div className="hero-photo-ring" />
                <div className="hero-photo">
                  <img src="/photo.webp" alt="Anas Sheik" width="240" height="240" fetchpriority="high" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </header>

      <main>
        {/* ═══ OM MEG ═══ */}
        <section id="om-meg" style={{ background: t.bgAlt }}>
          <div className="section">
            <SectionHeader label={c.about.label} title={c.about.title} />
            <FadeIn delay={0.1}>
              <div>
                {c.about.paragraphs.map((p, i) => (
                  <p key={i} style={{ fontSize: 16.5, lineHeight: 1.8, color: t.textMuted, marginBottom: 20, maxWidth: 660 }}>{p}</p>
                ))}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                  {c.about.tags.map((s) => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ PUBLIKASJON ═══ */}
        <section id="publikasjon">
          <div className="section">
            <SectionHeader label={pub.label} title={pub.title} />
            <FadeIn delay={0.1}>
              <article className="card card-feature">
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span className="status-pill">{pub.status}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: t.textMuted }}>{pub.venue}</span>
                </div>
                <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: t.accent, marginTop: 4, flexShrink: 0 }}>{Icons.paper}</span>
                  {pub.heading}
                </h3>
                <p style={{ fontSize: 14, color: t.textMuted, marginBottom: 16 }}>
                  <strong style={{ color: t.text, fontWeight: 600 }}>{pub.authors.split(",")[0]}</strong>,{pub.authors.split(",").slice(1).join(",")}
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: t.textMuted, marginBottom: 12 }}>{pub.desc}</p>
                <p style={{ fontSize: 14, color: t.textMuted, fontStyle: "italic", marginBottom: 18 }}>{pub.note}</p>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {pub.tech.map((x) => <span key={x} className="tag" style={{ fontSize: 11.5 }}>{x}</span>)}
                  </div>
                  <a className="link" href={LINKS.paperCode} target="_blank" rel="noopener noreferrer">
                    {Icons.github} {pub.code}
                  </a>
                </div>
              </article>
            </FadeIn>
          </div>
        </section>

        {/* ═══ PROSJEKTER ═══ */}
        <section id="prosjekter" style={{ background: t.bgAlt }}>
          <div className="section">
            <SectionHeader label={c.projects.label} title={c.projects.title} />
            <div style={{ display: "grid", gap: 20 }}>
              {c.projects.items.map((p, i) => (
                <FadeIn key={p.title} delay={i * 0.1}>
                  <article className="card">
                    <h3 className="serif" style={{ fontSize: 19, fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
                    <p style={{ fontSize: 14.5, lineHeight: 1.7, color: t.textMuted, marginBottom: 14 }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.tech.map((x) => <span key={x} className="tag" style={{ fontSize: 11.5 }}>{x}</span>)}
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.2}>
              <div style={{ textAlign: "center", marginTop: 32 }}>
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  {Icons.github} {c.projects.more} {Icons.external}
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ FERDIGHETER ═══ */}
        <section id="ferdigheter">
          <div className="section">
            <SectionHeader label={c.skills.label} title={c.skills.title} />
            <div className="grid-2">
              {Object.entries(c.skills.groups).map(([cat, items], i) => (
                <FadeIn key={cat} delay={i * 0.08}>
                  <div className="card" style={{ height: "100%" }}>
                    <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: t.accent, marginBottom: 16, letterSpacing: 1, textTransform: "uppercase" }}>
                      {cat}
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {items.map((s) => <span key={s} className="tag">{s}</span>)}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ UTDANNING ═══ */}
        <section id="utdanning" style={{ background: t.bgAlt }}>
          <div className="section">
            <SectionHeader label={c.education.label} title={c.education.title} />
            <div className="edu-list">
              {c.education.items.map((e, i) => (
                <FadeIn key={e.degree} delay={i * 0.1}>
                  <div className="card" style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <div style={{ color: t.accent, marginTop: 2, flexShrink: 0 }}>{Icons.grad}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4px 16px", marginBottom: 4 }}>
                        <h3 className="serif" style={{ fontSize: 18, fontWeight: 700 }}>{e.degree}</h3>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: t.textMuted, whiteSpace: "nowrap" }}>{e.period}</span>
                      </div>
                      <p style={{ fontSize: 14.5, color: t.textMuted, marginBottom: e.courses ? 14 : 0 }}>{e.school}</p>
                      {e.courses && (
                        <>
                          <p style={{ fontSize: 14, color: t.textMuted, fontWeight: 600, marginBottom: 8 }}>{c.education.coursesLabel}</p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {e.courses.map((x) => <span key={x} className="tag" style={{ fontSize: 11.5 }}>{x}</span>)}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ KONTAKT ═══ */}
        <section id="kontakt">
          <div className="section">
            <SectionHeader label={c.contact.label} title={c.contact.title} center />
            <FadeIn delay={0.05}>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: t.textMuted, maxWidth: 560, margin: "-16px auto 40px", textAlign: "center" }}>
                {c.contact.intro}
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="contact-grid">
                <ContactForm t={t} dark={dark} c={c.contact} />

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <a href={LINKS.calendly} target="_blank" rel="noopener noreferrer" className="card" style={{ textAlign: "center", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ color: t.accent, marginBottom: 12 }}>{Icons.calendar}</div>
                    <h3 className="serif" style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{c.contact.bookTitle}</h3>
                    <p style={{ fontSize: 13.5, color: t.textMuted }}>{c.contact.bookSub}</p>
                  </a>

                  <div style={{ display: "flex", gap: 12 }}>
                    <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }}>
                      {Icons.linkedin} LinkedIn
                    </a>
                    <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }}>
                      {Icons.github} GitHub
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: `1px solid ${t.border}`, padding: "28px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: t.textMuted }}>
          © {new Date().getFullYear()} Anas Sheik · {c.footer}
        </p>
      </footer>
    </div>
  );
}
