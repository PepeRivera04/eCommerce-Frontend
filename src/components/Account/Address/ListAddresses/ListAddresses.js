import styles from "./ListAddresses.module.scss";
import { Address } from "./Address";
import { map } from "lodash";
import { useState, useEffect } from "react";
import { Address as AddressCtrl } from "@/api";
import { useAuth } from "@/hooks";

const addressController = new AddressCtrl();

export function ListAddresses(props) {
  const { user } = useAuth();
  const { reload, onReload } = props;

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
  }, [reload]);

  if (!addresses) return null;

  return (
    <div className={styles.addresses}>
      {map(addresses, (address) => (
        <Address
          key={address.id}
          addressId={address.id}
          address={address.attributes}
          onReload={onReload}
        ></Address>
      ))}
    </div>
  );
}
