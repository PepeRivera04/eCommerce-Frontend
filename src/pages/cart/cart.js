import { CartLayout } from "@/layouts";
import { Cart } from "@/components/Cart";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks";
import { Game } from "@/api";

const gameController = new Game();

export default function CartPage() {
  const {
    query: { step = 1 },
  } = useRouter();
  const currentStep = Number(step);

  const { cart } = useCart();

  const [games, setGames] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = [];
        for await (const item of cart) {
          const response = await gameController.getGameById(item.id);
          data.push({ ...response.data, quantity: item.quantity });
        }
        setGames(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [cart]);

  return (
    <>
      <CartLayout>
        {currentStep === 1 && <Cart.StepOne games={games}></Cart.StepOne>}
        {currentStep === 2 && <Cart.StepTwo games={games}></Cart.StepTwo>}
        {currentStep === 3 && <Cart.StepThree></Cart.StepThree>}
      </CartLayout>
    </>
  );
}
