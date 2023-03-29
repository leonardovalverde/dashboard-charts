import { Dropdown, Image, type MenuProps } from "antd";
import useAuth from "hooks/useAuth";

import { DownOutlined } from "@ant-design/icons";

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

const DashboardHeader = ({ userData }: DashboardHeaderProps): JSX.Element => {
  const { signOut } = useAuth();

  return (
    <Container>
      <HeaderLeftSection>
        <Image
          src="/assets/company-logo.svg"
          width={150}
          preview={false}
          alt="Logo da empresa"
        />
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
    </Container>
  );
};

export default DashboardHeader;
