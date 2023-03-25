import axios from "axios";
import { endpoints } from "../endpoints";
import { IAsset } from "./types";

export const getAssets = async (): Promise<IAsset[]> => {
  const response = await axios.get(endpoints.assets.getAll);
  return response.data;
};
