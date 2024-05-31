import { IBookItem } from "components/Book";
import { FC, ReactNode, createContext, useState } from "react";
import { buildQueryString } from "utils/buildQueryString";

interface SearchContextProps {
  query: string;
  results: IBookItem[];
  handleSearch: (searchParams: Record<string, any>) => void;
}

const SearchContext = createContext<SearchContextProps>({
  query: "",
  results: [],
  handleSearch: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

const SearchContextProvider: FC<ProviderProps> = ({ children }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<IBookItem[]>([]);

  const handleSearch = async (searchParams: Record<string, any>) => {
    setQuery(searchParams.title || "");
    const queryString = buildQueryString(searchParams);

    try {
      const response = await fetch(`/books/filters?${queryString}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <SearchContext.Provider value={{ query, results, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
