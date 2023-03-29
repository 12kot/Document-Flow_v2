import React from "react";
import Form from "./Form/Form";
import { useDispatch, useSelector } from "react-redux";
import login from "../../hooks/login";
import { changeEmail, changePass } from "../../store/slices/authSlice";
import { setUser } from "../../store/slices/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const pass = useSelector((state) => state.auth.password);

  const setEmail = (text) => {
    dispatch(changeEmail({ text }));
  };

  const setPass = (text) => {
    dispatch(changePass({ text }));
  };

  const handleLogin = () => {
    login(email, pass).then(user => dispatch(setUser({...user.user})));
  };

  return (
    <div>
      <Form
        title="Log In"
        handleClick={handleLogin}
        email={email}
        setEmail={setEmail}
        pass={pass}
        setPass={setPass}
      />
    </div>
  );
};

export default LoginPage;
