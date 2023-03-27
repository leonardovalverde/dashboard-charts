import { modules } from "./constants";
import { DashboardModulesRenderProps } from "./types";

const DashboardModulesRender = ({
  current,
  userData,
}: DashboardModulesRenderProps): JSX.Element => {
  return <>{modules(userData)[current]}</>;
};

export default DashboardModulesRender;
