import Link from 'next/link';
import { useState } from 'react';
import { Logo } from '../Logo';
import { ArchitectureTab, DataFlowTab, OverviewTab } from './tabs';
import { GuideTab } from './guideTab';

import { motion, AnimatePresence } from 'framer-motion';
import { IoMdHome } from 'react-icons/io';
import { PiTreeStructureFill } from 'react-icons/pi';
import { PiBookOpenFill } from 'react-icons/pi';
import { TiFlowMerge } from 'react-icons/ti';
import { FaGithub } from 'react-icons/fa';

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
				<div className='px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-2'>
					<Link
						href='/'
						className='flex items-center gap-3 group'
					>
						<Logo size={36} />
						<span className='hidden min-[480px]:inline text-[15px] font-extrabold tracking-tight text-gradient'>
							CryptoPulse
						</span>
						<span className='text-[9px] font-bold uppercase tracking-[0.12em] text-violet-400/80 bg-violet-500/10 border border-violet-500/20 px-1.5 py-0.5 rounded-md'>
							Docs
						</span>
					</Link>
					<Link
						href='/'
						className='text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1.5 shrink-0'
					>
						<span>←</span> Back<span className='hidden sm:inline'>to Dashboard</span>
					</Link>
				</div>
			</header>

			<div className='relative z-10 flex flex-col lg:flex-row px-4 sm:px-6'>
				{/* Sidebar */}
				<aside className='hidden lg:flex flex-col w-56 shrink-0 sticky top-16 h-[calc(100vh-4rem)] py-4 px-3 border-r border-white/4 overflow-y-auto'>
					<nav className='space-y-1.5 flex-1'>
						{TABS.map((tab, i) => {
							const icons: Record<Tab, React.ReactNode> = {
								Overview: <IoMdHome className='h-4 w-4' />,
								Architecture: (
									<PiTreeStructureFill className='w-4 h-4' />
								),
								'Data Flow': (
									<TiFlowMerge className='w-4 h-4' />
								),
								'WebSocket Guide': (
									<PiBookOpenFill className='w-4 h-4' />
								),
							};
							const isActive = activeTab === tab;
							return (
								<motion.button
									key={tab}
									initial={{ opacity: 0, x: -12 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.03, duration: 0.3, ease: 'easeOut' }}
									onClick={() => setActiveTab(tab)}
									className={`relative w-full flex items-center gap-2.5 px-3 py-2 border cursor-pointer rounded-lg text-[13px] font-medium transition-colors duration-200 text-left ${
										isActive
											? 'text-zinc-100 border-emerald-400/6'
											: 'text-zinc-500 hover:text-zinc-300 border-transparent hover:bg-white/3'
									}`}
								>
									<AnimatePresence>
										{isActive && (
											<motion.span
												layoutId='sidebar-active-bg'
												className='absolute inset-0 rounded-lg bg-white/8 shadow-sm border border-emerald-400/6'
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												transition={{ type: 'spring', stiffness: 350, damping: 30 }}
											/>
										)}
									</AnimatePresence>
									<motion.span
										className='relative z-10'
										animate={{ color: isActive ? '#34d399' : '#52525b' }}
										transition={{ duration: 0.2 }}
									>
										{icons[tab]}
									</motion.span>
									<span className='relative z-10'>{tab}</span>
								</motion.button>
							);
						})}
					</nav>

					{/* Bottom section */}
					<div className='mt-auto pt-4 border-t border-white/4 space-y-2'>
						<Link
							href='https://github.com/shubhu2002'
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-zinc-500 hover:text-zinc-300 hover:bg-white/3 transition-all'
						>
							<FaGithub className='w-4 h-4' />
							GitHub
						</Link>
						<div className='px-3 text-[11px] text-zinc-700'>
							Created by{' '}
							<span className='text-zinc-500'>
								Shubhanshu Saxena
							</span>
						</div>
					</div>
				</aside>

				{/* Mobile tab bar */}
				<div className='flex items-center gap-1 mt-4 p-1 rounded-xl bg-white/2 border border-white/4 w-full overflow-x-auto lg:hidden'>
					{TABS.map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
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
				<main className='docs-prose flex-1 min-w-0 px-0 sm:px-5 py-4 max-w-5xl'>
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
