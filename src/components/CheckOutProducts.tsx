import { useCheckout } from "@/context/CheckOutContext";
import { useState } from "react";

const validCoupons: { code: string; discount: number }[] = [
  { code: "SAVE10", discount: 10 },
  { code: "FASHION20", discount: 20 },
  { code: "ARYAN25", discount: 25 },
];

const CheckOutProducts = () => {
  const { items } = useCheckout();
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  if (!items || items.items.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        🛒 Your checkout items are empty.
      </div>
    );
  }

  const subtotal = items.items.reduce((acc, item) => {
    const price = item.product.price || 0;
    const discount = item.product.discount || 0;
    const discountedPrice = price - (price * discount) / 100;
    return acc + discountedPrice * item.quantity;
  }, 0);

  const originalTotal = items.items.reduce((acc, item) => {
    const price = item.product.price || 0;
    return acc + price * item.quantity;
  }, 0);

  const productLevelSavings = originalTotal - subtotal;

  const handleApplyCoupon = () => {
    if (subtotal <= 1000) {
      setCouponError("❌ Coupons are only valid for orders above ₹1000");
      setAppliedDiscount(0);
      return;
    }

    const coupon = validCoupons.find(
      (c) => c.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (coupon) {
      setAppliedDiscount(coupon.discount);
      setCouponError("");
    } else {
      setAppliedDiscount(0);
      setCouponError("❌ Invalid coupon code");
    }
  };

  const couponDiscountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const totalAfterCoupon = subtotal - couponDiscountAmount;
  const totalSavings = productLevelSavings + couponDiscountAmount;

  return (
    <div className="pb-50">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 px-3">🛍️ Items</h2>

      <div className="space-y-6 px-3">
        {items.items.map((item) => {
          const price = item.product.price || 0;
          const discount = item.product.discount || 0;
          const discountedPrice = price - (price * discount) / 100;

          return (
            <div
              key={item._id}
              className="flex items-center justify-between border-b pb-6 hover:bg-gray-50 p-4 transition rounded-lg"
            >
              <div className="flex items-start gap-4">
                <img
                  src={item.product.productImages[0]}
                  alt={item.product.productName}
                  className="w-24 h-full object-cover rounded-md"
                />
                <div className="flex flex-col gap-1 text-sm text-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 hover:underline">
                    {item.product.productName}
                  </h3>
                  <p className="text-gray-500">{item.product.brand}</p>
                  <p>
                    Size:{" "}
                    <span className="font-medium">{item.size || "N/A"}</span>
                  </p>
                  <p>
                    Quantity:{" "}
                    <span className="font-medium">{item.quantity}</span>
                  </p>
                  <p>
                    Price:{" "}
                    {discount > 0 ? (
                      <>
                        <span className="line-through text-gray-400 mr-2">
                          ₹{price.toFixed(2)}
                        </span>
                        <span className="text-green-600 font-semibold">
                          ₹{discountedPrice.toFixed(2)}
                        </span>{" "}
                        <span className="text-sm text-red-500 ml-1">
                          ({discount}% OFF)
                        </span>
                      </>
                    ) : (
                      <>₹{price.toFixed(2)}</>
                    )}
                  </p>
                </div>
              </div>

              <div className="text-lg font-semibold text-blue-600 whitespace-nowrap">
                ₹{(discountedPrice * item.quantity).toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Coupon Section */}
      <div className="mt-8 max-w-md ml-auto px-3">
        <label className="block font-medium text-gray-700 mb-1">
          🎟️ Apply Coupon
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
        {couponError && (
          <p className="text-red-600 text-sm mt-1">{couponError}</p>
        )}
        {appliedDiscount > 0 && subtotal > 1000 && (
          <p className="text-green-600 text-sm mt-1">
            ✅ Coupon applied! {appliedDiscount}% off
          </p>
        )}
      </div>

      {/* Bottom Summary */}
      <div className="fixed bottom-0 w-full z-20 bg-[#EFE4D2] border-t p-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-800 space-y-1 mb-2 sm:mb-0">
            <div className="font-medium">
              Original Total: ₹{originalTotal.toFixed(2)}
            </div>
            <div className="text-sm text-red-600">
              Product Discounts: -₹{productLevelSavings.toFixed(2)}
            </div>
            {appliedDiscount > 0 && subtotal > 1000 && (
              <div className="text-sm text-red-600">
                Coupon Discount: -₹{couponDiscountAmount.toFixed(2)}
              </div>
            )}
            <div className="text-xl font-bold text-green-700">
              Total Payable: ₹{totalAfterCoupon.toFixed(2)}
            </div>
            {totalSavings > 0 && (
              <div className="text-sm text-gray-600">
                You saved ₹{totalSavings.toFixed(2)} on this order!
              </div>
            )}
          </div>
          <button className="bg-[#492822] hover:bg-[#CC7351] text-white font-semibold px-6 py-3 rounded transition">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutProducts;
