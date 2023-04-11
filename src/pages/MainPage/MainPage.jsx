import React from "react";
import styles from "./MainPage.module.css";
import mainBanner from "./../../Common/Images/mainBanner.jpg";
import iconCloud from "./../../Common/Images/Icon-3D-cloud.png";
import Button from "./../../UI/Button/Button";

//Разбить на компоненты?
const MainPage = (props) => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.confidense}`}>
        <h2>Онлайн-конфиденциальность для всех</h2>
        <p>
          Конфиденциальность — это не опция в LOGO, а стандарт. Потому что мы
          считаем, что каждый должен иметь возможность хранить данные и общаться
          в сети безопасно и конфиденциально.
        </p>
        <Button
          size={styles.button}
          path="/register"
          text="Попробовать диск бесплатно"
        />
      </div>

      <div className={`${styles.advantage}`}>
        <h2>Храните файлы, делить и получайте — всё в одном месте </h2>
        <p>
          LOGO объединяет облачное хранилище, общий доступ к файлам и папкам,
          чат, встречи и многое другое в одном месте.
        </p>
        <div className={`${styles.cards}`}>
          <div className={`${styles.card}`}>
            <img src={iconCloud} alt="iconCloud"></img>
            <h4>Храните</h4>
            <p>Безопасно храните данные в Интернете. Получите много места для хранения, легко расширяйте хранилище и загружайте большие файлы и папки.</p>
          </div>
          <div className={`${styles.card}`}>
            <img src={iconCloud} alt="iconCloud"></img>
            <h4>Делитесь</h4>
            <p>Безопасно передавайте данные в Интернете. Используйте удобный интерфейс, чтобы быстро поделиться важными  файлами с коллегами или друзьями.</p>
          </div>
          <div className={`${styles.card}`}>
            <img src={iconCloud} alt="iconCloud"></img>
            <h4>Получайте</h4>
            <p>Безопасно получайте данные в интернете. Быстро и удобно получите данные от своих коллег и друзей.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
