import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { v4 } from "uuid";

import styles from "./../DiskPage.module.css";

import Loader from "../../../UI/Loader/Loader";
import File from "../Files/File";
import Folder from "../Files/Folder/Folder";

import gridView from "./../Files/file-icons/gridView.png";
import listView from "./../Files/file-icons/listView.png";
import addFolderIcon from "./../Files/file-icons/addFolder.png";
import deleteFolderIcon from "./../Files/file-icons/deleteFolder.png";

const Files = (props) => {
  props = useOutletContext();
  props.folder = props.folder ? props.folder : "";

  const files = useSelector((state) => state.user.files);
  const folders = useSelector((state) => state.user.folders);

  const [isGridView, setIsGridView] = useState(true);

  const myFiles = files.filter((file) => file.ownerEmail === props.userEmail);

  const othersFiles = files.filter(
    (file) => file.ownerEmail !== props.userEmail
  );

  const getFolders = () => {
    if (props.isFilesLoading) return <></>;

    let newFolders = folders.filter((folder) => {
      let checkFolder = props.folder
        ? `${props.folder}+${folder.slice(props.folder.length + 1)}`
        : folder;

      return (
        folder.startsWith(props.folder) &&
        folders.includes(checkFolder) &&
        folder !== props.folder &&
        !folder.slice(props.folder.length + 1).includes("+")
      );
    });

    return newFolders.map((folder) => {
      let name = folder.includes("+")
        ? folder.slice(props.folder.length + 1)
        : folder;
      return <Folder name={name} path={folder} key={folder + v4()} />;
    });
  };

  const getFiles = (files) => {
    if (props.isFilesLoading) return <Loader />;
    if (files.length === 0) return <></>;

    let newFiles = files.filter((file) => !file.isHiden);
    newFiles = newFiles.filter((file) => file.folder === props.folder);

    if (newFiles.length === 0) return <></>;

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

  const handleCreateFolder = () => {
    props.createFolder(prompt().toLowerCase());
  };
  return (
    <div className={`${styles.container} ${styles.files}`}>
      <div className={styles.displayGrid}>
        <h2>Ваши файлы</h2>
        <span className={styles.containerFilesActions}>
          <img
            className={styles.filesActions}
            src={addFolderIcon}
            alt="add folder"
            onClick={handleCreateFolder}
          />
          <img
            className={styles.filesActions}
            src={deleteFolderIcon}
            alt="delete folder"
            onClick={handleCreateFolder}
          />
          <img
            className={styles.filesActions}
            src={isGridView ? gridView : listView}
            alt="change grid"
            onClick={() => {
              setIsGridView(!isGridView);
            }}
          />
        </span>
      </div>
      <span
        className={
          isGridView
            ? `${styles.fileList} ${styles.fileListGrid}`
            : styles.fileList
        }
      >
        {getFolders()}
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
