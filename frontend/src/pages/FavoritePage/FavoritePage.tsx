import { Favorites } from "components";
import { useBooks } from "components/Book";

import { PageWrapper, StyledCommonWrapper } from "styles/CommonStyled";

const FavoritePage: React.FC = () => {
  const { booksData, favorites } = useBooks();

  const books = booksData;

  const favoriteBooks = books.filter((book) => favorites.includes(book._id));

  return (
    <StyledCommonWrapper>
      <PageWrapper>
        <Favorites data={favoriteBooks} />
      </PageWrapper>
    </StyledCommonWrapper>
  );
};

export default FavoritePage;
