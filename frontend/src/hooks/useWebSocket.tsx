/* eslint-disable react-hooks/immutability */
'use client';

import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
	useCallback,
} from 'react';
import type { CoinTick, PricePoint, ServerMessage } from '@/lib/types';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? 'wss://crypto-pulse-websocket-server.onrender.com/ws';
const MAX_HISTORY = 60;

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

interface WebSocketContextValue {
	prices: Record<string, CoinTick>;
	history: Record<string, PricePoint[]>;
	status: ConnectionStatus;
}

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
	const [prices, setPrices] = useState<Record<string, CoinTick>>({});
	const [history, setHistory] = useState<Record<string, PricePoint[]>>({});
	const [status, setStatus] = useState<ConnectionStatus>('connecting');
	const wsRef = useRef<WebSocket | null>(null);
	const retriesRef = useRef(0);
	const reconnectRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const unmountedRef = useRef(false);

	const connect = useCallback(() => {
		setStatus('connecting');
		const ws = new WebSocket(WS_URL);
		wsRef.current = ws;

		ws.onopen = () => {
			setStatus('connected');
			retriesRef.current = 0;
		};

		ws.onmessage = (event) => {
			const msg: ServerMessage = JSON.parse(event.data);

			if (msg.type === 'snapshot') {
				setPrices(msg.data);
				const initialHistory: Record<string, PricePoint[]> = {};
				for (const [symbol, tick] of Object.entries(msg.data)) {
					initialHistory[symbol] = [
						{ time: tick.timestamp, price: tick.price },
					];
				}
				setHistory((prev) => ({ ...prev, ...initialHistory }));
			} else if (msg.type === 'tick') {
				const { symbol, price, timestamp } = msg.data;
				setPrices((prev) => ({ ...prev, [symbol]: msg.data }));

				setHistory((prev) => {
					const existing = prev[symbol] || [];
					const last = existing[existing.length - 1];
					if (last && timestamp - last.time < 1000) return prev;
					const updated = [...existing, { time: timestamp, price }];
					if (updated.length > MAX_HISTORY) updated.shift();
					return { ...prev, [symbol]: updated };
				});
			}
		};

		ws.onclose = () => {
			if (unmountedRef.current) return;
			setStatus('disconnected');
			const base = Math.min(1000 * 2 ** retriesRef.current, 30000);
			const jitter = Math.random() * 1000;
			retriesRef.current++;
			reconnectRef.current = setTimeout(connect, base + jitter);
		};

		ws.onerror = () => {};
	}, []);

	useEffect(() => {
		unmountedRef.current = false;
		connect();
		return () => {
			unmountedRef.current = true;
			if (reconnectRef.current) clearTimeout(reconnectRef.current);
			wsRef.current?.close();
		};
	}, [connect]);

	return (
		<WebSocketContext.Provider value={{ prices, history, status }}>
			{children}
		</WebSocketContext.Provider>
	);
}

export function useWebSocket() {
	const ctx = useContext(WebSocketContext);
	if (!ctx) {
		throw new Error('useWebSocket must be used within a <WebSocketProvider>');
	}
	return ctx;
}
