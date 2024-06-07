"use client";

import { BasicLayout } from "@/layouts";
import { Game } from "@/components/Game";
import { Separator } from "@/components/Shared";

export default function GamePage(props) {
  const { game } = props;

  const wallpaper = game.attributes.wallpaper.data.attributes.url;

  return (
    <>
      <BasicLayout>
        <Game.HeaderWallpaper image={wallpaper}></Game.HeaderWallpaper>
        <Game.Panel gameId={game.id} game={game.attributes}></Game.Panel>

        <Separator height={50}></Separator>

        <Game.Info game={game.attributes}></Game.Info>

        <Separator height={30}></Separator>

        <Game.Media
          video={game.attributes.video}
          screenshots={game.attributes.screenshots.data}
        ></Game.Media>

        <Separator height={50}></Separator>
      </BasicLayout>
    </>
  );
}
