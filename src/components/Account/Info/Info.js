import styles from "./Info.module.scss";
import { DateTime } from "luxon";
import { Button, Icon } from "semantic-ui-react";
import { useAuth } from "@/hooks";

export function Info() {
  const { user } = useAuth();

  return (
    <div className={styles.info}>
      <Button icon className={styles.user}>
        <Icon name="user outline"></Icon>
      </Button>
      <h2 className={styles.username}>{user.username}</h2>
      <h4 className={styles.email}>{user.email}</h4>
      <p className={styles.createdAt}>
        Miembro desde :{" "}
        {DateTime.fromISO(user.createdAt, { locale: "es" }).toFormat("D")}
      </p>
    </div>
  );
}
