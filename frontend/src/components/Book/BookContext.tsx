import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { instance } from "utils/fetchInstance";
import { IBookItem, IBooksContextType, IBooksDataResponse } from "./Book.types";

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
      category?: string,
      subcategory?: string,
      link?: string,
      page?: number,
      limit?: number
    ) => {
      setLoading(true);
      try {
        const response = await instance.get<IBooksDataResponse>(
          "/api/books/filters",
          {
            params: { category, subcategory, link, page, limit },
          }
        );

        if (response.data.books.length) {
          setBooks(response.data.books);
          setPages(response.data);
          setCurrentPage(page || 1);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404)
          console.warn(
            "Books not found for the given category/subcategory/link."
          );
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
