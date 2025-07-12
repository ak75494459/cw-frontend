import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";

// -----------------------------
// Types
// -----------------------------

interface CreateOrderPayload {
  amount: number;
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  [key: string]: any;
}

interface ValidatePaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// -----------------------------
// useCreateRazorpayOrder Hook
// -----------------------------

export const useCreateRazorpayOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const mutationFn = async (
    data: CreateOrderPayload
  ): Promise<RazorpayOrderResponse> => {
    // ✅ Get Auth0 Access Token
    const accessToken = await getAccessTokenSilently();

    // ✅ Make authorized request
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to create Razorpay order");
    }

    const jsonResponse = await res.json();
    return jsonResponse.data;
  };

  const {
    mutateAsync: createOrder,
    isPending,
    error,
  } = useMutation({
    mutationFn,
    onError: (err: any) => {
      toast.error(err?.message || "Order creation failed");
    },
  });

  return { createOrder, isPending, error };
};

// -----------------------------
// useValidateRazorpayPayment Hook
// -----------------------------

export const useValidateRazorpayPayment = () => {
  const { getAccessTokenSilently } = useAuth0();

  const mutationFn = async (data: ValidatePaymentPayload) => {
    // ✅ Get Auth0 Access Token
    const accessToken = await getAccessTokenSilently();

    // ✅ Make authorized request
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/order/validate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || "Payment verification failed");
    }

    return res.json();
  };

  const {
    mutateAsync: validatePayment,
    isPending,
    error,
  } = useMutation({
    mutationFn,
    onError: (err: any) => {
      toast.error(err?.message || "Payment verification failed");
    },
  });

  return { validatePayment, isPending, error };
};
