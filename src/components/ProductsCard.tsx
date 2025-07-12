import type { Product } from "@/types";
import { Link } from "react-router-dom";

type Props = {
  results: Product[];
  isLoading: boolean;
};

const ProductsCard = ({ results, isLoading }: Props) => {
  const truncateWords = (text: string, wordLimit: number) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  if (isLoading) {
    return (
      <div className="w-full py-10 text-center text-base font-semibold">
        Loading...
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="w-full py-10 text-center text-base font-semibold">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 py-4">
      {results.map((item) => {
        const hasDiscount = item.discount && item.discount > 0;
        const discountedPrice = hasDiscount
          ? item.price - (item.price * item.discount) / 100
          : item.price;

        // Always show 3 words maximum for consistency on all screens
        const displayName = truncateWords(item.productName, 3);

        return (
          <Link
            to={`/products/${item._id}`}
            key={item._id}
            className="m-2 md:m-4"
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded">
              <img
                src={item.productImages?.[0] || "/placeholder.jpg"}
                alt={item.productName || "Product image"}
                className="w-full h-full object-cover object-top transition-opacity duration-300"
              />
              {item.productImages?.[1] && (
                <img
                  src={item.productImages[1]}
                  alt="Hover image"
                  className="absolute top-0 left-0 w-full h-full object-cover object-top opacity-0 hover:opacity-100 transition-opacity duration-300"
                />
              )}
            </div>

            <div className="p-2 flex flex-col justify-center items-center">
              <div className="text-xs font-medium truncate text-center">
                {displayName}
              </div>
              <div className="text-[10px] text-gray-500 text-center">
                {item.brand}
              </div>
              <div className="text-xs font-semibold text-red-600 mt-1 text-center">
                {hasDiscount ? (
                  <>
                    <span className="line-through text-gray-500 mr-1">
                      ₹{item.price}
                    </span>
                    ₹{Math.round(discountedPrice)}{" "}
                    <span className="text-green-600 text-[10px] ml-1">
                      ({item.discount}% OFF)
                    </span>
                  </>
                ) : (
                  <>₹{item.price}</>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsCard;
