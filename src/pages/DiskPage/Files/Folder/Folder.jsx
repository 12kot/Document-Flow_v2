import React, { useState } from "react";
import styles from "./Folder.module.css";
import { NavLink } from "react-router-dom";
import folderIcon from "./../file-icons/folder.png";

const Folder = (props) => {
  const [drag, setDrag] = useState(false);

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    let file = {};
    try { file = JSON.parse(e.dataTransfer.getData("currentFile")) } catch(e) {};

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
