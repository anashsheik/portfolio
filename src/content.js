// All text on the site lives here, in Norwegian (no) and English (en).
// Update content in this file. App.jsx only handles layout.
//
// Rich text: a paragraph can be an array of strings and link objects,
// e.g. ["Text before ", { text: "link text", href: "#forskning" }, "."].
// A link with `href: "ieee"` points to LINKS.ieee once that is set,
// otherwise to the Zenodo record, otherwise to the research section.

export const LINKS = {
  github: "https://github.com/anashsheik",
  linkedin: "https://www.linkedin.com/in/anas-h-sheik-b131a5282/",
  calendly: "https://calendly.com/anashsheik/30min",
  paperCode: "https://github.com/anashsheik/ptbxl-mi-features",
  // The paper on Zenodo.
  zenodo: "https://zenodo.org/records/22304575",
  // Set this to the IEEE Xplore URL when the paper is published.
  ieee: null,
};

// Shared project data that does not depend on language.
// `figure` picks the illustration in figures.jsx, `category` drives the filter.
export const PROJECTS = [
  { id: "ecg", figure: "ecg", category: "ml", github: "https://github.com/anashsheik/ptbxl-mi-features" },
  { id: "f1", figure: "shap", category: "ml", github: "https://github.com/anashsheik/XAI-on-F1-Dataset" },
  { id: "churn", figure: "bank", category: "ml", github: "https://github.com/anashsheik/CustomerChurn-Prediction" },
  { id: "ring", figure: "ring", category: "math", github: "https://github.com/anashsheik/Schr-dinger-Equation" },
  { id: "udp", figure: "network", category: "dev", github: "https://github.com/anashsheik/Datanettverk" },
  { id: "halal", figure: "map", category: "dev", github: "https://github.com/anashsheik/halalkartet" },
];

