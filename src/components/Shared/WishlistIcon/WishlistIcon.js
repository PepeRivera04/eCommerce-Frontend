import styles from "./WishlistIcon.module.scss";
import classNames from "classnames";
import { Icon } from "semantic-ui-react";

export function WishlistIcon(props) {
  const { game, className } = props;

  return (
    <Icon
      name="heart"
      className={classNames(styles.wishlistIcon, { [className]: className })}
    ></Icon>
  );
}
