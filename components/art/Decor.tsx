import type { StampMotif } from "@/data/letters";

/** Small line-drawn motifs used on stamps, seals and dividers. */
export function Motif({ motif, size = 20 }: { motif: StampMotif; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (motif) {
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20.3C8.6 18 3.4 14.4 3.4 10.1A4.1 4.1 0 0 1 12 7.7a4.1 4.1 0 0 1 8.6 2.4c0 4.3-5.2 7.9-8.6 10.2Z" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M5 19c-1.4-7.6 3.4-13.4 14-14 .8 9.9-5.2 15.1-14 14Z" />
          <path d="M5.6 18.6C8.8 15 12.4 12 16.4 9.8" />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4.4" />
          <path d="M12 3v2.1M12 18.9V21M3 12h2.1M18.9 12H21M5.6 5.6l1.5 1.5M16.9 16.9l1.5 1.5M18.4 5.6l-1.5 1.5M7.1 16.9l-1.5 1.5" />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          <path d="M15.6 3.4A8.6 8.6 0 1 0 20.6 16A7.6 7.6 0 0 1 15.6 3.4Z" />
          <path d="M6.2 5.6h.01M4.6 9.2h.01" />
        </svg>
      );
    case "bird":
      return (
        <svg {...common}>
          <path d="M3 13.4c2.6-3.6 5.3-3.8 8-.8 2.7-3 5.4-2.8 8 .8" />
          <path d="M8.4 16.6c2.3-1.4 4.9-1.4 7.2 0" />
        </svg>
      );
    case "flower":
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2.1" />
          <path d="M12 9.9c0-2.6-.7-4.6 0-5.9.7 1.3 0 3.3 0 5.9ZM14.1 12c2.6 0 4.6-.7 5.9 0-1.3.7-3.3 0-5.9 0ZM12 14.1c0 2.6.7 4.6 0 5.9-.7-1.3 0-3.3 0-5.9ZM9.9 12c-2.6 0-4.6.7-5.9 0 1.3-.7 3.3 0 5.9 0ZM13.5 10.5c1.8-1.8 3.4-3.1 4.8-3.2-.1 1.4-1.4 3-3.2 4.8ZM10.5 13.5c-1.8 1.8-3.1 3.4-3.2 4.8 1.4-.1 3-1.4 4.8-3.2Z" />
        </svg>
      );
  }
}

/** A perforated postage stamp with a motif inside. */
export function Stamp({ motif, label, className = "" }: { motif: StampMotif; label: string; className?: string }) {
  return (
    <span className={`stamp ${className}`} aria-hidden="true">
      <span className="stamp-inner">
        <Motif motif={motif} size={22} />
        <span className="stamp-label">{label}</span>
      </span>
    </span>
  );
}

/** Round pressed-wax seal. */
export function WaxSeal({ motif = "heart", className = "" }: { motif?: StampMotif; className?: string }) {
  return (
    <span className={`wax-seal ${className}`} aria-hidden="true">
      <Motif motif={motif} size={15} />
    </span>
  );
}

