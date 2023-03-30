import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { endpoints } from "../endpoints";

import { type IUnit } from "./types";

export const unitsQueries = createApi({
  reducerPath: "unitsQueries",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  endpoints: (builder) => ({
    getAllUnits: builder.query<IUnit[], void>({
      query: () => endpoints.units.getAll,
    }),
    getUnitById: builder.query<IUnit, string | number>({
      query: (id: number | string) => endpoints.units.getById(id),
    }),
    deleteUnityById: builder.mutation<IUnit, string | number>({
      query: (id: number | string) => ({
        url: endpoints.units.getById(id),
      }),
    }),
    createUnit: builder.mutation<IUnit, Partial<IUnit>>({
      query: (unit: Partial<IUnit>) => ({
        url: endpoints.units.getAll,
        method: "POST",
        body: unit,
      }),
    }),
  }),
});

export const {
  useGetAllUnitsQuery,
  useGetUnitByIdQuery,
  useDeleteUnityByIdMutation,
  useCreateUnitMutation,
} = unitsQueries;
