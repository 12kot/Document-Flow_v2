//Перенести email setEmail pass setPass в форм? FormContainer

import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RegisterPage from "./RegisterPage";
import registration from "../../../API/registration";
import { changeRepeatPass, } from "../../../store/slices/authSlice";
import { setUser } from "../../../store/slices/userSlice";
import loginUser from "../../../functions/loginUser";
import setUserOnDB from "../../../API/setUserToDB";

const RegisterPageContainer = () => {
  const dispatch = useDispatch();
  const { email, password, repeatPassword } = useSelector((state) => state.auth);

  const setRepeatPass = (text) => {
    dispatch(changeRepeatPass({ text }));
  };

  const handleRegister = () => {
    alert("Загружаем данные с сервера");

    registration(email, password, repeatPassword)
      .then(async (user) => {
        let us = {
          email: user.user.email,
          uid: user.user.uid,
          accessToken: user.user.accessToken,
          files: [{path: "INITIALIZE_FILE", name: "Check me"}],
        }

        await setUserOnDB(us);
        
        dispatch(setUser({ ...us }));

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
