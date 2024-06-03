import { useState, useEffect, createContext } from "react";
import { Cart } from "@/api";

const cartController = new Cart();

export const CartContext = createContext();

export function CartProvider(props) {
  const { children } = props;

  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(cartController.count());

  useEffect(() => {
    const response = cartController.getAll();
    setCart(response);
  }, []);

  const addCart = (gameId) => {
    cartController.add(gameId);
    refreshTotalCart();
  };

  const refreshTotalCart = () => {
    setTotal(cartController.count());
    setCart(cartController.getAll());
  };

  const deleteItem = (gameId) => {
    cartController.delete(gameId);
    refreshTotalCart();
  };

  const deleteAllItems = () => {
    cartController.deleteAll();
    refreshTotalCart();
  };

  const changeQuantityItem = (gameId, quantity) => {
    cartController.changeQuantity(gameId, quantity);
    refreshTotalCart();
  };

  const data = {
    cart: cart,
    addCart,
    total,
    deleteItem,
    deleteAllItems,
    changeQuantityItem,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}
