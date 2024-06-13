import { IBookItem, IBooksDataResponse } from "components/Book";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { instance } from "utils/fetchInstance";

interface ISearchContextType {
  searchResults: IBookItem[];
  hints: IBookItem[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  handleSearch: (
    author?: string,
    title?: string,
    page?: number,
    limit?: number
  ) => Promise<void>;
  fetchHints: (
    author?: string,
    title?: string,
    page?: number,
    limit?: number
  ) => Promise<void>;
}

const SearchContext = createContext<ISearchContextType | null>(null);

export const useSearch = (): ISearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useBooks must be used within a SearchProvider");
  }
  return context;
};

interface ProviderProps {
  children: ReactNode;
}

const SearchContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<IBookItem[]>([]);
  const [hints, setHints] = useState<IBookItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const setPages = (data: IBooksDataResponse) => {
    if (data.total && data.limit) {
      const pages = Math.ceil(data.total / data.limit);
      setTotalPages(pages);
    }
  };

  const handleSearch = useCallback(
    async (author?: string, title?: string, page?: number, limit?: number) => {
      setLoading(true);

      try {
        const response = await instance.get<IBooksDataResponse>(
          `/api/books/filters`,
          {
            params: { author, title, page, limit },
          }
        );

        if (response.data.books.length) {
          setSearchResults(response.data.books);
          console.log(searchResults);
          setPages(response.data);
          setCurrentPage(page || 1);
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

  const fetchHints = useCallback(async (author?: string, title?: string) => {
    setLoading(true);

    try {
      const response = await instance.get<IBooksDataResponse>(
        `/api/books/filters`,
        {
          params: { author, title },
        }
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
