import React from "react";
import modalStyles from "../Modal.module.css";
import styles from "./FoldersModal.module.css";

const FoldersModal = (props) => {
  const handleClick = (folder) => {
    props.changeFileFolder(props.file, folder);
    props.setActive(false);
  };

  const getFoldersName = () => {
    const rootFolder = (
      <div
        className={styles.folder}
        key={"rootFolder"}
        onClick={() => handleClick("")}
      >
        <p>На главную страницу</p>
      </div>
    );

    return [
      rootFolder,
      ...props.folders.map((folder) => (
        <div
          className={styles.folder}
          key={folder}
          onClick={() => handleClick(folder)}
        >
          <p>{"/" + folder.replaceAll("+", "/")}</p>
        </div>
      )),
    ];
  };

  return (
    <div
      className={
        props.active
          ? `${modalStyles.modal} ${modalStyles.active}`
          : `${modalStyles.modal}`
      }
      onClick={() => props.setActive(false)}
    >
      <div
        className={modalStyles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={modalStyles.closeMenu}>
          <div className={modalStyles.input}>Выберите папку</div>

          <span
            className={modalStyles.closeButton}
            onClick={() => props.setActive(false)}
          >
            <div className={modalStyles.close} />
          </span>
        </span>

        <span className={styles.folders}>{getFoldersName()}</span>
      </div>
    </div>
  );
};

export default FoldersModal;
