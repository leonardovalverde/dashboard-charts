import { useGetAllUnitsQuery } from "services/units/units";
import { ColumnsType } from "antd/es/table";
import { Container, LoadingWrapper } from "./styles";
import SortingTable from "components/Table/SortingTable/SortingTable";
import { Spin } from "antd";
import { blue } from '@ant-design/colors';

const UnitsModule = (): JSX.Element => {
  const { data, isLoading, error } = useGetAllUnitsQuery();

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
    }) || [];

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
