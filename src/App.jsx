import { useState, useEffect, useRef } from "react";

// ─── Typed Text Effect ───
function TypedText({ strings, speed = 80, pause = 2000 }) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx];
    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % strings.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)
          );
        },
        deleting ? speed / 2 : speed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, strings, speed, pause]);

  return (
    <span>
      {text}
      <span className="cursor">|</span>
    </span>
  );
}

// ─── Fade-in on scroll ───
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Icons ───
const Icons = {
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  mail: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  arrow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  moon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
  ),
  sun: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
  ),
  grad: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/></svg>
  ),
  calendar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  ),
  star: (filled, color) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  quote: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.15"><path d="M11 7H7a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4h1a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3H5M21 7h-4a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4h1a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3h-1"/></svg>
  ),
};

// ─── Data ───
const PROJECTS = [
  {
    title: "Schrödingerligningen på en ring",
    desc: "Numerisk løser for den tidsuavhengige Schrödingerligningen anvendt på et kvantepartikkel begrenset til en ringgeometri. Utforsker egenverdier, grensebetingelser og visualisering av bølgefunksjoner — en bro mellom matematisk modellering og kvantemekanikk.",
    tech: ["Python", "NumPy", "Matplotlib", "Kvantemekanikk"],
  },
  {
    title: "Forklarbar AI på F1-datasett",
    desc: "Anvendte forklarbar AI-teknikker (XAI) på et Formel 1-datasett for å avdekke hvilke faktorer som mest påvirker raceresultater og førerprestasjoner. Bruker SHAP-verdier og tolkbare modeller for å gjøre black-box-prediksjoner transparente og forståelige.",
    tech: ["Python", "SHAP", "Scikit-learn", "XAI"],
  },
  {
    title: "Prediksjon av kundefrafall",
    desc: "Ende-til-ende prediksjonsanalyse på et kundefrafall-datasett — fra utforskende dataanalyse og feature engineering til trening og evaluering av klassifikasjonsmodeller. Fokus på å identifisere nøkkeldrivere for frafall og handlingsrettede forretningsinnsikter.",
    tech: ["Python", "Pandas", "Scikit-learn", "Dataanalyse"],
  },
  {
    title: "Prediksjon av hjerteinfarkt",
    desc: "Maskinlærings-pipeline for å klassifisere EKG-signaler fra hjerteinfarkt (MI) mot normale tilfeller — med feature-ekstraksjon, klassifisering og analyse av kliniske data.",
    tech: ["Python", "Scikit-learn", "ML"],
  },
];

