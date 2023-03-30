import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { endpoints } from "../endpoints";

import { type IUser } from "./types";

export const usersQueries = createApi({
  reducerPath: "usersQueries",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => endpoints.users.getAll,
    }),
    getUserById: builder.query<IUser, string>({
      query: (id: string) => endpoints.users.getById(id),
    }),
    deleteUserById: builder.mutation<IUser, string>({
      query: (id: string) => ({
        url: endpoints.users.getById(id),
        method: "DELETE",
      }),
    }),
    createUser: builder.mutation<IUser, Partial<IUser>>({
      query: (user: Partial<IUser>) => ({
        url: endpoints.users.getAll,
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserByIdMutation,
  useCreateUserMutation,
} = usersQueries;
