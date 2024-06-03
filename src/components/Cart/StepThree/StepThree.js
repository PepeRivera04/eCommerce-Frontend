import styles from "./StepThree.module.scss";
import { Button, Icon } from "semantic-ui-react";
import Link from "next/link";

export function StepThree() {
  return (
    <div className={styles.stepThree}>
      <Icon name="check circle outline"></Icon>
      <h2>¡La compra se ha realizado con éxito!</h2>

      <Button as={Link} href="/account" primary>
        Ver pedido
      </Button>
    </div>
  );
}
