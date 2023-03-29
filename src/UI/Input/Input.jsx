import React from "react";
import styles from "./Input.module.css"

const Input = (props) => {

    let updateText = (value) => {
        props.onChange(value);
    }

    return (<div
        className={`${styles.form__group} ${styles.field} ${props.margin}`}
    >
        <input
            className={`${styles.form__field} ${props.color}`}

            type={props.type}
            value={props.value}
            onChange={(e) => updateText(e.target.value)}
            placeholder={props.placeholder}
            required=""
            autoComplete="on"
        />
        <label className={styles.form__label} htmlFor={props.placeholder}>
            {props.placeholder}
        </label>
    </div>);
}

export default Input;