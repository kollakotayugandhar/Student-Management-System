const Result = require("../models/Result");

const createResult = async (req, res) => {

    try {

        const { studentName, marks } = req.body;

        let grade = "Fail";

        if (marks >= 80) grade = "A";
        else if (marks >= 60) grade = "B";
        else if (marks >= 40) grade = "C";

        const result =
            await Result.create({
                studentName,
                marks,
                grade
            });

        res.json(result);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getResults = async (req, res) => {

    const results =
        await Result.find();

    res.json(results);

};

module.exports = {
    createResult,
    getResults
};