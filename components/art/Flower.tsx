"use client";

import { MAX_STAGE } from "@/lib/garden";

/** Where the top of the stem sits at each stage, in SVG units. */
const TIPS = [206, 178, 154, 128, 104, 90];

const LEAVES = [
  { from: 2, d: "M0 0C-26 -4 -40 -16 -42 -36 -18 -34 -4 -20 0 0Z", x: 98, y: 176, flip: false },
  { from: 2, d: "M0 0C26 -4 40 -16 42 -36 18 -34 4 -20 0 0Z", x: 102, y: 162, flip: true },
  { from: 3, d: "M0 0C-22 -3 -34 -14 -36 -31 -15 -29 -3 -17 0 0Z", x: 98, y: 140, flip: false },
  { from: 4, d: "M0 0C22 -3 34 -14 36 -31 15 -29 3 -17 0 0Z", x: 102, y: 124, flip: true },
];

const PETALS = [0, 45, 90, 135, 180, 225, 270, 315];

type FlowerProps = {
  stage: number;
  /** Extra blossoms that appear once it has bloomed and she keeps coming back. */
  extras?: number;
  /** Plays the little growth jolt. */
  growing?: boolean;
  className?: string;
};

/**
 * The flower itself. Everything is driven by `stage` (0–5) and
 * animated with CSS transitions, so it grows smoothly rather than
 * snapping between pictures.
 */
