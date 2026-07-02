"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

const TABS = ["Overview", "Architecture", "Data Flow", "WebSocket Guide"] as const;
type Tab = (typeof TABS)[number];

const GUIDE_CHAPTERS = [
  "Ch 1: What Is a WebSocket",
  "Ch 2: Polling, Long-Polling, SSE",
  "Ch 3: Fundamentals & Vocabulary",
  "Ch 4: The Opening Handshake",
  "Ch 5: The Frame Protocol",
  "Ch 6: Browser WebSocket API",
  "Ch 7: Server Side with Node & ws",
  "Ch 8: From Scratch Server",
  "Ch 9: Reconnection & Heartbeats",
  "Ch 10: Scaling WebSockets",
  "Ch 11: Security",
  "Ch 12: Subprotocols & Libraries",
  "Ch 13: Debugging & Testing",
  "Ch 14: Common Pitfalls",
  "Ch 15: Quick Reference",
] as const;
type GuideChapter = (typeof GUIDE_CHAPTERS)[number];


const STRUCTURE = [
  { path: "ws-server/src/app.ts", desc: "Express + ws backend, Binance connector, broadcast, heartbeat" },
  { path: "frontend/src/hooks/useWebSocket.ts", desc: "React hook: connect, reconnect, track history" },
  { path: "frontend/src/components/Dashboard.tsx", desc: "Main layout with search, sort, market overview" },
  { path: "frontend/src/components/CoinCard.tsx", desc: "Individual coin tile with sparkline chart" },
  { path: "frontend/src/components/DetailChart.tsx", desc: "Large area chart for selected coin" },
  { path: "frontend/src/components/SparklineChart.tsx", desc: "Mini inline chart (Recharts)" },
  { path: "frontend/src/components/MarketOverview.tsx", desc: "Market sentiment, gainers/losers, top performers" },
  { path: "frontend/src/lib/types.ts", desc: "TypeScript types + asset metadata (8 coins + 1 commodity)" },
];

