import React, { useEffect, useState } from "react";
import LoginForm from "@/components/user/LoginForm";
import RegisterForm from "@/components/user/RegisterForm";
import ForgotPasswordForm from "@/components/user/ForgotPasswordForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: Props) {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");

  useEffect(() => {
    if (isOpen) setMode("login");
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative  rounded-2xl flex flex-col md:flex-row  mx-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" p-8 relative">
          {mode === "login" && (
            <LoginForm onChangeMode={setMode} onClose={onClose} />
          )}
          {mode === "register" && (
            <RegisterForm onChangeMode={setMode} onClose={onClose} />
          )}
          {mode === "forgot" && (
            <ForgotPasswordForm onChangeMode={setMode} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}
