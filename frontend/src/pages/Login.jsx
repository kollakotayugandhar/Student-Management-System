import { useState } from "react";

import { useNavigate } from "react-router-dom";
import api from "../api/axios";
function Login() {


const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {

    e.preventDefault();

    try {

        setLoading(true);

        const res = await api.post("/users/login", {
            email,
            password
        });
        

        console.log(res.data);

        localStorage.setItem("token", res.data.token);

        localStorage.setItem(
            "user",
            JSON.stringify(res.data.user)
        );

        alert("Login Successful");

        navigate("/home");

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Login Failed"
        );

    } finally {

        setLoading(false);

    }

};

return (

    <div className="min-h-screen flex justify-center items-center bg-slate-950">

        <form
            onSubmit={handleLogin}
            className="bg-white/10 p-8 rounded-xl w-96 text-white"
        >

            <h1 className="text-3xl mb-6 text-cyan-400 font-bold">
                Login
            </h1>

            <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-4 rounded bg-slate-900"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                required
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full p-3 mb-4 rounded bg-slate-900"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 p-3 rounded"
            >
                {loading
                    ? "Logging in..."
                    : "Login"}
            </button>

        </form>

    </div>

);


}

export default Login;
