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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
      sortBy?: string,
      orderSort?: string,
      limit?: number
    ) => {
      try {
        const response = await instance.get<IBooksDataResponse>(
          "/api/books/filters",
          {
            params: {
              category,
              subcategory,
              link,
              page,
              sortBy,
              orderSort,
              limit,
            },
          }
        );

        if (response.data.books.length) {
          setBooks(response.data.books);
          setPages(response.data);
          setCurrentPage(page || 1);
        }
      } catch (error: any) {
        if (error.response && error.response.status !== 404) {
          throw error;
        }
        setBooks([]);
      }
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      books,

      currentPage,
      totalPages,
      setCurrentPage,

      fetchBooks,
    }),
    [books, currentPage, totalPages, setCurrentPage, fetchBooks]
  );

  return (
    <BooksContext.Provider value={contextValue}>
      {children}
    </BooksContext.Provider>
  );
};
