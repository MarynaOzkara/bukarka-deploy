import React, { useCallback, useEffect, useState } from "react";
import { HeartIconThin } from "../../assets/icons";
import { StyledHeart } from "./FavoriteButton.styled";

interface IProp {
  itemId: string;
  children?: React.ReactNode;
}

export const FavoriteButton: React.FC<IProp> = ({ itemId }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  const isFavorite = favorites.includes(itemId);

  const addFavorite = useCallback((id: string) => {
    setFavorites((prevFavorites) => [...prevFavorites, id]);
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav !== id));
  }, []);

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
