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
      <div className="w-full m-auto max-w-2xl diplayColom flex gap-2 p-4">
        {/* Left Side Thumbnails (Desktop) */}
        <div className="flex flex-wrap sideImageHidden flex-col gap-2 mt-4">
          {slides.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Thumb ${index + 1}`}
              onClick={() => selectSlide(index)}
              className={`w-30 h-30 object-cover cursor-pointer border-2 ${
                current === index
                  ? "border-white opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            />
          ))}
        </div>

        {/* Main Slide */}
        <div
          className="relative w-full mx-auto aspect-[4/6] overflow-hidden shadow-md cursor-pointer"
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

        {/* Bottom Thumbnails (Mobile) */}
        <div className="flex-wrap hidden lowerSlideImageShow gap-2 mt-4">
          {slides.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Thumb ${index + 1}`}
              onClick={() => selectSlide(index)}
              className={`w-20 h-30 object-cover cursor-pointer border-2 ${
                current === index
                  ? "border-white opacity-100"
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

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1040px) {
          .diplayColom {
            flex-direction: column;
          }
          .sideImageHidden {
            display: none;
          }
          .lowerSlideImageShow {
            display: flex;
          }
        }
      `}</style>
    </>
  );
};

export default SlideshowImage;
