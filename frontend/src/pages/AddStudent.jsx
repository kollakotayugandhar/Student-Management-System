import { useState, useEffect } from "react";
import api from "../api/axios";

function AddStudent() {

    const [userRole, setUserRole] = useState("");
    const [student, setStudent] = useState({
        name: "",
        rollNumber: "",
        course: "",
        year: "",
        photo: "",
        feesTotal: 0,
        feesPaid: 0
    });

    const handleChange = (e) => {

        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });

    };

    useEffect(() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            setUserRole(storedUser?.role || "");
        } catch {
            setUserRole("");
        }
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (userRole !== "admin") {
            alert("Only admin users can add students.");
            return;
        }

        try {

            const response = await api.post(
                "/students",
                student
            );

            console.log(response.data);

            alert("Student Added Successfully");

            setStudent({
                name: "",
                rollNumber: "",
                course: "",
                year: "",
                photo: "",
                feesTotal: 0,
                feesPaid: 0
            });

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Error adding student"
            );

        }

    };

    const feesDue = Math.max(0, student.feesTotal - student.feesPaid);

    return (

        <div className="min-h-screen bg-slate-950 text-white p-6 lg:p-10">

            <div className="mb-4 rounded-[2rem] border border-amber-500/10 bg-slate-900/80 p-6 text-yellow-200 shadow-lg shadow-amber-500/10">
                <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">Access</p>
                <p className="mt-3 text-base">Your account role: <span className="font-semibold text-white">{userRole || "Unknown"}</span></p>
                {userRole !== "admin" ? (
                    <p className="mt-2 text-sm text-slate-400">Only admin users can create new student records. Please login as an admin or register with admin access.</p>
                ) : (
                    <p className="mt-2 text-sm text-slate-400">You have admin access and can add new student records.</p>
                )}
            </div>

            <div className="mb-8 rounded-[2rem] border border-cyan-500/10 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">New student</p>
                        <h1 className="mt-2 text-4xl font-bold text-white">Add a student record</h1>
                        <p className="mt-3 max-w-2xl text-slate-400">Capture student details, upload a photo URL, and manage fee information with a clean and modern form.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setStudent({
                            name: "",
                            rollNumber: "",
                            course: "",
                            year: "",
                            phone: "",
                            address: "",
                            photo: "",
                            feesTotal: 0,
                            feesPaid: 0
                        })}
                        className="inline-flex items-center justify-center rounded-3xl bg-slate-950/80 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-slate-900"
                    >
                        Reset form
                    </button>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20"
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        <input
                            type="text"
                            name="name"
                            placeholder="Student Name"
                            value={student.name}
                            onChange={handleChange}
                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-4 text-sm text-white outline-none transition focus:border-cyan-400"
                            required
                        />
                        <input
                            type="text"
                            name="rollNumber"
                            placeholder="Roll Number"
                            value={student.rollNumber}
                            onChange={handleChange}
                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-4 text-sm text-white outline-none transition focus:border-cyan-400"
                            required
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <select
                            name="course"
                            value={student.course}
                            onChange={handleChange}
                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-4 text-sm text-white outline-none transition focus:border-cyan-400"
                            required
                        >
                            <option value="" disabled>Select Course</option>
                            <option value="MCA">MCA</option>
                            <option value="BCA">BCA</option>
                            <option value="B.Tech">B.Tech</option>
                            <option value="MBA">MBA</option>
                        </select>
                        <select
                            name="year"
                            value={student.year}
                            onChange={handleChange}
                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-4 text-sm text-white outline-none transition focus:border-cyan-400"
                            required
                        >
                            <option value="" disabled>Select Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                        </select>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={student.phone}
                            onChange={handleChange}
                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-4 text-sm text-white outline-none transition focus:border-cyan-400"
                        />
                        <input
                            type="text"
                            name="photo"
                            placeholder="Photo URL"
                            value={student.photo}
                            onChange={handleChange}
                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-4 text-sm text-white outline-none transition focus:border-cyan-400"
                        />
                    </div>

                    <textarea
                        name="address"
                        placeholder="Address"
                        value={student.address}
                        onChange={handleChange}
                        className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-4 text-sm text-white outline-none transition focus:border-cyan-400"
                        rows={4}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <input
                            type="number"
                            name="feesTotal"
                            placeholder="Total Fees"
                            value={student.feesTotal}
                            onChange={handleChange}
                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-4 text-sm text-white outline-none transition focus:border-cyan-400"
                            min="0"
                        />
                        <input
                            type="number"
                            name="feesPaid"
                            placeholder="Fees Paid"
                            value={student.feesPaid}
                            onChange={handleChange}
                            className="w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-4 text-sm text-white outline-none transition focus:border-cyan-400"
                            min="0"
                        />
                    </div>

                    <div className="mt-2 rounded-3xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-4 text-sm text-cyan-100">
                        Fees due: <span className="font-semibold text-white">₹{feesDue}</span>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-3xl bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] hover:from-cyan-400 hover:to-sky-400"
                    >
                        Add Student
                    </button>
                </form>

                <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="grid h-28 w-28 place-items-center rounded-full bg-slate-950/90 text-3xl font-bold text-cyan-300">
                            {student.photo ? (
                                <img
                                    src={student.photo}
                                    alt="Preview"
                                    className="h-28 w-28 rounded-full object-cover"
                                />
                            ) : (
                                <span>{student.name ? student.name.slice(0, 2).toUpperCase() : "ST"}</span>
                            )}
                        </div>
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Live preview</p>
                            <h2 className="text-2xl font-semibold text-white">Student card</h2>
                        </div>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5 space-y-4">
                        <div className="flex items-center justify-between text-sm text-slate-400">
                            <span>Name</span>
                            <span className="font-semibold text-white">{student.name || "Not set"}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-400">
                            <span>Roll</span>
                            <span className="font-semibold text-white">{student.rollNumber || "Not set"}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-400">
                            <span>Course</span>
                            <span className="font-semibold text-white">{student.course || "Not set"}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-400">
                            <span>Year</span>
                            <span className="font-semibold text-white">{student.year || "Not set"}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-400">
                            <span>Phone</span>
                            <span className="font-semibold text-white">{student.phone || "Not set"}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>

    );

}

export default AddStudent;