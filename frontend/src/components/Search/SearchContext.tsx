import { IBookItem } from "components/Book";
import { FC, ReactNode, createContext, useCallback, useState } from "react";
import { instance } from "utils/fetchInstance";

interface SearchContextProps {
  searchResults: IBookItem[];
  hints: IBookItem[];
  loading: boolean;
  handleSearch: (searchParams: Record<string, any>) => void;
  fetchHints: (searchParams: Record<string, any>) => void;
}

const SearchContext = createContext<SearchContextProps>({
  searchResults: [],
  hints: [],
  loading: false,
  handleSearch: () => {},
  fetchHints: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

const SearchContextProvider: FC<ProviderProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<IBookItem[]>([]);
  const [hints, setHints] = useState<IBookItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [cache, setCache] = useState<Record<string, IBookItem[]>>({});

  const generateCacheKey = (params: Record<string, any>): string => {
    return JSON.stringify(params);
  };

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
        const data = await response.data;
        setSearchResults(data.books);
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
        `/api/books/filters?${queryString}&limit=20`
      );
      setHints(response.data.books);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        hints,
        handleSearch,
        fetchHints,
        loading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
