import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { endpoints } from "../endpoints";

import { type ICompany } from "./types";

export const companiesQueries = createApi({
  reducerPath: "companiesQueries",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  endpoints: (builder) => ({
    getAllCompanies: builder.query<ICompany[], string>({
      query: () => endpoints.companies.getAll,
    }),
    getCompanyById: builder.query<ICompany, string | number>({
      query: (id: number | string) => endpoints.companies.getById(id),
    }),
  }),
});

export const { useGetAllCompaniesQuery, useGetCompanyByIdQuery } =
  companiesQueries;
