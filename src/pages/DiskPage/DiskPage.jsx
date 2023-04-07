import React from "react";
import styles from "./DiskPage.module.css";
import File from "./Files/File";
import Input from "../../UI/Input/Input";
import SelectForm from "../../UI/SelectForm/SelectForm";
import UploadForm from "../../UI/UploadForm/UploadForm";
import { v4 } from "uuid";
import { useSelector } from "react-redux";

const DiskPage = (props) => {
  const files = useSelector((state) => state.user.files);
  const myFiles = files.filter((file) => file.ownerEmail === props.userEmail);
  const othersFiles = files.filter((file) => file.ownerEmail !== props.userEmail);
  
  const getFiles = (files) => {
    if(props.isLoading) return "Загрузка"
    if (files.length === 0) return "Файлы отсутствуют";
    
    let newFiles = files.filter((file) => !file.isHiden);
    if (newFiles.length === 0) return "Файлы отсутствуют";

    return newFiles.map((file) => ( //кинуть весь файл по пропсам
      <File
        file={file}
        key={file.fullPath + v4()}
        
        removeFile={props.removeFile}
        shareFile={props.shareFile}
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
        {getFiles(myFiles)}

        <h2>С вами поделились</h2>
        {getFiles(othersFiles)}
      </div>
    </div>
  );
};

export default DiskPage;
