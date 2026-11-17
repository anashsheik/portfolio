// Illustrations for the research section and the project cards.
// Scroll animation classes (rv, pop, grow, draw, spin) are defined in styles.css
// and only run in browsers with scroll-driven animations and no reduced-motion preference.
// Looping classes (loop-*) keep the project figures moving; they also respect reduced motion.
// SMIL elements (<animate>, <animateMotion>) are only rendered when motion is allowed.

import { useSyncExternalStore } from "react";

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMotion(cb) {
  const mq = window.matchMedia?.(MOTION_QUERY);
  mq?.addEventListener?.("change", cb);
  return () => mq?.removeEventListener?.("change", cb);
}

function useMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => !window.matchMedia?.(MOTION_QUERY).matches,
    () => false
  );
}

const ACCENT = "#8EC5FF";
const INK = "#0A0B0D";
const CREAM = "#EDEBE6";
const ORANGE = "#FF6B3D";
const ECG_RED = "#FF1818";
const SHAP_RED = "#FF0051";
const SHAP_BLUE = "#008BFB";
const GOLD = "#C8A253";
const HALAL_GREEN = "#0E3D2C";

// ─── ECG lead (research section) ───
const LEAD_PATHS = {
  V2: "M0 62 h80 q20 -18 40 0 h48 l12 14 l18 -70 l18 82 l12 -26 h60 q36 -30 72 0 h120",
  V3: "M0 62 h80 q20 -18 40 0 h48 l12 18 l18 -62 l18 72 l12 -28 h60 q36 -30 72 0 h120",
};

export function EcgLead({ lead, label }) {
  return (
    <div className="ecg-row">
      <span className="ecg-lead" aria-hidden="true">{lead}</span>
      <svg role="img" aria-label={label} viewBox="0 0 480 100" width="100%" height="100" fill="none" strokeLinejoin="round" strokeLinecap="round" className="ecg-svg">
        <rect className="pop" x="176" y="0" width="56" height="100" fill={ACCENT} />
        <path className="draw" pathLength="1" d={LEAD_PATHS[lead]} stroke={ECG_RED} strokeWidth="6" />
      </svg>
    </div>
  );
}

// ─── Project figures ───
const ECG_CARD_PATH = "M0 90 h40 q14 -16 28 0 h30 l8 12 l14 -92 l14 106 l8 -26 h36 q22 -26 44 0 h38";

function EcgFigure() {
  return (
    <svg width="260" height="140" viewBox="0 0 260 140">
      <g className="loop-beat">
        <rect className="pop" x="104" y="0" width="40" height="140" fill={ACCENT} />
      </g>
      <path className="draw" pathLength="1" d={ECG_CARD_PATH} fill="none" stroke={ECG_RED} strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
      <path className="loop-trace" pathLength="1" d={ECG_CARD_PATH} fill="none" stroke="#FFC2C2" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="0.1 0.9" strokeDashoffset="1" />
    </svg>
  );
}

// Checkered finish flag: two rows of 10px squares between x0 and x1.
function Flag({ x0, x1, className }) {
  const squares = [];
  for (let x = x0; x <= x1; x += 20) {
    squares.push(<rect key={`a${x}`} x={x} y="0" width="10" height="10" fill={INK} />);
    squares.push(<rect key={`b${x}`} x={x + 10} y="10" width="10" height="10" fill={INK} />);
  }
  return <g className={className}>{squares}</g>;
}

