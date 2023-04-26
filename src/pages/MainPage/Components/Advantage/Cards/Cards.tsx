import React, { ReactElement } from "react";
import styles from "./Cards.module.css";
import iconCloud from "./../../../VisualContent/Icons/Icon-3D-cloud.png";
import iconChat from "./../../../VisualContent/Icons/Icon-3D-chat.png";

const Cards = (): ReactElement => {
  return (
    <div className={`${styles.cards}`}>
      <div className={`${styles.card}`}>
        <img src={iconCloud} alt="iconCloud"></img>
        <h4>Храните</h4>
        <p>
          Безопасно храните данные в Интернете. Получите много места для
          хранения, легко расширяйте хранилище и загружайте большие файлы и
          папки.
        </p>
      </div>
      <div className={`${styles.card}`}>
        <img src={iconChat} alt="iconChat"></img>
        <h4>Делитесь</h4>
        <p>
          Безопасно передавайте данные в Интернете. Используйте удобный
          интерфейс, чтобы быстро поделиться важными файлами с коллегами или
          друзьями.
        </p>
      </div>
      <div className={`${styles.card}`}>
        <img src={iconChat} alt="iconChat"></img>
        <h4>Получайте</h4>
        <p>
          Безопасно получайте данные в интернете. Быстро и удобно получите
          данные от своих коллег и друзей.
        </p>
      </div>
    </div>
  );
};

export default Cards;
