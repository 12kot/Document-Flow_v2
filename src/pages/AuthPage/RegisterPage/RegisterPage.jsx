import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../Form/Form.module.css";
import FormContainer from "../Form/FormContainer";

const RegisterPage = (props) => {
   return (
    <div className={`${styles.container}`}>
      <div className={`${styles.form}`}>
        <FormContainer
          title="Register"
          handleClick={props.handleRegister}
          isLoading={props.isLoading}

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
