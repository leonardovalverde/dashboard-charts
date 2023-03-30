import { Button, Tag } from "antd";
import { type ColumnsType } from "antd/es/table";

import { translatedPriority, translatedStatus } from "../constants";
import { getColorByPriority, getColorByProgress } from "../utils/functions";

interface IWorkOrdersColumns {
  isAdmin: boolean;
  handleDelete: (id: string) => void;
}

const workOrdersColumns = ({
  isAdmin,
  handleDelete,
}: IWorkOrdersColumns): ColumnsType<any> => [
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
    title: "prioridade",
    dataIndex: "priority",
    defaultSortOrder: "descend",
    sorter: (a, b) =>
      a.priority.toString().localeCompare(b.priority.toString()),
    render: (priority: string) => {
      return (
        <Tag color={getColorByPriority(priority)}>
          {translatedPriority[priority]}
        </Tag>
      );
    },
  },
  {
    title: "status",
    dataIndex: "status",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.status.toString().localeCompare(b.status.toString()),
    render: (status: string) => {
      return (
        <Tag color={getColorByProgress(status)}>
          <strong>{translatedStatus[status]}</strong>
        </Tag>
      );
    },
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

export { workOrdersColumns };
