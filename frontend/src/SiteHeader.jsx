import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { checkHealth } from './api';

const navLinkClass = ({ isActive }) => (
    `text-xs sm:text-sm font-medium transition-all px-2.5 sm:px-4 py-2 rounded-xl ${
        isActive
            ? 'text-emerald-700 bg-emerald-50'
            : 'text-slate-500 hover:text-emerald-700 hover:bg-emerald-50'
    }`
);

const SiteHeader = ({ showNewAnalysis = false }) => {
    const [backendOnline, setBackendOnline] = useState(null);

    useEffect(() => {
        const poll = () => checkHealth().then(setBackendOnline);
        poll();
        const interval = setInterval(poll, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-50 px-3 sm:px-6 py-3">
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 bg-white/75 backdrop-blur-xl border border-white/80 rounded-2xl px-3 sm:px-6 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
                <NavLink to="/" aria-label="EasyAI home" className="flex items-center gap-3 group shrink-0">
                    <div className="size-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:scale-105">
                        <span className="material-symbols-outlined text-[20px]">eco</span>
                    </div>
                    <div className="hidden sm:flex flex-col">
                        <span className="text-slate-900 text-base font-bold tracking-tight leading-none">EasyAI</span>
                        <span className="text-[10px] text-emerald-600 font-medium tracking-wider uppercase">Prompt Analyzer</span>
                    </div>
                </NavLink>

                <nav aria-label="Primary navigation" className="flex items-center gap-0.5 sm:gap-1">
                    <NavLink className={navLinkClass} to="/metrics">Metrics</NavLink>
                    <NavLink className={navLinkClass} to="/about">About</NavLink>
                    <div className="hidden md:block w-px h-5 bg-slate-200 mx-2" />
                    <div className={`hidden md:flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border ${backendOnline === null ? 'text-slate-400 bg-slate-50 border-slate-200' : backendOnline ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-red-500 bg-red-50 border-red-100'}`}>
                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${backendOnline === null ? 'bg-slate-400 animate-pulse' : backendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                        {backendOnline === null ? 'Checking...' : backendOnline ? 'Online' : 'Offline'}
                    </div>
                    {showNewAnalysis && (
                        <NavLink
                            to="/"
                            className="ml-1 sm:ml-2 flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 sm:px-4 py-2 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <span className="material-symbols-outlined text-[18px]">add_circle</span>
                            <span className="hidden lg:inline">New Analysis</span>
                        </NavLink>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default SiteHeader;
