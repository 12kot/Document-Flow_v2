import React from "react";
import styles from "./DiskPage.module.css";
import File from "./Files/File";
import Input from "../../UI/Input/Input";
import SelectForm from "../../UI/SelectForm/SelectForm";
import UploadForm from "../../UI/UploadForm/UploadForm";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeSearch, changeSortType } from "../../store/slices/diskSlice";
import useAuth from "../../hooks/use-auth";
import uploadFile from "../../API/uploadFile";
import { addFile } from "../../store/slices/userSlice";
import getDownloadURLFiles from "../../API/getDownloadUrlFiles";

const DiskPage = (props) => {
  //container component
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const { search, sortType } = useSelector((state) => state.disk);

  const changeSearchText = (text) => {
    dispatch(changeSearch({ text }));
  };

  const changeSortText = (text) => {
    dispatch(changeSortType({ text }));
  };

  const handleFile = (file) => {
    uploadFile(file, email)
      .then(async (file) => {

        let path = "";
        await getDownloadURLFiles(file).then(filePath => path = filePath)
        dispatch(
          addFile({
            name: file.metadata.name,
            path
            // size: file.metadata.size,
            // timeCreated: file.metadata.timeCreated,
            // contentType: file.metadata.contentType,
          })
        );
        alert("Файл успешно загружен");
      })
      .catch(alert);
  };
  // container component end

  const files = useAuth().files;
  if (!useAuth().isAuth) return <Navigate to="/login" />;

  const getName = (name) => { return name.slice(name.indexOf("_[FILE_NAME]_") + 13) };

  const getFiles = () =>
    files.map((file) => {
      return (
        <File
          name={getName(file.name)}
          path={file.path}
          key={file.name}
          // date={file.timeCreated}
          // size={file.size}
          // contentType={file.contentType}
        />
      );
    });

  return (
    <div className={styles.container}>
      <div className={styles.activeContainer}>
        <span className={styles.search}>
          <Input
            type="text"
            value={search}
            onChange={changeSearchText}
            placeholder="Search"
            color={styles.color}
            margin={styles.inputStyle}
          />
        </span>

        <span className={styles.sort}>
          <SelectForm value={sortType} onChange={changeSortText} />
        </span>
      </div>

      <div className={styles.addFile}>
        <UploadForm uploadFile={handleFile} />
      </div>
      <div>
        <h2>Ваши файлы</h2>
        {getFiles()}
      </div>
    </div>
  );
};

export default DiskPage;
