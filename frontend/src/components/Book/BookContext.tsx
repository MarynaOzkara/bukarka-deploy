import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { instance } from "utils/fetchInstance";
import { IBooksContextType, IBookItem, IBooksDataResponse } from "./Book.types";

const BooksContext = createContext<IBooksContextType | null>(null);

export const useBooks = (): IBooksContextType => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};

export const BooksContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<IBookItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const addFavorite = useCallback((id: string) => {
    setFavorites((prevFavorites) => [...prevFavorites, id]);
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav !== id));
  }, []);

  const setPages = (books: IBooksDataResponse) => {
    if (books.total && books.limit) {
      const pages = Math.ceil(books.total / books.limit);
      setTotalPages(pages);
    }
  };

  const fetchBooks = useCallback(
    async (
      page?: number,
      category?: string,
      subcategory?: string,
      link?: string,
      limit?: number
    ) => {
      setLoading(true);
      try {
        const response = await instance.get<IBooksDataResponse>(
          "/api/books/filters",
          {
            params: { page, category, subcategory, link, limit },
          }
        );

        if (response.data.books.length) {
          setBooks(response.data.books);
          setPages(response.data);
          setCurrentPage(page || 1);
        }
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const contextValue = useMemo(
    () => ({
      books,
      favorites,
      currentPage,
      totalPages,
      loading,
      setCurrentPage,
      addFavorite,
      removeFavorite,
      fetchBooks,
    }),
    [
      books,
      favorites,
      currentPage,
      totalPages,
      loading,
      setCurrentPage,
      addFavorite,
      removeFavorite,
      fetchBooks,
    ]
  );

  return (
    <BooksContext.Provider value={contextValue}>
      {children}
    </BooksContext.Provider>
  );
};
