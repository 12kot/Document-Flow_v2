import React from "react";
import Form from "./Form/Form";
import styles from "./Form/Form.module.css";
import { NavLink, Navigate } from "react-router-dom";
import useAuth from "../../hooks/use-auth";

const RegisterPage = (props) => {
  if (useAuth().isAuth) return <Navigate to="/disk" />;

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.form}`}>
        <Form
          title="Register"
          handleClick={props.handleRegister}
          email={props.email}
          setEmail={props.setEmail}
          pass={props.pass}
          setPass={props.setPass}
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
