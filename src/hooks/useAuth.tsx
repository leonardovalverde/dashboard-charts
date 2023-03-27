import { isAxiosError } from "axios";
import { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/users/users";
import { setUser } from "../store/slice/userSlice";
import { IUseAuth } from "./types";
import { IUser } from "services/users/types";
import { getCompanyById } from "services/companies/companies";
import { getUnitById } from "../services/units/units";

const useAuth = (): IUseAuth => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<IUser>({} as IUser);
  const [error, setError] = useState<string>("");

  const signIn = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      const data = await getUsers();
      const user = data.find((user) => user.email === email);
      if (!user) {
        setError("Usuário não encontrado");
      } else {
        setUserData(user);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    dispatch(setUser({ isLogged: false }));
    navigate("/");
  }, [dispatch, navigate]);

  const getUserCompany = useCallback(async (companyId: string | number) => {
    try {
      const company = await getCompanyById(companyId);
      return company;
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.message);
      }
    }
  }, []);

  const getUserUnit = useCallback(
    async (unitId: string | number) => {
      try {
        const unit = await getUnitById(unitId);
        navigate("/dashboard");
        return unit;
      } catch (error) {
        if (isAxiosError(error)) {
          setError(error.message);
        }
      }
    },
    [navigate]
  );

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userData.id) {
        dispatch(
          setUser({
            ...userData,
            isLogged: true,
            company: await getUserCompany(userData.companyId),
            unit: await getUserUnit(userData.unitId),
          })
        );
      }
    };

    fetchUserDetails();
  }, [userData, dispatch, getUserCompany, getUserUnit]);

  return { signIn, error, isLoading, signOut };
};

export default useAuth;
