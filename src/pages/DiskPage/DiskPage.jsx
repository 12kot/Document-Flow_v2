import React from "react";
import styles from "./DiskPage.module.css";
import Input from "../../UI/Input/Input";
import UploadForm from "../../UI/UploadForm/UploadForm";
import { Outlet } from "react-router-dom";

const DiskPage = (props) => {
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

        <Outlet context={{...props}} />
        
      </div>

      <div className={styles.icons}>Icons made by www.flaticon.com</div>
    </>
  );
};

export default DiskPage;
