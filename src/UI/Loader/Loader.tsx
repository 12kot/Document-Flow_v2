import React, { ReactElement } from "react";
import styles from "./Loader.module.css";

const Loader = (): ReactElement => {
  return (
    <div className={styles.loader}></div>
  );
};

export default Loader;
