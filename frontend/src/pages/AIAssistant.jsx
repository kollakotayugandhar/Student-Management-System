import { useState } from "react";
import { FaPaperPlane, FaRobot } from "react-icons/fa";
import api from "../api/axios";

const initialMessages = [
    {
        id: 1,
        role: "assistant",
        content: "Hello! I'm your AI assistant. Ask me about students, attendance, results, or school operations."
    }
];

function AIAssistant() {
    const [messages, setMessages] = useState(initialMessages);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const getMockResponse = (text) => {
        const normalized = text.toLowerCase();

        if (normalized.includes("attendance")) {
            return "Attendance is up to date. You can mark today's attendance and review absent students from the dashboard.";
        }
        if (normalized.includes("student") || normalized.includes("students")) {
            return "You can search student records by name, ID, class, or performance status. Let me know which student details you need.";
        }
        if (normalized.includes("result")) {
            return "Results are available for the current semester. You can view grades, averages, and exam summaries by student or class.";
        }
        if (normalized.includes("fees")) {
            return "Fee status and payment history are tracked per student. Let me know if you'd like the latest unpaid list or payment summary.";
        }
        if (normalized.includes("events")) {
            return "Events are scheduled in the events section. I can help you find upcoming workshops, exams, or campus activities.";
        }
        return "I can help you with student management tasks like attendance, results, fees, and events. Try asking a more specific question.";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = query.trim();
        if (!text) return;

        const userMessage = {
            id: Date.now(),
            role: "user",
            content: text
        };

        setMessages((prev) => [...prev, userMessage]);
        setQuery("");
        setLoading(true);

        try {
            const res = await api.post("/ai/gemini", { prompt: text });
            const assistantText = res.data?.output || "No response from AI.";

            const assistantMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content: assistantText
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (err) {
            console.error(err);
            const assistantMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content: "Error contacting AI service. Using local fallback: " + getMockResponse(text)
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 lg:p-10">
            <div className="mx-auto flex max-w-6xl flex-col gap-8">
                <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">AI Assistant</p>
                            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Chat with the school assistant</h1>
                            <p className="mt-4 max-w-2xl text-slate-300 sm:text-lg">
                                Ask anything about student records, attendance, results, or campus management and receive instant guidance.
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-200 shadow-lg shadow-cyan-500/10">
                            <FaRobot className="h-6 w-6 text-cyan-300" />
                            AI Chat Ready
                        </div>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-[0.9fr_0.55fr]">
                    <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`rounded-3xl p-4 ${
                                        message.role === "user"
                                            ? "bg-cyan-500/10 text-cyan-100 self-end ml-auto"
                                            : "bg-slate-800/80 text-slate-100"
                                    }`}
                                >
                                    <div className="flex items-center gap-3 text-sm text-slate-400 mb-2">
                                        <span className="font-semibold">{message.role === "user" ? "You" : "Assistant"}</span>
                                        <span>{message.role === "user" ? "Just now" : "AI"}</span>
                                    </div>
                                    <p className="whitespace-pre-line text-sm leading-6">{message.content}</p>
                                </div>
                            ))}
                            {loading && (
                                <div className="rounded-3xl bg-slate-800/80 p-4 text-slate-300">
                                    Typing response...
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-slate-950/90 p-4 shadow-inner shadow-slate-950/20 sm:flex-row">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ask the AI assistant..."
                                className="min-h-[54px] flex-1 rounded-2xl border border-slate-800 bg-slate-900 px-4 text-white outline-none transition focus:border-cyan-400"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-6 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <FaPaperPlane className="h-4 w-4" />
                                Send
                            </button>
                        </form>
                    </div>

                    <aside className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                        <div>
                            <h2 className="text-xl font-semibold text-white">Quick Tips</h2>
                            <p className="mt-2 text-sm text-slate-400">Ask the assistant to help with these tasks:</p>
                        </div>
                        <div className="grid gap-3">
                            <button
                                type="button"
                                onClick={() => setQuery("Show me today's attendance summary")}
                                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/10"
                            >
                                Today's attendance summary
                            </button>
                            <button
                                type="button"
                                onClick={() => setQuery("Find student details for John Doe")}
                                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/10"
                            >
                                Find student details
                            </button>
                            <button
                                type="button"
                                onClick={() => setQuery("What exams are scheduled this month?")}
                                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/10"
                            >
                                Upcoming exams
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default AIAssistant;