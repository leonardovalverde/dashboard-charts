import { MenuProps } from "antd";
import { IUser } from "services/users/types";

export interface DashboardMenuProps {
  onClick: MenuProps["onClick"];
  userData: IUser;
  current: string;
}
