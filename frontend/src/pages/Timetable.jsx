function Timetable() {

    return (

        <div className="min-h-screen bg-slate-950 text-white p-10">

            <h1 className="text-4xl font-bold text-cyan-400 mb-10">
                Class Timetable
            </h1>

            <table className="w-full bg-white/10 rounded-2xl overflow-hidden">

                <thead className="bg-cyan-500">

                    <tr>

                        <th className="p-4">
                            Day
                        </th>

                        <th className="p-4">
                            Subject
                        </th>

                        <th className="p-4">
                            Time
                        </th>

                        <th className="p-4">
                            Faculty
                        </th>

                    </tr>

                </thead>

                <tbody>

                    <tr className="border-b border-white/10">

                        <td className="p-4">
                            Monday
                        </td>

                        <td className="p-4">
                            Java
                        </td>

                        <td className="p-4">
                            10 AM - 12 PM
                        </td>

                        <td className="p-4">
                            Ramesh Sir
                        </td>

                    </tr>

                    <tr className="border-b border-white/10">

                        <td className="p-4">
                            Tuesday
                        </td>

                        <td className="p-4">
                            DBMS
                        </td>

                        <td className="p-4">
                            1 PM - 3 PM
                        </td>

                        <td className="p-4">
                            Suresh Sir
                        </td>

                    </tr>

                    <tr>

                        <td className="p-4">
                            Wednesday
                        </td>

                        <td className="p-4">
                            React
                        </td>

                        <td className="p-4">
                            9 AM - 11 AM
                        </td>

                        <td className="p-4">
                            Priya Madam
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

}

export default Timetable;