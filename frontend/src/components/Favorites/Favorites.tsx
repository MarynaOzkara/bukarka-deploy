import { BookCard } from "components";
import { IBookItem, IBooksData } from "components/Book";

import { Label } from "pages/CommonPages.styled";
import { FlexWrapper, Wrapper } from "styles/CommonStyled";

interface IFavProps {
  books: IBookItem[];
  limit?: number;
  page?: number;
}

const Favorites: React.FC<IFavProps> = ({ books }) => {
  return (
    <Wrapper>
      {books.length ? (
        books.map((item: IBookItem) => <BookCard key={item._id} {...item} />)
      ) : (
        <div>No favorite books</div>
      )}
    </Wrapper>
  );
};

export default Favorites;
