import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryMeta,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { getToken, logoutUser } from "../utils/localStorage";

// const baseUrl = "http://localhost:8000/api";
const baseUrl = "https://quiz-maker-2-0-server.vercel.app/api";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let results = await baseQuery(args, api, extraOptions);

  if (results.error?.status === 401) {
    logoutUser();
  }
  return results;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes: ["user", "quiz", "qBank", "result", "question", "request"],
});
