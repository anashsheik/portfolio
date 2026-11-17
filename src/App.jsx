import { useState, useEffect } from "react";
import { CONTENT, LINKS, PROJECTS } from "./content.js";
import { AboutShapes, EcgLead, ProjectFigure } from "./figures.jsx";

// ─── Small helpers ───
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

const ext = { target: "_blank", rel: "noopener noreferrer" };

// Resolve the special link keys used in content.js.
function resolveHref(href) {
  if (href === "ieee") return LINKS.ieee || "#forskning";
  if (href === "calendly") return LINKS.calendly;
  return href;
}

// Render a paragraph that may contain inline links.
function Rich({ value }) {
  if (typeof value === "string") return value;
  return value.map((part, i) => {
    if (typeof part === "string") return part;
    const href = resolveHref(part.href);
    const external = href.startsWith("http");
    return (
      <a key={i} href={href} className="ulink" {...(external ? ext : {})}>
        {part.text}
      </a>
    );
  });
}

// ─── Icons ───
const Icons = {
  github: (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  ),
  linkedin: (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  calendar: (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="5" width="18" height="16" rx="1" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  ),
  pin: (size = 20) => (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
  globe: (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    </svg>
  ),
  menu: (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
      <path d="M4 8h16M4 16h16" />
    </svg>
  ),
  close: (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  ),
};

// Handwritten "Anas Sheik" signature.
function Signature({ className, label }) {
  return (
    <svg
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      viewBox="0 0 200 70"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M60 20 C 36 10, 6 32, 18 48 C 26 58, 50 54, 62 38 C 70 27, 76 16, 80 6 C 79 22, 78 40, 80 56" strokeWidth="2.2" />
      <path d="M4 52 C 20 56, 40 47, 70 45 C 110 42, 150 40, 186 39" strokeWidth="1.3" />
      <path d="M86 38 l3 -7 l3 7 l3 -7 l3 7 l3 -7 l3 7 C 108 35, 118 35, 128 34" strokeWidth="1.7" />
      <circle cx="193" cy="44" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ─── Header ───
const HEADER_NAV = ["forskning", "prosjekter", "om-meg", "kontakt"];
const MOBILE_NAV = ["forskning", "prosjekter", "om-meg", "utdanning", "kontakt"];

function Header({ c, onToggleLang }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header wrap">
      <a href="#top" className="signature-link" aria-label={c.meta.toTop}>
        <Signature />
      </a>
      <nav className="main-nav" aria-label={c.meta.mainNav}>
        {HEADER_NAV.map((id) => (
          <a key={id} href={`#${id}`}>
            {c.nav[id]}
          </a>
        ))}
        <button type="button" className="lang-btn" onClick={onToggleLang} aria-label={c.meta.langToggle} title={c.meta.langToggle}>
          {Icons.globe}
          {c.meta.langCode}
        </button>
      </nav>
      <div className="header-actions menu-only">
        <button type="button" className="lang-btn" onClick={onToggleLang} aria-label={c.meta.langToggle}>
          {Icons.globe}
          {c.meta.langCode}
        </button>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? c.meta.menuClose : c.meta.menuOpen}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? Icons.close : Icons.menu}
        </button>
      </div>
      <nav id="mobile-nav" className="mobile-nav" aria-label={c.meta.mainNav} hidden={!open}>
        {MOBILE_NAV.map((id) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {c.nav[id]}
          </a>
        ))}
      </nav>
    </header>
  );
}

// ─── Hero ───
function Hero({ c }) {
  return (
    <section id="top" className="hero wrap">
      <h1 className="hero-title">{c.hero.title}</h1>
      <p className="hero-lead">{c.hero.lead}</p>
      <div className="hero-photo">
        <div className="hero-photo-frame">
          <img src="/portrait-blend.webp" alt={c.hero.photoAlt} width="720" height="878" fetchPriority="high" />
        </div>
        <div className="shape shape-circle pop" aria-hidden="true" />
        <div className="shape shape-square pop" aria-hidden="true" />
        <div className="shape shape-bar grow" aria-hidden="true" />
      </div>
      <div className="hero-actions btn-row">
        <a href="#prosjekter" className="btn btn-primary">
          {c.hero.ctaProjects}
        </a>
        <a href={LINKS.calendly} className="btn btn-outline" {...ext}>
          {c.hero.ctaMeeting}
        </a>
      </div>
      <div className="hero-social">
        <a href={LINKS.github} {...ext}>
          {Icons.github}GitHub
        </a>
        <a href={LINKS.linkedin} {...ext}>
          {Icons.linkedin}LinkedIn
        </a>
        <span>
          {Icons.pin()}
          {c.hero.location}
        </span>
      </div>
    </section>
  );
}

