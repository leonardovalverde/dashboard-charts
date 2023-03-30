import { useMemo, useState } from "react";
import { type MenuProps, Spin } from "antd";
import DashboardModulesRender from "modules/DashboardModules";
import { useSelector } from "react-redux";
import { useGetCompanyByIdQuery } from "services/companies/companies";
import { useGetUnitByIdQuery } from "services/units/units";
import { type IUserState } from "store/slice/userSlice";

import DashboardHeader from "./components/DashboardHeader/DashboardHeader";
import DashboardMenu from "./components/DashboardMenu/DashboardMenu";
import { Container, ContentWrapper } from "./styles";

const Dashboard = (): JSX.Element => {
  const userData = useSelector((state: IUserState) => state.user);
  const {
    data: companyData,
    isLoading: companyIsLoading,
    error: companyError,
  } = useGetCompanyByIdQuery(userData.companyId);
  const {
    data: dataUnit,
    isLoading: isLoadingUnit,
    error: errorUnit,
  } = useGetUnitByIdQuery(userData.unitId);
  const [current, setCurrent] = useState<string>("home");

  const handleSelected: MenuProps["onClick"] = (active) => {
    setCurrent(active.key);
  };

  const companyName = useMemo(() => {
    if (companyError) {
      return "Não foi possível carregar o nome da empresa";
    }
    if (companyIsLoading) {
      return <Spin />;
    }
    return companyData?.name;
  }, [companyData, companyError, companyIsLoading]);

  const unitName = useMemo(() => {
    if (errorUnit) {
      return "Não foi possível carregar o nome da unidade";
    }
    if (isLoadingUnit) {
      return <Spin />;
    }
    return dataUnit?.name;
  }, [dataUnit, errorUnit, isLoadingUnit]);

  return (
    <Container>
      <DashboardHeader
        userData={userData}
        current={current}
        onClick={handleSelected}
        companyName={companyName}
        unitName={unitName}
      />
      <ContentWrapper>
        <DashboardMenu
          current={current}
          onClick={handleSelected}
          userData={userData}
          companyName={companyName}
          unitName={unitName}
        />
        <DashboardModulesRender current={current} userData={userData} />
      </ContentWrapper>
    </Container>
  );
};

export default Dashboard;
