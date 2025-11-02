import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/Modal.tsx
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const Modal = ({ isOpen, onClose, title, children, size = "md", showClose = true, actions, // ✅ ADD THIS LINE
 }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape")
                onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);
    const sizeClass = size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-3xl" : "max-w-xl";
    return (_jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: onClose, children: _jsxs(motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 }, transition: { duration: 0.25 }, onClick: (e) => e.stopPropagation(), className: `relative w-full ${sizeClass} bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-6`, children: [title && (_jsx("h3", { className: "text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center", children: title })), showClose && (_jsx("button", { onClick: onClose, className: "absolute top-3 right-3 text-gray-500 hover:text-gray-800", children: "\u2716" })), _jsx("div", { className: "text-gray-700 dark:text-gray-200", children: children }), actions && _jsx("div", { className: "mt-4 flex justify-end gap-2", children: actions })] }) })) }));
};
export default Modal;
