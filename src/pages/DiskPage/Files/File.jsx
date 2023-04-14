import React, { useState } from "react";
import styles from "./File.module.css";
import Input from "../../../UI/Input/Input";

const File = (props) => {
  const [userEmail, setuserEmail] = useState("");
  const [menuActive, setMenuActive] = useState(false);

  const shareFile = () => {
    props.shareFile(props.file, userEmail);
  };

  const deleteAccess = () => {
    props.deleteUserOnFile(props.file, userEmail);
  };

  const removeFile = () => {
    props.removeFile(props.file);
  };

  return (
    <form className={styles.container}>
      <span className={menuActive ? `${styles.name} ${styles.active}` : `${styles.name}`}>
        <div className={styles.item}>Icon</div>
        <div className={styles.item}>{props.file.name}</div>
      </span>

      <span className={menuActive ? `${styles.actions} ${styles.active}` : `${styles.actions}`}>
        <div className={styles.item}>
          <a href={props.file.path}>Скачать</a>
        </div>
        <div className={styles.item} onClick={removeFile}>
          Удалить
        </div>
        <div className={styles.item} onClick={shareFile}>Права доступа</div>
        <div className={styles.item} onClick={deleteAccess}>Отозвать доступ</div> 
      </span>

      <div onClick={() => {setMenuActive(!menuActive)}}>m</div>
    </form>
  );
};

export default File;
