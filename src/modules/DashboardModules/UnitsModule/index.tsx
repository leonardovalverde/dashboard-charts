import { useEffect, useState } from "react";
import { Spin } from "antd";
import SortingTable from "components/Table/SortingTable/SortingTable";
import Text from "components/Typography/Text";
import { type IUnit } from "services/units/types";
import {
  useDeleteUnityByIdMutation,
  useGetAllUnitsQuery,
} from "services/units/units";

import { blue, red } from "@ant-design/colors";

import { LoadingWrapper } from "../styles";

import ActionHeader from "./components/ActionHeader/ActionHeader";
import { unitsColumns } from "./columns";
import { Container } from "./styles";
import { type UnitsModuleProps } from "./type";

const UnitsModule = ({ userData }: UnitsModuleProps): JSX.Element => {
  const [units, setUnits] = useState<IUnit[]>([]);
  const [
    updateUnits,
    { isLoading: updateUnitsLoading, isError: updateUnitsError },
  ] = useDeleteUnityByIdMutation();
  const {
    data: unitsData,
    isLoading: unitsIsLoading,
    isError: unitsIsError,
  } = useGetAllUnitsQuery();

  const handleDelete = (key: string): void => {
    void updateUnits(key)
      .unwrap()
      .then(() => {
        if (!updateUnitsError) {
          setUnits((prev) => prev.filter((item) => item.id !== parseInt(key)));
        }
      });
  };

  const unitsTableData =
    units?.map((unit) => {
      return {
        key: unit.id,
        id: unit.id,
        name: unit.name,
      };
    }) ?? [];

  useEffect(() => {
    if (unitsData) {
      setUnits(unitsData);
    }
  }, [unitsData]);

  return (
    <>
      {unitsIsLoading ? (
        <LoadingWrapper>
          <Spin />
        </LoadingWrapper>
      ) : (
        <Container>
          {userData.isAdmin && <ActionHeader userData={userData} />}
          <SortingTable
            data={unitsTableData}
            columns={unitsColumns({
              isAdmin: !!userData.isAdmin,
              handleDelete,
              isLoading: updateUnitsLoading,
            })}
            pagination={{
              pageSize: 20,
              position: ["bottomCenter"],
              style: { backgroundColor: blue[0], margin: 0, padding: "10px 0" },
              hideOnSinglePage: true,
            }}
          />
          {unitsIsError && (
            <Text color={red[6]}>Não foi possível carregar os dados</Text>
          )}
        </Container>
      )}
    </>
  );
};

export default UnitsModule;
