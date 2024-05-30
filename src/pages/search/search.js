import { BasicLayout } from "@/layouts";
import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { size } from "lodash";
import {
  GridGames,
  NoResult,
  Pagination,
  Separator,
} from "@/components/Shared";

export default function SearchPage(props) {
  const { games, pagination, searchText } = props;
  const hasResult = size(games) > 0;

  useEffect(() => {
    document.getElementById("search-games").focus();
  }, []);

  return (
    <>
      <BasicLayout relative isOpenSearch>
        <Container>
          <Separator height={50}></Separator>

          <h2>Buscando: {searchText}</h2>

          {hasResult > 0 ? (
            <>
              <GridGames games={games}></GridGames>
              <Separator height={30}></Separator>
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              ></Pagination>
            </>
          ) : (
            <NoResult text="No se han encontrado resultados"></NoResult>
          )}

          <Separator height={100}></Separator>
        </Container>
      </BasicLayout>
    </>
  );
}
