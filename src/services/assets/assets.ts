import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { endpoints } from "../endpoints";

import { type IAsset } from "./types";

export const assetsQueries = createApi({
  reducerPath: "assetsQueries",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  endpoints: (builder) => ({
    getAllAssets: builder.query<IAsset[], void>({
      query: () => endpoints.assets.getAll,
    }),
    getAssetsById: builder.query<IAsset, string>({
      query: (id: number | string) => endpoints.assets.getById(id),
    }),
    deleteAssetById: builder.mutation<IAsset, string>({
      query: (id: number | string) => ({
        url: endpoints.assets.getById(id),
        method: "DELETE",
      }),
    }),
    createAsset: builder.mutation<IAsset, Partial<IAsset>>({
      query: (asset: IAsset) => ({
        url: endpoints.assets.getAll,
        method: "POST",
        body: asset,
      }),
    }),
  }),
});

export const {
  useGetAllAssetsQuery,
  useGetAssetsByIdQuery,
  useDeleteAssetByIdMutation,
  useCreateAssetMutation,
} = assetsQueries;
