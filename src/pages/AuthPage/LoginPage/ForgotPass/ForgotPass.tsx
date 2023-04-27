import React, { Dispatch, ReactElement, SetStateAction } from "react";
import styles from "./ForgotPass.module.css";
import Input from "../../../../UI/Input/Input";
import Button from "../../../../UI/Button/Button";

type ForgotProps = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;

  handleForgot?: (
    setActive: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;
  email: string;

  setEmail: (text: string) => void;
};

const ForgotPass = (props: ForgotProps): ReactElement => {
  const handleClick = (): void => {
    if(props.handleForgot)
      props.handleForgot(props.setActive);
  };

  return (
    <div
      className={
        props.active ? `${styles.modal} ${styles.active}` : `${styles.modal}`
      }
      onClick={() => props.setActive(false)}
    >
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.closeMenu}>
          <h3>Введите почту</h3>
          <span
            className={styles.closeButton}
            onClick={() => props.setActive(false)}
          >
            <div className={styles.close} />
          </span>
        </div>

        <Input
          type="email"
          value={props.email}
          onChange={props.setEmail}
          placeholder="Email"
          color={styles.color}
        />
        <Button action={handleClick} text={"Восстановить пароль"} />
      </div>
    </div>
  );
};

export default ForgotPass;
