import { useEffect, useState } from "react";
import api from "../api/axios";

import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function Analytics() {

    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const studentRes = await api.get("/students");
            const attRes = await api.get("/attendance");

            setStudents(studentRes.data);
            setAttendance(attRes.data);

        } catch (error) {
            console.log(error);
        }
    };

    // STUDENT DATA
    const courseData = [
        {
            name: "Total Students",
            value: students.length
        }
    ];

    // ATTENDANCE DATA
    const present = attendance.filter(a => a.status === "Present").length;
    const absent = attendance.filter(a => a.status === "Absent").length;

    const attendanceData = [
        { name: "Present", value: present },
        { name: "Absent", value: absent }
    ];

    const COLORS = ["#00C49F", "#FF4C4C"];

    return (
        <div className="min-h-screen bg-slate-950 text-white p-10">

            <h1 className="text-4xl font-bold text-cyan-400 mb-10">
                Analytics Dashboard
            </h1>

            {/* CARDS */}
            <div className="grid grid-cols-3 gap-6 mb-10">

                <div className="bg-white/10 p-6 rounded-xl">
                    <h2>Total Students</h2>
                    <p className="text-3xl text-cyan-400 font-bold">
                        {students.length}
                    </p>
                </div>

                <div className="bg-white/10 p-6 rounded-xl">
                    <h2>Present</h2>
                    <p className="text-3xl text-green-400 font-bold">
                        {present}
                    </p>
                </div>

                <div className="bg-white/10 p-6 rounded-xl">
                    <h2>Absent</h2>
                    <p className="text-3xl text-red-400 font-bold">
                        {absent}
                    </p>
                </div>

            </div>

            {/* CHARTS */}
            <div className="grid md:grid-cols-2 gap-10">

                {/* PIE CHART */}
                <div className="bg-white/10 p-6 rounded-xl">
                    <h2 className="mb-4 text-xl">Attendance Chart</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={attendanceData}
                                dataKey="value"
                                outerRadius={100}
                                label
                            >
                                {attendanceData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                </div>

                {/* BAR CHART */}
                <div className="bg-white/10 p-6 rounded-xl">
                    <h2 className="mb-4 text-xl">Student Overview</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={courseData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#00CFFF" />
                        </BarChart>
                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    );
}

export default Analytics;