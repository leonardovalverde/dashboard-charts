import { useState } from "react";
import { Button, Form, Input, Modal, Select, Tooltip } from "antd";
import { createTaskWithStatus } from "modules/DashboardModules/utils/functions";
import { useCreateWorkOrderMutation } from "services/workOrders/workOrders";
import { spacings } from "ui-tokens/spacings";

import { MinusCircleOutlined } from "@ant-design/icons";

import {
  AdminContainer,
  ButtonsWrapper,
  StyledFormItem,
  TaskWrapper,
} from "./styles";
import { type IFormValues } from "./types";

const ActionHeader = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const [updatePost] = useCreateWorkOrderMutation();
  const [form] = Form.useForm();

  const toggleModal = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleCreateWorkOrder = (values: IFormValues): void => {
    void updatePost({
      title: values.name,
      description: values.description,
      priority: values.priority,
      status: values.status,
      checklist: createTaskWithStatus(values.tasks),
      assetId: values.assetId,
      assignedUserIds: [],
    }).unwrap();
  };

  return (
    <AdminContainer>
      <Button type="primary" onClick={toggleModal}>
        Criar nova ordem de serviço
      </Button>
      <Modal
        open={isOpen}
        title="Criar nova ordem de trabalho"
        okText="Criar"
        footer={null}
        onCancel={toggleModal}
      >
        <Form layout="vertical" form={form} onFinish={handleCreateWorkOrder}>
          <Form.Item
            label="Nome do ativo"
            name="name"
            rules={[
              { required: true, message: "Por favor, insira o nome do ativo" },
            ]}
          >
            <Input placeholder="O ativo que será trabalhado" />
          </Form.Item>
          <Form.Item
            label="ID do ativo"
            name="assetId"
            rules={[
              { required: true, message: "Por favor, insira o ID do ativo" },
            ]}
          >
            <Input placeholder="O ID do ativo que será trabalhado" />
          </Form.Item>
          <Form.Item
            label="Descrição"
            name="description"
            rules={[
              { required: true, message: "Por favor, insira uma descrição" },
            ]}
          >
            <Input placeholder="O que aconteceu" />
          </Form.Item>
          <Form.Item
            label="Prioridade"
            name="priority"
            rules={[
              { required: true, message: "Por favor, selecione a prioridade" },
            ]}
          >
            <Select>
              <Select.Option value="low">Baixa</Select.Option>
              <Select.Option value="medium">Média</Select.Option>
              <Select.Option value="high">Alta</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            help='Caso não selecionado, será criado como "Aberto"'
            style={{ marginBottom: spacings.x10 }}
          >
            <Select>
              <Select.Option value="open">Aberto</Select.Option>
              <Select.Option value="in progress">Em andamento</Select.Option>
              <Select.Option value="completed">Concluído</Select.Option>
            </Select>
          </Form.Item>
          <Form.List
            name="tasks"
            rules={[
              {
                validator: async (_, tasks) => {
                  if (!tasks || tasks.length < 1) {
                    return await Promise.reject(
                      new Error("Por favor, insira ao menos uma tarefa")
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <TaskWrapper key={key}>
                    <StyledFormItem
                      {...restField}
                      label="Nova tarefa"
                      name={[name, "task"]}
                      rules={[
                        {
                          required: true,
                          message: "Por favor, insira a descrição da tarefa",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Insira a descrição da tarefa"
                        style={{ width: "100%" }}
                      />
                    </StyledFormItem>
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(name);
                      }}
                    />
                  </TaskWrapper>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                  >
                    Adicionar tarefa
                  </Button>
                </Form.Item>
                <Form.ErrorList errors={errors} />
              </>
            )}
          </Form.List>
          <ButtonsWrapper>
            <Button onClick={toggleModal}>Cancelar</Button>
            <Tooltip title="A request é enviada mas não reflete na tabela, como a fake api não reflete mudanças entre as chamadas poderia ocasionar bugs ao clicar para ver mais detalhes da tarefa">
              <Button type="primary" htmlType="submit">
                Criar
              </Button>
            </Tooltip>
          </ButtonsWrapper>
        </Form>
      </Modal>
    </AdminContainer>
  );
};

export default ActionHeader;
