import { useNavigate } from "react-router-dom";
import { FaRocket, FaClipboardCheck, FaUsers, FaChartLine } from "react-icons/fa";

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.22),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(125,211,252,0.16),_transparent_24%)]" />
            <div className="absolute left-[-8rem] top-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute right-[-10rem] top-1/4 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl animate-blob animation-delay-4000" />

            <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 sm:px-8 lg:px-12">
                <div className="grid gap-8 lg:grid-cols-1 lg:items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur-sm shadow-sm shadow-cyan-500/10">
                            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300 animate-pulse" />
                            Built for school admins and educators
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
                                Smart student management with fast analytics and easy attendance.
                            </h1>
                            <p className="max-w-xl text-lg text-slate-300 sm:text-xl">
                                Track student records, attendance, placements, and events from one polished interface.
                                Designed for faster workflows and modern campus operations.
                            </p>
                        </div>

                        <div className="flex gap-4 flex-wrap">
                            <div className="flex items-center gap-3 rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-200 shadow-lg shadow-slate-950/20">
                                <FaUsers className="h-5 w-5 text-cyan-300" />
                                Multi-role access for admins, teachers and students
                            </div>
                            <div className="flex items-center gap-3 rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-200 shadow-lg shadow-slate-950/20">
                                <FaClipboardCheck className="h-5 w-5 text-cyan-300" />
                                Quick attendance and instant summary insights
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <button
                                onClick={() => navigate("/login")}
                                className="inline-flex items-center justify-center gap-3 rounded-full bg-cyan-500 px-8 py-3 text-base font-semibold text-slate-950 shadow-xl shadow-cyan-500/30 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-400"
                            >
                                <FaRocket className="h-5 w-5" />
                                Get Started
                            </button>
                            <button
                                onClick={() => navigate("/register")}
                                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3 text-base font-medium text-white transition duration-300 hover:border-cyan-300/50 hover:bg-white/10"
                            >
                                Create Account
                            </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/10">
                                <div className="flex items-center gap-3 text-cyan-300">
                                    <FaClipboardCheck className="h-5 w-5" />
                                    <h3 className="text-lg font-semibold text-white">Real-time attendance</h3>
                                </div>
                                <p className="mt-2 text-sm text-slate-300">Mark attendance quickly and see student presence at a glance.</p>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-slate-950/20 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/10">
                                <div className="flex items-center gap-3 text-cyan-300">
                                    <FaChartLine className="h-5 w-5" />
                                    <h3 className="text-lg font-semibold text-white">Instant analytics</h3>
                                </div>
                                <p className="mt-2 text-sm text-slate-300">Smart dashboards surface trends in grades and engagement.</p>
                            </div>
                        </div>

                        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                            <h3 className="text-2xl font-semibold text-white">Contact Us</h3>
                            <p className="mt-3 text-slate-400">Need help getting started? Reach out to our support team for implementation and setup support.</p>
                            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-3xl bg-slate-950/80 p-5">
                                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Email</p>
                                    <p className="mt-3 text-lg font-semibold text-white">support@edutrackpro.com</p>
                                </div>
                                <div className="rounded-3xl bg-slate-950/80 p-5">
                                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Phone</p>
                                    <p className="mt-3 text-lg font-semibold text-white">+91 98765 43210</p>
                                </div>
                                <div className="rounded-3xl bg-slate-950/80 p-5">
                                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Address</p>
                                    <p className="mt-3 text-lg font-semibold text-white">123 Campus Drive, City, India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(24px, -20px) scale(1.05); }
                    66% { transform: translate(-20px, 24px) scale(0.95); }
                }
                .animate-blob {
                    animation: blob 8s ease-in-out infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}

export default Landing;


