import { useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiFilter,
  FiXCircle,
} from "react-icons/fi";
import { NoResult } from "../../Components/NoResult";
import { useGetAllRequestsQuery } from "./requestApi";
import { RequestItem } from "./RequestItem";
import { Loader } from "../../Components/Loader";

export const Requests = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const { data: allRequests = [], isLoading } = useGetAllRequestsQuery({ status: "all" });
  if (isLoading) return <Loader />;
  if (!allRequests.length)
    return <NoResult message="No faculty requests found." />;
  const requests = statusFilter === "all" ? allRequests : allRequests.filter((request) => request.status === statusFilter);
  const pending = allRequests.filter(
    (request) => request.status === "pending",
  ).length;
  const approved = allRequests.filter(
    (request) => request.status === "approved",
  ).length;
  const rejected = allRequests.filter(
    (request) => request.status === "rejected",
  ).length;

  return (
    <div className="dashboard-page rounded-[1.35rem] aurora-page min-h-full pb-10 md:px-2 px-1 md:py-4 py-2">
      <header className="mb-8 flex flex-col gap-6 border-b border-slate-200/80 pb-7 dark:border-slate-800 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-rule max-w-sm">Administration / access</p>
          <div className="mt-4 flex items-start gap-3">
            {/* <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
              <FiInbox size={22} />
            </span> */}
            <div>
              <h1 className="text-3xl font-bold tracking-[-.035em] sm:text-4xl">
                Faculty requests
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                Review access requests, keep your teaching team accurate, and
                make decisions with confidence.
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-fit max-w-full shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          <FiFilter aria-hidden="true" />
          <label htmlFor="status-filter" className="sr-only">
            Filter requests by status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="!w-auto min-w-[8.75rem] border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 outline-none focus:ring-0 dark:text-slate-100"
          >
            <option value="all">All requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </header>
      <div className="mb-7 grid gap-3 sm:grid-cols-3">
        <Summary
          icon={FiClock}
          label="Pending review"
          value={pending}
          tone="violet"
        />
        <Summary
          icon={FiCheckCircle}
          label="Approved"
          value={approved}
          tone="emerald"
        />
        <Summary
          icon={FiXCircle}
          label="Rejected"
          value={rejected}
          tone="rose"
        />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <p className="text-sm font-bold">Request queue</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {requests.length} visible
          </p>
        </div>
        {requests.map((request) => (
          <RequestItem key={request._id} request={request} />
        ))}
      </div>
    </div>
  );
};

const Summary = ({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  tone: "violet" | "emerald" | "rose";
}) => {
  const styles = {
    violet:
      "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
    emerald:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  };
  return (
    <article className="surface-card flex items-center gap-3 p-4">
      <span
        className={`grid h-10 w-10 place-items-center rounded-xl ${styles[tone]}`}
      >
        <Icon aria-hidden="true" size={19} />
      </span>
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="mt-0.5 text-xl font-bold">{value}</p>
      </div>
    </article>
  );
};
