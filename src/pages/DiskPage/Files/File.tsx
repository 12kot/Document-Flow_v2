import React, { ReactElement, useState, DragEvent } from "react";
import styles from "./File.module.css";
import undefinedIcon from "./file-icons/undefined.png";
import ManageModal from "./Modal/ManageModal/ManageModal";
import FoldersModal from "./Modal/FoldersModal.jsx/FoldersModal";
import { UserFile } from "../../../Types/Types";

type FileProps = {
  file: UserFile;
  folders: string[];
  gridView: boolean;

  changeFileFolder: (file: UserFile, path: string) => Promise<void>;
  removeFile: (file: UserFile) => Promise<void>;
  shareFile: (file: UserFile, email: string) => Promise<void>;
  deleteUserOnFile: (file: UserFile, email: string) => Promise<void>;
};

const File = (props: FileProps): ReactElement => {
  const [menuActive, setMenuActive] = useState(false);
  const [manageModalActive, setManageModalActive] = useState(false);
  const [foldersModalActive, setFoldersModalActive] = useState(false);

  const chooseIcon = () => {
    let indexOFDot = props.file.name.lastIndexOf(".");
    let name = props.file.name.slice(indexOFDot + 1);

    try {
      return require(`./file-icons/${name}.png`);
    } catch (e) {
      return undefinedIcon;
    }
  };

  const shareFile = (userEmail: string): void => {
    props.shareFile(props.file, userEmail);
  };

  const deleteAccess = (userEmail: string): void => {
    props.deleteUserOnFile(props.file, userEmail);
  };

  const removeFile = (): void => {
    props.removeFile(props.file);
  };

  const dragStart = (e: DragEvent<HTMLFormElement>): void => {
    e.dataTransfer.setData("currentFile", JSON.stringify(props.file));
  };

  return (
    <form
      className={props.gridView ? styles.gridContainer : styles.container}
      onDragStart={(e) => dragStart(e)}
    >
      <span
        className={
          menuActive
            ? `${styles.nameContainer} ${styles.active}`
            : `${styles.nameContainer}`
        }
        draggable
      >
        <span className={`${styles.item}`}>
          <img src={chooseIcon()} alt="icon" />
        </span>

        <div className={styles.menuContainer}>
          <span
            className={`${styles.item} ${styles.name}`}
            title={props.file.name}
          >
            {props.file.name}
          </span>
          <span
            className={styles.menu}
            onClick={() => {
              setMenuActive(!menuActive);
            }}
          >
            <div className={styles.lines} />
          </span>
        </div>
      </span>

      <span
        className={
          menuActive
            ? `${styles.actions} ${styles.active}`
            : `${styles.actions}`
        }
      >
        <div className={styles.item}>
          <a href={props.file.path} download>
            Скачать
          </a>
        </div>
        <div className={styles.item} onClick={removeFile}>
          Удалить
        </div>
        <div className={styles.item} onClick={() => setManageModalActive(true)}>
          Доступ
        </div>
        <div
          className={styles.item}
          onClick={() => {
            setFoldersModalActive(true);
          }}
        >
          В папку
        </div>
        <span
          className={styles.menuA}
          onClick={() => {
            setMenuActive(!menuActive);
          }}
        >
          <div className={styles.lines} />
        </span>
      </span>

      <FoldersModal
        active={foldersModalActive}
        setActive={setFoldersModalActive}
        folders={props.folders}
        changeFileFolder={props.changeFileFolder}
        file={props.file}
      />
      <ManageModal
        active={manageModalActive}
        setActive={setManageModalActive}
        fileName={props.file.name}
        users={props.file.usersEmail}
        owner={props.file.ownerEmail}
        shareFile={shareFile}
        deleteAccess={deleteAccess}
        path={props.file.path}
      />
    </form>
  );
};

export default File;
