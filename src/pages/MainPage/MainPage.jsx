import React from "react";
import styles from "./MainPage.module.css";
import mainBanner from "./../../Common/Images/mainBanner.jpg";
import Button from "./../../UI/Button/Button";

//Разбить на компоненты?
const MainPage = (props) => {
  return (
    <div className={`${styles.flex}`}>
      <div className={styles.description}>
        <div className={`${styles.slogan}`}>
          <h1>
            Никитоша диск
            <br />
            для самого важного
          </h1>
        </div>
        <div className={`${styles.slogan1}`}>
          <p>
            Вы можете хранить и передавать коллегам файлы и папки, а также
            работать над ними вместе с другими пользователями на компьютере или
            мобильном устройстве.
          </p>
        </div>
        <Button size={styles.button} path="/login" text="Начать пользоваться" />
        <Button size={styles.button} path="/disk" text="Перейти в диск" />
      </div>
      <div className={`${styles.flex_img}`}>
        <img src={mainBanner} alt="banner" />
      </div>
    </div>
  );
};

export default MainPage;
