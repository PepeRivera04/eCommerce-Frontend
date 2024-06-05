import styles from "./Order.module.scss";
import { DateTime } from "luxon";
import { forEach, map } from "lodash";
import { useState } from "react";
import { Image } from "semantic-ui-react";
import { BasicModal } from "@/components/Shared";
import { fn } from "@/utils";

export function Order(props) {
  const { order } = props;
  const products = order.attributes.products;
  const createdAt = new Date(order.attributes.createdAt).toISOString();
  const address = order.attributes.addressShipping;

  const openCloseModal = () => setShowModal((prevState) => !prevState);

  const [showModal, setShowModal] = useState(false);

  const getTotalProduct = () => {
    let total = 0;

    forEach(products, (prodcut) => {
      total += prodcut.quantity;
    });

    return total;
  };

  return (
    <>
      <div className={styles.order} onClick={openCloseModal}>
        <div>
          <span>
            {DateTime.fromISO(createdAt, { locale: "es" }).toFormat(
              "dd/MM/yyyy"
            )}
          </span>
          <p>{getTotalProduct()} productos</p>
        </div>

        <p>{order.attributes.totalPayment.toFixed(2)}€</p>
      </div>

      <BasicModal
        show={showModal}
        onClose={openCloseModal}
        title="Información del pedido"
      >
        {map(products, (product) => (
          <div className={styles.product}>
            <Image src={product.attributes.cover.data.attributes.url}></Image>

            <div>
              <div className={styles.info}>
                <div>
                  <p>{product.attributes.title}</p>
                </div>
              </div>

              <div className={styles.quantity}>
                <span>x{product.quantity}</span>
                <span>
                  {fn.calcDiscountedPrice(
                    product.attributes.price,
                    product.attributes.discount
                  )}
                  €
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className={styles.address}>
          <div>
            <p className={styles.title}>{address.attributes.title}</p>
            <p className={styles.addressInfo}>
              {address.attributes.name},{address.attributes.address},{" "}
              {address.attributes.state},{address.attributes.city},{" "}
              {address.attributes.postal_code}
            </p>
          </div>
        </div>

        <div className={styles.total}>
          <p>TOTAL: {order.attributes.totalPayment.toFixed(2)}€</p>
        </div>
      </BasicModal>
    </>
  );
}
