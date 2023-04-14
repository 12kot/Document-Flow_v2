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
        <span className={styles.form_title}>Upload your file</span>
        <p className={styles.form_paragraph}>File should be an image</p>
        <label htmlFor="file-input" className={styles.drop_container}>
          {props.isUploadLoading ? (
            <Loader />
          ) : (
            <>
              <span className={styles.drop_title}>Drop files here</span>
              or
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
