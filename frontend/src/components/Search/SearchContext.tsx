import { IBookItem, useBooks } from "components/Book";
import { FC, ReactNode, createContext, useCallback, useState } from "react";
import { buildQueryString } from "utils/buildQueryString";
import { instance } from "utils/fetchInstance";

interface SearchContextProps {
  query: string;
  results: IBookItem[];
  hints: IBookItem[];
  handleSearch: (searchParams: Record<string, any>) => void;
  filterHints: (searchQuery: string) => void;
  fetchHints: (searchParams: Record<string, any>) => void;
}

const SearchContext = createContext<SearchContextProps>({
  query: "",
  results: [],
  hints: [],
  handleSearch: () => {},
  filterHints: () => {},
  fetchHints: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

const SearchContextProvider: FC<ProviderProps> = ({ children }) => {
  const { booksData } = useBooks();

  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<IBookItem[]>([]);
  const [hints, setHints] = useState<IBookItem[]>([]);

  const handleSearch = useCallback(
    async (searchParams: Record<string, any>) => {
      const queryString = buildQueryString(searchParams);
      setQuery(searchParams.title || searchParams.author);

      try {
        const response = await instance.get(
          `/api/books/filters?${queryString}`
        );
        const data = await response.data;
        setResults(data.books);
        console.log(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
    []
  );

  const fetchHints = useCallback(async (searchParams: Record<string, any>) => {
    const queryString = buildQueryString(searchParams);
    setQuery(searchParams.title || searchParams.author);
    try {
      const response = await instance.get(`/api/books/filters?${queryString}`);
      setHints(response.data.books);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }, []);

  const filterHints = useCallback(
    (searchQuery: string) => {
      const filteredSuggestions = booksData.filter(
        (item: IBookItem) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setHints(filteredSuggestions.slice(0));
    },
    [booksData]
  );

  return (
    <SearchContext.Provider
      value={{
        query,
        results,
        hints,
        handleSearch,
        filterHints,
        fetchHints,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
