// src/context/PopupContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import Modal from "../components/Modal"

interface PopupContextType {
  showPopup: (options: { title: string; content: ReactNode; actions?: ReactNode }) => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextType | null>(null);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [popup, setPopup] = useState<{ title: string; content: ReactNode; actions?: ReactNode } | null>(null);

  const showPopup = (options: { title: string; content: ReactNode; actions?: ReactNode }) => setPopup(options);
  const closePopup = () => setPopup(null);

  return (
    <PopupContext.Provider value={{ showPopup, closePopup }}>
      {children}
      <Modal isOpen ={!!popup} title={popup?.title} onClose={closePopup} actions={popup?.actions}>
        {popup?.content}
      </Modal>
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) throw new Error("usePopup must be used within PopupProvider");
  return context;
};