import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    FaTachometerAlt,
    FaUserGraduate,
    FaClipboardList,
    FaChartBar,
    FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        try {
            const stored = localStorage.getItem("user");
            setUser(stored ? JSON.parse(stored) : null);
        } catch {
            setUser(null);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    return (

        <div className="w-64 bg-slate-900 text-white p-6 min-h-screen border-r border-white/10 shadow-xl shadow-slate-950/30">

            <div className="mb-10 rounded-[1.75rem] border border-cyan-500/15 bg-slate-950/80 p-5 shadow-lg shadow-cyan-500/10">
                <h1 className="text-2xl font-bold text-cyan-300">{user?.role === "admin" ? "Admin Panel" : "Student Panel"}</h1>
                <p className="mt-2 text-sm text-slate-400">Fast access to all school management tools.</p>
            </div>

            <div className="flex flex-col gap-3">

                <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                        isActive("/dashboard")
                            ? "bg-cyan-500/10 text-cyan-200 shadow-inner"
                            : "text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-100"
                    }`}
                >
                    <FaTachometerAlt /> Dashboard
                </Link>

                <Link
                    to="/students"
                    className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                        isActive("/students")
                            ? "bg-cyan-500/10 text-cyan-200 shadow-inner"
                            : "text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-100"
                    }`}
                >
                    <FaUserGraduate /> Students
                </Link>

                <Link
                    to="/attendance"
                    className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                        isActive("/attendance")
                            ? "bg-cyan-500/10 text-cyan-200 shadow-inner"
                            : "text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-100"
                    }`}
                >
                    <FaClipboardList /> Attendance
                </Link>

                <Link
                    to="/results"
                    className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                        isActive("/results")
                            ? "bg-cyan-500/10 text-cyan-200 shadow-inner"
                            : "text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-100"
                    }`}
                >
                    <FaChartBar /> Results
                </Link>

                <button
                    onClick={logout}
                    className="mt-4 flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-red-500/20 hover:text-red-100"
                >
                    <FaSignOutAlt /> Logout
                </button>

            </div>

        </div>

    );
}

export default Sidebar;