const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true
    },

    date: {
        type: String,
        default: new Date().toDateString()
    }

});

module.exports = mongoose.model("Attendance", attendanceSchema);