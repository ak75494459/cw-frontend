import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { OrderType, CreateOrderPayload } from "@/types";

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
