const STRUCTURE = [
	{
		path: 'ws-server/src/app.ts',
		desc: 'Express + ws backend, Binance connector, broadcast, heartbeat',
	},
	{
		path: 'frontend/src/hooks/useWebSocket.ts',
		desc: 'React hook: connect, reconnect, track history',
	},
	{
		path: 'frontend/src/components/Dashboard.tsx',
		desc: 'Main layout with search, sort, market overview',
	},
	{
		path: 'frontend/src/components/CoinCard.tsx',
		desc: 'Individual coin tile with sparkline chart',
	},
	{
		path: 'frontend/src/components/DetailChart.tsx',
		desc: 'Large area chart for selected coin',
	},
	{
		path: 'frontend/src/components/SparklineChart.tsx',
		desc: 'Mini inline chart (Recharts)',
	},
	{
		path: 'frontend/src/components/MarketOverview.tsx',
		desc: 'Market sentiment, gainers/losers, top performers',
	},
	{
		path: 'frontend/src/lib/types.ts',
		desc: 'TypeScript types + asset metadata (8 coins + 1 commodity)',
	},
];

export function OverviewTab() {
	return (
		<>
			<div className='glass rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden'>
				<div className='absolute -top-20 -right-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-[80px]' />
				<div className='absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-[80px]' />
				<div className='relative'>
					<h1 className='text-2xl sm:text-3xl font-bold text-zinc-100 mb-2'>
						Learn WebSockets
					</h1>
					<p className='text-zinc-400 max-w-xl text-base leading-relaxed'>
						A real-time crypto dashboard built to learn WebSockets
						from the ground up. 9 assets streaming live via Binance,
						with broadcast, heartbeats, and auto-reconnect.
					</p>
					<div className='flex flex-wrap gap-3 mt-5'>
						<a
							href='https://github.com/shubhu2002/crypto-pulse-websocket'
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-sm font-medium text-zinc-200 hover:bg-white/8 hover:border-white/12 transition-all'
						>
							<svg
								className='h-4 w-4'
								viewBox='0 0 16 16'
								fill='currentColor'
							>
								<path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z' />
							</svg>
							GitHub Repo
						</a>
						<a
							href='https://crypto-pulse-websocket-ten.vercel.app'
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm font-medium text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-500/30 transition-all'
						>
							<svg
								className='h-4 w-4'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path
									fillRule='evenodd'
									d='M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5zm7.25-.75a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-1.69l-5.22 5.22a.75.75 0 01-1.06-1.06l5.22-5.22h-1.69a.75.75 0 01-.75-.75z'
									clipRule='evenodd'
								/>
							</svg>
							Live Demo
						</a>
					</div>
				</div>
			</div>

			<h2>Tech Stack</h2>
			<div className='grid grid-cols-2 sm:grid-cols-3 gap-3 not-prose'>
				{[
					{
						name: 'Next.js 16',
						desc: 'React framework',
						color: '#fff',
					},
					{
						name: 'TypeScript',
						desc: 'Type safety',
						color: '#3178c6',
					},
					{ name: 'Express', desc: 'HTTP server', color: '#68a063' },
					{ name: 'ws', desc: 'WebSocket library', color: '#10b981' },
					{
						name: 'Recharts',
						desc: 'React charts',
						color: '#8884d8',
					},
					{
						name: 'Tailwind CSS',
						desc: 'Utility CSS',
						color: '#38bdf8',
					},
				].map((tech) => (
					<div
						key={tech.name}
						className='glass rounded-xl p-3 flex items-center gap-3'
					>
						<div
							className='h-8 w-8 rounded-lg flex items-center justify-center text-[10px] font-bold'
							style={{
								backgroundColor: tech.color + '15',
								color: tech.color,
							}}
						>
							{tech.name.slice(0, 2).toUpperCase()}
						</div>
						<div>
							<div className='text-sm font-medium text-zinc-200'>
								{tech.name}
							</div>
							<div className='text-[11px] text-zinc-600'>
								{tech.desc}
							</div>
						</div>
					</div>
				))}
			</div>

			<h2>Project Structure</h2>
			<div className='not-prose glass rounded-xl overflow-x-auto'>
				<table className='min-w-[520px]'>
					<thead>
						<tr>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								File
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Purpose
							</th>
						</tr>
					</thead>
					<tbody>
						{STRUCTURE.map((f) => (
							<tr
								key={f.path}
								className='border-b border-white/2 last:border-0'
							>
								<td className='p-3 text-xs font-mono text-emerald-400/80'>
									{f.path}
								</td>
								<td className='p-3 text-xs text-zinc-500'>
									{f.desc}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<h2>Quick Start</h2>
			<div className='space-y-4'>
				<div className='glass rounded-xl p-4'>
					<h3 className='text-sm font-semibold text-zinc-300 mb-2'>
						1. Clone the Repository
					</h3>
					<pre>
						<code>{`git clone https://github.com/shubhu2002/crypto-pulse-websocket.git`}</code>
					</pre>
				</div>
				<div className='glass rounded-xl p-4'>
					<h3 className='text-sm font-semibold text-zinc-300 mb-2'>
						2. Start the WebSocket server
					</h3>
					<pre>
						<code>{`cd ws-server\nyarn install\nyarn dev          # Runs on port 4000`}</code>
					</pre>
				</div>
				<div className='glass rounded-xl p-4'>
					<h3 className='text-sm font-semibold text-zinc-300 mb-2'>
						3. Start the Next.js frontend
					</h3>
					<pre>
						<code>{`cd frontend\npnpm install\npnpm dev        # Runs on port 3000`}</code>
					</pre>
				</div>
				<div className='glass rounded-xl p-4'>
					<h3 className='text-sm font-semibold text-zinc-300 mb-2'>
						4. Open in browser
					</h3>
					<p>
						Visit <code>http://localhost:3000</code> — you&apos;ll
						see 9 assets streaming live with charts.
					</p>
				</div>
			</div>

			<h2>Links & Resources</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose'>
				{[
					{
						label: 'GitHub Repository',
						href: 'https://github.com/shubhu2002/crypto-pulse-websocket',
						desc: 'Source code, issues, and contribution guide',
						icon: 'GH',
					},
					{
						label: 'Live Demo',
						href: 'https://crypto-pulse-websocket-ten.vercel.app',
						desc: 'Deployed frontend on Vercel',
						icon: 'LV',
					},
					{
						label: 'Binance WebSocket Docs',
						href: 'https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams',
						desc: 'Upstream API we connect to',
						icon: 'BN',
					},
					{
						label: 'RFC 6455 — WebSocket Protocol',
						href: 'https://datatracker.ietf.org/doc/html/rfc6455',
						desc: 'The official spec this guide is built on',
						icon: 'RF',
					},
					{
						label: 'ws — Node WebSocket Library',
						href: 'https://github.com/websockets/ws',
						desc: 'The server library used in this project',
						icon: 'WS',
					},
					{
						label: 'MDN WebSocket API',
						href: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket',
						desc: 'Browser API reference',
						icon: 'MD',
					},
				].map((link) => (
					<a
						key={link.label}
						href={link.href}
						target='_blank'
						rel='noopener noreferrer'
						className='glass rounded-xl p-4 flex items-start gap-3 hover:bg-white/4 hover:border-white/8 transition-all group'
					>
						<div className='shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 text-[10px] font-bold border border-violet-500/15'>
							{link.icon}
						</div>
						<div>
							<div className='text-sm font-semibold text-zinc-200 group-hover:text-white flex items-center gap-1.5'>
								{link.label}
								<svg
									className='h-3 w-3 text-zinc-600 group-hover:text-zinc-400 transition-colors'
									viewBox='0 0 20 20'
									fill='currentColor'
								>
									<path
										fillRule='evenodd'
										d='M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z'
										clipRule='evenodd'
									/>
								</svg>
							</div>
							<div className='text-xs text-zinc-600 mt-0.5'>
								{link.desc}
							</div>
						</div>
					</a>
				))}
			</div>

			<h2>Try These Experiments</h2>
			<ul>
				<li>
					<strong>Open multiple tabs</strong> — watch the server log
					show client count increasing. All tabs get the same
					broadcast data.
				</li>
				<li>
					<strong>Kill the WS server</strong> — watch the frontend
					show &quot;Disconnected&quot; and auto-reconnect when you
					restart it.
				</li>
				<li>
					<strong>Check DevTools → Network → WS</strong> — see every
					WebSocket frame flowing in real-time.
				</li>
				<li>
					<strong>Hit the health endpoint</strong> —{' '}
					<code>curl http://localhost:4000/health</code> shows
					connected client count.
				</li>
				<li>
					<strong>Add a new coin</strong> — add to COINS in server.ts
					and COIN_META in types.ts, restart server.
				</li>
			</ul>
		</>
	);
}

export function ArchitectureTab() {
	return (
		<>
			<h1 className='text-2xl font-bold text-zinc-100 mb-2'>
				Architecture
			</h1>
			<p>
				How CryptoPulse is structured — from the upstream data source to
				your browser.
			</p>

			<div className='glass rounded-2xl p-6 my-6 overflow-x-auto'>
				<svg
					viewBox='0 0 760 480'
					xmlns='http://www.w3.org/2000/svg'
					className='w-full max-w-3xl mx-auto'
				>
					<style>{`
            text { font-family: system-ui, -apple-system, sans-serif; }
            .a-title { font-size: 13px; font-weight: 700; fill: #e4e4e7; }
            .a-label { font-size: 10px; font-weight: 600; fill: #e4e4e7; }
            .a-detail { font-size: 8.5px; fill: #71717a; }
            .a-note { font-size: 8px; fill: #10b981; font-weight: 500; }
            .a-ch { font-size: 7.5px; fill: #52525b; font-style: italic; }
          `}</style>
					<defs>
						<marker
							id='a-arr'
							markerWidth='7'
							markerHeight='5'
							refX='6'
							refY='2.5'
							orient='auto'
						>
							<path
								d='M0,0 L7,2.5 L0,5'
								fill='none'
								stroke='#52525b'
								strokeWidth='1'
							/>
						</marker>
						<marker
							id='a-arr-g'
							markerWidth='7'
							markerHeight='5'
							refX='6'
							refY='2.5'
							orient='auto'
						>
							<path
								d='M0,0 L7,2.5 L0,5'
								fill='none'
								stroke='#10b981'
								strokeWidth='1'
							/>
						</marker>
						<linearGradient
							id='a-grad'
							x1='0'
							y1='0'
							x2='1'
							y2='1'
						>
							<stop
								offset='0%'
								stopColor='#10b981'
								stopOpacity='0.08'
							/>
							<stop
								offset='100%'
								stopColor='#6366f1'
								stopOpacity='0.08'
							/>
						</linearGradient>
					</defs>
					<rect
						x='250'
						y='20'
						width='260'
						height='55'
						rx='12'
						fill='url(#a-grad)'
						stroke='#f59e0b50'
					/>
					<text
						x='380'
						y='43'
						textAnchor='middle'
						className='a-label'
						fill='#f59e0b'
					>
						Binance WebSocket API
					</text>
					<text
						x='380'
						y='58'
						textAnchor='middle'
						className='a-detail'
					>
						wss://stream.binance.com:9443 — 9 asset ticker streams
					</text>
					<path
						d='M380,75 L380,120'
						stroke='#f59e0b80'
						strokeWidth='1.2'
						fill='none'
						markerEnd='url(#a-arr-g)'
						strokeDasharray='4 3'
					/>
					<text
						x='392'
						y='100'
						className='a-note'
						style={{ fontSize: '7.5px' }}
					>
						1 upstream WS
					</text>
					<rect
						x='100'
						y='120'
						width='560'
						height='150'
						rx='14'
						fill='rgba(255,255,255,0.02)'
						stroke='rgba(255,255,255,0.06)'
					/>
					<text
						x='380'
						y='145'
						textAnchor='middle'
						className='a-title'
					>
						WS Server — Express + ws (port 4000)
					</text>
					<rect
						x='125'
						y='160'
						width='150'
						height='40'
						rx='8'
						fill='rgba(255,255,255,0.03)'
						stroke='rgba(255,255,255,0.04)'
					/>
					<text
						x='200'
						y='178'
						textAnchor='middle'
						className='a-label'
						style={{ fontSize: '9px' }}
					>
						Upstream Connector
					</text>
					<text
						x='200'
						y='192'
						textAnchor='middle'
						className='a-ch'
					>
						Binance → CoinTick parse
					</text>
					<rect
						x='305'
						y='160'
						width='150'
						height='40'
						rx='8'
						fill='rgba(255,255,255,0.03)'
						stroke='rgba(255,255,255,0.04)'
					/>
					<text
						x='380'
						y='178'
						textAnchor='middle'
						className='a-label'
						style={{ fontSize: '9px' }}
					>
						Price Cache
					</text>
					<text
						x='380'
						y='192'
						textAnchor='middle'
						className='a-ch'
					>
						Map + snapshot on connect
					</text>
					<rect
						x='485'
						y='160'
						width='150'
						height='40'
						rx='8'
						fill='rgba(255,255,255,0.03)'
						stroke='rgba(255,255,255,0.04)'
					/>
					<text
						x='560'
						y='178'
						textAnchor='middle'
						className='a-label'
						style={{ fontSize: '9px' }}
					>
						Broadcast Engine
					</text>
					<text
						x='560'
						y='192'
						textAnchor='middle'
						className='a-ch'
					>
						Set&lt;WS&gt; → send to all
					</text>
					<path
						d='M275,180 L303,180'
						stroke='#52525b'
						strokeWidth='0.8'
						fill='none'
						markerEnd='url(#a-arr)'
					/>
					<path
						d='M455,180 L483,180'
						stroke='#52525b'
						strokeWidth='0.8'
						fill='none'
						markerEnd='url(#a-arr)'
					/>
					<rect
						x='125'
						y='215'
						width='250'
						height='28'
						rx='6'
						fill='#10b98108'
						stroke='#10b98120'
					/>
					<text
						x='250'
						y='233'
						textAnchor='middle'
						className='a-note'
						style={{ fontSize: '8px' }}
					>
						Snapshot: new clients get all current prices instantly
					</text>
					<rect
						x='405'
						y='215'
						width='230'
						height='28'
						rx='6'
						fill='#6366f108'
						stroke='#6366f120'
					/>
					<text
						x='520'
						y='233'
						textAnchor='middle'
						className='a-detail'
						fill='#818cf8'
						style={{ fontSize: '8px' }}
					>
						Heartbeat: ping/pong every 30s (Ch 9)
					</text>
					<path
						d='M230,270 L180,310'
						stroke='#10b981'
						strokeWidth='1'
						fill='none'
						markerEnd='url(#a-arr-g)'
					/>
					<path
						d='M380,270 L380,310'
						stroke='#10b981'
						strokeWidth='1'
						fill='none'
						markerEnd='url(#a-arr-g)'
					/>
					<path
						d='M530,270 L580,310'
						stroke='#10b981'
						strokeWidth='1'
						fill='none'
						markerEnd='url(#a-arr-g)'
					/>
					<text
						x='380'
						y='298'
						textAnchor='middle'
						className='a-note'
					>
						BROADCAST
					</text>
					<rect
						x='85'
						y='310'
						width='190'
						height='80'
						rx='12'
						fill='rgba(255,255,255,0.02)'
						stroke='rgba(255,255,255,0.05)'
					/>
					<text
						x='180'
						y='333'
						textAnchor='middle'
						className='a-label'
					>
						Browser Tab 1
					</text>
					<text
						x='180'
						y='348'
						textAnchor='middle'
						className='a-detail'
					>
						useWebSocket() hook
					</text>
					<text
						x='180'
						y='362'
						textAnchor='middle'
						className='a-detail'
					>
						Parse → React state → render
					</text>
					<text
						x='180'
						y='380'
						textAnchor='middle'
						className='a-ch'
					>
						Auto-reconnect w/ backoff
					</text>
					<rect
						x='285'
						y='310'
						width='190'
						height='80'
						rx='12'
						fill='rgba(255,255,255,0.02)'
						stroke='rgba(255,255,255,0.05)'
					/>
					<text
						x='380'
						y='333'
						textAnchor='middle'
						className='a-label'
					>
						Browser Tab 2
					</text>
					<text
						x='380'
						y='348'
						textAnchor='middle'
						className='a-detail'
					>
						Independent WS connection
					</text>
					<text
						x='380'
						y='362'
						textAnchor='middle'
						className='a-detail'
					>
						Same broadcast data
					</text>
					<text
						x='380'
						y='380'
						textAnchor='middle'
						className='a-ch'
					>
						Each tab = separate client
					</text>
					<rect
						x='485'
						y='310'
						width='190'
						height='80'
						rx='12'
						fill='rgba(255,255,255,0.02)'
						stroke='rgba(255,255,255,0.05)'
					/>
					<text
						x='580'
						y='333'
						textAnchor='middle'
						className='a-label'
					>
						Browser Tab N
					</text>
					<text
						x='580'
						y='348'
						textAnchor='middle'
						className='a-detail'
					>
						Scales to many clients
					</text>
					<text
						x='580'
						y='362'
						textAnchor='middle'
						className='a-detail'
					>
						Dead ones cleaned by heartbeat
					</text>
					<text
						x='580'
						y='380'
						textAnchor='middle'
						className='a-ch'
					>
						Server tracks in Set&lt;WS&gt;
					</text>
					<rect
						x='85'
						y='415'
						width='590'
						height='45'
						rx='10'
						fill='rgba(239,68,68,0.04)'
						stroke='rgba(239,68,68,0.1)'
					/>
					<text
						x='380'
						y='435'
						textAnchor='middle'
						className='a-label'
						fill='#ef4444'
						style={{ fontSize: '9px' }}
					>
						Reconnection Flow (Ch 9)
					</text>
					<text
						x='380'
						y='450'
						textAnchor='middle'
						className='a-detail'
					>
						Drop → onclose → wait (1s × 2^retries + jitter) →
						reconnect → snapshot → UI restored
					</text>
				</svg>
			</div>

			<h2>Why a Relay Server?</h2>
			<p>
				Without the relay server, every browser tab would open its own
				connection to Binance. This is wasteful and will hit rate limits
				quickly. The server subscribes <strong>once</strong> to Binance
				and fans out data to all connected clients. This is the{' '}
				<strong>broadcast pattern</strong> from Chapter 7.
			</p>

			<h2>Key Design Decisions</h2>
			<h3>1. Express + ws on the same HTTP server</h3>
			<p>
				The WebSocketServer attaches to the same HTTP server that
				Express uses. This means one port serves both the health check
				endpoint (<code>GET /health</code>) and WebSocket connections (
				<code>ws://localhost:4000/ws</code>). In production, you&apos;d
				add a reverse proxy (Nginx/Caddy) in front.
			</p>
			<h3>2. Snapshot on Connect</h3>
			<p>
				When a new client connects, the server immediately sends all
				current prices as a &quot;snapshot&quot; message. Without this,
				users would see empty cards until each coin&apos;s next tick
				arrives. The snapshot fills all 12 cards instantly.
			</p>
			<h3>3. Price History on the Client</h3>
			<p>
				The <code>useWebSocket</code> hook maintains a rolling buffer of
				60 price points per coin. This powers the sparkline charts and
				the detail chart. History is throttled to 1 point/second per
				coin to avoid overwhelming the charts.
			</p>
			<h3>4. Heartbeat with WeakSet</h3>
			<p>
				The server uses a <code>WeakSet</code> to track alive clients.
				Every 30 seconds it pings each client — if a client didn&apos;t
				respond to the previous ping, it&apos;s terminated. The WeakSet
				lets garbage collection clean up references automatically.
			</p>

			<h2>Message Protocol</h2>
			<p>Two message types flow from server to client:</p>
			<h3>Snapshot (once on connect)</h3>
			<pre>
				<code>{`{\n  "type": "snapshot",\n  "data": {\n    "BTCUSDT": { "symbol": "BTCUSDT", "price": 58780, "change24h": -1.25, ... },\n    "ETHUSDT": { ... }\n  }\n}`}</code>
			</pre>
			<h3>Tick (continuous)</h3>
			<pre>
				<code>{`{\n  "type": "tick",\n  "data": {\n    "symbol": "BTCUSDT",\n    "price": 58781.50,\n    "change24h": -1.24,\n    "high24h": 59529,\n    "low24h": 57800,\n    "volume24h": 21900,\n    "timestamp": 1719835200000\n  }\n}`}</code>
			</pre>
		</>
	);
}

export function DataFlowTab() {
	return (
		<>
			<h1 className='text-2xl font-bold text-zinc-100 mb-2'>Data Flow</h1>
			<p>
				Step-by-step trace of every message from Binance to your screen.
			</p>

			<div className='glass rounded-2xl p-6 my-6 overflow-x-auto'>
				<svg
					viewBox='0 0 700 520'
					xmlns='http://www.w3.org/2000/svg'
					className='w-full max-w-3xl mx-auto'
				>
					<style>{`
            text { font-family: system-ui, -apple-system, sans-serif; }
            .s-actor { font-size: 10px; font-weight: 600; }
            .s-msg { font-size: 8.5px; fill: #d4d4d8; }
            .s-note { font-size: 7.5px; fill: #71717a; }
            .s-phase { font-size: 8.5px; font-weight: 600; }
          `}</style>
					<defs>
						<marker
							id='s-arr'
							markerWidth='6'
							markerHeight='4'
							refX='5'
							refY='2'
							orient='auto'
						>
							<path
								d='M0,0 L6,2 L0,4'
								fill='none'
								stroke='#52525b'
								strokeWidth='1'
							/>
						</marker>
					</defs>
					<rect
						x='55'
						y='10'
						width='90'
						height='28'
						rx='6'
						fill='#f59e0b10'
						stroke='#f59e0b40'
					/>
					<text
						x='100'
						y='29'
						textAnchor='middle'
						className='s-actor'
						fill='#f59e0b'
					>
						Binance
					</text>
					<rect
						x='275'
						y='10'
						width='110'
						height='28'
						rx='6'
						fill='#10b98110'
						stroke='#10b98140'
					/>
					<text
						x='330'
						y='29'
						textAnchor='middle'
						className='s-actor'
						fill='#10b981'
					>
						WS Server
					</text>
					<rect
						x='500'
						y='10'
						width='110'
						height='28'
						rx='6'
						fill='#6366f110'
						stroke='#6366f140'
					/>
					<text
						x='555'
						y='29'
						textAnchor='middle'
						className='s-actor'
						fill='#818cf8'
					>
						Browser
					</text>
					<line
						x1='100'
						y1='38'
						x2='100'
						y2='510'
						stroke='#27272a'
						strokeWidth='1'
						strokeDasharray='4 3'
					/>
					<line
						x1='330'
						y1='38'
						x2='330'
						y2='510'
						stroke='#27272a'
						strokeWidth='1'
						strokeDasharray='4 3'
					/>
					<line
						x1='555'
						y1='38'
						x2='555'
						y2='510'
						stroke='#27272a'
						strokeWidth='1'
						strokeDasharray='4 3'
					/>
					<rect
						x='15'
						y='55'
						width='670'
						height='16'
						rx='3'
						fill='#f59e0b06'
					/>
					<text
						x='25'
						y='66'
						className='s-phase'
						fill='#f59e0b'
					>
						PHASE 1: Server Startup
					</text>
					<line
						x1='330'
						y1='82'
						x2='102'
						y2='82'
						stroke='#f59e0b60'
						strokeWidth='1'
						markerEnd='url(#s-arr)'
					/>
					<text
						x='216'
						y='78'
						textAnchor='middle'
						className='s-msg'
					>
						HTTP Upgrade → wss://stream.binance.com
					</text>
					<line
						x1='100'
						y1='100'
						x2='328'
						y2='100'
						stroke='#f59e0b60'
						strokeWidth='1'
						markerEnd='url(#s-arr)'
					/>
					<text
						x='216'
						y='96'
						textAnchor='middle'
						className='s-msg'
					>
						101 Switching Protocols
					</text>
					<text
						x='216'
						y='112'
						textAnchor='middle'
						className='s-note'
					>
						Sec-WebSocket-Key → SHA1+GUID → Sec-WebSocket-Accept (Ch
						4)
					</text>
					<rect
						x='15'
						y='126'
						width='670'
						height='16'
						rx='3'
						fill='#6366f106'
					/>
					<text
						x='25'
						y='137'
						className='s-phase'
						fill='#818cf8'
					>
						PHASE 2: Client Connects
					</text>
					<line
						x1='555'
						y1='152'
						x2='332'
						y2='152'
						stroke='#818cf860'
						strokeWidth='1'
						markerEnd='url(#s-arr)'
					/>
					<text
						x='443'
						y='148'
						textAnchor='middle'
						className='s-msg'
					>
						new WebSocket(&quot;ws://localhost:4000/ws&quot;)
					</text>
					<line
						x1='330'
						y1='170'
						x2='553'
						y2='170'
						stroke='#10b98160'
						strokeWidth='1'
						markerEnd='url(#s-arr)'
					/>
					<text
						x='443'
						y='166'
						textAnchor='middle'
						className='s-msg'
					>
						101 Switching Protocols → onopen fires
					</text>
					<line
						x1='330'
						y1='190'
						x2='553'
						y2='190'
						stroke='#10b98160'
						strokeWidth='1'
						markerEnd='url(#s-arr)'
					/>
					<text
						x='443'
						y='186'
						textAnchor='middle'
						className='s-msg'
						fill='#10b981'
					>
						snapshot: all current prices
					</text>
					<text
						x='443'
						y='202'
						textAnchor='middle'
						className='s-note'
					>
						UI fills instantly — no waiting for first tick
					</text>
					<rect
						x='15'
						y='218'
						width='670'
						height='16'
						rx='3'
						fill='#10b98106'
					/>
					<text
						x='25'
						y='229'
						className='s-phase'
						fill='#10b981'
					>
						PHASE 3: Live Streaming
					</text>
					<line
						x1='100'
						y1='248'
						x2='328'
						y2='248'
						stroke='#f59e0b60'
						strokeWidth='1'
						markerEnd='url(#s-arr)'
					/>
					<text
						x='216'
						y='244'
						textAnchor='middle'
						className='s-msg'
					>
						ticker: BTCUSDT c=&quot;58780&quot; P=&quot;-1.25&quot;
					</text>
					<rect
						x='310'
						y='255'
						width='40'
						height='14'
						rx='3'
						fill='rgba(255,255,255,0.03)'
					/>
					<text
						x='330'
						y='265'
						textAnchor='middle'
						className='s-note'
					>
						parse
					</text>
					<line
						x1='330'
						y1='275'
						x2='553'
						y2='275'
						stroke='#10b98160'
						strokeWidth='1'
						markerEnd='url(#s-arr)'
					/>
					<text
						x='443'
						y='271'
						textAnchor='middle'
						className='s-msg'
						fill='#10b981'
					>
						tick: CoinTick JSON
					</text>
					<text
						x='575'
						y='292'
						className='s-note'
						textAnchor='start'
						fill='#a1a1aa'
					>
						→ setPrices()
					</text>
					<text
						x='575'
						y='304'
						className='s-note'
						textAnchor='start'
						fill='#a1a1aa'
					>
						→ setHistory()
					</text>
					<text
						x='575'
						y='316'
						className='s-note'
						textAnchor='start'
						fill='#a1a1aa'
					>
						→ React re-render
					</text>
					<rect
						x='80'
						y='328'
						width='495'
						height='14'
						rx='3'
						stroke='#27272a'
						strokeWidth='0.5'
						fill='none'
						strokeDasharray='3 2'
					/>
					<text
						x='327'
						y='338'
						textAnchor='middle'
						className='s-note'
					>
						repeats ~9 ticks/sec (9 assets × ~1 tick/sec each)
					</text>
					<rect
						x='15'
						y='356'
						width='670'
						height='16'
						rx='3'
						fill='#8b5cf606'
					/>
					<text
						x='25'
						y='367'
						className='s-phase'
						fill='#a78bfa'
					>
						PHASE 4: Heartbeat (30s interval)
					</text>
					<line
						x1='330'
						y1='386'
						x2='553'
						y2='386'
						stroke='#a78bfa60'
						strokeWidth='1'
						markerEnd='url(#s-arr)'
					/>
					<text
						x='443'
						y='382'
						textAnchor='middle'
						className='s-msg'
						fill='#a78bfa'
					>
						Ping (opcode 0x9)
					</text>
					<line
						x1='555'
						y1='404'
						x2='332'
						y2='404'
						stroke='#a78bfa60'
						strokeWidth='1'
						markerEnd='url(#s-arr)'
					/>
					<text
						x='443'
						y='400'
						textAnchor='middle'
						className='s-msg'
						fill='#a78bfa'
					>
						Pong (opcode 0xA — auto-reply)
					</text>
					<text
						x='443'
						y='418'
						textAnchor='middle'
						className='s-note'
					>
						No pong → ws.terminate() → dead client removed
					</text>
					<rect
						x='15'
						y='434'
						width='670'
						height='16'
						rx='3'
						fill='#ef444406'
					/>
					<text
						x='25'
						y='445'
						className='s-phase'
						fill='#ef4444'
					>
						PHASE 5: Disconnect + Reconnect
					</text>
					<line
						x1='330'
						y1='464'
						x2='553'
						y2='464'
						stroke='#ef444460'
						strokeWidth='1'
						markerEnd='url(#s-arr)'
					/>
					<text
						x='443'
						y='460'
						textAnchor='middle'
						className='s-msg'
						fill='#ef4444'
					>
						Close frame (code 1001)
					</text>
					<text
						x='575'
						y='480'
						className='s-note'
						fill='#ef4444'
					>
						onclose fires
					</text>
					<text
						x='575'
						y='492'
						className='s-note'
						fill='#71717a'
					>
						wait 1s + jitter
					</text>
					<line
						x1='555'
						y1='500'
						x2='332'
						y2='500'
						stroke='#818cf860'
						strokeWidth='1'
						markerEnd='url(#s-arr)'
					/>
					<text
						x='443'
						y='496'
						textAnchor='middle'
						className='s-msg'
					>
						Reconnect → new WebSocket()
					</text>
				</svg>
			</div>

			<h2>Step-by-Step Walkthrough</h2>
			<h3>Step 1: Server Starts</h3>
			<p>
				The Express server starts on port 4000 and immediately connects
				to Binance&apos;s combined stream endpoint. It subscribes to{' '}
				<code>@ticker</code> streams for all 9 assets in a single
				WebSocket connection.
			</p>
			<pre>
				<code>{`const streams = COINS.map(c => \`\${c}@ticker\`).join("/");\nconst url = \`wss://stream.binance.com:9443/stream?streams=\${streams}\`;\nconst upstream = new WebSocket(url);`}</code>
			</pre>
			<h3>Step 2: Client Opens Connection</h3>
			<p>
				When you open <code>localhost:3000</code>, the{' '}
				<code>useWebSocket</code> hook creates a WebSocket to{' '}
				<code>ws://localhost:4000/ws</code>. The server adds the client
				to the Set and immediately sends a snapshot.
			</p>
			<pre>
				<code>{`wss.on("connection", (ws) => {\n  clients.add(ws);\n  ws.send(JSON.stringify({ type: "snapshot", data: Object.fromEntries(latestPrices) }));\n});`}</code>
			</pre>
			<h3>Step 3: Ticks Flow</h3>
			<p>
				Binance sends a ticker update roughly every second per coin. The
				server parses it, stores it, and calls <code>broadcast()</code>{' '}
				which loops through all clients.
			</p>
			<pre>
				<code>{`function broadcast(data: object) {\n  const payload = JSON.stringify(data);\n  for (const client of clients) {\n    if (client.readyState === WebSocket.OPEN) {\n      client.send(payload);\n    }\n  }\n}`}</code>
			</pre>
			<h3>Step 4: React Updates</h3>
			<p>
				The browser receives each tick in <code>ws.onmessage</code>. The
				hook updates the current price map and the history buffer.
				History is throttled to 1 point per second per coin.
			</p>
			<h3>Step 5: Heartbeat</h3>
			<p>
				Every 30 seconds, the server pings all clients. The browser
				auto-replies with pong. If a client doesn&apos;t respond,
				it&apos;s terminated.
			</p>
			<h3>Step 6: Reconnection</h3>
			<p>
				If the connection drops, <code>onclose</code> fires and the hook
				schedules a reconnect with exponential backoff + jitter:
			</p>
			<pre>
				<code>{`const base = Math.min(1000 * 2 ** retries, 30000);\nconst jitter = Math.random() * 1000;\nsetTimeout(connect, base + jitter);`}</code>
			</pre>
			<p>
				<strong>Why jitter?</strong> Without it, 1000 clients all
				reconnecting at the same time creates a &quot;thundering
				herd&quot; that can crash the server.
			</p>

			<h2>What Happens When Things Break</h2>
			<h3>Server dies</h3>
			<ul>
				<li>
					Browser <code>onclose</code> fires with code 1006 (abnormal
					closure)
				</li>
				<li>StatusBadge turns red</li>
				<li>Hook retries with backoff: 1s, 2s, 4s, 8s, 16s, 30s...</li>
				<li>
					When server comes back: reconnect → snapshot fills UI
					instantly
				</li>
			</ul>
			<h3>Binance upstream drops</h3>
			<ul>
				<li>Server auto-reconnects to Binance in 3 seconds</li>
				<li>
					Browser clients stay connected — prices freeze briefly, then
					resume
				</li>
			</ul>
			<h3>Browser tab goes to sleep</h3>
			<ul>
				<li>
					Server&apos;s heartbeat ping gets no pong →{' '}
					<code>ws.terminate()</code> after 30s
				</li>
				<li>
					When tab wakes: browser <code>onclose</code> fires →
					reconnect → snapshot
				</li>
			</ul>
		</>
	);
}

