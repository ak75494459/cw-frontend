import { useCreateProduct } from "@/api/ProductApi";
import ManageProductsForm from "@/forms/products-form/ManageProductsForm";

const CreateProductPage = () => {
  const { createProduct, isPending } = useCreateProduct();

  return (
    <div className="container m-auto">
      <ManageProductsForm onSave={createProduct} isLoading={isPending} />
    </div>
  );
};

export default CreateProductPage;
