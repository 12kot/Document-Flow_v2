import React, { ReactElement, useState, DragEvent } from "react";
import styles from "./Folder.module.css";
import { NavLink } from "react-router-dom";
import folderIcon from "./../file-icons/folder.png";
import { UserFile } from "../../../../Types/Types";

type FolderProps = {
  name: string,
  path: string,
  gridView: boolean,

  changeFileFolder: (file: UserFile, path: string) => Promise<void>,
}

const Folder = (props: FolderProps): ReactElement => {
  const [drag, setDrag] = useState(false);

  const dragStartHandler = (e: DragEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: DragEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e: DragEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    let file;
    try { file = JSON.parse(e.dataTransfer.getData("currentFile")) } catch (e) { };
    
    if(!!file)
      props.changeFileFolder(file, props.path);

    setDrag(false);
  };

  return (
    <NavLink
      to={props.path ? `/disk/folders/${props.path}` : `/disk`}
      className={props.gridView ? `${styles.gridContainer}` : styles.container}
      onDrop={(e) => onDropHandler(e)}
      onDragStart={(e) => dragStartHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => dragStartHandler(e)}
    >
      {drag ? <div className={styles.drag}><p>Отпустите файл</p></div> : (
        <div className={`${styles.nameContainer}`}>
          <span className={styles.item}>
            <img src={folderIcon} alt="icon" />
          </span>
          <span className={`${styles.item} ${styles.name}`} title={props.name}>
            {props.name}
          </span>
        </div>
      )}
    </NavLink>
  );
};

export default Folder;
