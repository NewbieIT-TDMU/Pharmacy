"use client";
import { useRef, useEffect, useState } from "react";
import MiniCart from "../carts/MiniCart";
import useProducts from "@/hooks/useProducts";
import useCartActions from "@/hooks/useCartActions";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { BsFire } from "react-icons/bs";
import {
  Trophy,
  Brain,
  Pill,
  HeartPulse,
  Shield,
  Stethoscope,
  Cross,
  Apple,
  Syringe,
  Smile,
  User,
  Heart,
  LucideIcon,
} from "lucide-react";

interface Category {
  icon: string;
  title: string;
  products: number;
}

interface HealthItem {
  id: number;
  image: string;
  title: string;
  description: string;
}
const iconMap: { [key: string]: LucideIcon } = {
  Brain: Brain,
  Pill: Pill,
  HeartPulse: HeartPulse,
  Shield: Shield,
  Stethoscope: Stethoscope,
  Cross: Cross,
  Apple: Apple,
  Syringe: Syringe,
  Smile: Smile,
  User: User,
  Heart: Heart,
};

interface DynamicIconProps {
  name: string;
  className?: string;
}

const mockBrands = [
  {
    id: 1,
    logo: "/images/logo-JpanWell.jpg",
    image: "/images/thuoc.jpg",
    discount: "Giảm đến 35%",
  },
  {
    id: 2,
    logo: "/images/logo-Ocavill.jpg",
    image: "/images/thuoc10.jpg",
    discount: "Giảm đến 20%",
  },
  {
    id: 3,
    logo: "/images/logo-Brauer.jpg",
    image: "/images/thuoc11.jpg",
    discount: "Giảm đến 20%",
  },
  {
    id: 4,
    logo: "/images/logo-VitaminsForLife.jpg",
    image: "/images/thuoc12.jpg",
    discount: "Giảm đến 20%",
  },
  {
    id: 5,
    logo: "/images/logo-Vitabiotics.jpg",
    image: "/images/thuoc13.jpg",
    discount: "Giảm đến 20%",
  },
  {
    id: 6,
    logo: "/images/logo-Datino.jpg",
    image: "/images/thuoc14.jpg",
    discount: "Giảm đến 20%",
  },
  {
    id: 7,
    logo: "/images/logo-Okamoto.jpg",
    image: "/images/thuoc15.jpg",
    discount: "Giảm đến 20%",
  },
  {
    id: 8,
    logo: "/images/logo-PearlieWhite.jpg",
    image: "/images/thuoc16.jpg",
    discount: "Giảm đến 20%",
  },
  {
    id: 9,
    logo: "/images/logo-KamiCare.jpg",
    image: "/images/thuoc17.jpg",
    discount: "Giảm đến 20%",
  },
];

const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className }) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

