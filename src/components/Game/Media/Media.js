import { Container } from "semantic-ui-react";
import { Separator } from "@/components/Shared";
import { Video } from "./Video";
import { Gallery } from "./Gallery";

export function Media(props) {
  const { video, screenshots } = props;

  return (
    <Container>
      <h2>Visuales</h2>

      <Separator height={30}></Separator>

      <Video video={video}></Video>

      <Separator height={30}></Separator>

      <Gallery screenshots={screenshots}></Gallery>
    </Container>
  );
}
