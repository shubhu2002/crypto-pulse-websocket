"use client";

export function Logo({ size = 32 }: { size?: number }) {
  const id = `cp-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main gradient — electric green to vivid blue-violet */}
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="44" y2="44">
          <stop stopColor="#0d0d0d" />
          <stop offset="1" stopColor="#111113" />
        </linearGradient>

        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="44" y2="44">
          <stop stopColor="#10b981" />
          <stop offset="0.5" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>

        <linearGradient id={`${id}-pulse`} x1="8" y1="22" x2="36" y2="22">
          <stop stopColor="#10b981" />
          <stop offset="0.4" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>

        <linearGradient id={`${id}-glow`} x1="22" y1="8" x2="22" y2="36">
          <stop stopColor="#10b981" stopOpacity="0.25" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>

        {/* Animated dash for the ring */}
        <filter id={`${id}-blur`}>
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      {/* Outer glow */}
      <rect x="1" y="1" width="42" height="42" rx="13" fill="none" stroke={`url(#${id}-ring)`} strokeWidth="1.5" strokeOpacity="0.3" filter={`url(#${id}-blur)`} />

      {/* Background */}
      <rect x="2" y="2" width="40" height="40" rx="12" fill={`url(#${id}-bg)`} />

      {/* Gradient border ring */}
      <rect x="2" y="2" width="40" height="40" rx="12" fill="none" stroke={`url(#${id}-ring)`} strokeWidth="1.2" strokeOpacity="0.6" />

      {/* Inner ambient glow */}
      <ellipse cx="22" cy="16" rx="14" ry="10" fill={`url(#${id}-glow)`} />

      {/* Hexagon crypto symbol — rotated, subtle */}
      <path
        d="M22 10 L28.5 13.8 L28.5 21.2 L22 25 L15.5 21.2 L15.5 13.8 Z"
        fill="none"
        stroke={`url(#${id}-ring)`}
        strokeWidth="0.6"
        strokeOpacity="0.2"
      />

      {/* The PULSE — heartbeat / EKG line with sharp crypto-chart peaks */}
      <path
        d="M7 24 L11 24 L13.5 27 L16 16 L19 30 L22 11 L25 28 L27.5 17 L30 24 L33 24 L37 24"
        stroke={`url(#${id}-pulse)`}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Draw-on animation */}
        <animate
          attributeName="stroke-dasharray"
          from="0 200"
          to="200 0"
          dur="1.5s"
          fill="freeze"
        />
      </path>

      {/* Glow shadow behind the pulse line */}
      <path
        d="M7 24 L11 24 L13.5 27 L16 16 L19 30 L22 11 L25 28 L27.5 17 L30 24 L33 24 L37 24"
        stroke={`url(#${id}-pulse)`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.15"
        filter={`url(#${id}-blur)`}
      >
        <animate
          attributeName="stroke-dasharray"
          from="0 200"
          to="200 0"
          dur="1.5s"
          fill="freeze"
        />
      </path>

      {/* Live dot — pulsing at the tip */}
      <circle cx="37" cy="24" r="2.5" fill="#10b981">
        <animate attributeName="opacity" values="0;1;1" dur="1.5s" fill="freeze" />
        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" begin="1.5s" repeatCount="indefinite" />
      </circle>
      {/* Expanding ring pulse */}
      <circle cx="37" cy="24" r="2.5" fill="none" stroke="#10b981" strokeWidth="1">
        <animate attributeName="r" values="2.5;7;2.5" dur="2s" begin="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" begin="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Tiny sparkle dots along the line */}
      <circle cx="22" cy="11" r="1.2" fill="#8b5cf6" opacity="0">
        <animate attributeName="opacity" values="0;0.8;0" dur="3s" begin="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="16" cy="16" r="1" fill="#06b6d4" opacity="0">
        <animate attributeName="opacity" values="0;0.6;0" dur="2.5s" begin="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="27.5" cy="17" r="1" fill="#10b981" opacity="0">
        <animate attributeName="opacity" values="0;0.7;0" dur="2.8s" begin="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
