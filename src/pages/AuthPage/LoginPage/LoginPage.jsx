import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../Form/Form.module.css";
import FormContainer from "../Form/FormContainer";

const LoginPage = (props) => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.form}`}>
        <FormContainer
          title="Log In"
          handleClick={props.handleLogin}
          isLoading={props.isLoading}
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
