import type { CartItem, CartType, GetCartType } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateAndUpdateCart = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createAndUpdateCart = async (item: CartItem): Promise<CartType> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/cart`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to create/update cart: ${errorMessage}`);
    }

    return response.json();
  };

  const {
    mutateAsync: addtoCart,
    isPending,
    error,
  } = useMutation({
    mutationFn: createAndUpdateCart,
    onSuccess: () => {
      toast.success("Added to Cart");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return {
    addtoCart,
    isPending,
    error,
  };
};

export const useGetMyCartData = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const getMyCartData = async (): Promise<GetCartType> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch cart: ${errorText}`);
    }

    return response.json();
  };

  const {
    data: cartData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["fetchCartItem"],
    queryFn: getMyCartData,
    enabled: isAuthenticated,
  });

  if (isError && error instanceof Error) {
    toast.error(error.message || "Error fetching cart items.");
  }

  return {
    cartData,
    isLoading,
    refetchCart: refetch,
  };
};

interface DeleteItemParams {
  productId: string;
  size: string;
}

export const useDeleteItem = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const deleteItem = async ({
    productId,
    size,
  }: DeleteItemParams): Promise<void> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/cart`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, size }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to delete item: ${errorMessage}`);
    }
  };

  const {
    mutateAsync: deleteCartItem,
    isPending,
    error,
  } = useMutation<void, Error, DeleteItemParams>({
    mutationFn: deleteItem,
    onSuccess: () => {
      toast.success("Item removed from cart");
      queryClient.invalidateQueries({ queryKey: ["fetchCartItem"] });
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  return {
    deleteCartItem, // use like deleteCartItem({ productId, size })
    isPending,
    error,
  };
};

interface ChangeQuantityParams {
  productId: string;
  size: string;
  quantity: number;
}

export const useChangeCartItemQuantity = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const changeQuantity = async ({
    productId,
    size,
    quantity,
  }: ChangeQuantityParams): Promise<void> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${VITE_API_BASE_URL}/api/cart/change-quantity`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, size, quantity }),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to change quantity: ${errorMessage}`);
    }
  };

  const {
    mutateAsync: updateCartItemQuantity,
    isPending,
    error,
  } = useMutation<void, Error, ChangeQuantityParams>({
    mutationFn: changeQuantity,
    onSuccess: () => {
      toast.success("Quantity updated");
      queryClient.invalidateQueries({ queryKey: ["fetchCartItem"] });
    },
    onError: () => {
      toast.error("Failed to update quantity");
    },
  });

  return {
    updateCartItemQuantity, // use like updateCartItemQuantity({ productId, size, quantity })
    isPending,
    error,
  };
};

export const useClearCart = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const clearCartOnServer = async (): Promise<void> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/cart/clear`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to clear cart: ${errorText}`);
    }
  };

  const {
    mutateAsync: clearCart,
    isPending,
    error,
  } = useMutation<void, Error>({
    mutationFn: clearCartOnServer,
    onSuccess: () => {
      toast.success("Cart cleared");
      queryClient.invalidateQueries({ queryKey: ["fetchCartItem"] });
    },
    onError: () => {
      toast.error("Failed to clear cart");
    },
  });

  return {
    clearCart,
    isPending,
    error,
  };
};
