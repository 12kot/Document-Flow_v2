import React, { useState } from "react";
import styles from "./UploadForm.module.css";
import Loader from "../Loader/Loader";

const UploadForm = (props) => {
  const [drag, setDrag] = useState(false);

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  }

  const dragLeaveHandler = (e) => { 
    e.preventDefault();
    setDrag(false);
  }

  const onDropHandler = (e) => { 
    e.preventDefault();
    uploadFile(...e.dataTransfer.files);

    setDrag(false);
  }
  
  const uploadFile = (file) => {
    debugger
    props.uploadFile(file);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <span className={styles.form_title}>Загрузите свой файл</span>
        <p className={styles.form_paragraph}>Загружайте различные типы файлов</p>
        <label htmlFor="file-input" className={styles.drop_container}
          onDragStart={(e) => dragStartHandler(e) }
          onDragLeave={(e) => dragLeaveHandler(e) }
          onDragOver={(e) => dragStartHandler(e) }
          onDrop={(e) => onDropHandler(e)}>
          {props.isUploadLoading ? (
            <Loader />
          ) : (
            <>
              <span className={styles.drop_title}> {drag ? "Отпусти файл, чтобы загрузить" : "Перетащи файл сюда"}</span>
              или
              <input
                type="file"
                onChange={(event) => {
                  uploadFile(event.target.files[0]);
                }}
                id="file-input"
              />
            </>
          )}
        </label>
      </form>
    </div>
  );
};

export default UploadForm;
