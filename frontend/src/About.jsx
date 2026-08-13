import { Link } from 'react-router-dom';
import SiteHeader from './SiteHeader';

const About = () => (
    <div className="min-h-screen font-display relative overflow-hidden bg-[#f8faf9] text-slate-900">
        <div className="fixed inset-0 pointer-events-none -z-10">
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />
            <div className="absolute top-[-16%] left-[-8%] w-[620px] h-[620px] bg-emerald-400/8 rounded-full blur-[150px]" />
            <div className="absolute bottom-[-12%] right-[-5%] w-[460px] h-[460px] bg-green-400/6 rounded-full blur-[120px]" />
        </div>

        <SiteHeader />

        <main className="w-full max-w-5xl mx-auto px-5 sm:px-6 pt-32 pb-20">
            <section className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-14 items-center animate-fade-in">
                <div>
                    <div className="inline-flex items-center gap-2 bg-white border border-emerald-100 rounded-full px-4 py-2 shadow-sm mb-6">
                        <span className="material-symbols-outlined text-emerald-600 text-[18px]">eco</span>
                        <span className="text-xs font-semibold text-emerald-700 tracking-wide">An Erasmus project in Italy</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08]">
                        Better prompts. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Lighter AI use.</span>
                    </h1>
                    <p className="mt-6 text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl">
                        EasyAI is an Erasmus project in Italy. Its prompt analyzer makes two hidden parts of AI use visible: the quality of the request and the resources a response may consume.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link to="/" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-emerald-600/20">
                            Try the analyzer
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </Link>
                        <Link to="/metrics" className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 text-sm font-semibold px-5 py-3 rounded-xl transition-all">
                            Explore the metrics
                        </Link>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-5 bg-emerald-400/10 rounded-[2rem] blur-2xl" />
                    <div className="relative bg-[#0c1a14] border border-emerald-900/50 rounded-3xl p-7 sm:p-8 shadow-2xl shadow-emerald-950/15">
                        <div className="flex items-center gap-3 pb-5 border-b border-emerald-900/50">
                            <div className="size-11 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">psychiatry</span>
                            </div>
                            <div>
                                <p className="font-bold text-white">One prompt, two lenses</p>
                                <p className="text-xs text-emerald-200/45">Quality + environmental awareness</p>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            {[
                                ['check_circle', 'Clarity', 'See whether the prompt gives the model enough direction.'],
                                ['monitoring', 'Awareness', 'Understand the estimated resources behind the interaction.'],
                                ['tips_and_updates', 'Action', 'Receive practical suggestions for a more effective prompt.'],
                            ].map(([icon, title, copy]) => (
                                <div key={title} className="flex gap-4 rounded-2xl bg-white/[0.04] border border-emerald-900/40 p-4">
                                    <span className="material-symbols-outlined text-emerald-400 text-[21px]">{icon}</span>
                                    <div>
                                        <h2 className="text-sm font-bold text-emerald-50">{title}</h2>
                                        <p className="mt-1 text-xs leading-relaxed text-emerald-100/45">{copy}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-16">
                <div className="max-w-2xl">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">How it works</span>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Useful feedback without the black box.</h2>
                    <p className="mt-4 text-slate-500 leading-relaxed">Each analysis combines a trained quality model with a transparent resource-estimation pipeline.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-8">
                    {[
                        ['01', 'Read the structure', 'The quality model evaluates signals such as task clarity, context, constraints, examples, and requested output format.'],
                        ['02', 'Estimate the response', 'The analyzer counts input tokens, recognizes the task category, and estimates a likely output length.'],
                        ['03', 'Make it actionable', 'You get a quality score, resource estimates, and targeted tips that can help improve the next version.'],
                    ].map(([number, title, copy]) => (
                        <article key={number} className="bg-white/80 backdrop-blur-sm border border-white rounded-2xl p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
                            <span className="font-mono text-xs font-bold text-emerald-600">{number}</span>
                            <h3 className="mt-4 text-lg font-bold">{title}</h3>
                            <p className="mt-3 text-sm text-slate-500 leading-relaxed">{copy}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mt-10 grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 sm:p-7">
                    <div className="size-10 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined">done_all</span>
                    </div>
                    <h2 className="mt-5 font-bold text-emerald-950">What EasyAI is for</h2>
                    <p className="mt-2 text-sm text-emerald-900/65 leading-relaxed">Comparing prompt drafts, learning better prompt habits, and understanding the relative impact of different requests.</p>
                </div>
                <div className="bg-white/80 border border-slate-200/80 rounded-2xl p-6 sm:p-7">
                    <div className="size-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
                        <span className="material-symbols-outlined">info</span>
                    </div>
                    <h2 className="mt-5 font-bold text-slate-900">What to keep in mind</h2>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">Resource values are educational estimates. They are not direct measurements of a particular provider, server, or data center.</p>
                </div>
            </section>
        </main>
    </div>
);

export default About;
