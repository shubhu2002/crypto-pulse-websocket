# Multi-Coin Crypto Dashboard — WebSocket Learning Project

A real-time cryptocurrency dashboard that streams live prices from Binance using WebSockets. Built as a hands-on learning project covering WebSocket concepts from the ground up.

**Stack:** Next.js 16 · TypeScript · Express · ws · Recharts · Tailwind CSS

---

## What You'll Learn

This project teaches WebSocket concepts by building something real. Each concept maps to a chapter in the WebSocket guide:

| Concept | Where in Code | PDF Chapter |
|---------|--------------|-------------|
| Browser WebSocket API (`new WebSocket`, events) | `frontend/src/hooks/useWebSocket.ts` | Ch 6 |
| Server-side WebSocket with `ws` library | `ws-server/src/server.ts` (lines 50-90) | Ch 7 |
| Express + WebSocket integration | `ws-server/src/server.ts` (HTTP + WSS on same server) | Ch 7 |
| Broadcast pattern (one-to-many) | `broadcast()` function in server | Ch 7 |
| Reconnection with exponential backoff + jitter | `useWebSocket.ts` onclose handler | Ch 9 |
| Ping/Pong heartbeat for stale connections | Server heartbeat interval (every 30s) | Ch 9 |
| JSON message protocol | `TickMessage` / `SnapshotMessage` types | Ch 6 |
| Connection lifecycle (readyState) | `ConnectionStatus` type + StatusBadge | Ch 3 |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    BINANCE (upstream)                        │
│              wss://stream.binance.com:9443                  │
│          Streams: btcusdt@ticker, ethusdt@ticker, ...       │
└─────────────────────┬───────────────────────────────────────┘
                      │ ONE WebSocket connection
                      │ (server subscribes once)
                      ▼
