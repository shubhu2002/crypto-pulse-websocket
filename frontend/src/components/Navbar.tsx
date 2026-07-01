"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { StatusBadge } from "./StatusBadge";
import type { ConnectionStatus } from "@/hooks/useWebSocket";
import { CURRENCIES, type Currency } from "@/lib/currency";

interface NavbarProps {
  status: ConnectionStatus;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
}

const NAV_ITEMS = [
  { href: "/", label: "Dashboard" },
  { href: "/docs", label: "Docs" },
];

export function Navbar({ status, currency, onCurrencyChange }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#050507]/70 backdrop-blur-2xl">
      <div className="px-10 h-16 flex items-center justify-between">
        {/* Left: Logo + Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <Logo size={36} />
          <span className="text-[15px] font-extrabold tracking-tight text-gradient">
            CryptoPulse
          </span>
        </Link>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white/[0.06] text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Currency + Status */}
        <div className="flex items-center gap-3">
          {/* Currency selector */}
          <div className="relative">
            <select
              value={currency.code}
              onChange={(e) => {
                const c = CURRENCIES.find((c) => c.code === e.target.value);
                if (c) onCurrencyChange(c);
              }}
              className="appearance-none h-8 pl-3 pr-7 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-zinc-300 font-medium cursor-pointer focus:outline-none focus:border-emerald-500/30 transition-colors"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code} className="bg-zinc-900 text-zinc-300">
                  {c.symbol} {c.code}
                </option>
              ))}
            </select>
            <svg className="absolute right-2 top-2.5 h-3 w-3 text-zinc-600 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <StatusBadge status={status} />
        </div>
      </div>
    </header>
  );
}
