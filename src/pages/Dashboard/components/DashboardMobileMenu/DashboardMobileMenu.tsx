import { Button, Menu, Spin, Switch } from "antd";
import Paragraph from "components/Typography/Paragraph";
import useAuth from "hooks/useAuth";
import { items } from "pages/Dashboard/menuConstants";
import { useDispatch } from "react-redux";
import { useGetCompanyByIdQuery } from "services/companies/companies";
import { useGetUnitByIdQuery } from "services/units/units";
import { setUser } from "store/slice/userSlice";

import {
  Container,
  SignOutButtonWrapper,
  SwitchContainer,
  UserInfoWrapper,
} from "./styles";
import { type DashboardMobileMenuProps } from "./types";

const DashboardMobileMenu = ({
  onClick,
  current,
  colapsed,
  userData,
}: DashboardMobileMenuProps): JSX.Element => {
  const { data, isLoading } = useGetUnitByIdQuery(userData.unitId);
  const { signOut } = useAuth();
  const dispatch = useDispatch();
  const { data: companyData, isLoading: companyIsLoading } =
    useGetCompanyByIdQuery(userData.companyId);

  const handleAdminMode = (value: boolean): void => {
    if (value && value) {
      dispatch(setUser({ ...userData, isAdmin: true }));
    } else {
      dispatch(setUser({ ...userData, isAdmin: false }));
    }
  };

  return (
    <>
      {colapsed ? (
        <></>
      ) : (
        <Container>
          <UserInfoWrapper>
            <Paragraph color="#fff">{userData.name}</Paragraph>
            <Paragraph color="#fff">ID: {userData.id}</Paragraph>
            <Paragraph color="#fff">
              {isLoading ? <Spin /> : data?.name}
            </Paragraph>
            <Paragraph color="#fff">
              {companyIsLoading ? <Spin /> : companyData?.name}
            </Paragraph>
          </UserInfoWrapper>
          <Menu
            theme="dark"
            onClick={onClick}
            selectedKeys={[current]}
            mode="inline"
            items={items}
          />
          <SwitchContainer>
            <Switch
              checkedChildren="Modo Admin"
              unCheckedChildren="Modo Usuário"
              onChange={(value) => {
                handleAdminMode(value);
              }}
              defaultChecked={userData.isAdmin}
            />
          </SwitchContainer>
          <SignOutButtonWrapper>
            <Button type="default" onClick={signOut} style={{ width: "100%" }}>
              Sair
            </Button>
          </SignOutButtonWrapper>
        </Container>
      )}
    </>
  );
};

export default DashboardMobileMenu;
