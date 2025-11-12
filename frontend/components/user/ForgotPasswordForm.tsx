"use client";
import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";
import {
  XMarkIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface Props {
  onChangeMode: (mode: "login" | "register" | "forgot") => void;
  onClose: () => void;
}

export default function ForgotPasswordForm({ onChangeMode, onClose }: Props) {
  const { forgot, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      const res = await forgot(email);
      if (res.success) {
        setMessage({
          type: "success",
          text: res.message || "Đã gửi yêu cầu! Vui lòng kiểm tra email.",
        });
        setEmail("");
      } else {
        setMessage({
          type: "error",
          text: res.message || "Gửi yêu cầu thất bại. Vui lòng thử lại.",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Đã xảy ra lỗi, vui lòng thử lại.",
      });
    }
  };

  return (
    <div
      className={`relative bg-[#f1f8f2] rounded-xl shadow-2xl flex w-[700px] h-[420px] overflow-hidden`}
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
          alt="Forgot Password Illustration"
          fill
          className="rounded-lg object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-[#f1f8f2]">
        <h2 className="text-2xl font-bold mb-4 text-center">Quên mật khẩu</h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          Nhập email của bạn, chúng tôi sẽ gửi một liên kết để đặt lại mật khẩu.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 py-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-200 rounded-md p-2 pl-10 focus:ring-2 focus:ring-green-600 outline-none bg-white" // Style nhất quán
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />{" "}
          </div>

          {message.text && (
            <div
              className={`text-sm text-center ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 disabled:opacity-60 flex items-center justify-center gap-2" // Nút màu vàng cho chức năng "forgot"
          >
            {loading ? (
              "Đang gửi..."
            ) : (
              <>
                <PaperAirplaneIcon className="w-5 h-5" /> Gửi yêu cầu
              </>
            )}
          </button>
        </form>

        <div className="text-sm text-center mt-3">
          <button
            onClick={() => onChangeMode("login")}
            className="text-blue-600 hover:underline flex items-center justify-center gap-1 mx-auto"
          >
            <ArrowUturnLeftIcon className="w-4 h-4" />
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
