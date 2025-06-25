import { useState } from "react";
import { useGetProducts, useSearchProducts } from "@/api/ProductApi";
import FilterSheet from "@/components/FilterSheet";
import PaginationSelector from "@/components/PaginationSelector";
import ProductsCard from "@/components/ProductsCard";
import SearchBar from "@/components/SearchBar";
import type { ProductsPages, SearchState } from "@/types";

const ProductsPaginationPage = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    colors: [],
    categories: [],
    genders: [],
    price: 2000,
    collections: [],
  });

  const [pageState, setPageState] = useState<ProductsPages>({
    page: 1,
  });

  const isSearching =
    !!searchState.searchQuery ||
    (searchState.colors && searchState.colors.length > 0) ||
    (searchState.categories && searchState.categories.length > 0) ||
    (searchState.genders && searchState.genders.length > 0) ||
    searchState.price !== undefined;

  const { results: searchResults, isLoading: isSearchLoading } =
    useSearchProducts(searchState);

  const { results: allProducts, isLoading: isAllLoading } =
    useGetProducts(pageState);

  const setPage = (page: number) => {
    if (isSearching) {
      setSearchState((prev) => ({ ...prev, page }));
    } else {
      setPageState((prev) => ({ ...prev, page }));
    }
  };

  const setSearchQuery = (formData: Partial<SearchState>) => {
    setSearchState((prev) => ({
      ...prev,
      ...formData,
      page: 1, // Reset page on new search
    }));
  };

  const setFilters = (formData: Partial<SearchState>) => {
    setSearchState((prev) => ({
      ...prev,
      ...formData,
      page: 1, // Reset page on filter change
    }));
  };

  const data = isSearching ? searchResults?.data : allProducts?.data;
  const isLoading = isSearching ? isSearchLoading : isAllLoading;
  const pagination = isSearching
    ? searchResults?.pagination
    : allProducts?.pagination;

  return (
    <>
      <SearchBar
        searchQuery={searchState.searchQuery}
        onSubmit={setSearchQuery}
        placeHolder="Search by product name, brand, or color"
      />

      <FilterSheet onSubmit={setFilters} />

      <ProductsCard results={data ?? []} isLoading={isLoading} />

      <PaginationSelector
        page={pagination?.page ?? 1}
        pages={pagination?.pages ?? 1}
        onPageChange={setPage}
      />
    </>
  );
};

export default ProductsPaginationPage;
