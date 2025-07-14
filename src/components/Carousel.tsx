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

// Product data array
const products = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1752501648/ChatGPT_Image_Jul_14_2025_at_07_30_30_PM_nlem2s.png",
    hoverImage:
      "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1752266845/stcfzxbuvuioajgc5zin.jpg",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1752500793/ChatGPT_Image_Jul_14_2025_07_15_32_PM_f24btk.png",
    hoverImage:
      "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1752268038/rw90y4ppf7gu5jsx2p84.jpg",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1752502753/ChatGPT_Image_Jul_14_2025_at_07_48_20_PM_ascj4u.png",
    hoverImage:
      "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1752271926/babxfck6lfzpb7uaahqp.jpg",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1752501830/ChatGPT_Image_Jul_14_2025_07_33_03_PM_hbfk6q.png",
    hoverImage:
      "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1752273453/v3rdzyu6xqybbw1fwimh.jpg",
  },
];

export function MyCarousel() {
  const autoplay = useRef(
    Autoplay({
      delay: 1500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <div className="bg-[#DDD0C8] py-3">
      {/* Heading */}
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
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="carousel-item basis-1/4 h-full"
              >
                <div className="p-4 w-full h-[500px] sm:h-[400px] md:h-[400px] overflow-hidden relative">
                  <div className="w-full h-full relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={`Product ${product.id}`}
                      className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-700 ease-in-out opacity-100 hover:opacity-0"
                    />
                    <img
                      src={product.hoverImage}
                      alt={`Product ${product.id} Hover`}
                      className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-700 ease-in-out opacity-0 hover:opacity-100 hover:scale-110"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows */}
          <CarouselPrevious className="carousel-arrow opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full flex items-center justify-center border-0">
            <ChevronLeft className="w-5 h-5 text-black font-bold" />
          </CarouselPrevious>

          <CarouselNext className="carousel-arrow opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full flex items-center justify-center border-0">
            <ChevronRight className="w-5 h-5 text-black font-bold" />
          </CarouselNext>
        </Carousel>
      </div>

      <style>{`
        .carousel-item {
          flex: 0 0 25%;
        }

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

        .carousel-arrow {
          background-color: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }

        @media (max-width: 1000px) {
          .carousel-arrow {
            background-color: transparent;
            box-shadow: none;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
