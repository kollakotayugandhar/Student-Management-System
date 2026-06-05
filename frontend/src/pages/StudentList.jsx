import { useEffect, useState } from "react";
import api from "../api/axios";
import { CSVLink } from "react-csv";
import { FaEdit, FaTrash } from "react-icons/fa";

const getAvatarUrl = (student) => {
    const seed = student.name || student.rollNumber || "student";
    return student.photo
        ? student.photo
        : `https://api.dicebear.com/6.x/pixel-art/svg?seed=${encodeURIComponent(seed)}&backgroundColor=111827`;
};


function StudentList() {


const [students, setStudents] = useState([]);
const [filteredStudents, setFilteredStudents] = useState([]);
const [user, setUser] = useState(null);

const [searchName, setSearchName] = useState("");
const [searchRoll, setSearchRoll] = useState("");
const [courseFilter, setCourseFilter] = useState("");

const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedStudent, setSelectedStudent] = useState(null);

const isAdmin = user?.role === "admin";

const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    course: "",
    year: ""
});

useEffect(() => {
    fetchStudents();

    try {
        const raw = localStorage.getItem("user");
        setUser(raw ? JSON.parse(raw) : null);
    } catch {
        setUser(null);
    }
}, []);

const fetchStudents = async () => {

    try {

        const response = await api.get("/students");

        setStudents(response.data);
        setFilteredStudents(response.data);

    } catch (error) {

        console.log(error);

    }

};

useEffect(() => {

    let result = students;

    if (searchName) {

        result = result.filter((student) =>
            student.name
                .toLowerCase()
                .includes(searchName.toLowerCase())
        );

    }

    if (searchRoll) {

        result = result.filter((student) =>
            student.rollNumber
                .toLowerCase()
                .includes(searchRoll.toLowerCase())
        );

    }

    if (courseFilter) {

        result = result.filter(
            (student) => student.course === courseFilter
        );

    }

    setFilteredStudents(result);

}, [searchName, searchRoll, courseFilter, students]);

const deleteStudent = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {

        await api.delete(`/students/${id}`);

        fetchStudents();

    } catch (error) {

        console.log(error);

    }

};

const openEditModal = (student) => {

    setSelectedStudent(student);

    setFormData({
        name: student.name,
        rollNumber: student.rollNumber,
        course: student.course,
        year: student.year
    });

    setIsModalOpen(true);

};

const handleUpdate = async () => {

    try {

        await api.put(
            `/students/${selectedStudent._id}`,
            formData
        );

        setIsModalOpen(false);

        fetchStudents();

    } catch (error) {

        console.log(error);

    }

};

const csvData = filteredStudents.map((student) => ({
    Name: student.name,
    RollNumber: student.rollNumber,
    Course: student.course,
    Year: student.year
}));

return (

    <div className="min-h-screen bg-slate-950 text-white p-6 lg:p-10">

        <div className="mb-8 rounded-[2rem] border border-cyan-500/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70">Students</p>
                    <h1 className="mt-3 text-4xl font-bold text-white">Student Directory</h1>
                    <p className="mt-2 max-w-2xl text-slate-400">Search, export, and manage student records with a clean and responsive table layout.</p>
                </div>
                <div className="inline-flex items-center gap-3">
                    <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">Total: {filteredStudents.length}</span>
                    <CSVLink
                        data={csvData}
                        filename={"students.csv"}
                        className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                    >
                        Export CSV
                    </CSVLink>
                </div>
            </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">

            <input
                type="text"
                placeholder="Search by Name"
                value={searchName}
                onChange={(e) =>
                    setSearchName(e.target.value)
                }
                className="p-3 rounded-xl bg-slate-900 border border-cyan-400"
            />

            <input
                type="text"
                placeholder="Search by Roll Number"
                value={searchRoll}
                onChange={(e) =>
                    setSearchRoll(e.target.value)
                }
                className="p-3 rounded-xl bg-slate-900 border border-cyan-400"
            />

            <select
                value={courseFilter}
                onChange={(e) =>
                    setCourseFilter(e.target.value)
                }
                className="p-3 rounded-xl bg-slate-900 border border-cyan-400"
            >
                <option value="">All Courses</option>
                <option value="MCA">MCA</option>
                <option value="BCA">BCA</option>
                <option value="B.Tech">B.Tech</option>
                <option value="MBA">MBA</option>
            </select>

        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-2xl shadow-slate-950/20">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10">
                    <thead className="bg-slate-950/90 text-left text-sm uppercase tracking-[0.2em] text-slate-400">
                        <tr>
                            <th className="px-5 py-4">#</th>
                            <th className="px-5 py-4">Photo</th>
                            <th className="px-5 py-4">Name</th>
                            <th className="px-5 py-4">Roll</th>
                            <th className="px-5 py-4">Course</th>
                            <th className="px-5 py-4">Year</th>
                            <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 bg-slate-950/80 text-sm text-slate-200">
                        {filteredStudents.map((student, index) => (
                            <tr key={student._id} className="transition hover:bg-slate-900/70">
                                <td className="px-5 py-4 font-medium text-cyan-300">{index + 1}</td>
                                <td className="px-5 py-4">
                                    <img
                                        src={getAvatarUrl(student)}
                                        alt={student.name || student.rollNumber}
                                        className="h-12 w-12 rounded-full border border-white/10 object-cover"
                                    />
                                </td>
                                <td className="px-5 py-4">
                                    <div className="font-semibold text-white">{student.name}</div>
                                    <div className="text-xs text-slate-500">{student.email || "No email"}</div>
                                </td>
                                <td className="px-5 py-4">{student.rollNumber}</td>
                                <td className="px-5 py-4">
                                    <span className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">{student.course || "N/A"}</span>
                                </td>
                                <td className="px-5 py-4">{student.year || "-"}</td>
                                <td className="px-5 py-4 text-right">
                                    {isAdmin ? (
                                        <>
                                            <button
                                                onClick={() => openEditModal(student)}
                                                className="inline-flex items-center justify-center rounded-2xl bg-amber-500 px-3 py-2 text-slate-950 transition hover:bg-amber-400"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => deleteStudent(student._id)}
                                                className="ml-2 inline-flex items-center justify-center rounded-2xl bg-rose-500 px-3 py-2 text-slate-950 transition hover:bg-rose-400"
                                            >
                                                <FaTrash />
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">View only</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {isModalOpen && (

            <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">

                <div className="bg-slate-900 p-6 rounded-xl w-96">

                    <h2 className="text-xl mb-4">
                        Edit Student
                    </h2>

                    <input
                        className="w-full p-2 mb-2 bg-slate-800"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value
                            })
                        }
                    />

                    <input
                        className="w-full p-2 mb-2 bg-slate-800"
                        value={formData.rollNumber}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                rollNumber: e.target.value
                            })
                        }
                    />

                    <input
                        className="w-full p-2 mb-2 bg-slate-800"
                        value={formData.course}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                course: e.target.value
                            })
                        }
                    />

                    <input
                        className="w-full p-2 mb-4 bg-slate-800"
                        value={formData.year}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                year: e.target.value
                            })
                        }
                    />

                    <div className="flex justify-between">

                        <button
                            onClick={handleUpdate}
                            className="bg-green-500 px-4 py-2 rounded"
                        >
                            Update
                        </button>

                        <button
                            onClick={() =>
                                setIsModalOpen(false)
                            }
                            className="bg-red-500 px-4 py-2 rounded"
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            </div>

        )}

    </div>

);


}

export default StudentList;