┌─────────────────────────────────────────────────────────────┐
│               WS SERVER (localhost:4000)                     │
│                                                             │
│  Express HTTP Server                                        │
│  ├── GET /health → JSON status                              │
│  └── WebSocketServer on /ws path                            │
│                                                             │
│  Responsibilities:                                          │
│  1. Connect to Binance upstream (1 connection)              │
│  2. Parse ticker data into CoinTick format                  │
│  3. Store latest prices (Map<symbol, CoinTick>)             │
│  4. BROADCAST every tick to ALL connected clients           │
│  5. Send snapshot to new clients on connect                 │
│  6. Ping/pong heartbeat every 30s                           │
│  7. Auto-reconnect to Binance if disconnected               │
└──────────┬──────────┬──────────┬────────────────────────────┘
           │          │          │
           │  WebSocket connections (ws://localhost:4000/ws)
           │          │          │
     ┌─────▼──┐ ┌────▼───┐ ┌───▼────┐
     │Client 1│ │Client 2│ │Client N│    ← Browser tabs
     └────────┘ └────────┘ └────────┘
```

### Why This Architecture?

**Without a relay server**, every browser tab would open its own connection to Binance — wasteful and rate-limited. The WS server acts as a **fan-out relay**: one upstream connection feeds N clients. This is the broadcast pattern from Chapter 7.

---

## Message Protocol

### Server → Client

**Snapshot** (sent once on connect):
```json
{
  "type": "snapshot",
  "data": {
    "BTCUSDT": { "symbol": "BTCUSDT", "price": 58780, "change24h": -1.25, ... },
    "ETHUSDT": { ... }
  }
}
```

**Tick** (sent continuously):
```json
{
  "type": "tick",
  "data": {
    "symbol": "BTCUSDT",
    "price": 58781.50,
    "change24h": -1.24,
    "high24h": 59529,
    "low24h": 57800,
    "volume24h": 21900,
    "timestamp": 1719835200000
  }
}
```

---

## Project Structure

```
multi-coin-dashboard/
├── ws-server/                    # Backend — Express + ws
│   ├── src/
│   │   └── server.ts             # All server logic in one file
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                     # Frontend — Next.js + TypeScript
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx        # Root layout (dark mode)
│   │   │   ├── page.tsx          # Entry point → Dashboard
│   │   │   └── globals.css       # Tailwind base
│   │   ├── components/
│   │   │   ├── Dashboard.tsx     # Main layout + state
│   │   │   ├── CoinCard.tsx      # Individual coin tile with sparkline
│   │   │   ├── DetailChart.tsx   # Large chart for selected coin
│   │   │   ├── SparklineChart.tsx# Mini inline chart (recharts)
│   │   │   └── StatusBadge.tsx   # Connection status indicator
│   │   ├── hooks/
│   │   │   └── useWebSocket.ts   # WebSocket hook (connect, reconnect, history)
│   │   └── lib/
│   │       └── types.ts          # Shared TypeScript types + coin metadata
│   └── package.json
│
└── README.md                     # ← You are here
```

---

## Quick Start

### 1. Start the WebSocket server

```bash
cd ws-server
npm install
npm start          # Runs on port 4000
```

You should see:
```
WS server running on http://localhost:4000
WebSocket endpoint:  ws://localhost:4000/ws
[binance] connected — streaming btcusdt, ethusdt, solusdt, ...
```

### 2. Start the Next.js frontend

```bash
cd frontend
npm install
npm run dev        # Runs on port 3000
```

### 3. Open http://localhost:3000

You'll see 12 coins streaming live prices with sparkline charts. Click any coin to see the detailed price chart.

---

## Coins Tracked

| Coin | Symbol | Pair |
|------|--------|------|
| Bitcoin | BTC | BTCUSDT |
| Ethereum | ETH | ETHUSDT |
| Solana | SOL | SOLUSDT |
| Dogecoin | DOGE | DOGEUSDT |
| XRP | XRP | XRPUSDT |
| BNB | BNB | BNBUSDT |
| Cardano | ADA | ADAUSDT |
| Avalanche | AVAX | AVAXUSDT |
| Polkadot | DOT | DOTUSDT |
| Polygon | MATIC | MATICUSDT |
| Chainlink | LINK | LINKUSDT |
| NEAR | NEAR | NEARUSDT |

---

## Key Concepts Explained

### 1. The Broadcast Pattern (server.ts)

The server maintains a `Set<WebSocket>` of all connected clients. When a Binance tick arrives, it loops through and sends to everyone:

```typescript
function broadcast(data: object) {
  const payload = JSON.stringify(data);
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
}
```

**Why check readyState?** A client might be mid-disconnect. Sending to a non-OPEN socket throws. Always guard with `readyState === WebSocket.OPEN`.

### 2. Snapshot on Connect

New clients get the latest prices immediately instead of waiting for the next tick:

```typescript
wss.on("connection", (ws) => {
  if (latestPrices.size > 0) {
    ws.send(JSON.stringify({ type: "snapshot", data: Object.fromEntries(latestPrices) }));
  }
});
```

**Why?** Without this, a user opens the page and sees empty cards for several seconds until each coin ticks. The snapshot fills all cards instantly.

### 3. Reconnection with Backoff + Jitter (useWebSocket.ts)

```typescript
ws.onclose = () => {
  const base = Math.min(1000 * 2 ** retries, 30000);  // 1s, 2s, 4s, 8s, ... capped at 30s
  const jitter = Math.random() * 1000;                // random 0-1s added
  setTimeout(connect, base + jitter);
};
```

**Why jitter?** If the server restarts and 1000 clients all reconnect at exactly 1s, 2s, 4s... they create a "thundering herd." Random jitter spreads them out.

### 4. Ping/Pong Heartbeat (server.ts)

```typescript
setInterval(() => {
  for (const ws of clients) {
    if (!alive.has(ws)) { ws.terminate(); continue; }
    alive.delete(ws);
    ws.ping();  // Client auto-responds with pong
  }
}, 30_000);
```

**Why?** TCP doesn't always tell you when a connection dies (e.g., user's laptop closes lid). Ping/pong is a WebSocket-level liveness check. No pong response = dead client = terminate and free resources.

---

## Data Flow (Step by Step)

```
1. Server starts
   └─→ Connects to Binance: wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/...

2. Binance sends a ticker update (every ~1s per coin)
   └─→ Server receives: { stream: "btcusdt@ticker", data: { s: "BTCUSDT", c: "58780.01", P: "-1.25", ... } }

3. Server parses into CoinTick and stores in latestPrices Map
   └─→ Calls broadcast({ type: "tick", data: coinTick })
   └─→ Loops through all connected clients, sends JSON to each

4. Browser receives message
   └─→ useWebSocket hook parses JSON
   └─→ Updates React state (prices map + history array)
   └─→ React re-renders: CoinCard shows new price with flash, SparklineChart adds point

5. If server connection drops
   └─→ Browser onclose fires → schedules reconnect with backoff + jitter
   └─→ StatusBadge turns red → "Disconnected"
   └─→ After reconnect → receives snapshot → UI fills instantly

6. If Binance connection drops
   └─→ Server onclose fires → reconnects in 3s
   └─→ Clients stay connected (they don't know about upstream)
   └─→ Prices freeze briefly, then resume
```

---

## How to Experiment

1. **Open multiple tabs** — watch the server log show client count increasing. All tabs get the same data (broadcast).

2. **Kill the WS server** — watch the frontend show "Disconnected" and auto-reconnect when you restart it.

3. **Check the health endpoint** — `curl http://localhost:4000/health` shows connected client count.

4. **Add a new coin** — add to `COINS` array in `server.ts` and `COIN_META` in `types.ts`. Restart the server.

5. **Watch the network tab** — open DevTools → Network → WS. You can see every frame flowing in real-time.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| WS Server | Express + ws | Express handles HTTP; ws is the de facto Node.js WebSocket library |
| Frontend | Next.js 16 | React framework with TypeScript, file-based routing, fast dev server |
| Styling | Tailwind CSS | Utility-first CSS, dark mode, responsive grid |
| Charts | Recharts | React-native charting, works with SSR, lightweight |
| Language | TypeScript | Type safety for message protocols, shared types between components |
| Data Source | Binance WebSocket API | Free, no API key needed, real production data |
