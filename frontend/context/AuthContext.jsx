// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import api from "../src/lib/axios.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // try auto-login on refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me", { withCredentials: true });
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
