import { Button } from "antd";
import { type ColumnsType } from "antd/es/table";

interface IUsersColumns {
  isAdmin: boolean;
  handleDelete: (id: string) => void;
}

const usersColumns = ({
  isAdmin,
  handleDelete,
}: IUsersColumns): ColumnsType<any> => [
  {
    title: "Nome",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.toString().localeCompare(b.name.toString()),
  },
  {
    title: "Email",
    dataIndex: "email",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.email.toString().localeCompare(b.email.toString()),
  },
  {
    title: "Unidade",
    dataIndex: "unit",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.unit.toString().localeCompare(b.unit.toString()),
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

export { usersColumns };
