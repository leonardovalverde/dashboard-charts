import { useEffect,useState } from "react";
import { Button, Checkbox, Descriptions, Form, Spin } from "antd";
import { createCheckListArray } from "modules/DashboardModules/utils/functions";
import { type IChecklist } from "services/workOrders/types";
import {
  useGetWorkOrderByIdQuery,
  useUpdateWorkOrderChecklistByIdMutation,
} from "services/workOrders/workOrders";

import { OptionWrapper } from "./styles";
import { type WorkOrderDetailsProps } from "./types";

const WorkOrderDetails = ({
  workOrderId,
  userData,
}: WorkOrderDetailsProps): JSX.Element => {
  const [checklist, setChecklist] = useState<IChecklist[]>([]);
  const { data } = useGetWorkOrderByIdQuery(workOrderId);
  const [updatePost, { isLoading: isUpdating }] =
    useUpdateWorkOrderChecklistByIdMutation();
  const [isDiabled, setIsDisabled] = useState(true);

  const handleChange = (): void => {
    setIsDisabled(false);
  };

  const onFinish = (values: Record<string, boolean>): void => {
    void updatePost({
      id: workOrderId,
      checklist: createCheckListArray(values),
    }).unwrap();
  };

  const handleDeleteTask = (task: IChecklist, taskName: string): void => {
    const newChecklist =
      data?.checklist.filter((item) => item.task !== task.task) ?? [];
    void updatePost({
      id: workOrderId,
      checklist: newChecklist,
    }).unwrap();
    setChecklist((prev) => prev.filter((item) => item.task !== taskName));
  };

  useEffect(() => {
    if (data) {
      setChecklist(data.checklist);
    }
  }, [data]);

  return (
    <Descriptions title={data?.title} bordered>
      <Descriptions.Item label="Descrição:" span={3}>
        {data?.description}
      </Descriptions.Item>
      <Descriptions.Item label="Tarefas:" span={3}>
        <Form onFinish={onFinish}>
          {checklist.map((task) => (
            <OptionWrapper key={task.task}>
              {userData.isAdmin && (
                <Form.Item>
                  {isUpdating ? (
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
              <Form.Item
                valuePropName="checked"
                name={task.task}
                label={task.task}
                initialValue={task.completed}
              >
                <Checkbox onChange={handleChange} />
              </Form.Item>
            </OptionWrapper>
          ))}
          {isUpdating ? (
            <Spin />
          ) : (
            <Button type="primary" htmlType="submit" disabled={isDiabled}>
              Salvar
            </Button>
          )}
        </Form>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default WorkOrderDetails;
