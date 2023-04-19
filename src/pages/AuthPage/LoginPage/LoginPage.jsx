import React from "react";
import styles from "./../Auth.module.css";
import FormContainer from "../Form/FormContainer";

import passImg from "./../../../Common/Images/writePass.png";

const LoginPage = (props) => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.form}`}>
        <FormContainer
          title="Войти"
          handleClick={props.handleLogin}
          handleForgot={props.handleForgot}
          isLoading={props.isLoading}
          isLogin={true}
        />
      </div>
      <div className={styles.tips}>
        <img src={passImg} alt="write down password"></img>
        <h2>Сохраните пароль</h2><p>Чтобы не потерять доступ к своим файлам</p>
      </div>
    </div>
  );
};

export default LoginPage;
