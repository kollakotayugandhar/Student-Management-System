import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaUsers,
    FaUserPlus,
    FaClipboardCheck,
    FaChartBar,
    FaMoneyBill,
    FaBriefcase,
    FaCalendarAlt,
    FaRobot,
    FaIdCard,
    FaClock,
    FaHistory,
    FaUser,
    FaCog,
    FaBell,
    FaLightbulb,
    FaShieldAlt,
    FaBook,
    FaSearch
} from "react-icons/fa";

function Home() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem("user");
            setUser(raw ? JSON.parse(raw) : null);
        } catch {
            setUser(null);
        }
    }, []);

    const modules = [
        {
            title: "Add Student",
            icon: <FaUserPlus size={30} />,
            path: "/add-student",
            description: "Register a new student record.",
            adminOnly: true
        },
        {
            title: "Fees",
            icon: <FaMoneyBill size={30} />,
            path: "/feesmanagement",
            description: "Track fees, dues, and payments.",
            adminOnly: true
        },
        {
            title: "Placement",
            icon: <FaBriefcase size={30} />,
            path: "/placement",
            description: "View placement drives and offers.",
            adminOnly: true
        },
        {
            title: "Events",
            icon: <FaCalendarAlt size={30} />,
            path: "/events",
            description: "Manage campus events and schedules."
        },
        {
            title: "AI Assistant",
            icon: <FaRobot size={30} />,
            path: "/ai-assistant",
            description: "Get instant help for campus workflows."
        },
        {
            title: "ID Card",
            icon: <FaIdCard size={30} />,
            path: "/id-card",
            description: "Generate student ID cards.",
            adminOnly: true
        },
        {
            title: "Timetable",
            icon: <FaClock size={30} />,
            path: "/timetable",
            description: "Review the class schedule."
        },
        {
            title: "Activity Logs",
            icon: <FaHistory size={30} />,
            path: "/activity-logs",
            description: "Track recent system actions."
        },
        {
            title: "Profile",
            icon: <FaUser size={30} />,
            path: "/profile",
            description: "Update student personal details."
        },
        {
            title: "Admin Panel",
            icon: <FaShieldAlt size={30} />,
            path: "/admin-panel",
            description: "Manage system settings, backups, and admin controls.",
            adminOnly: true
        },
        {
            title: "Settings",
            icon: <FaCog size={30} />,
            path: "/settings",
            description: "Configure preferences and security."
        }
    ];

    const stats = [
        {
            label: "Total Modules",
            value: modules.length,
            icon: <FaChartBar className="text-cyan-300" />
        },
        {
            label: "Upcoming Events",
            value: 8,
            icon: <FaCalendarAlt className="text-emerald-300" />
        },
        {
            label: "Recent Placements",
            value: 24,
            icon: <FaBriefcase className="text-violet-300" />
        },
        {
            label: "Pending Fees",
            value: 13,
            icon: <FaMoneyBill className="text-amber-300" />
        }
    ];

    const announcements = [
        {
            title: "Semester exams start May 28",
            category: "Academic",
            icon: <FaBook className="text-cyan-300" />
        },
        {
            title: "Placement drive with Infosys on June 5",
            category: "Placement",
            icon: <FaBriefcase className="text-emerald-300" />
        },
        {
            title: "New fee collection policy is live",
            category: "Finance",
            icon: <FaMoneyBill className="text-amber-300" />
        }
    ];

    const filteredModules = useMemo(
        () =>
            modules
                .filter((module) => !module.adminOnly || user?.role === "admin")
                .filter((module) =>
                    module.title.toLowerCase().includes(search.toLowerCase()) ||
                    module.description.toLowerCase().includes(search.toLowerCase())
                ),
        [modules, search, user]
    );

    return (
        <div className="relative min-h-screen bg-slate-950 text-white px-6 py-10 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/4 top-8 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute right-10 top-28 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
            </div>
            <div className="mx-auto max-w-7xl space-y-8">
                <section className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                    <div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr] lg:items-center">
                        <div>
                            <p className="flex items-center gap-2 text-sm uppercase tracking-[0.35em] text-cyan-300/80">
                                Welcome back
                                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.55)] animate-blink" />
                            </p>
                            <h1 className="mt-3 text-5xl font-bold text-white">Powerful campus management made simple</h1>
                            <p className="mt-5 max-w-2xl text-slate-300 text-lg">
                                Access every tool from admissions and attendance to fees, events, placements, and AI support — all from one intelligent dashboard.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <button
                                    onClick={() => navigate("/add-student")}
                                    className="inline-flex items-center gap-2 rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition duration-500 hover:-translate-y-0.5 hover:bg-cyan-400"
                                >
                                    <FaUserPlus className="transition duration-500 hover:scale-110" /> Add Student
                                </button>
                                <button
                                    onClick={() => navigate("/ai-assistant")}
                                    className="inline-flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-500 hover:-translate-y-0.5 hover:bg-white/10"
                                >
                                    <FaRobot className="transition duration-500 hover:scale-110" /> AI Assistant
                                </button>
                            </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {stats.map((stat) => (
                                <div key={stat.label} className="group rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/20 transition duration-500 hover:-translate-y-1 hover:border-cyan-500/30">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="text-sm uppercase tracking-[0.3em] text-slate-400">{stat.label}</div>
                                        <div className="rounded-2xl bg-slate-800/80 p-3 transition duration-500 group-hover:-translate-y-1 group-hover:scale-110">
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <p className="mt-6 text-4xl font-bold text-white">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="grid gap-6 xl:grid-cols-[0.9fr_0.65fr]">
                    <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-white">Quick Access</h2>
                                <p className="mt-2 text-slate-400">Search modules and open the tool you need right away.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaSearch className="text-slate-400" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search modules"
                                    className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white outline-none focus:border-cyan-400"
                                />
                            </div>
                        </div>

                        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {filteredModules.map((module) => (
                                <div key={module.title} className="group rounded-3xl border border-white/10 bg-slate-950/80 p-5 transition duration-500 hover:-translate-y-1 hover:border-cyan-500/30">
                                    <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900 text-cyan-300 shadow-lg shadow-cyan-500/10 transition duration-500 group-hover:-translate-y-1 group-hover:scale-110">
                                        <span className="absolute -top-2 -right-2 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.65)] animate-blink" />
                                        {module.icon}
                                    </div>
                                    <h3 className="mt-5 text-xl font-semibold text-white">{module.title}</h3>
                                    <p className="mt-3 text-slate-400">{module.description}</p>
                                    <button
                                        onClick={() => navigate(module.path)}
                                        className="mt-6 inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                                    >
                                        Open
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <aside className="space-y-6">
                        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                            <div className="flex items-center gap-3">
                                <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300">
                                    <FaBell />
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Announcements</p>
                                    <h3 className="text-xl font-semibold text-white">Campus updates</h3>
                                </div>
                            </div>
                            <div className="mt-6 space-y-4">
                                {announcements.map((item) => (
                                    <div key={item.title} className="group rounded-3xl border border-white/10 bg-slate-950/80 p-4 transition duration-500 hover:-translate-y-1 hover:border-cyan-500/30">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-2xl bg-slate-800 p-3 transition duration-500 group-hover:scale-105 animate-float">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">{item.title}</p>
                                                <p className="mt-1 text-sm text-slate-400">{item.category}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                            <div className="flex items-center gap-3">
                                <div className="rounded-2xl bg-slate-950/80 p-3 text-slate-300">
                                    <FaLightbulb />
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Tip</p>
                                    <h3 className="text-xl font-semibold text-white">Stay ahead</h3>
                                </div>
                            </div>
                            <p className="mt-4 text-slate-400">
                                Use AI Assistant for quick student record queries, fee summaries, and event planning guidance.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                            <div className="flex items-center gap-3">
                                <div className="rounded-2xl bg-slate-950/80 p-3 text-slate-300">
                                    <FaShieldAlt />
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Security</p>
                                    <h3 className="text-xl font-semibold text-white">Keep your account safe</h3>
                                </div>
                            </div>
                            <p className="mt-4 text-slate-400">Update your password regularly and enable settings to protect student data.</p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default Home;
