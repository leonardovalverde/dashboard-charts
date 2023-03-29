import { Spin } from "antd";
import { type ColumnsType } from "antd/es/table";
import SortingTable from "components/Table/SortingTable/SortingTable";
import { useGetAllUnitsQuery } from "services/units/units";

import { blue } from '@ant-design/colors';

import { Container, LoadingWrapper } from "./styles";

const UnitsModule = (): JSX.Element => {
  const { data, isLoading } = useGetAllUnitsQuery();

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
  ];

  const unitsData =
    data?.map((unit) => {
      return {
        key: unit.id,
        id: unit.id,
        name: unit.name,
      };
    }) ?? [];

  return (
    <>
      {isLoading ? (
        <LoadingWrapper>
          <Spin />
        </LoadingWrapper>
      ) : (
        <Container>
          <SortingTable
            data={unitsData}
            columns={columns}
            pagination={{ pageSize: 20, position: ["topCenter"], style: {backgroundColor: blue[0], margin: 0, padding: "10px 0"} }}
          />
        </Container>
      )}
    </>
  );
};

export default UnitsModule;
