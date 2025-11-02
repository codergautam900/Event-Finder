import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Event } from "../types/Event";
import api from "../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Event>>({});
  const [loading, setLoading] = useState(true);

  // ✅ Fetch event from backend
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
        toast.error("❌ Failed to fetch event details!");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  // 🗑 Delete Event
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      toast.success("🗑 Event deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error deleting event:", err);
      toast.error("❌ Failed to delete event!");
    }
  };

  // ✏ Edit mode toggle
  const handleEdit = () => {
    if (!event) return;
    setEditData(event);
    setIsEditing(true);
  };

  // 💾 Update event (PUT)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.put(`/events/${id}`, editData);
      setEvent(res.data);
      setIsEditing(false);
      toast.success("✅ Event updated successfully!");
    } catch (err) {
      console.error("Error updating event:", err);
      toast.error("❌ Failed to update event!");
    }
  };

  // 🕐 Loading state
  if (loading)
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 py-10">
        Loading event details...
      </div>
    );

  // ❌ Event not found
  if (!event)
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 py-10">
        Event not found.
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 relative"
    >
      {/* Event Info */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
        {event.title}
      </h1>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {new Date(event.date).toLocaleString()} •{" "}
        {typeof event.location === "object"
          ? `${event.city || "Unknown City"} (${event.location.coordinates?.[1]?.toFixed(2)}, ${event.location.coordinates?.[0]?.toFixed(2)})`
          : event.city || event.location || "Unknown Location"}
      </p>

      <p className="text-gray-700 dark:text-gray-200 mb-6">{event.description}</p>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {event.currentParticipants}/{event.maxParticipants} joined
        </span>
        <div className="flex gap-3">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ✏ Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            🗑 Delete
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-lg w-full shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Edit Event
              </h2>
              <form onSubmit={handleUpdate} className="space-y-3">
                <input
                  className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700"
                  value={editData.title || ""}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
                <textarea
                  className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700"
                  value={editData.description || ""}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
                <input
                  className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700"
                  value={editData.city || ""}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, city: e.target.value }))
                  }
                />
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700"
                  value={editData.date?.split("T")[0] || ""}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, date: e.target.value }))
                  }
                />
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="border px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EventDetail;