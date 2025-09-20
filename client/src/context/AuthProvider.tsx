import React, { useEffect, useState } from "react";
import API from "../lib/api";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  const login = async (
    email?: string,
    password?: string,
    username?: string
  ) => {
    const response = await API.post("/users/login", {
      email,
      username,
      password,
    });
    setUser(response.data.data.user); // <-- update here if needed
    return response.data;
  };

  const logout = async () => {
    await API.post("/users/logout");
    setUser(null);
  };

  const register = async (
    fullName: string,
    email: string,
    username: string,
    password: string
  ) => {
    const response = await API.post("/users/register", {
      fullName,
      email,
      username,
      password,
    });
    setUser(response.data.data); // backend returns user in data
    return response.data;
  };

  const getCurrentUser = async () => {
    const response = await API.get("/users/getCurrentUser");

    setUser(response.data.data); // backend returns user in data
    return response.data;
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
