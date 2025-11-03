"use client";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function AuthModal() {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {mode === "login" && (
        <LoginForm onChangeMode={setMode} onClose={() => setVisible(false)} />
      )}
      {mode === "register" && (
        <RegisterForm
          onChangeMode={setMode}
          onClose={() => setVisible(false)}
        />
      )}
      {mode === "forgot" && (
        <ForgotPasswordForm
          onChangeMode={setMode}
          onClose={() => setVisible(false)}
        />
      )}
    </div>
  );
}
