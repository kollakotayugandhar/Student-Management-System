import { useEffect, useMemo, useState } from "react";
import { FaMoneyBillWave, FaCheckCircle, FaClock, FaPen } from "react-icons/fa";
import api from "../api/axios";

function FeesManagement() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [defaultFeeTotal, setDefaultFeeTotal] = useState(() => {
        const stored = localStorage.getItem("defaultFeeTotal");
        return stored ? Number(stored) : 100000;
    });
    const [feeTotalInput, setFeeTotalInput] = useState(() => {
        const stored = localStorage.getItem("defaultFeeTotal");
        return stored ? Number(stored) : 100000;
    });
    const isAdmin = user?.role === "admin";

    // For admins, show all students; for non-admins, show only fetched (already filtered) students
    const filteredStudents = students;

    const currentStudent = filteredStudents[0] || null;

    useEffect(() => {
        const raw = localStorage.getItem("user");
        const parsedUser = raw ? JSON.parse(raw) : null;
        setUser(parsedUser);
        fetchStudents(parsedUser);
    }, []);

    const handleDefaultFeeChange = () => {
        const value = Number(feeTotalInput);
        if (Number.isNaN(value) || value <= 0) {
            alert("Please enter a valid positive fee amount.");
            return;
        }

        setDefaultFeeTotal(value);
        localStorage.setItem("defaultFeeTotal", value.toString());
        alert("Default fee total updated for all students.");
    };

    const fetchStudents = async (currentUser = user) => {
        try {
            let url = "/students";

            if (currentUser && currentUser.role !== "admin") {
                const queryName = encodeURIComponent(currentUser.name || currentUser.email || "");
                if (queryName) {
                    url = `/students?name=${queryName}`;
                    console.log("Student fee page - Fetching student by name:", currentUser.name, "URL:", url);
                } else {
                    console.log("No name or email found for student user, cannot fetch.");
                    setStudents([]);
                    return;
                }
            }

            const response = await api.get(url);
            console.log("Student fee page - API response:", response.data);
            setStudents(response.data);
        } catch (error) {
            console.error("Student fee page - Error fetching students:", error);
        }
    };

    const summary = useMemo(() => {
        const source = isAdmin ? students : filteredStudents;
        const totalStudents = source.length;
        const totalFees = totalStudents * defaultFeeTotal;
        const totalPaid = source.reduce((sum, student) => sum + (student.feesPaid || 0), 0);
        const totalDue = Math.max(0, totalFees - totalPaid);
        const paidCount = source.filter((student) => (student.feesPaid || 0) >= defaultFeeTotal).length;
        const pendingCount = totalStudents - paidCount;

        return { totalStudents, totalFees, totalPaid, totalDue, paidCount, pendingCount };
    }, [students, defaultFeeTotal, filteredStudents, isAdmin]);

    const openPaymentModal = (student) => {
        setSelectedStudent(student);
        setPaymentAmount(Math.max(0, defaultFeeTotal - (student.feesPaid || 0)));
    };

    const closeModal = () => {
        setSelectedStudent(null);
        setPaymentAmount(0);
    };

    const handlePayment = async () => {
        if (!selectedStudent) return;
        const amount = Number(paymentAmount);
        const due = Math.max(0, defaultFeeTotal - (selectedStudent.feesPaid || 0));

        if (amount <= 0 || amount > due) {
            alert("Please enter a valid payment amount.");
            return;
        }

        setLoading(true);

        try {
            await api.put(`/students/${selectedStudent._id}`, {
                feesPaid: (selectedStudent.feesPaid || 0) + amount
            });
            await fetchStudents();
            closeModal();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Unable to update fees.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 lg:p-10">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Fees Management</p>
                            <h1 className="mt-3 text-4xl font-bold text-white">Manage every student fee record</h1>
                            <p className="mt-3 max-w-2xl text-slate-300">Track fees collected, pending balances, and record payments for every single student in one place.</p>
                        </div>
                        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-200 shadow-lg shadow-cyan-500/10">
                            <FaMoneyBillWave className="h-6 w-6 text-cyan-300" />
                            Total Students: {summary.totalStudents}
                        </div>
                    </div>
                </div>

                {isAdmin ? (
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Total Fees</p>
                            <p className="mt-4 text-4xl font-bold text-cyan-300">₹{summary.totalFees.toLocaleString()}</p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Collected</p>
                            <p className="mt-4 text-4xl font-bold text-green-400">₹{summary.totalPaid.toLocaleString()}</p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Pending</p>
                            <p className="mt-4 text-4xl font-bold text-red-400">₹{summary.totalDue.toLocaleString()}</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Remaining Fees</p>
                            <p className="mt-4 text-4xl font-bold text-red-400">₹{summary.totalDue.toLocaleString()}</p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Total Fees</p>
                            <p className="mt-4 text-4xl font-bold text-cyan-300">₹{summary.totalFees.toLocaleString()}</p>
                        </div>
                    </div>
                )}

                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-white">Student Fee Records</h2>
                            <p className="mt-2 text-slate-400">Review fee status, amount due, and record payments for each student.</p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex gap-3 text-sm text-slate-300">
                                <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-3 py-2">
                                    <FaCheckCircle className="text-green-400" /> Paid
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-3 py-2">
                                    <FaClock className="text-red-400" /> Pending
                                </span>
                            </div>
                            {isAdmin && (
                                <div className="rounded-3xl border border-cyan-500/20 bg-slate-950/80 p-4 text-slate-200">
                                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Default Fee Total</p>
                                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                                        <input
                                            type="number"
                                            min="0"
                                            value={feeTotalInput}
                                            onChange={(e) => setFeeTotalInput(e.target.value)}
                                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleDefaultFeeChange}
                                            className="rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full text-left text-sm text-slate-200">
                            <thead className="border-b border-slate-700 text-slate-300 bg-slate-950/90">
                                <tr>
                                    <th className="px-4 py-4">#</th>
                                    <th className="px-4 py-4">Photo</th>
                                    <th className="px-4 py-4">Name</th>
                                    <th className="px-4 py-4">Roll</th>
                                    <th className="px-4 py-4">Course</th>
                                    <th className="px-4 py-4">Total Fees</th>
                                    <th className="px-4 py-4">Paid</th>
                                    <th className="px-4 py-4">Due</th>
                                    <th className="px-4 py-4">Status</th>
                                    <th className="px-4 py-4">Action</th>
                                </tr>
                            </thead>
                                    <tbody>
                                {filteredStudents.length === 0 ? (
                                    <tr className="border-b border-slate-700">
                                        <td colSpan="10" className="px-4 py-6 text-center text-slate-400">
                                            {isAdmin ? (
                                                "No students found."
                                            ) : (
                                                <div>
                                                    <p className="font-medium">No fee records found for: <span className="text-cyan-300">{user?.name || user?.email || "Unknown"}</span></p>
                                                    <p className="mt-3 text-sm text-slate-400">Your student record needs to be created in the system first.</p>
                                                    <p className="mt-2 text-xs text-slate-500">Contact your admin to add you as a student, or ask an admin to create your student profile with your registered name.</p>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStudents.map((student, index) => {
                                        const total = defaultFeeTotal;
                                        const paid = student.feesPaid || 0;
                                        const due = Math.max(0, total - paid);
                                        const status = paid >= total ? "Paid" : "Pending";

                                        return (
                                            <tr key={student._id} className="border-b border-slate-700 hover:bg-slate-950/70">
                                                <td className="px-4 py-4">{index + 1}</td>
                                                <td className="px-4 py-4">
                                                    <img
                                                        src={student.photo || "https://via.placeholder.com/40"}
                                                        alt={student.name}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                </td>
                                                <td className="px-4 py-4 font-medium text-white">{student.name}</td>
                                                <td className="px-4 py-4">{student.rollNumber}</td>
                                                <td className="px-4 py-4">{student.course}</td>
                                                <td className="px-4 py-4">₹{total.toLocaleString()}</td>
                                                <td className="px-4 py-4 text-green-300">₹{paid.toLocaleString()}</td>
                                                <td className="px-4 py-4 text-red-300">₹{due.toLocaleString()}</td>
                                                <td className="px-4 py-4">
                                                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status === "Paid" ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"}`}>
                                                        {status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    {isAdmin ? (
                                                        <button
                                                            onClick={() => openPaymentModal(student)}
                                                            className="inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                                                        >
                                                            <FaPen />
                                                            Record
                                                        </button>
                                                    ) : (
                                                        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Admin only</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {selectedStudent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-xl rounded-3xl bg-slate-900 p-6 shadow-2xl shadow-slate-950/50">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-2xl font-semibold text-white">Record Payment</h3>
                                <p className="mt-2 text-sm text-slate-400">Pay fees for {selectedStudent.name}. Enter the amount that has been collected.</p>
                            </div>
                            <button onClick={closeModal} className="text-slate-300 hover:text-white">Close</button>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-3xl bg-slate-950/80 p-4">
                                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Total Fees</p>
                                <p className="mt-2 text-3xl font-semibold text-cyan-300">₹{defaultFeeTotal.toLocaleString()}</p>
                            </div>
                            <div className="rounded-3xl bg-slate-950/80 p-4">
                                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Amount Due</p>
                                <p className="mt-2 text-3xl font-semibold text-red-400">₹{Math.max(0, defaultFeeTotal - (selectedStudent.feesPaid || 0)).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            <label className="block text-sm font-semibold text-slate-200">Payment Amount</label>
                            <input
                                type="number"
                                min="0"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 p-4 text-white outline-none"
                            />
                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                                <button
                                    onClick={closeModal}
                                    className="rounded-3xl border border-white/10 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePayment}
                                    disabled={loading}
                                    className="rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
                                >
                                    {loading ? "Saving..." : "Save Payment"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FeesManagement;