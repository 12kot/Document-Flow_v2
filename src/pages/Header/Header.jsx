import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/slices/userSlice";

const Header = (props) => {
  const email = useSelector(state => state.user.email);
  const dispatch = useDispatch();

  let logOutUser = () => {
    dispatch(removeUser());
  }

  return (
    <header className={styles.header}>
      <span className={`${styles.item} ${styles.logo}`}>
        <NavLink to="/">LOGO</NavLink>
      </span>
      <div>
        <span className={styles.item}>
          <NavLink onClick={logOutUser} to="/login">{!!email ? `${email} (выйти)` : "Войти"}</NavLink>
        </span>
      </div>
    </header>
  );
};

export default Header;
