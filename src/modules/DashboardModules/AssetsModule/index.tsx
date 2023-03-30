import { useEffect, useState } from "react";
import { Spin } from "antd";
import SortingTable from "components/Table/SortingTable/SortingTable";
import Text from "components/Typography/Text";
import {
  useDeleteAssetByIdMutation,
  useGetAllAssetsQuery,
} from "services/assets/assets";
import { type IAsset } from "services/assets/types";

import { blue, red } from "@ant-design/colors";

import { LoadingWrapper } from "../styles";
import { getOnlyAsignedAssets } from "../utils/functions";

import ActionHeader from "./components/ActionHeader/ActionHeader";
import AssetDetails from "./components/AssetDetails/AssetDetails";
import { assetsColumns } from "./columns";
import { Container } from "./styles";
import { type AssetsModuleProps } from "./types";

const AssetsModule = ({ userData }: AssetsModuleProps): JSX.Element => {
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [
    updateAssets,
    { isError: updateAssetError, isLoading: updateAssetLoading },
  ] = useDeleteAssetByIdMutation();
  const {
    data: assetsData,
    isLoading: assetsIsLoading,
    error: assetsError,
  } = useGetAllAssetsQuery();

  useEffect(() => {
    if (assetsData && userData.isAdmin) {
      setAssets(assetsData);
    } else if (assetsData) {
      setAssets(getOnlyAsignedAssets(assetsData, userData.id));
    }
  }, [assetsData, userData.id, userData.isAdmin]);

  const handleDelete = (id: string): void => {
    void updateAssets(id)
      .unwrap()
      .then(() => {
        if (!updateAssetError) {
          setAssets((prev) => prev.filter((item) => item.id !== parseInt(id)));
        }
      });
  };

  const assetsTableData = assets.map((asset) => ({
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
      {assetsIsLoading ? (
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
              isLoading: updateAssetLoading,
            })}
            pagination={{
              pageSize: 20,
              position: ["bottomCenter"],
              style: { backgroundColor: blue[0], margin: 0, padding: "10px 0" },
              hideOnSinglePage: true,
            }}
            data={assetsTableData}
            expandable={{
              expandedRowRender: (record) => (
                <AssetDetails assetId={record.id} />
              ),
            }}
          />
        </>
      )}
      {assetsError && <Text color={red[6]}>Erro ao buscar ativos</Text>}
    </Container>
  );
};

export default AssetsModule;
