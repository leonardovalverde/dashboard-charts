import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { endpoints } from "../endpoints";
import { IAsset } from "./types";

export const assets = createApi({
  reducerPath: "assets",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  endpoints: (builder) => ({
    getAllAssets: builder.query<IAsset[], void>({
      query: () => endpoints.assets.getAll,
    }),
    getAssetsById: builder.query<IAsset, string>({
      query: (id: number | string) => endpoints.assets.getById(id),
    }),
  }),
});

export const { useGetAllAssetsQuery, useGetAssetsByIdQuery } = assets;
