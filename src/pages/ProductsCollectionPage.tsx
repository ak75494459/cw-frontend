import { useSearchProducts } from "@/api/ProductApi";
import ProductsCard from "@/components/ProductsCard";
import ProductsPaginationSelector from "@/components/ProductsPaginationSelector";
import type { SearchState } from "@/types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ← get params from route

const ProductsCollectionPage = () => {
  const { collectionName } = useParams<{ collectionName: string }>(); // ← useParam
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    colors: [],
    categories: [],
    genders: [],
    price: 2000,
    collections: [], // will update below
  });

  // Update collection in search state from URL param
  useEffect(() => {
    if (collectionName) {
      setSearchState((prev) => ({
        ...prev,
        collections: [collectionName],
        page: 1, // reset to page 1 when collection changes
      }));
    }
  }, [collectionName]);

  const setPage = (page: number) => {
    setSearchState((prev) => ({ ...prev, page }));
  };

  const { results, isLoading: searchLoading } = useSearchProducts(searchState);

  return (
    <>
      <ProductsCard results={results?.data!} isLoading={searchLoading} />

      <ProductsPaginationSelector
        page={results?.pagination?.page ?? 1}
        pages={results?.pagination?.pages ?? 1}
        onPageChange={setPage}
      />
    </>
  );
};

export default ProductsCollectionPage;
