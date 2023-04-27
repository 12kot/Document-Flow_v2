import React, { useState, Dispatch, SetStateAction } from "react";
import { v4 } from "uuid";
import styles from "./Modal.module.css";
import User from "./User/User";
import copy from "copy-to-clipboard";
import Input from "../../../../../UI/Input/Input";
import HandleMessage from "../../../../../functions/HandleMessage";

type ModalProps = {
  active: boolean,
  fileName: string,
  users: string[],
  owner: string,
  path: string,

  setActive: Dispatch<SetStateAction<boolean>>,
  shareFile: (email: string) => void,
  deleteAccess: (email: string) => void,
}

const ManageModal = ({
  active,
  fileName,
  users,
  owner,
  setActive,
  shareFile,
  deleteAccess,
  path,
}: ModalProps) => {
  const [userEmail, setUserEmail] = useState("");

  const copyLink = () => {
    copy(path.toString())
    HandleMessage("Ссылка скопирована в буфер обмена", "success");
  };

  const share = () => {
    shareFile(userEmail);
  };

  const getUsers = () => {
    if (!users) return "Пользователи отсутствуют.";

    users = users.filter((user) => user !== owner);
    if (users.length === 0) return "Пользователи отсутствуют.";

    return users.map((user) => <User email={user} deleteAccess={deleteAccess} key={user + "_" + v4()} />);
  };

  return (
    <div
      className={
        active ? `${styles.modal} ${styles.active}` : `${styles.modal}`
      }
      onClick={() => setActive(false)}
    >
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.closeMenu}>
          <h3>Доступ - {fileName}</h3>
          <span className={styles.closeButton} onClick={() => setActive(false)}>
            {" "}
            <div className={styles.close} />
          </span>
        </div>
        <div className={styles.input}>
          <Input
            type="email"
            value={userEmail}
            onChange={setUserEmail}
            placeholder="Email or name"
            color={styles.color}
          />
        </div>
        <div className={styles.users}>
          <p>Пользователи, имеющие доступ</p>
          <div className={styles.usersContainer}>{getUsers()}</div>
        </div>

        <div className={styles.actions}>
          <span className={styles.copyButton} onClick={copyLink}>
            Скопировать ссылку
          </span>
          <span className={styles.addButton} onClick={share}>
            Добавить пользователя
          </span>
        </div>
      </div>
    </div>
  );
};

export default ManageModal;
