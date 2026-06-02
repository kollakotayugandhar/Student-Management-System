const Student = require("../models/Student");

exports.createStudent = async(req,res)=>{

    try {

        const count = await Student.countDocuments();

        const student = await Student.create({
            ...req.body,
            studentId:`STU2026-${count+1}`
        });

        res.status(201).json(student);

    } catch (error) {

        res.status(500).json({
            message:error.message
        });

    }

};
exports.bulkCreateStudents = async(req,res)=>{

    try {

        const students = req.body;

        const formattedStudents = students.map((student,index)=>({
            ...student,
            studentId:`STU2026-${Date.now()+index}`
        }));

        const savedStudents = await Student.insertMany(formattedStudents);

        res.status(201).json(savedStudents);

    } catch (error) {

        res.status(500).json({
            message:error.message
        });

    }

};

exports.getStudents = async(req,res)=>{

    try {

        const {
            name,
            rollNumber,
            course
        } = req.query;

        let query = {};

        if(name){
            query.name = {
                $regex:name,
                $options:"i"
            };
        }

        if(rollNumber){
            query.rollNumber = rollNumber;
        }

        if(course){
            query.course = course;
        }

        const students = await Student.find(query);

        res.json(students);

    } catch (error) {

        res.status(500).json({
            message:error.message
        });

    }

};

exports.getSingleStudent = async(req,res)=>{

    const student = await Student.findById(req.params.id);

    res.json(student);
};

exports.updateStudent = async(req,res)=>{

    const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.json(student);
};

exports.deleteStudent = async(req,res)=>{

    await Student.findByIdAndDelete(req.params.id);

    res.json({
        message:"Student Deleted"
    });

};