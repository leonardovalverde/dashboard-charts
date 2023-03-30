import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Tooltip } from "antd";
import { type IUnit } from "services/units/types";
import { useGetAllUnitsQuery } from "services/units/units";
import { useCreateUserMutation } from "services/users/users";

import { AdminContainer, ButtonsWrapper } from "./styles";
import { type ActionHeaderProps, type IFormValues } from "./types";

const ActionHeader = ({ userData }: ActionHeaderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [units, setUnits] = useState<IUnit[]>([]);
  const { data: unitData } = useGetAllUnitsQuery();
  const [updatePost] = useCreateUserMutation();
  const [form] = Form.useForm();

  const toggleModal = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleCreateWorkOrder = (values: IFormValues): void => {
    void updatePost({
      name: values.name,
      email: values.email,
      unitId: values.unitId,
      companyId: userData.companyId,
    }).unwrap();
    toggleModal();
    form.resetFields();
  };

  useEffect(() => {
    if (unitData) {
      setUnits(unitData);
    }
  }, [unitData]);

  return (
    <AdminContainer>
      <Button type="primary" onClick={toggleModal}>
        Criar novo usuário
      </Button>
      <Modal
        open={isOpen}
        title="Criar novo usuário"
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
                message: "Por favor, insira o nome do usuário",
              },
            ]}
          >
            <Input placeholder="Nome do usuário" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor, insira o email do usuário",
              },
            ]}
          >
            <Input placeholder="Email do usuário" />
          </Form.Item>
          <Form.Item
            label="Unidade pertencente"
            name="unitId"
            rules={[
              {
                required: true,
                message: "Por favor, selecione a unidade pertencente",
              },
            ]}
          >
            <Select placeholder="Selecione a unidade pertencente">
              {units.map((unit) => (
                <Select.Option key={unit.id} value={unit.id}>
                  {unit.name}
                </Select.Option>
              ))}
            </Select>
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
