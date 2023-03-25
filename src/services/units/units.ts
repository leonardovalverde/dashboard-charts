import axios from "axios";
import { endpoints } from "../endpoints";
import { IUnit } from "./types";

export const getUnits = async (): Promise<IUnit[]> => {
  const response = await axios.get(endpoints.units.getAll);
  return response.data;
};

export const getUnitById = async (id: string): Promise<IUnit> => {
  const response = await axios.get(endpoints.units.getById(id));
  return response.data;
};
