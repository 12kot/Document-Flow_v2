import React from "react";
import styles from "./Form.module.css";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";
import Loader from "../../../UI/Loader/Loader";

//импортировать здесь email, setEmail, pass, setPass
const Form = (props) => {
  return (
    <div>
      <h3>{props.title}</h3>

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
            className={`${styles.item}`}
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
              className={`${styles.item}`}
              type="password"
              value={props.repeatPass}
              onChange={props.setRepeatPass}
              placeholder="Repeat password"
              color={styles.color}
            />
          </div>
        ) : (<span />)}
        
        <div className={`${styles.item}`}>
          {props.isLoading ? <Loader /> :
            <Button
              className={`${styles.item}`}
              size={styles.button}
              action={props.handleClick}
              text={props.title}
            />}
        </div>

      </div>
    </div>
  );
};

export default Form;
