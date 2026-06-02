import { useMemo, useState } from "react";

const students = [
    {
        id: 1,
        name: "Rahul Sharma",
        rollNumber: "MCA101",
        course: "MCA",
        year: "1st Year",
        branch: "Computer Science",
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        validUntil: "May 2027",
    },
    {
        id: 2,
        name: "Sneha Patel",
        rollNumber: "BCA204",
        course: "BCA",
        year: "2nd Year",
        branch: "Information Technology",
        photo: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80",
        validUntil: "May 2027",
    },
    {
        id: 3,
        name: "Amit Kumar",
        rollNumber: "MBA308",
        course: "MBA",
        year: "3rd Year",
        branch: "Business Management",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
        validUntil: "May 2027",
    },
];

function IDCard() {
    const [selectedId, setSelectedId] = useState(students[0].id);
    const [search, setSearch] = useState("");

    const selectedStudent = useMemo(
        () => students.find((student) => student.id === selectedId) || students[0],
        [selectedId]
    );

    const visibleStudents = useMemo(
        () =>
            students.filter((student) =>
                student.name.toLowerCase().includes(search.toLowerCase()) ||
                student.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
                student.course.toLowerCase().includes(search.toLowerCase())
            ),
        [search]
    );

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-10">
            <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[0.9fr_1.1fr]">
                <section className="space-y-6 rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Student ID Cards</p>
                        <h1 className="mt-3 text-4xl font-bold text-white">Generate College ID Cards</h1>
                        <p className="mt-3 text-slate-300">
                            Choose a student, preview their ID card, and print it instantly for campus access.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search students by name or roll number"
                            className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-cyan-400"
                        />
                    </div>

                    <div className="grid gap-4">
                        {visibleStudents.map((student) => (
                            <button
                                key={student.id}
                                onClick={() => setSelectedId(student.id)}
                                className={`group flex items-center gap-4 rounded-3xl border p-4 text-left transition ${
                                    student.id === selectedId
                                        ? "border-cyan-400 bg-cyan-500/10"
                                        : "border-white/10 bg-slate-950/80 hover:border-cyan-400 hover:bg-slate-900/90"
                                }`}
                            >
                                <img
                                    src={student.photo}
                                    alt={student.name}
                                    className="h-16 w-16 rounded-full object-cover ring-2 ring-white/10"
                                />
                                <div>
                                    <p className="text-lg font-semibold text-white">{student.name}</p>
                                    <p className="text-sm text-slate-400">{student.rollNumber}</p>
                                    <p className="mt-1 text-sm text-slate-400">{student.course} • {student.year}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="print:id-card rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/30">
                    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-slate-950/40 print:bg-white print:text-slate-950">
                        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6 text-white print:text-slate-950">
                            <div>
                                <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80">Campus ID</p>
                                <h2 className="mt-3 text-2xl font-bold">EduTrack College</h2>
                            </div>
                            <div className="inline-flex flex-col items-end gap-1 rounded-3xl bg-white/5 px-4 py-2 text-right text-sm text-slate-300 print:bg-transparent print:text-slate-950">
                                <span>Valid Until</span>
                                <span className="font-semibold text-cyan-300 print:text-slate-950">{selectedStudent.validUntil}</span>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_0.75fr]">
                            <div className="space-y-5">
                                <div className="rounded-3xl bg-slate-950/80 p-5 shadow-inner shadow-slate-950/20">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={selectedStudent.photo}
                                            alt={selectedStudent.name}
                                            className="h-28 w-28 rounded-3xl object-cover ring-4 ring-cyan-400/20"
                                        />
                                        <div>
                                            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Student Name</p>
                                            <p className="mt-2 text-2xl font-semibold text-white">{selectedStudent.name}</p>
                                            <p className="mt-2 text-sm text-slate-300">{selectedStudent.branch}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-300">
                                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Roll Number</p>
                                        <p className="mt-2 text-lg font-semibold text-white">{selectedStudent.rollNumber}</p>
                                    </div>
                                    <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-300">
                                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Course</p>
                                        <p className="mt-2 text-lg font-semibold text-white">{selectedStudent.course}</p>
                                    </div>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-300">
                                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Year</p>
                                        <p className="mt-2 text-lg font-semibold text-white">{selectedStudent.year}</p>
                                    </div>
                                    <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-300">
                                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Branch</p>
                                        <p className="mt-2 text-lg font-semibold text-white">{selectedStudent.branch}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-300 shadow-inner shadow-slate-950/20">
                                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">ID Tag</p>
                                <div className="mt-4 rounded-3xl bg-white/5 p-6 text-center">
                                    <div className="mx-auto mb-4 h-32 w-32 rounded-3xl bg-white/10" />
                                    <p className="text-base font-semibold text-white">{selectedStudent.rollNumber}</p>
                                    <p className="mt-2 text-sm text-slate-400">College Access Card</p>
                                </div>
                                <div className="mt-6 space-y-3">
                                    <div className="rounded-3xl bg-slate-950/90 p-4">
                                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Issue Date</p>
                                        <p className="mt-2 text-white">{new Date().toLocaleDateString()}</p>
                                    </div>
                                    <div className="rounded-3xl bg-slate-950/90 p-4">
                                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Campus</p>
                                        <p className="mt-2 text-white">EduTrack Campus</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                        >
                            Print ID Card
                        </button>
                        <button
                            className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            Save as PDF
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default IDCard;