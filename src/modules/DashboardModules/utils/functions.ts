import { type IAsset } from "services/assets/types";
import { type IUser } from "services/users/types";
import { type IChecklist, type IWorkOrder } from "services/workOrders/types";

import { gray, green, orange, red, yellow } from "@ant-design/colors";

const getOnlyAsignedAssets = (assets: IAsset[], userId: number): IAsset[] => {
  const assetsByUser = assets.filter((asset) =>
    asset.assignedUserIds.includes(userId)
  );
  return assetsByUser;
};

const orderAssetsByScore = (assets: IAsset[]): IAsset[] => {
  const assetsArray = [...assets];
  const orderedAssets = assetsArray.sort(
    (a, b) =>  b.healthscore - a.healthscore
  );
  return orderedAssets;
};

const getColorByScore = (score: number): string => {
  if (score >= 0 && score <= 40) {
    return red[4];
  } else if (score > 40 && score <= 60) {
    return orange[4];
  } else if (score > 60 && score <= 70) {
    return yellow[5];
  } else if (score > 70 && score <= 100) {
    return green[4];
  } else {
    return gray[0];
  }
};

const getColorByStatus = (status: string): string => {
  if (status === "inOperation") {
    return green[4];
  } else if (status === "inAlert") {
    return yellow[5];
  } else if (status === "inDowntime") {
    return orange[4];
  } else if (status === "unplannedStop") {
    return red[4];
  } else if (status === "plannedStop") {
    return gray[4];
  } else {
    return gray[0];
  }
};

const getColorByPriority = (priority: string): string => {
  if (priority === "high") {
    return red[4];
  } else if (priority === "medium") {
    return orange[4];
  } else if (priority === "low") {
    return green[5];
  } else {
    return gray[0];
  }
};

const getColorByProgress = (progress: string): string => {
  if (progress === "in progress") {
    return orange[4];
  } else if (progress === "completed") {
    return green[4];
  } else {
    return gray[0];
  }
};

const countAssetsWithStatus = (
  assets: IAsset[]
): Array<{ status: string; count: number }> => {
  const inOperation = assets.filter(
    (asset) => asset.status === "inOperation"
  ).length;
  const inAlert = assets.filter((asset) => asset.status === "inAlert").length;
  const inDowntime = assets.filter(
    (asset) => asset.status === "inDowntime"
  ).length;
  const unplannedStop = assets.filter(
    (asset) => asset.status === "unplannedStop"
  ).length;
  const countAssets = [
    { status: "inOperation", count: inOperation },
    { status: "inAlert", count: inAlert },
    { status: "inDowntime", count: inDowntime },
    { status: "unplannedStop", count: unplannedStop },
  ];
  return countAssets;
};

const getAssetsNameByStatus = (
  assets: IAsset[],
  status: string
): Array<Record<string, string[]>> => {
  const assetsByStatus = assets.filter((asset) => asset.status === status);
  const assetsNames = assetsByStatus.map((asset) => asset.name);
  const assetsNamesByStatus = [{ [status]: assetsNames }];
  return assetsNamesByStatus;
};

const getUsersOfSameCompany = (companyId: number, users: IUser[]): IUser[] => {
  const usersOfSameCompany = users.filter(
    (user) => user.companyId === companyId
  );
  return usersOfSameCompany;
};

const getWorkOrdersByAssignedUserId = (
  userId: number,
  workOrders: IWorkOrder[]
): IWorkOrder[] => {
  const workOrdersByAssignedUserId = workOrders.filter((workOrder) =>
    workOrder.assignedUserIds.includes(userId)
  );
  return workOrdersByAssignedUserId;
};

const createCheckListArray = (object: any): IChecklist[] => {
  const arrayOfObjects = Object.keys(object).map((key) => ({
    completed: object[key],
    task: key,
  }));
  return arrayOfObjects;
};

const createTaskWithStatus = (
  tasks: Array<Record<string, string>>
): IChecklist[] => {
  const tasksWithStatus = tasks.map((task) => {
    const taskWithStatus = {
      task: Object.keys(task)[0],
      completed: false,
    };
    return taskWithStatus;
  });
  return tasksWithStatus as IChecklist[];
};

export {
  countAssetsWithStatus,
  createCheckListArray,
  createTaskWithStatus,
  getAssetsNameByStatus,
  getColorByPriority,
  getColorByProgress,
  getColorByScore,
  getColorByStatus,
  getOnlyAsignedAssets,
  getUsersOfSameCompany,
  getWorkOrdersByAssignedUserId,
  orderAssetsByScore,
};
