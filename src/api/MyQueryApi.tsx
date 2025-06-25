import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyQuery = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyQuery = async (formData: FormData) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/my/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData, // No need for Content-Type when using FormData
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to create query: ${errorMessage}`);
    }

    return response.json();
  };

  const { mutateAsync: createQuery, isPending } = useMutation({
    mutationFn: createMyQuery,
    onSuccess: () => {
      toast.success("✅ Query submitted successfully!");
    },
    onError: (error: Error) => {
      toast.error(`❌ Failed to submit query: ${error.message}`);
    },
  });

  return {
    createQuery,
    isPending,
  };
};

export const useGetMyQuery = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyQuery = async () => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/my/query`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch query: ${errorText}`);
    }

    return response.json();
  };

  const {
    data: QueryData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["fetchQuery"],
    queryFn: getMyQuery,
  });

  if (isError && error instanceof Error) {
    toast.error(error.message || "Error fetching your queries.");
  }

  return {
    QueryData,
    isLoading,
    refetchQuery: refetch,
  };
};
