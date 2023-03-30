import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Select, Tooltip } from "antd";
import { useCreateAssetMutation } from "services/assets/assets";
import { type IUnit } from "services/units/types";
import { useGetAllUnitsQuery } from "services/units/units";
import { type IUser } from "services/users/types";
import { useGetAllUsersQuery } from "services/users/users";

import { MinusCircleOutlined } from "@ant-design/icons";

import {
  AdminContainer,
  ButtonsWrapper,
  StyledFormItem,
  TaskWrapper,
} from "./styles";
import { type ActionHeaderProps, type IFormValues } from "./types";

const ActionHeader = ({ userData }: ActionHeaderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [units, setUnits] = useState<IUnit[]>([]);
  const { data } = useGetAllUsersQuery();
  const { data: unitData } = useGetAllUnitsQuery();
  const [updatePost] = useCreateAssetMutation();
  const [form] = Form.useForm();

  const toggleModal = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleCreateWorkOrder = (values: IFormValues): void => {
    void updatePost({
      assignedUserIds: values.assignedIds.map((id) => parseInt(id)),
      companyId: userData.companyId,
      healthHistory: [],
      healthscore: parseFloat(values.healthscore),
      image: values.image,
      metrics: {
        lastUptimeAt: "",
        totalCollectsUptime: 0,
        totalUptime: 0,
      },
      model: values.model,
      name: values.name,
      sensors: values.sensors,
      specifications: {
        maxTemp: parseInt(values.maxTemperature),
        rpm: parseInt(values.rpm),
        power: parseInt(values.power),
      },
      status: values.status,
      unitId: values.unitId,
    }).unwrap();
  };

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  useEffect(() => {
    if (unitData) {
      setUnits(unitData);
    }
  }, [unitData]);

  return (
    <AdminContainer>
      <Button type="primary" onClick={toggleModal}>
        Criar novo ativo
      </Button>
      <Modal
        open={isOpen}
        title="Criar novo ativo"
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
            <Input placeholder="Nome do novo ativo" />
          </Form.Item>
          <Form.Item
            label="Modelo do ativo"
            name="model"
            rules={[
              {
                required: true,
                message: "Por favor, insira o modelo do ativo",
              },
            ]}
          >
            <Input placeholder="Modelo do novo ativo" />
          </Form.Item>
          <Form.Item
            label="Atribuir responsáveis"
            name="assignedIds"
            rules={[
              {
                required: true,
                message: "Por favor, selecione ao menos um responsável",
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Selecione os responsáveis"
            >
              {users.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.name}
                </Select.Option>
              ))}
            </Select>
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
          <Form.Item
            label="Temperatura máxima"
            name="maxTemperature"
            initialValue="0"
            rules={[
              {
                required: true,
                message: "Por favor, insira a temperatura máxima",
              },
            ]}
          >
            <InputNumber placeholder="Temperatura máxima" min={0} />
          </Form.Item>
          <Form.Item
            label="RPM (Rotações máximas por minuto)"
            name="rpm"
            initialValue="0"
          >
            <InputNumber placeholder="RPM do ativo" min={0} />
          </Form.Item>
          <Form.Item label="Potência" name="power" initialValue="0">
            <InputNumber placeholder="Potência do produto" min={0} />
          </Form.Item>
          <Form.Item
            label="Imagem do ativo"
            name="image"
            rules={[
              { required: true, message: "Por favor, insira o link da imagem" },
            ]}
          >
            <Input placeholder="Link da imagem do ativo" />
          </Form.Item>
          <Form.Item
            label="Saúde do ativo (apenas números)"
            name="healthscore"
            rules={[
              { required: true, message: "Por favor, insira a saúde do ativo" },
            ]}
            initialValue="0"
          >
            <InputNumber<string>
              min="0"
              max="100"
              decimalSeparator=","
              stringMode
            />
          </Form.Item>
          <Form.List
            name="sensors"
            rules={[
              {
                validator: async (_, tasks) => {
                  if (!tasks || tasks.length < 1) {
                    return await Promise.reject(
                      new Error("Por favor, insira ao menos um sensor")
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
                      label="Modelo do sensor"
                      name={[name]}
                      rules={[
                        {
                          required: true,
                          message: "Por favor, insira o modelo do sensor",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Insira  o modelo do sensor"
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
                    Adicionar sensor
                  </Button>
                </Form.Item>
                <Form.ErrorList errors={errors} />
              </>
            )}
          </Form.List>
          <ButtonsWrapper>
            <Button onClick={toggleModal}>Cancelar</Button>
            <Tooltip title="A request é enviada mas não reflete na tabela, como a fake api não reflete mudanças entre as chamadas poderia ocasionar bugs ao clicar para ver mais detalhes">
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
