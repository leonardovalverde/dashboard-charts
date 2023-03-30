import { useEffect, useState } from "react";
import { Spin } from "antd";
import SortingTable from "components/Table/SortingTable/SortingTable";
import { type IUnit } from "services/units/types";
import {
  useDeleteUnityByIdMutation,
  useGetAllUnitsQuery,
} from "services/units/units";

import { blue } from "@ant-design/colors";

import { LoadingWrapper } from "../styles";

import ActionHeader from "./components/ActionHeader/ActionHeader";
import { unitsColumns } from "./columns";
import { Container } from "./styles";
import { type UnitsModuleProps } from "./type";

const UnitsModule = ({ userData }: UnitsModuleProps): JSX.Element => {
  const [units, setUnits] = useState<IUnit[]>([]);
  const [updatePost] = useDeleteUnityByIdMutation();
  const { data, isLoading } = useGetAllUnitsQuery();

  const handleDelete = (key: string): void => {
    void updatePost(key).unwrap();
    setUnits((prev) => prev.filter((item) => item.id !== parseInt(key)));
  };

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
            columns={unitsColumns({
              isAdmin: !!userData.isAdmin,
              handleDelete,
            })}
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
