import styles from "../styles/Home.module.css";

const Card = (props) => {
  return (
    <div>
      <img
        className={styles.backgroundImage}
        src={"/images/League.jpg"}
        alt="League"
      />
      {props.children}
    </div>
  );
};

export default Card;
