import styles from "./../WhyWe.module.css";
import grid from "./Storage.module.css";
import HomeFiles from "./../../../VisualContent/Video/Home-files-storage.webm";

const Storage = () => {
  return (
    <div className={`${styles.content}`}>
      <div className={`${grid.visual}`}>
        <video src={HomeFiles} muted autoPlay loop></video>
      </div>

      <div className={`${styles.description} ${grid.description}`}>
        <h2>Место на диске никогда не закончится</h2>{" "}
        <p>
          Требуется много места для хранения? Без проблем. У нас есть ряд
          конкурентоспособных планов с объёмами до 16 ТБ. Если вам нужно ещё
          больше места, выберите план Pro Flexi или Бизнес, где вы платите
          только за дополнительное место для хранения, которое используете.
        </p>
      </div>
    </div>
  );
};

export default Storage;
