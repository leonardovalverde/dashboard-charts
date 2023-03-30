import { type IUser } from "services/users/types";

import AssetsModule from "./AssetsModule/index";
import HomeModule from "./HomeModule/index";
import UnitsModule from "./UnitsModule/index";
import UsersModule from "./UsersModule/index";
import WorkOrdersModule from "./WorkOrdersModule/index";

type IModules = Record<string, JSX.Element>;

const modules = (userData: IUser): IModules => {
  return {
    home: <HomeModule userData={userData} />,
    assets: <AssetsModule userData={userData} />,
    units: <UnitsModule userData={userData} />,
    users: <UsersModule userData={userData} />,
    workOrders: <WorkOrdersModule userData={userData} />,
  };
};

const translatedPriority: Record<string, string> = {
  high: "Alta",
  medium: "Média",
  low: "Baixa",
};

const translatedStatus: Record<string, string> = {
  completed: "Concluído",
  "in progress": "Em andamento",
  open: "Aberto",
};

export { modules, translatedPriority, translatedStatus };
