import React from "react";
import styles from "./UploadForm.module.css";

const UploadForm = (props) => {
  let uploadFile = (input) => {
    if (!input) return;

    let file = input.target.files[0];
    props.addFile(file, URL.createObjectURL(file));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>{" "}
        <p>Browse File to upload!</p>
      </div>
      <input type="file" onChange={uploadFile} />
    </div>
  );
};

export default UploadForm;
