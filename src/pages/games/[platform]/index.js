export { default } from "./platform";
import { Platform, Game } from "@/api";

export async function getServerSizeProps(context) {
  const { query, params } = props;
  const { page = 1 } = query;
  const { platform } = params;

  const platformController = new Platform();
  const gameController = new Game();

  const responsePlatform = await platformController.getBySlug(platform);
  const responseGame = await gameController.getGamesByPlatformSlug(
    platform,
    page
  );

  return {
    props: {
      platform: responsePlatform,
      games: responseGame.data,
      pagination: responseGame.meta.pagination,
    },
  };
}
