import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

interface SlideshowImageProps {
  slides: string[];
}

const SlideshowImage: React.FC<SlideshowImageProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const selectSlide = (index: number) => setCurrent(index);

  return (
    <>
      <div className="w-full m-auto max-w-2xl diplayColom flex gap-2 p-4">
        {/* Side Thumbnails (desktop only) */}
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

        {/* Main Image */}
        <div
          {...handlers}
          className="relative w-[70%] h-[70%] lg:w-full md:w-full mx-auto aspect-[4/6] overflow-hidden shadow-md cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={slides[current]}
            alt={`Slide ${current + 1}`}
            className="w-full h-full object-cover transition-transform duration-300"
          />

          {/* Slide Indicator */}
          <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1">
            {current + 1} / {slides.length}
          </div>

          {/* Prev Button (desktop only) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          >
            ❮
          </button>

          {/* Next Button (desktop only) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          >
            ❯
          </button>
        </div>

        {/* Bottom Thumbnails (mobile only) */}
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

      {/* Fullscreen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <img
            src={slides[current]}
            alt="Enlarged"
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

      {/* Responsive Styles (keep your original) */}
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
