import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";
function Results() {

const [studentName, setStudentName] = useState("");
const [marks, setMarks] = useState("");

const [results, setResults] = useState([]);
    const [user, setUser] = useState(null);
    const isAdmin = user?.role === "admin";

useEffect(() => {
    fetchResults();
    try {
        const raw = localStorage.getItem("user");
        setUser(raw ? JSON.parse(raw) : null);
    } catch {
        setUser(null);
    }
}, []);

const fetchResults = async () => {

    try {

        const res = await api.get("/results");

        setResults(res.data);

    } catch (error) {

        console.log(error);

    }

};

const submitResult = async (e) => {

    e.preventDefault();

    let grade = "";

    if (Number(marks) >= 90) {
        grade = "A+";
    } else if (Number(marks) >= 80) {
        grade = "A";
    } else if (Number(marks) >= 70) {
        grade = "B";
    } else if (Number(marks) >= 60) {
        grade = "C";
    } else if (Number(marks) >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }

        try {
            await api.post("/results", {
                studentName,
                marks: Number(marks),
                grade
            });

            setStudentName("");
            setMarks("");

            fetchResults();

        } catch (error) {

            console.log(error);

        }

};

return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

        <h1 className="text-4xl font-bold text-cyan-400 mb-8">
            Results Management
        </h1>

        {isAdmin ? (
            <form
                onSubmit={submitResult}
                className="space-y-4 mb-10 bg-white/10 p-6 rounded-xl"
            >

                <input
                    type="text"
                    placeholder="Student Name"
                    value={studentName}
                    onChange={(e) =>
                        setStudentName(e.target.value)
                    }
                    className="w-full p-3 rounded bg-slate-900"
                    required
                />

                <input
                    type="number"
                    placeholder="Marks"
                    value={marks}
                    onChange={(e) =>
                        setMarks(e.target.value)
                    }
                    className="w-full p-3 rounded bg-slate-900"
                    required
                />

                <button
                    type="submit"
                    className="bg-cyan-500 px-6 py-3 rounded hover:bg-cyan-600"
                >
                    Save Result
                </button>

            </form>
        ) : (
            <div className="space-y-4 mb-10 bg-white/5 p-6 rounded-xl text-slate-300">
                <p className="font-semibold">Student view</p>
                <p>Results are visible below; adding results is restricted to admins.</p>
            </div>
        )}

        <table className="w-full bg-white/10 rounded-xl overflow-hidden">

            <thead>

                <tr className="bg-cyan-500">

                    <th className="p-3">
                        Student Name
                    </th>

                    <th className="p-3">
                        Marks
                    </th>

                    <th className="p-3">
                        Grade
                    </th>

                </tr>

            </thead>

            <tbody>

                {(isAdmin ? results : results.filter(r => user && user.name && r.studentName && r.studentName.toLowerCase().includes(user.name.toLowerCase())))
                    .map((item) => (

                    <tr
                        key={item._id}
                        className="border-b border-white/10"
                    >

                        <td className="p-3">
                            {item.studentName}
                        </td>

                        <td className="p-3">
                            {item.marks}
                        </td>

                        <td className="p-3 font-bold">

                            {item.grade === "A+" && (
                                <span className="text-green-400">
                                    A+
                                </span>
                            )}

                            {item.grade === "A" && (
                                <span className="text-green-300">
                                    A
                                </span>
                            )}

                            {item.grade === "B" && (
                                <span className="text-yellow-400">
                                    B
                                </span>
                            )}

                            {item.grade === "C" && (
                                <span className="text-orange-400">
                                    C
                                </span>
                            )}

                            {item.grade === "D" && (
                                <span className="text-pink-400">
                                    D
                                </span>
                            )}

                            {item.grade === "F" && (
                                <span className="text-red-500">
                                    F
                                </span>
                            )}

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    </div>

);


}

export default Results;

