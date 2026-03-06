import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { checkHealth } from './api';

const EcoResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [backendOnline, setBackendOnline] = useState(null);

    useEffect(() => {
        const poll = () => checkHealth().then(setBackendOnline);
        poll();
        const interval = setInterval(poll, 15000);
        return () => clearInterval(interval);
    }, []);

    const userQuery = location.state?.userQuery || "No query provided";
    const scoreData = location.state?.scoreData || null;
    const analysisData = location.state?.analysisData || null;

    const score = scoreData ? Math.round(scoreData.score * 100) : 50;
    const scoreName = scoreData?.label || "N/A";
    const wordCount = scoreData?.word_count || 0;
    const tips = scoreData?.tips || ["No tips available."];

    const modelId = analysisData?.model_id || "N/A";
    const taskType = analysisData?.task_type?.replace(/_/g, ' ') || "N/A";
    const tokensIn = analysisData?.tokens_in || 0;
    const tokensOut = analysisData?.tokens_out || 0;
    const totalTokens = analysisData?.total_tokens || 0;
    const energyWh = analysisData?.ewk_wh ?? 0;
    const jouleTotal = analysisData?.joule_total ?? 0;
    const waterLiters = analysisData?.water_liters ?? 0;
    const costsEuro = analysisData?.costs_euro ?? 0;

    let barColorClass = "";
    let barGlow = "";
    if (score <= 33) {
        barColorClass = "from-red-500 to-rose-400";
        barGlow = "shadow-[0_0_12px_rgba(239,68,68,0.3)]";
    } else if (score <= 66) {
        barColorClass = "from-amber-500 to-orange-400";
        barGlow = "shadow-[0_0_12px_rgba(245,158,11,0.3)]";
    } else {
        barColorClass = "from-emerald-500 to-green-400";
        barGlow = "shadow-[0_0_12px_rgba(16,185,129,0.3)]";
    }

    return (
        <div className="min-h-screen flex flex-col font-display relative overflow-hidden bg-[#f8faf9]">

            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
                <div className="absolute top-[-15%] right-[-5%] w-[500px] h-[500px] bg-emerald-400/6 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px]" />
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
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-full border ${backendOnline === null ? 'text-slate-400 bg-slate-50 border-slate-200' : backendOnline ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-red-500 bg-red-50 border-red-100'}`}>
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${backendOnline === null ? 'bg-slate-400 animate-pulse' : backendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                            {backendOnline === null ? 'Checking...' : backendOnline ? 'Online' : 'Offline'}
                        </div>
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-4 py-2 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-[18px]">add_circle</span>
                            New Analysis
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex justify-center w-full px-4 sm:px-6 lg:px-8 pt-28 pb-24 overflow-y-auto z-10">
                <div className="w-full max-w-3xl flex flex-col gap-6">

                    <div className="flex justify-end animate-fade-in">
                        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl rounded-tr-sm px-6 py-4 max-w-[85%] shadow-lg shadow-emerald-500/15">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-emerald-200 text-[14px]">person</span>
                                <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider">Your Prompt</span>
                                <span className="text-[10px] font-mono text-emerald-300/60 ml-auto">{wordCount} words</span>
                            </div>
                            <p className="text-sm font-medium text-white leading-relaxed">
                                {userQuery}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 sm:gap-5 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>

                        <div className="flex-shrink-0 mt-1">
                            <div className="size-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                                <span className="material-symbols-outlined text-[22px]">smart_toy</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 flex-1 min-w-0">

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-slate-900">EcoAI Analysis</span>
                                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 uppercase tracking-wider">{taskType}</span>
                                </div>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    Environmental impact analysis complete. Here are the resource consumption details for your prompt.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex justify-between items-end mb-5">
                                    <div>
                                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Prompt Quality Score</p>
                                        <h3 className="text-slate-900 font-bold text-xl">{scoreName}</h3>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-emerald-400">{score}</span>
                                        <span className="text-xl font-bold text-emerald-400">%</span>
                                    </div>
                                </div>

                                <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="absolute inset-0 flex">
                                        <div className="w-1/3 border-r border-white/80 bg-red-50" />
                                        <div className="w-1/3 border-r border-white/80 bg-amber-50" />
                                        <div className="w-1/3 bg-emerald-50" />
                                    </div>
                                    <div
                                        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${barColorClass} ${barGlow} rounded-full transition-all duration-1000 ease-out`}
                                        style={{ width: `${score}%` }}
                                    />
                                </div>
                                <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <span>Poor</span>
                                    <span>Moderate</span>
                                    <span className="text-emerald-600">Excellent</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
                                <h4 className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-4">
                                    <span className="material-symbols-outlined text-emerald-600 text-[20px]">token</span>
                                    Token & Model Details
                                </h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[
                                        { label: "Model", value: modelId, color: "emerald" },
                                        { label: "Tokens In", value: tokensIn, color: "blue" },
                                        { label: "Tokens Out", value: tokensOut, color: "violet" },
                                        { label: "Total", value: totalTokens, color: "slate" },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 text-center hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-200">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">{item.label}</p>
                                            <p className="text-sm font-bold text-slate-800 truncate">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { icon: "water_drop", label: "Water Usage", value: `${waterLiters.toFixed(3)} L`, bg: "from-blue-50 to-cyan-50", border: "border-blue-100 hover:border-blue-200", iconColor: "text-blue-500", textColor: "text-blue-700" },
                                    { icon: "bolt", label: "Energy", value: `${energyWh.toFixed(4)} Wh`, sub: `${jouleTotal.toLocaleString()} J`, bg: "from-amber-50 to-orange-50", border: "border-amber-100 hover:border-amber-200", iconColor: "text-amber-500", textColor: "text-amber-700" },
                                    { icon: "euro", label: "Cost", value: `€${costsEuro.toFixed(6)}`, bg: "from-emerald-50 to-green-50", border: "border-emerald-100 hover:border-emerald-200", iconColor: "text-emerald-500", textColor: "text-emerald-700" },
                                ].map((card, i) => (
                                    <div key={i} className={`bg-gradient-to-br ${card.bg} border ${card.border} rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-md transition-all duration-200`}>
                                        <div className={`size-10 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm`}>
                                            <span className={`material-symbols-outlined ${card.iconColor} text-2xl`}>{card.icon}</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">{card.label}</p>
                                        <p className={`text-xl font-extrabold ${card.textColor}`}>{card.value}</p>
                                        {card.sub && <p className="text-[10px] text-slate-400 mt-0.5">{card.sub}</p>}
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
                                <h4 className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-4">
                                    <div className="size-7 rounded-lg bg-amber-50 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-amber-500 text-[18px]">lightbulb</span>
                                    </div>
                                    Optimization Tips
                                </h4>
                                <ul className="space-y-3">
                                    {tips.map((tip, index) => (
                                        <li key={index} className="flex gap-3 items-start bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                                            <span className="material-symbols-outlined text-emerald-500 text-[18px] mt-0.5 shrink-0">check_circle</span>
                                            <span className="text-sm text-slate-600 leading-relaxed">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 pt-2">
                                <button aria-label="Like" className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-all cursor-pointer shadow-sm">
                                    <span className="material-symbols-outlined text-xl">thumb_up</span>
                                </button>
                                <button aria-label="Dislike" className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all cursor-pointer shadow-sm">
                                    <span className="material-symbols-outlined text-xl">thumb_down</span>
                                </button>
                                <div className="h-6 w-px bg-slate-200 mx-1" />
                                <button className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-600 bg-white border border-slate-200 hover:border-emerald-200 px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm">
                                    <span className="material-symbols-outlined text-[16px]">download</span>
                                    Export PDF
                                </button>
                                <button className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-600 bg-white border border-slate-200 hover:border-emerald-200 px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm">
                                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                                    Copy
                                </button>
                            </div>
                        </div>
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

export { EcoResult };
export default EcoResult;