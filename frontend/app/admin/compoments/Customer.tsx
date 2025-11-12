'use client';

import React, { useState, useMemo, useEffect } from 'react';
// Thay thế Next.js hooks bằng logic quản lý URL cơ bản
// import { useRouter, useSearchParams } from 'next/navigation'; 
import { Eye } from 'lucide-react';
import CustomerDetailModal from './CustomerDetailModal'; // Component modal chi tiết

// Định nghĩa kiểu dữ liệu cho khách hàng (dựa trên ảnh mẫu)
interface Customer {
  _id: string;
  id: number;
  name: string; // Tài khoản
  status: string; // Trạng thái: 'Mới' | 'Đã đăng ký'
  date: string; // Ngày đăng ký: 'Đăng ký: 06/2022'
  city: string; // Địa chỉ (Tỉnh/Thành phố)
  gender: 'Nam' | 'Nữ'; // Giới tính
  point: number; // Tích điểm
  phone: string; // SĐT
}

interface CustomerTableProps {
  data: Customer[]; // Dữ liệu khách hàng
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

// Hàm trợ giúp để tạo danh sách số trang
const getPageList = (total: number, current: number): (number | string)[] => {
  const range: (number | string)[] = [];
  const maxVisible = 4;

  if (total <= maxVisible + 2) {
    for (let i = 1; i <= total; i++) range.push(i);
  } else {
    range.push(1);
    if (current > maxVisible - 1) range.push("...");
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) range.push(i);
    if (current < total - (maxVisible - 2)) range.push("...");
    range.push(total);
  }
  return range;
};

