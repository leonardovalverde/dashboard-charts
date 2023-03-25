import { modules } from "./constants";

interface DashboardModulesRenderProps {
  current: string;
}

const DashboardModulesRender = ({
  current,
}: DashboardModulesRenderProps): JSX.Element => {
  console.log(current);

  return <>{modules[current]}</>;
};

export default DashboardModulesRender;
