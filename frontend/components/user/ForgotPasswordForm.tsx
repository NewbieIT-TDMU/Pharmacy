"use client";
import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  onChangeMode: (mode: "login" | "register" | "forgot") => void;
  onClose: () => void;
}

export default function ForgotPasswordForm({ onChangeMode, onClose }: Props) {
  const { forgot, loading } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await forgot(email);
    alert(res.message || "Đã gửi mật khẩu mới!");
  };

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-lg w-96">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-transform hover:scale-110"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      <h2 className="text-2xl font-bold mb-4 text-center">Quên mật khẩu</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Nhập email"
          className="w-full border rounded-md p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          disabled={loading}
          className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
        >
          {loading ? "Đang gửi..." : "Gửi yêu cầu"}
        </button>
      </form>

      <div className="text-sm text-center mt-3">
        <button
          onClick={() => onChangeMode("login")}
          className="text-blue-600 hover:underline"
        >
          Quay lại đăng nhập
        </button>
      </div>
    </div>
  );
}
