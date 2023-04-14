import React from "react";
import styles from "./UploadForm.module.css";
import Loader from "../Loader/Loader";

const UploadForm = (props) => {
  const uploadFile = (file) => {
    props.uploadFile(file);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <span className={styles.form_title}>Загрузите свой файл</span>
        <p className={styles.form_paragraph}>Загружайте различные типы файлов</p>
        <label htmlFor="file-input" className={styles.drop_container}>
          {props.isUploadLoading ? (
            <Loader />
          ) : (
            <>
              <span className={styles.drop_title}>Перетащи файл сюда</span>
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
