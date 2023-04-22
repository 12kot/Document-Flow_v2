import React from "react";
import styles from "./Folder.module.css";
import { NavLink } from "react-router-dom";
import folderIcon from "./../file-icons/folder.png";

const Folder = (props) => {
  return (
    <NavLink to={`/disk/folders/${props.path}`} className={props.gridView ? `${styles.gridContainer}` : styles.container}>
      <div className={`${styles.nameContainer}`}>
      <span className={styles.item}>
        <img src={folderIcon} alt="icon" />
      </span>
      <span className={`${styles.item} ${styles.name}`} title={props.name}>{props.name}</span>
      </div>
    </NavLink>
  );
};

export default Folder;
