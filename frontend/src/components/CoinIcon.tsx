"use client";

interface CoinIconProps {
  symbol: string;
  size?: number;
}

export function CoinIcon({ symbol, size = 36 }: CoinIconProps) {
  const s = symbol.replace("USDT", "");
  const Icon = ICONS[s];
  if (!Icon) {
    return (
      <div
        className="flex items-center justify-center rounded-xl text-xs font-bold text-zinc-400 bg-zinc-800"
        style={{ width: size, height: size }}
      >
        {s.slice(0, 2)}
      </div>
    );
  }
  return <Icon size={size} />;
}

const ICONS: Record<string, React.FC<{ size: number }>> = {
  BTC: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#F7931A" />
      <path
        d="M27.8 17.3c.4-2.5-1.5-3.8-4.2-4.7l.9-3.4-2.1-.5-.8 3.3c-.6-.1-1.1-.3-1.7-.4l.8-3.3-2.1-.5-.9 3.4c-.5-.1-.9-.2-1.4-.3l-2.8-.7-.6 2.2s1.5.4 1.5.4c.8.2 1 .7.9 1.2l-.9 3.7c.1 0 .1 0 .2.1h-.2l-1.3 5.2c-.1.2-.3.6-.9.4 0 0-1.5-.4-1.5-.4l-1 2.4 2.7.7c.5.1 1 .3 1.5.4l-.9 3.5 2.1.5.9-3.4c.6.2 1.1.3 1.7.4l-.9 3.4 2.1.5.9-3.5c3.6.7 6.4.4 7.5-2.9.9-2.6 0-4.1-1.9-5.1 1.4-.3 2.4-1.3 2.7-3.2zm-4.8 6.7c-.7 2.6-5.1 1.2-6.5.8l1.2-4.6c1.5.4 6 1.1 5.3 3.8zm.6-6.7c-.6 2.4-4.3 1.2-5.5.9l1-4.2c1.2.3 5.1.9 4.5 3.3z"
        fill="white"
      />
    </svg>
  ),

  ETH: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#627EEA" />
      <path d="M20 6v10.9l9.2 4.1L20 6z" fill="white" fillOpacity="0.6" />
      <path d="M20 6l-9.2 15 9.2-4.1V6z" fill="white" />
      <path d="M20 27.4v7.6l9.2-12.8L20 27.4z" fill="white" fillOpacity="0.6" />
      <path d="M20 35v-7.6l-9.2-5.2L20 35z" fill="white" />
      <path d="M20 25.7l9.2-4.7-9.2-4.1v8.8z" fill="white" fillOpacity="0.2" />
      <path d="M10.8 21l9.2 4.7v-8.8L10.8 21z" fill="white" fillOpacity="0.6" />
    </svg>
  ),

  SOL: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#0D0D0D" />
      <defs>
        <linearGradient id="sol-g" x1="10" y1="30" x2="30" y2="10">
          <stop stopColor="#9945FF" />
          <stop offset="0.5" stopColor="#14F195" />
          <stop offset="1" stopColor="#00BCD4" />
        </linearGradient>
      </defs>
      <path d="M12.2 25.8a.7.7 0 01.5-.2h17.7a.35.35 0 01.25.6l-3.5 3.5a.7.7 0 01-.5.2H8.9a.35.35 0 01-.25-.6l3.5-3.5z" fill="url(#sol-g)" />
      <path d="M12.2 10.2a.7.7 0 01.5-.2h17.7a.35.35 0 01.25.6l-3.5 3.5a.7.7 0 01-.5.2H8.9a.35.35 0 01-.25-.6l3.5-3.5z" fill="url(#sol-g)" />
      <path d="M27.1 17.9a.7.7 0 00-.5-.2H8.9a.35.35 0 00-.25.6l3.5 3.5a.7.7 0 00.5.2h17.7a.35.35 0 00.25-.6l-3.5-3.5z" fill="url(#sol-g)" />
    </svg>
  ),

  DOGE: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#C3A634" />
      <path
        d="M18.5 12h-5v16h5c5 0 9-3.6 9-8s-4-8-9-8zm.5 13h-2.5v-3.5H20v-2.5h-3.5V15.5H19c3.2 0 5.5 2 5.5 4.7S21.7 25 19 25z"
        fill="white"
      />
    </svg>
  ),

  XRP: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#00AAE4" />
      <path
        d="M28.5 11h3l-6.8 6.5a6.5 6.5 0 01-9 0L8.5 11h3l5.4 5.1a4.2 4.2 0 005.8 0L28.5 11zM11.5 29H8.5l6.8-6.5a6.5 6.5 0 019 0l6.7 6.5h-3l-5.4-5.1a4.2 4.2 0 00-5.8 0L11.5 29z"
        fill="white"
      />
    </svg>
  ),

  BNB: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#F3BA2F" />
      <path d="M20 10l3 3-6 6-3-3 6-6zm8 8l3 3-3 3-3-3 3-3zm-16 0l3 3-3 3-3-3 3-3zm8 8l3 3-6 6-3-3 6-6zm0-5l3-3 3 3-3 3-3-3z" fill="white" />
    </svg>
  ),

  ADA: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#0033AD" />
      <g fill="white">
        <circle cx="20" cy="10" r="2" />
        <circle cx="20" cy="30" r="2" />
        <circle cx="11.4" cy="15" r="2" />
        <circle cx="28.6" cy="15" r="2" />
        <circle cx="11.4" cy="25" r="2" />
        <circle cx="28.6" cy="25" r="2" />
        <circle cx="20" cy="17" r="1.2" />
        <circle cx="20" cy="23" r="1.2" />
        <circle cx="14.8" cy="20" r="1.2" />
        <circle cx="25.2" cy="20" r="1.2" />
        <circle cx="16.5" cy="17.5" r="0.8" />
        <circle cx="23.5" cy="17.5" r="0.8" />
        <circle cx="16.5" cy="22.5" r="0.8" />
        <circle cx="23.5" cy="22.5" r="0.8" />
      </g>
    </svg>
  ),

  MATIC: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#8247E5" />
      <path
        d="M26 16.2a1.3 1.3 0 00-1.2 0l-3 1.7-2 1.2-3 1.7a1.3 1.3 0 01-1.2 0l-2.3-1.4a1.2 1.2 0 01-.6-1v-2.7a1.1 1.1 0 01.6-1l2.3-1.3a1.3 1.3 0 011.2 0l2.3 1.3a1.2 1.2 0 01.6 1v1.7l2-1.2v-1.7a1.1 1.1 0 00-.6-1l-4.3-2.5a1.3 1.3 0 00-1.2 0l-4.4 2.5a1.1 1.1 0 00-.6 1v5.1a1.1 1.1 0 00.6 1l4.3 2.5a1.3 1.3 0 001.2 0l3-1.7 2-1.2 3-1.7a1.3 1.3 0 011.2 0l2.3 1.4a1.2 1.2 0 01.6 1v2.7a1.1 1.1 0 01-.6 1l-2.3 1.4a1.3 1.3 0 01-1.2 0l-2.3-1.4a1.2 1.2 0 01-.6-1v-1.7l-2 1.2v1.7a1.1 1.1 0 00.6 1l4.3 2.5a1.3 1.3 0 001.2 0l4.3-2.5a1.1 1.1 0 00.6-1v-5.1a1.1 1.1 0 00-.6-1L26 16.2z"
        fill="white"
      />
    </svg>
  ),

  PAXG: ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#FFD700" />
      <path d="M20 8l-8 12h5v12h6V20h5L20 8z" fill="white" fillOpacity="0.9" />
      <circle cx="20" cy="26" r="3" fill="white" fillOpacity="0.6" />
    </svg>
  ),
};
