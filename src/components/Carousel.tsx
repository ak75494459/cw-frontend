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

const products = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1752882239/Raksha_3_swuual.png",
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
    <div className="bg-[#DDD0C8] py-8">
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-[#333] tracking-wide inline-block relative">
          New Collections
          <span className="block h-[3px] bg-[#99775C] mt-2 w-1/2 mx-auto rounded-full" />
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          Discover our latest arrivals curated with style
        </p>
      </div>

      {/* Carousel */}
      <div className="relative group">
        <Carousel
          plugins={[autoplay.current]}
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
            containScroll: "trimSnaps",
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-[24%] md:basis-[33%] sm:basis-[50%] xs:basis-[100%] px-2 h-[400px]"
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg shadow-md">
                  <img
                    src={product.image}
                    alt={`Product ${product.id}`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-100 hover:opacity-0"
                  />
                  <img
                    src={product.hoverImage}
                    alt={`Product ${product.id} Hover`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0 hover:opacity-100 hover:scale-105"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows */}
          <CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full flex items-center justify-center border bg-white shadow-md">
            <ChevronLeft className="w-5 h-5 text-black" />
          </CarouselPrevious>

          <CarouselNext className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full flex items-center justify-center border bg-white shadow-md">
            <ChevronRight className="w-5 h-5 text-black" />
          </CarouselNext>
        </Carousel>
      </div>
    </div>
  );
}
