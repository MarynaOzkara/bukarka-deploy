import { IBookItem } from "components/Book";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { instance } from "utils/fetchInstance";
import { ISearchResponse } from "./Search.types";

interface SearchContextProps {
  searchResults: IBookItem[];
  hints: IBookItem[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  handleSearch: (searchParams: Record<string, any>) => void;
  fetchHints: (searchParams: Record<string, any>) => void;
}

const SearchContext = createContext<SearchContextProps>({
  searchResults: [],
  hints: [],
  loading: false,
  currentPage: 1,
  totalPages: 1,
  handleSearch: () => {},
  fetchHints: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

const SearchContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<IBookItem[]>([]);
  const [hints, setHints] = useState<IBookItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const setPages = (data: ISearchResponse) => {
    if (data.total && data.limit) {
      const pages = Math.ceil(data.total / data.limit);
      setTotalPages(pages);
    }
  };

  const handleSearch = useCallback(
    async (searchParams: Record<string, any>) => {
      const queryString = new URLSearchParams(searchParams).toString();

      setLoading(true);

      try {
        const response = await instance.get<ISearchResponse>(
          `/api/books/filters?${queryString}&limit=4`
        );

        if (response.data.books.length) {
          setSearchResults(response.data.books);
          setPages(response.data);
          setCurrentPage(searchParams.page || 1);
        } else setSearchResults([]);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchHints = useCallback(async (searchParams: Record<string, any>) => {
    const queryString = new URLSearchParams(searchParams).toString();
    setLoading(true);

    try {
      const response = await instance.get(
        `/api/books/filters?${queryString}&limit=10`
      );
      setHints(response.data.books);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      searchResults,
      hints,
      loading,
      currentPage,
      totalPages,
      handleSearch,
      fetchHints,
    }),
    [
      searchResults,
      hints,
      loading,
      currentPage,
      totalPages,
      handleSearch,
      fetchHints,
    ]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
