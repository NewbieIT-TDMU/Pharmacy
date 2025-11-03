import { useState } from "react";
import toast from "react-hot-toast";
import useCartCount from "@/hooks/useCartCount";

export default function useCartActions() {
  const { addToCart } = useCartCount();
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [addedProduct, setAddedProduct] = useState<any | null>(null);

  const handleAddToCart = async (product: any) => {
    try {
      const res = await fetch("http://localhost:5000/api/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        }),
      });

      if (!res.ok) throw new Error("Lỗi khi thêm vào giỏ hàng!");

      await res.json();
      addToCart({ id: product._id, name: product.name, quantity: 1 });
      toast.success(`${product.name} đã được thêm vào giỏ!`);

      setAddedProduct(product);
      setShowMiniCart(true);
      setTimeout(() => setShowMiniCart(false), 3000);
    } catch (err: any) {
      toast.error(err.message || "Không thể kết nối server!");
    }
  };

  return {
    handleAddToCart,
    showMiniCart,
    addedProduct,
    closeMiniCart: () => setShowMiniCart(false),
  };
}
