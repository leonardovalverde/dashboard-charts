import { useEffect, useState } from "react";
import { Spin } from "antd";
import SortingTable from "components/Table/SortingTable/SortingTable";
import {
  useDeleteAssetByIdMutation,
  useGetAllAssetsQuery,
} from "services/assets/assets";
import { type IAsset } from "services/assets/types";

import { blue } from "@ant-design/colors";

import { LoadingWrapper } from "../styles";
import { getOnlyAsignedAssets } from "../utils/functions";

import ActionHeader from "./components/ActionHeader/ActionHeader";
import AssetDetails from "./components/AssetDetails/AssetDetails";
import { assetsColumns } from "./columns";
import { Container } from "./styles";
import { type AssetsModuleProps } from "./types";

const AssetsModule = ({ userData }: AssetsModuleProps): JSX.Element => {
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [updatePost] = useDeleteAssetByIdMutation();
  const { data, isLoading } = useGetAllAssetsQuery();

  useEffect(() => {
    if (data && userData.isAdmin) {
      setAssets(data);
    } else if (data) {
      setAssets(getOnlyAsignedAssets(data, userData.id));
    }
  }, [data, userData.id, userData.isAdmin]);

  const handleDelete = (id: string): void => {
    void updatePost(id).unwrap();
    setAssets((prev) => prev.filter((item) => item.id !== parseInt(id)));
  };

  const assetsData = assets.map((asset) => ({
    key: asset.id,
    id: asset.id,
    name: asset.name,
    model: asset.model,
    status: asset.status,
    healthscore: asset.healthscore,
    sensors: asset.sensors,
  }));

  return (
    <Container>
      {isLoading ? (
        <LoadingWrapper>
          <Spin />
        </LoadingWrapper>
      ) : (
        <>
          {userData.isAdmin && <ActionHeader userData={userData} />}
          <SortingTable
            columns={assetsColumns({
              isAdmin: !!userData.isAdmin,
              handleDelete,
            })}
            pagination={{
              pageSize: 20,
              position: ["bottomCenter"],
              style: { backgroundColor: blue[0], margin: 0, padding: "10px 0" },
              hideOnSinglePage: true,
            }}
            data={assetsData}
            expandable={{
              expandedRowRender: (record) => (
                <AssetDetails assetId={record.id} />
              ),
            }}
          />
        </>
      )}
    </Container>
  );
};

export default AssetsModule;
