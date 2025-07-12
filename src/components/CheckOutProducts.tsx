import React, { useState } from "react";

interface SlideshowImageProps {
  slides: string[];
}

const SlideshowImage: React.FC<SlideshowImageProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectSlide = (index: number) => setCurrent(index);

  return (
    <>
      {/* Layout wrapper */}
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-4 p-4">
        {/* Vertical thumbnails for large screens */}
        <div className="hidden lg:flex flex-col gap-2 overflow-y-auto max-h-[80vh]">
          {slides.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Thumb ${index + 1}`}
              onClick={() => selectSlide(index)}
              className={`w-20 h-28 object-cover cursor-pointer rounded-md border-2 transition ${
                current === index
                  ? "border-blue-500 opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div
          className="relative w-full cursor-pointer rounded-lg overflow-hidden shadow-md"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="w-full h-[65vw] sm:h-[60vw] md:h-[45vw] lg:h-[35vw] xl:h-[30vw] max-h-[700px]">
            <img
              src={slides[current]}
              alt={`Slide ${current + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-br-md">
            {current + 1} / {slides.length}
          </div>
        </div>
      </div>

      {/* Bottom Thumbnails for Mobile/Tablet */}
      <div className="lg:hidden grid grid-cols-4 gap-2 px-4 pb-4">
        {slides.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumb ${index + 1}`}
            onClick={() => selectSlide(index)}
            className={`w-full aspect-[2/3] object-cover cursor-pointer rounded border-2 transition ${
              current === index
                ? "border-blue-500 opacity-100"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          />
        ))}
      </div>

      {/* Modal Fullscreen Viewer */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={slides[current]}
            alt="Zoomed Slide"
            className="max-w-[90%] max-h-[90%] object-contain rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
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
