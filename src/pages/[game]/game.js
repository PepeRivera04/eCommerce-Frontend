import { BasicLayout } from "@/layouts";
import { Game } from "@/components/Game";
import { Separator } from "@/components/Shared";

export default function GamePage(props) {
  const { game } = props;
  console.log(props);

  const wallpaper = game.attributes.wallpaper.data.attributes.url;

  return (
    <>
      <BasicLayout>
        <Game.HeaderWallpaper image={wallpaper}></Game.HeaderWallpaper>
        <Game.Panel gameId={game.id} game={game.attributes}></Game.Panel>

        <Separator height={50}></Separator>
      </BasicLayout>
    </>
  );
}
