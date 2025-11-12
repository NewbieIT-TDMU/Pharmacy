import React, { useState } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  Lock,
  CheckCircle,
  LogIn,
  ChevronRight,
} from "lucide-react";

interface RegisterResult {
  success: boolean;
  message?: string;
  _id?: string;
}

const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const register = async (
    name: string,
    email: string,
    password: string,
    phone: string
  ): Promise<RegisterResult> => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Đăng ký thất bại!",
        };
      }

      return {
        success: true,
        message: "Đăng ký thành công!",
        _id: data._id,
      };
    } catch (error) {
      setLoading(false);
      return { success: false, message: "Không thể kết nối đến Server!" };
    }
  };

  return { register, loading };
};


const MessageBox = ({
  message,
  type,
  onClose,
}: {
  message: string | null;
  type: "success" | "error";
  onClose: () => void;
}) => {
  if (!message) return null;
  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg flex items-center text-white shadow-xl z-50 transition-opacity duration-300 ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {type === "success" ? <CheckCircle size={20} /> : <X size={20} />}
      <span className="mx-2">{message}</span>
      <button onClick={onClose} className="ml-2">
        <X size={18} />
      </button>
    </div>
  );
};

interface Props {
  onChangeMode: (mode: "login" | "register" | "forgot") => void;
  onClose: () => void;
}

const Input = ({
  icon,
  placeholder,
  type = "text",
  value,
  set,
}: {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  value: string;
  set: (v: string) => void;
}) => (
  <div className="relative">
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-sm focus:border-green-500 focus:ring-green-500 transition-colors outline-none"
      value={value}
      onChange={(e) => set(e.target.value)}
      required
    />
  </div>
);

export default function RegisterForm({ onChangeMode, onClose }: Props) {
  const { register, loading } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!agree) return setError("Bạn chưa đồng ý điều khoản!");
    if (password.length < 6) return setError("Mật khẩu tối thiểu 6 ký tự!");
    if (password !== confirm) return setError("Mật khẩu không khớp!");
    if (phone.length < 10) return setError("Số điện thoại không hợp lệ!");

    const res = await register(name, email, password, phone);
    if (res.success) {
      setSuccess("Đăng ký thành công!");
      setTimeout(() => onChangeMode("login"), 1200);
    } else setError(res.message ?? "Lỗi đăng ký!");
  };

  const BenzenStoreImage = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-full h-full object-contain"
    >
      <rect x="5" y="55" width="90" height="40" fill="#E8F5E9" rx="5" />
      <path d="M5 55 L95 55 L90 50 L10 50 Z" fill="#4CAF50" />
      <rect x="25" y="45" width="50" height="10" fill="#FFFFFF" rx="3" />
      <text
        x="50"
        y="52"
        fontSize="6"
        fontWeight="bold"
        textAnchor="middle"
        fill="#4CAF50"
      >
        BENZEN
      </text>
      <circle cx="28" cy="51.5" r="2.5" fill="#4CAF50" />
      <rect
        x="15"
        y="60"
        width="70"
        height="30"
        fill="#B2DFDB"
        stroke="#80CBC4"
        strokeWidth="1"
        rx="3"
      />
      <rect x="20" y="70" width="10" height="15" fill="#C5E1A5" />
      <rect x="70" y="70" width="10" height="15" fill="#C5E1A5" />
      <circle cx="10" cy="85" r="5" fill="#81C784" />
      <rect x="9" y="90" width="2" height="5" fill="#795548" />
      <rect x="85" y="90" width="3" height="5" fill="#795548" />
      <rect x="83" y="87" width="7" height="3" fill="#BDBDBD" />
      <rect x="83" y="80" width="7" height="7" fill="#E0E0E0" rx="1" />
      <circle cx="35" cy="40" r="3" fill="#FFC107" />
      <circle cx="65" cy="40" r="3" fill="#FFC107" />
    </svg>
  );

  return (
    <div className="flex justify-center items-center min-h-screen p-4 font-sans">
      <MessageBox
        message={error || success}
        type={error ? "error" : "success"}
        onClose={() => {
          setError(null);
          setSuccess(null);
        }}
      />

      <div className="flex flex-col md:flex-row bg-white w-[700px] rounded-xl shadow-2xl   overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition z-10 p-1"
        >
          <X size={24} />
        </button>

        <div className="hidden md:flex md:w-3/5 p-4 items-center justify-center bg-green-50">
          <div className="w-full h-auto p-4">
            <a href="/">
              <img src="/images/cuahang.jpg" alt="/Cưa hàng của chúng tôi" />
            </a>
          </div>
        </div>

        <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-extrabold text-center text-green-700 mb-6">
            Đăng Ký Tài Khoản
          </h2>

          <form onSubmit={submit} className="space-y-3">
            <Input
              icon={<User size={18} />}
              placeholder="Họ và tên"
              value={name}
              set={setName}
            />
            <Input
              icon={<Phone size={18} />}
              placeholder="Số điện thoại"
              value={phone}
              set={setPhone}
            />
            <Input
              icon={<Mail size={18} />}
              placeholder="Email"
              value={email}
              set={setEmail}
            />
            <Input
              icon={<Lock size={18} />}
              placeholder="Mật khẩu"
              type="password"
              value={password}
              set={setPassword}
            />
            <Input
              icon={<Lock size={18} />}
              placeholder="Nhập lại mật khẩu"
              type="password"
              value={confirm}
              set={setConfirm}
            />

            <div className="flex items-start gap-2 text-sm pt-2">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
              />
              <label
                htmlFor="agree-terms"
                className="text-gray-600 cursor-pointer"
              >
                Tôi đồng ý{" "}
                <span className="font-semibold text-blue-600 hover:underline">
                  điều khoản sử dụng
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !agree}
              className="w-full bg-green-600 text-white py-2.5 rounded-lg flex justify-center items-center font-bold text-base hover:bg-green-700 transition-colors shadow-lg shadow-green-200 disabled:opacity-50 mt-4"
            >
              {loading ? (
                "Đang xử lý..."
              ) : (
                <>
                  <ChevronRight size={20} className="mr-2" /> Đăng ký
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-5 text-sm text-gray-500">
            Đã có tài khoản?{" "}
            <button
              onClick={() => onChangeMode("login")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
