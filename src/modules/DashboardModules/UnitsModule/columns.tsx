import { Button } from "antd";
import { type ColumnsType } from "antd/es/table";

interface IUnitsColumns {
  isAdmin: boolean;
  handleDelete: (id: string) => void;
}

const unitsColumns = ({
  isAdmin,
  handleDelete,
}: IUnitsColumns): ColumnsType<any> => [
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
    title: "Ações",
    dataIndex: "actions",
    className: isAdmin ? "" : "hidden",
    render: (_, record: { key: string }) => (
      <Button
        type="primary"
        danger
        onClick={() => {
          handleDelete(record.key);
        }}
      >
        Deletar
      </Button>
    ),
  },
];

export { unitsColumns };
