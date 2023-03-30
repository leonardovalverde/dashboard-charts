import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { endpoints } from "../endpoints";

import { type IWorkOrder } from "./types";

export const workOrdersQueries = createApi({
  reducerPath: "workOrdersQueries",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  endpoints: (builder) => ({
    getAllWorkOrders: builder.query<IWorkOrder[], void>({
      query: () => endpoints.workOrders.getAll,
    }),
    getWorkOrderById: builder.query<IWorkOrder, string>({
      query: (id: string) => endpoints.workOrders.getById(id),
    }),
    updateWorkOrderChecklistById: builder.mutation<
      IWorkOrder,
      { id: string; checklist: IWorkOrder["checklist"] }
    >({
      query: ({ id, checklist }) => ({
        url: endpoints.workOrders.getById(id),
        method: "PATCH",
        body: { checklist },
      }),
      transformResponse: (response: { data: IWorkOrder }) => response.data,
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
    }),
    deleteWorkOrderById: builder.mutation<IWorkOrder, string>({
      query: (id: string) => ({
        url: endpoints.workOrders.getById(id),
        method: "DELETE",
      }),
    }),
    createWorkOrder: builder.mutation<IWorkOrder, Partial<IWorkOrder>>({
      query: (workOrder: IWorkOrder) => ({
        url: endpoints.workOrders.getAll,
        method: "POST",
        body: workOrder,
      }),
    }),
  }),
});

export const {
  useGetAllWorkOrdersQuery,
  useGetWorkOrderByIdQuery,
  useUpdateWorkOrderChecklistByIdMutation,
  useDeleteWorkOrderByIdMutation,
  useCreateWorkOrderMutation,
} = workOrdersQueries;
