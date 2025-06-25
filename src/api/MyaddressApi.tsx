import type { UserAddresses } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyAddresses = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchMyAddresses = async (): Promise<UserAddresses> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/my/address`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch addresses: ${errorMessage}`);
    }

    return response.json(); // Expecting an array of address objects
  };

  const {
    data: addressesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myAddresses"],
    queryFn: fetchMyAddresses,
  });

  return {
    addressesData,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export const useCreateMyAddress = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyAddress = async (formData: FormData) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/my/address`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // No need to set Content-Type; browser sets it automatically for FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to create address: ${errorMessage}`);
    }

    return response.json();
  };

  const {
    mutateAsync: createAddress,

    isPending,
  } = useMutation({
    mutationFn: createMyAddress,
    onSuccess: () => {
      toast.success("Address is saved check existing address");
    },
    onError: () => {
      toast.error("something wrong happend");
    },
  });

  return {
    createAddress,

    isPending,
  };
};
