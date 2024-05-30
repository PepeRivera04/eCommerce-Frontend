import styles from "./WishlistIcon.module.scss";
import classNames from "classnames";
import { Icon } from "semantic-ui-react";
import { Wishlist } from "@/api";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks";
import { authFetch } from "@/utils";

const wishlistController = new Wishlist();

export function WishlistIcon(props) {
  const { gameId, className } = props;

  const { user } = useAuth();

  const [hasWishlist, setHasWishlist] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await wishlistController.check(user.id, gameId);
        setHasWishlist(response);
      } catch (error) {
        setHasWishlist(false);
        console.error(error);
      }
    })();
  }, [gameId]);

  const addWishlist = async () => {
    const response = await wishlistController.add(user.id, gameId);
    setHasWishlist(response);
  };

  const deleteWishlist = async () => {
    try {
      await wishlistController.delete(hasWishlist.id);
      setHasWishlist(false);
    } catch (error) {
      throw error;
    }
  };

  if (hasWishlist === null) return null;

  return (
    <Icon
      name={hasWishlist ? "heart" : "heart outline"}
      onClick={hasWishlist ? deleteWishlist : addWishlist}
      className={classNames(styles.wishlistIcon, { [className]: className })}
    ></Icon>
  );
}
