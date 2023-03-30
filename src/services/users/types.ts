import { type ICompany } from "services/companies/types";
import { type IUnit } from "services/units/types";

export interface IUser {
  companyId: number;
  email: string;
  id: number;
  name: string;
  unitId: number | string;
  company: ICompany;
  unit: IUnit;
  isLogged?: boolean;
  isAdmin?: boolean;
}
