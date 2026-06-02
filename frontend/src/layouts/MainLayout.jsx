import { Link } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <div className="w-64 bg-slate-900 p-5">

        <h1 className="text-2xl font-bold text-cyan-400 mb-6">
          Student ERP
        </h1>

        <Link to="/home" className="block py-2">Home</Link>
        <Link to="/students" className="block py-2">Students</Link>
        <Link to="/add-student" className="block py-2">Add Student</Link>
        <Link to="/attendance" className="block py-2">Attendance</Link>
        <Link to="/results" className="block py-2">Results</Link>
        <Link to="/profile" className="block py-2">Profile</Link>
        <Link to="/settings" className="block py-2">Settings</Link>

      </div>

      <div className="flex-1 p-6">
        {children}
      </div>

    </div>
  );
}

export default MainLayout;