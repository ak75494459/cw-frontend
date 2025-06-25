import type { Product } from "@/types";

type Props = {
  results: Product[];
  isLoading: boolean;
};

const ProductsCard = ({ results, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="w-full py-10 text-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="w-full py-10 text-center text-lg font-semibold">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2  py-3">
      {results.map((item) => {
        const hasDiscount = item.discount && item.discount > 0;
        const discountedPrice = hasDiscount
          ? item.price - (item.price * item.discount) / 100
          : item.price;

        return (
          <a
            href={`/products/${item._id}`}
            key={item._id}
            className=" m-5"
            onClick={() => {
              console.log(item._id);
            }}
          >
            <div className="relative w-full h-[30rem] overflow-hidden">
              {/* Image 1 (default) */}
              <img
                src={item.productImages?.[0] || "/placeholder.jpg"}
                alt={item.productName || "Product image"}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {/* Image 2 (hover image) */}
              {item.productImages?.[1] && (
                <img
                  src={item.productImages[1]}
                  alt="Hover image"
                  className="w-full h-full object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                />
              )}
            </div>

            <div className="p-2 flex flex-col justify-center items-center">
              <div className="text-sm font-medium truncate">
                {item.productName}
              </div>
              <div className="text-xs text-gray-500">{item.brand}</div>

              <div className="text-sm font-semibold text-red-600 mt-1">
                {hasDiscount ? (
                  <>
                    <span className="line-through text-gray-500 mr-1">
                      ₹{item.price}
                    </span>
                    ₹{Math.round(discountedPrice)}{" "}
                    <span className="text-green-600 text-xs ml-1">
                      ({item.discount}% OFF)
                    </span>
                  </>
                ) : (
                  <>₹{item.price}</>
                )}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default ProductsCard;
