import { BookCard, Pagination, SearchContext } from "components";
import { Label } from "pages/CommonPages.styled";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const page = Number(searchParams.get("page"));
    const authorQuery = searchParams.get("author") || "";
    const titleQuery = searchParams.get("title") || "";
    setCurrentPage(page);

    handleSearch({ author: authorQuery, title: titleQuery, page });
  }, [searchParams, setCurrentPage]);

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  //   setSearchParams({ page: page.toString() });
  // };

  // useEffect(() => {
  //   const page = Number(searchParams.get("page"));
  //   console.log(searchParams);
  //   console.log(page);

  //   handleSearch({ author: authorQuery, title: titleQuery, page });
  // }, [location.search]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(location.search);
    params.set("page", newPage.toString());
    navigate(`/search?${params.toString()}`);
    setCurrentPage(newPage);

    console.log(searchParams);

    // setSearchParams({ page: newPage.toString() });
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

          {searchResults.length && (
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
