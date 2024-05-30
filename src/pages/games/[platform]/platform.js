import { Container } from "semantic-ui-react";
import { size } from "lodash";
import { BasicLayout } from "@/layouts";
import {
  GridGames,
  Separator,
  NoResult,
  Pagination,
} from "@/components/Shared";

export default function PlatformPage(props) {
  const { games, platform, pagination } = props;

  const hasProducts = size(games) > 0;

  return (
    <>
      <BasicLayout relative>
        <Container>
          <Separator height={50}></Separator>
          <h2>{platform.attributes.title}</h2>

          {hasProducts ? (
            <>
              <GridGames games={games}></GridGames>
              <Separator height={30}></Separator>
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              ></Pagination>
            </>
          ) : (
            <NoResult
              text={`La categoria ${platform.attributes.title} aún no tiene productos`}
            ></NoResult>
          )}

          <Separator height={100}></Separator>
        </Container>
      </BasicLayout>
    </>
  );
}