export default function Flower({ stage, extras = 0, growing = false, className = "" }: FlowerProps) {
  const safeStage = Math.min(MAX_STAGE, Math.max(0, stage));
  const tip = TIPS[safeStage];
  const grown = safeStage / MAX_STAGE;

  return (
    <svg
      className={`flower-art ${className}`.trim()}
      viewBox="0 0 200 270"
      role="img"
      aria-label={`Our flower, stage ${safeStage} of ${MAX_STAGE}`}
      data-stage={safeStage}
      data-growing={growing ? "true" : "false"}
    >
      <defs>
        <linearGradient id="potFill" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#d49a86" />
          <stop offset="55%" stopColor="#c8886f" />
          <stop offset="100%" stopColor="#b1725d" />
        </linearGradient>
        <radialGradient id="bloomGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--gold-soft)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--gold-soft)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft light behind a bloomed flower */}
      <circle className="flower-glow" cx="100" cy={tip - 6} r="62" fill="url(#bloomGlow)" />

      {/* companion blooms, for the days after it opened */}
      <g className="flower-extras">
        {[
          { x: 48, y: 214, scale: 0.5, hue: "var(--rose-soft)" },
          { x: 152, y: 218, scale: 0.44, hue: "var(--lavender-soft)" },
          { x: 32, y: 228, scale: 0.36, hue: "var(--honey-soft)" },
          { x: 168, y: 232, scale: 0.34, hue: "var(--blush)" },
        ].map((bloom, index) => (
          <g
            key={index}
            className="extra-bloom"
            data-on={index < extras ? "true" : "false"}
            style={{ transform: `translate(${bloom.x}px, ${bloom.y}px) scale(${bloom.scale})` }}
          >
            <path d="M0 0V-34" stroke="var(--sage-deep)" strokeWidth="4" strokeLinecap="round" />
            {PETALS.slice(0, 6).map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-50"
                rx="10"
                ry="17"
                fill={bloom.hue}
                transform={`rotate(${angle} 0 -34)`}
              />
            ))}
            <circle cx="0" cy="-34" r="7" fill="var(--gold)" />
          </g>
        ))}
      </g>

      {/* stem — drawn on as it grows */}
      <path
        className="flower-stem"
        d="M100 208C93 182 107 146 100 88"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - grown}
        fill="none"
        stroke="var(--sage-deep)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* leaves */}
      {LEAVES.map((leaf, index) => (
        <path
          key={index}
          className="flower-leaf"
          data-on={safeStage >= leaf.from ? "true" : "false"}
          d={leaf.d}
          fill={index % 2 === 0 ? "var(--sage)" : "var(--sage-deep)"}
          style={{
            transform: `translate(${leaf.x}px, ${leaf.y}px)`,
            transitionDelay: `${index * 120}ms`,
          }}
        />
      ))}

      {/* seed, sprout, bud and bloom all live at the tip of the stem */}
      <g className="flower-head" style={{ transform: `translate(100px, ${tip}px)` }}>
        {/* seed */}
        <ellipse className="flower-seed" data-on={safeStage === 0 ? "true" : "false"} cx="0" cy="-4" rx="7" ry="9" fill="#8a6a4f" transform="rotate(-18)" />

        {/* sprout — two little cotyledon leaves */}
        <g className="flower-sprout" data-on={safeStage === 1 ? "true" : "false"}>
          <path d="M0 0C-14 -2 -22 -9 -23 -21 -10 -20 -2 -12 0 0Z" fill="var(--sage)" />
          <path d="M0 0C14 -2 22 -9 23 -21 10 -20 2 -12 0 0Z" fill="var(--sage-deep)" />
        </g>

        {/* bud */}
        <g className="flower-bud" data-on={safeStage === 4 ? "true" : "false"}>
          <path d="M0 -34C-13 -24 -13 -6 0 2 13 -6 13 -24 0 -34Z" fill="var(--rose-soft)" />
          <path d="M0 2C-9 -2 -12 -12 -11 -20 -4 -14 0 -7 0 2Z" fill="var(--sage)" />
          <path d="M0 2C9 -2 12 -12 11 -20 4 -14 0 -7 0 2Z" fill="var(--sage-deep)" />
        </g>

        {/* the bloom */}
        <g className="flower-bloom" data-on={safeStage >= MAX_STAGE ? "true" : "false"}>
          {PETALS.map((angle, index) => (
            <ellipse
              key={angle}
              className="bloom-petal"
              cx="0"
              cy="-26"
              rx="12"
              ry="21"
              fill={index % 2 === 0 ? "var(--rose-soft)" : "var(--blush)"}
              transform={`rotate(${angle})`}
              style={{ transitionDelay: `${index * 55}ms` }}
            />
          ))}
          <circle cx="0" cy="0" r="11" fill="var(--gold)" />
          <circle cx="0" cy="0" r="5.5" fill="var(--gold-soft)" />
          <g className="bloom-sparkles">
            <path d="M-34 -30l2.6 6.4L-25 -21l-6.4 2.6L-34 -12l-2.6-6.4L-43 -21l6.4-2.6Z" fill="var(--gold-soft)" />
            <path d="M32 -36l1.8 4.4 4.4 1.8-4.4 1.8L32 -23.6l-1.8-4.4-4.4-1.8 4.4-1.8Z" fill="var(--gold-soft)" />
          </g>
        </g>
      </g>

      {/* pot */}
      <g className="flower-pot">
        <path d="M62 212h76l-9 48a6 6 0 0 1-6 5H77a6 6 0 0 1-6-5Z" fill="url(#potFill)" />
        <rect x="56" y="200" width="88" height="16" rx="6" fill="#dca98f" />
        <rect x="56" y="200" width="88" height="16" rx="6" fill="none" stroke="#b1725d" strokeOpacity="0.4" />
        <ellipse cx="100" cy="208" rx="38" ry="7" fill="#7d5a42" />
        <path d="M86 240h28" stroke="#a76a56" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
      </g>
    </svg>
  );
}

/** The watering can she tips over the pot. */
export function WateringCan({ pouring = false }: { pouring?: boolean }) {
  return (
    <svg className="watering-can" viewBox="0 0 120 90" data-pouring={pouring ? "true" : "false"} aria-hidden="true">
      <path d="M44 30h46a8 8 0 0 1 8 8v30a12 12 0 0 1-12 12H48a12 12 0 0 1-12-12V38a8 8 0 0 1 8-8Z" fill="var(--sage)" />
      <path d="M44 30h46a8 8 0 0 1 8 8v6H36v-6a8 8 0 0 1 8-8Z" fill="var(--sage-deep)" />
      <path d="M36 44 10 62l4 6 24-14Z" fill="var(--sage-deep)" />
      <path d="M8 58l-6 6 8 8 6-6Z" fill="var(--sage)" />
      <path d="M62 30c0-10 8-16 18-14" stroke="var(--sage-deep)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M98 50c8 0 12 4 12 10s-4 10-12 10" stroke="var(--sage-deep)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="74" cy="58" r="8" fill="var(--ivory)" fillOpacity="0.5" />
      <path d="M70 58a4 4 0 0 1 8 0" stroke="var(--sage-deep)" strokeWidth="1.6" fill="none" />
    </svg>
  );
}
