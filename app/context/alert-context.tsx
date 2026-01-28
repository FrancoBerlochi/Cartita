"use client";

import { AlertCircle } from "lucide-react";
import { useState, createContext, ReactNode, useContext } from "react";

interface AlertContextType {
  showAlert: (msg: string, type?: "success" | "error" | "info") => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "info">("success");

  const showAlert = (
    msg: string,
    type: "success" | "error" | "info" = "success",
  ) => {
    setMessage(msg);
    setType(type);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}{" "}
      <div
        className={`fixed top-6 right-6 z-99999
          px-5 py-4 min-w-65 max-w-sm
          rounded-xl shadow-2xl text-white font-semibold
          backdrop-blur-md
          transition-all duration-500
          ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }
          ${
            type === "success"
              ? "bg-green-600/90"
              : type === "error"
                ? "bg-red-950/90 border border-red-900"
                : "bg-blue-600/90"
          }
        `}
      >
        
        <div className="flex gap-4">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 self-center" />
          {message}
        </div>
      </div>
    </AlertContext.Provider>
  );
};

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert debe usarse dentro de <AlertProvider>");
  return ctx;
}