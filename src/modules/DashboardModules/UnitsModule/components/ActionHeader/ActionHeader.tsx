import { useState } from "react";
import { Button, Form, Input, Modal, Tooltip } from "antd";
import { useCreateUnitMutation } from "services/units/units";

import { AdminContainer, ButtonsWrapper } from "./styles";
import { type ActionHeaderProps, type IFormValues } from "./types";

const ActionHeader = ({ userData }: ActionHeaderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatePost] = useCreateUnitMutation();
  const [form] = Form.useForm();

  const toggleModal = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleCreateWorkOrder = (values: IFormValues): void => {
    void updatePost({
      name: values.name,
      companyId: userData.companyId,
    }).unwrap();
    toggleModal();
    form.resetFields();
  };

  return (
    <AdminContainer>
      <Button type="primary" onClick={toggleModal}>
        Criar novo ativo
      </Button>
      <Modal
        open={isOpen}
        title="Criar nova unidade"
        okText="Criar"
        footer={null}
        onCancel={toggleModal}
      >
        <Form layout="vertical" form={form} onFinish={handleCreateWorkOrder}>
          <Form.Item
            label="Nome"
            name="name"
            rules={[
              {
                required: true,
                message: "Por favor, insira o nome da unidade",
              },
            ]}
          >
            <Input placeholder="Nome da unidade" />
          </Form.Item>
          <ButtonsWrapper>
            <Button onClick={toggleModal}>Cancelar</Button>
            <Tooltip title="A request é enviada mas não reflete na tabela, pois informações como ID normalmente são gerados pelo back-end">
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
