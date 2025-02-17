import { api } from "../../app/serverApi";
const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        body,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        body,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

export interface RegisterCredentials {
  username: string;
  password?: string;
  role: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
