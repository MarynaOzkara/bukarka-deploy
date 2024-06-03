import { IBookItem } from "components/Book";
import { FC, ReactNode, createContext, useCallback, useState } from "react";
import { instance } from "utils/fetchInstance";

interface SearchContextProps {
  results: IBookItem[];
  hints: IBookItem[];
  handleSearch: (searchParams: Record<string, any>) => void;
  fetchHints: (searchParams: Record<string, any>) => void;
}

const SearchContext = createContext<SearchContextProps>({
  results: [],
  hints: [],
  handleSearch: () => {},
  fetchHints: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

const SearchContextProvider: FC<ProviderProps> = ({ children }) => {
  const [results, setResults] = useState<IBookItem[]>([]);
  const [hints, setHints] = useState<IBookItem[]>([]);

  const handleSearch = useCallback(
    async (searchParams: Record<string, any>) => {
      const queryString = new URLSearchParams(searchParams).toString();

      try {
        const response = await instance.get(
          `/api/books/filters?${queryString}`
        );
        const data = await response.data;
        setResults(data.books);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
    []
  );

  const fetchHints = useCallback(async (searchParams: Record<string, any>) => {
    const queryString = new URLSearchParams(searchParams).toString();

    try {
      const response = await instance.get(
        `/api/books/filters?${queryString}&limit=20`
      );
      setHints(response.data.books);
      console.log(response.data.books);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }, []);

  return (
    <SearchContext.Provider
      value={{
        results,
        hints,
        handleSearch,
        fetchHints,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
