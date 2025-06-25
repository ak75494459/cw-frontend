import type {
  Product,
  ProductsPages,
  ProductsSearchResponse,
  SearchState,
} from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetProducts = (pageState?: ProductsPages) => {
  const getProductsRequest = async (): Promise<ProductsSearchResponse> => {
    const params = new URLSearchParams();

    if (pageState?.page !== undefined) {
      params.set("page", pageState.page.toString());
    }

    const response = await fetch(
      `${VITE_API_BASE_URL}/api/products?${params.toString()}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  };

  const {
    data: results = {
      data: [],
      pagination: { total: 0, page: 1, pages: 1 },
    },
    isLoading,
    error,
  } = useQuery<ProductsSearchResponse, Error>({
    queryKey: ["fetchProducts", pageState?.page],
    queryFn: getProductsRequest,
    staleTime: 5000,
    placeholderData: (previousData) => previousData, // replaces keepPreviousData
  });

  if (error) {
    toast.error(error.message);
  }

  return {
    results,
    isLoading,
  };
};

export const useCreateProduct = () => {
  const { getAccessTokenSilently } = useAuth0();

  const mutationFn = async (formData: FormData): Promise<Product> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${VITE_API_BASE_URL}/api/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to create product");
    }

    return response.json();
  };

  const {
    mutate: createProduct,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn,
    onSuccess: () => {
      toast.success("Product created successfully!");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Unable to create product");
    },
  });

  return { createProduct, isPending, isSuccess, error };
};

export const useSearchProducts = (searchState: SearchState) => {
  const createSearchRequest = async (): Promise<ProductsSearchResponse> => {
    const params = new URLSearchParams();

    if (searchState.searchQuery) {
      params.set("searchQuery", searchState.searchQuery);
    }

    params.set("page", searchState.page.toString());

    if (searchState.colors?.length) {
      searchState.colors.forEach((color) => params.append("color", color));
    }

    if (searchState.categories?.length) {
      searchState.categories.forEach((cat) => params.append("category", cat));
    }

    if (searchState.genders?.length) {
      searchState.genders.forEach((g) => params.append("gender", g));
    }

    // ✅ Add collections (multiple)
    if (searchState.collections?.length) {
      searchState.collections.forEach((collection) =>
        params.append("collections", collection)
      );
    }

    if (searchState.price !== undefined) {
      params.set("price", searchState.price.toString());
    }

    const response = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/products/search?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery<ProductsSearchResponse, Error>({
    queryKey: ["searchProducts", searchState],
    queryFn: createSearchRequest,
    enabled:
      !!searchState.searchQuery ||
      !!searchState.colors?.length ||
      !!searchState.categories?.length ||
      !!searchState.genders?.length ||
      !!searchState.collections?.length || // ✅ trigger on collections
      searchState.price !== undefined,
  });

  return {
    results,
    isLoading,
  };
};

export const useGetProduct = () => {
  const { id } = useParams<{ id: string }>();

  const getProductRequest = async (_: {
    queryKey: [string, string];
  }): Promise<Product> => {
    const [, productId] = _.queryKey;

    const response = await fetch(
      `${VITE_API_BASE_URL}/api/products/${productId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    return response.json();
  };

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchProduct", id!],
    queryFn: getProductRequest,
    enabled: !!id,
    retry: 1,
  });

  if (isError && error instanceof Error) {
    toast.error(error.message || "Error fetching product");
  }

  return { product, isLoading };
};
