import { useState } from "react";
import { Button, Form, Input, Modal, Tooltip } from "antd";
import Text from "components/Typography/Text";
import {
  AdminContainer,
  ButtonsWrapper,
} from "modules/DashboardModules/styles";
import { useCreateUnitMutation } from "services/units/units";

import { red } from "@ant-design/colors";

import { type ActionHeaderProps, type IFormValues } from "./types";

const ActionHeader = ({ userData }: ActionHeaderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [
    updateUnits,
    { isLoading: updateUnitsLoading, isError: updateUnitsIsError },
  ] = useCreateUnitMutation();
  const [form] = Form.useForm();

  const toggleModal = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleCreateWorkOrder = (values: IFormValues): void => {
    void updateUnits({
      name: values.name,
      companyId: userData.companyId,
    })
      .unwrap()
      .then(() => {
        if (!updateUnitsIsError) {
          toggleModal();
          form.resetFields();
        }
      });
    toggleModal();
    form.resetFields();
  };

  return (
    <AdminContainer>
      <Button type="primary" onClick={toggleModal}>
        Criar nova unidade
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
          {updateUnitsIsError && (
            <Text color={red[6]}>Não foi possível criar a nova unidade</Text>
          )}
          <ButtonsWrapper>
            <Button onClick={toggleModal}>Cancelar</Button>
            <Tooltip title="A request é enviada mas não reflete na tabela, pois informações como ID normalmente são gerados pelo back-end">
              <Button
                type="primary"
                htmlType="submit"
                disabled={updateUnitsLoading}
              >
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
