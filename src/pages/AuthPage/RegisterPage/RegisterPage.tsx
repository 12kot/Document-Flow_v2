import React, { ReactElement } from "react";
import styles from "./../Auth.module.css";
import FormContainer from "../Form/FormContainer";

import passImg from "./../../../Common/Images/difficultPass.png";

type RegisterProps = {
  handleRegister: () => Promise<void>,
  repeatPass: string,
  setRepeatPass: (text: string) => void,
  isLoading: boolean,
}

const RegisterPage = (props: RegisterProps): ReactElement => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.form}`}>
        <FormContainer
          title="Зарегистрироваться"
          isLoading={props.isLoading}
          isLogin={false}

          handleClick={props.handleRegister}
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
