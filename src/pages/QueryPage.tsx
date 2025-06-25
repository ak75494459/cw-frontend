import { useCreateMyQuery, useGetMyQuery } from "@/api/MyQueryApi";
import QueryForm from "@/forms/query-form/QueryForm";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const QueryPage = () => {
  const { createQuery, isPending } = useCreateMyQuery();
  const { QueryData, refetchQuery, isLoading } = useGetMyQuery();

  // Refetch after form submission
  useEffect(() => {
    if (!isPending) {
      refetchQuery();
    }
  }, [isPending, refetchQuery]);

  if (!QueryData) {
    <div>No Query Found</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white  p-4 ">
        <h1 className="text-2xl font-bold mb-4">Submit Your Query</h1>
        <QueryForm onSubmitQuery={createQuery} isLoading={isPending} />
      </div>

      <div className="bg-white shadow-lg p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Your Queries</h2>

        {isLoading ? (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="animate-spin h-5 w-5" />
            Loading queries...
          </div>
        ) : QueryData?.length > 0 ? (
          <ul className="space-y-4">
            {QueryData.map((query: any) => (
              <li
                key={query._id}
                className="border p-3 rounded bg-gray-100 text-sm"
              >
                <p>
                  <strong>Subject:</strong> {query.subject}
                </p>
                <p>
                  <strong>Description:</strong> {query.describeSubject}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            You haven't submitted any queries yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default QueryPage;
