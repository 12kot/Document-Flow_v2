import React, { ReactElement, useState } from "react";
import RegisterPage from "./RegisterPage";
import registration from "../../../API/Auth/registration";
import { changeRepeatPass } from "../../../store/slices/authSlice";
import { setUser } from "../../../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

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

    let userData = await registration(email, password, repeatPassword);
    if(userData)
      dispatch(setUser({ ...userData }));

    setIsLoading(false);
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