const SKILLS = {
  "Språk": ["Python", "SQL", "R", "Java", "JavaScript", "C#", "C++"],
  "ML / DL": ["Scikit-learn", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Matplotlib"],
  "Verktøy": ["Git / GitHub", "Jupyter", "VS Code", "Linux"],
  "Annet": ["Datavisualisering", "Statistisk modellering", "Nettverksprogrammering"],
};

const NAV = ["Om meg", "Ferdigheter", "Prosjekter", "Utdanning", "Anmeldelser", "Kontakt"];
const NAV_IDS = ["om-meg", "ferdigheter", "prosjekter", "utdanning", "anmeldelser", "kontakt"];

const REVIEWS = [
  {
    name: "Prof. Emilie T.",
    role: "Professor, Anvendt matematikk",
    date: "Des 2025",
    stars: 5,
    title: "Imponerende studentarbeid",
    text: "Anas leverte et svært solid arbeid med Schrödinger-ligningen på en ringgeometri. Løsningen var elegant, godt strukturert og viste en modenhet i tilnærmingen som man sjelden ser hos bachelorstudenter. Et arbeid å være stolt av.",
  },
  {
    name: "Kristian M.",
    role: "Medstudent & Reseacher hos UiO",
    date: "Mar 2026",
    stars: 4,
    title: "Utrolig dyktig og hjelpsom",
    text: "Anas hjalp meg med et maskinlæringsprosjekt der vi skulle klassifisere medisinske data. Han har en sjelden evne til å forklare kompliserte konsepter på en enkel måte, og koden hans er alltid ryddig og godt dokumentert.",
  },
  {
    name: "Sara L.",
    role: "PhD. kandidat ",
    date: "Feb 2026",
    stars: 4,
    title: "Engasjerende og imponerende arbeid",
    text: "Jeg kom over Anas sitt F1-prosjekt og ble virkelig imponert. Resultatene var presentert på en måte som gjorde det lett å forstå hva som faktisk påvirker raceresultatene. Man ser tydelig at han brenner for det han gjør — det smitter over!",
  },
  {
    name: "Yad Salihi",
    role: "Byggingeniørstudent",
    date: "Jan 2026",
    stars: 5,
    title: "En gruppeleder alle ønsker seg",
    text: "Anas var virkelig den gruppelederen alle ønsker seg. Han holdt oss organisert, sørget for at alle ble hørt, og tok ansvar når det trengtes. Samtidig var han ydmyk nok til å la andre skinne. Prosjektet ble mye bedre takket være hans ledelse.",
  },
  {
    name: "Robert K.",
    role: "Juniorutvikler hos NBIM - Norges Bank Investment Management",
    date: "Nov 2025",
    stars: 5,
    title: "Skarp, rask og løsningsorientert",
    text: "Jeg fikk Anas til å hjelpe med dataanalyse for et internt prosjekt. Han satte seg inn i problemet på rekordtid, bygde en ren pipeline og presenterte resultatene på en måte som selv ikke-tekniske folk forstod. Kommer definitivt til å samarbeide igjen.",
  },
];

// ─── Contact Form (Formspree) ───
function ContactForm({ t, dark }) {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Honeypot: hvis dette feltet er fylt ut, er det en bot
    if (form.elements._gotcha.value) return;

    setStatus("sending");
    try {
      const res = await fetch("[SETT INN FORMSPREE-URL, f.eks. https://formspree.io/f/xyzabc12]", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    outline: "none",
    transition: "border-color 0.2s",
  };

  if (status === "success") {
    return (
      <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 320 }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>Takk for meldingen!</h3>
        <p style={{ fontSize: 14, color: t.textMuted }}>Jeg svarer så fort jeg kan.</p>
        <button
          onClick={() => setStatus("idle")}
          className="btn btn-outline"
          style={{ marginTop: 20, fontSize: 13 }}
        >
          Send ny melding
        </button>
      </div>
    );
  }

  return (
    <div className="card" style={{ textAlign: "left" }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, fontFamily: "'Playfair Display', serif" }}>
        {Icons.mail} <span style={{ marginLeft: 8 }}>Send meg en melding</span>
      </h3>
      <div onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Honeypot — usynlig felt som fanger botter */}
        <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" form="contact-form" />

        <form id="contact-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: t.textMuted, marginBottom: 4, display: "block", letterSpacing: 0.3 }}>Navn</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Ditt navn"
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = t.accent}
              onBlur={(e) => e.target.style.borderColor = t.border}
            />
          </div>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: t.textMuted, marginBottom: 4, display: "block", letterSpacing: 0.3 }}>E-post</label>
            <input
              type="email"
              name="email"
              required
              placeholder="din@epost.no"
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = t.accent}
              onBlur={(e) => e.target.style.borderColor = t.border}
            />
          </div>
          <div>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: t.textMuted, marginBottom: 4, display: "block", letterSpacing: 0.3 }}>Melding</label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Hva kan jeg hjelpe deg med?"
              style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
              onFocus={(e) => e.target.style.borderColor = t.accent}
              onBlur={(e) => e.target.style.borderColor = t.border}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === "sending"}
            style={{ width: "100%", justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}
          >
            {status === "sending" ? "Sender..." : "Send melding"} {status !== "sending" && Icons.arrow}
          </button>
          {status === "error" && (
            <p style={{ fontSize: 13, color: "#ef4444", textAlign: "center" }}>
              Noe gikk galt. Prøv igjen, eller ta kontakt via LinkedIn.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ───
export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNav(false);
  };

  const t = dark
    ? {
        bg: "#0c1222", bgAlt: "#131b30", card: "#182040", accent: "#38bdf8",
        accentSoft: "rgba(56,189,248,0.1)", text: "#e2e8f0", textMuted: "#94a3b8",
        border: "rgba(56,189,248,0.12)", glow: "0 0 40px rgba(56,189,248,0.08)",
      }
    : {
        bg: "#f8fafc", bgAlt: "#ffffff", card: "#ffffff", accent: "#0369a1",
        accentSoft: "rgba(3,105,161,0.07)", text: "#0f172a", textMuted: "#64748b",
        border: "rgba(3,105,161,0.12)", glow: "0 2px 24px rgba(0,0,0,0.06)",
      };

  return (
    <div style={{ background: t.bg, color: t.text, minHeight: "100vh", fontFamily: "'Source Sans 3', 'Segoe UI', sans-serif", transition: "background 0.4s, color 0.4s" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source+Sans+3:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        .cursor { animation: blink 1s step-end infinite; color: ${t.accent}; font-weight: 300; }
        @keyframes blink { 50% { opacity: 0; } }
        a { color: inherit; text-decoration: none; }
        .tag { display: inline-block; padding: 4px 12px; border-radius: 100px; font-size: 12.5px; font-weight: 500; letter-spacing: 0.3px; background: ${t.accentSoft}; color: ${t.accent}; border: 1px solid ${t.border}; }
        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.25s ease; border: none; font-family: inherit; }
        .btn-primary { background: ${t.accent}; color: ${dark ? "#0c1222" : "#fff"}; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px ${dark ? "rgba(56,189,248,0.25)" : "rgba(3,105,161,0.25)"}; }
        .btn-outline { background: transparent; color: ${t.text}; border: 1.5px solid ${t.border}; }
        .btn-outline:hover { border-color: ${t.accent}; color: ${t.accent}; transform: translateY(-2px); }
        .icon-btn { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; border: 1.5px solid ${t.border}; background: transparent; color: ${t.textMuted}; cursor: pointer; transition: all 0.25s; }
        .icon-btn:hover { color: ${t.accent}; border-color: ${t.accent}; background: ${t.accentSoft}; transform: translateY(-2px); }
        .section { max-width: 880px; margin: 0 auto; padding: 100px 24px; }
        .section-label { font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 500; color: ${t.accent}; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; }
        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 38px); font-weight: 700; margin-bottom: 40px; line-height: 1.2; }
        .card { background: ${t.card}; border: 1px solid ${t.border}; border-radius: 14px; padding: 28px; transition: all 0.3s ease; box-shadow: ${t.glow}; }
        .card:hover { transform: translateY(-4px); border-color: ${t.accent}; box-shadow: 0 12px 32px ${dark ? "rgba(56,189,248,0.1)" : "rgba(0,0,0,0.08)"}; }
        .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        @media (max-width: 640px) { .section { padding: 60px 16px; } .grid-2 { grid-template-columns: 1fr; } }
        .nav-link { font-size: 13.5px; font-weight: 500; color: ${t.textMuted}; cursor: pointer; transition: color 0.2s; letter-spacing: 0.3px; }
        .nav-link:hover { color: ${t.accent}; }
        .mob-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 98; backdrop-filter: blur(4px); }
        .mob-menu { position: fixed; top: 0; right: 0; width: 260px; height: 100vh; background: ${t.bgAlt}; z-index: 99; padding: 80px 32px 32px; display: flex; flex-direction: column; gap: 24px; box-shadow: -4px 0 24px rgba(0,0,0,0.2); }
        .hero-layout { display: flex; align-items: center; gap: 60px; }
        .hero-text { flex: 1; min-width: 0; }
        .hero-photo-wrap { flex-shrink: 0; position: relative; }
        .hero-photo { width: 240px; height: 240px; border-radius: 50%; object-fit: cover; border: 3px solid ${t.border}; position: relative; z-index: 1; background: ${t.card}; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .hero-photo img { width: 100%; height: 100%; object-fit: cover; }
        .hero-photo-ring { position: absolute; inset: -8px; border-radius: 50%; border: 1.5px dashed ${t.accent}; opacity: 0.3; animation: spin-slow 30s linear infinite; }
        .hero-photo-glow { position: absolute; inset: -20px; border-radius: 50%; background: radial-gradient(circle, ${dark ? "rgba(56,189,248,0.1)" : "rgba(3,105,161,0.06)"}, transparent 70%); z-index: 0; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 740px; margin: 0 auto; align-items: start; }
        @media (max-width: 768px) {
          .hero-layout { flex-direction: column-reverse; gap: 36px; text-align: center; }
          .hero-photo { width: 180px; height: 180px; }
          .hero-btns { justify-content: center; }
          .hero-socials { justify-content: center; }
          .contact-grid { grid-template-columns: 1fr; max-width: 480px; }
        }
      `}</style>

      {/* ═══ NAVBAR ═══ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? (dark ? "rgba(12,18,34,0.85)" : "rgba(248,250,252,0.85)") : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent",
        transition: "all 0.3s",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ width: 28, cursor: "pointer" }}>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="desktop-nav">
            {NAV.map((n, i) => (
              <span key={n} className="nav-link" onClick={() => scrollTo(NAV_IDS[i])}>{n}</span>
            ))}
            <button onClick={() => setDark(!dark)} className="icon-btn" style={{ marginLeft: 4 }} title="Bytt tema">
              {dark ? Icons.sun : Icons.moon}
            </button>
          </div>
          <button onClick={() => setMobileNav(!mobileNav)} style={{ display: "none", background: "none", border: "none", color: t.text, cursor: "pointer", fontSize: 24 }} className="mob-toggle">
            {mobileNav ? "✕" : "☰"}
          </button>
        </div>
        <style>{`
          @media (max-width: 700px) {
            .desktop-nav { display: none !important; }
            .mob-toggle { display: block !important; }
          }
        `}</style>
      </nav>

      {/* Mobile menu */}
      {mobileNav && (
        <>
          <div className="mob-overlay" onClick={() => setMobileNav(false)} />
          <div className="mob-menu">
            {NAV.map((n, i) => (
              <span key={n} className="nav-link" onClick={() => scrollTo(NAV_IDS[i])} style={{ fontSize: 18 }}>{n}</span>
            ))}
            <button onClick={() => { setDark(!dark); setMobileNav(false); }} className="icon-btn" style={{ marginTop: 8 }}>
              {dark ? Icons.sun : Icons.moon}
            </button>
          </div>
        </>
      )}

      {/* ═══ HERO ═══ */}
      <header style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, opacity: dark ? 0.04 : 0.03,
          backgroundImage: `linear-gradient(${t.accent} 1px, transparent 1px), linear-gradient(90deg, ${t.accent} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
        <div style={{
          position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px",
          borderRadius: "50%", background: `radial-gradient(circle, ${dark ? "rgba(56,189,248,0.06)" : "rgba(3,105,161,0.04)"}, transparent 70%)`,
          filter: "blur(40px)", pointerEvents: "none",
        }} />

        <div className="section" style={{ padding: "160px 24px 100px", position: "relative" }}>
          <div className="hero-layout">
            <div className="hero-text">
              <FadeIn>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 12, letterSpacing: "-1px" }}>
                  Anas H. Sheik<span style={{ color: t.accent }}>.</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p style={{ fontSize: "clamp(16px, 2.5vw, 22px)", color: t.textMuted, fontWeight: 300, marginBottom: 8 }}>
                  Data Science & ML Student · Uteksamineres 2026
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p style={{ fontSize: "clamp(16px, 2.5vw, 22px)", fontWeight: 400, height: 36, marginBottom: 36 }}>
                  <TypedText
                    strings={[
                      "Jeg bygger ting med data.",
                      "Jeg automatiserer det kjedelige.",
                      "Jeg trener modeller som lærer.",
                      "Jeg gjør tall til innsikt.",
                    ]}
                  />
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="hero-btns" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
                  <button className="btn btn-primary" onClick={() => scrollTo("prosjekter")}>
                    Se mine prosjekter {Icons.arrow}
                  </button>
                  <button className="btn btn-outline" onClick={() => scrollTo("kontakt")}>
                    Ta kontakt
                  </button>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="hero-socials" style={{ display: "flex", gap: 10 }}>
                  <a href="https://github.com/anashsheik" target="_blank" rel="noopener noreferrer" className="icon-btn">{Icons.github}</a>
                  <a href="https://www.linkedin.com/in/anas-h-sheik-b131a5282/" target="_blank" rel="noopener noreferrer" className="icon-btn">{Icons.linkedin}</a>
                  <span onClick={() => scrollTo("kontakt")} className="icon-btn">{Icons.mail}</span>
                </div>
              </FadeIn>
            </div>

            {/* Profilbilde */}
            <FadeIn delay={0.3}>
              <div className="hero-photo-wrap">
                <div className="hero-photo-glow" />
                <div className="hero-photo-ring" />
                <div className="hero-photo">
                  {/* ═══ BYTT UT: Legg inn ditt eget bilde her ═══
                       Slett hele SVG-blokken nedenfor og erstatt med:
                         <img src="/photo.png" alt="Anas H. Sheik" />
                  ═══ */}
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke={t.textMuted} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </header>

      {/* ═══ OM MEG ═══ */}
      <section id="om-meg" style={{ background: t.bgAlt }}>
        <div className="section">
          <FadeIn>
            <p className="section-label">Om meg</p>
            <h2 className="section-title">Litt om meg</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: t.textMuted, marginBottom: 20, maxWidth: 640 }}>
                Jeg er en sisteårsstudent som uteksamineres med en Bachelor i Mathematical Modelling & Data Science fra Norge. Jeg brenner for analyse, automatisering, maskinlæring og dyp læring — og elsker å gjøre rådata om til innsikt og bygge intelligente systemer som løser virkelige problemer.
              </p>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: t.textMuted, marginBottom: 28, maxWidth: 640 }}>
                Utenom studiene er jeg en stor sportsfan — du finner meg gjerne foran skjermen når det er MMA, Formel 1 eller fotball. Jeg setter også stor pris på å tilbringe tid med venner og familie, og når jeg er tilbake ved tastaturet liker jeg å utforske nye verktøy og dykke inn i den nyeste ML-forskningen.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Matematisk modellering", "Maskinlæring", "Dyp læring", "Dataanalyse", "Automatisering"].map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FERDIGHETER ═══ */}
      <section id="ferdigheter">
        <div className="section">
          <FadeIn>
            <p className="section-label">Ferdigheter</p>
            <h2 className="section-title">Teknologier jeg jobber med</h2>
          </FadeIn>
          <div className="grid-2">
            {Object.entries(SKILLS).map(([cat, items], i) => (
              <FadeIn key={cat} delay={i * 0.1}>
                <div className="card">
                  <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: t.accent, marginBottom: 16, letterSpacing: 1, textTransform: "uppercase" }}>
                    {cat}
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {items.map((s) => (
                      <span key={s} className="tag">{s}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROSJEKTER ═══ */}
      <section id="prosjekter" style={{ background: t.bgAlt }}>
        <div className="section">
          <FadeIn>
            <p className="section-label">Prosjekter</p>
            <h2 className="section-title">Ting jeg har bygget</h2>
          </FadeIn>
          <div style={{ display: "grid", gap: 20 }}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card">
                  <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 8, fontFamily: "'Playfair Display', serif" }}>{p.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.7, color: t.textMuted, marginBottom: 14 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tech.map((t2) => (
                      <span key={t2} className="tag" style={{ fontSize: 11.5 }}>{t2}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ UTDANNING ═══ */}
      <section id="utdanning">
        <div className="section">
          <FadeIn>
            <p className="section-label">Utdanning</p>
            <h2 className="section-title">Akademisk bakgrunn</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="card" style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ color: t.accent, marginTop: 2, flexShrink: 0 }}>{Icons.grad}</div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, fontFamily: "'Playfair Display', serif" }}>
                  Bachelor i Mathematical Modelling & Data Science
                </h3>
                <p style={{ fontSize: 14.5, color: t.textMuted, marginBottom: 14 }}>
                  [Ditt universitetsnavn] — Norge
                </p>
                <p style={{ fontSize: 14, color: t.textMuted, fontWeight: 500, marginBottom: 8 }}>Relevante fag:</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["Maskinlæring", "Statistikk", "Lineær algebra", "Datastrukturer", "Numeriske metoder"].map((c) => (
                    <span key={c} className="tag" style={{ fontSize: 11.5 }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ ANMELDELSER ═══ */}
      <section id="anmeldelser" style={{ background: t.bgAlt }}>
        <div className="section">
          <FadeIn>
            <p className="section-label">Anmeldelser</p>
            <h2 className="section-title">Hva andre sier</h2>
          </FadeIn>

          {/* Rating overview */}
          <FadeIn delay={0.1}>
            <div className="card" style={{ display: "flex", gap: 32, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
              <div style={{ textAlign: "center", minWidth: 100 }}>
                <div style={{ fontSize: 48, fontWeight: 800, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>5.0</div>
                <div style={{ display: "flex", gap: 3, justifyContent: "center", margin: "8px 0 4px" }}>
                  {[1,2,3,4,5].map(i => <span key={i}>{Icons.star(true, "#facc15")}</span>)}
                </div>
                <p style={{ fontSize: 12.5, color: t.textMuted }}>Basert på {REVIEWS.length} anmeldelser</p>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                {[5,4,3,2,1].map(stars => {
                  const count = REVIEWS.filter(r => r.stars === stars).length;
                  const pct = REVIEWS.length > 0 ? (count / REVIEWS.length) * 100 : 0;
                  return (
                    <div key={stars} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: t.textMuted, width: 12, textAlign: "right" }}>{stars}</span>
                      <span>{Icons.star(true, "#facc15")}</span>
                      <div style={{ flex: 1, height: 8, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: "#facc15", borderRadius: 4, transition: "width 0.6s ease" }} />
                      </div>
                      <span style={{ fontSize: 12, color: t.textMuted, width: 28 }}>{Math.round(pct)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* Individual reviews */}
          <div style={{ display: "grid", gap: 16 }}>
            {REVIEWS.map((r, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="card" style={{ position: "relative" }}>
                  <div style={{ position: "absolute", top: 20, right: 24, color: t.accent }}>{Icons.quote}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      background: `linear-gradient(135deg, ${t.accent}, ${dark ? "#6366f1" : "#0284c7"})`, color: "#fff", fontWeight: 700, fontSize: 15,
                    }}>
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14.5 }}>{r.name}</p>
                      <p style={{ fontSize: 12, color: t.textMuted }}>{r.role}</p>
                    </div>
                    <span style={{ marginLeft: "auto", fontSize: 12, color: t.textMuted }}>{r.date}</span>
                  </div>
                  <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
                    {[1,2,3,4,5].map(s => <span key={s}>{Icons.star(s <= r.stars, "#facc15")}</span>)}
                  </div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>{r.title}</h4>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: t.textMuted }}>{r.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KONTAKT ═══ */}
      <section id="kontakt">
        <div className="section">
          <FadeIn>
            <div style={{ textAlign: "center" }}>
              <p className="section-label">Kontakt</p>
              <h2 className="section-title">Ta kontakt</h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.8, color: t.textMuted, maxWidth: 560, margin: "0 auto 40px" }}>
                Jeg er alltid åpen for nye muligheter, samarbeid, eller bare en hyggelig prat om data science og maskinlæring. Ikke nøl med å ta kontakt!
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="contact-grid">
              {/* Kontaktskjema */}
              <ContactForm t={t} dark={dark} />

              {/* Booking + sosiale lenker */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <a href="[SETT INN CALENDLY / BOOKING-LENKE]" target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: "none", textAlign: "center", cursor: "pointer", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ color: t.accent, marginBottom: 12 }}>{Icons.calendar}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>Book et møte</h3>
                  <p style={{ fontSize: 13.5, color: t.textMuted }}>Velg et tidspunkt som passer, så tar vi en prat.</p>
                </a>

                <div style={{ display: "flex", gap: 12 }}>
                  <a href="https://www.linkedin.com/in/anas-h-sheik-b131a5282/" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }}>
                    {Icons.linkedin} LinkedIn
                  </a>
                  <a href="https://github.com/anashsheik" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }}>
                    {Icons.github} GitHub
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: `1px solid ${t.border}`, padding: "28px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: t.textMuted }}>
          © 2026 Anas H. Sheik — Bygget med nysgjerrighet & kode
        </p>
      </footer>
    </div>
  );
}