import { Link } from 'react-router-dom';
import SiteHeader from './SiteHeader';

const metrics = [
    {
        icon: 'speed',
        label: 'Prompt quality',
        value: '0–100%',
        color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        description: 'A machine-learning score based on 27 structural signals, including context, constraints, examples, formatting, and task clarity.',
    },
    {
        icon: 'token',
        label: 'Token count',
        value: 'Input + output',
        color: 'text-violet-600 bg-violet-50 border-violet-100',
        description: 'Your input is tokenized, then likely output length is estimated from the detected task type to produce a total token count.',
    },
    {
        icon: 'bolt',
        label: 'Energy',
        value: 'Wh & joules',
        color: 'text-amber-600 bg-amber-50 border-amber-100',
        description: 'Estimated from total tokens, energy per processed token, and the configured model complexity factor.',
    },
    {
        icon: 'water_drop',
        label: 'Water usage',
        value: 'Liters',
        color: 'text-blue-600 bg-blue-50 border-blue-100',
        description: 'A directional estimate using the analyzer’s current baseline of 7.5 ml of water per processed token.',
    },
    {
        icon: 'euro',
        label: 'Estimated cost',
        value: 'EUR',
        color: 'text-teal-600 bg-teal-50 border-teal-100',
        description: 'Energy in kilowatt-hours is multiplied by a €0.15/kWh benchmark to estimate the electricity cost of the request.',
    },
    {
        icon: 'category',
        label: 'Task & model',
        value: 'Context',
        color: 'text-slate-600 bg-slate-50 border-slate-200',
        description: 'The prompt is classified as Q&A, summarization, code, creative writing, translation, or analysis and paired with the model profile.',
    },
];

const Metrics = () => (
    <div className="min-h-screen font-display relative overflow-hidden bg-[#f8faf9] text-slate-900">
        <div className="fixed inset-0 pointer-events-none -z-10">
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />
            <div className="absolute top-[-12%] right-[-8%] w-[560px] h-[560px] bg-emerald-400/8 rounded-full blur-[140px]" />
            <div className="absolute bottom-[-15%] left-[-8%] w-[480px] h-[480px] bg-teal-400/6 rounded-full blur-[120px]" />
        </div>

        <SiteHeader />

        <main className="w-full max-w-5xl mx-auto px-5 sm:px-6 pt-32 pb-20">
            <section className="max-w-3xl animate-fade-in">
                <div className="inline-flex items-center gap-2 bg-white border border-emerald-100 rounded-full px-4 py-2 shadow-sm mb-6">
                    <span className="material-symbols-outlined text-emerald-600 text-[18px]">analytics</span>
                    <span className="text-xs font-semibold text-emerald-700 tracking-wide">Measurement guide</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08]">
                    What every <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">number</span> means.
                </h1>
                <p className="mt-6 text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl">
                    EasyAI turns one prompt into practical quality and resource signals, so you can compare requests and make them more intentional.
                </p>
            </section>

            <section aria-label="EasyAI metrics" className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
                {metrics.map((metric, index) => (
                    <article key={metric.label} className="bg-white/80 backdrop-blur-sm border border-white rounded-2xl p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(5,150,105,0.10)] transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 0.06}s` }}>
                        <div className={`size-11 rounded-xl border flex items-center justify-center ${metric.color}`}>
                            <span className="material-symbols-outlined text-[22px]">{metric.icon}</span>
                        </div>
                        <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{metric.label}</p>
                        <h2 className="mt-2 text-xl font-extrabold text-slate-900">{metric.value}</h2>
                        <p className="mt-3 text-sm text-slate-500 leading-relaxed">{metric.description}</p>
                    </article>
                ))}
            </section>

            <section className="mt-10 bg-[#0c1a14] rounded-3xl border border-emerald-900/50 p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/10">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    <div className="lg:w-1/3">
                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">Method</span>
                        <h2 className="mt-3 text-2xl font-bold">From prompt to impact</h2>
                        <p className="mt-3 text-sm text-emerald-100/55 leading-relaxed">A simple estimation pipeline keeps each result understandable.</p>
                    </div>
                    <ol className="grid sm:grid-cols-3 gap-4 flex-1">
                        {[
                            ['01', 'Tokenize', 'Count the prompt and estimate the response.'],
                            ['02', 'Classify', 'Detect the likely task and output range.'],
                            ['03', 'Calculate', 'Apply the energy, water, and cost baselines.'],
                        ].map(([number, title, description]) => (
                            <li key={number} className="rounded-2xl bg-white/[0.04] border border-emerald-800/30 p-5">
                                <span className="font-mono text-xs text-emerald-500">{number}</span>
                                <h3 className="mt-3 font-bold">{title}</h3>
                                <p className="mt-2 text-xs text-emerald-100/50 leading-relaxed">{description}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                <div>
                    <h2 className="font-bold text-emerald-950">These figures are estimates, not meter readings.</h2>
                    <p className="mt-1 text-sm text-emerald-800/65">Actual impact varies by hardware, model, data center, location, and response length.</p>
                </div>
                <Link to="/" className="shrink-0 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-emerald-600/20">
                    Analyze a prompt
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
            </section>
        </main>
    </div>
);

export default Metrics;
