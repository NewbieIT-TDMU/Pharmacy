import { useState, useEffect, useRef } from "react";

export default function useCarousel(length: number, interval = 3000) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % length);
      }, interval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, length, interval]);

  const prev = () =>
    setActiveIndex((prevIndex) => (prevIndex === 0 ? length - 1 : prevIndex - 1));
  const next = () => setActiveIndex((prevIndex) => (prevIndex + 1) % length);
  const goTo = (index: number) => setActiveIndex(index);

  return { activeIndex, prev, next, goTo, paused, setPaused };
}
