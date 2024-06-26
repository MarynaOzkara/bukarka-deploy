import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface IFavoritesContextProps {
  favoriteIds: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<IFavoritesContextProps | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const getSavedIds = () => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  };

  const addFavorite = useCallback((id: string) => {
    const savedFavorites = getSavedIds();
    setFavoriteIds([...savedFavorites, id]);
  }, []);

  const removeFavorite = useCallback((id: string) => {
    const savedFavorites = getSavedIds();
    setFavoriteIds(savedFavorites.filter((fav: string) => fav !== id));
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
