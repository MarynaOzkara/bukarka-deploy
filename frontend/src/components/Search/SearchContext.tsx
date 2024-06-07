import { IBookItem } from "components/Book";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { instance } from "utils/fetchInstance";

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
  const [cache, setCache] = useState<Record<string, IBookItem[]>>({});

  const generateCacheKey = (params: Record<string, any>): string =>
    JSON.stringify(params);

  const handleSearch = useCallback(
    async (searchParams: Record<string, any>) => {
      const cacheKey = generateCacheKey(searchParams);

      if (cache[cacheKey]) {
        setSearchResults(cache[cacheKey]);
        return;
      }

      const queryString = new URLSearchParams(searchParams).toString();
      setLoading(true);

      try {
        const response = await instance.get(
          `/api/books/filters?${queryString}`
        );
        const data = response.data;
        setTotalPages(Math.ceil(data.total / data.limit));
        setSearchResults(data.books);
        setCurrentPage(searchParams.page || 1);
        setCache((prevCache) => ({ ...prevCache, [cacheKey]: data.books }));
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    },
    [cache]
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
