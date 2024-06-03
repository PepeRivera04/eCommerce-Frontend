import styles from "./StepOne.module.scss";
import { Basket } from "./Basket";

export function StepOne(props) {
  const { games } = props;

  return (
    <div className={styles.stepOne}>
      <div className={styles.center}>
        <Basket games={games}></Basket>
      </div>

      <div className={styles.right}>
        <p>RESUME</p>
      </div>
    </div>
  );
}
