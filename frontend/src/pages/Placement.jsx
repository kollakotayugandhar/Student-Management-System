import { useEffect, useMemo, useState } from "react";
import { FaBriefcase, FaGraduationCap, FaSearch, FaChartLine } from "react-icons/fa";

const initialPlacements = [
    {
        id: 1,
        student: "Arjun",
        company: "Infosys",
        package: 5.0,
        role: "Software Engineer",
        status: "Placed",
        date: "2026-05-01",
    },
    {
        id: 2,
        student: "Rahul",
        company: "TCS",
        package: 4.5,
        role: "System Engineer",
        status: "Placed",
        date: "2026-04-18",
    },
    {
        id: 3,
        student: "Sneha",
        company: "Wipro",
        package: 4.2,
        role: "Developer",
        status: "Offer Received",
        date: "2026-05-10",
    },
];

function Placement() {
    const [placements, setPlacements] = useState(initialPlacements);
    const [formData, setFormData] = useState({
        student: "",
        company: "",
        role: "",
        package: "",
        status: "Placed",
        date: "",
    });
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [user, setUser] = useState(null);
    const isAdmin = user?.role === "admin";

    const filteredPlacements = useMemo(() => {
        return placements.filter((placement) => {
            const matchesSearch =
                placement.student.toLowerCase().includes(search.toLowerCase()) ||
                placement.company.toLowerCase().includes(search.toLowerCase()) ||
                placement.role.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = filterStatus ? placement.status === filterStatus : true;
            return matchesSearch && matchesStatus;
        });
    }, [placements, search, filterStatus]);

    const stats = useMemo(() => {
        const placedCount = placements.filter((item) => item.status === "Placed").length;
        const pendingCount = placements.filter((item) => item.status !== "Placed").length;
        const averagePackage = placements.length
            ? placements.reduce((sum, item) => sum + item.package, 0) / placements.length
            : 0;
        const highestPackage = placements.length
            ? Math.max(...placements.map((item) => item.package))
            : 0;
        return { placedCount, pendingCount, averagePackage, highestPackage };
    }, [placements]);

    useEffect(() => {
        try {
            const raw = localStorage.getItem("user");
            setUser(raw ? JSON.parse(raw) : null);
        } catch {
            setUser(null);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddPlacement = (e) => {
        e.preventDefault();
        const newPlacement = {
            id: Date.now(),
            student: formData.student.trim(),
            company: formData.company.trim(),
            role: formData.role.trim() || "Associate",
            package: Number(formData.package) || 0,
            status: formData.status,
            date: formData.date,
        };

        if (!newPlacement.student || !newPlacement.company || !newPlacement.package || !newPlacement.date) {
            alert("Please fill in student name, company, package, and date.");
            return;
        }

        setPlacements((prev) => [newPlacement, ...prev]);
        setFormData({ student: "", company: "", role: "", package: "", status: "Placed", date: "" });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 lg:p-10">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Placement Tracker</p>
                            <h1 className="mt-3 text-4xl font-bold text-white">Advanced Placement Dashboard</h1>
                            <p className="mt-3 max-w-2xl text-slate-300">
                                Track student placements, record offers, and visualize package performance for every placement drive.
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-200 shadow-lg shadow-cyan-500/10">
                            <FaChartLine className="h-5 w-5 text-cyan-300" />
                            {placements.length} Records
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Placed Students</p>
                        <p className="mt-4 text-4xl font-bold text-emerald-300">{stats.placedCount}</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Pending Offers</p>
                        <p className="mt-4 text-4xl font-bold text-rose-300">{stats.pendingCount}</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Avg Package</p>
                        <p className="mt-4 text-4xl font-bold text-cyan-300">{stats.averagePackage.toFixed(2)} LPA</p>
                        <p className="mt-2 text-sm text-slate-400">Highest {stats.highestPackage.toFixed(2)} LPA</p>
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-[0.7fr_0.45fr]">
                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-white">Placement Records</h2>
                                <p className="mt-2 text-slate-400">Search and filter placements by student, company, or status.</p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search placements"
                                    className="rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                />
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="Placed">Placed</option>
                                    <option value="Offer Received">Offer Received</option>
                                    <option value="Interview Scheduled">Interview Scheduled</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-8 overflow-x-auto">
                            <table className="min-w-full text-left text-sm text-slate-200">
                                <thead className="border-b border-slate-700 bg-slate-950/90 text-slate-300">
                                    <tr>
                                        <th className="px-4 py-4">Student</th>
                                        <th className="px-4 py-4">Company</th>
                                        <th className="px-4 py-4">Role</th>
                                        <th className="px-4 py-4">Package</th>
                                        <th className="px-4 py-4">Status</th>
                                        <th className="px-4 py-4">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPlacements.map((placement) => (
                                        <tr key={placement.id} className="border-b border-slate-700 hover:bg-slate-950/70 transition-colors">
                                            <td className="px-4 py-4 font-medium text-white">{placement.student}</td>
                                            <td className="px-4 py-4">{placement.company}</td>
                                            <td className="px-4 py-4">{placement.role}</td>
                                            <td className="px-4 py-4 text-cyan-300">{placement.package.toFixed(2)} LPA</td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${placement.status === "Placed" ? "bg-emerald-500/20 text-emerald-200" : "bg-amber-500/20 text-amber-200"}`}>
                                                    {placement.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-slate-400">{new Date(placement.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                        <h2 className="text-2xl font-semibold text-white">Add Placement</h2>
                        <p className="mt-2 text-slate-400">Register a new student placement record for the next drive.</p>

                        {isAdmin ? (
                            <form onSubmit={handleAddPlacement} className="mt-6 space-y-4">
                                <input
                                    name="student"
                                    value={formData.student}
                                    onChange={handleChange}
                                    placeholder="Student name"
                                    className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                    required
                                />
                                <input
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Company"
                                    className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                    required
                                />
                                <input
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    placeholder="Role"
                                    className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                />
                                <input
                                    name="package"
                                    type="number"
                                    step="0.1"
                                    value={formData.package}
                                    onChange={handleChange}
                                    placeholder="Package (LPA)"
                                    className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                    required
                                />
                                <input
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                    required
                                />
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                >
                                    <option value="Placed">Placed</option>
                                    <option value="Offer Received">Offer Received</option>
                                    <option value="Interview Scheduled">Interview Scheduled</option>
                                </select>
                                <button
                                    type="submit"
                                    className="w-full rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                                >
                                    Add Placement
                                </button>
                            </form>
                        ) : (
                            <div className="mt-6 rounded-3xl border border-amber-500/20 bg-amber-500/10 p-6 text-amber-200">
                                <p className="font-semibold">Admin only</p>
                                <p className="mt-2 text-sm text-amber-100">You can view placement records, but only admin users can add new placement entries.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Placement;