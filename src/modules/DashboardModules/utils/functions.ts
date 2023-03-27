import { IAsset } from "services/assets/types";
import { red, green, yellow, orange, gray } from "@ant-design/colors";

const getOnlyAsignedAssets = (assets: IAsset[], userId: number): IAsset[] => {
  const assetsByUser = assets.filter(
    (asset) => asset.assignedUserIds.filter((id) => id === userId).length > 0
  );
  return assetsByUser;
};

const orderAssetsByScore = (assets: IAsset[]): IAsset[] => {
  const orderedAssets = assets.sort((a, b) => {
    if (a.healthscore > b.healthscore) {
      return -1;
    } else if (a.healthscore < b.healthscore) {
      return 1;
    } else {
      return 0;
    }
  });
  return orderedAssets;
};

const getColorByScore = (score: number): string => {
  if (score >= 0 && score <= 40) {
    return red[4];
  } else if (score > 40 && score <= 60) {
    return orange[5];
  } else if (score > 60 && score <= 70) {
    return yellow[4];
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

export {
  getOnlyAsignedAssets,
  orderAssetsByScore,
  getColorByScore,
  getColorByStatus,
  countAssetsWithStatus,
  getAssetsNameByStatus,
};
