import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import login from "../../../API/Auth/login";
import { setUser } from "../../../store/slices/userSlice";
import getUserData from "../../../API/DB/getUserData";
import HandleMessage from "../../../functions/HandleMessage";

const LoginPageContainer = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
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

  return (
    <div>
      <LoginPage handleLogin={handleLogin} isLoading={isLoading} />
    </div>
  );
};

export default LoginPageContainer;
