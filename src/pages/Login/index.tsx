import { useEffect } from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type IUserState } from "store/slice/userSlice";

import LoginForm from "./components/LoginForm/LoginForm";
import { Container, Footer } from "./styles";

const { Text } = Typography;

const Login = (): JSX.Element => {
  const isLogged = useSelector((state: IUserState) => state.user.isLogged);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/dashboard");
    }
  }, [isLogged, navigate]);

  return (
    <Container>
      <LoginForm />
      <Footer>
        <Text>2023 - Belo Horizonte</Text>
      </Footer>
    </Container>
  );
};

export default Login;
