import { Container } from "semantic-ui-react";
import { Separator } from "@/components/Shared";
import { Footer } from "@/components/Layout";

export function CartLayout(props) {
  const { children } = props;

  return (
    <>
      <p>HeaderCart</p>
      <Separator height={150}></Separator>
      <Container>{children}</Container>
      <Separator height={70}></Separator>
      <Footer></Footer>
    </>
  );
}
