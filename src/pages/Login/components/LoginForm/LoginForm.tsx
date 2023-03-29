import { useMemo } from "react";
import { Avatar,Button, Input } from "antd";
import Text from "components/Typography/Text";
import useAuth from "hooks/useAuth";

import { ArrowRightOutlined } from "@ant-design/icons";

import {
  Container,
  FormWrapper,
  QuoteWrapper,
  RightAlignedItem,
  StyledForm,
} from "./styles";

const LoginForm = (): JSX.Element => {
  const { signIn, error } = useAuth();

  const onFinish = (values: any): void => {
    void signIn(values.email);
  };

  const shouldShowError = useMemo(() => {
    return error !== "";
  }, [error]);

  return (
    <Container>
      <FormWrapper>
        <StyledForm
          name="login"
          initialValues={{ remember: true }}
          autoComplete="off"
          layout="vertical"
          onFinish={onFinish}
        >
          <StyledForm.Item
            label="Email"
            name="email"
            validateStatus={shouldShowError ? "error" : "success"}
            help={shouldShowError ? error : ""}
            rules={[
              {
                required: true,
                message: "Por favor, digite o email para acessar a aplicação.",
              },
            ]}
          >
            <Input type="email" width={100} />
          </StyledForm.Item>
          <RightAlignedItem>
            <Button type="primary" htmlType="submit">
              Entrar <ArrowRightOutlined />
            </Button>
          </RightAlignedItem>
        </StyledForm>
      </FormWrapper>
      <QuoteWrapper>
        <Text>
          Para testar a aplicação, é necessário que você insira um dos e-mails
          de teste da API. Espero que tenham uma ótima experiência!
        </Text>
        <Avatar src="/assets/leonardo.jpg" size={80} />
        <Text>
          <strong>Leonardo Valverde </strong>– Front-end Software Engineer
        </Text>
      </QuoteWrapper>
    </Container>
  );
};

export default LoginForm;
