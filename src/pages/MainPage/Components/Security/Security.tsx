import React from "react";
import styles from "./Security.module.css";
import securityVideo from "./../../VisualContent/Video/Main-padlock.webm";
import { ReactElement } from "react";

const Security = (): ReactElement => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.description}`}>
        <h2>Безопасность, которая всегда включена</h2>
        <p>
          Мы защищаем ваши данные с помощью шифрования с нулевым разглашением,
          высочайшего уровня онлайн-безопасности и конфиденциальности. Это
          означает, что только отправитель и получатель имеют ключи, необходимые
          для просмотра, чтения или прослушивания данных, хранящихся или
          совместно используемых в LOGO. <br /><br /> Для всех остальных,
          включая LOGO, данные выглядели бы как тарабарщина, и их невозможно
          было бы прочитать или понять.
        </p>
      </div>
      <div className={`${styles.image}`}><video src={securityVideo} muted autoPlay loop></video></div>
    </div>
  );
};

export default Security;
