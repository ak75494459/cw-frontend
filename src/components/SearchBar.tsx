import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

//  #DDD0C8
//  #323232
//  #99775C
//  #CC7351
//  #EFE4D2
//  #492822

// Schema validation using zod
const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Search query is required",
  }),
});

// Type for form data
export type SearchForm = z.infer<typeof formSchema>;

// Props for the component
type Props = {
  onSubmit: (formData: SearchForm) => void; // ✅ fixed spelling
  placeHolder: string;
  searchQuery?: string;
};

const SearchBar = ({ onSubmit, placeHolder, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  return (
    <Form {...form}>
      <div className="flex justify-end">
        <div
          className={`flex items-center gap-3 justify-between flex-row border-2 m-2 w-[50%] p-2 transition-all duration-300 focus-within:w-[70%] max-md:focus-within:w-full  max-md:w-full max-md:rounded-full  ${
            form.formState.errors.searchQuery && "border-red-500"
          }`}
        >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 items-center gap-3"
          >
            <Search
              strokeWidth={2.5}
              size={30}
              className="ml-1 text-[#99775C] hidden md:block "
            />

            <FormField
              control={form.control}
              name="searchQuery"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none shadow-none text-xl focus-visible:ring-0"
                      placeholder={placeHolder}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="rounded-full hover:bg-[#492822] bg-[#99775C]"
            >
              Search
            </Button>
          </form>
        </div>
      </div>
    </Form>
  );
};

export default SearchBar;
