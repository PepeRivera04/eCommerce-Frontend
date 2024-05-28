import { BasicLayout } from "@/layouts";
import { Home } from "@/components/Home";
import { Separator, BarTrust, BannerAd } from "@/components/Shared";
import { Container } from "semantic-ui-react";

const platformsId = {
  playstation: 1,
  xbox: 2,
  pc: 4,
  nintendo: 3,
};

export default function HomePage() {
  return (
    <>
      <BasicLayout>
        <Home.BannerLastGamePublished></Home.BannerLastGamePublished>

        <Separator height={100}></Separator>

        <Container>
          <Home.LatestGames title="Últimos lanzamientos"></Home.LatestGames>
        </Container>

        <Separator height={100}></Separator>

        <BarTrust></BarTrust>

        <Separator height={100}></Separator>

        <Container>
          <Home.LatestGames
            title="PlayStation"
            limit={3}
            platformsId={platformsId.playstation}
          ></Home.LatestGames>
        </Container>

        <Separator height={100}></Separator>

        <BannerAd
          title="Registrate y obten los mejores precios"
          subtitle="¡Compara con otros juegos y elige el que más te guste!"
          btnTitle="Entra ahora"
          btnLink="/account"
          image="/images/img01.png"
        ></BannerAd>

        <Separator height={50}></Separator>

        <Container>
          <Home.LatestGames
            title="Xbox"
            limit={3}
            platformsId={platformsId.xbox}
          ></Home.LatestGames>
        </Container>

        <Separator height={100}></Separator>
      </BasicLayout>
    </>
  );
}
