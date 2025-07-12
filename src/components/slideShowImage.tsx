import React, { useState } from "react";

interface SlideshowImageProps {
  slides: string[]; // array of image URLs
}

const SlideshowImage: React.FC<SlideshowImageProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <>
      {/* Slideshow Layout */}
      <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-4 p-4">
        {/* Left Side Thumbnails (Desktop) */}
        <div className="hidden lg:flex flex-col gap-3 max-h-[30rem] overflow-y-auto">
          {slides.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Thumb ${index + 1}`}
              onClick={() => selectSlide(index)}
              className={`w-24 h-32 object-cover cursor-pointer rounded border-2 transition ${
                current === index
                  ? "border-blue-500 opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            />
          ))}
        </div>

        {/* Main Slide */}
        <div
          className="relative flex-1 aspect-[4/6] max-h-[80vh] overflow-hidden rounded shadow-md cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={slides[current]}
            alt={`Slide ${current + 1}`}
            className="w-full h-full object-cover transition-transform duration-300"
          />
          <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1">
            {current + 1} / {slides.length}
          </div>
        </div>

        {/* Bottom Thumbnails (Mobile / Tablet) */}
        <div className="flex flex-wrap lg:hidden justify-center gap-2 mt-4">
          {slides.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Thumb ${index + 1}`}
              onClick={() => selectSlide(index)}
              className={`w-20 h-28 sm:w-24 sm:h-32 object-cover cursor-pointer rounded border-2 transition ${
                current === index
                  ? "border-blue-500 opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={slides[current]}
            alt="Enlarged"
            className="max-w-[90%] max-h-[90%] object-contain rounded shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
          />
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default SlideshowImage;
