"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { CoinTick, PricePoint } from "@/lib/types";
import { COIN_META } from "@/lib/types";
import { CoinIcon } from "./CoinIcon";
import { formatPrice, formatVolume, type Currency } from "@/lib/currency";
import { useHistoricalData, type TimePeriod } from "@/hooks/useHistoricalData";

const PERIODS: { key: TimePeriod; label: string }[] = [
  { key: "live", label: "Live" },
  { key: "1D", label: "1D" },
  { key: "1W", label: "1W" },
  { key: "1M", label: "1M" },
  { key: "ALL", label: "All" },
];

interface DetailChartProps {
  tick: CoinTick;
  history: PricePoint[];
  currency: Currency;
}

export function DetailChart({ tick, history: liveHistory, currency }: DetailChartProps) {
  const [period, setPeriod] = useState<TimePeriod>("live");
  const { data: historicalData, loading } = useHistoricalData(tick.symbol, period);

  const meta = COIN_META[tick.symbol] ?? { name: tick.symbol, color: "#888" };
  const symbol = tick.symbol.replace("USDT", "");
  const isPositive = tick.change24h >= 0;

  const chartData = period === "live" ? liveHistory : historicalData;
  const chartColor = period === "live"
    ? (isPositive ? "#10b981" : "#ef4444")
    : chartData.length >= 2
      ? chartData[chartData.length - 1].price >= chartData[0].price ? "#10b981" : "#ef4444"
      : "#10b981";

  const formatTimeLabel = (ts: number) => {
    const d = new Date(ts);
    if (period === "live") return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    if (period === "1D") return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    if (period === "1W") return d.toLocaleDateString([], { weekday: "short", hour: "2-digit" });
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  const formatTooltipLabel = (ts: number) => {
    const d = new Date(ts);
    if (period === "live") return d.toLocaleTimeString();
    if (period === "1D") return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return d.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
  };

  const priceRange = chartData.length > 0
    ? { min: Math.min(...chartData.map((p) => p.price)), max: Math.max(...chartData.map((p) => p.price)) }
    : { min: 0, max: 0 };
  const padding = (priceRange.max - priceRange.min) * 0.15 || 1;

  const periodLabel = period === "live"
    ? "Live streaming — updates every second"
    : period === "1D" ? "Last 24 hours — 15min candles"
    : period === "1W" ? "Last 7 days — 2hr candles"
    : period === "1M" ? "Last 30 days — daily candles"
    : "All time — weekly candles";

  return (
    <div className="relative overflow-hidden glass rounded-2xl">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)`,
        }}
      />

      <div
        className="absolute -top-32 -right-32 h-64 w-64 rounded-full blur-[100px] opacity-[0.07]"
        style={{ backgroundColor: meta.color }}
      />

      <div className="relative p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <CoinIcon symbol={tick.symbol} size={44} />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-zinc-100">{meta.name}</h2>
                <span className="text-xs text-zinc-600">{symbol}/USDT</span>
              </div>
              <div className="flex items-baseline gap-3 mt-0.5">
                <span className="text-2xl font-bold text-zinc-100">{formatPrice(tick.price, currency)}</span>
                <span
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    isPositive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  <span className="text-xs">{isPositive ? "▲" : "▼"}</span>
                  {isPositive ? "+" : ""}{tick.change24h.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5">
              {[
                { label: "24h High", value: formatPrice(tick.high24h, currency), color: "text-emerald-400" },
                { label: "24h Low", value: formatPrice(tick.low24h, currency), color: "text-red-400" },
                { label: "Volume", value: formatVolume(tick.volume24h), color: "text-blue-400" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-white/3 border border-white/4 px-2.5 py-1.5 text-center">
                  <div className="text-[9px] text-zinc-600 mb-0.5">{s.label}</div>
                  <div className={`text-[11px] font-semibold ${s.color}`}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Period filter */}
        <div className="flex items-center gap-1 mb-3 p-0.5 rounded-lg bg-white/2 border border-white/4 w-fit">
          {PERIODS.map((p) => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all ${
                period === p.key
                  ? "bg-white/8 text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-400"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="h-64 rounded-xl bg-black/20 border border-white/3 p-2">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/3 mb-2">
                  <div className="h-3 w-3 rounded-full border-2 border-zinc-700 border-t-zinc-500 animate-spin" />
                </div>
                <p className="text-xs text-zinc-600">Loading historical data...</p>
              </div>
            </div>
          ) : chartData.length < 3 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/3 mb-2">
                  <div className="h-3 w-3 rounded-full border-2 border-zinc-700 border-t-zinc-500 animate-spin" />
                </div>
                <p className="text-xs text-zinc-600">Collecting price data...</p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="detailGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartColor} stopOpacity={0.25} />
                    <stop offset="50%" stopColor={chartColor} stopOpacity={0.08} />
                    <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis
                  dataKey="time"
                  tickFormatter={formatTimeLabel}
                  tick={{ fontSize: 10, fill: "#3f3f46" }}
                  axisLine={{ stroke: "rgba(255,255,255,0.03)" }}
                  tickLine={false}
                  minTickGap={50}
                />
                <YAxis
                  domain={[priceRange.min - padding, priceRange.max + padding]}
                  tickFormatter={(v: number) => formatPrice(v, currency)}
                  tick={{ fontSize: 10, fill: "#3f3f46" }}
                  axisLine={false}
                  tickLine={false}
                  width={90}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(10,10,12,0.95)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    fontSize: "11px",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  }}
                  labelFormatter={(label) => formatTooltipLabel(label as number)}
                  formatter={(value) => [formatPrice(value as number, currency), "Price"]}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={chartColor}
                  strokeWidth={2}
                  fill="url(#detailGrad)"
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-700">
          <span>{periodLabel}</span>
          <span>{chartData.length} data points</span>
        </div>
      </div>
    </div>
  );
}
