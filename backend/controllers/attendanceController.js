const Attendance = require("../models/Attendance");

// MARK ATTENDANCE
const markAttendance = async (req, res) => {

    try {

        const { studentId, status } = req.body;

        const attendance = await Attendance.create({
            studentId,
            status
        });

        res.json(attendance);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL ATTENDANCE
const getAttendance = async (req, res) => {

    try {

        const data = await Attendance.find().populate("studentId");
        res.json(data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ATTENDANCE STATS (OPTIONAL)
const getAttendanceStats = async (req, res) => {

    try {

        const data = await Attendance.aggregate([
            {
                $group: {
                    _id: "$studentId",
                    total: { $sum: 1 },
                    present: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "Present"] }, 1, 0]
                        }
                    }
                }
            }
        ]);

        res.json(data);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    markAttendance,
    getAttendance,
    getAttendanceStats
};