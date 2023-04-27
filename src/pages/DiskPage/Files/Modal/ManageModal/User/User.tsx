import React, {ReactElement} from "react";
import styles from "./User.module.css";

type UserProps = {
  email: string,
  deleteAccess: (email: string) => void,
}

const User = ({ email, deleteAccess }: UserProps): ReactElement => {
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
