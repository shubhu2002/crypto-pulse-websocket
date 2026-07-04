'use client';

import type { ConnectionStatus } from '@/hooks/useWebSocket';

const config: Record<
	ConnectionStatus,
	{ label: string; dot: string; bg: string }
> = {
	connecting: {
		label: 'Connecting…',
		dot: 'bg-yellow-400 animate-pulse',
		bg: 'bg-yellow-500/10 text-yellow-400',
	},
	connected: {
		label: 'Connected',
		dot: 'bg-emerald-400 animate-pulse',
		bg: 'bg-emerald-500/10 text-emerald-400',
	},
	disconnected: {
		label: 'Disconnected',
		dot: 'bg-red-400',
		bg: 'bg-red-500/10 text-red-400',
	},
};

export function StatusBadge({ status }: { status: ConnectionStatus }) {
	const c = config[status];
	return (
		<span
			className={`inline-flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 text-xs font-medium ${c.bg}`}
		>
			<span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
			<span className='hidden sm:inline'>{c.label}</span>
		</span>
	);
}
