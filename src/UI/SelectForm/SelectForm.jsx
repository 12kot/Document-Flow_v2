import React from "react";
import styles from "./SelectForm.module.css";

const SelectForm = (props) => {

  let updateText = (value) => {
    props.onChange(value);
  };

  return (
    <div className={`${styles.form__group} ${styles.field}`}>
      <select
        value={props.value}
        onChange={(e) => updateText(e.target.value)}
        className={`${styles.form__field}`}
      >
        <option value="name">По названию</option>
        <option value="time">По времени изменения</option>
        <option value="size">По размеру</option>
      </select>
    </div>
  );
};

export default SelectForm;
