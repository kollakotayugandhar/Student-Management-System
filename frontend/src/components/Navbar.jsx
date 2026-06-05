import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef();

    const isAdmin = user?.role === "admin";
    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        try {
            const raw = localStorage.getItem("user");
            setUser(raw ? JSON.parse(raw) : null);
        } catch (e) {
            setUser(null);
        }
    }, []);

    useEffect(() => {
        const onClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        window.addEventListener("click", onClick);
        return () => window.removeEventListener("click", onClick);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const initials = user?.name
        ? user.name.split(" ").map((n) => n[0]).slice(0, 2).join("")
        : "U";

    return (
        <nav className="relative sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl shadow-2xl shadow-slate-950/50 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_26%)]" />
            <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-8">

                <Link
                    to="/"
                    className="flex items-center gap-3 rounded-3xl border border-cyan-500/10 bg-gradient-to-r from-cyan-500/10 via-slate-900/80 to-sky-500/10 px-4 py-3 text-cyan-100 shadow-lg shadow-cyan-500/5 transition duration-300 hover:scale-[1.01] hover:border-cyan-400/20"
                >
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-sky-500 text-lg font-bold text-slate-950 shadow-inner shadow-cyan-500/20 animate-float">
                        <span className="absolute -top-2 -right-2 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.7)] animate-blink" />
                        SMS
                    </div>
                    <div>
                        <p className="text-base font-semibold tracking-wide">Student Management</p>
                        <p className="text-xs text-cyan-200/80">ERP Dashboard</p>
                    </div>
                </Link>

                <div className="hidden flex-1 items-center justify-between gap-6 md:flex">
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            to="/dashboard"
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isActive("/dashboard") ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20" : "text-slate-200 hover:bg-slate-800 hover:text-white"}`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/students"
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isActive("/students") ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20" : "text-slate-200 hover:bg-slate-800 hover:text-white"}`}
                        >
                            Students
                        </Link>
                        <Link
                            to="/attendance"
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isActive("/attendance") ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20" : "text-slate-200 hover:bg-slate-800 hover:text-white"}`}
                        >
                            Attendance
                        </Link>
                        <Link
                            to="/results"
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isActive("/results") ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20" : "text-slate-200 hover:bg-slate-800 hover:text-white"}`}
                        >
                            Results
                        </Link>
                    </div>

                    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-300 shadow-inner shadow-slate-950/10 transition duration-300 hover:bg-slate-900/80">
                        <svg className="h-4 w-4 text-cyan-300 transition duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search tools"
                            className="w-52 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setMobileOpen((s) => !s)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/40 bg-slate-900/85 text-cyan-200 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-500/10 md:hidden"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-slow-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-slow-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen((s) => !s)}
                            className="flex items-center gap-3 rounded-full border border-cyan-500/30 bg-gradient-to-r from-slate-900/80 to-slate-800/80 px-3 py-2 text-white shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-500/10"
                        >
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 flex items-center justify-center text-sm font-bold text-slate-950 shadow-inner shadow-cyan-500/30 animate-float">
                                {initials}
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-semibold text-white">{user?.name || "User"}</p>
                                <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-200/70">{user?.role || "Member"}</p>
                            </div>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
                                <Link to="/profile" className="block px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-900">
                                    Profile
                                </Link>
                                {user?.role === "admin" && (
                                    <Link to="/admin-panel" className="block px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-900">
                                        Admin Panel
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="w-full px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-slate-900">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {mobileOpen && (
                <div className="md:hidden border-t border-cyan-500/10 bg-slate-950/95 px-5 py-5 shadow-inner shadow-cyan-500/10">
                    <div className="space-y-3">
                        <Link to="/dashboard" className={`block rounded-3xl px-4 py-3 text-sm font-semibold transition ${isActive("/dashboard") ? "bg-cyan-500 text-slate-950" : "text-slate-200 hover:bg-slate-900"}`}>
                            Dashboard
                        </Link>
                        {isAdmin && (
                            <>
                                <Link to="/students" className={`block rounded-3xl px-4 py-3 text-sm font-semibold transition ${isActive("/students") ? "bg-cyan-500 text-slate-950" : "text-slate-200 hover:bg-slate-900"}`}>
                                    Students
                                </Link>
                                <Link to="/attendance" className={`block rounded-3xl px-4 py-3 text-sm font-semibold transition ${isActive("/attendance") ? "bg-cyan-500 text-slate-950" : "text-slate-200 hover:bg-slate-900"}`}>
                                    Attendance
                                </Link>
                                <Link to="/results" className={`block rounded-3xl px-4 py-3 text-sm font-semibold transition ${isActive("/results") ? "bg-cyan-500 text-slate-950" : "text-slate-200 hover:bg-slate-900"}`}>
                                    Results
                                </Link>
                            </>
                        )}
                        <Link to="/settings" className="block rounded-3xl px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-900">
                            Settings
                        </Link>
                        <Link to="/profile" className="block rounded-3xl px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-900">
                            Profile
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}