/** Faint circular postmark, like a letter that has actually travelled. */
export function Postmark({ text = "with love" }: { text?: string }) {
  return (
    <svg className="postmark" viewBox="0 0 110 110" aria-hidden="true">
      <defs>
        <path id="postmark-arc" d="M55 97a42 42 0 1 1 0-84 42 42 0 0 1 0 84" />
      </defs>
      <circle cx="55" cy="55" r="44" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="55" cy="55" r="34" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 4" />
      <text fontSize="9.5" letterSpacing="2.4" fill="currentColor">
        <textPath href="#postmark-arc" startOffset="26%" textAnchor="middle">
          {text.toUpperCase()}
        </textPath>
      </text>
      <path d="M38 55h34M55 44v22" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

/** Botanical sprig, used as a section divider and small flourish. */
export function Sprig({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={`sprig ${className}`}
      viewBox="0 0 120 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M4 17h112" opacity="0.35" />
      <path d="M60 17c-6-6-13-8-21-7 3 7 10 10 21 7Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M60 17c6-6 13-8 21-7-3 7-10 10-21 7Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M60 17c-4 5-6 10-5 16 5-3 7-9 5-16Z" fill="currentColor" fillOpacity="0.1" />
      <circle cx="60" cy="13" r="2.6" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}

/** Drawn stand-in shown wherever a real photo has not been added yet. */
export function PressedFlower({ variant = 0 }: { variant?: number }) {
  const palettes = [
    { petal: "var(--rose-soft)", center: "var(--honey)", leaf: "var(--sage)" },
    { petal: "var(--sage-soft)", center: "var(--honey-soft)", leaf: "var(--sage-deep)" },
    { petal: "var(--lavender-soft)", center: "var(--rose)", leaf: "var(--sage)" },
    { petal: "var(--honey-soft)", center: "var(--rose-deep)", leaf: "var(--sage-deep)" },
  ];
  const tone = palettes[variant % palettes.length];

  return (
    <svg className="pressed-flower" viewBox="0 0 160 200" aria-hidden="true">
      <path
        d="M80 196V96"
        stroke={tone.leaf}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
      <path
        d="M80 150c-16-4-25-14-27-30 15 1 24 10 27 30Z"
        fill={tone.leaf}
        opacity="0.35"
      />
      <path
        d="M80 170c15-5 24-15 26-31-15 1-23 11-26 31Z"
        fill={tone.leaf}
        opacity="0.28"
      />
      <g transform="translate(80 74)">
        {[0, 51, 103, 154, 206, 257, 309].map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-26"
            rx="13"
            ry="25"
            fill={tone.petal}
            opacity="0.85"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle cx="0" cy="0" r="11" fill={tone.center} opacity="0.9" />
        <circle cx="0" cy="0" r="5" fill="var(--paper)" opacity="0.5" />
      </g>
    </svg>
  );
}

/**
 * Ambient petals drifting across a section. Positions are fixed
 * constants so the server and client render identically, and the
 * whole field is hidden when reduced motion is requested.
 */
const PETALS = [
  { left: 6, delay: 0, duration: 19, scale: 0.8, glyph: "❀" },
  { left: 21, delay: 6, duration: 24, scale: 0.55, glyph: "♡" },
  { left: 34, delay: 12, duration: 21, scale: 0.7, glyph: "✿" },
  { left: 48, delay: 3, duration: 26, scale: 0.5, glyph: "♡" },
  { left: 61, delay: 15, duration: 20, scale: 0.75, glyph: "❁" },
  { left: 74, delay: 9, duration: 23, scale: 0.6, glyph: "❀" },
  { left: 86, delay: 18, duration: 25, scale: 0.65, glyph: "♡" },
  { left: 95, delay: 2, duration: 22, scale: 0.5, glyph: "✦" },
];

export function PetalField({ tone = "rose" }: { tone?: "rose" | "sage" | "mixed" }) {
  return (
    <div className={`petal-field petal-field-${tone}`} aria-hidden="true">
      {PETALS.map((petal, index) => (
        <span
          key={index}
          className="drifting-petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `-${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            fontSize: `${petal.scale * 20}px`,
          }}
        >
          {petal.glyph}
        </span>
      ))}
    </div>
  );
}

/** Icons for the little things she collects around the world. */
export function ThingIcon({ icon, size = 26 }: { icon: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 32 32", "aria-hidden": true };

  switch (icon) {
    case "firefly":
      return (
        <svg {...common}>
          <circle cx="16" cy="19" r="9" fill="var(--gold-soft)" opacity="0.4" />
          <ellipse cx="16" cy="19" rx="4" ry="5" fill="var(--gold)" />
          <path d="M13 15c-4-5-9-5-9-1 0 3 4 5 9 1ZM19 15c4-5 9-5 9-1 0 3-4 5-9 1Z" fill="var(--moonlight)" opacity="0.8" />
        </svg>
      );
    case "mushroom":
      return (
        <svg {...common}>
          <path d="M12 18h8v8a4 4 0 0 1-8 0Z" fill="var(--parchment)" />
          <path d="M3 18C3 9 9 3 16 3s13 6 13 15Z" fill="var(--rose)" />
          <circle cx="11" cy="12" r="2.6" fill="var(--parchment)" />
          <circle cx="21" cy="10" r="2" fill="var(--parchment)" />
        </svg>
      );
    case "petal":
      return (
        <svg {...common}>
          <path d="M16 3c7 6 9 13 5 19-4 6-10 6-14 0-4-6-2-13 9-19Z" fill="var(--rose-soft)" />
          <path d="M16 6c-4 7-4 13 0 19" stroke="var(--rose-deep)" strokeWidth="1.1" fill="none" opacity="0.5" />
        </svg>
      );
    case "seal":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="12" fill="var(--rose-deep)" />
          <circle cx="16" cy="16" r="9" fill="none" stroke="var(--blush)" strokeOpacity="0.5" />
          <path d="M16 22c-3-2-6-4.6-6-8a3.4 3.4 0 0 1 6-2 3.4 3.4 0 0 1 6 2c0 3.4-3 6-6 8Z" fill="var(--blush)" />
        </svg>
      );
    case "pressed":
      return (
        <svg {...common}>
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse key={angle} cx="16" cy="9" rx="4.4" ry="7.6" fill="var(--lavender-soft)" transform={`rotate(${angle} 16 16)`} />
          ))}
          <circle cx="16" cy="16" r="3.4" fill="var(--gold)" />
        </svg>
      );
    case "comet":
      return (
        <svg {...common}>
          <path d="M4 28C8 18 14 12 24 8l-4 12Z" fill="var(--moonlight)" opacity="0.35" />
          <path d="M23 4l2.2 5.8L31 12l-5.8 2.2L23 20l-2.2-5.8L15 12l5.8-2.2Z" fill="var(--gold-soft)" />
        </svg>
      );
    case "lantern":
    default:
      return (
        <svg {...common}>
          <path d="M16 2v4" stroke="var(--clay-deep)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8 8h16l3 6v12a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V14Z" fill="var(--parchment)" />
          <path d="M8 8h16l3 6H5Z" fill="var(--clay)" />
          <rect x="12" y="16" width="8" height="11" rx="4" fill="var(--gold)" />
        </svg>
      );
  }
}
