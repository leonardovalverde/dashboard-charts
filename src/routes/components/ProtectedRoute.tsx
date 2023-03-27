import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { IUserState } from "store/slice/userSlice";
import { ProtectedRouteProps } from "./types";

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
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
