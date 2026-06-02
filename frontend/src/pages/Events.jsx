import { useMemo, useState } from "react";

const initialEvents = [
    {
        id: 1,
        title: "Hackathon",
        date: "2026-06-15",
        category: "Tech",
        location: "Auditorium",
        description: "Build innovative projects in 24 hours with peers and mentors.",
    },
    {
        id: 2,
        title: "Technical Fest",
        date: "2026-07-02",
        category: "Festival",
        location: "College Grounds",
        description: "A celebration of student talent with workshops, competitions, and exhibitions.",
    },
    {
        id: 3,
        title: "Placement Drive",
        date: "2026-08-10",
        category: "Placement",
        location: "Conference Hall",
        description: "Top recruiters visit campus for placement interviews and offer letters.",
    },
];

function Events() {
    const [events, setEvents] = useState(initialEvents);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        category: "",
        location: "",
        description: "",
    });
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const upcomingCount = useMemo(
        () => events.filter((event) => new Date(event.date) >= new Date()).length,
        [events]
    );
    const pastCount = useMemo(
        () => events.filter((event) => new Date(event.date) < new Date()).length,
        [events]
    );

    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const matchesSearch =
                event.title.toLowerCase().includes(search.toLowerCase()) ||
                event.location.toLowerCase().includes(search.toLowerCase()) ||
                event.description.toLowerCase().includes(search.toLowerCase());

            const matchesCategory = categoryFilter
                ? event.category === categoryFilter
                : true;

            return matchesSearch && matchesCategory;
        });
    }, [events, search, categoryFilter]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddEvent = (e) => {
        e.preventDefault();
        const newEvent = {
            id: Date.now(),
            title: formData.title.trim(),
            date: formData.date,
            category: formData.category.trim() || "General",
            location: formData.location.trim() || "Campus",
            description: formData.description.trim(),
        };

        if (!newEvent.title || !newEvent.date) {
            alert("Please add a title and date for the event.");
            return;
        }

        setEvents((prev) => [newEvent, ...prev]);
        setFormData({ title: "", date: "", category: "", location: "", description: "" });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6 lg:p-10">
            <div className="mx-auto max-w-7xl space-y-8">
                <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">College Events</p>
                            <h1 className="mt-3 text-4xl font-bold text-white">Upgraded Event Management</h1>
                            <p className="mt-3 max-w-2xl text-slate-300">
                                Add new events, filter by category, and keep every student informed with a polished event dashboard.
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-200 shadow-lg shadow-cyan-500/10">
                            <span className="text-sm font-semibold">Upcoming</span>
                            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-300">{upcomingCount}</span>
                            <span className="text-sm font-semibold">Past</span>
                            <span className="rounded-full bg-rose-500/20 px-3 py-1 text-rose-300">{pastCount}</span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-[0.75fr_0.55fr]">
                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-white">Manage Events</h2>
                                <p className="mt-2 text-slate-400">Create new campus events and keep the schedule updated.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                <button
                                    onClick={() => setCategoryFilter("")}
                                    className={`rounded-2xl px-4 py-3 text-sm ${categoryFilter === "" ? "bg-cyan-500 text-slate-950" : "bg-white/5 text-slate-200 hover:bg-white/10"}`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setCategoryFilter("Tech")}
                                    className={`rounded-2xl px-4 py-3 text-sm ${categoryFilter === "Tech" ? "bg-cyan-500 text-slate-950" : "bg-white/5 text-slate-200 hover:bg-white/10"}`}
                                >
                                    Tech
                                </button>
                                <button
                                    onClick={() => setCategoryFilter("Placement")}
                                    className={`rounded-2xl px-4 py-3 text-sm ${categoryFilter === "Placement" ? "bg-cyan-500 text-slate-950" : "bg-white/5 text-slate-200 hover:bg-white/10"}`}
                                >
                                    Placement
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search events"
                                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                            />
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                            >
                                <option value="">All Categories</option>
                                <option value="Tech">Tech</option>
                                <option value="Festival">Festival</option>
                                <option value="Placement">Placement</option>
                                <option value="General">General</option>
                            </select>
                        </div>

                        <div className="mt-8 space-y-4">
                            {filteredEvents.length === 0 ? (
                                <div className="rounded-3xl border border-dashed border-slate-700 p-8 text-center text-slate-400">
                                    No events found. Create a new event to start.
                                </div>
                            ) : (
                                filteredEvents.map((event) => {
                                    const isUpcoming = new Date(event.date) >= new Date();
                                    return (
                                        <div key={event.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-inner shadow-slate-950/20">
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                <div>
                                                    <h3 className="text-2xl font-semibold text-white">{event.title}</h3>
                                                    <p className="mt-2 text-slate-400">{event.description}</p>
                                                </div>
                                                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${isUpcoming ? "bg-emerald-500/20 text-emerald-200" : "bg-rose-500/20 text-rose-200"}`}>
                                                    {isUpcoming ? "Upcoming" : "Past"}
                                                </span>
                                            </div>
                                            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                                <div className="rounded-2xl bg-slate-900/80 p-4">
                                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Date</p>
                                                    <p className="mt-2 font-semibold text-white">{new Date(event.date).toLocaleDateString()}</p>
                                                </div>
                                                <div className="rounded-2xl bg-slate-900/80 p-4">
                                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Category</p>
                                                    <p className="mt-2 font-semibold text-white">{event.category}</p>
                                                </div>
                                                <div className="rounded-2xl bg-slate-900/80 p-4">
                                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Location</p>
                                                    <p className="mt-2 font-semibold text-white">{event.location}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                        <h2 className="text-2xl font-semibold text-white">Add College Event</h2>
                        <p className="mt-2 text-slate-400">Enter event details for students and staff.</p>

                        <form onSubmit={handleAddEvent} className="mt-6 space-y-4">
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Event title"
                                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                required
                            />
                            <input
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                required
                            />
                            <input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Location"
                                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                            />
                            <input
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Category (Tech, Placement, Festival)"
                                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                            />
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Description"
                                rows="4"
                                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none resize-none"
                            />
                            <button
                                type="submit"
                                className="w-full rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                            >
                                Add Event
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Events;