// ─── Research ───
function Research({ c }) {
  const r = c.research;
  return (
    <section id="forskning" className="research rule-top">
      <div className="split wrap">
        <div className="split-head">
          <h2 className="h2 rv">{r.title}</h2>
        </div>
        <div className="split-body">
          <h3 className="research-title">{r.heading}</h3>
          <p className="research-text">{r.intro}</p>
          <figure className="ecg-panel rv">
            <EcgLead lead="V2" label={r.leadLabel("V2")} />
            <EcgLead lead="V3" label={r.leadLabel("V3")} />
          </figure>
          <p className="research-text">{r.explain}</p>
          <div className="btn-row">
            <a href={LINKS.paperCode} className="btn btn-light" {...ext}>
              {r.code}
            </a>
            {LINKS.ieee ? (
              <a href={LINKS.ieee} className="btn btn-dashed" {...ext}>
                {r.ieee}
              </a>
            ) : (
              <span className="btn btn-dashed" title={r.ieeeSoonTitle} style={{ cursor: "default" }}>
                {r.ieeeSoon}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ───
const FILTERS = ["all", "ml", "math", "dev"];

function ProjectCard({ project, text, c }) {
  return (
    <article className="card rv">
      <ProjectFigure figure={project.figure} />
      <div className="card-body">
        <h3 className="card-title">{text.title}</h3>
        <p className="muted">{text.desc}</p>
        <p className="card-tech">{text.tech}</p>
        <a href={project.github} className="card-link ulink" aria-label={c.projects.githubAria(text.title)} {...ext}>
          {c.projects.github}
        </a>
      </div>
    </article>
  );
}

function Projects({ c }) {
  const [filter, setFilter] = useState("all");
  const p = c.projects;
  const shown = filter === "all" ? PROJECTS : PROJECTS.filter((x) => x.category === filter);

  return (
    <section id="prosjekter" className="projects wrap">
      <div className="projects-head">
        <h2 className="h2 rv">{p.title}</h2>
        <div className="filters" role="group" aria-label={p.filterLabel}>
          {FILTERS.map((id) => (
            <button key={id} type="button" className="filter-btn" aria-pressed={filter === id} onClick={() => setFilter(id)}>
              {p.filters[id]}
            </button>
          ))}
        </div>
      </div>
      <div className="project-grid">
        {shown.map((project) => (
          <ProjectCard key={project.id} project={project} text={p.items[project.id]} c={c} />
        ))}
      </div>
      <p className="projects-more">
        <a href={LINKS.github} className="ulink" {...ext}>
          {p.more}
        </a>
      </p>
    </section>
  );
}

// ─── About ───
function About({ c }) {
  const a = c.about;
  return (
    <section id="om-meg" className="wrap rule-top">
      <div className="split">
        <div className="split-head">
          <h2 className="h2 rv">{a.title}</h2>
          <AboutShapes />
        </div>
        <div className="split-body" style={{ gap: 24 }}>
          <p className="about-lead">{a.lead}</p>
          {a.paragraphs.map((para, i) => (
            <p key={i} className="muted">
              <Rich value={para} />
            </p>
          ))}

          <div className="experience rv">
            <h3 className="subhead">{a.experienceTitle}</h3>
            <ul className="exp-list">
              {a.experience.map((e) => (
                <li key={e.title} className="exp-row">
                  <div className="exp-period">{e.period}</div>
                  <div className="exp-main">
                    <h4>{e.title}</h4>
                    <p>{e.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div id="ferdigheter" className="skills rv">
            <h3 className="subhead">{a.skillsTitle}</h3>
            <div className="skills-grid">
              {a.skills.map((g) => (
                <div key={g.title}>
                  <h4>{g.title}</h4>
                  <ul>
                    {g.items.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Education ───
function Education({ c }) {
  const ed = c.education;
  return (
    <section id="utdanning" className="wrap rule-top">
      <div className="split">
        <div className="split-head">
          <h2 className="h2 rv">{ed.title}</h2>
        </div>
        <div className="split-body edu-list">
          {ed.items.map((item) => (
            <div key={item.degree} className="edu-row rv">
              <div className="edu-years">
                <span className={item.current ? "from-accent" : undefined}>{item.from}</span>
                {item.to}
              </div>
              <div className="edu-main">
                <h3>{item.degree}</h3>
                <p>{item.school}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact (Formspree) ───
function ContactForm({ c }) {
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

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <h3>{c.thanks}</h3>
        <p>{c.thanksSub}</p>
        <button type="button" className="btn btn-ink" onClick={() => setStatus("idle")}>
          {c.again}
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* Honeypot, invisible field that catches bots */}
      <div className="honeypot" aria-hidden="true">
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="field-label">
        {c.name}
        <input className="field" type="text" name="name" required autoComplete="name" placeholder={c.namePh} />
      </label>
      <label className="field-label">
        {c.email}
        <input className="field" type="email" name="email" required autoComplete="email" placeholder={c.emailPh} />
      </label>
      <label className="field-label">
        {c.message}
        <textarea className="field" name="message" required rows={5} placeholder={c.messagePh} />
      </label>
      <button type="submit" className="btn btn-send" disabled={sending}>
        {sending ? c.sending : c.send}
      </button>
      {status === "error" && (
        <p className="form-error" role="alert">
          {c.error}
        </p>
      )}
    </form>
  );
}

function Contact({ c }) {
  const k = c.contact;
  return (
    <section id="kontakt" className="contact">
      <div className="split wrap">
        <div className="contact-left">
          <h2 className="contact-title rv">{k.title}</h2>
          <p className="contact-intro">
            <Rich value={k.intro} />
          </p>
          <div className="contact-links">
            <a href={LINKS.linkedin} className="btn btn-ink" {...ext}>
              {Icons.linkedin}LinkedIn
            </a>
            <a href={LINKS.github} className="btn btn-ink" {...ext}>
              {Icons.github}GitHub
            </a>
            <a href={LINKS.calendly} className="btn btn-ink" {...ext}>
              {Icons.calendar}
              {k.meeting}
            </a>
          </div>
        </div>
        <ContactForm c={k} />
      </div>
    </section>
  );
}

// ─── Footer ───
const FOOTER_NAV = ["forskning", "prosjekter", "om-meg", "utdanning", "kontakt"];

function Footer({ c }) {
  const f = c.footer;
  return (
    <footer className="rule-top">
      <div className="footer-top wrap">
        <div className="footer-brand rv">
          <Signature className="signature" label="Anas Sheik" />
          <p>{f.blurb}</p>
          <div className="icon-row">
            <a href={LINKS.github} className="icon-btn" aria-label="GitHub" {...ext}>
              {Icons.github}
            </a>
            <a href={LINKS.linkedin} className="icon-btn" aria-label="LinkedIn" {...ext}>
              {Icons.linkedin}
            </a>
            <a href={LINKS.calendly} className="icon-btn" aria-label={c.contact.meeting} {...ext}>
              {Icons.calendar}
            </a>
          </div>
        </div>
        <nav className="footer-col rv" aria-label={f.pagesAria}>
          <h4>{f.pages}</h4>
          {FOOTER_NAV.map((id) => (
            <a key={id} href={`#${id}`}>
              {c.nav[id]}
            </a>
          ))}
        </nav>
        <div className="footer-col rv">
          <h4>{f.findMe}</h4>
          <a href={LINKS.github} {...ext}>
            GitHub
          </a>
          <a href={LINKS.linkedin} {...ext}>
            LinkedIn
          </a>
          <a href={LINKS.calendly} {...ext}>
            Calendly
          </a>
        </div>
        <div className="footer-col rv">
          <h4>{f.place}</h4>
          <p>
            {Icons.pin(18)}
            {c.hero.location}
          </p>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <span>
          © {new Date().getFullYear()} Anas Sheik. {f.rights}
        </span>
        <a href="#top">{f.toTop}</a>
      </div>
    </footer>
  );
}

// ─── Main Component ───
export default function Portfolio() {
  const [lang, setLang] = useState(initialLang);
  const c = CONTENT[lang];

  useEffect(() => {
    document.title = c.meta.title;
    document.documentElement.lang = lang === "no" ? "nb" : "en";
    writeStored("lang", lang);
  }, [lang, c]);

  const toggleLang = () => setLang((l) => (l === "no" ? "en" : "no"));

  return (
    <>
      <a href="#main" className="skip-link">
        {c.meta.skip}
      </a>
      <Header c={c} onToggleLang={toggleLang} />
      <main id="main">
        <Hero c={c} />
        <Research c={c} />
        <Projects c={c} />
        <About c={c} />
        <Education c={c} />
        <Contact c={c} />
      </main>
      <Footer c={c} />
    </>
  );
}
