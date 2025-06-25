import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
  const { control, watch, setValue } = useFormContext();

  // Gender options
  const genderOptions = ["Men", "Women", "Unisex"];

  // Watch sizes and colors from form state
  const sizesFromForm = watch("sizes") || [];
  const colorsFromForm = watch("colors") || [];

  // Local states for controlled input strings
  const [sizesInput, setSizesInput] = useState("");
  const [colorsInput, setColorsInput] = useState("");

  // Sync sizes form array -> input string when form values change externally
  useEffect(() => {
    if (Array.isArray(sizesFromForm)) {
      setSizesInput(sizesFromForm.join(", "));
    }
  }, [sizesFromForm]);

  // Sync colors form array -> input string
  useEffect(() => {
    if (Array.isArray(colorsFromForm)) {
      setColorsInput(colorsFromForm.join(", "));
    }
  }, [colorsFromForm]);

  // Handle sizes input change
  const handleSizesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizesInput(e.target.value);
  };

  // Handle sizes input blur — parse and update form value
  const handleSizesBlur = () => {
    const arr = sizesInput
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    setValue("sizes", arr, { shouldValidate: true });
  };

  // Handle colors input change
  const handleColorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorsInput(e.target.value);
  };

  // Handle colors input blur — parse and update form value
  const handleColorsBlur = () => {
    const arr = colorsInput
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    setValue("colors", arr, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div>
        <h2 className="text-2xl font-bold">Product Details</h2>
        <FormDescription>Enter the details about your product</FormDescription>
      </div>

      {/* Product Name */}
      <FormField
        control={control}
        name="productName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Brand */}
      <FormField
        control={control}
        name="brand"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brand</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Price */}
      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                className="bg-white"
                min={0}
                step="0.01"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex w-full max-md:flex-col gap-2 ">
        {/* Sizes - comma-separated input */}
        <FormField
          control={control}
          name="sizes"
          render={() => (
            <FormItem className="w-[50%] max-md:w-full">
              <FormLabel>Sizes (comma-separated)</FormLabel>
              <FormControl>
                <Input
                  className="bg-white"
                  value={sizesInput}
                  onChange={handleSizesChange}
                  onBlur={handleSizesBlur}
                  placeholder="e.g. S, M, L, XL"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Colors - comma-separated optional input */}
        <FormField
          control={control}
          name="colors"
          render={() => (
            <FormItem className="w-[50%] max-md:w-full">
              <FormLabel>Colors (comma-separated, optional)</FormLabel>
              <FormControl>
                <Input
                  className="bg-white"
                  value={colorsInput}
                  onChange={handleColorsChange}
                  onBlur={handleColorsBlur}
                  placeholder="e.g. Red, Blue, Green"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Stock */}
      <FormField
        control={control}
        name="stock"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Stock</FormLabel>
            <FormControl>
              <Input type="number" {...field} className="bg-white" min={0} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="discount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discount</FormLabel>
            <FormControl>
              <Input type="number" {...field} className="bg-white" min={0} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="collections"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Collection</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Category */}
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Gender - select */}
      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <SelectTrigger className="w-full bg-gray-50">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genderOptions.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Product Description */}
      <FormField
        control={control}
        name="productDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DetailsSection;
