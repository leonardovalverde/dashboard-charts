import { useCallback, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "services/users/users";

import { setUser } from "../store/slice/userSlice";

import { type IUseAuth } from "./types";

const useAuth = (): IUseAuth => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string>("");
  const {
    data: dataUser,
    isLoading: isLoadingUser,
    isError: isErrorData,
  } = useGetAllUsersQuery();

  const signIn = useCallback(
    async (email: string) => {
      if (dataUser != null) {
        setError("");
        const user = dataUser.find((user) => user.email === email);
        if (user != null) {
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
      } else if (isErrorData) {
        setError(
          "Erro ao buscar usuários, por favor tente novamente mais tarde"
        );
      }
    },
    [dataUser, dispatch, navigate]
  );

  const signOut = useCallback(() => {
    dispatch(setUser({ isLogged: false }));
    navigate("/");
  }, [dispatch, navigate]);

  return { signIn, error, isLoading: isLoadingUser, signOut };
};

export default useAuth;