// Small, detailed F1 car seen from above (60 × 116 units before scaling).
function F1Car({ x, y, helmet }) {
  const BODY = "#0A0B0D";
  const DETAIL = "#3A3F48";
  const SHINE = "#C9CDD4";
  return (
    <g transform={`translate(${x} ${y}) scale(0.5)`}>
      <path d="M4 8 H56 V13 H4 Z" fill={BODY} />
      <rect x="2" y="4" width="3" height="11" fill={BODY} />
      <rect x="55" y="4" width="3" height="11" fill={BODY} />
      <path d="M8 13 H52 V15 H8 Z" fill={DETAIL} />
      <path d="M27 2 Q30 0 33 2 L35 34 H25 Z" fill={BODY} />
      <path d="M26 22 L12 19 M26 28 L12 31 M34 22 L48 19 M34 28 L48 31" stroke={BODY} strokeWidth="1.6" />
      <rect x="3" y="16" width="10" height="18" rx="2.5" fill={BODY} />
      <rect x="47" y="16" width="10" height="18" rx="2.5" fill={BODY} />
      <rect x="5" y="18" width="1.5" height="14" fill={DETAIL} />
      <rect x="53.5" y="18" width="1.5" height="14" fill={DETAIL} />
      <path d="M25 34 L22 44 Q14 48 13 58 L13 86 Q14 94 22 98 L38 98 Q46 94 47 86 L47 58 Q46 48 38 44 L35 34 Z" fill={BODY} />
      <path d="M15 56 Q18 50 22 50 V58 Z M45 56 Q42 50 38 50 V58 Z" fill={DETAIL} />
      <path d="M26 42 Q30 38 34 42 L34 58 Q30 61 26 58 Z" fill={DETAIL} />
      <path d="M25 44 Q30 37 35 44 M30 39 V46" stroke={SHINE} strokeWidth="1.6" fill="none" />
      <circle cx="30" cy="51" r="3.6" fill={helmet} />
      <rect x="28" y="60" width="4" height="30" fill={DETAIL} />
      <path d="M22 92 L10 90 M38 92 L50 90" stroke={BODY} strokeWidth="1.6" />
      <rect x="0" y="84" width="12" height="22" rx="3" fill={BODY} />
      <rect x="48" y="84" width="12" height="22" rx="3" fill={BODY} />
      <rect x="2" y="86" width="1.5" height="18" fill={DETAIL} />
      <rect x="56.5" y="86" width="1.5" height="18" fill={DETAIL} />
      <path d="M22 98 H38 L36 106 H24 Z" fill={DETAIL} />
      <rect x="12" y="106" width="36" height="7" fill={BODY} />
      <rect x="12" y="109" width="36" height="1.2" fill={SHINE} />
      <rect x="10" y="104" width="3" height="12" fill={BODY} />
      <rect x="47" y="104" width="3" height="12" fill={BODY} />
    </g>
  );
}

// SHAP bars: positive to the right (red), negative to the left (blue).
const SHAP_BARS = [
  { y: 36, w: 110 },
  { y: 62, w: 70 },
  { y: 88, w: -55 },
  { y: 114, w: 40 },
  { y: 140, w: -28 },
  { y: 166, w: 18 },
];

