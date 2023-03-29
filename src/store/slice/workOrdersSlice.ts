import { createSlice } from "@reduxjs/toolkit";
import { IWorkOrder } from "../../services/workOrders/types";

export interface IWorkOrderState {
  workOrders: IWorkOrder[];
}

export const workOrdersSlice = createSlice({
  name: "user",
  initialState: [
    {
      assetId: 0,
      assignedUserIds: [],
      checklist: [],
      description: "",
      id: 0,
      priority: "",
      status: "",
      title: "",
    },
  ] as IWorkOrder[],
  reducers: {
    setWorkOrders: (state: IWorkOrder[], { payload }) => {
      state = payload;
      return state;
    },
  },
});

export const { setWorkOrders } = workOrdersSlice.actions;

export const workOrdersReducer = workOrdersSlice.reducer;
