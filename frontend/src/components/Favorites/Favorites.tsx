import { BookCard } from "components";
import { FlexWrap, TextCenter } from "styles/CommonStyled";
import { IBookItem } from "types/Books";

interface IFavProps {
  favorites: IBookItem[];
}

const Favorites: React.FC<IFavProps> = ({ favorites }) => {
  return (
    <FlexWrap>
      {favorites.length ? (
        favorites.map((item: IBookItem) => (
          <BookCard key={item._id} {...item} />
        ))
      ) : (
        <TextCenter>No favorite books</TextCenter>
      )}
    </FlexWrap>
  );
};

export default Favorites;
