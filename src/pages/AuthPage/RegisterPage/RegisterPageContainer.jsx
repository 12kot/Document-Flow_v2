//Перенести email setEmail pass setPass в форм? FormContainer

import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RegisterPage from "./RegisterPage";
import registration from "../../../API/registration";
import { changeRepeatPass, } from "../../../store/slices/authSlice";
import { setUser } from "../../../store/slices/userSlice";
import loginUser from "../../../functions/loginUser";

const RegisterPageContainer = () => {
  const dispatch = useDispatch();
  const { email, password, repeatPassword } = useSelector((state) => state.auth);

  const setRepeatPass = (text) => {
    dispatch(changeRepeatPass({ text }));
  };

  const handleRegister = () => {
    registration(email, password, repeatPassword)
      .then(async (user) => {
        
        let userD = await loginUser(user);
        dispatch(setUser({ ...userD }));

        alert("Вы успешно зарегестрировались");
        return <Navigate to="/disk" />;
      })
      .catch(alert);
  };

  return (
    <RegisterPage
      handleRegister={handleRegister}
      repeatPass={repeatPassword}
      setRepeatPass={setRepeatPass}
    />
  );
};

export default RegisterPageContainer;
