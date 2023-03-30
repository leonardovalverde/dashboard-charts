import { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import { type ColumnsType } from "antd/es/table";
import SortingTable from "components/Table/SortingTable/SortingTable";
import { useGetAllUnitsQuery } from "services/units/units";
import { type IUser } from "services/users/types";
import {
  useDeleteUserByIdMutation,
  useGetAllUsersQuery,
} from "services/users/users";

import { blue } from "@ant-design/colors";

import { getUsersOfSameCompany } from "../utils/functions";

import ActionHeader from "./components/ActionHeader/ActionHeader";
import { Container, LoadingWrapper } from "./styles";
import { type UsersModuleProps } from "./types";

const UsersModule = ({ userData }: UsersModuleProps): JSX.Element => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [updatePost] = useDeleteUserByIdMutation();
  const { data, isLoading } = useGetAllUsersQuery();
  const { data: dataUnit, isLoading: isLoadingUnit } = useGetAllUnitsQuery();

  useEffect(() => {
    if (data) {
      setUsers(getUsersOfSameCompany(userData.companyId, data));
    }
  }, [data, userData.companyId]);

  const handleDelete = (key: string): void => {
    void updatePost(key).unwrap();
    setUsers((prev) => prev.filter((item) => item.id !== parseInt(key)));
  };

  const columns: ColumnsType<any> = [
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
      className: userData.isAdmin ? "" : "hidden",
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

  const usersData =
    users.map((user) => {
      return {
        key: user.id,
        name: user.name,
        email: user.email,
        unit: dataUnit?.find((unit) => unit.id === user.unitId)?.name,
      };
    }) || [];

  return (
    <>
      {isLoading || isLoadingUnit ? (
        <LoadingWrapper>
          <Spin />
        </LoadingWrapper>
      ) : (
        <Container>
          {userData.isAdmin && <ActionHeader userData={userData} />}
          <SortingTable
            columns={columns}
            data={usersData}
            pagination={{
              pageSize: 20,
              position: ["bottomCenter"],
              style: { backgroundColor: blue[0], margin: 0, padding: "10px 0" },
              hideOnSinglePage: true,
            }}
          />
        </Container>
      )}
    </>
  );
};

export default UsersModule;
