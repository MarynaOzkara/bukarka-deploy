import { BookCard } from "components";
import { IBookItem } from "components/Book";

import { Wrapper } from "styles/CommonStyled";

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
