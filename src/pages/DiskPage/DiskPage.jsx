import React from "react";
import styles from "./DiskPage.module.css";
import File from "./Files/File";
import Input from "../../UI/Input/Input";
import SelectForm from "../../UI/SelectForm/SelectForm";
import UploadForm from "../../UI/UploadForm/UploadForm";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import { v4 } from "uuid";

const DiskPage = (props) => {
  const files = useAuth().files;
  if (!useAuth().isAuth) return <Navigate to="/login" />;

  const getFiles = () => {
    let newFiles = files.filter((file) => !file.isHiden);

    return newFiles.map((file) => (
      <File
        name={file.name}
        path={file.path}
        id={file.uid}
        key={file.fullPath + v4()}
        fullPath={file.fullPath}
        removeFile={props.removeFile}
      />
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.activeContainer}>
        <span className={styles.search}>
          <Input
            type="text"
            value={props.searchValue}
            onChange={props.changeSearchText}
            placeholder="Search"
            color={styles.color}
            margin={styles.inputStyle}
          />
        </span>
        <span className={styles.sort}>
          <SelectForm
            value={props.sortTypeValue}
            onChange={props.changeSortText}
          />
        </span>
      </div>

      <div className={styles.addFile}>
        <UploadForm uploadFile={props.handleFile} />
      </div>

      <div>
        <h2>Ваши файлы</h2>
        {getFiles()}
      </div>
    </div>
  );
};

export default DiskPage;
