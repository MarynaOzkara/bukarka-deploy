import { useBooks } from "components/Book";
import React from "react";
import { HeartIconThin } from "../../assets/icons";
import { StyledHeart } from "./FavoriteButton.styled";

interface IProp {
  itemId: string;
  children?: React.ReactNode;
}

export const FavoriteButton: React.FC<IProp> = ({ itemId }) => {
  const { favorites, addFavorite, removeFavorite } = useBooks();
  const isFavorite = favorites.includes(itemId);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(itemId);
    } else {
      addFavorite(itemId);
    }
  };

  return (
    <StyledHeart $isFavorite={isFavorite} onClick={toggleFavorite}>
      <HeartIconThin />
    </StyledHeart>
  );
};

export default FavoriteButton;
