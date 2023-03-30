export interface IChecklist {
  completed: boolean;
  task: string;
}

export interface IWorkOrder {
  assetId: number | string;
  assignedUserIds: number[];
  checklist: IChecklist[];
  description: string;
  id: number | string;
  priority: string;
  status: string;
  title: string;
}
