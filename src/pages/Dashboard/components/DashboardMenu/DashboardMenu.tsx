import {
  AppstoreOutlined,
  AreaChartOutlined,
  DeploymentUnitOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Spin, Switch } from "antd";
import Paragraph from "components/Typography/Paragraph";
import { getItem, MenuItem } from "utils/functions";
import { CompanyContainer, StyledSider, ToggleAdminContainer } from "./styles";
import { DashboardMenuProps } from "./types";
import { useGetUnitByIdQuery } from "services/units/units";
import { useGetCompanyByIdQuery } from "services/companies/companies";
import { setUser } from "store/slice/userSlice";
import { useDispatch } from "react-redux/es/exports";

const items: MenuItem[] = [
  getItem("Início", "home", <AreaChartOutlined />),

  getItem("Ordens de serviço", "workOrders", <SettingOutlined />),

  getItem("Ativos", "assets", <AppstoreOutlined />),

  getItem("Usuários", "users", <UserOutlined />),

  getItem("Unidades", "units", <DeploymentUnitOutlined />),
];

const DashboardMenu = ({
  onClick,
  current,
  userData,
}: DashboardMenuProps): JSX.Element => {
  const { data, isLoading, error } = useGetUnitByIdQuery(userData.unitId);
  const {
    data: companyData,
    isLoading: companyIsLoading,
    error: companyError,
  } = useGetCompanyByIdQuery(userData.unitId);
  const dispatch = useDispatch();

  const handleAdminMode = (value: boolean) => {
    if (value && value === true) {
      dispatch(setUser({ ...userData, isAdmin: true }));
    } else {
      dispatch(setUser({ ...userData, isAdmin: false }));
    }
  };

  return (
    <StyledSider>
      <CompanyContainer>
        {isLoading || companyIsLoading ? (
          <Spin />
        ) : (
          <>
            <Paragraph color="#fff" strong>
              {companyError
                ? "Erro ao carregar o nome da empresa"
                : companyData?.name}
            </Paragraph>
            <Paragraph color="#fff" strong>
              {error ? "Erro ao carregar o nome da unidade" : data?.name}
            </Paragraph>
          </>
        )}
      </CompanyContainer>
      <Menu
        theme="dark"
        onClick={onClick}
        style={{
          width: "100%",
        }}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
      <ToggleAdminContainer>
        <Switch
          checkedChildren="Modo Admin"
          unCheckedChildren="Modo Usuário"
          onChange={(value) => handleAdminMode(value)}
          defaultChecked={userData.isAdmin}
        />
      </ToggleAdminContainer>
    </StyledSider>
  );
};

export default DashboardMenu;
