import { getItem } from "utils/functions";

import {
  AppstoreOutlined,
  AreaChartOutlined,
  DeploymentUnitOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { type MenuItem } from "../../utils/functions";

const items: MenuItem[] = [
  getItem("Início", "home", <AreaChartOutlined />),

  getItem("Ordens de serviço", "workOrders", <SettingOutlined />),

  getItem("Ativos", "assets", <AppstoreOutlined />),

  getItem("Usuários", "users", <UserOutlined />),

  getItem("Unidades", "units", <DeploymentUnitOutlined />),
];

export { items };
