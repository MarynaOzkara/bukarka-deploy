import CatalogBookCard from "pages/CatalogPage/CatalogBookCard/CatalogBookCard";
import { TextCenter } from "styles/CommonStyled";
import { IBookItem } from "types/Books";

interface IFavProps {
  favorites: IBookItem[];
}

const Favorites: React.FC<IFavProps> = ({ favorites }) => {
  return (
    <>
      {favorites.length ? (
        favorites.map((item: IBookItem) => (
          <CatalogBookCard key={item._id} {...item} />
        ))
      ) : (
        <TextCenter>No favorite books</TextCenter>
      )}
    </>
  );
};

export default Favorites;
