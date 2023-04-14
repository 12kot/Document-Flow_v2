import React from "react";
import styles from "./User.module.css";

const User = ({ email, deleteAccess }) => {
  return (
    <div className={styles.user}>
      {email}{" "}
      <div className={styles.closeButton}>
        <div className={styles.close} onClick={() => deleteAccess(email)} />{" "}
      </div>
    </div>
  );
};

export default User;
