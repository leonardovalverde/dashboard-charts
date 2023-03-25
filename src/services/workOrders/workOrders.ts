import axios from "axios";
import { endpoints } from "../endpoints";
import { IWorkOrder } from "./types";

export const getWorkOrders = async (): Promise<IWorkOrder[]> => {
  const response = await axios.get(endpoints.workOrders.getAll);
  return response.data;
};

export const getWorkOrderById = async (id: string): Promise<IWorkOrder> => {
  const response = await axios.get(endpoints.workOrders.getById(id));
  return response.data;
};