// Hook tùy chỉnh để mô phỏng useRouter/useSearchParams
const useUrlState = () => {
    // Chỉ chạy ở client side
    const initialParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    
    // Giả định trạng thái ban đầu của search và page
    const [searchTerm, setSearchTerm] = useState(initialParams.get('search') || '');
    const [page, setPage] = useState(parseInt(initialParams.get('page') || '1', 10));

    // Hàm cập nhật URL
    const push = (newParams: URLSearchParams) => {
        const newUrl = `${window.location.pathname}?${newParams.toString()}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
        
        // Cập nhật state nội bộ sau khi push để trigger re-render nếu cần
        setSearchTerm(newParams.get('search') || '');
        setPage(parseInt(newParams.get('page') || '1', 10));
    };

    return { searchTerm, page, push };
};


export default function CustomerTable({
  data,
  totalPages,
  currentPage: externalCurrentPage, // Sử dụng prop được truyền vào
  totalCount,
}: CustomerTableProps) {

  // Sử dụng hook mô phỏng
  const { searchTerm: urlSearchTerm, page: urlPage, push } = useUrlState();

  // Dùng state nội bộ để quản lý input tạm thời
  const [localSearchTerm, setLocalSearchTerm] = useState(urlSearchTerm);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Đồng bộ state input với URL param
  useEffect(() => {
    setLocalSearchTerm(urlSearchTerm);
  }, [urlSearchTerm]);


  // Hàm xử lý tìm kiếm
  const handleSearch = (term: string) => {
    // Không cần dùng `push` ở đây, chỉ cần cập nhật local state
    setLocalSearchTerm(term);
  };
  
  // Hàm áp dụng tìm kiếm (khi nhấn Enter hoặc mất focus)
  const applySearch = () => {
    const params = new URLSearchParams(window.location.search);
    
    if (localSearchTerm) {
      params.set('search', localSearchTerm);
    } else {
      params.delete('search');
    }
    
    // Luôn reset về trang 1 khi tìm kiếm
    params.set('page', '1'); 
    push(params);
  };


  // Hàm xử lý chuyển trang
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', page.toString());
    push(params);
  };

  // Tạo danh sách trang để hiển thị
  const pageList = useMemo(() => getPageList(totalPages, externalCurrentPage), [totalPages, externalCurrentPage]);

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Quản lý khách hàng</h2>

      {/* Thông tin thống kê và Tìm kiếm */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <p className="text-lg font-medium text-gray-600 mb-3 md:mb-0">
          Khách hàng: <strong className="text-green-600">{totalCount.toLocaleString()}</strong> người đã đăng ký
        </p>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="border px-4 py-2 pl-10 rounded-full w-full focus:ring-green-500 focus:border-green-500 transition duration-150 border-gray-300"
            value={localSearchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onBlur={applySearch}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    applySearch();
                }
            }}
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      {/* Bảng Hiển thị Dữ liệu */}
      <div className="overflow-x-auto w-full rounded-lg shadow-lg">
        <table className="min-w-full bg-white table-auto border-collapse">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th className="p-3 text-center text-sm font-semibold text-gray-700 w-10"><input type="checkbox" name="" id="" /></th>
              <th className="p-3 text-center text-sm font-semibold text-gray-700 w-24">ID</th>
              <th className="p-3 text-center text-sm font-semibold text-gray-700 w-60">Tài khoản</th>
              <th className="p-3 text-center text-sm font-semibold text-gray-700 w-40">Địa chỉ</th>
              <th className="p-3 text-center text-sm font-semibold text-gray-700 w-28">Giới tính</th>
              <th className="p-3 text-center text-sm font-semibold text-gray-700 w-28">Tích điểm</th>
              <th className="p-3 text-center text-sm font-semibold text-gray-700 w-40">SĐT</th>
              <th className="p-3 text-center text-sm font-semibold text-gray-700 w-16">Xem</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
                data.map((customer) => (
                    <tr key={customer._id} className="border-b hover:bg-green-50/50 transition duration-100">
                      <td className="p-3 text-sm text-gray-700 text-center">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-green-600 rounded" />
                      </td>
                      <td className="p-3 text-sm font-mono text-gray-600">{customer.id}</td>
                      <td className="p-3 text-sm text-gray-900 font-medium">
                          <div className="font-bold text-base text-blue-700">{customer.name}</div>
                          <div className={`text-xs mt-1 ${customer.status === 'Mới' ? 'text-red-500' : 'text-gray-500'}`}>
                              {customer.status} | {customer.date}
                          </div>
                      </td>
                      <td className="p-3 text-sm text-gray-700">{customer.city}</td>
                      <td className="p-3 text-sm text-gray-700">{customer.gender}</td>
                      <td className="p-3 text-sm font-semibold text-right text-orange-600">{customer.point.toLocaleString()}</td>
                      <td className="p-3 text-sm text-gray-700 font-mono">{customer.phone}</td>
                      <td className="p-3 text-center">
                        <button 
                            className="text-green-600 hover:text-green-800 transition"
                            onClick={() => setSelectedCustomer(customer)}
                        >
                            <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                ))
            ) : (
                <tr className="border-b">
                    <td colSpan={8} className="p-6 text-center text-lg text-gray-500">
                        Không tìm thấy khách hàng nào.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
          <button
            className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
            onClick={() => handlePageChange(1)}
            disabled={externalCurrentPage === 1}
          >
            &laquo;
          </button>
          <button
            className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
            onClick={() => handlePageChange(Math.max(1, externalCurrentPage - 1))}
            disabled={externalCurrentPage === 1}
          >
            &lsaquo;
          </button>

          {pageList.map((item, idx) =>
            item === "..." ? (
              <span key={`dot-${idx}`} className="px-2 text-gray-500">...</span>
            ) : (
              <button
                key={`page-${item}-${idx}`}
                onClick={() => handlePageChange(item as number)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition duration-150 ${
                  externalCurrentPage === item
                    ? "bg-green-600 text-white border-green-600 shadow-md"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            )
          )}

          <button
            className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
            onClick={() => handlePageChange(Math.min(totalPages, externalCurrentPage + 1))}
            disabled={externalCurrentPage === totalPages}
          >
            &rsaquo;
          </button>
          <button
            className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
            onClick={() => handlePageChange(totalPages)}
            disabled={externalCurrentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
      )}
      
      {/* Modal hiển thị chi tiết khách hàng */}
      {selectedCustomer && (
        <CustomerDetailModal 
            customer={selectedCustomer} 
            onClose={() => setSelectedCustomer(null)} 
        />
      )}
    </div>
  );
}