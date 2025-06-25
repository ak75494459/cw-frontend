import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export function MyCarousel() {
  const autoplay = useRef(
    Autoplay({
      delay: 1500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <div className=" bg-[#DDD0C8] py-3">
      {/* Enhanced Heading */}
      <div className="text-center mt-10 mb-4">
        <h1 className="text-4xl font-bold text-[#333] tracking-wide relative inline-block">
          New Collections
          <span className="block h-[3px] bg-[#99775C] mt-2 w-1/2 mx-auto rounded-full"></span>
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Discover our latest arrivals curated with style
        </p>
      </div>

      {/* Carousel */}
      <div className="relative group">
        <Carousel
          plugins={[autoplay.current]}
          opts={{
            align: "start",
            dragFree: true,
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="flex">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="carousel-item basis-1/4 h-full " // <-- add group here
              >
                <div className="p-4 w-full h-[400px] overflow-hidden  relative">
                  {/* Image Container */}
                  <div className="w-full h-full relative overflow-hidden">
                    {/* Default Image */}
                    <img
                      src="https://www.nishorama.com/cdn/shop/files/IMG_6106.jpg?v=1747908590&width=750"
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-700 ease-in-out opacity-100 hover:opacity-0"
                    />

                    {/* Hover Image with Zoom-in Effect */}
                    <img
                      src="https://www.nishorama.com/cdn/shop/files/IMG_6134.jpg?v=1747992370&width=750"
                      alt={`Slide ${index + 1} Hover`}
                      className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-700 ease-in-out opacity-0 hover:opacity-100 hover:scale-110"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-200  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ChevronLeft className="w-5 h-5 text-black" />
          </CarouselPrevious>

          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-200  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ChevronRight className="w-5 h-5 text-black" />
          </CarouselNext>
        </Carousel>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .carousel-item {
            flex: 0 0 50%;
          }
        }

        @media (max-width: 600px) {
          .carousel-item {
            flex: 0 0 100%;
          }
        }
      `}</style>
    </div>
  );
}
