import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchAllData, checkHealth } from './api';

const EcoAnalyzer = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [backendOnline, setBackendOnline] = useState(null);

    useEffect(() => {
        const poll = () => checkHealth().then(setBackendOnline);
        poll();
        const interval = setInterval(poll, 15000);
        return () => clearInterval(interval);
    }, []);

    const handleSearch = async () => {
        if (!query.trim() || isLoading) return;
        setIsLoading(true);
        setError(null);
        try {
            const { scoreData, analysisData } = await fetchAllData(query);
            navigate('/results', {
                state: { userQuery: query, scoreData, analysisData },
            });
        } catch (err) {
            console.error("API Error:", err);
            setError("Could not connect to the analysis server. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const examples = [
        "Summarize this article in 3 bullet points",
        "Write a Python function for sorting",
        "Translate this paragraph to Spanish",
    ];

    return (
        <div className="min-h-screen flex flex-col font-display relative overflow-hidden bg-[#f8faf9]">

            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
                <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-emerald-400/8 rounded-full blur-[150px] animate-float" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-500/6 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }} />
                <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-teal-400/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '5s' }} />
            </div>

            <header className="fixed top-0 left-0 w-full z-50 px-6 py-3">
                <div className="max-w-5xl mx-auto flex items-center justify-between bg-white/70 backdrop-blur-xl border border-white/80 rounded-2xl px-6 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
                        <div className="size-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:scale-105">
                            <span className="material-symbols-outlined text-[20px]">eco</span>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-slate-900 text-base font-bold tracking-tight leading-none">EcoAI</h2>
                            <span className="text-[10px] text-emerald-600 font-medium tracking-wider uppercase">Prompt Analyzer</span>
                        </div>
                    </div>
                    <nav className="hidden md:flex items-center gap-1">
                        <a className="text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 text-sm font-medium transition-all px-4 py-2 rounded-xl" href="#metrics">Metrics</a>
                        <a className="text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 text-sm font-medium transition-all px-4 py-2 rounded-xl" href="#about">About</a>
                        <div className="w-px h-5 bg-slate-200 mx-2"></div>
                        <div className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border ${backendOnline === null ? 'text-slate-400 bg-slate-50 border-slate-200' : backendOnline ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-red-500 bg-red-50 border-red-100'}`}>
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${backendOnline === null ? 'bg-slate-400 animate-pulse' : backendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                            {backendOnline === null ? 'Checking...' : backendOnline ? 'Online' : 'Offline'}
                        </div>
                    </nav>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-6 pt-28 pb-16 relative z-10">
                <div className="w-full flex flex-col gap-10 animate-fade-in">

                    <div className="text-center space-y-5">
                        <div className="inline-flex items-center gap-2 bg-white border border-emerald-100 rounded-full px-4 py-2 shadow-sm mb-2">
                            <div className="size-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-[12px]">bolt</span>
                            </div>
                            <span className="text-xs font-semibold text-emerald-700 tracking-wide">AI Environmental Impact</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
                            <span className="text-slate-900">Understand the </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 animate-gradient">true cost</span>
                            <br />
                            <span className="text-slate-900">of your prompts</span>
                        </h1>

                        <p className="text-slate-500 text-lg font-normal max-w-lg mx-auto leading-relaxed">
                            Analyze water usage, energy consumption, and carbon footprint of every AI interaction you make.
                        </p>
                    </div>

                    <div className="relative group w-full animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                        <div className={`absolute -inset-2 bg-gradient-to-r from-emerald-500/30 via-green-400/20 to-teal-500/30 rounded-3xl blur-xl transition-all duration-700 ${isFocused ? 'opacity-70 scale-[1.01]' : 'opacity-0 group-hover:opacity-40'}`} />

                        <div className={`relative bg-[#0c1a14] rounded-2xl border-2 transition-all duration-400 overflow-hidden ${isFocused ? 'border-emerald-500/60 glow-emerald-strong' : 'border-emerald-900/40 glow-emerald group-hover:border-emerald-800/60'}`}>
                            <div className="flex items-center justify-between px-5 py-3 bg-[#091210] border-b border-emerald-900/50">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-inner" />
                                        <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-inner" />
                                        <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-inner" />
                                    </div>
                                    <span className="text-emerald-600/50 text-xs font-mono">ecoai — prompt-analyzer</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`inline-block w-1.5 h-1.5 rounded-full transition-colors ${isFocused ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-800'}`} />
                                    <span className="text-emerald-700/50 text-[10px] font-mono">{isFocused ? 'active' : 'ready'}</span>
                                </div>
                            </div>

                            <div className="px-5 py-5">
                                <div className="flex items-start gap-3">
                                    <div className="flex items-center gap-2 shrink-0 pt-[5px]">
                                        <span className="text-emerald-500 text-sm font-mono font-bold">❯</span>
                                    </div>
                                    <textarea
                                        autoFocus
                                        rows={1}
                                        className="w-full bg-transparent text-emerald-100 placeholder-emerald-800/60 text-[15px] font-mono outline-none caret-emerald-400 resize-none overflow-y-auto leading-6"
                                        style={{ maxHeight: '7.5rem' }}
                                        placeholder="Type or paste your AI prompt here..."
                                        value={query}
                                        onChange={(e) => {
                                            setQuery(e.target.value);
                                            e.target.style.height = 'auto';
                                            const maxH = 5 * 24;
                                            e.target.style.height = Math.min(e.target.scrollHeight, maxH) + 'px';
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSearch();
                                            }
                                        }}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-emerald-900/40">
                                    <div className="flex items-center gap-3">
                                        <kbd className="text-[10px] text-emerald-700/50 font-mono bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/30">⇧ Enter</kbd>
                                        <span className="text-[10px] text-emerald-800/40 font-mono">new line</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs font-mono tabular-nums transition-colors duration-300 ${query.length > 0 ? 'text-emerald-400' : 'text-emerald-900'}`}>
                                            {query.length} chars
                                        </span>
                                        <button
                                            onClick={handleSearch}
                                            disabled={!query.trim() || isLoading}
                                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${query.trim() && !isLoading
                                                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/35 hover:scale-[1.03] active:scale-[0.97] cursor-pointer'
                                                : 'bg-emerald-900/30 text-emerald-800 cursor-not-allowed'
                                                }`}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                                                    Analyzing...
                                                </>
                                            ) : (
                                                <>
                                                    Analyze
                                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4 animate-slide-down shadow-sm">
                            <span className="material-symbols-outlined text-red-500 text-[20px]">error</span>
                            <span className="font-medium">{error}</span>
                        </div>
                    )}

                    {isLoading && (
                        <div className="flex items-center justify-center gap-3 py-2 animate-fade-in">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 dot-pulse-1" />
                                <div className="w-2 h-2 rounded-full bg-emerald-500 dot-pulse-2" />
                                <div className="w-2 h-2 rounded-full bg-emerald-500 dot-pulse-3" />
                            </div>
                            <span className="text-sm font-medium text-emerald-700">Analyzing environmental impact...</span>
                        </div>
                    )}

                    <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <span className="text-xs text-slate-400 font-medium mr-1">Quick start:</span>
                        {examples.map((example, i) => (
                            <button
                                key={i}
                                onClick={() => setQuery(example)}
                                disabled={isLoading}
                                className="text-xs px-4 py-2 rounded-full bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200 cursor-pointer hover:scale-[1.03] active:scale-[0.97] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                {example}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-8 animate-fade-in" style={{ animationDelay: '0.45s' }}>
                        {[
                            { icon: "water_drop", label: "Water Usage", color: "text-blue-500" },
                            { icon: "bolt", label: "Energy Cost", color: "text-amber-500" },
                            { icon: "eco", label: "Carbon Impact", color: "text-emerald-500" },
                            { icon: "token", label: "Token Count", color: "text-violet-500" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                                <span className={`material-symbols-outlined text-[18px] ${item.color}`}>{item.icon}</span>
                                <span className="font-medium text-slate-500 hidden sm:inline">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="relative z-10 w-full px-6 pb-6">
                <div className="max-w-5xl mx-auto flex items-center justify-between bg-white/60 backdrop-blur-lg border border-white/70 rounded-2xl px-6 py-3 shadow-sm text-xs">
                    <div className="flex items-center gap-2 font-mono text-slate-400">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        v0.0.1
                    </div>
                    <div className="flex items-center gap-5 text-slate-400 font-medium">
                        <a className="hover:text-emerald-600 transition-colors" href="#privacy">Privacy</a>
                        <a className="hover:text-emerald-600 transition-colors" href="#terms">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EcoAnalyzer;