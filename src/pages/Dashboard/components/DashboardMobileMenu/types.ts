import { type MenuProps } from "antd";
import { type IUser } from "services/users/types";

export interface DashboardMobileMenuProps {
  onClick: MenuProps["onClick"];
  current: string;
  colapsed: boolean;
  userData: IUser;
  companyName: string | JSX.Element | undefined;
  unitName: string | JSX.Element | undefined;
}