function OverviewTab() {
  return (
    <>
      <div className="glass rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-[80px]" />
        <div className="relative">
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">Learn WebSockets</h1>
          <p className="text-zinc-400 max-w-xl text-base leading-relaxed">
            A real-time crypto dashboard built to learn WebSockets from the ground up.
            9 assets streaming live via Binance, with broadcast, heartbeats, and auto-reconnect.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <a href="https://github.com/shubhu2002/crypto-pulse-websocket" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm font-medium text-zinc-200 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all">
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              GitHub Repo
            </a>
            <a href="https://cryptopulse-demo.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm font-medium text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-500/30 transition-all">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.25-.75a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-1.69l-5.22 5.22a.75.75 0 01-1.06-1.06l5.22-5.22h-1.69a.75.75 0 01-.75-.75z" clipRule="evenodd"/></svg>
              Live Demo
            </a>
          </div>
        </div>
      </div>

      <h2>Tech Stack</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 not-prose">
        {[
          { name: "Next.js 16", desc: "React framework", color: "#fff" },
          { name: "TypeScript", desc: "Type safety", color: "#3178c6" },
          { name: "Express", desc: "HTTP server", color: "#68a063" },
          { name: "ws", desc: "WebSocket library", color: "#10b981" },
          { name: "Recharts", desc: "React charts", color: "#8884d8" },
          { name: "Tailwind CSS", desc: "Utility CSS", color: "#38bdf8" },
        ].map((tech) => (
          <div key={tech.name} className="glass rounded-xl p-3 flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: tech.color + "15", color: tech.color }}>
              {tech.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-medium text-zinc-200">{tech.name}</div>
              <div className="text-[11px] text-zinc-600">{tech.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h2>Project Structure</h2>
      <div className="not-prose glass rounded-xl overflow-hidden">
        <table>
          <thead>
            <tr>
              <th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">File</th>
              <th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Purpose</th>
            </tr>
          </thead>
          <tbody>
            {STRUCTURE.map((f) => (
              <tr key={f.path} className="border-b border-white/[0.02] last:border-0">
                <td className="p-3 text-xs font-mono text-emerald-400/80">{f.path}</td>
                <td className="p-3 text-xs text-zinc-500">{f.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Quick Start</h2>
      <div className="space-y-4">
        <div className="glass rounded-xl p-4">
          <h3 className="text-sm font-semibold text-zinc-300 mb-2">1. Clone the Repository</h3>
          <pre><code>{`git clone https://github.com/shubhu2002/crypto-pulse-websocket.git`}</code></pre>
        </div>
        <div className="glass rounded-xl p-4">
          <h3 className="text-sm font-semibold text-zinc-300 mb-2">2. Start the WebSocket server</h3>
          <pre><code>{`cd ws-server\nyarn install\nyarn dev          # Runs on port 4000`}</code></pre>
        </div>
        <div className="glass rounded-xl p-4">
          <h3 className="text-sm font-semibold text-zinc-300 mb-2">3. Start the Next.js frontend</h3>
          <pre><code>{`cd frontend\npnpm install\npnpm dev        # Runs on port 3000`}</code></pre>
        </div>
        <div className="glass rounded-xl p-4">
          <h3 className="text-sm font-semibold text-zinc-300 mb-2">4. Open in browser</h3>
          <p>Visit <code>http://localhost:3000</code> — you&apos;ll see 9 assets streaming live with charts.</p>
        </div>
      </div>

      <h2>Links & Resources</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose">
        {[
          { label: "GitHub Repository", href: "https://github.com/shubhu2002/crypto-pulse-websocket", desc: "Source code, issues, and contribution guide", icon: "GH" },
          { label: "Live Demo", href: "https://cryptopulse-demo.vercel.app", desc: "Deployed frontend on Vercel", icon: "LV" },
          { label: "Binance WebSocket Docs", href: "https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams", desc: "Upstream API we connect to", icon: "BN" },
          { label: "RFC 6455 — WebSocket Protocol", href: "https://datatracker.ietf.org/doc/html/rfc6455", desc: "The official spec this guide is built on", icon: "RF" },
          { label: "ws — Node WebSocket Library", href: "https://github.com/websockets/ws", desc: "The server library used in this project", icon: "WS" },
          { label: "MDN WebSocket API", href: "https://developer.mozilla.org/en-US/docs/Web/API/WebSocket", desc: "Browser API reference", icon: "MD" },
        ].map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="glass rounded-xl p-4 flex items-start gap-3 hover:bg-white/[0.04] hover:border-white/[0.08] transition-all group">
            <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 text-[10px] font-bold border border-violet-500/15">{link.icon}</div>
            <div>
              <div className="text-sm font-semibold text-zinc-200 group-hover:text-white flex items-center gap-1.5">
                {link.label}
                <svg className="h-3 w-3 text-zinc-600 group-hover:text-zinc-400 transition-colors" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"/></svg>
              </div>
              <div className="text-xs text-zinc-600 mt-0.5">{link.desc}</div>
            </div>
          </a>
        ))}
      </div>

      <h2>Try These Experiments</h2>
      <ul>
        <li><strong>Open multiple tabs</strong> — watch the server log show client count increasing. All tabs get the same broadcast data.</li>
        <li><strong>Kill the WS server</strong> — watch the frontend show &quot;Disconnected&quot; and auto-reconnect when you restart it.</li>
        <li><strong>Check DevTools → Network → WS</strong> — see every WebSocket frame flowing in real-time.</li>
        <li><strong>Hit the health endpoint</strong> — <code>curl http://localhost:4000/health</code> shows connected client count.</li>
        <li><strong>Add a new coin</strong> — add to COINS in server.ts and COIN_META in types.ts, restart server.</li>
      </ul>
    </>
  );
}

function ArchitectureTab() {
  return (
    <>
      <h1 className="text-2xl font-bold text-zinc-100 mb-2">Architecture</h1>
      <p>How CryptoPulse is structured — from the upstream data source to your browser.</p>

      <div className="glass rounded-2xl p-6 my-6 overflow-x-auto">
        <svg viewBox="0 0 760 480" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl mx-auto">
          <style>{`
            text { font-family: system-ui, -apple-system, sans-serif; }
            .a-title { font-size: 13px; font-weight: 700; fill: #e4e4e7; }
            .a-label { font-size: 10px; font-weight: 600; fill: #e4e4e7; }
            .a-detail { font-size: 8.5px; fill: #71717a; }
            .a-note { font-size: 8px; fill: #10b981; font-weight: 500; }
            .a-ch { font-size: 7.5px; fill: #52525b; font-style: italic; }
          `}</style>
          <defs>
            <marker id="a-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="none" stroke="#52525b" strokeWidth="1"/></marker>
            <marker id="a-arr-g" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="none" stroke="#10b981" strokeWidth="1"/></marker>
            <linearGradient id="a-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity="0.08"/><stop offset="100%" stopColor="#6366f1" stopOpacity="0.08"/></linearGradient>
          </defs>
          <rect x="250" y="20" width="260" height="55" rx="12" fill="url(#a-grad)" stroke="#f59e0b50"/>
          <text x="380" y="43" textAnchor="middle" className="a-label" fill="#f59e0b">Binance WebSocket API</text>
          <text x="380" y="58" textAnchor="middle" className="a-detail">wss://stream.binance.com:9443 — 9 asset ticker streams</text>
          <path d="M380,75 L380,120" stroke="#f59e0b80" strokeWidth="1.2" fill="none" markerEnd="url(#a-arr-g)" strokeDasharray="4 3"/>
          <text x="392" y="100" className="a-note" style={{fontSize: "7.5px"}}>1 upstream WS</text>
          <rect x="100" y="120" width="560" height="150" rx="14" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)"/>
          <text x="380" y="145" textAnchor="middle" className="a-title">WS Server — Express + ws (port 4000)</text>
          <rect x="125" y="160" width="150" height="40" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.04)"/>
          <text x="200" y="178" textAnchor="middle" className="a-label" style={{fontSize: "9px"}}>Upstream Connector</text>
          <text x="200" y="192" textAnchor="middle" className="a-ch">Binance → CoinTick parse</text>
          <rect x="305" y="160" width="150" height="40" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.04)"/>
          <text x="380" y="178" textAnchor="middle" className="a-label" style={{fontSize: "9px"}}>Price Cache</text>
          <text x="380" y="192" textAnchor="middle" className="a-ch">Map + snapshot on connect</text>
          <rect x="485" y="160" width="150" height="40" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.04)"/>
          <text x="560" y="178" textAnchor="middle" className="a-label" style={{fontSize: "9px"}}>Broadcast Engine</text>
          <text x="560" y="192" textAnchor="middle" className="a-ch">Set&lt;WS&gt; → send to all</text>
          <path d="M275,180 L303,180" stroke="#52525b" strokeWidth="0.8" fill="none" markerEnd="url(#a-arr)"/>
          <path d="M455,180 L483,180" stroke="#52525b" strokeWidth="0.8" fill="none" markerEnd="url(#a-arr)"/>
          <rect x="125" y="215" width="250" height="28" rx="6" fill="#10b98108" stroke="#10b98120"/>
          <text x="250" y="233" textAnchor="middle" className="a-note" style={{fontSize: "8px"}}>Snapshot: new clients get all current prices instantly</text>
          <rect x="405" y="215" width="230" height="28" rx="6" fill="#6366f108" stroke="#6366f120"/>
          <text x="520" y="233" textAnchor="middle" className="a-detail" fill="#818cf8" style={{fontSize: "8px"}}>Heartbeat: ping/pong every 30s (Ch 9)</text>
          <path d="M230,270 L180,310" stroke="#10b981" strokeWidth="1" fill="none" markerEnd="url(#a-arr-g)"/>
          <path d="M380,270 L380,310" stroke="#10b981" strokeWidth="1" fill="none" markerEnd="url(#a-arr-g)"/>
          <path d="M530,270 L580,310" stroke="#10b981" strokeWidth="1" fill="none" markerEnd="url(#a-arr-g)"/>
          <text x="380" y="298" textAnchor="middle" className="a-note">BROADCAST</text>
          <rect x="85" y="310" width="190" height="80" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)"/>
          <text x="180" y="333" textAnchor="middle" className="a-label">Browser Tab 1</text>
          <text x="180" y="348" textAnchor="middle" className="a-detail">useWebSocket() hook</text>
          <text x="180" y="362" textAnchor="middle" className="a-detail">Parse → React state → render</text>
          <text x="180" y="380" textAnchor="middle" className="a-ch">Auto-reconnect w/ backoff</text>
          <rect x="285" y="310" width="190" height="80" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)"/>
          <text x="380" y="333" textAnchor="middle" className="a-label">Browser Tab 2</text>
          <text x="380" y="348" textAnchor="middle" className="a-detail">Independent WS connection</text>
          <text x="380" y="362" textAnchor="middle" className="a-detail">Same broadcast data</text>
          <text x="380" y="380" textAnchor="middle" className="a-ch">Each tab = separate client</text>
          <rect x="485" y="310" width="190" height="80" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)"/>
          <text x="580" y="333" textAnchor="middle" className="a-label">Browser Tab N</text>
          <text x="580" y="348" textAnchor="middle" className="a-detail">Scales to many clients</text>
          <text x="580" y="362" textAnchor="middle" className="a-detail">Dead ones cleaned by heartbeat</text>
          <text x="580" y="380" textAnchor="middle" className="a-ch">Server tracks in Set&lt;WS&gt;</text>
          <rect x="85" y="415" width="590" height="45" rx="10" fill="rgba(239,68,68,0.04)" stroke="rgba(239,68,68,0.1)"/>
          <text x="380" y="435" textAnchor="middle" className="a-label" fill="#ef4444" style={{fontSize: "9px"}}>Reconnection Flow (Ch 9)</text>
          <text x="380" y="450" textAnchor="middle" className="a-detail">Drop → onclose → wait (1s × 2^retries + jitter) → reconnect → snapshot → UI restored</text>
        </svg>
      </div>

      <h2>Why a Relay Server?</h2>
      <p>Without the relay server, every browser tab would open its own connection to Binance. This is wasteful and will hit rate limits quickly. The server subscribes <strong>once</strong> to Binance and fans out data to all connected clients. This is the <strong>broadcast pattern</strong> from Chapter 7.</p>

      <h2>Key Design Decisions</h2>
      <h3>1. Express + ws on the same HTTP server</h3>
      <p>The WebSocketServer attaches to the same HTTP server that Express uses. This means one port serves both the health check endpoint (<code>GET /health</code>) and WebSocket connections (<code>ws://localhost:4000/ws</code>). In production, you&apos;d add a reverse proxy (Nginx/Caddy) in front.</p>
      <h3>2. Snapshot on Connect</h3>
      <p>When a new client connects, the server immediately sends all current prices as a &quot;snapshot&quot; message. Without this, users would see empty cards until each coin&apos;s next tick arrives. The snapshot fills all 12 cards instantly.</p>
      <h3>3. Price History on the Client</h3>
      <p>The <code>useWebSocket</code> hook maintains a rolling buffer of 60 price points per coin. This powers the sparkline charts and the detail chart. History is throttled to 1 point/second per coin to avoid overwhelming the charts.</p>
      <h3>4. Heartbeat with WeakSet</h3>
      <p>The server uses a <code>WeakSet</code> to track alive clients. Every 30 seconds it pings each client — if a client didn&apos;t respond to the previous ping, it&apos;s terminated. The WeakSet lets garbage collection clean up references automatically.</p>

      <h2>Message Protocol</h2>
      <p>Two message types flow from server to client:</p>
      <h3>Snapshot (once on connect)</h3>
      <pre><code>{`{\n  "type": "snapshot",\n  "data": {\n    "BTCUSDT": { "symbol": "BTCUSDT", "price": 58780, "change24h": -1.25, ... },\n    "ETHUSDT": { ... }\n  }\n}`}</code></pre>
      <h3>Tick (continuous)</h3>
      <pre><code>{`{\n  "type": "tick",\n  "data": {\n    "symbol": "BTCUSDT",\n    "price": 58781.50,\n    "change24h": -1.24,\n    "high24h": 59529,\n    "low24h": 57800,\n    "volume24h": 21900,\n    "timestamp": 1719835200000\n  }\n}`}</code></pre>
    </>
  );
}

function DataFlowTab() {
  return (
    <>
      <h1 className="text-2xl font-bold text-zinc-100 mb-2">Data Flow</h1>
      <p>Step-by-step trace of every message from Binance to your screen.</p>

      <div className="glass rounded-2xl p-6 my-6 overflow-x-auto">
        <svg viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl mx-auto">
          <style>{`
            text { font-family: system-ui, -apple-system, sans-serif; }
            .s-actor { font-size: 10px; font-weight: 600; }
            .s-msg { font-size: 8.5px; fill: #d4d4d8; }
            .s-note { font-size: 7.5px; fill: #71717a; }
            .s-phase { font-size: 8.5px; font-weight: 600; }
          `}</style>
          <defs>
            <marker id="s-arr" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto"><path d="M0,0 L6,2 L0,4" fill="none" stroke="#52525b" strokeWidth="1"/></marker>
          </defs>
          <rect x="55" y="10" width="90" height="28" rx="6" fill="#f59e0b10" stroke="#f59e0b40"/>
          <text x="100" y="29" textAnchor="middle" className="s-actor" fill="#f59e0b">Binance</text>
          <rect x="275" y="10" width="110" height="28" rx="6" fill="#10b98110" stroke="#10b98140"/>
          <text x="330" y="29" textAnchor="middle" className="s-actor" fill="#10b981">WS Server</text>
          <rect x="500" y="10" width="110" height="28" rx="6" fill="#6366f110" stroke="#6366f140"/>
          <text x="555" y="29" textAnchor="middle" className="s-actor" fill="#818cf8">Browser</text>
          <line x1="100" y1="38" x2="100" y2="510" stroke="#27272a" strokeWidth="1" strokeDasharray="4 3"/>
          <line x1="330" y1="38" x2="330" y2="510" stroke="#27272a" strokeWidth="1" strokeDasharray="4 3"/>
          <line x1="555" y1="38" x2="555" y2="510" stroke="#27272a" strokeWidth="1" strokeDasharray="4 3"/>
          <rect x="15" y="55" width="670" height="16" rx="3" fill="#f59e0b06"/>
          <text x="25" y="66" className="s-phase" fill="#f59e0b">PHASE 1: Server Startup</text>
          <line x1="330" y1="82" x2="102" y2="82" stroke="#f59e0b60" strokeWidth="1" markerEnd="url(#s-arr)"/>
          <text x="216" y="78" textAnchor="middle" className="s-msg">HTTP Upgrade → wss://stream.binance.com</text>
          <line x1="100" y1="100" x2="328" y2="100" stroke="#f59e0b60" strokeWidth="1" markerEnd="url(#s-arr)"/>
          <text x="216" y="96" textAnchor="middle" className="s-msg">101 Switching Protocols</text>
          <text x="216" y="112" textAnchor="middle" className="s-note">Sec-WebSocket-Key → SHA1+GUID → Sec-WebSocket-Accept (Ch 4)</text>
          <rect x="15" y="126" width="670" height="16" rx="3" fill="#6366f106"/>
          <text x="25" y="137" className="s-phase" fill="#818cf8">PHASE 2: Client Connects</text>
          <line x1="555" y1="152" x2="332" y2="152" stroke="#818cf860" strokeWidth="1" markerEnd="url(#s-arr)"/>
          <text x="443" y="148" textAnchor="middle" className="s-msg">new WebSocket(&quot;ws://localhost:4000/ws&quot;)</text>
          <line x1="330" y1="170" x2="553" y2="170" stroke="#10b98160" strokeWidth="1" markerEnd="url(#s-arr)"/>
          <text x="443" y="166" textAnchor="middle" className="s-msg">101 Switching Protocols → onopen fires</text>
          <line x1="330" y1="190" x2="553" y2="190" stroke="#10b98160" strokeWidth="1" markerEnd="url(#s-arr)"/>
          <text x="443" y="186" textAnchor="middle" className="s-msg" fill="#10b981">snapshot: all current prices</text>
          <text x="443" y="202" textAnchor="middle" className="s-note">UI fills instantly — no waiting for first tick</text>
          <rect x="15" y="218" width="670" height="16" rx="3" fill="#10b98106"/>
          <text x="25" y="229" className="s-phase" fill="#10b981">PHASE 3: Live Streaming</text>
          <line x1="100" y1="248" x2="328" y2="248" stroke="#f59e0b60" strokeWidth="1" markerEnd="url(#s-arr)"/>
          <text x="216" y="244" textAnchor="middle" className="s-msg">ticker: BTCUSDT c=&quot;58780&quot; P=&quot;-1.25&quot;</text>
          <rect x="310" y="255" width="40" height="14" rx="3" fill="rgba(255,255,255,0.03)"/>
          <text x="330" y="265" textAnchor="middle" className="s-note">parse</text>
          <line x1="330" y1="275" x2="553" y2="275" stroke="#10b98160" strokeWidth="1" markerEnd="url(#s-arr)"/>
          <text x="443" y="271" textAnchor="middle" className="s-msg" fill="#10b981">tick: CoinTick JSON</text>
          <text x="575" y="292" className="s-note" textAnchor="start" fill="#a1a1aa">→ setPrices()</text>
          <text x="575" y="304" className="s-note" textAnchor="start" fill="#a1a1aa">→ setHistory()</text>
          <text x="575" y="316" className="s-note" textAnchor="start" fill="#a1a1aa">→ React re-render</text>
          <rect x="80" y="328" width="495" height="14" rx="3" stroke="#27272a" strokeWidth="0.5" fill="none" strokeDasharray="3 2"/>
          <text x="327" y="338" textAnchor="middle" className="s-note">repeats ~9 ticks/sec (9 assets × ~1 tick/sec each)</text>
          <rect x="15" y="356" width="670" height="16" rx="3" fill="#8b5cf606"/>
          <text x="25" y="367" className="s-phase" fill="#a78bfa">PHASE 4: Heartbeat (30s interval)</text>
          <line x1="330" y1="386" x2="553" y2="386" stroke="#a78bfa60" strokeWidth="1" markerEnd="url(#s-arr)"/>
          <text x="443" y="382" textAnchor="middle" className="s-msg" fill="#a78bfa">Ping (opcode 0x9)</text>
          <line x1="555" y1="404" x2="332" y2="404" stroke="#a78bfa60" strokeWidth="1" markerEnd="url(#s-arr)"/>
          <text x="443" y="400" textAnchor="middle" className="s-msg" fill="#a78bfa">Pong (opcode 0xA — auto-reply)</text>
          <text x="443" y="418" textAnchor="middle" className="s-note">No pong → ws.terminate() → dead client removed</text>
          <rect x="15" y="434" width="670" height="16" rx="3" fill="#ef444406"/>
          <text x="25" y="445" className="s-phase" fill="#ef4444">PHASE 5: Disconnect + Reconnect</text>
          <line x1="330" y1="464" x2="553" y2="464" stroke="#ef444460" strokeWidth="1" markerEnd="url(#s-arr)"/>
          <text x="443" y="460" textAnchor="middle" className="s-msg" fill="#ef4444">Close frame (code 1001)</text>
          <text x="575" y="480" className="s-note" fill="#ef4444">onclose fires</text>
          <text x="575" y="492" className="s-note" fill="#71717a">wait 1s + jitter</text>
          <line x1="555" y1="500" x2="332" y2="500" stroke="#818cf860" strokeWidth="1" markerEnd="url(#s-arr)"/>
          <text x="443" y="496" textAnchor="middle" className="s-msg">Reconnect → new WebSocket()</text>
        </svg>
      </div>

      <h2>Step-by-Step Walkthrough</h2>
      <h3>Step 1: Server Starts</h3>
      <p>The Express server starts on port 4000 and immediately connects to Binance&apos;s combined stream endpoint. It subscribes to <code>@ticker</code> streams for all 9 assets in a single WebSocket connection.</p>
      <pre><code>{`const streams = COINS.map(c => \`\${c}@ticker\`).join("/");\nconst url = \`wss://stream.binance.com:9443/stream?streams=\${streams}\`;\nconst upstream = new WebSocket(url);`}</code></pre>
      <h3>Step 2: Client Opens Connection</h3>
      <p>When you open <code>localhost:3000</code>, the <code>useWebSocket</code> hook creates a WebSocket to <code>ws://localhost:4000/ws</code>. The server adds the client to the Set and immediately sends a snapshot.</p>
      <pre><code>{`wss.on("connection", (ws) => {\n  clients.add(ws);\n  ws.send(JSON.stringify({ type: "snapshot", data: Object.fromEntries(latestPrices) }));\n});`}</code></pre>
      <h3>Step 3: Ticks Flow</h3>
      <p>Binance sends a ticker update roughly every second per coin. The server parses it, stores it, and calls <code>broadcast()</code> which loops through all clients.</p>
      <pre><code>{`function broadcast(data: object) {\n  const payload = JSON.stringify(data);\n  for (const client of clients) {\n    if (client.readyState === WebSocket.OPEN) {\n      client.send(payload);\n    }\n  }\n}`}</code></pre>
      <h3>Step 4: React Updates</h3>
      <p>The browser receives each tick in <code>ws.onmessage</code>. The hook updates the current price map and the history buffer. History is throttled to 1 point per second per coin.</p>
      <h3>Step 5: Heartbeat</h3>
      <p>Every 30 seconds, the server pings all clients. The browser auto-replies with pong. If a client doesn&apos;t respond, it&apos;s terminated.</p>
      <h3>Step 6: Reconnection</h3>
      <p>If the connection drops, <code>onclose</code> fires and the hook schedules a reconnect with exponential backoff + jitter:</p>
      <pre><code>{`const base = Math.min(1000 * 2 ** retries, 30000);\nconst jitter = Math.random() * 1000;\nsetTimeout(connect, base + jitter);`}</code></pre>
      <p><strong>Why jitter?</strong> Without it, 1000 clients all reconnecting at the same time creates a &quot;thundering herd&quot; that can crash the server.</p>

      <h2>What Happens When Things Break</h2>
      <h3>Server dies</h3>
      <ul>
        <li>Browser <code>onclose</code> fires with code 1006 (abnormal closure)</li>
        <li>StatusBadge turns red</li>
        <li>Hook retries with backoff: 1s, 2s, 4s, 8s, 16s, 30s...</li>
        <li>When server comes back: reconnect → snapshot fills UI instantly</li>
      </ul>
      <h3>Binance upstream drops</h3>
      <ul>
        <li>Server auto-reconnects to Binance in 3 seconds</li>
        <li>Browser clients stay connected — prices freeze briefly, then resume</li>
      </ul>
      <h3>Browser tab goes to sleep</h3>
      <ul>
        <li>Server&apos;s heartbeat ping gets no pong → <code>ws.terminate()</code> after 30s</li>
        <li>When tab wakes: browser <code>onclose</code> fires → reconnect → snapshot</li>
      </ul>
    </>
  );
}

function GuideTab() {
  const [chapter, setChapter] = useState<GuideChapter>(GUIDE_CHAPTERS[0]);

  return (
    <>
      <div className="glass rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-violet-500/10 blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-500/10 blur-[80px]" />
        <div className="relative">
          <h1 className="text-3xl font-bold text-zinc-100 mb-2">WebSockets — From Scratch to Everything</h1>
          <p className="text-zinc-400 max-w-xl text-base leading-relaxed">
            A complete developer&apos;s guide. 15 chapters built around RFC 6455, with runnable code in every section.
          </p>
        </div>
      </div>

      {/* Chapter selector */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {GUIDE_CHAPTERS.map((ch) => (
          <button
            key={ch}
            onClick={() => setChapter(ch)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
              chapter === ch
                ? "bg-violet-500/15 text-violet-300 border border-violet-500/30"
                : "bg-white/[0.03] text-zinc-500 border border-white/[0.04] hover:text-zinc-300 hover:bg-white/[0.05]"
            }`}
          >
            {ch}
          </button>
        ))}
      </div>

      <div>
        {chapter === "Ch 1: What Is a WebSocket" && <Ch1 />}
        {chapter === "Ch 2: Polling, Long-Polling, SSE" && <Ch2 />}
        {chapter === "Ch 3: Fundamentals & Vocabulary" && <Ch3 />}
        {chapter === "Ch 4: The Opening Handshake" && <Ch4 />}
        {chapter === "Ch 5: The Frame Protocol" && <Ch5 />}
        {chapter === "Ch 6: Browser WebSocket API" && <Ch6 />}
        {chapter === "Ch 7: Server Side with Node & ws" && <Ch7 />}
        {chapter === "Ch 8: From Scratch Server" && <Ch8 />}
        {chapter === "Ch 9: Reconnection & Heartbeats" && <Ch9 />}
        {chapter === "Ch 10: Scaling WebSockets" && <Ch10 />}
        {chapter === "Ch 11: Security" && <Ch11 />}
        {chapter === "Ch 12: Subprotocols & Libraries" && <Ch12 />}
        {chapter === "Ch 13: Debugging & Testing" && <Ch13 />}
        {chapter === "Ch 14: Common Pitfalls" && <Ch14 />}
        {chapter === "Ch 15: Quick Reference" && <Ch15 />}
      </div>
    </>
  );
}

function ChapterSection({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-8 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-violet-500/10 blur-[80px]" />
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-emerald-500/5 blur-[80px]" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300 text-sm font-bold border border-violet-500/20">{num}</span>
          <h1 className="text-2xl font-bold text-zinc-100 !m-0 !p-0 !border-0">{title}</h1>
        </div>
        <div className="docs-prose">
          {children}
        </div>
      </div>
    </div>
  );
}

function Ch1() {
  return (
    <ChapterSection num={1} title="What Is a WebSocket and Why It Exists">
      <p>A WebSocket is a single, long-lived TCP connection between a client and a server over which both sides can send messages at any time, independently, without re-asking for permission. That sentence is the whole idea — everything else is detail.</p>

      <h3>The problem with plain HTTP</h3>
      <p>The classic web works on a request/response model. The browser asks for something, the server answers, and the conversation ends. The server can never speak first. If a new chat message arrives, or a stock price ticks, or another player makes a move, the server has no way to tell the browser — it has to wait to be asked.</p>
      <p>For documents this is fine. For anything real-time — chat, live dashboards, multiplayer games, collaborative editors, trading apps, notifications — it is a poor fit.</p>

      <h3>What WebSockets give you</h3>
      <ul>
        <li><strong>Full-duplex</strong> — both directions at the same time, like a phone call rather than walkie-talkies.</li>
        <li><strong>Persistent</strong> — one connection stays open for the whole session instead of reconnecting per message.</li>
        <li><strong>Low overhead</strong> — after the initial handshake, a message carries as little as 2 bytes of framing, versus hundreds of bytes of HTTP headers.</li>
        <li><strong>Low latency</strong> — no new TCP/TLS handshake per message; data flows the instant either side has something to say.</li>
        <li><strong>Message-oriented</strong> — you send and receive discrete messages (text or binary), not a raw byte stream.</li>
      </ul>

      <h3>The mental model</h3>
      <p>Think of HTTP as mailing letters: each one is a complete, self-addressed round trip. A WebSocket is opening a phone line: you dial once (the handshake), then either party talks freely until someone hangs up.</p>

      <h3>Where you have seen WebSockets</h3>
      <div className="not-prose glass rounded-xl overflow-hidden my-4">
        <table>
          <thead><tr><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Use case</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">What flows over the socket</th></tr></thead>
          <tbody>
            {[
              ["Chat & messaging", "Incoming messages, typing indicators, presence"],
              ["Live dashboards / metrics", "Server-pushed metric updates many times per second"],
              ["Multiplayer games", "Player positions, game-state deltas, low-latency input"],
              ["Collaborative editing", "Document operations (Google Docs–style cursors & edits)"],
              ["Trading & markets", "Order-book updates, price ticks, fills"],
              ["Notifications", "\"Someone liked your post\" pushed instantly"],
            ].map(([uc, desc]) => (
              <tr key={uc} className="border-b border-white/[0.02] last:border-0">
                <td className="p-3 text-xs font-medium text-zinc-300">{uc}</td>
                <td className="p-3 text-xs text-zinc-500">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>A 30-second taste</h3>
      <pre><code>{`const socket = new WebSocket("wss://example.com/chat");\nsocket.onopen    = () => socket.send("hello server");\nsocket.onmessage = (event) => console.log("server says:", event.data);\nsocket.onclose   = () => console.log("connection closed");`}</code></pre>
      <p>That is the entire client surface for the common case. The depth in this guide is about what happens beneath those four lines — and how to run them safely in production.</p>
    </ChapterSection>
  );
}

function Ch2() {
  return (
    <ChapterSection num={2} title="The Road to Real-Time: Polling, Long-Polling, SSE">
      <p>To understand why WebSockets are shaped the way they are, it helps to see the workarounds they replaced. Each one chips away at the same limitation: HTTP servers cannot initiate.</p>

      <h3>1. Short polling</h3>
      <p>The browser asks &quot;anything new?&quot; on a timer — say every 3 seconds. Simple, works everywhere, and terrible: most requests return &quot;nothing&quot;, every request pays the full HTTP header cost, and updates are delayed by up to the polling interval.</p>
      <pre><code>{`setInterval(async () => {\n  const res = await fetch("/api/messages?since=" + lastId);\n  const data = await res.json();\n  if (data.length) render(data);\n}, 3000);`}</code></pre>

      <h3>2. Long polling</h3>
      <p>A smarter trick: the browser sends a request, and the server holds it open until it actually has data (or a timeout fires). The moment the server responds, the browser immediately opens a new request. Near-real-time delivery, but each message still costs a full HTTP round trip.</p>

      <h3>3. Server-Sent Events (SSE)</h3>
      <p>SSE is a real standard (the <code>EventSource</code> API) for server-to-client streaming over a single long-lived HTTP response. Great for one-way feeds with built-in auto-reconnect — but one-directional only.</p>
      <pre><code>{`const events = new EventSource("/stream");\nevents.onmessage = (e) => console.log("update:", e.data);`}</code></pre>

      <div className="glass rounded-xl p-4 my-4 border-l-2 border-emerald-500/50">
        <p className="text-sm text-zinc-300"><strong>When SSE beats WebSockets:</strong> If you only need the server to push to the client (a notification feed, a live score), SSE is simpler, rides on plain HTTP, and reconnects itself. Reach for WebSockets when you need genuine two-way traffic or binary frames.</p>
      </div>

      <h3>How they compare</h3>
      <div className="not-prose glass rounded-xl overflow-hidden my-4">
        <table>
          <thead><tr><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Technique</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Direction</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Latency</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Overhead/msg</th></tr></thead>
          <tbody>
            {[
              ["Short polling", "Client pulls", "Poor (interval)", "Full HTTP headers"],
              ["Long polling", "Client pulls (held)", "Good", "Full HTTP headers"],
              ["SSE", "Server → client only", "Excellent", "Tiny (text framing)"],
              ["WebSocket", "Full-duplex", "Excellent", "2–14 bytes"],
            ].map(([t, d, l, o]) => (
              <tr key={t} className="border-b border-white/[0.02] last:border-0">
                <td className="p-3 text-xs font-medium text-zinc-300">{t}</td>
                <td className="p-3 text-xs text-zinc-500">{d}</td>
                <td className="p-3 text-xs text-zinc-500">{l}</td>
                <td className="p-3 text-xs text-zinc-500">{o}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChapterSection>
  );
}

function Ch3() {
  return (
    <ChapterSection num={3} title="WebSocket Fundamentals & Vocabulary">

      <h3>The URL schemes: ws:// and wss://</h3>
      <div className="not-prose glass rounded-xl overflow-hidden my-4">
        <table>
          <thead><tr><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Scheme</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Meaning</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Default port</th></tr></thead>
          <tbody>
            <tr className="border-b border-white/[0.02]"><td className="p-3 text-xs font-mono text-emerald-400">ws://</td><td className="p-3 text-xs text-zinc-500">Unencrypted WebSocket</td><td className="p-3 text-xs text-zinc-500">80</td></tr>
            <tr><td className="p-3 text-xs font-mono text-emerald-400">wss://</td><td className="p-3 text-xs text-zinc-500">TLS-encrypted WebSocket</td><td className="p-3 text-xs text-zinc-500">443</td></tr>
          </tbody>
        </table>
      </div>
      <div className="glass rounded-xl p-4 my-4 border-l-2 border-red-500/50">
        <p className="text-sm text-zinc-300"><strong>Always use wss:// in production.</strong> Plain ws:// is readable by anyone on the network path and is blocked by browsers on HTTPS pages (mixed content).</p>
      </div>

      <h3>The lifecycle</h3>
      <ol>
        <li><strong>Handshake</strong> — an HTTP request that asks to &quot;upgrade&quot; to the WebSocket protocol.</li>
        <li><strong>Open / data phase</strong> — both sides exchange frames freely.</li>
        <li><strong>Closing handshake</strong> — either side sends a close frame with a status code; the other acknowledges.</li>
        <li><strong>Closed</strong> — the underlying TCP connection is torn down.</li>
      </ol>

      <h3>Key terms</h3>
      <div className="not-prose glass rounded-xl overflow-hidden my-4">
        <table>
          <thead><tr><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Term</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Meaning</th></tr></thead>
          <tbody>
            {[
              ["Frame", "The smallest unit on the wire. Carries a bit of header plus payload."],
              ["Message", "One logical chunk of data. May be split across several frames (fragmentation)."],
              ["Opcode", "A 4-bit code in each frame: text, binary, close, ping, pong, or continuation."],
              ["Masking", "Client-to-server payloads are XOR-scrambled with a random key (security requirement)."],
              ["Control frame", "Ping, pong, and close — manage the connection, not carry app data."],
              ["Subprotocol", "An application-level contract negotiated in the handshake (e.g. graphql-ws)."],
              ["Extension", "A negotiated transform of frames, e.g. permessage-deflate compression."],
            ].map(([term, meaning]) => (
              <tr key={term} className="border-b border-white/[0.02] last:border-0">
                <td className="p-3 text-xs font-medium text-zinc-300">{term}</td>
                <td className="p-3 text-xs text-zinc-500">{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>WebSockets run over TCP, so messages arrive in order and reliably. The flip side: TCP&apos;s head-of-line blocking means a delayed packet stalls everything behind it. For games needing absolute lowest latency with tolerance for loss, WebRTC data channels (over UDP) can be a better fit.</p>
    </ChapterSection>
  );
}

function Ch4() {
  return (
    <ChapterSection num={4} title="The Opening Handshake (HTTP Upgrade)">
      <p>A WebSocket connection is born as an ordinary HTTP request. This is why WebSockets work through firewalls, proxies, and on ports 80/443 — they look like HTTP until the last moment, then &quot;upgrade&quot;.</p>

      <h3>Step 1 — the client&apos;s upgrade request</h3>
      <pre><code>{`GET /chat HTTP/1.1\nHost: example.com\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\nSec-WebSocket-Version: 13\nOrigin: https://example.com`}</code></pre>

      <h3>Step 2 — the server&apos;s &quot;101 Switching Protocols&quot;</h3>
      <pre><code>{`HTTP/1.1 101 Switching Protocols\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=`}</code></pre>

      <h3>The magic of Sec-WebSocket-Accept</h3>
      <p>The server cannot just echo the key back — that would let any dumb cache fake a handshake. Instead it runs a fixed recipe defined by the RFC:</p>
      <ol>
        <li>Take the client&apos;s <code>Sec-WebSocket-Key</code>.</li>
        <li>Append the magic GUID string <code>258EAFA5-E914-47DA-95CA-C5AB0DC85B11</code>.</li>
        <li>Take the SHA-1 hash of that combined string.</li>
        <li>Base64-encode the hash.</li>
      </ol>
      <pre><code>{`const crypto = require("crypto");\nconst GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";\n\nfunction accept(clientKey) {\n  return crypto\n    .createHash("sha1")\n    .update(clientKey + GUID)\n    .digest("base64");\n}`}</code></pre>
      <p>After 101, the bytes on that same TCP socket are no longer HTTP — they are WebSocket frames. The connection is now full-duplex and stays open.</p>
    </ChapterSection>
  );
}

function Ch5() {
  return (
    <ChapterSection num={5} title="The Frame Protocol: What Travels on the Wire">
      <p>After the handshake, every byte is part of a frame. This is the heart of how WebSockets are so cheap.</p>

      <h3>The frame layout (RFC 6455)</h3>
      <pre><code>{` 0                   1                   2                   3\n 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1\n+-+-+-+-+-------+-+-------------+-------------------------------+\n|F|R|R|R| op    |M| Payload len |    Extended payload length    |\n|I|S|S|S| code  |A|     (7)     |             (16/64)           |\n|N|V|V|V| (4)   |S|             |   (if payload len==126/127)   |\n| |1|2|3|       |K|             |                               |\n+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +\n|                               | Masking-key, if MASK set to 1 |\n+-------------------------------+-------------------------------+\n|          Payload Data continued ...                           |\n+---------------------------------------------------------------+`}</code></pre>

      <h3>Why messages can be just 2 bytes</h3>
      <p>For a short text message (≤125 bytes) from server to client, the entire frame header is just 2 bytes (FIN+opcode, then MASK+length). Compare that to an HTTP request with hundreds of bytes of headers.</p>

      <h3>Opcodes</h3>
      <div className="not-prose glass rounded-xl overflow-hidden my-4">
        <table>
          <thead><tr><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Opcode</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Name</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Meaning</th></tr></thead>
          <tbody>
            {[
              ["0x0", "Continuation", "Follow-on fragment of a previous message"],
              ["0x1", "Text", "UTF-8 text payload"],
              ["0x2", "Binary", "Arbitrary bytes (files, protobuf, etc.)"],
              ["0x8", "Close", "Begin the closing handshake (carries a status code)"],
              ["0x9", "Ping", "Heartbeat / liveness check"],
              ["0xA", "Pong", "Reply to a ping (or unsolicited keep-alive)"],
            ].map(([code, name, meaning]) => (
              <tr key={code} className="border-b border-white/[0.02] last:border-0">
                <td className="p-3 text-xs font-mono text-violet-400">{code}</td>
                <td className="p-3 text-xs font-medium text-zinc-300">{name}</td>
                <td className="p-3 text-xs text-zinc-500">{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Masking: a subtle security rule</h3>
      <p>Every frame sent from client to server must be masked — the payload is XOR-ed byte by byte with a 4-byte random key. Frames from server to client must NOT be masked. This exists to defeat cache-poisoning attacks on intermediary proxies.</p>
      <pre><code>{`function applyMask(payload, maskKey) {\n  const out = Buffer.alloc(payload.length);\n  for (let i = 0; i < payload.length; i++) {\n    out[i] = payload[i] ^ maskKey[i % 4];\n  }\n  return out;\n}`}</code></pre>

      <h3>Close codes</h3>
      <div className="not-prose glass rounded-xl overflow-hidden my-4">
        <table>
          <thead><tr><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Code</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Meaning</th></tr></thead>
          <tbody>
            {[
              ["1000", "Normal closure"],
              ["1001", "Going away (server shutting down, browser navigating away)"],
              ["1002", "Protocol error"],
              ["1006", "Abnormal closure — no close frame seen (connection dropped)"],
              ["1009", "Message too big"],
              ["4000–4999", "Available for your application's own meanings"],
            ].map(([code, meaning]) => (
              <tr key={code} className="border-b border-white/[0.02] last:border-0">
                <td className="p-3 text-xs font-mono text-violet-400">{code}</td>
                <td className="p-3 text-xs text-zinc-500">{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChapterSection>
  );
}

function Ch6() {
  return (
    <ChapterSection num={6} title="The Client Side: Browser WebSocket API">
      <p>The browser ships a small, built-in WebSocket object. Learn its four events, two send paths, and one state field and you know the whole client API.</p>

      <h3>Creating a connection</h3>
      <pre><code>{`const socket = new WebSocket("wss://example.com/chat", ["chat", "superchat"]);`}</code></pre>

      <h3>The four events</h3>
      <pre><code>{`socket.onopen = (event) => {\n  console.log("connected");\n  socket.send("hi");\n};\n\nsocket.onmessage = (event) => {\n  console.log("received:", event.data);\n};\n\nsocket.onerror = (event) => {\n  console.error("socket error");\n};\n\nsocket.onclose = (event) => {\n  console.log("closed", event.code, event.reason);\n};`}</code></pre>

      <div className="glass rounded-xl p-4 my-4 border-l-2 border-yellow-500/50">
        <p className="text-sm text-zinc-300"><strong>onerror tells you almost nothing.</strong> For security reasons the browser does not expose why a socket failed. Put your real handling logic in onclose and read <code>event.code</code> there.</p>
      </div>

      <h3>readyState — know before you send</h3>
      <div className="not-prose glass rounded-xl overflow-hidden my-4">
        <table>
          <thead><tr><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Constant</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Value</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Meaning</th></tr></thead>
          <tbody>
            {[
              ["CONNECTING", "0", "Handshake in progress. send() will throw."],
              ["OPEN", "1", "Ready. Safe to send."],
              ["CLOSING", "2", "Closing handshake underway."],
              ["CLOSED", "3", "Closed or failed to open."],
            ].map(([c, v, m]) => (
              <tr key={c} className="border-b border-white/[0.02] last:border-0">
                <td className="p-3 text-xs font-mono text-emerald-400">{c}</td>
                <td className="p-3 text-xs text-zinc-400">{v}</td>
                <td className="p-3 text-xs text-zinc-500">{m}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>A reusable JSON message pattern</h3>
      <pre><code>{`socket.onmessage = (event) => {\n  let msg;\n  try { msg = JSON.parse(event.data); }\n  catch { return console.warn("non-JSON frame ignored"); }\n\n  switch (msg.type) {\n    case "chat":     addChatLine(msg.user, msg.text); break;\n    case "presence": updateOnlineList(msg.users);     break;\n    case "error":    showError(msg.message);           break;\n    default: console.warn("unknown type", msg.type);\n  }\n};`}</code></pre>

      <p><code>socket.bufferedAmount</code> reports how many bytes you have queued but not yet sent. If it keeps climbing, you are producing faster than the link can drain — stop sending until it falls.</p>
    </ChapterSection>
  );
}

function Ch7() {
  return (
    <ChapterSection num={7} title="The Server Side: Building with Node and ws">
      <p>On the server you almost never hand-roll frames. The <code>ws</code> library is the de-facto standard — small, fast, and close to the metal.</p>

      <h3>A minimal echo server</h3>
      <pre><code>{`const { WebSocketServer } = require("ws");\nconst wss = new WebSocketServer({ port: 8080 });\n\nwss.on("connection", (socket, req) => {\n  socket.on("message", (data, isBinary) => {\n    socket.send(data, { binary: isBinary }); // echo\n  });\n  socket.send("welcome!");\n});`}</code></pre>

      <h3>Broadcasting to everyone</h3>
      <pre><code>{`wss.on("connection", (socket) => {\n  socket.on("message", (data, isBinary) => {\n    for (const client of wss.clients) {\n      if (client !== socket && client.readyState === WebSocket.OPEN) {\n        client.send(data, { binary: isBinary });\n      }\n    }\n  });\n});`}</code></pre>

      <h3>Attaching to an existing HTTP/Express server</h3>
      <pre><code>{`const http = require("http");\nconst express = require("express");\nconst { WebSocketServer } = require("ws");\n\nconst app = express();\nconst server = http.createServer(app);\nconst wss = new WebSocketServer({ noServer: true });\n\nserver.on("upgrade", (req, socket, head) => {\n  if (!isAllowed(req)) {\n    socket.write("HTTP/1.1 401 Unauthorized\\r\\n\\r\\n");\n    socket.destroy();\n    return;\n  }\n  wss.handleUpgrade(req, socket, head, (ws) => {\n    wss.emit("connection", ws, req);\n  });\n});\n\nserver.listen(3000);`}</code></pre>

      <h3>Per-connection state & rooms</h3>
      <pre><code>{`const rooms = new Map(); // roomId -> Set<socket>\n\nfunction join(socket, roomId) {\n  if (!rooms.has(roomId)) rooms.set(roomId, new Set());\n  rooms.get(roomId).add(socket);\n  socket.roomId = roomId;\n}\n\nfunction broadcast(roomId, payload) {\n  const set = rooms.get(roomId);\n  if (!set) return;\n  const data = JSON.stringify(payload);\n  for (const s of set) {\n    if (s.readyState === WebSocket.OPEN) s.send(data);\n  }\n}`}</code></pre>

      <div className="glass rounded-xl p-4 my-4 border-l-2 border-yellow-500/50">
        <p className="text-sm text-zinc-300"><strong>In-memory rooms do not survive multiple servers.</strong> The map lives in one process. The moment you run two instances behind a load balancer, users on different servers can&apos;t reach each other. Solving that needs a shared pub/sub layer (Chapter 10).</p>
      </div>
    </ChapterSection>
  );
}

function Ch8() {
  return (
    <ChapterSection num={8} title="From Scratch: A Server With No WebSocket Library">
      <p>To truly understand the protocol, here is a working server that uses only Node&apos;s raw TCP — no ws, no framework. You will never ship this, but reading it makes Chapters 4 and 5 concrete.</p>

      <h3>1. Complete the handshake by hand</h3>
      <pre><code>{`const net = require("net");\nconst crypto = require("crypto");\nconst GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";\n\nconst server = net.createServer((socket) => {\n  socket.once("data", (buf) => {\n    const request = buf.toString();\n    const key = request.match(/Sec-WebSocket-Key: (.+)/i)[1].trim();\n    const accept = crypto.createHash("sha1")\n      .update(key + GUID).digest("base64");\n\n    socket.write(\n      "HTTP/1.1 101 Switching Protocols\\r\\n" +\n      "Upgrade: websocket\\r\\n" +\n      "Connection: Upgrade\\r\\n" +\n      "Sec-WebSocket-Accept: " + accept + "\\r\\n\\r\\n"\n    );\n    socket.on("data", (frame) => handleFrame(socket, frame));\n  });\n});\nserver.listen(8080);`}</code></pre>

      <h3>2. Decode an incoming (masked) frame</h3>
      <pre><code>{`function handleFrame(socket, buf) {\n  const opcode = buf[0] & 0x0f;\n  const masked = (buf[1] & 0x80) !== 0;\n  let len = buf[1] & 0x7f;\n  let offset = 2;\n\n  if (len === 126) { len = buf.readUInt16BE(2); offset = 4; }\n  else if (len === 127) { len = Number(buf.readBigUInt64BE(2)); offset = 10; }\n\n  let mask;\n  if (masked) { mask = buf.slice(offset, offset + 4); offset += 4; }\n  const payload = buf.slice(offset, offset + len);\n  if (masked) {\n    for (let i = 0; i < payload.length; i++) payload[i] ^= mask[i % 4];\n  }\n\n  if (opcode === 0x8) return socket.end(); // close\n  if (opcode === 0x1) { // text\n    const text = payload.toString("utf8");\n    sendText(socket, "echo: " + text);\n  }\n}`}</code></pre>

      <h3>3. Encode an outgoing (unmasked) frame</h3>
      <pre><code>{`function sendText(socket, str) {\n  const payload = Buffer.from(str, "utf8");\n  const len = payload.length;\n  let header;\n  if (len < 126) {\n    header = Buffer.from([0x81, len]); // 0x81 = FIN + text opcode\n  } else if (len < 65536) {\n    header = Buffer.alloc(4);\n    header[0] = 0x81; header[1] = 126;\n    header.writeUInt16BE(len, 2);\n  }\n  socket.write(Buffer.concat([header, payload]));\n}`}</code></pre>

      <div className="glass rounded-xl p-4 my-4 border-l-2 border-red-500/50">
        <p className="text-sm text-zinc-300"><strong>Do not ship hand-rolled framing.</strong> This toy ignores fragmentation, continuation frames, control-frame rules, UTF-8 validation, max-size limits, and many security-relevant edge cases. Use a maintained library for anything real.</p>
      </div>
    </ChapterSection>
  );
}

function Ch9() {
  return (
    <ChapterSection num={9} title="Production Reliability: Reconnection & Heartbeats">
      <p>A WebSocket will drop: phones change networks, laptops sleep, load balancers recycle. The connection breaking is normal — your job is to detect it fast and recover gracefully. This is the single biggest gap between a demo and a real app.</p>

      <h3>The two hard problems</h3>
      <ol>
        <li><strong>Detecting a dead connection.</strong> A dropped TCP connection often does not fire onclose for a long time — the OS may take minutes to notice. You need active heartbeats.</li>
        <li><strong>Reconnecting without a stampede.</strong> When a server restarts, thousands of clients reconnect at once. Naive instant retries can take the server back down (&quot;thundering herd&quot;).</li>
      </ol>

      <h3>Heartbeats (ping / pong)</h3>
      <pre><code>{`function heartbeat() { this.isAlive = true; }\n\nwss.on("connection", (socket) => {\n  socket.isAlive = true;\n  socket.on("pong", heartbeat);\n});\n\nconst interval = setInterval(() => {\n  for (const socket of wss.clients) {\n    if (socket.isAlive === false) return socket.terminate();\n    socket.isAlive = false;\n    socket.ping();\n  }\n}, 30000);`}</code></pre>

      <h3>Client reconnection with exponential backoff</h3>
      <pre><code>{`function connect(url) {\n  let attempts = 0;\n  let socket;\n\n  const open = () => {\n    socket = new WebSocket(url);\n    socket.onopen = () => { attempts = 0; };\n    socket.onclose = (e) => {\n      if (e.code === 1000) return; // we closed on purpose\n      const base = Math.min(1000 * 2 ** attempts, 30000);\n      const jitter = Math.random() * base * 0.3;\n      attempts++;\n      setTimeout(open, base + jitter);\n    };\n  };\n  open();\n}`}</code></pre>

      <div className="glass rounded-xl p-4 my-4 border-l-2 border-yellow-500/50">
        <p className="text-sm text-zinc-300"><strong>Always add jitter.</strong> Backoff without jitter still synchronizes clients: they all wait 1s, then all wait 2s, hammering the server in waves. A small random offset spreads reconnections smoothly.</p>
      </div>

      <h3>Don&apos;t lose messages across a reconnect</h3>
      <ul>
        <li><strong>Outbound queue:</strong> buffer messages produced while disconnected and flush them on reconnect.</li>
        <li><strong>Resume tokens / cursors:</strong> the client remembers the last message id it saw; on reconnect it tells the server, which replays anything missed.</li>
      </ul>
    </ChapterSection>
  );
}

function Ch10() {
  return (
    <ChapterSection num={10} title="Scaling WebSockets Across Many Servers">
      <p>One server can hold tens of thousands of connections, but eventually you need several. WebSockets are stateful and long-lived, which makes scaling them fundamentally different from stateless HTTP APIs.</p>

      <h3>Problem 1: load balancing long-lived connections</h3>
      <p>A WebSocket pins a client to one server for the connection&apos;s whole life. Your load balancer must support the HTTP upgrade and ideally sticky sessions.</p>
      <pre><code>{`# NGINX: pass through the upgrade and keep the connection alive\nlocation /ws/ {\n  proxy_pass http://backend;\n  proxy_http_version 1.1;\n  proxy_set_header Upgrade $http_upgrade;\n  proxy_set_header Connection "upgrade";\n  proxy_read_timeout 3600s;\n}`}</code></pre>

      <h3>Problem 2: clients on different servers can&apos;t see each other</h3>
      <p>The fix is a shared pub/sub backplane: every server publishes outgoing messages to a broker, and every server is subscribed.</p>
      <pre><code>{`const { createClient } = require("redis");\nconst pub = createClient(); const sub = pub.duplicate();\nawait pub.connect(); await sub.connect();\n\nawait sub.subscribe("room:lobby", (raw) => {\n  const msg = JSON.parse(raw);\n  for (const s of localClientsInRoom("lobby")) {\n    if (s.readyState === WebSocket.OPEN) s.send(raw);\n  }\n});\n\nfunction onClientMessage(text) {\n  pub.publish("room:lobby", JSON.stringify({ text }));\n}`}</code></pre>

      <h3>Problem 3: backpressure</h3>
      <p>If you push messages faster than a client can receive, data piles up in the server&apos;s send buffer. You must respect backpressure.</p>
      <pre><code>{`function trySend(socket, data) {\n  const LIMIT = 1 << 20; // 1 MB\n  if (socket.bufferedAmount > LIMIT) return false;\n  socket.send(data);\n  return true;\n}`}</code></pre>
      <p>For high-frequency feeds, a good strategy is <strong>conflation</strong>: keep only the latest value per key and send that, rather than queueing every intermediate update.</p>
    </ChapterSection>
  );
}

function Ch11() {
  return (
    <ChapterSection num={11} title="Security: Locking Down a WebSocket Server">
      <p>WebSockets bypass some assumptions HTTP developers rely on. The same-origin policy and CORS do NOT protect WebSocket handshakes — so you must add protections explicitly.</p>

      <h3>1. Always use wss:// (TLS)</h3>
      <p>Encrypt everything in production. Beyond confidentiality, wss:// avoids mixed-content blocking.</p>

      <h3>2. Validate the Origin header (CSWSH)</h3>
      <p>Cross-Site WebSocket Hijacking: because the browser sends cookies automatically and CORS does not apply, a malicious site can open a socket to your server as the logged-in user.</p>
      <pre><code>{`const ALLOWED = new Set(["https://app.example.com"]);\n\nserver.on("upgrade", (req, socket, head) => {\n  if (!ALLOWED.has(req.headers.origin)) {\n    socket.write("HTTP/1.1 403 Forbidden\\r\\n\\r\\n");\n    return socket.destroy();\n  }\n});`}</code></pre>

      <h3>3. Authenticate explicitly with a token</h3>
      <pre><code>{`// Short-lived token in the URL\nconst socket = new WebSocket("wss://api.example.com/ws?token=" + jwt);\n\n// Server validates before accepting:\nserver.on("upgrade", (req, socket, head) => {\n  const url = new URL(req.url, "http://x");\n  const user = verifyJwt(url.searchParams.get("token"));\n  if (!user) { socket.write("HTTP/1.1 401\\r\\n\\r\\n"); return socket.destroy(); }\n  wss.handleUpgrade(req, socket, head, ws => wss.emit("connection", ws, req));\n});`}</code></pre>

      <h3>4. Validate and limit everything from clients</h3>
      <ul>
        <li>Validate message shape/types (schema-validate JSON) before acting.</li>
        <li>Cap message size (<code>maxPayload</code> in ws) so one client can&apos;t OOM you.</li>
        <li>Rate-limit per connection — messages/sec and bytes/sec.</li>
        <li>Authorize every action, not just the connection.</li>
      </ul>

      <h3>Security checklist</h3>
      <div className="not-prose glass rounded-xl overflow-hidden my-4">
        <table>
          <thead><tr><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Control</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Why</th></tr></thead>
          <tbody>
            {[
              ["wss:// only", "Confidentiality, integrity, no mixed-content blocks"],
              ["Validate Origin", "Stops Cross-Site WebSocket Hijacking"],
              ["Explicit token auth", "Don't rely on ambient cookies"],
              ["Per-action authorization", "Connection ≠ permission for every operation"],
              ["maxPayload + rate limits", "Prevents memory/DoS abuse"],
              ["Schema-validate inbound JSON", "Prevents malformed-input bugs & injection"],
              ["Escape on output", "A relayed message is an XSS vector if rendered as HTML"],
            ].map(([c, w]) => (
              <tr key={c} className="border-b border-white/[0.02] last:border-0">
                <td className="p-3 text-xs font-medium text-zinc-300">{c}</td>
                <td className="p-3 text-xs text-zinc-500">{w}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChapterSection>
  );
}

function Ch12() {
  return (
    <ChapterSection num={12} title="Subprotocols, Extensions & Higher-Level Libraries">
      <p>Raw WebSockets give you a message pipe and nothing more — no built-in concept of events, rooms, acknowledgements, or reconnection. Subprotocols and libraries layer those on top.</p>

      <h3>Subprotocols</h3>
      <p>A subprotocol is an agreed message format negotiated during the handshake via <code>Sec-WebSocket-Protocol</code>. It tells both sides how to interpret payloads.</p>
      <pre><code>{`const socket = new WebSocket("wss://example.com", ["graphql-ws", "json.v1"]);\nsocket.onopen = () => console.log("server chose:", socket.protocol);`}</code></pre>
      <p>Well-known subprotocols: STOMP, graphql-ws, MQTT over WebSockets, and WAMP.</p>

      <h3>Extensions</h3>
      <p>Extensions transform the frames themselves. The one you&apos;ll meet is <strong>permessage-deflate</strong>: per-message compression. It can dramatically shrink repetitive JSON, but costs CPU and memory per connection.</p>

      <h3>Higher-level libraries</h3>
      <div className="not-prose glass rounded-xl overflow-hidden my-4">
        <table>
          <thead><tr><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Library</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">What it adds</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Trade-off</th></tr></thead>
          <tbody>
            {[
              ["ws (Node)", "Fast, spec-compliant raw WS", "You build rooms, reconnect, auth yourself"],
              ["Socket.IO", "Auto-reconnect, rooms, ack callbacks", "Its own wire protocol — both sides must use it"],
              ["SockJS", "WS with fallback to long-polling", "Older; less needed now"],
              ["graphql-ws", "GraphQL subscriptions over WS", "Tied to a GraphQL stack"],
              ["Managed (Ably, Pusher)", "Hosted fan-out, presence, history", "Cost & vendor dependency"],
            ].map(([lib, adds, tradeoff]) => (
              <tr key={lib} className="border-b border-white/[0.02] last:border-0">
                <td className="p-3 text-xs font-medium text-zinc-300">{lib}</td>
                <td className="p-3 text-xs text-zinc-500">{adds}</td>
                <td className="p-3 text-xs text-zinc-500">{tradeoff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Where WebSockets sit among the alternatives</h3>
      <div className="not-prose glass rounded-xl overflow-hidden my-4">
        <table>
          <thead><tr><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Need</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Best fit</th></tr></thead>
          <tbody>
            {[
              ["Server→client stream only", "Server-Sent Events"],
              ["Two-way, low-latency, ordered", "WebSockets"],
              ["Peer-to-peer, lowest latency, loss-tolerant", "WebRTC"],
              ["Simple, occasional updates", "HTTP long-polling"],
            ].map(([need, fit]) => (
              <tr key={need} className="border-b border-white/[0.02] last:border-0">
                <td className="p-3 text-xs text-zinc-300">{need}</td>
                <td className="p-3 text-xs font-medium text-emerald-400">{fit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChapterSection>
  );
}

function Ch13() {
  return (
    <ChapterSection num={13} title="Debugging, Inspecting & Testing">
      <p>WebSocket traffic is invisible to the usual &quot;reload and read the response&quot; workflow. These tools let you see and test the frames directly.</p>

      <h3>Browser DevTools</h3>
      <p>Open DevTools → Network tab → filter by WS. Click the connection to see a Messages sub-tab listing every frame sent (green) and received (white) with direction, timestamp, and payload.</p>

      <h3>Command-line testing</h3>
      <pre><code>{`# websocat — like curl for WebSockets\nwebsocat wss://echo.websocket.org\n\n# wscat (npm install -g wscat)\nwscat -c wss://echo.websocket.org\n> hello\n< hello`}</code></pre>

      <h3>A scriptable test client (Node)</h3>
      <pre><code>{`const WebSocket = require("ws");\nconst ws = new WebSocket("wss://example.com/ws?token=test");\n\nws.on("open", () => ws.send(JSON.stringify({ type: "join", room: "lobby" })));\nws.on("message", (d) => console.log("RECV", d.toString()));\nws.on("close", (c, r) => console.log("CLOSE", c, r.toString()));`}</code></pre>

      <h3>Automated tests</h3>
      <pre><code>{`test("client receives welcome and can join a room", async () => {\n  const ws = new WebSocket(TEST_URL);\n  const messages = [];\n  ws.on("message", (d) => messages.push(JSON.parse(d)));\n  await once(ws, "open");\n  ws.send(JSON.stringify({ type: "join", room: "lobby" }));\n  await delay(100);\n  expect(messages.some(m => m.type === "joined")).toBe(true);\n  ws.close();\n});`}</code></pre>

      <div className="glass rounded-xl p-4 my-4 border-l-2 border-yellow-500/50">
        <p className="text-sm text-zinc-300"><strong>Reproduce flaky network conditions.</strong> Most production WebSocket bugs are about disconnection, not the happy path. Test by: killing the server mid-session, throttling the network in DevTools, and sleeping a laptop. If you only test the happy path, you have tested almost nothing.</p>
      </div>
    </ChapterSection>
  );
}

function Ch14() {
  return (
    <ChapterSection num={14} title="Common Pitfalls & How to Avoid Them">
      <p>A field guide to the mistakes nearly everyone makes once.</p>

      <div className="not-prose glass rounded-xl overflow-hidden my-4">
        <table>
          <thead><tr>
            <th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Pitfall</th>
            <th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Symptom</th>
            <th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Fix</th>
          </tr></thead>
          <tbody>
            {[
              ["Sending before OPEN", "InvalidStateError thrown", "Check readyState or send only inside onopen"],
              ["No reconnection logic", "App silently stops updating", "Reconnect on unexpected close with backoff + jitter"],
              ["No heartbeats", "Dead connections linger; proxies kill sockets", "Server-driven ping/pong; keep interval under proxy timeout"],
              ["Proxy idle timeout", "Connections die at exactly 30/60s", "Raise proxy_read_timeout; heartbeat faster"],
              ["In-memory rooms with >1 server", "Messages reach some users, not others", "Add a Redis/NATS pub/sub backplane"],
              ["No Origin check", "CSWSH — other sites connect as your users", "Validate Origin + explicit token auth"],
              ["Ignoring backpressure", "Server memory climbs, then OOM", "Watch bufferedAmount; drop/conflate for slow clients"],
              ["No max message size", "One client OOMs the server", "Set maxPayload"],
              ["Rendering relayed text as HTML", "Stored XSS via chat messages", "Escape on output; validate on input"],
              ["ws:// on an https:// page", "Browser blocks mixed content", "Use wss:// everywhere"],
            ].map(([pitfall, symptom, fix]) => (
              <tr key={pitfall} className="border-b border-white/[0.02] last:border-0">
                <td className="p-3 text-xs font-medium text-red-400">{pitfall}</td>
                <td className="p-3 text-xs text-zinc-500">{symptom}</td>
                <td className="p-3 text-xs text-emerald-400/80">{fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="glass rounded-xl p-4 my-4 border-l-2 border-emerald-500/50">
        <p className="text-sm text-zinc-300"><strong>The 80/20 of getting it right:</strong> If you do only four things: (1) wss:// everywhere, (2) reconnect with backoff + jitter, (3) server-driven heartbeats, and (4) validate Origin + auth token — you have handled the overwhelming majority of real-world WebSocket problems.</p>
      </div>
    </ChapterSection>
  );
}

function Ch15() {
  return (
    <ChapterSection num={15} title="Quick Reference & A Learning Path">

      <h3>Client API cheat sheet</h3>
      <pre><code>{`const ws = new WebSocket("wss://host/path", ["subprotocol"]);\n\nws.onopen    = (e) => {};      // connected — safe to send\nws.onmessage = (e) => e.data;  // string | Blob | ArrayBuffer\nws.onclose   = (e) => e.code;  // 1000 normal, 1001 going away, 1006 abnormal\nws.onerror   = (e) => {};      // sparse; real logic goes in onclose\n\nws.send("text" | arrayBuffer | blob);\nws.binaryType = "arraybuffer"; // default "blob"\nws.bufferedAmount;             // bytes queued, not yet sent\nws.readyState;                 // 0 CONNECTING 1 OPEN 2 CLOSING 3 CLOSED\nws.protocol;                   // negotiated subprotocol\nws.close(1000, "reason");`}</code></pre>

      <h3>Server (ws) cheat sheet</h3>
      <pre><code>{`const { WebSocketServer } = require("ws");\nconst wss = new WebSocketServer({ noServer: true, maxPayload: 262144 });\n\nwss.on("connection", (socket, req) => {\n  socket.on("message", (data, isBinary) => { /* handle */ });\n  socket.on("pong", () => socket.isAlive = true);\n  socket.on("close", (code, reason) => { /* cleanup */ });\n  socket.send(data, { binary: false });\n});\n\nfor (const c of wss.clients) { /* broadcast */ }\nsocket.ping(); socket.terminate(); // heartbeat / hard close`}</code></pre>

      <h3>The numbers worth memorizing</h3>
      <div className="not-prose glass rounded-xl overflow-hidden my-4">
        <table>
          <thead><tr><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Thing</th><th className="text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/[0.04] bg-white/[0.02]">Value</th></tr></thead>
          <tbody>
            {[
              ["Handshake success status", "101 Switching Protocols"],
              ["Protocol version", "13 (RFC 6455)"],
              ["Magic GUID", "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"],
              ["Min frame header", "2 bytes"],
              ["Text / binary / close / ping / pong opcodes", "0x1 / 0x2 / 0x8 / 0x9 / 0xA"],
              ["Normal / going-away / abnormal close", "1000 / 1001 / 1006"],
              ["Default ports", "ws 80, wss 443"],
            ].map(([thing, value]) => (
              <tr key={thing} className="border-b border-white/[0.02] last:border-0">
                <td className="p-3 text-xs text-zinc-300">{thing}</td>
                <td className="p-3 text-xs font-mono text-violet-400">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>A hands-on learning path</h3>
      <ol>
        <li><strong>Echo client</strong> in the browser against a public echo server. Watch the frames in DevTools.</li>
        <li><strong>Echo server</strong> with ws on your machine; connect your client to it.</li>
        <li><strong>Multi-user chat</strong> — broadcast to all clients, then add rooms.</li>
        <li><strong>From-scratch handshake + frame decode</strong> to demystify the wire. Throw it away after.</li>
        <li><strong>Add reliability</strong> — heartbeats + reconnect with backoff/jitter; kill the server and watch it recover.</li>
        <li><strong>Add auth + Origin checks</strong>; try to connect from a different origin and confirm rejection.</li>
        <li><strong>Scale to two instances</strong> behind NGINX with a Redis backplane; confirm cross-server messaging.</li>
        <li><strong>Stress & break it</strong> — throttle the network, sleep the laptop, flood messages; observe backpressure.</li>
      </ol>

      <div className="glass rounded-xl p-4 my-4 border-l-2 border-emerald-500/50">
        <p className="text-sm text-zinc-300"><strong>Finish by building one real thing.</strong> Pick a project you&apos;d actually use — a live cursor on a shared page, a presence indicator, a tiny multiplayer game — and ship it end to end. The production concerns in Chapters 9–11 only truly land once a real user&apos;s flaky phone connection has broken your assumptions a few times.</p>
      </div>
    </ChapterSection>
  );
}

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div className="min-h-screen mesh-gradient noise-bg">
      <header className="sticky top-0 z-50 border-b border-white/[0.04] bg-[#050507]/70 backdrop-blur-2xl">
        <div className="px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Logo size={36} />
            <span className="text-[15px] font-extrabold tracking-tight text-gradient">CryptoPulse</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-violet-400/80 bg-violet-500/10 border border-violet-500/20 px-1.5 py-0.5 rounded-md">Docs</span>
          </Link>
          <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1.5">
            <span>←</span> Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="relative z-10 flex px-6 mt-2">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-48 shrink-0 sticky top-12 h-[calc(100vh-3rem)] py-4 px-3 border-r border-white/[0.04] overflow-y-auto">
          <nav className="space-y-1 flex-1">
            {TABS.map((tab) => {
              const icons: Record<Tab, React.ReactNode> = {
                "Overview": <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>,
                "Architecture": <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/></svg>,
                "Data Flow": <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>,
                "WebSocket Guide": <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/></svg>,
              };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all text-left ${
                    activeTab === tab
                      ? "bg-white/[0.08] text-zinc-100 shadow-sm border border-white/[0.06]"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
                  }`}
                >
                  <span className={activeTab === tab ? "text-emerald-400" : "text-zinc-600"}>{icons[tab]}</span>
                  {tab}
                </button>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="mt-auto pt-6 border-t border-white/[0.04] space-y-3">
            <a
              href="https://github.com/example-user/cryptopulse"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03] transition-all"
            >
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              GitHub Repo
            </a>
            <div className="px-3 text-[11px] text-zinc-700">
              Created by <span className="text-zinc-500">Shubhanshu Saxena</span>
            </div>
          </div>
        </aside>

        {/* Mobile tab bar */}
        <div className="flex items-center gap-1 mb-6 p-1 rounded-xl bg-white/[0.02] border border-white/[0.04] w-fit lg:hidden">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab
                  ? "bg-white/[0.08] text-zinc-100 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="docs-prose flex-1 min-w-0 px-5 py-4 max-w-5xl">
          {activeTab === "Overview" && <OverviewTab />}
          {activeTab === "Architecture" && <ArchitectureTab />}
          {activeTab === "Data Flow" && <DataFlowTab />}
          {activeTab === "WebSocket Guide" && <GuideTab />}
        </main>
      </div>
    </div>
  );
}
