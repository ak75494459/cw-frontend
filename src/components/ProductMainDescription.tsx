import { useState } from "react";
import type { Product } from "@/types";

type Props = {
  product: Product;
};

const ProductMainDescription = ({ product }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const fullDescription =
    product.productDescription || "No description available for this product.";
  const truncated = fullDescription.slice(0, 200);

  return (
    <div className="w-full mt-6 p-6 bg-white space-y-6">
      {/* Product Description */}

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Product Description
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          <span className="block sm:hidden">
            {isExpanded ? fullDescription : truncated}
            {fullDescription.length > 200 && (
              <button
                className="text-blue-600 ml-1 underline"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            )}
          </span>
          <span className="hidden sm:block">{fullDescription}</span>
        </p>
      </div>

      {/* Exchange & Refund Policy */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Exchange & Refund Policy
        </h2>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Items can be exchanged within 7 days of delivery.</li>
          <li>Refunds are applicable only for defective or incorrect items.</li>
          <li>
            Product must be unused and in original packaging for any returns.
          </li>
          <li>Shipping charges are non-refundable.</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductMainDescription;
