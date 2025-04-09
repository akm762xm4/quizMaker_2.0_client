import { api } from "../../app/serverApi";

const requestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPendingRequests: builder.query<Request[], void>({
      query: () => "approveFaculty",
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
  }),
});

export const { useGetPendingRequestsQuery, useApproveFacultyRequestMutation } =
  requestApi;

export interface Request {
  password: string;
  role: string;
  status: string;
  username: string;
  _id: string;
}
