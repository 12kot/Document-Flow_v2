import React from "react";
import styles from "./File.module.css";

const File = (props) => {
  // let getDate = () => {
  //   let date = new Date(props.date);
  //   return `${date.toDateString()}`;
  // }
  const removeFile = () => {
    props.removeFile(props.fullPath, props.id);
  }

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <div className={styles.item}>Icon</div>
        <div className={styles.item}>{props.name}</div>
      </div>
      {/* <div className={styles.item}>{getDate()}</div> */}
      <div className={styles.actions}>
        <div className={styles.item}>
          <a href={props.path}>download</a>
        </div>
        <div className={styles.item} onClick={removeFile}>
         delete
        </div>
      </div>
    </div>
  );
};

export default File;
