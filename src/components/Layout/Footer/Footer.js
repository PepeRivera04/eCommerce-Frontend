import styles from "./Footer.module.scss";
import Link from "next/link";
import { Container, Image, Button } from "semantic-ui-react";

export function Footer() {
  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.columns}>
          <div>
            <Link href="/">
              <Image src="images/logo.png" alt="Gaming"></Image>
            </Link>
          </div>

          <div>
            <ul>
              <Link href="#">Terminos y condiciones</Link>
              <Link href="#">Politica y privacidad</Link>
              <Link href="#">Contacto</Link>
              <Link href="#">FAQs</Link>
            </ul>
          </div>

          <div className={styles.social}>
            <Button
              as="a"
              href="#"
              circular
              color="facebook"
              icon="facebook"
            ></Button>
            <Button
              as="a"
              href="#"
              circular
              color="twitter"
              icon="twitter"
            ></Button>
            <Button
              as="a"
              href="#"
              circular
              color="linkedin"
              icon="linkedin"
            ></Button>
            <Button
              as="a"
              href="#"
              circular
              color="youtube"
              icon="youtube"
            ></Button>
          </div>
        </div>

        <div className={styles.copyright}>
          <span>
            Copyright © 2024 Pepe Gaming - All rights reserved // ¡¡ Esto no es
            una tienda real !!
          </span>
        </div>
      </Container>
    </div>
  );
}
