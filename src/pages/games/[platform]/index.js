import { Platform, Game } from "@/api";
export { default } from "./platform";

export async function getServerSideProps(context) {
  const { query, params } = context;
  const { page = 1 } = query;
  const { platform } = params;

  const platformController = new Platform();
  const responsePlatform = await platformController.getBySlug(platform);

  const gameController = new Game();
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
