import { Avatar, Dropdown, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import useAuth from "../../../../hooks/useAuth";
import {
  Container,
  DropDownWrapper,
  HeaderLeftSection,
  HeaderRightSection,
  NameContainer,
  StyledDivider,
  StyledMenu,
  StyledRadarChartOutlined,
  StyledText,
} from "./styles";
import { IUserState } from "../../../../store/slice/userSlice";

interface DashboardHeaderProps {
  onClick: MenuProps["onClick"];
  current: string;
}

const items: MenuProps["items"] = [
  {
    label: <span>Home</span>,
    key: "home",
  },
  {
    label: <span>Ativos</span>,
    key: "assets",
  },
  {
    label: <span>Usuários</span>,
    key: "users",
  },
  {
    label: <span>Unidades</span>,
    key: "units",
  },
  {
    label: <span>Empresas</span>,
    key: "companies",
  },
];

const logout: MenuProps["items"] = [
  {
    label: <span>Sair</span>,
    key: "logout",
  },
];

const DashboardHeader = ({
  onClick,
  current,
}: DashboardHeaderProps): JSX.Element => {
  const navigate = useNavigate();
  const userData = useSelector((state: IUserState) => state.user);
  const { signOut } = useAuth();

  return (
    <Container>
      <HeaderLeftSection>
        <StyledRadarChartOutlined onClick={() => navigate("/dashboard")} />
        <StyledDivider type="vertical" />
        <StyledMenu
          theme="dark"
          mode="horizontal"
          items={items}
          selectedKeys={[current]}
          onClick={onClick}
        />
      </HeaderLeftSection>
      <HeaderRightSection>
        <Avatar icon={<UserOutlined />} />
        <Dropdown
          menu={{
            items: logout,
            onClick: () => signOut(),
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
