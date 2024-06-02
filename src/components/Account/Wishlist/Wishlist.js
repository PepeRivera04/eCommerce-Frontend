import { useState, useEffect } from "react";
import { Wishlist as WishlistController } from "@/api";
import { useAuth } from "@/hooks";
import { NoResult } from "@/components/Shared";
import { size } from "lodash";
import { GridGames } from "./GridGames";

const wishlistCtrl = new WishlistController();

export function Wishlist() {
  const [wishlist, setWishlist] = useState(null);
  const [reload, setReload] = useState(false);

  const { user } = useAuth();

  const onReload = () => setReload((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      try {
        const response = await wishlistCtrl.getAll(user.id);
        setWishlist(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  return size(wishlist) === 0 ? (
    <NoResult text="No tienes ningun juego en la lista de deseos"></NoResult>
  ) : (
    <GridGames wishlist={wishlist} onReload={onReload}></GridGames>
  );
}
