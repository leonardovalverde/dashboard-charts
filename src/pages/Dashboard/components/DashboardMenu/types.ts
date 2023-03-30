import { type MenuProps } from "antd";
import { type IUser } from "services/users/types";

export interface DashboardMenuProps {
  onClick: MenuProps["onClick"];
  userData: IUser;
  current: string;
}
