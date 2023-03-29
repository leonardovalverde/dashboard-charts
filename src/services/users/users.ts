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
  }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery } = usersQueries;
