import { useSelector } from "react-redux";
import { Container, Footer } from "./styles";
import { Typography } from "antd";
import LoginForm from "./components/LoginForm/LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUserState } from "../../store/slice/userSlice";

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
