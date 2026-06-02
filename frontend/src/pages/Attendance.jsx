import { useEffect, useState } from "react";
import api from "../api/axios";

function Attendance() {

const [students, setStudents] = useState([]);
const [attendance, setAttendance] = useState([]);

const [loading, setLoading] = useState(false);
const [selectedDate, setSelectedDate] = useState("");

useEffect(() => {
    fetchStudents();
    fetchAttendance();
}, []);

const fetchStudents = async () => {
    try {
        const res = await api.get("/students");
        setStudents(res.data);
    } catch (error) {
        console.log(error);
    }
};

const fetchAttendance = async () => {
    try {
        const res = await api.get("/attendance");
        setAttendance(res.data);
    } catch (error) {
        console.log(error);
    }
};

const isMarked = (studentId) => {
    return attendance.some(
        (a) =>
            a.studentId?._id === studentId &&
            new Date(a.date).toDateString() ===
            new Date().toDateString()
    );
};

const markAttendance = async (studentId, status) => {

    if (isMarked(studentId)) {
        alert("Attendance already marked today!");
        return;
    }

    try {

        setLoading(true);

        await api.post("/attendance", {
            studentId,
            status
        });

        await fetchAttendance();

        alert("Attendance Marked Successfully");

    } catch (error) {

        console.log(error);

    } finally {

        setLoading(false);

    }

};

const filteredAttendance = selectedDate
    ? attendance.filter(
          (item) =>
              new Date(item.date)
                  .toISOString()
                  .split("T")[0] === selectedDate
      )
    : attendance;

return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

        <h1 className="text-4xl font-bold text-cyan-400 mb-8">
            Attendance System
        </h1>

        {/* Student List */}

        <div className="grid gap-4">

            {students.map((student) => (

                <div
                    key={student._id}
                    className="bg-white/10 p-4 rounded-xl flex justify-between items-center"
                >

                    <div>

                        <h2 className="text-xl font-bold">
                            {student.name}
                        </h2>

                        <p className="text-sm text-gray-300">
                            {student.rollNumber}
                        </p>

                    </div>

                    <div className="flex gap-3">

                        <button
                            disabled={
                                loading ||
                                isMarked(student._id)
                            }
                            onClick={() =>
                                markAttendance(
                                    student._id,
                                    "Present"
                                )
                            }
                            className={`px-4 py-2 rounded ${
                                isMarked(student._id)
                                    ? "bg-gray-500"
                                    : "bg-green-500"
                            }`}
                        >
                            Present
                        </button>

                        <button
                            disabled={
                                loading ||
                                isMarked(student._id)
                            }
                            onClick={() =>
                                markAttendance(
                                    student._id,
                                    "Absent"
                                )
                            }
                            className={`px-4 py-2 rounded ${
                                isMarked(student._id)
                                    ? "bg-gray-500"
                                    : "bg-red-500"
                            }`}
                        >
                            Absent
                        </button>

                    </div>

                </div>

            ))}

        </div>

        {/* Attendance Records */}

        <div className="mt-10">

            <div className="flex justify-between items-center mb-4">

                <h2 className="text-2xl text-cyan-300">
                    Attendance Records
                </h2>

                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) =>
                        setSelectedDate(e.target.value)
                    }
                    className="bg-slate-900 border border-cyan-400 p-2 rounded"
                />

            </div>

            <table className="w-full bg-white/10 rounded-xl overflow-hidden">

                <thead className="bg-cyan-500">

                    <tr>

                        <th className="p-3">
                            Student
                        </th>

                        <th className="p-3">
                            Status
                        </th>

                        <th className="p-3">
                            Date
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {filteredAttendance.map((a) => (

                        <tr
                            key={a._id}
                            className="border-b border-white/10"
                        >

                            <td className="p-3">
                                {a.studentId?.name}
                            </td>

                            <td className="p-3">
                                {a.status}
                            </td>

                            <td className="p-3">
                                {new Date(
                                    a.date
                                ).toLocaleDateString()}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    </div>

);


}

export default Attendance;
