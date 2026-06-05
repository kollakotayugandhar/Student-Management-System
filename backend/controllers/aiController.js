const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-3.5-turbo";

const getFakeGeminiResponse = async (prompt) => {
    const normalized = prompt.trim().toLowerCase();

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
        reply = `Response based on your prompt:\n\n"${prompt.slice(0, 400)}"\n\n(This is a local mock of the Gemini API for testing.)`;
    }

    return {
        id: Date.now().toString(),
        model: "gemini-fake-1.0",
        output: reply
    };
};

const getOpenAIResponse = async (prompt) => {
    if (!OPENAI_API_KEY) {
        throw new Error("OpenAI API key is not configured.");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant for a student management system. Provide concise, actionable replies about attendance, results, fees, placements, and student records."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 500
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI request failed: ${errorText}`);
    }

    const data = await response.json();
    return {
        id: data.id || Date.now().toString(),
        model: data.model || OPENAI_MODEL,
        output: data.choices?.[0]?.message?.content?.trim() || "No response from OpenAI."
    };
};

const aiAssistant = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || typeof prompt !== "string") {
            return res.status(400).json({ message: "Prompt is required" });
        }

        const provider = process.env.AI_PROVIDER?.toLowerCase() || (OPENAI_API_KEY ? "openai" : "fake");

        if (provider === "openai" && OPENAI_API_KEY) {
            const result = await getOpenAIResponse(prompt);
            return res.json(result);
        }

        const result = await getFakeGeminiResponse(prompt);
        return res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    aiAssistant
};
