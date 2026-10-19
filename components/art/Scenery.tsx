/**
 * The illustrated furniture of the world: hills, a moon, a
 * cottage, a tree, little mushrooms and lanterns. All drawn with
 * SVG so it stays crisp, themeable and weightless.
 */

export function Moon({ className = "" }: { className?: string }) {
  return (
    <svg className={`moon ${className}`.trim()} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="moonHalo" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="var(--gold-soft)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--gold-soft)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#moonHalo)" />
      <circle cx="60" cy="60" r="31" fill="var(--moonlight)" />
      <circle cx="50" cy="52" r="5" fill="#e8dfc6" opacity="0.55" />
      <circle cx="68" cy="68" r="7" fill="#e8dfc6" opacity="0.4" />
      <circle cx="70" cy="48" r="3" fill="#e8dfc6" opacity="0.45" />
    </svg>
  );
}

const SKY_STARS = [
  { x: 8, y: 14, r: 1.6, delay: 0 },
  { x: 18, y: 28, r: 1, delay: 1.4 },
  { x: 27, y: 9, r: 1.3, delay: 2.6 },
  { x: 36, y: 22, r: 0.9, delay: 0.8 },
  { x: 44, y: 12, r: 1.5, delay: 3.4 },
  { x: 57, y: 24, r: 1, delay: 1.1 },
  { x: 64, y: 8, r: 1.2, delay: 2.1 },
  { x: 73, y: 19, r: 0.9, delay: 0.4 },
  { x: 82, y: 11, r: 1.4, delay: 3 },
  { x: 90, y: 26, r: 1, delay: 1.8 },
  { x: 96, y: 15, r: 1.2, delay: 2.4 },
  { x: 12, y: 38, r: 0.9, delay: 3.8 },
  { x: 51, y: 34, r: 0.8, delay: 2.9 },
  { x: 86, y: 38, r: 0.9, delay: 1.6 },
];

export function StarField({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`star-field ${className}`.trim()}
      viewBox="0 0 100 50"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {SKY_STARS.map((star, index) => (
        <circle
          key={index}
          cx={star.x}
          cy={star.y}
          r={star.r / 2}
          fill="var(--moonlight)"
          style={{ animationDelay: `${star.delay}s` }}
        />
      ))}
    </svg>
  );
}

/** Layered rolling hills. `tone` shifts them for day or night scenes. */
export function Hills({ tone = "night" }: { tone?: "night" | "dusk" | "day" }) {
  return (
    <svg className={`hills hills-${tone}`} viewBox="0 0 1200 260" preserveAspectRatio="none" aria-hidden="true">
      <path className="hill hill-far" d="M0 150c120-40 220 10 340-14s210-70 330-48 240 86 350 60 180-46 180-46V260H0Z" />
      <path className="hill hill-mid" d="M0 190c140-52 250 18 380-6s190-62 320-36 250 74 360 46 140-28 140-28V260H0Z" />
      <path className="hill hill-near" d="M0 224c160-34 260 12 420-4s250-44 380-22 260 44 400 22V260H0Z" />
    </svg>
  );
}

const FIREFLIES = [
  { x: 12, y: 62, delay: 0, duration: 15 },
  { x: 26, y: 48, delay: 3, duration: 19 },
  { x: 39, y: 70, delay: 6, duration: 13 },
  { x: 58, y: 55, delay: 1.5, duration: 17 },
  { x: 71, y: 67, delay: 8, duration: 21 },
  { x: 84, y: 45, delay: 4.5, duration: 16 },
  { x: 92, y: 72, delay: 10, duration: 18 },
];

