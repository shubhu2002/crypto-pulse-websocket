"use client";

import { useMemo } from "react";
import type { CoinTick, PricePoint } from "@/lib/types";
import { COIN_META } from "@/lib/types";
import { SparklineChart } from "./SparklineChart";
import { CoinIcon } from "./CoinIcon";
import { formatPrice, formatVolume, type Currency } from "@/lib/currency";
import { useHistoricalData } from "@/hooks/useHistoricalData";

interface CoinCardProps {
  tick: CoinTick;
  history: PricePoint[];
  rank: number;
  isSelected: boolean;
  onSelect: () => void;
  currency: Currency;
}

export function CoinCard({ tick, history: _liveHistory, rank, isSelected, onSelect, currency }: CoinCardProps) {
  const meta = COIN_META[tick.symbol] ?? { name: tick.symbol, color: "#888" };
  const isPositive = tick.change24h >= 0;
  const { data: allTimeData } = useHistoricalData(tick.symbol, "ALL");

  const sparkData = useMemo(() => {
    if (allTimeData.length < 2) return [];
    const now = Date.now();
    return [...allTimeData, { time: now, price: tick.price }];
  }, [allTimeData, tick.price]);
  const symbol = tick.symbol.replace("USDT", "");

  return (
    <button
      onClick={onSelect}
      className={`group relative w-full text-left overflow-hidden rounded-2xl transition-all duration-300 ${
        isSelected
          ? "glass border-white/[0.1] shadow-xl shadow-black/30 scale-[1.02]"
          : "glass glass-hover border-white/[0.04]"
      }`}
    >
      <div
        className="absolute inset-x-0 top-0 h-px opacity-60"
        style={{
          background: `linear-gradient(90deg, transparent, ${meta.color}80, transparent)`,
        }}
      />

      <div
        className="absolute -top-8 -left-8 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20"
        style={{ backgroundColor: meta.color }}
      />

      <div className="relative p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <CoinIcon symbol={tick.symbol} size={36} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-zinc-100">{symbol}</span>
                <span className="text-[10px] text-zinc-700 font-mono">#{rank}</span>
              </div>
              <span className="text-[11px] text-zinc-600">{meta.name}</span>
            </div>
          </div>

          <div
            className={`flex items-center gap-1 rounded-lg px-2 py-0.5 text-[11px] font-semibold ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            <span className="text-[9px]">{isPositive ? "▲" : "▼"}</span>
            {Math.abs(tick.change24h).toFixed(2)}%
          </div>
        </div>

        <div className="text-xl font-bold tracking-tight text-zinc-100 mb-1">
          {formatPrice(tick.price, currency)}
        </div>

        <div className="h-14 -mx-1 mb-2">
          <SparklineChart data={sparkData} color={meta.color} isPositive={isPositive} highlightLast />
        </div>

        <div className="flex justify-between text-[10px] text-zinc-600 border-t border-white/[0.04] pt-2">
          <span>H <span className="text-zinc-500">{formatPrice(tick.high24h, currency)}</span></span>
          <span>L <span className="text-zinc-500">{formatPrice(tick.low24h, currency)}</span></span>
          <span>V <span className="text-zinc-500">{formatVolume(tick.volume24h)}</span></span>
        </div>
      </div>
    </button>
  );
}
