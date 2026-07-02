"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const ws_1 = require("ws");
const data_1 = require("./data");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', clients: clients.size, coins: data_1.COINS });
});
app.get('/history', async (req, res) => {
    try {
        const symbol = String(req.query.symbol || '').toUpperCase();
        const interval = String(req.query.interval || '15m');
        const limit = Number(req.query.limit || 100);
        if (!symbol) {
            return res.status(400).json({
                error: 'symbol is required',
            });
        }
        const response = await axios_1.default.get('https://api.binance.com/api/v3/klines', {
            params: {
                symbol,
                interval,
                limit,
            },
        });
        const data = response.data.map((k) => ({
            time: Number(k[0]),
            open: Number(k[1]),
            high: Number(k[2]),
            low: Number(k[3]),
            close: Number(k[4]),
            volume: Number(k[5]),
        }));
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Failed to fetch historical data',
        });
    }
});
// ──────────────────────────────────────────────
//  WEBSOCKET SERVER — attached to the HTTP server
// ──────────────────────────────────────────────
const wss = new ws_1.WebSocketServer({ server, path: '/ws' });
const clients = new Set();
const latestPrices = new Map();
wss.on('connection', (ws, req) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`[connect] client from ${ip}  (total: ${clients.size + 1})`);
    clients.add(ws);
    // Send current prices snapshot immediately so the UI isn't empty
    if (latestPrices.size > 0) {
        ws.send(JSON.stringify({
            type: 'snapshot',
            data: Object.fromEntries(latestPrices),
        }));
    }
    // Handle client messages (e.g. subscribe/unsubscribe — extensible)
    ws.on('message', (raw) => {
        try {
            const msg = JSON.parse(raw.toString());
            console.log(`[message] from client:`, msg);
        }
        catch {
            console.log(`[message] non-JSON from client:`, raw.toString());
        }
    });
    ws.on('close', (code, reason) => {
        clients.delete(ws);
        console.log(`[disconnect] code=${code}  (total: ${clients.size})`);
    });
    ws.on('error', (err) => {
        console.error(`[error] client error:`, err.message);
        clients.delete(ws);
    });
});
// ──────────────────────────────────────────────
//  BROADCAST helper
// ──────────────────────────────────────────────
function broadcast(data) {
    const payload = JSON.stringify(data);
    for (const client of clients) {
        if (client.readyState === ws_1.WebSocket.OPEN) {
            client.send(payload);
        }
    }
}
// ──────────────────────────────────────────────
//  BINANCE UPSTREAM — subscribe to mini tickers
//  Server subscribes ONCE, broadcasts to all clients
// ──────────────────────────────────────────────
function connectToBinance() {
    const streams = data_1.COINS.map((c) => `${c}@ticker`).join('/');
    const url = `wss://stream.binance.com:9443/stream?streams=${streams}`;
    console.log(`[binance] connecting to ${data_1.COINS.length} streams...`);
    const upstream = new ws_1.WebSocket(url);
    upstream.on('open', () => {
        console.log(`[binance] connected — streaming ${data_1.COINS.join(', ')}`);
    });
    upstream.on('message', (raw) => {
        try {
            const wrapper = JSON.parse(raw.toString());
            const msg = wrapper.data;
            const tick = {
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
            broadcast({ type: 'tick', data: tick });
        }
        catch (err) {
            console.error('[binance] parse error:', err);
        }
    });
    upstream.on('close', (code) => {
        console.log(`[binance] disconnected (code=${code}), reconnecting in 3s...`);
        setTimeout(connectToBinance, 3000);
    });
    upstream.on('error', (err) => {
        console.error('[binance] error:', err.message);
    });
}
// ──────────────────────────────────────────────
//  HEARTBEAT — ping all clients every 30s
// ──────────────────────────────────────────────
const aliveClients = new WeakSet();
wss.on('connection', (ws) => {
    aliveClients.add(ws);
    ws.on('pong', () => aliveClients.add(ws));
});
setInterval(() => {
    for (const ws of clients) {
        if (!aliveClients.has(ws)) {
            console.log('[heartbeat] terminating stale client');
            ws.terminate();
            clients.delete(ws);
            continue;
        }
        aliveClients.delete(ws);
        ws.ping();
    }
}, 30_000);
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`\n  WS server running on http://localhost:${PORT}`);
    console.log(`  WebSocket endpoint:  ws://localhost:${PORT}/ws`);
    console.log(`  Health check:        http://localhost:${PORT}/health\n`);
    connectToBinance();
});
