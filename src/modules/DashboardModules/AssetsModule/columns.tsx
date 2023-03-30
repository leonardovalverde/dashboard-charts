import { Button, Tag } from "antd";
import { type ColumnsType } from "antd/es/table";
import {
  getColorByScore,
  getColorByStatus,
} from "modules/DashboardModules/utils/functions";

import { StatusTranslate } from "../HomeModule/constants";

interface IAssetsColumns {
  isAdmin: boolean;
  handleDelete: (id: string) => void;
}

const assetsColumns = ({
  isAdmin,
  handleDelete,
}: IAssetsColumns): ColumnsType<any> => [
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
    sorter: (a, b) => a.sensors.toString().localeCompare(b.sensors.toString()),
  },
  {
    title: "Ações",
    dataIndex: "actions",
    className: isAdmin ? "" : "hidden",
    render: (_, record: { id: string }) => (
      <Button
        type="primary"
        danger
        onClick={() => {
          handleDelete(record.id);
        }}
      >
        Deletar
      </Button>
    ),
  },
];

export { assetsColumns };
