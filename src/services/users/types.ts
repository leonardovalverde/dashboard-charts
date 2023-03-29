import { IUnit } from "services/units/types";
import { ICompany } from "services/companies/types";

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
