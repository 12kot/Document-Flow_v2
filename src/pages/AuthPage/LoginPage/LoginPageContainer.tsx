import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import LoginPage from "./LoginPage";
import login from "../../../API/Auth/login";
import { setUser } from "../../../store/slices/userSlice";
import forgot from "../../../API/Auth/forgot";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

const LoginPageContainer = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { email, password } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (): Promise<void> => {
    setIsLoading(true);

    let userData = await login(email, password);
    dispatch(setUser({ ...userData }));

    setIsLoading(false);
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
