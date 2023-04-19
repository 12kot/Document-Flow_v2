import React, { useState } from "react";
import styles from "./File.module.css";
import Modal from "./Modal/Modal";
import undefinedIcon from "./file-icons/undefined.png"

const File = (props) => {
  const [menuActive, setMenuActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const chooseIcon = () => {
    let indexOFDot = props.file.name.lastIndexOf(".");
    let name = props.file.name.slice(indexOFDot + 1); 

    try { return require(`./file-icons/${name}.png`); }
    catch (e) { return undefinedIcon; }
  }
  
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
        <div className={`${styles.item} ${styles.doc_type}`}>
            <img src={chooseIcon()} alt="icon"/>
        </div>
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

      <div className={styles.menu} onClick={() => { setMenuActive(!menuActive) }}><div className={styles.lines} /></div>
      
      <Modal active={modalActive} setActive={setModalActive} fileName={props.file.name} users={props.file.usersEmail} owner={props.file.ownerEmail} shareFile={shareFile} deleteAccess={deleteAccess} path={props.file.path} />
    </form>
  );
};

export default File;
