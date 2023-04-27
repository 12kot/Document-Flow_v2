import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Button.module.css";

type ButtonProps = {
  action?: () => any;
  text: string,
  size?: string,
  path?: string,
};

const Button = (props: ButtonProps): ReactElement => {
  let action = (): void => {
    if (props.action) props.action();
  };

  return (
    <div>
      <NavLink
        to={props.path ? props.path : ""}
        onClick={action}
        className={`${styles.floating_button} ${props.size}`}
      >
        {props.text}
      </NavLink>
    </div>
  );
};

export default Button;
