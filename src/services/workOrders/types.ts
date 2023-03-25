export interface IChecklist {
  [index: number]: {
    completed: boolean;
    task: string;
  };
}

export interface IWorkOrder {
  assetId: number;
  assignedUserIds: number[];
  checklist: IChecklist;
  description: string;
  id: number;
  priority: string;
  status: string;
  title: string;
}
