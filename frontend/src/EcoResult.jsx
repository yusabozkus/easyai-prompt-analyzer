
<<<<<<< HEAD
export const EcoResult = ({
    userQuery = "Suggest sustainable materials for a high-performance outdoor jacket, prioritizing carbon footprint reduction and durability.",
=======


export const EcoResult = ({
>>>>>>> b8c6548 (Commit error solved?)
    score = 50,
    scoreName = "High Efficiency",
    waterSaved = "1,240 L",
    energySaved = "45 kWh",
    carbonOffset = "12.5 kg"
}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const userQuery = location.state?.userQuery || "No query provided";

    let barColorClass = "";

    if (score <= 33) {
        barColorClass = "from-red-500 to-red-400 shadow-[0_0_10px_rgba(239,68,68,0.4)]";
    } else if (score <= 66) {
        barColorClass = "from-orange-500 to-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.4)]";
    } else {
        barColorClass = "from-emerald-500 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.4)]";
    }

    return (
        <div className="bg-white min-h-screen flex flex-col font-display selection:bg-emerald-500/30 selection:text-emerald-900 overflow-hidden text-slate-900 relative">

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

            <main className="flex-1 flex justify-center w-full px-4 sm:px-6 lg:px-8 pt-28 pb-32 overflow-y-auto z-10">
                <div className="w-full max-w-3xl flex flex-col gap-8">

                    <div className="flex justify-end mb-2">
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl rounded-tr-sm px-6 py-4 max-w-[85%] shadow-sm">
                            <p className="text-sm font-medium text-emerald-950">
                                {userQuery}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 sm:gap-6 animate-fade-in">

                        <div className="flex-shrink-0 mt-1">
                            <div className="size-10 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-400 p-[2px] shadow-md shadow-emerald-500/20">
                                <div className="size-full rounded-full bg-white flex items-center justify-center">
                                    <span className="material-symbols-outlined text-emerald-600 text-[22px]">smart_toy</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 flex-1">

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-bold text-slate-900">EcoAI Analysis</span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold border border-emerald-200">Optimized</span>
                                </div>
                                <p className="text-slate-600 text-base leading-relaxed">
                                    Based on the prompt you entered, here you can see its resource consumption and efficiency.
                                </p>
                            </div>

                            {/* Sustainability Impact Bar */}
                            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <h3 className="text-slate-900 font-bold text-lg">
                                            {scoreName}
                                        </h3>
                                        <p className="text-slate-500 text-sm">Sustainability Impact Score</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-4xl font-black text-emerald-600">{score}%</span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
                                    <div className="w-1/3 h-full border-r border-white/50 bg-red-100"></div>
                                    <div className="w-1/3 h-full border-r border-white/50 bg-orange-100"></div>
                                    <div className="w-1/3 h-full bg-emerald-50"></div>
                                    {/* Indicador dinámico usando la prop {score} */}
                                    <div
                                        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${barColorClass} rounded-full transition-all duration-1000 ease-out`}
                                        style={{ width: `${score}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    <span>Poor</span>
                                    <span>Moderate</span>
                                    <span className="text-emerald-600">Green Tier</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex flex-col items-center text-center">
                                    <span className="material-symbols-outlined text-blue-500 text-3xl mb-2">water_drop</span>
                                    <p className="text-xs text-blue-600/80 font-bold uppercase">Water Saved</p>
                                    <p className="text-xl font-black text-blue-700">{waterSaved}</p>
                                </div>
                                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex flex-col items-center text-center">
                                    <span className="material-symbols-outlined text-amber-500 text-3xl mb-2">bolt</span>
                                    <p className="text-xs text-amber-600/80 font-bold uppercase">Energy Diff</p>
                                    <p className="text-xl font-black text-amber-700">{energySaved}</p>
                                </div>
                                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex flex-col items-center text-center">
                                    <span className="material-symbols-outlined text-emerald-500 text-3xl mb-2">co2</span>
                                    <p className="text-xs text-emerald-600/80 font-bold uppercase">Carbon Offset</p>
                                    <p className="text-xl font-black text-emerald-700">{carbonOffset}</p>
                                </div>
                            </div>

                            {/* NUEVO: Consejos / Python Output */}
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3">
                                    <span className="material-symbols-outlined text-emerald-600">lightbulb</span>
                                    Actionable Tips
                                </h4>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    {tips}
                                    <li className="flex gap-2 items-start">
                                        <span className="material-symbols-outlined text-emerald-500 text-[18px]">check_circle</span>
                                        {tips}
                                    </li>
                                </ul>
                            </div>

                            {/* Action Bar (Botones de interacción) */}
                            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                                <div className="flex items-center gap-2">
                                    <button aria-label="Like" className="p-2 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors">
                                        <span className="material-symbols-outlined text-xl">thumb_up</span>
                                    </button>
                                    <button aria-label="Dislike" className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                                        <span className="material-symbols-outlined text-xl">thumb_down</span>
                                    </button>
                                    <div className="h-6 w-px bg-slate-200 mx-1"></div>
                                    <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-600 bg-white border border-slate-200 hover:border-emerald-200 px-3 py-1.5 rounded-lg transition-all">
                                        <span className="material-symbols-outlined text-[16px]">download</span> Export PDF
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            {/* Botón flotante para Nueva Análisis */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-3 bg-emerald-900..."
                >
                    <span className="material-symbols-outlined text-xl">add_circle</span>
                    New Analysis
                </button>
            </div>

        </div>
    );
};

export default EcoResult;