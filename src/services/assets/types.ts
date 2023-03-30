export type IHealthHistory = Record<
  number,
  {
    status: string;
    timestamp: string;
  }
>;

export interface ISpecifications {
  maxTemp: number;
  power?: number;
  rpm?: number | null;
}

export interface IAsset {
  assignedUserIds: number[];
  companyId: number;
  healthHistory: IHealthHistory;
  healthscore: number;
  id: number | string;
  image: string;
  metrics: {
    lastUptimeAt: string;
    totalCollectsUptime: number;
    totalUptime: number;
  };
  model: string;
  name: string;
  sensors: string[];
  specifications: ISpecifications;
  status: string;
  unitId: number;
}
