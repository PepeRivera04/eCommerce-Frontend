import { useState, useEffect, createContext } from "react";
import { Cart } from "@/api";

const cartController = new Cart();

export const CartContext = createContext();

export function CartProvider(props) {
  const { children } = props;

  // DATOS DEL CARRITO
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(cartController.count());

  // OBTENCIÓN DEL CARRITO
  useEffect(() => {
    const response = cartController.getAll();
    setCart(response);
  }, []);

  // FUNCIÓN QUE AÑADE PRODUCTOS AL CARRITO
  const addCart = (gameId) => {
    cartController.add(gameId);
    refreshTotalCart();
  };

  // FUNCIÓN QUE ACTUALIZA EL CARRITO PARA MOSTRARLO CORRECTAMENTE
  const refreshTotalCart = () => {
    setTotal(cartController.count());
    setCart(cartController.getAll());
  };

  // FUNCIÓN QUE ELIMINA UN PRODUCTO DEL CARRITO
  const deleteItem = (gameId) => {
    cartController.delete(gameId);
    refreshTotalCart();
  };

  // FUNCIÓN QUE LIMPIA TODO EL CARRITO
  const deleteAllItems = () => {
    cartController.deleteAll();
    refreshTotalCart();
  };

  // FUNCIÓN QUE CAMBIA LA CANTIDAD DE "X" ITEM DENTRO DEL CARRITO
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
