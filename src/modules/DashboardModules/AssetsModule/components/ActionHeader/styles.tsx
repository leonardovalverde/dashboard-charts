import { Form } from "antd";
import styled from "styled-components";
import { spacings } from "ui-tokens/spacings";

import { blue } from "@ant-design/colors";

const AdminContainer = styled.div`
  display: flex;
  background-color: ${blue[0]};
  padding: ${spacings.x4}px;
  justify-content: flex-end;
`;

const TaskWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${spacings.x4}px;
`;

const StyledFormItem = styled(Form.Item)`
  width: 70%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacings.x4}px;
`;

export { AdminContainer, ButtonsWrapper, StyledFormItem, TaskWrapper };
