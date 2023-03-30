import { useEffect, useState } from "react";
import { Spin } from "antd";
import SortingTable from "components/Table/SortingTable/SortingTable";
import Text from "components/Typography/Text";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import { type IWorkOrder } from "services/workOrders/types";
import {
  useDeleteWorkOrderByIdMutation,
  useGetAllWorkOrdersQuery,
} from "services/workOrders/workOrders";
import {
  type IWorkOrderState,
  setWorkOrders,
} from "store/slice/workOrdersSlice";

import { blue, red } from "@ant-design/colors";

import { LoadingWrapper } from "../styles";
import { getWorkOrdersByAssignedUserId } from "../utils/functions";

import ActionHeader from "./components/ActionHeader/ActionHeader";
import WorkOrderDetails from "./components/WorkOrderDetails/WorkOrderDetails";
import { columns } from "./columns";
import { Container } from "./styles";
import { type WorkOrdersModuleProps } from "./types";

const WorkOrdersModule = ({ userData }: WorkOrdersModuleProps): JSX.Element => {
  const [tableData, setTableData] = useState<IWorkOrder[]>([]);
  const [updatePost] = useDeleteWorkOrderByIdMutation();
  const {
    data: workOrdersData,
    isLoading: workOrdersIsLoading,
    error: workOrdersError,
  } = useGetAllWorkOrdersQuery();
  const workOrdersState = useSelector(
    (state: IWorkOrderState) => state.workOrders
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWorkOrders(workOrdersData));
  }, [workOrdersData, dispatch]);

  useEffect(() => {
    if (workOrdersState && userData.isAdmin) {
      setTableData(workOrdersState);
    } else if (workOrdersState) {
      setTableData(getWorkOrdersByAssignedUserId(userData.id, workOrdersState));
    }
  }, [workOrdersData, userData.id, userData.isAdmin, workOrdersState]);

  const handleDelete = (id: string): void => {
    void updatePost(id).unwrap();
    setTableData((prev) => prev.filter((item) => item.id !== parseInt(id)));
  };

  const workOrdersTableData =
    tableData.map((workOrder) => {
      return {
        key: workOrder.id,
        id: workOrder.id,
        name: workOrder.title,
        priority: workOrder.priority,
        status: workOrder.status,
      };
    }) || [];

  return (
    <>
      {workOrdersIsLoading ? (
        <LoadingWrapper>
          <Spin />
        </LoadingWrapper>
      ) : (
        <Container>
          {userData.isAdmin && <ActionHeader />}
          <SortingTable
            data={workOrdersTableData}
            columns={columns({ isAdmin: !!userData.isAdmin, handleDelete })}
            pagination={{
              pageSize: 20,
              position: ["bottomCenter"],
              style: { backgroundColor: blue[0], margin: 0, padding: "10px 0" },
              hideOnSinglePage: true,
            }}
            expandable={{
              expandedRowRender: (record) => (
                <WorkOrderDetails workOrderId={record.id} userData={userData} />
              ),
            }}
          />
          {workOrdersError && (
            <Text color={red[6]}>Não foi possível carregar os dados</Text>
          )}
        </Container>
      )}
    </>
  );
};

export default WorkOrdersModule;
