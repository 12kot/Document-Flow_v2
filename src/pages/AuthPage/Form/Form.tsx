import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import styles from "./Form.module.css";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";
import Loader from "../../../UI/Loader/Loader";
import { NavLink } from "react-router-dom";
import ForgotPass from "../LoginPage/ForgotPass/ForgotPass";

type FormProps = {
  title: string
  handleClick: () => Promise<void>,
  handleForgot?: (setActive: Dispatch<SetStateAction<boolean>>) => Promise<void>,
  isLoading: boolean,
          
  email: string,
  setEmail: (text: string) => void,
  pass: string, 
  setPass: (text: string) => void,
          
  repeatPass?: string,
  setRepeatPass?: (text: string) => void,
  isLogin: boolean,
}

const Form = (props: FormProps): ReactElement => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <form className={styles.container}>
      <span className={styles.action}>
        <h3>{props.title}</h3>
      </span>

      <div className={`${styles.inputs}`}>
        <div className={`${styles.item}`}>
          <Input
            type="email"
            value={props.email}
            onChange={props.setEmail}
            placeholder="Email"
            color={styles.color}
          />
        </div>

        <div className={`${styles.item}`}>
          <Input
            // className={`${styles.item}`}
            type="password"
            value={props.pass}
            onChange={props.setPass}
            placeholder="Password"
            color={styles.color}
          />
        </div>

        {props.setRepeatPass ? (
          <div className={`${styles.item}`}>
            <Input
              // className={`${styles.item}`}
              type="password"
              value={props.repeatPass}
              onChange={props.setRepeatPass}
              placeholder="Repeat password"
              color={styles.color}
            />
          </div>
        ) : (
          <span />
        )}
      </div>

      <div className={`${styles.button}`}>
        {props.isLoading ? (
          <Loader />
        ) : (
          <Button
            size={styles.buttonSize}
            action={props.handleClick}
            text={props.title}
          />
        )}
      </div>

      <div className={styles.register}>
        {props.isLogin ? (
          <div className={styles.forgotPass}>
            <p>
              Нет аккаунта? <NavLink to="/register">Зарегистрироваться</NavLink>
            </p>
            <div className={styles.forgot}>
              <p>
                <NavLink to="" onClick={() => setModalActive(true)}>
                  Восстановить пароль
                </NavLink>
                </p>
              <ForgotPass
                active={modalActive}
                setActive={setModalActive}
                handleForgot={props.handleForgot}
                email={props.email}
                setEmail={props.setEmail}
              />
            </div>
          </div>
        ) : (
          <p>
            Есть аккаунт? <NavLink to="/login">Войти</NavLink>
          </p>
        )}
      </div>
    </form>
  );
};

export default Form;
