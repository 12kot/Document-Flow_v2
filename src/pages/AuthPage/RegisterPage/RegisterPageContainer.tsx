import React, { ReactElement, useState } from "react";
import { Navigate } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import registration from "../../../API/Auth/registration";
import { changeRepeatPass } from "../../../store/slices/authSlice";
import { setUser } from "../../../store/slices/userSlice";
import createUser from "../../../API/DB/User/createUserOnDB";
import HandleMessage from "../../../functions/HandleMessage";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { User } from "../../../Types/Types";

const RegisterPageContainer = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { email, password, repeatPassword } = useAppSelector(
    (state) => state.auth
  );

  const [isLoading, setIsLoading] = useState(false);

  const setRepeatPass = (text: string): void => {
    dispatch(changeRepeatPass({ text }));
  };

  const handleRegister = async (): Promise<void> => {
    setIsLoading(true);

    await registration(email, password, repeatPassword)
      .then(async (user) => {
        let userData: User = {
          email: user.user.email,
          uid: user.user.uid,
          token: user.user.accessToken,
          folders: [],
          files: [],
          isLoggedIn: true
        };
        
        await createUser(userData);
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
