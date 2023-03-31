import React from "react";
import Form from "./Form/Form";
import styles from "./Form/Form.module.css";
import { NavLink, Navigate } from "react-router-dom";
import login from "../../hooks/login";
import { useDispatch, useSelector } from "react-redux";
import { changeEmail, changePass } from "../../store/slices/authSlice";
import { setUser } from "../../store/slices/userSlice";
import useAuth from "../../hooks/use-auth";

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
    login(email, pass)
    .then((user) => {
      dispatch(setUser({
        email: user.user.email,
        accessToken: user.user.accessToken,
        uid: user.user.uid,
      }));
      alert("Вы успешно авторизовались");
      return <Navigate to="/disk" />;
    })
    .catch(alert);
  };

  if (useAuth().isAuth) return <Navigate to="/disk" />;
  
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.form}`}>
        <Form
          title="Log In"
          handleClick={handleLogin}
          email={email}
          setEmail={setEmail}
          pass={pass}
          setPass={setPass}
        />

        <div className={`${styles.register} ${styles.item}`}>
          <span>Ещё не зарегестрированы?</span>
          <br />
          <NavLink to="/register">Sign In</NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
