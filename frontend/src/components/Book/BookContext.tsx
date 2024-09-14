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
  IFetchHintsParams,
  Publisher,
} from "types/Books";
import { FilterCriteriaRequest, FilterData } from "types/Filter";

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
  const [hints, setHints] = useState<any[]>([]);
  const [bookHints, setBookHints] = useState<IBookItem[]>([]);
  const [favorites, setFavorites] = useState<IBookItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);

  const setPages = ({ total, limit, page }: IBooksDataResponse) => {
    if (total && limit) {
      const pages = Math.ceil(total / limit);
      setTotalPages(pages);
    }
    if (page) setCurrentPage(+page || 1);
  };

  const fetchBooks = useCallback(async (params: IFetchBooksParams) => {
    try {
      const response = await instance.get<IBooksDataResponse>(
        "/api/books/filters",
        { params }
      );
      const { books } = response.data;
      if (books.length) {
        setBooks(books);
        setBookHints(books);
        setPages(response.data);
      } else {
        setBooks([]);
        setBookHints([]);
      }
    } catch (error) {
      setBooks([]);
      setBookHints([]);

      console.error("Error fetching books:", error);
    }
  }, []);

  const handleSearch = useCallback(async (search: IFetchBooksParams) => {
    try {
      const response = await instance.get<IBooksDataResponse>(
        "/api/books/filters",
        {
          params: {
            ...search,
            page: search.page || 1,
          },
        }
      );
      const { books } = response.data;
      if (books.length) {
        setSearchResults(books);
        setPages(response.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      setSearchResults([]);
      console.error("Error fetching search results:", error);
    }
  }, []);

  const fetchBooksHints = useCallback(
    async (hintsParams: IFetchHintsParams) => {
      try {
        const response = await instance.get<IBooksDataResponse>(
          "/api/books/filters",
          {
            params: hintsParams,
          }
        );
        setBookHints(response.data.books);
      } catch (error: any) {
        console.error("Error fetching suggestions:", error);
      }
    },
    []
  );

  const fetchHints = useCallback(async (params: IFetchHintsParams) => {
    try {
      if (params.author) {
        const authorsResponse = await instance.get<Author[]>(
          "/api/books/authors",
          { params }
        );
        setHints(authorsResponse.data);
      }

      if (params.category) {
        const categoriesResponse = await instance.get<Category[]>(
          "/api/categories",
          { params }
        );
        setHints(categoriesResponse.data);
      }
    } catch (error) {
      setHints([]);
      console.error("Error fetching hints:", error);
    }
  }, []);

  const fetchBookById = useCallback(async (id?: string) => {
    try {
      const response = await instance.get(`/api/books/${id}`);
      setBook(response.data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const fetchFavoritesForGuest = useCallback(
    async (favoritesParams: IFetchFavoritesParams) => {
      try {
        const response = await instance.get<IBooksDataResponse>(
          "/api/books/ids",
          { params: favoritesParams }
        );

        const { books } = response.data;
        if (books.length) {
          setFavorites(books);
          setPages(response.data);
        } else {
          setFavorites([]);
        }
      } catch (error: any) {
        setFavorites([]);
        console.error("Error fetching favorites:", error);
      }
    },
    []
  );

  const fetchCategories = useCallback(async () => {
    try {
      const response = await instance.get<Category[]>("/api/categories");
      setCategories(response.data || []);
    } catch (error) {
      setCategories([]);
      console.error("Error fetching categories:", error);
    }
  }, []);

  const fetchPublishers = useCallback(async () => {
    try {
      const response = await instance.get<Publisher[]>("/api/books/publishers");
      setPublishers(response.data || []);
    } catch (error) {
      setPublishers([]);
      console.error("Error fetching publishers:", error);
    }
  }, []);

  const fetchAuthors = useCallback(async () => {
    try {
      const response = await instance.get<Author[]>("/api/books/authors");
      setAuthors(response.data || []);
    } catch (error) {
      setAuthors([]);
      setHints([]);
      console.error("Error fetching authors:", error);
    }
  }, []);

  const fetchFilterData = useCallback(async (): Promise<FilterData> => {
    try {
      const response = await instance.get<FilterData>("/api/books/filterdata");
      return response.data;
    } catch (error) {
      console.error("Error fetching filter data:", error);
      return {
        ages: [],
        authors: [],
        publishers: [],
        categories: [],
        subcategories: [],
        price: { priceMin: 0, priceMax: 0 },
        rating: { ratingMin: 0, ratingMax: 0 },
        languages: [],
      };
    }
  }, []);

  const applyFilter = useCallback(async (filters: FilterCriteriaRequest) => {
    try {
      const response = await instance.get<IBooksDataResponse>(
        "/api/books/filter",
        {
          params: {
            ...filters,
          },
        }
      );
      const { books } = response.data;
      setBooks(books);
      setSearchResults(books);
      setPages(response.data);
    } catch (error) {
      setBooks([]);
      setSearchResults([]);
      console.error("Error applying filters:", error);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      books,
      book,
      searchResults,
      hints,
      bookHints,
      favorites,
      currentPage,
      totalPages,
      categories,
      publishers,
      authors,
      setCurrentPage,
      fetchBooks,
      handleSearch,
      fetchBooksHints,
      fetchHints,
      fetchBookById,
      fetchFavoritesForGuest,
      fetchCategories,
      fetchPublishers,
      fetchAuthors,
      fetchFilterData,
      applyFilter,
    }),
    [
      books,
      book,
      searchResults,
      hints,
      bookHints,
      favorites,
      currentPage,
      totalPages,
      categories,
      publishers,
      authors,
      fetchBooks,
      handleSearch,
      fetchBooksHints,
      fetchHints,
      fetchBookById,
      fetchFavoritesForGuest,
      fetchCategories,
      fetchPublishers,
      fetchAuthors,
      fetchFilterData,
      applyFilter,
    ]
  );

  return (
    <BooksContext.Provider value={contextValue}>
      {children}
    </BooksContext.Provider>
  );
};
