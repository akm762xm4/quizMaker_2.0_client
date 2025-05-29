import { NoResult } from "../../Components/NoResult";
import { useGetPendingRequestsQuery } from "./requestApi";
import { RequestItem } from "./RequestItem";

export const Requests = () => {
  const { data: requests } = useGetPendingRequestsQuery();
  if (!requests || !requests.length) {
    return <NoResult />;
  }

  return (
    <div className="flex flex-col gap-3 p-4 md:px-[20%] h-screen">
      {requests?.map((request) => (
        <RequestItem key={request._id} request={request} />
      ))}
    </div>
  );
};
