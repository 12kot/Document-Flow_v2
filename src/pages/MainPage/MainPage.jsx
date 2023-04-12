import React from "react";
import styles from "./MainPage.module.css";
import Confidense from "./Components/Confidense/Confidense";
import Advantage from "./Components/Advantage/Advantage";
import Security from "./Components/Security/Security";
import WhyWe from "./Components/WhyWe/WhyWe";
import Footer from "./Components/Footer/Footer";

//Разбить на компоненты?
const MainPage = (props) => {
  return (
    <div className={`${styles.container}`}>
      <Confidense />
      <div className={styles.item}>
        <Advantage />
      </div>
      <div className={styles.item}>
        <Security />
      </div>
      <div className={styles.item}>
        <WhyWe />
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
