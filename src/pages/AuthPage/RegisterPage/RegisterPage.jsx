import React from "react";
import styles from "./../Auth.module.css";
import FormContainer from "../Form/FormContainer";

import passImg from "./../../../Common/Images/difficultPass.png";

const RegisterPage = (props) => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.form}`}>
        <FormContainer
          title="Зарегистрироваться"
          handleClick={props.handleRegister}
          isLoading={props.isLoading}
          repeatPass={props.repeatPass}
          setRepeatPass={props.setRepeatPass}
        />
      </div>

      <div className={styles.tips}>
        <img src={passImg} alt="write down password"></img>
        <h2>Храните пароль в безопасности</h2>
        <p>Потеряв пароль, вы утратите доступ ко всем своим данным</p>
      </div>
    </div>
  );
};

export default RegisterPage;
