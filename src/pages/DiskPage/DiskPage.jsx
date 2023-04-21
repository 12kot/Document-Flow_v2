import React, { useState } from "react";
import styles from "./DiskPage.module.css";
import File from "./Files/File";
import Input from "../../UI/Input/Input";
import UploadForm from "../../UI/UploadForm/UploadForm";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import Loader from "../../UI/Loader/Loader";
import gridView from "./Files/file-icons/gridView.png";
import listView from "./Files/file-icons/listView.png";

const DiskPage = (props) => {
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
    <>
      <div className={styles.container}>
        <span className={styles.search}>
          <Input
            type="text"
            value={props.searchValue}
            onChange={props.changeSearchText}
            placeholder="Search"
            color={styles.color}
          />
        </span>

        <div className={styles.addFile}>
          <UploadForm
            uploadFile={props.handleFile}
            isUploadLoading={props.isUploadLoading}
          />
        </div>

        <div className={styles.files}>
          <div className={styles.displayGrid}>
            <h2>Ваши файлы</h2>
            <img src={isGridView ? gridView : listView} alt="change grid"
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
      </div>

      <div className={styles.icons}>Icons made by www.flaticon.com</div>
    </>
  );
};

export default DiskPage;
