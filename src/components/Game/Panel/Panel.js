import styles from "./Panel.module.scss";
import { Button, Container, Icon, Image } from "semantic-ui-react";
import { fn } from "@/utils";
import { map } from "lodash";
import { WishlistIcon } from "@/components/Shared";

export function Panel(props) {
  const { gameId, game } = props;

  const platforms = game.platforms.data;
  const buyPrice = fn.calcDiscountedPrice(game.price, game.discount);

  return (
    <Container className={styles.panel}>
      <div className={styles.imgContainer}>
        <Image src={game.cover.data.attributes.url}></Image>
      </div>

      <div className={styles.actionsContainer}>
        <div>
          <h2>{game.title}</h2>

          <div className={styles.moreInfo}>
            <span className={styles.platforms}>
              {map(platforms, (platform) => (
                <Image
                  src={platform.attributes.icon.data.attributes.url}
                ></Image>
              ))}
            </span>
          </div>

          <div className={styles.price}>
            {game.discount > 0 && (
              <>
                <span className={styles.originalPrice}>
                  <Icon name="tag"></Icon>
                  {game.price}€
                </span>

                <span className={styles.discount}>-{game.discount}%</span>
              </>
            )}

            <span className={styles.price}>{buyPrice}€</span>
          </div>
          <Button primary fluid onClick="">
            Comprar
          </Button>

          <WishlistIcon gameId={gameId} className={styles.heart}></WishlistIcon>
        </div>
      </div>
    </Container>
  );
}
