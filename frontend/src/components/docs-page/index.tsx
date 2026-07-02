import Link from 'next/link';
import { useState } from 'react';
import { Logo } from '../Logo';
import { ArchitectureTab, DataFlowTab, OverviewTab } from './tabs';
import { GuideTab } from './guideTab';

const TABS = [
	'Overview',
	'Architecture',
	'Data Flow',
	'WebSocket Guide',
] as const;
type Tab = (typeof TABS)[number];

const Documentation = () => {
	const [activeTab, setActiveTab] = useState<Tab>('Overview');
	return (
		<div className='min-h-screen mesh-gradient noise-bg'>
			<header className='sticky top-0 z-50 border-b border-white/4 bg-[#050507]/70 backdrop-blur-2xl'>
				<div className='px-10 h-16 flex items-center justify-between'>
					<Link
						href='/'
						className='flex items-center gap-3 group'
					>
						<Logo size={36} />
						<span className='text-[15px] font-extrabold tracking-tight text-gradient'>
							CryptoPulse
						</span>
						<span className='text-[9px] font-bold uppercase tracking-[0.12em] text-violet-400/80 bg-violet-500/10 border border-violet-500/20 px-1.5 py-0.5 rounded-md'>
							Docs
						</span>
					</Link>
					<Link
						href='/'
						className='text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1.5'
					>
						<span>←</span> Back to Dashboard
					</Link>
				</div>
			</header>

			<div className='relative z-10 flex px-6 mt-2'>
				{/* Sidebar */}
				<aside className='hidden lg:flex flex-col w-48 shrink-0 sticky top-12 h-[calc(100vh-3rem)] py-4 px-3 border-r border-white/4 overflow-y-auto'>
					<nav className='space-y-1 flex-1'>
						{TABS.map((tab) => {
							const icons: Record<Tab, React.ReactNode> = {
								Overview: (
									<svg
										className='h-4 w-4'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
									</svg>
								),
								Architecture: (
									<svg
										className='h-4 w-4'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fillRule='evenodd'
											d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
											clipRule='evenodd'
										/>
									</svg>
								),
								'Data Flow': (
									<svg
										className='h-4 w-4'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fillRule='evenodd'
											d='M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z'
											clipRule='evenodd'
										/>
									</svg>
								),
								'WebSocket Guide': (
									<svg
										className='h-4 w-4'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path d='M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z' />
									</svg>
								),
							};
							return (
								<button
									key={tab}
									onClick={() => setActiveTab(tab)}
									className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all text-left ${
										activeTab === tab ?
											'bg-white/8 text-zinc-100 shadow-sm border border-white/6'
										:	'text-zinc-500 hover:text-zinc-300 hover:bg-white/3'
									}`}
								>
									<span
										className={
											activeTab === tab ?
												'text-emerald-400'
											:	'text-zinc-600'
										}
									>
										{icons[tab]}
									</span>
									{tab}
								</button>
							);
						})}
					</nav>

					{/* Bottom section */}
					<div className='mt-auto pt-6 border-t border-white/4 space-y-3'>
						<a
							href='https://github.com/example-user/cryptopulse'
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-zinc-500 hover:text-zinc-300 hover:bg-white/3 transition-all'
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
						<div className='px-3 text-[11px] text-zinc-700'>
							Created by{' '}
							<span className='text-zinc-500'>
								Shubhanshu Saxena
							</span>
						</div>
					</div>
				</aside>

				{/* Mobile tab bar */}
				<div className='flex items-center gap-1 mb-6 p-1 rounded-xl bg-white/2 border border-white/4 w-fit lg:hidden'>
					{TABS.map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
								activeTab === tab ?
									'bg-white/8 text-zinc-100 shadow-sm'
								:	'text-zinc-500 hover:text-zinc-300 hover:bg-white/3'
							}`}
						>
							{tab}
						</button>
					))}
				</div>

				{/* Main content */}
				<main className='docs-prose flex-1 min-w-0 px-5 py-4 max-w-5xl'>
					{activeTab === 'Overview' && <OverviewTab />}
					{activeTab === 'Architecture' && <ArchitectureTab />}
					{activeTab === 'Data Flow' && <DataFlowTab />}
					{activeTab === 'WebSocket Guide' && <GuideTab />}
				</main>
			</div>
		</div>
	);
};

export default Documentation;
