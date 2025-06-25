import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

// --- Schema ---
const formSchema = z.object({
  colors: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  genders: z.array(z.string()).optional(),
  price: z.number(),
});

type FilterFormData = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: FilterFormData) => void;
};

export default function FilterSheet({ onSubmit }: Props) {
  const form = useForm<FilterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      colors: [],
      categories: [],
      genders: [],
      price: 2000,
    },
  });

  const colors = ["Black", "White", "Red", "Blue", "Green"];
  const categories = ["Shirts", "Pants", "Kurti", "Shoes", "Accessories"];
  const genders = ["Men", "Women", "Unisex"];

  const handleCheckboxChange = (
    fieldValue: string[],
    setValue: (val: string[]) => void,
    value: string
  ) => {
    if (fieldValue.includes(value)) {
      setValue(fieldValue.filter((item) => item !== value));
    } else {
      setValue([...fieldValue, value]);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="m-2 ml-10 p-4 font-bold">
          Filter
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Filter the Products</SheetTitle>
          <SheetDescription>
            Use filters to refine product search.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4"
          >
            {/* Colors */}
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem className="mx-6">
                  <FormLabel>Colors</FormLabel>
                  <div className="flex flex-col gap-2">
                    {colors.map((color) => (
                      <div className="flex items-center space-x-2" key={color}>
                        <Checkbox
                          id={`color-${color}`}
                          checked={field.value?.includes(color)}
                          onCheckedChange={() =>
                            handleCheckboxChange(
                              field.value ?? [],
                              field.onChange,
                              color
                            )
                          }
                        />
                        <Label htmlFor={`color-${color}`}>{color}</Label>
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />

            {/* Categories */}
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem className="mx-6">
                  <FormLabel>Categories</FormLabel>
                  <div className="flex flex-col gap-2">
                    {categories.map((cat) => (
                      <div className="flex items-center space-x-2" key={cat}>
                        <Checkbox
                          id={`category-${cat}`}
                          checked={field.value?.includes(cat)}
                          onCheckedChange={() =>
                            handleCheckboxChange(
                              field.value ?? [],
                              field.onChange,
                              cat
                            )
                          }
                        />
                        <Label htmlFor={`category-${cat}`}>{cat}</Label>
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />

            {/* Genders */}
            <FormField
              control={form.control}
              name="genders"
              render={({ field }) => (
                <FormItem className="mx-6">
                  <FormLabel>Gender</FormLabel>
                  <div className="flex flex-col gap-2">
                    {genders.map((g) => (
                      <div className="flex items-center space-x-2" key={g}>
                        <Checkbox
                          id={`gender-${g}`}
                          checked={field.value?.includes(g)}
                          onCheckedChange={() =>
                            handleCheckboxChange(
                              field.value ?? [],
                              field.onChange,
                              g
                            )
                          }
                        />
                        <Label htmlFor={`gender-${g}`}>{g}</Label>
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="mx-6">
                  <FormLabel>Max Price: ₹{field.value}</FormLabel>
                  <FormControl>
                    <Slider
                      value={[field.value]}
                      onValueChange={(val) => field.onChange(val[0])}
                      max={5000}
                      step={100}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end mx-6">
              <Button type="submit" className="w-full">
                Apply Filters
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
