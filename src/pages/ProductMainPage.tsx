import { useGetProduct, useSearchProducts } from "@/api/ProductApi";
import ProductMainDescription from "@/components/ProductMainDescription";
import ProductMainDetails from "@/components/ProductMainDetails";
import ProductsCard from "@/components/ProductsCard";
import ProductsPaginationSelector from "@/components/ProductsPaginationSelector";
import SlideshowImage from "@/components/slideShowImage";
import type { SearchState } from "@/types";
import { useEffect, useRef, useState } from "react";

const ProductMainPage = () => {
  const { product, isLoading } = useGetProduct();

  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    colors: [],
    categories: [],
    genders: [],
    price: 2000,
    collections: [],
  });

  // Ref to scroll to ProductsCard
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product?.category) {
      setSearchState((prev) => ({
        ...prev,
        categories: [product.category],
        searchQuery: "",
      }));
    }
  }, [product?.category]);

  const { results, isLoading: searchLoading } = useSearchProducts(searchState);

  const filterResult = (results?.data || []).filter(
    (p) => String(p._id) !== String(product?._id)
  );

  const setPage = (page: number) => {
    setSearchState((prev) => ({ ...prev, page }));

    // Scroll to ProductsCard section
    setTimeout(() => {
      cardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100); // slight delay to ensure DOM update
  };

  if (isLoading) return <div>Loading...</div>;
  if (!product || !product.productImages?.length)
    return <div>No images available</div>;

  return (
    <>
      <div className="flex diplayColom">
        <SlideshowImage slides={product.productImages} />
        <ProductMainDetails product={product} />
      </div>
      <ProductMainDescription product={product} />

      {/* Products Card Section with ref */}
      <div ref={cardRef}>
        <ProductsCard results={filterResult} isLoading={searchLoading} />
      </div>

      <ProductsPaginationSelector
        page={results?.pagination?.page ?? 1}
        pages={results?.pagination?.pages ?? 1}
        onPageChange={setPage}
      />

      <style>{`
        @media (max-width: 1040px) {
          .diplayColom {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default ProductMainPage;
