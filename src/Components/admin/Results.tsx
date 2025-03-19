import { useGetAllResultsQuery } from "../../features/result/resultApi";
import { ResultItem } from "../../features/result/ResultItem";
import { NoResult } from "../NoResult";

export const Results = () => {
  const { data: results } = useGetAllResultsQuery();
  if (!results?.length) {
    return <NoResult />;
  }
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col gap-2 p-2 px-[20%]">
        {results?.map((result) => (
          <ResultItem key={result._id} result={result} />
        ))}
      </div>
    </div>
  );
};
