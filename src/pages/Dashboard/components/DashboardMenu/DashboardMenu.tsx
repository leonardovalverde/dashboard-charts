import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Paragraph from "components/Typography/Paragraph";
import { getItem, MenuItem } from "utils/functions";
import { CompanyContainer, StyledSider } from "./styles";
import { DashboardMenuProps } from "./types";

const items: MenuItem[] = [
  getItem("Início", "home", <MailOutlined />),

  getItem("Ativos", "assets", <AppstoreOutlined />),

  getItem("Usuários", "users", <SettingOutlined />),

  getItem("Unidades", "units", <SettingOutlined />),
];

const DashboardMenu = ({
  onClick,
  current,
  userData,
}: DashboardMenuProps): JSX.Element => {
  return (
    <StyledSider>
      <CompanyContainer>
        <Paragraph color="#fff" strong>
          {userData.company.name}
        </Paragraph>
        <Paragraph color="#fff" strong>
          {userData.unit.name}
        </Paragraph>
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
    </StyledSider>
  );
};

export default DashboardMenu;
