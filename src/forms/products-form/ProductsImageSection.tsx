import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";

const ProductsImageSection = () => {
  const { control, watch } = useFormContext();
  const imageFiles = watch("productImageFile"); // Ensure this matches your schema

  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (!imageFiles || imageFiles.length === 0) {
      setPreviews([]);
      return;
    }

    const fileReaders = imageFiles.map((file: File) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          }
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders).then(setPreviews);
  }, [imageFiles]);

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">Add Product Images</h2>
      <FormField
        control={control}
        name="productImageFile" // Ensure this matches your schema
        render={({ field }) => (
          <FormItem>
            <FormLabel>Upload Images (JPG, PNG)</FormLabel>
            <FormControl>
              <Input
                className="bg-white"
                type="file"
                accept=".jpg, .jpeg, .png"
                multiple
                onChange={(event) => {
                  const filesArray = event.target.files
                    ? Array.from(event.target.files)
                    : [];
                  field.onChange(filesArray);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
          {previews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg border"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsImageSection;
