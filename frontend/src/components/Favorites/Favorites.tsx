import { BookCard } from "components";
import { TextCenter } from "styles/CommonStyled";
import { IBookItem } from "types/Books";

interface IFavProps {
  books: IBookItem[];
}

const Favorites: React.FC<IFavProps> = ({ books }) => {
  console.log(books);
  return (
    <>
      {books.length ? (
        books.map((item: IBookItem) => <BookCard key={item._id} {...item} />)
      ) : (
        <TextCenter>No favorite books</TextCenter>
      )}
    </>
  );
};

export default Favorites;
