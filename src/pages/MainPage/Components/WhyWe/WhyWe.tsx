import React, { ReactElement } from "react";
import styles from "./WhyWe.module.css";
import Storage from "./Storage/Storage";
import Share from "./Share/Share";
import Control from "./Control/Control";

const WhyWe = (): ReactElement => {
  return (
    <div>
      <h2>Почему LOGO?</h2>
      <div className={`${styles.container}`}>
        <Storage />
        <Share />
        <Control />
      </div>
    </div>
  );
};

export default WhyWe;
