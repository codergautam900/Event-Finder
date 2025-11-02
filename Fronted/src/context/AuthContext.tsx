import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  loginWithApi: (email: string, password: string) => Promise<void>;
  signupWithApi: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const rawU = localStorage.getItem("ef_user");
    const rawT = localStorage.getItem("ef_token");
    if (rawU && rawT) {
      try {
        setUser(JSON.parse(rawU));
        setToken(rawT);
      } catch {
        localStorage.removeItem("ef_user");
        localStorage.removeItem("ef_token");
      }
    }
    setLoading(false);
  }, []);

  const setLocalUser = (u: User, t: string) => {
    setUser(u);
    setToken(t);
    localStorage.setItem("ef_user", JSON.stringify(u));
    localStorage.setItem("ef_token", t);
  };

  const signupWithApi = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const res = await API.post("/auth/signup", { name, email, password });
      const { token: t, user: u } = res.data;
      setLocalUser(u, t);
    } finally {
      setLoading(false);
    }
  };

  const loginWithApi = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token: t, user: u } = res.data;
      setLocalUser(u, t);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("ef_user");
    localStorage.removeItem("ef_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginWithApi, signupWithApi, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};