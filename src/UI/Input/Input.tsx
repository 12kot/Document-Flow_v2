import React, { ReactElement } from "react";
import styles from "./Input.module.css";

type InputProps = {
  value: string | undefined;
  placeholder: string;
  type: string;
  onChange: any;
  color: string;
  margin?: string;
};

const Input = (props: InputProps): ReactElement => {
  let updateText = (value: string) => {
    props.onChange(value);
  };

  return (
    <div className={`${styles.form__group} ${styles.field} ${props.margin}`}>
      <input
        className={`${styles.form__field} ${props.color}`}
        type={props.type}
        value={props.value}
        onChange={(e) => updateText(e.target.value)}
        placeholder={props.placeholder}
        autoComplete="on"
      />
      <label className={styles.form__label} htmlFor={props.placeholder}>
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;
