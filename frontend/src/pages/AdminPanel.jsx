import { useMemo, useState } from "react";
import { FaUsersCog, FaDatabase, FaTools, FaShieldAlt, FaBolt, FaUserShield, FaFileExport, FaClipboardList } from "react-icons/fa";
import api from "../api/axios";

const adminStats = [
    { label: "Total Users", value: 128, icon: <FaUsersCog className="text-cyan-300" /> },
    { label: "Active Sessions", value: 24, icon: <FaBolt className="text-amber-300" /> },
    { label: "Pending Requests", value: 7, icon: <FaClipboardList className="text-emerald-300" /> },
    { label: "Backups", value: 12, icon: <FaFileExport className="text-violet-300" /> }
];

const userRequests = [
    { id: 1, name: "Vijay Rao", role: "Teacher", action: "Request admin access" },
    { id: 2, name: "Meena S.", role: "Staff", action: "Reset password" },
    { id: 3, name: "Rahul K.", role: "Student", action: "Update profile" }
];

function AdminPanel() {
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [quickNote, setQuickNote] = useState("");
    const [promoteEmail, setPromoteEmail] = useState("");
    const [promoteStatus, setPromoteStatus] = useState("");
    const [promoting, setPromoting] = useState(false);

    const requestCount = useMemo(() => userRequests.length, []);

    const handleApprove = (request) => {
        setSelectedRequest(request.id);
        setQuickNote(`Approved ${request.name}'s request.`);
    };

    const handleReject = (request) => {
        setSelectedRequest(request.id);
        setQuickNote(`Rejected ${request.name}'s request.`);
    };

    const handlePromoteSubmit = async (event) => {
        event.preventDefault();

        if (!promoteEmail.trim()) {
            setPromoteStatus("Enter a valid email address.");
            return;
        }

        setPromoting(true);
        setPromoteStatus("");

        try {
            const { data } = await api.put("/users/promote", { email: promoteEmail.trim() });
            setPromoteStatus(data.message);
            setPromoteEmail("");
        } catch (error) {
            setPromoteStatus(error?.response?.data?.message || "Promotion failed. Please try again.");
        } finally {
            setPromoting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
            <div className="mx-auto max-w-7xl space-y-8">
                <header className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Admin Control Panel</p>
                            <h1 className="mt-3 text-4xl font-bold text-white">Manage campus operations and system health</h1>
                            <p className="mt-4 text-slate-300">Use the admin dashboard to monitor activity, approve requests, run backups, and configure critical settings.</p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <button
                                onClick={() => setMaintenanceMode((prev) => !prev)}
                                className={`rounded-3xl px-5 py-3 text-sm font-semibold transition ${maintenanceMode ? "bg-rose-500 text-white" : "bg-cyan-500 text-slate-950 hover:bg-cyan-400"}`}
                            >
                                {maintenanceMode ? "Maintenance On" : "Enable Maintenance"}
                            </button>
                            <button
                                onClick={() => setNotificationsEnabled((prev) => !prev)}
                                className="rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                {notificationsEnabled ? "Notifications On" : "Notifications Off"}
                            </button>
                        </div>
                    </div>
                </header>

                <section className="grid gap-6 xl:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                        <h2 className="text-2xl font-semibold text-white">System Overview</h2>
                        <p className="mt-2 text-slate-400">Review key metrics and recent admin activity.</p>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            {adminStats.map((stat) => (
                                <div key={stat.label} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-inner shadow-slate-950/10">
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                                        <div className="rounded-2xl bg-slate-800/90 p-3">{stat.icon}</div>
                                    </div>
                                    <p className="mt-4 text-4xl font-bold text-white">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                        <h2 className="text-2xl font-semibold text-white">Quick Actions</h2>
                        <p className="mt-2 text-slate-400">Execute high-priority admin operations quickly.</p>
                        <div className="mt-6 space-y-4">
                            <button className="w-full rounded-3xl bg-cyan-500 px-5 py-4 text-left text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                                <div className="flex items-center justify-between">
                                    <span>Manage Users</span>
                                    <FaUsersCog />
                                </div>
                                <p className="mt-2 text-slate-300">Create, edit, and remove admin, staff or student accounts.</p>
                            </button>
                            <button className="w-full rounded-3xl bg-slate-950/90 px-5 py-4 text-left text-sm font-semibold text-white transition hover:bg-slate-900/100 border border-white/10">
                                <div className="flex items-center justify-between">
                                    <span>Run Database Backup</span>
                                    <FaDatabase />
                                </div>
                                <p className="mt-2 text-slate-300">Export student records and preserve your current dataset.</p>
                            </button>
                            <button className="w-full rounded-3xl bg-slate-950/90 px-5 py-4 text-left text-sm font-semibold text-white transition hover:bg-slate-900/100 border border-white/10">
                                <div className="flex items-center justify-between">
                                    <span>Configure Settings</span>
                                    <FaTools />
                                </div>
                                <p className="mt-2 text-slate-300">Adjust system behavior, roles, and feature availability.</p>
                            </button>
                        </div>
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold text-white">Promote Student to Admin</h2>
                                <p className="mt-2 text-slate-400">Convert a student login into an admin account by email.</p>
                            </div>
                            <div className="rounded-3xl bg-slate-950/90 px-4 py-2 text-sm text-slate-300">Admin-only</div>
                        </div>

                        <form onSubmit={handlePromoteSubmit} className="mt-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-300">Student Email</label>
                                <input
                                    type="email"
                                    value={promoteEmail}
                                    onChange={(e) => setPromoteEmail(e.target.value)}
                                    placeholder="student@example.com"
                                    className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={promoting}
                                className="rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {promoting ? "Promoting..." : "Promote to Admin"}
                            </button>
                            {promoteStatus && (
                                <p className="rounded-3xl bg-white/5 p-4 text-sm text-slate-200">{promoteStatus}</p>
                            )}
                        </form>
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-[0.9fr_0.7fr]">
                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold text-white">Pending Admin Requests ({requestCount})</h2>
                                <p className="mt-2 text-slate-400">Review the latest requests awaiting approval.</p>
                            </div>
                            <div className="rounded-3xl bg-slate-950/90 px-4 py-2 text-sm text-slate-300">Latest</div>
                        </div>
                        <div className="mt-6 space-y-4">
                            {userRequests.map((request) => (
                                <div key={request.id} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="font-semibold text-white">{request.name}</p>
                                            <p className="mt-1 text-sm text-slate-400">{request.role}</p>
                                        </div>
                                        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">{request.action}</span>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <button
                                            onClick={() => handleApprove(request)}
                                            className="rounded-3xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(request)}
                                            className="rounded-3xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                        <div className="flex items-center gap-3">
                            <FaShieldAlt className="h-7 w-7 text-cyan-300" />
                            <div>
                                <h2 className="text-2xl font-semibold text-white">Admin Controls</h2>
                                <p className="mt-2 text-slate-400">Use the toggles below to manage system state and notifications.</p>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            <div className="rounded-3xl bg-slate-950/90 p-4">
                                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Maintenance mode</p>
                                <p className="mt-2 text-lg font-semibold text-white">{maintenanceMode ? "Enabled" : "Disabled"}</p>
                            </div>
                            <div className="rounded-3xl bg-slate-950/90 p-4">
                                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Notifications</p>
                                <p className="mt-2 text-lg font-semibold text-white">{notificationsEnabled ? "Enabled" : "Muted"}</p>
                            </div>
                            {quickNote && (
                                <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-slate-100">
                                    <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Activity note</p>
                                    <p className="mt-2">{quickNote}</p>
                                </div>
                            )}
                        </div>
                    </aside>
                </section>
            </div>
        </div>
    );
}

export default AdminPanel;