import React, { Dispatch, ReactElement, SetStateAction } from "react";
import styles from "../Modal.module.css";
import Input from "../../../../../UI/Input/Input";

type ModalProps = {
  folderName: string, 
  setFolderName: Dispatch<SetStateAction<string>>,
  createFolder: () => void
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>,
} 

const InputModal = (props: ModalProps): ReactElement => {
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
