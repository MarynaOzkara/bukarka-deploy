import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  Author,
  Category,
  IBookItem,
  IBooksContextType,
  IBooksDataResponse,
  IFetchBooksParams,
  IFetchFavoritesParams,
  Publisher,
} from "types/Books";
import { FilterData } from "types/Filter";

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);

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

  const fetchCategories = useCallback(async () => {
    try {
      const response = await instance.get<Category[]>("/api/categories");
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  }, []);

  const fetchPublishers = useCallback(async () => {
    try {
      const response = await instance.get<Publisher[]>("/api/books/publishers");
      setPublishers(response.data || []);
    } catch (error) {
      console.error("Error fetching publishers:", error);
      setPublishers([]);
    }
  }, []);

  const fetchAuthors = useCallback(async () => {
    try {
      const response = await instance.get<Author[]>("/api/books/authors");
      setAuthors(response.data || []);
    } catch (error) {
      console.error("Error fetching authors:", error);
      setAuthors([]);
    }
  }, []);

  const fetchFilterData = useCallback(async (): Promise<FilterData> => {
    try {
      const response = await instance.get<FilterData>("/api/books/filterdata");
      return response.data;
    } catch (error) {
      console.error("Error fetching filter data:", error);
      return {
        authors: [],
        publishers: [],
        categories: [],
      };
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      books,
      book,
      searchResults,
      hints,
      favorites,
      currentPage,
      totalPages,
      categories,
      publishers,
      authors,
      setCurrentPage,
      fetchBooks,
      handleSearch,
      fetchHints,
      fetchBookById,
      fetchFavoritesForGuest,
      fetchCategories,
      fetchPublishers,
      fetchAuthors,
      fetchFilterData,
    }),
    [
      books,
      book,
      searchResults,
      hints,
      favorites,
      currentPage,
      totalPages,
      categories,
      publishers,
      authors,
      fetchBooks,
      handleSearch,
      fetchHints,
      fetchBookById,
      fetchFavoritesForGuest,
      fetchCategories,
      fetchPublishers,
      fetchAuthors,
      fetchFilterData,
    ]
  );

  return (
    <BooksContext.Provider value={contextValue}>
      {children}
    </BooksContext.Provider>
  );
};
