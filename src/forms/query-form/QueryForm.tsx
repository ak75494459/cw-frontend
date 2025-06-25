import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const querySchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  describeSubject: z
    .string()
    .min(10, "Description must be at least 10 characters"),
});

type QueryFormData = z.infer<typeof querySchema>;

type Props = {
  onSubmitQuery: (formData: FormData) => void;
  isLoading?: boolean;
};

const QueryForm = ({ onSubmitQuery, isLoading }: Props) => {
  const form = useForm<QueryFormData>({
    resolver: zodResolver(querySchema),
    defaultValues: {
      subject: "",
      describeSubject: "",
    },
  });

  const {
    isAuthenticated,
    loginWithRedirect,
    isLoading: authLoading,
  } = useAuth0();

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: window.location.pathname },
      });
    }
  }, [authLoading, isAuthenticated, loginWithRedirect]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center p-10 text-gray-600">
        Loading authentication...
      </div>
    );
  }

  const onSubmit = (data: QueryFormData) => {
    const formData = new FormData();
    formData.append("subject", data.subject);
    formData.append("describeSubject", data.describeSubject);
    onSubmitQuery(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 rounded-md"
      >
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white"
                  placeholder="Enter subject"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="describeSubject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Describe Your Query</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  className="bg-white"
                  placeholder="Describe your query in detail..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-[#492822] text-white hover:bg-[#CC7351]"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Query"}
        </Button>
      </form>
    </Form>
  );
};

export default QueryForm;
