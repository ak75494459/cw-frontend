import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import ProductsImageSection from "./ProductsImageSection";

export const productFormSchema = z
  .object({
    productName: z.string().min(1, "Product name is required"),
    brand: z.string().min(1, "Brand is required"),
    price: z.coerce.number().min(0, "Price must be at least 0"),
    sizes: z
      .array(z.string().min(1))
      .min(1, "At least one size must be selected"),
    colors: z.array(z.string()).optional(),
    stock: z.coerce.number().min(0, "Stock must be at least 0"),
    category: z.string().min(1, "Category is required"),
    collections: z.string().min(1, "Collection is required"),
    bestSeller: z.boolean().optional(),
    gender: z.enum(["Men", "Women", "Unisex"], {
      errorMap: () => ({ message: "Select a valid gender option" }),
    }),
    discount: z.coerce.number().min(0, "Discount must be at least 0"),
    productDescription: z.string().min(1, "Description is required"),
    productImageFile: z.array(z.instanceof(File)).optional(),
    productImages: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
  })
  .refine(
    (data) =>
      (data.productImages && data.productImages.length > 0) ||
      (data.productImageFile && data.productImageFile.length > 0),
    {
      message: "At least one product image must be provided",
      path: ["productImageFile"],
    }
  );

type ProductsFormData = z.infer<typeof productFormSchema>;

type Props = {
  onSave: (formData: FormData) => void;
  isLoading: boolean;
};

const ManageProductsForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<ProductsFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productName: "",
      brand: "",
      price: 0,
      sizes: [],
      colors: [],
      stock: 0,
      category: "",
      discount: 0,
      gender: "Unisex",
      productDescription: "",
      productImageFile: [],
      isFeatured: false,
      bestSeller: false,
      collections: "",
    },
  });

  const submitData = (formDataJson: ProductsFormData) => {
    const formData = new FormData();

    formData.append("productName", formDataJson.productName);
    formData.append("brand", formDataJson.brand);
    formData.append("price", formDataJson.price.toString());
    formData.append("discount", formDataJson.discount.toString());
    formData.append("stock", formDataJson.stock.toString());
    formData.append("category", formDataJson.category);
    formData.append("gender", formDataJson.gender);
    formData.append("productDescription", formDataJson.productDescription);
    formData.append("collections", formDataJson.collections);

    formDataJson.sizes.forEach((size: string) => {
      formData.append("sizes", size);
    });

    if (formDataJson.colors && formDataJson.colors.length > 0) {
      formDataJson.colors.forEach((color: string) => {
        formData.append("colors", color);
      });
    }

    if (
      formDataJson.productImageFile &&
      Array.isArray(formDataJson.productImageFile)
    ) {
      formDataJson.productImageFile.forEach((file: File) => {
        formData.append("productImageFile", file);
      });
    }

    formData.append("isFeatured", formDataJson.isFeatured ? "true" : "false");
    formData.append("bestSeller", formDataJson.bestSeller ? "true" : "false");

    console.log("FormData Entries:", Array.from(formData.entries()));
    onSave(formData);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6  p-6 md:p-10 bg-[#DDD0C8] "
        onSubmit={(e) => {
          console.log("Submit button clicked");
          form.handleSubmit(submitData, (errors) => {
            console.log("Validation errors:", errors);
          })(e);
        }}
        noValidate
      >
        <DetailsSection />
        <ProductsImageSection />
        <div className="pt-4">
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit" className="w-full md:w-auto">
              Add Product
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default ManageProductsForm;
