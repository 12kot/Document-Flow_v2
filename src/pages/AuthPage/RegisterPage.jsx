import React from "react";
import Form from "./Form/Form";
import { useDispatch, useSelector } from "react-redux";
import registration from "../../hooks/registration";
import { changeEmail, changePass, changeRepeatPass } from "../../store/slices/authSlice";
import { setUser } from "../../store/slices/userSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const pass = useSelector((state) => state.auth.password);
  const repeatPass = useSelector((state) => state.auth.repeatPassword);

  const setEmail = (text) => {
    dispatch(changeEmail({ text }));
  };

  const setPass = (text) => {
    dispatch(changePass({ text }));
  };

  const setRepeatPass = (text) => {
    dispatch(changeRepeatPass({ text }));
  };

  const handleRegister = () => {
    registration(email, pass, repeatPass).then(user => setUser({...user.user}));
  };

  return (
    <div>
      <Form
        title="Register"
        handleClick={handleRegister}
        email={email}
        setEmail={setEmail}
        pass={pass}
        setPass={setPass}
        repeatPass={repeatPass}
        setRepeatPass={setRepeatPass}
      />
    </div>
  );
};

export default RegisterPage;
