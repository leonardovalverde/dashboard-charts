import { type IUser } from "services/users/types";

export interface ActionHeaderProps {
  userData: IUser;
}

export interface IFormValues {
  assignedIds: string[];
  healthscore: string;
  image: string;
  model: string;
  name: string;
  sensors: string[];
  maxTemperature: string;
  rpm: string;
  power: string;
  status: string;
  unitId: number;
}
