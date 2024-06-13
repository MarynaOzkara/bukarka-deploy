import { BookCard } from "components";
import { IBookItem } from "components/Book";

interface IFavProps {
  books: IBookItem[];
  limit?: number;
  page?: number;
}

const Favorites: React.FC<IFavProps> = ({ books }) => {
  return (
    <>
      {books.length ? (
        books.map((item: IBookItem) => <BookCard key={item._id} {...item} />)
      ) : (
        <div>No favorite books</div>
      )}
    </>
  );
};

export default Favorites;
