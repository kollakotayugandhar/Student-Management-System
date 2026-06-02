const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    studentId:{
        type:String,
        unique:true
    },

    name:{
        type:String,
        required:true
    },

    rollNumber:{
        type:String,
        required:true
    },

    course:{
        type:String,
        required:true
    },

    year:{
        type:Number,
        required:true
    },

    phone:String,

    address:String,

    photo:String,

    feesTotal:{
        type:Number,
        default:0
    },

    feesPaid:{
        type:Number,
        default:0
    }

},{timestamps:true});

module.exports = mongoose.model("Student", studentSchema);