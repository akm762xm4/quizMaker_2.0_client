import { useGetStudentResultsQuery } from "../../features/result/resultApi";
import { ResultItem } from "../../features/result/ResultItem";
import Loader from "../Loader";
import { NoResult } from "../NoResult";
import { PageHeader } from "../PageHeader";

export const Results = () => {
  const { data: results, isLoading, isFetching } = useGetStudentResultsQuery();

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (!isLoading && !isFetching && !results?.length) {
    return <NoResult message="No results found." />;
  }

  return (
    <div className="min-h-screen page-container py-8 space-y-6">
      <PageHeader
        title="Quiz Results"
        description="Review the performance of students across all quizzes. Delete or view detailed breakdowns."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {results?.map((result) => (
          <ResultItem key={result._id} result={result} />
        ))}
      </div>
    </div>
  );
};
