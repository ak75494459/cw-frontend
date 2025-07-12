import { useGetMyOrders } from "@/api/MyOrderApi";
import OrderItem from "@/components/OrderItem";

const OrderPage = () => {
  const { data: myOrders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#492822]"></div>
      </div>
    );
  }

  if (!myOrders || myOrders.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-xl text-gray-600">
        📦 You have no orders yet.
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-[#492822]">🧾 Your Orders</h1>
      {myOrders.map((order) => (
        <OrderItem key={order._id} order={order} />
      ))}
    </div>
  );
};

export default OrderPage;
