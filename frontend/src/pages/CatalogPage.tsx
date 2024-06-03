import { BookCard, SearchContext } from "components";
import { useContext } from "react";
import {
  FlexWrapper,
  PageWrapper,
  StyledCommonWrapper,
  Wrapper,
} from "styles/CommonStyled";
import { Label } from "./CommonPages.styled";

const CatalogPage: React.FC = () => {
  const { results } = useContext(SearchContext);

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
            {results.length === 0 ? (
              <p>No results found</p>
            ) : (
              results.map((result, index) => (
                <BookCard key={index} {...result} />
              ))
            )}
          </FlexWrapper>
        </Wrapper>
      </PageWrapper>
    </StyledCommonWrapper>
  );
};

export default CatalogPage;
