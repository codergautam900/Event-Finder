import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";
import { getAllEvents } from "../api/eventApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Home = () => {
    const [events, setEvents] = useState([]);
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("All");
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const navigate = useNavigate();
    const hasRedirected = useRef(false);
    // 🔐 Redirect guests
    useEffect(() => {
        if (!token && !hasRedirected.current) {
            hasRedirected.current = true;
            toast.warning("Please login to continue", { autoClose: 2000 });
            navigate("/login");
        }
    }, [token, navigate]);
    // 📦 Fetch events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const data = await getAllEvents();
                setEvents(data.events || []);
            }
            catch (err) {
                console.error("Failed to fetch events:", err);
                toast.error("Unable to load events");
            }
            finally {
                setLoading(false);
            }
        };
        if (token)
            fetchEvents();
    }, [token]);
    // 🔍 Filter events
    const filtered = events.filter((ev) => {
        const q = query.toLowerCase();
        return ((category === "All" || ev.category === category) &&
            (ev.title.toLowerCase().includes(q) ||
                ev.city?.toLowerCase().includes(q)));
    });
    return (_jsxs("div", { className: "min-h-screen px-4 sm:px-6 lg:px-10 pb-16 transition-colors duration-300", children: [_jsx("section", { className: "rounded-2xl p-6 sm:p-8 mb-10 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg border border-gray-200/30 dark:border-gray-700/50", children: _jsxs("div", { className: "max-w-5xl mx-auto text-center sm:text-left", children: [_jsx("h1", { className: "text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white", children: "Discover Amazing Events \uD83C\uDF89" }), _jsx("p", { className: "text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2", children: "Find events near you \u2014 or create your own adventure!" }), _jsxs("div", { className: "mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start", children: [_jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "\uD83D\uDD0D Search events or city...", className: "flex-1 min-w-[200px] border rounded-xl px-4 py-2.5 bg-white/80 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-sm" }), _jsxs("select", { value: category, onChange: (e) => setCategory(e.target.value), className: "w-full sm:w-auto border rounded-xl px-4 py-2.5 bg-white/80 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-pink-500 shadow-sm", children: [_jsx("option", { children: "All" }), _jsx("option", { children: "Tech" }), _jsx("option", { children: "Music" }), _jsx("option", { children: "Business" }), _jsx("option", { children: "Sports" }), _jsx("option", { children: "Education" })] })] })] }) }), loading ? (_jsx("div", { className: "text-center text-gray-500 dark:text-gray-400 mt-20 animate-pulse text-lg", children: "Loading events..." })) : filtered.length === 0 ? (_jsx("div", { className: "text-center text-gray-600 dark:text-gray-400 mt-20 text-lg", children: "No events found \uD83D\uDE22" })) : (_jsx("section", { className: "grid gap-6 sm:gap-8 \r\n          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: filtered.map((ev) => (_jsx("div", { onClick: () => setSelected(ev), className: "cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform", children: _jsx(EventCard, { event: ev }) }, ev._id || ev.id))) })), selected && (_jsx(EventModal, { event: selected, onClose: () => setSelected(null), onJoin: () => toast.success("Joined event successfully! 🎊") }))] }));
};
export default Home;
