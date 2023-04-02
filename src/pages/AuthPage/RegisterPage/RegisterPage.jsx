import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import styles from "../Form/Form.module.css";
import useAuth from "../../../hooks/use-auth";
import FormContainer from "../Form/FormContainer";

const RegisterPage = (props) => {
  if (useAuth().isAuth) return <Navigate to="/disk" />;

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.form}`}>
        <FormContainer
          title="Register"
          handleClick={props.handleRegister}

          repeatPass={props.repeatPass}
          setRepeatPass={props.setRepeatPass}
        />

        <div className={`${styles.register} ${styles.item}`}>
          <span>Уже зарегестриваны?</span>
          <br />
          <NavLink to="/login">Log In</NavLink>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
