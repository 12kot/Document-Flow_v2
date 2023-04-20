import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/slices/userSlice";
import ModalProfile from "./Profile/ModalProfile";
import forgot from "../../API/Auth/forgot";
import updateUserName from "../../API/DB/updateUserName";
import { setUserName } from "../../store/slices/userSlice";

const Header = (props) => {
  const user = useSelector((state) => state.user);
  const [modalActive, setModalActive] = useState(false);
  const [name, setName] = useState(user.name);
  const dispatch = useDispatch();

  const logOutUser = () => {
    dispatch(removeUser());
  };

  const handleForgot = async () => {
    await forgot(user.email);
    setModalActive(false);
  };

  const updateName = async () => {
    let access = await updateUserName(user.email, name.toLowerCase());
    if (access) {
      dispatch(setUserName({ name }));
      setModalActive(false);
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
              <NavLink
                className={styles.logOut}
                onClick={() => setModalActive(true)}
              >
                {!!user.name ? user.name : "Профиль"}{" "}
              </NavLink>
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
