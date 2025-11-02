import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // ✅ for hamburger icons
export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const handleLogout = () => {
        logout();
        sessionStorage.setItem("justLoggedOut", "true");
        navigate("/login", { replace: true,
            state: { fromLogout: true } });
    };
    return (_jsx("nav", { className: "bg-white/40 backdrop-blur-lg border-b border-gray-200 shadow-sm sticky top-0 z-50", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 py-3 flex justify-between items-center", children: [_jsx(Link, { to: "/", onClick: () => setMenuOpen(false), className: "text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent", children: "EventFinder" }), _jsx("button", { onClick: () => setMenuOpen(!menuOpen), className: "md:hidden text-gray-700 focus:outline-none", children: menuOpen ? _jsx(X, { size: 26 }) : _jsx(Menu, { size: 26 }) }), _jsxs("div", { className: `flex-col md:flex-row md:flex items-center gap-6 absolute md:static left-0 top-16 w-full md:w-auto bg-white/90 md:bg-transparent backdrop-blur-lg md:backdrop-blur-0 border-b md:border-none p-4 md:p-0 transition-all duration-300 ease-in-out ${menuOpen
                        ? "flex opacity-100 translate-y-0"
                        : "hidden md:flex opacity-0 md:opacity-100 -translate-y-5 md:translate-y-0"}`, children: [_jsx(Link, { to: "/", onClick: () => setMenuOpen(false), className: "text-gray-700 hover:text-indigo-600 font-medium transition", children: "Home" }), _jsx(Link, { to: "/create", onClick: () => setMenuOpen(false), className: "text-gray-700 hover:text-indigo-600 font-medium transition", children: "Create Event" }), _jsx(Link, { to: "/about", onClick: () => setMenuOpen(false), className: "text-gray-700 hover:text-indigo-600 font-medium transition", children: "About" }), user ? (_jsxs("div", { className: "flex flex-col md:flex-row items-center gap-3 mt-2 md:mt-0", children: [_jsx("span", { className: "text-gray-800 font-semibold", children: user.name }), _jsx("button", { onClick: handleLogout, className: "bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-4 py-1.5 rounded-lg shadow hover:scale-105 transition", children: "Logout" })] })) : (_jsxs("div", { className: "flex flex-col md:flex-row items-center gap-3 mt-2 md:mt-0", children: [_jsx(Link, { to: "/login", onClick: () => setMenuOpen(false), className: "px-4 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition", children: "Login" }), _jsx(Link, { to: "/signup", onClick: () => setMenuOpen(false), className: "px-4 py-1.5 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition", children: "Signup" })] }))] })] }) }));
}
