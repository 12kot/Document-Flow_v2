import React from "react";
import styles from "../Modal.module.css";
import Input from "../../../../../UI/Input/Input";

const InputModal = (props) => {
  return (
    <div
      className={
        props.active ? `${styles.modal} ${styles.active}` : `${styles.modal}`
      }
      onClick={() => props.setActive(false)}
    >
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.closeMenu}>
          <div className={styles.input}>
            <Input
              value={props.folderName}
              placeholder="Folder name"
              type="text"
              color={styles.color}
              onChange={props.setFolderName}
            />
          </div>

          <span
            className={styles.closeButton}
            onClick={() => props.setActive(false)}
          >
            <div className={styles.close} />
          </span>
        </div>

        <div className={styles.save}>
          <p onClick={props.createFolder}>Создать папку</p>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
