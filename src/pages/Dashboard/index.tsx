import { useState } from "react";
import { type MenuProps } from "antd";
import DashboardModulesRender from "modules/DashboardModules";
import { useSelector } from "react-redux";
import { type IUserState } from "store/slice/userSlice";

import DashboardHeader from "./components/DashboardHeader/DashboardHeader";
import DashboardMenu from "./components/DashboardMenu/DashboardMenu";
import { Container, ContentWrapper } from "./styles";

const Dashboard = (): JSX.Element => {
  const userData = useSelector((state: IUserState) => state.user);
  const [current, setCurrent] = useState<string>("home");

  const handleSelected: MenuProps["onClick"] = (active) => {
    setCurrent(active.key);
  };

  return (
    <Container>
      <DashboardHeader
        userData={userData}
        current={current}
        onClick={handleSelected}
      />
      <ContentWrapper>
        <DashboardMenu
          current={current}
          onClick={handleSelected}
          userData={userData}
        />
        <DashboardModulesRender current={current} userData={userData} />
      </ContentWrapper>
    </Container>
  );
};

export default Dashboard;
