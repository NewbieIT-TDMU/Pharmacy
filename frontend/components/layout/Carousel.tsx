"use client";
import Image from "next/image";
import useCarousel from "@/hooks/useCarousel";

export default function Carousel() {
  const slides = [
    { src: "/images/pharmacy1.jpg", alt: "Slide 1" },
    { src: "/images/pharmacy2.jpg", alt: "Slide 2" },
    { src: "/images/pharmacy3.jpg", alt: "Slide 3" },
  ];

  const { activeIndex, prev, next, goTo, paused, setPaused } = useCarousel(
    slides.length,
    3000
  );

  return (
    <div
      className="relative mx-auto mt-5 overflow-hidden rounded-xl w-full max-w-[1200px] h-[400px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative min-w-full h-[400px] flex-shrink-0"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute top-1/2 left-4 -translate-y-1/2 w-14 h-14 rounded-full bg-white-200 bg-opacity-80 text-blue-800 hover:bg-white-600 hover:text-white flex items-center justify-center bottom shadow-lg transition-all duration-300 z-10 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <span className="text-[35px] leading-none translate-y-[1px]">
          &#8249;
        </span>
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-4 -translate-y-1/2 w-14 h-14 rounded-full bg-white-200 bg-opacity-80 text-blue-800 hover:bg-black-400 hover:text-white flex items-center justify-center shadow-lg transition-all duration-300 z-10 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <span className="text-[35px] leading-none translate-y-[1px]">
          &#8250;
        </span>
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-8 h-1 rounded-full transition-colors duration-300 ${
              index === activeIndex ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>

  );
}
