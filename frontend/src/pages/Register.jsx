import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [adminCode, setAdminCode] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            console.log("Attempting registration with:", { name, email, role });
            console.log("API Base URL:", api.defaults.baseURL);

            const res = await api.post("/users/register", {
                name,
                email,
                password,
                role,
                adminCode
            });

            console.log("Registration Response:", res);
            console.log("Response Data:", res.data);

            alert("Registration Successful");
            navigate("/login");

        } catch (error) {
            console.error("Registration Error:", error);
            console.error("Error Status:", error.response?.status);
            console.error("Error Data:", error.response?.data);
            console.error("Error Message:", error.message);

            const errorMessage = 
                error.response?.data?.message || 
                error.message || 
                "Registration Failed";

            alert(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-slate-950">

            <form onSubmit={handleRegister} className="bg-white/10 p-8 rounded-xl w-96 text-white">

                <h1 className="text-3xl mb-6 text-cyan-400">Register</h1>

                <input
                    placeholder="Name"
                    className="w-full p-3 mb-4 rounded-3xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    placeholder="Email"
                    className="w-full p-3 mb-4 rounded-3xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-4 rounded-3xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="mb-4 rounded-3xl border border-slate-700 bg-slate-950/80 p-4">
                    <p className="mb-3 text-sm text-slate-400">Choose your account type</p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <label className="flex items-center gap-3 rounded-2xl border border-cyan-500/10 bg-slate-900 px-4 py-3 cursor-pointer text-sm transition hover:bg-slate-800">
                            <input
                                type="radio"
                                name="role"
                                value="student"
                                checked={role === "student"}
                                onChange={() => setRole("student")}
                                className="h-4 w-4 text-cyan-500"
                            />
                            Student
                        </label>
                        <label className="flex items-center gap-3 rounded-2xl border border-cyan-500/10 bg-slate-900 px-4 py-3 cursor-pointer text-sm transition hover:bg-slate-800">
                            <input
                                type="radio"
                                name="role"
                                value="admin"
                                checked={role === "admin"}
                                onChange={() => setRole("admin")}
                                className="h-4 w-4 text-cyan-500"
                            />
                            Admin
                        </label>
                    </div>
                </div>

                {role === "admin" && (
                    <input
                        type="password"
                        placeholder="Admin code"
                        className="w-full p-3 mb-4 rounded-3xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-400"
                        value={adminCode}
                        onChange={(e) => setAdminCode(e.target.value)}
                        required
                    />
                )}

                <button className="w-full rounded-3xl bg-gradient-to-r from-cyan-500 to-sky-500 p-3 text-white font-semibold transition hover:opacity-90">
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;
