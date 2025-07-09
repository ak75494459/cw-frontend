import {
  useDeleteItem,
  useGetMyCartData,
  useChangeCartItemQuantity,
} from "@/api/MyCartApi";
import CartItem from "@/components/CartItem";

const CartPage = () => {
  const { cartData, isLoading } = useGetMyCartData();
  const { deleteCartItem, isPending: isDeleting } = useDeleteItem();
  const { updateCartItemQuantity, isPending: isUpdating } =
    useChangeCartItemQuantity();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#492822]"></div>
      </div>
    );
  }

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-xl text-gray-600">
        🛒 Your cart is empty.
      </div>
    );
  }

  return (
    <CartItem
      cartData={cartData}
      deleteCartItem={deleteCartItem}
      updateCartItemQuantity={updateCartItemQuantity}
      isDeleting={isDeleting}
      isUpdating={isUpdating}
    />
  );
};

export default CartPage;
