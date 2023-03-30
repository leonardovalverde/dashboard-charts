import { type MenuProps } from "antd";
import { type IUser } from "services/users/types";

export interface DashboardHeaderProps {
  userData: IUser;
  current: string;
  onClick: MenuProps["onClick"];
}
