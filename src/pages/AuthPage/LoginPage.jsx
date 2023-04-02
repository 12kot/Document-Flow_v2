import React from "react";
import Form from "./Form/Form";
import styles from "./Form/Form.module.css";
import { NavLink, Navigate } from "react-router-dom";
import useAuth from "../../hooks/use-auth";

const LoginPage = (props) => {
  if (useAuth().isAuth) return <Navigate to="/disk" />;

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.form}`}>
        <Form
          title="Log In"
          handleClick={props.handleLogin}
          email={props.email}
          setEmail={props.setEmail}
          pass={props.pass}
          setPass={props.setPass}
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
