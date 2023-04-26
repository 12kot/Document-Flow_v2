import React, { ReactElement } from "react";
import Button from "../../../../UI/Button/Button";
import styles from "./Confidense.module.css";

const Confidense = (): ReactElement  => {
  return (
    <div className={`${styles.confidense}`}>
      <h2>
        <b>Онлайн-конфиденциальность для всех</b>
      </h2>
      <p>
        Конфиденциальность — это не опция в LOGO, а стандарт. Потому что мы
        считаем, что каждый должен иметь возможность хранить данные и общаться в
        сети безопасно и конфиденциально.
      </p>
      <Button
        size={styles.button}
        path="/register"
        text="Попробовать диск бесплатно"
      />
    </div>
  );
};

export default Confidense;
