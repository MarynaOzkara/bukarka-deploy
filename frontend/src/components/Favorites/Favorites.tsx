import { BookCard } from "components";
import { TextCenter } from "styles/CommonStyled";
import { IBookItem } from "types/Books";

interface IFavProps {
  favorites: IBookItem[];
}

const Favorites: React.FC<IFavProps> = ({ favorites }) => {
  console.log(favorites);
  return (
    <>
      {favorites.length ? (
        favorites.map((item: IBookItem) => (
          <BookCard key={item._id} {...item} />
        ))
      ) : (
        <TextCenter>No favorite books</TextCenter>
      )}
    </>
  );
};

export default Favorites;
