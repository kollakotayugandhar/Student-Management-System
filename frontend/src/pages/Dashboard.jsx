import { useEffect, useState } from "react";
import api from "../api/axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";

function Dashboard() {


const [studentsCount, setStudentsCount] = useState(0);
const [attendanceCount, setAttendanceCount] = useState(0);
const [resultsCount, setResultsCount] = useState(0);

const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user") || "null");
const dashboardLabel = user?.role === "admin" ? "Admin Dashboard" : "Student Dashboard";

const logout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");

};

useEffect(() => {

    fetchStudents();
    fetchAttendance();
    fetchResults();

}, []);

const fetchStudents = async () => {

    try {

        const res = await api.get("/students");

        setStudentsCount(res.data.length);

    } catch (error) {

        console.log(error);

    }

};

const fetchAttendance = async () => {

    try {

        const res = await api.get("/attendance");

        setAttendanceCount(res.data.length);

    } catch (error) {

        console.log(error);

    }

};

const fetchResults = async () => {

    try {

        const res = await api.get("/results");

        setResultsCount(res.data.length);

    } catch (error) {

        console.log(error);

    }

};

return (

    <div className="flex bg-slate-950 min-h-screen">

        <Sidebar />

        <div className="flex-1 p-6 lg:p-10 text-white">

            <div className="mb-10 rounded-[2rem] border border-cyan-500/10 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400/70">{dashboardLabel}</p>
                        <h1 className="mt-4 text-4xl font-bold text-white">Welcome back, {user?.name || "Admin"}</h1>
                        <p className="mt-3 max-w-2xl text-slate-400">Monitor students, attendance, and results from a beautiful, unified dashboard with fast access to the most important actions.</p>
                    </div>
                    <button
                        onClick={logout}
                        className="inline-flex items-center justify-center rounded-3xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
                    >
                        Sign out
                    </button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-8">
                <div className="rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-slate-900/80 p-6 shadow-xl shadow-cyan-500/10 transition hover:-translate-y-1">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Students</p>
                            <p className="mt-4 text-5xl font-bold text-cyan-300">{studentsCount}</p>
                        </div>
                        <div className="rounded-3xl bg-cyan-500/10 p-4 text-cyan-300">
                            <FaUserGraduate className="text-2xl" />
                        </div>
                    </div>
                </div>
                <div className="rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-emerald-500/10 to-slate-900/80 p-6 shadow-xl shadow-emerald-500/10 transition hover:-translate-y-1">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">Attendance</p>
                            <p className="mt-4 text-5xl font-bold text-emerald-300">{attendanceCount}</p>
                        </div>
                        <div className="rounded-3xl bg-emerald-500/10 p-4 text-emerald-300">
                            <FaClipboardCheck className="text-2xl" />
                        </div>
                    </div>
                </div>
                <div className="rounded-[2rem] border border-pink-500/20 bg-gradient-to-br from-fuchsia-500/10 to-slate-900/80 p-6 shadow-xl shadow-fuchsia-500/10 transition hover:-translate-y-1">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-pink-200/80">Results</p>
                            <p className="mt-4 text-5xl font-bold text-pink-300">{resultsCount}</p>
                        </div>
                        <div className="rounded-3xl bg-pink-500/10 p-4 text-pink-300">
                            <FaChartBar className="text-2xl" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-900/30">
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold">Quick actions</h2>
                            <p className="mt-2 text-sm text-slate-400">Reach the most common workflows with one click.</p>
                        </div>
                        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">Fast access</span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <button onClick={() => navigate('/students')} className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-4 text-left text-white transition hover:bg-cyan-500/15">
                            <span className="block text-sm text-slate-400">View all students</span>
                            <span className="mt-2 text-lg font-semibold text-cyan-200">Student list</span>
                        </button>
                        <button onClick={() => navigate('/attendance')} className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-left text-white transition hover:bg-emerald-500/15">
                            <span className="block text-sm text-slate-400">Track attendance</span>
                            <span className="mt-2 text-lg font-semibold text-emerald-200">Attendance log</span>
                        </button>
                        <button onClick={() => navigate('/results')} className="rounded-3xl border border-pink-500/20 bg-pink-500/10 px-5 py-4 text-left text-white transition hover:bg-pink-500/15">
                            <span className="block text-sm text-slate-400">Review results</span>
                            <span className="mt-2 text-lg font-semibold text-pink-200">Exam outcomes</span>
                        </button>
                        <button onClick={() => navigate('/add-student')} className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 px-5 py-4 text-left text-white transition hover:bg-yellow-500/15">
                            <span className="block text-sm text-slate-400">Add a new student</span>
                            <span className="mt-2 text-lg font-semibold text-yellow-200">New admission</span>
                        </button>
                    </div>
                </div>

                <aside className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-900/30">
                    <h2 className="text-2xl font-semibold">System pulse</h2>
                    <p className="mt-3 text-sm text-slate-400">Current activity, recent updates, and quick insights to keep the school workflow smooth.</p>

                    <div className="mt-8 space-y-4">
                        <div className="rounded-3xl bg-white/5 p-4">
                            <p className="text-sm text-slate-400">Classroom readiness</p>
                            <p className="mt-2 text-xl font-semibold text-cyan-200">All classes are operating normally.</p>
                        </div>
                        <div className="rounded-3xl bg-white/5 p-4">
                            <p className="text-sm text-slate-400">Events coming up</p>
                            <p className="mt-2 text-xl font-semibold text-emerald-200">1 orientation and 2 exam schedules</p>
                        </div>
                        <div className="rounded-3xl bg-white/5 p-4">
                            <p className="text-sm text-slate-400">Admin access</p>
                            <p className="mt-2 text-xl font-semibold text-pink-200">Ready to manage users and settings.</p>
                        </div>
                    </div>
                </aside>
            </div>

        </div>

    </div>

);


}

export default Dashboard;
