"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  brand?: string;
  image: string;
  usage?: string;
  ingredients?: string[];
  origin?: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/id/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-10">Đang tải sản phẩm...</div>;
  if (!product) return <div className="text-center py-10">Không tìm thấy sản phẩm.</div>;

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Thông tin tổng quan */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Hình ảnh sản phẩm */}
        <div className="flex flex-col items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-[300px] h-[300px] object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Chi tiết sản phẩm */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          {product.brand && (
            <p className="text-gray-600 mb-2">
              Thương hiệu: <span className="font-medium">{product.brand}</span>
            </p>
          )}
          <p className="text-blue-600 text-2xl font-bold mb-4">
            {product.price.toLocaleString()}₫
          </p>

          <div className="flex items-center mb-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 border rounded-l-lg hover:bg-gray-100"
            >
              <Minus size={18} />
            </button>
            <span className="px-4 py-2 border-t border-b">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 border rounded-r-lg hover:bg-gray-100"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
              <ShoppingCart size={20} /> Thêm vào giỏ
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Tabs mô tả sản phẩm */}
      <div className="mt-12 border-t pt-6">
        <h2 className="text-2xl font-semibold mb-4">Mô tả sản phẩm</h2>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        {product.ingredients && (
          <>
            <h3 className="text-lg font-semibold mt-6">Thành phần</h3>
            <ul className="list-disc pl-6 text-gray-700">
              {product.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </>
        )}

        {product.usage && (
          <>
            <h3 className="text-lg font-semibold mt-6">Cách dùng</h3>
            <p className="text-gray-700">{product.usage}</p>
          </>
        )}

        {product.origin && (
          <>
            <h3 className="text-lg font-semibold mt-6">Xuất xứ</h3>
            <p className="text-gray-700">{product.origin}</p>
          </>
        )}
      </div>
    </div>
  );
}
