import React from "react";
import styles from "./ProfilePage.module.css";
import { NavLink } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <h1>
        Profile
        <br />
        Coming soon...
      </h1>
      <NavLink to="/disk">Return to disk</NavLink>
    </div>
  );
};

export default ProfilePage;
