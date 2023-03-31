import React from "react";
import styles from "./DiskPage.module.css";
import File from "./Files/File";
import Input from "../../UI/Input/Input";
import SelectForm from "../../UI/SelectForm/SelectForm";
import UploadForm from "../../UI/UploadForm/UploadForm";
import { useDispatch, useSelector } from "react-redux";
import { changeSearch } from "../../store/slices/diskSlice";

const DiskPage = (props) => {
  const dispatch = useDispatch();
  const search = useSelector(state => state.disk.search);

  const changeSearchText = (text) => {
    dispatch(changeSearch({ text }));
  }

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
          />
        </span>
        
        <span className={styles.sort}>
          <SelectForm
            changeText={props.changeSortText}
            typeOfSort={props.typeOfSort}
          />
        </span>
      </div>

      <div className={styles.addFile}>
        <UploadForm addFile={props.addFile} />
      </div>
      <div>
        <h2>Ваши файлы</h2>
        <File />
      </div>
    </div>
  );
};

export default DiskPage;
