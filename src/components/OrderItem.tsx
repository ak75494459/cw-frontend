import React from "react";
import type { UserOrderWithProductDetails } from "@/types";

interface OrderItemProps {
  order: UserOrderWithProductDetails;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  return (
    <div className="border rounded p-4 mb-4 shadow-sm bg-white">
      <div className="mb-2 text-lg font-semibold text-[#492822]">
        Order ID: {order._id}
      </div>
      <div className="text-sm text-gray-600 mb-2">
        Status: <span className="font-medium">{order.status}</span>
      </div>
      <div className="text-sm text-gray-600 mb-2">
        Total: ₹{order.totalAmount.toFixed(2)}
      </div>
      <div className="text-sm text-gray-600 mb-2">
        Shipping: {order.shippingAddress.fullName},{" "}
        {order.shippingAddress.addressLine1}
      </div>
      <div className="mt-2">
        <h4 className="font-medium mb-1">Items:</h4>
        <ul className="space-y-2">
          {order.items.map((item) => (
            <li
              key={item.product._id}
              className="border rounded p-2 flex gap-3 items-center"
            >
              <img
                src={item.product.productImages[0]}
                alt={item.product.productName}
                className="w-16 h-20 object-cover rounded"
              />
              <div className="text-sm">
                <div className="font-semibold">{item.product.productName}</div>
                <div>Qty: {item.quantity}</div>
                <div>Price: ₹{item.product.price}</div>
                <div>Size: {item.size}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderItem;
