const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({

    studentName: String,
    marks: Number,
    grade: String

});

module.exports =
mongoose.model("Result", resultSchema);