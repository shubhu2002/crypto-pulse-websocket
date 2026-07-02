export interface CoinTick {
	symbol: string;
	price: number;
	change24h: number;
	high24h: number;
	low24h: number;
	volume24h: number;
	timestamp: number;
}

export interface BinanceTickerMsg {
	e: string; // event type
	s: string; // symbol
	c: string; // close price (current price)
	P: string; // price change percent 24h
	h: string; // high 24h
	l: string; // low 24h
	v: string; // volume 24h
	E: number; // event time
}
