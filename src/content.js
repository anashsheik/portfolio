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
      title: "Anas Sheik, Data Science",
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
      ctaProjects: "Se prosjektene",
      ctaMeeting: "Book et møte",
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
      experienceTitle: "Erfaring",
      experience: [
        {
          period: "2026",
          title: "SimulaMet, maskinlæring og helsedata",
          desc: "Bygget en Python-pipeline og en modell som oppdager hjerteinfarkt i nesten 22 000 EKG-opptak. Jobbet i fem dokumenterte runder så hvert steg kunne etterprøves, og fant og fjernet data som røpet svaret. Sjekket utvalgte opptak for hånd for å se om resultatene ga klinisk mening.",
        },
        {
          period: "2024 til nå",
          title: "Outlier.ai, AI-trener (deltid)",
          desc: "Vurderer svar fra språkmodeller innen matematikk, kode og resonnering opp mot faste retningslinjer, finner mønstre i hvor modellene feiler og gir strukturerte tilbakemeldinger som gjør dem mer pålitelige.",
        },
      ],
      skillsTitle: "Ferdigheter",
      skills: [
        { title: "Språk og verktøy", items: ["Python (pandas, scikit-learn)", "SQL", "Java", "Git og GitHub", "Jupyter"] },
        { title: "Data og analyse", items: ["Utforsking og rydding", "Statistisk analyse", "Maskinlæring", "Visualisering", "Kundedata"] },
        { title: "Sky og BI", items: ["Power BI", "Azure", "Databricks"] },
        { title: "Språk", items: ["Norsk, morsmål", "Engelsk, flytende"] },
      ],
    },
    education: {
      title: "Utdan­ning",
      items: [
        {
          from: "2026",
          to: " til nå",
          current: true,
          degree: "Master i Data Science",
          school: "Universitetet i Oslo",
        },
        {
          from: "2023",
          to: " til 2026",
          degree: "Bachelor i matematisk modellering og datavitenskap",
          school: "OsloMet. Fag jeg likte best: kunstig intelligens, statistisk analyse, algoritmer og datastrukturer, databaser og kvantemekanikk.",
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
      rights: "Alle rettigheter reservert.",
      toTop: "Til toppen",
    },
  },

  en: {
    meta: {
      title: "Anas Sheik, Data Science",
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
      title: "I love making data understandable",
      lead: "I am Anas, a master's student at the University of Oslo. I build models on all kinds of data, from health and finance to business and sports, and I like being able to explain what they have actually learned.",
      ctaProjects: "See the projects",
      ctaMeeting: "Book a meeting",
      location: "Oslo, Norway",
      photoAlt: "Portrait of Anas Sheik",
    },
    research: {
      title: "Research",
      heading: "Which ECG features reveal a heart attack?",
      intro: "The paper will be presented at the ACDSA conference in February 2027 and published by IEEE. I am the first author, together with V. Thambawita and H. L. Hammer from OsloMet and SimulaMet.",
      leadLabel: (lead) => `QRS complex in lead ${lead}, with the peak marked in blue`,
      explain: "An ECG measures the electrical signals that make the heart beat, and shows them as a curve. I taught a computer to tell curves from healthy hearts apart from those of people who have had a heart attack, using thousands of real, anonymous ECGs. Then I looked at what the computer was actually looking for. The answer was the tall, sharp peak in the middle of each heartbeat, marked in blue, measured on the chest right in front of the heart. That matches what doctors know about where heart attacks often happen.",
      code: "Code on GitHub",
      zenodo: "Read the paper on Zenodo",
      ieee: "IEEE Xplore",
      ieeeSoon: "IEEE Xplore, coming soon",
      ieeeSoonTitle: "The link will be added when the paper is published",
    },
    projects: {
      title: "Projects",
      filterLabel: "Filter projects",
      filters: { all: "All", ml: "Machine learning", math: "Mathematics", dev: "Development" },
      github: "View on GitHub",
      githubAria: (title) => `View ${title} on GitHub`,
      more: "More projects on GitHub",
      items: {
        ecg: {
          title: "Bachelor thesis: heart attacks in ECGs",
          desc: "Can a computer look at your heartbeat and tell whether you have had a heart attack? I trained models on thousands of real ECGs and found out what they look for. The work became a paper accepted by IEEE.",
          tech: "Python, NeuroKit2, Scikit-learn",
        },
        f1: {
          title: "Explainable AI on Formula 1 data",
          desc: "SHAP values on Formula 1 pit stop data show which factors the model relies on most, and make its predictions possible to explain in plain words.",
          tech: "Python, SHAP, Scikit-learn",
        },
        churn: {
          title: "Customer churn prediction",
          desc: "Why do customers leave? From exploratory data analysis to models that predict churn, with the aim of finding the main drivers and interpreting them for practice.",
          tech: "Python, Pandas, GLM",
        },
        ring: {
          title: "The Schrödinger equation on a ring",
          desc: "Numerical solution of the time-independent Schrödinger equation for a quantum particle confined to a ring. Eigenvalues, boundary conditions and wave functions.",
          tech: "Python, NumPy, Matplotlib",
        },
        udp: {
          title: "Reliable file transfer over UDP",
          desc: "A custom transport protocol (DRTP) with Go-Back-N, sequence numbers, ACKs and a sliding window, written in Python and tested in a Mininet network with throughput measurements.",
          tech: "Python, sockets, Mininet",
        },
        halal: {
          title: "Halalkartet",
          desc: "An interactive map of where to find halal food across Norway, and how certain the halal status is. Free, with no account and no tracking. Built with Leaflet and custom map data.",
          tech: "JavaScript, Leaflet, maps",
        },
      },
    },
    about: {
      title: "About",
      lead: "I like finding out what data can tell us, and explaining the results in plain words so others can use them.",
      paragraphs: [
        [
          "I am doing a master's in Data Science at the University of Oslo, specialising in statistics and machine learning, after a bachelor's in mathematical modelling and data science from OsloMet. Day to day I use Python and SQL to explore, clean and analyse data. I wrote my bachelor thesis for SimulaMet, and it became an ",
          { text: "IEEE paper on heart attacks in ECG signals", href: "ieee" },
          ".",
        ],
        "Alongside my studies I test language models and look for patterns in where they go wrong. That is why I use AI as a helpful tool, but never trust its answers blindly. In my spare time it is football, chess, Formula 1 and training.",
      ],
      experienceTitle: "Experience",
      experience: [
        {
          period: "2026",
          title: "SimulaMet, machine learning and health data",
          desc: "Built a Python pipeline and a model that detects heart attacks in almost 22,000 ECG recordings. Worked in five documented rounds so every step could be checked, and found and removed data that gave away the answer. Checked selected recordings by hand to see whether the results made clinical sense.",
        },
        {
          period: "2024 to now",
          title: "Outlier.ai, AI trainer (part time)",
          desc: "Evaluate answers from language models in mathematics, code and reasoning against fixed guidelines, find patterns in where the models fail and give structured feedback that makes them more reliable.",
        },
      ],
      skillsTitle: "Skills",
      skills: [
        { title: "Languages and tools", items: ["Python (pandas, scikit-learn)", "SQL", "Java", "Git and GitHub", "Jupyter"] },
        { title: "Data and analysis", items: ["Exploration and cleaning", "Statistical analysis", "Machine learning", "Visualisation", "Customer data"] },
        { title: "Cloud and BI", items: ["Power BI", "Azure", "Databricks"] },
        { title: "Languages", items: ["Norwegian, native", "English, fluent"] },
      ],
    },
    education: {
      title: "Education",
      items: [
        {
          from: "2026",
          to: " to now",
          current: true,
          degree: "MSc in Data Science",
          school: "University of Oslo",
        },
        {
          from: "2023",
          to: " to 2026",
          degree: "BSc in Mathematical Modelling and Data Science",
          school: "OsloMet. Courses I liked most: artificial intelligence, statistical analysis, algorithms and data structures, databases and quantum mechanics.",
        },
      ],
    },
    contact: {
      title: "Write to me",
      intro: [
        "Open to jobs, collaboration or a chat about data science and machine learning. You can also ",
        { text: "book a 30 minute meeting", href: "calendly" },
        ".",
      ],
      meeting: "Book a meeting",
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
    },
    footer: {
      blurb: "MSc student in Data Science at the University of Oslo. I love making data understandable.",
      pages: "Pages",
      pagesAria: "Shortcuts",
      findMe: "Find me",
      place: "Location",
      rights: "All rights reserved.",
      toTop: "Back to top",
    },
  },
};
