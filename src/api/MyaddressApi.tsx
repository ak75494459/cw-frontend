import type { UserAddresses, Address } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyAddresses = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

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

    return response.json() as Promise<UserAddresses>;
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
    enabled: isAuthenticated,
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

  const createMyAddress = async (formData: FormData): Promise<Address> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/my/address`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to create address: ${errorMessage}`);
    }

    const json = await response.json();
    return json.address as Address;
  };
  const { mutateAsync: createAddress, isPending } = useMutation({
    mutationFn: createMyAddress,
    onSuccess: () => {
      // ✅ 4. Get new address object
      toast.success("Address saved successfully!");
      // ✅ 5. Auto-select newly created address
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  return {
    createAddress,
    isPending,
  };
};
