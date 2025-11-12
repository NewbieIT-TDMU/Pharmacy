"use client";
import { useState } from "react";
import { Package, Users, ShoppingCart, MessageSquare, Home } from "lucide-react";
import ProductTable from "../compoments/ProductTable";
import Customers from "../compoments/Customer";

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState<string>("products");

  const isActive = (menu: string) =>
    activeMenu === menu ? "bg-green-100 text-green-600" : "hover:bg-green-50 text-gray-700";

  return (
    <div className="flex">
      <aside className="w-64 fixed left-0 top-0 min-h-screen bg-white shadow-md p-5">
        <h2 className="text-2xl font-bold text-green-600 mb-8">Nhà thuốc Benzen</h2>

        <nav className="flex flex-col gap-3 font-medium">
          <button
            onClick={() => setActiveMenu("support")}
            className={`p-3 rounded-lg flex items-center gap-2 cursor-pointer ${isActive("support")}`}
          >
            <MessageSquare size={18} /> Quản lí tư vấn
          </button>

          <button
            onClick={() => setActiveMenu("orders")}
            className={`p-3 rounded-lg flex items-center gap-2 cursor-pointer ${isActive("orders")}`}
          >
            <ShoppingCart size={18} /> Quản lí đơn hàng
          </button>

          <button
            onClick={() => setActiveMenu("products")}
            className={`p-3 rounded-lg flex items-center gap-2 cursor-pointer ${isActive("products")}`}
          >
            <Package size={18} /> Quản lí sản phẩm
          </button>

          <button
            onClick={() => setActiveMenu("customers")}
            className={`p-3 rounded-lg flex items-center gap-2 cursor-pointer ${isActive("customers")}`}
          >
            <Users size={18} /> Quản lí khách hàng
          </button>
        </nav>

        <div className="absolute bottom-5 left-5">
          <a href="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
            <Home size={18} /> Truy cập Website
          </a>
        </div>
      </aside>

      <main className="ml-64 p-5 flex-1">
        {activeMenu === "products" && <ProductTable />}
        {activeMenu === "support" && <div>Quản lí tư vấn</div>}
        {activeMenu === "orders" && <div>Quản lí đơn hàng</div>}
        {activeMenu === "customers" && <Customers data={[]} totalPages={0} currentPage={0} totalCount={0} />}
      </main>
    </div>
  );
}
