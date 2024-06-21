import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { IBookItem, IBooksContextType, IBooksDataResponse } from "types/Books";
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
        console.error("Error fetching data:", error);

        setBooks([]);
      }
    },
    []
  );

  const fetchBookById = useCallback(async (id?: string) => {
    try {
      const response = await instance.get(`/api/books/${id}`);
      setBook(response.data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const handleSearch = useCallback(
    async (
      keyword?: string,
      page?: number,
      sortBy?: string,
      orderSort?: string,
      limit?: number
    ) => {
      try {
        const response = await instance.get<IBooksDataResponse>(
          "/api/books/filters",
          {
            params: { keyword, page, sortBy, orderSort, limit },
          }
        );

        if (response.data.books.length) {
          setSearchResults(response.data.books);
          setPages(response.data);
          setCurrentPage(page || 1);
        } else {
          setSearchResults([]);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setSearchResults([]);
      }
    },
    []
  );

  const fetchFavorites = useCallback(
    async (
      ids?: string,
      page?: number,
      sortBy?: string,
      orderSort?: string,
      limit?: number
    ) => {
      try {
        const response = await instance.get<IBooksDataResponse>(
          "/api/books/filters",
          {
            params: { ids, page, sortBy, orderSort, limit },
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

  const fetchHints = useCallback(async (keyword?: string) => {
    try {
      const response = await instance.get<IBooksDataResponse>(
        "/api/books/filters",
        {
          params: { keyword },
        }
      );
      setHints(response.data.books);
    } catch (error: any) {
      console.error("Error fetching suggestions:", error);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      books,
      book,
      searchResults,
      hints,
      currentPage,
      totalPages,
      setCurrentPage,
      fetchBooks,
      fetchBookById,
      handleSearch,
      fetchHints,
      favorites,
      fetchFavorites,
    }),
    [
      books,
      book,
      searchResults,
      hints,
      currentPage,
      totalPages,
      fetchBooks,
      fetchBookById,
      handleSearch,
      fetchHints,
      favorites,
      fetchFavorites,
    ]
  );

  return (
    <BooksContext.Provider value={contextValue}>
      {children}
    </BooksContext.Provider>
  );
};
