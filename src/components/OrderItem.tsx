import React from "react";
import type { UserOrderWithProductDetails } from "@/types";
import { Link } from "react-router-dom";
import { EllipsisVertical, Loader2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useUpdateMyOrder } from "@/api/MyOrderApi";

interface OrderItemProps {
  order: UserOrderWithProductDetails;
}

const truncateWords = (text: string, limit: number) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "...";
};

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const { updateMyOrder, isPending } = useUpdateMyOrder();

  const isCancelDisabled =
    isPending ||
    [
      "Cancelled",
      "Delivered",
      "Shipped",
      "Return",
      "Returned",
      "Refunded",
    ].includes(order.status);

  const isReturnDisabled =
    isPending ||
    [
      "Cancelled",
      "Return",
      "Returned",
      "Ordered",
      "Shipped",
      "Refunded",
    ].includes(order.status);

  return (
    <div className="border rounded-lg p-6 mb-6 shadow-md bg-white transition hover:shadow-lg">
      {/* Order ID and Actions */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm sm:text-sm md:text-xl font-bold text-[#492822]">
          Order ID: {order._id}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              disabled={isCancelDisabled}
              onClick={() =>
                updateMyOrder({ orderId: order._id, action: "cancel" })
              }
              className="w-full flex justify-center text-red-600 font-bold focus:bg-red-50"
            >
              {order.status === "Cancelled"
                ? "Cancelled"
                : isPending
                ? "Cancelling..."
                : "Cancel Order"}
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={isReturnDisabled}
              onClick={() =>
                updateMyOrder({ orderId: order._id, action: "return" })
              }
              className="w-full flex justify-center text-blue-600 font-bold focus:bg-blue-50"
            >
              {["Return"].includes(order.status)
                ? "Return Requested"
                : isPending
                ? "Requesting Return..."
                : "Return Order"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Order Details */}
      <div className="bg-gray-50 rounded-md p-4 mb-5 border shadow-sm">
        <dl className="divide-y divide-gray-200 text-sm text-gray-800">
          <div className="flex items-center justify-between py-2">
            <dt className="text-[#492822] font-bold">Status</dt>
            <dd className="capitalize font-bold flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#492822] opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-[#492822]"></span>
              </span>
              {order.status}
              {isPending && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin text-[#492822]" />
              )}
            </dd>
          </div>

          <div className="flex items-center justify-between py-2">
            <dt className="font-bold text-[#492822]">Total</dt>
            <dd className="font-bold">₹{order.totalAmount.toFixed(2)}</dd>
          </div>
          <div className="py-2">
            <dt className="text-[#492822] mb-1 font-bold">Shipping</dt>
            <dd className="text-gray-700 text-sm">
              {order.shippingAddress.fullName},{" "}
              {order.shippingAddress.addressLine1}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state},{" "}
              {order.shippingAddress.pincode}
              <br />
              {order.shippingAddress.country}
            </dd>
          </div>
        </dl>

        {/* Items */}
        <div>
          <h4 className="font-semibold mb-3 text-[#492822] text-lg">
            Items in this order:
          </h4>
          <ul className="order-item-list">
            {order.items.map((item) => (
              <li
                key={item.product._id}
                className="border rounded-lg p-3 flex gap-3 items-center bg-white hover:bg-gray-50 transition"
              >
                <Link to={`/products/${item.product._id}`}>
                  <img
                    src={item.product.productImages[0]}
                    alt={item.product.productName}
                    className="w-20 h-24 object-content rounded"
                  />
                </Link>
                <div className="text-sm space-y-1">
                  <Link to={`/products/${item.product._id}`}>
                    <div className="font-semibold text-gray-800 hover:underline">
                      <span className="block md:hidden">
                        {truncateWords(item.product.productName, 2)}
                      </span>
                      <span className="hidden md:block">
                        {item.product.productName}
                      </span>
                    </div>
                  </Link>
                  <div className="text-gray-600">Qty: {item.quantity}</div>
                  <div className="text-gray-600">Size: {item.size}</div>
                  <div className="text-gray-800 font-medium">
                    ₹{item.product.price}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <style>{`
            .order-item-list {
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }

            @media (min-width: 1440px) {
              .order-item-list {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1.5rem;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
