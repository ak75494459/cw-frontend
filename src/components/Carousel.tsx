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
      "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1753034511/Pink_Beige_And_Yellow_Modern_Indian_Fashion_Instagram_Post_dzoldt.png",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1753034521/Gold_and_Black_Minimalist_Saree_House_Logo_xwlnkd.png",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1753069021/Pink_Beige_And_Yellow_Modern_Customer_Testimonial_Instagram_Post_kepm9x.png",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dmv8kh0yx/image/upload/v1753094298/Brown_and_Purple_Simple_Clothing_Offer_Instagram_Post_1_jptjh5.png",
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
          <span className="block h-[3px] bg-[#99775C] mt-2 w-1/2 m-auto  rounded-full"></span>
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
            loop: true,
            slidesToScroll: 1,
            containScroll: "trimSnaps",
          }}
          className="w-full"
        >
          <CarouselContent className="flex">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="carousel-item basis-1/4 h-[400px]" // 👈 Corrected height
              >
                <div className="p-4 w-full h-full overflow-hidden relative">
                  <div className="w-full h-full relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={`Product ${product.id}`}
                      className="w-full h-full object-cover absolute top-0 left-0 transition-transform duration-500 ease-in-out hover:scale-110"
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
          flex: 0 0 30%;
        }

        @media (max-width: 1300px) {
          .carousel-item {
            flex: 0 0 33%;
          }
        }
           @media (max-width: 1226px) {
          .carousel-item {
            flex: 0 0 38%;
          }
        }

         @media (max-width: 1058px) {
          .carousel-item {
            flex: 0 0 42%;
          }
        }
           @media (max-width: 974px) {
          .carousel-item {
            flex: 0 0 45%;
          }
        }
        
          @media (max-width: 882px) {
          .carousel-item {
            flex: 0 0 48%;
          }
        }

         @media (max-width: 845px) {
          .carousel-item {
            flex: 0 0 52%;
          }
        }

         @media (max-width: 778px) {
          .carousel-item {
            flex: 0 0 55%;
          }
        }

         @media (max-width: 725px) {
          .carousel-item {
            flex: 0 0 57%;
          }
        }

        @media (max-width: 699px) {
          .carousel-item {
            flex: 0 0 60%;
          }
        }

         @media (max-width: 665px) {
          .carousel-item {
            flex: 0 0 63%;
          }
        }

         @media (max-width: 622px) {
          .carousel-item {
            flex: 0 0 65%;
          }
        }



        @media (max-width: 600px) {
          .carousel-item {
            flex: 0 0 70%;
          }
        }
        
         @media (max-width: 578px) {
          .carousel-item {
            flex: 0 0 72%;
          }
        }
           @media (max-width: 544px) {
          .carousel-item {
            flex: 0 0 80%;
          }
        }
            @media (max-width: 486px) {
          .carousel-item {
            flex: 0 0 83%;
          }
        }
           @media (max-width: 476px) {
          .carousel-item {
            flex: 0 0 100%;
          }
        }

         @media (max-width: 443px) {
          .carousel-item {
            flex: 0 0 100%;
          }
        }
           @media (max-width: 354px) {
          .carousel-item {
            flex: 0 0 110%;
            marginRight: 0;
          }
        }
           @media (max-width: 360px) {
          .carousel-item {
            flex: 0 0 120%;
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
            opacity: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
