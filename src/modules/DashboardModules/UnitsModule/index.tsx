import { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import { type ColumnsType } from "antd/es/table";
import SortingTable from "components/Table/SortingTable/SortingTable";
import { type IUnit } from "services/units/types";
import {
  useDeleteUnityByIdMutation,
  useGetAllUnitsQuery,
} from "services/units/units";

import { blue } from "@ant-design/colors";

import ActionHeader from "./components/ActionHeader/ActionHeader";
import { Container, LoadingWrapper } from "./styles";
import { type UnitsModuleProps } from "./type";

const UnitsModule = ({ userData }: UnitsModuleProps): JSX.Element => {
  const [units, setUnits] = useState<IUnit[]>([]);
  const [updatePost] = useDeleteUnityByIdMutation();
  const { data, isLoading } = useGetAllUnitsQuery();

  const handleDelete = (key: string): void => {
    void updatePost(key).unwrap();
    setUnits((prev) => prev.filter((item) => item.id !== parseInt(key)));
  };

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

  const unitsData =
    units?.map((unit) => {
      return {
        key: unit.id,
        id: unit.id,
        name: unit.name,
      };
    }) ?? [];

  useEffect(() => {
    if (data) {
      setUnits(data);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <LoadingWrapper>
          <Spin />
        </LoadingWrapper>
      ) : (
        <Container>
          {userData.isAdmin && <ActionHeader userData={userData} />}
          <SortingTable
            data={unitsData}
            columns={columns}
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

export default UnitsModule;
