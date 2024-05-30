export { default } from "./game";
import { Game } from "@/api";

export async function getServerSideProps(context) {
  const {
    params: { game },
  } = context;

  const gameController = new Game();

  const response = await gameController.getBySlug(game);

  return {
    props: {
      game: response,
    },
  };
}
