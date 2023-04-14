import React, { useState } from "react";
import styles from "./File.module.css";
import Modal from "./Modal/Modal";

const File = (props) => {
  const [menuActive, setMenuActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const shareFile = (userEmail) => {
    props.shareFile(props.file, userEmail);
  };

  const deleteAccess = (userEmail) => {
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
        <div className={styles.item} onClick={() => setModalActive(true)}>Права доступа</div>
      </span>

      <Modal active={modalActive} setActive={setModalActive} fileName={props.file.name} users={props.file.usersEmail} owner={props.file.ownerEmail} shareFile={shareFile} deleteAccess={deleteAccess} path={props.file.path} />
      <div onClick={() => {setMenuActive(!menuActive)}}>m</div>
    </form>
  );
};

export default File;
