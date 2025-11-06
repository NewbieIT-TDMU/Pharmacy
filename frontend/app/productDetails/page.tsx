"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface Product {
  _id: string;
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
  unit: string;
  discount: number;
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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((item: any) => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        unit: product.unit,
        quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
  };

  if (loading) return <div className="text-center py-10">Đang tải sản phẩm...</div>;
  if (!product) return <div className="text-center py-10">Không tìm thấy sản phẩm.</div>;

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-[300px] h-[300px] object-contain rounded-lg shadow-md"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          
          <p className="text-blue-600 text-2xl font-bold mb-2">
            {product.price.toLocaleString()}₫
            <span className="text-gray-600 text-sm ml-1">/ {product.unit}</span>
          </p>

          <p className="text-gray-700 mb-6">{product.desc}</p>

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

          <button
            onClick={addToCart}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <ShoppingCart size={20} /> Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
}
