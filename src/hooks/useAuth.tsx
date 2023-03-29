import { useCallback, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/slice/userSlice";
import { IUseAuth } from "./types";
import { useGetAllUsersQuery } from "services/users/users";

const useAuth = (): IUseAuth => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string>("");
  const { data, isLoading } = useGetAllUsersQuery();

  const signIn = useCallback(
    async (email: string) => {
      if (data) {
        setError("");
        const user = data.find((user) => user.email === email);
        if (user) {
          setError("");
          dispatch(
            setUser({
              ...user,
              isLogged: true,
            })
          );
          navigate("/dashboard");
        } else {
          setError("Usuário não encontrado");
        }
      } else {
        setError(
          "Erro ao buscar usuários, por favor tente novamente mais tarde"
        );
      }
    },
    [data, dispatch, navigate]
  );

  const signOut = useCallback(() => {
    dispatch(setUser({ isLogged: false }));
    navigate("/");
  }, [dispatch, navigate]);

  return { signIn, error, isLoading, signOut };
};

export default useAuth;
