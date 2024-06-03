import styles from "./Resume.module.scss";
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { map, forEach } from "lodash";
import { useAuth, useCart } from "@/hooks";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Cart } from "@/api";
import { fn } from "@/utils";
import { useRouter } from "next/router";

const cartController = new Cart();

export function Resume(props) {
  const { games, addressSelected } = props;

  const router = useRouter();

  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const { user } = useAuth();
  const { deleteAllItems } = useCart();

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

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    // Generación del token que usa Stripe para validar la compra
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);

    if (result.error) {
      console.error(result.error.message);
    } else {
      const response = await cartController.paymentCart(
        result.token,
        games,
        user.id,
        addressSelected
      );

      if (response.status === 200) {
        deleteAllItems();
        goToStepThree();
      } else {
        console.error("Error al realizar el pago del pedido");
      }
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const goToStepThree = () => {
    router.replace({ query: { ...router.query, step: 3 } });
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

        <Button
          primary
          fluid
          disabled={!addressSelected}
          onClick={onPay}
          loading={loading}
        >
          Pagar
        </Button>
      </div>
    </div>
  );
}
