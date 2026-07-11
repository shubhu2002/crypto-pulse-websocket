export interface CoinTick {
  symbol: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  timestamp: number;
}

export interface PricePoint {
  time: number;
  price: number;
}

export interface TickMessage {
  type: "tick";
  data: CoinTick;
}

export interface SnapshotMessage {
  type: "snapshot";
  data: Record<string, CoinTick>;
}

export type ServerMessage = TickMessage | SnapshotMessage;

export interface CoinMeta {
  name: string;
  color: string;
  kind?: "coin" | "commodity";
}

export const COIN_META: Record<string, CoinMeta> = {
  BTCUSDT:   { name: "Bitcoin",    color: "#F7931A" },
  ETHUSDT:   { name: "Ethereum",   color: "#627EEA" },
  SOLUSDT:   { name: "Solana",     color: "#9945FF" },
  DOGEUSDT:  { name: "Dogecoin",   color: "#C3A634" },
  XRPUSDT:   { name: "XRP",        color: "#00AAE4" },
  BNBUSDT:   { name: "BNB",        color: "#F3BA2F" },
  ADAUSDT:   { name: "Cardano",    color: "#0033AD" },
  PAXGUSDT:  { name: "Gold (PAXG)", color: "#FFD700", kind: "commodity" },
};

// Single source of truth for asset counts — derived from COIN_META,
// so adding/removing a coin updates every count across the app.
export const COIN_SYMBOLS = Object.keys(COIN_META);
export const ASSET_COUNT = COIN_SYMBOLS.length;
export const COMMODITY_COUNT = Object.values(COIN_META).filter(
  (m) => m.kind === "commodity"
).length;
export const COIN_COUNT = ASSET_COUNT - COMMODITY_COUNT;
