import styles from "./Advantage.module.css";
import Cards from "./Cards/Cards";

const Advantage = () => {
  return (
    <div className={`${styles.advantage}`}>
      <h2>Храните файлы, делитесь и получайте — всё в одном месте </h2>
      <p>
        LOGO объединяет облачное хранилище, общий доступ к файлам и папкам и многое другое в одном месте.
      </p>

      <Cards />
    </div>
  );
};

export default Advantage;
