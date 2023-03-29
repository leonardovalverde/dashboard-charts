import {
  useGetWorkOrderByIdQuery,
  useUpdateWorkOrderChecklistByIdMutation,
} from "services/workOrders/workOrders";
import { WorkOrderDetailsProps } from "./types";
import { Button, Checkbox, Descriptions, Form, Spin } from "antd";
import { useState, useEffect } from "react";
import { createCheckListArray } from "modules/DashboardModules/utils/functions";
import { OptionWrapper } from "./styles";
import { IChecklist } from "services/workOrders/types";

const WorkOrderDetails = ({ workOrderId, userData }: WorkOrderDetailsProps) => {
  const [checklist, setChecklist] = useState<IChecklist[]>([]);
  const { data, isLoading, error } = useGetWorkOrderByIdQuery(workOrderId);
  const [updatePost, { isLoading: isUpdating }] =
    useUpdateWorkOrderChecklistByIdMutation();
  const [isDiabled, setIsDisabled] = useState(true);

  const handleChange = () => {
    setIsDisabled(false);
  };

  const onFinish = (values: { [key: string]: boolean }) => {
    updatePost({
      id: workOrderId,
      checklist: createCheckListArray(values),
    }).unwrap();
  };

  const handleDeleteTask = (task: IChecklist, taskName: string) => {
    const newChecklist =
      data?.checklist.filter((item) => item.task !== task.task) || [];
    updatePost({
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
                      onClick={() => handleDeleteTask(task, task.task)}
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
