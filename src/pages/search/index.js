import { Game } from "@/api";

export { default } from "./search";

export async function getServerSideProps(context) {
  const {
    query: { s, page = 1 },
  } = context;

  const gameController = new Game();

  const response = await gameController.searchGames(s, page);

  return {
    props: {
      games: response.data,
      pagination: response.meta.pagination,
      searchText: s,
    },
  };
}
