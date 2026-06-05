const fakeGemini = async (req, res) => {
    try {
        const { prompt } = req.body;

        // Basic safety and fallback
        if (!prompt || typeof prompt !== "string") {
            return res.status(400).json({ message: "Prompt is required" });
        }

        const normalized = prompt.trim().toLowerCase();

        // Simple heuristics to craft a helpful response
        let reply = "I can help with student management tasks. Ask me about attendance, results, fees, or placements.";

        if (normalized.includes("attendance")) {
            reply = "Attendance summary: you can view today's marks in the Attendance page. Admins can mark for all students; students can mark their own attendance.";
        } else if (normalized.includes("student") || normalized.includes("students")) {
            reply = "Student lookup: use the Students page to search by name, roll number, or course. Provide a name or roll number for details.";
        } else if (normalized.includes("result") || normalized.includes("grade")) {
            reply = "Results: open the Results page to view grades. Admins can add grades; students can view their own grades.";
        } else if (normalized.includes("fees")) {
            reply = "Fees: the Fees Management page shows totals, collected amounts and dues. Only admins can record payments.";
        } else if (normalized.includes("placement")) {
            reply = "Placement info: view placement records on the Placement page. Admins can add placement offers.";
        } else if (normalized.length < 40) {
            reply = `Quick answer: ${prompt} — I don't have external connectivity right now, so I respond using the local Gemini mock.`;
        } else {
            // echo with light transformation for longer prompts
            reply = `Response based on your prompt:\n\n"${prompt.slice(0, 400)}"\n\n(This is a local mock of the Gemini API for testing.)`;
        }

        // Return a Gemini-like structured response
        return res.json({
            id: Date.now().toString(),
            model: "gemini-fake-1.0",
            output: reply
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    fakeGemini
};
