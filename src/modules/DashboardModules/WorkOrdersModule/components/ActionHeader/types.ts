export interface IFormValues {
  description: string;
  name: string;
  assetId: string | number;
  priority: string;
  status: string;
  tasks: Array<Record<string, string>>;
}
