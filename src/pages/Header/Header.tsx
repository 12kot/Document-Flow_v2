import React, { ReactElement, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import styles from "./Header.module.css";
import { removeUser } from "../../store/slices/userSlice";
import { setUserName } from "../../store/slices/userSlice";

import ModalProfile from "./Profile/ModalProfile";
import forgot from "../../API/Auth/forgot";
import updateUserName from "../../API/DB/User/updateUserName";

const Header = (): ReactElement => {
  const user = useAppSelector((state) => state.user);
  const [modalActive, setModalActive] = useState(false);
  const [name, setName] = useState(user.name);
  const dispatch = useAppDispatch();

  const logOutUser = (): void => {
    dispatch(removeUser());
    setName("");
  };

  const handleForgot = async (): Promise<void> => {
    await forgot(user.email);
    setModalActive(false);
  };

  const updateName = async (): Promise<void> => {
    let access: boolean = false;

    if (name) {
      access = await updateUserName(user.email, name);

      if (access) {
        dispatch(setUserName({ name }));
        setModalActive(false);
      }
    }
  };

  return (
    <header className={styles.header}>
      <span className={`${styles.item} ${styles.logo}`}>
        <NavLink to="/disk">LOGO</NavLink>
      </span>
      <div>
        <span className={styles.item}>
          {!!user.email ? (
            <>
              <span
                className={styles.logOut}
                onClick={() => setModalActive(true)}
              >
                {!!user.name ? user.name : "Профиль"}{" "}
              </span>
              <NavLink
                className={styles.logOut}
                to="/login"
                onClick={logOutUser}
              >
                (выйти)
              </NavLink>
            </>
          ) : (
            <div className={styles.auth}>
              <span className={styles.authItem}>
                <NavLink onClick={logOutUser} to="/login">
                  Войти
                </NavLink>
              </span>
              <span className={`${styles.authItem} ${styles.regItem}`}>
                <NavLink onClick={logOutUser} to="/register">
                  Регистрация
                </NavLink>
              </span>
            </div>
          )}
        </span>
      </div>

      <ModalProfile
        active={modalActive}
        setActive={setModalActive}
        user={user}
        name={name}
        setName={setName}
        handleForgot={handleForgot}
        updateName={updateName}
      />
    </header>
  );
};

export default Header;