export function Fireflies({ count = FIREFLIES.length }: { count?: number }) {
  return (
    <div className="fireflies" aria-hidden="true">
      {FIREFLIES.slice(0, count).map((fly, index) => (
        <span
          key={index}
          className="firefly"
          style={{
            left: `${fly.x}%`,
            top: `${fly.y}%`,
            animationDelay: `-${fly.delay}s`,
            animationDuration: `${fly.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Butterfly({ className = "" }: { className?: string }) {
  return (
    <svg className={`butterfly ${className}`.trim()} viewBox="0 0 60 48" aria-hidden="true">
      <g className="wing wing-left">
        <path d="M30 24C20 6 4 4 4 16c0 10 12 14 26 8Z" fill="var(--rose-soft)" />
        <path d="M30 26C21 40 8 42 8 33c0-7 9-11 22-7Z" fill="var(--blush)" />
      </g>
      <g className="wing wing-right">
        <path d="M30 24c10-18 26-20 26-8 0 10-12 14-26 8Z" fill="var(--rose-soft)" />
        <path d="M30 26c9 14 22 16 22 7 0-7-9-11-22-7Z" fill="var(--blush)" />
      </g>
      <path d="M30 18v16" stroke="var(--ink)" strokeWidth="2.6" strokeLinecap="round" opacity="0.7" />
      <path d="M30 18l-4-6M30 18l4-6" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function Mushroom({ className = "" }: { className?: string }) {
  return (
    <svg className={`mushroom ${className}`.trim()} viewBox="0 0 48 52" aria-hidden="true">
      <path d="M18 30h12v14a6 6 0 0 1-12 0Z" fill="var(--parchment)" />
      <path d="M4 30C4 15 13 6 24 6s20 9 20 24Z" fill="var(--rose)" />
      <circle cx="16" cy="20" r="4" fill="var(--parchment)" opacity="0.85" />
      <circle cx="31" cy="16" r="3" fill="var(--parchment)" opacity="0.85" />
      <circle cx="35" cy="25" r="2.4" fill="var(--parchment)" opacity="0.7" />
    </svg>
  );
}

export function Lantern({ lit = true, className = "" }: { lit?: boolean; className?: string }) {
  return (
    <svg
      className={`lantern ${className}`.trim()}
      viewBox="0 0 40 64"
      data-lit={lit ? "true" : "false"}
      aria-hidden="true"
    >
      <path d="M20 2v10" stroke="var(--sage-deep)" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 14h20l4 10v22a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6V24Z" fill="var(--parchment)" opacity="0.9" />
      <path d="M10 14h20l4 10H6Z" fill="var(--clay)" />
      <rect className="lantern-flame" x="15" y="28" width="10" height="16" rx="5" fill="var(--gold)" />
      <path d="M6 48h28" stroke="var(--clay)" strokeWidth="2.4" />
    </svg>
  );
}

/** The cottage where the letters are kept. */
export function Cottage({ className = "" }: { className?: string }) {
  return (
    <svg className={`cottage ${className}`.trim()} viewBox="0 0 300 240" aria-hidden="true">
      <ellipse cx="150" cy="226" rx="120" ry="14" fill="var(--sage-deep)" opacity="0.18" />
      <rect x="62" y="112" width="176" height="106" rx="6" fill="var(--parchment)" />
      <path d="M150 34 268 122H32Z" fill="var(--clay)" />
      <path d="M150 34 268 122h-24L150 60 56 122H32Z" fill="var(--clay-deep)" />
      <rect x="196" y="56" width="22" height="40" rx="4" fill="var(--clay-deep)" />
      <path className="chimney-smoke" d="M207 52c0-8 8-8 8-16" stroke="var(--moonlight)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5" />
      <rect x="128" y="152" width="44" height="66" rx="20" fill="var(--sage-deep)" />
      <rect x="134" y="158" width="32" height="60" rx="16" fill="var(--clay)" opacity="0.35" />
      <circle cx="160" cy="188" r="3" fill="var(--gold-soft)" />
      <g className="cottage-window">
        <rect x="82" y="140" width="36" height="34" rx="4" fill="var(--gold-soft)" />
        <path d="M100 140v34M82 157h36" stroke="var(--clay-deep)" strokeWidth="2.6" />
      </g>
      <g className="cottage-window">
        <rect x="182" y="140" width="36" height="34" rx="4" fill="var(--gold-soft)" />
        <path d="M200 140v34M182 157h36" stroke="var(--clay-deep)" strokeWidth="2.6" />
      </g>
      <rect x="76" y="178" width="48" height="14" rx="4" fill="var(--sage-deep)" />
      <rect x="176" y="178" width="48" height="14" rx="4" fill="var(--sage-deep)" />
      {[84, 98, 112, 184, 198, 212].map((x, index) => (
        <g key={x}>
          <path d={`M${x} 178v-10`} stroke="var(--sage)" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx={x} cy="164" r="5" fill={index % 2 === 0 ? "var(--rose-soft)" : "var(--lavender-soft)"} />
          <circle cx={x} cy="164" r="2" fill="var(--gold)" />
        </g>
      ))}
    </svg>
  );
}

/** The wish tree, with branches that hold her wishes. */
export function WishTreeArt({ className = "" }: { className?: string }) {
  return (
    <svg className={`wish-tree-art ${className}`.trim()} viewBox="0 0 420 380" aria-hidden="true">
      <ellipse cx="210" cy="356" rx="150" ry="18" fill="var(--sage-deep)" opacity="0.16" />
      <path
        d="M198 356c0-54-6-96-16-128-8-26-26-44-44-58 22 6 40 18 52 36-2-34 4-62 20-86 16 24 22 52 20 86 12-18 30-30 52-36-18 14-36 32-44 58-10 32-16 74-16 128Z"
        fill="var(--clay-deep)"
      />
      <g className="tree-canopy">
        <circle cx="140" cy="118" r="66" fill="var(--sage-deep)" opacity="0.9" />
        <circle cx="282" cy="124" r="62" fill="var(--sage-deep)" opacity="0.85" />
        <circle cx="210" cy="86" r="76" fill="var(--sage)" opacity="0.95" />
        <circle cx="178" cy="152" r="58" fill="var(--sage)" opacity="0.8" />
        <circle cx="250" cy="156" r="54" fill="var(--sage-deep)" opacity="0.75" />
      </g>
      {[
        { x: 118, y: 150 },
        { x: 168, y: 176 },
        { x: 226, y: 168 },
        { x: 288, y: 150 },
        { x: 258, y: 190 },
      ].map((blossom, index) => (
        <circle
          key={index}
          className="tree-blossom"
          cx={blossom.x}
          cy={blossom.y}
          r="5"
          fill={index % 2 === 0 ? "var(--blush)" : "var(--gold-soft)"}
          style={{ animationDelay: `${index * 0.7}s` }}
        />
      ))}
    </svg>
  );
}

/** The arch she walks through to enter the world. */
export function GateArt({ className = "" }: { className?: string }) {
  return (
    <svg className={`gate-art ${className}`.trim()} viewBox="0 0 320 300" aria-hidden="true">
      <path
        d="M30 300V140a130 130 0 0 1 260 0v160"
        fill="none"
        stroke="var(--clay-deep)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M52 300V142a108 108 0 0 1 216 0v158"
        fill="none"
        stroke="var(--clay)"
        strokeWidth="5"
        opacity="0.6"
      />
      {[
        "M160 32c-16 6-24 18-22 34 16-2 26-14 22-34Z",
        "M160 32c16 6 24 18 22 34-16-2-26-14-22-34Z",
        "M64 128c-14 10-18 24-12 40 14-8 20-22 12-40Z",
        "M256 128c14 10 18 24 12 40-14-8-20-22-12-40Z",
        "M44 206c-14 8-20 22-14 38 14-8 22-20 14-38Z",
        "M276 206c14 8 20 22 14 38-14-8-22-20-14-38Z",
      ].map((leaf, index) => (
        <path key={index} d={leaf} fill="var(--sage-deep)" opacity="0.85" />
      ))}
      {[
        { x: 160, y: 24 },
        { x: 92, y: 74 },
        { x: 228, y: 74 },
        { x: 44, y: 176 },
        { x: 276, y: 176 },
      ].map((bloom, index) => (
        <g key={index} transform={`translate(${bloom.x} ${bloom.y})`}>
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse key={angle} cx="0" cy="-9" rx="5" ry="9" fill="var(--rose-soft)" transform={`rotate(${angle})`} />
          ))}
          <circle r="4" fill="var(--gold)" />
        </g>
      ))}
    </svg>
  );
}

/** One half of the gate — two of these swing open on entry. */
export function GateDoor({ side }: { side: "left" | "right" }) {
  return (
    <svg className={`gate-door-art gate-door-${side}`} viewBox="0 0 120 220" aria-hidden="true">
      <rect x="2" y="6" width="116" height="208" rx="10" fill="var(--twilight-deep)" opacity="0.28" />
      {[18, 42, 66, 90].map((x) => (
        <path key={x} d={`M${x} 14v196`} stroke="var(--clay-deep)" strokeWidth="7" strokeLinecap="round" />
      ))}
      <path d="M8 60h104M8 160h104" stroke="var(--clay-deep)" strokeWidth="8" strokeLinecap="round" />
      <circle cx={side === "left" ? 104 : 16} cy="110" r="7" fill="var(--gold)" />
    </svg>
  );
}

/** The little brass padlock that hangs on the doors until she types the code. */
export function Padlock({ className = "" }: { className?: string }) {
  return (
    <svg className={`padlock ${className}`.trim()} viewBox="0 0 80 112" aria-hidden="true">
      <path
        className="padlock-shackle"
        d="M25 52V34a15 15 0 0 1 30 0v18"
        fill="none"
        stroke="var(--gold-soft)"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <rect x="8" y="48" width="64" height="56" rx="13" fill="var(--gold)" stroke="var(--clay-deep)" strokeWidth="3" />
      <rect x="8" y="48" width="64" height="56" rx="13" fill="var(--moonlight)" opacity="0.18" />
      <circle cx="40" cy="70" r="7.5" fill="var(--clay-deep)" opacity="0.72" />
      <path d="M40 76v13" stroke="var(--clay-deep)" strokeWidth="5.5" strokeLinecap="round" opacity="0.72" />
    </svg>
  );
}
