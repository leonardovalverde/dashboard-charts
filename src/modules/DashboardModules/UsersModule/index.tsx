import { useEffect, useState } from "react";
import { Spin } from "antd";
import SortingTable from "components/Table/SortingTable/SortingTable";
import Text from "components/Typography/Text";
import { useGetAllUnitsQuery } from "services/units/units";
import { type IUser } from "services/users/types";
import {
  useDeleteUserByIdMutation,
  useGetAllUsersQuery,
} from "services/users/users";

import { blue, red } from "@ant-design/colors";

import { LoadingWrapper } from "../styles";
import { getUsersOfSameCompany } from "../utils/functions";

import ActionHeader from "./components/ActionHeader/ActionHeader";
import { usersColumns } from "./columns";
import { Container } from "./styles";
import { type UsersModuleProps } from "./types";

const UsersModule = ({ userData }: UsersModuleProps): JSX.Element => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [
    updateUser,
    { isLoading: updateUserLoading, isError: updateUsersIsError },
  ] = useDeleteUserByIdMutation();
  const {
    data: dataUsers,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useGetAllUsersQuery();
  const {
    data: dataUnit,
    isLoading: isLoadingUnit,
    isError: isErrorUnit,
  } = useGetAllUnitsQuery();

  useEffect(() => {
    if (dataUsers) {
      setUsers(getUsersOfSameCompany(userData.companyId, dataUsers));
    }
  }, [dataUsers, userData.companyId]);

  const handleDelete = (key: string): void => {
    void updateUser(key)
      .unwrap()
      .then(() => {
        if (!updateUsersIsError) {
          setUsers((prev) => prev.filter((item) => item.id !== parseInt(key)));
        }
      });
  };

  const usersTableData =
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
      {isLoadingUsers || isLoadingUnit ? (
        <LoadingWrapper>
          <Spin />
        </LoadingWrapper>
      ) : (
        <Container>
          {userData.isAdmin && <ActionHeader userData={userData} />}
          <SortingTable
            columns={usersColumns({
              isAdmin: !!userData.isAdmin,
              handleDelete,
              isLoading: updateUserLoading,
            })}
            data={usersTableData}
            pagination={{
              pageSize: 20,
              position: ["bottomCenter"],
              style: { backgroundColor: blue[0], margin: 0, padding: "10px 0" },
              hideOnSinglePage: true,
            }}
          />
          {isErrorUnit && (
            <Text color={red[6]}>
              Não foi possível carregar os dados das unidades
            </Text>
          )}
          {isErrorUsers && (
            <Text color={red[6]}>
              Não foi possível carregar os dados dos usuários
            </Text>
          )}
        </Container>
      )}
    </>
  );
};

export default UsersModule;
