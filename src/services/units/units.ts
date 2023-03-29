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
  }),
});

export const { useGetAllUnitsQuery, useGetUnitByIdQuery } = unitsQueries;
