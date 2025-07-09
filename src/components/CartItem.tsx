import { useCheckout } from "@/context/CheckOutContext";
import type { GetCartType } from "@/types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutOverlay from "./CheckOutOverlay";

interface CartItemProps {
  cartData?: GetCartType;
  deleteCartItem: (args: { productId: string; size: string }) => Promise<void>;
  updateCartItemQuantity: (args: {
    productId: string;
    size: string;
    quantity: number;
  }) => Promise<void>;
  isDeleting: boolean;
  isUpdating: boolean;
}

const CartItem: React.FC<CartItemProps> = ({
  cartData,
  deleteCartItem,
  updateCartItemQuantity,
}) => {
  const navigate = useNavigate();
  const { setItems } = useCheckout();
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        🛒 Your cart is empty.
      </div>
    );
  }

  let subtotal = 0;
  let totalDiscount = 0;

  cartData.items.forEach((item) => {
    const price = item.product.price || 0;
    const discountPercentage = item.product.discount || 0;
    const quantity = item.quantity;

    subtotal += price * quantity;
    totalDiscount += (price * discountPercentage * quantity) / 100;
  });

  const totalAfterDiscount = subtotal - totalDiscount;

  const handleProductNavigation = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleCheckOut = () => {
    setItems(cartData);
    setOverlayOpen(true);
  };

  const handleQuantityChange = async (
    productId: string,
    size: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    const cartItemId = cartData.items.find(
      (item) => item.product._id === productId && item.size === size
    )?._id;

    if (!cartItemId) {
      console.error("Item not found in local cartData!");
      return;
    }

    setUpdatingItemId(cartItemId);
    try {
      await updateCartItemQuantity({ productId, size, quantity: newQuantity });
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleDeleteItem = async (productId: string, size: string) => {
    const cartItemId = cartData.items.find(
      (item) => item.product._id === productId && item.size === size
    )?._id;

    if (!cartItemId) {
      console.error("Item not found in local cartData!");
      return;
    }

    setDeletingItemId(cartItemId);
    try {
      await deleteCartItem({ productId, size });
    } finally {
      setDeletingItemId(null);
    }
  };

  return (
    <div className="mt-15 pb-25">
      <div className="p-3">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">
          🛍️ Shopping Cart
        </h2>

        <div
          className="space-y-6 max-h-[65vh] overflow-y-scroll pr-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          {cartData.items.map((item) => {
            const price = item.product.price || 0;
            const discount = item.product.discount || 0;
            const quantity = item.quantity;
            const discountedPrice = price - (price * discount) / 100;

            const isThisUpdating = updatingItemId === item._id;
            const isThisDeleting = deletingItemId === item._id;

            return (
              <div
                key={item._id}
                className={`flex items-center justify-between border-b pb-6 hover:bg-gray-50 p-4 transition m-3 ${
                  isThisUpdating || isThisDeleting ? "opacity-60" : ""
                }`}
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
                      className="text-lg font-semibold text-gray-900 cursor-pointer hover:underline max-md:text-[0.9rem]"
                      onClick={() => handleProductNavigation(item.product._id)}
                    >
                      {item.product.productName}
                    </h3>
                    <p className="text-gray-500 max-md:text-[0.6rem]">
                      {item.product.brand}
                    </p>
                    <p>
                      <span className="max-md:text-[0.7rem]">Size: </span>
                      <span className="font-medium max-md:text-[0.7rem]">
                        {item.size || "N/A"}
                      </span>
                    </p>

                    <p className="flex items-center gap-2 max-md:flex-col max-md:items-start max-md:gap-1">
                      <span className="text-sm max-md:text-xs">Quantity:</span>
                      <div className="flex items-center border rounded overflow-hidden text-sm max-md:text-xs">
                        <button
                          disabled={isThisUpdating}
                          className={`px-3 py-1 max-md:px-2 text-gray-700 hover:bg-gray-200 transition ${
                            isThisUpdating
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() =>
                            handleQuantityChange(
                              item.product._id,
                              item.size!,
                              item.quantity - 1
                            )
                          }
                        >
                          -
                        </button>

                        <span className="px-4 py-1 max-md:px-2 relative flex items-center justify-center min-w-[2rem] gap-2">
                          <span>{item.quantity}</span>
                          {isThisUpdating && (
                            <div className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          )}
                        </span>

                        <button
                          disabled={isThisUpdating}
                          className={`px-3 py-1 max-md:px-2 text-gray-700 hover:bg-gray-200 transition ${
                            isThisUpdating
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() =>
                            handleQuantityChange(
                              item.product._id,
                              item.size!,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </p>

                    <p className="text-base font-medium max-md:text-[0.7rem]">
                      <span className="max-md:text-[0.7rem]">Price: </span>
                      {discount > 0 ? (
                        <>
                          <span className="line-through text-gray-400 mr-2">
                            ₹{price.toFixed(2)}
                          </span>
                          <span className="text-green-700 font-semibold max-md:text-[0.7rem]">
                            ₹{discountedPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-red-500 ml-2 max-md:text-[0.7rem]">
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
                  <div className="text-lg font-semibold text-blue-600 whitespace-nowrap max-md:text-[0.9rem]">
                    ₹{(discountedPrice * quantity).toFixed(2)}
                  </div>
                  <button
                    disabled={isThisDeleting}
                    onClick={() =>
                      handleDeleteItem(item.product._id, item.size!)
                    }
                    className={`text-red-600 hover:text-red-800 text-sm ${
                      isThisDeleting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
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
