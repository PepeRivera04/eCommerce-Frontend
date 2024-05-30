import styles from "./Menu.module.scss";
import { Image, Icon, Input } from "semantic-ui-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Platform } from "@/api";
import { map } from "lodash";
import classNames from "classnames";
import { useRouter } from "next/router";

const platformController = new Platform();

export function Menu(props) {
  const { isOpenSearch } = props;
  const router = useRouter();

  const [platforms, setPlatforms] = useState(null);
  const [showSearch, setShowSearch] = useState(isOpenSearch);
  const [searchText, setSearchText] = useState("");

  const openCloseSearch = () => setShowSearch((prevState) => !prevState);

  // Guarda en un estado las plataformas que a su vez van a ser las opciones del menú
  useEffect(() => {
    (async () => {
      try {
        const response = await platformController.getAll();
        setPlatforms(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    setSearchText(router.query.s || "");
  }, []);

  const onSearch = (text) => {
    setSearchText(text);
    router.replace(`/search?s=${text}`);
  };

  return (
    <div className={styles.platforms}>
      {map(platforms, (platform) => (
        <Link
          key={platform.id}
          href={`/games/${platform.attributes.slug}`}
          className={styles.links}
        >
          <Image src={platform.attributes.icon.data.attributes.url}></Image>
          {platform.attributes.title}
        </Link>
      ))}

      <button className={styles.search} onClick={openCloseSearch}>
        <Icon name="search"></Icon>
      </button>

      <div
        className={classNames(styles.inputContainer, {
          [styles.active]: showSearch,
        })}
      >
        <Input
          id="search-games"
          placeholder="Buscador"
          className={styles.input}
          focus={true}
          onChange={(_, data) => onSearch(data.value)}
          value={searchText}
        ></Input>
        <Icon
          name="close"
          className={styles.closeInput}
          onClick={openCloseSearch}
        ></Icon>
      </div>
    </div>
  );
}
