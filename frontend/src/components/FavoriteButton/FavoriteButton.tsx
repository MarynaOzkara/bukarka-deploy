import React, { useCallback, useEffect, useState } from "react";
import { HeartIconThin } from "../../assets/icons";
import { StyledHeart } from "./FavoriteButton.styled";

interface IProp {
  itemId: string;
  children?: React.ReactNode;
}

export const FavoriteButton: React.FC<IProp> = ({ itemId }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  const getSavedIds = () => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const addFavorite = useCallback((id: string) => {
    const savedFavorites = getSavedIds();
    setFavoriteIds(() => [...savedFavorites, id]);
  }, []);

  const removeFavorite = useCallback((id: string) => {
    const savedFavorites = getSavedIds();
    setFavoriteIds(() => savedFavorites.filter((fav: string) => fav !== id));
  }, []);

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
