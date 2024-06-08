import { Favorites } from "components";
import { useBooks } from "components/Book";

import { PageWrapper, StyledCommonWrapper } from "styles/CommonStyled";

const FavoritePage: React.FC = () => {
  const { allBooks, favorites } = useBooks();

  const books = allBooks;

  const favoriteBooks = books.length
    ? books.filter((book) => book && favorites.includes(book._id))
    : [];

  return (
    <StyledCommonWrapper>
      <PageWrapper>
        {(books.length && <Favorites books={favoriteBooks} />) || (
          <div>No favorite books</div>
        )}
      </PageWrapper>
    </StyledCommonWrapper>
  );
};

export default FavoritePage;
