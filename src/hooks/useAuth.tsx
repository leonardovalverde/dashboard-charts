import {  isAxiosError } from "axios";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/users/users";
import { setUser } from "../store/slice/userSlice";

interface IUseAuth {
  signIn(email: string): Promise<void | string>;
  signOut(): void;
  error: string;
  isLoading: boolean;
}

const useAuth = (): IUseAuth => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const signIn = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      const data = await getUsers();
      const user = data.find((user) => user.email === email);
      if (!user) {
        setError("Usuário não encontrado");
      } else {
        setError("");
        dispatch(setUser({ ...user, isLogged: true }));
        navigate("/dashboard");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, navigate]);

  const signOut = useCallback(() => {
    dispatch(setUser({ isLogged: false }));
    navigate("/");
  }, [dispatch, navigate]);

  return { signIn, error, isLoading, signOut };
};

export default useAuth;