export default function ProductSection() {
  const { products, loading, error } = useProducts();
  const { handleAddToCart, showMiniCart, addedProduct, closeMiniCart } =
    useCartActions();

  const containerRefTop = useRef<HTMLDivElement>(null);
  const containerRefBottom = useRef<HTMLDivElement>(null);

  const [showLeftTop, setShowLeftTop] = useState(false);
  const [showRightTop, setShowRightTop] = useState(true);
  const [showLeftBottom, setShowLeftBottom] = useState(false);
  const [showRightBottom, setShowRightBottom] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/data/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Lỗi khi tải JSON:", err));
  }, []);

  const [data, setData] = useState<HealthItem[]>([]);

  useEffect(() => {
    fetch("/data/testItems.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));
  }, []);

  const ITEM_WIDTH = 220;
  const GAP = 16;
  const VISIBLE_COUNT = 5;

  const handleScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "next" | "prev"
  ) => {
    const el = ref.current;
    if (!el) return;

    const step = el.clientWidth;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const current = el.scrollLeft;

    let target =
      direction === "next"
        ? Math.min(current + step, maxScrollLeft)
        : Math.max(current - step, 0);

    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const updateScrollButtons = (
    el: HTMLDivElement,
    setLeft: React.Dispatch<React.SetStateAction<boolean>>,
    setRight: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const maxScroll = el.scrollWidth - el.clientWidth;
    setLeft(el.scrollLeft > 0);
    setRight(el.scrollLeft < maxScroll - 1);
  };

  useEffect(() => {
    const elTop = containerRefTop.current;
    const elBottom = containerRefBottom.current;
    if (!elTop || !elBottom) return;

    const onScrollTop = () =>
      updateScrollButtons(elTop, setShowLeftTop, setShowRightTop);
    const onScrollBottom = () =>
      updateScrollButtons(elBottom, setShowLeftBottom, setShowRightBottom);

    elTop.addEventListener("scroll", onScrollTop);
    elBottom.addEventListener("scroll", onScrollBottom);
    onScrollTop();
    onScrollBottom();

    return () => {
      elTop.removeEventListener("scroll", onScrollTop);
      elBottom.removeEventListener("scroll", onScrollBottom);
    };
  }, [products]);

  return (
    <section className="py-6 container mx-auto">
      <div className="flex justify-between gap-4 mb-10">
        {[
          {
            icon: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
            label: "Cần mua thuốc",
          },
          {
            icon: "https://cdn-icons-png.flaticon.com/512/2927/2927347.png",
            label: "Tư vấn với Dược Sỹ",
          },
          {
            icon: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
            label: "Đơn của tôi",
          },
          {
            icon: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
            label: "Tìm nhà thuốc",
          },
          {
            icon: "https://cdn-icons-png.flaticon.com/512/2947/2947960.png",
            label: "Tiêm Vắc xin",
          },
          {
            icon: "https://cdn-icons-png.flaticon.com/512/992/992651.png",
            label: "Tra thuốc chính hãng",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white rounded-xl shadow p-4 min-w-[180px] cursor-pointer "
          >
            <img src={item.icon} alt={item.label} className="w-10 h-10" />
            <span className="font-medium text-gray-800">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="relative mx-auto w-full bg-blue-100 rounded-3xl px-6 py-10 shadow-inner mb-12">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white text-lg font-semibold px-10 py-2 rounded-full shadow-md">
          Sản phẩm giảm giá
        </div>

        <div className="relative mt-6">
          {showLeftTop && (
            <button
              onClick={() => handleScroll(containerRefTop, "prev")}
              className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center z-20"
            >
              <SlArrowLeft />
            </button>
          )}

          <div
            ref={containerRefTop}
            className="overflow-x-hidden scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="flex gap-4">
              {loading
                ? Array.from({ length: VISIBLE_COUNT }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-200 animate-pulse rounded-2xl"
                      style={{ width: 180, height: 300 }}
                    />
                  ))
                : products
                    .filter((p) => p.discount && p.discount > 0)
                    .map((p) => (
                      <div
                        key={p._id}
                        className="relative bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex-shrink-0 border border-transparent hover:border-blue-600"
                        style={{ width: 210 }}
                      >
                        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          -{p.discount}%
                        </div>

                        <div className="bg-gray-50 rounded-xl flex items-center justify-center h-44 mb-3 overflow-hidden">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="max-h-40 product-desc object-contain hover:scale-105 transition-transform duration-300"
                            style={{ width: 300 }}
                          />
                        </div>

                        <h3 className="text-sm font-semibold line-clamp-2 min-h-[38px] text-gray-800 product-desc">
                          {p.name}
                        </h3>

                        <p className="text-gray-500 text-xs line-clamp-2 mt-1 mb-2 product-desc">
                          {p.desc}
                        </p>

                        <div className="mt-1">
                          <span className="text-gray-400 line-through text-sm mr-2">
                            {p.oldPrice
                              ? p.oldPrice.toLocaleString("vi-VN")
                              : (p.price / (p.discount / 100)).toLocaleString(
                                  "vi-VN"
                                )}
                            ₫
                          </span>
                          <span className="text-blue-600 font-semibold text-base">
                            {p.price.toLocaleString("vi-VN")}₫
                          </span>
                          <span className="text-gray-500 text-sm ml-1">
                            / {p.unit || "Hộp"}
                          </span>
                        </div>

                        <div className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-md inline-block mt-2">
                          Hộp {p.quantity || "1"}
                        </div>

                        <button
                          onClick={() => handleAddToCart(p)}
                          className="mt-4 w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all text-sm font-semibold"
                        >
                          Thêm vào giỏ
                        </button>
                      </div>
                    ))}
            </div>
          </div>

          {showRightTop && (
            <button
              onClick={() => handleScroll(containerRefTop, "next")}
              className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center z-20"
            >
              <SlArrowRight />
            </button>
          )}
        </div>
      </div>

      <div className="mx-auto w-full">
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="text-green-600 w-6 h-6" />
          <h2 className="text-xl font-semibold text-green-700">
            Danh mục nổi bật
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 my-8">
          {categories.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-transparent hover:border-blue-600 transition-all p-5 rounded-2xl shadow-sm text-center flex flex-col items-center cursor-pointer group hover:shadow-md"
            >
              <DynamicIcon
                name={item.icon}
                className="w-8 h-8 text-blue-600 mb-3 transition-transform group-hover:scale-110"
              />
              <h3 className="font-medium text-gray-800">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.products} sản phẩm</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full">
        <div className="flex items-center gap-2">
          <img src="/images/checklist.png" alt="Thương hiệu uy tín" />
          <h2 className="text-xl font-semibold text-green-700 py-6 ">
            Thương hiệu yêu thích
          </h2>
        </div>

        <div className="relative">
          {showLeftBottom && (
            <button
              onClick={() => handleScroll(containerRefBottom, "prev")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white text-blue-600 shadow-lg rounded-full w-10 h-10 flex items-center justify-center z-20 focus:outline-none"
              aria-label="prev"
            >
              <SlArrowLeft />
            </button>
          )}

          <div
            ref={containerRefBottom}
            className="overflow-x-hidden scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="flex gap-4">
              {mockBrands.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-2 rounded-xl border border-transparent hover:border-blue-500 duration-200 cursor-pointer flex-shrink-0"
                  style={{ width: ITEM_WIDTH }}
                >
                  <div className="h-40 flex items-center justify-center p-2 mb-2">
                    <img
                      src={item.image}
                      alt="Sản phẩm"
                      className="object-contain max-h-full"
                    />
                  </div>

                  <div className="h-16 flex items-center justify-center rounded-xl border border-gray-200">
                    <img
                      src={item.logo}
                      alt="Logo thương hiệu"
                      className="object-contain max-h-full"
                    />
                  </div>

                  <div className="text-center font-medium text-blue-600 mt-2">
                    {item.discount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showRightBottom && (
            <button
              onClick={() => handleScroll(containerRefBottom, "next")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white text-blue-600 shadow-lg rounded-full w-10 h-10 flex items-center justify-center z-20 focus:outline-none"
              aria-label="next"
            >
              <SlArrowRight />
            </button>
          )}
        </div>
      </div>

      <div className="relative mt-10 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-3xl py-12 overflow-hidden ">
        <div className="mb-8 px-10">
          <h2 className="text-3xl font-bold">Kiểm tra sức khỏe</h2>
          <p className="text-blue-100 text-sm mt-2">
            Kết quả đánh giá sẽ cho bạn lời khuyên xử trí phù hợp!
          </p>
        </div>

        <div className="flex gap-3  overflow-x-hidden scrollbar-hide px-6">
          {data.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white  text-gray-800 rounded-2xl shadow-md w-72 flex-shrink-0 p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 object-contain"
                />
                <div className="mx-auto w-full">
                  <h3 className="text-sm font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <button className="text-blue-600 font-semibold mt-6 flex  gap-2">
                    {item.description}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full">
        <div className="flex items-center gap-2">
          <BsFire className="text-green-600 w-6 h-6" />
          <h2 className="text-xl font-semibold text-green-700 py-6 ">
            Sản phẩm bán chạy
          </h2>
        </div>

        <div className="relative">
          {showLeftTop && (
            <button
              onClick={() => handleScroll(containerRefTop, "prev")}
              className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white text-blue-600 shadow-md rounded-full w-10 h-10 flex items-center justify-center z-20 focus:outline-none"
              aria-label="prev"
            >
              <SlArrowLeft />
            </button>
          )}

          <div
            ref={containerRefTop}
            className="overflow-x-hidden scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="flex gap-4">
              {loading
                ? Array.from({ length: VISIBLE_COUNT }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-200 animate-pulse rounded-xl"
                      style={{ width: ITEM_WIDTH }}
                    />
                  ))
                : products.map((p) => (
                    <div
                      key={p._id}
                      className="bg-white p-4 rounded-xl shadow transition-colors duration-200 border border-transparent hover:border-blue-500"
                      style={{
                        width: ITEM_WIDTH,
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="object-contain mb-2 mx-auto"
                      />
                      <h3 className="text-sm font-semibold line-clamp-2 product-desc">
                        {p.name}
                      </h3>
                      <p className="text-gray-500 text-xs line-clamp-2 product-desc">
                        {p.desc}
                      </p>
                      <div className="text-green-600 font-semibold mt-1">
                        {p.price.toLocaleString("vi-VN")}₫ / {p.unit || "viên"}
                      </div>

                      <button
                        onClick={() => handleAddToCart(p)}
                        className="mt-2 w-full py-1 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition-colors"
                      >
                        Thêm vào giỏ
                      </button>
                    </div>
                  ))}
            </div>
          </div>

          {showRightTop && (
            <button
              onClick={() => handleScroll(containerRefTop, "next")}
              className="absolute -right-6  top-1/2 -translate-y-1/2 bg-white text-blue-600 shadow-md rounded-full w-12 h-12 flex items-center justify-center z-20 focus:outline-none"
              aria-label="next"
            >
              <SlArrowRight />
            </button>
          )}
        </div>
      </div>

      <MiniCart
        show={showMiniCart}
        product={addedProduct}
        onClose={closeMiniCart}
      />
    </section>
  );
}
