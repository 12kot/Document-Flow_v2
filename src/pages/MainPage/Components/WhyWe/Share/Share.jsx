import styles from "./../WhyWe.module.css";
import grid from "./Share.module.css";
import SharingVideo from "./../../../VisualContent/Video/Home-files-sharing.webm";

const Share = () => {
  return (
    <div className={`${styles.content} ${grid.content}`}>
      <div className={`${styles.description} ${grid.description}`}>
        <h2>Делитесь файлами с кем угодно</h2>{" "}
        <p>
          Легко делитесь своими файлами LOGO с друзьями и коллегами, даже с
          людьми без аккаунтов в LOGO. И когда вы делитесь, вы всё ещё
          контролируете ситуацию. Пользователи не смогут бесконтрольно делиться
          вашими файлами. Ваши файлы - только в ваших руках.
        </p>
      </div>

      <div className={`${grid.visual}`}>
        <video src={SharingVideo} muted autoPlay loop></video>
      </div>
    </div>
  );
};

export default Share;
