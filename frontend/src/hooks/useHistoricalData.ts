"use client";

import { useEffect, useState } from "react";
import type { PricePoint } from "@/lib/types";

export type TimePeriod = "live" | "1D" | "1W" | "1M" | "ALL";

const PERIOD_CONFIG: Record<Exclude<TimePeriod, "live">, { interval: string; limit: number }> = {
  "1D": { interval: "15m", limit: 96 },
  "1W": { interval: "2h", limit: 84 },
  "1M": { interval: "1d", limit: 30 },
  "ALL": { interval: "1w", limit: 200 },
};

export function useHistoricalData(symbol: string, period: TimePeriod) {
  const [data, setData] = useState<PricePoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (period === "live") {
      setData([]);
      return;
    }

    let cancelled = false;
    const cfg = PERIOD_CONFIG[period];

    setLoading(true);
    fetch(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${cfg.interval}&limit=${cfg.limit}`
    )
      .then((res) => res.json())
      .then((klines: number[][]) => {
        if (cancelled) return;
        const points: PricePoint[] = klines.map((k) => ({
          time: k[0] as number,
          price: parseFloat(k[4] as unknown as string),
        }));
        setData(points);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [symbol, period]);

  return { data, loading };
}
