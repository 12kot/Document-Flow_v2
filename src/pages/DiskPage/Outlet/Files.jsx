import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useOutletContext } from "react-router-dom";
import { v4 } from "uuid";

import styles from "./../DiskPage.module.css";

import Loader from "../../../UI/Loader/Loader";
import File from "../Files/File";
import Folder from "../Files/Folder/Folder";

import gridView from "./../Files/file-icons/gridView.png";
import listView from "./../Files/file-icons/listView.png";
import addFolderIcon from "./../Files/file-icons/addFolder.png";
import deleteFolderIcon from "./../Files/file-icons/deleteFolder.png";
import HandleMessage from "../../../functions/HandleMessage";
import ModalInput from "./ModalInput/ModalInput";

const Files = (props) => {
  props = useOutletContext();
  props.folder = props.folder ? props.folder : "";

  const files = useSelector((state) => state.user.files);
  const folders = useSelector((state) => state.user.folders);

  const [folderName, setFolderName] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [isGridView, setIsGridView] = useState(false);

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

    let backFolder;
    if (props.folder){
    const pastPath =
      props.folder.lastIndexOf("+") === -1
        ? ""
        : props.folder.slice(0, props.folder.lastIndexOf("+"));
    
    backFolder = (
      <Folder
        name={".."}
        path={pastPath}
        changeFileFolder={props.changeFileFolder}
        gridView={isGridView}
        key={props.folder + v4()}
      />
    );}

    newFolders = newFolders.map((folder) => {
      let name = folder.includes("+")
        ? folder.slice(props.folder.length + 1)
        : folder;
      return (
        <Folder
          name={name}
          path={folder}
          changeFileFolder={props.changeFileFolder}
          gridView={isGridView}
          key={folder + v4()}
        />
      );
    });

    return [backFolder, ...newFolders];
  };

  const getFiles = (files) => {
    if (props.isFilesLoading) return <Loader />;

    let newFiles = files.filter((file) => !file.isHiden);
    newFiles = newFiles.filter((file) => file.folder === props.folder);

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
    setModalActive(false);
    props.createFolder(folderName);
  };

  const handleDeleteFolder = () => {
    if (getFiles(myFiles).length !== 0 || getFolders().length > 1)
      HandleMessage("Нельзя удалить папку с файлами или папками", "error");
    else if (props.folder === "")
      HandleMessage("Вы не находитесь в папке", "error");
    else props.deleteFolder();
  };

  const path = props.folder
    ? "/" + props.folder.replaceAll("+", "/")
    : "Ваши файлы";
  return (
    <div className={`${styles.container} ${styles.files}`}>
      <div className={styles.displayGrid}>
        {path === "Ваши файлы" ? (
          <h2>Ваши файлы</h2>
        ) : (
          <h2>
            <NavLink to="/disk">{path}</NavLink>
          </h2>
        )}
        <span className={styles.containerFilesActions}>
          <img
            className={styles.filesActions}
            src={addFolderIcon}
            alt="add folder"
            onClick={() => setModalActive(true)}
          />
          <img
            className={styles.filesActions}
            src={deleteFolderIcon}
            alt="delete folder"
            onClick={handleDeleteFolder}
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

      <ModalInput
        folderName={folderName}
        setFolderName={setFolderName}
        createFolder={handleCreateFolder}
        active={modalActive}
        setActive={setModalActive}
      />
    </div>
  );
};

export default Files;
