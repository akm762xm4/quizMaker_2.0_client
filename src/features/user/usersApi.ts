import { api } from "../../app/serverApi";
import { getToken } from "../../utils/localStorage";

const token = getToken();

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<UserI[], void>({
      query: () => ({
        url: "/users",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
      providesTags: ["user"],
    }),
    getUserById: builder.query<UserI, string | undefined>({
      query: (userId) => ({
        url: `/users/${userId}`,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
      providesTags: ["user"],
    }),
    toggleUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}/toggle`,
        method: "PATCH",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
      invalidatesTags: ["user"],
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
      invalidatesTags: ["user"],
    }),
    editUser: builder.mutation({
      query: ({ userId, patch }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: patch,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useToggleUserMutation,
  useDeleteUserMutation,
  useCreateUserMutation,
  useEditUserMutation,
} = usersApi;

export interface UserI {
  _id: string;
  username: string;
  role: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
