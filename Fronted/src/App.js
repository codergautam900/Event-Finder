import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Footer from "./components/Footer";
import { PopupProvider } from "./context/PopupContext"; // 🌟 universal popup system
import { Toaster } from "react-hot-toast"; // optional for stylish success/error toast
/**
 * Main App
 * - Handles navigation + popup context + dark mode
 * - Includes smooth transitions and toasts
 */
const App = () => {
    return (_jsx(PopupProvider, { children: _jsxs("div", { className: "min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-1 max-w-6xl mx-auto w-full px-4 py-8", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/create", element: _jsx(CreateEvent, {}) }), _jsx(Route, { path: "/event/:id", element: _jsx(EventDetail, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/signup", element: _jsx(Signup, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) })] }) }), _jsx(Footer, {}), _jsx(Toaster, { position: "top-right", toastOptions: { duration: 2500 } })] }) }));
};
export default App;
