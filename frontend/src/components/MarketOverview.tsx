"use client";

import type { CoinTick } from "@/lib/types";
import { formatPrice, type Currency } from "@/lib/currency";

interface MarketOverviewProps {
  prices: Record<string, CoinTick>;
  currency: Currency;
}

export function MarketOverview({ prices, currency }: MarketOverviewProps) {
  const coins = Object.values(prices);
  if (coins.length === 0) return null;

  const gainers = coins.filter((c) => c.change24h > 0).length;
  const losers = coins.filter((c) => c.change24h < 0).length;
  const bestPerformer = coins.reduce((a, b) => (a.change24h > b.change24h ? a : b));
  const worstPerformer = coins.reduce((a, b) => (a.change24h < b.change24h ? a : b));
  const avgChange = coins.reduce((sum, c) => sum + c.change24h, 0) / coins.length;

  const stats = [
    {
      label: "Market Sentiment",
      value: avgChange >= 0 ? "Bullish" : "Bearish",
      sub: `${avgChange >= 0 ? "+" : ""}${avgChange.toFixed(2)}% avg`,
      color: avgChange >= 0 ? "text-emerald-400" : "text-red-400",
      glow: avgChange >= 0 ? "shadow-emerald-500/10" : "shadow-red-500/10",
    },
    {
      label: "Gainers / Losers",
      value: `${gainers} / ${losers}`,
      sub: `${coins.length} tracked`,
      color: gainers > losers ? "text-emerald-400" : "text-red-400",
      glow: gainers > losers ? "shadow-emerald-500/10" : "shadow-red-500/10",
    },
    {
      label: "Top Performer",
      value: bestPerformer.symbol.replace("USDT", ""),
      sub: `${formatPrice(bestPerformer.price, currency)} (+${bestPerformer.change24h.toFixed(2)}%)`,
      color: "text-emerald-400",
      glow: "shadow-emerald-500/10",
    },
    {
      label: "Worst Performer",
      value: worstPerformer.symbol.replace("USDT", ""),
      sub: `${formatPrice(worstPerformer.price, currency)} (${worstPerformer.change24h.toFixed(2)}%)`,
      color: "text-red-400",
      glow: "shadow-red-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`glass rounded-xl p-4 shadow-lg ${stat.glow}`}
        >
          <div className="text-[10px] uppercase tracking-wider text-zinc-600 mb-1.5">
            {stat.label}
          </div>
          <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
          <div className="text-xs text-zinc-500 mt-0.5">{stat.sub}</div>
        </div>
      ))}
    </div>
  );
}
