import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/signup", form);

      if (res.data?.token) {
        localStorage.setItem("ef_token", res.data.token);
        toast.success("Signup successful!");
        navigate("/login");
      } else {
        toast.error("Signup failed. Try again.");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Server Error";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500/20 to-pink-500/20 dark:from-gray-900 dark:to-black px-4">
      <div className="relative w-full max-w-md backdrop-blur-2xl bg-white/30 dark:bg-gray-800/40 rounded-2xl shadow-2xl p-8 border border-white/30 dark:border-gray-700/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 via-pink-500/30 to-purple-500/30 animate-pulse opacity-60 rounded-2xl blur-xl"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">
            Create Account 🌟
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Join <span className="font-semibold text-pink-600">EventFinder</span> and start your journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-pink-500 focus:outline-none dark:bg-gray-700 dark:text-white transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg font-semibold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-pink-600 dark:text-pink-400 font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}