import HomeModule from "./HomeModule/index";
import AssetsModule from "./AssetsModule/index";
import UnitsModule from "./UnitsModule/index";
import UsersModule from "./UsersModule/index";
import { IUser } from "services/users/types";
import WorkOrdersModule from "./WorkOrdersModule/index";
interface IModules {
  [key: string]: JSX.Element;
}

const modules = (userData: IUser): IModules => {
  return {
    home: <HomeModule userData={userData} />,
    assets: <AssetsModule userData={userData} />,
    units: <UnitsModule />,
    users: <UsersModule userData={userData} />,
    workOrders: <WorkOrdersModule userData={userData} />,
  };
};

const translatedPriority: { [key: string]: string } = {
  high: "Alta",
  medium: "Média",
  low: "Baixa",
};

const translatedStatus: { [key: string]: string } = {
  completed: "Concluída",
  "in progress": "Em andamento",
};

export { modules, translatedPriority, translatedStatus };
