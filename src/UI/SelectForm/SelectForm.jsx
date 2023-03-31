import React from "react";
import styles from "./SelectForm.module.css";

const SelectForm = (props) => {
  let updateTextRef = React.createRef();
  let updateText = () => {
    props.changeText(updateTextRef.current.value);
  };

  return (
    <div className={`${styles.form__group} ${styles.field} ${props.margin}`}>
      <select
        onChange={updateText}
        ref={updateTextRef}
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
