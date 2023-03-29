import { IAsset } from "services/assets/types";
import { red, green, yellow, orange, gray } from "@ant-design/colors";
import { IUser } from "../../../services/users/types";
import { IWorkOrder } from "services/workOrders/types";

const getOnlyAsignedAssets = (assets: IAsset[], userId: number): IAsset[] => {
  const assetsByUser = assets.filter((asset) =>
    asset.assignedUserIds.includes(userId)
  );
  return assetsByUser;
};

const orderAssetsByScore = (assets: IAsset[]): IAsset[] => {
  const assetsArray = [...assets]
  const orderedAssets = assetsArray.sort((a, b) => b.healthscore - a.healthscore);
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
): { status: string; count: number }[] => {
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
): { [key: string]: string[] }[] => {
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

const createCheckListArray = (object: any): any[] => {
  const arrayOfObjects = Object.keys(object).map((key) => ({
    completed: object[key],
    task: key,
  }));
  return arrayOfObjects;
};

export {
  getOnlyAsignedAssets,
  orderAssetsByScore,
  getColorByScore,
  getColorByStatus,
  getColorByPriority,
  getColorByProgress,
  countAssetsWithStatus,
  getAssetsNameByStatus,
  getUsersOfSameCompany,
  getWorkOrdersByAssignedUserId,
  createCheckListArray,
};
