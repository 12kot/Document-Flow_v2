import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RegisterPage from "./RegisterPage";
import registration from "../../../API/Auth/registration";
import { changeRepeatPass } from "../../../store/slices/authSlice";
import { setUser } from "../../../store/slices/userSlice";
import createUser from "../../../API/DB/createUserOnDB";
import HandleMessage from "../../../functions/HandleMessage";

const RegisterPageContainer = () => {
  const dispatch = useDispatch();
  const { email, password, repeatPassword } = useSelector(
    (state) => state.auth
  );

  const [isLoading, setIsLoading] = useState(false);

  const setRepeatPass = (text) => {
    dispatch(changeRepeatPass({ text }));
  };

  const handleRegister = async () => {
    setIsLoading(true);

    await registration(email, password, repeatPassword)
      .then(async (user) => {
        let userData = {
          email: user.user.email,
          uid: user.user.uid,
          accessToken: user.user.accessToken,
        };

        await createUser(userData);
        userData.files = [];
        userData.name = undefined;
        dispatch(setUser({ ...userData }));
        
        HandleMessage("Вы успешно зарегистрировались", "success");
        setIsLoading(false);
        return <Navigate to="/disk" />;
      })
      .catch((error) => {
        HandleMessage(error, "error");
        setIsLoading(false);
      });
  };

  return (
    <div>
      <RegisterPage
        handleRegister={handleRegister}
        repeatPass={repeatPassword}
        setRepeatPass={setRepeatPass}
        isLoading={isLoading}
      />
    </div>
  );
};

export default RegisterPageContainer;
