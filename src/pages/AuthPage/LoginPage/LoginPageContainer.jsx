//Перенести email setEmail pass setPass в форм? FormContainer

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import login from "../../../API/login";
import { setUser } from "../../../store/slices/userSlice";
import loginUser from "../../../functions/loginUser";

const LoginPageContainer = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.auth);

  const handleLogin = () => {
    login(email, password)
      .then(async (user) => {
      
        let userD = await loginUser(user);
        dispatch(setUser({ ...userD }));

        alert("Вы успешно авторизовались");
        return <Navigate to="/disk" />;
      })
      .catch(alert);
  };

  return (
    <LoginPage
      handleLogin={handleLogin}
    />
  );
};

export default LoginPageContainer;
