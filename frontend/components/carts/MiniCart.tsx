"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

interface MiniCartProps {
  show: boolean;
  product: any | null;
  onClose: () => void;
}

export default function MiniCart({ show, product, onClose }: MiniCartProps) {
  const router = useRouter();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 bg-white space-y-6 border border-green-300 shadow-lg rounded-2xl p-4 flex items-center space-x-4 cursor-pointer z-50"
          onClick={() => router.push("/cart")}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 object-cover rounded-lg border"
          />
          <div>
            <p className="text-green-700 font-semibold">{product.name}</p>
            <p className="text-sm text-gray-600">
              Đã thêm vào giỏ hàng ({product.price.toLocaleString()}₫)
            </p>
          </div>

          <Link href="/cart">
            <div className="absolute bottom-2 right-3 text-blue-600 hover:underline text-sm ">
              Xem giỏ hàng
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
