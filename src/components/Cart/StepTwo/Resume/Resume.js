import styles from "./Resume.module.scss";
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { map, forEach } from "lodash";
import { useAuth, useCart } from "@/hooks";
import { Cart } from "@/api";
import { fn } from "@/utils";

const cartController = new Cart();

export function Resume(props) {
  const { games, addressSelected } = props;

  const [total, setTotal] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let totalTemp = 0;

    {
      forEach(games, (game) => {
        const price = fn.calcDiscountedPrice(
          game.attributes.price,
          game.attributes.discount
        );
        totalTemp += price * game.quantity;
      });
    }

    setTotal(totalTemp.toFixed(2));
  }, [games]);

  const onPay = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (!total) return null;

  return (
    <div className={styles.resume}>
      <h2>Resumen</h2>

      <div className={styles.block}>
        <div className={styles.products}>
          {map(games, (game) => (
            <div key={game.id} className={styles.product}>
              <div>
                <p>{game.attributes.title}</p>
                <span>Generic code</span>
              </div>
              <span>
                {game.quantity > 0 && `${game.quantity} x `}
                {fn.calcDiscountedPrice(
                  game.attributes.price,
                  game.attributes.discount
                )}
                €
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.blockTotal}>
        <div>
          <span>Total</span>
          <span>{total}€</span>
        </div>

        <Button primary fluid disabled={!addressSelected}>
          Pagar
        </Button>
      </div>
    </div>
  );
}
