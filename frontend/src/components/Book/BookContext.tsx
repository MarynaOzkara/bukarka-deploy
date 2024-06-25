import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  IBookItem,
  IBooksContextType,
  IBooksDataResponse,
  IFetchBooksParams,
  IFetchFavoritesParams,
} from "types/Books";
import { instance } from "utils/fetchInstance";

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
  const [book, setBook] = useState<IBookItem>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchResults, setSearchResults] = useState<IBookItem[]>([]);
  const [hints, setHints] = useState<IBookItem[]>([]);
  const [favorites, setFavorites] = useState<IBookItem[]>([]);

  const fetchBooks = useCallback(async (params: IFetchBooksParams) => {
    try {
      const response = await instance.get<IBooksDataResponse>(
        "/api/books/filters",
        { params }
      );
      const { books, total, limit } = response.data;
      if (books.length) {
        setBooks(books);
        setHints(books);

        if (total && limit) setTotalPages(Math.ceil(total / limit));
        if (params) setCurrentPage(params.page || 1);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  }, []);

  const handleSearch = useCallback(async (params: IFetchBooksParams) => {
    try {
      const response = await instance.get<IBooksDataResponse>(
        "/api/books/filters",
        { params }
      );
      const { books, total, limit } = response.data;
      if (books.length) {
        setSearchResults(books);

        if (total && limit) setTotalPages(Math.ceil(total / limit));
        if (params) setCurrentPage(params.page || 1);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  }, []);

  const fetchHints = useCallback(
    async (params: IFetchBooksParams) => {
      fetchBooks(params);
    },
    [fetchBooks]
  );

  const fetchBookById = useCallback(async (id?: string) => {
    try {
      const response = await instance.get(`/api/books/${id}`);
      setBook(response.data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const fetchFavoritesForGuest = useCallback(
    async (params: IFetchFavoritesParams) => {
      try {
        const response = await instance.get<IBooksDataResponse>(
          "/api/books/ids",
          { params }
        );
        if (response.data.books.length) {
          setFavorites(response.data.books);
          if (response.data.total && response.data.limit) {
            setTotalPages(Math.ceil(response.data.total / response.data.limit));
          }
          setCurrentPage(params.page || 1);
        } else {
          setFavorites([]);
        }
      } catch (error: any) {
        console.error("Error fetching favorites:", error);
        setFavorites([]);
      }
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      books,
      book,
      searchResults,
      hints,
      favorites,
      currentPage,
      totalPages,
      setCurrentPage,
      fetchBooks,
      handleSearch,
      fetchHints,
      fetchBookById,
      fetchFavoritesForGuest,
    }),
    [
      books,
      book,
      searchResults,
      hints,
      favorites,
      currentPage,
      totalPages,
      fetchBooks,
      handleSearch,
      fetchHints,
      fetchBookById,
      fetchFavoritesForGuest,
    ]
  );

  return (
    <BooksContext.Provider value={contextValue}>
      {children}
    </BooksContext.Provider>
  );
};
