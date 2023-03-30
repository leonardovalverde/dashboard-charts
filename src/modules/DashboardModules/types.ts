import { type IUser } from "services/users/types";

export interface DashboardModulesRenderProps {
  current: string;
  userData: IUser;
}
