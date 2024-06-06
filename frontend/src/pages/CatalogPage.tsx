import { BookCard, SearchContext } from "components";
import { useBooks } from "components/Book";
import { useContext } from "react";
import {
  FlexWrapper,
  PageWrapper,
  StyledCommonWrapper,
  Wrapper,
} from "styles/CommonStyled";
import { Label } from "./CommonPages.styled";

const CatalogPage: React.FC = () => {
  const { searchResults } = useContext(SearchContext);
  const { books } = useBooks();

  console.log(searchResults);
  console.log(books);

  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <Wrapper>
          <Label>Каталог</Label>
          <FlexWrapper
            style={{
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            {searchResults ? (
              searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <BookCard key={index} {...result} />
                ))
              ) : (
                <p>No results found</p>
              )
            ) : (
              books.length > 0 &&
              books.map((book, index) => <BookCard key={index} {...book} />)
            )}
          </FlexWrapper>
        </Wrapper>
      </PageWrapper>
    </StyledCommonWrapper>
  );
};

export default CatalogPage;
