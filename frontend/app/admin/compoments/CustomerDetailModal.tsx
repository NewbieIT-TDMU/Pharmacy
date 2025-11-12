'use client';

import React from 'react';
import { X, User, Phone, MapPin, Gift, Calendar } from 'lucide-react';

interface Customer {
    _id: string;
    id: number;
    name: string;
    status: string;
    date: string;
    city: string;
    gender: 'Nam' | 'Nữ';
    point: number;
    phone: string;
}

interface CustomerDetailModalProps {
    customer: Customer;
    onClose: () => void;
}

export default function CustomerDetailModal({ customer, onClose }: CustomerDetailModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[100]">
            <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-2xl transform transition-all duration-300 scale-100">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">Chi tiết Khách hàng</h3>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body Content */}
                <div className="space-y-4">
                    <DetailItem icon={<User size={20} className="text-blue-500" />} label="Tài khoản" value={customer.name} />
                    <DetailItem icon={<Phone size={20} className="text-green-500" />} label="SĐT" value={customer.phone} />
                    <DetailItem icon={<MapPin size={20} className="text-red-500" />} label="Địa chỉ" value={customer.city} />
                    <DetailItem icon={<Gift size={20} className="text-orange-500" />} label="Tích điểm" value={customer.point.toLocaleString()} />
                    <DetailItem icon={<Calendar size={20} className="text-purple-500" />} label="Trạng thái ĐK" value={`${customer.status} | ${customer.date}`} />
                    <DetailItem icon={<User size={20} className="text-pink-500" />} label="Giới tính" value={customer.gender} />
                </div>
                
                {/* Footer */}
                <div className="mt-6 pt-4 border-t flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}

// Component phụ cho từng dòng chi tiết
const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
        <div className="mr-3">{icon}</div>
        <div className="flex-1">
            <p className="text-xs font-semibold uppercase text-gray-500">{label}</p>
            <p className="text-base font-medium text-gray-800">{value}</p>
        </div>
    </div>
);