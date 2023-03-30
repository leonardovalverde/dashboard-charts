import { useState } from "react";
import { Button, Dropdown, Image, type MenuProps } from "antd";
import useAuth from "hooks/useAuth";

import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import DashboardMobileMenu from "../DashboardMobileMenu/DashboardMobileMenu";

import {
  Container,
  DropDownWrapper,
  HeaderLeftSection,
  HeaderRightSection,
  NameContainer,
  StyledText,
} from "./styles";
import { type DashboardHeaderProps } from "./types";

const logout: MenuProps["items"] = [
  {
    label: <span>Sair</span>,
    key: "logout",
  },
];

const DashboardHeader = ({
  userData,
  current,
  onClick,
  companyName,
  unitName,
}: DashboardHeaderProps): JSX.Element => {
  const { signOut } = useAuth();
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const toggleCollapsed = (): void => {
    setCollapsed(!collapsed);
  };

  const handleCollapsed: MenuProps["onClick"] = (active) => {
    if (onClick) {
      onClick(active);
      setCollapsed(!collapsed);
    }
  };

  return (
    <Container>
      <HeaderLeftSection>
        <Image
          src="/assets/company-logo.svg"
          width={150}
          preview={false}
          alt="Logo da empresa"
        />
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ paddingBottom: 0 }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined style={{ fontSize: "18px" }} />
          ) : (
            <MenuFoldOutlined style={{ fontSize: "18px" }} />
          )}
        </Button>
      </HeaderLeftSection>
      <HeaderRightSection>
        <Dropdown
          menu={{
            items: logout,
            onClick: () => {
              signOut();
            },
          }}
          arrow={true}
        >
          <DropDownWrapper>
            <NameContainer>
              <StyledText>{userData.name}</StyledText>
              <StyledText>ID: {userData.id}</StyledText>
            </NameContainer>
            <DownOutlined />
          </DropDownWrapper>
        </Dropdown>
      </HeaderRightSection>
      <DashboardMobileMenu
        current={current}
        onClick={handleCollapsed}
        colapsed={collapsed}
        userData={userData}
        companyName={companyName}
        unitName={unitName}
      />
    </Container>
  );
};

export default DashboardHeader;
