import { Menu, Switch } from "antd";
import Paragraph from "components/Typography/Paragraph";
import useAuth from "hooks/useAuth";
import { items } from "pages/Dashboard/menuConstants";
import { useDispatch } from "react-redux";
import { setUser } from "store/slice/userSlice";

import {
  Container,
  SignOutButtonWrapper,
  StyledButton,
  SwitchContainer,
  UserInfoWrapper,
} from "./styles";
import { type DashboardMobileMenuProps } from "./types";

const DashboardMobileMenu = ({
  onClick,
  current,
  colapsed,
  userData,
  companyName,
  unitName,
}: DashboardMobileMenuProps): JSX.Element => {
  const { signOut } = useAuth();
  const dispatch = useDispatch();
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
            <Paragraph color="#fff">{unitName}</Paragraph>
            <Paragraph color="#fff">{companyName}</Paragraph>
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
            <StyledButton type="default" onClick={signOut}>
              Sair
            </StyledButton>
          </SignOutButtonWrapper>
        </Container>
      )}
    </>
  );
};

export default DashboardMobileMenu;
