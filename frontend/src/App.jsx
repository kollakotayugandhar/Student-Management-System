
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import FeesManagement from "./pages/FeesManagement";
import Placement from "./pages/Placement";
import Events from "./pages/Events";
import AIAssistant from "./pages/AIAssistant";
import IDCard from "./pages/IDCard";
import Timetable from "./pages/Timetable";
import ActivityLogs from "./pages/ActivityLogs";
import AdminPanel from "./pages/AdminPanel";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import Attendance from "./pages/Attendance";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div key={location.pathname}>
            <Navbar />
            {children}
        </div>
    );
};

const AdminRoute = ({ children }) => {
    const location = useLocation();
    const token = localStorage.getItem("token");
    const rawUser = localStorage.getItem("user");
    const user = rawUser ? JSON.parse(rawUser) : null;

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!user || user.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div key={location.pathname}>
            <Navbar />
            {children}
        </div>
    );
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
                <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
                <Route path="/timetable" element={<ProtectedRoute><Timetable /></ProtectedRoute>} />
                <Route path="/activity-logs" element={<ProtectedRoute><ActivityLogs /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                <Route path="/feesmanagement" element={<ProtectedRoute><FeesManagement /></ProtectedRoute>} />
                <Route path="/placement" element={<ProtectedRoute><Placement /></ProtectedRoute>} />
                <Route path="/id-card" element={<ProtectedRoute><IDCard /></ProtectedRoute>} />
                <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
                <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
                <Route path="/admin-panel" element={<AdminRoute><AdminPanel /></AdminRoute>} />
                <Route path="/students" element={<ProtectedRoute><StudentList /></ProtectedRoute>} />
                <Route path="/add-student" element={<AdminRoute><AddStudent /></AdminRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
