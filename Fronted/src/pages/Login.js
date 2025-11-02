import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
export default function Login() {
    const { loginWithApi } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    // 🧠 handle input change
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    // 🔐 handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            toast.error("Please fill email & password");
            return;
        }
        try {
            setLoading(true);
            await loginWithApi(form.email, form.password);
            toast.success("Login successful!");
            setTimeout(() => navigate("/"), 800);
        }
        catch (err) {
            console.error("Login error:", err);
            const msg = err?.response?.data?.message || "Login failed";
            toast.error(msg);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500/20 to-pink-500/20 dark:from-gray-900 dark:to-black px-4", children: _jsxs("div", { className: "relative w-full max-w-md backdrop-blur-2xl bg-white/30 dark:bg-gray-800/40 rounded-2xl shadow-2xl p-8 border border-white/30 dark:border-gray-700/50 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-pink-500/30 to-purple-500/30 animate-pulse opacity-60 rounded-2xl blur-xl" }), _jsxs("div", { className: "relative z-10", children: [_jsx("h2", { className: "text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white", children: "Welcome Back \uD83D\uDCAB" }), _jsxs("p", { className: "text-center text-gray-600 dark:text-gray-400 mb-8", children: ["Login to your ", _jsx("span", { className: "font-semibold text-pink-600", children: "EventFinder" }), " account"] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Email" }), _jsx("input", { type: "email", name: "email", placeholder: "you@example.com", value: form.email, onChange: handleChange, className: "w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white transition-all" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Password" }), _jsx("input", { type: "password", name: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: form.password, onChange: handleChange, className: "w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-pink-500 focus:outline-none dark:bg-gray-700 dark:text-white transition-all" })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg font-semibold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all", children: loading ? "Logging in..." : "Login" })] }), _jsxs("p", { className: "text-center text-gray-600 dark:text-gray-400 text-sm mt-6", children: ["Don\u2019t have an account?", " ", _jsx("a", { href: "/signup", className: "text-pink-600 dark:text-pink-400 font-medium hover:underline", children: "Sign up" })] })] })] }) }));
}
