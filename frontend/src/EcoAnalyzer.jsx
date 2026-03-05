import React from 'react';

export const EcoAnalyzer = () => {
    return (
        <div className="bg-white min-h-screen flex flex-col font-display selection:bg-emerald-500/30 selection:text-emerald-900 overflow-hidden text-slate-900">
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap" rel="stylesheet" />

            <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-5 bg-emerald-900 shadow-lg shadow-emerald-900/20">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="size-8 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-300 group-hover:bg-emerald-400 group-hover:text-emerald-950 transition-colors duration-300">
                        <span className="material-symbols-outlined text-[20px]">eco</span>
                    </div>
                    <h2 className="text-white text-lg font-bold tracking-tight">Easy-AI</h2>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <a className="text-emerald-200 hover:text-white text-sm font-medium transition-colors" href="#metrics">Metrics</a>
                </nav>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6 pt-24 pb-20 relative z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

                <div className="w-full max-w-2xl flex flex-col gap-8 animate-fade-in">
                    <div className="text-center space-y-2 mb-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-950 via-emerald-800 to-emerald-600 pb-2">
                            How Much Does Your Prompt Cost?
                        </h1>
                        <p className="text-slate-500 text-lg font-light">
                            Paste anything to analyze environmental impact.
                        </p>
                    </div>

                    {/* Input Container (Tu diseño verde oscuro que resalta hermoso sobre el blanco) */}
                    <div className="relative group w-full">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/40 via-green-400/30 to-emerald-500/40 rounded-xl opacity-20 group-hover:opacity-50 transition duration-500 blur-sm"></div>
                        <div className="relative flex items-center bg-emerald-900 rounded-xl border border-emerald-700 shadow-2xl shadow-emerald-900/30 glow-focus transition-all duration-300">
                            <div className="pl-5 text-emerald-400">
                                <span className="material-symbols-outlined text-[24px]">search</span>
                            </div>
                            <input
                                autoFocus
                                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-emerald-200/60 py-6 px-4 text-xl font-light tracking-wide outline-none"
                                placeholder="Paste your prompt..."
                                type="text"
                            />
                            <div className="pr-3 flex items-center gap-2">
                                <div className="h-6 w-px bg-emerald-700 mx-1"></div>
                                <button className="flex items-center justify-center size-10 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all duration-200 shadow-lg shadow-emerald-500/30">
                                    <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer - Verde oscuro sólido */}
            <footer className="fixed bottom-0 left-0 w-full px-8 py-4 bg-emerald-900 flex justify-between items-center text-emerald-100 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="text-xs font-mono opacity-80">
                    <div>V 0.0.1 - ONLINE</div>
                </div>
                <div className="flex items-center gap-6 text-xs font-medium">
                    <a className="hover:text-white transition-colors" href="#privacy">Privacy</a>
                    <a className="hover:text-white transition-colors" href="#terms">Terms</a>
                </div>
            </footer>
        </div>
    );
};

export default EcoAnalyzer;