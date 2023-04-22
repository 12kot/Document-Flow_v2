import React from "react";
import styles from "./Folder.module.css";
import { NavLink } from "react-router-dom";
import folderIcon from "./../file-icons/folder.png";

const Folder = (props) => {
  return (
    <NavLink to={`/disk/folders/${props.path}`} className={styles.container}>
      <span className={styles.item}>
        <img src={folderIcon} alt="icon" />
      </span>
      <span className={styles.item} title={props.name}>{props.name}</span>
    </NavLink>
  );
};

export default Folder;
