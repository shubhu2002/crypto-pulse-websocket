"use client";

import { useState } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Navbar } from "./Navbar";
import { MarketOverview } from "./MarketOverview";
import { CoinCard } from "./CoinCard";
import { DetailChart } from "./DetailChart";
import { COIN_META } from "@/lib/types";
import { CURRENCIES, type Currency } from "@/lib/currency";

const COIN_ORDER = Object.keys(COIN_META);

type SortMode = "rank" | "change" | "price" | "volume";

export function Dashboard() {
  const { prices, history, status } = useWebSocket();
  const [selectedCoin, setSelectedCoin] = useState<string>("BTCUSDT");
  const [sortMode, setSortMode] = useState<SortMode>("rank");
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);

  const availableCoins = COIN_ORDER.filter((s) => prices[s]);

  const filteredCoins = availableCoins.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    const meta = COIN_META[s];
    return (
      s.toLowerCase().includes(q) ||
      meta?.name.toLowerCase().includes(q)
    );
  });

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    switch (sortMode) {
      case "change":
        return prices[b].change24h - prices[a].change24h;
      case "price":
        return prices[b].price - prices[a].price;
      case "volume":
        return prices[b].volume24h - prices[a].volume24h;
      default:
        return 0;
    }
  });

  const selectedTick = prices[selectedCoin];
  const selectedHistory = history[selectedCoin] || [];

  return (
    <div className="min-h-screen mesh-gradient noise-bg">
      <Navbar
        status={status}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      <main className="relative z-10 px-10 py-4 space-y-4">
        {availableCoins.length === 0 ? (
          <div className="flex items-center justify-center h-[70vh]">
            <div className="text-center glass rounded-2xl p-12 max-w-md">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 mb-4">
                <div className="h-6 w-6 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 animate-spin" />
              </div>
              <h2 className="text-lg font-semibold text-zinc-200 mb-2">Connecting...</h2>
              <p className="text-sm text-zinc-500">
                Establishing WebSocket connection to the relay server.
              </p>
              <p className="text-xs text-zinc-700 mt-3">
                Make sure <code className="text-emerald-400/80">ws-server</code> is running on port 4000
              </p>
            </div>
          </div>
        ) : (
          <>
            <MarketOverview prices={prices} currency={currency} />

            {selectedTick && (
              <DetailChart tick={selectedTick} history={selectedHistory} currency={currency} />
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  All Assets
                </h2>
                <span className="text-[10px] text-zinc-700 bg-white/[0.03] px-2 py-0.5 rounded-full">
                  {sortedCoins.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search coins..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-8 w-44 rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 pl-8 text-xs text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:border-emerald-500/30 transition-colors"
                  />
                  <svg className="absolute left-2.5 top-2 h-4 w-4 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4-4" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="flex items-center rounded-lg bg-white/[0.02] border border-white/[0.04] p-0.5">
                  {(["rank", "change", "price", "volume"] as SortMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setSortMode(mode)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${
                        sortMode === mode
                          ? "bg-white/[0.06] text-zinc-200"
                          : "text-zinc-600 hover:text-zinc-400"
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {sortedCoins.map((symbol, i) => (
                <CoinCard
                  key={symbol}
                  tick={prices[symbol]}
                  history={history[symbol] || []}
                  rank={i + 1}
                  isSelected={symbol === selectedCoin}
                  onSelect={() => setSelectedCoin(symbol)}
                  currency={currency}
                />
              ))}
            </div>

            {sortedCoins.length === 0 && search && (
              <div className="text-center py-12">
                <p className="text-sm text-zinc-600">No coins match &quot;{search}&quot;</p>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/[0.03] mt-16">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-700">
          <div className="flex items-center gap-2">
            <span className="text-gradient font-semibold">CryptoPulse</span>
            <span>— WebSocket Learning Project</span>
          </div>
          <span>Express + ws server broadcasting Binance tickers to Next.js clients</span>
        </div>
      </footer>
    </div>
  );
}
