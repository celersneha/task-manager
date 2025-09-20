import React, { useEffect, useState } from "react";
import API from "../lib/api";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    setUser(response.data.data.user);
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
    setUser(response.data.data.user);
    return response.data;
  };

  const getCurrentUser = async () => {
    const response = await API.get("/users/getCurrentUser");
    console.log(response);
    setUser(response.data.data);
    return response.data;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getCurrentUser();
        console.log("User fetched successfully");
      } catch (error) {
        console.log("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
