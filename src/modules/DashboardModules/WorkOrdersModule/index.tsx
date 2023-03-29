import { useEffect, useState } from "react";
import { Button, Spin, Tag } from "antd";
import { type ColumnsType } from "antd/es/table";
import SortingTable from "components/Table/SortingTable/SortingTable";
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

import { blue } from "@ant-design/colors";

import { translatedPriority, translatedStatus } from "../constants";
import {
  getColorByPriority,
  getColorByProgress,
  getWorkOrdersByAssignedUserId,
} from "../utils/functions";

import ActionHeader from "./components/ActionHeader/ActionHeader";
import WorkOrderDetails from "./components/WorkOrderDetails/WorkOrderDetails";
import { Container, LoadingWrapper } from "./styles";
import { type WorkOrdersModuleProps } from "./types";

const WorkOrdersModule = ({ userData }: WorkOrdersModuleProps): JSX.Element => {
  const [tableData, setTableData] = useState<IWorkOrder[]>([]);
  const [updatePost] = useDeleteWorkOrderByIdMutation();
  const { data, isLoading } = useGetAllWorkOrdersQuery();
  const workOrdersState = useSelector(
    (state: IWorkOrderState) => state.workOrders
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWorkOrders(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (workOrdersState && userData.isAdmin) {
      setTableData(workOrdersState);
    } else if (workOrdersState) {
      setTableData(getWorkOrdersByAssignedUserId(userData.id, workOrdersState));
    }
  }, [data, userData.id, userData.isAdmin, workOrdersState]);

  const handleDelete = (id: string): void => {
    void updatePost(id).unwrap();
    setTableData((prev) => prev.filter((item) => item.id !== parseInt(id)));
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
      title: "prioridade",
      dataIndex: "priority",
      defaultSortOrder: "descend",
      sorter: (a, b) =>
        a.priority.toString().localeCompare(b.priority.toString()),
      render: (priority: string) => {
        return (
          <Tag color={getColorByPriority(priority)}>
            {translatedPriority[priority]}
          </Tag>
        );
      },
    },
    {
      title: "status",
      dataIndex: "status",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.status.toString().localeCompare(b.status.toString()),
      render: (status: string) => {
        return (
          <Tag color={getColorByProgress(status)}>
            <strong>{translatedStatus[status]}</strong>
          </Tag>
        );
      },
    },
    {
      title: "Ações",
      dataIndex: "actions",
      className: userData.isAdmin ? "" : "hidden",
      render: (_, record: { id: string }) => (
        <Button
          type="primary"
          danger
          onClick={() => {
            handleDelete(record.id);
          }}
        >
          Deletar
        </Button>
      ),
    },
  ];

  const workOrdersData =
    tableData.map((workOrder) => {
      return {
        key: workOrder.assetId,
        id: workOrder.id,
        name: workOrder.title,
        priority: workOrder.priority,
        status: workOrder.status,
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
          {userData.isAdmin && <ActionHeader />}
          <SortingTable
            data={workOrdersData}
            columns={columns}
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
        </Container>
      )}
    </>
  );
};

export default WorkOrdersModule;
