import { api } from "../../app/serverApi";

const requestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPendingRequests: builder.query<Request[], void>({
      query: () => "approveFaculty/pending",
      providesTags: ["request"],
    }),
    getAllRequests: builder.query<Request[], { status?: string }>({
      query: ({ status = "all" }) => `approveFaculty?status=${status}`,
      providesTags: ["request"],
    }),
    checkExistingRequest: builder.query<
      {
        hasRequest: boolean;
        status?: string;
        message: string;
      },
      string
    >({
      query: (username) => `approveFaculty/check/${username}`,
      providesTags: ["request"],
    }),
    approveFacultyRequest: builder.mutation({
      query: (body) => ({
        url: `/approveFaculty/`,
        body,
        method: "PATCH",
      }),
      invalidatesTags: ["request", "user"],
    }),
    deleteRejectedRequest: builder.mutation({
      query: (requestId) => ({
        url: `/approveFaculty/${requestId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["request"],
    }),
  }),
});

export const {
  useGetPendingRequestsQuery,
  useGetAllRequestsQuery,
  useCheckExistingRequestQuery,
  useApproveFacultyRequestMutation,
  useDeleteRejectedRequestMutation,
} = requestApi;

export interface Request {
  password: string;
  role: string;
  status: string;
  username: string;
  _id: string;
  createdAt?: string;
}
