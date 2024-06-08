import { Favorites } from "components";
import { useBooks } from "components/Book";
import { Label } from "pages/CommonPages.styled";

import {
  FlexWrapper,
  PageWrapper,
  StyledCommonWrapper,
  Wrapper,
} from "styles/CommonStyled";

const FavoritePage: React.FC = () => {
  const { allBooks, favorites } = useBooks();

  const books = allBooks;

  const favoriteBooks = books.length
    ? books.filter((book) => book && favorites.includes(book._id))
    : [];

  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <Wrapper>
          <Label>Обране</Label>
          <FlexWrapper
            style={{
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            {(books.length && <Favorites books={favoriteBooks} />) || (
              <div>No favorite books</div>
            )}
          </FlexWrapper>
        </Wrapper>
      </PageWrapper>
    </StyledCommonWrapper>
  );
};

export default FavoritePage;
