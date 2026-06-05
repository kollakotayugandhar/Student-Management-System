import { useEffect, useState } from "react";
import api from "../api/axios";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
    };

    const saveProfile = async (e) => {
        e.preventDefault();
        // Only allow save for admin for now — students cannot change DB-backed student record here
        setEditMode(false);
    };

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const raw = localStorage.getItem("user");
                const user = raw ? JSON.parse(raw) : null;

                if (!user) return;

                // Try to find a student record by name
                const nameQuery = encodeURIComponent(user.name || user.email || "");
                if (!nameQuery) return;

                const res = await api.get(`/students?name=${nameQuery}`);
                if (res.data && res.data.length > 0) {
                    const s = res.data[0];
                    setProfile({
                        name: s.name,
                        email: s.email || user.email || "",
                        phone: s.phone || "",
                        course: s.course || "",
                        year: s.year ? `${s.year}th Year` : "",
                        rollNumber: s.rollNumber || "",
                        branch: s.branch || "",
                        hostel: s.hostel || "",
                        attendance: s.attendance || 0,
                        cgpa: s.cgpa || 0,
                        feesTotal: s.feesTotal || 0,
                        feesPaid: s.feesPaid || 0,
                        feesStatus: (s.feesTotal || 0) > 0 && (s.feesPaid || 0) >= (s.feesTotal || 0) ? "Paid" : "Pending",
                        photo: s.photo || user.photo || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
                    });
                } else {
                    // Fallback to user info
                    setProfile({
                        name: user.name || "Student",
                        email: user.email || "",
                        phone: "",
                        course: "",
                        year: "",
                        rollNumber: "",
                        branch: "",
                        hostel: "",
                        attendance: 0,
                        cgpa: 0,
                        feesTotal: 0,
                        feesPaid: 0,
                        feesStatus: "Pending",
                        photo: user.photo || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
                    });
                }
            } catch (err) {
                console.error(err);
            }
        };

        loadProfile();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
            <div className="mx-auto max-w-6xl space-y-8">
                <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                    <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Profile</p>
                    <h1 className="mt-3 text-4xl font-bold text-white">Student Profile Dashboard</h1>
                    <p className="mt-4 max-w-3xl text-slate-300">View and update the student profile, monitor academic status, and keep all details up to date.</p>
                </div>

                <div className="grid gap-6 xl:grid-cols-[0.95fr_0.65fr]">
                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                            <div className="flex-shrink-0 rounded-3xl bg-slate-950/80 p-4">
                                <img
                                    src={profile.photo}
                                    alt={profile.name}
                                    className="h-32 w-32 rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-3xl font-semibold text-white">{profile.name}</h2>
                                <p className="mt-2 text-slate-400">{profile.course} • {profile.year}</p>
                                <p className="mt-1 text-slate-400">Roll No: {profile.rollNumber}</p>
                                <p className="mt-1 text-slate-400">Branch: {profile.branch}</p>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl bg-slate-950/80 p-5">
                                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Attendance</p>
                                <p className="mt-3 text-3xl font-semibold text-emerald-300">{profile.attendance}%</p>
                            </div>
                            <div className="rounded-3xl bg-slate-950/80 p-5">
                                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">CGPA</p>
                                <p className="mt-3 text-3xl font-semibold text-cyan-300">{profile.cgpa}</p>
                            </div>
                            <div className="rounded-3xl bg-slate-950/80 p-5">
                                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Fees Status</p>
                                <p className={`mt-3 text-3xl font-semibold ${profile.feesStatus === "Paid" ? "text-emerald-300" : "text-rose-300"}`}>{profile.feesStatus}</p>
                            </div>
                            <div className="rounded-3xl bg-slate-950/80 p-5">
                                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Hostel</p>
                                <p className="mt-3 text-3xl font-semibold text-white">{profile.hostel}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold text-white">Profile Details</h2>
                                <p className="mt-2 text-slate-400">Edit the student's personal information and contact details.</p>
                            </div>
                            <button
                                onClick={toggleEditMode}
                                className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                            >
                                {editMode ? "Cancel" : "Edit Profile"}
                            </button>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-3xl bg-slate-950/80 p-5">
                                    <p className="text-sm text-slate-400">Email</p>
                                    <p className="mt-2 text-white">{profile.email}</p>
                                </div>
                                <div className="rounded-3xl bg-slate-950/80 p-5">
                                    <p className="text-sm text-slate-400">Phone</p>
                                    <p className="mt-2 text-white">{profile.phone}</p>
                                </div>
                            </div>

                            {editMode ? (
                                <form onSubmit={saveProfile} className="space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <input
                                            type="text"
                                            name="name"
                                            value={profile.name}
                                            onChange={handleChange}
                                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                            placeholder="Student name"
                                            required
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            value={profile.email}
                                            onChange={handleChange}
                                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                            placeholder="Email address"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={profile.phone}
                                            onChange={handleChange}
                                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                            placeholder="Phone number"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="branch"
                                            value={profile.branch}
                                            onChange={handleChange}
                                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                            placeholder="Branch"
                                        />
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <input
                                            type="text"
                                            name="hostel"
                                            value={profile.hostel}
                                            onChange={handleChange}
                                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                            placeholder="Hostel"
                                        />
                                        <select
                                            name="feesStatus"
                                            value={profile.feesStatus}
                                            onChange={handleChange}
                                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                        >
                                            <option value="Paid">Paid</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Overdue">Overdue</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                                    >
                                        Save Changes
                                    </button>
                                </form>
                            ) : (
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-3xl bg-slate-950/80 p-5">
                                        <p className="text-sm text-slate-400">Roll Number</p>
                                        <p className="mt-2 text-white">{profile.rollNumber}</p>
                                    </div>
                                    <div className="rounded-3xl bg-slate-950/80 p-5">
                                        <p className="text-sm text-slate-400">Year</p>
                                        <p className="mt-2 text-white">{profile.year}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;