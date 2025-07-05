import { useCheckout } from "@/context/CheckOutContext";
import type { GetCartType } from "@/types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutOverlay from "./CheckOutOverlay";

interface CartItemProps {
  cartData?: GetCartType;
  deleteCartItem: any;
}

const CartItem: React.FC<CartItemProps> = ({ cartData, deleteCartItem }) => {
  const navigate = useNavigate();
  const { setItems } = useCheckout();
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        🛒 Your cart is empty.
      </div>
    );
  }

  // Calculate subtotal, discount, total and saved amount
  let subtotal = 0;
  let totalDiscount = 0;

  cartData.items.forEach((item) => {
    const price = item.product.price || 0;
    const discountPercentage = item.product.discount || 0;
    const quantity = item.quantity;

    const itemTotal = price * quantity;
    const itemDiscount = (price * discountPercentage * quantity) / 100;

    subtotal += itemTotal;
    totalDiscount += itemDiscount;
  });

  const totalAfterDiscount = subtotal - totalDiscount;

  const handleProductNavigation = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleCheckOut = () => {
    setItems(cartData);
    setOverlayOpen(true);
  };

  return (
    <div className="mt-15 pb-25">
      <div className="p-3">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">
          🛍️ Shopping Cart
        </h2>

        {/* Scrollable section with scrollbar hidden */}
        <div
          className="space-y-6 max-h-[65vh] overflow-y-scroll pr-2"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE 10+
          }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {cartData.items.map((item) => {
            const price = item.product.price || 0;
            const discount = item.product.discount || 0;
            const quantity = item.quantity;
            const discountedPrice = price - (price * discount) / 100;

            return (
              <div
                key={item._id}
                className="flex items-center justify-between border-b pb-6 hover:bg-gray-50 p-4 transition m-3"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={item.product.productImages[0]}
                    alt={item.product.productName}
                    className="w-24 h-full object-cover cursor-pointer"
                    onClick={() => handleProductNavigation(item.product._id)}
                  />
                  <div className="flex flex-col gap-1 text-sm text-gray-700">
                    <h3
                      className="text-lg font-semibold text-gray-900 cursor-pointer hover:underline"
                      onClick={() => handleProductNavigation(item.product._id)}
                    >
                      {item.product.productName}
                    </h3>
                    <p className="text-gray-500">{item.product.brand}</p>
                    <p>
                      Size:{" "}
                      <span className="font-medium">{item.size || "N/A"}</span>
                    </p>
                    <p>
                      Quantity: <span className="font-medium">{quantity}</span>
                    </p>
                    <p className="text-base font-medium">
                      Price:{" "}
                      {discount > 0 ? (
                        <>
                          <span className="line-through text-gray-400 mr-2">
                            ₹{price.toFixed(2)}
                          </span>
                          <span className="text-green-700 font-semibold">
                            ₹{discountedPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-red-500 ml-2">
                            ({discount}% OFF)
                          </span>
                        </>
                      ) : (
                        <>₹{price.toFixed(2)}</>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="text-lg font-semibold text-blue-600 whitespace-nowrap">
                    ₹{(discountedPrice * quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() =>
                      deleteCartItem({
                        productId: item.product._id,
                        size: item.size,
                      })
                    }
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#ff0000"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-trash2-icon lucide-trash-2 cursor-pointer"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Totals */}
        <div className="fixed bottom-0 left-0 right-0 items-center w-full bg-[#EFE4D2] flex flex-row justify-end p-5">
          <div className="text-right text-gray-800 mr-5">
            <div className="text-base font-medium">
              Subtotal: ₹{subtotal.toFixed(2)}
            </div>
            <div className="text-sm text-green-700 font-medium">
              You Saved: ₹{totalDiscount.toFixed(2)}
            </div>
            <div className="text-lg font-bold mt-1">
              Total: ₹{totalAfterDiscount.toFixed(2)}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleCheckOut}
              className="bg-[#492822] hover:bg-[#CC7351] cursor-pointer text-white font-semibold px-6 py-3 mr-5 transition"
            >
              Check Out
            </button>
          </div>
        </div>
      </div>

      <CheckoutOverlay
        isOpen={isOverlayOpen}
        onClose={() => setOverlayOpen(false)}
      />
    </div>
  );
};

export default CartItem;
