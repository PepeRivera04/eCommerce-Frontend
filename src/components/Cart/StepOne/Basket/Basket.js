import styles from "./Basket.module.scss";
import { Icon, Image, Dropdown } from "semantic-ui-react";
import { map } from "lodash";
import { fn } from "@/utils";
import { useCart } from "@/hooks";

export function Basket(props) {
  const { games } = props;

  const { changeQuantityItem, deleteItem } = useCart();

  const options = Array.from({ length: 10 }, (_, index) => {
    const number = index + 1;
    return { key: number, text: String(number), value: number };
  });

  return (
    <div className={styles.basket}>
      <h2>Cesta</h2>

      <div className={styles.block}>
        {map(games, (game) => (
          <div key={game.id} className={styles.product}>
            <Image src={game.attributes.cover.data.attributes.url}></Image>
            <div>
              <div className={styles.info}>
                <div>
                  <p>{game.attributes.title}</p>
                </div>
                <Icon
                  name="trash alternate online"
                  link
                  onClick={() => deleteItem(game.id)}
                ></Icon>
              </div>

              <div className={styles.quantity}>
                <Dropdown
                  className="number"
                  options={options}
                  selection
                  value={game.quantity}
                  compact
                  onChange={(_, data) =>
                    changeQuantityItem(game.id, data.value)
                  }
                ></Dropdown>
                <span>
                  {fn.calcDiscountedPrice(
                    game.attributes.price,
                    game.attributes.discount
                  )}
                  €
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
