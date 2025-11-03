"use client";
import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface Props {
  onChangeMode: (mode: "login" | "register" | "forgot") => void;
  onClose: () => void;
}

export default function RegisterForm({ onChangeMode, onClose }: Props) {
  const { register, loading } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!agree) {
      setError("Vui lòng đồng ý với điều khoản của chúng tôi.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp!");
      return;
    }

    try {
      const res = await register(name, email, password);
      console.log("Kết quả đăng ký:", res);

      if (res && (res.success || res._id)) {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        onChangeMode("login");
      } else {
        setError(res.message || "Đăng ký thất bại, vui lòng thử lại!");
      }
    } catch (err) {
      console.error(err);
      setError("Đăng ký thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div className="relative bg-[#f1f8f2] rounded-xl shadow-2xl flex w-[750px] h-[550px] overflow-hidden">
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

      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center bg-[#f1f8f2]">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Tạo tài khoản mới
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Họ và tên"
            className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-green-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input type="checkbox" name="nam" />
          <input
            type="tel"
            placeholder="Số điện thoại"
            className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-green-400 outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-green-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-green-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-green-400 outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4 h-4 accent-green-600"
            />
            <span className="text-sm text-gray-700">
              Tôi đồng ý với{" "}
              <a href="#" className="text-blue-600 hover:underline">
                điều khoản sử dụng
              </a>{" "}
              của chúng tôi
            </span>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-60 mt-2"
          >
            {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          Đã có tài khoản?{" "}
          <button
            onClick={() => onChangeMode("login")}
            className="text-blue-600 hover:underline"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
