import { useEffect, useState } from "react";
import { Button, Checkbox, Descriptions, Form, Spin } from "antd";
import Text from "components/Typography/Text";
import { createCheckListArray } from "modules/DashboardModules/utils/functions";
import { type IChecklist } from "services/workOrders/types";
import {
  useGetWorkOrderByIdQuery,
  useUpdateWorkOrderChecklistByIdMutation,
} from "services/workOrders/workOrders";

import { red } from "@ant-design/colors";

import { OptionWrapper } from "./styles";
import { type WorkOrderDetailsProps } from "./types";

const WorkOrderDetails = ({
  workOrderId,
  userData,
}: WorkOrderDetailsProps): JSX.Element => {
  const [checklist, setChecklist] = useState<IChecklist[]>([]);
  const {
    data: workOrderdata,
    isLoading: workOrderLoading,
    isError: workOrderError,
  } = useGetWorkOrderByIdQuery(workOrderId);
  const [
    updateWorkOrder,
    { isLoading: updateWorkOrderLoading, isError: updateWorkOrderError },
  ] = useUpdateWorkOrderChecklistByIdMutation();
  const [isDiabled, setIsDisabled] = useState(true);

  const handleChange = (): void => {
    setIsDisabled(false);
  };

  const onFinish = (values: Record<string, boolean>): void => {
    void updateWorkOrder({
      id: workOrderId,
      checklist: createCheckListArray(values),
    }).unwrap();
  };

  const handleDeleteTask = (task: IChecklist, taskName: string): void => {
    const newChecklist =
      workOrderdata?.checklist.filter((item) => item.task !== task.task) ?? [];
    void updateWorkOrder({
      id: workOrderId,
      checklist: newChecklist,
    })
      .unwrap()
      .then(() => {
        if (!updateWorkOrderError) {
          setChecklist((prev) => prev.filter((item) => item.task !== taskName));
        }
      });
  };

  useEffect(() => {
    if (workOrderdata) {
      setChecklist(workOrderdata.checklist);
    }
  }, [workOrderdata]);

  return (
    <>
      {workOrderLoading ? (
        <Spin />
      ) : (
        <Descriptions title={workOrderdata?.title} bordered column={3}>
          <Descriptions.Item label="Descrição:" span={3}>
            {workOrderdata?.description}
          </Descriptions.Item>
          <Descriptions.Item label="Tarefas:" span={3}>
            <Form onFinish={onFinish}>
              {checklist.map((task) => (
                <OptionWrapper key={task.task}>
                  {userData.isAdmin && (
                    <Form.Item>
                      {updateWorkOrderLoading ? (
                        <Spin />
                      ) : (
                        <Button
                          type="primary"
                          danger
                          htmlType="button"
                          onClick={() => {
                            handleDeleteTask(task, task.task);
                          }}
                        >
                          Deletar
                        </Button>
                      )}
                    </Form.Item>
                  )}
                  <Text>{task.task}: </Text>
                  <Form.Item
                    valuePropName="checked"
                    name={task.task}
                    initialValue={task.completed}
                    noStyle
                  >
                    <Checkbox onChange={handleChange} />
                  </Form.Item>
                </OptionWrapper>
              ))}
              {updateWorkOrderLoading ? (
                <Spin />
              ) : (
                <Button type="primary" htmlType="submit" disabled={isDiabled}>
                  Salvar
                </Button>
              )}
            </Form>
          </Descriptions.Item>
        </Descriptions>
      )}
      {workOrderError && <Text color={red[6]}>Erro ao carregar</Text>}
    </>
  );
};

export default WorkOrderDetails;
