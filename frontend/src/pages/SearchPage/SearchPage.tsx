import { BookCard, Pagination, SearchContext } from "components";
import { Label } from "pages/CommonPages.styled";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FlexWrapper,
  PageWrapper,
  StyledCommonWrapper,
  Wrapper,
} from "styles/CommonStyled";

const SearchPage = () => {
  const { searchResults, handleSearch, totalPages } = useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [isStart, setIsStart] = useState(true);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const authorQuery = searchParams.get("author") || "";
    const titleQuery = searchParams.get("title") || "";

    setIsStart(true);
    setCurrentPage(page);

    if (!isStart)
      handleSearch({ author: authorQuery, title: titleQuery, page });
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    setIsStart(false);

    const authorQuery = searchParams.get("author") || "";
    const titleQuery = searchParams.get("title") || "";

    setSearchParams({
      author: authorQuery,
      title: titleQuery,
      page: newPage.toString(),
    });
  };

  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <Wrapper>
          <Label>Результати пошуку</Label>
          <FlexWrapper
            style={{
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <BookCard key={index} {...result} />
              ))
            ) : (
              <p>No results found</p>
            )}
          </FlexWrapper>
          {!!searchResults.length && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </Wrapper>
      </PageWrapper>
    </StyledCommonWrapper>
  );
};

export default SearchPage;
