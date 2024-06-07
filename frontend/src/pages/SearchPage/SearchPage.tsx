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
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const page = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    setCurrentPage(page);

    const authorQuery = searchParams.get("author") || "";
    const titleQuery = searchParams.get("title") || "";
    const searchQuery = authorQuery || titleQuery;

    if (searchQuery) {
      handleSearch({ author: authorQuery, title: titleQuery, page });
    }
  }, [location.search]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(location.search);
    params.set("page", newPage.toString());
    navigate(`/search?${params.toString()}`);
    setCurrentPage(newPage);
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

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Wrapper>
      </PageWrapper>
    </StyledCommonWrapper>
  );
};

export default SearchPage;
