"use client";
import { ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 w-full bg-white shadow fixed top-0 right-0 z-50 flex justify-between items-center px-8">
      <div className="font-medium text-gray-600">
        Quản lí sản phẩm / Danh sách sản phẩm
      </div>

      <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-lg">
        <img
          src="/images/programmer.png"
          alt="Admin"
          className="w-9 h-9 rounded-full"
        />
        <span className="font-medium">Admin</span>
        <ChevronDown size={16} />
      </div>
    </header>
  );
}
