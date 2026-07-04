import { useState } from 'react';

const GUIDE_CHAPTERS = [
	'Ch 1: What Is a WebSocket',
	'Ch 2: Polling, Long-Polling, SSE',
	'Ch 3: Fundamentals & Vocabulary',
	'Ch 4: The Opening Handshake',
	'Ch 5: The Frame Protocol',
	'Ch 6: Browser WebSocket API',
	'Ch 7: Server Side with Node & ws',
	'Ch 8: From Scratch Server',
	'Ch 9: Reconnection & Heartbeats',
	'Ch 10: Scaling WebSockets',
	'Ch 11: Security',
	'Ch 12: Subprotocols & Libraries',
	'Ch 13: Debugging & Testing',
	'Ch 14: Common Pitfalls',
	'Ch 15: Quick Reference',
] as const;
type GuideChapter = (typeof GUIDE_CHAPTERS)[number];

export function GuideTab() {
	const [chapter, setChapter] = useState<GuideChapter>(GUIDE_CHAPTERS[0]);

	return (
		<>
			<div className='glass rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden'>
				<div className='absolute -top-20 -right-20 h-40 w-40 rounded-full bg-violet-500/10 blur-[80px]' />
				<div className='absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-500/10 blur-[80px]' />
				<div className='relative'>
					<h1 className='text-2xl sm:text-3xl font-bold text-zinc-100 mb-2'>
						WebSockets — From Scratch to Everything
					</h1>
					<p className='text-zinc-400 max-w-xl text-base leading-relaxed'>
						A complete developer&apos;s guide. 15 chapters built
						around RFC 6455, with runnable code in every section.
					</p>
				</div>
			</div>

			{/* Chapter selector */}
			<div className='flex flex-wrap gap-1.5 mb-8'>
				{GUIDE_CHAPTERS.map((ch) => (
					<button
						key={ch}
						onClick={() => setChapter(ch)}
						className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
							chapter === ch ?
								'bg-violet-500/15 text-violet-300 border border-violet-500/30'
							:	'bg-white/3 text-zinc-500 border border-white/4 hover:text-zinc-300 hover:bg-white/5'
						}`}
					>
						{ch}
					</button>
				))}
			</div>

			<div>
				{chapter === 'Ch 1: What Is a WebSocket' && <Ch1 />}
				{chapter === 'Ch 2: Polling, Long-Polling, SSE' && <Ch2 />}
				{chapter === 'Ch 3: Fundamentals & Vocabulary' && <Ch3 />}
				{chapter === 'Ch 4: The Opening Handshake' && <Ch4 />}
				{chapter === 'Ch 5: The Frame Protocol' && <Ch5 />}
				{chapter === 'Ch 6: Browser WebSocket API' && <Ch6 />}
				{chapter === 'Ch 7: Server Side with Node & ws' && <Ch7 />}
				{chapter === 'Ch 8: From Scratch Server' && <Ch8 />}
				{chapter === 'Ch 9: Reconnection & Heartbeats' && <Ch9 />}
				{chapter === 'Ch 10: Scaling WebSockets' && <Ch10 />}
				{chapter === 'Ch 11: Security' && <Ch11 />}
				{chapter === 'Ch 12: Subprotocols & Libraries' && <Ch12 />}
				{chapter === 'Ch 13: Debugging & Testing' && <Ch13 />}
				{chapter === 'Ch 14: Common Pitfalls' && <Ch14 />}
				{chapter === 'Ch 15: Quick Reference' && <Ch15 />}
			</div>
		</>
	);
}

function ChapterSection({
	num,
	title,
	children,
}: {
	num: number;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className='glass rounded-2xl p-5 sm:p-8 relative overflow-hidden'>
			<div className='absolute -top-20 -right-20 h-40 w-40 rounded-full bg-violet-500/10 blur-[80px]' />
			<div className='absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-emerald-500/5 blur-[80px]' />
			<div className='relative'>
				<div className='flex items-center gap-3 mb-6'>
					<span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300 text-sm font-bold border border-violet-500/20'>
						{num}
					</span>
					<h1 className='text-2xl font-bold text-zinc-100 m-0! p-0! border-0!'>
						{title}
					</h1>
				</div>
				<div className='docs-prose'>{children}</div>
			</div>
		</div>
	);
}

function Ch1() {
	return (
		<ChapterSection
			num={1}
			title='What Is a WebSocket and Why It Exists'
		>
			<p>
				A WebSocket is a single, long-lived TCP connection between a
				client and a server over which both sides can send messages at
				any time, independently, without re-asking for permission. That
				sentence is the whole idea — everything else is detail.
			</p>

			<h3>The problem with plain HTTP</h3>
			<p>
				The classic web works on a request/response model. The browser
				asks for something, the server answers, and the conversation
				ends. The server can never speak first. If a new chat message
				arrives, or a stock price ticks, or another player makes a move,
				the server has no way to tell the browser — it has to wait to be
				asked.
			</p>
			<p>
				For documents this is fine. For anything real-time — chat, live
				dashboards, multiplayer games, collaborative editors, trading
				apps, notifications — it is a poor fit.
			</p>

			<h3>What WebSockets give you</h3>
			<ul>
				<li>
					<strong>Full-duplex</strong> — both directions at the same
					time, like a phone call rather than walkie-talkies.
				</li>
				<li>
					<strong>Persistent</strong> — one connection stays open for
					the whole session instead of reconnecting per message.
				</li>
				<li>
					<strong>Low overhead</strong> — after the initial handshake,
					a message carries as little as 2 bytes of framing, versus
					hundreds of bytes of HTTP headers.
				</li>
				<li>
					<strong>Low latency</strong> — no new TCP/TLS handshake per
					message; data flows the instant either side has something to
					say.
				</li>
				<li>
					<strong>Message-oriented</strong> — you send and receive
					discrete messages (text or binary), not a raw byte stream.
				</li>
			</ul>

			<h3>The mental model</h3>
			<p>
				Think of HTTP as mailing letters: each one is a complete,
				self-addressed round trip. A WebSocket is opening a phone line:
				you dial once (the handshake), then either party talks freely
				until someone hangs up.
			</p>

			<h3>Where you have seen WebSockets</h3>
			<div className='not-prose glass rounded-xl overflow-hidden my-4'>
				<table>
					<thead>
						<tr>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Use case
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								What flows over the socket
							</th>
						</tr>
					</thead>
					<tbody>
						{[
							[
								'Chat & messaging',
								'Incoming messages, typing indicators, presence',
							],
							[
								'Live dashboards / metrics',
								'Server-pushed metric updates many times per second',
							],
							[
								'Multiplayer games',
								'Player positions, game-state deltas, low-latency input',
							],
							[
								'Collaborative editing',
								'Document operations (Google Docs–style cursors & edits)',
							],
							[
								'Trading & markets',
								'Order-book updates, price ticks, fills',
							],
							[
								'Notifications',
								'"Someone liked your post" pushed instantly',
							],
						].map(([uc, desc]) => (
							<tr
								key={uc}
								className='border-b border-white/2 last:border-0'
							>
								<td className='p-3 text-xs font-medium text-zinc-300'>
									{uc}
								</td>
								<td className='p-3 text-xs text-zinc-500'>
									{desc}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<h3>A 30-second taste</h3>
			<pre>
				<code>{`const socket = new WebSocket("wss://example.com/chat");\nsocket.onopen    = () => socket.send("hello server");\nsocket.onmessage = (event) => console.log("server says:", event.data);\nsocket.onclose   = () => console.log("connection closed");`}</code>
			</pre>
			<p>
				That is the entire client surface for the common case. The depth
				in this guide is about what happens beneath those four lines —
				and how to run them safely in production.
			</p>
		</ChapterSection>
	);
}

function Ch2() {
	return (
		<ChapterSection
			num={2}
			title='The Road to Real-Time: Polling, Long-Polling, SSE'
		>
			<p>
				To understand why WebSockets are shaped the way they are, it
				helps to see the workarounds they replaced. Each one chips away
				at the same limitation: HTTP servers cannot initiate.
			</p>

			<h3>1. Short polling</h3>
			<p>
				The browser asks &quot;anything new?&quot; on a timer — say
				every 3 seconds. Simple, works everywhere, and terrible: most
				requests return &quot;nothing&quot;, every request pays the full
				HTTP header cost, and updates are delayed by up to the polling
				interval.
			</p>
			<pre>
				<code>{`setInterval(async () => {\n  const res = await fetch("/api/messages?since=" + lastId);\n  const data = await res.json();\n  if (data.length) render(data);\n}, 3000);`}</code>
			</pre>

			<h3>2. Long polling</h3>
			<p>
				A smarter trick: the browser sends a request, and the server
				holds it open until it actually has data (or a timeout fires).
				The moment the server responds, the browser immediately opens a
				new request. Near-real-time delivery, but each message still
				costs a full HTTP round trip.
			</p>

			<h3>3. Server-Sent Events (SSE)</h3>
			<p>
				SSE is a real standard (the <code>EventSource</code> API) for
				server-to-client streaming over a single long-lived HTTP
				response. Great for one-way feeds with built-in auto-reconnect —
				but one-directional only.
			</p>
			<pre>
				<code>{`const events = new EventSource("/stream");\nevents.onmessage = (e) => console.log("update:", e.data);`}</code>
			</pre>

			<div className='glass rounded-xl p-4 my-4 border-l-2 border-emerald-500/50'>
				<p className='text-sm text-zinc-300'>
					<strong>When SSE beats WebSockets:</strong> If you only need
					the server to push to the client (a notification feed, a
					live score), SSE is simpler, rides on plain HTTP, and
					reconnects itself. Reach for WebSockets when you need
					genuine two-way traffic or binary frames.
				</p>
			</div>

			<h3>How they compare</h3>
			<div className='not-prose glass rounded-xl overflow-hidden my-4'>
				<table>
					<thead>
						<tr>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Technique
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Direction
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Latency
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Overhead/msg
							</th>
						</tr>
					</thead>
					<tbody>
						{[
							[
								'Short polling',
								'Client pulls',
								'Poor (interval)',
								'Full HTTP headers',
							],
							[
								'Long polling',
								'Client pulls (held)',
								'Good',
								'Full HTTP headers',
							],
							[
								'SSE',
								'Server → client only',
								'Excellent',
								'Tiny (text framing)',
							],
							[
								'WebSocket',
								'Full-duplex',
								'Excellent',
								'2–14 bytes',
							],
						].map(([t, d, l, o]) => (
							<tr
								key={t}
								className='border-b border-white/2 last:border-0'
							>
								<td className='p-3 text-xs font-medium text-zinc-300'>
									{t}
								</td>
								<td className='p-3 text-xs text-zinc-500'>
									{d}
								</td>
								<td className='p-3 text-xs text-zinc-500'>
									{l}
								</td>
								<td className='p-3 text-xs text-zinc-500'>
									{o}
								</td>
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
		<ChapterSection
			num={3}
			title='WebSocket Fundamentals & Vocabulary'
		>
			<h3>The URL schemes: ws:// and wss://</h3>
			<div className='not-prose glass rounded-xl overflow-hidden my-4'>
				<table>
					<thead>
						<tr>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Scheme
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Meaning
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Default port
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className='border-b border-white/2'>
							<td className='p-3 text-xs font-mono text-emerald-400'>
								ws://
							</td>
							<td className='p-3 text-xs text-zinc-500'>
								Unencrypted WebSocket
							</td>
							<td className='p-3 text-xs text-zinc-500'>80</td>
						</tr>
						<tr>
							<td className='p-3 text-xs font-mono text-emerald-400'>
								wss://
							</td>
							<td className='p-3 text-xs text-zinc-500'>
								TLS-encrypted WebSocket
							</td>
							<td className='p-3 text-xs text-zinc-500'>443</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className='glass rounded-xl p-4 my-4 border-l-2 border-red-500/50'>
				<p className='text-sm text-zinc-300'>
					<strong>Always use wss:// in production.</strong> Plain
					ws:// is readable by anyone on the network path and is
					blocked by browsers on HTTPS pages (mixed content).
				</p>
			</div>

			<h3>The lifecycle</h3>
			<ol>
				<li>
					<strong>Handshake</strong> — an HTTP request that asks to
					&quot;upgrade&quot; to the WebSocket protocol.
				</li>
				<li>
					<strong>Open / data phase</strong> — both sides exchange
					frames freely.
				</li>
				<li>
					<strong>Closing handshake</strong> — either side sends a
					close frame with a status code; the other acknowledges.
				</li>
				<li>
					<strong>Closed</strong> — the underlying TCP connection is
					torn down.
				</li>
			</ol>

			<h3>Key terms</h3>
			<div className='not-prose glass rounded-xl overflow-hidden my-4'>
				<table>
					<thead>
						<tr>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Term
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Meaning
							</th>
						</tr>
					</thead>
					<tbody>
						{[
							[
								'Frame',
								'The smallest unit on the wire. Carries a bit of header plus payload.',
							],
							[
								'Message',
								'One logical chunk of data. May be split across several frames (fragmentation).',
							],
							[
								'Opcode',
								'A 4-bit code in each frame: text, binary, close, ping, pong, or continuation.',
							],
							[
								'Masking',
								'Client-to-server payloads are XOR-scrambled with a random key (security requirement).',
							],
							[
								'Control frame',
								'Ping, pong, and close — manage the connection, not carry app data.',
							],
							[
								'Subprotocol',
								'An application-level contract negotiated in the handshake (e.g. graphql-ws).',
							],
							[
								'Extension',
								'A negotiated transform of frames, e.g. permessage-deflate compression.',
							],
						].map(([term, meaning]) => (
							<tr
								key={term}
								className='border-b border-white/2 last:border-0'
							>
								<td className='p-3 text-xs font-medium text-zinc-300'>
									{term}
								</td>
								<td className='p-3 text-xs text-zinc-500'>
									{meaning}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<p>
				WebSockets run over TCP, so messages arrive in order and
				reliably. The flip side: TCP&apos;s head-of-line blocking means
				a delayed packet stalls everything behind it. For games needing
				absolute lowest latency with tolerance for loss, WebRTC data
				channels (over UDP) can be a better fit.
			</p>
		</ChapterSection>
	);
}

function Ch4() {
	return (
		<ChapterSection
			num={4}
			title='The Opening Handshake (HTTP Upgrade)'
		>
			<p>
				A WebSocket connection is born as an ordinary HTTP request. This
				is why WebSockets work through firewalls, proxies, and on ports
				80/443 — they look like HTTP until the last moment, then
				&quot;upgrade&quot;.
			</p>

			<h3>Step 1 — the client&apos;s upgrade request</h3>
			<pre>
				<code>{`GET /chat HTTP/1.1\nHost: example.com\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\nSec-WebSocket-Version: 13\nOrigin: https://example.com`}</code>
			</pre>

			<h3>
				Step 2 — the server&apos;s &quot;101 Switching Protocols&quot;
			</h3>
			<pre>
				<code>{`HTTP/1.1 101 Switching Protocols\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=`}</code>
			</pre>

			<h3>The magic of Sec-WebSocket-Accept</h3>
			<p>
				The server cannot just echo the key back — that would let any
				dumb cache fake a handshake. Instead it runs a fixed recipe
				defined by the RFC:
			</p>
			<ol>
				<li>
					Take the client&apos;s <code>Sec-WebSocket-Key</code>.
				</li>
				<li>
					Append the magic GUID string{' '}
					<code>258EAFA5-E914-47DA-95CA-C5AB0DC85B11</code>.
				</li>
				<li>Take the SHA-1 hash of that combined string.</li>
				<li>Base64-encode the hash.</li>
			</ol>
			<pre>
				<code>{`const crypto = require("crypto");\nconst GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";\n\nfunction accept(clientKey) {\n  return crypto\n    .createHash("sha1")\n    .update(clientKey + GUID)\n    .digest("base64");\n}`}</code>
			</pre>
			<p>
				After 101, the bytes on that same TCP socket are no longer HTTP
				— they are WebSocket frames. The connection is now full-duplex
				and stays open.
			</p>
		</ChapterSection>
	);
}

function Ch5() {
	return (
		<ChapterSection
			num={5}
			title='The Frame Protocol: What Travels on the Wire'
		>
			<p>
				After the handshake, every byte is part of a frame. This is the
				heart of how WebSockets are so cheap.
			</p>

			<h3>The frame layout (RFC 6455)</h3>
			<pre>
				<code>{` 0                   1                   2                   3\n 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1\n+-+-+-+-+-------+-+-------------+-------------------------------+\n|F|R|R|R| op    |M| Payload len |    Extended payload length    |\n|I|S|S|S| code  |A|     (7)     |             (16/64)           |\n|N|V|V|V| (4)   |S|             |   (if payload len==126/127)   |\n| |1|2|3|       |K|             |                               |\n+-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +\n|                               | Masking-key, if MASK set to 1 |\n+-------------------------------+-------------------------------+\n|          Payload Data continued ...                           |\n+---------------------------------------------------------------+`}</code>
			</pre>

			<h3>Why messages can be just 2 bytes</h3>
			<p>
				For a short text message (≤125 bytes) from server to client, the
				entire frame header is just 2 bytes (FIN+opcode, then
				MASK+length). Compare that to an HTTP request with hundreds of
				bytes of headers.
			</p>

			<h3>Opcodes</h3>
			<div className='not-prose glass rounded-xl overflow-hidden my-4'>
				<table>
					<thead>
						<tr>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Opcode
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Name
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Meaning
							</th>
						</tr>
					</thead>
					<tbody>
						{[
							[
								'0x0',
								'Continuation',
								'Follow-on fragment of a previous message',
							],
							['0x1', 'Text', 'UTF-8 text payload'],
							[
								'0x2',
								'Binary',
								'Arbitrary bytes (files, protobuf, etc.)',
							],
							[
								'0x8',
								'Close',
								'Begin the closing handshake (carries a status code)',
							],
							['0x9', 'Ping', 'Heartbeat / liveness check'],
							[
								'0xA',
								'Pong',
								'Reply to a ping (or unsolicited keep-alive)',
							],
						].map(([code, name, meaning]) => (
							<tr
								key={code}
								className='border-b border-white/2 last:border-0'
							>
								<td className='p-3 text-xs font-mono text-violet-400'>
									{code}
								</td>
								<td className='p-3 text-xs font-medium text-zinc-300'>
									{name}
								</td>
								<td className='p-3 text-xs text-zinc-500'>
									{meaning}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<h3>Masking: a subtle security rule</h3>
			<p>
				Every frame sent from client to server must be masked — the
				payload is XOR-ed byte by byte with a 4-byte random key. Frames
				from server to client must NOT be masked. This exists to defeat
				cache-poisoning attacks on intermediary proxies.
			</p>
			<pre>
				<code>{`function applyMask(payload, maskKey) {\n  const out = Buffer.alloc(payload.length);\n  for (let i = 0; i < payload.length; i++) {\n    out[i] = payload[i] ^ maskKey[i % 4];\n  }\n  return out;\n}`}</code>
			</pre>

			<h3>Close codes</h3>
			<div className='not-prose glass rounded-xl overflow-hidden my-4'>
				<table>
					<thead>
						<tr>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Code
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Meaning
							</th>
						</tr>
					</thead>
					<tbody>
						{[
							['1000', 'Normal closure'],
							[
								'1001',
								'Going away (server shutting down, browser navigating away)',
							],
							['1002', 'Protocol error'],
							[
								'1006',
								'Abnormal closure — no close frame seen (connection dropped)',
							],
							['1009', 'Message too big'],
							[
								'4000–4999',
								"Available for your application's own meanings",
							],
						].map(([code, meaning]) => (
							<tr
								key={code}
								className='border-b border-white/2 last:border-0'
							>
								<td className='p-3 text-xs font-mono text-violet-400'>
									{code}
								</td>
								<td className='p-3 text-xs text-zinc-500'>
									{meaning}
								</td>
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
		<ChapterSection
			num={6}
			title='The Client Side: Browser WebSocket API'
		>
			<p>
				The browser ships a small, built-in WebSocket object. Learn its
				four events, two send paths, and one state field and you know
				the whole client API.
			</p>

			<h3>Creating a connection</h3>
			<pre>
				<code>{`const socket = new WebSocket("wss://example.com/chat", ["chat", "superchat"]);`}</code>
			</pre>

			<h3>The four events</h3>
			<pre>
				<code>{`socket.onopen = (event) => {\n  console.log("connected");\n  socket.send("hi");\n};\n\nsocket.onmessage = (event) => {\n  console.log("received:", event.data);\n};\n\nsocket.onerror = (event) => {\n  console.error("socket error");\n};\n\nsocket.onclose = (event) => {\n  console.log("closed", event.code, event.reason);\n};`}</code>
			</pre>

			<div className='glass rounded-xl p-4 my-4 border-l-2 border-yellow-500/50'>
				<p className='text-sm text-zinc-300'>
					<strong>onerror tells you almost nothing.</strong> For
					security reasons the browser does not expose why a socket
					failed. Put your real handling logic in onclose and read{' '}
					<code>event.code</code> there.
				</p>
			</div>

			<h3>readyState — know before you send</h3>
			<div className='not-prose glass rounded-xl overflow-hidden my-4'>
				<table>
					<thead>
						<tr>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Constant
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Value
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Meaning
							</th>
						</tr>
					</thead>
					<tbody>
						{[
							[
								'CONNECTING',
								'0',
								'Handshake in progress. send() will throw.',
							],
							['OPEN', '1', 'Ready. Safe to send.'],
							['CLOSING', '2', 'Closing handshake underway.'],
							['CLOSED', '3', 'Closed or failed to open.'],
						].map(([c, v, m]) => (
							<tr
								key={c}
								className='border-b border-white/2 last:border-0'
							>
								<td className='p-3 text-xs font-mono text-emerald-400'>
									{c}
								</td>
								<td className='p-3 text-xs text-zinc-400'>
									{v}
								</td>
								<td className='p-3 text-xs text-zinc-500'>
									{m}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<h3>A reusable JSON message pattern</h3>
			<pre>
				<code>{`socket.onmessage = (event) => {\n  let msg;\n  try { msg = JSON.parse(event.data); }\n  catch { return console.warn("non-JSON frame ignored"); }\n\n  switch (msg.type) {\n    case "chat":     addChatLine(msg.user, msg.text); break;\n    case "presence": updateOnlineList(msg.users);     break;\n    case "error":    showError(msg.message);           break;\n    default: console.warn("unknown type", msg.type);\n  }\n};`}</code>
			</pre>

			<p>
				<code>socket.bufferedAmount</code> reports how many bytes you
				have queued but not yet sent. If it keeps climbing, you are
				producing faster than the link can drain — stop sending until it
				falls.
			</p>
		</ChapterSection>
	);
}

function Ch7() {
	return (
		<ChapterSection
			num={7}
			title='The Server Side: Building with Node and ws'
		>
			<p>
				On the server you almost never hand-roll frames. The{' '}
				<code>ws</code> library is the de-facto standard — small, fast,
				and close to the metal.
			</p>

			<h3>A minimal echo server</h3>
			<pre>
				<code>{`const { WebSocketServer } = require("ws");\nconst wss = new WebSocketServer({ port: 8080 });\n\nwss.on("connection", (socket, req) => {\n  socket.on("message", (data, isBinary) => {\n    socket.send(data, { binary: isBinary }); // echo\n  });\n  socket.send("welcome!");\n});`}</code>
			</pre>

			<h3>Broadcasting to everyone</h3>
			<pre>
				<code>{`wss.on("connection", (socket) => {\n  socket.on("message", (data, isBinary) => {\n    for (const client of wss.clients) {\n      if (client !== socket && client.readyState === WebSocket.OPEN) {\n        client.send(data, { binary: isBinary });\n      }\n    }\n  });\n});`}</code>
			</pre>

			<h3>Attaching to an existing HTTP/Express server</h3>
			<pre>
				<code>{`const http = require("http");\nconst express = require("express");\nconst { WebSocketServer } = require("ws");\n\nconst app = express();\nconst server = http.createServer(app);\nconst wss = new WebSocketServer({ noServer: true });\n\nserver.on("upgrade", (req, socket, head) => {\n  if (!isAllowed(req)) {\n    socket.write("HTTP/1.1 401 Unauthorized\\r\\n\\r\\n");\n    socket.destroy();\n    return;\n  }\n  wss.handleUpgrade(req, socket, head, (ws) => {\n    wss.emit("connection", ws, req);\n  });\n});\n\nserver.listen(3000);`}</code>
			</pre>

			<h3>Per-connection state & rooms</h3>
			<pre>
				<code>{`const rooms = new Map(); // roomId -> Set<socket>\n\nfunction join(socket, roomId) {\n  if (!rooms.has(roomId)) rooms.set(roomId, new Set());\n  rooms.get(roomId).add(socket);\n  socket.roomId = roomId;\n}\n\nfunction broadcast(roomId, payload) {\n  const set = rooms.get(roomId);\n  if (!set) return;\n  const data = JSON.stringify(payload);\n  for (const s of set) {\n    if (s.readyState === WebSocket.OPEN) s.send(data);\n  }\n}`}</code>
			</pre>

			<div className='glass rounded-xl p-4 my-4 border-l-2 border-yellow-500/50'>
				<p className='text-sm text-zinc-300'>
					<strong>
						In-memory rooms do not survive multiple servers.
					</strong>{' '}
					The map lives in one process. The moment you run two
					instances behind a load balancer, users on different servers
					can&apos;t reach each other. Solving that needs a shared
					pub/sub layer (Chapter 10).
				</p>
			</div>
		</ChapterSection>
	);
}

function Ch8() {
	return (
		<ChapterSection
			num={8}
			title='From Scratch: A Server With No WebSocket Library'
		>
			<p>
				To truly understand the protocol, here is a working server that
				uses only Node&apos;s raw TCP — no ws, no framework. You will
				never ship this, but reading it makes Chapters 4 and 5 concrete.
			</p>

			<h3>1. Complete the handshake by hand</h3>
			<pre>
				<code>{`const net = require("net");\nconst crypto = require("crypto");\nconst GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";\n\nconst server = net.createServer((socket) => {\n  socket.once("data", (buf) => {\n    const request = buf.toString();\n    const key = request.match(/Sec-WebSocket-Key: (.+)/i)[1].trim();\n    const accept = crypto.createHash("sha1")\n      .update(key + GUID).digest("base64");\n\n    socket.write(\n      "HTTP/1.1 101 Switching Protocols\\r\\n" +\n      "Upgrade: websocket\\r\\n" +\n      "Connection: Upgrade\\r\\n" +\n      "Sec-WebSocket-Accept: " + accept + "\\r\\n\\r\\n"\n    );\n    socket.on("data", (frame) => handleFrame(socket, frame));\n  });\n});\nserver.listen(8080);`}</code>
			</pre>

			<h3>2. Decode an incoming (masked) frame</h3>
			<pre>
				<code>{`function handleFrame(socket, buf) {\n  const opcode = buf[0] & 0x0f;\n  const masked = (buf[1] & 0x80) !== 0;\n  let len = buf[1] & 0x7f;\n  let offset = 2;\n\n  if (len === 126) { len = buf.readUInt16BE(2); offset = 4; }\n  else if (len === 127) { len = Number(buf.readBigUInt64BE(2)); offset = 10; }\n\n  let mask;\n  if (masked) { mask = buf.slice(offset, offset + 4); offset += 4; }\n  const payload = buf.slice(offset, offset + len);\n  if (masked) {\n    for (let i = 0; i < payload.length; i++) payload[i] ^= mask[i % 4];\n  }\n\n  if (opcode === 0x8) return socket.end(); // close\n  if (opcode === 0x1) { // text\n    const text = payload.toString("utf8");\n    sendText(socket, "echo: " + text);\n  }\n}`}</code>
			</pre>

			<h3>3. Encode an outgoing (unmasked) frame</h3>
			<pre>
				<code>{`function sendText(socket, str) {\n  const payload = Buffer.from(str, "utf8");\n  const len = payload.length;\n  let header;\n  if (len < 126) {\n    header = Buffer.from([0x81, len]); // 0x81 = FIN + text opcode\n  } else if (len < 65536) {\n    header = Buffer.alloc(4);\n    header[0] = 0x81; header[1] = 126;\n    header.writeUInt16BE(len, 2);\n  }\n  socket.write(Buffer.concat([header, payload]));\n}`}</code>
			</pre>

			<div className='glass rounded-xl p-4 my-4 border-l-2 border-red-500/50'>
				<p className='text-sm text-zinc-300'>
					<strong>Do not ship hand-rolled framing.</strong> This toy
					ignores fragmentation, continuation frames, control-frame
					rules, UTF-8 validation, max-size limits, and many
					security-relevant edge cases. Use a maintained library for
					anything real.
				</p>
			</div>
		</ChapterSection>
	);
}

function Ch9() {
	return (
		<ChapterSection
			num={9}
			title='Production Reliability: Reconnection & Heartbeats'
		>
			<p>
				A WebSocket will drop: phones change networks, laptops sleep,
				load balancers recycle. The connection breaking is normal — your
				job is to detect it fast and recover gracefully. This is the
				single biggest gap between a demo and a real app.
			</p>

			<h3>The two hard problems</h3>
			<ol>
				<li>
					<strong>Detecting a dead connection.</strong> A dropped TCP
					connection often does not fire onclose for a long time — the
					OS may take minutes to notice. You need active heartbeats.
				</li>
				<li>
					<strong>Reconnecting without a stampede.</strong> When a
					server restarts, thousands of clients reconnect at once.
					Naive instant retries can take the server back down
					(&quot;thundering herd&quot;).
				</li>
			</ol>

			<h3>Heartbeats (ping / pong)</h3>
			<pre>
				<code>{`function heartbeat() { this.isAlive = true; }\n\nwss.on("connection", (socket) => {\n  socket.isAlive = true;\n  socket.on("pong", heartbeat);\n});\n\nconst interval = setInterval(() => {\n  for (const socket of wss.clients) {\n    if (socket.isAlive === false) return socket.terminate();\n    socket.isAlive = false;\n    socket.ping();\n  }\n}, 30000);`}</code>
			</pre>

			<h3>Client reconnection with exponential backoff</h3>
			<pre>
				<code>{`function connect(url) {\n  let attempts = 0;\n  let socket;\n\n  const open = () => {\n    socket = new WebSocket(url);\n    socket.onopen = () => { attempts = 0; };\n    socket.onclose = (e) => {\n      if (e.code === 1000) return; // we closed on purpose\n      const base = Math.min(1000 * 2 ** attempts, 30000);\n      const jitter = Math.random() * base * 0.3;\n      attempts++;\n      setTimeout(open, base + jitter);\n    };\n  };\n  open();\n}`}</code>
			</pre>

			<div className='glass rounded-xl p-4 my-4 border-l-2 border-yellow-500/50'>
				<p className='text-sm text-zinc-300'>
					<strong>Always add jitter.</strong> Backoff without jitter
					still synchronizes clients: they all wait 1s, then all wait
					2s, hammering the server in waves. A small random offset
					spreads reconnections smoothly.
				</p>
			</div>

			<h3>Don&apos;t lose messages across a reconnect</h3>
			<ul>
				<li>
					<strong>Outbound queue:</strong> buffer messages produced
					while disconnected and flush them on reconnect.
				</li>
				<li>
					<strong>Resume tokens / cursors:</strong> the client
					remembers the last message id it saw; on reconnect it tells
					the server, which replays anything missed.
				</li>
			</ul>
		</ChapterSection>
	);
}

function Ch10() {
	return (
		<ChapterSection
			num={10}
			title='Scaling WebSockets Across Many Servers'
		>
			<p>
				One server can hold tens of thousands of connections, but
				eventually you need several. WebSockets are stateful and
				long-lived, which makes scaling them fundamentally different
				from stateless HTTP APIs.
			</p>

			<h3>Problem 1: load balancing long-lived connections</h3>
			<p>
				A WebSocket pins a client to one server for the
				connection&apos;s whole life. Your load balancer must support
				the HTTP upgrade and ideally sticky sessions.
			</p>
			<pre>
				<code>{`# NGINX: pass through the upgrade and keep the connection alive\nlocation /ws/ {\n  proxy_pass http://backend;\n  proxy_http_version 1.1;\n  proxy_set_header Upgrade $http_upgrade;\n  proxy_set_header Connection "upgrade";\n  proxy_read_timeout 3600s;\n}`}</code>
			</pre>

			<h3>
				Problem 2: clients on different servers can&apos;t see each
				other
			</h3>
			<p>
				The fix is a shared pub/sub backplane: every server publishes
				outgoing messages to a broker, and every server is subscribed.
			</p>
			<pre>
				<code>{`const { createClient } = require("redis");\nconst pub = createClient(); const sub = pub.duplicate();\nawait pub.connect(); await sub.connect();\n\nawait sub.subscribe("room:lobby", (raw) => {\n  const msg = JSON.parse(raw);\n  for (const s of localClientsInRoom("lobby")) {\n    if (s.readyState === WebSocket.OPEN) s.send(raw);\n  }\n});\n\nfunction onClientMessage(text) {\n  pub.publish("room:lobby", JSON.stringify({ text }));\n}`}</code>
			</pre>

			<h3>Problem 3: backpressure</h3>
			<p>
				If you push messages faster than a client can receive, data
				piles up in the server&apos;s send buffer. You must respect
				backpressure.
			</p>
			<pre>
				<code>{`function trySend(socket, data) {\n  const LIMIT = 1 << 20; // 1 MB\n  if (socket.bufferedAmount > LIMIT) return false;\n  socket.send(data);\n  return true;\n}`}</code>
			</pre>
			<p>
				For high-frequency feeds, a good strategy is{' '}
				<strong>conflation</strong>: keep only the latest value per key
				and send that, rather than queueing every intermediate update.
			</p>
		</ChapterSection>
	);
}

function Ch11() {
	return (
		<ChapterSection
			num={11}
			title='Security: Locking Down a WebSocket Server'
		>
			<p>
				WebSockets bypass some assumptions HTTP developers rely on. The
				same-origin policy and CORS do NOT protect WebSocket handshakes
				— so you must add protections explicitly.
			</p>

			<h3>1. Always use wss:// (TLS)</h3>
			<p>
				Encrypt everything in production. Beyond confidentiality, wss://
				avoids mixed-content blocking.
			</p>

			<h3>2. Validate the Origin header (CSWSH)</h3>
			<p>
				Cross-Site WebSocket Hijacking: because the browser sends
				cookies automatically and CORS does not apply, a malicious site
				can open a socket to your server as the logged-in user.
			</p>
			<pre>
				<code>{`const ALLOWED = new Set(["https://app.example.com"]);\n\nserver.on("upgrade", (req, socket, head) => {\n  if (!ALLOWED.has(req.headers.origin)) {\n    socket.write("HTTP/1.1 403 Forbidden\\r\\n\\r\\n");\n    return socket.destroy();\n  }\n});`}</code>
			</pre>

			<h3>3. Authenticate explicitly with a token</h3>
			<pre>
				<code>{`// Short-lived token in the URL\nconst socket = new WebSocket("wss://api.example.com/ws?token=" + jwt);\n\n// Server validates before accepting:\nserver.on("upgrade", (req, socket, head) => {\n  const url = new URL(req.url, "http://x");\n  const user = verifyJwt(url.searchParams.get("token"));\n  if (!user) { socket.write("HTTP/1.1 401\\r\\n\\r\\n"); return socket.destroy(); }\n  wss.handleUpgrade(req, socket, head, ws => wss.emit("connection", ws, req));\n});`}</code>
			</pre>

			<h3>4. Validate and limit everything from clients</h3>
			<ul>
				<li>
					Validate message shape/types (schema-validate JSON) before
					acting.
				</li>
				<li>
					Cap message size (<code>maxPayload</code> in ws) so one
					client can&apos;t OOM you.
				</li>
				<li>Rate-limit per connection — messages/sec and bytes/sec.</li>
				<li>Authorize every action, not just the connection.</li>
			</ul>

			<h3>Security checklist</h3>
			<div className='not-prose glass rounded-xl overflow-hidden my-4'>
				<table>
					<thead>
						<tr>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Control
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Why
							</th>
						</tr>
					</thead>
					<tbody>
						{[
							[
								'wss:// only',
								'Confidentiality, integrity, no mixed-content blocks',
							],
							[
								'Validate Origin',
								'Stops Cross-Site WebSocket Hijacking',
							],
							[
								'Explicit token auth',
								"Don't rely on ambient cookies",
							],
							[
								'Per-action authorization',
								'Connection ≠ permission for every operation',
							],
							[
								'maxPayload + rate limits',
								'Prevents memory/DoS abuse',
							],
							[
								'Schema-validate inbound JSON',
								'Prevents malformed-input bugs & injection',
							],
							[
								'Escape on output',
								'A relayed message is an XSS vector if rendered as HTML',
							],
						].map(([c, w]) => (
							<tr
								key={c}
								className='border-b border-white/2 last:border-0'
							>
								<td className='p-3 text-xs font-medium text-zinc-300'>
									{c}
								</td>
								<td className='p-3 text-xs text-zinc-500'>
									{w}
								</td>
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
		<ChapterSection
			num={12}
			title='Subprotocols, Extensions & Higher-Level Libraries'
		>
			<p>
				Raw WebSockets give you a message pipe and nothing more — no
				built-in concept of events, rooms, acknowledgements, or
				reconnection. Subprotocols and libraries layer those on top.
			</p>

			<h3>Subprotocols</h3>
			<p>
				A subprotocol is an agreed message format negotiated during the
				handshake via <code>Sec-WebSocket-Protocol</code>. It tells both
				sides how to interpret payloads.
			</p>
			<pre>
				<code>{`const socket = new WebSocket("wss://example.com", ["graphql-ws", "json.v1"]);\nsocket.onopen = () => console.log("server chose:", socket.protocol);`}</code>
			</pre>
			<p>
				Well-known subprotocols: STOMP, graphql-ws, MQTT over
				WebSockets, and WAMP.
			</p>

			<h3>Extensions</h3>
			<p>
				Extensions transform the frames themselves. The one you&apos;ll
				meet is <strong>permessage-deflate</strong>: per-message
				compression. It can dramatically shrink repetitive JSON, but
				costs CPU and memory per connection.
			</p>

			<h3>Higher-level libraries</h3>
			<div className='not-prose glass rounded-xl overflow-hidden my-4'>
				<table>
					<thead>
						<tr>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Library
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								What it adds
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Trade-off
							</th>
						</tr>
					</thead>
					<tbody>
						{[
							[
								'ws (Node)',
								'Fast, spec-compliant raw WS',
								'You build rooms, reconnect, auth yourself',
							],
							[
								'Socket.IO',
								'Auto-reconnect, rooms, ack callbacks',
								'Its own wire protocol — both sides must use it',
							],
							[
								'SockJS',
								'WS with fallback to long-polling',
								'Older; less needed now',
							],
							[
								'graphql-ws',
								'GraphQL subscriptions over WS',
								'Tied to a GraphQL stack',
							],
							[
								'Managed (Ably, Pusher)',
								'Hosted fan-out, presence, history',
								'Cost & vendor dependency',
							],
						].map(([lib, adds, tradeoff]) => (
							<tr
								key={lib}
								className='border-b border-white/2 last:border-0'
							>
								<td className='p-3 text-xs font-medium text-zinc-300'>
									{lib}
								</td>
								<td className='p-3 text-xs text-zinc-500'>
									{adds}
								</td>
								<td className='p-3 text-xs text-zinc-500'>
									{tradeoff}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<h3>Where WebSockets sit among the alternatives</h3>
			<div className='not-prose glass rounded-xl overflow-hidden my-4'>
				<table>
					<thead>
						<tr>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Need
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Best fit
							</th>
						</tr>
					</thead>
					<tbody>
						{[
							['Server→client stream only', 'Server-Sent Events'],
							['Two-way, low-latency, ordered', 'WebSockets'],
							[
								'Peer-to-peer, lowest latency, loss-tolerant',
								'WebRTC',
							],
							['Simple, occasional updates', 'HTTP long-polling'],
						].map(([need, fit]) => (
							<tr
								key={need}
								className='border-b border-white/2 last:border-0'
							>
								<td className='p-3 text-xs text-zinc-300'>
									{need}
								</td>
								<td className='p-3 text-xs font-medium text-emerald-400'>
									{fit}
								</td>
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
		<ChapterSection
			num={13}
			title='Debugging, Inspecting & Testing'
		>
			<p>
				WebSocket traffic is invisible to the usual &quot;reload and
				read the response&quot; workflow. These tools let you see and
				test the frames directly.
			</p>

			<h3>Browser DevTools</h3>
			<p>
				Open DevTools → Network tab → filter by WS. Click the connection
				to see a Messages sub-tab listing every frame sent (green) and
				received (white) with direction, timestamp, and payload.
			</p>

			<h3>Command-line testing</h3>
			<pre>
				<code>{`# websocat — like curl for WebSockets\nwebsocat wss://echo.websocket.org\n\n# wscat (npm install -g wscat)\nwscat -c wss://echo.websocket.org\n> hello\n< hello`}</code>
			</pre>

			<h3>A scriptable test client (Node)</h3>
			<pre>
				<code>{`const WebSocket = require("ws");\nconst ws = new WebSocket("wss://example.com/ws?token=test");\n\nws.on("open", () => ws.send(JSON.stringify({ type: "join", room: "lobby" })));\nws.on("message", (d) => console.log("RECV", d.toString()));\nws.on("close", (c, r) => console.log("CLOSE", c, r.toString()));`}</code>
			</pre>

			<h3>Automated tests</h3>
			<pre>
				<code>{`test("client receives welcome and can join a room", async () => {\n  const ws = new WebSocket(TEST_URL);\n  const messages = [];\n  ws.on("message", (d) => messages.push(JSON.parse(d)));\n  await once(ws, "open");\n  ws.send(JSON.stringify({ type: "join", room: "lobby" }));\n  await delay(100);\n  expect(messages.some(m => m.type === "joined")).toBe(true);\n  ws.close();\n});`}</code>
			</pre>

			<div className='glass rounded-xl p-4 my-4 border-l-2 border-yellow-500/50'>
				<p className='text-sm text-zinc-300'>
					<strong>Reproduce flaky network conditions.</strong> Most
					production WebSocket bugs are about disconnection, not the
					happy path. Test by: killing the server mid-session,
					throttling the network in DevTools, and sleeping a laptop.
					If you only test the happy path, you have tested almost
					nothing.
				</p>
			</div>
		</ChapterSection>
	);
}

function Ch14() {
	return (
		<ChapterSection
			num={14}
			title='Common Pitfalls & How to Avoid Them'
		>
			<p>A field guide to the mistakes nearly everyone makes once.</p>

			<div className='not-prose glass rounded-xl overflow-hidden my-4'>
				<table>
					<thead>
						<tr>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Pitfall
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Symptom
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Fix
							</th>
						</tr>
					</thead>
					<tbody>
						{[
							[
								'Sending before OPEN',
								'InvalidStateError thrown',
								'Check readyState or send only inside onopen',
							],
							[
								'No reconnection logic',
								'App silently stops updating',
								'Reconnect on unexpected close with backoff + jitter',
							],
							[
								'No heartbeats',
								'Dead connections linger; proxies kill sockets',
								'Server-driven ping/pong; keep interval under proxy timeout',
							],
							[
								'Proxy idle timeout',
								'Connections die at exactly 30/60s',
								'Raise proxy_read_timeout; heartbeat faster',
							],
							[
								'In-memory rooms with >1 server',
								'Messages reach some users, not others',
								'Add a Redis/NATS pub/sub backplane',
							],
							[
								'No Origin check',
								'CSWSH — other sites connect as your users',
								'Validate Origin + explicit token auth',
							],
							[
								'Ignoring backpressure',
								'Server memory climbs, then OOM',
								'Watch bufferedAmount; drop/conflate for slow clients',
							],
							[
								'No max message size',
								'One client OOMs the server',
								'Set maxPayload',
							],
							[
								'Rendering relayed text as HTML',
								'Stored XSS via chat messages',
								'Escape on output; validate on input',
							],
							[
								'ws:// on an https:// page',
								'Browser blocks mixed content',
								'Use wss:// everywhere',
							],
						].map(([pitfall, symptom, fix]) => (
							<tr
								key={pitfall}
								className='border-b border-white/2 last:border-0'
							>
								<td className='p-3 text-xs font-medium text-red-400'>
									{pitfall}
								</td>
								<td className='p-3 text-xs text-zinc-500'>
									{symptom}
								</td>
								<td className='p-3 text-xs text-emerald-400/80'>
									{fix}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className='glass rounded-xl p-4 my-4 border-l-2 border-emerald-500/50'>
				<p className='text-sm text-zinc-300'>
					<strong>The 80/20 of getting it right:</strong> If you do
					only four things: (1) wss:// everywhere, (2) reconnect with
					backoff + jitter, (3) server-driven heartbeats, and (4)
					validate Origin + auth token — you have handled the
					overwhelming majority of real-world WebSocket problems.
				</p>
			</div>
		</ChapterSection>
	);
}

function Ch15() {
	return (
		<ChapterSection
			num={15}
			title='Quick Reference & A Learning Path'
		>
			<h3>Client API cheat sheet</h3>
			<pre>
				<code>{`const ws = new WebSocket("wss://host/path", ["subprotocol"]);\n\nws.onopen    = (e) => {};      // connected — safe to send\nws.onmessage = (e) => e.data;  // string | Blob | ArrayBuffer\nws.onclose   = (e) => e.code;  // 1000 normal, 1001 going away, 1006 abnormal\nws.onerror   = (e) => {};      // sparse; real logic goes in onclose\n\nws.send("text" | arrayBuffer | blob);\nws.binaryType = "arraybuffer"; // default "blob"\nws.bufferedAmount;             // bytes queued, not yet sent\nws.readyState;                 // 0 CONNECTING 1 OPEN 2 CLOSING 3 CLOSED\nws.protocol;                   // negotiated subprotocol\nws.close(1000, "reason");`}</code>
			</pre>

			<h3>Server (ws) cheat sheet</h3>
			<pre>
				<code>{`const { WebSocketServer } = require("ws");\nconst wss = new WebSocketServer({ noServer: true, maxPayload: 262144 });\n\nwss.on("connection", (socket, req) => {\n  socket.on("message", (data, isBinary) => { /* handle */ });\n  socket.on("pong", () => socket.isAlive = true);\n  socket.on("close", (code, reason) => { /* cleanup */ });\n  socket.send(data, { binary: false });\n});\n\nfor (const c of wss.clients) { /* broadcast */ }\nsocket.ping(); socket.terminate(); // heartbeat / hard close`}</code>
			</pre>

			<h3>The numbers worth memorizing</h3>
			<div className='not-prose glass rounded-xl overflow-hidden my-4'>
				<table>
					<thead>
						<tr>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Thing
							</th>
							<th className='text-left p-3 text-[11px] text-zinc-500 font-medium border-b border-white/4 bg-white/2'>
								Value
							</th>
						</tr>
					</thead>
					<tbody>
						{[
							[
								'Handshake success status',
								'101 Switching Protocols',
							],
							['Protocol version', '13 (RFC 6455)'],
							[
								'Magic GUID',
								'258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
							],
							['Min frame header', '2 bytes'],
							[
								'Text / binary / close / ping / pong opcodes',
								'0x1 / 0x2 / 0x8 / 0x9 / 0xA',
							],
							[
								'Normal / going-away / abnormal close',
								'1000 / 1001 / 1006',
							],
							['Default ports', 'ws 80, wss 443'],
						].map(([thing, value]) => (
							<tr
								key={thing}
								className='border-b border-white/2 last:border-0'
							>
								<td className='p-3 text-xs text-zinc-300'>
									{thing}
								</td>
								<td className='p-3 text-xs font-mono text-violet-400'>
									{value}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<h3>A hands-on learning path</h3>
			<ol>
				<li>
					<strong>Echo client</strong> in the browser against a public
					echo server. Watch the frames in DevTools.
				</li>
				<li>
					<strong>Echo server</strong> with ws on your machine;
					connect your client to it.
				</li>
				<li>
					<strong>Multi-user chat</strong> — broadcast to all clients,
					then add rooms.
				</li>
				<li>
					<strong>From-scratch handshake + frame decode</strong> to
					demystify the wire. Throw it away after.
				</li>
				<li>
					<strong>Add reliability</strong> — heartbeats + reconnect
					with backoff/jitter; kill the server and watch it recover.
				</li>
				<li>
					<strong>Add auth + Origin checks</strong>; try to connect
					from a different origin and confirm rejection.
				</li>
				<li>
					<strong>Scale to two instances</strong> behind NGINX with a
					Redis backplane; confirm cross-server messaging.
				</li>
				<li>
					<strong>Stress & break it</strong> — throttle the network,
					sleep the laptop, flood messages; observe backpressure.
				</li>
			</ol>

			<div className='glass rounded-xl p-4 my-4 border-l-2 border-emerald-500/50'>
				<p className='text-sm text-zinc-300'>
					<strong>Finish by building one real thing.</strong> Pick a
					project you&apos;d actually use — a live cursor on a shared
					page, a presence indicator, a tiny multiplayer game — and
					ship it end to end. The production concerns in Chapters 9–11
					only truly land once a real user&apos;s flaky phone
					connection has broken your assumptions a few times.
				</p>
			</div>
		</ChapterSection>
	);
}
