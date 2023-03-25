import { MenuProps } from "antd";
import { useState } from "react";
import DashboardModulesRender from "../../modules/DashboardModules";
import DashboardHeader from "./components/DashbaordHeader/DashboardHeader";

const Dashboard = (): JSX.Element => {
  const [current, setCurrent] = useState<string>("home");

  const handleSelected: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <DashboardHeader onClick={handleSelected} current={current} />
      <DashboardModulesRender current={current} />
    </>
  );
};

export default Dashboard;
