import { Menu, Spin, Switch } from "antd";
import Paragraph from "components/Typography/Paragraph";
import { items } from "pages/Dashboard/menuConstants";
import { useDispatch } from "react-redux/es/exports";
import { useGetCompanyByIdQuery } from "services/companies/companies";
import { useGetUnitByIdQuery } from "services/units/units";
import { setUser } from "store/slice/userSlice";

import { CompanyContainer, StyledSider, ToggleAdminContainer } from "./styles";
import { type DashboardMenuProps } from "./types";
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

  const handleAdminMode = (value: boolean): void => {
    if (value && value) {
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
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
      <ToggleAdminContainer>
        <Switch
          checkedChildren="Modo Admin"
          unCheckedChildren="Modo Usuário"
          onChange={(value) => {
            handleAdminMode(value);
          }}
          defaultChecked={userData.isAdmin}
        />
      </ToggleAdminContainer>
    </StyledSider>
  );
};

export default DashboardMenu;
