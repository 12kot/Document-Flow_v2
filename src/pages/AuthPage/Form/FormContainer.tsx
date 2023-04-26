import React, { Dispatch, ReactElement, SetStateAction } from "react";

import Form from "./Form";
import { changeEmail, changePass } from "../../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

type FormProps = {
  title: string,
  isLoading: boolean,
  isLogin: boolean,

  handleClick: () => Promise<void>,
  handleForgot?: (setActive: Dispatch<SetStateAction<boolean>>) => Promise<void>,

  repeatPass?: string,
  setRepeatPass?: (setPass: string) => void,
}

const FormContainer = (props: FormProps): ReactElement => {
  const dispatch = useAppDispatch();
  const { email, password } = useAppSelector((state) => state.auth);

  const setEmail = (text: string): void => {
    dispatch(changeEmail({ text }));
  };

  const setPass = (text: string): void => {
    dispatch(changePass({ text }));
  };

  return (
    <Form
      title={props.title}
      handleClick={props.handleClick}
      handleForgot={props.handleForgot}
      isLoading={props.isLoading}
          
      email={email}
      setEmail={setEmail}
      pass={password}
      setPass={setPass}
          
      repeatPass={props.repeatPass}
      setRepeatPass={props.setRepeatPass}
      isLogin={props.isLogin}
    />
  );
};

export default FormContainer;
