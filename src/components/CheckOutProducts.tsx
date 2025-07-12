import { useCheckout } from "@/context/CheckOutContext";
import { useState } from "react";
import { useCreateRazorpayOrder } from "@/api/RazorpayApi";
import { useValidateRazorpayPayment } from "@/api/RazorpayApi";
import { toast } from "sonner";
import { useCreateOrder } from "@/api/MyOrderApi";

// ✅ Razorpay type
declare global {
  interface Window {
    Razorpay: any;
  }
}

const validCoupons = [
  { code: "SAVE10", discount: 10 },
  { code: "FASHION20", discount: 20 },
  { code: "ARYAN25", discount: 25 },
];

const CheckOutProducts = () => {
  const { items, selectedAddress } = useCheckout();
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const { createOrder, isPending } = useCreateRazorpayOrder();
  const { validatePayment } = useValidateRazorpayPayment();
  const { createProductsOrder } = useCreateOrder();

  if (!items || items.items.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        🛒 Your checkout items are empty.
      </div>
    );
  }

  // ✅ ----------- Calculate Totals -----------
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
  const couponDiscountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const totalAfterCoupon = subtotal - couponDiscountAmount;
  const totalSavings = productLevelSavings + couponDiscountAmount;

  // ✅ ----------- Apply Coupon -----------
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

  // ✅ ----------- Handle Razorpay Payment -----------
  // ✅ ----------- Handle Razorpay Payment -----------
  const handlePayNow = async () => {
    try {
      // ✅ 1. Create Razorpay Order on backend
      const order = await createOrder({
        amount: Math.round(totalAfterCoupon * 100),
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          couponApplied:
            appliedDiscount > 0 ? `${appliedDiscount}% OFF` : "No Coupon",
        },
      });

      if (!order.id) throw new Error("Invalid Razorpay order ID");

      // ✅ 2. Setup Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Your Shop Name",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response: any) {
          console.log("✅ Razorpay Success:", response);

          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          try {
            // ✅ 3. Validate payment on backend
            await validatePayment({
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            });

            toast.success("Payment successful & verified!");

            // ✅ 4. Create order on backend (user from token)
            // 👉 FIXED: only send _id for product
            const orderPayload = {
              items: items.items.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
                size: item.size,
              })),
              shippingAddress: selectedAddress,
              totalAmount: totalAfterCoupon,
              status: "Paid",
              paymentDetails: {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
              },
            };

            await createProductsOrder(orderPayload);

            toast.success("Your order has been placed!");

            // ✅ 5. Optional - Clear Cart
            // await clearCartOnServer();

            // ✅ 6. Optional - Navigate
            // router.push("/order/success");
          } catch (err: any) {
            console.error("❌ Validation or Order Error:", err);
            toast.error(
              err?.message ||
                "Payment verification failed or order creation failed!"
            );
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "+919999999999",
        },
        notes: order.notes,
        theme: {
          color: "#3399cc",
        },
      };

      // ✅ 7. Open Razorpay Checkout
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Unable to start payment");
    }
  };

  const truncateWords = (text: string, wordLimit: number) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="pb-65">
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
                  alt={truncateWords(item.product.productName, 2)}
                  className="w-24 h-full object-cover rounded-md"
                />
                <div className="flex flex-col gap-1 text-sm text-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 hover:underline">
                    <h3 className="text-base font-semibold text-gray-900 hover:underline">
                      {truncateWords(item.product.productName, 2)}
                    </h3>
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
                        </span>
                      </>
                    ) : (
                      <>₹{price.toFixed(2)}</>
                    )}
                  </p>
                </div>
              </div>

              <div className="text-md font-semibold text-blue-600 whitespace-nowrap">
                ₹{(discountedPrice * item.quantity).toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ Coupon Section */}
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

      {/* ✅ Payment Summary */}
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
          <button
            onClick={handlePayNow}
            disabled={isPending}
            className="bg-[#492822] hover:bg-[#CC7351] text-white font-semibold px-6 py-3 rounded transition"
          >
            {isPending ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutProducts;
