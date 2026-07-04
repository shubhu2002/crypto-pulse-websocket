'use client';

import { useEffect, useState } from 'react';
import type { PricePoint } from '@/lib/types';

export type TimePeriod = 'live' | '1D' | '1W' | '1M' | 'ALL';

const PERIOD_CONFIG: Record<
	Exclude<TimePeriod, 'live'>,
	{ interval: string; limit: number }
> = {
	'1D': { interval: '15m', limit: 96 },
	'1W': { interval: '2h', limit: 84 },
	'1M': { interval: '1d', limit: 30 },
	ALL: { interval: '1w', limit: 120 },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://crypto-pulse-websocket-server.onrender.com';

export function useHistoricalData(symbol: string, period: TimePeriod) {
	const [data, setData] = useState<PricePoint[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (period === 'live') return;
		let cancelled = false;

		const cfg = PERIOD_CONFIG[period];

		setLoading(true);

		fetch(
			`${API_URL}/history?symbol=${symbol}&interval=${cfg.interval}&limit=${cfg.limit}`,
		)
			.then((res) => res.json())
			.then((points) => {
				if (cancelled) return;

				setData(
					points.map((p: any) => ({
						time: p.time,
						price: p.close,
					})),
				);
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, [symbol, period]);

	return { data, loading };
}
