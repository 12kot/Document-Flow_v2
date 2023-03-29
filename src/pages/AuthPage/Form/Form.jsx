import React from "react";
import styles from "./Form.module.css";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";

const Form = ({
  email,
  setEmail,
  pass,
  setPass,
  repeatPass,
  setRepeatPass,
  title,
  handleClick,
}) => {
  return (
    <div>
      <h3>{title}</h3>

      <div className={`${styles.inputs}`}>
        <div className={`${styles.item}`}>
          <Input
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Email"
            color={styles.color}
          />
        </div>

        <div className={`${styles.item}`}>
          <Input
            className={`${styles.item}`}
            type="password"
            value={pass}
            onChange={setPass}
            placeholder="Password"
            color={styles.color}
          />
        </div>

        {setRepeatPass ? (
          <div className={`${styles.item}`}>
            <Input
              className={`${styles.item}`}
              type="password"
              value={repeatPass}
              onChange={setRepeatPass}
              placeholder="Repeat password"
              color={styles.color}
            />
          </div>
        ) : (<span />)}
        
        <div className={`${styles.item}`}>
          <Button
            className={`${styles.item}`}
            size={styles.button}
            action={handleClick}
            text={title}
          />
        </div>

      </div>
    </div>
  );
};

export default Form;
