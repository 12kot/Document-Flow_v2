import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import login from "../../../API/Auth/login";
import { setUser } from "../../../store/slices/userSlice";
import getUserData from "../../../API/DB/User/getUserData";
import HandleMessage from "../../../functions/HandleMessage";
import forgot from "../../../API/Auth/forgot";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

const LoginPageContainer = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { email, password } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (): Promise<void> => {
    setIsLoading(true);

    await login(email, password)
      .then(async (user) => {
        let userData = await getUserData(user.user.email);

        dispatch(setUser({ ...userData }));

        setIsLoading(false);
        HandleMessage("Вы успешно авторизовались", "success");
        return <Navigate to="/disk" />;
      })
      .catch((error) => {
        HandleMessage(error, "error");
        setIsLoading(false);
      });
  };

  const handleForgot = async (setActive: Dispatch<SetStateAction<boolean>>): Promise<void> => {
    await forgot(email);
    setActive(false);
  }
  
  return (
    <div>
      <LoginPage handleLogin={handleLogin} handleForgot={handleForgot} isLoading={isLoading} />
    </div>
  );
};

export default LoginPageContainer;
