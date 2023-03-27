import axios from "axios";
import { endpoints } from "../endpoints";
import { ICompany } from "./types";

export const getCompanies = async (): Promise<ICompany[]> => {
  const response = await axios.get(endpoints.companies.getAll);
  return response.data;
};

export const getCompanyById = async (
  id: string | number
): Promise<ICompany> => {
  const response = await axios.get(endpoints.companies.getById(id));
  return response.data;
};
