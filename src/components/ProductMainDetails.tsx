import React, { useState } from "react";
import type { Product } from "@/types";
import { useCreateAndUpdateCart, useGetMyCartData } from "@/api/MyCartApi";
import { useCheckout } from "@/context/CheckOutContext";
import CheckoutOverlay from "./CheckOutOverlay";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

interface ProductDetailsProps {
  product: Product;
}

const standardSizes = ["XS", "S", "M", "L"];

const ProductMainDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [customSizeInput, setCustomSizeInput] = useState("");
  const [customSizeConfirmed, setCustomSizeConfirmed] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false); // 👈 NEW
  const { addtoCart, isPending } = useCreateAndUpdateCart();
  const { setItems } = useCheckout();
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const { refetchCart } = useGetMyCartData();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleSizeSelect = (size: string, isAvailable: boolean) => {
    if (isAvailable) {
      setSelectedSize(size);
      setCustomSizeInput("");
      setCustomSizeConfirmed(false);
      setShowSizeError(false);
    }
  };

  const handleConfirmCustomSize = () => {
    if (customSizeInput.trim() !== "") {
      const confirmedSize = customSizeInput.trim();
      setSelectedSize(confirmedSize);
      setCustomSizeConfirmed(true);
      setShowSizeError(false);
    }
  };

  const handleAddtoCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add to cart");
      return;
    }
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }

    await addtoCart({
      product: product._id,
      quantity: quantity,
      size: selectedSize,
    });

    await refetchCart();
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      await loginWithRedirect({
        appState: { returnTo: window.location.pathname },
      });
      return;
    }

    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }

    setItems({
      items: [
        {
          _id: product._id,
          quantity: quantity,
          size: selectedSize,
          product: {
            _id: product._id,
            productName: product.productName,
            brand: product.brand,
            price: product.price,
            category: product.category,
            productImages: product.productImages ?? [],
            discount: product.discount,
          },
        },
      ],
    });

    setOverlayOpen(true);
  };

  return (
    <>
      <div className="w-full p-6 bg-white space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {product.productName}
        </h1>

        {/* Price */}
        <div>
          <p className="font-semibold">Price:</p>
          {product.discount && product.discount > 0 ? (
            <div className="text-xl">
              <span className="line-through text-gray-500 mr-2">
                ₹{product.price.toFixed(2)}
              </span>
              <span className="text-red-600 font-semibold">
                ₹
                {(
                  product.price -
                  (product.price * product.discount) / 100
                ).toFixed(2)}
              </span>
              <span className="ml-2 text-green-600 text-sm">
                ({product.discount}% OFF)
              </span>
            </div>
          ) : (
            <p className="text-xl">₹{product.price.toFixed(2)}</p>
          )}
        </div>

        {/* Brand & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-semibold">Brand:</p>
            <p>{product.brand}</p>
          </div>
          <div>
            <p className="font-semibold">Category:</p>
            <p>{product.category}</p>
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <p className="font-semibold">Choose Size:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {standardSizes.map((size) => {
              const isAvailable = product.sizes.includes(size);
              const isSelected =
                selectedSize === size && customSizeInput === "";
              return (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size, isAvailable)}
                  disabled={!isAvailable}
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-all duration-200 ${
                    isAvailable
                      ? isSelected
                        ? "bg-[#492822] text-white border-[#492822]"
                        : "text-[#492822] border-[#492822] hover:bg-[#492822] hover:text-white"
                      : "text-gray-400 border-gray-300 line-through cursor-not-allowed"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Size Chart */}
        <div
          className="flex gap-1 items-center mt-2 cursor-pointer hover:underline"
          onClick={() => setShowSizeChart(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-ruler-icon lucide-ruler"
          >
            <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
            <path d="m14.5 12.5 2-2" />
            <path d="m11.5 9.5 2-2" />
            <path d="m8.5 6.5 2-2" />
            <path d="m17.5 15.5 2-2" />
          </svg>
          <p>Size Chart</p>
        </div>

        {/* Custom Size Input */}
        <div className="mt-4">
          <label htmlFor="customSize" className="block font-semibold mb-1">
            Customize Size:
          </label>
          <input
            id="customSize"
            type="text"
            value={customSizeInput}
            maxLength={100}
            onChange={(e) => {
              const value = e.target.value;
              setCustomSizeInput(value);
              setSelectedSize(value.trim());
              setCustomSizeConfirmed(false);
            }}
            placeholder="Enter your size (e.g., 34, Medium Tall)"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#492822] transition"
          />
          <p className="text-sm text-gray-500 mt-1">
            {100 - customSizeInput.length} characters left
          </p>
          <button
            onClick={handleConfirmCustomSize}
            className={`mt-2 px-4 py-2 rounded transition text-white ${
              customSizeConfirmed
                ? "bg-green-600 hover:bg-green-700"
                : "bg-[#492822] hover:bg-[#6b4337]"
            }`}
          >
            {customSizeConfirmed ? "Size Confirmed ✓" : "Confirm Custom Size"}
          </button>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mt-4">
          <p className="font-semibold">Quantity:</p>
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-1 bg-gray-100 text-xl hover:bg-gray-200"
            >
              −
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-3 py-1 bg-gray-100 text-xl hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          disabled={isPending}
          onClick={handleAddtoCart}
          className={`w-full relative flex items-center justify-center overflow-hidden border-0 text-base transition-all duration-200 h-12 ${
            isPending
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "bg-transparent text-[#492822] hover:bg-[#492822] hover:text-white cursor-pointer group"
          }`}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-[#492822]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span className="text-[#492822] font-medium">
                Adding to cart...
              </span>
            </div>
          ) : (
            <>
              <span className="absolute left-0 h-full w-5 border-y border-l border-[#492822] transition-all duration-500 group-hover:w-full"></span>
              <p className="absolute transition-all duration-200 group-hover:opacity-0 group-hover:-translate-x-full">
                Add to Cart
              </p>
              <span className="absolute opacity-0 translate-x-full transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                Only {product.stock} products are available
              </span>
              <span className="absolute right-0 h-full w-5 border-y border-r border-[#492822] transition-all duration-500 group-hover:w-full"></span>
            </>
          )}
        </button>

        {/* Buy Now Button */}
        <button
          className="px-6 py-3 bg-[#492822] w-full text-white hover:bg-white border border-[#492822] hover:text-[#492822] cursor-pointer transition-colors duration-300 ease-in-out"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>

      {/* Size selection error overlay */}
      {showSizeError && (
        <div
          className="fixed inset-0 bg-[#492822]/40 flex items-center justify-center z-50"
          onClick={() => setShowSizeError(false)}
        >
          <div
            className="bg-white p-6 rounded-md max-w-sm mx-4 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-red-600 font-semibold mb-4">
              Please select a size.
            </p>
            <button
              onClick={() => setShowSizeError(false)}
              className="px-4 py-2 bg-[#492822] text-white rounded hover:bg-[#6b4337]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ✅ Size Chart Overlay */}
      {showSizeChart && (
        <div
          className="fixed inset-0 bg-black/70  flex items-center justify-center z-50 px-4"
          onClick={() => setShowSizeChart(false)}
        >
          <div
            className="bg-white p-4 rounded-md max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="https://res.cloudinary.com/dmv8kh0yx/image/upload/v1753037945/WhatsApp_Image_2025-07-21_at_00.09.06_p2uhdp.jpg"
              alt="Size Chart"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}

      <CheckoutOverlay
        isOpen={isOverlayOpen}
        onClose={() => setOverlayOpen(false)}
      />

      <style>{`
        @media (max-width: 1280px) {
          .hideAccordion {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default ProductMainDetails;
