import React, { useState } from "react";
import styles from "./File.module.css";
import Input from "../../../UI/Input/Input";

const File = (props) => {
  const [userEmail, setuserEmail] = useState("");

  const shareFile = () => {
    props.shareFile(props.file, userEmail);
  };

  const deleteAccess = () => {
    props.deleteUserOnFile(props.file, userEmail)
  }

  const removeFile = () => {
    props.removeFile(props.file);
  };

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <div className={styles.item}>Icon</div>
        <div className={styles.item}>{props.file.name}</div>
      </div>
      {/* <div className={styles.item}>{getDate()}</div> */}
      <div className={styles.actions}>
        <div className={styles.item}>
          <a href={props.file.path}>download</a>
        </div>
        <div className={styles.item} onClick={removeFile}>
          delete
        </div>
      </div>
      <div className={styles.item}>
        <Input
          type="email"
          value={userEmail}
          onChange={setuserEmail}
          placeholder="Email"
        />
        <button onClick={shareFile}>Поделиться</button>
        <button onClick={deleteAccess}>Забрать доступ</button>
      </div>
    </div>
  );
};

export default File;
