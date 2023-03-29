import SortingTable from "components/Table/SortingTable/SortingTable";
import { useEffect, useState } from "react";
import { Container, LoadingWrapper } from "./styles";
import { IAsset } from "services/assets/types";
import { useGetAllAssetsQuery } from "services/assets/assets";
import { getColorByScore, getOnlyAsignedAssets } from "../utils/functions";
import { AssetsModuleProps } from "./types";
import { Spin, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { StatusTranslate } from "../HomeModule/constants";
import { getColorByStatus } from "modules/DashboardModules/utils/functions";
import AssetDetails from "./components/AssetDetails/AssetDetails";
import { blue } from "@ant-design/colors";

const AssetsModule = ({ userData }: AssetsModuleProps): JSX.Element => {
  const [assets, setAssets] = useState<IAsset[]>([]);

  const { data, isLoading, error } = useGetAllAssetsQuery();

  useEffect(() => {
    if (data && userData.isAdmin) {
      setAssets(data);
    } else if (data) {
      setAssets(getOnlyAsignedAssets(data, userData.id));
    }
  }, [data, userData.id, userData.isAdmin]);

  const columns: ColumnsType<any> = [
    {
      title: "id",
      dataIndex: "id",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Nome",
      dataIndex: "name",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.name.toString().localeCompare(b.name.toString()),
    },
    {
      title: "Modelo",
      dataIndex: "model",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.model.toString().localeCompare(b.model.toString()),
    },
    {
      title: "Status",
      dataIndex: "status",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.status.toString().localeCompare(b.status.toString()),
      render: (status: string) => {
        return (
          <Tag color={getColorByStatus(status)}>
            <strong>{StatusTranslate[status]}</strong>
          </Tag>
        );
      },
    },
    {
      title: "Saúde",
      dataIndex: "healthscore",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.healthscore - b.healthscore,
      render: (healthscore: number) => {
        return (
          <Tag color={getColorByScore(healthscore)}>
            <strong>{healthscore}/100</strong>
          </Tag>
        );
      },
    },
    {
      title: "Sensores",
      dataIndex: "sensors",
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        a.sensors.toString().localeCompare(b.sensors.toString()),
    },
  ];

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
        <SortingTable
          columns={columns}
          pagination={{
            pageSize: 20,
            position: ["topCenter"],
            style: { backgroundColor: blue[0], margin: 0, padding: "10px 0" },
          }}
          data={assetsData}
          expandable={{
            expandedRowRender: (record) => <AssetDetails assetId={record.id} />,
          }}
        />
      )}
    </Container>
  );
};

export default AssetsModule;
