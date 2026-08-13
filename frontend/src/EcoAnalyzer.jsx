import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { fetchAllData } from './api';
import SiteHeader from './SiteHeader';

const examples = [
    {
        level: 'Excellent',
        icon: 'verified',
        badge: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        prompt: 'You are an energy analyst. Context: a small Italian municipality is comparing solar and wind power. Analyze both options in a Markdown table with exactly 4 criteria: cost, reliability, land use, and emissions. For example, explain how intermittency affects reliability. End with a recommendation of at most 2 sentences and state your assumptions.',
    },
    {
        level: 'Good',
        icon: 'thumb_up',
        badge: 'text-blue-700 bg-blue-50 border-blue-200',
        prompt: 'Summarize the following article in 5 bullet points for university students. Focus on the main argument, supporting evidence, and conclusion. Keep each bullet under 25 words: [paste article]',
    },
    {
        level: 'Average',
        icon: 'remove',
        badge: 'text-amber-700 bg-amber-50 border-amber-200',
        prompt: 'Explain what renewable energy?',
    },
    {
        level: 'Poor',
        icon: 'warning',
        badge: 'text-red-700 bg-red-50 border-red-200',
        prompt: 'Tell me about energy.',
    },
];

const EcoAnalyzer = () => {
    const navigate = useNavigate();
    const promptInputRef = useRef(null);
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const selectExample = (example) => {
        setQuery(example.prompt);
        setError(null);
        requestAnimationFrame(() => promptInputRef.current?.focus());
    };

    return (
        <div className="min-h-screen flex flex-col font-display relative overflow-x-hidden bg-[#f8faf9]">

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

            <SiteHeader />

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
                                    <span className="text-emerald-600/50 text-xs font-mono">easyai — prompt-analyzer</span>
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
                                        ref={promptInputRef}
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

                    <section className="bg-white/70 backdrop-blur-sm border border-white rounded-2xl p-4 sm:p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)] animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1 mb-4">
                            <div>
                                <h2 className="text-sm font-bold text-slate-800">Quick start</h2>
                                <p className="mt-1 text-xs text-slate-400">Choose an example to compare different prompt quality levels.</p>
                            </div>
                            <span className="hidden sm:inline text-[10px] font-mono text-slate-400">click to use</span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-2.5">
                            {examples.map((example) => {
                                const isSelected = query === example.prompt;

                                return (
                                    <button
                                        key={example.level}
                                        type="button"
                                        onClick={() => selectExample(example)}
                                        disabled={isLoading}
                                        aria-pressed={isSelected}
                                        aria-label={`Use the ${example.level.toLowerCase()} prompt example`}
                                        className={`group text-left rounded-xl border p-3.5 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${isSelected
                                            ? 'bg-emerald-50/70 border-emerald-300 shadow-sm ring-2 ring-emerald-500/10'
                                            : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 hover:-translate-y-0.5'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between gap-3 mb-2.5">
                                            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${example.badge}`}>
                                                <span className="material-symbols-outlined text-[14px]">{example.icon}</span>
                                                {example.level}
                                            </span>
                                            <span className={`material-symbols-outlined text-[17px] transition-all ${isSelected ? 'text-emerald-600' : 'text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5'}`}>
                                                {isSelected ? 'check_circle' : 'arrow_forward'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{example.prompt}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

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

        </div>
    );
};

export default EcoAnalyzer;
