import { useFavorites } from "components/Favorites/FavoritesContext";
import React from "react";
import { HeartIconThin } from "../../assets/icons";
import { StyledHeart } from "./FavoriteButton.styled";

interface IProp {
  itemId: string;
  children?: React.ReactNode;
}

export const FavoriteButton: React.FC<IProp> = ({ itemId }) => {
  const { favoriteIds, addFavorite, removeFavorite } = useFavorites();

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (favoriteIds.includes(itemId)) {
      removeFavorite(itemId);
    } else {
      addFavorite(itemId);
    }
  };

  const isFavorite = favoriteIds.includes(itemId);

  return (
    <StyledHeart $isFavorite={isFavorite} onClick={toggleFavorite}>
      <HeartIconThin />
    </StyledHeart>
  );
};

export default FavoriteButton;
