"use client";
import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function UserMenu() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!user) {
    return (
      <button
        onClick={() => {
          const modal = document.getElementById("loginModal");
          if (modal) modal.classList.remove("hidden");
        }}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        Đăng nhập
      </button>
    );
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
        <span>{user.name || "Tài khoản"}</span>
        <ChevronDownIcon className="w-5 h-5 text-gray-600" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? "bg-gray-100" : ""
              } w-full text-left px-4 py-2 text-sm text-gray-700`}
              onClick={() => alert("Chuyển đến trang cài đặt")}
            >
              Cài đặt
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`${
                active ? "bg-gray-100" : ""
              } w-full text-left px-4 py-2 text-sm text-red-600`}
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
