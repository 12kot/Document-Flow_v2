import React from "react";
import styles from "./PoputMessage.module.css";

const PoputMessage = (props) => {
  return (
    <div className={`${styles.modal}`}>
      <div
        className={
          props.type
            ? `${styles.modal_content} ${styles.success}`
            : `${styles.modal_content} ${styles.lose}`
        }
      >
        <p className={styles.result}>{props.type ? "Успех" : "Неудача"}</p>
        <p>{props.message}</p>
      </div>
    </div>
  );
};

export default PoputMessage;
