import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, setApiToken } from "../lib/api.js";

const AuthContext = createContext(null);
const STORAGE_KEY = "video-assignment-auth";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY) || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    setApiToken(token);
    if (!token) { setUser(null); setLoading(false); return; }

    api.get("/auth/me").then((response) => {
      setUser(response.data.user);
    }).catch(() => {
      localStorage.removeItem(STORAGE_KEY);
      setToken("");
      setUser(null);
    }).finally(() => setLoading(false));
  }, [token]);

  const value = useMemo(() => ({
    token, user, loading, isAuthenticated: Boolean(token && user),
    async login(email, password) {
      const response = await api.post("/auth/login", { email, password });
      const nextToken = response.data.token;
      localStorage.setItem(STORAGE_KEY, nextToken);
      setApiToken(nextToken);
      setToken(nextToken);
      setUser(response.data.user);
    },
    async register(payload) {
      const response = await api.post("/auth/register", payload);
      const nextToken = response.data.token;
      localStorage.setItem(STORAGE_KEY, nextToken);
      setApiToken(nextToken);
      setToken(nextToken);
      setUser(response.data.user);
    },
    logout() {
      localStorage.removeItem(STORAGE_KEY);
      setApiToken("");
      setToken("");
      setUser(null);
    }
  }), [token, user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
