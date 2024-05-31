import { BookCard, SearchContext } from "components";
import { useContext } from "react";
import { PageWrapper, StyledCommonWrapper } from "styles/CommonStyled";
import { Label } from "./CommonPages.styled";

const CatalogPage: React.FC = () => {
  const { results } = useContext(SearchContext);

  console.table(results);

  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <Label>Каталог</Label>

        {results.length === 0 ? (
          <p>No results found</p>
        ) : (
          <div className="results">
            {results.map((result, index) => (
              <BookCard key={index} {...result} />
            ))}
          </div>
        )}
      </PageWrapper>
    </StyledCommonWrapper>
  );
};

export default CatalogPage;
