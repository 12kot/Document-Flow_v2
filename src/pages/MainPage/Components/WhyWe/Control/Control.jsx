import styles from "./../WhyWe.module.css";
import grid from "./Control.module.css";
import HomeSafebox from "./../../../VisualContent/Video/Home-safebox.webm";

const Control = () => {
  return (
    <div className={`${styles.content}`}>
      <div className={`${grid.visual}`}>
        <video src={HomeSafebox} muted autoPlay loop></video>
      </div>

      <div className={`${styles.description} ${grid.description}`}>
        <h2>Получите контроль над своими данными</h2>{" "}
        <p>
          Независимо от того, предоставляете ли вы людям доступ к файлам,
          которыми вы делитесь, или забираете доступ к этим файлам, ваши данные
          всегда остаются в ваших руках. Никто, кроме Вас, не сможет поделиться
          файлом или безвозвратно удалить его. Это наше обещание номер один.
        </p>
      </div>
    </div>
  );
};

export default Control;
