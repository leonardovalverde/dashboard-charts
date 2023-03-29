import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { type IUserState } from "store/slice/userSlice";

import { type ProtectedRouteProps } from "./types";

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const isLogged = useSelector((state: IUserState) => state.user.isLogged);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  return <>{isLogged ? children : <Navigate to="/" />}</>;
};

export default ProtectedRoute;
