import { useEffect, useState } from "react";

const defaultPreferences = {
    theme: "dark",
    notifications: {
        email: true,
        sms: false,
        alerts: true,
    },
    privacy: {
        showProfile: true,
        shareActivity: false,
    },
    security: {
        twoFactor: false,
        rememberDevice: true,
    },
};

function Settings() {
    const [preferences, setPreferences] = useState(defaultPreferences);
    const [passwordForm, setPasswordForm] = useState({ current: "", newPassword: "", confirmPassword: "" });
    const [saveStatus, setSaveStatus] = useState("");

    useEffect(() => {
        const stored = window.localStorage.getItem("eduSettings");
        if (stored) {
            setPreferences(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("eduSettings", JSON.stringify(preferences));
    }, [preferences]);

    const toggleTheme = () => {
        setPreferences((prev) => ({
            ...prev,
            theme: prev.theme === "dark" ? "light" : "dark",
        }));
    };

    const updateNotification = (key) => {
        setPreferences((prev) => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key],
            },
        }));
    };

    const updatePrivacy = (key) => {
        setPreferences((prev) => ({
            ...prev,
            privacy: {
                ...prev.privacy,
                [key]: !prev.privacy[key],
            },
        }));
    };

    const updateSecurity = (key) => {
        setPreferences((prev) => ({
            ...prev,
            security: {
                ...prev.security,
                [key]: !prev.security[key],
            },
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSavePassword = (e) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setSaveStatus("Passwords do not match.");
            return;
        }
        if (passwordForm.newPassword.length < 8) {
            setSaveStatus("Password must be at least 8 characters.");
            return;
        }
        setSaveStatus("Password updated successfully.");
        setPasswordForm({ current: "", newPassword: "", confirmPassword: "" });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
            <div className="mx-auto max-w-7xl space-y-8">
                <header className="rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
                    <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Settings</p>
                    <h1 className="mt-3 text-4xl font-bold text-white">Personalize Your Experience</h1>
                    <p className="mt-4 max-w-2xl text-slate-300">Manage appearance, privacy, notifications, and security preferences from one polished dashboard.</p>
                </header>

                <div className="grid gap-6 xl:grid-cols-[0.9fr_0.7fr]">
                    <section className="space-y-6">
                        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-2xl font-semibold text-white">Appearance</h2>
                                    <p className="mt-2 text-slate-400">Switch themes and choose the interface that feels best for work.</p>
                                </div>
                                <button
                                    onClick={toggleTheme}
                                    className="rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                                >
                                    {preferences.theme === "dark" ? "Switch to Light" : "Switch to Dark"}
                                </button>
                            </div>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-3xl bg-slate-950/80 p-5">
                                    <p className="text-sm text-slate-400">Current theme</p>
                                    <p className="mt-3 text-xl font-semibold text-white">{preferences.theme}</p>
                                </div>
                                <div className="rounded-3xl bg-slate-950/80 p-5">
                                    <p className="text-sm text-slate-400">Auto save</p>
                                    <p className="mt-3 text-xl font-semibold text-white">Enabled</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                            <h2 className="text-2xl font-semibold text-white">Notification Preferences</h2>
                            <p className="mt-2 text-slate-400">Control how you receive alerts from the system.</p>
                            <div className="mt-6 space-y-4">
                                {Object.entries(preferences.notifications).map(([key, value]) => (
                                    <button
                                        key={key}
                                        onClick={() => updateNotification(key)}
                                        className={`flex w-full items-center justify-between rounded-3xl border px-5 py-4 text-left transition ${
                                            value ? "border-cyan-500/30 bg-cyan-500/10" : "border-white/10 bg-slate-950/80 hover:border-cyan-400/50"
                                        }`}
                                    >
                                        <div>
                                            <p className="text-base font-semibold text-white">{key === "email" ? "Email" : key === "sms" ? "SMS" : "In-App Alerts"}</p>
                                            <p className="mt-1 text-sm text-slate-400">{value ? "Enabled" : "Disabled"}</p>
                                        </div>
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${value ? "bg-emerald-400/15 text-emerald-200" : "bg-slate-700 text-slate-300"}`}>
                                            {value ? "On" : "Off"}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                            <h2 className="text-2xl font-semibold text-white">Privacy Settings</h2>
                            <p className="mt-2 text-slate-400">Keep control over what information is shared inside the system.</p>
                            <div className="mt-6 space-y-4">
                                {Object.entries(preferences.privacy).map(([key, value]) => (
                                    <button
                                        key={key}
                                        onClick={() => updatePrivacy(key)}
                                        className={`flex w-full items-center justify-between rounded-3xl border px-5 py-4 text-left transition ${
                                            value ? "border-cyan-500/30 bg-cyan-500/10" : "border-white/10 bg-slate-950/80 hover:border-cyan-400/50"
                                        }`}
                                    >
                                        <div>
                                            <p className="text-base font-semibold text-white">{key === "showProfile" ? "Show Profile" : "Share Activity"}</p>
                                            <p className="mt-1 text-sm text-slate-400">{value ? "Visible" : "Hidden"}</p>
                                        </div>
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${value ? "bg-emerald-400/15 text-emerald-200" : "bg-slate-700 text-slate-300"}`}>
                                            {value ? "On" : "Off"}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    <aside className="space-y-6">
                        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                            <h2 className="text-2xl font-semibold text-white">Security</h2>
                            <p className="mt-2 text-slate-400">Strengthen your account and manage access policies.</p>
                            <div className="mt-6 space-y-4">
                                {Object.entries(preferences.security).map(([key, value]) => (
                                    <button
                                        key={key}
                                        onClick={() => updateSecurity(key)}
                                        className={`flex w-full items-center justify-between rounded-3xl border px-5 py-4 text-left transition ${
                                            value ? "border-cyan-500/30 bg-cyan-500/10" : "border-white/10 bg-slate-950/80 hover:border-cyan-400/50"
                                        }`}
                                    >
                                        <div>
                                            <p className="text-base font-semibold text-white">{key === "twoFactor" ? "Two-factor authentication" : "Remember this device"}</p>
                                            <p className="mt-1 text-sm text-slate-400">{value ? "Enabled" : "Disabled"}</p>
                                        </div>
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${value ? "bg-emerald-400/15 text-emerald-200" : "bg-slate-700 text-slate-300"}`}>
                                            {value ? "On" : "Off"}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
                            <h2 className="text-2xl font-semibold text-white">Change Password</h2>
                            <p className="mt-2 text-slate-400">Update your login password for better security.</p>
                            <form onSubmit={handleSavePassword} className="mt-6 space-y-4">
                                <input
                                    name="current"
                                    type="password"
                                    value={passwordForm.current}
                                    onChange={handlePasswordChange}
                                    placeholder="Current password"
                                    className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                    required
                                />
                                <input
                                    name="newPassword"
                                    type="password"
                                    value={passwordForm.newPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="New password"
                                    className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                    required
                                />
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    value={passwordForm.confirmPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Confirm password"
                                    className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                                >
                                    Save Password
                                </button>
                            </form>
                            {saveStatus && <p className="mt-4 text-sm text-emerald-300">{saveStatus}</p>}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default Settings;