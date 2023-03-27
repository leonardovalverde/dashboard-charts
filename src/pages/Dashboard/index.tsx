import { MenuProps } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IUserState } from "store/slice/userSlice";
import DashboardModulesRender from "modules/DashboardModules";
import DashboardHeader from "./components/DashboardHeader/DashboardHeader";
import DashboardMenu from "./components/DashboardMenu/DashboardMenu";
import { Container } from "./styles";

const Dashboard = (): JSX.Element => {
  const userData = useSelector((state: IUserState) => state.user);
  const [current, setCurrent] = useState<string>("home");

  const handleSelected: MenuProps["onClick"] = (active) => {
    setCurrent(active.key);
  };

  return (
    <>
      <DashboardHeader userData={userData} />
      <Container>
        <DashboardMenu
          current={current}
          onClick={handleSelected}
          userData={userData}
        />
        <DashboardModulesRender current={current} userData={userData} />
      </Container>
    </>
  );
};

export default Dashboard;
