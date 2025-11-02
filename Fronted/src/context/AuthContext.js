import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios"; // axios instance (localhost:5000/api)
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ added loading state
    useEffect(() => {
        const rawU = localStorage.getItem("ef_user");
        const rawT = localStorage.getItem("ef_token");
        if (rawU && rawT) {
            try {
                setUser(JSON.parse(rawU));
                setToken(rawT);
            }
            catch {
                localStorage.removeItem("ef_user");
                localStorage.removeItem("ef_token");
            }
        }
        setLoading(false); // ✅ stop loading after check
    }, []);
    const setLocalUser = (u, t) => {
        setUser(u);
        setToken(t);
        localStorage.setItem("ef_user", JSON.stringify(u));
        localStorage.setItem("ef_token", t);
    };
    const signupWithApi = async (name, email, password) => {
        setLoading(true);
        try {
            const res = await API.post("/auth/signup", { name, email, password });
            const { token: t, user: u } = res.data;
            setLocalUser(u, t);
        }
        finally {
            setLoading(false);
        }
    };
    const loginWithApi = async (email, password) => {
        setLoading(true);
        try {
            const res = await API.post("/auth/login", { email, password });
            const { token: t, user: u } = res.data;
            setLocalUser(u, t);
        }
        finally {
            setLoading(false);
        }
    };
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("ef_user");
        localStorage.removeItem("ef_token");
    };
    return (_jsx(AuthContext.Provider, { value: { user, token, loading, loginWithApi, signupWithApi, logout }, children: children }));
};
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
