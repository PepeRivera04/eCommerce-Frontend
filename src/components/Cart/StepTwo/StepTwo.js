import styles from "./StepTwo.module.scss";
import { ENV } from "@/utils";
import { Separator } from "@/components/Shared";
import { Addresses } from "./Addresses";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Payment } from "./Payment";
import { Resume } from "./Resume";

const stripeInit = loadStripe(ENV.STRIPE_TOKEN);

export function StepTwo(props) {
  const { games } = props;

  const [addressSelected, setAddressSelected] = useState(null);

  return (
    <Elements stripe={stripeInit}>
      <div className={styles.stepTwo}>
        <div className={styles.center}>
          <Addresses
            addressSelected={addressSelected}
            setAddressSelected={setAddressSelected}
          ></Addresses>
          <Separator height={50}></Separator>

          {addressSelected && <Payment></Payment>}
        </div>

        <div className={styles.right}>
          <Resume games={games} addressSelected={addressSelected}></Resume>
        </div>
      </div>
    </Elements>
  );
}
