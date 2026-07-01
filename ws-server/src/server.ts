import express from "express";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";

// ──────────────────────────────────────────────
//  CONFIG — coins we track
// ──────────────────────────────────────────────
const COINS = [
  "btcusdt", "ethusdt", "solusdt", "dogeusdt", "xrpusdt",
  "bnbusdt", "adausdt", "maticusdt", "paxgusdt",
];
const PORT = 4000;

// ──────────────────────────────────────────────
//  TYPES
// ──────────────────────────────────────────────
interface CoinTick {
  symbol: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  timestamp: number;
}

interface BinanceTickerMsg {
  e: string;   // event type
  s: string;   // symbol
  c: string;   // close price (current price)
  P: string;   // price change percent 24h
  h: string;   // high 24h
  l: string;   // low 24h
  v: string;   // volume 24h
  E: number;   // event time
}

// ──────────────────────────────────────────────
//  EXPRESS + HTTP SERVER
// ──────────────────────────────────────────────
const app = express();
const server = http.createServer(app);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", clients: clients.size, coins: COINS });
});

// ──────────────────────────────────────────────
//  WEBSOCKET SERVER — attached to the HTTP server
//  (Ch 7: Express integration)
// ──────────────────────────────────────────────
const wss = new WebSocketServer({ server, path: "/ws" });

const clients = new Set<WebSocket>();
const latestPrices = new Map<string, CoinTick>();

wss.on("connection", (ws, req) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log(`[connect] client from ${ip}  (total: ${clients.size + 1})`);
  clients.add(ws);

  // Send current prices snapshot immediately so the UI isn't empty
  if (latestPrices.size > 0) {
    ws.send(JSON.stringify({
      type: "snapshot",
      data: Object.fromEntries(latestPrices),
    }));
  }

  // Handle client messages (e.g. subscribe/unsubscribe — extensible)
  ws.on("message", (raw) => {
    try {
      const msg = JSON.parse(raw.toString());
      console.log(`[message] from client:`, msg);
    } catch {
      console.log(`[message] non-JSON from client:`, raw.toString());
    }
  });

  ws.on("close", (code, reason) => {
    clients.delete(ws);
    console.log(`[disconnect] code=${code}  (total: ${clients.size})`);
  });

  ws.on("error", (err) => {
    console.error(`[error] client error:`, err.message);
    clients.delete(ws);
  });
});

// ──────────────────────────────────────────────
//  BROADCAST helper
//  (Ch 7: broadcast pattern — send to ALL clients)
// ──────────────────────────────────────────────
function broadcast(data: object) {
  const payload = JSON.stringify(data);
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
}

// ──────────────────────────────────────────────
//  BINANCE UPSTREAM — subscribe to mini tickers
//  Server subscribes ONCE, broadcasts to all clients
// ──────────────────────────────────────────────
function connectToBinance() {
  const streams = COINS.map((c) => `${c}@ticker`).join("/");
  const url = `wss://stream.binance.com:9443/stream?streams=${streams}`;

  console.log(`[binance] connecting to ${COINS.length} streams...`);
  const upstream = new WebSocket(url);

  upstream.on("open", () => {
    console.log(`[binance] connected — streaming ${COINS.join(", ")}`);
  });

  upstream.on("message", (raw) => {
    try {
      const wrapper = JSON.parse(raw.toString());
      const msg: BinanceTickerMsg = wrapper.data;

      const tick: CoinTick = {
        symbol: msg.s,
        price: parseFloat(msg.c),
        change24h: parseFloat(msg.P),
        high24h: parseFloat(msg.h),
        low24h: parseFloat(msg.l),
        volume24h: parseFloat(msg.v),
        timestamp: msg.E,
      };

      latestPrices.set(tick.symbol, tick);

      // Broadcast individual tick to all connected clients
      broadcast({ type: "tick", data: tick });
    } catch (err) {
      console.error("[binance] parse error:", err);
    }
  });

  upstream.on("close", (code) => {
    console.log(`[binance] disconnected (code=${code}), reconnecting in 3s...`);
    setTimeout(connectToBinance, 3000);
  });

  upstream.on("error", (err) => {
    console.error("[binance] error:", err.message);
  });
}

// ──────────────────────────────────────────────
//  HEARTBEAT — ping all clients every 30s
//  (Ch 9: detecting dead connections)
// ──────────────────────────────────────────────
const aliveClients = new WeakSet<WebSocket>();

wss.on("connection", (ws) => {
  aliveClients.add(ws);
  ws.on("pong", () => aliveClients.add(ws));
});

setInterval(() => {
  for (const ws of clients) {
    if (!aliveClients.has(ws)) {
      console.log("[heartbeat] terminating stale client");
      ws.terminate();
      clients.delete(ws);
      continue;
    }
    aliveClients.delete(ws);
    ws.ping();
  }
}, 30_000);

// ──────────────────────────────────────────────
//  START
// ──────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(`\n  WS server running on http://localhost:${PORT}`);
  console.log(`  WebSocket endpoint:  ws://localhost:${PORT}/ws`);
  console.log(`  Health check:        http://localhost:${PORT}/health\n`);
  connectToBinance();
});
