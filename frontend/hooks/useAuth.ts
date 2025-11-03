"use client";
import { useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  token?: string;
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const API_URL = "http://localhost:5000/api/users";

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (err) {
      console.error("Lỗi khi đọc user từ localStorage:", err);
      localStorage.removeItem("user");
    }
  }, []);

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      setLoading(false);
      return data;
    } catch (error: any) {
      setLoading(false);
      return { message: error.message || "Lỗi khi đăng ký" };
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) throw new Error(data.message || "Lỗi đăng nhập");

      const newUser: User = {
        name: data.name,
        email: data.email,
        token: data.token,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      return { success: true, ...data };
    } catch (error: any) {
      setLoading(false);
      return { success: false, message: error.message };
    }
  };

  const forgot = async (email: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setLoading(false);
      return data;
    } catch (error: any) {
      setLoading(false);
      return { message: error.message || "Lỗi khi gửi yêu cầu quên mật khẩu" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return { user, register, login, forgot, logout, loading };
}
