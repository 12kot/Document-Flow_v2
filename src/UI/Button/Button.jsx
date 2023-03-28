import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Button.module.css"

const Button = (props) => {
  let action = () => {
    if(props.action)
      props.action();
  }

  return (
    <div className={`${styles.logButton}`}>
      <NavLink to={props.path} onClick={action} className={`${styles.floating_button} ${props.size}`}>
        {props.text}
      </NavLink>
    </div>
  );
};

export default Button;