function ShapFigure() {
  const AXIS = 130;
  return (
    <svg width="280" height="200" viewBox="0 0 280 200" style={{ overflow: "visible" }}>
      <Flag x0={-200} x1={460} className="flag-wide" />
      <Flag x0={-60} x1={320} className="flag-short" />
      <line x1={AXIS} y1="28" x2={AXIS} y2="196" stroke={INK} strokeWidth="2" />
      {SHAP_BARS.map(({ y, w }, i) => {
        const pos = w > 0;
        const fill = pos ? SHAP_RED : SHAP_BLUE;
        const x = pos ? AXIS : AXIS + w;
        const tip = pos ? `${AXIS + w},${y} ${AXIS + w + 10},${y + 9} ${AXIS + w},${y + 18}` : `${x},${y} ${x - 10},${y + 9} ${x},${y + 18}`;
        return (
          <g key={y} className="grow" style={{ transformOrigin: pos ? "left center" : "right center", transformBox: "fill-box" }}>
            <g className="loop-bar" style={{ transformOrigin: pos ? "left center" : "right center", animationDelay: `${-i * 0.45}s` }}>
              <rect x={x} y={y} width={Math.abs(w)} height="18" fill={fill} />
              <polygon points={tip} fill={fill} />
            </g>
          </g>
        );
      })}
      <g className="rv">
        <g className="loop-car">
          <F1Car x={20} y={70} helmet={SHAP_RED} />
          <line className="loop-speed" x1="27" y1="134" x2="27" y2="152" stroke={INK} strokeOpacity="0.35" strokeWidth="2" />
          <line className="loop-speed" x1="43" y1="134" x2="43" y2="158" stroke={INK} strokeOpacity="0.35" strokeWidth="2" />
        </g>
      </g>
      <g className="rv">
        <g className="loop-car" style={{ animationDelay: "-0.8s" }}>
          <F1Car x={228} y={58} helmet={SHAP_BLUE} />
          <line className="loop-speed" x1="235" y1="122" x2="235" y2="146" stroke={INK} strokeOpacity="0.35" strokeWidth="2" />
          <line className="loop-speed" x1="251" y1="122" x2="251" y2="140" stroke={INK} strokeOpacity="0.35" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
}

// Customers as dots, hollow ones have left.
const CHURNED = ["216,124", "238,124", "260,144", "238,164", "260,164"];
const SURVIVAL_PATH = "M152 34 H186 V44 H210 V56 H232 V70 H266";

function BankFigure() {
  const motion = useMotion();
  const dots = [];
  for (const cy of [84, 104, 124, 144, 164]) {
    for (const cx of [158, 176, 194, 216, 238, 260]) {
      const churnIndex = CHURNED.indexOf(`${cx},${cy}`);
      dots.push(
        churnIndex >= 0 ? (
          <g key={`${cx},${cy}`}>
            <circle className="pop" cx={cx} cy={cy} r="6" fill="none" stroke={INK} strokeWidth="2" />
            <circle className="loop-leave" cx={cx} cy={cy} r="6" fill={INK} style={{ animationDelay: `${churnIndex * 0.7}s` }} />
          </g>
        ) : (
          <circle key={`${cx},${cy}`} cx={cx} cy={cy} r="6" fill={INK} />
        )
      );
    }
  }
  return (
    <svg width="280" height="200" viewBox="0 0 280 200">
      <g className="pop">
        <polygon points="14,62 76,28 138,62" fill={INK} />
        <rect x="20" y="66" width="112" height="8" fill={INK} />
        <rect x="26" y="80" width="14" height="76" fill={INK} />
        <rect x="104" y="80" width="14" height="76" fill={INK} />
        <text x="72" y="140" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="64" fontWeight="700" fill={INK}>$</text>
        <rect x="16" y="160" width="120" height="10" fill={INK} />
        <rect x="8" y="172" width="136" height="10" fill={INK} />
        {dots}
        <path className="draw" pathLength="1" d={SURVIVAL_PATH} fill="none" stroke={CREAM} strokeWidth="5" />
      </g>
      {motion && (
        <circle r="6" fill={INK} stroke={CREAM} strokeWidth="2">
          <animateMotion path={SURVIVAL_PATH} dur="3.5s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

// Standing wave on a ring: r(θ) = R + A·cos(nθ), sampled every 2°.
function ringPath(R, A, n, cx = 100, cy = 100) {
  const pts = [];
  for (let deg = 0; deg < 360; deg += 2) {
    const t = (deg * Math.PI) / 180;
    const r = R + A * Math.cos(n * t);
    pts.push(`${(cx + r * Math.cos(t)).toFixed(1)} ${(cy + r * Math.sin(t)).toFixed(1)}`);
  }
  return `M${pts.join(" L")} Z`;
}

const RINGS = [
  { R: 30, A: 5, n: 3, color: CREAM, level: 164 },
  { R: 55, A: 6, n: 5, color: ACCENT, level: 116 },
  { R: 80, A: 6, n: 7, color: ORANGE, level: 36 },
];

function RingFigure() {
  const motion = useMotion();
  return (
    <svg width="280" height="200" viewBox="0 0 280 200">
      {RINGS.map(({ R, A, n, color }) => {
        const up = ringPath(R, A, n);
        const down = ringPath(R, -A, n);
        // Higher energy levels oscillate faster.
        const dur = `${(9.6 / n).toFixed(2)}s`;
        return (
          <g key={n}>
            <circle cx="100" cy="100" r={R} fill="none" stroke={CREAM} strokeOpacity="0.18" strokeWidth="2" />
            <path className="draw" pathLength="1" d={up} fill="none" stroke={color} strokeWidth="3.5" strokeLinejoin="round">
              {motion && (
                <animate attributeName="d" values={`${up};${down};${up}`} keyTimes="0;0.5;1" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" dur={dur} repeatCount="indefinite" />
              )}
            </path>
          </g>
        );
      })}
      <line x1="206" y1="20" x2="206" y2="186" stroke={CREAM} strokeOpacity="0.5" strokeWidth="2" />
      {RINGS.map(({ n, color, level }, i) => (
        <g key={n} className="loop-level" style={{ animationDelay: `${-i * 0.5}s` }}>
          <line className="grow" x1="214" y1={level} x2="268" y2={level} stroke={color} strokeWidth="5" />
        </g>
      ))}
      <circle className="pop" cx="100" cy="100" r="5" fill={CREAM} />
    </svg>
  );
}

// One packet moving from (x1,y1) to (x2,y2) between `start` and `end` seconds of a 6 s loop.
const NET_LOOP = 6;

function Packet({ x1, y1, x2, y2, start, end, color }) {
  const a = (start / NET_LOOP).toFixed(3);
  const b = (end / NET_LOOP).toFixed(3);
  return (
    <rect x="-6" y="-4" width="12" height="8" fill={color} opacity="0">
      <animateMotion path={`M${x1} ${y1} L${x2} ${y2}`} keyPoints="0;0;1;1" keyTimes={`0;${a};${b};1`} calcMode="linear" rotate="auto" dur={`${NET_LOOP}s`} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;1;0" keyTimes={`0;${a};${b}`} calcMode="discrete" dur={`${NET_LOOP}s`} repeatCount="indefinite" />
    </rect>
  );
}

function NetworkFigure() {
  const motion = useMotion();
  const BLUE = "#2F5BEA";
  const RED = "#E5242C";
  return (
    <svg width="280" height="200" viewBox="0 0 280 200">
      <rect x="36" y="8" width="28" height="16" fill={INK} />
      <rect x="216" y="8" width="28" height="16" fill={INK} />
      <line x1="50" y1="24" x2="50" y2="196" stroke={INK} strokeWidth="3" />
      <line x1="230" y1="24" x2="230" y2="196" stroke={INK} strokeWidth="3" />
      <line className="draw" pathLength="1" x1="50" y1="36" x2="230" y2="56" stroke={BLUE} strokeWidth="3" />
      <polygon className="pop" points="230,56 220.0,60.6 221.3,49.3" fill={BLUE} />
      <line className="draw" pathLength="1" x1="230" y1="62" x2="50" y2="82" stroke={INK} strokeWidth="3" strokeDasharray="6 5" />
      <polygon className="pop" points="50,82 58.7,75.3 60.0,86.6" fill={INK} />
      <line className="draw" pathLength="1" x1="50" y1="92" x2="148" y2="104" stroke={BLUE} strokeWidth="3" />
      <g className="pop">
        <g>
          <line x1="140" y1="96" x2="158" y2="114" stroke={RED} strokeWidth="5" />
          <line x1="158" y1="96" x2="140" y2="114" stroke={RED} strokeWidth="5" />
          {motion && <animate attributeName="opacity" values="0.3;1;0.3" keyTimes={`0;${(3.0 / NET_LOOP).toFixed(3)};${(4.4 / NET_LOOP).toFixed(3)}`} calcMode="discrete" dur={`${NET_LOOP}s`} repeatCount="indefinite" />}
        </g>
      </g>
      <line className="draw" pathLength="1" x1="50" y1="138" x2="230" y2="158" stroke={BLUE} strokeWidth="3" />
      <polygon className="pop" points="230,158 220.0,162.6 221.3,151.3" fill={BLUE} />
      <line className="draw" pathLength="1" x1="230" y1="164" x2="50" y2="184" stroke={INK} strokeWidth="3" strokeDasharray="6 5" />
      <polygon className="pop" points="50,184 58.7,177.3 60.0,188.6" fill={INK} />
      {motion && (
        <g>
          <Packet x1={50} y1={36} x2={226} y2={55.5} start={0.2} end={1.2} color={BLUE} />
          <Packet x1={226} y1={62.5} x2={54} y2={81.5} start={1.3} end={2.3} color={INK} />
          <Packet x1={50} y1={92} x2={146} y2={103.8} start={2.4} end={3.0} color={BLUE} />
          <Packet x1={50} y1={138} x2={226} y2={157.5} start={3.4} end={4.4} color={BLUE} />
          <Packet x1={226} y1={164.5} x2={54} y2={183.5} start={4.5} end={5.5} color={INK} />
        </g>
      )}
    </svg>
  );
}

// Map pin with a fork and knife inside, centred at (cx, cy) with head radius r.
function HalalPin({ cx, cy, r, delay = 0 }) {
  const s = r / 14;
  const p = (dx, dy) => `${(cx + dx * s).toFixed(1)} ${(cy + dy * s).toFixed(1)}`;
  return (
    <g className="pop">
      <g className="loop-bounce" style={{ animationDelay: `${delay}s` }}>
        <path d={`M${cx - r} ${cy} a${r} ${r} 0 1 1 ${2 * r} 0 c0 ${12 * s} ${-r} ${26 * s} ${-r} ${26 * s} s${-r} ${-14 * s} ${-r} ${-26 * s}z`} fill={GOLD} />
        <g stroke={HALAL_GREEN} strokeLinecap="round" fill="none" strokeWidth={(1.4 * s).toFixed(2)}>
          <path d={`M${p(-4, -7)} V${(cy - 2 * s).toFixed(1)} M${p(-6, -7)} V${(cy - 3 * s).toFixed(1)} M${p(-2, -7)} V${(cy - 3 * s).toFixed(1)} M${p(-6, -3)} Q${p(-4, 0)} ${p(-2, -3)} M${p(-4, -1)} V${(cy + 8 * s).toFixed(1)}`} />
          <path d={`M${p(4, 8)} V${(cy - 7 * s).toFixed(1)} Q${p(7, -4)} ${p(6, 1)} H${(cx + 4 * s).toFixed(1)}`} />
        </g>
      </g>
    </g>
  );
}

function MapFigure() {
  const ROAD = "#F2ECDE";
  return (
    <svg width="280" height="200" viewBox="0 0 280 200">
      <path d="M0 150 C 60 140, 90 170, 150 160 S 240 120, 280 130 V200 H0 Z" fill="#0A2A1F" />
      <path className="draw" pathLength="1" d="M0 60 L90 80 L150 50 L280 70" fill="none" stroke={ROAD} strokeOpacity="0.55" strokeWidth="5" />
      <path className="draw" pathLength="1" d="M60 0 L90 80 L110 200 M200 0 L180 120 L230 200" fill="none" stroke={ROAD} strokeOpacity="0.35" strokeWidth="3" />
      <g className="pop">
        <circle cx="90" cy="80" r="26" fill={GOLD} fillOpacity="0.35" />
        <circle className="loop-halo" cx="90" cy="80" r="26" fill="none" stroke={GOLD} strokeWidth="2" />
        <circle cx="90" cy="80" r="18" fill={GOLD} />
        <text x="90" y="86" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="17" fontWeight="700" fill={HALAL_GREEN}>24</text>
      </g>
      <g className="pop">
        <circle cx="190" cy="110" r="20" fill={GOLD} fillOpacity="0.35" />
        <circle className="loop-halo" cx="190" cy="110" r="20" fill="none" stroke={GOLD} strokeWidth="2" style={{ animationDelay: "-1.2s" }} />
        <circle cx="190" cy="110" r="13" fill={GOLD} />
        <text x="190" y="115" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="13" fontWeight="700" fill={HALAL_GREEN}>8</text>
      </g>
      <HalalPin cx={242} cy={40} r={14} />
      <HalalPin cx={148} cy={120} r={10} delay={-0.9} />
    </svg>
  );
}

const ECG_GRID =
  "linear-gradient(rgba(255,24,24,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,24,24,0.14) 1px, transparent 1px)";

const FIGURES = {
  ecg: { bg: "#000000", grid: ECG_GRID, Component: EcgFigure },
  shap: { bg: CREAM, Component: ShapFigure },
  bank: { bg: ORANGE, Component: BankFigure },
  ring: { bg: "#0B1630", Component: RingFigure },
  network: { bg: CREAM, Component: NetworkFigure },
  map: { bg: HALAL_GREEN, Component: MapFigure },
};

// Figure area at the top of a project card.
export function ProjectFigure({ figure }) {
  const fig = FIGURES[figure];
  const Figure = fig.Component;
  return (
    <div className="card-fig" aria-hidden="true" style={{ backgroundColor: fig.bg, backgroundImage: fig.grid || "none" }}>
      <Figure />
    </div>
  );
}

// Geometric composition next to the About heading.
export function AboutShapes() {
  return (
    <svg className="about-shapes" aria-hidden="true" viewBox="0 0 160 160">
      <rect className="pop" x="0" y="0" width="80" height="80" fill={ORANGE} />
      <path className="spin" d="M80 80 A80 80 0 0 1 160 160 L80 160 Z" fill={ACCENT} />
      <circle className="pop" cx="40" cy="120" r="40" fill={CREAM} />
    </svg>
  );
}
