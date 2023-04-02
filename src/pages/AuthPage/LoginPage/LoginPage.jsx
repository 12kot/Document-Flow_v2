import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import styles from "../Form/Form.module.css";
import useAuth from "../../../hooks/use-auth";
import FormContainer from "../Form/FormContainer";

const LoginPage = (props) => {
  if (useAuth().isAuth) return <Navigate to="/disk" />;

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.form}`}>
        <FormContainer
          title="Log In"
          handleClick={props.handleLogin}
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
