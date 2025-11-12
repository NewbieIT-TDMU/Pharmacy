"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import {
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon, // For Email
  ArrowRightOnRectangleIcon, // For Login Button
  KeyIcon, // For Forgot Password
  UserPlusIcon, // For Register
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface Props {
  onChangeMode: (mode: "login" | "register" | "forgot") => void;
  onClose: () => void;
}

export default function LoginForm({ onChangeMode, onClose }: Props) {
  const { login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [animating, setAnimating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);
      console.log("Dữ liệu trả về:", data);

      if (data.token) {
        console.log("Token hợp lệ, đang chuyển hướng...");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));

        window.location.href = "/";
      } else {
        setError(data.message || "Sai email hoặc mật khẩu");
      }
    } catch (err) {
      setError("Đăng nhập thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div
      className={`relative bg-[#f1f8f2] rounded-xl shadow-2xl flex w-[700px] h-[420px] overflow-hidden transition-transform duration-700 ${
        animating
          ? "rotate-180 scale-0 opacity-0"
          : "rotate-0 scale-100 opacity-100"
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-transform hover:scale-110 z-10"
      >
        <XMarkIcon className="w-8 h-8" />
      </button>

      <div className="relative w-1/2 bg-gray-100 hidden m-10 md:block">
        <Image
          src="/images/cuahang.jpg"
          alt="Login Illustration"
          fill
          className="rounded-lg object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-[#f1f8f2]">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>

        <form onSubmit={handleLogin} className="space-y-3 py-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-200 rounded-md p-2 pl-10 focus:ring-2 focus:ring-green-600 outline-none bg-white" // Added pl-10 for icon
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />{" "}
            {/* Email Icon */}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              className="w-full border border-gray-200 bg-white rounded-md p-2 pl-10 focus:ring-2 focus:ring-green-600 outline-none pr-10" // Added pl-10 for icon
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />{" "}
            {/* Password/Key Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              "Đang đăng nhập..."
            ) : (
              <>
                <ArrowRightOnRectangleIcon className="w-5 h-5" /> Đăng nhập
              </>
            )}
          </button>
        </form>

        {/* Chuyển mode */}
        <div className="text-sm text-center mt-3">
          <button
            onClick={() => onChangeMode("forgot")}
            className="text-blue-600 hover:underline flex items-center justify-center gap-1 mx-auto"
          >
            <KeyIcon className="w-4 h-4" /> Quên mật khẩu?
          </button>
          <div className="mt-2 flex items-center justify-center gap-1">
            Bạn chưa có tài khoản?{" "}
            <button
              onClick={() => onChangeMode("register")}
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <UserPlusIcon className="w-4 h-4" /> Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
