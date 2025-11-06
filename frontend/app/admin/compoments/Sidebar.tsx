"use client";
import { Package, Users, ShoppingCart, MessageSquare, Home } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 fixed left-0 top-15 min-h-screen bg-white shadow-md p-5">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">Nhà thuốc Benzen </h2>

      <nav className="flex flex-col gap-3 text-gray-700 font-medium">
        <a className="hover:bg-blue-50 p-3 rounded-lg flex items-center gap-2 cursor-pointer">
          <MessageSquare size={18} /> Quản lí tư vấn
        </a>
        <a className="hover:bg-blue-50 p-3 rounded-lg flex items-center gap-2 cursor-pointer">
          <ShoppingCart size={18} /> Quản lí đơn hàng
        </a>
        <a className="bg-blue-100 text-blue-600 p-3 rounded-lg flex items-center gap-2 cursor-pointer">
          <Package size={18} /> Quản lí sản phẩm
        </a>
        <a className="hover:bg-blue-50 p-3 rounded-lg flex items-center gap-2 cursor-pointer">
          <Users size={18} /> Quản lí khách hàng
        </a>
      </nav>

      <div className="absolute bottom-5 left-5">
        <a href="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
          <Home size={18} /> Truy cập Website
        </a>
      </div>
    </aside>
  );
}
