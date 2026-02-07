import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const images = [
  "https://images-static.nykaa.com/uploads/fb50df95-37c2-42f1-9a17-974ac83a492a.png?tr=cm-pad_resize,w-1800",
  "https://images-static.nykaa.com/uploads/71a3175c-469e-4ff3-a7ab-2b7bac53e0b0.jpg?tr=cm-pad_resize,w-1800",
  "https://images-static.nykaa.com/uploads/02cd2c12-46fa-4087-9527-d4c20b6790f6.jpg?tr=cm-pad_resize,w-1800",
  "https://images-static.nykaa.com/uploads/c05f718e-d41f-4fcc-afbf-406103f98d90.jpg?tr=cm-pad_resize,w-1800",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full overflow-hidden mt-20">
      {/* Images */}
      <div
        className="flex transition-transform ease-in-out duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white"
      >
        <FaArrowLeft className="text-xl text-gray-700" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white"
      >
        <FaArrowRight className="text-xl text-gray-700" />
      </button>
    </div>
  );
}
