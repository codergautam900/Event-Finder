import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/context/PopupContext.tsx
import { createContext, useContext, useState } from "react";
import Modal from "../components/Modal";
const PopupContext = createContext(null);
export const PopupProvider = ({ children }) => {
    const [popup, setPopup] = useState(null);
    const showPopup = (options) => setPopup(options);
    const closePopup = () => setPopup(null);
    return (_jsxs(PopupContext.Provider, { value: { showPopup, closePopup }, children: [children, _jsx(Modal, { isOpen: !!popup, title: popup?.title, onClose: closePopup, actions: popup?.actions, children: popup?.content })] }));
};
export const usePopup = () => {
    const context = useContext(PopupContext);
    if (!context)
        throw new Error("usePopup must be used within PopupProvider");
    return context;
};
