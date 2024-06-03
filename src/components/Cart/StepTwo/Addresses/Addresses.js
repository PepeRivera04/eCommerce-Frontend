import styles from "./Addresses.module.scss";
import { Address } from "@/api";
import { useAuth } from "@/hooks";
import { useState, useEffect } from "react";
import { map } from "lodash";
import classNames from "classnames";

const addressController = new Address();

export function Addresses(props) {
  const { addressSelected, setAddressSelected } = props;

  const { user } = useAuth();
  const [addresses, setAddresses] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await addressController.getAll(user.id);
        setAddresses(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.addresses}>
      <h2>Dirección de facturación</h2>
      {map(addresses, (address) => (
        <div
          key={address.id}
          className={classNames(styles.address, {
            [styles.active]: address.id === addressSelected?.id,
          })}
          onClick={() => setAddressSelected(address)}
        >
          <p>
            {address.attributes.name} ({address.attributes.title})
          </p>
          <p>
            {address.attributes.address}, {address.attributes.postal_code},{" "}
            {address.attributes.state}, {address.attributes.city}.
          </p>
        </div>
      ))}
    </div>
  );
}
