import { useState, useEffect } from "react";
import { Order as OrderCtrl } from "@/api";
import { NoResult } from "@/components/Shared";
import { useAuth } from "@/hooks";
import { Order } from "./Order";
import { map } from "lodash";

const orderController = new OrderCtrl();

export function Orders() {
  const [orders, setOrders] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await orderController.getAll(user.id);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!orders)
    return <NoResult text="No se han realizado pedidos aún"></NoResult>;
  return (
    <div>
      {map(orders, (order) => (
        <Order key={order.id} order={order}></Order>
      ))}
    </div>
  );
}
