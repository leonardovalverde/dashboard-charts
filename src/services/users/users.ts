import axios from "axios";
import { endpoints } from "../endpoints";
import { IUser } from "./types";

export const getUsers = async (): Promise<IUser[]> => {
  const response = await axios.get(endpoints.users.getAll);
  return response.data;
};

export const getUserById = async (id: string): Promise<IUser> => {
  const response = await axios.get(endpoints.users.getById(id));
  return response.data;
};
