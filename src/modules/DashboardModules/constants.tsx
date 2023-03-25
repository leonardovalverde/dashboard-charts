import HomeModule from "./HomeModule/index";
import AssetsModule from "./AssetsModule/index";
import CompaniesModule from "./CompaniesModule/index";
import UnitsModule from "./UnitsModule/index";
import UsersModule from "./UsersModule/index";
interface IModules {
  [key: string]: JSX.Element;
}

const modules: IModules = {
  home: <HomeModule />,
  assets: <AssetsModule />,
  companies: <CompaniesModule />,
  units: <UnitsModule />,
  users: <UsersModule />,
};

export { modules };
