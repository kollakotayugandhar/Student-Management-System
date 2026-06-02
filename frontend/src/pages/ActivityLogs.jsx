function ActivityLogs() {

    return (

        <div className="min-h-screen bg-slate-950 text-white p-10">

            <h1 className="text-4xl font-bold text-cyan-400 mb-10">
                Activity Logs
            </h1>

            <div className="space-y-5">

                <div className="bg-white/10 p-5 rounded-xl border border-white/20">

                    <p className="text-cyan-400 font-bold">
                        Admin Added Student
                    </p>

                    <p className="mt-2 text-gray-300">
                        Ravi Kumar added to MCA department
                    </p>

                    <p className="mt-2 text-sm text-gray-400">
                        10 minutes ago
                    </p>

                </div>

                <div className="bg-white/10 p-5 rounded-xl border border-white/20">

                    <p className="text-green-400 font-bold">
                        Attendance Updated
                    </p>

                    <p className="mt-2 text-gray-300">
                        Attendance marked for BCA students
                    </p>

                    <p className="mt-2 text-sm text-gray-400">
                        1 hour ago
                    </p>

                </div>

                <div className="bg-white/10 p-5 rounded-xl border border-white/20">

                    <p className="text-pink-400 font-bold">
                        Results Published
                    </p>

                    <p className="mt-2 text-gray-300">
                        Semester results uploaded successfully
                    </p>

                    <p className="mt-2 text-sm text-gray-400">
                        Yesterday
                    </p>

                </div>

            </div>

        </div>

    );

}

export default ActivityLogs;