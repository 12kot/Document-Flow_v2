import React, { ReactElement, useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import { v4 } from "uuid";

import { useAppSelector } from "../../../hooks/hooks";
import { DiskProps, UserFile } from "../../../Types/Types";

import styles from "./../DiskPage.module.css";

import Loader from "../../../UI/Loader/Loader";
import File from "../Files/File";
import Folder from "../Files/Folder/Folder";

import gridView from "./../Files/file-icons/gridView.png";
import listView from "./../Files/file-icons/listView.png";
import addFolderIcon from "./../Files/file-icons/addFolder.png";
import deleteFolderIcon from "./../Files/file-icons/deleteFolder.png";
import HandleMessage from "../../../functions/HandleMessage";
import InputModal from "../Files/Modal/InputFolderModal/InputModal";

type Props = {
  folder: string,
}

const Files = (props: Props): ReactElement => {
  let data: DiskProps = useOutletContext();
  
  data.folder = props.folder;
  data.folder = data.folder ? data.folder : "";

  const files = useAppSelector((state) => state.user.files);
  const folders = useAppSelector((state) => state.user.folders);

  const [folderName, setFolderName] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [isGridView, setIsGridView] = useState(false);

  const myFiles = files.filter((file) => file.ownerEmail === data.userEmail);

  const othersFiles = files.filter(
    (file) => file.ownerEmail !== data.userEmail
  );
  
  const getFolders = (): ReactElement[] => {
    if (data.isFilesLoading) return [];

    let backFolder: ReactElement = <></>;
    if (data.folder) {
      const pastPath =
        data.folder.lastIndexOf("+") === -1
          ? ""
          : data.folder.slice(0, data.folder.lastIndexOf("+"));

      backFolder = (
        <Folder
          name={".."}
          path={pastPath}
          changeFileFolder={data.changeFileFolder}
          gridView={isGridView}

          key={data.folder + v4()}
        />
      );
    }

    let newFolders: string[] = folders.filter((folder) => {
      let checkFolder = data.folder
        ? `${data.folder}+${folder.slice(data.folder.length + 1)}`
        : folder;

      return (
        folder.startsWith(data.folder ? data.folder : "") &&
        folders.includes(checkFolder) &&
        folder !== data.folder &&
        !folder.slice(data.folder ? data.folder.length + 1 : 0).includes("+")
      );
    });

    let reactFolders: ReactElement[] = newFolders.map((folder) => {
      let name = folder.includes("+")
        ? folder.slice(data.folder ? data.folder.length + 1 : 0)
        : folder;
      return (
        <Folder
          name={name}
          path={folder}
          changeFileFolder={data.changeFileFolder}
          gridView={isGridView}

          key={folder + v4()}
        />
      );
    });

    return [backFolder, ...reactFolders];
  };

  const getFiles = (files: UserFile[], isMyFiles: boolean): ReactElement[] => {
    if (data.isFilesLoading) return [<Loader key={v4()}/>];

    let newFiles: UserFile[] = files.filter((file) => !file.isHiden);
    if (isMyFiles)
      newFiles = newFiles.filter((file) => file.folder === data.folder);

    return newFiles
      .map((file: UserFile) => (
        <File
          file={file}
          changeFileFolder={data.changeFileFolder}
          removeFile={data.removeFile}
          shareFile={data.shareFile}
          folders={folders}
          deleteUserOnFile={data.deleteUserOnFile}
          gridView={isGridView}

          key={file.fullPath + v4()}
        />
      ))
      .reverse();
  };

  const handleCreateFolder = (): void => {
    setModalActive(false);
    data.createFolder(folderName);
  };

  const handleDeleteFolder = (): void => {
    if (getFiles(myFiles, true).length !== 0 || getFolders().length > 1)
      HandleMessage("Нельзя удалить папку с файлами или папками", "error");
    else if (data.folder === "")
      HandleMessage("Вы не находитесь в папке", "error");
    else data.deleteFolder();
  };

  const path = data.folder
    ? "/" + data.folder.split('+').join('/')
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
        {getFiles(myFiles, true)}
      </span>

      <h2>С вами поделились</h2>
      <span
        className={
          isGridView
            ? `${styles.fileList} ${styles.fileListView}`
            : styles.fileList
        }
      >
        {getFiles(othersFiles, false)}
      </span>

      <InputModal
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
