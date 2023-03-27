import { IAsset } from "services/assets/types";

export interface HealthChartProps {
  assets: IAsset[];
}

export interface IStatusCounter {
  status: string;
  count: number;
}