import { useState } from "react";
import { NoResult } from "../../Components/NoResult";
import { PageHeader } from "../../Components/PageHeader";
import { useGetAllRequestsQuery } from "./requestApi";
import { RequestItem } from "./RequestItem";
import { Loader } from "../../Components/Loader";

export const Requests = () => {
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: requests,
    isLoading,
    isFetching,
  } = useGetAllRequestsQuery({ status: statusFilter });

  if (isLoading || isFetching) return <Loader />;

  if (!isLoading && !isFetching && !requests?.length) {
    return <NoResult message="No faculty requests found." />;
  }

  return (
    <div className="min-h-screen page-container py-6 flex flex-col gap-6">
      {/* Page Header */}
      <PageHeader
        title="📩 Faculty Requests"
        description="Review and take action on pending faculty approval requests."
      />

      {/* Status Filter */}
      <div className="form-group sm:flex-row sm:items-center sm:gap-4 max-w-md">
        <label htmlFor="status-filter" className="form-label">
          Filter by status:
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-input"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Requests List */}
      <div className="flex flex-col gap-4">
        {requests?.map((request) => (
          <RequestItem key={request._id} request={request} />
        ))}
      </div>
    </div>
  );
};
