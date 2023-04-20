import React from "react";
import styles from "./ModalProfile.module.css";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";

const ModalProfile = (props) => {
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
          <h3>{props.user.email}</h3>
          <span
            className={styles.closeButton}
            onClick={() => props.setActive(false)}
          >
            <div className={styles.close} />
          </span>
        </div>

        <div>
          <p>Ваше имя</p>
          <Input
            value={props.name}
            placeholder="name"
            type="text"
            color={styles.color}
            onChange={props.setName}
          />
        </div>
        <span>
          <p>Ваш пароль</p>
          <Button
            action={props.handleForgot}
            text="Сбросить пароль"
            size={styles.buttonSize}
          />
        </span>

        <div className={styles.save}>
          <p onClick={props.updateName}>Сохранить изменения</p>
        </div>
      </div>
    </div>
  );
};

export default ModalProfile;
