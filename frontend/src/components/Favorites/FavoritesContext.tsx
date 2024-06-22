import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { IBookItem, IBooksDataResponse } from "types/Books";
import { instance } from "utils/fetchInstance";

interface IFavoritesContextProps {
  favoriteIds: string[];
  favorites: IBookItem[];
  currentPage: number;
  totalPages: number;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  fetchFavoritesForGuest: (
    ids: string[],
    page?: number,
    sortBy?: string,
    orderSort?: string
  ) => Promise<void>;
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
  const [favorites, setFavorites] = useState<IBookItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getSavedIds = () => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  };

  const setPages = (books: IBooksDataResponse) => {
    if (books.total && books.limit) {
      const pages = Math.ceil(books.total / books.limit);
      setTotalPages(pages);
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const addFavorite = useCallback((id: string) => {
    const savedFavorites = getSavedIds();
    setFavoriteIds([...savedFavorites, id]);
  }, []);

  const removeFavorite = useCallback((id: string) => {
    const savedFavorites = getSavedIds();
    setFavoriteIds(savedFavorites.filter((fav: string) => fav !== id));
  }, []);

  const fetchFavoritesForGuest = useCallback(
    async (
      ids: string[],
      page?: number,
      sortBy?: string,
      orderSort?: string
    ) => {
      try {
        const response = await instance.get<IBooksDataResponse>(
          "/api/books/ids",
          {
            params: {
              ids,
              page,
              sortBy,
              orderSort,
            },
          }
        );

        if (response.data.books.length) {
          setFavorites(response.data.books);
          setPages(response.data);
          setCurrentPage(page || 1);
        } else {
          setFavorites([]);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setFavorites([]);
      }
    },
    []
  );

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        favorites,
        currentPage,
        totalPages,
        addFavorite,
        removeFavorite,
        fetchFavoritesForGuest,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
