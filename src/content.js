// All text on the site lives here, in Norwegian (no) and English (en).
// Update content in this file. App.jsx only handles layout.

export const LINKS = {
  github: "https://github.com/anashsheik",
  linkedin: "https://www.linkedin.com/in/anas-h-sheik-b131a5282/",
  calendly: "https://calendly.com/anashsheik/30min",
  paperCode: "https://github.com/anashsheik/ptbxl-mi-features",
};

export const NAV_IDS = ["om-meg", "publikasjon", "prosjekter", "ferdigheter", "utdanning", "kontakt"];

export const CONTENT = {
  no: {
    meta: {
      title: "Anas Sheik · Data Science",
      themeToggle: "Bytt tema",
      langToggle: "Switch to English",
      menu: "Meny",
    },
    nav: ["Om meg", "Publikasjon", "Prosjekter", "Ferdigheter", "Utdanning", "Kontakt"],
    hero: {
      badge: "Artikkel akseptert på ACDSA 2027",
      subtitle: "Masterstudent i Data Science · Universitetet i Oslo",
      typed: [
        "Jeg gjør tall til innsikt.",
        "Jeg trener modeller som lærer.",
        "Jeg forklarer hva modellen ser.",
      ],
      ctaProjects: "Se prosjektene mine",
      ctaContact: "Ta kontakt",
    },
    about: {
      label: "Om meg",
      title: "Litt om meg",
      paragraphs: [
        "Jeg tar en master i Data Science ved Universitetet i Oslo, etter en bachelor i matematisk modellering og datavitenskap fra OsloMet. Jeg liker å jobbe med hele løpet, fra rå data og rydding til modeller og resultater som faktisk kan forklares.",
        "Jeg er førsteforfatter på en vitenskapelig artikkel om å oppdage hjerteinfarkt i EKG-signaler med klassisk maskinlæring, skrevet sammen med forskere ved OsloMet og SimulaMet. Artikkelen er akseptert på ACDSA 2027 og publiseres av IEEE.",
        "Utenom studiene er jeg en stor sportsfan. Du finner meg gjerne foran skjermen når det er MMA, Formel 1 eller fotball. Jeg setter også stor pris på tid med venner og familie, og liker å utforske nye verktøy og lese om ny forskning innen maskinlæring.",
      ],
      tags: ["Maskinlæring", "Dataanalyse", "Statistisk modellering", "Helsedata", "Forklarbar AI"],
    },
    publication: {
      label: "Publikasjon",
      title: "Forskning",
      status: "Akseptert",
      venue: "ACDSA 2027 · IEEE",
      heading: "Hvilke EKG-trekk avslører hjerteinfarkt?",
      authors: "A. Sheik, V. Thambawita, H. L. Hammer",
      desc: "Vi hentet ut 142 håndlagde trekk fra 12-avlednings-EKG i det åpne PTB-XL-datasettet og sammenlignet flere klassiske maskinlæringsmodeller for å skille hjerteinfarkt fra normale opptak. Ved hjelp av permutasjonsviktighet fant vi at formen på QRS-komplekset i avledning V2 og V3 bærer mest informasjon, noe som passer med infarkt i fremre del av hjertet og skilleveggen (anteroseptalt infarkt).",
      note: "Presenteres på konferansen i februar 2027.",
      tech: ["Python", "NeuroKit2", "Scikit-learn", "PTB-XL"],
      code: "Se koden på GitHub",
    },
    projects: {
      label: "Prosjekter",
      title: "Ting jeg har laget",
      more: "Flere prosjekter på GitHub",
      items: [
        {
          title: "Schrödingerligningen på en ring",
          desc: "Numerisk løsning av den tidsuavhengige Schrödingerligningen for en kvantepartikkel som er begrenset til en ring. Ser på egenverdier, randbetingelser og visualisering av bølgefunksjoner, der matematisk modellering møter kvantemekanikk.",
          tech: ["Python", "NumPy", "Matplotlib", "Kvantemekanikk"],
        },
        {
          title: "Forklarbar AI på Formel 1-data",
          desc: "Brukte forklarbar AI (XAI) på pitstop-data fra Formel 1 for å finne ut hvilke faktorer modellen legger mest vekt på. SHAP-verdier gjør det mulig å se inn i en ellers lukket modell og forklare prediksjonene med enkle ord.",
          tech: ["Python", "SHAP", "Scikit-learn", "XAI"],
        },
        {
          title: "Analyse av kundefrafall",
          desc: "Analyse av hvorfor kunder slutter, fra utforskende dataanalyse til generaliserte lineære modeller. Målet var å finne de viktigste drivkreftene bak frafall og tolke dem på en måte som kan brukes i praksis.",
          tech: ["Python", "Pandas", "GLM", "Dataanalyse"],
        },
      ],
    },
    skills: {
      label: "Ferdigheter",
      title: "Verktøy og metoder",
      groups: {
        "Programmering": ["Python", "R", "SQL", "Java"],
        "Data og ML": ["Pandas", "NumPy", "Scikit-learn", "SHAP", "NeuroKit2", "Matplotlib"],
        "Metoder": ["Statistisk modellering", "Klassifisering", "Feature engineering", "Forklarbar AI", "Numeriske metoder"],
        "Verktøy": ["Git / GitHub", "Jupyter", "VS Code"],
      },
    },
    education: {
      label: "Utdanning",
      title: "Akademisk bakgrunn",
      coursesLabel: "Utvalgte fag",
      items: [
        {
          degree: "Master i Data Science",
          school: "Universitetet i Oslo",
          period: "2026 – 2028 (pågår)",
        },
        {
          degree: "Bachelor i matematisk modellering og datavitenskap",
          school: "OsloMet – storbyuniversitetet",
          period: "Fullført 2026",
          courses: ["Kunstig intelligens", "Statistisk analyse", "Avansert modellering og beregninger", "Algoritmer og datastrukturer", "Databaser", "Kvantemekanikk"],
        },
      ],
    },
    contact: {
      label: "Kontakt",
      title: "Ta kontakt",
      intro: "Jeg er åpen for jobb, samarbeid eller bare en prat om data science og maskinlæring. Send en melding eller book et møte.",
      formTitle: "Send meg en melding",
      name: "Navn",
      namePh: "Ditt navn",
      email: "E-post",
      emailPh: "din@epost.no",
      message: "Melding",
      messagePh: "Hva kan jeg hjelpe deg med?",
      send: "Send melding",
      sending: "Sender...",
      error: "Noe gikk galt. Prøv igjen, eller ta kontakt via LinkedIn.",
      thanks: "Takk for meldingen!",
      thanksSub: "Jeg svarer så fort jeg kan.",
      again: "Send ny melding",
      bookTitle: "Book et møte",
      bookSub: "Velg et tidspunkt som passer, så tar vi en prat.",
    },
    footer: "Bygget med nysgjerrighet og kode",
  },

  en: {
    meta: {
      title: "Anas Sheik · Data Science",
      themeToggle: "Toggle theme",
      langToggle: "Bytt til norsk",
      menu: "Menu",
    },
    nav: ["About", "Publication", "Projects", "Skills", "Education", "Contact"],
    hero: {
      badge: "Paper accepted at ACDSA 2027",
      subtitle: "MSc student in Data Science · University of Oslo",
      typed: [
        "I turn numbers into insight.",
        "I train models that learn.",
        "I explain what the model sees.",
      ],
      ctaProjects: "View my projects",
      ctaContact: "Get in touch",
    },
    about: {
      label: "About",
      title: "A bit about me",
      paragraphs: [
        "I am doing a master's in Data Science at the University of Oslo, after a bachelor's in Mathematical Modelling and Data Science from OsloMet. I enjoy working on the whole pipeline, from raw data and cleaning to models and results that can actually be explained.",
        "I am the first author of a research paper on detecting myocardial infarction in ECG signals with classical machine learning, written together with researchers at OsloMet and SimulaMet. The paper has been accepted at ACDSA 2027 and will be published by IEEE.",
        "Outside my studies I am a big sports fan. You will often find me watching MMA, Formula 1 or football. I also value time with friends and family, and I like exploring new tools and reading about new machine learning research.",
      ],
      tags: ["Machine learning", "Data analysis", "Statistical modelling", "Health data", "Explainable AI"],
    },
    publication: {
      label: "Publication",
      title: "Research",
      status: "Accepted",
      venue: "ACDSA 2027 · IEEE",
      heading: "Which ECG features detect myocardial infarction?",
      authors: "A. Sheik, V. Thambawita, H. L. Hammer",
      desc: "We extracted 142 hand-crafted features from 12-lead ECGs in the open PTB-XL dataset and compared several classical machine learning models for separating myocardial infarction from normal recordings. Permutation importance showed that the shape of the QRS complex in leads V2 and V3 carries the most information, consistent with anteroseptal infarction.",
      note: "To be presented at the conference in February 2027.",
      tech: ["Python", "NeuroKit2", "Scikit-learn", "PTB-XL"],
      code: "View the code on GitHub",
    },
    projects: {
      label: "Projects",
      title: "Things I have made",
      more: "More projects on GitHub",
      items: [
        {
          title: "The Schrödinger equation on a ring",
          desc: "Numerical solution of the time-independent Schrödinger equation for a quantum particle confined to a ring. Explores eigenvalues, boundary conditions and visualisation of wave functions, where mathematical modelling meets quantum mechanics.",
          tech: ["Python", "NumPy", "Matplotlib", "Quantum mechanics"],
        },
        {
          title: "Explainable AI on Formula 1 data",
          desc: "Applied explainable AI (XAI) to Formula 1 pit stop data to find out which factors the model relies on most. SHAP values make it possible to look inside an otherwise opaque model and explain its predictions in plain words.",
          tech: ["Python", "SHAP", "Scikit-learn", "XAI"],
        },
        {
          title: "Customer churn analysis",
          desc: "An analysis of why customers leave, from exploratory data analysis to generalised linear models. The goal was to find the main drivers of churn and interpret them in a way that is useful in practice.",
          tech: ["Python", "Pandas", "GLM", "Data analysis"],
        },
      ],
    },
    skills: {
      label: "Skills",
      title: "Tools and methods",
      groups: {
        "Programming": ["Python", "R", "SQL", "Java"],
        "Data and ML": ["Pandas", "NumPy", "Scikit-learn", "SHAP", "NeuroKit2", "Matplotlib"],
        "Methods": ["Statistical modelling", "Classification", "Feature engineering", "Explainable AI", "Numerical methods"],
        "Tools": ["Git / GitHub", "Jupyter", "VS Code"],
      },
    },
    education: {
      label: "Education",
      title: "Academic background",
      coursesLabel: "Selected courses",
      items: [
        {
          degree: "MSc in Data Science",
          school: "University of Oslo",
          period: "2026 – 2028 (ongoing)",
        },
        {
          degree: "BSc in Mathematical Modelling and Data Science",
          school: "Oslo Metropolitan University (OsloMet)",
          period: "Completed 2026",
          courses: ["Artificial intelligence", "Statistical analysis", "Advanced modelling and computation", "Algorithms and data structures", "Databases", "Quantum mechanics"],
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Get in touch",
      intro: "I am open to jobs, collaboration or just a chat about data science and machine learning. Send a message or book a meeting.",
      formTitle: "Send me a message",
      name: "Name",
      namePh: "Your name",
      email: "Email",
      emailPh: "you@example.com",
      message: "Message",
      messagePh: "How can I help?",
      send: "Send message",
      sending: "Sending...",
      error: "Something went wrong. Please try again, or reach me on LinkedIn.",
      thanks: "Thanks for your message!",
      thanksSub: "I will get back to you as soon as I can.",
      again: "Send another message",
      bookTitle: "Book a meeting",
      bookSub: "Pick a time that suits you and we will have a chat.",
    },
    footer: "Built with curiosity and code",
  },
};
