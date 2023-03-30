import { type IUser } from "services/users/types";

export interface ActionHeaderProps {
  userData: IUser;
}

export interface IFormValues {
  name: string;
  unitId: number | string;
  email: string;
}
