import React, { useState } from "react";
import gridView from "./Files/file-icons/gridView.png";
import listView from "./Files/file-icons/listView.png";
import styles from "./DiskPage.module.css";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import Loader from "../../UI/Loader/Loader";
import File from "./Files/File";
import { useOutletContext } from "react-router-dom";

const Files = (props) => {
    props = useOutletContext();

    const files = useSelector((state) => state.user.files);
    const [isGridView, setIsGridView] = useState(true);
    const myFiles = files.filter((file) => file.ownerEmail === props.userEmail);
  
    const othersFiles = files.filter(
      (file) => file.ownerEmail !== props.userEmail
    );
  
    const getFiles = (files) => {
      if (props.isFilesLoading) return <Loader />;
      if (files.length === 0) return <p>Файлы отсутствуют</p>;
  
      let newFiles = files.filter((file) => !file.isHiden);
      if (newFiles.length === 0) return <p>Файлы отсутствуют</p>;
  
      return newFiles
        .map((file) => (
          <File
            file={file}
            key={file.fullPath + v4()}
            removeFile={props.removeFile}
            shareFile={props.shareFile}
            deleteUserOnFile={props.deleteUserOnFile}
            gridView={isGridView}
          />
        ))
        .reverse();
    };
    
  return (
    <div className={`${styles.container} ${styles.files}`}>
      <div className={styles.displayGrid}>
        <h2>Ваши файлы</h2>
        <img
          src={isGridView ? gridView : listView}
          alt="change grid"
          onClick={() => {
            setIsGridView(!isGridView);
          }}
        />
      </div>
      <span
        className={
          isGridView
            ? `${styles.fileList} ${styles.fileListGrid}`
            : styles.fileList
        }
      >
        {getFiles(myFiles)}
      </span>

      <h2>С вами поделились</h2>
      <span
        className={
          isGridView
            ? `${styles.fileList} ${styles.fileListView}`
            : styles.fileList
        }
      >
        {getFiles(othersFiles)}
      </span>
    </div>
  );
};


export default Files;