export const CONTENT = {
  no: {
    meta: {
      title: "Anas Sheik",
      langToggle: "Switch to English",
      langCode: "NO",
      menuOpen: "Åpne meny",
      menuClose: "Lukk meny",
      toTop: "Anas Sheik, til toppen",
      mainNav: "Hovedmeny",
      skip: "Hopp til innhold",
    },
    nav: {
      forskning: "Forskning",
      prosjekter: "Prosjekter",
      "om-meg": "Om meg",
      utdanning: "Utdanning",
      kontakt: "Kontakt",
    },
    hero: {
      title: "Jeg elsker å gjøre data forståelig",
      lead: "Jeg er Anas, masterstudent ved Universitetet i Oslo. Jeg bygger modeller på alle slags data, fra helse og økonomi til business og sport, og liker å kunne forklare hva de faktisk har lært.",
      ctaProjects: "Se mine prosjekter",
      ctaMessage: "Send en melding",
      location: "Oslo, Norge",
      photoAlt: "Portrett av Anas Sheik",
    },
    research: {
      title: "Forsk­ning",
      heading: "Hvilke EKG-trekk avslører hjerteinfarkt?",
      intro: "Artikkelen skal presenteres på konferansen ACDSA i februar 2027 og publiseres av IEEE. Jeg er førsteforfatter, sammen med V. Thambawita og H. L. Hammer fra OsloMet og SimulaMet.",
      leadLabel: (lead) => `QRS-kompleks i avledning ${lead}, med toppen markert i blått`,
      explain: "Et EKG måler de elektriske signalene som får hjertet til å slå, og viser dem som en kurve. Jeg lærte en datamaskin å se forskjell på kurver fra friske hjerter og fra folk som har hatt hjerteinfarkt, ved hjelp av tusenvis av ekte, anonyme EKG-er. Så undersøkte jeg hva maskinen faktisk så etter. Svaret var den høye, spisse toppen i midten av hvert hjerteslag, markert i blått, målt på brystet rett foran hjertet. Det stemmer med det leger vet om hvor infarkter ofte skjer.",
      code: "Koden på GitHub",
      zenodo: "Les artikkelen på Zenodo",
      ieee: "IEEE Xplore",
      ieeeSoon: "IEEE Xplore, kommer",
      ieeeSoonTitle: "Lenken kommer når artikkelen er publisert",
    },
    projects: {
      title: "Prosjekter",
      filterLabel: "Filtrer prosjekter",
      filters: { all: "Alle", ml: "Maskinlæring", math: "Matematikk", dev: "Utvikling" },
      github: "Se på GitHub",
      githubAria: (title) => `Se ${title} på GitHub`,
      more: "Flere prosjekter på GitHub",
      items: {
        ecg: {
          title: "Bacheloroppgave: hjerteinfarkt i EKG",
          desc: "Kan en datamaskin se på hjerteslaget ditt om du har hatt hjerteinfarkt? Jeg trente modeller på tusenvis av ekte EKG-er og fant ut hva de ser etter. Arbeidet ble til en artikkel som er akseptert i IEEE.",
          tech: "Python, NeuroKit2, Scikit-learn",
        },
        f1: {
          title: "Forklarbar AI på Formel 1-data",
          desc: "SHAP-verdier på pitstop-data fra Formel 1 viser hvilke faktorer modellen legger mest vekt på, og gjør prediksjonene mulige å forklare med enkle ord.",
          tech: "Python, SHAP, Scikit-learn",
        },
        churn: {
          title: "Prediksjon av kundefrafall",
          desc: "Hvorfor slutter kunder? Fra utforskende dataanalyse til modeller som forutsier frafall, med mål om å finne de viktigste drivkreftene og tolke dem for praksis.",
          tech: "Python, Pandas, GLM",
        },
        ring: {
          title: "Schrödingerligningen på en ring",
          desc: "Numerisk løsning av den tidsuavhengige Schrödingerligningen for en kvantepartikkel som er begrenset til en ring. Egenverdier, randbetingelser og bølgefunksjoner.",
          tech: "Python, NumPy, Matplotlib",
        },
        udp: {
          title: "Pålitelig filoverføring over UDP",
          desc: "Egen transportprotokoll (DRTP) med Go-Back-N, sekvensnumre, ACK og glidende vindu, skrevet i Python og testet i et Mininet-nettverk med måling av throughput.",
          tech: "Python, sockets, Mininet",
        },
        halal: {
          title: "Halalkartet",
          desc: "Et interaktivt kart over hvor du finner halal mat i hele Norge, og hvor sikker halalstatusen er. Gratis, uten konto og uten sporing. Laget med Leaflet og egen kartdata.",
          tech: "JavaScript, Leaflet, kart",
        },
      },
    },
    about: {
      title: "Om meg",
      lead: "Jeg liker å finne ut hva data kan fortelle oss, og å forklare resultatene med enkle ord så andre kan bruke dem.",
      paragraphs: [
        [
          "Jeg tar en master i Data Science ved Universitetet i Oslo, med fordypning i statistikk og maskinlæring, etter en bachelor i matematisk modellering og datavitenskap fra OsloMet. Til daglig bruker jeg Python og SQL til å utforske, rydde og analysere data. Bacheloroppgaven skrev jeg for SimulaMet, og den ble til en ",
          { text: "artikkel i IEEE om hjerteinfarkt i EKG-signaler", href: "ieee" },
          ".",
        ],
        "Ved siden av studiene tester jeg språkmodeller og leter etter mønstre i hvor de tar feil. Derfor bruker jeg AI som et nyttig verktøy, men stoler aldri blindt på svarene. På fritiden blir det fotball, sjakk, Formel 1 og trening.",
      ],
      skillsTitle: "Mine ferdigheter",
      skills: [
        { title: "Språk og verktøy", items: ["Python (pandas, scikit-learn)", "SQL", "Java", "Git og GitHub", "Jupyter"] },
        { title: "Data og analyse", items: ["Utforsking og rydding", "Statistisk analyse", "Maskinlæring", "Visualisering", "Kundedata"] },
        { title: "Sky og BI", items: ["Power BI", "Azure", "Databricks"] },
      ],
    },
    education: {
      title: "Utdan­ning",
      until: "til",
      items: [
        {
          from: "2026",
          to: "nå",
          current: true,
          degree: "Master i Data Science",
          school: "Universitetet i Oslo (UiO)",
        },
        {
          from: "2023",
          to: "2026",
          degree: "Bachelor i matematisk modellering og datavitenskap",
          school: "OsloMet – storbyuniversitetet",
        },
      ],
    },
    contact: {
      title: "Skriv til meg",
      intro: [
        "Åpen for jobb, samarbeid eller en prat om data science og maskinlæring. Du kan også ",
        { text: "booke et møte på 30 minutter", href: "calendly" },
        ".",
      ],
      meeting: "Book et møte",
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
    },
    footer: {
      blurb: "Masterstudent i Data Science ved Universitetet i Oslo. Jeg elsker å gjøre data forståelig.",
      pages: "Sider",
      pagesAria: "Snarveier",
      findMe: "Finn meg",
      place: "Sted",
      location: "Norge",
      rights: "Alle rettigheter reservert.",
      toTop: "Til toppen",
    },
  },

  en: {
    meta: {
      title: "Anas Sheik",
      langToggle: "Bytt til norsk",
      langCode: "EN",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      toTop: "Anas Sheik, back to top",
      mainNav: "Main menu",
      skip: "Skip to content",
    },
    nav: {
      forskning: "Research",
      prosjekter: "Projects",
      "om-meg": "About",
      utdanning: "Education",
      kontakt: "Contact",
    },
    hero: {
      title: "I love making data make sense",
      lead: "I'm Anas, a master's student at the University of Oslo. I build models on all kinds of data, from health and finance to business and sport, and I care about being able to explain what they've actually learned.",
      ctaProjects: "See my projects",
      ctaMessage: "Send me a message",
      location: "Oslo, Norway",
      photoAlt: "Portrait of Anas Sheik",
    },
    research: {
      title: "Research",
      heading: "Which ECG features give away a heart attack?",
      intro: "The paper will be presented at ACDSA in February 2027 and published by IEEE. I'm the first author, working with V. Thambawita and H. L. Hammer from OsloMet and SimulaMet.",
      leadLabel: (lead) => `QRS complex in lead ${lead}, with the peak highlighted in blue`,
      explain: "An ECG records the electrical signals that make your heart beat and draws them as a line. Using thousands of real, anonymised ECGs, I trained a computer to tell healthy hearts apart from hearts that have had a heart attack. Then I dug into what it was actually paying attention to. The answer was the tall, sharp spike in the middle of each heartbeat, shown in blue, picked up on the chest right in front of the heart. That lines up with what doctors know about where heart attacks tend to strike.",
      code: "Code on GitHub",
      zenodo: "Read the paper on Zenodo",
      ieee: "IEEE Xplore",
      ieeeSoon: "IEEE Xplore, coming soon",
      ieeeSoonTitle: "The link will be added once the paper is published",
    },
    projects: {
      title: "Projects",
      filterLabel: "Filter projects",
      filters: { all: "All", ml: "Machine learning", math: "Maths", dev: "Development" },
      github: "View on GitHub",
      githubAria: (title) => `View ${title} on GitHub`,
      more: "More projects on GitHub",
      items: {
        ecg: {
          title: "Bachelor thesis: spotting heart attacks in ECGs",
          desc: "Can a computer tell from your heartbeat whether you've had a heart attack? I trained models on thousands of real ECGs and worked out what they look for. The work turned into a paper accepted by IEEE.",
          tech: "Python, NeuroKit2, Scikit-learn",
        },
        f1: {
          title: "Explainable AI on Formula 1 data",
          desc: "SHAP values on Formula 1 pit stop data reveal which factors the model leans on most, so its predictions can be explained in plain language.",
          tech: "Python, SHAP, Scikit-learn",
        },
        churn: {
          title: "Customer churn prediction",
          desc: "Why do customers leave? I went from exploratory analysis to models that predict churn, aiming to pin down the biggest drivers and turn them into something a business can act on.",
          tech: "Python, Pandas, GLM",
        },
        ring: {
          title: "The Schrödinger equation on a ring",
          desc: "A numerical solution to the time-independent Schrödinger equation for a quantum particle confined to a ring, covering eigenvalues, boundary conditions and wave functions.",
          tech: "Python, NumPy, Matplotlib",
        },
        udp: {
          title: "Reliable file transfer over UDP",
          desc: "My own transport protocol (DRTP) built on Go-Back-N, with sequence numbers, ACKs and a sliding window. Written in Python and tested in a Mininet network, with throughput measured along the way.",
          tech: "Python, sockets, Mininet",
        },
        halal: {
          title: "Halalkartet",
          desc: "An interactive map showing where to find halal food across Norway, and how certain each place's halal status is. Free, no account needed and no tracking. Built with Leaflet and my own map data.",
          tech: "JavaScript, Leaflet, maps",
        },
      },
    },
    about: {
      title: "About",
      lead: "I enjoy finding out what data has to say, and explaining the results in plain language so other people can put them to use.",
      paragraphs: [
        [
          "I'm doing a master's in Data Science at the University of Oslo, focusing on statistics and machine learning, after a bachelor's in mathematical modelling and data science at OsloMet. Most days I use Python and SQL to explore, clean and analyse data. I wrote my bachelor thesis for SimulaMet, and it became an ",
          { text: "IEEE paper on detecting heart attacks in ECG signals", href: "ieee" },
          ".",
        ],
        "Alongside my studies I test language models and look for patterns in where they get things wrong. So I use AI as a handy tool, but I never take its answers at face value. Outside of that, you'll find me playing football or chess, watching Formula 1 or at the gym.",
      ],
      skillsTitle: "My skills",
      skills: [
        { title: "Languages and tools", items: ["Python (pandas, scikit-learn)", "SQL", "Java", "Git and GitHub", "Jupyter"] },
        { title: "Data and analysis", items: ["Data exploration and cleaning", "Statistical analysis", "Machine learning", "Data visualisation", "Customer data"] },
        { title: "Cloud and BI", items: ["Power BI", "Azure", "Databricks"] },
      ],
    },
    education: {
      title: "Education",
      until: "to",
      items: [
        {
          from: "2026",
          to: "present",
          current: true,
          degree: "MSc in Data Science",
          school: "University of Oslo (UiO)",
        },
        {
          from: "2023",
          to: "2026",
          degree: "BSc in Mathematical Modelling and Data Science",
          school: "Oslo Metropolitan University (OsloMet)",
        },
      ],
    },
    contact: {
      title: "Get in touch",
      intro: [
        "Open to job offers, collaborations or just a chat about data science and machine learning. You can also ",
        { text: "book a 30-minute call", href: "calendly" },
        ".",
      ],
      meeting: "Book a call",
      name: "Name",
      namePh: "Your name",
      email: "Email",
      emailPh: "you@example.com",
      message: "Message",
      messagePh: "What's on your mind?",
      send: "Send message",
      sending: "Sending...",
      error: "Something went wrong. Please try again, or message me on LinkedIn.",
      thanks: "Thanks for reaching out!",
      thanksSub: "I'll get back to you as soon as I can.",
      again: "Send another message",
    },
    footer: {
      blurb: "Master's student in Data Science at the University of Oslo. I love making data make sense.",
      pages: "Pages",
      pagesAria: "Shortcuts",
      findMe: "Find me",
      place: "Based in",
      location: "Norway",
      rights: "All rights reserved.",
      toTop: "Back to top",
    },
  },
};
