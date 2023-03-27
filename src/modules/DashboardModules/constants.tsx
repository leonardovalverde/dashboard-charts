import HomeModule from "./HomeModule/index";
import AssetsModule from "./AssetsModule/index";
import CompaniesModule from "./CompaniesModule/index";
import UnitsModule from "./UnitsModule/index";
import UsersModule from "./UsersModule/index";
import { IUser } from "services/users/types";
interface IModules {
  [key: string]: JSX.Element;
}

const modules = (userData: IUser): IModules => {
  return {
    home: <HomeModule userData={userData} />,
    assets: <AssetsModule />,
    companies: <CompaniesModule />,
    units: <UnitsModule />,
    users: <UsersModule />,
  };
};

export { modules };
