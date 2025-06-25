import React, { useState } from "react";
import type { Product } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCreateAndUpdateCart, useGetMyCartData } from "@/api/MyCartApi";
import { useCheckout } from "@/context/CheckOutContext";
import CheckoutOverlay from "./CheckOutOverlay";
import { useAuth0 } from "@auth0/auth0-react";

interface ProductDetailsProps {
  product: Product;
}

const standardSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const ProductMainDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeError, setShowSizeError] = useState(false); // New state for overlay
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
    }
  };

  const handleAddtoCart = async () => {
    if (!isAuthenticated) {
      await loginWithRedirect({
        appState: { returnTo: window.location.pathname },
      });
      return;
    }
    if (!selectedSize) {
      setShowSizeError(true); // Show overlay instead of alert
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

        {/* Size Selector */}
        <div>
          <p className="font-semibold">Choose Size:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {standardSizes.map((size) => {
              const isAvailable = product.sizes.includes(size);
              const isSelected = selectedSize === size;
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

        <div className="flex gap-1 items-center mt-2">
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
          <p className="hover:underline cursor-pointer">Size Chart</p>
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
          className={`w-full relative flex items-center justify-center overflow-hidden border-0 text-base transition-all duration-200  h-12
    ${
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

        {/* Coupons Accordion */}
        <div className="w-full mt-5 border bg-[#492822] p-4 text-white hideAccordion">
          <p className="text-lg font-semibold mb-2">Available Coupons</p>
          <Accordion type="single" collapsible className="w-full space-y-1">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-white font-bold no-underline hover:no-underline [&>svg]:text-white">
                SAVE10
              </AccordionTrigger>
              <AccordionContent className="text-sm text-white ml-2">
                Get 10% off on orders above ₹999
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-white font-bold no-underline hover:no-underline [&>svg]:text-white">
                FREESHIP
              </AccordionTrigger>
              <AccordionContent className="text-sm text-white ml-2">
                Free shipping on your first order
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-white font-bold no-underline hover:no-underline [&>svg]:text-white">
                BUY2GET1
              </AccordionTrigger>
              <AccordionContent className="text-sm text-white ml-2">
                Buy 2 items & get 1 free (select categories)
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
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
