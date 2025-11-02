import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [loading, setLoading] = useState(true);
    // ✅ Fetch event from backend
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await api.get(`/events/${id}`);
                setEvent(res.data);
            }
            catch (err) {
                console.error("Error fetching event:", err);
                toast.error("❌ Failed to fetch event details!");
            }
            finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);
    // 🗑 Delete Event
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this event?"))
            return;
        try {
            await api.delete(`/events/${id}`);
            toast.success("🗑 Event deleted successfully!");
            navigate("/");
        }
        catch (err) {
            console.error("Error deleting event:", err);
            toast.error("❌ Failed to delete event!");
        }
    };
    // ✏ Edit mode toggle
    const handleEdit = () => {
        if (!event)
            return;
        setEditData(event);
        setIsEditing(true);
    };
    // 💾 Update event (PUT)
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put(`/events/${id}`, editData);
            setEvent(res.data);
            setIsEditing(false);
            toast.success("✅ Event updated successfully!");
        }
        catch (err) {
            console.error("Error updating event:", err);
            toast.error("❌ Failed to update event!");
        }
    };
    // 🕐 Loading state
    if (loading)
        return (_jsx("div", { className: "text-center text-gray-600 dark:text-gray-300 py-10", children: "Loading event details..." }));
    // ❌ Event not found
    if (!event)
        return (_jsx("div", { className: "text-center text-gray-600 dark:text-gray-300 py-10", children: "Event not found." }));
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 relative", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-3", children: event.title }), _jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-4", children: [new Date(event.date).toLocaleString(), " \u2022", " ", typeof event.location === "object"
                        ? `${event.city || "Unknown City"} (${event.location.coordinates?.[1]?.toFixed(2)}, ${event.location.coordinates?.[0]?.toFixed(2)})`
                        : event.city || event.location || "Unknown Location"] }), _jsx("p", { className: "text-gray-700 dark:text-gray-200 mb-6", children: event.description }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: [event.currentParticipants, "/", event.maxParticipants, " joined"] }), _jsxs("div", { className: "flex gap-3", children: [_jsx("button", { onClick: handleEdit, className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition", children: "\u270F Edit" }), _jsx("button", { onClick: handleDelete, className: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition", children: "\uD83D\uDDD1 Delete" })] })] }), _jsx(AnimatePresence, { children: isEditing && (_jsx(motion.div, { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: _jsxs(motion.div, { className: "bg-white dark:bg-gray-800 p-6 rounded-xl max-w-lg w-full shadow-xl", initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 }, children: [_jsx("h2", { className: "text-2xl font-bold mb-4 text-gray-800 dark:text-white", children: "Edit Event" }), _jsxs("form", { onSubmit: handleUpdate, className: "space-y-3", children: [_jsx("input", { className: "w-full border rounded-lg px-3 py-2 dark:bg-gray-700", value: editData.title || "", onChange: (e) => setEditData((prev) => ({ ...prev, title: e.target.value })) }), _jsx("textarea", { className: "w-full border rounded-lg px-3 py-2 dark:bg-gray-700", value: editData.description || "", onChange: (e) => setEditData((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        })) }), _jsx("input", { className: "w-full border rounded-lg px-3 py-2 dark:bg-gray-700", value: editData.city || "", onChange: (e) => setEditData((prev) => ({ ...prev, city: e.target.value })) }), _jsx("input", { type: "date", className: "w-full border rounded-lg px-3 py-2 dark:bg-gray-700", value: editData.date?.split("T")[0] || "", onChange: (e) => setEditData((prev) => ({ ...prev, date: e.target.value })) }), _jsxs("div", { className: "flex justify-end gap-3", children: [_jsx("button", { type: "button", onClick: () => setIsEditing(false), className: "border px-4 py-2 rounded-lg", children: "Cancel" }), _jsx("button", { type: "submit", className: "bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700", children: "Save Changes" })] })] })] }) })) })] }));
};
export default EventDetail;
