import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  OrderType,
  CreateOrderPayload,
  UserOrderWithProductDetails,
} from "@/types";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  // 👇 Function to call your Express API
  const sendOrder = async (order: CreateOrderPayload): Promise<OrderType> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/my/order`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create order: ${errorText}`);
    }

    return response.json();
  };

  // 👇 useMutation for React Query
  const {
    mutateAsync: createProductsOrder,
    isPending,
    error,
  } = useMutation<OrderType, Error, CreateOrderPayload>({
    mutationFn: sendOrder,
    onSuccess: () => {
      toast.success("✅ Order placed successfully!");
    },
    onError: (err) => {
      console.error("❌ Order Error:", err);
      toast.error(err.message || "❌ Failed to place order");
    },
  });

  return {
    createProductsOrder,
    isPending,
    error,
  };
};

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchMyOrders = async (): Promise<UserOrderWithProductDetails[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/my/order/details`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch orders: ${errorText}`);
    }

    const data = await response.json();
    return data.orders;
  };

  return useQuery<UserOrderWithProductDetails[], Error>({
    queryKey: ["myOrders"],
    queryFn: fetchMyOrders,
  });
};

export const useUpdateMyOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  /**
   * Function to call your PATCH endpoint
   * Expects an object with { orderId }
   */
  const cancelMyOrder = async ({
    orderId,
    action,
  }: {
    orderId: string;
    action: "cancel" | "return";
  }) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/my/order`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, action }),
    });

    if (!response.ok) {
      const errorText = await response.json();
      throw new Error(errorText.message);
    }

    return response.json();
  };

  /**
   * React Query mutation
   */
  const {
    mutateAsync: updateMyOrder,
    isPending,
    error,
  } = useMutation({
    mutationFn: cancelMyOrder,
    onSuccess: () => {
      toast.success("✅ Order cancelled successfully!");

      // ✅ This will cause useGetMyOrders to refetch automatically
      queryClient.invalidateQueries({ queryKey: ["myOrders"] });
    },
    onError: (err: Error) => {
      console.error("❌ Cancel Order Error:", err);
      toast.error(err.message);
    },
  });

  return {
    updateMyOrder, // call this with { orderId }
    isPending,
    error,
  };
};
