import { useGetProducts } from "@/api/ProductApi";
import ProductsCard from "@/components/ProductsCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const { results, isLoading } = useGetProducts({ page: 1 });
  useEffect(() => {
    AOS.init({
      duration: 3000, // animation duration in ms
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <div data-aos="fade-up" className=" mx-auto px-4 ">
      {/* Stylish Heading */}
      <div className="text-center mb-10">
        <div className="mt-4 h-1 w-16 mx-auto bg-black rounded-full" />
      </div>

      {/* Product Cards */}
      <ProductsCard results={results.data} isLoading={isLoading} />

      {/* View More Button */}
      <div className="mt-5 flex justify-center">
        <Link
          to="/products"
          className="group inline-flex items-center gap-2 rounded-md border border-black px-6 py-2 text-black font-medium transition-all hover:bg-[#DDD0C8] hover:text-[#323232] hover:shadow-md"
        >
          <span>View More</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProductsPage;
