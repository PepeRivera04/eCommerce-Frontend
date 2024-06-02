import styles from "./GridGames.module.scss";
import Link from "next/link";
import { map } from "lodash";
import { Label, WishlistIcon } from "@/components/Shared";
import { fn } from "@/utils";

export function GridGames(props) {
  const { wishlist, onReload } = props;

  return (
    <div className={styles.gridGame}>
      {map(wishlist, (item) => {
        const game = item.attributes.game.data;
        const cover = game.attributes.cover.data;

        return (
          <div key={item.id} className={styles.game}>
            <Link href={`/${game.attributes.slug}`}>
              <div>
                <img src={cover.attributes.url}></img>
                {game.attributes.discount && (
                  <Label.Discount className={styles.discount}>
                    {`-${game.attributes.discount}%`}
                  </Label.Discount>
                )}
              </div>

              <div>
                <span>{game.attributes.title}</span>
                <span className={styles.price}>
                  {fn.calcDiscountedPrice(
                    game.attributes.price,
                    game.attributes.discount
                  )}
                  €
                </span>
              </div>
            </Link>

            <WishlistIcon
              gameId={game.id}
              className={styles.wishlistIcon}
              removeCallback={onReload}
            ></WishlistIcon>
          </div>
        );
      })}
    </div>
  );
}
