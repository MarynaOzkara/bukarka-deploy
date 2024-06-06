import { Favorites } from "components";
import { useBooks } from "components/Book";

import { PageWrapper, StyledCommonWrapper } from "styles/CommonStyled";

const FavoritePage: React.FC = () => {
  const { allBooks, favorites } = useBooks();

  const books = allBooks;

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
